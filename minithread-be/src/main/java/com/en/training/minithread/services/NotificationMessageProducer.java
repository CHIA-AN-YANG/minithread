package com.en.training.minithread.services;

import java.util.Properties;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.en.training.minithread.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import com.en.training.minithread.controllers.dtos.NotificationMessageDTO;

@Service
public class NotificationMessageProducer {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private RabbitAdmin rabbitAdmin;

    @Autowired
    private AmqpAdmin amqpAdmin;

    public void createQueueAndBind(String routingKey) {
        String queueName = routingKey;

        Properties existingQueue = rabbitAdmin.getQueueProperties(queueName);

        if(existingQueue != null) {
            System.out.println("Queue already exists: " + queueName);
        } else {
            Queue queue = new Queue(queueName, false);

            amqpAdmin.declareQueue(queue);

            Binding binding = BindingBuilder.bind(queue)
                .to(new TopicExchange(RabbitMQConfig.EXCHANGE_NAME))
                .with(routingKey);

            amqpAdmin.declareBinding(binding);

            System.out.println("Queue created: " + queueName);
        }
    }

    public void sendMessage(NotificationMessageDTO message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, message.getReceiver(), message);
        System.out.println("Sent message [" + message.getContent() + "] to routing key: " + message.getReceiver());
    }
}
