<template>
  <div class="h-full min-h-screen bg-indigo-100">
    <AppBar v-if="!store.state.login"/>
    <router-view/>
    <Toast
      data-testid="toast"
      :message="message"
      :color="color"
      v-if="store.state.showToast"
    ></Toast>
  </div>
</template>

<script>
import { emitter } from "@/helpers/emitter";
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'App',
  components: {
    AppBar: defineAsyncComponent(() => import('@/components/generics/AppBar')),
    Toast: defineAsyncComponent(() => import('@/components/generics/Toast'))
  },
  setup() {
    const store = useStore();
    const message = ref('');
    const color = ref('');

    const loadToastEvents = () => {
      emitter.on('show-toast', (data) => {
        message.value = data.message;
        color.value = typeof data.color === 'undefined' ? 'bg-green-500' : data.color;
        store.commit('setShowToast', true);
      });
    }

    onMounted(loadToastEvents);
    
    return { 
      color,
      message,
      store
    }
  },
}
</script>

<style>
@import './index.css';
@import './components/generics/inputs/Inputs.css';
</style>
