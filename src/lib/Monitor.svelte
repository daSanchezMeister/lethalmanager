<script>
    import { fade, slide } from 'svelte/transition';
    import { backInOut } from 'svelte/easing';

    import { game, shipStorage } from "./game.js";

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
        <table>
            <thead>
                <tr>
                    <th colspan="2">{crewmember.name}</th>
                    <th colspan="2">VIP Employee</th>
                    <th colspan="2">Traits</th>
                    <th colspan="2">Inventory</th>
                    <th colspan="2">Loot bag</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Status</td>
                    <td class="center stat">{crewmember.status}</td>
                    <td>Distance</td>
                    <td class="center stat">{crewmember.distanceFromShip === 0 ? 'Inside ship' : crewmember.distanceFromShip}</td>
                    <!-- <td>{crewmember.traits[0].name}</td>
                    <td class="center stat">{crewmember.traits[0].value}</td> -->
                    {#if crewmember.traits.length === 0}
                        <td colspan="2" class="center stat"></td>
                    {:else if crewmember.traits.length > 0}
                        <td colspan="2" class="center stat">{crewmember.traits[0]}</td>
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
                                <li>{loot.name}</li>
                            {/each}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Health</td>
                    <td class="center stat">{crewmember.health}</td>
                    <td>Productivity</td>
                    <td class="center stat">
                        {#if crewmember.productivity === 1}    
                            &#9733; &#9734; &#9734; &#9734;
                        {:else if crewmember.productivity === 2}
                            &#9733; &#9733; &#9734; &#9734;
                        {:else if crewmember.productivity === 3}
                            &#9733; &#9733; &#9733; &#9734;
                        {:else}
                            &#9733; &#9733; &#9733; &#9733;
                        {/if}
                    </td>
                    {#if crewmember.traits.length === 1 || crewmember.traits.length === 0}
                        <td colspan="2" class="center stat"></td>
                    {:else if crewmember.traits.length > 1}
                        <td colspan="2" class="center stat">{crewmember.traits[1]}</td>
                    {/if}
                </tr>
            </tbody>
        </table>
        {/each}
    </div>
    <div class="ship">
        <ul>
            {#each $shipStorage as loot}
                <li transition:slide={{ duration: 500, easing: backInOut, axis: 'x' }}>{loot.name} ({loot.value})</li>
            {/each}
        </ul>
    </div>
</div>
</main>

<style>
    .ship, .monitor {
        display: inline-block;
        vertical-align: top;
    }
    table { margin-top: 1em;}
    thead {
        height: 30px;
    }
    td, th {
        min-width: 100px;
        border: 1px solid var(--main-color);
        background: #00ff000a;
        padding: 0 10px;
    }
    th {
        text-align: left;
        font-size: 1.25em;
        background: #00ff001c;
    }
    .center {text-align: center;}
    .stat { 
        background: none;
        padding: 0;
    }
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