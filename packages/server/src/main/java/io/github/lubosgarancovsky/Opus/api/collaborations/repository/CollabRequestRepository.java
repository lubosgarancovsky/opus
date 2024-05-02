package io.github.lubosgarancovsky.Opus.api.collaborations.repository;

import io.github.lubosgarancovsky.Opus.api.collaborations.model.CollabRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollabRequestRepository extends JpaRepository<CollabRequest, String>, JpaSpecificationExecutor<CollabRequest> {

    List<CollabRequest> findAllByProjectId(String id);
}
