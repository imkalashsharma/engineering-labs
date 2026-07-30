CREATE TABLE url_lookup (
                            id BIGSERIAL PRIMARY KEY,
                            original_url TEXT NOT NULL,
                            short_code VARCHAR(20) NOT NULL UNIQUE,
                            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);