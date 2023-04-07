import { Link } from 'react-router-dom';
import logo from '../assets/everlance-logo.png';

const Navbar = ({ children }) => {
  return (
    <>
      <nav className='flex p-6 shadow-md'>
        <Link to='/'>
          <img className='w-5 mr-3' src={logo} alt='logo' />
        </Link>
        <Link to='/'>
          <p>Everlance Inc.</p>
        </Link>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
