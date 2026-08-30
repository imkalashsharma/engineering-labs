package com.englabs.URLShortner.bloom;

import com.englabs.URLShortner.entity.UrlLookupEntity;
import com.englabs.URLShortner.repository.UrlShortenerRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class BloomFilterInitializer {

    private final BloomFilter bloomFilter;
    private final UrlShortenerRepository urlShortenerRepository;

    @PostConstruct
    public void initialize() {
        urlShortenerRepository.findAll().stream().map(UrlLookupEntity::getShortCode).forEach(bloomFilter::add);
    }
}