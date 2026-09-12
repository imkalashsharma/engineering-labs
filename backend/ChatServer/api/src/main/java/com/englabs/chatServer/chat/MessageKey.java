package com.englabs.chatServer.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

import java.time.Instant;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyClass
public class MessageKey {
    @PrimaryKeyColumn(
            name = "conversation_id",
            type = PrimaryKeyType.PARTITIONED
    )
    private String conversationId;

    @PrimaryKeyColumn(
            name = "created_at",
            type = PrimaryKeyType.CLUSTERED
    )
    private Instant createdAt;

    @PrimaryKeyColumn(
            name = "message_id",
            type = PrimaryKeyType.CLUSTERED
    )
    private UUID messageId;
}
