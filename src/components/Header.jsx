import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
// import { username } from '../constants';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="flex flex-row justify-end items-center px-5 h-20 border-b-2 border-gray-100 w-full">
      {isLoggedIn ? (
        <div>username</div>
      ) : (
        <Link to="/login" className="">
          <Button to="/login">Login</Button>
        </Link>
      )}
    </header>
  );
};
export default Header;
