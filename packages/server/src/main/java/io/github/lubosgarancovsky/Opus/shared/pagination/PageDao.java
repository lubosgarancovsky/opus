package io.github.lubosgarancovsky.Opus.shared.pagination;

import java.util.List;

public record PageDao <T>(
        List<T> items,
        int page,
        int pageSize,
        long totalCount
) {
}
