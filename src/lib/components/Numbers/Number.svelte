<script lang="ts">

	import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
	import { loadingForm, resetForm, submitState } from '$lib/components/formStatus.svelte.js';
	import { untrack } from 'svelte';

	let { name, numberState }: { name: string, numberState: NumberState } = $props();
	let inputValue = $state('');

	function rejectCharacter(num: string) {
		if (!isNaN(Number(num))) {
			inputValue = num;
		} else {
			inputValue = inputValue.slice(0, -1);
		}
	}

	function reset() {
		inputValue = '';
		numberState.resetNumber()
	}

	$effect(() => {
		if (resetForm.reset) {
			reset();
		}
	})


	$effect(() => {
		if (submitState.submit > 0) {
			untrack(() => {
				numberState.submitValidate();
			});
		}
	})

</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{numberState.getLabel()}" class="text-sm font-medium">{numberState.getLabel()}</label>
	<input
		type="text"
		name="{name}"
		bind:value={inputValue}
		oninput={(e) => {rejectCharacter(e.currentTarget.value)}}
		onfocusout={() => numberState.setNumber(inputValue)}
		placeholder={numberState.getPlaceholder()}
		class="border rounded-md border-black/20 bg-black/10 placeholder:text-black/70 text-sm disabled:cursor-not-allowed"
		disabled={loadingForm.loading}
	>
	{#if numberState.errors === ""}
		<label for="helper" class="text-xs font-base">{numberState.getHelper()}</label>
	{:else}
		<label for="error" class="text-xs font-base text-red-600">{numberState.errors}</label>
	{/if}
</div>
