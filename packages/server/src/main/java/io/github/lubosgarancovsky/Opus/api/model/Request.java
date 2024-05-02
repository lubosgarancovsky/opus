package io.github.lubosgarancovsky.Opus.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "collab_requests")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "sender_id")
    private String senderId;

    @Column(name = "recipient_id")
    private String recipientId;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn( name="sender_id", referencedColumnName="id", insertable=false, updatable=false)
    private User sender;

    @ManyToOne
    @JoinColumn( name="recipient_id", referencedColumnName="id", insertable=false, updatable=false)
    private User recipient;

    @ManyToOne
    @JoinColumn( name="project_id", referencedColumnName="id", insertable=false, updatable=false)
    private Project project;
}
