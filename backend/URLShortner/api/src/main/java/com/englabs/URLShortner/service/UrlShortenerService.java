package com.englabs.URLShortner.service;

import com.englabs.URLShortner.model.HashStrategy;
import com.englabs.URLShortner.model.UrlShortenResponse;

public interface UrlShortenerService {
    UrlShortenResponse shorten(String url, HashStrategy strategy);

    String getRedirectUrl(String url);
}
