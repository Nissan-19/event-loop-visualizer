import { useState } from "react"

const exercisesByTopic = {
    Topic1: ["Global Execution", "Function Call", "Nested Functions"],
    Topic2: ["Timer After Synchronous Code", "Zero-Delay Timer"],
    Topic3: ["Different Timer Delays", "Timers Waiting for the Stack"],
    Topic4: ["Promise Before Timer", "Microtasks Before Tasks"],
    Topic5: ["Before and After Await", "Async Function Continuation"],
};

function LessonSelector () {

    const [selectedTopic, setSelectedTopic] = useState("")
    const avaliableExercises = exercisesByTopic[selectedTopic] || [];

  return (
    <section className="flex flex-col w-fit sm:flex-row px-2" >
        <div className="mx-1 pt-2">
        <label 
            className="p-3"
            htmlFor="topic">Topic:</label>
            <select
                className=" w-50 border border-slate-300 rounded-md" 
                name="topic" 
                id="topic"
                value={selectedTopic}
                onChange={(event)=>setSelectedTopic(event.target.value)}>
                <option value="" disabled>select a topic</option>
                <option value="Topic1">Synchronous Execution</option>
                <option value="Topic2">Single Timer</option>
                <option value="Topic3">Multiple Timers</option>
                <option value="Topic4">Promise vs Timer</option>
                <option value="Topic5">Async/Await</option>
            </select>
        </div>

        <div className="p-2">
        <label 
            className="p-4"
            htmlFor="exercise">Example:</label>
            <select 
                className="w-60 border border-slate-300 rounded-md"
                name="exercise" 
                id="exercise"
                disabled={!selectedTopic}>
                <option 
                    value="">Select an example
                    </option>
                        
                    {avaliableExercises.map((exercise)=>(
                        <option key={exercise} value={exercise}>
                            {exercise}
                        </option>
                    )
                    )}
            </select>
        </div>
    </section>
  )
}

export default LessonSelector
