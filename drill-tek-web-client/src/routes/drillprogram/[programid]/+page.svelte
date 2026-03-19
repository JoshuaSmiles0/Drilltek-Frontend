<script lang="ts">
	import AddDrillholeForm from "$lib/ui/addDrillholeForm.svelte";
import Banner from "$lib/ui/banner.svelte";
	import EditProgramForm from "$lib/ui/editProgramForm.svelte";
	import Modal from "$lib/ui/modal.svelte";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { data }: any = $props();

    let editProgramModal = $state(false)
    let addDrillholeModal = $state(false)

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
{#each data.holes as drillhole (drillhole.holeid) }
    <div class="columns mt-2">
        <div class="column is-11">
        <div class="box">
                <h1 class="title is-3">DDH-{drillhole.holeid}</h1>
                <p class="subtitle">
                    Dip: {drillhole.dip} <br>
                    Azimuth: {drillhole.azimuth} <br>
                    Length: {drillhole.length}
                </p>
            </div>
    </div>        
    <div class="column is-1">
            <a href="/drillhole/{drillhole.holeid}"  class="button is-success">Open</a>
        </div>
    </div>
{/each}
<Modal boolean={addDrillholeModal} type="addDrillhole" verb="add" formData="" title="Please enter your Drillhole details" action="add" />


