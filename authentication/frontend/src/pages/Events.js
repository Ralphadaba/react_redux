import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';         // To get access to the "closest loader data" returned by the loader function(we can't use it in a higher level route ) -- 361

import EventsList from '../components/EventsList';

function EventsPage() {
    const { events } = useLoaderData();  //with useLD, react-router ensures we would always get the resolved data from the promise 

    return (
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

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

export async function loader() {
    return {
        events: loadEvents(),
    };
}



/**
 * We can only access the loaded data with useLoaderData in any component on the same level or lower level. we can't pass data from child to parent. 
 * 
 * return response;   // -- vd 365 // why this ask chat //I think this is cause RRD handles the conversion to JSON and the rest bts. 
        //const resData = await response.json();
        //return resData.events;   //why .events? -- vd 359
    }
 * 
 * With defer, you want to load some part of a component while still awaiting the future values for the component
 * 
 * The Suspense is used in situations to show a fallback whilst we're waiting for other data to arrive in the course . fallback... -- vd 379
 */