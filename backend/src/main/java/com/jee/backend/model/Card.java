package com.jee.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false, name = "cardId")
    private Long id;

    private int number;

    private Symbol symbol;

    private Color color;

    public Card() {}

    public Card(int number, Symbol symbol, Color color) {
        this.number = number;
        this.symbol = symbol;
        this.color = color;
    }

}
