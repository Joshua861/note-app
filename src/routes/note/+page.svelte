<script lang="ts">
	import { page } from '$app/stores';
	import { notes } from '$lib/notes.ts';
	import { goto } from '$app/navigation';
	import Time from 'svelte-time';
	import SvelteMarkdown from 'svelte-markdown';
	import { onMount } from 'svelte';

	let id, note;
	let mounted = false;

	function deleteNote() {
		notes.update((n) => n.filter((note) => note.id !== id));
		goto('/notes');
	}

	function editNote() {
		goto(`/edit?id=${id}`);
	}

	onMount(() => {
		if ($page.url.searchParams.get('id')) {
			id = $page.url.searchParams.get('id');
			note = $notes.find((note) => note.id === id);
			console.log(note);
		} else {
			goto('/notes');
		}
		if (!note) {
			goto('/notes');
		}

		mounted = true;
	});
</script>

<div class="prose mx-auto px-3">
	{#if mounted}
		<h1>{note.title}</h1>
		<span class="font-mono text-neutral-500">
			<Time timestamp={note.date} /> |
			<button on:click={deleteNote}>delete</button> |
			<button on:click={editNote}>edit</button>
		</span>

		<SvelteMarkdown source={note.content} />
	{/if}
</div>
