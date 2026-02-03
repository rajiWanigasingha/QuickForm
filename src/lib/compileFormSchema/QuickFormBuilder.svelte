<script lang="ts">
	import type { QuickFormSchema } from '$lib/types/schema.js';
	import { TextState } from '$lib/components/Text/TextState.svelte.js';
	import Text from '$lib/components/Text/Text.svelte';
	import Number from '$lib/components/Numbers/Number.svelte';
	import { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';
	import { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
	import Boolean from '$lib/components/Boolean/Boolean.svelte';
	import { ChoicesState } from '$lib/components/Choices/ChoicesState.svelte.js';
	import Choices from '$lib/components/Choices/Choices.svelte';
	import { SelectState } from '$lib/components/Select/SelectState.svelte.js';
	import Select from '$lib/components/Select/Select.svelte';

	let { schema }: { schema: QuickFormSchema } = $props();
</script>

<div class="flex flex-col gap-1">
	{#each schema.keys() as field ,index (index)}
		{@const schemaField = schema.get(field)}
		{#if schemaField instanceof TextState && schemaField !== undefined}
			<Text textState={schemaField} name={field}/>
		{:else if schemaField instanceof NumberState && schemaField !== undefined}
			<Number numberState={schemaField} name={field}/>
		{:else if schemaField instanceof BooleanState && schemaField !== undefined}
			<Boolean booleanState={schemaField} name={field}/>
		{:else if schemaField instanceof ChoicesState && schemaField !== undefined}
			<Choices choices={schemaField} name={field}/>
		{:else if schemaField instanceof SelectState && schemaField !== undefined}
			<Select select={schemaField} name={field}/>
		{/if}
	{/each}
</div>