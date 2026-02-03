<script lang="ts">
	import type { SelectState } from '$lib/components/Select/SelectState.svelte.js';
	import { onMount } from 'svelte';

	let { name, select }: { name: string, select: SelectState } = $props();
	let inputSelect = $state([] as {label: string, value: string}[]);
	let openSelectDialog = $state(false);

	onMount(() => {
		window.addEventListener('keydown', (e) => {
			if (openSelectDialog && e.key === 'Escape') {
				openSelectDialog = false;
			}
		});
	});

	function addOption(option: {label: string, value: string}) {
		if (select.multiple) {
			inputSelect.push(option);
		} else {
			inputSelect = [option];
			openSelectDialog = false;
		}
	}
</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{select.getLabel()}">{select.getLabel()}</label>
	{#each inputSelect as option (option)}
		<input type="text" name="{name}" hidden value="{option}">
	{/each}
	<button class="flex items-center justify-between w-full border p-2"
					onclick={() => openSelectDialog = !openSelectDialog}>
		{#if inputSelect.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each inputSelect as optionVal (optionVal)}
					<span>{optionVal.label}</span>
				{/each}
			</div>
		{:else}
			<span>{select.getPlaceholder()}</span>
		{/if}
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd" />
		</svg>
	</button>

	{#if select.errors === ""}
		<label for="">{select.getHelper()}</label>
	{:else}
		<label for="">{select.errors}</label>
	{/if}
</div>

{#if openSelectDialog}
	<div
		onclick={() => openSelectDialog = false}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				openSelectDialog = false
			}
		}}
		role="button"
		tabindex="0"
		aria-label="Close dialog overlay"
		class="fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-xs backdrop-brightness-100"></div>
	<dialog open={true}
					class="w-100 h-100 bg-gray-900 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4"
	>
		<p>{select.getLabel()}</p>
		<div class="flex flex-col gap-2 overflow-y-auto max-h-90 py-4">
			{#each select.getSelect() as option (option.value)}
				<button onclick={() => addOption(option)} class="w-full p-2 border cursor-pointer">{option.label}</button>
			{/each}
		</div>
	</dialog>
{/if}
