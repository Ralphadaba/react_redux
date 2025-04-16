import { Outlet } from "react-router-dom";  //useNavigation helps us find out whether we are currently in an active transition, if we're loading data or if we have no active transition going on  
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
    // const navigation = useNavigation();

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


