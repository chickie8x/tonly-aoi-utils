<template>
  <div class="p-4">
    <!-- Machine Name -->
    <div class="mb-4">
      <label class="block mb-2">Username</label>
      <InputText v-model="form.username" class="w-full" size="small" required />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Name</label>
      <InputText v-model="form.name" class="w-full" size="small" required />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Password</label>
      <InputText v-model="form.password" class="w-full" size="small" required />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Confirm Password</label>
      <InputText v-model="form.confirmPassword" class="w-full" size="small" required />
    </div>

    <!-- Machine Type -->
    <div class="mb-4">
      <label class="block mb-2">Role</label>
      <Select
        v-model="form.role"
        :options="roles"
        optionLabel="label"
        optionValue="value"
        placeholder="Select role"
        class="w-full"
        size="small"
      />
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4">
      <Button label="Cancel" size="small" severity="secondary" @click="closeDialog" />
      <Button icon="pi pi-save" label="Save" size="small" @click="handleSave" />
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue'
import { useDialog } from 'primevue/usedialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { toast } from 'vue-sonner'

const dialog = useDialog()
const dialogRef = inject('dialogRef')

const form = reactive({
  username: '',
  name: '',
  password: '',
  confirmPassword: '',
  role: null
})

const roles = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'User', value: 'USER' }
]

const handleSave = async () => {
  if (!form.username || !form.password || !form.confirmPassword || !form.role) {
    toast.error('Please fill all fields')
    return
  }
  else{
    // call api to add machine
    console.log('Form data:', form)
    const result = await window.api.register(form)
    console.log('Result:', await result)
    if (result.success) {
        toast.success('New user added successfully')
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