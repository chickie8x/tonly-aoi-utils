<template>
  <div class="p-4">
    <!-- Machine Name -->
    <div class="mb-4">
      <label class="block mb-2">Machine Name</label>
      <InputText v-model="form.name" class="w-full" placeholder="Enter machine name" />
    </div>

    <!-- Machine Type -->
    <div class="mb-4">
      <label class="block mb-2">Machine Type</label>
      <Select
        v-model="form.type"
        :options="machineTypes"
        optionLabel="label"
        optionValue="value"
        placeholder="Select machine type"
        class="w-full"
      />
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2">
      <Button label="Cancel" size="small" severity="secondary" @click="closeDialog" />
      <Button icon="pi pi-save" label="Save" size="small" @click="handleSave" />
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { toast } from 'vue-sonner'

const dialogRef = inject('dialogRef')

const form = reactive({
  name: '',
  type: null
})

const machineTypes = [
  { label: 'SPI', value: 'SPI' },
  { label: 'AOI', value: 'AOI' }
]

const handleSave = async () => {
  if (!form.name || !form.type) {
    toast.error('Please fill all fields')
    return
  }
  else{
    // call api to add machine
    console.log('Form data:', form)
    const result = await window.api.addMachine({...form})
    console.log('Result:', await result)
    if (result.success) {
        toast.success('New machine added successfully')
        closeDialog()
    } else {
      toast.error(result.message)
    }
  }
}

const closeDialog = () => {
  dialogRef.value.close()
}
</script>