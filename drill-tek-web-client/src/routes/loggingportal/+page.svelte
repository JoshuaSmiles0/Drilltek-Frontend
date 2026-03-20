<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import ListItem from "$lib/ui/listItem.svelte";
	import SearchBar from "$lib/ui/searchBar.svelte";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let { data }: any = $props();
let search = $state("")
let filteredPrograms = $derived(
  search
    ? data.programs.filter(program => 
        program.programid.toLowerCase().includes(search.toLowerCase())
      )
    : data.programs
);

function clearSearch() {
	search = ""
}
</script>

<Banner title="Logging Portal" buttonName="Back" link="/mainportal" />
<SearchBar bind:search={search}  clear={clearSearch} type="program" />
<ListItem type="program" subtype="logging" data={filteredPrograms} />