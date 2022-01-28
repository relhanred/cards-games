package com.jee.backend.api;

import com.jee.backend.model.Game;
import com.jee.backend.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "*", maxAge = 3600)
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGame(@PathVariable("id") Long gameId) {
        Game game = gameService.findGame(gameId);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Game> deleteGame(@PathVariable("id") Long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
