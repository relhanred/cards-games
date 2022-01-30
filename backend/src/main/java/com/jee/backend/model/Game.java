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

    private int maxManche;

    private int manche;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "last_winner_player")
    private Player lastWinner;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "winner")
    private Player winner;

    private GameStatus gameStatus;

    public Game() {}

    public Game(GameType name, List<Card> deck, List<Player> playerList, int maxManche, int manche,  GameStatus gameStatus) {
        this.name = name;
        this.deck = deck;
        this.playerList = playerList;
        this.maxManche = maxManche;
        this.manche = manche;
        this.gameStatus = gameStatus;
    }



}
