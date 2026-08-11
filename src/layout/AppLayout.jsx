import CodePanel from "../component/CodePanel"
import ConsolePanel from "../component/console/ConsolePanel"
import GuessOutput from "../component/guess/GuessOutput"
import Header from "../component/Header"
import StepExplanation from "../component/lesson/StepExplanation"
import LessonSelector from "../component/LessonSelector"
import RuntimeBoard from "../component/runtime/RuntimeBoard"
import PlaybackControls from "../controls/PlaybackControls"


function AppLayout (){
  return (
    <div>
      
      <Header/>
      
      
        <main className="grid grid-cols-1 items-start gap-2 p-2 lg:grid-cols-[23fr_57fr_20fr]">
          <div className="" > 
            
            <CodePanel/>
            <PlaybackControls/>
          </div>

          <div className=" ">
            <RuntimeBoard/>
            <StepExplanation/>
          </div>

          <div className="">
            <GuessOutput/>
            <ConsolePanel/>
          </div>
        </main>
    </div>

    
    
  )
}

export default AppLayout
