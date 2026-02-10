<script lang="ts">
	import type { TextState } from '$lib/components/Text/TextState.svelte.js';
	import { loadingForm, resetForm, stopSubmit, submitState } from '$lib/components/formStatus.svelte.js';
	import { untrack } from 'svelte';

	let { name, textState }: { name: string, textState: TextState } = $props();
	let inputValue = $state('');

	function resetInput() {
		inputValue = ''
		textState.resetText()
	}

	$effect(() => {
		if (resetForm.reset > 0) {
			resetInput()
		}
	})

	$effect(() => {
		if (submitState.submit > 0) {
			untrack(() => {
				textState.submitValidate();
			});
		}
	})

</script>

<div class="flex flex-col p-3 gap-1">
	<label for="{textState.getLabel()}" class="text-sm font-medium">{textState.getLabel()}</label>
	<input
		type="text"
		name="{name}"
		bind:value={inputValue}
		placeholder={textState.getPlaceholder()}
		onfocusout={() => textState.setText(inputValue)}
		class="border border-black/20 rounded-md bg-black/10 placeholder:text-black/70 text-sm disabled:cursor-not-allowed disabled:blur-[0.7px]"
		disabled={loadingForm.loading}
	>
	{#if textState.errors === ""}
		<label for="helper" class="text-xs font-base">{textState.getHelper()}</label>
	{:else}
		<label for="error" class="text-xs font-base text-red-600">{textState.errors}</label>
	{/if}
</div>