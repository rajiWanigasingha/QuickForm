<script lang="ts">
	import type { BooleanState } from '$lib/components/Boolean/BooleanState.svelte.js';
	import { loadingForm, resetForm, submitState } from '$lib/components/formStatus.svelte.js';
	import { untrack } from 'svelte';

	let { name, booleanState }: { name: string, booleanState: BooleanState } = $props();
	let inputValue = $state(false);

	function reset() {
		inputValue = false;
		booleanState.resetBoolean();
	}

	$effect(() => {
		if (resetForm) {
			reset();
			booleanState.resetBoolean();
		}
	});

	$effect(() => {
		if (submitState.submit > 0) {
			untrack(() => {
				booleanState.submitValidate();
			});
		}
	})

</script>

<div class="flex flex-col p-3 gap-2">
	<div class="flex flex-row justify-between items-center">
		<div class="flex flex-col gap-1">
			<label for="{booleanState.getLabel()}" class="text-sm font-medium">{booleanState.getLabel()}</label>
			<label for="helper" class="text-xs">{booleanState.getHelper()}</label>
		</div>
		<div class="{loadingForm.loading ? 'cursor-not-allowed blur-[0.7px]' : ''}">
			<label class="switch">
				<input type="checkbox" class="w-full h-full" disabled={loadingForm.loading} name="{name}" bind:checked={inputValue} oninput={(e) => {
					booleanState.setBoolean(e.currentTarget.checked)
				}}>
				<span class="slider round {loadingForm.loading ? 'cursor-not-allowed' : 'cursor-pointer'}"></span>
			</label>
		</div>
	</div>
	{#if booleanState.errors !== ""}
		<label for="error" class="text-xs text-red-600">{booleanState.errors}</label>
	{/if}
</div>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>