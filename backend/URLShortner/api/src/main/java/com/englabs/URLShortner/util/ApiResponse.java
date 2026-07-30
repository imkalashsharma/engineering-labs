package com.englabs.URLShortner.util;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private String code;
    private String message;
    private T data;

    public static <T> ResponseEntity<ApiResponse<T>> getSuccess(HttpStatus statusCode, String message, T data) {
        return ResponseEntity
                .status(statusCode)
                .body(new ApiResponse<>(
                        statusCode.toString(),
                        message,
                        data
                ));
    }

    public static <T> ResponseEntity<ApiResponse<T>> getError(String message) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.toString(), message, null));
    }
}
