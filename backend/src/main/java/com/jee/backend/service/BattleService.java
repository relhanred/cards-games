package com.jee.backend.service;

import com.jee.backend.model.Card;
import com.jee.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BattleService {

    private final GameRepository gameRepository;


    public BattleService(GameRepository gameRepository)  {
        this.gameRepository = gameRepository;
    }


    public int turnWinner(Card cardFirstPLayer, Card cardSecondPlayer) {
        if (cardFirstPLayer.getNumber() == cardSecondPlayer.getNumber()) {
            return -1;
        }
        if (cardFirstPLayer.getNumber() == 1 || (cardFirstPLayer.getNumber() > cardSecondPlayer.getNumber())) {
            return 0;
        }
        return 1;
    }
}
