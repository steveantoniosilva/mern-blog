import '../css-components/Home.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

export default function Home() {
  const [user, setUser] = useState('');
  console.log(user);

  useEffect(() => {
    function handleCallbackResponse(response) {
      var userObject = jwtDecode(response.credential);
      setUser(userObject);
      document.getElementById('signInDiv').hidden = true;
    }

    /* global google */
    google.accounts.id.initialize({
      client_id:
        '177318497143-0pjbid7fb0ngnb6eeakc11m1duji79nc.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'medium',
      text: 'sign_in_with',
    });
  }, []);

  function handleSignOut() {
    setUser('');
    document.getElementById('signInDiv').hidden = false;
  }

  return (
    <div className='home-main-div'>
      <div className='sound-icon'>
        <div className='sound-wave'>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
          <i className='bar'></i>
        </div>
      </div>

      <div id='signInDiv'></div>
      {user && (
        <div>
          <h3 className='google-name'>
            {user ? `Hey ${user.given_name}!` : ''}
          </h3>
          <button
            onClick={handleSignOut}
            className='sign-out-btn'>
            <img
              className='google-icon'
              src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              alt=''
            />
            Sign out of Google
          </button>
        </div>
      )}
    </div>
  );
}
