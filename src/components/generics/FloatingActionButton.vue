<template>
  <div :class="firstNode">
    <div :class="secondNode">
      <button class="btn-float">
        <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block"
          v-if="checkIconPosition"
          @click.prevent="addItem"
        >
          <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                  C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                  C15.952,9,16,9.447,16,10z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFFFFF"
          v-else
          @click.prevent="goToStore"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
import router from "@/router";
import { useStore } from 'vuex';

export default {
  name: "FloatingActionButton",
  props: { 
    firstNode: { type: String, required: true },
    secondNode: { type: String, required: true },
    iconPosition: { type: String, required: true }
  },
  setup(props) {
    const store = useStore();

    const checkIconPosition = computed(() => {
      if (props.iconPosition === 'bottom-right') {
        return true;
      } else {
        return false;
      }
    });

    function addItem() {
      store.commit('setShowAddItemModal', true);
    }

    function goToStore() {
      router.push({ name: 'stores' });
    }

    return {
      addItem,
      checkIconPosition,
      goToStore
    } 
  }
}
</script>

<style>
@import './FloatingActionButton.css';
</style>
