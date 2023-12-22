<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { notes } from '$lib/notes.ts';
	import { onMount } from 'svelte';

	let id,
		mounted = false,
		note,
		title: string,
		content: string;

	onMount(() => {
		if ($page.url.searchParams.get('id')) {
			id = $page.url.searchParams.get('id');
			note = $notes.find((note) => note.id === id);
			title = note.title;
			content = note.content;
		} else {
			goto('/create');
		}

		mounted = true;
	});

	function save() {
		let updatedNote = {
			title: title,
			id: id,
			date: Date.now(),
			content: content
		};

		notes.update((n) => n.map((note) => (note.id === id ? updatedNote : note)));
		goto(`/note?id=${id}`);
	}
</script>

<div class="prose mx-auto px-3 font-mono">
	{#if mounted}
		<h1>Edit note</h1>

		<div class="flex gap-5">
			<input
				name="title"
				bind:value={title}
				type="text"
				placeholder="Title"
				class="flex-1 border border-neutral-300"
			/>
			<button
				class="hover:bg-300 w-fit w-fit flex-1 border border-neutral-300 hover:bg-neutral-100"
				on:click={save}>Save note</button
			>
		</div>
		<br />
		<textarea
			bind:value={content}
			class="h-[80svh] w-full border border-neutral-300"
			placeholder="Content"
		></textarea>
	{/if}
</div>
