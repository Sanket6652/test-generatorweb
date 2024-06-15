import { useState } from "react";
import { Link } from "react-router-dom";
import ForgotLink from "./ForgotLink";
import useSignup from "../../hooks/useSignup";
import Error from "../Error";

const inputStyles = "w-full p-3 mt-2 mb-4 focus:outline-none border-2 rounded-md";
const labelStyles = "font-semibold";

export default function SignUp() {
  const { signup } = useSignup();
  const [error, setError] = useState();
  const [division, setDivision] = useState("A");

  async function signUp(e) {
    e.preventDefault();
    console.log(e.target)
    try {
      const response = await signup({ name: e.target[0].value, email: e.target[1].value, password: e.target[4].value, division, confirmPassword: e.target[5].value, isAdmin: false })
      if (!response.status) setError(response.payload)
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={signUp}>
        <label htmlFor="name" className={labelStyles}>Name</label>
        <input type="text" id="name" placeholder="name" className={inputStyles} />

        <label htmlFor="email" className={labelStyles}>Email</label>
        <input type="email" id="email" placeholder="email" className={inputStyles} />

        <label htmlFor="division" className={labelStyles}>Division</label>
        <select id="division" className={`bg-white cursor-pointer ${inputStyles}`} value={division} onChange={e => setDivision(e.target.value)}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <input type="text" className={inputStyles} hidden />

        <label htmlFor="password" className={labelStyles}>Password</label>
        <input type="password" id="password" placeholder="password" className={inputStyles} />

        <label htmlFor="cpassword" className={labelStyles}>Confirm Password</label>
        <input type="password" id="cpassword" placeholder="confirm password" className={inputStyles} />

        {/* <div>
          <input type="checkbox" id="rememberMe" className="mr-2 cursor-pointer" />
          <label htmlFor="rememberMe" className="cursor-pointer select-none">Remember Me</label>
        </div> */}
        {error && <Error message={error} setter={setError} />}

        {/* <ForgotLink /> */}

        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign up</button>
      </form>
      <div className="text-slate-400 font-semibold text-center mt-4">or</div>
      <Link to="/user">
        <button type="submit" className="btn-primary w-full mt-4 rounded-md">Sign in</button>
      </Link>
    </div>
  )
}