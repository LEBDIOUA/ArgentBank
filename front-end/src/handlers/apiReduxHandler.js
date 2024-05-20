import { login, updateUser, logout } from "../redux/userSlice";
import API from "../api/apiService";
import User from "../models/user";

class ApiReduxHandler {

    static api = API.getInstance();
    static user = null;

    static async authenticate(dispatch, email, password) {
        let error = null;
        ApiReduxHandler.user = new User(null, null, null, email, password);
        try {
            const { token, data, err } = await ApiReduxHandler.api.fetchUser(ApiReduxHandler.user);
            if (data) {
                dispatch(login({ id: token, firstName: data.firstName, lastName: data.lastName, email: ApiReduxHandler.user.email, password: ApiReduxHandler.user.password }));
                if (localStorage.getItem('rememberMe')) {
                    ApiReduxHandler.rememberMe(token, ApiReduxHandler.user.email, ApiReduxHandler.user.password);
                }
                return null;
            }
            if (err) {
                if (err.includes("User not found!")) {
                    error = "User not found!";
                }
                else if (err && err.includes("Password is invalid")) {
                    error = "Password is invalid!";
                }
                else if (err && err.includes("Failed to fetch")) {
                    error = "Erreur de connexion";
                }
            }
        } catch (err) {
            console.log(err);
            error = err;
        }
        return error;
    }

    static async registration(dispatch, firstname, lastname, email, password) {
        let error = null;
        try {
            ApiReduxHandler.user = new User(null, firstname, lastname, email, password);
            const response = await ApiReduxHandler.api.signUpUser(ApiReduxHandler.user);
            if (response && response.data) {
                dispatch(login({ id: response.token, firstName: ApiReduxHandler.user.firstName, lastName: ApiReduxHandler.user.lastName, email: ApiReduxHandler.user.email, password: ApiReduxHandler.user.password }));
                error = null;
            }
            else if (response.err) {
                error = response.err
            }
        } catch (err) {
            console.log(err);
            error = err;
        }
        return error;
    }

    static async modifyUser(dispatch, firstNameValue, lastNameValue) {
        const ok = true;
        dispatch(updateUser({ firstName: firstNameValue, lastName: lastNameValue }));

        ApiReduxHandler.user = {
            firstName: firstNameValue,
            lastName: lastNameValue,
        };

        const { data, err } = await ApiReduxHandler.api.setUser(ApiReduxHandler.user);
        if (err) {
            return !ok;
        }
        return ok;
    }

    static logout(dispatch) {
        dispatch(logout(null));
        API.token = null;
    }

    static rememberMe(token, email, password) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    }
}

export default ApiReduxHandler;