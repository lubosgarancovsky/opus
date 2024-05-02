package io.github.lubosgarancovsky.Opus.api.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "projects")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String description;
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private String createdBy;

    private boolean isPublic;
    private String code;

    @ManyToOne
    @JoinColumn( name="created_by", referencedColumnName="id", insertable=false, updatable=false)
    private User owner;

    @OneToMany
    @JoinColumn(name = "project_id")
    private Set<Collaboration> collaborations;

    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    public boolean getIsPublic() {
        return this.isPublic;
    }
}
