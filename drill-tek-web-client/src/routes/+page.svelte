<script>

let login = $state(false)

const showLogin = () => {
 login = true
}

const hideLogin = () => {
    login = false
}
</script>



<div class="columns mt-6 pt-6">
<div class="column is-6 is-offset-3">
<div class="box ml-3 mr-3">
<section class="columns is-vcentered">
    <div class="column is-5">
    <h1 class="title is-1">Welcome to drilltek</h1>
    <h2 class="title is-4">All Things Diamond Drilling, All In One Place</h2>
    <button onclick={() => showLogin()} class="button is-success">login</button>
    </div>
    <div class="column is-1"></div>
    <div class="column is-6">
    <img class="is-fullwidth" style="border-radius: 5%;" src="../landingImage.jpg" alt="drill cores">
    </div>
</section>
    </div>
    </div>
    </div>

   <div class="modal {login ? 'is-active' : ''}">
              <div class="modal-background"></div>
                <div class="modal-card">
                    <div class="modal-card-head">
                        <div class="modal-card-title has-text-centered">
                            <h1 class="title is-4">Please enter your email address <button class="delete" aria-label="close" onclick={() => hideLogin()}></button></h1>
                        </div>
                    </div>
                    <div class="modal-card-body">
                        <form method="post" action="">
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
                    </div>
                    <div class="modal-card-foot"></div>
                </div>
                <button class="modal-close is-large" aria-label="close" onclick={() => hideLogin()}></button>
                 </div>
