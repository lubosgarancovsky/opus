package io.github.lubosgarancovsky.Opus.api.dto.users;

public record NewUserDto(
    String firstName,
    String lastName,
    String email,
    String password
) {
}
