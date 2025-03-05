package com.en.training.minithread.security.services;

import java.util.Properties;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.en.training.minithread.config.RabbitMQConfig;
import com.en.training.minithread.controllers.dtos.NotificationMessageDTO;

@Service
public class NotificationMessageProducer {

    @Autowired
    private RabbitAdmin rabbitAdmin;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private AmqpAdmin amqpAdmin;

    /**
     * 根據前端傳來的 routingKey 動態創建 queue 並綁定到 exchange
     */
    public void createQueueAndBind(String routingKey) {
        String queueName = routingKey; // 生成隊列名稱
        // **檢查隊列是否已存在**
        Properties existingQueue = rabbitAdmin.getQueueProperties(queueName);
        if (existingQueue != null) {
            System.out.println("Queue [" + queueName + "] already exists. Skipping creation.");
        } else {
            Queue queue = new Queue(queueName, false);

            // 創建隊列
            amqpAdmin.declareQueue(queue);

            // 綁定隊列到交換機
            Binding binding = BindingBuilder.bind(queue)
                    .to(new TopicExchange(RabbitMQConfig.EXCHANGE_NAME))
                    .with(routingKey);
            amqpAdmin.declareBinding(binding);

            System.out.println("Created queue: " + queueName + " with routing key: " + routingKey);
        }
    }    

    public void sendMessage(String routingKey, NotificationMessageDTO message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, routingKey, message);
        System.out.println("Sent message [" + message.getContent() + "] to routing key: " + routingKey);
    }
}
