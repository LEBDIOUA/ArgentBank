class User {
    constructor(id, firstName, lastName, email, password) {
        this.id = id ? id : null;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    setId(_id){
        this.id = _id; 
    }

    setName(_firstName, _lastName){
        this.firstName = _firstName;
        this.lastName = _lastName; 
    }


    toString(){
        return ('user : '+ this.id + ' ' +this.firstName+ ' '+ this.lastName+',\nEmail: '+ this.email+ ' / PW: '+ this.password );
    }
}
export default User;