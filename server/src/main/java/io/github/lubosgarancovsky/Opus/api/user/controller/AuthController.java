package io.github.lubosgarancovsky.Opus.api.user.controller;

import io.github.lubosgarancovsky.Opus.api.user.dao.LoginDao;
import io.github.lubosgarancovsky.Opus.api.user.dao.NewUserDao;
import io.github.lubosgarancovsky.Opus.api.user.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody NewUserDao dao) {
        return ResponseEntity.ok(this.authService.registerUser(dao));
    }

    @PostMapping("/tokens")
    public ResponseEntity<?> getTokens(@RequestBody LoginDao dao) {
        return ResponseEntity.ok(this.authService.getTokens(dao));
    }
}
