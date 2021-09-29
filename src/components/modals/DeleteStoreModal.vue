<template>
  <div v-if="store.state.showDeleteStoreModal">
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
import { emitter } from '@/helpers/emitter';
import StoresApi from "@/api/stores";
import { useI18n } from "vue-i18n";
import { useStore } from 'vuex';
export default {
  name: "AddStore",
  props: {
    storeToDelete: { type: Object, required: true, default: () => {} }
  },
  emits: ['updateStoreList'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();
    const toast = {};

    function close() {
      store.commit('setShowDeleteStoreModal', false);
    }

    async function deleteStore() {
      try {
        await StoresApi.delete(store.state.user.userUuid, props.storeToDelete.uuid);
        emit('updateStoreList', props.storeToDelete);
        close();
      } catch(error) {
        prepareErrorToast();
      }
    }

    function prepareErrorToast() {
      toast.message = `${t('deleteStore.messages.error')}`
      toast.color = 'bg-red-500';
      emitter.emit('show-toast', toast);
    }

    return {
      close,
      deleteStore,
      store
    }
  }
}
</script>

<style>
@import './StoreModals.css';
</style>