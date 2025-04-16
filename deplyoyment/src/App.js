import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
//import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          //{ index: true, element: <BlogPage />, loader: postsLoader },
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),   // check below //wtf is a fallback? what is a callback too?
            loader: () =>
              import('./pages/Blog').then(module => module.loader())
          }, //lazy loading. the loader will only be executed once we visit the blog page -- 403
          {
            path: ':id',
            element: (
              <Suspense>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>  // why this be getting 'meta' and BlogPage don't get?
              import('./pages/Post').then(module => module.loader(meta)),  //-- vd 
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


/**
 * Suspense is basically a component provided by react that can be used by other things, other components to wait for content to be loaded before actually rendering the content. 
 * 
 */
