<template>
  <div v-if="store.state.items.showDeleteItemModal">
    <div class="modal">
      <div class="modal-sm-bg">
        <h3 class="text-center mb-10 text-xl text-gray-900">{{ $t('deleteItem.title') }}</h3>
        <p class="text-center text-gray-600">{{ $t('deleteItem.message') }} {{ item.name }}?</p>
        <div class="text-right mt-10">
          <button class="btn-secondary" @click="close">{{ $t('generic.buttons.close') }}</button>
          <button class="btn-primary" @click="deleteItem">{{ $t('generic.buttons.delete') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemsApi from "@/api/items";
import { useI18n } from "vue-i18n";
import { useStore } from 'vuex';
import { utils } from "@/helpers/commons";

export default {
  name: "DeleteItem",
  props: {
    item: { type: Object, required: true, default: () => {} },
    storeUuid: { type: String, required: true }
  },
  emits: ['updateItemList'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    function close() {
      store.commit('setShowDeleteItemModal', false);
    }

    async function deleteItem() {
      try {
        await ItemsApi.delete(props.storeUuid, props.item.uuid);
        emit('updateItemList', props.item);
        close();
      } catch(error) {
        utils.prepareToastAndShowIt(`${t('deleteItem.messages.error')}`);
      }
    }

    return {
      close,
      deleteItem,
      store
    }
  }
}
</script>

<style>
@import './StoreModals.css';
</style>