package com.jee.backend.service;

import com.jee.backend.model.Card;
import com.jee.backend.model.Symbol;
import com.jee.backend.model.User;
import com.jee.backend.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card addCard(Card card) {
        return cardRepository.save(card);
    }

    public List<Card> findAllCards() {
        return cardRepository.findAll();
    }

    public Card findCard(Long id) {
        return cardRepository.findById(id).get();
    }

    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    public Card getCardBySymbol(List<Card> cardList, Symbol symbol) {
        for(Card card: cardList) {
            if(card.getSymbol() == symbol) {
                return card;
            }
        }
        return null;
    }
}
