<template>
  <div class="container mx-auto px-6 py-20">
    <div class="max-w-3xl mx-auto text-center mb-24">
      <h4 class="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4" data-aos="fade-up">Architectural Excellence</h4>
      <h1 class="text-5xl md:text-7xl font-serif mb-8" data-aos="fade-up" data-aos-delay="100">Tailored <span class="italic text-brand-gold">Solutions</span></h1>
      <p class="text-lg text-brand-gray/60 leading-relaxed font-light" data-aos="fade-up" data-aos-delay="200">
        From conceptual curation to technical execution, we provide a seamless path to extraordinary living environments.
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-12">
      <div 
        v-for="(service, index) in services" 
        :key="index" 
        class="group p-10 bg-brand-gray/5 border border-brand-gray/5 hover:border-brand-gold/30 transition-all duration-500 rounded-2xl relative overflow-hidden"
        data-aos="fade-up"
        :data-aos-delay="index * 150"
      >
        <div class="text-brand-gold mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
          <component :is="service.icon" class="w-12 h-12" />
        </div>
        <h3 class="text-2xl font-serif mb-6 group-hover:text-brand-gold transition-colors">{{ service.title }}</h3>
        <p class="text-brand-gray/60 leading-relaxed text-sm font-light mb-8">
          {{ service.description }}
        </p>
        <div class="absolute bottom-0 left-0 w-full h-1 bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
      </div>
    </div>

    <!-- Call to action -->
    <div class="mt-32 border-t border-brand-gray/5 pt-32 text-center" data-aos="reveal-text">
       <h2 class="text-4xl font-serif mb-12">Ready to define your <span class="italic text-brand-gold">Aura</span>?</h2>
       <router-link to="/contact" class="inline-block px-12 py-5 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-colors">Start a Project</router-link>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

const CompassIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', viewBox: '0 0 24 24' }, [
  h('circle', { cx: '12', cy: '12', r: '9' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M14 10l-4 4m0-4l4 4' })
])

const ToolsIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M11.423 20.107a3 3 0 11-1.53-5.871l.459-1.377a3 3 0 115.308-3.092l2.256-4.512a3 3 0 115.308-3.092' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 13h18M5 17h14M7 21h10' })
])

const ExecutionIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const services = [
  {
    title: 'Selection Consultation',
    description: 'Expert guidance through our curated templates to find the aesthetic that matches your vision and budget.',
    icon: CompassIcon
  },
  {
    title: 'Technical Feasibility',
    description: 'We evaluate your space to ensure that the chosen finishing materials and designs are technically applicable.',
    icon: ToolsIcon
  },
  {
    title: 'Precision Execution',
    description: 'Connecting you with our network of professional installers to bring the digital selection into physical reality.',
    icon: ExecutionIcon
  }
]
</script>
