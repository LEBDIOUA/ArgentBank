import axios from 'axios';

class API {
    static instance = null;
    static getInstance() {
        if (this.instance === null) {
            this.instance = new API();
        }

        return (this.instance);
    }

    constructor() {
        this.token = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')).id : null;
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
            console.log('checkURL response: ', response);
            return true;
        }
        catch (error) {
            this.err.push('CONNECTION REFUSED');
            console.log(this.err)
            return false;
        }
    }

    loginUser = async (user) => {
        const endpointConfig = this.buildEndpoint("GET_LOGIN")
        const finalURL = this.DB_URL + endpointConfig.url;

        if (this.checkURL() && this.err.length === 0) {
            try {
                const response = await axios.post(finalURL, JSON.stringify({ email: user.email, password: user.password }), {
                    headers: {
                        'Content-Type': endpointConfig.content_type
                    }
                })
                if (response.status == 200) {
                    const responseData = response.data;
                    this.token = responseData.body.token;
                } else {
                    this.err.push('Login failed with status: ' + response.status);
                }
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    this.err.push(error.response.data.message);
                } else {
                    this.err.push(error.message || 'An unknown error occurred');
                }
                return { err: this.err };
            }
        }
        else {
            return { err: this.err };
        }
    }

    signUpUser = async (user) => {
        const endpointConfig = this.buildEndpoint("GET_LOGIN")
        const finalURL = this.DB_URL + endpointConfig.url;

        if (this.checkURL() && this.err.length === 0) {
            try {
                const response = await axios.post(finalURL, JSON.stringify(user), {
                    headers: {
                        'Content-Type': endpointConfig.content_type
                    }
                })
                if (response.status === 200) {
                    const responseData = response.json();
                    return { token: this.loginUser(responseData.body.email, responseData.body.password), data: responseData, err: null };
                } else {
                    this.err.push('Login failed with status: ' + response.status);
                }
            }
            catch (error) {
                this.err.push(error ? error.message : 'An unknown error occurred');
            }
            return { data: null, err: this.err.join('; ') };
        }
        else {
            return { err: this.err };
        }
    }

    fetchUser = async (user) => {
        this.err = [];
        await this.loginUser(user);

        if (this.err.length === 0 && this.token) {
            const endpointConfig = this.buildEndpoint("GET_USER")
            const finalURL = this.DB_URL + endpointConfig.url;
            try {
                const response = await axios.post(finalURL,
                    { key: 'value' },
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })

                if (response.status == 200) {
                    const userdata = response.data;
                    return { token: this.token, data: userdata.body, err: null };
                } else {
                    this.err.push(`Erreur lors de la récupération du profil utilisateur: ${response.status}`);
                }

            } catch (error) {
                this.err.push(error)
            }
        }
        return { token: null, data: null, err: this.err };
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
                    return { token: this.token, data: responseData.body, err: null };
                } else {
                    this.err.push(`Erreur lors de la mise à jour du profil utilisateur: ${response.status}`);
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
        return { token: null, data: false, err: this.err };
    }
}
export default API;
