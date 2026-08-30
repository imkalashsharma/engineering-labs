package com.englabs.URLShortner.bloom;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BloomFilterConfig {

    @Bean
    public BloomFilter bloomFilter() {
        return new BloomFilter(
                1_000_000,
                0.01
        );
    }
}
