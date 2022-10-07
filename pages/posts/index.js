import Head from 'next/head';
import { Fragment } from 'react';

import { getMoviesList } from '../../lib/posts-util';
import AllPosts from '../../components/posts/all-posts';

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
      <AllPosts  moviesList={props.stars}/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const json = await getMoviesList(); 
  return {
    props: {
      stars: json.d
    },
  };
}

export default AllPostsPage;
