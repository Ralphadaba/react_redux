import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';


// const store = createStore(counterSlice.reducer); //The reducer here is just like the normal or prev extended reducer with the if statement and prolly immutability handled behind the scenes by redux toolkit. 
const store = configureStore({ //This creates a store like createStore but it makes merging multiple reducers into one reducer easier. 
    reducer: { counter: counterReducer, auth: authReducer }, 
}); 

export default store;



/**
 * 
 *   PREV COUNTER REDUCER
 * const counterReducer = (state = initialState, action) => { //we could also use a switch statement
    if (action.type === 'increment') { //action is an object that has a type property
        return { //note that this return will replace the existing state so we need to return previous state or it will overwrite it and only what we returned will remain in the state. 
            counter: state.counter + 1,
            showCounter: state.showCounter //preserving existing state
        };
    }

    if (action.type === 'increase') { // we should never mutate existing state(objects and arrays as you know). Instead, update it by returning a brand new state object.
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        };
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        };
    }

    if (action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            counter: state.counter  //preserving existing state
        }
    }

    return state;
};
 * 
 * 
 */



