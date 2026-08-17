<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lucide Icons
import { Star, MessageSquareQuote, ShieldCheck, ExternalLink } from '@/core/utils/icon'

gsap.registerPlugin(ScrollTrigger)

const isIframeLoading = ref(true)

const onIframeLoad = () => {
  isIframeLoading.value = false
}

// GSAP Entrance Animasyonu (Tasarım Sistemiyle Tam Uyumlu)
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.google-reviews-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  tl.from('.gsap-header-item', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    clearProps: 'all',
  }).from(
    '.gsap-reviews-container',
    {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    },
    '-=0.4',
  )
})
</script>

<template>
  <section class="google-reviews-section relative py-20 bg-[#FAF8F5] overflow-hidden font-inter">
    <!-- Arka Plan Dekoratif Işıklar ve Şekiller -->
    <div
      class="absolute top-1/3 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute -bottom-20 -left-20 w-80 h-80 bg-second rounded-full blur-2xl pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
      <!-- CREATIVE HEADER SECTION -->
      <div
        class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-black/5 pb-8"
      >
        <div class="space-y-3 max-w-2xl">
          <!-- Sub Badge -->
          <div>
            <div
              class="gsap-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-second border border-primary/15 text-primary text-xs font-jakarta font-bold shadow-xs"
            >
              <MessageSquareQuote class="w-4 h-4 text-primary" />
              <span>Müşteri Deneyimleri</span>
            </div>
          </div>

          <!-- Main Title -->
          <h2
            class="gsap-header-item font-jakarta text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1D1D] tracking-tight leading-tight"
          >
            Misafirlerimizin
            <span class="text-primary underline decoration-second underline-offset-4"
              >Yorumları</span
            >
          </h2>

          <!-- Description -->
          <p
            class="gsap-header-item text-sm sm:text-base text-[#665E58] font-normal leading-relaxed"
          >
            Taş fırınımızdan çıkan lezzetlerimizi ve hizmet kalitemizi tadan misafirlerimizin Google
            üzerindeki gerçek değerlendirmeleri.
          </p>
        </div>

        <!-- Google Rating Özet Kutusu -->
        <div
          class="gsap-header-item flex items-center gap-4 bg-white px-5 py-3.5 rounded-2xl border border-black/5 shadow-sm self-start md:self-end"
        >
          <div
            class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0"
          >
            <Star class="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-jakarta font-extrabold text-lg text-[#1F1D1D]">4.4</span>
              <div class="flex text-amber-400">
                <Star v-for="i in 5" :key="i" class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
            </div>
            <span class="text-xs text-[#665E58] font-medium flex items-center gap-1">
              <ShieldCheck class="w-3.5 h-3.5 text-emerald-600 inline" /> Google Doğrulanmış
              Yorumlar
            </span>
          </div>
        </div>
      </div>

      <!-- GOOGLE REVIEWS IFRAME CONTAINER -->
      <div class="gsap-reviews-container">
        <div
          class="relative w-full bg-white rounded-[32px] border border-black/5 shadow-xl shadow-black/5 p-3 sm:p-6 overflow-hidden min-h-[500px]"
        >
          <!-- Yükleniyor Iskelet (Skeleton) Ekranı -->
          <div
            v-if="isIframeLoading"
            class="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center gap-3 p-6"
          >
            <div
              class="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"
            ></div>
            <p class="text-xs font-semibold text-[#665E58] font-jakarta">
              Google yorumları yükleniyor...
            </p>
          </div>

          <!-- SociableKIT Iframe -->
          <iframe
            src="https://widgets.sociablekit.com/google-reviews/iframe/25683870"
            frameborder="0"
            width="100%"
            height="800px"
            class="w-full rounded-2xl border-0"
            @load="onIframeLoad"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
