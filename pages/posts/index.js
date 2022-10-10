import Head from 'next/head';
import { Fragment } from 'react';

import { getMoviesList } from '../../lib/posts-util';
import AllPosts from '../../components/posts/all-posts';
import { server } from '../../config';

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts  moviesList={props.stars.data}/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const json = await getMoviesList();
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

export default AllPostsPage;
