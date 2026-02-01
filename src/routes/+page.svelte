<script lang="ts">
	import type { QuickFormSchema } from '$lib/types/schema.js';
	import { TextState } from '$lib/components/Text/TextState.svelte.js';
	import QuickFormBuilder from '$lib/compileFormSchema/QuickFormBuilder.svelte';
	import { TextValidation } from '$lib/components/Text/Text.validation.js';
	import { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
	import { NumberValidation } from '$lib/components/Numbers/Number.validation.js';
	import { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
	import { BooleanValidation } from '$lib/components/Boolean/Boolean.validation.js';
	import { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';

	class nameInput extends TextState {
		override validation() {
			return new TextValidation(this.text).minLength(3).maxLength(10);
		}
	}

	class emailInput extends TextState {
	}

	class ageInput extends NumberState {
		override validation() {
			return new NumberValidation(this.number).min(18).max(100);
		}
	}

	class saveButton extends BooleanState {
		override validation() {
			return new BooleanValidation(this.boolean).mustBeTrue();
		}
	}

	class genderInput extends ChoicesState {
	}

	const entries: [string, TextState | NumberState | BooleanState | ChoicesState][] = [
		['name', new nameInput('Name', 'Enter your name', 'Name')],
		['email', new emailInput('Email', 'Enter your email', 'Email')],
		['age', new ageInput('Age', 'Enter your age', 'Age')],
		['save', new saveButton('Save This Information', 'Check this, if you need to save these', '')],
		['gender', new genderInput('Choose the gender', 'select your gender', [{
				key: 'male',
				value: false,
				title: 'Male',
				helper: 'Gender is male'
			}, { key: 'female', value: false, title: 'Female', helper: 'Gender is female' }],
			false,
			'male'
		)]
	];

	const quickForm: QuickFormSchema = new Map(entries);


	console.log(quickForm);

</script>

<QuickFormBuilder schema={quickForm} />