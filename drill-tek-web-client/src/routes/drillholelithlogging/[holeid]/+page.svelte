<script lang="ts">
	import { drilltekService } from "$lib/services/drilltek-service";
	import Banner from "$lib/ui/banner.svelte";
	import Logform from "$lib/ui/logform.svelte";
	import LogTable from "$lib/ui/logTable.svelte";
	import axios from "axios";
    import Chart from 'svelte-frappe-charts'


    let { data }: any = $props();
    let lith = $state(true);
    let structure = $state(false);
    let alteration = $state(false);
    let mineral = $state(false)
    let overview = $state(false)
    let lithlog = $state(data.lithlog || [{index:Math.random(), start:0, end:0, lithcode:"", comment:"", holeid:data.hole.holeid, userid:data.session.userid}])
    let altlog = $state(data.alterationlog || [{index:Math.random(), start:0, end:0, alterationcode:"", comment:"", holeid:data.hole.holeid, userid:data.session.userid}])
    let struclog = $state(data.structurelog || [{index:Math.random(), start:0, end:0, structurecode:"", comment:"", dip:0, holeid:data.hole.holeid, userid:data.session.userid}])
    let minlog = $state(data.minerallog || [{sampleid:Math.random().toString(), start:0, end:0, estimate:0,comment:"", sampletype:"SAMPLE", texture:"D", holeid:data.hole.holeid, userid:data.session.userid }])

    let active = $state("Lith")

    const graphVals = lithlog.map((log) => ({
        name: log.lithcode,
        values: [log.end - log.start]
    }))

   const graphD = {
    labels:[data.hole.holeid],
    datasets:graphVals
   }

    const showOverview = () => {
    overview = true
    lith = false
    structure = false
    alteration = false
    mineral = false
    active = "Overview"
}

    const showLith = () => {
    lith = true
    structure = false
    alteration = false
    mineral = false
    overview = false
    active = "Lith"
}

    const showAlt = () => {
    lith = false
    structure = false
    alteration = true
    mineral = false
    overview = false
    active = "Alt"
}

    const showStruc = () => {
    lith = false
    structure = true
    alteration = false
    mineral = false
    overview = false
    active = "Struc"
}

    const showMin = () => {
    lith = false
    structure = false
    alteration = false
    mineral = true
    overview = false
    active = "Min"
}

const addLith = () => {
    const last = lithlog.at(-1)
    lithlog = [... lithlog,{index:Math.random(), start:last.end, end:null, lithcode:"", comment:"", holeid:data.hole.holeid, userid:data.session.userid}]
    console.log(lithlog)
}

const addAlt = () => {
    const last = altlog.at(-1)
    altlog = [... altlog,{index:Math.random(), start:last.end, end:null, alterationcode:"", comment:"", holeid:data.hole.holeid, userid:data.session.userid}]
}

const addStruc = () => {
    const last = struclog.at(-1)
    struclog = [... struclog,{index:Math.random(), start:last.end, end:null, structurecode:"", comment:"", dip:null, holeid:data.hole.holeid, userid:data.session.userid}]
}

const addMin = () => {
    const last = minlog.at(-1)
    const lastID = last.sampleid
    let lastArr = lastID.split("")
    const newNum = parseInt(lastArr[lastArr.length -1]) + 1
    const newChar = newNum.toString()
    lastArr.pop()
    lastArr.push(newChar)
    const newId = lastArr.join("")
    minlog = [... minlog,{sampleid:newId, start:last.end, end:null, estimate:null,comment:"", sampletype:"SAMPLE", texture:"D", holeid:data.hole.holeid, userid:data.session.userid }]
}

const deleteMin = (sampleid: string) => {
    minlog = minlog.filter((min) => min.sampleid !== sampleid)
}

const deleteLith = (index: number) => {
    lithlog = lithlog.filter((lith) => lith.index !== index)
}

const deleteStruc = (index: number) => {
    struclog = struclog.filter((struc) => struc.index !== index)
}

const deleteAlt = (index : number) => {
    altlog = altlog.filter((alt) => alt.index !== index)
}

async function uploadLith () {
    const formData = new FormData()
    formData.append('lithLog', JSON.stringify(lithlog))
    const response = await axios.post('?/uploadLith', formData)
    console.log(response.status)
}

async function uploadAlt () {
    const formData = new FormData()
    formData.append('altLog', JSON.stringify(altlog))
    const response = await axios.post('?/uploadAlt', formData)
    console.log(response.status)
}

async function uploadStruc () {
    const formData = new FormData()
    formData.append('strucLog', JSON.stringify(struclog))
    const response = await axios.post('?/uploadStruc', formData)
    console.log(response.status)
}

async function uploadMin () {
    const formData = new FormData()
    formData.append('minLog', JSON.stringify(minlog))
    const response = await axios.post('?/uploadMin', formData)
    console.log(response.status)
}

async function uploadAll () {
    const formData = new FormData()
    formData.append('minLog', JSON.stringify(minlog))
    const response = await axios.post('?/uploadMin', formData)
    console.log(response.status)
}


</script>

<style>
    .is-active {
        background-color: black;
        color: white;
    }
    .table-container {
        height: 25vh;
        overflow-y: auto;
    }
</style>

<Banner title={`DDH-${data.hole.holeid}`} buttonName={data.hole.programid} link={`/drillprogramlogging/${data.hole.programid}`} />

<div class="columns">
    <div class="column is-8">
        <div class="hero is-success mt-4">
            <div class="hero-foot">
                <div class="tabs is-boxed is-fullwidth">
                    <div class="container">
                        <ul>
                        <li>
                            <button class:is-active={"Lith" === active} class="button is-success" onclick={() => showLith()}>
                            Lithology </button>
                        </li>
                        <li>
                            <button class:is-active={"Struc" === active} class="button is-success" onclick={() => showStruc()}>
                             Structure
                            </button>
                        </li>
                        <li>
                            <button class:is-active={"Alt" === active} class="button is-success" onclick={() => showAlt()}> 
                              Alteration
                            </button>
                        </li>
                        <li>
                            <button class:is-active={"Min" === active} class="button is-success" onclick={() => showMin()}> 
                              Mineral
                            </button>
                        </li>
                        {#if data.lithlog !== null}
                            <li>
                            <button class:is-active={"Overview" === active} class="button is-success" onclick={() => showOverview()}>
                              Overview
                              </button>
                        </li>
                        {/if}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
         <button class="button mb-4 is-link" aria-label="save" onclick={() => uploadAll()}>
       Save All
        </button>
        {#if lith}
                 <button class="button mb-4 is-link" aria-label="save" onclick={() => uploadLith()}>
       Save Lith
        </button>
        <div class="box mt-2">
        <h1 class="title is-4">Lithology</h1>
        <Logform log={lithlog} logtype="lithological" logDelete={deleteLith}/>
        <button type="button" class="button is-success" onclick={() => addLith()}>Add</button>
        </div>
        {/if}
        {#if alteration}
                        <button class="button mb-4 is-link" aria-label="save" onclick={() => uploadAlt()}>
       Save Alteration
        </button>
        <div class="box mt-2">
        <h1 class="title is-4">Alteration</h1>
        <Logform log={altlog} logtype="alteration" logDelete={deleteAlt}/>
         <button class="button is-success" onclick={() => addAlt()}>Add</button>
        </div>
        {/if}
        {#if structure}
                        <button class="button mb-4 is-link" aria-label="save" onclick={() => uploadStruc()}>
       Save Structure
        </button>
        <div class="box mt-2">
        <h1 class="title is-4">Structure</h1>
        <Logform log={struclog} logtype="structure" logDelete={deleteStruc}/>
         <button class="button is-success" onclick={() => addStruc()}>Add</button>
        </div>
        {/if}
        {#if mineral}
                        <button class="button mb-4 is-link" aria-label="save" onclick={() => uploadMin()}>
       Save Mineral
        </button>
        <div class="box mt-2">
        <h1 class="title is-4">Mineral</h1>
        {#each minlog as record (record.sampleid) }
    <div class="field is-horizontal">
        <div class="field-body">
        <input bind:value={record.sampleid} class="input" type="text" placeholder="sample Id">
        <input bind:value={record.start} class="input" type="number" placeholder="from">
        <input bind:value={record.end} class="input" type="number" placeholder="to">
        <input bind:value={record.estimate} class="input" type="number" placeholder="est">
        <input bind:value={record.comment} class="input" type="text" placeholder="comment">
         <div class="control">
    <select class="select" bind:value={record.sampletype}>
 <option value="BLANK">BLANK</option>
  <option value="STD1">STD1</option>
  <option value="STD2">STD2</option>
  <option value="STD3">STD3</option>
  <option value="SAMPLE">SAMPLE</option>
    </select>
</div>
 <div class="control">
    <select class="select" bind:value={record.texture}>
 <option value="D">D</option>
  <option value="R">R</option>
  <option value="M">M</option>
  <option value="Sm">Sm</option>
  <option value="X">X</option>
  <option value="F">F</option>
  <option value="Rm">Rm</option>
  <option value="S">S</option>
  <option value="V">V</option>
  <option value="T">T</option>
  <option value="B">B</option>
    </select>
</div>
<input bind:value={record.holeid} class="input" type="hidden">
<input bind:value={record.userid} class="input" type="hidden">
<button type="button" class="button is-danger" aria-label="delete" onclick={() => deleteMin(record.sampleid)}>
<span>
<i class=" fas fa-solid fa-trash"></i>
</span>
</button>
        </div>
    </div>
{/each}

<button class="button is-success" onclick={() => addMin()}>Add</button>
        </div>
        {/if}

        {#if overview}
        <div class="columns">
        <div class="column is-7">
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Lithology</h1>
        <LogTable log={data.lithlog} excludeHeader="index" />
        </div>
        </div>
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Alteration</h1>
        <LogTable log={data.alterationlog} excludeHeader="index" />
        </div>
        </div>
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Structure</h1>
        <LogTable log={data.structurelog} excludeHeader="index" />
        </div>
        </div>
        <div class="box mt-2">
        <div class="table-container">
        <h1 class="title is-4">Mineral</h1>
        <LogTable log={data.minerallog} excludeHeader="sampleid" />
        </div>
        </div>
        </div>
        <div class="column is-5">
        <div class="box">
          <Chart 
  data={graphD}
  type="bar"
  height={400}
  barOptions={{stacked: 1}}
/>
</div>
</div>
</div>
        {/if}


  


