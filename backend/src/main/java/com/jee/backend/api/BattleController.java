package com.jee.backend.api;

import com.jee.backend.forms.BlackJackInitForm;
import com.jee.backend.forms.InitForm;
import com.jee.backend.model.*;
import com.jee.backend.service.*;
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
@RequestMapping("/battle")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BattleController {


    private final PlayerService playerService;

    private final GameService gameService;

    private final UserService userService;

    private final BattleService battleService;

    private final CardService cardService;

    public BattleController(PlayerService playerService, GameService gameService, UserService userService, BattleService battleService, CardService cardService) {
        this.playerService = playerService;
        this.gameService = gameService;
        this.userService = userService;
        this.battleService = battleService;
        this.cardService = cardService;
    }

    @PostMapping(value = "/create", consumes = "application/json")
    public ResponseEntity<ApiResult<Game>> createGame(@RequestBody InitForm initForm) {
        GameType gameName = GameType.BATTLE;
        List<Player> playerList = new ArrayList<>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ApiResult<Game> apiResult = new ApiResult<>();
        if(auth.getPrincipal() == "anonymousUser") {
            apiResult.setResult(null);
            apiResult.setStatus(false);
            apiResult.setMessage("Vous devez être connecté pour créer une partie");
            return new ResponseEntity<>(apiResult, HttpStatus.FORBIDDEN);
        }
        User user = (User) auth.getPrincipal();
        UserDetails newUser =  userService.loadUserByUsername(user.getEmail());
        int score = 0;
        List<Card> hand = gameService.generateDeck();
        Player player = new Player((User) newUser, hand, score);
        playerList.add(player);
        int maxPlayers = 2;
        if(initForm.ia) {
            hand = gameService.generateDeck();
            player = new Player(null, hand, score);
            playerList.add(player);
        }
        Game game = gameService.createGame(new Game(gameName, null, playerList, maxPlayers, initForm.manche, 0, initForm.ia));
        apiResult.setResult(game);
        apiResult.setStatus(true);
        apiResult.setMessage("Partie crée avec succès !");
        return new ResponseEntity<>(apiResult, HttpStatus.CREATED);
    }

    @PostMapping("/join/{gameId}")
    public ResponseEntity<Game> joinGame(@PathVariable("gameId") Long gameId) {
        Game game = gameService.findGame(gameId);
        if(game.getPlayerList().size() < game.getMaxPlayers()) {
            int score = 0;
            List<Card> hand = gameService.generateDeck();
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            UserDetails newUser =  userService.loadUserByUsername(user.getEmail());
            Player player = new Player((User) newUser, hand, score);
            List<Player> playerList = game.getPlayerList();
            playerList.add(player);
            game.setPlayerList(playerList);
            playerService.createPlayer(player);
            gameService.updateGame(game);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @PostMapping(value = "/game/{gameId}/play", consumes = "application/json")
    @ResponseBody
    public ApiResult<Game> getWinner(@PathVariable("gameId") Long gameId, @RequestBody List<Card> cardList) {
        Game game = gameService.findGame(gameId);
        ApiResult<Game> apiResult = new ApiResult();
        List<Player> playerList = game.getPlayerList();
        if (cardList.get(0) == null || cardList.get(1) == null) {
            apiResult.setMessage("Error with cards : atleast one card is null");
            apiResult.setStatus(false);
            apiResult.setHttpStatus(HttpStatus.BAD_REQUEST);
            return apiResult;
        }
        int result = battleService.turnWinner(cardList.get(0), cardList.get(1));
        if (result != -1) {
            Player firstPlayer = playerList.get(0);
            Player secondPlayer = playerList.get(1);
            if (result == 0) {
                firstPlayer.setScore(firstPlayer.getScore() + 1);
                game.setLastWinner(firstPlayer);
            } else {
                secondPlayer.setScore(secondPlayer.getScore() + 1);
                game.setLastWinner(secondPlayer);
            }
            playerList = new ArrayList<>();
            playerList.add(firstPlayer);
            playerList.add(secondPlayer);
        }
        if (result == -1) {
            game.setLastWinner(null);
        }
        if (game.getManche() < game.getMaxManche()) {
            game.setManche(game.getManche() + 1);
        }
        cardService.deleteCard(cardList.get(0).getId());
        cardService.deleteCard(cardList.get(1).getId());
        gameService.updateGame(game);
        apiResult.setStatus(true);
        apiResult.setResult(game);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }

    @GetMapping("/game/all")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> blackJackGames = gameService.findGamesByGameType(GameType.BATTLE);
        return new ResponseEntity<>(blackJackGames, HttpStatus.OK);
    }

}
