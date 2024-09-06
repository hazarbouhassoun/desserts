<template>
    <div class="modal-dialog modal-x-md modal-dialog-centered modal-fullscreen-sm-down mt-sm-6">
        <div class="modal-content bg-white rounded-4">
            <div class="modal-body p-md-5 p-4">
                <div class="row m-0 justify-content-between">
                    <div class="description p-0 mb-4">
                        <img src="public/images/icon-order-confirmed.svg" class="p-0 img-border" alt="confirm">
                        <h2 class="font-bold my-auto text-Rose900 px-md-0 px-1 mt-3 mb-2 font-size-large">
                            Order Confirmed
                        </h2>
                        <h6 class="font-regular my-auto text-Rose400 px-md-0 px-1">
                            We hope You enjoy your food!
                        </h6>
                    </div>
                    <!-- Selected Items -->
                    <div class="row m-0 py-1 px-md-2 px-1 bg-Rose100 rounded-3">
                        <div v-for="item in flaggedItems">
                            <div class="w-100 flex d-flex justify-content-between py-3 px-2">
                                <div class="flex d-flex w-100">
                                    <img 
                                        :src="item.image.thumbnail" 
                                        :srcset="`
                                            ${item.image.mobile} 375w,
                                            ${item.image.tablet} 800w,
                                            ${item.image.desktop} 1440w
                                        `"
                                        sizes="(max-width: 375px) 375px, (max-width: 800) 800px, 100vw"
                                        class="p-0 img-border d-block object-fit-cover rounded-3"
                                        :alt="item.name"
                                        height="70"
                                    >
                                    <div class="px-2">
                                        <h6 class="font-semiBold mb-3 mt-1">{{item.name}}</h6>
                                        <div class="mb-0">
                                            <span class="text-red font-semiBold">{{item.count}}x</span>
                                            <span class="text-Rose300 font-semiBold mx-2">@ ${{item.price.toFixed(2)}}</span>
                                            <span class="text-Rose500 font-semiBold">${{(item.price*item.count).toFixed(2)}}</span>
                                        </div>
                                    </div>
                                </div>
                                <h5 class="my-auto text-Rose900 font-semiBold">
                                    ${{(item.price*item.count).toFixed(2)}}
                                </h5>
                            </div> 
                            <hr class="m-0" />                               
                        </div>
                        <div class="flex d-flex justify-content-between p-3">
                            <p class="w-auto font-semiBold">Order Total</p>
                            <h5 class="font-bold w-auto">${{orderTotal.toFixed(2)}}</h5>
                        </div>
                    </div>
                    <!-- Start New Order Button -->
                    <button class="confirm-btn p-3 border-0 rounded-5 bg-red cursor-pointer text-white font-semiBold w-100 mt-4" @click="newOrder()">Start New Order</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['confirmOrder']);
const props = defineProps({
    flaggedItems:{type: Array}
});
// calculate order total
const orderTotal = computed(() => props.flaggedItems.filter(item => item.flag === true)?.reduce((total, item) => total + item.count * item.price, 0));
// tell parent that the order confirmed
function newOrder() {
    emit('confirmOrder')
}
</script>
<style>
@media only screen and (max-width: 576px) {
    .mt-sm-6 {
        margin-top: 6.5rem;
    }
}
</style>