<template>
      <div id="desserts" class="py-lg-5 px-lg-5 py-md-4 px-md-4 py-sm-3 px-sm-3 py-3 px-1">
          <!-- Loading -->
          <div v-if="isLoading" class="row m-auto text-center h-95vh">
              <h2 class="text-red font-bold m-auto">Loading...</h2>
          </div>
          <!-- Error -->
          <div v-else-if="error" class="row m-auto text-center h-95vh">
              <h2 class="text-Rose500 font-semiBold m-auto">Error loading data :(</h2>
          </div>
          <!-- Getting Data Successfully-->
          <div v-else class="row px-lg-5 px-md-4 px-4 py-1">
              <div class="col-xl-8 col-lg-7 col-md-12 col-sm-12">
               <h1 class="mb-4 mt-3 text-Rose900 font-bold font-size-large">Desserts</h1>
               <div class="row">
               <!-- Cards -->
                  <div v-for="(item, index) in items" class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                      <SweetCard :sweet="item" @updateFlag="updateSweetsFlag(index)" @updateCount="updateSweetsCount(index,$event)" />
                  </div>
               </div>
              </div>
              <!-- User Store Card -->
              <div class="col-xl-4 col-lg-5 col-md-12 col-sm-12">
                  <MyCard :flaggedItems="flaggedItems" @removeItem="removeSelectedSweets($event)" @confirmOrder="openConfirmDialog()"/>
              </div>
          </div>
          <!-- Modal -->
          <div class="modal fade" id="orderDetailModal" tabindex="-1" aria-labelledby="orderDetailModalLabel" aria-hidden="true">
             <ConfirmDialog :flaggedItems="flaggedItems" @confirmOrder="newOrder()"/>
          </div>
      </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const data = ref(null);
const error = ref(null);
const isLoading = ref(true);
const { $bootstrap } = useNuxtApp();
const items = ref([])
const flaggedItems = computed(() => {
  return items.value?.filter(item => item.flag === true);
});

// changing item's flag value to make it selected
function updateSweetsFlag(index) {
    items.value[index].flag = true
}
// changing item's flag value and reset it's count to make it not selected
function removeSelectedSweets(id) {
    items.value?.filter(item => {
      if(item.id === id) {
        item.flag = false,
        item.count = 1
      }
    })
}

// increment, decrement item's count value
function updateSweetsCount(index,type) {
    if(type === 'increment') {
        items.value[index].count++
    } else {
        items.value[index].count > 1 ? items.value[index].count-- : null
    }
}

// open confirm dialog
const openConfirmDialog = () => {
        if ($bootstrap) {
            const modalElement = document.getElementById('orderDetailModal');
            if (modalElement) {
              const modal = new $bootstrap.Modal(modalElement, {
                  keyboard: false,
              });
              modal.show();
            } else {
              console.error('Modal element not found');
            }
        }
};

// set all data as not selected by set item's flag false and reset the count to 1
function newOrder() {
    flaggedItems.value.forEach(item => {
        item.flag = false; // reset flag
        item.count = 1; // reset count
    });
}

// fetch data
const fetchData = async () => {
  try {
    const response = await fetch('/data.json');  // Native fetch API
    if (!response.ok) throw new Error('Failed to fetch data');
    data.value = await response.json();
    data.value?.forEach((item, index) => {
        item.id = index + 1; // assign id to tell me data number from the selected item
        item.flag = false; // assign flag to tell me if the item selected
        item.count = 1; // assign count to tell me data number from the selected item
        item.image.thumbnail = item.image.thumbnail.replace('./assets',''); // remove ./assets because images now in public folder
        item.image.desktop = item.image.desktop.replace('./assets','');
        item.image.tablet = item.image.tablet.replace('./assets','');
        item.image.mobile = item.image.mobile.replace('./assets','')
    });
    items.value = data.value // assign the data to array to use it in view
  } catch (err) {
    error.value = err;
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  fetchData()
});

// meta
useHead({
      title: 'Desserts',
      meta: [
        { 
          name: 'description', 
          content: 'Discover delicious dessert recipes, from decadent cakes to creamy cheesecakes and irresistible cookies. Explore a world of sweet treats, baking tips, and dessert inspiration for every occasion!'
        },
        { 
          name: 'keywords', 
          content: 'dessert recipes, cakes, cookies, waffle, macaron, baklava, pie, Brownie.'
        }
      ],
      link: [
        { rel: 'canonical', href: 'https://desserts.com.test/' }
      ]
});
</script>
