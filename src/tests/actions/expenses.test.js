import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk, ]);

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc',
    });
});

test('shoud setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'Test Editing' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { 
            note: 'Test Editing' 
        },
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense : expenses[2],
    });
});

test('should setup add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is the better',
        createdAt: 1000,
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        /** STORE */
        const actions = store.getActions(); // get list of actions made to the store using dispatch
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData,
            }
        });

        /** DATABASE */
        return database.ref(`expenses/${actions[0].expense.id}`).once('value'); // returned a Promise, if ok will run next .then statement (Promise Chaining)
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);

        done(); // force jest to wait for this done function
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0,
    };

    store.dispatch(startAddExpense({})).then(() => {
        /** STORE */
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults,
            }
        });
        /** DATABASE */
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense : {
//             id: expect.any(String),
//             description: '', 
//             note: '', 
//             amount: 0, 
//             createdAt: 0,
//         },
//     });
// });