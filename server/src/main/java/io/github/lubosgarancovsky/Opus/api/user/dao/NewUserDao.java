package io.github.lubosgarancovsky.Opus.api.user.dao;

public record NewUserDao(
    String firstName,
    String lastName,
    String email,
    String password
) {
}
