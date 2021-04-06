import { createStore } from 'redux';

/** Action Generators - functions that return action objects */
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy,
});
const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy,
});
const setCount = ({ count = 0 } = {}) => ({
    type: 'SET',
    count,
});
const resetCount = () => ({
    type: 'RESET'
});

/** Reducers : how the app changes the state in response to Actions */
// 1. Reducers are pure functions (only depends on its props, not change or rely on variables outside the scope)
// 2. Never change state or action

const countReducer = (state = {count : 0}, action) => { // ~=this.setState, with default state object, and action gets passed
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy,
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy,
            };
        case 'SET':
            return {
                count: action.count,
            }
        case 'RESET':
            return {
                count: 0,
            };
        default:
            return state;
    }
};

/** Redux State Container */
const store = createStore(countReducer);

/** Redux Subscribe : be called when the state changes */
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

/** Redux Actions : an object gets sent to the store*/
// Action 1: INCREMENT
// store.dispatch({ // runs function in createStore again, with action object defined
//     type: 'INCREMENT', // must have type property
//     incrementBy: 5, // custom property
// });
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
//unsubscribe(); // unscription
// Action 2: RESET
store.dispatch(resetCount());
// Action 3: DECREMENT
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
// Action 4: SET
store.dispatch(setCount({ count: 101 }));