<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { addDocToCollection, listenToCollection } from '$lib/firestore';

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
		if (product.name !== '' && product.price > 0) {
			await addDocToCollection('products', product);
		}
	};

	let unsub = () => {};

	onMount(async () => {
		unsub = listenToCollection('products', (querySnapshot) => {
			let temp = [];
			querySnapshot.forEach((doc) => {
				temp = [...temp, doc.data()];
			});
			products = temp;
		});
	});

	onDestroy(() => unsub());
</script>

<form name="new product form" on:submit|preventDefault={handleSubmit}>
	<label for="new product form">New product:</label>
	<input type="text" placeholder="Name" bind:value={product.name} />
	<input type="number" placeholder="Price" bind:value={product.price} />
	<button style="primary">Cadastrar</button>
</form>

<h2>Products:</h2>

<ul>
	{#each products as product}
		<li>{product.name} | R$ {product.price}</li>
	{:else}
		<p>Loading...</p>
	{/each}
</ul>

<style lang="postcss">
	form {
		@apply flex flex-col gap-2;
	}
	h2 {
		@apply my-4 font-bold;
	}
</style>
