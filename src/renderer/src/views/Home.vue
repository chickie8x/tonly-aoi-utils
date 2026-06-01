web application/stitch/projects/1128888750982190823/screens/cba9503c07c64e019cfb87f1f9886a6c
<template>
  <div class="min-h-screen bg-[#faf9fe] text-[#1b1b1f] font-inter flex flex-col">
    <!-- Navigation Bar -->
    <Navbar />

    <!-- Child Components -->
    <div class="py-6 mx-auto w-full h-[calc(100vh-104px)] overflow-y-auto">
      <RouterView />
    </div>

    <!-- Footer -->
    <footer class="h-10 w-full flex items-center justify-between px-margin-desktop border-t border-[#dad9df] bg-[#f4f3f8] text-[11px] text-[#767680]">
      <div class="flex items-center gap-4">
        <span class="font-bold text-[#1b1b1f]">AOI Utility</span>
        <span>&copy; 2026 AOI Utility. All rights reserved.</span>
      </div>
      <div class="flex gap-6">
        <a href="#" class="hover:text-[#007aff] transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-[#007aff] transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-[#007aff] transition-colors">Support</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '../store'
import { onMounted } from 'vue'
import Navbar from '../components/kits/Navbar.vue'

const router = useRouter()

// Check authentication on component mount
onMounted(() => {
  if (!authStore.isLogin) {
    router.push('/login')
  }
})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Container margins following desktop standards */
.px-margin-desktop {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
</style>
