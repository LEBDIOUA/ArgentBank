import User from './user';
import Account from './account';

// export const usersList = [
//     new User(1, 'Tony', 'Stark', 'tony@stark.com', '123'),
//     new User(2, 'Steve', 'Rogers', 'steve@rogers.com', '456')
// ];

// export const accountsList = [
//     new Account(1, "Argent Bank Checking (x8349)", "$2,082.79", "Available Balance", user: 1),
//     new Account(2, "Argent Bank Savings (x6712)", "$10,928.42", "Available Balance", user: 1),
//     new Account(3, "Argent Bank Credit Card (x8349)", "$184.30", "Current Balance", user: 1),
//     new Account(4, "Argent Bank Checking (x8349)", "$3,300.45", "Available Balance", user: 2),
//     new Account(5, "Argent Bank Credit Card (x6712)", "$5,000.50", "Current Balance", user: 3)
// ];

export const accountsList = [
    { id: 1, title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance", user: 1},
    { id: 2, title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance", user: 1},
    { id: 3, title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance", user: 1},
    { id: 4, title: "Argent Bank Checking (x8349)", amount: "$3,300.45", description: "Available Balance", user: 2},
    { id: 5, title: "Argent Bank Credit Card (x6712)", amount: "$5,000.50", description: "Current Balance", user: 2}
];

export const usersList = [
    {
        id: 1, firstName: 'Tony', lastName: 'Stark', email: 'tony@stark.com', password: '123'
    },
    {
        id: 2, firstName: 'Steve', lastName: 'Rogers', email: 'steve@rogers.com', password: '456'
    }
];

export const transactionsList = [
    { id: 1, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 5, balance: 2082.79, type: "Electronic", category: "Food", account: 1 },
    { id: 2, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 10, balance: 2087.79, type: "Electronic", category: "Food", account: 1 },
    { id: 3, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 20, balance: 2097.79, type: "Electronic", category: "Food", account: 1 },
    { id: 4, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 30, balance: 2117.79, type: "Electronic", category: "Food", account: 1 },
    { id: 5, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 40, balance: 2147.79, type: "Electronic", category: "Food", account: 1 },
    { id: 6, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 50, balance: 2187.79, type: "Electronic", category: "Food", account: 1 },
    { id: 7, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 5, balance: 2082.79, type: "Electronic", category: "Food", account: 2 },
    { id: 8, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 10, balance: 2087.79, type: "Electronic", category: "Food", account: 2 },
    { id: 9, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 20, balance: 2097.79, type: "Electronic", category: "Food", account: 3 },
    { id: 10, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 30, balance: 2117.79, type: "Electronic", category: "Food", account: 4 },
    { id: 11, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 40, balance: 2147.79, type: "Electronic", category: "Food", account: 4 },
    { id: 12, date: "June 20th, 2020", description: "Golden Sun Bakery", amount: 50, balance: 2187.79, type: "Electronic", category: "Food", account: 5 }

]