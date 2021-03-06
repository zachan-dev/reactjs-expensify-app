import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense, 
    removeExpense, 
    startRemoveExpense,
    setExpenses, 
    startSetExpenses,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk, ]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    // Every test case start with the fixtures data
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc',
    });
});

test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        /** STORE */
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        /** DATABASE */
        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(null); // expect it doesn't exist on firebase
        done();
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

test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        /** STORE */
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates,
        });
        /** DATABASE */
        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
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
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value'); // returned a Promise, if ok will run next .then statement (Promise Chaining)
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);

        done(); // force jest to wait for this done function
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses // expect only fixture data on test firebase env
        });
        done();
    });
});