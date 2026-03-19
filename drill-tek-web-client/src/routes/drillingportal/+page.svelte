<script lang="ts">
import Banner from '$lib/ui/banner.svelte';
	import Modal from '$lib/ui/modal.svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let { data }: any = $props();

let addProgramModal = $state(false)

</script>

<Banner title="Drilling Portal" buttonName="Back" link="/mainportal" />

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
            <a href="/drillprogram/{program.programid}" class="button is-success">Open</a>
        </div>
    </div>
{/each}

 <Modal boolean={addProgramModal} type="addProgram" verb="add" formData="" title="Please enter your program details" action="add" />

