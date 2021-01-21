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
@Table(name = "permission")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Permission{
    @Id
    @Getter @Setter
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotBlank
    @Getter @Setter
    private String name;

    @Column(nullable = false, updatable = false)
    @Getter @Setter
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @Getter @Setter
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "permission")
    @Getter @Setter
    private List<RolePermission> rolePermissionList;
}