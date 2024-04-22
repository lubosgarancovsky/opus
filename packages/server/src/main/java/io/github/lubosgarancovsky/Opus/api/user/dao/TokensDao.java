package io.github.lubosgarancovsky.Opus.api.user.dao;

public record TokensDao(
        String accessToken,
        String refreshToken
) {
}
