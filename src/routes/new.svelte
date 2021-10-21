<script lang="ts">
	import { onMount } from 'svelte';
	import { addDocToCollection, getDocsFromCollection } from '$lib/firestore';

	interface productModel {
		name: string;
		price: number;
	}

	let product: productModel = {
		name: '',
		price: 0
	};

	let products: productModel[] = [];

	const handleSubmit = async () => {
		await addDocToCollection('products', product);
	};

	onMount(async () => {
		products = await getDocsFromCollection('products');
	});
</script>

<ul>
	{#each products as product}
		<li>{product.name} | R$ {product.price}</li>
	{:else}
		<p>Carregando...</p>
	{/each}
</ul>
