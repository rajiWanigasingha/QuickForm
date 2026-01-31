<script lang="ts">
	import type { TextState } from '$lib/components/Text/TextState.svelte.js';

	let {name ,textState} : {name: string, textState: TextState} = $props();
	let inputValue = $state("")
</script>

<div class="flex flex-col p-3 gap-2">
	<label for="{textState.getLabel()}">{textState.getLabel()}</label>
	<input type="text" name="{name}" bind:value="{inputValue}" onfocusout={() => textState.setText(inputValue)}>
	<label for="">{textState.getHelper()}</label>
</div>
