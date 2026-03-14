<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";
	import LogTable from "$lib/ui/logTable.svelte";


    let { data }: any = $props();
    const lith = $state(false);
    const structure = $state(false);
    const alteration = $state(false);
    const mineral = $state(false)
    const overview = $state(true)

</script>

<style>
    .is-active {
        background-color: black;
        color: white;

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
                            <a id="lithology" class="is-active">
                            Lithology
                            </a>
                        </li>
                        <li>
                            <a id="structure">
                             Structure
                            </a>
                        </li>
                        <li>
                            <a id="alteration">
                              Alteration
                            </a>
                        </li>
                        <li>
                            <a id="mineral">
                              Mineral
                            </a>
                        </li>
                        <li>
                            <a id="overview">
                              Overview
                            </a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {#if lith}
        <div class="box mt-2">
        <h1 class="title is-4">Lithology</h1>
        <LogTable log={data.lithlog} />
        </div>
        {/if}
        {#if overview}
        <div class="box mt-2">
        <h1 class="title is-4">Lithology</h1>
        <LogTable log={data.lithlog} />
        </div>
        <div class="box mt-2">
        <h1 class="title is-4">Alteration</h1>
        <LogTable log={data.alterationlog} />
        </div>
        <div class="box mt-2">
        <h1 class="title is-4">Structure</h1>
        <LogTable log={data.structurelog} />
        </div>
        {/if}
        </div>
    </div>

