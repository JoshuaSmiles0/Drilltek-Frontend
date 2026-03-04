<script lang="ts">
	import type { DrillProgram } from "$lib/types/drilltek-types";



    export let data


</script>



<h1>this is the page</h1>


{#each data.programs as program (program.programid) }
    <h1>{program.location}</h1>
{/each}


