<script lang="ts">
import Banner from '$lib/ui/banner.svelte';
	import ListItem from '$lib/ui/listItem.svelte';
	import Modal from '$lib/ui/modal.svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let { data }: any = $props();

let addProgramModal = $state(false)

</script>

<Banner title="Drilling Portal" buttonName="Back" link="/mainportal" />

<ListItem type="program" subtype="drilling" data={data.programs} />

 <Modal boolean={addProgramModal} type="addProgram" verb="add" formData="" title="Please enter your program details" action="add" />
