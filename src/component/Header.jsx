import logo from "../assets/images/logo.png"
import LessonSelector from "./LessonSelector"

function Header () {


  return (
    <header className="flex flex-wrap lg:flex-nowrap gap-3 mt-2 px-3 items-center">

        <img    className="w-10 h-10"
                src={logo} alt="Logo Image" />
        <div className="ml-1">
            <h1 className=" text-2xl font-semibold ">
                Event Loop Visualizer
            </h1>
            <p className="text-sm font-extralight">
                See how JavaScript executes code, one step at a time.
            </p>
        </div>

        <div className="order-3 w-full lg:order-0 lg:ml-6 lg:flex lg:min-w-0 lg:flex-1 lg:justify-center">
            <LessonSelector/>
        </div>

        <button className="ml-auto shrink-0 rounded-md border border-slate-300 px-3 py-2 text-sm">
            theme
        </button>
    </header>
  )
}

export default Header
