<script>
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();
  
    import { playRandomKeyboardSound } from './audio.js';

    onMount(() => {
        document.addEventListener('click', typeWriter, { once: true });
    });

    const text = `Welcome to Lethal Manager. This is your personal monitoring unit, hope you like it :).
Consider yourself as a human resource manager, kind of. So please, make sure that your assignated crew members get the job done in time.
Nevermind about getting rid of them bad workers, noisy kids, trolling noobs & whatever dude. Or i'll have to fire you :(.

We all live for the company...

Enter "MENU" for a list of available commands.`;

    let terminalText;
    let speed = 50;
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            if(text.charAt(i-1) === ".") {
                setTimeout(() => {
                    playRandomKeyboardSound();
                    terminalText.textContent += text.charAt(i);
                    i++;
                    typeWriter();
                }, speed * 16);
            }
            else if(text.charAt(i) === ",") {
                setTimeout(() => {
                    playRandomKeyboardSound();
                    terminalText.textContent += text.charAt(i);
                    i++;
                    typeWriter();
                }, speed * 8);
            }
            else
            {
                terminalText.textContent += text.charAt(i);
                playRandomKeyboardSound();
                i++;
                setTimeout(typeWriter, speed);
            }
        } else {
            dispatch('introIsOver');
        }
    }
    


</script>

<div id="view-intro" class="panel">
<pre class="hello-ascii">
 __              __    __                ___                                                                  
/\ \            /\ \__/\ \              /\_ \       /'\_/`\                                                   
\ \ \         __\ \ ,_\ \ \___      __  \//\ \     /\      \     __      ___      __       __      __   _ __  
 \ \ \  __  /'__`\ \ \/\ \  _ `\  /'__`\  \ \ \    \ \ \__\ \  /'__`\  /' _ `\  /'__`\   /'_ `\  /'__`\/\`'__\
  \ \ \L\ \/\  __/\ \ \_\ \ \ \ \/\ \L\.\_ \_\ \_   \ \ \_/\ \/\ \L\.\_/\ \/\ \/\ \L\.\_/\ \L\ \/\  __/\ \ \/ 
   \ \____/\ \____\\ \__\\ \_\ \_\ \__/.\_\/\____\   \ \_\\ \_\ \__/.\_\ \_\ \_\ \__/.\_\ \____ \ \____\\ \_\ 
    \/___/  \/____/ \/__/ \/_/\/_/\/__/\/_/\/____/    \/_/ \/_/\/__/\/_/\/_/\/_/\/__/\/_/\/___L\ \/____/ \/_/ 
                                                                                           /\____/            
                                                                                           \_/__/                                                                               
</pre>
<pre class="hello-ascii glitch glitch2">
 __              __    __                ___                                                                  
/\ \            /\ \__/\ \              /\_ \       /'\_/`\                                                   
\ \ \         __\ \ ,_\ \ \___      __  \//\ \     /\      \     __      ___      __       __      __   _ __  
 \ \ \  __  /'__`\ \ \/\ \  _ `\  /'__`\  \ \ \    \ \ \__\ \  /'__`\  /' _ `\  /'__`\   /'_ `\  /'__`\/\`'__\
  \ \ \L\ \/\  __/\ \ \_\ \ \ \ \/\ \L\.\_ \_\ \_   \ \ \_/\ \/\ \L\.\_/\ \/\ \/\ \L\.\_/\ \L\ \/\  __/\ \ \/ 
   \ \____/\ \____\\ \__\\ \_\ \_\ \__/.\_\/\____\   \ \_\\ \_\ \__/.\_\ \_\ \_\ \__/.\_\ \____ \ \____\\ \_\ 
    \/___/  \/____/ \/__/ \/_/\/_/\/__/\/_/\/____/    \/_/ \/_/\/__/\/_/\/_/\/_/\/__/\/_/\/___L\ \/____/ \/_/ 
                                                                                           /\____/            
                                                                                           \_/__/                                                                               
</pre>
<pre class="hello-ascii glitch glitch3">
 __              __    __                ___                                                                  
/\ \            /\ \__/\ \              /\_ \       /'\_/`\                                                   
\ \ \         __\ \ ,_\ \ \___      __  \//\ \     /\      \     __      ___      __       __      __   _ __  
 \ \ \  __  /'__`\ \ \/\ \  _ `\  /'__`\  \ \ \    \ \ \__\ \  /'__`\  /' _ `\  /'__`\   /'_ `\  /'__`\/\`'__\
  \ \ \L\ \/\  __/\ \ \_\ \ \ \ \/\ \L\.\_ \_\ \_   \ \ \_/\ \/\ \L\.\_/\ \/\ \/\ \L\.\_/\ \L\ \/\  __/\ \ \/ 
   \ \____/\ \____\\ \__\\ \_\ \_\ \__/.\_\/\____\   \ \_\\ \_\ \__/.\_\ \_\ \_\ \__/.\_\ \____ \ \____\\ \_\ 
    \/___/  \/____/ \/__/ \/_/\/_/\/__/\/_/\/____/    \/_/ \/_/\/__/\/_/\/_/\/_/\/__/\/_/\/___L\ \/____/ \/_/ 
                                                                                           /\____/            
                                                                                           \_/__/                                                                                
</pre>
<pre id="terminal-intro" bind:this={terminalText}></pre>
</div>

<style>
    .hello-ascii {
        position: absolute;
        font-size: 1.25em;
    }

    #terminal-intro {
        margin-top: 300px;
        font-size: 1.25em;
    }
</style>