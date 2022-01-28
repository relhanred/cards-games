import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend/blackjack";


class BlackJackService {

    create(initForm) {
        return axios
            .post(API_URL + "/create", initForm, {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

    initGame(gameId) {
        return axios
            .get(API_URL + "/game/"+gameId+"/initGame",{
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

    pickCard(gameId, player) {
        return axios
            .post(API_URL + "/game/"+gameId+"/pick", player, {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

}

export default new BlackJackService();




