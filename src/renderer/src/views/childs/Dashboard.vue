<template>
        <!-- Main Content --> 
    <main class="grow p-10 mx-auto w-full">
      <!-- Welcome Header -->
      <div class="">
        <p class="text-[#767680] font-mono text-sm">v2.4.1 — System Status: <span class="text-emerald-600 font-bold">Operational</span></p>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <!-- Moving File -->
        <div class="bg-white border border-[#dad9df] rounded-lg p-8 flex flex-col h-full hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2">
              <div class="w-12 h-12 bg-[#eef6ff] text-[#007aff] rounded flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <h2 class="text-xl font-bold mb-3">Moving File</h2>
          </div>
          <p class="text-[#767680] text-sm leading-relaxed mb-8 grow">
            Transfer or relocate system files between utility clusters with automated verification and secure logging protocols.
          </p>
          <button class="flex items-center gap-2 text-[#007aff] text-xs font-bold uppercase tracking-wider hover:underline">
            Launch Utility
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <!-- Generate File -->
        <div class="bg-white border border-[#dad9df] rounded-lg p-8 flex flex-col h-full hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2">
            <div class="w-12 h-12 bg-[#eef6ff] text-[#007aff] rounded flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <h2 class="text-xl font-bold mb-3">Generate File</h2>
          </div>
          <p class="text-[#767680] text-sm leading-relaxed mb-8 grow">
            Create new configuration manifests or batch reports using pre-defined AOI templates and localized data parameters.
          </p>
          <button class="flex items-center gap-2 text-[#007aff] text-xs font-bold uppercase tracking-wider hover:underline">
            Create New
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </button>
        </div>

        <!-- Settings -->
        <div class="bg-white border border-[#dad9df] rounded-lg p-8 flex flex-col h-full hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2">
            <div class="w-12 h-12 bg-[#eef6ff] text-[#007aff] rounded flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
            <h2 class="text-xl font-bold mb-3">Settings</h2>
          </div>
          <p class="text-[#767680] text-sm leading-relaxed mb-8 grow">
            Configure system-wide preferences, manage API keys, and update local utility pathways for AOI operations.
          </p>
          <button class="flex items-center gap-2 text-[#007aff] text-xs font-bold uppercase tracking-wider hover:underline">
            Open System Preferences
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="2" y1="14" x2="6" y2="14"></line><line x1="10" y1="8" x2="14" y2="8"></line><line x1="18" y1="16" x2="22" y2="16"></line></svg>
          </button>
        </div>
      </div>

      <!-- System Statistics -->
      <section class="bg-[#f4f3f8] border border-[#dad9df] rounded-lg p-10">
        <h3 class="text-sm font-bold uppercase tracking-widest text-[#767680] mb-8">System Statistics</h3>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-wider text-[#767680] mb-1">Total Moves</span>
            <span class="text-3xl font-bold">1,284</span>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-wider text-[#767680] mb-1">Files Generated</span>
            <span class="text-3xl font-bold">542</span>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-wider text-[#767680] mb-1">Storage Used</span>
            <span class="text-3xl font-bold">14.2 GB</span>
          </div>
          <div>
            <span class="block text-[10px] font-bold uppercase tracking-wider text-[#767680] mb-1">Uptime</span>
            <span class="text-3xl font-bold text-[#007aff]">99.9%</span>
          </div>
        </div>
      </section>
    </main>
</template>
<script setup>

</script>