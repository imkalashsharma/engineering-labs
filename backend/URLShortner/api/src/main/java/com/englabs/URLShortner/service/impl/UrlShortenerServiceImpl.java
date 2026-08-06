package com.englabs.URLShortner.service.impl;

import com.englabs.URLShortner.App;
import com.englabs.URLShortner.config.AppProperties;
import com.englabs.URLShortner.entity.UrlLookupEntity;
import com.englabs.URLShortner.exception.ResourceNotFoundException;
import com.englabs.URLShortner.model.UrlShortenResponse;
import com.englabs.URLShortner.repository.UrlShortenerRepository;
import com.englabs.URLShortner.model.HashStrategy;
import com.englabs.URLShortner.service.HashingStrategy;
import com.englabs.URLShortner.service.UrlShortenerService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class UrlShortenerServiceImpl implements UrlShortenerService {
    private final UrlShortenerRepository urlShortenerRepository;
    private final AppProperties appProperties;

    @Autowired
    public UrlShortenerServiceImpl(UrlShortenerRepository urlShortenerRepository, AppProperties appProperties) {
        this.urlShortenerRepository = urlShortenerRepository;
        this.appProperties = appProperties;
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
            // build complete url
            String completeUrl = appProperties.getBaseUrl() + storedUrl.getShortCode();
            return new UrlShortenResponse(completeUrl);
        }

        // hash url
        String shortCode = hashingStrategy.hash(url);

        UrlLookupEntity urlLookupEntity = new UrlLookupEntity();
        urlLookupEntity.setOriginalUrl(url);
        urlLookupEntity.setShortCode(shortCode);

        // save entity
        // also handling concurrent user scenario
        try {
            urlShortenerRepository.save(urlLookupEntity);
        } catch (DataIntegrityViolationException e) {
            UrlLookupEntity savedUrl = urlShortenerRepository.findByOriginalUrl(url);
            return new UrlShortenResponse(savedUrl.getShortCode());
        }
        log.info("Url lookup entry added successfully.");

        // build complete url
        String completeUrl = appProperties.getBaseUrl() + shortCode;
        return new UrlShortenResponse(completeUrl);
    }

    @Override
    public String getRedirectUrl(String url) {
        // check if url already exists
        UrlLookupEntity storedUrl = urlShortenerRepository.findByShortCode(url);

        // if already present, then return short code
        if(storedUrl == null){
            throw new ResourceNotFoundException("Url lookup entry not found.");
        }

        return storedUrl.getOriginalUrl();
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
