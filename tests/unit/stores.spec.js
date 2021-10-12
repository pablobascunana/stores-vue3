import { shallowMount } from '@vue/test-utils';
import store from '@/store/index';
import i18n from '@/i18n';

import { utils } from "@/helpers/commons";

import Stores from '@/views/Stores';
import AppBar from '@/components/generics/AppBar';
import Table from '@/components/generics/Table';
import AddStoreModal from '@/components/modals/AddStoreModal';
import DeleteStoreModal from '@/components/modals/DeleteStoreModal';

const storeList = [
  {
    "uuid": "0eb192a7-1834-4a60-9c2e-5a26acdd198f",
    "email": "tienda5@hotmail.com",
    "cif": "A12345676",
    "phone": "666777555",
    "name": "Tienda 5"
  }
];
const storeToAddOrDelete = { 
  "email": "tienda5@hotmail.com",
  "cif": "A12345676",
  "phone": "666777555",
  "name": "Tienda 5"
};
const searchValue = { value: 'Tie' };
const valueGoToStore = { row: { uuid: '0eb192a7-1834-4a60-9c2e-5a26acdd198f' } };

describe('Stores.vue', () => {
  let wrapper, wrapperAppBar, wrapperTable, wrapperAddModal, wrapperDeleteModal;
  beforeEach(() => {
    wrapper = shallowMount(Stores, {
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperAppBar = shallowMount(AppBar, {
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperTable = shallowMount(Table, {
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperAddModal = shallowMount(AddStoreModal, {
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperDeleteModal = shallowMount(DeleteStoreModal, {
      propsData: {
        storeToDelete: storeToAddOrDelete
      },
      global: {
        plugins: [i18n, store]
      }
    });
  });

  it('Call get stores and do stores filters', async () => {
    await wrapper.vm.getStores();
    wrapper.vm.storeList = storeList;
    expect(wrapper.vm.tableBody.length).toEqual(1);
    wrapper.vm.search = searchValue.value;
    expect(wrapper.vm.tableBody.length).toEqual(1);
    wrapper.vm.search = `${searchValue.value}j`;
    expect(wrapper.vm.tableBody.length).toEqual(0);
  });

  it('Call prepare error toast', async () => {
    await utils.prepareToastAndShowIt('Toast message');
    expect(store.state.showToast).toBe(false);
  });

  it('Call update search', async () => {
    await wrapper.vm.updateSearch(searchValue);
    expect(wrapper.vm.search).toBe(searchValue.value);
  });

  it('Call add store', async () => {
    await wrapper.vm.addStore();
    expect(store.state.stores.showAddStoreModal).toBe(true);
  });

  it('Call go to store', async () => {
    await wrapper.vm.goToStore(valueGoToStore);
  });

  it('Call update store list to add store', async () => {
    await wrapper.vm.updateStoreList(storeToAddOrDelete);
    expect(wrapper.vm.tableBody.length).toEqual(1);
  });

  it('Call update store list to delete store', async () => {
    await wrapper.vm.deleteStore(0);
    expect(store.state.stores.showDeleteStoreModal).toBe(true);
    await wrapper.vm.updateStoreList(storeToAddOrDelete);
    expect(wrapper.vm.tableBody.length).toEqual(0);
  });

  it('Call go to details of table component', async () => {
    await wrapperTable.vm.goToDetails(storeList[0], 0);
  });

  it('Call delete action of table component', async () => {
    await wrapperTable.vm.deleteAction(storeList[0], 0);
  });

  it('Call app bar logour', async () => {
    await wrapperAppBar.vm.logout();
  });

  it('Call all function of add store modal', async () => {
    await wrapperAddModal.vm.addStore(storeToAddOrDelete);
    await wrapperAddModal.vm.close();
  });

  it('Call update store function of add store modal', async () => {
    await wrapperAddModal.vm.updateStore();
  });

  it('Call all function of delete store modal', async () => {
    await wrapperDeleteModal.vm.deleteStore();
    await wrapperDeleteModal.vm.close();
  });

  it('Call update store function of delete store modal', async () => {
    await wrapperDeleteModal.vm.updateStore();
  });
});
