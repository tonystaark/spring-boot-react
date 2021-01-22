package com.ufinity.seab.userService.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.env.Environment;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ufinity.seab.userService.model.ERole;
import com.ufinity.seab.userService.model.Role;
import com.ufinity.seab.userService.model.User;
import com.ufinity.seab.userService.payload.request.LoginRequest;
import com.ufinity.seab.userService.payload.response.MessageResponse;
import com.ufinity.seab.userService.payload.response.JwtResponse;
import com.ufinity.seab.userService.repository.RoleRepository;
import com.ufinity.seab.userService.repository.UserRepository;
import com.ufinity.seab.userService.security.jwt.JwtUtils;
import com.ufinity.seab.userService.security.MyUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.http.*;
import com.ufinity.seab.userService.model.UsernameProperties;
import com.ufinity.seab.userService.model.PasswordProperties;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsernameProperties usernameProperties;

    @Autowired
    PasswordProperties passwordProperties;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private static final Logger LOGGER=LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request,HttpServletResponse response) {
        HttpSession session= request.getSession(false);
        SecurityContextHolder.clearContext();
        session= request.getSession(false);
        if(session != null) {
            session.invalidate();
        }
        for(Cookie cookie : request.getCookies()) {
            cookie.setMaxAge(0);
        }

        return "logout";
    }


    @GetMapping("/login/property")
    public String getPropertyValue(){

        try {
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode loginConfig = mapper.createObjectNode();

            ObjectNode username = mapper.createObjectNode();
            username.put("minLength", usernameProperties.getMinLength());
            username.put("minLowerCase", usernameProperties.getMinLowerCase());
            username.put("minUpperCase", usernameProperties.getMinUpperCase());
            username.put("minSpecialCharacter", usernameProperties.getMinSpecialCharacter());
            username.put("minNumericalCharacter", usernameProperties.getMinNumericalCharacter());

            ObjectNode password = mapper.createObjectNode();
            password.put("minLength", passwordProperties.getMinLength());
            password.put("minLowerCase", passwordProperties.getMinLowerCase());
            password.put("minUpperCase", passwordProperties.getMinUpperCase());
            password.put("minSpecialCharacter", passwordProperties.getMinSpecialCharacter());
            password.put("minNumericalCharacter", passwordProperties.getMinNumericalCharacter());

            loginConfig.set("username",username);
            loginConfig.set("password",password);
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(loginConfig);
            System.out.println(json);
            return json;
        } catch(Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}