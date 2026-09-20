package com.englabs.URLShortner.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
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

    public static <T> ResponseEntity<ApiResponse<T>> getError(HttpStatus statusCode, String message) {
        return ResponseEntity
                .status(statusCode)
                .body(new ApiResponse<>(statusCode.toString(), message, null));
    }

    public static <T> ResponseEntity<ApiResponse<T>> getError(String message) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.toString(), message, null));
    }
}
