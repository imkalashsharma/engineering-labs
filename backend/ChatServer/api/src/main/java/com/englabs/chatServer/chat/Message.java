package com.englabs.chatServer.chat;


import lombok.*;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.Instant;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table("messages")
public class Message {
    @PrimaryKey
    @Setter
    private MessageKey key;

    @Column("sender_id")
    private UUID senderId;

    @Column("content")
    private String content;

    @Column("created_at")
    private Instant createdAt;
}
