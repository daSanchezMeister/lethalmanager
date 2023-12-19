<script>
    import { game } from "./game.js"; 
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
        {#each $game.crew as crewmember}
            <section>
                <h1><ul><li>{crewmember.name}</li></ul></h1>
                <p><strong>Status</strong>: {crewmember.status}<br>
                    <strong>Health</strong>: {crewmember.health}</p>
                <p>Distance from ship: {crewmember.distanceFromShip}<br>
                    <strong>Movement</strong>: {crewmember.moovement}</p>
                <p><strong>Inventory</strong>:
                    <ul>
                        {#each crewmember.inventory as inventory}
                            <li>{inventory.name}</li>
                        {/each}
                    </ul>

                <p><strong>Loot-bag</strong>: {crewmember.lootBag}</p>
                <p><strong>Traits</strong>: {crewmember.traits}</p>
            </section>
        {/each}
    </div>
</div>
</main>

<style>
    section {
        display: inline-block;
        vertical-align: top;
        width: 300px;
        margin-bottom: 50px;
    }
    h1 ul {
        list-style: disclosure-open;
        padding-left: 19px;
    }
</style>