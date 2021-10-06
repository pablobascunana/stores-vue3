<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="md:col-start-3 md:col-span-4 col-span-12">
      <GenericInput
        name="name"
        class="form-input"
        :value="item.name"
        :label="$t('register.name')"
        :placeholder="$t('addItem.placeholders.name')"
      />
    </div>
    <div class="md:col-span-4 col-span-12">
      <GenericInput
        name="price"
        type="number"
        class="form-input"
        :value="item.price"
        :label="$t('addItem.price')"
        :placeholder="$t('addItem.placeholders.price')"
      />
    </div>
    <div class="md:col-start-3 md:col-span-8 col-span-12">
      <GenericInput
        name="imageURL"
        class="form-input"
        :value="item.imageURL"
        :label="$t('addItem.imageURL')"
        :placeholder="$t('addItem.placeholders.imageURL')"
      />
    </div>
    <div class="md:col-start-3 md:col-span-8 col-span-12">
      <TextArea
        name="description"
        class="form-input"
        :value="item.description"
        :label="$t('addItem.description')"
        :placeholder="$t('addItem.placeholders.description')"
      />
    </div>
  </div>
</template>

<script>
import TextArea from "@/components/generics/inputs/TextArea";
import GenericInput from "@/components/generics/inputs/Generic";
export default {
  name: "AddOrEditItem",
  components: {
    GenericInput,
    TextArea
  },
  props: {
    item: { type: Object, 
      default: () => {
        return { name: "", price: undefined, imageURL: "", description: "" }
      }
    }
  }
}
</script>
<style>
  
</style>