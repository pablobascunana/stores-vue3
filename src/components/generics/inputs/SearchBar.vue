<template>
  <div class="relative md:w-3/6">
    <input type="search"
      class="form-input-search"
      v-model="search"
      :placeholder="$t('stores.search')"
      @input="updateSearch"
    >
    <div class="absolute top-0 left-0 inline-flex items-center p-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
        stroke-linejoin="round">
        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "searchBar",
  emits: ['updateSearch'],
  setup(props, { emit }) {
    const search = ref('');

    function updateSearch() {
      emit('update-search', search);
    }

    return {
      search,
      updateSearch
    }
  }
}
</script>

<style>
@import './SearchBar.css';
</style>