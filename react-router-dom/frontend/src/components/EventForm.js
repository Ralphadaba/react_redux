import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();   //I can get any response returned by action with this //below
  const navigate = useNavigate();
  const navigation = useNavigation();   // with this, we can find out the state of the currently active transition(from one route to another or if we submit a form) is??  -- 375

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required   // esures we can't submit empty values but never rely on just client side validation
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disables={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();   // the request contains the form data passed to action by the Form tag in EventForm.js

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {   //It is capital letter 'PATCH' here because the request.method CONVERTS the whatever it receives to capital letter. //check patch vs PATCH in vd 377, Q&A section 
    const eventId = params.eventId; // eventId is the placeholder name in the path definition.  
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    //throw json(...)    // ideal code but it doesn't work in v7
    throw new Response(JSON.stringify({ message: 'Could not save event.' }, { status: 500 }))
  }

  return redirect('/events');
}





/**
 * The Form tag with method='post' will make sure that the browser default of sending a request to the backend will be omitted but it would take the request that would have been sent and give it to action
 * which will contain all the data that was submitted. 
 * 
 * <Form method='post' action="/any-other-path" className={classes.form}>  // you include action here like this if you wanna trigger the action of some other route that's not this route.
 * 
 * useActionData does exactly the same thing as useLoaderData just that this is to action and not loader
 * 
 */


/**
 * export async function action() {  //Just like the loader but it sends data to the the action to send to backend
 * 
 * "redirect" redirects the user to a different page. 
 * 
 */
