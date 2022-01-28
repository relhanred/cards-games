import React from 'react';
import * as Gi from 'react-icons/gi'

function GameCard(props) {

    const getCard = () => {
        if (props.symbol === "HEART") {
            switch (props.number) {
                case 1:
                    return <Gi.GiCardAceHearts size={props.size} color={props.color.toLowerCase()} />
                case 2:
                    return <Gi.GiCard2Hearts size={props.size} color={props.color.toLowerCase()} />
                case 3:
                    return <Gi.GiCard3Hearts size={props.size} color={props.color.toLowerCase()} />
                case 4:
                    return <Gi.GiCard4Hearts size={props.size} color={props.color.toLowerCase()} />
                case 5:
                    return <Gi.GiCard5Hearts size={props.size} color={props.color.toLowerCase()} />
                case 6:
                    return <Gi.GiCard6Hearts size={props.size} color={props.color.toLowerCase()} />
                case 7:
                    return <Gi.GiCard7Hearts size={props.size} color={props.color.toLowerCase()} />
                case 8:
                    return <Gi.GiCard8Hearts size={props.size} color={props.color.toLowerCase()} />
                case 9:
                    return <Gi.GiCard9Hearts size={props.size} color={props.color.toLowerCase()} />
                case 10:
                    return <Gi.GiCard10Hearts size={props.size} color={props.color.toLowerCase()} />
                case 11:
                    return <Gi.GiCardJackHearts size={props.size} color={props.color.toLowerCase()} />
                case 12:
                    return <Gi.GiCardQueenHearts size={props.size} color={props.color.toLowerCase()} />
                case 13:
                    return <Gi.GiCardKingHearts size={props.size} color={props.color.toLowerCase()} />
            }
        } else if (props.symbol === "SPADE") {
            switch (props.number) {
                case 1:
                    return <Gi.GiCardAceSpades size={props.size} color={props.color.toLowerCase()} />
                case 2:
                    return <Gi.GiCard2Spades size={props.size} color={props.color.toLowerCase()} />
                case 3:
                    return <Gi.GiCard3Spades size={props.size} color={props.color.toLowerCase()} />
                case 4:
                    return <Gi.GiCard4Spades size={props.size} color={props.color.toLowerCase()} />
                case 5:
                    return <Gi.GiCard5Spades size={props.size} color={props.color.toLowerCase()} />
                case 6:
                    return <Gi.GiCard6Spades size={props.size} color={props.color.toLowerCase()} />
                case 7:
                    return <Gi.GiCard7Spades size={props.size} color={props.color.toLowerCase()} />
                case 8:
                    return <Gi.GiCard8Spades size={props.size} color={props.color.toLowerCase()} />
                case 9:
                    return <Gi.GiCard9Spades size={props.size} color={props.color.toLowerCase()} />
                case 10:
                    return <Gi.GiCard10Spades size={props.size} color={props.color.toLowerCase()} />
                case 11:
                    return <Gi.GiCardJackSpades size={props.size} color={props.color.toLowerCase()} />
                case 12:
                    return <Gi.GiCardQueenSpades size={props.size} color={props.color.toLowerCase()} />
                case 13:
                    return <Gi.GiCardKingSpades size={props.size} color={props.color.toLowerCase()} />
            }
        } else if (props.symbol === "CLUB") {
            switch (props.number) {
                case 1:
                    return <Gi.GiCardAceClubs size={props.size} color={props.color.toLowerCase()} />
                case 2:
                    return <Gi.GiCard2Clubs size={props.size} color={props.color.toLowerCase()} />
                case 3:
                    return <Gi.GiCard3Clubs size={props.size} color={props.color.toLowerCase()} />
                case 4:
                    return <Gi.GiCard4Clubs size={props.size} color={props.color.toLowerCase()} />
                case 5:
                    return <Gi.GiCard5Clubs size={props.size} color={props.color.toLowerCase()} />
                case 6:
                    return <Gi.GiCard6Clubs size={props.size} color={props.color.toLowerCase()} />
                case 7:
                    return <Gi.GiCard7Clubs size={props.size} color={props.color.toLowerCase()} />
                case 8:
                    return <Gi.GiCard8Clubs size={props.size} color={props.color.toLowerCase()} />
                case 9:
                    return <Gi.GiCard9Clubs size={props.size} color={props.color.toLowerCase()} />
                case 10:
                    return <Gi.GiCard10Clubs size={props.size} color={props.color.toLowerCase()} />
                case 11:
                    return <Gi.GiCardJackClubs size={props.size} color={props.color.toLowerCase()} />
                case 12:
                    return <Gi.GiCardQueenClubs size={props.size} color={props.color.toLowerCase()} />
                case 13:
                    return <Gi.GiCardKingClubs size={props.size} color={props.color.toLowerCase()} />
            }
        } else {
            switch (props.number) {
                case 1:
                    return <Gi.GiCardAceDiamonds size={props.size} color={props.color.toLowerCase()} />
                case 2:
                    return <Gi.GiCard2Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 3:
                    return <Gi.GiCard3Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 4:
                    return <Gi.GiCard4Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 5:
                    return <Gi.GiCard5Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 6:
                    return <Gi.GiCard6Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 7:
                    return <Gi.GiCard7Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 8:
                    return <Gi.GiCard8Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 9:
                    return <Gi.GiCard9Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 10:
                    return <Gi.GiCard10Diamonds size={props.size} color={props.color.toLowerCase()} />
                case 11:
                    return <Gi.GiCardJackDiamonds size={props.size} color={props.color.toLowerCase()} />
                case 12:
                    return <Gi.GiCardQueenDiamonds size={props.size} color={props.color.toLowerCase()} />
                case 13:
                    return <Gi.GiCardKingDiamonds size={props.size} color={props.color.toLowerCase()} />
            }
        }
    }

    return (
        <div>
            {getCard()}
        </div>
    );
}

export default GameCard;