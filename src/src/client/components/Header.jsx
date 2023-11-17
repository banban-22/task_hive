import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center mx-5">
      <Link to="/" className="tracking-wide text-4xl font-bold ">
        TaskHive
      </Link>
      <Link to="/login" className="">
        <button>Login</button>
      </Link>
    </header>
  );
};
export default Header;
