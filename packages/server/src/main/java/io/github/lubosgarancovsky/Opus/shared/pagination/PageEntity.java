package io.github.lubosgarancovsky.Opus.shared.pagination;

import io.github.lubosgarancovsky.Opus.shared.pagination.PageDao;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.function.Function;

public class PageEntity<T> {
    private List<T> items;
    private int page;
    private int pageSize;
    private long totalCount;

    public PageEntity(Page<T> page) {
        this.items = page.getContent();
        this.page = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalCount = page.getTotalElements();
    }

    public <K> PageEntity(Page<K> page, Function<K, T> mapper) {
        this.items = page.getContent().stream().map(mapper).toList();
        this.page = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalCount = page.getTotalElements();
    }

    public PageDao<T> map() {
        return new PageDao<>(items, page, pageSize, totalCount);
    }
}
