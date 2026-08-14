import { useState } from "react"
import CodePanel from "../component/CodePanel"
import ConsolePanel from "../component/console/ConsolePanel"
import GuessOutput from "../component/guess/GuessOutput"
import Header from "../component/Header"
import StepExplanation from "../component/lesson/StepExplanation"
import RuntimeBoard from "../component/runtime/RuntimeBoard"
import PlaybackControls from "../controls/PlaybackControls"
import functionCallLesson from "../data/lessons/functionCallLesson"


function AppLayout (){
  
  const [currentStep, setCurrentStep] = useState(0)
  const lastStep = functionCallLesson.steps.length

  const currentEvent = currentStep === 0 ? null : functionCallLesson.steps[currentStep - 1] // to match the index number and what is displayed on the screen
                                                  //retrieves the event stored at that index//at 0 currentEvent is null because execution has not started. It is not because array index 0 is null.
  
  const currentExplanation = currentEvent === null ? "Press Next to begin the JavaScript execution." : currentEvent.explanation

  const codeLines = functionCallLesson.codeLines
  const activeLineNumber = currentEvent === null ? null : currentEvent.lineNumber

  function handleStepIncrement(){
    setCurrentStep((previous)=>previous + 1)
  }

  function handleStepDecrement(){
    setCurrentStep((previous)=>previous - 1)
  }

  function handleReset (){
    setCurrentStep(0)
  }

  return (
    <div>
      
      <Header/>
      
      
        <main className="grid grid-cols-1 items-start gap-2 p-2 lg:grid-cols-[23fr_57fr_20fr]">
          <div > 
            
            <CodePanel
              codeLines = {codeLines}
              activeLineNumber = {activeLineNumber}
              />


            <PlaybackControls
              currentStep = {currentStep}
              handleStepIncrement = {handleStepIncrement}
              handleStepDecrement = {handleStepDecrement}
              handleReset = {handleReset}
              lastStep = {lastStep}
            />
          </div>

          <div >
            <RuntimeBoard/>
            <StepExplanation

              currentExplanation= {currentExplanation}/>
          </div>

          <div >
            <GuessOutput/>
            <ConsolePanel/>
          </div>
        </main>
    </div>

    
    
  )
}

export default AppLayout
