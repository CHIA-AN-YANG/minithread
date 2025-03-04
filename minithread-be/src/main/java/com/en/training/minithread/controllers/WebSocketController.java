package com.en.training.minithread.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.en.training.minithread.models.ChatMessage;
import com.en.training.minithread.services.ChatMessageService;
import com.en.training.minithread.services.NotificationProducer;

@RestController
@RequestMapping("/api/notification")
public class WebSocketController {

    @Autowired
    private NotificationProducer notificationProducer;

    @Autowired
    private ChatMessageService chatMessageService;

    @PostMapping("/sendMessage")
    public String sendMessage(@RequestBody ChatMessage message) {
        chatMessageService.saveMessage(message);
        return "Message stored in Redis";
    }

    @PostMapping("/sendRabbitMQMessage")
    public String sendRabbitMQMessage(@RequestBody String message) {
        notificationProducer.sendMessage(message);
        return "Message sent to RabbitMQ: " + message;
    } 

    @GetMapping("/history")
    public List<Object> getChatHistory() {
        return chatMessageService.getMessages();
    }
}