package io.github.lubosgarancovsky.Opus.api.user.dao;

public record UserDao(
        String firstName,
        String lastName,
        String displayName,
        String email
) {
}
