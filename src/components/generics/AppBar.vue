<template>
  <nav class="bg-position">
    <div class="margin-items">
      <div class="position-items">
        <div class="position-logo">
          <div class="flex-shrink-0 flex">
            <img class="block h-8 w-auto" src="@/assets/logo.svg" alt="Workflow">
          </div>
        </div>
        <p class="text-gray-800">{{ store.state.user.userName }}</p>
        <div class="position-user-icon">
          <div class="ml-3 relative">
            <button @click="dropDownVisible" type="button" class="btn-user-icon" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/300" alt="avatar">
            </button>
            <div v-if="isDropDownVisible" class="dropdown-menu" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <button @click="logout" class="btn-dropdown-menu" id="user-menu-item">{{ $t('appBar.exitApp') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import router from "@/router";
import { useStore } from 'vuex';

export default {
  name: "AppBar",
  setup() {
    const store = useStore();

    const isDropDownVisible = ref(false);

    function dropDownVisible() {
      isDropDownVisible.value = !isDropDownVisible.value;
    }

    function logout() {
      dropDownVisible();
      store.commit('isLogin', true);
      router.push({ name: 'login'});
    }

    return {
      dropDownVisible,
      isDropDownVisible,
      logout,
      store
    }
  }
}
</script>

<style>
@import './AppBar.css';
</style>