<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
    <!-- Main Content Container -->
    <div class="max-w-7xl mx-auto p-8">
      
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">System Settings</h1>
          <p class="text-slate-500 mt-1">Manage users, machines, and directory path mappings for the utility.</p>
        </div>
      </div>

      <!-- User Management Section -->
      <Card class="mb-10 border-none shadow-sm overflow-hidden">
        <template #header>
          <div class="flex items-center justify-between px-6 pt-6 pb-2">
            <div>
              <h2 class="text-xl font-bold text-slate-800">User Management</h2>
              <p class="text-slate-400 text-xs">Control access levels and authorized personnel</p>
            </div>
            <Button @click="openAddUserDialog" label="Add User" icon="pi pi-plus" size="small" class="bg-blue-600 border-blue-600" />
          </div>
        </template>
        <template #content>
          <DataTable :value="users" class="p-datatable-sm" responsiveLayout="scroll">
            <Column field="name" header="USER" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <template #body="slotProps">
                <div class="flex items-center gap-3 py-1">
                  <Avatar :image="slotProps.data.avatar" :label="!slotProps.data.avatar ? slotProps.data.initials : null" shape="circle" class="bg-blue-50 text-blue-600 font-bold" />
                  <div>
                    <div class="font-bold text-sm text-slate-900">{{ slotProps.data.name }}</div>
                    <div class="text-xs text-slate-500">{{ slotProps.data.email }}</div>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="role" header="ROLE" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <template #body="slotProps">
                <span class="text-sm text-slate-600">{{ slotProps.data.role }}</span>
              </template>
            </Column>
            <Column field="lastActive" header="LAST ACTIVE" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <template #body="slotProps">
                <span class="text-sm text-slate-500">{{ slotProps.data.lastActive }}</span>
              </template>
            </Column>
            <Column field="status" header="STATUS" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <template #body="slotProps">
                <Tag :value="slotProps.data.status" :severity="getStatusSeverity(slotProps.data.status)" class="text-[10px] font-bold" />
              </template>
            </Column>
            <Column header="ACTIONS" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase text-right">
              <template #body>
                <div class="flex justify-end gap-1">
                  <Button icon="pi pi-pencil" text rounded severity="secondary" size="small" />
                  <Button icon="pi pi-trash" text rounded severity="danger" size="small" />
                </div>
              </template>
            </Column>
          </DataTable>
          <div class="flex justify-center mt-6 border-t border-slate-100 pt-4">
            <Paginator :rows="10" :totalRecords="25" template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" class="border-none bg-transparent" />
          </div>
        </template>
      </Card>

      <!-- Machines & Path Mappings Section -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-slate-800">Machines & Path Mappings</h2>
        <Button @click="openAddMachineDialog" label="Configure Machine" icon="pi pi-cog" text size="small" class="font-bold text-blue-600" />
      </div>

      <div class="grid grid-cols-1 gap-6">
        <div v-for="group in machineMappings" :key="group.machineId" class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <!-- Machine Header Bar -->
          <div class="bg-blue-50/40 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                <i class="pi pi-sitemap text-sm"></i>
              </div>
              <span class="font-bold text-slate-900">{{ group.machineId }}</span>
              <Tag value="Online" severity="success" size="small" class="text-[9px] font-bold" />
            </div>
            <div class="flex items-center gap-2">
              <Button icon="pi pi-ellipsis-v" text rounded severity="secondary" size="small" />
            </div>
          </div>

          <!-- Mappings Table -->
          <DataTable :value="group.paths" class="p-datatable-sm" responsiveLayout="scroll">
            <Column field="source" header="SOURCE FOLDER (NETWORK)" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-6">
              <template #body="slotProps">
                <div class="flex items-center gap-2 text-sm font-mono text-slate-600 py-3 px-2">
                  <i class="pi pi-folder-open text-slate-400"></i>
                  {{ slotProps.data.source }}
                </div>
              </template>
            </Column>
            <Column field="dest" header="DESTINATION VAULT" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-6">
              <template #body="slotProps">
                <div class="flex items-center gap-2 text-sm font-mono text-slate-600 py-3 px-2">
                  <i class="pi pi-cloud text-slate-400"></i>
                  {{ slotProps.data.dest }}
                </div>
              </template>
            </Column>
            <Column header="ACTIONS" headerClass="text-[10px] font-bold tracking-widest text-slate-400 uppercase text-right px-6">
              <template #body>
                <div class="px-2 flex justify-end">
                  <Button icon="pi pi-trash" text rounded severity="danger" size="small" class="text-slate-400 hover:text-red-500" />
                </div>
              </template>
            </Column>
          </DataTable>
          
          <!-- Add Path Action -->
          <div class="px-6 py-4 bg-slate-50/30 border-t border-slate-50">
            <Button label="Add Path Mapping" icon="pi pi-plus" text size="small" class="p-0 font-bold text-blue-600" />
          </div>
        </div>

        <!-- Register New Machine Placeholder -->
        <div class="border-2 border-dashed border-slate-200 rounded-xl p-12 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50/10 transition-all cursor-pointer group">
          <div class="flex flex-col items-center gap-3 text-slate-400 group-hover:text-blue-600">
            <i class="pi pi-plus-circle text-3xl"></i>
            <span class="font-bold text-xs uppercase tracking-widest">Register New Machine Mapping Group</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import Paginator from 'primevue/paginator'
import { useDialog } from 'primevue/usedialog'
import AddUser from '../../components/sub-content/AddUser.vue'
import AddMachine from '../../components/sub-content/AddMachine.vue'

const dialog = useDialog()

// Sample Data
const users = ref([
  { 
    name: 'Sarah Jenkins', 
    initials: 'SJ', 
    email: 's.jenkins@aoi-utility.com', 
    role: 'Administrator', 
    lastActive: '2 mins ago', 
    status: 'Active', 
    avatar: null
  },
  { 
    name: 'Marcus Thorne', 
    initials: 'MT', 
    email: 'm.thorne@aoi-utility.com', 
    role: 'Operator', 
    lastActive: '1 hour ago', 
    status: 'Active', 
    avatar: null 
  },
  { 
    name: 'Elena Martinez', 
    initials: 'EM', 
    email: 'e.martinez@aoi-utility.com', 
    role: 'Viewer', 
    lastActive: 'Yesterday', 
    status: 'Away', 
    avatar: null 
  }
])

const machineMappings = ref([
  {
    machineId: 'AOI-Line-01-A',
    status: 'Online',
    paths: [
      { source: '\\\\SRV-AOI-01\\Exports\\Daily\\', dest: 'Vault-Production-Main' },
      { source: '\\\\SRV-AOI-01\\Diagnostics\\', dest: 'Vault-Archive-Secondary' }
    ]
  },
  {
    machineId: 'AOI-Line-02-B',
    status: 'Online',
    paths: [
      { source: '\\\\SRV-AOI-02\\Process\\Logs\\', dest: 'Vault-Analytics' }
    ]
  }
])

// Utility functions
const getStatusSeverity = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Away': return 'warning'
    case 'Offline': return 'danger'
    default: return 'info'
  }
}

const openAddUserDialog = () => {
  dialog.open(AddUser, {
    props: {
      header: 'Add New User',
      modal: true,
      closable: true,
      dismissableMask: true,
      style: {
        width: '40rem'
      }
    }
  })
}

const openAddMachineDialog = () => {
  dialog.open(AddMachine, {
    props: {
      header: 'Add New Machine',
      modal: true,
      closable: true,
      dismissableMask: true,
      style: {
        width: '40rem'
      }
    }
  })
}
</script>

<style>
/* PrimeVue Aura Theme / Custom Layout Overrides */
.p-card {
  border-radius: 0.75rem;
}

.p-datatable .p-datatable-thead > tr > th {
  background-color: transparent;
  border-bottom: 1px solid #f1f5f9;
  padding: 1rem;
}

.p-datatable .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #f8fafc;
}

.p-tag {
  border-radius: 4px;
}

.p-paginator {
  padding: 0;
}

.p-paginator .p-paginator-pages .p-paginator-page {
  min-width: 2rem;
  height: 2rem;
}
</style>