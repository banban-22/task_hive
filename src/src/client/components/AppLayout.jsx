import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

const AppLayout = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === 'loading';

  return (
    <div>
      {isLoading && <Loader />}
      <Header />

      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
