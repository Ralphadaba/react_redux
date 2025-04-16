import { Link, useParams } from 'react-router-dom';

function ProductDetailPage() {
    const params = useParams(); 

    //params.productId     //if i used just id in the dynamic route definition it'll be params.id.

    return (
        <>
            <h1>Product Details!</h1>
            <p>{params.productId}</p>
            <p><Link to=".." relative='path'>Back</Link></p> 
        </>
    );
}

export default ProductDetailPage;

/**
 * Params object is a js object that contains every dynamic path segment we defined in our route definition as a property  
 * 
 * ".." in <p><Link to="..">Back</Link></p>  means go up one level or go back to the previously active path and route. It is also a relative path 
 * By default, the relative path is relative to the path definitions. when we go up one level, we go back to the previous route path which is the PARENT route path.
 * So instead of it to go back to products when we click back it goes back to home cause product is sibling, Home is parent. we have to set a relative prop to path 
 * to make it go up one level or to remove one segment from the path. relative prop don't matter for an absolute path .. 354
 * 
 */