<template>
  <div class="flex items-center justify-center mt-16">
    <div class="col-span-12">
      <div class="overflow-auto lg:overflow-visible">
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <SearchBar @updateSearch="updateSearch"/>
          </div>
          <div class="shadow rounded-lg flex">
            <div class="relative">
              <button class="btn-primary" @click="addStore">
                {{ $t('stores.addStore') }}
              </button>
            </div>
          </div>
        </div>
        <table class="table text-gray-400 border-separate space-y-6 text-sm">
          <thead class="bg-white text-gray-500 shadow rounded-lg">
            <tr>
              <slot v-for="header in tableHeader" :key="header.id">
                <th :class="header.appearance">{{ header.name }}</th>
              </slot>
            </tr>
          </thead>
          <tbody>
            <slot v-for="(tableRow, index) in storeList" :key="index">
              <tr class="bg-white shadow rounded-lg">
                <td class="p-3">
                  <div class="flex align-items-center">
                    <img
                      class="rounded-full h-12 w-12 object-cover"
                      :src="`https://picsum.photos/id/${index}/200`"
                      alt="unsplash image"
                    >
                    <div class="ml-3">
                      <div class="p-3 text-gray-600">{{ tableRow.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="p-3 text-gray-600">{{ tableRow.phone }}</td>
                <td class="p-3 text-gray-600">{{ tableRow.email }}</td>
                <td class="p-3 text-gray-600">{{ tableRow.cif }}</td>
                <td class="p-3">
                  <a href="#" class="neutral-icon mr-2" @click.prevent="goToStore(tableRow.uuid)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                  <a href="#" class="negative-icon ml-2" @click="deleteStore(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </a>
                </td>
              </tr>
            </slot>
          </tbody>
        </table>
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
import SearchBar from '@/components/generics/SearchBar';
import StoresApi from "@/api/stores";
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "Stores",
  components: {
    AddStoreModal,
    DeleteStoreModal,
    SearchBar
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
    const tableBody = ref([]);
    const search = ref('');
    const storeToDelete = ref({});
    const indexStoreToDelete = ref(-1);

    const storeList = computed(() => {
      return tableBody.value.filter((row) => {
        return doStoresFilter(row, search.value);
      });
    });

    function updateSearch(value) {
      search.value = value.value;
    }
    
    async function getStores() {
      try {
        let { data } = await StoresApi.stores(store.state.user.userUuid);
        tableBody.value = data;
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

    function goToStore(storeUuid) {
      router.push({ name: 'items', params: { "storeUuid": storeUuid } });
    }

    function deleteStore(index) {
      indexStoreToDelete.value = index;
      storeToDelete.value = storeList.value[index];
      store.commit('setShowDeleteStoreModal', true);
    }

    function updateStoreList(store) {
      indexStoreToDelete.value === -1 ? tableBody.value.push(store) : tableBody.value.splice(indexStoreToDelete.value, 1);
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