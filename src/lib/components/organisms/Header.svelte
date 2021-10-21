<script>
	import ContainerApp from '../atoms/ContainerApp.svelte';
	import AuthNav from '../molecules/AuthNav.svelte';
</script>

<header>
	<ContainerApp>
		<nav>
			<a href="/">Home</a>
			<AuthNav />
		</nav>
	</ContainerApp>
</header>

<style lang="postcss">
	header {
		@apply sticky top-0 py-6 border-b border-gray-700;
	}
	nav {
		@apply flex justify-between items-center;
	}
	a {
		@apply py-2;
	}
</style>
