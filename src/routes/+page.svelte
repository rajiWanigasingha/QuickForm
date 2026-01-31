<script lang="ts">
	import type { QuickFormSchema } from '$lib/types/schema.js';
	import { TextState } from '$lib/components/Text/TextState.svelte.js';
	import QuickFormBuilder from '$lib/compileFormSchema/QuickFormBuilder.svelte';

	class nameInput extends TextState {
		override validation() {
			if (this.text.length < 3) {
				throw new Error('Name must be at least 3 characters long');
			}
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