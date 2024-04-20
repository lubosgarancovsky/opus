package io.github.lubosgarancovsky.Opus.error;

public class ApiException extends RuntimeException {

    private final int status;

    public ApiException(int status, String message) {
        super(message);

        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
