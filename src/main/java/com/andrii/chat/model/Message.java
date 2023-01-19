package com.andrii.chat.model;

import lombok.Data;

@Data
public class Message {
  private String sender;
  private String receiver;
  private String content;
}
