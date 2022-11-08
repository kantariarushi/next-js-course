import { useState, useEffect } from 'react';

import classes from './add-movies-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/movies', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

function ContactForm() {
  const [enteredMovieName, setEnteredMovieName] = useState('');
  const [enteredUrl, setEnteredUrl] = useState('');
  const [IMDBRating, setIMDBRating] = useState(undefined);
  const [movieType, setMovieType] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('')
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    // optional: add client-side validation

    setRequestStatus('pending');

    try {
      await sendContactData({
        name: enteredMovieName,
        url: enteredUrl,
        imdb: IMDBRating,
        movieType: movieType,
        movieDescription: movieDescription,
        trailerUrl: trailerUrl
      });
      setRequestStatus('success');
      setEnteredMovieName('');
      setEnteredUrl('');
      setIMDBRating('');
      setMovieType('')
      setMovieDescription('')
      setTrailerUrl('')
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='text'>Enter Movie Name</label>
            <input
              type='text'
              id='movie'
              value={enteredMovieName}
              onChange={(event) => setEnteredMovieName(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Image url</label>
            <input
              type='text'
              id='url'
              value={enteredUrl}
              onChange={(event) => setEnteredUrl(event.target.value)}
            />
          </div>
        </div>

        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='text'>Enter Movie IMDB Rating</label>
            <input
              type='text'
              id='movie'
              value={IMDBRating}
              onChange={(event) => setIMDBRating(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Enter Movie Type</label>
            <input
              type='text'
              id='url'
              value={movieType}
              onChange={(event) => setMovieType(event.target.value)}
            />
          </div>
        </div>

        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='text'>Enter Movie Discription</label>
            <textarea
              type="textarea"
              id='movie'
              value={movieDescription}
              onChange={(event) => setMovieDescription(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Enter the trailer Url</label>
            <input
              type="text"
              id='movie'
              value={trailerUrl}
              onChange={(event) => setTrailerUrl(event.target.value)}
            />
          </div>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
