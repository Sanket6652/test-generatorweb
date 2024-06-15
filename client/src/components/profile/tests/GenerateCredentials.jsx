import { useState } from "react";

const inputStyles = "w-full p-3 mt-2 mb-4 focus:outline-none border-2 rounded-md";
const labelStyles = "font-semibold";

export default function GenerateCredentials() {
  const [isGenerated, setIsGenerated] = useState(false);

  function sendCredentials() {
    setIsGenerated(true);
  }

  return <div className="md:w-[512px] mx-4 md:mx-auto pb-16">
    <h1 className="mb-10">Generate</h1>

    <label htmlFor="email" className={labelStyles}>Email</label>
    <input type="text" id="email" placeholder="email" className={inputStyles} />

    <label htmlFor="password" className={labelStyles}>Password</label>
    <input type="text" id="password" placeholder="password" className={inputStyles} />
    <button className="btn-scnd rounded-lg" onClick={sendCredentials}>Generate</button>

    {isGenerated && <p className="text-[#2ECC71]">Successfully Sent</p>}
  </div>
};