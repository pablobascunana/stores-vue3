<template>
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
      </div>
      <div class="item-description-container">
        <p class="description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ItemsApi from "@/api/items";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { utils } from "@/helpers/commons";

export default {
  name: "ItemCard",
  props: {
    storeUuid: { type: String, required: true }
  },
  setup(props) {
    const { t } = useI18n();
    const items = ref([]);

    async function getItems() {
      try {
        let { data } = await ItemsApi.items(props.storeUuid);
        items.value = data;
        return data;
      } catch (error) {
        utils.prepareToastAndShowIt(`${t('items.messages.error')}`);
      }
    }
    
    onMounted(getItems);

    return {
      items
    }
  }
}
</script>

<style>
@import './ItemCard.css';
</style>