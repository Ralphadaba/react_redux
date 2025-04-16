import { createBrowserRouter, /*createRoutesFromElements, Route,*/ RouterProvider } from 'react-router-dom';   //createbrow... is a function provided by react-rout... tat allows us to define our routes.
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

// https://example.com/products  // /products is the path. /nothing could also be a path -- vid 344

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductPage />} />
//   </Route>
// );

const router = createBrowserRouter([ // It takes a couple of js objects where every object represent one route.
  { 
    path: '/',  // path for the starting page of the website(Home page)
    element: <RootLayout />,  // parent route/ wrapper to the children routes(page components). It is where the child elements are actually rendered.
    errorElement: <ErrorPage />,  // fall back page if an error occurs 
    children: [
      { index: true, element: <HomePage /> },  // index is just an alternative to path: '' --355
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> } //The colon before product is important, it signals to r-r-d that that part of the code is dynamic.
    ],
  },
]);

// const router = createBrowserRouter(routeDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

/**
 * CreateBrowser requires an array of objects containing properties. The first property is a path, the next is the component that should be loaded when that rout is active which is placed in (element).
 * We need the RouterProvider component to tell react to render ... to the screen. The Rout... component has a special prop, router.
 * 
 * 
 */
