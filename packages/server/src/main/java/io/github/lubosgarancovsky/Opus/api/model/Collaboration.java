package io.github.lubosgarancovsky.Opus.api.model;

import io.github.lubosgarancovsky.Opus.api.model.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "collaborations")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Collaboration {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "collaborator_id")
    private String collaboratorId;

    @ManyToOne
    @JoinColumn( name="collaborator_id", referencedColumnName="id", insertable=false, updatable=false)
    private User collaborator;
}
