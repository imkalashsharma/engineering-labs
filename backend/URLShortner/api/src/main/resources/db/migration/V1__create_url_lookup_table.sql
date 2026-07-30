-- V1_create_url_lookup_table.sql

CREATE TABLE url_lookup (
                            id BIGSERIAL PRIMARY KEY,
                            original_url TEXT NOT NULL,
                            short_code VARCHAR(20) NOT NULL UNIQUE,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX uk_url_lookup_short_code
    ON url_lookup(short_code);

CREATE UNIQUE INDEX uk_url_lookup_original_url
    ON url_lookup(original_url);