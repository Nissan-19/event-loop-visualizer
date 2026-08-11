

function CodePanel (){
  return (
    <section className="w-full min-h-125 flex flex-col mt-2 border rounded-sm">
        <div className="flex border-b px-2 py-1">
            <h2 className="font-semibold">
                app.js
            </h2>
            <p className="ml-auto text-sm  text-slate-400">
                Read-only
            </p>
        </div>
    <div className="flex-1 overflow-x-auto bg-slate-200">
    <pre> 
    <code>
    {`    console.log("Start");

    function greetUser() {
    console.log("Hello");
    }

    greetUser();

    console.log("End");`}
    </code>
    </pre>
    </div>
    </section>
  ) //<pre> preformatted text, preserves spaces and line breaks
    // <code> tells the browser that the content is programming code.
}

export default CodePanel
