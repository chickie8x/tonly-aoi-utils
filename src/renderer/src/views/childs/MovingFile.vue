web application/stitch/projects/1128888750982190823/screens/5e18bf0f1c714c1bbc086a6e011c7d1c
<template>
  <div class="min-h-screen bg-[#faf9fe] text-[#1b1b1f] font-inter flex flex-col">
    <!-- Main Content -->
    <main class="grow p-10 mx-auto w-full">
      <!-- Page Header & Controls -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold">File Migration Control</h1>
          <span
            class="px-3 py-1 bg-[#007aff] text-white text-[10px] font-bold uppercase tracking-wider rounded-full"
            >Active Configuration</span
          >
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="fetchPathConfigs"
            class="flex items-center gap-2 bg-[#0055cc] hover:bg-[#0044aa] text-white px-6 py-2.5 rounded font-bold text-sm transition-colors shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Run
          </button>
          <button
            class="flex items-center gap-2 bg-[#cc3333] hover:bg-[#aa2222] text-white px-6 py-2.5 rounded font-bold text-sm transition-colors shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="6" y="6" width="12" height="12"></rect>
            </svg>
            Stop
          </button>
        </div>
      </div>

      <!-- Mappings Table -->
      <section class="bg-white border border-[#dad9df] rounded-lg overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-[#dad9df] bg-[#f8f9fc]">
          <h2 class="font-bold text-sm uppercase tracking-wider text-[#767680]">
            Folder Pair Mappings
          </h2>
        </div>
        <div class="h-76 overflow-y-auto">
          <table class="w-full text-left border-collapse relative">
            <thead>
              <tr
                class="text-[10px] font-bold uppercase tracking-widest text-[#767680] border-b border-[#dad9df] sticky top-0 bg-white"
              >
                <th class="px-6 py-4">Name</th>
                <th class="px-6 py-4">Source Path</th>
                <th class="px-6 py-4">Destination Path</th>
                <th class="px-6 py-4 text-center">Files Moved</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#dad9df]">
              <tr
                v-for="(pair, index) in folderPairs"
                :key="index"
                class="hover:bg-[#fafafa] transition-colors"
              >
                <td class="px-6 py-4 font-semibold text-sm text-[#4848e5]">{{ pair.name }}</td>
                <td class="px-6 py-4 font-mono text-sm text-[#444446]">{{ pair.src_path }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#dad9df"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <span class="font-mono text-sm text-[#444446]">{{ pair.dst_path }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="inline-block bg-[#f0f0f4] text-[#767680] text-xs font-bold px-2 py-0.5 rounded"
                    >{{ pair.moved_files }}</span
                  >
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button
                      class="p-2 text-[#767680] hover:text-[#007aff] hover:bg-[#eef6ff] rounded transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      @click="deleteFolderPair(pair.id)"
                      class="p-2 text-[#767680] hover:text-[#cc3333] hover:bg-[#fff0f0] rounded transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4 bg-[#fcfcfd]">
          <button
            @click="isAddingFolderPair = !isAddingFolderPair"
            class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider  px-4 py-2 rounded-md transition-colors min-w-[120px]"
            :class="[!isAddingFolderPair ? 'text-[#007aff] hover:bg-[#eef6ff]' : 'text-[#efce13] hover:bg-[#f0f2ca]']"
          >
            <svg
              :class="[isAddingFolderPair ? 'rotate-45' : '']"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {{ isAddingFolderPair ? 'Close' : 'Add New' }}
          </button>
          <div
            class="overflow-hidden"
            :class="{ 'max-h-0': !isAddingFolderPair, 'max-h-[500px]': isAddingFolderPair }"
          >
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <label for="folder-name" class="text-sm font-medium text-[#767680]">Name:</label>
                <input
                  v-model="newFolderPair.name"
                  id="folder-name"
                  type="text"
                  class="border border-[#e0e0e0] rounded px-2 py-1"
                />
              </div>
              <div class="flex flex-col">
                <label for="source-path" class="text-sm font-medium text-[#767680]"
                  >Source Folder:</label
                >
                <input
                  v-model="newFolderPair.src_path"
                  id="source-path"
                  type="text"
                  class="border border-[#e0e0e0] rounded px-2 py-1"
                />
              </div>
              <div class="flex flex-col">
                <label for="destination-path" class="text-sm font-medium text-[#767680]"
                  >Destination Folder:</label
                >
                <input
                  v-model="newFolderPair.dst_path"
                  id="destination-path"
                  type="text"
                  class="border border-[#e0e0e0] rounded px-2 py-1"
                />
              </div>
            </div>
            <div class="flex justify-end mt-4 gap-2">
              <button
                @click="isAddingFolderPair = false"
                class="px-4 py-2 min-w-[80px] bg-[#e0e0e0] text-[#1b1b1d] rounded-md hover:bg-[#d0d0d0] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                @click="addNewFolderPair"
                class="px-4 py-2 min-w-[80px] bg-[#007aff] text-white rounded-md hover:bg-[#0056b3] transition-colors text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Logs Section -->
      <section>
        <div class="flex items-center justify-between mb-4 px-2">
          <h3 class="text-sm font-bold uppercase tracking-widest text-[#767680]">Activity Log</h3>
          <button
            class="text-[10px] font-bold text-[#767680] hover:text-[#1b1b1f] uppercase tracking-wider"
          >
            Clear Console
          </button>
        </div>
        <div
          class="bg-[#1b1b1d] rounded-lg p-6 font-mono text-sm leading-relaxed overflow-hidden border border-[#39393b] shadow-inner h-[300px] log-viewer overflow-y-auto"
        >
          <div v-for="(log, index) in logs" :key="index" class="mb-1">
            <span class="text-[#5c5c5c] mr-3">[{{ log.time }}]</span>
            <span
              :class="
                log.type === 'SUCCESS'
                  ? 'text-emerald-400'
                  : log.type === 'ERROR'
                    ? 'text-rose-400'
                    : 'text-[#909094]'
              "
              class="font-bold mr-3"
              >[{{ log.type }}]</span
            >
            <span class="text-[#e3e2e6]">{{ log.message }}</span>
          </div>
          <div class="inline-block w-2 h-4 bg-white/20 animate-pulse ml-1 align-middle"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { toast, Toaster } from 'vue-sonner'

const isAddingFolderPair = ref(false)
const folderPairs = ref([])
const newFolderPair = ref({
  name: '',
  src_path: '',
  dst_path: ''
})

const fetchPathConfigs = async () => {
  const folderPairsResult = await window.api.getAllPathConfigs()
  console.log(folderPairsResult)
  if (folderPairsResult.success) {
    if (folderPairsResult.data.length === 0) {
      toast.info('No path configs found')
    }
    else {
      folderPairs.value = folderPairsResult.data
      toast.success('Loaded path configs successfully')
    }
  } else {
    toast.error(folderPairsResult.message)
  }
}

const addNewFolderPair = async () => {
  const result = await window.api.addPathConfig({
    name: newFolderPair.value.name,
    src_path: newFolderPair.value.src_path,
    dst_path: newFolderPair.value.dst_path
  })
  console.log(result)
  if (result.success) {
    folderPairs.value.unshift(result.data)
    newFolderPair.value = {
      name: '',
      src_path: '',
      dst_path: ''
    }
    isAddingFolderPair.value = false
    toast.success('Added path config successfully')
  } else {
    toast.error(result.message)
  }
}

const deleteFolderPair = async (id) => {
  const result = await window.api.deletePathConfig(id)
  console.log(result)
  if (result.success) {
    folderPairs.value = folderPairs.value.filter((pair) => pair.id !== id)
    toast.success('Deleted path config successfully')
  } else {
    toast.error(result.message)
  }
}

const logs = ref([
  { time: '2024-05-20 10:00:01', type: 'SYSTEM', message: 'Initializing file mover service...' },
  {
    time: '2024-05-20 10:00:03',
    type: 'INFO',
    message: 'Scanning C:/data/raw_ingestion... 14 files detected.'
  },
  {
    time: '2024-05-20 10:00:04',
    type: 'INFO',
    message: 'Moving file_001_raw.dat to D:/backup/processed_2024'
  },
  { 
    time: '2024-05-20 10:00:05',
    type: 'INFO',
    message: 'Moving file_002_raw.dat to D:/backup/processed_2024'
  },
  {
    time: '2024-05-20 10:00:07',
    type: 'INFO',
    message: 'Moving file_003_raw.dat to D:/backup/processed_2024'
  },
  {
    time: '2024-05-20 10:00:08',
    type: 'SUCCESS',
    message: 'Task complete: 3 files successfully migrated.'
  },
    {
      time: '2024-05-20 10:15:00',
      type: 'INFO',
      message: 'Idle... waiting for next scheduled run or manual trigger.'
    },
    {
    time: '2024-05-20 10:15:00',
    type: 'INFO',
    message: 'Idle... waiting for next scheduled run or manual trigger.'
  },
  {
    time: '2024-05-20 10:15:00',
    type: 'INFO',
    message: 'Idle... waiting for next scheduled run or manual trigger.'
  },
  {
    time: '2024-05-20 10:15:00',
    type: 'INFO',
    message: 'Idle... waiting for next scheduled run or manual trigger.'
  },
  {
    time: '2024-05-20 10:15:00',
    type: 'INFO',
    message: 'Idle... waiting for next scheduled run or manual trigger.'
  }
])

onMounted(() => {
  fetchPathConfigs()
})
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono&display=swap'); */

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

.px-margin-desktop {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

/* Custom scrollbar for log viewer */
.log-viewer::-webkit-scrollbar {
  width: 8px;
}
.log-viewer::-webkit-scrollbar-track {
  background: #1b1b1d;
}
.log-viewer::-webkit-scrollbar-thumb {
  background: #39393b;
  border-radius: 4px;
}
.log-viewer::-webkit-scrollbar-thumb:hover {
  background: #4a4a4d;
}
</style>
