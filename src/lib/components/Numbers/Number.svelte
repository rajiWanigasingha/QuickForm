<script lang="ts">

	import type { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';

	let { name, numberState }: { name: string, numberState: NumberState } = $props();
	let inputValue = $state('');

	function rejectCharacter(num: string) {
		if (!isNaN(Number(num))) {
			inputValue = num;
		} else {
			inputValue = inputValue.slice(0, -1);
		}
	}

</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{numberState.getLabel()}">{numberState.getLabel()}</label>
	<input type="text" name="{name}" bind:value={inputValue} oninput={(e) => {rejectCharacter(e.currentTarget.value)}} onfocusout={() => numberState.setNumber(inputValue)}>
	{#if numberState.errors === ""}
		<label for="">{numberState.getHelper()}</label>
	{:else}
		<label for="">{numberState.errors}</label>
	{/if}
</div>
