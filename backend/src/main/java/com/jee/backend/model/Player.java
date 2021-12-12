package com.jee.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.List;

@Getter
@Setter
@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Card> hand;

    private int score;

    public Player() {}

    public Player(User user, List<Card> hand, int score) {
        this.user = user;
        this.hand = hand;
        this.score = score;
    }
}
