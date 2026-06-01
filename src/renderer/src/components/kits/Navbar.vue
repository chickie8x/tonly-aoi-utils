<template>
    <header
        class="h-16 w-full flex items-center justify-between px-margin-desktop bg-white border-b border-[#dad9df] sticky top-0 z-10">
        <div class="flex items-center gap-8">
            <img src="../../assets/images/logo.jpg" alt="Logo" class="h-8 w-8">
            <nav class="hidden md:flex items-center gap-6">
                <router-link v-for="route in routes" :key="route.path" :to="route.path"
                    class="text-sm font-medium hover:text-[#1b1b1f] transition-colors"
                    :class="[currentPath?.path === route.path ? 'text-[#007aff]! font-semibold' : 'text-[#767680]']">{{ route.name }}</router-link>
            </nav>
        </div> 
        <div class="flex items-center gap-4 text-[#767680]">
            <button class="p-2 hover:bg-[#f4f3f8] rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </button>
            <button class="p-2 hover:bg-[#f4f3f8] rounded-full transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ authStore.user?.name }}
            </button>
        </div>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { authStore } from '../../store/index.js';

const routes = [
    { path: '/', name: 'Dashboard' },
    { path: '/moving-file', name: 'Moving File' },
    { path: '/generate-file', name: 'Generate File' },
    { path: '/settings', name: 'Settings' }
];

const route = useRoute();
const currentPath = computed(() => routes.find(routeItem => routeItem.path === route.path));

</script>