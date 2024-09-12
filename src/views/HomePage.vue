<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Главная</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Главная</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>mpage</div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  useIonRouter,
} from "@ionic/vue";
import { onMounted } from "vue";
import { ACCESS_STR } from "../api";

const router = useIonRouter();

onMounted(() => {
  //TODO: fech
  if (!localStorage.getItem(ACCESS_STR)) {
    router.push("/auth");
  }
});
</script>
