<template>
  <div v-if="store.state.stores.showAddStoreModal">
    <div class="modal">
      <div class="modal-lg-bg">
        <h3 class="text-center mb-10 text-xl text-gray-900">{{ $t('addStore.title') }}</h3>
        <Form @submit="addStore" :validation-schema="addStoreSchema">
          <div class="grid grid-cols-12 gap-6">
            <div class="md:col-start-3 md:col-span-4 col-span-12">
              <GenericInput
                name="name"
                class="form-input"
                :label="$t('register.name')"
                :placeholder="$t('addStore.placeholders.name')"
              />
            </div>
            <div class="md:col-span-4 col-span-12">
              <GenericInput
                name="email"
                class="form-input"
                :label="$t('register.email')"
                :placeholder="$t('addStore.placeholders.email')"
              />
            </div>
            <div class="md:col-start-3 md:col-span-4 col-span-12">
              <GenericInput
                name="phone"
                type="number"
                class="form-input"
                :label="$t('addStore.phone')"
                :placeholder="$t('addStore.placeholders.phone')"
              />
            </div>
            <div class="md:col-span-4 col-span-12">
              <GenericInput
                name="cif"
                class="form-input"
                :label="$t('addStore.cif')"
                :placeholder="$t('addStore.placeholders.cif')"
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
import { addStoreSchema } from "@/helpers/validations";
import { Form } from "vee-validate";
import StoresApi from "@/api/stores";
import GenericInput from "@/components/generics/inputs/Generic.vue";
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "AddStore",
  components: {
    Form,
    GenericInput
  },
  emits: ['updateStoreList'],
  setup(props, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    function close() {
      store.commit('setShowAddStoreModal', false);
    }

    async function addStore(storeValue) {
      storeValue.userUuid = store.state.user.userUuid
      try {
        let { data } = await StoresApi.add(storeValue);
        updateStore(data);
      } catch(error) {
        utils.prepareToastAndShowIt(`${t('stores.messages.error')}`);
      }
    }

    function updateStore(store) {
      emit('update-store-list', store);
      close();
    }

    return {
      addStore,
      addStoreSchema,
      close,
      store,
      updateStore
    }
  }
}
</script>

<style>
@import './StoreModals.css';
</style>
