package com.jee.backend.api;

import com.jee.backend.forms.PlayerUpdate;
import com.jee.backend.model.Game;
import com.jee.backend.model.Player;
import com.jee.backend.model.Role;
import com.jee.backend.service.PDFGeneratorService;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    private final UserService userService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private final PDFGeneratorService pdfGeneratorService;


    @Autowired
    JwtUtils jwtUtils;

    public UserController(UserService userService, AuthenticationManager authenticationManager, BCryptPasswordEncoder bCryptPasswordEncoder, PDFGeneratorService pdfGeneratorService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.pdfGeneratorService = pdfGeneratorService;
    }


    @GetMapping("/admin/all")
    public ResponseEntity<List<User>> getAllUsers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            List<User> users = userService.findAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }

    @GetMapping("/admin/pdf")
    public void generatePDF(HttpServletResponse response) throws IOException {
        List<User> users = userService.findAllUsers();
        this.pdfGeneratorService.export(response, users);
    }

    @GetMapping(value = "/admin/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = userService.findUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/auth/add")
    public ResponseEntity<ApiResult> addUser(@RequestBody LoginForm userForm) {
        User user = new User(userForm.getEmail(), userForm.getPassword(), userForm.getPseudo());
        ApiResult apiResult = new ApiResult<>();
        if(userService.findByEmail(user.getEmail()) != null || userService.findByPseudo(user.getPseudo()) != null) {
            if(userService.findByEmail(user.getEmail()) != null) {
                apiResult.setMessage("L'adresse email existe déjà !");
            }else {
                apiResult.setMessage("Le pseudo existe déjà !");
            }
            apiResult.setHttpStatus(HttpStatus.UNAUTHORIZED);
            return  new ResponseEntity<>(apiResult, HttpStatus.UNAUTHORIZED);
        }
        userService.addUser(user);
        apiResult.setMessage("Votre compte a bien été crée ! Connectez vous !");
        apiResult.setHttpStatus(HttpStatus.CREATED);
        return new ResponseEntity<>(apiResult, HttpStatus.CREATED);
    }

    @PostMapping(value = "/admin/addAdmin")
    public ResponseEntity<User> addAdmin(@RequestBody LoginForm userForm) {
        User user = new User(userForm.getEmail(), userForm.getPassword(), userForm.getPseudo());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
        User newUser = userService.addAdmin(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
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
                apiResult.setMessage(user.getPseudo());
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

    @PostMapping("/update/{id}")
    public ApiResult<User> updatePlayer(@PathVariable("id") Long userId, @RequestBody PlayerUpdate playerUpdate) {
        ApiResult<User> apiResult = new ApiResult();
        User user = userService.findUser(userId);
        if(playerUpdate.getPseudo() != "" && playerUpdate.getPseudo() != null) {
            User us = userService.findByPseudo(playerUpdate.getPseudo());
            if (us != null) {
                if(us.getPseudo() != user.getPseudo()) {
                    apiResult.setMessage("Le pseudo existe déjà !");
                    apiResult.setStatus(false);
                    apiResult.setHttpStatus(HttpStatus.UNAUTHORIZED);
                    return apiResult;
                }else {
                    apiResult.setMessage("Votre profil a bien été modifié !");
                    apiResult.setStatus(true);
                    apiResult.setHttpStatus(HttpStatus.OK);
                    return apiResult;
                }
            }
            user.setPseudo(playerUpdate.getPseudo());
            if(playerUpdate.getPassword() != "") {
                user.setPassword(bCryptPasswordEncoder.encode(playerUpdate.getPassword()));
            }
        }
        User newUser = userService.updateUser(user);
        apiResult.setStatus(true);
        apiResult.setResult(newUser);
        apiResult.setMessage("Votre profil a bien été modifié !");
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }
}
