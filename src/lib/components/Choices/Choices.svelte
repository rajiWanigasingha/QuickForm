<script lang="ts">
	import type { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';

	let { name, choices }: { name: string, choices: ChoicesState } = $props();
	let inputValues = $state([] as { key: string, value: boolean }[]);
	let values = $derived(choices.getChoices())

	$effect(() => {
		if (inputValues.length === 0) {
			if (choices.defaultSelect === null) {
				choices.getChoices().forEach(choice => {
					inputValues.push({ key: choice.key, value: false });
				});
			} else {
				choices.getChoices().forEach(choice => {
					inputValues.push({ key: choice.key, value: choices.defaultSelect === choice.key });
				});
			}
		}
	});

	function checkChoices(key: string ,value: boolean) {
		if (choices.multiple) {
			inputValues.map(item => {
				if (item.key === key) item.value = value;
			});
		} else {
			inputValues.map(item => {
				if (item.key === key) {
					item.value = value;
				} else {
					item.value = false;
				}
			});
		}
	}

	$effect(() => {
		if (inputValues) {
			inputValues.forEach(choice => {
				choices.setChoices(choice.key ,choice.value)
			})
		}
	})
</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{choices.getLabel()}" class="text-sm font-medium">{choices.getLabel()}</label>

	<div class="flex flex-col gap-2">
		{#each inputValues as choice ,index (choice.key)}
			<div class="flex flex-row justify-between items-center bg-gray-300 border border-gray-300/70 rounded-md p-2">
				<div>
					<p class="text-sm">{values[index].title}</p>
					<p class="text-xs">{values[index].helper}</p>
				</div>
				<input type="checkbox" name="{name}" bind:checked={choice.value} onchange={(e) => checkChoices(choice.key ,e.currentTarget.checked)} id="{choice.key}">
			</div>
		{/each}
	</div>

	{#if choices.errors !== ""}
		<label for="error" class="text-xs text-red-600">{choices.errors}</label>
	{/if}
</div>
