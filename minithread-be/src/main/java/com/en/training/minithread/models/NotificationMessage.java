package com.en.training.minithread.models;

import java.io.Serializable;

public class NotificationMessage implements Serializable {
    private String sender;
    private String content;

    public NotificationMessage() {}

    public NotificationMessage(String sender, String content) {
        this.sender = sender;
        this.content = content;
    }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
}
