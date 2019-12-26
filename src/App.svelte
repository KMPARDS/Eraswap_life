<svelte:component this={$page.component} {...$page.props} />
<script>
  import router, { page } from './router'
  router.start()
  document.getElementById('start-loader').style.display = 'none';
</script>
