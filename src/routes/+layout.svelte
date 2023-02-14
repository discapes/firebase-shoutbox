<script lang="ts">
	import { auth, reloadUserdata } from '$lib/firebase.client';
	import { getRedirectResult, GithubAuthProvider } from 'firebase/auth';
	import '../app.less';

	getRedirectResult(auth).then(async (result) => {
		if (result) {
			const credential = GithubAuthProvider.credentialFromResult(result);
			await fetch('/auth', {
				method: 'POST',
				body: JSON.stringify({ idToken: await auth.currentUser?.getIdToken(), credential })
			});
			reloadUserdata();
		}
	});
</script>

<svelte:head>
	<title>Shoutbox</title>
</svelte:head>

<div class="min-h-screen min-w-full inline-flex flex-col text-stone-50">
	<main class="grow bg-stone-700 ">
		<slot />
	</main>
	<div class="p-3 text-center bg-stone-800">
		©
		{new Date().getFullYear()}
		Miika Tuominen
	</div>
</div>
