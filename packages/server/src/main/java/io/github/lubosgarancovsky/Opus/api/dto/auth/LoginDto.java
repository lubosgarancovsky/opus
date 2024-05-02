package io.github.lubosgarancovsky.Opus.api.dto.auth;

public record LoginDto(
        String email,
        String password
) {
}
