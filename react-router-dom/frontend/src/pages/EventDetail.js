import { Suspense } from "react";
import { useRouteLoaderData, redirect, Await } from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailPage() {
    // const params = useParams();  //useParams gives us access to the active routes' parameters. 
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);   //react router will automatically wait(no need for await) for the promise and give us access to the data which it resolves from the promise(no need for .json) 

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not fetch details for selected event.' }), {
            status: 500
        });
    } else {
        const resData = await response.json();  //we're manually parsing here... vd 379 idg
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        //return { isError: true, message: 'Could not fetch events.' };
        throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {  // acc to max, we should throw responses here instead of regular objects because --- vd 368. IDG like mad
            status: 500,
        });
    } else {
        const resData = await response.json();  //we're manually parsing here... vd 379 idg
        return resData.events;
        //return response;   // below
    }
}

export async function loader({ request, params }) {      //hooks (useParams) can't be accessed in the loader and we need the route parameters in the fetch link below
    const id = params.eventId;

    return {
        event: await loadEvent(id),  // defer or whatever else(as we didn't use defer here) will wait for this data to be loaded before loading this page component at all. -- vd 381. 
        events: loadEvents()
    };
}

export async function action({ params, request }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,          // the same as method: 'delete'
    });

    if (!response.ok) {
        throw new Response(JSON.stringify({ message: 'Could not fetch details for selected event.' }), {
            status: 500
        });
    }
    return redirect('/events');
}


/**
 * Since we can't use hooks in loader functions, React router passes an object containing two important pieces of info(a request and params object) when it executes the loader fuction for us. params basically replaces useParams. 
 * 
 */