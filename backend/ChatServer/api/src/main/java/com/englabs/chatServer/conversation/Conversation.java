package com.englabs.chatServer.conversation;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "conversations")
@Getter
@Setter
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "conversation_code", nullable = false,  unique = true, length = 6)
    private String conversationCode;

    @Column(nullable = false, length = 30)
    private String status;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
}
