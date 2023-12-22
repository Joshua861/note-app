<script lang="ts">
	import { notes } from '$lib/notes.ts';
	import { v4 as uuidv4 } from 'uuid';
	import { goto } from '$app/navigation';

	let title: string;
	let content: string;

	function save() {
		let id = uuidv4();
		notes.update((n) => [
			...n,
			{
				title: title,
				id: id,
				date: Date.now(),
				content: content
			}
		]);
		goto(`/note?id=${id}`);
	}
</script>

<div class="prose mx-auto font-mono">
	<h1>Create Note</h1>

	<div class="flex gap-5">
		<input
			name="title"
			bind:value={title}
			type="text"
			placeholder="Title"
			class="flex-1 border border-black"
		/>
		<button
			class="hover:bg-300 w-fit w-fit flex-1 border border-black hover:bg-neutral-100"
			on:click={save}>Save note</button
		>
	</div>
	<br />
	<textarea bind:value={content} class="h-[80svh] w-full border border-black" placeholder="Content"
	></textarea>
</div>
