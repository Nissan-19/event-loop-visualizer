import { useEffect, useState } from "react"

function GuessOutput({expectedOutput}) {
  const [userInput, setUserInput] = useState("")
  const expectedOutputString = expectedOutput.join("\n").trim().toLowerCase()
  const enteredText = userInput.trim().toLowerCase()
  const [answerStatus, setAnswerStatus] = useState("idle")

  function check(){ 
     if(expectedOutputString === enteredText){
      setAnswerStatus("correct")
      return
     } setAnswerStatus("incorrect")
  }

  function updateValue(event){
    setAnswerStatus("idle")
    setUserInput(event.target.value)
  }

  function handleResetGuess() {
    setUserInput("")
    setAnswerStatus("idle")
  }
  
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-lg shadow-black/20">
      <h2 className="mb-2 font-semibold text-white">
        Guess the Output
      </h2>

      <p className="mb-3 text-sm text-slate-400">
        Enter each output on a new line.
      </p>

      <textarea
        id="output-guess"
        rows="5"
        aria-label="textarea"
        value={userInput}
        placeholder={"Write Your answer here"}
        className="w-full resize-none rounded-md border border-slate-700 bg-[#0d1117] p-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
        onChange={updateValue}
      />

          {answerStatus === "idle" &&
            <button
              type="button"
              onClick={check}
              disabled = {enteredText.length === 0}
              className="mt-3 w-full rounded-md bg-yellow-400 px-3 py-2 font-semibold text-slate-950 transition hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed focus-visible:ring-yellow-300"
            >
              Check Answer
            </button>}
          {answerStatus === "correct" && 
            <button 
              type="button"
              disabled
              className="mt-2 w-full p-2 text-center border rounded-xl bg-green-500 text-green-950 disabled:cursor-not-allowed">Correct Answer</button>}
          {answerStatus === "incorrect" &&
            <button 
              type="button"
              onClick={handleResetGuess}
              className="mt-2 p-2 w-full text-center border rounded-xl bg-red-500 text-red-950">Incorrect Answer (Reset)</button>
          }
        
    </section>
  )
}

export default GuessOutput