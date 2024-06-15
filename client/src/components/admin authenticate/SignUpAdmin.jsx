import { Link } from "react-router-dom";
import { inputStyles, labelStyles } from "../../utils/data";
import ForgotLink from "../authenticate/ForgotLink";
import useSignup from "../../hooks/useSignup";
import { useState } from "react";
import Error from "../Error";

export default function SignUpAdmin() {
  const { signupAdmin } = useSignup();
  const [error, setError] = useState();

  async function signUp(e) {
    e.preventDefault();
    // console.log(e.target)
    try {
      const response = await signupAdmin({ name: e.target[0].value, email: e.target[1].value, password: e.target[2].value, confirmPassword: e.target[3].value, isAdmin: true })
      if (!response.status) setError(response.payload)
      console.log(response)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <Error message={error} setter={setError} />}
      <form onSubmit={signUp}>
        <label htmlFor="name" className={labelStyles}>Name</label>
        <input type="text" id="name" placeholder="Name" className={inputStyles} />

        <label htmlFor="email" className={labelStyles}>Email</label>
        <input type="email" id="email" placeholder="Email" className={inputStyles} />

        <label htmlFor="password" className={labelStyles}>Password</label>
        <input type="password" id="password" placeholder="password" className={inputStyles} />

        <label htmlFor="cpassword" className={labelStyles}>Confirm Password</label>
        <input type="password" id="cpassword" placeholder="confirm password" className={inputStyles} />


        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign up</button>
      </form>
      <div className="text-slate-400 font-semibold text-center mt-4">or</div>
      <Link to="/admin">
        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign in</button>
      </Link>
    </div>
  )
}