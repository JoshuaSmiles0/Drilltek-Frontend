<script lang="ts">
import Banner from '$lib/ui/banner.svelte';
	import ProgramForm from '$lib/ui/programForm.svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let { data }: any = $props();

let addProgramModal = $state(false)

const showaddProgram = () => {
 addProgramModal = true
}

const hideaddProgram = () => {
    addProgramModal = false
}

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

<button onclick={() => showaddProgram()} class="button is-success">Add Program</button>


<div class="modal {addProgramModal ? 'is-active' : ''}">
              <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="modal-card-head">
                        <div class="modal-card-title has-text-centered">
                            <h1 class="title is-4">Please enter your program details <button class="delete" aria-label="close" onclick={() => hideaddProgram()}></button></h1>
                        </div>
                    </div>
                    <div class="modal-card-body">
                        <form method="post" action="?/addProgram">
                           <ProgramForm />
                            <button class="button is-success">add</button>
                        </form>
                    </div>
                    <div class="modal-card-foot"></div>
                </div>
                <button class="modal-close is-large" aria-label="close" onclick={() => hideaddProgram()}></button>
                 </div>

