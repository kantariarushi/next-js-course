import PostItem from './post-item';
import classes from './posts-grid.module.css';

function PostsGrid(props) {
  const { moviesList } = props;

  return (
    <ul className={classes.grid}>
       {moviesList.map((movie) => (
        <PostItem 
          key={movie.id} 
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default PostsGrid;
