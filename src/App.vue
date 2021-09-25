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
import { defineAsyncComponent, getCurrentInstance, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'App',
  components: {
    Toast: defineAsyncComponent(() => import('@/components/Toast'))
  },
  setup() {
    const app = getCurrentInstance();
    const emitter = app.appContext.config.globalProperties.$emitter;
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

<style lang="scss">

</style>
