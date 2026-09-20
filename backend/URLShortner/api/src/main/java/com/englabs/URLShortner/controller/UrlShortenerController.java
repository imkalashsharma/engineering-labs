package com.englabs.URLShortner.controller;

import com.englabs.URLShortner.model.UrlShortenResponse;
import com.englabs.URLShortner.model.HashStrategy;
import com.englabs.URLShortner.service.UrlShortenerService;
import com.englabs.URLShortner.util.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/v1/url-shortener")
public class UrlShortenerController {
    private final UrlShortenerService urlShortenerService;

    @Autowired
    public UrlShortenerController(UrlShortenerService urlShortenerService) {
        this.urlShortenerService = urlShortenerService;
    }

    @GetMapping("/get-short-url")
    public ResponseEntity<ApiResponse<UrlShortenResponse>> getShortUrl(@RequestParam String url) {
        log.info("Request received for url: {}.", url);
        long startTime = System.currentTimeMillis();

        UrlShortenResponse urlShortenResponse = urlShortenerService.shorten(url, HashStrategy.SHA256Strategy);

        log.info("Request processed successfully. Time taken: {} ms.",  System.currentTimeMillis() - startTime);

        return ApiResponse.getSuccess(
                HttpStatus.OK,
                "Url processed.",
                urlShortenResponse
        );
    }

    @GetMapping("/{url}")
    public ResponseEntity<ApiResponse<UrlShortenResponse>> redirectUrl(@PathVariable String url) {
        log.info("Request received to redirect url: {}.", url);
        long startTime = System.currentTimeMillis();

        String originalUrl = urlShortenerService.getRedirectUrl(url);

        log.info("Request processed successfully. Time taken: {} ms.",  System.currentTimeMillis() - startTime);

        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .location(URI.create(originalUrl))
                .build();
    }
}
