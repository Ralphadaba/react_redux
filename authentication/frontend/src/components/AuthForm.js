import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';  // 388

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();   //check router section

  const [searchParams] = useSearchParams(); // below  // why this, useReducer, useState etc. be giving us arrays [] and others be giving us properties or {}
  const isLogin = searchParams.get('mode') === 'login';  // The get method allows us to retrieve the value for a query parameter. // what is .get generally?
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (   // research this indepth on chat mehn
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signUp' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;


/**
 * const [searchParams, setSearchParams] = useSearchParams() // useSearchParams gives us 2 elements in an array: 
 * The first is an object that gives us access to the currently set query parameters, the second 
 * is a function that allows us to update the currently set query parameters.   -- 388
 * 
 */
