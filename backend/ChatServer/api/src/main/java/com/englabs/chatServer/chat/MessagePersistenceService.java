package com.englabs.chatServer.chat;

import com.englabs.chatServer.chat.exception.CassandraPersistenceException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.springframework.stereotype.Service;

@Service
public class MessagePersistenceService {
    private final MessageRepository messageRepository;
    private final ObservationRegistry observationRegistry;

    public MessagePersistenceService(MessageRepository messageRepository, ObservationRegistry observationRegistry) {
        this.messageRepository = messageRepository;
        this.observationRegistry = observationRegistry;
    }

    @CircuitBreaker(
            name = "cassandra",
            fallbackMethod = "persistFallback"
    )
    public void persist(Message message) {
        Observation.createNotStarted("canto.cassandra.persist", observationRegistry)
                        .observe(() -> {
                            messageRepository.save(message);
                        });
    }

    public void persistFallback(Message message, Throwable throwable) {
        throw new CassandraPersistenceException("Cassandra unavailable", throwable);
    }
}
