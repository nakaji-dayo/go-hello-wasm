import App from './App.svelte';
import init from '../../wasm_exec.js'

const app = (async () => {
	const Go = init()
	const go = new Go();
	console.log("go", go, Go)
	console.log("Go", Go)
	
    const result = await WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject)
    const mod = result.module;
    const inst = result.instance;

	return new App({
		target: document.body,
		props: {
			name: 'world',
			inst,
			mod,
			go
			}
		});
	})()

export default app;