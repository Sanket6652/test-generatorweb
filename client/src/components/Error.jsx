import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Error({ message, setter }) {
  return <div className="text-red-600 text-[12px] flex items-cener justify-between my-10">
    <p className="text-[20px] font-semibold">
      {message}
    </p>
    <span onClick={() => setter("")}>
      <XMarkIcon className="w-6 cursor-pointer" />
    </span>
  </div>
}