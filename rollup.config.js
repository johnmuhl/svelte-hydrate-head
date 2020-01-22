import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";

export default [
	{
		input: "component.svelte",
		output: {
			file: "component.js",
			format: "esm",
		},
		plugins: [
			resolve({ browser: true }),
			svelte({
				hydratable: true,
			}),
		],
	},
	{
		input: "component.svelte",
		output: {
			file: "component.cjs",
			format: "cjs",
		},
		plugins: [
			resolve(),
			svelte({
				generate: "ssr",
				hydratable: true,
			}),
		],
	},
];
