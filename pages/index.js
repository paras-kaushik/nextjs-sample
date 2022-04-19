import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A Chennai meetup",
//     image: "https://i.ytimg.com/vi/5JsUVZFPHeo/maxresdefault.jpg",
//     address: "Chennai",
//     description: " This is a First Meetup",
//   },
//   {
//     id: "m2",
//     title: "A Delhi meetup",
//     image: "https://i.ytimg.com/vi/5JsUVZFPHeo/maxresdefault.jpg",
//     address: "Delhi",
//     description: " This is a First Meetup",
//   },
//   {
//     id: "m3",
//     title: "A Assam meetup",
//     image: "https://i.ytimg.com/vi/5JsUVZFPHeo/maxresdefault.jpg",
//     address: "Assam",
//     description: " This is a First Meetup",
//   },
// ];
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

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://paras:qfH7Po4JFKXvo7IJ@cluster0.jf8na.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
