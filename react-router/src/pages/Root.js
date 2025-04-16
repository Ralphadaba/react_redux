import { Outlet } from 'react-router-dom'; 

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
    return (  //The Outlet sort of positions or mark the place where the children components should be rendered to 
        <>
            <MainNavigation />
            <main>
                <Outlet /> 
            </main>
        </>
    );
}

export default RootLayout;


/**
 * An Outlet component marks the place where the child route elements should be rendered to
 * 
 */