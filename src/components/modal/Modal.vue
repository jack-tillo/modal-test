<template>
    <div class="wrapper">
        <div :class="overlayClasses" v-show="visible">
            <div class="modal" v-show="visible">
                <div class="box">
                    <div class="header" v-if="$slots.header">
                        <h3 class="title">
                            <slot name="header" />
                        </h3>
                        <button v-if="showClose" class="close-button" @click="close">
                            X
                        </button>
                    </div>
                    <div class="content-wrapper">
                        <slot/>
                    </div>
                    <div class="footer" v-if="$scopedSlots.footer">
                        <slot name="footer" :close="close"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { modalManager } from './ModalManager'
import uid from '../uid'
export default {
    props: {
        showClose: {
            type: Boolean,
            default: true
        },
        closeOnEscape: {
            type: Boolean,
            default: true
        },
        value: Boolean
    },
    data () {
        const base = 'modal'
        return {
            id: this.$attrs.id || uid(base),
            showOverlay: true
        }
    },
    mounted () {
        modalManager.register(this)
    },
    destroyed () {
        modalManager.unregister(this)
    },
    computed: {
        visible () {
            return this.value
        },
        overlayClasses () {
            return {
                overlay: true,
                'no-background': !this.showOverlay
            }
        }
    },
    watch: {
        value (val) {
            if (val) {
                this.open()
            } else {
                this.close()
            }
        }
    },
    methods: {
        open () {
            this.$emit('input', true)
            modalManager.openModal(this.id)
        },
        close () {
            this.$emit('input', false)
            modalManager.closeModal(this.id)
        },
        setOverlay (visible) {
            this.showOverlay = visible
        }
    }
}
</script>

<style scoped>
.wrapper {
    display: block;
    position: relative;
    font-family: 'Roboto';
}

.overlay {
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.overlay.no-background {
    background: transparent;
}

.modal {
    text-align: left;
    list-style: none;
    line-height: 1;
    display: flex;
    justify-content: center;
    width: calc(100% - 150px);
}

.box {
    width: 500px;
    background: white;
}

.box .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
}

.box .content-wrapper {
    background-color: #f0f0f4;
    padding: 20px 10px;
}

.box .footer {
    background-color: #f0f0f4;
    padding: 10px;
}

.box .header .title {
    font-weight: 400;
    font-size: 14px;
    color: #5854e5;
    text-transform: uppercase;
    margin-left: 10px;
}

.box .header .close-button {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
</style>

<style>
body.with-modal {
    margin: 0;
    height: 100%; 
    overflow: hidden;
}
</style>