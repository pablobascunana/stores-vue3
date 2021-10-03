<template>
<div>
  <FloatButton
    firstNode="btn-fixed-top"
    secondNode="btn-position-top-right"
    iconPosition="top-right"
  />
  <ItemCard :storeUuid="storeUuid"/>
  <FloatButton
    firstNode="btn-fixed-bottom"
    secondNode="btn-position-bottom-right"
    iconPosition="bottom-right"
  />
</div>
</template>

<script>
import FloatButton from "@/components/generics/FloatingActionButton";
import ItemCard from "@/components/generics/ItemCard";

export default {
  name: "StoreDetail",
  components: {
    FloatButton,
    ItemCard
  },
  props: {
    storeUuid: { type: String, required: true }
  }
}
</script>

<style>
  
</style>