import { defineStore } from 'pinia'

export const useSelectionStore = defineStore('selection', {
    state: () => ({
        selectedTemplates: [],
    }),
    actions: {
        add(template) {
            if (!this.has(template._id)) {
                this.selectedTemplates.push(template)
            }
        },
        remove(templateId) {
            const index = this.selectedTemplates.findIndex(t => t._id === templateId)
            if (index > -1) {
                this.selectedTemplates.splice(index, 1)
            }
        },
        toggleSelection(template) {
            if (this.has(template._id)) {
                this.remove(template._id)
            } else {
                this.add(template)
            }
        },
        clearSelection() {
            this.selectedTemplates = []
        }
    },
    getters: {
        count: (state) => state.selectedTemplates.length,
        has: (state) => (templateId) => state.selectedTemplates.some(t => t._id === templateId)
    }
})
