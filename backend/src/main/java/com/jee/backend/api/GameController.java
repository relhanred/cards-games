package com.jee.backend.api;

import com.jee.backend.model.Game;
import com.jee.backend.model.Player;
import com.jee.backend.model.User;
import com.jee.backend.service.GameService;
import com.jee.backend.service.PlayerService;
import com.jee.backend.service.UserService;
import com.jee.backend.utils.ApiResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "*", maxAge = 3600)
public class GameController {

    private final GameService gameService;

    private final UserService userService;

    public GameController(GameService gameService, UserService userService) {
        this.gameService = gameService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGame(@PathVariable("id") Long gameId) {
        Game game = gameService.findGame(gameId);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("/admin/all")
    public ApiResult<List<Game>> getAllGames() {
        ApiResult<List<Game>> apiResult = new ApiResult();
        List<Game> gameList = gameService.findAllGames();
        apiResult.setStatus(true);
        apiResult.setResult(gameList);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }

    @GetMapping("/player/{id}")
    public ApiResult<List<Game>> getPlayerGames(@PathVariable("id") Long userId) {
        ApiResult<List<Game>> apiResult = new ApiResult();
        User user =  this.userService.findUser(userId);
        if(user == null) {
            apiResult.setStatus(false);
            apiResult.setMessage("Player is null");
            apiResult.setHttpStatus(HttpStatus.BAD_REQUEST);
            return apiResult;
        }
        List<Game> gameListByPlayer = new ArrayList<>();
        for(Game game : gameService.findAllGames()) {
            for(Player p : game.getPlayerList()) {
                if(p.getUser() != null) {
                    if(p.getUser().getId() == user.getId()) {
                        gameListByPlayer.add(game);
                    }
                }
            }
        }
        apiResult.setStatus(true);
        apiResult.setResult(gameListByPlayer);
        apiResult.setHttpStatus(HttpStatus.OK);
        return apiResult;
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<Game> deleteGame(@PathVariable("id") Long gameId) {
        gameService.deleteGame(gameId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
