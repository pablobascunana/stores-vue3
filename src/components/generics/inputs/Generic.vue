<template>
  <div class="GenericInput" :class="{ 'has-error': !!errorMessage, 'success': meta.valid }">
    <label :for="name" class="form-label">{{ label }}</label>
    <input
      :name="name"
      :id="name"
      class="form-input"
      :class="{ 'form-input-error': !!errorMessage, 'form-input-success': meta.valid }"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :min="0"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="help-message" v-show="errorMessage || meta.valid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    type: { type: String, default: "text" },
    value: { type: String, default: "" },
    name: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, default: "" },
    autocomplete: { type: String, default: "off" }
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    // https://vee-validate.logaretm.com/v4/examples/custom-inputs
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
  },
};
</script>

<style scoped>
.GenericInput {
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

.GenericInput.has-error input {
  background-color:  #FCA5A5;
  color: #B91C1C;
}

.GenericInput.has-error input:focus {
  border-color: #B91C1C;
}

.GenericInput.has-error .help-message {
  color: #B91C1C;
}

.GenericInput.success input {
  background-color: #6EE7B7;
  color: #047857;
}

.GenericInput.success input:focus {
  border-color: #047857;
}

.GenericInput.success .help-message {
  color: #047857;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>