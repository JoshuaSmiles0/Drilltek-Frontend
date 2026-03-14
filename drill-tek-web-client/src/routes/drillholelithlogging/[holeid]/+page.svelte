<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import LogTable from "$lib/ui/logTable.svelte";
    import Chart from 'svelte-frappe-charts'


    let { data }: any = $props();
    let lith = $state(true);
    let structure = $state(false);
    let alteration = $state(false);
    let mineral = $state(false)
    let overview = $state(false)

    let active = $state("Lith")

    const graphVals = data.lithlog.map((log) => ({
        name: log.lithcode,
        values: [log.end - log.start]
    }))

   const graphD = {
    labels:[data.hole.holeid],
    datasets:graphVals
   }

    const showOverview = () => {
    overview = true
    lith = false
    structure = false
    alteration = false
    mineral = false
    active = "Overview"
}

    const showLith = () => {
    lith = true
    structure = false
    alteration = false
    mineral = false
    overview = false
    active = "Lith"
}

    const showAlt = () => {
    lith = false
    structure = false
    alteration = true
    mineral = false
    overview = false
    active = "Alt"
}

    const showStruc = () => {
    lith = false
    structure = true
    alteration = false
    mineral = false
    overview = false
    active = "Struc"
}

    const showMin = () => {
    lith = false
    structure = false
    alteration = false
    mineral = true
    overview = false
    active = "Min"
}


</script>

<style>
    .is-active {
        background-color: black;
        color: white;
    }
    .table-container {
        height: 25vh;
        overflow-y: auto;
    }
</style>

<Banner title={`DDH-${data.hole.holeid}`} buttonName={data.hole.programid} link={`/drillprogramlogging/${data.hole.programid}`} />

<div class="columns">
    <div class="column is-8">
        <div class="hero is-success mt-4">
            <div class="hero-foot">
                <div class="tabs is-boxed is-fullwidth">
                    <div class="container">
                        <ul>
                        <li>
                            <button class:is-active={"Lith" === active} class="button is-success" onclick={() => showLith()}>
                            Lithology </button>
                        </li>
                        <li>
                            <button class:is-active={"Struc" === active} class="button is-success" onclick={() => showStruc()}>
                             Structure
                            </button>
                        </li>
                        <li>
                            <button class:is-active={"Alt" === active} class="button is-success" onclick={() => showAlt()}> 
                              Alteration
                            </button>
                        </li>
                        <li>
                            <button class:is-active={"Min" === active} class="button is-success" onclick={() => showMin()}> 
                              Mineral
                            </button>
                        </li>
                        <li>
                            <button class:is-active={"Overview" === active} class="button is-success" onclick={() => showOverview()}>
                              Overview
                              </button>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {#if lith}
        <div class="box mt-2">
        <h1 class="title is-4">Lithology</h1>
        <LogTable log={data.lithlog} excludeHeader="index" />
        </div>
        {/if}
        {#if overview}
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Lithology</h1>
        <LogTable log={data.lithlog} excludeHeader="index" />
        </div>
        </div>
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Alteration</h1>
        <LogTable log={data.alterationlog} excludeHeader="index" />
        </div>
        </div>
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Structure</h1>
        <LogTable log={data.structurelog} excludeHeader="index" />
        </div>
        </div>
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Mineral</h1>
        <LogTable log={data.minerallog} excludeHeader="sampleid" />
        </div>
        </div>
          <Chart 
  data={graphD}
  type="bar"
  height={400}
  barOptions={{stacked: 1}}
/>
        {/if}
        </div>
    </div>


  


