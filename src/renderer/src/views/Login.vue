<template>
  <div class="min-h-screen bg-[#faf9fe] text-[#1b1b1f] font-inter flex flex-col">
    <!-- Main Content -->
    <main class="grow flex items-center justify-center p-6 mt-14 mb-10">
      <div class="w-full max-w-[440px] bg-white border border-[#dad9df] rounded-lg p-8 shadow-sm">
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-12 h-12 bg-[#007aff] rounded flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </div>
        </div>

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">Welcome Back</h1>
          <p class="text-[#767680]">Enter your credentials to access the utility.</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- username Field -->
          <div class="space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-[#767680]">username</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-[#767680]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                </svg>
              </span>
              <input 
                v-model="username"
                type="text" 
                placeholder="username"
                class="w-full bg-[#f4f3f8] border border-[#dad9df] rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#007aff] transition-colors"
                required
                autofocus
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <label class="block text-xs font-bold uppercase tracking-wider text-[#767680]">Password</label>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-[#767680]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input 
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full bg-[#f4f3f8] border border-[#dad9df] rounded-md py-2.5 pl-10 pr-10 focus:outline-none focus:border-[#007aff] transition-colors"
                required
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#767680] hover:text-[#1b1b1f]"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button 
            type="submit"
            class="w-full bg-[#007aff] hover:bg-[#0062cc] text-white font-bold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2 shadow-md active:shadow-sm"
          >
            Sign In
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
          </button>
        </form>

        <div class="text-center mt-8 text-sm">
          <span class="text-[#767680]">New to the ecosystem? </span>
          <a href="#" class="text-[#007aff] font-bold hover:underline">Initialize account</a>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="h-10 w-full flex items-center justify-between px-6 border-t border-[#dad9df] bg-white text-[10px] text-[#767680] fixed bottom-0 z-10">
      <div>&copy; 2026 AOI Utility System.</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../store'
import { toast } from 'vue-sonner'

const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  const credentials = {
    username: username.value,
    password: password.value,
    name: 'admin'
  }
  const result = await window.api.login(credentials)
  console.log('Login result:', result)

  if (result.success) {
    authStore.isLogin = true
    authStore.user = result.data
    router.push('/')
    toast.success('Login successful')
  } else {
    toast.error(result.error || 'Login failed')
  }
}
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'); */

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Custom checkbox styling for consistency if needed */
input[type="checkbox"]:checked {
  background-color: #007aff;
  border-color: #007aff;
}
</style>