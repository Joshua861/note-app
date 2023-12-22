<script lang="ts">
	import { notes } from '$lib/notes.ts';
	import Time from 'svelte-time';
	import { onMount } from 'svelte';

	console.log($notes);
	let noNotes: boolean = false,
		mounted = false;

	onMount(() => {
		noNotes = $notes.length === 0;
		mounted = true;
	});
</script>

<div class="prose mx-auto font-mono">
	<h1>Notes</h1>
	{#if noNotes}
		<h2>No notes... yet</h2>
		<a href="/create">Create one</a>
	{/if}
	<ul class="list-none">
		{#each $notes as note}
			<li>
				<a href="/note?id={note.id}">{note.title}</a>
				<br />
				<Time timestamp={note.time} class="text-neutral-500" />
				<br /><br />
			</li>
		{/each}
	</ul>
</div>
