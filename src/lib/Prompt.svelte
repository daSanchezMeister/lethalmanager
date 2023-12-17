<script>
    import { onMount, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { commandList } from './commandList';
    import { playRandomKeyboardSound } from './audio.js';

    import { store_crew, store_ship, storage } from "./storeItems.js";
    import { game } from "./game.js";

    let inputElement;

    onMount(() => {
        inputElement.focus();
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    });

    function handleDocumentClick(event) {
        //if (!inputElement.contains(event.target)) {
            inputElement.focus();
        //}
    }

    let commandInputValue = '';
    let matchingCommands = [];
    let previousCommands = [];
    let previousCommandsLastIndex;

    /*********************
     * PROMPT HANDLER !!!!
     *********************/
    function handleKeyPress(event) { 

        playRandomKeyboardSound();
        commandInputValue.toLowerCase()

        /*************************************************
         * TAB for autocompletion if a valid command exist
         *************************************************/
        if (event.key === 'Tab') {
            event.preventDefault();
            const inputValue = commandInputValue.toLowerCase();
            if (inputValue !== '') {
                matchingCommands = commandList.filter(command => command.startsWith(inputValue));
                if (matchingCommands.length === 1) {
                    commandInputValue = matchingCommands[0];
                }
            }
        }
        /*********************
         * BACKSPACE handle
         *********************/
        if (event.key === 'Backspace') {
            matchingCommands = [];
        }

        /*****************************************************************
         * INPUT VALIDATION BY USER, dispatch events and update game data
         *****************************************************************/
        if (event.key === 'Enter') {        
            /*********************
             * CHANGE VIEW REQUEST
             *********************/
            switch (commandInputValue) {
                case 'menu':
                    dispatch('changeView', { view: 'menu' });
                    break;
                case 'monitor':
                    dispatch('changeView', { view: 'monitor' });
                break;
                case 'store':
                    dispatch('changeView', { view: 'store' });
                break;
                case 'manual':
                    dispatch('changeView', { view: 'manual' });
                break;
                case 'pause':
                    dispatch('changeView', { view: 'pause' });
                break;
                case 'save':
                    dispatch('changeView', { view: 'save' });
                break;
            }
            /******************************
             * COMMANDS HISTORY MANAGEMENT  
             ******************************/
            if (commandInputValue !== ""){
                previousCommands = [...previousCommands, commandInputValue];
                if (previousCommands.length > 5) { previousCommands.splice(0, 1); }
                previousCommandsLastIndex = previousCommands.length - 1;
            }

            if (commandInputValue.startsWith('buy')) {

                commandInputValue = commandInputValue.trim();

                // regular expression for BUY prompt
                const regex = /^buy\s(\w+)(?:\s(\d+))?$/i;
                let query = commandInputValue.match(regex);

                //console.log(query);
                if (query) {
                    let requestedeItem = query[1];
                    let quantity = parseInt(query[2]) || 1;

                    // merge store items for global search
                    const storeItems = [...store_crew, ...store_ship];
                    const availableItem = storeItems.find(item => item.name.toLowerCase() === requestedeItem);

                    // if item is available
                    if (availableItem) {
                        if (availableItem.price * quantity > $game.money) {
                            console.log('not enough money');
                            // play error sound
                            // ................
                        } else {
                            // look for existing item in storage
                            const itemInStorage = $storage.find(item => item.name.toLowerCase() === availableItem.name.toLowerCase());
                            if (itemInStorage) {
                                // update quantity
                                storage.update(items => {
                                    return items.map(item => {
                                        if (item.name.toLowerCase() === availableItem.name.toLowerCase()) {
                                            return { ...item, quantity: item.quantity += quantity };
                                        }
                                        return item;
                                    });
                                });
                            } else {
                                // add new item to storage
                                $storage = [...$storage, { name: availableItem.name, price: availableItem.price, quantity: quantity }]
                            }
                            // remove money from game
                            game.update(game => {
                                return { ...game, money: game.money -= availableItem.price * quantity };
                            });
                        }
                        console.log($game.money);
                    }
                }
                console.log(storage);
            }





            /*********************
             * CLEAN INPUT VALUE
             *********************/
            commandInputValue = '';
        }
        /**************************
        * ARROW UP and DOWN handle
        **************************/
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            
            if (previousCommandsLastIndex >= 0) {
                commandInputValue = previousCommands[previousCommandsLastIndex];
                previousCommandsLastIndex--;
            }
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            
            if (previousCommandsLastIndex < previousCommands.length - 1) {
                previousCommandsLastIndex++;
                commandInputValue = previousCommands[previousCommandsLastIndex];
            } else {
                commandInputValue = '';
            }
        }

    }
</script>

<div>
    <ul>
        {#if matchingCommands.length > 1}
            {#each matchingCommands as matchingCommand, index}
                <li><span>{matchingCommand}</span></li>
            {/each}
        {/if}
    </ul>
    <span class="caret">></span>
    <input
        bind:this={inputElement}
        bind:value={commandInputValue}
        on:keydown={handleKeyPress}
    />
</div>

<style>
    div {
        position: absolute;
        bottom: 50px; left: 50px; right: 50px;
    }
    ul {
        list-style: disclosure-open;
        padding-left: 19px;
        position: relative;
        top: 25px; left: 0;
    }
    li span { background-color: #060606; }
    .caret {
        font-size: 32px;
        font-weight: bold;
        position: relative;
        top: 4px;
    }
    input {
        position: absolute;
        bottom: 0;
        left: 25px;
        padding: 0;
        
        text-transform: uppercase;
        font-size: 32px;
        width: 100%;

        background-color: transparent;
        color: var(--main-color);

        border: 0;
        outline: none;
    }
</style>