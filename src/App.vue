<template>
    <div id="app">
        <button @click="allModals">Toggle Modal</button>
        <p>Clicking the button will do several things:</p>
        <ol>
            <li>Open modals 1 and 2</li>
            <li>After 1 second, close modal 1 and open modal 3</li>
            <li>After another second, re-open modal 1</li>
        </ol>
        <p>
            When the modals are open (or during the sequence) you can press Escape to close the topmost modal. Or click either of the close buttons.
        </p>

        <modal v-model="modalVisible1" id="1">
            <template slot="header">Modal 1</template>
            This is one of the dialogs.
            <br />It has more content
            <br />
            <strong>Hopefully it's a different size so I can see how this looks.</strong>
            <template slot="footer" slot-scope="{close}">
                <button @click="close">Close modal</button>
            </template>
        </modal>

        <modal v-model="modalVisible2" id="2">
            <template slot="header">Modal 2</template>
            This is another dialog.
            <template slot="footer" slot-scope="{close}">
                <button @click="close">Close modal</button>
            </template>
        </modal>

        <modal v-model="modalVisible3" id="3">
            <template slot="header">Modal 3</template>
            This is another dialog. It was delayed, and should still open up
            <template
                slot="footer"
                slot-scope="{close}"
            >
                <button @click="close">Close modal</button>
            </template>
        </modal>

    </div>
</template>
<script>
import Modal from './components/modal/Modal.vue'
export default {
    components: {
        Modal
    },
    data() {
        return {
            modalVisible1: false,
            modalVisible2: false,
            modalVisible3: false
        }
    },
    methods: {
        allModals() {
            console.log('open 1 and 2')
            this.modalVisible1 = true
            this.modalVisible2 = true
            setTimeout(() => {
                console.log('close 1 and open 3')
                this.modalVisible1 = false
                this.modalVisible3 = true
                setTimeout(() => {
                    console.log('open 1 again')
                    this.modalVisible1 = true
                }, 1000)
            }, 1000)
        }
    }
}
</script>

<style>
#app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
