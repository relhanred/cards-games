package com.jee.backend.api;

import com.jee.backend.forms.BlackJackInitForm;
import com.jee.backend.model.*;
import com.jee.backend.service.BlackJackService;
import com.jee.backend.service.GameService;
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
@RequestMapping("/blackjack")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BlackJackController {


    private final BlackJackService blackJackService;

    private final GameService gameService;

    private final UserService userService;

    public BlackJackController(BlackJackService blackJackService, GameService gameService, UserService userService) {
        this.blackJackService = blackJackService;
        this.gameService = gameService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResult<Game>> createGame(@RequestBody BlackJackInitForm blackJackInitForm) {
        GameType gameName = GameType.BLACKJACK;
        List<Player> playerList = new ArrayList<>();
        List<Card> deck = gameService.generateDeck();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ApiResult<Game> apiResult = new ApiResult<>();
        if (auth.getPrincipal() == "anonymousUser") {
            apiResult.setResult(null);
            apiResult.setStatus(false);
            apiResult.setMessage("Vous devez être connecté pour créer une partie");
            return new ResponseEntity<>(apiResult, HttpStatus.FORBIDDEN);
        }
        User user = (User) auth.getPrincipal();
        UserDetails newUser = userService.loadUserByUsername(user.getEmail());
        int score = 0;
        Player player = new Player((User) newUser, new ArrayList<>(), score);
        playerList.add(player);
        int maxPlayers = blackJackInitForm.maxPlayers;
        player = new Player(null, new ArrayList<>(), score);
        playerList.add(player);
        Game game = gameService.createGame(new Game(gameName, deck, playerList, maxPlayers, blackJackInitForm.manche, 0, blackJackInitForm.ia));
        apiResult.setResult(game);
        apiResult.setStatus(true);
        apiResult.setMessage("Partie crée avec succès !");
        return new ResponseEntity<>(apiResult, HttpStatus.CREATED);
    }

    @PostMapping(value = "/game/{gameId}/pick", consumes = "application/json")
    @ResponseBody
    public ApiResult<Game> pickCard(@PathVariable("gameId") Long gameId, @RequestBody Player player) {
        Game game = gameService.findGame(gameId);
        ApiResult<Game> apiResult = new ApiResult();
        if (game == null) {
            apiResult.setMessage("Game not found");
            apiResult.setStatus(false);
            apiResult.setHttpStatus(HttpStatus.BAD_REQUEST);
            return apiResult;
        }
        List<Player> playerList = game.getPlayerList();
        for (Player p : playerList) {
            if (p.getId() == player.getId()) {
                blackJackService.distributeCard(game, p, 1);
            }
        }
        apiResult.setStatus(true);
        apiResult.setResult(game);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }

    @GetMapping(value = "/game/{gameId}/initGame")
    public ApiResult<Game> initGame(@PathVariable("gameId") Long gameId) {
        Game game = gameService.findGame(gameId);
        ApiResult<Game> apiResult = new ApiResult();
        if (game == null) {
            apiResult.setMessage("Game not found");
            apiResult.setStatus(false);
            apiResult.setHttpStatus(HttpStatus.BAD_REQUEST);
            return apiResult;
        }
        if(game.getDeck().size() < 52) {
            List<Card> deck = gameService.generateDeck();
            game.setDeck(deck);
        }
        List<Player> playerList = game.getPlayerList();
        for (Player p : playerList) {
            blackJackService.distributeCard(game, p, 2);
        }
        apiResult.setStatus(true);
        apiResult.setResult(game);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }


    @GetMapping("/game/all")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> blackJackGames = gameService.findGamesByGameType(GameType.BLACKJACK);
        return new ResponseEntity<>(blackJackGames, HttpStatus.OK);
    }


}
