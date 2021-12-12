package com.jee.backend.service;

import com.jee.backend.model.Card;
import com.jee.backend.model.Player;
import com.jee.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlayerService {

    private PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public void removePlayer(Long playerId) {
        playerRepository.deleteById(playerId);
    }

    public Player updatePlayer(Player player) {
        return playerRepository.save(player);
    }

}

