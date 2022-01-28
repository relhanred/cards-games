package com.jee.backend.forms;

import com.jee.backend.model.Player;
import com.jee.backend.model.Symbol;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShifumiForm {

    Player firstPlayer;

    Symbol firstCard;

    Player secondPlayer;

    Symbol secondCard;
}
