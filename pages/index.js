import { Fragment, useState } from 'react';
import Head from 'next/head';
import { useEffect } from 'react';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
// import { getMoviesList } from '../lib/posts-util';
import { server } from '../config';

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
      <FeaturedPosts moviesList={props.stars.data}/>
    </Fragment>
  );
}

export async function getServerSideProps() {

  // const json = await getMoviesList(); 
  const response = await fetch(`${server}/api/contact`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return {
    props: {
      stars: data
    },
  };
}

export default HomePage;
