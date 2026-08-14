import logo from "../assets/images/logo.png"
import LessonSelector from "./LessonSelector"

function Header() {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-slate-800 bg-[#0b1628] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)] lg:flex-nowrap">
      <img
        className="h-10 w-10"
        src={logo}
        alt="Event Loop Visualizer logo"
      />

      <div className="ml-1">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Event Loop Visualizer
        </h1>

        <p className="text-sm text-slate-400">
          See how JavaScript executes code, one step at a time.
        </p>
      </div>

      <div className="order-3 w-full lg:order-0 lg:ml-6 lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
        <LessonSelector />
      </div>
    </header>
  )
}

export default Header