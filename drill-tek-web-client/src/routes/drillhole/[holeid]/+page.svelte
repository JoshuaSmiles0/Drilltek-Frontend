<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";

 let { data }: any = $props();

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
                {#if data.drillhole.type === 2}
                    <td>Exploration</td>
                {/if}
                {#if data.drillhole.type === 1}
                    <td>Infill</td>
                {/if}
                <td>{data.drillhole.programid}</td>
                <td>{data.drillhole.userid}</td>
                <td>{data.drillhole.dateplanned}</td>
                <td>{data.drillhole.dateupdated}</td>
            </tr>
        </tbody>
     </table>
     <button class="button is-success">Edit</button>
</div>