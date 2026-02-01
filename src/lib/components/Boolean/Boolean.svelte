<script lang="ts">
	import type { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';

	let { name, booleanState }: { name: string, booleanState: BooleanState } = $props();
	let inputValue = $state(false);
</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{booleanState.getLabel()}">{booleanState.getLabel()}</label>
	<input type="checkbox" name="{name}" bind:checked={inputValue} onfocusout={() => booleanState.setBoolean(inputValue)}>
	{#if booleanState.errors === ""}
		<label for="">{booleanState.getHelper()}</label>
	{:else}
		<label for="">{booleanState.errors}</label>
	{/if}
</div>
