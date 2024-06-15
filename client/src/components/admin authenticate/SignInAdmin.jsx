import { Link } from "react-router-dom";
import { inputStyles, labelStyles } from "../../utils/data";
import ForgotLink from "../authenticate/ForgotLink";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import Error from "../Error";

export default function SignInAdmin() {
  const { loginAdmin } = useLogin();
  const [error, setError] = useState(false);

  async function signIn(e) {
    e.preventDefault();
    try {
      const response = await loginAdmin({ email: e.target[0].value, password: e.target[1].value })
      if (!response.status) setError(response.payload)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <Error message={error} setter={setError} />}
      <form onSubmit={signIn}>
        <label htmlFor="username" className={labelStyles}>Email</label>
        <input type="text" id="username" placeholder="email" className={inputStyles} />

        <label htmlFor="password" className={labelStyles}>Password</label>
        <input type="password" id="password" placeholder="password" className={inputStyles} />

        <div>
          <input type="checkbox" id="rememberMe" className="mr-2 cursor-pointer" />
          <label htmlFor="rememberMe" className="cursor-pointer select-none">Remember Me</label>
        </div>

        <ForgotLink url="admin" />

        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign in</button>
      </form>
      <div className="text-slate-400 font-semibold text-center mt-4">or</div>
      <Link to="/admin/sign-up">
        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign up</button>
      </Link>
    </div >
  )
}