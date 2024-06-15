import { useEffect } from "react"
import thanks from "/thank.png"
import { exitFullscreen } from "../../../utils/Fullscreen"

export default function TestCompleted() {

  useEffect(function () {
    exitFullscreen();
    console.log(document)
  }, [])
  return <div className="mx-4 mt-40 lg:w-[740px] lg:mx-auto md:mt-16">
    <img src={thanks} className="w-full aspect-video object-cover" />
  </div>
}