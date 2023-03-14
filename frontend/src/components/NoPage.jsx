import { Link } from 'react-router-dom';
import '../css-components/NoPage.css';

export default function NoPage() {
  return (
    <div className='noPage'>
      <div className='noPageInfo'>
        <h1>404 Page Not Found</h1>
        <Link to='/'>
          <button>Back Home</button>
        </Link>
      </div>
    </div>
  );
}
