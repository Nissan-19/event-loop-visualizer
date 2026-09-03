import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useRef, useEffect } from "react"

function CodePanel({ codeLines, activeLineNumber }) {

  const activeLineRef = useRef(null)
  const codeScrollRef = useRef(null)

  useEffect(() => {
      const container = codeScrollRef.current
      const activeLine = activeLineRef.current

      if (!container || !activeLine) {
        return
      }

      const containerRect = container.getBoundingClientRect()
      const lineRect = activeLine.getBoundingClientRect()

      if (lineRect.top < containerRect.top) {
        container.scrollBy({
          top: lineRect.top - containerRect.top,
          behavior: "smooth",
        })
      } else if (lineRect.bottom > containerRect.bottom) {
        container.scrollBy({
          top: lineRect.bottom - containerRect.bottom,
          behavior: "smooth",
        })
      }
    }, [activeLineNumber])

  const codeString = codeLines.join("\n")

  return (
    <section className="mt-2 flex min-h-125 w-full flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg shadow-black/20 lg:min-h-0 lg:flex-1">
      <div className="flex border-b border-slate-700 bg-slate-800/80 px-3 py-2">
        <h2 className="font-semibold text-slate-100">
          app.js
        </h2>

        <p className="ml-auto text-sm text-slate-400">
          Read-only
        </p>
      </div>

      <div 
        ref={codeScrollRef}
        className="min-h-0 flex-1 overflow-auto bg-[#0d1117]">
        <SyntaxHighlighter
    
          language="javascript"
          style={vscDarkPlus}
          showLineNumbers
          wrapLines //SyntaxHighlighter treats all your code as one large bloc, warplines wraps every code line in its own HTML element:
          lineProps={(lineNumber) => { //lineProps is a function that SyntaxHighlighter automatically runs for every wrapped line. It gives us that line’s number:
            if(lineNumber === activeLineNumber){
              return{
                className:"active-code-line block pl-3",
                ref: activeLineRef
              }
            } 
            return{
              className:"block pl-3"
            }
          }}
          customStyle={{
            margin: 0,
            minHeight:"100%",
            background:"#0d1117",
            lineHeight: "1.75rem",
            
          }}
          codeTagProps={{
            style: {
              fontSize: "1rem",              
            },
          }}>
            {codeString}
        </SyntaxHighlighter>
      </div>
    </section>
  )
}


export default CodePanel