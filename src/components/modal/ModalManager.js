// @ts-check

class ModalManager {
    constructor() {
        /**
         * Map of modal IDs to modal instances
         * @type {Map<string, any>}
         */
        this.instances = new Map()
        this.zIndex = 4000
        /**
         * @type {any[]}
         */
        this.modalStack = []
        window.document.addEventListener('keydown', this.handleEscape)
    }

    handleEscape(event) {
        if (event.key === 'Escape') {
            const { instance: topModal } = this.getTopModal()
            if (topModal && topModal.closeOnEscape) {
                topModal.close()
            }
        }
    }

    /**
     * Register a Modal component with the manager
     * @param {any} modal The modal component instance to register
     */
    register(modal) {
        if (modal && modal.id) {
            this.instances.set(modal.id, modal)
        }
    }

    /**
     * Unregister a Modal component with the manager
     * @param {any} modal The modal component instance to unregister
     */
    unregister(modal) {
        if (modal && modal.id) {
            this.instances.delete(modal.id)
        }
        if (this.instances.size === 0) {
            window.document.removeEventListener('keydown', this.handleEscape)
        }
    }

    /**
     * Opens a given modal
     * @param {string} id the id of the modal to open
     */
    openModal(id) {
        const modalInstance = this.instances.get(id)
        if (modalInstance) {
            modalInstance.$el.style.zIndex = this.nextZIndex()
            this.modalStack.push({ id })
        } else {
            this.modalStack.push({ id })
        }
        this.setOverlay()
        window.document.body.classList.add('with-modal')
    }

    /**
     * Closes a given modal
     * @param {string} id the id of the modal to close
     */
    closeModal(id) {
        const ids = this.modalStack.map(m => m.id)
        const index = ids.indexOf(id)
        if (index > -1) {
            this.modalStack.splice(index, 1)
        }
        this.setOverlay()
        if (this.modalStack.length === 0) {
            window.document.body.classList.remove('with-modal')
        }
    }

    getTopModal() {
        const topModal = this.modalStack[this.modalStack.length - 1]
        if (!topModal) return
        const instance = this.instances.get(topModal.id)
        if (!instance) return { id: topModal }
        return {
            id: topModal,
            instance
        }
    }

    nextZIndex() {
        return this.zIndex++
    }

    setOverlay() {
        const res = this.getTopModal()
        const topModal = res && res.id
        if (topModal && topModal.id) {
            this.modalStack.forEach(m => {
                if (this.instances.has(m.id)) {
                    if (m.id === topModal.id) {
                        this.instances.get(m.id).setOverlay(true)
                    } else {
                        this.instances.get(m.id).setOverlay(false)
                    }
                }
            })
        }
    }
}

export const modalManager = new ModalManager()
export default modalManager
