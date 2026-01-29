<template>
  <div v-if="loading" class="container mx-auto px-6 py-20 animate-pulse">
    <div class="grid md:grid-cols-2 gap-20">
      <div class="aspect-square bg-brand-gray/5 rounded-2xl"></div>
      <div class="space-y-6">
        <div class="h-12 bg-brand-gray/5 w-3/4"></div>
        <div class="h-24 bg-brand-gray/5"></div>
      </div>
    </div>
  </div>
  
  <div v-else-if="template" class="container mx-auto px-6 py-20">
    <div class="grid md:grid-cols-2 gap-20">
      <div class="aspect-square bg-brand-gray/5 overflow-hidden rounded-2xl">
        <img v-if="template.images && template.images[0]" :src="template.images[0]" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center text-brand-gray/20">[No Image]</div>
      </div>
      
      <div>
        <nav class="flex space-x-2 text-[10px] uppercase tracking-widest text-brand-gray/40 mb-8">
          <router-link to="/templates" class="hover:text-brand-gold">Templates</router-link>
          <span>/</span>
          <span class="text-brand-gray">{{ template.title }}</span>
        </nav>
        
        <h1 class="text-5xl font-serif mb-4">{{ template.title }}</h1>
        <p class="text-brand-gray/60 mb-8 leading-relaxed">
          {{ template.description }}
        </p>
        
        <div class="mb-12">
          <h4 class="text-xs uppercase tracking-widest text-brand-gray font-bold mb-4 border-b border-brand-gray/10 pb-2">Includes</h4>
          <ul class="grid grid-cols-2 gap-y-3 text-sm text-brand-gray/70">
            <li v-for="feature in template.features" :key="feature">• {{ feature }}</li>
            <li v-if="!template.features || template.features.length === 0">• Standard Finishing</li>
          </ul>
        </div>
        
        <div class="flex space-x-4">
          <button 
            @click="toggleSelection"
            :class="[
              'flex-1 py-4 uppercase tracking-[0.2em] text-xs transition-colors',
              isSelected ? 'bg-brand-gold text-white' : 'bg-brand-gray text-white hover:bg-brand-gold'
            ]"
          >
            {{ isSelected ? 'Selected ✓' : 'Add to Selection' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSelectionStore } from '../stores/selection'
import templateService from '../services/templateService'

const route = useRoute()
const selectionStore = useSelectionStore()
const template = ref(null)
const loading = ref(true)

const isSelected = computed(() => {
  return template.value && selectionStore.has(template.value._id)
})

const toggleSelection = () => {
  if (isSelected.value) {
    selectionStore.remove(template.value._id)
  } else {
    selectionStore.add(template.value)
  }
}

onMounted(async () => {
  try {
    const response = await templateService.getOne(route.params.id)
    template.value = response.data
  } catch (error) {
    console.error('Failed to fetch template:', error)
  } finally {
    loading.value = false
  }
})
</script>
