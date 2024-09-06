<template>
    <div class="mb-4">
      <!-- Card Img -->
            <img
            :src="sweet.image.thumbnail" 
            :srcset="`
              ${sweet.image.mobile} 375w,
              ${sweet.image.tablet} 800w,
              ${sweet.image.desktop} 1440w
            `"
            sizes="(max-width: 375px) 375px, (max-width: 800) 800px, 100vw"
            :class="'d-block mx-auto mb-2 object-fit-cover rounded-4 img-class ' + (sweet.flag ? 'border-red border-3' : '')" 
            :alt="sweet.name"
            height="260"
          />
            <div class="text-center">
              <!-- Card Button -->
                <button @click="toggleFlag()" :class="'btn float-btn ' + (!sweet.flag ? 'btn-add-to-cart' : 'btn-add-to-cart-active') ">
                  <div v-if="!sweet.flag" class="m-1 font-semiBold w-100">
                    <img src="/images/icon-add-to-cart.svg" height="20" class="mx-2">
                    Add to Cart
                  </div>
                  <div v-else class="p-1 text-Rose50 font-semiBold w-100 d-inline-flex align-items-baseline">
                    <img @click="updateCount('decrement')" src="/images/icon-decrement-quantity.svg" height="18" width="18" class="p-1 border-Rose50 border-2 rounded-5 my-auto">
                    <span class="w-100">{{sweet.count}}</span>
                    <img @click="updateCount('increment')" src="/images/icon-increment-quantity.svg" height="18" width="18" class="p-1 border-Rose50 border-2 rounded-5 my-auto">
                  </div>
                  </button>
                <!-- Card Info -->
                <h6 class="text-gray-400 text-start font-regular text-Rose400">{{ sweet.category }}</h6>
                <h6 class=" text-start font-bold text-Rose900 font-size-meduim">{{ sweet.name }}</h6>
                <h6 class="card-text text-start font-semiBold text-red">$ {{ sweet.price.toFixed(2) }}</h6>
                
            </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['updateFlag','updateCount']);
const props = defineProps({
  sweet:{type: Object}
});
function toggleFlag () {
  if(!props.sweet.flag) {
    emit('updateFlag')
  }
}
function updateCount (type) {
  emit('updateCount', type)
}
</script>
<style lang="scss">
.btn-add-to-cart {
  background-color: white !important;
  border: 2px solid map-get($colors, "Rose300"); /* Same color as the text */
}
.btn-add-to-cart-active {
  background-color: map-get($colors, "red") !important;
  border: 2none; /* Same color as the text */
}
.float-btn {
    display: inline-flex;
    position: relative;
    justify-content: center;
    border-radius: 30px; /* Rounded edges */
    padding: 0.5rem 1rem;
    font-weight: bold;
    z-index: 2;
    margin-top: -56px !important;
    min-width: 75%;
}
.img-class{
   width: 100%; 
}
.btn:hover {
  color:  map-get($colors, "red") !important;
  background-color: none !important;
  border-color:  map-get($colors, "red") !important;
}
</style>