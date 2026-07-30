package com.englabs.URLShortner.service.impl;

import com.englabs.URLShortner.entity.UrlLookupEntity;
import com.englabs.URLShortner.model.UrlShortenResponse;
import com.englabs.URLShortner.repository.UrlShortenerRepository;
import com.englabs.URLShortner.service.HashStrategy;
import com.englabs.URLShortner.service.HashingStrategy;
import com.englabs.URLShortner.service.UrlShortenerService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class UrlShortenerServiceImpl implements UrlShortenerService {
    private final UrlShortenerRepository urlShortenerRepository;

    @Autowired
    public UrlShortenerServiceImpl(UrlShortenerRepository urlShortenerRepository) {
        this.urlShortenerRepository = urlShortenerRepository;
    }

    @Override
    @Transactional
    public UrlShortenResponse shorten(String url, HashStrategy strategy) {
        log.info("Selected hashing strategy for url: {}.", strategy.getValue());

        // get instance
        HashingStrategy hashingStrategy = getStrategy(strategy);

        // check if url already exists
        UrlLookupEntity storedUrl = urlShortenerRepository.findByOriginalUrl(url);

        // if already present, then return short code
        if(storedUrl != null){
            return new UrlShortenResponse(storedUrl.getShortCode());
        }

        // hash url
        String shortCode = hashingStrategy.hash(url);

        UrlLookupEntity urlLookupEntity = new UrlLookupEntity();
        urlLookupEntity.setOriginalUrl(url);
        urlLookupEntity.setShortCode(shortCode);

        // save entity
        urlShortenerRepository.save(urlLookupEntity);
        log.info("Url lookup entry added successfully.");

        return new UrlShortenResponse(shortCode);
    }

    // method to get hashing strategy instance
    private HashingStrategy getStrategy(HashStrategy strategy) {
        if (Objects.requireNonNull(strategy) == HashStrategy.SHA256Strategy) {
            return new SHA256Strategy();
        } else {
            return null;
        }
    }
}
