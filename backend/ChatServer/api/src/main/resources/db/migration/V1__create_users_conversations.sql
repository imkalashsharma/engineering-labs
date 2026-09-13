CREATE TABLE users (
                       id UUID PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations (
                               id UUID PRIMARY KEY,
                               conversation_code VARCHAR(20) NOT NULL UNIQUE,
                               status VARCHAR(30) NOT NULL DEFAULT 'WAITING_FOR_USERS',
                               created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation_participants (
                                           conversation_id UUID NOT NULL,
                                           user_id UUID NOT NULL,
                                           joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                           PRIMARY KEY (conversation_id, user_id),

                                           CONSTRAINT fk_conversation_participant_conversation
                                               FOREIGN KEY (conversation_id)
                                                   REFERENCES conversations(id)
                                                   ON DELETE CASCADE,

                                           CONSTRAINT fk_conversation_participant_user
                                               FOREIGN KEY (user_id)
                                                   REFERENCES users(id)
                                                   ON DELETE CASCADE
);

CREATE INDEX idx_conversation_participants_user
    ON conversation_participants(user_id);

CREATE INDEX idx_conversation_participants_conversation
    ON conversation_participants(conversation_id);