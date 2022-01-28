import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend/battle";

class BattleService {

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

    play(id, cardList) {
        return axios
            .post(API_URL + "/game/"+id+"/play", cardList, {
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

export default new BattleService();




