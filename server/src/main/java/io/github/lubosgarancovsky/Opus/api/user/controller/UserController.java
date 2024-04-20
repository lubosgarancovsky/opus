package io.github.lubosgarancovsky.Opus.api.user.controller;

import io.github.lubosgarancovsky.Opus.api.user.model.User;
import io.github.lubosgarancovsky.Opus.api.user.model.UserMapper;
import io.github.lubosgarancovsky.Opus.api.user.service.UserService;
import io.github.lubosgarancovsky.Opus.shared.pagination.PageEntity;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/public-details")
    public ResponseEntity<?> listUsersPublicDetails(
            @RequestParam(name = "page", defaultValue = "1", required = false) int page,
            @RequestParam(name = "page-size", defaultValue = "10", required = false) int pageSize,
            @RequestParam(name = "filter", required = false) String filter,
            @RequestParam(name = "sort", required = false) String sort
    ) {
        Page<User> pageResponse = this.userService.listUsers(page, pageSize, filter, sort);
        return ResponseEntity.ok(
                new PageEntity<>(pageResponse, UserMapper::toPublicDetails).map()
        );
    }
}
