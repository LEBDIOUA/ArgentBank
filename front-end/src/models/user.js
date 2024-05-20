class User {
    constructor(id, firstName, lastName, email, password) {
        this.id = id ? id : null;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    toString(){
        return ('user : '+ this.id + ' ' +this.firstName+ ' '+ this.lastName+',\nEmail: '+ this.email+ ' / PW: '+ this.password );
    }
}
export default User;