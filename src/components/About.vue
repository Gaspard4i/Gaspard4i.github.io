<template>
  <section id="about" class="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-base-200">
    <div class="container mx-auto">
      <SectionHeading icon="fa-solid fa-user">
        À propos de <span>Moi</span>
      </SectionHeading>

      <div class="grid lg:grid-cols-2 gap-12 items-center mt-12">
        <!-- Image -->
        <div class="flex justify-center">
          <img :src="avatarUrl" alt="Photo de Gaspard Catry"
            class="rounded-full w-64 h-64 lg:w-96 lg:h-96 object-cover shadow-2xl border-4 border-primary" />
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <h3 class="text-3xl font-bold">Je m'appelle Gaspard Catry</h3>
          <p class="text-primary font-semibold text-xl">
            Étudiant en BUT Informatique
          </p>

          <div class="space-y-4 text-primary-content-300 text-lg">
            <p>
              Je suis étudiant en BUT Informatique, passionné par le
              développement et l'apprentissage de nouvelles technologies.
            </p>
            <p>
              En ce moment, je m'intéresse au développement web et j'aime
              travailler sur des projets créatifs en équipe.
            </p>
            <p>
              Mon inspiration principale est d'explorer (et de comprendre avec
              plus ou moins de succès) les nouvelles technologies pour créer des
              solutions efficaces.
            </p>
            <p>Veuillez consulter mes compétences et projets ci-dessous.</p>
            <p>N'hésitez pas à me contacter, j'aime discuter :).</p>
          </div>


          <!-- Buttons -->
          <!-- <div class="flex flex-wrap gap-4">
            <BaseButton icon-right="fa-solid fa-chevron-right" tag="a" href="" target="_blank">
              CV
            </BaseButton>
            <BaseButton
              variant="secondary"
              icon-right="fa-solid fa-chevron-right"
              tag="a"
              href=""
              target="_blank"
            >
              Portfolio
            </BaseButton>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeading from "./atoms/SectionHeading.vue";
import BaseCard from "./atoms/BaseCard.vue";
import BaseButton from "./atoms/BaseButton.vue";

// Your Gravatar email hash (SHA256)
// You can generate it at https://gravatar.com/site/check/
const gravatarHash =
  "ea7dd79c8a54c68d3149de07d613daa105ab40f29c64da6cbbe540d6f362f93c"; // Replace with your actual SHA256 hash

// Gravatar avatar URL with size parameter
const avatarUrl = computed(() => {
  const size = 400; // Size in pixels (supports up to 2048)
  return `https://www.gravatar.com/avatar/${gravatarHash}?s=${size}&d=identicon`;
});
</script>
