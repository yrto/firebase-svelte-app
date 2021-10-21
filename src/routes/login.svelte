<script>
	import { auth } from '$lib/auth';
	import AuthForm from '$lib/components/molecules/AuthForm.svelte';
</script>

{#if !$auth.pending && !$auth.isSignedIn}
	<AuthForm />
{/if}

{#if false}<slot />{/if}
