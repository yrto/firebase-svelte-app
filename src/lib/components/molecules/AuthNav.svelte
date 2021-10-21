<script lang="ts">
	import { auth } from '$lib/auth';
</script>

{#if !$auth.pending}
	<ul>
		{#if $auth.user}
			<li><a href="/new">New</a></li>
			<li><a href="/settings">Settings</a></li>
			<li><button on:click={() => auth.signOut()}>Sign Out</button></li>
		{:else}
			<li><a href="/login">Login</a></li>
		{/if}
	</ul>
{:else}
	Loading...
{/if}

<style lang="postcss">
	li {
		@apply flex;
	}
	a {
		@apply py-2;
	}
	ul {
		@apply flex items-center space-x-4;
	}
</style>
