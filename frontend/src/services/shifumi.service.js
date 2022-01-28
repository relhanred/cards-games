import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend/shifumi";


class ShifumiService {

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

    play(id, symbolList) {
        return axios
            .post(API_URL + "/game/"+id+"/play", symbolList, {
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

export default new ShifumiService();




