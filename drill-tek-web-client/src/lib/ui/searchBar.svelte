<script>


let {search = $bindable(),  clear, type} = $props()


</script>
<div class="columns">
    <div class="column is-2">
{#if type === "program"}
    <input bind:value={search} class="input is-success mt-4" type="text" placeholder="Search">
<button class="button is-success mt-2" onclick={clear}>Clear</button>
{/if}
{#if type === "hole"}
<input bind:value={search} class="input is-success mt-4" type="number" placeholder="Search">
<button class="button is-success mt-2" onclick={clear}>Clear</button>
{/if}
    </div>
</div>

