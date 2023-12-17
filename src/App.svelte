<script>
  import { changeViewSound, errorSound, successSound, playRandomAtmosAudio } from './lib/audio.js';

  import Intro    from './lib/Intro.svelte';
  import Header   from './lib/Header.svelte';
  import MainMenu from './lib/MainMenu.svelte';
  import Store    from './lib/Store.svelte';
  import Prompt   from './lib/Prompt.svelte'

  let errorLayer;
  let view = 'menu';
  let gameStart = true;
  
  const handleShowView = (event) => {
    view = event.detail.view;
    changeViewSound.play();
  }

  const UIhandleError = (event) => {
    console.log(event.detail.message);
    errorSound.play();

    errorLayer.classList.add('UIerror');
    errorLayer.addEventListener('animationend', () => {
      errorLayer.classList.remove('UIerror');
    }, { once: true });
  }

  const UIhandleSuccess = (event) => {
    console.log(event.detail.message);
    successSound.play();
  }
  
  const startGame = () => {
    gameStart = true;
    playRandomAtmosAudio();
  }
  
</script>

<main>
    <h1>Lethal Manager</h1>
    
    {#if view === 'intro'}<Intro on:introIsOver={startGame}/>{/if}
    
    {#if gameStart}<Header on:introFinished={startGame}/>{/if}
    
    {#if view === 'menu'}<MainMenu />{/if}
    {#if view === 'store'}<Store />{/if}
    
    {#if gameStart}<Prompt 
      on:promptError={UIhandleError}
      on:promptSuccess={UIhandleSuccess}
      on:changeView={handleShowView}/>
    {/if}
    
    <div class="bg bg_2"></div>
    <div class="bg bg_1"></div>
    <div class="bg bg_front"></div>
    <div bind:this={errorLayer} class="errorLayer"></div>
</main>


<style>
    h1 { display: none; }
    .errorLayer { 
      position: absolute; 
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: none; 
      z-index: -1; pointer-events: none;
      opacity: .7;
    } 
</style>