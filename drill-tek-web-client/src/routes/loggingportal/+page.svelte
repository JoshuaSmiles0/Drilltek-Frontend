<script lang="ts">
	import Banner from "$lib/ui/banner.svelte";


let { data }: any = $props();


</script>

<Banner title="Logging Portal" buttonName="Back" link="/mainportal" />

{#each data.programs as program (program.programid) }
    <div class="columns mt-2">
    
        <div class="column is-11">
        <div class="box">
                <h1 class="title is-3">{program.programid}</h1>
                <p class="subtitle">
                    Location - {program.location} <br>
                    Orebody - {program.orebody} <br>
                    Target - {program.target}
                </p>
            </div>
    </div>        
    <div class="column is-1">
            <a href="/drillprogramlogging/{program.programid}" class="button is-success">Open</a>
        </div>
    </div>
{/each}