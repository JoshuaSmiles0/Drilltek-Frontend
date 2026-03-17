<script lang="ts">

let {hole} = $props()
const headers = hole ? Object.keys(hole) : []

</script>


     <table class="table is-bordered is-hoverable is-fullwidth">
        <thead >
        <tr class="is-success">
        {#each headers as header, index(header)  }
                <th>{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
            <tr>
            {#each Object.entries(hole) as [key, value] (key) }
                <td>{value}</td>
            {/each}
            </tr>
        </tbody>
     </table>

