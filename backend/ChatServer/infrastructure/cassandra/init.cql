CREATE KEYSPACE IF NOT EXISTS canto
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

USE canto;

CREATE TABLE IF NOT EXISTS messages (
    conversation_id text,
    message_id uuid,
    sender_id uuid,
    content text,
    created_at timestamp,
    PRIMARY KEY (conversation_id, created_at, message_id)
) WITH CLUSTERING ORDER BY (created_at ASC);