<script>
  import { changeViewSound, playRandomAtmosAudio } from './lib/audio.js';

  import Intro    from './lib/Intro.svelte';
  import Header   from './lib/Header.svelte';
  import MainMenu from './lib/MainMenu.svelte';
  import Store    from './lib/Store.svelte';
  import Prompt   from './lib/Prompt.svelte'

  let view = 'menu';
  
  let gameStart = true;
  
  const handleShowView = (event) => {
    view = event.detail.view;
    changeViewSound.play();
  }
  
  const startGame = () => {
    gameStart = true;
    playRandomAtmosAudio();
  }
  
</script>

<main>
    <h1>Lethal Manager</h1>
    
    {#if view === 'intro'}<Intro on:introIsOver={startGame}/>{/if}
    
    {#if gameStart}
    <Header on:introFinished={startGame}/>
    {/if}
    
    {#if view === 'menu'}<MainMenu />{/if}
    {#if view === 'store'}<Store />{/if}
    
    {#if gameStart}
    <Prompt on:changeView={handleShowView}/>
    {/if}
    
    <div class="bg bg_2"></div>
    <div class="bg bg_1"></div>
    <div class="bg bg_front"></div>
</main>


<style>
    h1 { display: none; }
</style>