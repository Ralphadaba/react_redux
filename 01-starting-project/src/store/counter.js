import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({  //this is a slice of our global state //check below
    name: 'counter',
    initialState: initialCounterState,
    reducers: {  //we are allowed to mutate the state here. It is internally transformed to an immutable code
        increment(state) {  //The methods receive the latest state automatically passed by redux toolkit
            state.counter++;
        },
        decrement(state) { 
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

export const counterActions = counterSlice.actions; //check actions below

export default counterSlice.reducer;




/**
 * 
 * const counterSlice = createSlice({ //it automatically creates unique action identifiers for our different reducers which helps us with the dispatch
 * CreateSlice wants an object with properties and methods. Every slice needs a name. createSlice also receives reducers. 
 * reducers is an object or a map of all the reducer methods this slice needs. It contains the methods that will update the state. 
 * Every method automatically receives the latest state passed as arguments to it.
 * 
 * 
 * We also won't need to write our own if checks anymore to identify the action. We are allowed to mutate the state seemingly. 
 * redux toolkit uses another package to detect the code and automatically clone the code, create a new state object, keep all 
 * the state we're not editing and override the state we're editing in an immutable way
 * 
 * The dispatch is just like setState() without the actual function. The action is the actual function or action defined inside setState().
 * 
 * FOR DISPATCHING ACTIONS, createSlice automatically creates unique action(object) with identifiers(keys/methods too) for our different reducers. 
 * So it creates action objects (which typically have a 'type' property) when called. The methods inc, dec.. are called action creators because when they are called they
 * create an action object with type property and a unique identifier per action bts. It automatically matches the reducer methods to its dispatch action which then triggers the reducer methods. 
 * 
 * 
 */
