<template>
  <section id="contact" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto max-w-2xl">
      <SectionHeading icon="fa-solid fa-envelope">
        <span>Contactez-moi</span>
      </SectionHeading>

      <p class="text-center text-primary-content-300 text-lg mt-6 mb-12">
        Vous avez une question ou souhaitez entrer en contact ? N'hésitez pas !
      </p>

      <!-- Simple Contact Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          id="name"
          v-model="formData.name"
          label="Votre Nom"
          icon="fa-solid fa-user"
          placeholder="Jean Dupont"
          :required="true"
        />

        <BaseInput
          id="email"
          v-model="formData.email"
          type="email"
          label="Votre Email"
          icon="fa-solid fa-envelope"
          placeholder="jean.dupont@example.com"
          :required="true"
        />

        <BaseInput
          id="message"
          v-model="formData.message"
          type="textarea"
          label="Votre Message"
          icon="fa-solid fa-message"
          placeholder="Votre message ici..."
          :rows="6"
          :required="true"
        />

        <BaseButton
          type="submit"
          :full-width="true"
          size="lg"
          icon-left="fa-solid fa-paper-plane"
        >
          Envoyer le message
        </BaseButton>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import SectionHeading from "./atoms/SectionHeading.vue";
import BaseInput from "./atoms/BaseInput.vue";
import BaseButton from "./atoms/BaseButton.vue";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const handleSubmit = () => {
  const subject = encodeURIComponent(`Message de ${formData.value.name}`);
  const body = encodeURIComponent(
    `Nom: ${formData.value.name}\n` +
      `Email: ${formData.value.email}\n\n` +
      `Message:\n${formData.value.message}`,
  );
  window.location.href = `mailto:gaspard.catry.etu@univ-lille.fr?subject=${subject}&body=${body}`;
};
</script>
