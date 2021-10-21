<script lang="ts">
	import { onMount } from 'svelte';
	import { getDocsFromCollection } from '$lib/firestore';

	interface productModel {
		name: string;
		price: number;
	}

	let products: productModel[] = [];

	onMount(async () => {
		products = await getDocsFromCollection('products');
	});
</script>

<h1>Produtos</h1>

<ul>
	{#each products as product}
		<li>{product.name} | R$ {product.price}</li>
	{:else}
		<p>Carregando...</p>
	{/each}
</ul>

{#if false}<slot />{/if}

<style lang="postcss">
	h1 {
		@apply font-bold text-xl mb-6;
	}
</style>
