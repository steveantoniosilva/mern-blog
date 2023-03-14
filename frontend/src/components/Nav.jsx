import { Link, Outlet } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useState } from 'react';
import '../css-components/Nav.css';

export default function Nav() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='nav-main-container'>
      <div className='hamburger'>
        <Hamburger
          size={35}
          color='tomato'
          toggled={isOpen}
          toggle={setOpen}
          duration={0.1}
        />
      </div>
      <div className={isOpen ? 'nav-open' : 'nav-closed'}>
        <nav onClick={prevValue => setOpen(!prevValue)}>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/blog-form'>Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
