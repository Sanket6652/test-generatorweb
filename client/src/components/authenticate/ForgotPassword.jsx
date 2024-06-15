import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useSendOTP from "../../hooks/useSendOTP";
import Error from "../Error";
import Loader from "../Loader";
import useVerifyOTP from "../../hooks/useVerifyOTP";
import useUpdatePassword from "../../hooks/useUpdatePassword";

const inputStyles =
  "w-full p-3 mt-2 mb-4 focus:outline-none border-2 rounded-md";
const labelStyles = "font-semibold";

export default function ForgotPassword() {
  const url = useLocation();
  const isAdmin = url.pathname.includes("admin");

  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const { loading, sendOTP } = useSendOTP();
  const { loading: loading1, verifyOTP } = useVerifyOTP();
  const { loading: loading2, updatePassword } = useUpdatePassword();

  const navigate = useNavigate();

  async function handleOTP() {
    try {
      const response = await sendOTP(email);
      if (!response.status) setError(response.payload);
      else setIsOTPSent(true);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleVerifyOTP() {
    try {
      const response = await verifyOTP(email, otp);
      if (!response.status) setError(response.payload);
      else setIsVerified(true);
      console.log(response);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleUpdatePassword() {
    console.log(password, cpassword);
    try {
      const response = await updatePassword(password, cpassword, email, isAdmin);
      if (response.status) navigate("/");
      else setError(response.payload);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      {error && <Error message={error} setter={setError} />}
      <label htmlFor="email" className={labelStyles}>
        Enter Email ID
      </label>
      <input type="email" id="email" placeholder="Email" className={inputStyles} value={email} onChange={(e) => setEmail(e.target.value)} />
      {loading && <Loader />}
      {!isOTPSent && !isVerified && (
        <button className="btn-primary w-full mt-4 rounded-md" onClick={() => handleOTP()} >
          Send Otp
        </button>
      )}

      {isOTPSent && !isVerified && (
        <input type="number" placeholder="OTP" className={inputStyles} value={otp} onChange={(e) => setOtp(e.target.value)} />
      )}
      {loading1 && <Loader />}
      {isOTPSent && !isVerified && (
        <button className="btn-primary w-full mt-4 rounded-md" onClick={() => handleVerifyOTP()} >
          Verify Otp
        </button>
      )}

      {isVerified && (
        <input type="password" placeholder="New Password" className={inputStyles} value={password} onChange={(e) => setPassword(e.target.value)} />
      )}
      {isVerified && (
        <input type="password" placeholder="Confirm Password" className={inputStyles} value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
      )}
      {loading2 && <Loader />}
      {isVerified && (
        <button className="btn-primary w-full mt-4 rounded-md" onClick={handleUpdatePassword}   >
          Update Password
        </button>
      )}
    </div>
  );
}
