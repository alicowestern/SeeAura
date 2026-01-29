<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-brand-white/80 backdrop-blur-md border-b border-brand-gray/5">
    <div class="container mx-auto px-6 py-6 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-serif tracking-tighter">
        See <span class="text-brand-gold">Aura</span>
      </router-link>
      
      <div class="hidden md:flex space-x-8 items-center">
        <router-link to="/services" class="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Services</router-link>
        
        <div class="h-4 w-px bg-brand-gray/10 mx-2"></div>
        
        <router-link to="/templates" class="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">Templates</router-link>
        <router-link to="/favorites" class="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors relative">
          Selection
          <span v-if="selectionStore.count > 0" class="absolute -top-3 -right-4 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {{ selectionStore.count }}
          </span>
        </router-link>
        
        <div class="h-4 w-px bg-brand-gray/10 mx-2"></div>
        
        <router-link to="/about" class="text-sm uppercase tracking-widest hover:text-brand-gold transition-colors">About</router-link>
        <router-link to="/contact" class="text-sm uppercase tracking-widest border border-brand-gray px-6 py-2 hover:bg-brand-gray hover:text-brand-white transition-all">Connect</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSelectionStore } from '../stores/selection'
const selectionStore = useSelectionStore()
</script>

<style scoped>
@reference "../style.css";

.router-link-active:not(.border) {
  @apply text-brand-gold;
}
</style>
