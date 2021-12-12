package com.jee.backend.api;

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

//    @PostMapping("/card")
//    public ResponseEntity<Card> createGame() {
//
//        Card newCard = new Card(1, Symbol.PAPER,null);
//        Card card = cardService.addCard(newCard);
//        return new ResponseEntity<>(card, HttpStatus.CREATED);
//    }

    @PostMapping("/create")
    public ResponseEntity<ApiResult<Game>> createGame(@RequestParam("ia") boolean ia) {
        GameType gameName = GameType.CHIFUMI;
        List<Player> playerList = new ArrayList<>();
        List<Card> hand = shifumiService.initPlayerHand();
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
        Player player = new Player((User) newUser, hand, score);
        playerList.add(player);
        int maxPlayers = 2;
        if(ia) {
            hand = shifumiService.initPlayerHand();
            player = new Player(null, hand,score);
            playerList.add(player);
        }
        Game game = gameService.createGame(new Game(gameName, null, playerList, maxPlayers, ia));
        apiResult.setResult(game);
        apiResult.setStatus(true
        );
        apiResult.setMessage("Partie crée avec succès !");
        return new ResponseEntity<>(apiResult, HttpStatus.CREATED);
    }


    @GetMapping("/game/{id}")
    public ResponseEntity<Game> getGame(@PathVariable("id") Long gameId) {
        Game game = gameService.findGame(gameId);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("/game/all")
    public ResponseEntity<List<Game>> getAllGames() {
        List<Game> shifumiGames = gameService.findGamesByGameType(GameType.CHIFUMI);
        return new ResponseEntity<>(shifumiGames, HttpStatus.OK);
    }

    @PostMapping("/join/{gameId}")
    public ResponseEntity<Game> joinGame(@PathVariable("gameId") Long gameId) {
        Game game = gameService.findGame(gameId);
        if(game.getPlayerList().size() < game.getMaxPlayers()) {
            int score = 0;
            List<Card> hand = shifumiService.initPlayerHand();
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

    @DeleteMapping("/delete/{gameId}")
    public ResponseEntity<Game> deleteGame(@PathVariable("id") Long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/game/{gameId}/play", consumes = "application/json")
    @ResponseBody
    public ApiResult<Game> getWinner(@PathVariable("gameId") Long gameId, @RequestBody List<Symbol> symbolList) {
        Game game = gameService.findGame(gameId);
        ApiResult<Game> apiResult = new ApiResult();
        List<Player> playerList = game.getPlayerList();
        Card firstPlayerCard = cardService.getCardBySymbol(playerList.get(0).getHand(), symbolList.get(0));
        Card secondPlayerCard = cardService.getCardBySymbol(playerList.get(1).getHand(), symbolList.get(1));
        if(firstPlayerCard == null || secondPlayerCard == null) {
            apiResult.setMessage("Error with cards : atleast one card is null");
            apiResult.setStatus(false);
            apiResult.setHttpStatus(HttpStatus.BAD_REQUEST);
            return apiResult;
        }
        int result = shifumiService.turnWinner(firstPlayerCard, secondPlayerCard);
        if(result != -1)  {
            Player winner = playerList.get(result);
            int score = winner.getScore();
            winner.setScore(score + 1);
            if(result == 1) {
                Player loser = playerList.get(0);
                playerList = new ArrayList<>();
                playerList.add(loser);
                playerList.add(winner);
            }else {
                Player loser = playerList.get(1);
                playerList = new ArrayList<>();
                playerList.add(winner);
                playerList.add(loser);
            }
            gameService.updateGame(game);
        }


        apiResult.setStatus(true);
        apiResult.setResult(game);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }
    }
