import { ref } from 'vue';

const unit = ref('F');

const toggleUnit = () => {
  unit.value = unit.value === 'F' ? 'C' : 'F';
};

export { unit, toggleUnit };
