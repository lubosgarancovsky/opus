package io.github.lubosgarancovsky.Opus.api.controller;

import io.github.lubosgarancovsky.Opus.api.dto.auth.LoginDto;
import io.github.lubosgarancovsky.Opus.api.dto.users.NewUserDto;
import io.github.lubosgarancovsky.Opus.api.service.auth.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController extends BaseController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(BASE_AUTH_URL + "/register")
    public ResponseEntity<?> registerUser(@RequestBody NewUserDto dao) {
        return ResponseEntity.ok(this.authService.registerUser(dao));
    }

    @PostMapping(BASE_AUTH_URL + "/tokens")
    public ResponseEntity<?> getTokens(@RequestBody LoginDto dao) {
        return ResponseEntity.ok(this.authService.getTokens(dao));
    }
}
