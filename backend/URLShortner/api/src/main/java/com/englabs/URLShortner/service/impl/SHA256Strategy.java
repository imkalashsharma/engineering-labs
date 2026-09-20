package com.englabs.URLShortner.service.impl;

import com.englabs.URLShortner.service.HashingStrategy;
import lombok.extern.slf4j.Slf4j;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Slf4j
public class SHA256Strategy implements HashingStrategy {
    private static final String BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    @Override
    public String hash(String url) {
        try {
            log.info("Invoking SHA256 hashing strategy for url: {}.", url);

            if(url == null)
                throw new IllegalArgumentException("Url is null");

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(url.getBytes(StandardCharsets.UTF_8));

            // Use first 8 bytes (64 bits)
            byte[] first8 = new byte[8];
            System.arraycopy(hash, 0, first8, 0, 8);

            BigInteger value = new BigInteger(1, first8);

            String base62 = encodeBase62(value);

            // Ensure exactly 10 characters
            if (base62.length() > 10) {
                return base62.substring(0, 10);
            }

            return String.format("%10s", base62).replace(' ', '0');
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static String encodeBase62(BigInteger value) {
        if (value.equals(BigInteger.ZERO)) {
            return "0";
        }

        BigInteger base = BigInteger.valueOf(62);
        StringBuilder sb = new StringBuilder();

        while (value.compareTo(BigInteger.ZERO) > 0) {
            BigInteger[] result = value.divideAndRemainder(base);
            sb.append(BASE62.charAt(result[1].intValue()));
            value = result[0];
        }

        return sb.reverse().toString();
    }
}
