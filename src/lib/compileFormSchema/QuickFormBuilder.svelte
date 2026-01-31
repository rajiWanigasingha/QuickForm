<script lang="ts">
	import type { QuickFormSchema } from '$lib/types/schema.js';
	import { TextState } from '$lib/components/Text/TextState.svelte.js';
	import Text from '$lib/components/Text/Text.svelte';
	import Number from '$lib/components/Numbers/Number.svelte';
	import { NumberState } from '$lib/components/Numbers/NumberState.svelte.js';

	let { schema }: { schema: QuickFormSchema } = $props();
</script>

{#each schema.keys() as field ,index (index)}
	{@const schemaField = schema.get(field)}
	{#if schemaField instanceof TextState && schemaField !== undefined}
		<Text textState={schemaField} name={field}/>
	{:else if schemaField instanceof NumberState && schemaField !== undefined}
		<Number numberState={schemaField} name={field}/>
	{/if}
{/each}