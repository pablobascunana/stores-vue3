<template>
  <div>
    <div class="grid-items">
      <div class="card-container" 
        v-for="(item, index) in items" :key="index"
      >
        <div class="item-image">
          <img class="image" :src="item.imageURL">
        </div>
        <div class="item-name-price-container">
          <p class="name">{{ item.name }}</p>
          <p class="price">{{ item.price }}€</p>
          <div class="flex flex-col-reverse mb-1 cursor-pointer neutral-icon" @click="editItem">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div class="flex flex-col-reverse mb-1 mr-2 cursor-pointer negative-icon" @click="deleteItem(index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
        <div class="item-description-container">
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </div>
    <DeleteItemModal
      :itemToDelete="itemToDelete"
      :storeUuid="storeUuid"
      @updateItemList="updateItemList"
    />
  </div>
</template>

<script>
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import ItemsApi from "@/api/items";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from 'vuex';
import { utils } from "@/helpers/commons";

export default {
  name: "ItemCard",
  props: {
    storeUuid: { type: String, required: true }
  },
  components: {
    DeleteItemModal
  },
  setup(props) {
    const store = useStore();
    const { t } = useI18n();
    const items = ref([]);
    const indexItemToDelete = ref(-1);
    const itemToDelete = ref({});

    async function getItems() {
      try {
        let { data } = await ItemsApi.items(props.storeUuid);
        items.value = data;
        return data;
      } catch (error) {
        utils.prepareToastAndShowIt(`${t('items.messages.error')}`);
      }
    }

    function deleteItem(index) {
      indexItemToDelete.value = index;
      itemToDelete.value = items.value[index];
      store.commit('setShowDeleteItemModal', true);
    }

    function editItem() {
      alert('delete item');
    }

    function updateItemList(item) {
      indexItemToDelete.value === -1 ? items.value.push(item) : items.value.splice(indexItemToDelete, 1);
      indexItemToDelete.value = -1
    }
    
    onMounted(getItems);

    return {
      deleteItem,
      editItem,
      items,
      itemToDelete,
      updateItemList
    }
  }
}
</script>

<style>
@import './ItemCard.css';
</style>