import { useEffect, useState } from "react"
import CodePanel from "../component/CodePanel"
import ConsolePanel from "../component/console/ConsolePanel"
import GuessOutput from "../component/guess/GuessOutput"
import Header from "../component/Header"
import StepExplanation from "../component/lesson/StepExplanation"
import RuntimeBoard from "../component/runtime/RuntimeBoard"
import PlaybackControls from "../controls/PlaybackControls"
import lessonCatalog from "../data/lessons/lessonCatalog"


function AppLayout (){
  
  const [currentStep, setCurrentStep] = useState(0)
 
  const [isPlaying, setIsPlaying] = useState(false)

  const [selectedLessonId, setSelectedLessonId] = useState(lessonCatalog[0].id)//When the app loads for the first time, automatically select the first lesson in the catalogue.

  const activeLesson = lessonCatalog.find((lesson)=> selectedLessonId === lesson.id)

  const lastStep = activeLesson.steps.length
  
 

  const currentEvent = currentStep === 0 ? null : activeLesson.steps[currentStep - 1] // to match the index number and what is displayed on the screen
                                                  //retrieves the event stored at that index//at 0 currentEvent is null because execution has not started. It is not because array index 0 is null.
  
  const currentExplanation = currentEvent === null ? "Press Next to begin the JavaScript execution." : currentEvent.explanation

  const codeLines = activeLesson.codeLines

  const activeLineNumber = currentEvent === null ? null : currentEvent.lineNumber

  const executedEvents = activeLesson.steps.slice(0,currentStep)//to save all the event that have been executed

  const executedActions = executedEvents.flatMap((event) => {return event.actions ? event.actions : [event]})
  //We used flatMap() because our lesson steps can contain either one action or multiple actions.
  const filteredSteps = activeLesson.steps.filter((event)=>( //this is for getting the correct output for the guess part(start)
     event.type === "PRINT_CONSOLE"
  ))
  const expectedOutput = filteredSteps.map((filtredStep)=>(
     filtredStep.value
  ))// (end)

  
  const currentCallStack = []
  executedActions.forEach((event)=>{
    if(event.type === "PUSH_STACK"){
      currentCallStack.push(event.label)
    } else if(event.type === "POP_STACK"){
        currentCallStack.pop()
      }
  })

  const currentBrowserApi = []
  executedActions.forEach((event)=>{
    if(event.type === "ADD_BROWSER_API"){
      currentBrowserApi.push(event.label)
    }else if(event.type === "REMOVE_BROWSER_API"){
      const itemIndex = currentBrowserApi.indexOf(event.label) //getting the index of the lable stored in browser api
        currentBrowserApi.splice(itemIndex, 1)//startting at item index only remove 1 item
    }
  })
  
  const currentTaskQueue = []
  executedActions.forEach((event)=>{
    if(event.type === "ADD_TASK_QUEUE" ){
      currentTaskQueue.push(event.label)
    }else if(event.type === "REMOVE_TASK_QUEUE"){
      const itemIndex = currentTaskQueue.indexOf(event.label) //getting the index of the lable stored in browser api
        currentTaskQueue.splice(itemIndex, 1)//startting at item index only remove 1 item
    }
  })

  const currentMircrotask = []
  executedActions.forEach((event)=>{
    if(event.type === "ADD_MICROTASK_QUEUE"){
      currentMircrotask.push(event.label)
    }else if(event.type === "REMOVE_MICROTASK_QUEUE"){
      const itemIndex = currentMircrotask.indexOf(event.label)
        currentMircrotask.splice(itemIndex, 1)
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

  function handleLessonChange(lessonId){
    setSelectedLessonId(lessonId)
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      
      <Header
        selectedLessonId = {selectedLessonId}
        handleLessonChange = {handleLessonChange}
        />
      
      
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
              currentBrowserApi={currentBrowserApi}
              currentTaskQueue={currentTaskQueue}
              currentMicrotask = {currentMircrotask}
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
