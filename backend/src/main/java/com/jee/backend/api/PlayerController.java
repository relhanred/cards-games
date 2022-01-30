package com.jee.backend.api;

import com.jee.backend.forms.PlayerUpdate;
import com.jee.backend.model.*;
import com.jee.backend.service.PlayerService;
import com.jee.backend.service.UserService;
import com.jee.backend.utils.ApiResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PlayerController {

    private PlayerService playerService;

    private UserService userService;

    public PlayerController(PlayerService playerService, UserService userService) {
        this.playerService = playerService;
        this.userService = userService;
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> playerList = playerService.findAllPlayers();
        return new ResponseEntity<>(playerList, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable("id") Long playerId) {
        Player player = playerService.findPlayer(playerId);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

}
