import { useFetcher } from 'react-router-dom'; // vd 378

import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"  // ??
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;


/**
 * useFetcher works for actions and loader in the sense that it still triggers an action but it won't initialize a route transition.
 * so we use fetcher when we want to trigger any route changes) without actually navigating to the page the action or loader belongs. --vd 378
 * If you want to trigger a route change(move to another page) after using loader or action, then you use Form instead of fetcher.Form.
 * 
 */
