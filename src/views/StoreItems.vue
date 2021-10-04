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
      />
    </div>
  </div>
  <DeleteItemModal
    :itemToDelete="itemToDelete"
    :storeUuid="storeUuid"
    @updateItemList="updateItemList"
  />
  <AddItemModal
    :storeUuid="storeUuid"
    @updateItemList="updateItemList"
  />
</div>
</template>

<script>
import AddItemModal from "@/components/modals/AddItemModal";
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import FloatButton from "@/components/generics/FloatingActionButton";
import ItemCard from "@/components/generics/ItemCard";
import ItemsApi from "@/api/items";
import { onMounted, ref } from "vue";
import { useStore } from 'vuex';

export default {
  name: "StoreDetail",
  components: {
    AddItemModal,
    DeleteItemModal,
    FloatButton,
    ItemCard
  },
  props: {
    storeUuid: { type: String, required: true }
  },
  setup(props) {
    const store = useStore();
    const fabs = ref([]);
    const items = ref([]);
    const indexItemToDelete = ref(-1);
    const itemToDelete = ref({});

    fabs.value.push(
      { first: 'btn-fixed-top', second: 'btn-position-top-right', icon: 'top-right' }, 
      { first: 'btn-fixed-bottom', second: 'btn-position-bottom-right', icon: 'bottom-right' } 
    );

    async function getItems() {
      items.value = await ItemsApi.items(props.storeUuid);
    }

    function deleteItem(index) {
      indexItemToDelete.value = index;
      itemToDelete.value = items.value[index];
      store.commit('setShowDeleteItemModal', true);
    }
  
    function updateItemList(item) {
      indexItemToDelete.value === -1 ? items.value.push(item) : items.value.splice(indexItemToDelete.value, 1);
      indexItemToDelete.value = -1
    }

    onMounted(getItems);

    return {
      deleteItem, 
      fabs,
      items,
      itemToDelete,
      updateItemList
    }
  }
}
</script>

<style>
  
</style>