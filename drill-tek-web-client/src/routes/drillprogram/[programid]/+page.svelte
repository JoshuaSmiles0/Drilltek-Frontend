<script lang="ts">
import Banner from "$lib/ui/banner.svelte";
	import ListItem from "$lib/ui/listItem.svelte";
	import Modal from "$lib/ui/modal.svelte";
	import SearchBar from "$lib/ui/searchBar.svelte";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { data }: any = $props();

    let editProgramModal = $state(false)
    let addDrillholeModal = $state(false)
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

<Banner title={data.program.programid} buttonName="Drilling Portal" link="/drillingportal" />
<div class="box mt-4">
     <h1 class="title is-3">Details:</h1>
     <table class="table is-bordered is-hoverable is-fullwidth mb-6">
        <thead >
        <tr class="is-success">
            <th>Program ID</th>
            <th>Orebody</th>
            <th>Location</th>
            <th>Target</th>
            <th>Total Holes</th>
            <th>Total Meters</th>
            <th>Date Planned</th>
            <th>Date Updated</th>
            <th>Planned By</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>{data.program.programid}</td>
                <td>{data.program.orebody}</td>
                <td>{data.program.location}</td>
                <td>{data.program.target}</td>
                <td>{data.program.totalholes}</td>
                <td>{data.program.totalmeters}</td>
                <td>{data.program.dateplanned}</td>
                <td>{data.program.dateupdated}</td>
                <td>{data.email}</td>
            </tr>
        </tbody>
     </table>
     <Modal boolean={editProgramModal} type="editProgram" verb="Edit" formData={data.program} title="Please edit then submit your program details" action="Submit" />
</div>

<h1 class="title is-3">Drillholes:</h1>
<SearchBar bind:search={search}  clear={clearSearch} type="hole" />
<ListItem type="holes" subtype="drilling" data={filteredHoles} />
<Modal boolean={addDrillholeModal} type="addDrillhole" verb="add" formData="" title="Please enter your Drillhole details" action="add" />