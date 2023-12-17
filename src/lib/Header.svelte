<script>
    import { fade } from 'svelte/transition';
    import { game } from './game.js';
</script>

<div transition:fade={{duration: 2000}}>
    <span id="money">{$game.money}</span>
    <span id="time">
        <span id="hour">{$game.hour}</span>:<span id="minute">{$game.minute}</span>
    </span>
    <span id="danger_emo">&#x2620;</span>
</div>

<style>
    div {
        margin-left: 50px;
        margin-top: 50px;
    }
    #money, #time {
        position: relative;
        display: inline-block;
        background: #00ff0014;
        border-radius: 5px;
        padding: 5px 20px;
        font-size: 64px;
        margin-bottom: 50px;
    }

    #money {
        padding: 5px 20px 5px 25px;
        margin-right: 20px;
    }

    #money::before {
        content: '';
        position: absolute;
        top: 16px;
        left: 14px;
        width: 8px;
        height: 16px;
        background: #00ff00ad;
        border-radius: 4px;
    }
</style>