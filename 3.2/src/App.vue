<template>
  <Header />
  <Error :errorMsg="error"></Error>
  <PaymentView @onError="setError"></PaymentView>
  <Footer />
</template>



<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PaymentView from "@/Views/PaymentView.vue";
import Error from "@/components/Error.vue";
import {ref} from "vue";

const error = ref("");

function setError(msg){
  error.value = msg;
}
</script>

