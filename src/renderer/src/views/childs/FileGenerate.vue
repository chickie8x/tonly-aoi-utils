<template>
  <div class="bg-surface-ground text-surface-900 font-inter flex flex-col px-12">
    <!-- Main Content -->
    <main class="grow p-4 mx-auto w-full">
      <!-- Header -->
      <div class="mb-4 text-center">
        <h1 class="text-3xl font-bold mb-2">Generate Configuration File</h1>
        <p class="text-surface-500">
          Initialize new production line parameters and board specifications for AOI inspection.
        </p>
      </div>

      <div class="flex items-start gap-4">
        <!-- Form Card -->
        <Card class="shadow-sm overflow-hidden">
          <template #content>
            <div class="p-2 space-y-10">
              <!-- Machine Selection -->
              <div class="grid grid-cols-3 gap-8">
                <div class="flex flex-col gap-2">
                  <label
                    for="machine"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Select Machine</label
                  >
                  <Select
                    v-model="form.machine"
                    :options="machines"
                    optionLabel="name"
                    placeholder="Choose target machine..."
                    class="w-full flex items-center"
                    size="small"
                  />
                </div>
                <div class="flex flex-col gap-2 col-span-2">
                  <label
                    for="model"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Model</label
                  >
                  <InputText
                    v-model="form.model"
                    id="model"
                    placeholder="e.g. 080014-091304-B-V0"
                    size="small"
                  />
                </div>
              </div>

              <!-- Identifiers Grid -->
              <div class="grid grid-cols-3 gap-8">
                <div class="flex flex-col gap-2">
                  <label
                    for="inputMode"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Input Mode</label
                  >
                  <SelectButton
                    v-model="form.inputMode"
                    :options="inputModeOptions"
                    optionLabel="label"
                    optionValue="value"
                    size="small"
                    fluid
                  />
                </div>
                <!-- Board Side -->
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Board Side</label
                  >
                  <SelectButton
                    v-model="form.side"
                    :options="sides"
                    aria-labelledby="basic"
                    class="w-full md:w-fit"
                    size="small"
                    fluid
                  />
                </div>
                <!-- Board Lane -->
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Lane</label
                  >
                  <SelectButton
                    v-model="form.lanes"
                    :options="lanes"
                    aria-labelledby="basic"
                    class="w-full md:w-fit"
                    size="small"
                    fluid
                  />
                </div>
              </div>

              <!-- Serial Number -->
              <div v-if="form.inputMode === 'selection'" class="flex flex-col gap-2 col-span-2">
                <label for="sn" class="text-xs font-bold uppercase tracking-wider text-surface-600"
                  >Serial Number (SN)</label
                >
                <InputText
                  v-model="form.sn"
                  id="sn"
                  placeholder="e.g. YJM261908010A"
                  size="small"
                  class="w-full"
                  @blur="getSnInfo"
                />
              </div>

              <div v-else-if="form.inputMode === 'batch'" class="grid grid-cols-3 gap-8 col-span-2">
                <div>
                  <label
                    for="batch"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Master SN</label
                  >
                  <InputText
                    v-model="batchSN"
                    id="batch"
                    placeholder="e.g. YJM261908010A"
                    size="small"
                    class="w-full"
                    @change="buildSNList"
                  />
                </div>
                <div>
                  <label
                    for="batch"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Start</label
                  >
                  <InputNumber
                    v-model="batchStart"
                    id="batch"
                    size="small"
                    class="w-full"
                    showButtons
                    @change="buildSNList"
                  />
                </div>
                <div>
                  <label
                    for="batch"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >End</label
                  >
                  <InputNumber
                    v-model="batchEnd"
                    id="batch"
                    size="small"
                    class="w-full"
                    showButtons
                    @change="buildSNList"
                  />
                </div>
              </div>

              <!-- Quantities Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="flex flex-col gap-2">
                  <label
                    for="batch"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >Lot size</label
                  >
                  <InputNumber
                    v-model="form.batchQuantity"
                    id="batch"
                    showButtons
                    buttonLayout="stacked"
                    :min="1"
                    size="small"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label
                    for="pcs"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >PCS per Board</label
                  >
                  <InputNumber
                    v-model="form.pcs"
                    id="pcs"
                    showButtons
                    buttonLayout="stacked"
                    :min="1"
                    size="small"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label
                    for="line"
                    class="text-xs font-bold uppercase tracking-wider text-surface-600"
                    >SMT Line</label
                  >
                  <Select
                    v-model="form.line"
                    :options="lines"
                    placeholder="Select a Line"
                    size="small"
                    class="w-full"
                  />
                </div>
              </div>

              <!-- Divider -->
              <div
                class="border-t border-surface-border pt-6 mt-8 flex flex-col md:flex-row justify-end items-center gap-4"
              >
                <Button
                  label="Cancel Task"
                  text
                  severity="secondary"
                  class="font-bold px-6"
                  size="small"
                />
                <Button
                  label="Generate & Save"
                  icon="pi pi-file-export"
                  class="font-bold px-10 bg-primary border-primary"
                  @click="handleGenerate"
                  size="small"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- Info Card -->
        <Card class="shadow-sm overflow-hidden grow min-w-80">
          <template #content>
            <div class="p-2 space-y-4 w-full">
              <div class="flex flex-col gap-4">
                <label class="text-xs font-bold uppercase tracking-wider text-surface-600"
                  >Information</label
                >
                <div class="w-full flex-col gap-4 h-full overflow-auto">
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">Machine:</span>
                    <span class="text-sm text-primary-600">{{ form.machine?.name }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">Model:</span>
                    <span class="text-sm text-primary-600">{{ form.model }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">Side:</span>
                    <span class="text-sm text-primary-600">{{ form.side }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">Lane:</span>
                    <span class="text-sm text-primary-600">{{ form.lanes }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">Input Mode:</span>
                    <span class="text-sm text-primary-600">{{ form.inputMode }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">Batch Quantity:</span>
                    <span class="text-sm text-primary-600">{{ form.batchQuantity }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-surface-700 text-sm">PCS per Board:</span>
                    <span class="text-sm text-primary-600">{{ form.pcs }}</span>
                  </div>
                  <div v-if="sns.length > 0" class="flex flex-col">
                    <span class="font-semibold text-surface-700 text-sm">SN list:</span>
                    <ul class="text-sm text-primary-600 list-disc pl-8 max-h-40 overflow-auto">
                      <li v-for="sn in sns" :key="sn">{{ sn }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import InputNumber from 'primevue/inputnumber'
import { toast } from 'vue-sonner'

// Form state
const form = reactive({
  machine: null,
  sn: '',
  model: '',
  side: 'Top',
  lanes: 'Lane1',
  inputMode: 'selection',
  batchQuantity: 1,
  pcs: 1,
  line: 'SMTVG01'
})

// Options
const machines = ref([])
const batchSN = ref('')
const batchStart = ref(1)
const batchEnd = ref(1)

const inputModeOptions = ref([
  { label: 'Selection', value: 'selection' },
  { label: 'Batch', value: 'batch' },
  { label: 'Excel', value: 'excel' }
])

const sides = ref(['Top', 'Bottom'])
const lanes = ref(['Lane1', 'Lane2'])
const lines = ref([
  'SMTVG01',
  'SMTVG02',
  'SMTVG03',
  'SMTVG04',
  'SMTVG05',
  'SMTVG06',
  'SMTVG07',
  'SMTVG08',
  'SMTVG09',
  'SMTVG10'
])

const fetchMachines = async () => {
  const response = await window.api.getAllMachines()
  if (response.success) {
    machines.value = response.data
    console.log('Machines:', machines.value)
  } else {
    console.error('Failed to fetch machines:', response.message)
  }
}

const handleGenerate = async () => {
  console.log('Form:', form)
  const result = await window.api.createFileContent(JSON.stringify(form))
  if (!result.success) {
    toast.error(result.message)
  } else {
    toast.success('Generated files successfully')
    console.log(result.data)
  }
}

const sns = computed(() => {
  if (form.inputMode === 'selection') {
    return form.sn.split(',').filter((sn) => sn.trim() !== '')
  }
  if (form.inputMode === 'batch') {
    if (!batchSN.value?.trim()) return []
    if (batchStart.value == null || batchEnd.value == null || batchStart.value > batchEnd.value) {
      toast.error('Start must be less than or equal to End')
      batchStart.value = 1
      batchEnd.value = 1
      return []
    }
    const snsList = Array.from(
      { length: batchEnd.value - batchStart.value + 1 },
      (_, i) => `${batchSN.value}${String(batchStart.value + i).padStart(5, '0')}`
    )
    form.sn = snsList.join(',')
    return snsList
  }
  return []
})

const getSnInfo = () => {
  // sns.value is now a computed property, no need to update it here
}

onMounted(() => {
  fetchMachines()
})
</script>
