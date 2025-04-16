import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');     //built-into the browser

    if (proceed) {
      submit(null, { method: 'delete' })  //action: '/a-different-path'  -- 374
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;


/**
 * We pass 2 arguments to the useSubmit. The first is the data we want to submit. The second allows us to set the same values we could set on our form.
 * 
 */