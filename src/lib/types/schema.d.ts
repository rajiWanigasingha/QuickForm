import type { TextState } from '$lib/components/Text/TextState.svelte.js';
import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';

export type QuickFormSchema = Map<string, TextState | NumberState>;