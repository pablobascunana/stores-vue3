<template>
  <div class="TextArea" :class="{ 'has-error': !!errorMessage, 'success': meta.valid }">
    <label :for="name" class="form-label">{{ label }}</label>
    <textarea
      :name="name"
      :id="name"
      class="form-input"
      :class="{ 'form-input-error': !!errorMessage, 'form-input-success': meta.valid }"
      :value="inputValue"
      :placeholder="$t('addItem.placeholders.description')"
      @input="handleChange"
      @blur="handleBlur"
    > 
    </textarea>
    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script>
import { useField } from "vee-validate";

export default {
  name: 'TextArea',
  props: {
    value: { type: String, default: "" },
    name: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, default: "" },
    autocomplete: { type: String, default: "off" },
    rows: { type: Number, default: 5 }
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  }
}
</script>

<style scoped>
.TextArea {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;
}

.help-message {
  position: absolute;
  bottom: calc(-1.5 * 1em);
  left: 0;
  margin: 0;
  font-size: 14px;
}

.TextArea.has-error input {
  background-color:  #FCA5A5;
  color: #B91C1C;
}

.TextArea.has-error input:focus {
  border-color: #B91C1C;
}

.TextArea.has-error .help-message {
  color: #B91C1C;
}

.TextArea.success input {
  background-color: #6EE7B7;
  color: #047857;
}

.TextArea.success input:focus {
  border-color: #047857;
}

.TextArea.success .help-message {
  color: #047857;
}
</style>