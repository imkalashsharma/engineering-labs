package com.englabs.chatServer.chat;

import org.springframework.data.cassandra.repository.CassandraRepository;

import java.util.List;
import java.util.UUID;

public interface MessageRepository extends CassandraRepository<Message, MessageKey> {
    List<Message> findByKeyConversationIdOrderByKeyCreatedAtAsc(String conversationId);

    boolean existsByKeyMessageId(UUID messageId);
}
