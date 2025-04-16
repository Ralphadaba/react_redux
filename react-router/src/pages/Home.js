import { Link, useNavigate } from 'react-router-dom';  //useNavigate does imperative routing. It enables us to switch to a different route programmatically. -- vd 351  

function HomePage() {
    const navigate = useNavigate();

    function navigateHandler() {  //imperatve navigation code
        navigate('/products');
    }

    return (
        <>
            <h1>My Home Page</h1>
            <p>
                Go to <Link to="products">the list of products</Link>. 
            </p>
            <p>
                <button onClick={navigateHandler}>Navigate</button> 
            </p>
        </>
//NOTE that it should be a link and not a button. He just used a button to illustrate that we might programatically need to route if a timer expired or... 351
    );
}

export default HomePage;


/**
 * We use Link instead of the anchor (</a>) attribute and 'to' instead of the normal href to link...
 * The Link renders an anchor element, listen for clicks on the element like the anchor but unlike it, it prevents the browser default 
 * of sending a HTTP request if the link is clicked and takes a look at the route definitions to update the page accordingly and load the appropriate content. -- vd 347 
 */