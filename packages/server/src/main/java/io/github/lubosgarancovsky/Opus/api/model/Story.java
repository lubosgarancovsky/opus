package io.github.lubosgarancovsky.Opus.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "story")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String description;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "assigned_to")
    private String assignedTo;

    @ManyToOne
    @JoinColumn( name="created_by", referencedColumnName="id", insertable=false, updatable=false)
    private User creator;

    @ManyToOne
    @JoinColumn( name="assigned_to", referencedColumnName="id", insertable=false, updatable=false)
    private User assigned;

    private String status;

    private String code;

    @Column(name = "story_type")
    private String type;

    private int priority;

}
