<template>
  <div class="flex min-h-screen bg-brand-white">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-brand-gray/5 p-8 bg-brand-cream/30">
      <h2 class="text-xl font-serif mb-12">See <span class="text-brand-gold">Aura</span> Console</h2>
      <nav class="space-y-6">
        <button 
          @click="activeTab = 'overview'" 
          :class="['block text-xs uppercase tracking-[0.2em] transition-colors', activeTab === 'overview' ? 'text-brand-gold font-bold' : 'text-brand-gray/60 hover:text-brand-gold']"
        >
          Overview
        </button>
        <button 
          @click="activeTab = 'inquiries'" 
          :class="['block text-xs uppercase tracking-[0.2em] transition-colors', activeTab === 'inquiries' ? 'text-brand-gold font-bold' : 'text-brand-gray/60 hover:text-brand-gold']"
        >
          Inquiries
        </button>
        <button 
          @click="activeTab = 'templates'" 
          :class="['block text-xs uppercase tracking-[0.2em] transition-colors', activeTab === 'templates' ? 'text-brand-gold font-bold' : 'text-brand-gray/60 hover:text-brand-gold']"
        >
          Templates
        </button>
        <button 
          @click="activeTab = 'activity'" 
          :class="['block text-xs uppercase tracking-[0.2em] transition-colors', activeTab === 'activity' ? 'text-brand-gold font-bold' : 'text-brand-gray/60 hover:text-brand-gold']"
        >
          Activity
        </button>
      </nav>
    </aside>
    
    <main class="flex-1 p-12 overflow-y-auto">
      <header class="flex justify-between items-center mb-12 pb-8 border-b border-brand-gray/5">
        <h1 class="text-3xl font-serif capitalize">{{ activeTab }}</h1>
        <div class="text-[10px] uppercase tracking-[0.2em] text-brand-gray/40">Logged in as Administrator</div>
      </header>

      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div @click="activeTab = 'inquiries'" class="bg-brand-gray text-white p-8 rounded-2xl cursor-pointer hover:bg-brand-gold transition-colors group">
            <div class="text-xs uppercase tracking-widest text-white/60 mb-2 group-hover:text-white">Total Inquiries</div>
            <div class="text-4xl font-serif">{{ inquiries.length }}</div>
          </div>
          <div @click="activeTab = 'templates'" class="bg-brand-gray/5 p-8 rounded-2xl border border-brand-gray/5 cursor-pointer hover:border-brand-gold/50 transition-colors group">
            <div class="text-xs uppercase tracking-widest text-brand-gold font-bold mb-2">Active Templates</div>
            <div class="text-4xl font-serif text-brand-gray group-hover:text-brand-gold">{{ templates.length }}</div>
          </div>
          <div @click="activeTab = 'inquiries'" class="bg-brand-gray/5 p-8 rounded-2xl border border-brand-gray/5 cursor-pointer hover:border-brand-gold/50 transition-colors group">
            <div class="text-xs uppercase tracking-widest text-brand-gray/40 mb-2 group-hover:text-brand-gold">New Messages</div>
            <div class="text-4xl font-serif text-brand-gray group-hover:text-brand-gold">{{ pendingInquiriesCount }}</div>
          </div>
        </div>
      </div>

      <!-- Inquiries Tab -->
      <div v-if="activeTab === 'inquiries'" class="space-y-6">
        <div v-if="inquiries.length === 0" class="text-center py-20 text-brand-gray/40 italic">
          No inquiries yet.
        </div>
        <div v-for="inquiry in inquiries" :key="inquiry._id" class="bg-brand-gray/5 p-8 rounded-2xl border border-brand-gray/5">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-xl font-serif mb-1">{{ inquiry.customerName }}</h3>
              <p class="text-sm text-brand-gray/60">{{ inquiry.email }} • {{ inquiry.phone || 'No phone' }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span :class="['px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold', getStatusClass(inquiry.status)]">
                {{ inquiry.status }}
              </span>
              <select 
                @change="updateInquiryStatus(inquiry._id, $event.target.value)"
                class="bg-white border border-brand-gray/10 text-[10px] uppercase tracking-widest px-2 py-1 focus:outline-none"
              >
                <option value="" disabled selected>Update Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div v-if="inquiry.selectedTemplates && inquiry.selectedTemplates.length" class="mb-4">
            <h4 class="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-3">Selected Templates</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="t in inquiry.selectedTemplates" :key="t._id" class="bg-white px-3 py-1 text-xs border border-brand-gray/5">
                {{ t.title }}
              </span>
            </div>
          </div>
          <div class="text-sm text-brand-gray/80 italic border-l-2 border-brand-gold/30 pl-4 py-2 bg-brand-gold/5">
            "{{ inquiry.message }}"
          </div>
        </div>
      </div>

      <!-- Templates Tab -->
      <div v-if="activeTab === 'templates'">
        <button 
          @click="showAddTemplateForm = !showAddTemplateForm"
          class="mb-12 px-8 py-3 bg-brand-gray text-white text-[10px] uppercase tracking-[0.2em] hover:bg-brand-gold transition-colors"
        >
          {{ showAddTemplateForm ? 'Close Form' : 'Add New Template' }}
        </button>

        <div v-if="showAddTemplateForm" class="bg-brand-gray/5 p-10 rounded-2xl border border-brand-gray/5 mb-12 max-w-2xl" data-aos="fade-down">
          <h2 class="text-2xl font-serif mb-8 text-brand-gold italic">New Interior Design</h2>
          <form @submit.prevent="handleAddTemplate" class="space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-2">
                <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Title</label>
                <input v-model="newTemplate.title" required type="text" class="w-full bg-white border border-brand-gray/10 px-4 py-3 focus:outline-none focus:border-brand-gold" />
              </div>
              <div>
                <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Category</label>
                <select v-model="newTemplate.category" required class="w-full bg-white border border-brand-gray/10 px-4 py-3 focus:outline-none focus:border-brand-gold">
                  <option value="Modern">Modern</option>
                  <option value="Classic">Classic</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Residential">Residential</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Price Range</label>
                <input v-model="newTemplate.priceRange" required placeholder="e.g. $$$" type="text" class="w-full bg-white border border-brand-gray/10 px-4 py-3 focus:outline-none focus:border-brand-gold" />
              </div>
            </div>
            <div>
              <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Description</label>
              <textarea v-model="newTemplate.description" required rows="3" class="w-full bg-white border border-brand-gray/10 px-4 py-3 focus:outline-none focus:border-brand-gold"></textarea>
            </div>
            <!-- Multi-Image Management -->
            <div class="space-y-6">
              <div class="p-6 border-2 border-dashed border-brand-gray/10 rounded-2xl hover:border-brand-gold/30 transition-colors text-center bg-white">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  @change="handleFileSelect" 
                  class="hidden" 
                  ref="fileInput"
                />
                <div @click="$refs.fileInput.click()" class="cursor-pointer">
                  <svg class="w-10 h-10 text-brand-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <p class="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Upload Photos Directly</p>
                  <p class="text-[9px] text-brand-gray/40 mt-1 uppercase tracking-widest">Select multiple images from your device</p>
                </div>
              </div>

              <!-- Selected Files / Manual Links -->
              <div class="space-y-4">
                <label class="block text-[10px] uppercase tracking-widest font-bold">Manage Photos ({{ newTemplate.images.length + selectedFiles.length }})</label>
                
                <!-- Manual Link Add -->
                <div class="flex gap-2">
                  <input 
                    v-model="newImageUrl" 
                    placeholder="Enter manual image URL..." 
                    type="text" 
                    class="flex-1 bg-white border border-brand-gray/10 px-4 py-3 focus:outline-none focus:border-brand-gold text-[10px] uppercase tracking-widest" 
                    @keyup.enter="addImage"
                  />
                  <button type="button" @click="addImage" class="px-6 bg-brand-gray text-white text-[10px] uppercase tracking-widest hover:bg-brand-gold transition-colors">Add</button>
                </div>
                
                <!-- List -->
                <div class="space-y-2">
                  <!-- Selected Local Files -->
                  <div v-for="(file, idx) in selectedFiles" :key="'file-'+idx" class="flex items-center justify-between bg-brand-gold/5 px-4 py-3 border border-brand-gold/10 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                      <span class="text-[10px] text-brand-gray uppercase tracking-widest font-bold truncate max-w-[200px]">{{ file.name }}</span>
                    </div>
                    <button type="button" @click="removeFile(idx)" class="text-brand-gray/20 hover:text-rose-500 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>

                  <!-- Manual Links -->
                  <div v-for="(img, idx) in newTemplate.images" :key="'link-'+idx" class="flex items-center justify-between bg-white px-4 py-3 border border-brand-gray/5 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 rounded-full bg-brand-gray/20"></div>
                      <span class="text-[10px] text-brand-gray/60 font-mono truncate max-w-[200px]">{{ img }}</span>
                    </div>
                    <button type="button" @click="removeImage(idx)" class="text-brand-gray/20 hover:text-rose-500 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-[10px] uppercase tracking-widest mb-2 font-bold">Features (Comma-separated)</label>
              <input v-model="featuresInput" placeholder="Feature 1, Feature 2..." type="text" class="w-full bg-white border border-brand-gray/10 px-4 py-3 focus:outline-none focus:border-brand-gold" />
            </div>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-brand-gold text-white py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-brand-gray transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Publishing...' : 'Publish Template' }}
            </button>
          </form>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="template in templates" :key="template._id" class="flex gap-6 items-center p-6 border border-brand-gray/5 hover:border-brand-gold/20 transition-all rounded-xl relative group/card">
             <div class="w-24 h-24 bg-brand-gray/5 border border-brand-gray/10 overflow-hidden rounded-lg flex-shrink-0">
               <img v-if="template.images && template.images.length" :src="template.images[0]" class="w-full h-full object-cover" />
             </div>
             <div class="flex-1">
               <h3 class="font-serif text-lg">{{ template.title }}</h3>
               <p class="text-xs uppercase tracking-widest text-brand-gold mb-2">{{ template.category }}</p>
               <p class="text-[10px] text-brand-gray/40 line-clamp-1">{{ template.description }}</p>
             </div>
             <button 
               @click="handleDeleteTemplate(template._id)" 
               class="opacity-0 group-hover/card:opacity-100 p-3 text-brand-gray/20 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-lg"
               title="Delete Template"
             >
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
             </button>
          </div>
        </div>
      </div>

      <!-- Activity Tab -->
      <div v-if="activeTab === 'activity'" class="space-y-6">
        <div v-if="logs.length === 0" class="text-center py-20 text-brand-gray/40 italic">
          No activity logs recorded yet.
        </div>
        <div class="bg-white border border-brand-gray/5 rounded-2xl overflow-hidden">
          <table class="w-full text-left">
            <thead class="bg-brand-gray/5 border-b border-brand-gray/5">
              <tr>
                <th class="px-6 py-4 text-[10px] uppercase tracking-widest font-bold">Time</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-widest font-bold">Admin</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-widest font-bold">Action</th>
                <th class="px-6 py-4 text-[10px] uppercase tracking-widest font-bold">Details</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-brand-gray/5">
              <tr v-for="log in logs" :key="log._id" class="hover:bg-brand-cream/10 transition-colors">
                <td class="px-6 py-4 text-[10px] text-brand-gray/40 whitespace-nowrap">{{ new Date(log.createdAt).toLocaleString() }}</td>
                <td class="px-6 py-4 text-[10px] font-bold text-brand-gray/60">{{ log.adminEmail || 'System' }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-brand-gray/5 text-brand-gray/60 text-[9px] font-bold uppercase tracking-widest rounded">
                    {{ log.action.replace('_', ' ') }}
                  </span>
                </td>
                <td class="px-6 py-4 text-xs text-brand-gray/80">{{ log.details }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import templateService from '../services/templateService'
import inquiryService from '../services/inquiryService'
import uploadService from '../services/uploadService'
import logService from '../services/logService'

const activeTab = ref('overview')
const loading = ref(false)
const showAddTemplateForm = ref(false)

const inquiries = ref([])
const templates = ref([])
const logs = ref([])

const newImageUrl = ref('')
const featuresInput = ref('')
const selectedFiles = ref([])

const newTemplate = ref({
  title: '',
  description: '',
  category: 'Modern',
  priceRange: '$$',
  images: [],
  features: []
})

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const addImage = () => {
  if (newImageUrl.value.trim()) {
    newTemplate.value.images.push(newImageUrl.value.trim())
    newImageUrl.value = ''
  }
}

const removeImage = (index) => {
  newTemplate.value.images.splice(index, 1)
}

const pendingInquiriesCount = computed(() => {
  return inquiries.value.filter(i => i.status === 'pending').length
})

const fetchData = async () => {
  try {
    const [tRes, iRes, lRes] = await Promise.all([
      templateService.getAll(),
      inquiryService.getAll(),
      logService.getAll()
    ])
    templates.value = tRes.data
    inquiries.value = iRes.data
    logs.value = lRes.data
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
}

const handleAddTemplate = async () => {
  if (selectedFiles.value.length === 0 && newTemplate.value.images.length === 0 && newImageUrl.value.trim()) {
    addImage()
  }
  
  if (selectedFiles.value.length === 0 && newTemplate.value.images.length === 0) {
    alert('Please select photos or enter links for this template.')
    return
  }

  loading.value = true
  try {
    // 1. Upload files first if any
    if (selectedFiles.value.length > 0) {
      const uploadRes = await uploadService.uploadImages(selectedFiles.value)
      // Base URL should be included if serving from distinct port, but here paths are relative
      const uploadedUrls = uploadRes.data.urls
      newTemplate.value.images = [...newTemplate.value.images, ...uploadedUrls]
    }

    // 2. Add features
    newTemplate.value.features = featuresInput.value.split(',').map(s => s.trim()).filter(s => s)
    
    // 3. Create template
    await templateService.create(newTemplate.value)
    alert('Template added successfully!')
    
    // Reset form
    newTemplate.value = {
      title: '',
      description: '',
      category: 'Modern',
      priceRange: '$$',
      images: [],
      features: []
    }
    imageUrlsInput.value = ''
    featuresInput.value = ''
    selectedFiles.value = []
    showAddTemplateForm.value = false
    
    fetchData()
  } catch (error) {
    console.error('Failed to add template:', error)
    alert('Failed to add template. Make sure you are logged in.')
  } finally {
    loading.value = false
  }
}

const handleDeleteTemplate = async (id) => {
  if (confirm('Are you sure you want to delete this template? This will also be tracked in the activity log.')) {
    try {
      await templateService.remove(id)
      fetchData()
    } catch (error) {
      console.error('Failed to delete template:', error)
      alert('Failed to delete template.')
    }
  }
}

const updateInquiryStatus = async (id, status) => {
  try {
    await inquiryService.updateStatus(id, status)
    fetchData()
  } catch (error) {
    console.error('Failed to update status:', error)
    alert('Failed to update status.')
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-700'
    case 'contacted': return 'bg-blue-100 text-blue-700'
    case 'completed': return 'bg-emerald-100 text-emerald-700'
    case 'cancelled': return 'bg-rose-100 text-rose-700'
    default: return 'bg-brand-gray/10 text-brand-gray'
  }
}

onMounted(fetchData)
</script>
