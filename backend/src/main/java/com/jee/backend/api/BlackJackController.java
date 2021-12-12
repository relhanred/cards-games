package com.jee.backend.api;

import com.jee.backend.forms.BlackJackInitForm;
import com.jee.backend.model.*;
import com.jee.backend.service.BlackJackService;
import com.jee.backend.service.CardService;
import com.jee.backend.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/blackjack")
public class BlackJackController {


    private final  BlackJackService blackJackService;

    private final GameService gameService;

    public BlackJackController(BlackJackService blackJackService, GameService gameService) {
        this.blackJackService = blackJackService;
        this.gameService = gameService;
    }

    @PostMapping(value = "/create", consumes = "application/json")
    public ResponseEntity<Game> createGame(@RequestBody BlackJackInitForm blackJackInitForm) {
        GameType gameName = GameType.BLACKJACK;
        List<Player> playerList = new ArrayList<>();
        List<Card> deck = gameService.generateDeck();
        Game newGame = new Game(gameName, deck, playerList, blackJackInitForm.maxPlayers, blackJackInitForm.ia);
        Game game = gameService.createGame(newGame);
        return new ResponseEntity<>(game, HttpStatus.CREATED);
    }

    @GetMapping("/game/{id}")
    public ResponseEntity<Game> getGame(@PathVariable Long gameId) {
        Game game = gameService.findGame(gameId);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("/game/all")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> blackJackGames = gameService.findGamesByGameType(GameType.BLACKJACK);
        return new ResponseEntity<>(blackJackGames, HttpStatus.OK);
    }

    @DeleteMapping("/game/{id}")
    public ResponseEntity<Game> deleteGame(@PathVariable Long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
