<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
 
  const dispatch = createEventDispatcher();
 
  // Animação de intro desativada — dispara 'done' direto
  onMount(() => {
    dispatch('done');
  });
</script>
 
<!-- Intro desativada -->
 