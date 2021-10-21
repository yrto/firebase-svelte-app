<script lang="ts">
	import { app } from '$lib/firebase';
	import { auth } from '$lib/auth';
	import { getStorage, ref, uploadBytes } from 'firebase/storage';

	let avatar, preview;
	let avatarName: string;

	const storage = getStorage(app);

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			preview = e.target.result;
		};
		avatar = image;
		avatarName = image.name;
	};

	const handleSave = () => {
		const storageRef = ref(storage, 'users/' + $auth.user.uid + '/' + avatarName);
		uploadBytes(storageRef, avatar).then((snapshot) => {
			console.log('Uploaded a blob or file!', avatar.name);
		});
	};
</script>

{#if !$auth.pending}
	{#if $auth.user}
		<div>
			Name: {$auth.user.displayName}
		</div>
		<div>
			E-mail: {$auth.user.email}
		</div>
		{#if avatar}
			<img class="avatar" src={preview} alt="preview user avatar" />
		{:else}
			<img
				class="avatar"
				src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
				alt=""
			/>
		{/if}

		<input type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} />
		<button on:click={handleSave}>Save</button>
	{/if}
{:else}
	Checking auth status...
{/if}

<style lang="postcss">
	.avatar {
		@apply w-20;
	}
</style>
