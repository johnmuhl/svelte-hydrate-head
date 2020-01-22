require("svelte/register")({ hydratable: true });
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");

let server = Hapi.server({
	port: 9666,
});

async function provision() {
	await server.register(Inert);

	server.route([
		{
			method: "GET",
			path: "/",
			handler: (request, h) => {
				let props = { title: "svelte-hydrate-head" };
				// let component = require("./component.svelte").default;
				let component = require("./component.cjs");
				let { css, head, html } = component.render(props);
				let document = String();

				document = "<!doctype html><html>";
				document = `${document}<head>${head}</head>`;
				document = `${document}<body>${html}`;
				document = `${document}
<script type=module>
  import C from "/component.js";
  new C({
	hydrate: true,
	props: ${JSON.stringify(props)},
	target: document.body,
  });
</script>`;
				document = `${document}</body></html>`;

				return document;
			},
		},
		{
			method: "GET",
			path: "/{file*}",
			handler: (request, h) => {
				return h.file(request.params.file);
			},
		},
	]);

	await server.start();
	console.info(server.info);
}

provision();
