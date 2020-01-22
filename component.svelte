<script>
	import { onMount } from "svelte";

	export let title = String();

	const expected = "svelte-hydrate-head";

	onMount(() => {
		title = document.title;
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<p>
	{#if title === expected}PASS{:else}FAIL{/if}
</p>
