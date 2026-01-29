<template>
  <div class="container mx-auto px-6 py-20">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
      <div>
        <h1 class="text-5xl font-serif mb-4">Design <span class="text-brand-gold">Templates</span></h1>
        <p class="text-brand-gray/60">Explore our professional finishing packages.</p>
      </div>
      
      <div class="flex flex-wrap gap-4">
        <button 
          v-for="cat in categories" 
          :key="cat" 
          @click="selectedCategory = cat"
          :class="[
            'px-6 py-2 text-xs uppercase tracking-widest border transition-all',
            selectedCategory === cat ? 'border-brand-gold text-brand-gold' : 'border-brand-gray/10 hover:border-brand-gold'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid md:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <div class="aspect-[4/5] bg-brand-gray/5 mb-4 rounded-lg"></div>
        <div class="h-6 bg-brand-gray/5 w-2/3 mb-2"></div>
        <div class="h-4 bg-brand-gray/5 w-1/3"></div>
      </div>
    </div>

    <div v-else-if="filteredTemplates.length === 0" class="text-center py-20">
      <p class="text-brand-gray/40 italic">No templates found for this category.</p>
    </div>

    <div v-else class="grid md:grid-cols-3 gap-8">
      <router-link 
        v-for="template in filteredTemplates" 
        :key="template._id" 
        :to="`/templates/${template._id}`"
        class="group cursor-pointer"
      >
        <div class="aspect-[4/5] bg-brand-gray/5 overflow-hidden mb-4 rounded-lg">
          <img 
            v-if="template.images && template.images[0]" 
            :src="template.images[0]" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div v-else class="w-full h-full bg-brand-gray/10 flex items-center justify-center text-brand-gray/20">
            [No Image]
          </div>
        </div>
        <h3 class="text-lg font-serif mb-1">{{ template.title }}</h3>
        <p class="text-xs uppercase tracking-widest text-brand-gold font-bold">{{ template.category }} / Starting at {{ template.priceRange }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import templateService from '../services/templateService'

const templates = ref([])
const loading = ref(true)
const categories = ['All', 'Minimal', 'Classic', 'Industrial', 'Luxury']
const selectedCategory = ref('All')

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'All') return templates.value
  return templates.value.filter(t => t.category === selectedCategory.value)
})

onMounted(async () => {
  try {
    const response = await templateService.getAll()
    templates.value = response.data
  } catch (error) {
    console.error('Failed to fetch templates:', error)
  } finally {
    loading.value = false
  }
})
</script>
