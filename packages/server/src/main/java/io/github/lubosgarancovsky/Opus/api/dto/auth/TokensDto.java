package io.github.lubosgarancovsky.Opus.api.dto.auth;

public record TokensDto(
        String accessToken,
        String refreshToken
) {
}
