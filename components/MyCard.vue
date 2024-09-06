<template>
    <div class="row mx-sm-auto bg-white p-3 rounded-4">
        <h3 class="px-3 mb-2 mt-3 font-bold text-red">Your Cart ({{totalItems}})</h3>
        <div v-if="flaggedItems && flaggedItems.length" class="p-3">
            <!-- Selected Items -->
            <div v-for="(item, index) in flaggedItems" class="selected-item position-relative pt-2">
                <h6 class="font-semiBold">{{item.name}}</h6>
                <div>
                    <span class="text-red font-semiBold">{{item.count}}x</span>
                    <span class="text-Rose300 font-semiBold mx-2">@ ${{item.price.toFixed(2)}}</span>
                    <span class="text-Rose500 font-semiBold">${{(item.price*item.count).toFixed(2)}}</span>
                </div>
                <button type="button" class="position-absolute top-0 start-100 remove-item p-1 border-Rose300 border-2 rounded-5" @click="removeItem(index)">
                    <img 
                        src="public/images/icon-remove-item.svg" 
                        class="d-block mx-auto" 
                        alt="close" 
                        height="10"
                        width="10"
                    >
                </button>
                <hr class="mb-0"/>
            </div>
            <!-- Order total -->
            <div class="row justify-content-between">
                <p class="w-auto font-semiBold">Order Total</p>
                <h3 class="font-bold w-auto">${{orderTotal.toFixed(2)}}</h3>
            </div>
            <div class="row w-100 justify-content-center my-4 mx-auto text-center bg-Rose50 rounded-3 align-items-baseline py-3">
                <img src="public/images/icon-carbon-neutral.svg" class="d-block mx-1 my-auto p-0 w-auto" alt="close" height="22" width="22">
                <p class="w-auto my-auto px-1">This is a <span class="text-Rose900 font-bold">carbon-neutral</span> delivery</p>
                
            </div>
            <!-- Confirm Button -->
            <a href="#desserts">
                <button class="confirm-btn p-3 border-0 rounded-5 bg-red cursor-pointer text-white font-semiBold w-100" @click="confirmOrder">Confirm Order</button>
            </a>
        </div>
        <div v-else class="p-3">
            <img 
                src="/images/illustration-empty-cart.svg" 
                class="d-block mx-auto mb-2 object-fit-fill rounded-4 " 
                alt="dessert" 
                height="140"
                width="140"
            >
            <p class="font-semiBold text-Rose400 text-center">Your added items will appear here</p>
        </div>        
    </div>
</template>
<script setup>
const emit = defineEmits(['removeItem','confirmOrder']);
const props = defineProps({
    flaggedItems:{type: Array}
});
// Compute total items
const totalItems = computed(() => props.flaggedItems?.reduce((sum, item) => sum + item.count, 0));

// Compute order total
const orderTotal = computed(() => props.flaggedItems?.reduce((total, item) => total + item.count * item.price, 0));

// tell parent to remove an item by index
function removeItem(index) {
    emit('removeItem', index)
}
// tell parent to confirm order
function confirmOrder() {
    emit('confirmOrder')
}
</script>
<style>
.remove-item{
    transform: translate(-100%, 100%) !important;
    background-color: inherit;
}
</style>