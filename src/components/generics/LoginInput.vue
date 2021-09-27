<template>
  <input
    :id="name"
    :name="name"
    :type="type"
    :value="inputValue"
    :autocomplete="autocomplete"
    :class="appearance"
    :placeholder="placeholder"
    @input="handleChange"
    @blur="handleBlur"
  >
</template>

<script>
import { useField } from "vee-validate";

export default {
  name: "LoginInput",
  props: {
    type: { type: String, default: "text" },
    value: { type: String, default: "" },
    name: { type: String, required: true },
    placeholder: { type: String, default: "" },
    autocomplete: { type: String, default: "off" },
    appearance: { type: String, default: "form-input-top"}
  },
  setup(props) {
    const {
      handleChange,
      handleBlur,
      value: inputValue,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      inputValue
    }
  }
}
</script>

<style>
@import './LoginInput.css';
</style>