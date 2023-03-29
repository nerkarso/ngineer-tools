import { createSignal } from "solid-js";

export default function Converter() {
  const [output, setOutput] = createSignal("");
  const [error, setError] = createSignal("");

  function handleInputChange(e) {
    const input: string = e.currentTarget.value;

    // Reset the error and output
    setError("");
    setOutput("");

    // Check for empty input
    if (!input) return;

    // This is where the magic happens
    // We use the eval function to convert the string to a JavaScript object
    // Store the input in a variable so we can evaluate JSON objects
    try {
      let evaluated;
      eval(`evaluated = ${input};`);
      // @ts-ignore
      const json = JSON.stringify(evaluated, null, 2);
      setOutput(json);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div class="flex flex-col h-full px-4 pb-4">
      <div class="grid md:grid-cols-2 md:grid-rows-none gap-4 flex-1 grid-rows-2">
        <textarea
          readOnly
          placeholder="JSON output will appear here"
          class="bg-base-800 rounded-md p-4 border border-base-700 focus:outline-none font-mono text-sm md:order-2"
          value={output()}
        />
        <div class="relative w-full md:order-1">
          {error() && (
            <div class="absolute p-px bottom-0">
              <div class="py-2 px-3 flex items-center bg-base-900 rounded-b-md">
                <p class="text-red-500 font-mono text-xs">{error()}</p>
              </div>
            </div>
          )}
          <textarea
            placeholder="Enter JavaScript array or object"
            class="bg-base-900 text-sm rounded-md p-4 pb-10 border border-base-700 focus:border-primary-500 focus:ring-primary-500 focus:ring-1 focus:outline-none transition font-mono w-full h-full"
            autofocus
            onInput={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
