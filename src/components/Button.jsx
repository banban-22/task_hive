const Button = ({ children, to, type, disabled, onClick }) => {
  const base = 'border rounded-lg px-5 py-3 mb-3 ';
  const styles = {
    primary: `${base} bg-blue-500 text-white shadow-md`,
    secondary: `${base} bg-gray-200 text-gray-700`,
    rounded: `${base} bg-gray-200 text-gray-700 rounded-full`,
    small: `${base} bg-gray-200 text-gray-700`,
  };

  // if (to) {
  //   return (
  //     <Link to={to} className={styles[type]}>
  //       {children}
  //     </Link>
  //   );
  // }

  if (onClick) {
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
