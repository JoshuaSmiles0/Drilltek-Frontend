<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import EditProgramForm from "$lib/ui/editProgramForm.svelte";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { data }: any = $props();

    let editProgramModal = $state(false)
    let addDrillholeModal = $state(false)

const showeditProgram = () => {
 editProgramModal = true
}

const hideeditProgram = () => {
    editProgramModal = false
}

const showaddDrillhole = () => {
 addDrillholeModal = true
}

const hideaddDrillhole = () => {
    addDrillholeModal = false
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
                <td>{data.session.email}</td>
            </tr>
        </tbody>
     </table>
     <button class="button is-success" onclick={()=>showeditProgram()}>Edit</button>
</div>

<h1 class="title is-3">Drillholes:</h1>
<button class="button is-success" onclick={()=>showaddDrillhole()}>Add Drillhole</button>

<div class="modal {editProgramModal ? 'is-active' : ''}">
              <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="modal-card-head">
                        <div class="modal-card-title has-text-centered">
                            <h1 class="title is-4">Please edit then submit your program details <button class="delete" aria-label="close" onclick={() => hideeditProgram()}></button></h1>
                        </div>
                    </div>
                    <div class="modal-card-body">
                        <form method="post" action="?/editProgram">
                             <EditProgramForm program={data.program} />
                            <button class="button is-success">Submit</button>
                        </form>
                    </div>
                    <div class="modal-card-foot"></div>
                </div>
                <button class="modal-close is-large" aria-label="close" onclick={() => hideeditProgram()}></button>
                 </div>

<div class="modal {addDrillholeModal ? 'is-active' : ''}">
              <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="modal-card-head">
                        <div class="modal-card-title has-text-centered">
                            <h1 class="title is-4">Please enter your Drillhole details <button class="delete" aria-label="close" onclick={() => hideaddDrillhole()}></button></h1>
                        </div>
                    </div>
                    <div class="modal-card-body">
                        <form method="post" action="?/addProgram">
                           
                            <button class="button is-success">add</button>
                        </form>
                    </div>
                    <div class="modal-card-foot"></div>
                </div>
                <button class="modal-close is-large" aria-label="close" onclick={() => hideaddDrillhole()}></button>
                 </div>