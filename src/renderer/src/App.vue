<template>
  <Toaster position="top-center" rich-colors />
  <router-view></router-view>
  <DynamicDialog />
</template>

<script setup>
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import DynamicDialog from 'primevue/dynamicdialog'
</script>