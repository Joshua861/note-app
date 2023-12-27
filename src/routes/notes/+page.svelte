<script lang="ts">
	import { notes, hasVisited } from '$lib/notes.ts';
	import Time from 'svelte-time';
	import { onMount } from 'svelte';

	let noNotes: boolean = false,
		mounted = false;

	function removeEmptyNotes() {
		notes.update((notes) =>
			notes.filter((note) => note.title !== 'No title' || note.content !== '')
		);
	}

	onMount(() => {
		mounted = true;
		removeEmptyNotes();
		if (!$hasVisited) {
			hasVisited.set(true);
			notes.update((n) => [
				...n,
				{
					title: 'How to use',
					id: 'how-to-use',
					date: Date.now(),
					content: `This notes app supports *markdown*, meaning you can add:

*Italics*, **bold**, \`code\`, [links](https://commonmark.org/help/).

> Blockquotes

- Unordered lists,

1. and ordered lists

---

## Subheadings,

and more.

If you don't know markdown, then you can learn [here](https://commonmark.org/help/), or edit this note to see the markdown.


## Storage

All your notes are stored on device, meaning they are not sent anywhere and are not visible for others to see. They also aren't able to be synced between devices. They auto save, so, if when writing a note, you close the tab, your writing up to that point will have been saved.`
				}
			]);
		}
		noNotes = $notes.length === 0;
	});
</script>

<svelte:head>
	<title>Notes</title>
</svelte:head>

<div class="prose mx-auto px-3">
	<h1>Notes</h1>
	{#if mounted}
		{#if noNotes}
			<h2>No notes... yet</h2>
			<a href="/create">Create one</a>
		{/if}
		<ul class="list-none font-mono">
			{#each $notes as note}
				<li>
					<a href="/note?id={note.id}">{note.title}</a>
					<br />
					<Time timestamp={note.time} class="text-neutral-500" />
					<br /><br />
				</li>
			{/each}
		</ul>
	{/if}
</div>
