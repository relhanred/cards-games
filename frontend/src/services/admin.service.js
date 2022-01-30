import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8888/backend";

class AdminService {

    getAllPlayers() {
        return axios
            .get(API_URL + "/player/admin/all", {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

    deletePlayer(id) {
        return axios
            .delete(API_URL + "/users/admin/delete/" + id, {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }



    getAllUsers() {
        return axios
            .get(API_URL + "/users/admin/all", {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }


    getAllGames() {
        return axios
            .get(API_URL + "/game/admin/all", {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

    addAdmin(signUpForm) {
        return axios
            .post(API_URL + "/users/admin/addAdmin", signUpForm, {
                headers: authHeader()
            })
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });

    }

    generatePdf() {
        return API_URL + "/users/admin/pdf";
    }

}

export default new AdminService();




