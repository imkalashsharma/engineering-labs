package com.englabs.URLShortner.controller;

import com.englabs.URLShortner.model.HashStrategy;
import com.englabs.URLShortner.model.UrlShortenResponse;
import com.englabs.URLShortner.service.UrlShortenerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UrlShortenerController.class)
public class UrlShortenerControllerTest {
    @MockitoBean
    private UrlShortenerService  urlShortenerService;

    @Autowired
    private MockMvc mockMvc;


    @Test
    void getShortUrl_validUrl_returns200() throws Exception {
        UrlShortenResponse response = new UrlShortenResponse("http://localhost:8080/api/v1/abc123");

        // stub service
        when(urlShortenerService.shorten(anyString(), eq(HashStrategy.SHA256Strategy)))
                .thenReturn(response);

        // make GET request
        mockMvc.perform(
                        get("/v1/url-shortener/get-short-url").param("url", "https://google.com")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Url processed."))
                .andExpect(jsonPath("$.data.url").value("http://localhost:8080/api/v1/abc123"));

        // verify service is called
        verify(urlShortenerService)
                .shorten(
                        "https://google.com",
                        HashStrategy.SHA256Strategy
                );
    }

    @Test
    void redirectUrl_getUrl_returns200() throws Exception {
        String response = "https://www.google.com";

        // stub service
        when(urlShortenerService.getRedirectUrl("ha2joija"))
                .thenReturn(response);

        // make GET request
        mockMvc.perform(
                        get("/v1/url-shortener/ha2joija")
                )
                .andExpect(status().isMovedPermanently());

        // verify service is called
        verify(urlShortenerService).getRedirectUrl("ha2joija");
    }
}
