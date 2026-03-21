<script>
	import AddDrillholeForm from "./addDrillholeForm.svelte";
	import EditDrillholeForm from "./editDrillholeForm.svelte";
	import EditProgramForm from "./editProgramForm.svelte";
	import ProgramForm from "./programForm.svelte";
	import UploadFile from "./uploadFile.svelte";

    let {boolean=$bindable(), type, verb, formData, title, action} = $props()

    const showModal = () => {
 boolean = true
}

const hideModal = () => {
    boolean = false
}

</script>

<button class="button is-success" onclick={()=>showModal()}>{verb}</button>

<div class="modal {boolean ? 'is-active' : ''}">
              <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="modal-card-head">
                        <div class="modal-card-title has-text-centered">
                            <h1 class="title is-4">{title} <button class="delete" aria-label="close" onclick={() => hideModal()}></button></h1>
                        </div>
                    </div>
                    <div class="modal-card-body">
                    {#if type === "addDrillhole"}
                                            <form method="post" action="?/addDrillhole">
                           <AddDrillholeForm />
                            <button class="button is-success">{action}</button>
                        </form>  
                    {/if}
                    {#if type === "editDrillhole"}
                    <form method="post" action="?/editDrillhole">
                             <EditDrillholeForm drillhole={formData} />
                            <button class="button is-success">{action}</button>
                        </form>
                    {/if}
                    {#if type === "addProgram"}
                      <form method="post" action="?/addProgram">
                           <ProgramForm />
                            <button class="button is-success">{action}</button>
                        </form>
                    {/if}
                    {#if type === "editProgram"}
                            <form method="post" action="?/editProgram">
                             <EditProgramForm program={formData} />
                            <button class="button is-success">{action}</button>
                        </form>
                    {/if}
                    {#if type === "checkUser"}
                                            <form method="post" action="?/checkUser">
                            <div class="field">
                            <label class="label" for="email">Email</label>
                            <div class="control has-icons-left">
                                <input id="email" class="input" name="email" type="text" placeholder="email" >
                                <span class="icon is-small is-left">
                                  <i class=" fas fa-solid fa-envelope"></i>
                                </span>
                                </div>
                            </div>
                            <button class="button is-success">login</button>
                        </form>
                    {/if}
                    {#if type === "uploadHoles"}
                    <form method="post" action="?/uploadHoles" enctype="multipart/form-data">
                    <UploadFile/>
                    <button class="button is-success"> {action} </button>
                    </form>
                    
                    {/if}
                    </div>
                    <div class="modal-card-foot"></div>
                </div>
                <button class="modal-close is-large" aria-label="close" onclick={() => hideModal()}></button>
                 </div>
