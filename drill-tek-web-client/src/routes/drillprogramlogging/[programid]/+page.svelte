<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";


 let { data }: any = $props();


</script>


<Banner title={data.program} buttonName="Logging Portal" link="/loggingportal" />

<h1 class="title is-3 mt-2">Drillholes:</h1>
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
            <a href="/drillholelogging/{drillhole.holeid}"  class="button is-success">Open</a>
        </div>
    </div>
{/each}