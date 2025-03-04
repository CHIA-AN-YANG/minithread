package com.en.training.minithread.controllers.dtos;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationMessageDTO implements Serializable {
    private String sender;
    private String receiver;
    private String content;

    public NotificationMessageDTO() {}

    public NotificationMessageDTO(String sender, String receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }
}