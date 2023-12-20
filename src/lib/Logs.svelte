<script>
    import { slide } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
</script>

<section id="logs" transition:slide={{ duration: 500, easing: backInOut, axis: 'x' }}>
    <div class="logContainer">   
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recustium expedita soluta accusamus maiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspsamus maiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae molmaiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae mollitia ducimus praesentium expusamus mabus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo per repellendus recusandae mollitia ducimus praesentium expedita soluta accusamus maiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae mollitia ducimus praesentium expedita soltibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae mollitia ducimus praesentium eamus maiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellem expedita soluta accusamus maiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae mollitia ducimus praesentium expedita soluta accusamus maiores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae mollitia ducimus praesentium expedita sores voluptatibus.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ad repudiandae nam amet dolore a ratione laudantium illo perspiciatis. Quas repellendus recusandae molluta accusamus maiores voluptatibus.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis labore corporis unde.</p>
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
</style>