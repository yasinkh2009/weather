import { ref, type Ref } from 'vue';

const location: Ref<string> = ref('Mashhad');

const changeLocation = (newLocation: string) => {
  location.value = newLocation;
};

export { location, changeLocation };
