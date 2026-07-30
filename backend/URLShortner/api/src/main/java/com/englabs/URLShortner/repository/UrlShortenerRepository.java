package com.englabs.URLShortner.repository;

import com.englabs.URLShortner.entity.UrlLookupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlShortenerRepository extends JpaRepository<UrlLookupEntity, Long> {
    UrlLookupEntity findByOriginalUrl(String url);
}
