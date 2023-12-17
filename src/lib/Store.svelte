<script>
    import { store_crew, store_ship, storage } from "./storeItems.js";      
</script>

<main>
<div class="title">
    <pre class="ascii-title">
        ____    __                          
       /\  _`\ /\ \__                       
       \ \,\L\_\ \ ,_\   ___   _ __    __   
        \/_\__ \\ \ \/  / __`\/\`'__\/'__`\ 
          /\ \L\ \ \ \_/\ \L\ \ \ \//\  __/ 
          \ `\____\ \__\ \____/\ \_\\ \____\
           \/_____/\/__/\/___/  \/_/ \/____/
       </pre>
       <pre class="ascii-title glitch glitch2">
        ____    __                          
       /\  _`\ /\ \__                       
       \ \,\L\_\ \ ,_\   ___   _ __    __   
        \/_\__ \\ \ \/  / __`\/\`'__\/'__`\ 
          /\ \L\ \ \ \_/\ \L\ \ \ \//\  __/ 
          \ `\____\ \__\ \____/\ \_\\ \____\
           \/_____/\/__/\/___/  \/_/ \/____/
       </pre>
       <pre class="ascii-title glitch glitch3">
        ____    __                          
       /\  _`\ /\ \__                       
       \ \,\L\_\ \ ,_\   ___   _ __    __   
        \/_\__ \\ \ \/  / __`\/\`'__\/'__`\ 
          /\ \L\ \ \ \_/\ \L\ \ \ \//\  __/ 
          \ `\____\ \__\ \____/\ \_\\ \____\
           \/_____/\/__/\/___/  \/_/ \/____/
       </pre>
    </div>
<div class="panel change_view_glitch">

    <p>
        Use "BUY" command to purchase from the store.<br>
        You can also look for "INFO" to learn more about specific items currently available.
    </p>
    <div class="store">
    
        <section>
            <h1>
                <ul>
                    <li>Crew equipments</li>
                </ul>
            </h1>
            <ul id="crew_stuff">
                {#each store_crew as item (item.id)}
                    <li>{item.name} [{item.price}]</li>
                {/each}
            </ul>
        </section>
        <section>
            <h1>
                <ul>
                    <li>Ship upgrades</li>
                </ul>
            </h1>
            <ul id="ship_stuff">
                {#each store_ship as item (item.id)}
                    <li>{item.name} [{item.price}]</li>
                {/each}
            </ul>
        </section>
        <section>
            <h1>
                <ul>
                    <li>Storage</li>
                </ul>
            </h1>
            {#if $storage.length === 0}
            ... empty storage, purchase item from the store.
            {/if}
            <ul id="storage">
                {#each $storage as item}
                    <li>{item.quantity} {item.name}</li>
                {/each}
            </ul>
        </section>

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
    }
    ul {
        list-style: disclosure-closed;
        padding-left: 19px;
    }
</style>