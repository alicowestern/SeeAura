<template>
  <div class="min-h-screen flex items-center justify-center bg-brand-white">
    <div class="w-full max-w-md px-6">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-serif mb-2">Staff Portal</h1>
        <p class="text-xs uppercase tracking-[0.2em] text-brand-gray/60 font-bold">See <span class="text-brand-gold">Aura</span> Administrative Access</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest mb-2">Email Address</label>
          <input v-model="form.email" required type="email" placeholder="Email" class="w-full bg-brand-gray/5 border border-brand-gray/10 px-4 py-4 focus:outline-none focus:border-brand-gold" />
        </div>
        <div>
          <label class="block text-xs uppercase tracking-widest mb-2">Secret Code</label>
          <input v-model="form.password" required type="password" placeholder="Password" class="w-full bg-brand-gray/5 border border-brand-gray/10 px-4 py-4 focus:outline-none focus:border-brand-gold" />
        </div>
        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-brand-gray text-white py-4 uppercase tracking-[0.2em] text-sm hover:bg-brand-gold transition-colors disabled:opacity-50"
        >
          {{ loading ? 'Authenticating...' : 'Authenticate' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const loading = ref(false)
const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await authService.login(form.value)
    localStorage.setItem('token', response.data.access_token)
    router.push('/admin/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Authentication failed. Please check your credentials.')
  } finally {
    loading.value = false
  }
}
</script>
