import { useState } from 'react';

const AuthForm = () => {
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="row">
      <h4>{formState ? 'Login' : 'Signup'}</h4>
      <form className="col s4" onSubmit={onSubmit}>
        {!formState.login && (
          <div className="inptu-field">
            <label>Email</label>
            <input
              type="text"
              placeholder="xxx@xxx.com"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
            />
          </div>
        )}

        {!formState.login && (
          <div className="inptu-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
            />
          </div>
        )}
        <button
          className="btn"
          onClick={() =>
            setFormState({ ...formState, login: !formState.login })
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AuthForm;
