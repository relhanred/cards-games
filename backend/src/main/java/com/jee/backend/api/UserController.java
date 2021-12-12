package com.jee.backend.api;

import com.jee.backend.utils.ApiResult;
import com.jee.backend.utils.JwtUtils;
import com.jee.backend.forms.LoginForm;
import com.jee.backend.forms.SignInForm;
import com.jee.backend.model.User;
import com.jee.backend.service.UserService;
import com.jee.backend.utils.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    private final UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(value = "/admin/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = userService.findUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/auth/add")
    public ResponseEntity<User> addUser(@RequestBody LoginForm userForm) {
        User user = new User(userForm.getEmail(), userForm.getPassword(), userForm.getPseudo());
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/addAdmin")
    public ResponseEntity<User> addAdmin(@RequestBody LoginForm userForm) {
        User user = new User(userForm.getEmail(), userForm.getPassword(), userForm.getPseudo());
        User newUser = userService.addAdmin(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/auth/signin")
    public ResponseEntity<ApiResult<JwtResponse>> signIn(@RequestBody SignInForm signInForm) {
        ApiResult<JwtResponse> apiResult = new ApiResult<>();
        JwtResponse jwtResponse = new JwtResponse();
        try {
            UsernamePasswordAuthenticationToken u = new UsernamePasswordAuthenticationToken(signInForm.getEmail(), signInForm.getPassword());
            if(authenticationManager.authenticate(u).isAuthenticated()) {
                Authentication authentication = authenticationManager.authenticate(u);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                User user = (User) authentication.getPrincipal();
                String jwt = jwtUtils.generateJwtToken(authentication);
                List<String> roles = user.getAuthorities().stream()
                        .map(item -> item.getAuthority())
                        .collect(Collectors.toList());
                jwtResponse = new JwtResponse(jwt, user.getId(), user.getUsername(), user.getEmail(),roles);
                apiResult.setResult(jwtResponse);
                apiResult.setStatus(true);
                apiResult.setMessage("Vous êtes connecté !");
                apiResult.setHttpStatus(HttpStatus.OK);
            }
        }catch (AuthenticationException e) {
            if(userService.findByEmail(signInForm.getEmail()) != null) {
                apiResult.setMessage("Mot de passe incorrect !");
            }else {
                apiResult.setMessage("L’adresse e-mail que vous avez saisi n’est pas associé à un compte !");
            }
            jwtResponse.setUsername("anonymouseUser");
            apiResult.setResult(jwtResponse);
            apiResult.setStatus(false);
            apiResult.setHttpStatus(HttpStatus.UNAUTHORIZED);
            return new ResponseEntity<>(apiResult, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(apiResult, HttpStatus.OK);
    }

    @DeleteMapping(value = "/admin/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
