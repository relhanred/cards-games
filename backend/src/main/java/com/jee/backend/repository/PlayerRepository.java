package com.jee.backend.repository;

import com.jee.backend.model.Player;
import com.jee.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Player findPlayerByUser(User user);

}
