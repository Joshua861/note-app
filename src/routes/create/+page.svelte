<script lang="ts">
	import { notes } from '$lib/notes.ts';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';

	let title: string = '';
	let content: string = '';
	let id = uuidv4();

	function update() {
		let savedTitle = title !== '' ? title : 'No title';
		let updatedNote = {
			title: savedTitle,
			id: id,
			date: Date.now(),
			content: content
		};

		deleteNote(id);
		createNote(updatedNote);
	}

	function createNote(note) {
		notes.update((n) => {
			return [note, ...n];
		});
	}

	function deleteNote(id) {
		notes.update((notes) => notes.filter((note) => note.id !== id));
	}

	function save() {
		goto(`/note?id=${id}`);
	}

	$: content, update();

	$: title, update();
</script>

<div class="prose mx-auto h-[100vh] border-neutral-300 px-3 font-mono">
	<h1>Create Note</h1>

	<div class="flex gap-5">
		<input
			name="title"
			bind:value={title}
			type="text"
			placeholder="Title"
			class="flex-1 border border-neutral-300"
		/>
		<button
			class="hover:bg-300 w-fit w-fit flex-1 border border-neutral-300 hover:bg-neutral-50"
			on:click={save}>Done</button
		>
	</div>
	<br />
	<textarea
		bind:value={content}
		class="h-full w-full border border-neutral-300"
		placeholder="Content"
	></textarea>
</div>
