<template>
  <div v-if="store.state.items.showAddItemModal">
    <div class="modal">
      <div class="modal-lg-bg">
        <h3 class="text-center mb-10 text-xl text-gray-900">{{ $t('addItem.title') }}</h3>
        <Form @submit="addItem" :validation-schema="itemSchema">
          <AddOrEditItem />
          <div class="text-right mt-5">
            <button class="btn-secondary" @click="close">{{ $t('generic.buttons.close') }}</button>
            <button class="btn-primary">{{ $t('generic.buttons.add') }}</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { itemSchema } from "@/helpers/validations";
import AddOrEditItem from "@/components/generics/forms/AddOrEditItem";
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
    storeUuid: { type: String, required: true }
  },
  emits: ['updateItemList'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    function close() {
      store.commit('setShowAddItemModal', false);
    }

    async function addItem(itemValue) {
      try {
        let { data } = await ItemsApi.add(props.storeUuid, itemValue);
        updateItemListAndCloseModal(data);
      } catch(error) {
        utils.prepareToastAndShowIt(`${t('items.messages.error')}`);
      }
    }

    function updateItemListAndCloseModal(item) {
      emit('updateItemList', item);
      close();
    }

    return {
      addItem,
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