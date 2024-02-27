<template>
    <div class="container bg-slate-300 mx-auto p-2">
        <h2>Payment</h2>
        
        <div>
            <form novalidate @submit.prevent="onSubmit">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <AddressView :model="shipping"> 
                            <h3 class="mb-6">Shipping Address</h3>
                        </AddressView>
                    </div>

                    <div>
                        <AddressView :model="billing" :isDisabled="sameAsShipping">
                            <h3>Billing</h3>
                            <label class="flex">
                                <input type="checkbox" v-model="sameAsShipping" />
                                &nbsp;Same as Shipping?
                            </label>
                        </AddressView>
                    </div>
                </div>
                <div class="w-1/2">
                    <h3>Credit Card</h3>
                    <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" v-model="card.cardNumber">
                    <label for="cardHolder">Name on Card</label>
                    <input type="text" id="cardHolder" v-model="card.cardHolder">
                    <div class="grid grid-cols-3 gap-2">
                        <div>
                            <label for="exMonth">Expiration Month</label>
                            <select id="exMonth" v-model="card.exMonth">
                                <option v-for="month in months" :key="month" :value="month.number">{{ month.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="exYear">Expiration Year</label>
                            <select id="exYear" v-model="card.exYear">
                                <option v-for="year in years" :key="year">{{ year }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="ccv">CCV</label>
                            <input type="text" id="ccv" v-model="card.ccv" />
                        </div>
                    </div>
                </div>
                <button type="submit">Next</button>
            </form>
            <div>
                <pre>{{ shipping }}</pre>
                <pre>{{ billing }}</pre>
                <pre>{{ card }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

import months from "@/lookup/months";

import AddressView from "@/Views/AddressView.vue";

const years = Array.from({ length: 10 }, (_, i) => i + 2024);
const shipping = ref({
    fullName: "K"
});

const emits = defineEmits([
    "onError"
]);

const sameAsShipping = ref(false);
const billing = ref({});
const card = ref({});

function onSubmit() {
    emits("onError", "Can't save yet!!")
}

watch(
    () => sameAsShipping.value,
    () => {
        if (sameAsShipping.value) {
            billing.value.fullName = shipping.value.fullName;
            billing.value.company = shipping.value.company;
            billing.value.address1 = shipping.value.address1;
            billing.value.address2 = shipping.value.address2;
            billing.value.cityTown = shipping.value.cityTown;
            billing.value.stateProvince = shipping.value.stateProvince;
            billing.value.postalCode = shipping.value.postalCode;
        }
    }
)

</script>