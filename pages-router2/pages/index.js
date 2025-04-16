import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {  // the difference from getSP is that this will always run on the server after deployment as opposed to during the build process in getSP. 
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() { // This is a secial function, a reserved name, getSP that runs before the component... --491   //This only works in PAGES component files & not other component files 
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://ralphadab:ralphadab@cluster0.wtnyrmq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,  // ideally, any update would not show unless we re-build/re-deploy project. with revalidate, we're ensuring that our data is re-generated every second and not older than 1s -- 493
  };
}

export default HomePage;
