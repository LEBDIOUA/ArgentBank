import { login, logout } from "../redux/userSlice";
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
                ApiReduxHandler.user.setId(token);
                ApiReduxHandler.user.setName(data.firstName, data.lastName);
                dispatch(login(ApiReduxHandler.user));
            }
            if (err) {
                if (err[0].includes("User not found!")) {
                    error = "User not found!";
                }
                else if (err[0].includes("Password is invalid")) {
                    error = "Password is invalid!";
                }
                else if (err[0].includes("CONNECTION REFUSED")) {
                    error = "Erreur de connexion";
                }
                return error;
            }
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    static async registration(dispatch, firstname, lastname, email, password) {
        let error = null;
        try {
            ApiReduxHandler.user = new User(null, firstname, lastname, email, password);
            const response = await ApiReduxHandler.api.signUpUser(ApiReduxHandler.user);
            if (response && response.data) {
                ApiReduxHandler.user.setId(response.token);
                dispatch(login(ApiReduxHandler.user));
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

        const { token, data, err } = await ApiReduxHandler.api.setUser({ firstName: firstNameValue, lastName: lastNameValue });

        if (err) {
            return !ok;
        }

        ApiReduxHandler.user = new User(token, data.firstName, data.lastName, data.email, data.password);
        dispatch(login(ApiReduxHandler.user));

        return ok;
    }

    static logout(dispatch) {
        API.token = null;
        dispatch(logout());
    }
}

export default ApiReduxHandler;