<template>
  <ion-page>


    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Авторизация</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-header>Вход</ion-header>
        <ion-input placeholder="Логин" v-model="signInData.login" style="border:1px solid black !important; border-radius: 10px"></ion-input>
        <ion-input
          placeholder="Пароль"
          v-model="signInData.password" style="border:1px solid black !important; border-radius: 10px"
        ></ion-input>
        <ion-button @click="signIn" style="margin-top: 10px;border-radius: 10px background-color: black!important; box-shadow: 0px 4px 8px 8px rgba(34, 60, 80, 0.2);
">Войти</ion-button>
        <ion-header style="margin-top: 40px; color:black!important; ">Регистрация</ion-header>
        <ion-input style="border:1px solid black !important; border-radius: 10px"
          placeholder="Фамилия"
          v-model="registrateData.family"
        ></ion-input>
        <ion-input placeholder="Имя" v-model="registrateData.name" style="border:1px solid black !important; border-radius: 10px"></ion-input>
        <ion-input
          placeholder="Логин" style="border:1px solid black !important; border-radius: 10px"
          v-model="registrateData.login"
        ></ion-input>
        <ion-input
          placeholder="Пароль" style="border:1px solid black !important; border-radius: 10px"
          v-model="registrateData.password"
        ></ion-input>
        <ion-button @click="registrate" style="margin-top:10px;box-shadow: 0px 4px 8px 8px rgba(34, 60, 80, 0.2);
">Зарегистрироватся</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  useIonRouter,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { ACCESS_STR, API_STR } from "../api";

const router = useIonRouter();

const signInData = ref({
  login: "",
  password: "",
});
const registrateData = ref({
  family: "",
  name: "",
  login: "",
  password: "",
});

onMounted(async () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem(ACCESS_STR)}`
  );
  myHeaders.append("Accept", "application/json");

  try {
    const response = await fetch(API_STR + "user/current", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    const result = await response.json();
    if (result?.data) {
      router.push("/home");
    }
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

const signIn = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("action", "mount_remove");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: signInData.value.login,
    password: signInData.value.password,
  });

  try {
    const response = await fetch(API_STR + "login", {
      method: "POST",
      headers: myHeaders,
      body: raw,
    });
    const result = await response.json();
    if (!result?.token) return;
    localStorage.setItem(ACCESS_STR, result?.token);
    router.push("/home");
  } catch (error) {
    console.error(error);
  }
};

const registrate = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const { family, name, login, password } = registrateData.value;

  const raw = JSON.stringify({
    name,
    surname: family,
    email: login,
    password,
  });

  try {
    const response = await fetch(API_STR + "register", {
      method: "POST",
      headers: myHeaders,
      body: raw,
    });
    const result = await response.json();
    if (!result?.token) return;
    localStorage.setItem(ACCESS_STR, result.token);
    router.push("/home");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}
.input-wrapper .sc-ion-input-md{
  border:1px solid black;
}
ion-header{
  order: 0;
}
#container a {
  text-decoration: none;
}
ion-input{
  background-color: white;
  max-width: 400px;
  margin-top: 10px;
}
ion-header{
  background-color: #FFDD2D;
  max-width: 200px;
  border-radius: 10px;
  padding: 5px;
}
#container{
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
}
.inner-scroll .scroll-y{
  max-width: 100% !important;
}
</style>
