package com.jee.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.List;


@Entity
@Getter
@Setter
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false, name = "gameId")
    private Long id;

    @Column(nullable = false, name ="name")
    private GameType name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "deck_cards")
    private List<Card> deck;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "game_players")
    private List<Player> playerList;

    private int maxPlayers;

    @Column(nullable = false)
    private boolean ia;

    public Game() {}

    public Game(GameType name, List<Card> deck, List<Player> playerList, int maxPlayers, boolean ia) {
        this.name = name;
        this.deck = deck;
        this.playerList = playerList;
        this.maxPlayers = maxPlayers;
        this.ia = ia;
    }



}
