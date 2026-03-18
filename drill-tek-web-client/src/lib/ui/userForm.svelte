<script>

  const {setPassword} = $props()
  let password = $state("")

</script>



<div class="field">
                            <label class="label" for="password">Password</label>
                            <div class="control has-icons-left">
                                <input bind:value={password} id="password" class="input" name="password" type="text" placeholder="password" >
                                <span class="icon is-small is-left">
                                  <i class=" fas fa-solid fa-key"></i>
                                </span>
                                </div>
                            </div>
                            {#if setPassword}
                            {#if password.length < 15 && password.length > 0}
                             <p class="has-background-danger mt-2 mb-4">Weak Password</p>
                            {/if}
                            {#if password.length >= 15 && password.length <= 20}
                              <p class="has-background-warning mt-2 mb-4">Moderate Password</p>
                            {/if}
                            {#if password.length >20}
                              <p class="has-background-success mt-2 mb-4">Strong Password</p>
                            {/if}
                            {/if}
