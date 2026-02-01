import type { TextState } from '$lib/components/Text/TextState.svelte.js';
import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
import type { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
import type { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';

export type Choices = { key: string; value: boolean; title: string; helper?: string }[];

export type QuickFormSchema = Map<string, TextState | NumberState | BooleanState | ChoicesState>;