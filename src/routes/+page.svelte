<script lang="ts">
	import { db, user, userData } from '$lib/firebase.client';
	import { addToShoutbox, getShoutbox } from '$lib/shoutbox';
	import { oneField } from '$lib/utils';
	import { doc, getDoc } from 'firebase/firestore';
	import Login from './Login.svelte';
	import Logout from './Logout.svelte';

	const shoutbox = getShoutbox();

	async function send(msg: string) {
		if (!msg.length) return false;
		await addToShoutbox(msg, $userData!);
		return true;
	}

	function time(d: Date) {
		return d.getHours() + ':' + d.getMinutes();
	}
</script>

<div class="center flex flex-col gap-3">
	<h1>Shoutbox</h1>
	{#if $shoutbox}
		<div class="shoutbox">
			{#each $shoutbox.reverse() as shout}
				<p>
					<span class="text-stone-400 mr-3">{time(shout.timestamp.toDate())}</span>
					<a
						target="_blank noreferrer"
						href="https://github.com/{shout.username}"
						class="font-bold hover:underline"
					>
						{shout.username}:
					</a>
					{shout.message}
				</p>
			{/each}
		</div>
		{#if $userData}
			<form on:submit={oneField(send)}>
				<input name="!" placeholder="..." />
				<input type="submit" value="Send" />
			</form>
		{:else}
			Login to chat
		{/if}
	{:else}
		Loading shoutbox...
	{/if}
	<h1>Account</h1>
	{#if $userData}
		Logged in as {$userData?.username}.
		<Logout />
	{:else}
		<Login />
	{/if}
</div>

<style>
	.shoutbox {
		@apply flex flex-col gap-3;
	}
	.shoutbox p {
		@apply bg-stone-600 p-2;
	}
</style>
