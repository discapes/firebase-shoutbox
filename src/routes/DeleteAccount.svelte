<script lang="ts">
	import { auth, reloadUserdata } from '$lib/firebase.client';

	async function deleteAccount() {
		await fetch('/delete-account', {
			method: 'POST',
			body: JSON.stringify({ idToken: await auth.currentUser?.getIdToken() })
		});
		await auth.currentUser?.reload();
		reloadUserdata();
	}
</script>

<button on:click={deleteAccount}>Delete account</button>
