package com.ufinity.seab.userService.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import javax.persistence.*;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import javax.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;
import java.util.List;

@Entity
@Table(name = "role_permission")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"},
        allowGetters = true)
public class RolePermission{
    @Id
    @Getter @Setter
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @Getter @Setter
    @ManyToOne
    @JoinColumn(name = "permission_id", referencedColumnName = "id")
    private Permission permission;

    @Column(nullable = false, updatable = false)
    @Getter @Setter
    @CreatedDate
    private LocalDateTime createdAt;

}