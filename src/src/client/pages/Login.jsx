import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_MUTATION } from '../mutations/Login';
import { SIGNUP_MUTATION } from '../mutations/Signup';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: false,
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);


  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h4 className="text-2xl font-bold">{formState ? 'Login' : 'Signup'}</h4>
      <form className="border rounded-lg flex flex-col items-center justify-center">
        {!formState.login && (
          <div className="inptu-field p-10">
            <label>Email</label>
            <input
              type="text"
              placeholder="xxx@xxx.com"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className="border ml-5 p-3 rounded-lg"
            />
          </div>
        )}

        {!formState.login && (
          <div className="inptu-field p-10">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              value={formState.password}
              onChange={() =>
                setFormState({ ...formState, password: e.target.value })
              }
              className="border ml-5 p-3 rounded-lg"
            />
          </div>
        )}
        {errors.length > 0 &&
          errors.map((error) => <p key={error.message}>{error.message}</p>)}

        <button
          className="btn bg-teal-300 px-10 py-4 rounded-lg shadow-lg"
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
export default Login;
