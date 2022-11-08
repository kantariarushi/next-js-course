import Link from 'next/link';
import Image from 'next/image';

import classes from './post-item.module.css';

function PostItem(props) {
  // const { title, image, excerpt, date, slug } = props.post;

  // const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  // });

  // const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/movie/${props.movie.name}`;
  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.root}>
          <div className={classes.image}>
            <Image
              src={props.movie.url}
              alt={""}
              width={200}
              height={200}
              layout='responsive'
            />
          </div>
          <div className={classes.content}>
            <h3>{props.movie.name}</h3>
            {/* <p>{props.movie.s}</p> */}
          </div>
          </div>
      </Link>
    </li>
  );
}

export default PostItem;
