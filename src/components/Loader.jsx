import loader from '../img/loader.svg';

const Loader = () => {
  return (
    <div role="status">
      <img src={loader} alt="Loading..." />
    </div>
  );
};
export default Loader;
