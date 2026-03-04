<script>
	import { invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";



$: if($page.status === 401 ) {
    setTimeout(invalidateAll,5000);
}

</script>

<h1>error</h1>
<p>trying again in 5 seconds</p>