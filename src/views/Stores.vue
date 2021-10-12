<template>
  <div class="flex items-center justify-center mt-16">
    <div class="col-span-12">
      <div class="overflow-auto lg:overflow-visible">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <SearchBar
              @updateSearch="updateSearch"
            />
          </div>
          <div class="shadow rounded-lg flex">
            <div class="relative">
              <button id="addStore" class="btn-primary" @click="addStore">
                {{ $t('stores.addStore') }}
              </button>
            </div>
          </div>
        </div>
        <StoresTable
          :headers="tableHeader"
          :body="tableBody"
          @deleteStore="deleteStore"
          @goToDetails="goToStore"
        />
      </div>
    </div>
    <AddStoreModal
      @updateStoreList="updateStoreList"
    />
    <DeleteStoreModal
      :storeToDelete="storeToDelete"
      @updateStoreList="updateStoreList"
    />
  </div>
</template>
<script>
import AddStoreModal from "@/components/modals/AddStoreModal";
import { computed, onMounted, ref } from 'vue';
import DeleteStoreModal from "@/components/modals/DeleteStoreModal";
import router from "@/router";
import SearchBar from '@/components/generics/inputs/SearchBar';
import StoresApi from "@/api/stores";
import StoresTable from "@/components/generics/Table";
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "Stores",
  components: {
    AddStoreModal,
    DeleteStoreModal,
    SearchBar,
    StoresTable
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const tableHeader = [
      { id: 0, appearance: "pl-14", name: t('stores.nameHeader') },
      { id: 1, appearance: "p-3 text-left", name: t('stores.phoneHeader') },
      { id: 2, appearance: "p-3 text-left", name: t('stores.emailHeader') },
      { id: 3, appearance: "p-3 text-left", name: t('stores.cifHeader') },
      { id: 4, appearance: "p-3 text-left", name: t('stores.actionsHeader') }
    ]
    const storeList = ref([]);
    const search = ref('');
    const storeToDelete = ref({});
    const indexStoreToDelete = ref(-1);

    const tableBody = computed(() => {
      return storeList.value.filter((row) => {
        return doStoresFilter(row, search.value);
      });
    });

    function updateSearch(value) {
      search.value = value.value;
    }
    
    async function getStores() {
      try {
        let { data } = await StoresApi.stores(store.state.user.userUuid);
        storeList.value = data;
      } catch (error) {
        utils.prepareToastAndShowIt(`${t('stores.messages.error')}`);
      }
    }

    function doStoresFilter(store, search) {
      return store.name.toLowerCase().includes(search.toLowerCase()) ||
             store.phone.toLowerCase().includes(search.toLowerCase()) || 
             store.email.toString().includes(search.toLowerCase()) ||
             store.cif.toLowerCase().includes(search.toLowerCase())
    }

    function addStore() {
      store.commit('setShowAddStoreModal', true);
    }
    
    function goToStore(value) {
      router.push({ name: 'items', params: { "storeUuid": value.row.uuid } });
    }

    function deleteStore(value) {
      indexStoreToDelete.value = value.index;
      storeToDelete.value = storeList.value[value.index];
      store.commit('setShowDeleteStoreModal', true);
    }

    function updateStoreList(store) {
      indexStoreToDelete.value === -1 ? storeList.value.push(store) : storeList.value.splice(indexStoreToDelete.value, 1);
      indexStoreToDelete.value = -1
    }

    onMounted(getStores);

    return {
      addStore,
      deleteStore,
      getStores,
      goToStore,
      search,
      storeList,
      storeToDelete,
      tableBody,
      tableHeader,
      updateSearch,
      updateStoreList
    }
  }
}
</script>

<style>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:nth-child(n+5),
tr th:nth-child(n+5) {
  border-radius: 0 .625rem .625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
}

svg {
  display: inline-flex;
}

[type="search"] {
  border: none;
}
</style>