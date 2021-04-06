import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid'; // gen id

/** Action Generators */
// ADD_EXPENSE
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense : {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt,
    },
});
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    expense : {
        id,
    },
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
})
// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate,
});
// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate,
});

/** Reducers */
// RULE 1. Reducers are pure functions (only depends on its props, not change or rely on variables outside the scope)
// RULE 2. NEVER change state or action!!!!!
// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state, 
                action.expense
            ]; // spread operator, do not use push which changes state
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.expense.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => { // change the expense when match
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};
// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text,
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date',
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount',
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate,
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate,
            }
        default:
            return state;
    }
};

/** Selectors */
// visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // startDate < createdAt < endDate; startDate and endDate can be undefined
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch & endDateMatch & textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; // 1: b come first; -1: a come first
        }
        else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1; 
        }
    });
};

/** Store Creation */
// combine all reducers
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

/** Redux Subscribe */
const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
    // console.log(state);
})

/** Redux Actions for Testing */
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }));
console.log(expenseOne);
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: 1000 }));
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { 
//     amount: 500
// }));

// store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());

/////////////////////////////
/** EXAMPLE STATE */

const demoState = {
    expenses : [{
        id: 'sdfhwdfbfdf',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500, // in pennies
        createdAt: 0,
    }],
    filters: {
        text: 'rent', // search keyword
        sortBy: 'amount', // date or amount
        startDate: undefined, // from when
        endDate: undefined, // to when
    },
};

// const user = {
//     name: 'Jan',
//     age: 24,
// };
// console.log({
//     age: 23, // this will be overridden
//     ...user,
//     location: 'Hong Kong', // add new prop
//     age: 27, // override old prop
// })