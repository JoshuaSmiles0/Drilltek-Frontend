<script lang="ts">

    const {log} = $props()
    const logheaders = log[0]
    const headers = logheaders ? Object.keys(logheaders) : []

</script>


<table class="table is-fullwidth">
            <thead>
            <tr>
            {#each headers as header, index(header)  }
            {#if header !== "index"}
                <th>{header}</th>
            {/if}
            {/each}
            </tr>
            </thead>
                <tbody>
                    {#each log as record (record.index) }
                    <tr>
                    {#each headers as header, index(header) }
                    {#if header !== "index"}
                        <td>{record[header]}</td>
                    {/if}
                    {/each}
                    </tr>
                    {/each}
                </tbody>
        </table>