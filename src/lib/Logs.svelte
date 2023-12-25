<script>
    import { afterUpdate } from 'svelte';

    import { fade, slide } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

    import { logs } from "./game.js";

    let logContainer;

    afterUpdate(() => {
        logContainer.scrollTop = logContainer.scrollHeight;
    });
</script>


<section id="logs" transition:slide={{ duration: 500, easing: backInOut, axis: 'x' }}>
    <div bind:this={logContainer} class="logContainer scroll">   
        {#each $logs as log}
            <div transition:fade={{ duration: 250 }} class="log {log.type}">
                <p>
                    <span>{log.time} > </span>
                    {log.info}
                </p>
            </div>
        {/each}
    </div>
    <div class="bg bg_2"></div>
    <div class="bg bg_1"></div>
</section>


<style>
    section {
        display: block;
        width: 600px;

        background-color: #1d1d55;

        position: absolute;
        right: 0; top: 0; bottom: 0;
        z-index: 1; 
    }
    .logContainer {
        overflow-y: scroll;
        height: 100%;
    }
    .log { padding: 5px 15px; }
    .log p { margin: 5px; }
    span {
        color: #fff;
        font-weight: bold;
        font-size: 1.25em;
    }
    .loot { animation: loot 3s infinite; }
    .boost { background-color: #00ff001c;}
    .global { font-weight: 1.25em; }
    .danger { animation: danger 15s; }
    .lethal { animation: lethal 3s infinite; }
    @keyframes lethal {
        0% { background: #ff000040; }
        50% { background: #ff000050; }
        100% { background: #ff000040; }
    }
    @keyframes danger {
        0% { background: #ff730040; }
        25% { background: #ff730050; }
        100% { background: none; }
    }
    @keyframes loot {
        0% { background: #00ff001c; }
        50% { background: #00ff0021; }
        100% { background: #00ff001c; }
    }
</style>