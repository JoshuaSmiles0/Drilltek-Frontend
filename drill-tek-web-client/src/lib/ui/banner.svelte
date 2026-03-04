<script lang="ts">
    let {title, link, buttonName} = $props()
</script>


<section class="hero is-success">
    <div class="hero-body has-text-centered">
        <p class="title">{title}</p>
    </div>
</section>
<a class="button is-success mt-2" href="{link}"> {buttonName}</a>