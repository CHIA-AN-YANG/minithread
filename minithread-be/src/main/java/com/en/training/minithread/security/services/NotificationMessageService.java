package com.en.training.minithread.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.en.training.minithread.models.NotificationMessage;
import java.util.List;
import java.time.Duration;

@Service
public class NotificationMessageService {
    private static final String MESSAGE_KEY = "chat_messages";
    private static final long EXPIRATION_TIME = 3600; // 1 小時（秒）

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void saveMessage(NotificationMessage message) {
        ListOperations<String, Object> listOps = redisTemplate.opsForList();
        // 先確認 Redis 是否連線成功
        try {
            listOps.rightPush(MESSAGE_KEY, message);
            redisTemplate.expire(MESSAGE_KEY, Duration.ofSeconds(EXPIRATION_TIME));

            // 測試是否成功存入
            System.out.println("Message saved to Redis: " + message);
        } catch (Exception e) {
            System.err.println("Error saving to Redis: " + e.getMessage());
        }
    }

    public List<Object> getMessages() {
        return redisTemplate.opsForList().range(MESSAGE_KEY, 0, -1);
    }  
}
