package io.github.lubosgarancovsky.Opus.api.repository;

import io.github.lubosgarancovsky.Opus.api.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestsRepository extends JpaRepository<Request, String>, JpaSpecificationExecutor<Request> {

    List<Request> findAllByProjectId(String id);
}
