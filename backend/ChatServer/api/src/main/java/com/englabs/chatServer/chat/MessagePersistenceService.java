package com.englabs.chatServer.chat;

import com.englabs.chatServer.chat.exception.CassandraPersistenceException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;

@Service
public class MessagePersistenceService {
    private final MessageRepository messageRepository;

    public MessagePersistenceService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @CircuitBreaker(
            name = "cassandra",
            fallbackMethod = "persistFallback"
    )
    public void persist(Message message) {
        messageRepository.save(message);
    }

    public void persistFallback(Message message, Throwable throwable) {
        throw new CassandraPersistenceException("Cassandra unavailable", throwable);
    }
}
