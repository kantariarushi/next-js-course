import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getMoviesList } from '../lib/posts-util';

function HomePage(props) {

  return (
    <Fragment>
      <Head>
        <title>Rushi' Favourite movies</title>
        <meta
          name='description'
          content='I post about latest Movies'
        />
      </Head>
      <Hero />
      <FeaturedPosts moviesList={props.stars}/>
    </Fragment>
  );
}

export async function getServerSideProps() {

  const json = await getMoviesList(); 

  return {
    props: {
      stars: json.d
    },
  };
}

export default HomePage;
