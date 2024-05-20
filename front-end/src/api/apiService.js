import axios from 'axios';

class API {
    static instance = null;
    static token =  null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new API();
        }

        return (this.instance);
    }

    constructor() {
        this.DB_URL = "http://localhost:3001";
        this.data = [];
        this.err = [];
    }

    buildEndpoint(endpoint) {
        switch (endpoint) {
            case "GET_LOGIN":
                return { url: "/api/v1/user/login", content_type: 'application/json' };
            case "GET_SIGNUP":
                return { url: "/api/v1/user/signup", content_type: 'application/json' };
            case "GET_USER":
                return { url: "/api/v1/user/profile", content_type: 'application/json' };
            case "SET_USER":
                return { url: "/api/v1/user/profile", content_type: 'application/json' };
        }
    }

    checkURL = async () => {
        try {
            const response = await fetch(this.DB_URL);
        }
        catch (error) {
            this.err.push(error ? error.message : 'error');
        }
    }

    loginUser = async (user) => {
        this.checkURL();
        if (this.err.length == 0) { 
            const endpointConfig = this.buildEndpoint("GET_LOGIN")
            const finalURL = this.DB_URL + endpointConfig.url;

            try {
                const response = await axios.post(finalURL, JSON.stringify(user), {
                    headers: {
                        'Content-Type': endpointConfig.content_type
                    }
                })
                if (response.status == 200) {
                    const responseData = response.data;
                    // console.log('Connexion avec succès: ', responseData);
                    return responseData.body.token;
                } else {
                    this.err.push(`Login failed. ${JSON.parse(errorMessage).message}`);
                }
            }
            catch (error) {
                this.err.push(error ? error.message : 'error');
            }
        }
    }

    signUpUser = async (user) => {
        this.checkURL();
        if (this.err.length == 0) {
            const endpointConfig = this.buildEndpoint("GET_SIGNUP")
            const finalURL = this.DB_URL + endpointConfig.url;

            try {
                const response = await axios.post(finalURL, JSON.stringify(user), {
                    headers: {
                        'Content-Type': endpointConfig.content_type
                    }
                })
                if (response.status === 200) {
                    const responseData = response.json();
                    // console.log('Inscription réussie: ', responseData);
                    return { token: this.loginUser(responseData.body.email, responseData.body.password), data: data, err: null };
                } else {
                    this.err.push(`Login failed. ${JSON.parse(errorMessage).message}`);
                }
            }
            catch (error) {
                this.err.push(error ? error.message : 'error');
            }
            console.log('Error ! ', this.err.join('; '))
            return { data: null, err: this.err.join('; ') };
        }
    }

    fetchUser = async (user) => {
        this.err = [];
        this.token = await this.loginUser(user);

        if (!this.token) { 
            this.token = await this.loginUser(user);
        }

        if (this.token) {
            const endpointConfig = this.buildEndpoint("GET_USER")
            const finalURL = this.DB_URL + endpointConfig.url;
            try {
                const response = await axios.post(finalURL, 
                    { key: 'value' }, 
                    { headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                if (response.status == 200) {
                    const userdata = response.data;
                    // console.log('Profil utilisateur récupéré avec succès: ', userdata);
                    return {token: this.token, data: userdata.body, err: null };
                } else {
                    throw new Error(`Erreur lors de la récupération du profil utilisateur: ${response.status}`);
                }

            } catch (error) {
                this.err.push(error)
            }
        }
        return { data: null, err: this.err.join(', ') };
    }

    setUser = async (user) => {
        this.err = [];

        if (this.token) {
            const endpointConfig = this.buildEndpoint("SET_USER");
            const finalURL = this.DB_URL + endpointConfig.url;
            try {
                const response = await axios.put(finalURL, user, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content_Type': endpointConfig.content_type
                    }
                })
                if (response.status == 200) {
                    const responseData = response.data;
                    // console.log('Profil utilisateur mis à jour avec succès:', responseData);
                    return { data: responseData.body, err: null };
                } else {
                    throw new Error(`Erreur lors de la mise à jour du profil utilisateur: ${response.status}`);
                }
            }
            catch (error) {
                console.log(error)
                this.err.push(error);
            }
        }
        else {
            console.log('No Token value!')
            this.err.push('No Token value!');
        }
        return { data: false, err: this.err };
    }
}
export default API;
