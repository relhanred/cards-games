package com.jee.backend.service;

import com.jee.backend.model.*;
import com.jee.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BlackJackService {


    private final GameService gameService;

    private final PlayerService playerService;


    public BlackJackService(GameService gameService, PlayerService playerService) {
        this.gameService = gameService;
        this.playerService = playerService;
    }

    public List<Card> distributeCard(Game game, Player player, int nbCard) {
        List<Card> deck = game.getDeck();
        List<Player> playerList = game.getPlayerList();
        for(int i = 0; i < playerList.size(); i++) {
            if(playerList.get(i).getId() == player.getId()) {
                List<Card> cardList = playerList.get(i).getHand();
                int score = playerList.get(i).getScore();
                for(int j = 0; j < nbCard; j++) {
                    int random = new Random().nextInt(deck.size());
                    Card card = deck.get(random);
                    int cardScore = card.getNumber();
                    if(card.getNumber() > 1 && card.getNumber() < 10) {
                        score += cardScore;
                    }else if(card.getNumber() > 10) {
                        score += 10;
                    }else {
                        if((score + 10) > 21) {
                            score += 1;
                        }else {
                            score += 10;
                        }
                    }
                    deck.remove(card);
                    cardList.add(card);
                }
                playerList.get(i).setHand(cardList);
                playerList.get(i).setScore(score);
                playerService.updatePlayer(player);
            }
        }
        return deck;
    }
}
