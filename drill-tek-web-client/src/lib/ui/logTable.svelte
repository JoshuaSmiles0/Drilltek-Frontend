<script lang="ts">

    const {log, excludeHeader} = $props()
    const logheaders = log[0]
    const headers = logheaders ? Object.keys(logheaders) : []
    const exclude = excludeHeader

</script>

<style>
    table {
        overflow-y: auto;
    }
</style>


<table class="table is-fullwidth">
            <thead>
            <tr>
            {#each headers as header, index(header)  }
            {#if header !== exclude}
                <th>{header}</th>
            {/if}
            {/each}
            </tr>
            </thead>
                <tbody>
                    {#each log as record (record[excludeHeader]) }
                    <tr>
                    {#each headers as header, index(header) }
                    {#if header !== exclude}
                        <td>{record[header]}</td>
                    {/if}
                    {/each}
                    </tr>
                    {/each}
                </tbody>
        </table>