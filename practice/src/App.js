import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification.js';
import { sendCartData, fetchCartData } from './store/cart-actions.js';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(store => store.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

  useEffect(() => {      //NOTE: this could be done in any other component apart from that of the reducers   
    if (isInitial) {   //this blocks the cart data below from being sent the first time the effect executess
      isInitial = false;
      return;
    }

    if (cart.changed) {
          dispatch(sendCartData(cart)); //we're dispatching a function that returns another function instead of action objects why? // below
    }
  }, [cart, dispatch]);  //check below //dispatch here is safe because react-redux ensures that the function will never change or we would have had to use useCallback 

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;



/**
 *   }, [cart]);  //useSelector sets up a subscription to redux store so when there is a change in the store, the cart changes which causes useEffect to re-execute
 * That's what we need, we need to send a http PUT request whenever our cart changes
 * 
 * dispatch(sendCartData(cart)); // Action creator Thunk. Redux toolkit does not just accept action objects (with a type property & possibly payload), instead, it also accepts action 
 * creators that return functions. If i sees that you're dispatching an action which is actually a function instead of an action object, it will execute the function
 * for you. It gives us the dispatch argument automatically (in cart-slice) so that we can dispatch again  --- vid 336    
 * 
 */
