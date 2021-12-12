package com.jee.backend.service;

import com.jee.backend.repository.GameRepository;

public class BattleService {

    private final GameRepository gameRepository;


    public BattleService(GameRepository gameRepository)  {
        this.gameRepository = gameRepository;
    }


}
