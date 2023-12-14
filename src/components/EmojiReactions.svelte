<script lang="ts">
import { Emoji, emojiList } from '../types/Emoji';
import EmojiReaction from './EmojiReaction.svelte';

</script>

<div class="flex gap-x-2 justify-center items-center h-8">

    {#each emojiList as emoji}
        <EmojiReaction name={emoji} reacted count={1} />
    {/each}
</div>