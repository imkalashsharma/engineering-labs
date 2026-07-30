package com.englabs.URLShortner.service;

import lombok.Getter;

@Getter
public enum HashStrategy {
    SHA256Strategy("SHA256Strategy");

    private final String value;

    HashStrategy(String value) {
        this.value = value;
    }
};
