<template>
  <div class="font-sans text-brand-gray antialiased">
    <NavBar />
    <main class="pt-20">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <footer class="bg-brand-gray text-brand-white py-20 mt-20">
      <div class="container mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-brand-white/10 pb-16">
        <div class="col-span-2">
          <h2 class="text-3xl font-serif mb-6">See <span class="text-brand-gold">Aura</span></h2>
          <p class="text-brand-white/60 max-w-sm leading-relaxed">
            Elevating living spaces through curated design and professional finishing. Your vision, our realization.
          </p>
        </div>
        <div>
          <h4 class="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6 font-bold">Quick Links</h4>
          <ul class="space-y-4 text-sm text-brand-white/70">
            <li><router-link to="/templates" class="hover:text-brand-gold">Templates</router-link></li>
            <li><router-link to="/about" class="hover:text-brand-gold">About Us</router-link></li>
            <li><router-link to="/services" class="hover:text-brand-gold">Services</router-link></li>
            <li><router-link to="/contact" class="hover:text-brand-gold">Contact</router-link></li>
            <li class="pt-4 border-t border-brand-white/10"><router-link to="/admin/login" class="text-[10px] uppercase tracking-widest text-brand-white/40 hover:text-brand-gold transition-colors">Staff Portal</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs uppercase tracking-[0.2em] text-brand-gold mb-6 font-bold">Connect</h4>
          <ul class="space-y-4 text-sm text-brand-white/70">
            <li><a href="tel:+251986646054" class="hover:text-brand-gold font-serif">+251 98 664 6054</a></li>
            <li><a href="mailto:contact@seeaura.com" class="hover:text-brand-gold">contact@seeaura.com</a></li>
            <li class="flex gap-4 pt-4">
              <a href="https://wa.me/251986646054" target="_blank" class="w-10 h-10 rounded-xl bg-[#25D366] border border-[#25D366] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_5px_15px_rgba(37,211,102,0.4)] transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="https://t.me/251986646054" target="_blank" class="w-10 h-10 rounded-xl bg-[#0088cc] border border-[#0088cc] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,136,204,0.4)] transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.189l-8.533 7.702l-.332 4.981c.488 0 .703-.223.976-.488l2.344-2.279l4.874 3.6c.898.495 1.543.239 1.767-.83l3.193-15.025c.327-1.312-.5-1.9-1.357-1.547z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-xl bg-[#0077b5] border border-[#0077b5] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,119,181,0.4)] transition-all duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-6 pt-12 text-sm text-brand-white/40">
        &copy; 2026 See Aura Interior Finishing. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
