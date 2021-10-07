<template>
  <div v-if="store.state.items.showEditItemModal">
    <div class="modal">
      <div class="modal-lg-bg">
        <h3 class="text-center mb-10 text-xl text-gray-900">{{ $t('editItem.title') }}</h3>
        <Form @submit="editItem" :validation-schema="itemSchema">
          <AddOrEditItem :item="item" />
          <div class="text-right mt-5">
            <button class="btn-secondary" @click="close">{{ $t('generic.buttons.close') }}</button>
            <button class="btn-primary">{{ $t('generic.buttons.edit') }}</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import AddOrEditItem from "@/components/generics/forms/AddOrEditItem";
import { itemSchema } from "@/helpers/validations";
import { Form } from "vee-validate";
import ItemsApi from "@/api/items";
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "AddItem",
  components: {
    AddOrEditItem,
    Form
  },
  props: {
    storeUuid: { type: String, required: true },
    item: { type: Object, default: () => {} }
  },
  emits: ['updateItemList'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    function close() {
      store.commit('setShowEditItemModal', false);
    }

    async function editItem(itemValue) {
      itemValue.uuid = props.item.uuid
      try {
        await ItemsApi.edit(props.storeUuid, itemValue);
        updateItemListAndCloseModal(itemValue);
      } catch(error) {
        utils.prepareToastAndShowIt(`${t('editItem.messages.error')}`);
      }
    }

    function updateItemListAndCloseModal(item) {
      emit('updateItemList', item);
      close();
    }

    return {
      editItem,
      close,
      itemSchema,
      store,
      updateItemListAndCloseModal
    }
  }
}
</script>

<style>
@import './StoreModals.css';
</style>