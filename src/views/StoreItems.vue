<template>
<div>
  <FloatButton
    v-for="(fab, index) in fabs" :key="index"
    :firstNode="fab.first"
    :secondNode="fab.second"
    :iconPosition="fab.icon"
  />
  <div class="grid-items">
    <div class="card-container" v-for="(item, index) in items" :key="index">
      <ItemCard
        :storeUuid="storeUuid"
        :item="item"
        :index="index"
        @deleteItem="deleteItem"
        @editItem="editItem"
      />
    </div>
  </div>
  <AddItemModal
    :storeUuid="storeUuid"
    @updateItemList="updateItemList"
  />
  <EditItemModal
    :item="itemToUpdate"
    :storeUuid="storeUuid"
    @updateItemList="updateItemList"
  />
  <DeleteItemModal
    :item="itemToUpdate"
    :storeUuid="storeUuid"
    @updateItemList="updateItemList"
  />
</div>
</template>

<script>
import AddItemModal from "@/components/modals/AddItemModal";
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import EditItemModal from "@/components/modals/EditItemModal";
import FloatButton from "@/components/generics/FloatingActionButton";
import ItemCard from "@/components/generics/ItemCard";
import ItemsApi from "@/api/items";
import { onMounted, ref } from "vue";
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "StoreDetail",
  components: {
    AddItemModal,
    DeleteItemModal,
    EditItemModal,
    FloatButton,
    ItemCard
  },
  props: {
    storeUuid: { type: String, required: true }
  },
  setup(props) {
    const store = useStore();
    const { t } = useI18n();

    const fabs = ref([]);
    const items = ref([]);
    const indexItemToUpdate = ref(-1);
    const itemToUpdate = ref({});
    const isEdit = ref(false);

    fabs.value.push(
      { first: 'btn-fixed-top', second: 'btn-position-top-right', icon: 'top-right' }, 
      { first: 'btn-fixed-bottom', second: 'btn-position-bottom-right', icon: 'bottom-right' } 
    );

    async function getItems() {
      try {
        let { data } = await ItemsApi.items(props.storeUuid);
        items.value = data;
      } catch (error) {
        utils.prepareToastAndShowIt(`${t('items.messages.error')}`);
      }
    }

    function editItem(index) {
      isEdit.value = true;
      indexItemToUpdate.value = index;
      itemToUpdate.value = items.value[index];
      store.commit('setShowEditItemModal', true);
    }

    function deleteItem(index) {
      isEdit.value = false;
      indexItemToUpdate.value = index;
      itemToUpdate.value = items.value[index];
      store.commit('setShowDeleteItemModal', true);
    }
  
    function updateItemList(item) {
      indexItemToUpdate.value === -1
        ? items.value.push(item) 
        : isEdit.value
          ? items.value.splice(indexItemToUpdate.value, 1, item)
          : items.value.splice(indexItemToUpdate.value, 1);   
      indexItemToUpdate.value = -1
    }

    onMounted(getItems);

    return {
      deleteItem,
      editItem, 
      fabs,
      isEdit,
      items,
      indexItemToUpdate,
      itemToUpdate,
      updateItemList
    }
  }
}
</script>

<style>
  
</style>