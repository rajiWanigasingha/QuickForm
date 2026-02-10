<script lang="ts">
	import type { SelectState } from '$lib/components/Select/SelectState.svelte.js';
	import { onMount, untrack } from 'svelte';
	import { loadingForm, resetForm, submitState } from '$lib/components/formStatus.svelte.js';

	let { name, select }: { name: string, select: SelectState } = $props();
	let inputSelect = $state([] as { label: string, value: string }[]);
	let openSelectDialog = $state(false);
	let searchQuery = $state([] as { selected: boolean, searchRank: boolean, value: { label: string, value: string } }[]);

	function reset() {
		inputSelect = []
		openSelectDialog = false
		searchQuery = []
		select.resetSelect()
	}

	$effect(() => {
		if (submitState.submit > 0) {
			untrack(() => {
				select.submitValidate();
			});
		}
	})

	$effect(() => {
		if (resetForm.reset > 0) {
			reset()
		}
	})

	onMount(() => {
		window.addEventListener('keydown', (e) => {
			if (openSelectDialog && e.key === 'Escape') {
				openSelectDialog = false;
			}
		});

		searchQuery = select.getSelect().map((value) => {
			return { selected: false, searchRank: true, value };
		});
	});

	function addOption(option: { label: string, value: string }) {
		if (select.multiple) {
			inputSelect.push(option);
		} else {
			inputSelect = [option];
			openSelectDialog = false;
		}

		select.setSelect(inputSelect)
	}

	function removeOption(option: { label: string, value: string }) {
		inputSelect = inputSelect.filter((item) => item.value !== option.value);
		searchQuery = searchQuery.map(item => item.value.value === option.value ? { ...item, selected: false } : item);

		select.setSelect(inputSelect)
	}

	function search(query: string) {
		searchQuery = searchQuery.map(item => {
			if (item.value.value.toLowerCase().includes(query.toLowerCase())) {
				return { ...item, searchRank: true };
			} else {
				return { ...item, searchRank: false };
			}
		});
	}
</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{select.getLabel()}" class="text-sm font-medium">{select.getLabel()}</label>
	{#each inputSelect as option (option)}
		<input type="text" name="{name}" hidden value="{option}">
	{/each}
	<button disabled={loadingForm.loading} class="flex items-center justify-between w-full border p-2 rounded-md cursor-pointer bg-black/10 border-black/20 disabled:cursor-not-allowed disabled:blur-[0.7px]"
					onclick={(e) => {
						e.preventDefault();
						openSelectDialog = !openSelectDialog
					}}>
		{#if inputSelect.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each inputSelect as optionVal (optionVal)}
					<span class="bg-blue-600 text-xs font-medium text-white p-1 px-3 rounded-full flex flex-row justify-center items-center gap-1">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20"
								 fill="currentColor">
								<path fill-rule="evenodd"
											d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
											clip-rule="evenodd" />
							</svg>
						{optionVal.label}
					</span>
				{/each}
			</div>
		{:else}
			<span class="text-sm">{select.getPlaceholder()}</span>
		{/if}
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd" />
		</svg>
	</button>

	{#if select.errors === ""}
		<label for="helper" class="text-xs">{select.getHelper()}</label>
	{:else}
		<label for="error" class="text-xs text-red-600">{select.errors}</label>
	{/if}
</div>

{#if openSelectDialog}
	<div
		onclick={() => {
			search('')
			openSelectDialog = false
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				search('')
				openSelectDialog = false
			}
		}}
		role="button"
		tabindex="0"
		aria-label="Close dialog overlay"
		class="fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-xs backdrop-brightness-100"></div>
	<dialog open={true}
					class="w-100 max-h-120 bg-gray-50 border border-gray-300 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
	>
		<div class="relative w-full mb-4">
			<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
					 viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd" />
			</svg>
			<input type="search"
						 oninput={(e) => search(e.currentTarget.value)}
						 class="w-full pl-10 pr-4 py-2 border-0 border-b border-b-gray-300 rounded-t-md focus:outline-none foucs:ring-0 ring-0">
		</div>
		<div class="flex flex-col gap-2 overflow-y-auto max-h-100 p-2">
			{#each searchQuery as option ,index (option.value)}
				{#if option.searchRank}
					{#if option.selected}
						<button
							onclick={() => removeOption(option.value)}
							class="w-full p-2 border cursor-pointer bg-blue-200 border-blue-300 rounded-lg text-sm text-left hover:bg-blue-300 flex items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20"
									 fill="currentColor">
								<path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
							</svg>
							{option.value.label}
						</button>
					{:else}
						<button onclick={() => {
						addOption({label: option.value.label, value: option.value.value})
						searchQuery[index].selected = true
					}}
										class="w-full p-2 border cursor-pointer bg-gray-200 border-gray-300 rounded-lg text-sm text-left hover:bg-gray-300 flex items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20"
									 fill="currentColor">
								<path fill-rule="evenodd"
											d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
											clip-rule="evenodd" />
							</svg>
							{option.value.label}
						</button>
					{/if}
				{/if}
			{/each}
		</div>
	</dialog>
{/if}
