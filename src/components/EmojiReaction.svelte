<script lang="ts">
  import type { Emoji } from "../types/Emoji";
  import {faThumbsUp, faStar, faRocket, faHeart} from "@fortawesome/free-solid-svg-icons";
  import Fa from 'svelte-fa';

  const nameToIcon = {
    "thumbsup": faThumbsUp,
    "star": faStar,
    "rocket": faRocket,
    "heart": faHeart
  }
  export let name: Emoji;
  export let reacted: boolean
  export let count: number;
</script>

<button class={`w-16 flex gap-x-1 justify-center items-center text-gray-500 cursor-pointer hover:scale-110 transition-transform ${reacted ? 'text-teal-700 border-2 border-teal-900 bg-teal-50 py-3 rounded-full' : ''}`}>
  <Fa icon={nameToIcon[name]} />
  <span class="text-sm">
    {#if count > 0}
    {count}
    {/if}
  </span>
</button>