<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref, computed, watch } from "vue";
import states from "./lookup/states";
import { formatState } from "./formatters";
import months from "./lookup/months";
const years = Array.from({ length: 10 }, (_, i) => i + 2024);
const shipping = ref({
  fullName: "K"
});
const error = ref("");
const sameAsShipping = ref(false);
const billing = ref({});
const card = ref({});

function onSubmit() {
  error.value = "Can't save yet, no API!";
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

// function formatState(state){
//   return `${state.name} (${state.abbreviation})`
// }

const shipZip = computed({
  get: () => shipping.value.postalCode,
  set: (newVal) => {
    if (newVal && typeof newVal === "string") {
      if (newVal.length <= 5 || newVal.indexOf("-") > -1) {
        shipping.value.postalCode = newVal;
      } else {
        shipping.value.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`;
      }
    } else {
      console.error("Failed to set postal code");
    }
  }
})

const billZip = computed({
  get: () => billing.value.postalCode,
  set: (newVal) => {
    if (newVal && typeof newVal === "string") {
      if (newVal.length <= 5 || newVal.indexOf("-") > -1) {
        billing.value.postalCode = newVal;
      } else {
        billing.value.postalCode = `${newVal.substring(0, 5)}-${newVal.substring(5)}`;
      }
    } else {
      console.error("Failed to set postal code");
    }
  }
})

</script>
<template>
  <Header />
  <div class="container bg-slate-300 mx-auto p-2">
    <h2>Payment</h2>
    <div class="bg-red-700 text-white p-2 w-full my-2" v-if="error">{{ error }}</div>
    <div>
      <form novalidate @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <h3 class="mb-6">Shipping Address</h3>
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" v-model="shipping.fullName" />
            <label for="company">Company</label>
            <input type="text" id="company" v-model="shipping.company">
            <label for="address1">Street Address</label>
            <input type="text" id="address1" v-model="shipping.address1" />
            <input type="text" id="address2" v-model="shipping.address2" />
            <label for="cityTown">City</label>
            <input type="text" id="cityTown" v-model="shipping.cityTown" />
            <label for="stateProvince">State/Province</label>
            <select id="stateProvince" v-model="shipping.stateProvince">
              <option v-for="state in states" :value="state.abbreviation" :key="state.name">{{ formatState(state) }}
              </option>
            </select>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="shipZip" />
          </div>

          <div>
            <h3>Billing</h3>
            <label class="flex">
              <input type="checkbox" v-model="sameAsShipping" />
              &nbsp;Same as Shipping?
            </label>
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" v-model="billing.fullName" :disabled="sameAsShipping" />
            <label for="company">Company</label>
            <input type="text" id="company" v-model="billing.company" :disabled="sameAsShipping">
            <label for="address1">Street Address</label>
            <input type="text" id="address1" v-model="billing.address1" :disabled="sameAsShipping" />
            <input type="text" id="address2" v-model="billing.address2" :disabled="sameAsShipping" />
            <label for="cityTown">City</label>
            <input type="text" id="cityTown" v-model="billing.cityTown" :disabled="sameAsShipping" />
            <label for="stateProvince">State/Province</label>
            <select id="stateProvince" v-model="billing.stateProvince" :disabled="sameAsShipping">
              <option v-for="state in states" :value="state.abbreviation" :key="state.name">{{ formatState(state) }}
              </option>
            </select>
            <label for="postalCode">Postal Code</label>
            <input type="text" id="postalCode" v-model="billZip" :disabled="sameAsShipping" />
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
  <Footer />
</template>
