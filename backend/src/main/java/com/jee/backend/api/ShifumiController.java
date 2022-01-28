package com.jee.backend.api;

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
@RequestMapping("/shifumi")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ShifumiController {

    private final ShifumiService shifumiService;

    private final GameService gameService;

    private final PlayerService playerService;

    private final CardService cardService;

    private final UserService userService;

    public ShifumiController(GameService gameService, PlayerService playerService, CardService cardService, ShifumiService shifumiService, UserService userService) {
        this.shifumiService = shifumiService;
        this.gameService = gameService;
        this.playerService = playerService;
        this.cardService = cardService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResult<Game>> createGame(@RequestBody InitForm initForm) {
        GameType gameName = GameType.CHIFUMI;
        List<Player> playerList = new ArrayList<>();
        List<Card> hand = shifumiService.initPlayerHand();
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
        Player player = new Player((User) newUser, hand, score);
        playerList.add(player);
        int maxPlayers = 2;
        if (initForm.ia) {
            hand = shifumiService.initPlayerHand();
            player = new Player(null, hand, score);
            playerList.add(player);
        }
        Game game = gameService.createGame(new Game(gameName, null, playerList, maxPlayers, initForm.manche, 0, initForm.ia));
        apiResult.setResult(game);
        apiResult.setStatus(true);
        apiResult.setMessage("Partie crée avec succès !");
        return new ResponseEntity<>(apiResult, HttpStatus.CREATED);
    }


    @GetMapping("/game/all")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> shifumiGames = gameService.findGamesByGameType(GameType.CHIFUMI);
        return new ResponseEntity<>(shifumiGames, HttpStatus.OK);
    }

    @PostMapping("/join/{gameId}")
    public ResponseEntity<Game> joinGame(@PathVariable("gameId") Long gameId) {
        Game game = gameService.findGame(gameId);
        if (game.getPlayerList().size() < game.getMaxPlayers()) {
            int score = 0;
            List<Card> hand = shifumiService.initPlayerHand();
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            UserDetails newUser = userService.loadUserByUsername(user.getEmail());
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
    public ApiResult<Game> getWinner(@PathVariable("gameId") Long gameId, @RequestBody List<Symbol> symbolList) {
        Game game = gameService.findGame(gameId);
        ApiResult<Game> apiResult = new ApiResult();
        List<Player> playerList = game.getPlayerList();
        Card firstPlayerCard = cardService.getCardBySymbol(playerList.get(0).getHand(), symbolList.get(0));
        Card secondPlayerCard = cardService.getCardBySymbol(playerList.get(1).getHand(), symbolList.get(1));
        if (firstPlayerCard == null || secondPlayerCard == null) {
            apiResult.setMessage("Error with cards : atleast one card is null");
            apiResult.setStatus(false);
            apiResult.setHttpStatus(HttpStatus.BAD_REQUEST);
            return apiResult;
        }
        int result = shifumiService.turnWinner(firstPlayerCard, secondPlayerCard);
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
        gameService.updateGame(game);
        apiResult.setStatus(true);
        apiResult.setResult(game);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }
}
