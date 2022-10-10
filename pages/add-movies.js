import { Fragment } from 'react';
import Head from 'next/head';

import AddMoviesForm from '../components/add-movies/add-movies-form';

function AddMoviesPage() {
  return (
    <Fragment>
      <Head>
        <title>Add Movies</title>
        <meta name='description' content='Send me your messages!' />
      </Head>
      <AddMoviesForm />
    </Fragment>
  );
}

export default AddMoviesPage;
