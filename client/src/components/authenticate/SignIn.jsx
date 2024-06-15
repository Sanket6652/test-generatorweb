import { Link } from "react-router-dom";
import ForgotLink from "./ForgotLink";
import { inputStyles, labelStyles } from "../../utils/data";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import Error from "../Error";

export default function SignIn() {
  const { login } = useLogin();
  const [error, setError] = useState();

  async function signIn(e) {
    e.preventDefault();
    try {
      const response = await login({ email: e.target[0].value, password: e.target[1].value })
      if (!response.status) setError(response.payload)
      // Qwerty@1234
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={signIn}>
        <label htmlFor="username" className={labelStyles}>Email</label>
        <input type="text" id="username" placeholder="email" className={inputStyles} />

        <label htmlFor="password" className={labelStyles}>Password</label>
        <input type="password" id="password" placeholder="password" className={inputStyles} />

        {/* <div>
          <input type="checkbox" id="rememberMe" className="mr-2 cursor-pointer" />
          <label htmlFor="rememberMe" className="cursor-pointer select-none">Remember Me</label>
        </div> */}

        <ForgotLink url="user" />
        {error && <Error message={error} setter={setError} />}
        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign in</button>
      </form>
      <div className="text-slate-400 font-semibold text-center mt-4">or</div>
      <Link to="/user/sign-up">
        <button className="btn-primary w-full mt-4 rounded-md">Sign up</button>
      </Link>
    </div >
  )
}