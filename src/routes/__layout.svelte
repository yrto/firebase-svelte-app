<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ page }: Partial<LoadInput>): Promise<LoadOutput> {
		return { props: { path: page.path } };
	}
</script>

<script lang="ts">
	import '../app.css';
	import { auth } from '$lib/auth';
	import { beforeUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/organisms/Header.svelte';
	import ContainerApp from '$lib/components/atoms/ContainerApp.svelte';
	import ContainerPage from '$lib/components/atoms/ContainerPage.svelte';
	export let path: string;
	beforeUpdate(() => {
		if (!$auth.pending && $auth.isSignedIn && path === '/login') {
			goto('/settings');
		} else if (!$auth.pending && !$auth.isSignedIn && path === '/settings') {
			goto('/login');
		} else if (!$auth.pending && !$auth.isSignedIn && path === '/new') {
			goto('/login');
		}
	});
</script>

<Header />
<ContainerApp>
	<ContainerPage>
		{#if !$auth.pending}
			<slot />
		{/if}
	</ContainerPage>
</ContainerApp>
