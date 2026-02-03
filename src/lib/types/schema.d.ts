import type { TextState } from '$lib/components/Text/TextState.svelte.js';
import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
import type { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
import type { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';
import type { SelectState } from '$lib/components/Select/SelectState.svelte.js';

export type Choices = { key: string; value: boolean; title: string; helper?: string }[];

export type Selects = { label: string; value: string }[];

export type QuickFormSchema = Map<
	string,
	TextState | NumberState | BooleanState | ChoicesState | SelectState
>;

export type QuickFormTextInput = {
	label: string;
	helper: string;
	placeholder: string;
};

export type QuickFormNumberInput = {
	label: string;
	helper: string;
	placeholder: string;
};

export type QuickFormBooleanInput = {
	label: string;
	helper: string;
};

export type QuickFormChoiceInput = {
	label: string;
	choices: Choices;
	multiple: boolean;
	defaultSelect : string | null;
};

export type QuickFormSelectInput = {
	label: string;
	helper: string;
	placeholder: string;
	select: Selects,
	multiple: boolean,
	defaultSelect: string | null
};