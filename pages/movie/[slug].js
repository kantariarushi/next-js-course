import { Fragment, useState } from 'react';
import { server } from '../../config';
import Image from 'next/image';
import classes from './movie-detail.module.css';
import ReactPlayer from 'react-player';
import Head from 'next/head';


function MovieDetailPage(props) {
    const [movieDetails, setMovieDetails] = useState(props.stars.result[0])
  return (
    <Fragment>
        <Head>
            <title>{movieDetails.name}</title>
            <meta
            name='description'
            content={movieDetails.movieDescription}
            />
        </Head>
        <div className={classes.root}>
            <div className={classes.image}>
                <Image
                src={movieDetails.url}
                alt={""}
                width={200}
                height={200}
                layout='responsive'
                />
            </div>
            <div className={classes.videoPlayer}>
                <ReactPlayer 
                    url={movieDetails.trailerUrl} 
                    playing={true}
                />
            </div>
        </div>
            <div className={classes.detailBox}>
                <div>
                    <span className={classes.title}>{"name : "}</span>
                    <span className={classes.detail}>{movieDetails.name}</span>
                </div>
                <div>
                    <span className={classes.title}>{"IMDB Rating : "}</span>
                    <span className={classes.detail}>{movieDetails.imdb + " star"}</span>
                </div>
                <div>
                    <span className={classes.title}>{"Movie Type : "}</span>
                    <span className={classes.detail}>{movieDetails.movieType}</span>
                </div>
                <div>
                    <span className={classes.title}>{"Movie Description : "}</span>
                    <span className={classes.detail}>{movieDetails.movieDescription}</span>
                </div>
            </div>
    </Fragment>
  );
}

export async function getServerSideProps({params}) {

    const response = await fetch(`${server}/api/findmovies`, {
      method: 'POST',
      body: JSON.stringify({id: params.slug}),
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


export default MovieDetailPage;
