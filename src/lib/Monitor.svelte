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
        <table id="{crewmember.id}" class:dead={!crewmember.isAlive}>
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
                    <td>Location</td>
                    <td class="center">
                        {#if (crewmember.distanceFromShip === 0)}
                            In ship
                        {:else}
                            {crewmember.location}
                        {/if}
                    </td>
                    <td colspan="2" class="map">
                        {#if crewmember.status === "Working" || crewmember.status === "Seek for exit"}
                            :/Unkown_position
                        {:else}
                            <span class="progress" style="left: {Math.round(crewmember.distanceFromShip / dunjonDistance * 100)}%"></span>
                        {/if}
                    </td>
                    {#if crewmember.traits.length === 0}
                        <td colspan="2" class="center"></td>
                    {:else if crewmember.traits.length > 0}
                        <td colspan="2" class="center">{crewmember.traits[0]}</td>
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
                    <td>Health</td>
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
                    <td colspan="2">free space</td>
                    <!-- <td colspan="2" class="map">
                        {#if crewmember.status === "Working"}
                            (Unkown position)
                        {:else}
                        <span class="progress" style="left: {Math.round(crewmember.distanceFromShip / dunjonDistance * 100)}%"></span>
                        <svg id="elsQ2NGV8Mq1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 207 46" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                            <path d="M0,33.96107l5.805166-2.138745l6.721771,1.833209l8.402213-1.069373l6.263469,5.041329l15.276753-3.208119l4.124723-2.291513l2.291512-3.055351l1.680442,1.680443q4.430257-.000001,4.735792.305534t5.957933,2.138746l10.388191-1.985979L75.61992,33.65553l5.805166.611069l14.054613-.916605l12.985239-2.291513l3.66642-2.138745l2.291513,3.971955l1.527675-2.138745l6.110701,5.652399q5.652397-.305535,5.957932-.305535c.305535,0,16.193358-1.680443,16.498893-1.680443q.305535,0,15.123985-2.749816q6.416236,1.985979,6.416236,2.138746t7.94391-1.833211q4.430257-2.597048,4.735792-2.597048t7.943911-6.378044h20.318081l-.000001,23h-207.000001L0,33.96107Z" transform="matrix(1.045459 0 0 1.856062-4.704992-34.714921)" fill="rgba(0,255,0,0.6784313725490196)" stroke-width="0.5"/><path d="" fill="none" stroke="#3f5787" stroke-width="0.5"/></svg>
                        {/if}
                    </td> -->
                    {#if crewmember.traits.length === 1 || crewmember.traits.length === 0}
                        <td colspan="2" class="center"></td>
                    {:else if crewmember.traits.length > 1}
                        <td colspan="2" class="center">{crewmember.traits[1]}</td>
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
    .dead {
        opacity: .75;
        color: red;
    }
    .dead th { background-color: #ff00001c; }
    .map {
        position: relative;
        overflow: hidden;
        width: 200px;
    }
    .map .progress {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        opacity: .5;
        border: 3px dotted red;
        width: 2px;

        transition-property: left;
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
        stroke: #ff5100ad; 
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
    .health.dead svg { display: none; }

    .heart-rate {
        position: absolute;
        background: #060606;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
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
    }
    thead {
        height: 30px;
    }
    td, th {
        /* border: 1px solid var(--main-color); */
        padding: 0 10px;
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
</style>