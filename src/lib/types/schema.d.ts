import type { TextState } from '$lib/components/Text/TextState.svelte.js';
import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
import type { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
import type { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';
import type { SelectState } from '$lib/components/Select/SelectState.svelte.js';
import  { BooleanValidationObj, NumberValidationObj, type TextValidationObj } from '$lib/components/Validation/ValidationObj.js';

export type Choices = { key: string; value: boolean; title: string; helper?: string }[];

export type Selects = { label: string; value: string }[];

export type QuickFormTextInput = {
	label: string;
	helper: string;
	placeholder: string;
};

export type QuickFormTextInputActions = {
	validation?: TextValidationObj;
	preProcess?: () => string;
	postProcess?: () => string;
}

export type QuickFormNumberInput = {
	label: string;
	helper: string;
	placeholder: string;
};

export type QuickFormNumberInputActions = {
	validation?: NumberValidationObj;
	preProcess?: () => number;
	postProcess?: () => number;
}

export type QuickFormBooleanInput = {
	label: string;
	helper: string;
};

export type QuickFormBooleanInputActions = {
	validation?: BooleanValidationObj;
	preProcess?: () => boolean;
	postProcess?: () => boolean;
}


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

export type QuickFormInputs = {
	name: string,
	input: TextState | NumberState | BooleanState | ChoicesState | SelectState
};