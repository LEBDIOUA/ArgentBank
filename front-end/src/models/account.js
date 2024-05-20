class Account {
    constructor(id, title, amount, description, user) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.description = description;
        this.user = user;
    }
    
    toString(){
        return ('\t' + this.title + ' ' + this.amount + ' ' + this.description);
    }
}

export default Account;