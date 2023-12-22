import { persisted } from 'svelte-persisted-store';

export const notes = persisted('notes', []);
