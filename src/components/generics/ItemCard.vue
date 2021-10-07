<template>
  <div>
    <div class="item-image">
      <img class="image" :src="item.imageURL" alt="item image">
    </div>
    <div class="item-name-price-container">
      <p class="name">{{ item.name }}</p>
      <p class="price">{{ item.price }}€</p>
      <div class="flex flex-col-reverse mb-1 cursor-pointer neutral-icon" @click="updateItem(true)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </div>
      <div class="flex flex-col-reverse mb-1 mr-2 cursor-pointer negative-icon" @click="updateItem(false)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </div>
    <div class="item-description-container">
      <p class="description">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "ItemCard",
  props: {
    storeUuid: { type: String, required: true },
    item: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  setup(props, { emit }) {
   
    function updateItem(isEdit) {
      emit('updateItem', { index: props.index, edit: isEdit });
    }

    return {
      updateItem
    }
  }
}
</script>

<style>
@import './ItemCard.css';
</style>