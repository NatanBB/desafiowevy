import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import logo from '../assets/logo.png';
import { Button } from '../components/Button';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [unauthorized, setUnauthorized] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUnauthorized(false);
  }, [username, password])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUnauthorized(false);
    login(username, password)
      .then(() => navigate('/'))
      .catch((error) => {
        if (error?.response?.status == 401) {
          setUnauthorized(true);
        }
      });
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <img
            alt=""
            className="h-14 w-14"
            src={logo}
          />
        </div>
        <div className="border border-gray-700 rounded-md p-8 bg-gray-900">
          <div className="mb-10">
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-100">
              Sign in to WevyTask
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              <Input
                handleChange={(e) => setUsername(e.target.value)}
                value={username}
                type={"text"}
                placeholder={"Username"}
                styles={unauthorized ? "border-red-500 " : ""}
              />
              <Input
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
                type={"password"}
                placeholder={"Password"}
                styles={unauthorized ? "border-red-500 " : ""}
              />
            </div>
            {unauthorized &&
              <div className='text-sm text-red-500'>
                Invalid username or password
              </div>
            }
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-100">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to={"/forgotpass"} className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <Button
              type={"submit"}
              styles={"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-gray-100 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"}
              handleSubmit={handleSubmit}
              textButton={"Sign In"}
            />
            <p className="mt-2 text-center text-sm text-gray-600">
              New to WevyTask?
              <Link to={"/signup"} className="font-medium text-blue-600 hover:text-blue-500 pl-1">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
