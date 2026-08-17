import { useEffect, useState } from "react"
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
  const [isPlaying, setIsPlaying] = useState(false)

  const currentEvent = currentStep === 0 ? null : functionCallLesson.steps[currentStep - 1] // to match the index number and what is displayed on the screen
                                                  //retrieves the event stored at that index//at 0 currentEvent is null because execution has not started. It is not because array index 0 is null.
  
  const currentExplanation = currentEvent === null ? "Press Next to begin the JavaScript execution." : currentEvent.explanation

  const codeLines = functionCallLesson.codeLines
  const activeLineNumber = currentEvent === null ? null : currentEvent.lineNumber

  const executedEvents = functionCallLesson.steps.slice(0,currentStep)//to save all the event that have been executed

  const filteredSteps = functionCallLesson.steps.filter((event)=>( //this is for getting the correct output for the guess part(start)
     event.type === "PRINT_CONSOLE"
  ))
  const expectedOutput = filteredSteps.map((filtredStep)=>(
     filtredStep.value
  ))// (end)

  
  const currentCallStack = []
  executedEvents.forEach((event)=>{
    if(event.type === "PUSH_STACK"){
      currentCallStack.push(event.label)
    } else if(event.type === "POP_STACK"){
        currentCallStack.pop()
      }
  })

  const currentConsoleOutput = []
  executedEvents.forEach((event)=>{
    if(event.type === "PRINT_CONSOLE"){
      currentConsoleOutput.push(event.value)
    }
  })

  function handleStepIncrement(){
    setCurrentStep((previous)=>previous + 1)
  }

  function handleStepDecrement(){
    setCurrentStep((previous)=>previous - 1)
  }

  function handleReset (){
    setCurrentStep(0)
  }

  useEffect(()=>{

      if(!isPlaying ){
        return
      }

      if(currentStep >= lastStep){
        setIsPlaying(false)
        return
      }

      const intervalId = setInterval(() => {
        setCurrentStep((previous)=>previous + 1)
      }, 1000);

      return ()=>{
        clearInterval(intervalId)
      }
    },[isPlaying, currentStep] )

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      
      <Header/>
      
      
        <main className="mx-auto grid max-w-[1800px] grid-cols-1 items-start gap-3 p-3 lg:grid-cols-[23fr_57fr_20fr]">
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
              setIsPlaying = {setIsPlaying}
              isPlaying={isPlaying}
            />
          </div>

          <div >
            <RuntimeBoard
              currentStep = {currentStep}
              lastStep = {lastStep}
              currentCallStack = {currentCallStack}
             />
            <StepExplanation

              currentExplanation= {currentExplanation}/>
          </div>

          <div >
            <GuessOutput
              expectedOutput = {expectedOutput}/>
            <ConsolePanel
              currentConsoleOutput = {currentConsoleOutput}/>
          </div>
        </main>
    </div>

    
    
  )
}

export default AppLayout
