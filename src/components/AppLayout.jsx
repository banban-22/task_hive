import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === 'loading';

  return (
    <div>
      {isLoading && <Loader />}

      <div>
        <Header />
        <Sidebar />
        <main className="">
          <div className="max-w-3xl mx-auto my-0 flex flex-col gap-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
