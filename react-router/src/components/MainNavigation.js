import { NavLink } from "react-router-dom";

import classes from './MainNavigation.module.css';

function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined  //undefined means React simply does not apply the className at all.
                            }
                            // style={({isActive}) => ({
                            //     textAlign: isActive ? 'center' : 'left',
                            // })}
                            end      //below    //without this, if I click on product or any other path, Home will still be active because it's path ("/") is included in the products path. It is this way for nested... -- vd 350
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header >
    );
}

export default MainNavigation;


/**
 * To support links that should show us whether they led to the currently active page or not, react-router-dom has an alternative to Link, The NavLink component. It takes a function... -- vd 350
 * isActive is provided by react-router-dom and it's true if the link is currently active or false... so we can return a css class if it returns true and another one else
 * 
 * end  // will ensure that the link is active only if the link ends in ("/"). we don't need to add it in products cause no other route will start with /products
 * 
 */