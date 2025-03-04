package com.en.training.minithread.security.services;

import com.en.training.minithread.config.RabbitMQConfig;
import com.en.training.minithread.controllers.dtos.NotificationMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.util.List;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationMessageConsumer {

    @Autowired
    private NotificationMessageRedisService notificationMessageRedisService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public List<Object> waitQueue() throws Exception {
        // 監聽回應
        Message responseMessage = rabbitTemplate.receive(RabbitMQConfig.NOTIFICATION_QUEUE, 5000); // 設定超時
        if (responseMessage != null) {
            try {
                ByteArrayInputStream bis = new ByteArrayInputStream(responseMessage.getBody());
                ObjectInputStream ois = new ObjectInputStream(bis);
                NotificationMessageDTO messageDTO = (NotificationMessageDTO) ois.readObject();
                
                System.out.println("Received message from RabbitMQ: " + messageDTO.getContent());
                notificationMessageRedisService.saveMessage(messageDTO);
            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Failed to deserialize message from RabbitMQ.");
            }
        } 

        return notificationMessageRedisService.getMessages();
    }
}
