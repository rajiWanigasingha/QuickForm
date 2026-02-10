<script lang="ts">
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
	import type { QuickFormInputs } from '$lib/types/schema.js';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { loadingForm, resetForm, stopSubmit, submitState } from '$lib/components/formStatus.svelte.js';

	let {
		schema,
		actionURL,
		onSuccess = () => {
		},
		onError = () => {
		},
		onFailure = () => {
		},
		onRedirect = () => {
		}
	}: {
		schema: QuickFormInputs[],
		actionURL: string,
		onSuccess?: () => void,
		onError?: () => void,
		onFailure?: () => void,
		onRedirect?: () => void
	} = $props();

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const handeSubmit: SubmitFunction = async ({cancel}) => {

		loadingForm.reload()
		submitState.submitForm()

		await sleep(1000)

		if (stopSubmit.stop) {
			cancel()
			stopSubmit.panic()
			loadingForm.reload()
		}

		return async ({ result, update }) => {

			loadingForm.reload()

			if (result.type === 'success') {
				onSuccess();
				await update();
				resetForm.resetState();
			}

			if (result.type === 'error') {
				onError();
			}

			if (result.type === 'failure') {
				onFailure();
			}

			if (result.type === 'redirect') {
				onRedirect();
			}
		};
	};
</script>
<div>
	<form action="{actionURL}" method="post" use:enhance={handeSubmit}>
		<div class="flex flex-col gap-1">
			{#each schema as field ,index (index)}
				{@const schemaField = field.input}
				{#if schemaField instanceof TextState && schemaField !== undefined}
					<Text textState={schemaField} name={field.name} />
				{:else if schemaField instanceof NumberState && schemaField !== undefined}
					<Number numberState={schemaField} name={field.name} />
				{:else if schemaField instanceof BooleanState && schemaField !== undefined}
					<Boolean booleanState={schemaField} name={field.name} />
				{:else if schemaField instanceof ChoicesState && schemaField !== undefined}
					<Choices choices={schemaField} name={field.name} />
				{:else if schemaField instanceof SelectState && schemaField !== undefined}
					<Select select={schemaField} name={field.name} />
				{/if}
			{/each}
			<div class="px-3 flex justify-end">
				<button type="submit"
								disabled={loadingForm.loading}
								class="bg-green-500 w-75 text-white font-bold rounded-xl p-2 text-sm {!loadingForm.loading ? 'cursor-pointer hover:bg-green-600' : 'bg-green-600/80 text-white/80'} disabled:cursor-not-allowed">
					{#if !loadingForm.loading}
						Submit
						{:else}
						Processing ...
					{/if}
				</button>
			</div>
		</div>
	</form>
</div>