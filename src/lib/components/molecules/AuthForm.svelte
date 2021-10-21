<script lang="ts">
	import { auth } from '$lib/auth';
	import { goto } from '$app/navigation';

	let credentials = {
		email: '',
		password: ''
	};

	const handleSignIn = async () => {
		await auth.signInWithEmail(credentials.email, credentials.password);
		await goto('/');
	};
</script>

<div>
	<form on:submit|preventDefault={handleSignIn}>
		<input type="text" bind:value={credentials.email} placeholder="email" />
		<input type="password" bind:value={credentials.password} placeholder="password" />
		<button type="submit">Submit</button>
	</form>
	<div class="providers">
		<button on:click={() => {}}>Sign In with Google</button>
	</div>
</div>

<style lang="postcss">
	div {
		@apply space-y-6;
	}
	form {
		@apply flex flex-col space-y-2;
	}
	.providers {
		@apply flex flex-col;
	}
	.providers button {
		@apply bg-transparent border-2 border-gray-700 hover:border-gray-600;
	}
</style>
