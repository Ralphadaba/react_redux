import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {  // Redux gives our function access to dispatch so we can dispatch when needed (after our async, side-effect or delayed code )
        const fetchData = async () => {
            const response = await fetch(  //this fetch is an http request //Waits for the network response.
                'https://react-proj-dbbc5-default-rtdb.firebaseio.com/cart.json'
            );

            if (!response.ok) { //this error handler is for the http request.
                throw new Error('Could not fetch cart data!');
            }

            const data = await response.json(); //Waits for the response to be converted to JSON

            return data;
        };
        try {
            const cartData = await fetchData(); //Waits for the function to return data before updating the Redux store.
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],  //so it doesn't return undefined when we reload -- vid 338.
                totalQuantity: cartData.totalQuantity,
            })); //NOTE that this has the correct structure already cause we PUT it in... check vid 337.
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
};

export const sendCartData = (cart) => { //In redux-toolkit, we can use a function that returns another function as an action as well(Action thunks)
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-proj-dbbc5-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',   //PUT unlike POST will not add the new data next to the previous one, it replaces existing data
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        };

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }

    };
};