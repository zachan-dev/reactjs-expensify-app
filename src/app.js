import React from 'react';
import ReactDOM from 'react-dom';
/** React-Redux */
import { Provider } from 'react-redux'; // allow Components to access the store
/** Router */
import AppRouter, { history } from './routers/AppRouter';
/** Redux */
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
/** Styles */
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
/** Firebase */
import { firebase } from './firebase/firebase';

/** Loading Page */
import LoadingPage from './components/LoadingPage';

const store = configureStore();

/** Can view the state using redux devtools */
// const unsubscribe = store.subscribe(() => {
//     const state = store.getState();
//     const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//     console.log(visibleExpenses);
//     // console.log(state);
// })

/** Sample Dispatch calls */
// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
// store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

/** React-Redux Provider Wrapper */
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
/** App Render */
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

/** Login/Logout Event Handler */
firebase.auth().onAuthStateChanged((user) => { // triggered when authentictaed -> unauthenticated vise versa
    if (user) {
        /** Just logged in */
        //console.log('uid', user.uid);
        store.dispatch(login(user.uid));
        // only fetch and set data when logged in
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
        });
        // only redirect user to dashboard when user at login page
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    } else {
        /** Just logged out */
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});