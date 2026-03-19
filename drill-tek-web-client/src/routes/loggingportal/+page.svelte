<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import ListItem from "$lib/ui/listItem.svelte";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let { data }: any = $props();


</script>

<Banner title="Logging Portal" buttonName="Back" link="/mainportal" />
<ListItem type="program" subtype="logging" data={data.programs} />