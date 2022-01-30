import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend/game/";


class GameService {

    getGame(id) {
        return axios
            .get(API_URL + id, {
                headers: authHeader(),
                
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

    getGames() {
        return axios
            .get(API_URL + "user", {
                headers: authHeader(),
                
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

    deleteGame(id) {
        return axios
            .delete(API_URL + id, {
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

export default new GameService();




