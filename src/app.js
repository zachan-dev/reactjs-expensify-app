import React from 'react';
import ReactDOM from 'react-dom';
/** React-Redux */
import { Provider } from 'react-redux'; // allow Components to access the store
/** Router */
import AppRouter from './routers/AppRouter';
/** Redux */
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
/** Styles */
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
/** Firebase */
import './firebase/firebase';

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
const renderApp = (jsx) => ReactDOM.render(jsx, document.getElementById('app'));

renderApp(<p>Loading...</p>);

store.dispatch(startSetExpenses()).then(() => {
    renderApp(jsx);
});