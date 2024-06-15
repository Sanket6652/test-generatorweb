import { Link } from "react-router-dom"
import logo from "/logo.png"
import { useDispatch } from "react-redux"
import { logout } from "../redux/store"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"

export default function Nav({ isLoggedIn }) {
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logout());
  }

  return <div>
    <nav className="flex gap-2 items-center p-4 border-2">
      <Link to="/" className="flex items-center gap-4">
        <img src={logo} className="w-10 h-10 objecct-cover" />
        <h1 >Test Generator</h1>
      </Link>
      {/* <div className="mx-auto">

        <button className=""><Link to="/user">User</Link></button>
        <button className=""><Link to="/admin">Admin</Link></button>
      </div> */}
      {/* <div className="ml-auto">
        <ul className="flex items-center gap-4">
          <li className="font-bold">USER</li>
          <li><Link to="/user/sign-up">Sign Up</Link></li>
          <li><Link to="/">Dashboard</Link></li>
        </ul>
      </div>
      <div className="ml-auto">
        <ul className="flex items-center gap-4">
          <li className="font-bold">ADMIN</li>
          <li><Link to="/admin/">Sign In</Link></li>
          <li><Link to="/admin/sign-up">Sign Up</Link></li>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
        </ul>
      </div> */}
      {isLoggedIn &&
        <button className="mt-auto flex items-start gap-2 p-2 ml-auto" onClick={handleLogout}>
          <span>
            <ArrowLeftStartOnRectangleIcon className="icon-lg" />
          </span>
          <span>Log Out</span>
        </button>
      }
    </nav >
  </div>
}