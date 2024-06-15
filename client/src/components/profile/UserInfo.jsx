import { useSelector } from "react-redux";
import user from "/user.png";

export default function UserInfo() {
  const name = useSelector(store => store.user.name)

  return <div className="flex items-center gap-2">
    <img src={user} className="w-12 h-12 object-cover" />
    <div>
      <h3 className="leading-5 text-xl font-semibold">{name}</h3>
    </div>
  </div>
}