<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="form-label">
      <i v-if="icon" :class="icon" class="mr-2"></i>
      {{ label }}
    </label>
    <input 
      v-if="type !== 'textarea'"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="form-input"
    />
    <textarea
      v-else
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      class="form-input"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  icon: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  required: Boolean,
  disabled: Boolean,
  rows: {
    type: Number,
    default: 4
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-group {
  @apply space-y-2;
}

.form-label {
  @apply flex items-center font-semibold;
  color: var(--color-base-content);
}

.form-input {
  @apply w-full bg-base-200 border-2 border-neutral focus:border-primary focus:outline-none transition-colors duration-300;
  border-radius: var(--radius-field);
  padding: 0.75rem 1rem;
}
</style>
