import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

function FeaturedPosts(props) {
  return (
    <section className={classes.latest}>
      <h2>Featured Movies</h2>
      <PostsGrid moviesList={props.moviesList}/>
    </section>
  );
}

export default FeaturedPosts;
