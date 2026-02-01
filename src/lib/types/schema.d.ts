import type { TextState } from '$lib/components/Text/TextState.svelte.js';
import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
import type { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';

export type QuickFormSchema = Map<string, TextState | NumberState | BooleanState>;