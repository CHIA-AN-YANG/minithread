package com.en.training.minithread.security.services;

import com.en.training.minithread.models.NotificationMessage;

import java.util.List;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationMessageConsumer {

    public static final String NOTIFICATION_QUEUE = "miniThreadQueue";

    @Autowired
    private NotificationMessageService notificationMessageService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public List<Object> waitQueue() throws Exception {
        // 監聽回應
        Message responseMessage = rabbitTemplate.receive(NOTIFICATION_QUEUE, 5000); // 設定超時
        if (responseMessage != null) {
            String message = new String(responseMessage.getBody());
            System.out.println("Received message from RabbitMQ: " + message);
            NotificationMessage notificationMessage = new NotificationMessage();
            notificationMessage.setSender("System");
            notificationMessage.setContent(message);
            notificationMessageService.saveMessage(notificationMessage);
        } 

        return notificationMessageService.getMessages();
    }
}
