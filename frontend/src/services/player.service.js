import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend/player/";


class PlayerService {

    getPlayer(id) {
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

    getAllPlayers() {
        return axios
            .delete(API_URL + "all", {
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

export default new PlayerService();




