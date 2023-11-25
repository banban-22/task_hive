import { Link } from 'react-router-dom';
import { GoHome, GoCalendar } from 'react-icons/go';
import { LuKanbanSquare, LuListTodo } from 'react-icons/lu';

const Sidebar = () => {
  return (
    <>
      <aside className="border border-r-1 grid-rows-1 flex flex-col gap-3 top-0 left-0 z-30 w-64 fixed h-screen transition-transform -translate-x-full sm:translate-x-0 ">
        <nav className="h-full px-3 py-4 overflow-y-auto bg-sky-50 ">
          <div className="pb-10">
            <Link
              to="/"
              className="tracking-wide text-4xl font-bold h-auto w-auto"
            >
              TaskHive
            </Link>
          </div>
          <ul className="flex flex-col gap-3 space-y-2 items-start p-2 font-medium text-lg ">
            {/* <li className="w-full">
              <Link
                to="/dashboard"
                className="flex items-center justify-start hover:bg-sky-800 hover:text-white rounded-lg p-2 group"
              >
                <GoHome />
                <span className="pl-3">Home</span>
              </Link>
            </li> */}
            <li className="w-full">
              <Link
                to="/todo"
                className="flex items-center justify-start hover:bg-sky-800 hover:text-white rounded-lg p-2 group"
              >
                <LuListTodo />
                <span className="pl-3">To Do</span>
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/kanban"
                className="flex items-center justify-start hover:bg-sky-800 hover:text-white rounded-lg p-2 group"
              >
                <LuKanbanSquare />
                <span className="pl-3">Kanban</span>
              </Link>
            </li>
            {/* <li className="w-full">
              <Link
                to="/calendar"
                className="flex items-center justify-start hover:bg-sky-800 hover:text-white rounded-lg p-2 group"
              >
                <GoCalendar />
                <span className="pl-3">Calendar</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;
