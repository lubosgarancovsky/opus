package io.github.lubosgarancovsky.Opus.error;

import java.time.LocalDateTime;

public record ApiExceptionDao(
        int status,
        String message,
        LocalDateTime timestamp
) {
}
