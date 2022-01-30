package com.jee.backend.service;

import com.jee.backend.model.*;
import com.jee.backend.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class GameService {

    private final GameRepository gameRepository;

    private CardService cardService;

    @Autowired
    public GameService(GameRepository gameRepo, CardService cardService) {

        this.gameRepository = gameRepo;
        this.cardService = cardService;
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public List<Game> findGamesByGameType(GameType gameType) {
        return gameRepository.findByName(gameType);
    }

    public Game findGame(Long id) {
        return gameRepository.findById(id).get();
    }

    public List<Game> findAllGames() {
        return gameRepository.findAll();
    }

    public void deleteGame(Long gameId) {
        gameRepository.deleteById(gameId);
    }

    public Game updateGame(Game game) {return gameRepository.save(game);}

    public List<Game> findByUser(User user) {
        List<Game> gameList = gameRepository.findAll();
        List<Game> games = new ArrayList<>();
        for(Game game : gameList) {
            if(game.getManche() < game.getMaxManche()) {
                for(Player p: game.getPlayerList()) {
                    if(p.getUser() != null) {
                        if(p.getUser().getId().longValue() == user.getId().longValue()) {
                            games.add(game);
                        }
                    }
                }
            }
        }
        return games;
    }

    public List<Card> generateDeck() {
        List<Card> cardList = new ArrayList<>();
        List<Symbol> blackJackSymbol = new ArrayList<>();
        blackJackSymbol.add(Symbol.HEART);
        blackJackSymbol.add(Symbol.DIAMOND);
        blackJackSymbol.add(Symbol.SPADE);
        blackJackSymbol.add(Symbol.CLUB);
        for(int i = 0; i < blackJackSymbol.size(); i++) {
            for(int j = 1; j <= 13; j++) {
                Color color = Color.RED;
                if(i >= 2) {
                    color = Color.BLACK;
                }
                Card newCard = new Card(j, blackJackSymbol.get(i), color);
                Card card = cardService.addCard(newCard);
                cardList.add(card);

            }
        }
        return cardList;
    }



}
