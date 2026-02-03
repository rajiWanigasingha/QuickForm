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
	import { SelectState } from '$lib/components/Select/SelectState.svelte.js';

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

	class countryInput extends SelectState {
	}

	const entries: [string, TextState | NumberState | BooleanState | ChoicesState | SelectState][] = [
		['name', new nameInput({
			label: "Enter your name",
			helper: 'Enter your first name then last name',
			placeholder: 'John wick',
		})],
		['email', new emailInput({
			label: "Enter your email",
			helper: 'Enter your email address. It must be valid',
			placeholder: 'sample@gmail.com',
		})],
		['age', new ageInput({
			label: "Enter your mobile number",
			helper: 'Mobile number must begin with 0, not country code',
			placeholder: '0773451221',
		})],
		['save', new saveButton('Save This Information', 'Check this, if you need to save these', '')],
		['gender', new genderInput('Choose the gender', 'select your gender', [{
				key: 'male',
				value: false,
				title: 'Male',
				helper: 'Gender is male'
			}, { key: 'female', value: false, title: 'Female', helper: 'Gender is female' }],
			false,
			'male'
		)],
		['country', new countryInput('Select Country', 'Select your country', 'Select Country', [
				{ label: 'USA', value: 'USA' },
				{ label: 'United Kingdom', value: 'UK' },
				{ label: 'Canada', value: 'CA' },
				{ label: 'Germany', value: 'DE' },
				{ label: 'France', value: 'FR' },
				{ label: 'Italy', value: 'IT' },
				{ label: 'Spain', value: 'ES' },
				{ label: 'Australia', value: 'AU' },
				{ label: 'Japan', value: 'JP' },
				{ label: 'China', value: 'CN' },
				{ label: 'India', value: 'IN' },
				{ label: 'Brazil', value: 'BR' }
			],
			true,
			'USA')]
	];

	const quickForm: QuickFormSchema = new Map(entries);

</script>

<div class="mx-64 my-16 p-4 bg-gray-100 rounded-lg">
	<p class="text-lg font-semibold">File the form</p>
	<QuickFormBuilder schema={quickForm} />
</div>