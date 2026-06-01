import { reactive } from "vue";

export const authStore = reactive({
  user: null,
  isLogin: false
});

export default authStore;