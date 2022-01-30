package com.jee.backend.repository;

import com.jee.backend.model.Game;
import com.jee.backend.model.GameType;
import com.jee.backend.model.Player;
import com.jee.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByName(GameType gameType);
}
