package io.github.lubosgarancovsky.Opus.api.controller;

public class BaseController {
    protected final String BASE_AUTH_URL = "/v1/auth";
    protected final String BASE_USERS_URL = "/v1/users";

    protected final String BASE_COLLABORATIONS_URL = "/v1/collaborations";

    protected final String BASE_REQUESTS_URL = "/v1/requests";

    protected final String BASE_PROJECTS_URL = "/v1/projects";

    protected final String BASE_STORIES_URL = "/v1/stories";

    protected final String COLLABORATIONS_BY_PROJECT_ID = "/{id}/collaborations";

    protected final String REQUESTS_BY_PROJECT_ID = "/{id}/collaboration-requests";

    protected final String STORIES_BY_PROJECT_ID = "/{id}/stories";

}
