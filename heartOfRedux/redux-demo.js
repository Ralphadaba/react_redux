const redux = require('redux');  //syntax for importing redux in JavaScript and not react. In react, we'll use the usual import

const counterReducer = (state = { counter: 0 }, action) => {  // function counterReducer() {}  //we need to give state a default value otherwise it will be undefined
    if (action.type === 'increment') { // The 
        return {     //here, we return the new state which will replace the existing state.
            counter: state.counter + 1,
        };
    }

    if (action.type === 'decrement') {
        return {     
            counter: state.counter - 1,
        };
    }

    return state;
};

const store = redux.createStore(counterReducer);  //The store needs to know which reducer is responsible for changing the store.

const counterSubscriber = () => { // subscriber function
    const latestState = store.getState();      // getState() is a method available on the store created with createStore() and it will give us the latest state snapshot after it was updated.
    console.log(latestState);
};

store.subscribe(counterSubscriber);  //With this, we're making redux aware of the function and telling it that the coun... function should be execued whenever our state changes

store.dispatch({ type: 'increment' }); //The dispatch is the trigger for the actions
store.dispatch({ type: 'decrement' });




/**
 * NOTE: We don't execute counterSubscriber and counterReducer when passing them. we just pass them and not execute them i.e. (redux.createStore(counterReducer())) is wrong. They will be executed by redux
 * 
 * Typically when using redux, the goal is to do different things inside the reducer for different actions. Basically, we use a reducer when we have different actions i.e. increment, decrement etc. that 
 * would be stored and handled by state. That's why we get action as a second argument. 
 * 
 */