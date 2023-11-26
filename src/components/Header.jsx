// import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuKanbanSquare, LuListTodo } from 'react-icons/lu';
// import Button from './Button';
// import { username } from '../constants';

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="flex flex-col md:flex-row justify-start items-center align-center mx-8 mt-8 border-b border-slate-200 gap-6 lg:invisible">
      <NavLink
        to="/"
        className="tracking-wide text-4xl font-bold h-auto w-auto"
      >
        TaskHive
      </NavLink>
      <ul className="flex items-center align-center md:gap-6">
        <li className="w-full ml-5">
          <NavLink
            to="/todo"
            activeClassName="active"
            className="flex align-center items-center"
          >
            <LuListTodo />
            <span className="pl-3 text-xl w-full">ToDo</span>
          </NavLink>
        </li>
        <li className="w-full ml-5">
          <NavLink
            to="/kanban"
            activeClassName="active"
            className="flex align-center items-center"
          >
            <LuKanbanSquare />
            <span className="pl-3 text-xl w-full">Kanban</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
export default Header;
