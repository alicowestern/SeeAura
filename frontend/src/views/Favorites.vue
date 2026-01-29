<template>
  <div class="container mx-auto px-6 py-20">
    <div class="flex justify-between items-end mb-16">
      <h1 class="text-5xl font-serif">My <span class="text-brand-gold">Selection</span></h1>
      <button 
        v-if="selectionStore.count > 0"
        @click="selectionStore.clearSelection()"
        class="text-xs uppercase tracking-widest text-brand-gray/40 hover:text-brand-gold transition-colors"
      >
        Clear All
      </button>
    </div>
    
    <div v-if="selectionStore.count === 0" class="text-center py-20 bg-brand-gray/5 rounded-3xl">
      <p class="text-brand-gray/50 italic mb-8">Your selection is currently empty.</p>
      <router-link to="/templates" class="border border-brand-gray px-8 py-3 uppercase tracking-widest text-xs hover:bg-brand-gray hover:text-white transition-all">
        Browse Templates
      </router-link>
    </div>
    
    <div v-else class="grid md:grid-cols-3 gap-12">
      <div class="md:col-span-2 grid md:grid-cols-2 gap-8">
        <div v-for="template in selectionStore.selectedTemplates" :key="template._id" class="flex gap-6 group">
          <div class="w-32 h-32 bg-brand-gray/5 rounded-lg overflow-hidden shrink-0">
            <img v-if="template.images && template.images[0]" :src="template.images[0]" class="w-full h-full object-cover" />
          </div>
          <div class="flex flex-col justify-between py-2">
            <div>
              <h3 class="font-serif text-lg">{{ template.title }}</h3>
              <p class="text-xs text-brand-gold uppercase tracking-tighter">{{ template.category }}</p>
            </div>
            <button @click="selectionStore.remove(template._id)" class="text-[10px] uppercase tracking-widest text-brand-gray/40 hover:text-red-500 text-left">Remove</button>
          </div>
        </div>
      </div>
      
      <div class="bg-brand-gray/5 p-10 rounded-2xl h-fit">
        <h3 class="text-xl font-serif mb-6">Inquiry Request</h3>
        <p class="text-xs text-brand-gray/60 mb-8 leading-relaxed">
          Submit your selection to our team. We will contact you to discuss technical feasibility and next steps.
        </p>
        
        <form @submit.prevent="submitInquiry" class="space-y-6">
          <div>
            <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Full Name</label>
            <input v-model="form.customerName" required type="text" class="w-full bg-white border border-brand-gray/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold" />
          </div>
          <div>
            <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Email Address</label>
            <input v-model="form.email" required type="email" class="w-full bg-white border border-brand-gray/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-gold" />
          </div>
          <button 
            type="submit" 
            :disabled="submitting"
            class="w-full bg-brand-gray text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-brand-gold transition-colors disabled:opacity-50"
          >
            {{ submitting ? 'Sending...' : 'Submit Selection' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectionStore } from '../stores/selection'
import inquiryService from '../services/inquiryService'

const selectionStore = useSelectionStore()
const router = useRouter()
const submitting = ref(false)

const form = ref({
  customerName: '',
  email: '',
})

const submitInquiry = async () => {
  submitting.value = true
  try {
    const data = {
      ...form.value,
      selectedTemplates: selectionStore.selectedTemplates.map(t => t._id)
    }
    await inquiryService.submit(data)
    alert('Inquiry submitted successfully! We will contact you soon.')
    selectionStore.clearSelection()
    router.push('/')
  } catch (error) {
    console.error('Failed to submit inquiry:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>
