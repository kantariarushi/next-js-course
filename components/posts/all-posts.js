import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Movies</h1>
      <PostsGrid moviesList={props.moviesList}/>
    </section>
  );
}

export default AllPosts;
