<script lang="ts">
import { Emoji, emojiList } from '../types/Emoji';
import EmojiReaction from './EmojiReaction.svelte';

export let post: string;

</script>

<div class="flex gap-x-2 justify-center items-center h-8 mt-8">

    {#each emojiList as emoji}
        <EmojiReaction {emoji} reacted count={1} {post}/>
    {/each}
</div>