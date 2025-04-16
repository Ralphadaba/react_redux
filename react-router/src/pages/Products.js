import { Link } from "react-router-dom";

const PRODUCTS = [
    { id: 'p1', title: 'Product 1' },
    { id: 'p2', title: 'Product 2' },
    { id: 'p3', title: 'Product 3' },
]

function ProductsPage() {
    return (
        <>
            <h1>The Products Page</h1>
            <ul>
                {PRODUCTS.map(prod => (
                    <li key={prod.id}>
                        <Link to={prod.id} > {prod.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ProductsPage;


/**
 * PREV Before .map()
 * 
 * <li><Link to="/products/product-1">Product 1</Link></li>
    <li><Link to="/products/product-2">Product 2</Link></li>
    <li><Link to="/products/product-3">Product 3</Link></li>

    <Link to={prod.id} > // relative routing
 * 
 * CONCATENATION v TEMPLATE LITERALS
 * use when you need to combine data: create sentences, messages, or paths dynamically
 * 
 * <Link to={`/products/${prod.id}`} >  // Template literals allow you to dynamically insert variables into a string using ${}
 *  If prod.id is 5, the output will be: <Link to="/products/5">
 * <Link to={"/products/" + prod.id} >  //This also works, but string concatenation (+) is less readable than template literals.
 *
 */