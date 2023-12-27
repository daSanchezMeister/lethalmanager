<script>
    import { slide } from 'svelte/transition';

    import { game, shipStorage, dunjonDistance } from "./game.js";

</script>

<main>
<div class="title">
    <pre class="ascii-title">
                             __                                          
 /'\_/`\                  __/\ \__                __                     
/\      \    ___     ___ /\_\ \ ,_\   ___   _ __ /\_\    ___      __     
\ \ \__\ \  / __`\ /' _ `\/\ \ \ \/  / __`\/\`'__\/\ \ /' _ `\  /'_ `\   
 \ \ \_/\ \/\ \L\ \/\ \/\ \ \ \ \ \_/\ \L\ \ \ \/ \ \ \/\ \/\ \/\ \L\ \  
  \ \_\\ \_\ \____/\ \_\ \_\ \_\ \__\ \____/\ \_\  \ \_\ \_\ \_\ \____ \ 
   \/_/ \/_/\/___/  \/_/\/_/\/_/\/__/\/___/  \/_/   \/_/\/_/\/_/\/___L\ \
                                                                  /\____/
                                                                  \_/__/ 
       </pre>
       <pre class="ascii-title glitch glitch2">
                             __                                          
 /'\_/`\                  __/\ \__                __                     
/\      \    ___     ___ /\_\ \ ,_\   ___   _ __ /\_\    ___      __     
\ \ \__\ \  / __`\ /' _ `\/\ \ \ \/  / __`\/\`'__\/\ \ /' _ `\  /'_ `\   
 \ \ \_/\ \/\ \L\ \/\ \/\ \ \ \ \ \_/\ \L\ \ \ \/ \ \ \/\ \/\ \/\ \L\ \  
  \ \_\\ \_\ \____/\ \_\ \_\ \_\ \__\ \____/\ \_\  \ \_\ \_\ \_\ \____ \ 
   \/_/ \/_/\/___/  \/_/\/_/\/_/\/__/\/___/  \/_/   \/_/\/_/\/_/\/___L\ \
                                                                  /\____/
                                                                  \_/__/ 
       </pre>
       <pre class="ascii-title glitch glitch3">
                             __                                          
 /'\_/`\                  __/\ \__                __                     
/\      \    ___     ___ /\_\ \ ,_\   ___   _ __ /\_\    ___      __     
\ \ \__\ \  / __`\ /' _ `\/\ \ \ \/  / __`\/\`'__\/\ \ /' _ `\  /'_ `\   
 \ \ \_/\ \/\ \L\ \/\ \/\ \ \ \ \ \_/\ \L\ \ \ \/ \ \ \/\ \/\ \/\ \L\ \  
  \ \_\\ \_\ \____/\ \_\ \_\ \_\ \__\ \____/\ \_\  \ \_\ \_\ \_\ \____ \ 
   \/_/ \/_/\/___/  \/_/\/_/\/_/\/__/\/___/  \/_/   \/_/\/_/\/_/\/___L\ \
                                                                  /\____/
                                                                  \_/__/ 
       </pre>
    </div>
<div class="panel change_view_glitch">
    <p>Monitoring crewmembers. As mission progress, you'll get fresh data from your current crewmembers.
        <br>During the exploration, try toggling mission logs with command "LOG ON" / "LOG OFF", that way you'll get closer to the action.
    </p>
    <div class="monitor">
        {#each $game.crew as crewmember (crewmember.id)}
        <!-- <div class="crewmember"> -->
        <table id="{crewmember.id}" 
            class:dead={!crewmember.isAlive} 
            class:missing={crewmember.status === "Missing"}>
            <!-- <span class="over"></span> -->
            <thead>
                <tr>
                    <th class="name" colspan="2">
                        {crewmember.name}
                        <span class="productivity">
                            {#if crewmember.productivity === 1}    
                                &#9733;&#9734;&#9734;&#9734;
                            {:else if crewmember.productivity === 2}
                                &#9733;&#9733;&#9734;&#9734;
                            {:else if crewmember.productivity === 3}
                                &#9733;&#9733;&#9733;&#9734;
                            {:else}
                                &#9733;&#9733;&#9733;&#9733;
                            {/if}
                        </span>
                    </th>
                    <th colspan="2">{crewmember.status}</th>
                    <th colspan="2">Traits</th>
                    <th colspan="2">Inventory</th>
                    <th colspan="2">Loot bag</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Location :</td>
                    <td class="center">
                        {#if (crewmember.distanceFromShip === 0)}
                            Safe
                        {:else}
                            {crewmember.location}
                        {/if}
                    </td>
                    <td colspan="2" class="map">
                        <span class="progress" style="width: {Math.round(crewmember.distanceFromShip / dunjonDistance * 100)}%">
                            {#if crewmember.status === "Working"}
                                Scavenging...
                            {:else if crewmember.status === "Seek for exit"}
                                Finding way out
                            {:else if crewmember.status === "Dead"}
                                Lost signal...
                            {:else if crewmember.status === "Panic attack"}
                                ???
                            {/if}
                        </span>
                    </td>
                    {#if crewmember.traits.length === 0}
                        <td colspan="2" class="center"></td>
                    {:else if crewmember.traits.length > 0}
                        <td colspan="2" class="center">{crewmember.traits[0].name}</td>
                    {/if}
                    <td colspan="2" rowspan="2" class="inventory">
                        <ul>
                            {#each crewmember.inventory as inventory}
                                <li>{inventory.name}</li>
                            {/each}
                        </ul>
                    </td>
                    <td colspan="2" rowspan="2" class="lootbag">
                        <ul>
                            {#each crewmember.lootBag as loot}
                                <li transition:slide={{ duration: 400, axis: 'x' }}>{loot.name}</li>
                            {/each}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Health :</td>
                    <td class="center health" 
                        class:high={crewmember.health > 66 && crewmember.health <= 100}
                        class:med={crewmember.health > 33 && crewmember.health <= 66}
                        class:low={crewmember.health > 0 && crewmember.health <= 33}
                        class:dead={crewmember.health === 0}>
                        <div class="heart-rate">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="82px" height="43px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve">
                                <polyline fill="none" stroke="red" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"/>
                            </svg>
                            <div class="fade-in"></div>
                            <div class="fade-out"></div>
                          </div>
                    </td>
                    <td>Sanity :</td>
                    <!-- {crewmember.sanity} -->
                    <td>
                        {crewmember.sanity}
                        {#if crewmember.sanity > 75}
                            Feels good
                        {:else if crewmember.sanity > 50 && crewmember.sanity <= 75}
                            Anxious
                        {:else if crewmember.sanity > 25 && crewmember.sanity <= 50}
                            Scared
                        {:else if crewmember.sanity > 1 && crewmember.sanity <= 25}
                            Close to madness
                        {:else if crewmember.sanity === 0}
                            Went insane !
                        {/if}
                    </td>
                    {#if crewmember.traits.length === 1 || crewmember.traits.length === 0}
                        <td colspan="2" class="center"></td>
                    {:else if crewmember.traits.length > 1}
                        <td colspan="2" class="center">{crewmember.traits[1].name}</td>
                    {/if}
                </tr>
            </tbody>
        </table>
        <!-- </div> -->
        {/each}
    </div>
    <div class="ship">
        <ul>
            {#each $shipStorage as loot}
                <li transition:slide={{ duration: 400, axis: 'x' }}>{loot.name} ({loot.value})</li>
            {/each}
        </ul>
    </div>
</div>
</main>

<style>
    .map {
        position: relative;
        overflow: hidden;
        width: 200px;
    }
    .map .progress {
        position: absolute;
        top: 25%; bottom: 25%;
        left: 0;
        opacity: .5;
        border-right: 5px solid red;
        width: 0px;
        background-color: #00ff001c;

        overflow: hidden;
        text-align: center;

        transition-property: width;
        transition-duration: 2s;
    }
    
    .health { 
        position: relative;
        overflow: hidden;
    }
    .health.high polyline { 
        stroke: #00ff00ad; 
    }
    .health.high .fade-in, .health.high .fade-out {
        animation-duration: 1.5s;
    }
    .health.med polyline { 
        stroke: #ff4800bf; 
    }
    .health.med .fade-in, .health.med .fade-out {
        animation-duration: 1s;
    }
    .health.low polyline { 
        stroke: #ff0000ad; 
    }
    .health.low .fade-in, .health.low .fade-out {
        animation-duration: .5s;
    }
    .health.dead .heart-rate { display: none; }

    .heart-rate {
        position: absolute;
        background: #060606;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -2;
    }
    .fade-in, .fade-out {
        position: absolute;
        height: 100%;
        background-color: #060606;
        top: 0;
        right: 0;
        animation: heartRateIn linear infinite;
    }
    .fade-in {
        width: 100%;
        right: 0;
        animation: heartRateIn linear infinite;
    }
    .fade-out {
        width: 120%;
        left: -120%;
        animation: heartRateOut linear infinite;
    }

    @keyframes heartRateIn {
    0% {
        width: 100%;
    }
    50% {
        width: 0;
    }
    100% {
        width: 0;
    }
    }

    @keyframes heartRateOut {
    0% {
        left: -120%;
    }
    30% {
        left: -120%;
    }
    100% {
        left: 0;
    }
    }
    .ship, .monitor {
        display: inline-block;
        vertical-align: top;
    }
    .name { position: relative; }
    .productivity {
        position: absolute;
        right: 5px;
        top: -1px;
    }
    table { 
        margin-top: 1em;
        position: relative;
        max-height: 127px;
    }
    thead {
        height: 30px;
    }
    td, th {
        /* border: 1px solid var(--main-color); */
        padding: 0 10px;
        overflow: hidden;
    }
    th {
        text-align: left;
        font-size: 1.25em;
        background: #00ff001c;
    }
    .center {text-align: center;}
    ul {
        list-style: disclosure-closed;
        text-align: left;
        margin: 0;
        padding-left: 15px;
    }
    .inventory {
        height: 91px;
        min-width: 200px;
        background: none;
    }

    .dead {
        opacity: .75;
        color: red;
    }
    .dead .heart-rate { display: none; }
    .dead th, .dead .progress { background: #ff00001c; }

    .missing { color: #ffffff70; }
    .missing .heart-rate { display: none; }
    .missing th { background: #ffffff0f; }
    .missing .progress { background-color: #ffffff0f; }
</style>