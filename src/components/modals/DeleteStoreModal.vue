<template>
  <div v-if="store.state.stores.showDeleteStoreModal">
    <div class="modal">
      <div class="modal-sm-bg">
        <h3 class="text-center mb-10 text-xl text-gray-900">{{ $t('deleteStore.title') }}</h3>
        <p class="text-center text-gray-600">{{ $t('deleteStore.message') }} {{ storeToDelete.name }}?</p> 
        <div class="text-right mt-10">
          <button class="btn-secondary" @click="close">{{ $t('generic.buttons.close') }}</button>
          <button class="btn-primary" @click="deleteStore">{{ $t('generic.buttons.delete') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StoresApi from "@/api/stores";
import { useI18n } from "vue-i18n";
import { useStore } from 'vuex';
import { utils } from "@/helpers/commons";

export default {
  name: "AddStore",
  props: {
    storeToDelete: { type: Object, required: true, default: () => {} }
  },
  emits: ['updateStoreList'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    function close() {
      store.commit('setShowDeleteStoreModal', false);
    }

    async function deleteStore() {
      try {
        await StoresApi.delete(store.state.user.userUuid, props.storeToDelete.uuid);
        updateStore();
      } catch(error) {
        utils.prepareToastAndShowIt(`${t('deleteStore.messages.error')}`);
      }
    }

    function updateStore() {
      emit('updateStoreList', props.storeToDelete);
      close();
    }

    return {
      close,
      deleteStore,
      store,
      updateStore
    }
  }
}
</script>

<style>
@import './StoreModals.css';
</style>