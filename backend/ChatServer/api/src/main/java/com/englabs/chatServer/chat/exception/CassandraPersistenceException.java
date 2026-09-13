package com.englabs.chatServer.chat.exception;

public class CassandraPersistenceException extends RuntimeException {
    public CassandraPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
