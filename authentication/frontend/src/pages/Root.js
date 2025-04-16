import { useEffect } from "react";

import { Outlet, useLoaderData, useSubmit } from "react-router-dom";  //useNavigation helps us find out whether we are currently in an active transition, if we're loading data or if we have no active transition going on  
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();
    // const navigation = useNavigation();
    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' })
            return;
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);

        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' })
        }, tokenDuration);  
    }, [token, submit]);   // why only token and submit dependencies?? what of timeout??

    return (
        <>
            <MainNavigation />
            <main>
                {/*navigation.state === 'loading' && <p>Loading...</p>*/}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;


