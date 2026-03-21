<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import ListItem from "$lib/ui/listItem.svelte";
	import SearchBar from "$lib/ui/searchBar.svelte";


 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 let { data }: any = $props();
   let search = $state() as number

let filteredHoles = $derived(
  search
    ? data.holes.filter(hole => 
        hole.holeid === search
      )
    : data.holes
);

function clearSearch() {
	search = ""
}

</script>


<Banner title={data.program} buttonName="Logging Portal" link="/loggingportal" email={data.session.email} />

<h1 class="title is-3 mt-2">Drillholes:</h1>
<SearchBar bind:search={search}  clear={clearSearch} type="hole" />
<ListItem type="holes" subtype="logging" data={filteredHoles} />