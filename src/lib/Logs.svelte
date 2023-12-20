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
            <div transition:fade={{ duration: 250 }} class="log">
                <p class={log.type}>
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
        width: 500px;

        background-color: #1d1d55;

        position: absolute;
        right: 0; top: 0; bottom: 0;
        z-index: 1;
        padding: 25px;
    }
    .logContainer {
        overflow-y: scroll;
        height: 100%;
    }
    span {
        color: #fff;
        font-weight: bold;
        font-size: 1.25em;
    }
    .global {
        font-weight: 1.25em;
    }
    /* .random {

    } */
    .lethal {
        animation: alert 1.5s infinite;
    }
    @keyframes alert {
        0% {
            background: #ff000040;
        }
        50% {
            background: #ff000055;
        }
        100% {
            background: #ff000040;
        }
    }
</style>