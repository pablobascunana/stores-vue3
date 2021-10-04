<template>
  <div v-if="store.state.items.showAddItemModal">
    <div class="modal">
      <div class="modal-lg-bg">
        <h3 class="text-center mb-10 text-xl text-gray-900">{{ $t('addItem.title') }}</h3>
        <Form @submit="addItem" :validation-schema="addItemSchema">
          <div class="grid grid-cols-12 gap-6">
            <div class="md:col-start-3 md:col-span-4 col-span-12">
              <TextInput
                name="name"
                class="form-input"
                :label="$t('register.name')"
                :placeholder="$t('addItem.placeholders.name')"
              />
            </div>
            <div class="md:col-span-4 col-span-12">
              <TextInput
                name="price"
                type="number"
                class="form-input"
                :label="$t('addItem.price')"
                :placeholder="$t('addItem.placeholders.price')"
              />
            </div>
            <div class="md:col-start-3 md:col-span-8 col-span-12">
              <TextInput
                name="imageURL"
                class="form-input"
                :label="$t('addItem.imageURL')"
                :placeholder="$t('addItem.placeholders.imageURL')"
              />
            </div>
            <div class="md:col-start-3 md:col-span-8 col-span-12">
              <TextAreaInput
                name="description"
                class="form-input"
                :label="$t('addItem.description')"
                :placeholder="$t('addItem.placeholders.description')"
              />
            </div>
          </div>
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
import { addItemSchema } from "@/helpers/validations";
import { Form } from "vee-validate";
import ItemsApi from "@/api/items";
import TextAreaInput from "@/components/generics/forms/TextAreaInput.vue";
import TextInput from "@/components/generics/forms/TextInput.vue";
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "AddItem",
  components: {
    Form,
    TextAreaInput,
    TextInput
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
        emit('updateItemList', data);
        close();
      } catch(error) {
        utils.prepareToastAndShowIt(`${t('items.messages.error')}`);
      }
    }

    return {
      addItem,
      addItemSchema,
      close,
      store
    }
  }
}
</script>

<style>
@import './StoreModals.css';
</style>