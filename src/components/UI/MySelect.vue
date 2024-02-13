<template>
  <select
      v-model="internalModelValue"
      @change="changeOption"
  >
    <option disabled value="">Вибирите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.name }}
    </option>>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props:{
    modelValue: {
      type: String
    },
    options:{
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      internalModelValue: this.modelValue // Створюємо копію пропса внутрішньої змінної
    }
  },
  watch:{
    modelValue(newValue) {
      this.internalModelValue = newValue; // Оновлюємо внутрішню змінну при оновленні пропса
    },
    internalModelValue(newValue) {
      this.$emit('update:modelValue', newValue); // Емітуємо подію для оновлення пропса
    }
  },
  methods:{
    changeOption(event) {
      this.$emit('modelValue', event.target.value)
    }
  }
}

</script>

<style scoped>

</style>