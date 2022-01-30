import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend/users/";


class UserService {
    updateUser(id, user) {
        return axios
            .post(API_URL + "update/" + id, user, {
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

export default new UserService();




