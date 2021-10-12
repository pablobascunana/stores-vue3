import { shallowMount } from '@vue/test-utils';
import store from '@/store/index';
import i18n from '@/i18n';

import StoreItems from '@/views/StoreItems';
import ItemCard from '@/components/generics/ItemCard';
import FloatButton from '@/components/generics/FloatingActionButton';
import AddItemModal from '@/components/modals/AddItemModal';
import EditItemModal from '@/components/modals/EditItemModal';
import DeleteItemModal from '@/components/modals/DeleteItemModal';

const storeUuid = { uuid: "0eb192a7-1834-4a60-9c2e-5a26acdd198f" };

const itemToUpdate = {
  name: "Cubo de Rubik",
  price: "20.5",
  imageURL: "https://source.unsplash.com/user/c_v_r",
  description: "Cubo de Rubik con un diseño nuevo.",
  uuid: "0eb192a7-5642-4a60-9c2e-5a26acdd198f"
};

const itemToAdd = {
  name: "Cubo de Rubik",
  price: "20.5",
  imageURL: "https://source.unsplash.com/user/c_v_r",
  description: "Cubo de Rubik con un diseño nuevo."
};

const itemValue = {
  edit: true,
  index: 0
}

describe('StoreItems.vue', () => {
  let wrapper, wrapperItemCard, wrapperFloatButton, wrapperAddModal, wrapperEditModal, wrapperDeleteModal;
  beforeEach(() => {
    wrapper = shallowMount(StoreItems, {
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperItemCard = shallowMount(ItemCard, {
      propsData: {
        storeUuid: storeUuid,
        item: itemToUpdate,
        index: 0
      }
    });
    wrapperFloatButton = shallowMount(FloatButton, {
      propsData: {
        firstNode: 'btn-fixed-top',
        secondNode: 'btn-position-top-right',
        iconPosition: 'top-right'
      },
      global: {
        plugins: [store]
      }
    });
    wrapperAddModal = shallowMount(AddItemModal, {
      propsData: {
        storeUuid: storeUuid
      },
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperEditModal = shallowMount(EditItemModal, {
      propsData: {
        storeUuid: storeUuid,
        item: itemToUpdate
      },
      global: {
        plugins: [i18n, store]
      }
    });
    wrapperDeleteModal = shallowMount(DeleteItemModal, {
      propsData: {
        storeUuid: storeUuid.uuid,
        item: itemToUpdate
      },
      global: {
        plugins: [i18n, store]
      }
    });
  });

  it('Call get items', async () => {
    await wrapper.vm.getItems();
  });

  it('Call to update item', async () => {
    await wrapper.vm.updateItem(itemValue);
    expect(wrapper.vm.isEdit).toBe(itemValue.edit);
    expect(wrapper.vm.indexItemToUpdate).toBe(itemValue.index);
    itemValue.edit = false;
    await wrapper.vm.updateItem(itemValue);
    expect(wrapper.vm.isEdit).toBe(itemValue.edit);
  });

  it('Call to update item list', async () => {
    await wrapper.vm.updateItemList();
    expect(wrapper.vm.indexItemToUpdate).toBe(-1);
    wrapper.vm.indexItemToUpdate = 0;
    wrapper.vm.isEdit = true;
    await wrapper.vm.updateItemList();
    expect(wrapper.vm.indexItemToUpdate).toBe(-1);
    wrapper.vm.indexItemToUpdate = 0;
    wrapper.vm.isEdit = false;
    await wrapper.vm.updateItemList();
    expect(wrapper.vm.indexItemToUpdate).toBe(-1);
  });

  it('Call update item function of item card component', async () => {
    await wrapperItemCard.vm.updateItem(false);
    await wrapperItemCard.vm.updateItem(true);
  });

  it('Call add item function of floating action button component', async () => {
    await wrapperFloatButton.vm.addItem(false);
    expect(wrapperFloatButton.vm.checkIconPosition).toBe(false);
    await wrapperFloatButton.setProps({ iconPosition: 'bottom-right' });
    expect(wrapperFloatButton.vm.checkIconPosition).toBe(true);
  });

  it('Call go to store function of floating action button component', async () => {
    await wrapperFloatButton.vm.goToStore();
  });

  it('Call add item function of add item modal', async () => {
    await wrapperAddModal.vm.addItem(itemToAdd);
  });

  it('Call update item list of add item modal', async () => {
    await wrapperAddModal.vm.updateItemListAndCloseModal(itemToUpdate);
  });

  it('Call edit item function of edit item modal', async () => {
    await wrapperEditModal.vm.editItem(itemToUpdate);
  });

  it('Call update item list of add item modal', async () => {
    await wrapperEditModal.vm.updateItemListAndCloseModal(itemToUpdate);
  });

  it('Call delete item function of delete item modal', async () => {
    await wrapperDeleteModal.vm.deleteItem(itemToUpdate);
  });

  it('Call update item list of add item modal', async () => {
    await wrapperDeleteModal.vm.updateItemListAndCloseModal(itemToUpdate);
  });
});
