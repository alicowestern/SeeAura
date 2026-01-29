<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="h-screen flex items-center justify-center bg-brand-gray relative overflow-hidden">
      <!-- Video Background -->
      <video 
        autoplay 
        muted 
        loop 
        playsinline 
        class="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="../assets/videos/interior-video.mp4" type="video/mp4" />
      </video>
      
      <!-- Overlay for better text visibility -->
      <div class="absolute inset-0 bg-gradient-to-b from-brand-gray/40 via-transparent to-brand-gray/60 z-10"></div>
      
      <div class="container mx-auto px-6 z-20 text-center text-white">
        <div class="inline-block mb-6 px-4 py-1 border border-brand-gold/40 rounded-full bg-brand-gold/10 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold" data-aos="fade-down">
          Interior Architecture & Finishing
        </div>
        <h1 class="text-7xl md:text-9xl mb-8 leading-tight font-serif tracking-tighter drop-shadow-2xl" data-aos="fade-up" data-aos-delay="200">
          See <span class="italic text-brand-gold">Aura</span>.
        </h1>
        <p class="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md" data-aos="fade-up" data-aos-delay="400">
          Transforming standard structures into bespoke sanctuaries. Experience the pinnacle of interior craftsmanship and refined aesthetics.
        </p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-8" data-aos="fade-up" data-aos-delay="600">
          <router-link to="/templates" class="group relative px-12 py-5 bg-brand-gold text-brand-gray uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-white transition-all duration-500 overflow-hidden">
            <span class="relative z-10">Start Your Journey</span>
          </router-link>
          <router-link to="/about" class="text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-brand-gold transition-colors flex items-center gap-3">
            <span>Our Design Philosophy</span>
            <span class="w-12 h-[1px] bg-brand-gold/40 group-hover:w-16 transition-all"></span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Refined Services/Features -->
    <section class="py-32 bg-brand-white">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div class="max-w-xl">
             <h2 class="text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-4" data-aos="fade-right">The Methodology</h2>
             <p class="text-4xl md:text-5xl font-serif leading-tight" data-aos="fade-right" data-aos-delay="100">Crafting spaces that resonate with <span class="italic text-brand-gold">your soul</span>.</p>
          </div>
          <router-link to="/services" class="text-xs uppercase tracking-widest text-brand-gray/40 hover:text-brand-gold border-b border-brand-gray/10 pb-2 transition-all" data-aos="fade-left">Explore all services</router-link>
        </div>
        
        <div class="grid md:grid-cols-3 gap-16">
          <div data-aos="fade-up" class="group">
            <div class="text-brand-gold/20 text-7xl font-serif mb-6 group-hover:text-brand-gold/40 transition-colors">01</div>
            <h3 class="text-xl mb-4 uppercase tracking-widest">Curation</h3>
            <p class="text-brand-gray/60 leading-relaxed font-light">We hand-select materials, colors, and textures that define elegance and durability.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200" class="group">
            <div class="text-brand-gold/20 text-7xl font-serif mb-6 group-hover:text-brand-gold/40 transition-colors">02</div>
            <h3 class="text-xl mb-4 uppercase tracking-widest">Customization</h3>
            <p class="text-brand-gray/60 leading-relaxed font-light">Every template is a starting point for your unique personal aesthetic expression.</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="400" class="group">
            <div class="text-brand-gold/20 text-7xl font-serif mb-6 group-hover:text-brand-gold/40 transition-colors">03</div>
            <h3 class="text-xl mb-4 uppercase tracking-widest">Execution</h3>
            <p class="text-brand-gray/60 leading-relaxed font-light">Precision finishing delivered by our expert craftsmen to the highest standards.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
