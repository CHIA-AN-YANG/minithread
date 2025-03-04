package com.en.training.minithread.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.en.training.minithread.config.RabbitMQConfig;
import com.en.training.minithread.models.ChatMessage;

@Service
public class NotificationConsumer {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private ChatMessageService chatMessageService;

    @RabbitListener(queues = RabbitMQConfig.NOTIFICATION_QUEUE)
    public void receiveNotification(String message) {
        System.out.println("Received message from RabbitMQ: " + message);
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(message);
        chatMessageService.saveMessage(chatMessage);
        messagingTemplate.convertAndSend("/topic/messages", "From RabbitMQ: " + chatMessage);
    }
}
