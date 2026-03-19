<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import ListItem from "$lib/ui/listItem.svelte";


 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 let { data }: any = $props();


</script>


<Banner title={data.program} buttonName="Logging Portal" link="/loggingportal" />

<h1 class="title is-3 mt-2">Drillholes:</h1>
<ListItem type="holes" subtype="logging" data={data.holes} />