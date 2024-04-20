package io.github.lubosgarancovsky.Opus.config;

import io.github.lubosgarancovsky.Opus.error.ApiException;
import io.github.lubosgarancovsky.Opus.error.ApiExceptionDao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<?> handleServerError(Exception e) {
        ApiExceptionDao dao = new ApiExceptionDao(
                500,
                e.getMessage(),
                LocalDateTime.now());

        return ResponseEntity.status(500).body(dao);
    }

    @ExceptionHandler(ApiException.class)
    protected ResponseEntity<?> handleApiException(ApiException e) {
        ApiExceptionDao dao = new ApiExceptionDao(
                e.getStatus(),
                e.getMessage(),
                LocalDateTime.now());

        return ResponseEntity.status(e.getStatus()).body(dao);
    }
}
