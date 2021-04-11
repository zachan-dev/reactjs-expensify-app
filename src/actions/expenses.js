import { v4 as uuidv4 } from 'uuid'; // gen id
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense,
});
export const startAddExpense = (expenseData = {}) => { // Async Redux Actions
    // redux-thunk setup allows to return functions
    return (dispatch) => { // thunk middleware will pass dispatch as argument
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0,
        } = expenseData;
        const expense = { description , note, amount, createdAt };

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense,
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id,
});
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses')
            .once('value')
            .then((snapshot) => {
                const expenses = [];
        
                snapshot.forEach((childSnapshot) => {
                    expenses.push({ // mapping
                        id: childSnapshot.key, // key
                        ...childSnapshot.val(), // value spread
                    });
                });

                dispatch(setExpenses(expenses));
            }); // retrun a promise
    };
};
