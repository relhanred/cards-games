package com.jee.backend.service;

import com.jee.backend.model.Card;
import com.jee.backend.model.Symbol;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ShifumiService  {


    private CardService cardService;

    public ShifumiService(CardService cardService) {
        this.cardService = cardService;
    }

    /**
     * @param cardFirstPLayer
     * @param cardSecondPlayer
     * @return -1 no winner
     *          0 firstPlayer won
     *          1 secondPlayer won
     */
    public int turnWinner(Card cardFirstPLayer, Card cardSecondPlayer) {
        if (cardFirstPLayer.getSymbol() == cardSecondPlayer.getSymbol()) {
            return -1;
        }
        if (cardFirstPLayer.getSymbol() == Symbol.PAPER && cardSecondPlayer.getSymbol() == Symbol.ROCK
                || cardFirstPLayer.getSymbol() == Symbol.SCISSORS && cardSecondPlayer.getSymbol() == Symbol.PAPER
                || cardFirstPLayer.getSymbol() == Symbol.ROCK && cardSecondPlayer.getSymbol() == Symbol.SCISSORS) {
            return 0;
        }
        return 1;
    }

    public List<Card> initPlayerHand() {
        List<Card> hand = new ArrayList<>();
        Card card = new Card(1, Symbol.PAPER,null);
        hand.add(card);
        card = new Card(2, Symbol.ROCK,null);
        hand.add(card);
        card = new Card(3, Symbol.SCISSORS,null);
        hand.add(card);
        return hand;
    }

}
