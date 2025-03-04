package com.en.training.minithread.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import com.en.training.minithread.models.NotificationMessage;
import com.en.training.minithread.security.services.NotificationMessageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class NotificationController {

    @Autowired
    private NotificationMessageService notificationMessageService;
    
    @MessageMapping("/sendNotification")
    public String sendNotification(String message) {
        NotificationMessage notificationMessage = new NotificationMessage();
        notificationMessage.setSender("System");
        notificationMessage.setContent(message);
        notificationMessageService.saveMessage(notificationMessage);
        System.out.println("Received message:" + message);
        return "Message stored in Redis" + message;
    }    
}
