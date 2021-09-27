<template>
  <div class="bg-indigo-100">
    <router-view/>
    <Toast
      :message="message"
      :color="color"
      v-if="store.state.showToast"
    ></Toast>
  </div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { emitter } from '@/helpers/emitter';
export default {
  name: 'App',
  components: {
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
@import './components/generics/TextInput.css';
</style>
