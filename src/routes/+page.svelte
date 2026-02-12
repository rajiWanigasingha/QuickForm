<script lang="ts">
	import QuickFormBuilder from '$lib/compileFormSchema/QuickFormBuilder.svelte';
	import { quickForm } from './formInputs.js';
</script>

<div class="relative mx-64 my-16 p-4 bg-gray-100 rounded-lg">
	<p class="text-lg font-semibold">File the form</p>
	<QuickFormBuilder schema={quickForm} actionURL="" />
</div>
