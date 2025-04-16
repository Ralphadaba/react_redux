import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

//Changes in the redux store causes th
const Counter = () => {
  const dispatch = useDispatch(); // we don't pass any arg to it. It is a function we can call to dispatch our actions to the redux store.
  const counter = useSelector(state => state.counter.counter); //we use this to get a slice of state data(its just like passing prop) //check below
  const show = useSelector(state => state.counter.showCounter);

  const incrementHandler = () => {
    //dispatch({ type: 'increment' });
    dispatch(counterActions.increment()); // { type: SOME_UNIQUE_IDENTIFIER } //When implemented, it automatically creates a full and uique action object with a type set and matched with the increment method in the reducer function(in the store file). 
  };

  const increaseHandler = (amount) => {
    //dispatch({type: 'increase', amount, })  //could use any name for amount;
    dispatch(counterActions.increase(amount));  //{ type: SOME_UNIQUE_IDENTIFIER, payload: amount } //our payload data is passed as an arg(could be an object) to the increase... the type is automatically created for us remember
  }

  const decrementHandler = () => {
    //dispatch({ type: 'decrement' });
    dispatch(counterActions.decrement()); // { type: SOME_UNIQUE_IDENTIFIER }
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={() => increaseHandler(10)}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;










//Hooks are not useable in class based components, so we use connect which is a function that helps connect class based components to redux

// class Counter extends Component {
//   //we would have added a constructor() {} if we wanted to manage state here but we aren't.
//   incrementHandler() {
//     this.props.increment();
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() { }

//   render() {          
//     return (        //we're binding below to ensure that the 'this' keyword refers to the class
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button> 
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   }
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' }),
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter); //We execute the connect function, it then returns a new function. We execute... idg 





/**
 * useSelector(state => state.counter); //This function will be executed for us by react-redux. It will then pass the Redux state (the managed data) into
 * the useSelector function when it executes it and then retrieve the part of the code we need in the component inthis case, state.counter
 * 
 * So it's basically selecting the part of state value that we need from the store. In this case, we only have counter as state value. In larger component we might have more
 * data objects even nested arrays and to select from it will be very difficult. useSelector makes it easy. 
 * 
 * Whenever we use useSelector, react-redux automatically sets up a subscription to the redux store for the component so the component will be updated and receive the latest state.
 * NOTE that change in the redux store will cause this component to be re-executed
 * 
 * connect is an alternative to using the useDispatch and useSelector hooks
 * 
 */