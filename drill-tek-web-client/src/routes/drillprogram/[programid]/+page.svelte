<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let { data }: any = $props();
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
     <button class="button is-success">Edit</button>
</div>

<h1 class="title is-3">Drillholes:</h1>
<button class="button is-success">Add Drillhole</button>

