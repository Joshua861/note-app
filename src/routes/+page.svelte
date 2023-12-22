<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		goto('/notes');
	});
</script>
