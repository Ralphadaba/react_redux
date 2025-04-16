import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() { //below //-- he explains at 495
    const client = await MongoClient.connect(  //--500
        'mongodb+srv://ralphadab:ralphadab@cluster0.wtnyrmq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;  // we use params here instead of useRouter because react hooks can't be placed here. meetupId is the name of the file that... -- 494

    const client = await MongoClient.connect(  // --500
        'mongodb+srv://ralphadab:ralphadab@cluster0.wtnyrmq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),  //  _id: new ObjectId(`${meetupId}`),   // to remove the warning but IDG.
      });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        },
    };
}

export default MeetupDetails;


/**
 * export async function getStaticPaths() {  //Basically, we get the id from the url in getSProps normally. since getSProps is pre-generated and the page is dynamic, we need to tell Next.js 
 * to pre-generate all versions of the dynamic page in advance for all the IDs. Remember that pages are not pre-generated when a user visits the page but during the build process. 
 * getStaticPath returns an ibject that describes all the dynamic segment values
 * 
 */