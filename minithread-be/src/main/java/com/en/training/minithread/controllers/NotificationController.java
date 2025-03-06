package com.en.training.minithread.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.en.training.minithread.controllers.dtos.NotificationMessageDTO;
import com.en.training.minithread.services.NotificationMessageProducer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class NotificationController {

    @Autowired
    private NotificationMessageProducer notificationMessageProducer;
    
    @MessageMapping("/sendNotification")
    public String sendNotification(NotificationMessageDTO request) {
        String content = request.getContent();
        String receiver = request.getReceiver() != null ? request.getReceiver() : "System";

        // 記錄發送者與接收者信息
        System.out.println("Sender: " + request.getSender());
        System.out.println("Receiver: " + request.getReceiver());
        System.out.println("Content: " + content);

        notificationMessageProducer.createQueueAndBind(receiver);

        notificationMessageProducer.sendMessage(request);
        System.out.println("Received message:" + content);
        return "Message from " + request.getSender() + " to " + request.getReceiver() + " stored in Redis: " + content;
    }    
}