package com.ufinity.seab.userService.model;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Setter;
import lombok.Getter;

@Component
@ConfigurationProperties("username")
public class UsernameProperties {

    @Getter @Setter
    private String minLength;

    @Getter @Setter
    private String minLowerCase;

    @Getter @Setter
    private String minUpperCase;

    @Getter @Setter
    private String minSpecialCharacter;

    @Getter @Setter
    private String minNumericalCharacter;
}