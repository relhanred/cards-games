import axios from 'axios';

const API_URL = "http://localhost:8888/backend/users/";


class AuthService {

    login(loginForm) {
        return axios
            .post(API_URL + "auth/signin", loginForm)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(response.data.result));
                }
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }
    
    logout() {
        localStorage.removeItem("user");
    } 

    signUp(signUpForm) {
        return axios
            .post(API_URL + "auth/add", signUpForm)
            .then((response) => {
                return response;
            })
            .catch(e => {
                return e.response;
            });
    }

}

export default new AuthService();




