
<script>
    let {message, status} = $props()
</script>


<h1 class="title is-1 mb-6">Drilltek</h1>


<article class="message is-danger">
    <div class="message-header">
        Error:{status}
    </div>
    <div class="message-body">
        {message}
    </div>
</article>

