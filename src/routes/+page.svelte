<script lang="ts">
	import type { QuickFormInputs } from '$lib/types/schema.js';
	import QuickFormBuilder from '$lib/compileFormSchema/QuickFormBuilder.svelte';
	import { QVBoolean, QVChoice, QVNumber, QVSelect, QVText } from '$lib/components/Validation/ValidationObj.js';
	import { TextState } from '$lib/components/Text/TextState.svelte.js';
	import { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
	import { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
	import { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';
	import { SelectState } from '$lib/components/Select/SelectState.svelte.js';

	const quickForm: QuickFormInputs[] = [
		{
			name: 'firstName',
			input: new TextState(
				{
					label: 'First Name',
					placeholder: 'Wick',
					helper: 'Enter your first name'
				},
				{
					validation: QVText.minLength(4, 'There must be at least 4 characters in your name').maxLength(30)
				}
			)
		},
		{
			name: 'secondName',
			input: new TextState({
				label: 'Second Name',
				placeholder: 'John',
				helper: 'Enter your second name'
			})
		},
		{
			name: 'age',
			input: new NumberState(
				{
					label: 'Enter your age',
					placeholder: '25',
					helper: 'Enter your age. It must be between 18 and 100'
				},
				{
					validation: QVNumber.min(18, 'You must be at least 18 years old').max(100, 'You must be at most 100 years old')
				}
			)
		},
		{
			name: 'save',
			input: new BooleanState(
				{
					label: 'Save your data',
					helper: 'When you check this box, you agree to our terms and conditions'
				},
				{
					validation: QVBoolean.mustBeTrue('You must agree to our terms and conditions')
				}
			)
		},
		{
			name: 'gender',
			input: new ChoicesState(
				{
					label: 'Choose your gender',
					defaultSelect: 'male',
					choices: [
						{
							title: 'Male',
							helper: 'Gender is male',
							key: 'male',
							value: false
						},
						{
							title: 'Female',
							helper: 'Gender is female',
							key: 'female',
							value: false
						}
					],
					multiple: false
				},
				{
					validation: QVChoice.isAtLeastOneChecked('You must choose a gender')
				}
			)
		},
		{
			name: "program",
			input: new SelectState(
				{
					label: "Select programs",
					placeholder: "Select One or More",
					helper: "Select one or multiple program languages",
					select: [
						{
							label: "Java",
							value: "java"
						},
						{
							label: "Python",
							value: "python"
						},
						{
							label: "C++",
							value: "cpp"
						},
						{
							label: "C",
							value: "c"
						}
					],
					multiple: true,
					defaultSelect: null
				},
				{
					validation: QVSelect.isAtLeastOneSelected('You must select at least one program').maxSelected(2, 'You can select a maximum of 2 programs')
				}
			)
		}
	];

</script>

<div class="relative mx-64 my-16 p-4 bg-gray-100 rounded-lg">
	<p class="text-lg font-semibold">File the form</p>
	<QuickFormBuilder schema={quickForm} actionURL="" />

	<div class="absolute inset-0 bg-black/40 rounded-lg flex flex-col p-4 gap-4 justify-center items-center overflow-hidden">
		<img src="/upload.png" alt="upload" class="w-40 h-40 relative z-10 object-contain animate-glow-pulse">
	</div>
</div>

<style>
    @keyframes glow-pulse {
        0%, 100% {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
        }
        50% {
            filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.9));
        }
    }

    .animate-glow-pulse {
        animation: glow-pulse 2s infinite ease-in-out;
    }
</style>