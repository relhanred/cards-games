package com.jee.backend.service;

import com.jee.backend.model.Card;
import com.jee.backend.model.Color;
import com.jee.backend.model.Game;
import com.jee.backend.model.Symbol;
import com.jee.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BlackJackService {


    private GameService gameService;

    private CardService cardService;


    public BlackJackService(CardService cardService, GameService gameService) {
        this.cardService = cardService;
        this.gameService = gameService;
    }

    public Card distributeCard(Long gameId) {
        Game game = gameService.findGame(gameId);
        List<Card> deck = game.getDeck();
        int random = new Random().nextInt(deck.size());
        Card card = deck.get(random);
        deck.remove(card);
        cardService.deleteCard(card.getId());
        game.setDeck(deck);
        gameService.updateGame(game);
        return card;
    }
}
