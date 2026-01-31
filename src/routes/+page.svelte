<script lang="ts">
	import type { QuickFormSchema } from '$lib/types/schema.js';
	import { TextState } from '$lib/components/Text/TextState.svelte.js';
	import QuickFormBuilder from '$lib/compileFormSchema/QuickFormBuilder.svelte';
	import { TextValidation } from '$lib/components/Text/Text.validation.js';

	class nameInput extends TextState {
		override validation() {
			return new TextValidation(this.text).minLength(3).maxLength(10);
		}
	}

	class emailInput extends TextState {
	}

	const quickForm: QuickFormSchema = new Map([
		['name', new nameInput('Name', 'Enter your name', 'Name')],
		['email', new emailInput('Email', 'Enter your email', 'Email')]
	]);


	console.log(quickForm);

</script>

<QuickFormBuilder schema={quickForm} />