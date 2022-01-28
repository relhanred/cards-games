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

    private int maxManche;

    private int manche;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "winner_player")
    private Player lastWinner;

    private boolean ia;

    public Game() {}

    public Game(GameType name, List<Card> deck, List<Player> playerList, int maxPlayers, int maxManche, int manche,  boolean ia) {
        this.name = name;
        this.deck = deck;
        this.playerList = playerList;
        this.maxPlayers = maxPlayers;
        this.maxManche = maxManche;
        this.manche = manche;
        this.ia = ia;
    }



}
