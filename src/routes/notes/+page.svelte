<script lang="ts">
	import { notes, hasVisited } from '$lib/notes.ts';
	import Time from 'svelte-time';
	import { onMount } from 'svelte';

	let noNotes: boolean = false;

	function removeEmptyNotes() {
		notes.update((notes) => notes.filter((note) => note.title !== '' && note.content !== ''));
	}

	onMount(() => {
		removeEmptyNotes();
		if (!$hasVisited) {
			hasVisited.set(true);
			notes.update((n) => [
				...n,
				{
					title: 'How to use',
					id: 'how-to-use',
					date: Date.now(),
					content: `
This notes app supports *markdown*, meaning you can add:

*Italics*, **bold**, \`code\`, [links](https://commonmark.org/help/).

> Blockquotes

- Unordered lists,

1. and ordered lists

---

## Subheadings,

and more.

If you don't know markdown, then you can learn [here](https://commonmark.org/help/), or edit this note to see the markdown.
`
				}
			]);
		}
		noNotes = $notes.length === 0;
	});
</script>

<div class="prose mx-auto px-3 font-mono">
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
