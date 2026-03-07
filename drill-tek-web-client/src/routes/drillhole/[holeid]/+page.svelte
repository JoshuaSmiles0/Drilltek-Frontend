<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import EditDrillholeForm from "$lib/ui/editDrillholeForm.svelte";

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 let { data }: any = $props();

let editDrillholeModal = $state(false)

const showeditDrillhole = () => {
 editDrillholeModal = true
}

const hideeditDrillhole = () => {
    editDrillholeModal = false
}
</script>

<Banner title="DDH-{data.drillhole.holeid}" buttonName={data.drillhole.programid} link="/drillprogram/{data.drillhole.programid}" />
<div class="box mt-4">
     <h1 class="title is-3">Details:</h1>
     <table class="table is-bordered is-hoverable is-fullwidth mb-6">
        <thead >
        <tr class="is-success">
            <th>Hole ID</th>
            <th>Easting</th>
            <th>Northing</th>
            <th>Elevation</th>
            <th>Dip</th>
            <th>Azimuth</th>
            <th>Length</th>
            <th>Type</th>
            <th>Drill Program</th>
            <th>Planned By</th>
            <th>Date Planned</th>
            <th>Date Updated</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <td>DDH-{data.drillhole.holeid}</td>
                <td>{data.drillhole.xcoord}</td>
                <td>{data.drillhole.ycoord}</td>
                <td>{data.drillhole.zcoord}</td>
                <td>{data.drillhole.dip}</td>
                <td>{data.drillhole.azimuth}</td>
                <td>{data.drillhole.length}</td>
                {#if data.drillhole.type === 1}
                    <td>Exploration</td>
                {/if}
                {#if data.drillhole.type === 2}
                    <td>Infill</td>
                {/if}
                <td>{data.drillhole.programid}</td>
                <td>{data.email}</td>
                <td>{data.drillhole.dateplanned}</td>
                <td>{data.drillhole.dateupdated}</td>
            </tr>
        </tbody>
     </table>
     <button class="button is-success" onclick={()=> showeditDrillhole()}>Edit</button>
</div>

<div class="modal {editDrillholeModal ? 'is-active' : ''}">
              <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="modal-card-head">
                        <div class="modal-card-title has-text-centered">
                            <h1 class="title is-4">Please edit then submit your drillhole details <button class="delete" aria-label="close" onclick={() => hideeditDrillhole()}></button></h1>
                        </div>
                    </div>
                    <div class="modal-card-body">
                        <form method="post" action="?/editDrillhole">
                             <EditDrillholeForm drillhole={data.drillhole} />
                            <button class="button is-success">Submit</button>
                        </form>
                    </div>
                    <div class="modal-card-foot"></div>
                </div>
                <button class="modal-close is-large" aria-label="close" onclick={() => hideeditDrillhole()}></button>
                 </div>