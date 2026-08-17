<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper/types'

import { Autoplay, EffectCreative, Pagination, Navigation } from 'swiper/modules'

// Lucide Icons
import {
  Leaf,
  Star,
  Flame,
  ChevronLeft,
  ChevronRight,
  Plus,
  Heart,
  ShieldCheck,
} from '@/core/utils/icon'

// Swiper Stilleri
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

gsap.registerPlugin(ScrollTrigger)

const modules = [Autoplay, EffectCreative, Pagination, Navigation]

// Sağlığa / Markaya Özel Seçilmiş Ürünler
const specialMenu = ref([
  {
    id: 1,
    title: 'Lahmacun menü',
    category: 'Fit & Taş Fırın',
    desc: 'Atalık siyez unlu tam buğday hamuru, Ege otları, hafif çökelek ve sızma zeytinyağı ile.',
    price: '₺210',
    calories: '380 kcal',
    rating: '4.9',
    prepTime: '12 dk',
    badge: 'Düşük Kalori',
    image: new URL('@/assets/contents/menu/lahmacun.jpeg', import.meta.url).href,
    tags: ['Tam Buğday', 'Sızma Zeytinyağı', 'Sindirimi Kolay'],
  },
  {
    id: 2,
    title: 'Lahmacun menü',
    category: 'Doğal İksir',
    desc: '18 saat odun ateşinde ağır ağır kaynatılmış dana ilikli kemik suyu, sarımsaklı ve limonlu sos ile.',
    price: '₺130',
    calories: '190 kcal',
    rating: '5.0',
    prepTime: '5 dk',
    badge: '%100 Kolajen',
    image: new URL('@/assets/contents/menu/kusbasikasarli.jpeg', import.meta.url).href,
    tags: ['İlikli Kemik', 'Katkısız', 'Bağışıklık Dostu'],
  },
  {
    id: 3,
    title: 'Çocuk menü',
    category: 'Özel Beslenme',
    desc: 'Glutensiz özel un karışımı, köz patlıcan, kapya biber, zeytin ve taze kekik dokunuşu.',
    price: '₺230',
    calories: '320 kcal',
    rating: '4.8',
    prepTime: '15 dk',
    badge: 'Glutensiz Dostu',
    image: new URL('@/assets/contents/menu/alinazik.jpeg', import.meta.url).href,
    tags: ['Glutensiz Un', 'Veggie', 'Taş Fırın'],
  },
  {
    id: 4,
    title: 'Lahmacun menü',
    category: 'Yan Lezzet',
    desc: 'Çömlekte mayalanmış doğal yayık ayranı, yanında nane, roka ve nar ekşili organik bahçe salatası.',
    price: '₺95',
    calories: '140 kcal',
    rating: '4.9',
    prepTime: '5 dk',
    badge: 'Probiyotik',
    image: new URL('@/assets/contents/menu/adana-kebap.jpeg', import.meta.url).href,
    tags: ['Probiyotik', 'Ev Yapımı', 'Taze Organik'],
  },
])

const swiperRef = ref<SwiperInstance | null>(null)

const onSwiper = (swiper: SwiperInstance) => {
  swiperRef.value = swiper
}

// GSAP Entrance Animasyonu Düzeltildi
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.menu-section',
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
    '.gsap-swiper-wrapper',
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
  <section class="menu-section relative py-20 bg-[#FAF8F5] overflow-hidden font-inter">
    <!-- Arka Plan Süsleme Halka ve Işıklar -->
    <div
      class="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute top-1/2 -left-24 w-72 h-72 bg-second rounded-full blur-2xl pointer-events-none"
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
              <Leaf class="w-3.5 h-3.5 text-emerald-600" />
              <span>Doğal, Katkısız & Hafif</span>
            </div>
          </div>

          <!-- Main Title -->
          <h2
            class="gsap-header-item font-jakarta text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1D1D] tracking-tight leading-tight"
          >
            Sağlığa Özel
            <span class="text-primary underline decoration-second underline-offset-4"
              >Ürünlerimiz</span
            >
          </h2>

          <!-- Description -->
          <p
            class="gsap-header-item text-sm sm:text-base text-[#665E58] font-normal leading-relaxed"
          >
            Geleneksel lezzetten ödün vermeden hazırlanan; sindirimi kolay, tam buğday unlu ve %100
            doğal içerikli taş fırın menümüzle formunuzu koruyun.
          </p>
        </div>

        <div class="gsap-header-item flex items-center gap-3 self-start md:self-end">
          <button
            @click="swiperRef?.slidePrev()"
            class="w-12 h-12 rounded-2xl bg-white border border-black/10 text-[#1F1D1D] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center shadow-sm group"
            aria-label="Önceki Ürün"
          >
            <ChevronLeft class="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            @click="swiperRef?.slideNext()"
            class="w-12 h-12 rounded-2xl bg-white border border-black/10 text-[#1F1D1D] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center shadow-sm group"
            aria-label="Sonraki Ürün"
          >
            <ChevronRight class="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <!-- CREATIVE SWIPER CAROUSEL -->
      <div class="gsap-swiper-wrapper relative">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="24"
          :loop="true"
          :speed="800"
          :autoplay="{ delay: 4500, disableOnInteraction: false }"
          :effect="'creative'"
          :creative-effect="{
            prev: {
              shadow: true,
              translate: ['-120%', 0, -300],
              rotate: [0, 0, -8],
            },
            next: {
              shadow: true,
              translate: ['120%', 0, -300],
              rotate: [0, 0, 8],
            },
          }"
          :breakpoints="{
            '768': { slidesPerView: 2, spaceBetween: 24 },
            '1024': { slidesPerView: 3, spaceBetween: 32 },
          }"
          @swiper="onSwiper"
          class="pb-14! pt-2! w-full lg:w-screen lg:max-w-none"
        >
          <SwiperSlide v-for="item in specialMenu" :key="item.id">
            <div
              class="h-full bg-white rounded-[28px] border border-black/5 shadow-lg shadow-black/5 overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-primary/20 transition-all duration-500"
            >
              <!-- Card Top Visual -->
              <div class="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
                ></div>

                <!-- Badge Top Left -->
                <div class="absolute top-4 left-4">
                  <span
                    class="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-primary font-jakarta font-bold text-xs shadow-md inline-flex items-center gap-1.2"
                  >
                    <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
                    {{ item.badge }}
                  </span>
                </div>

                <button
                  class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/30 backdrop-blur-md text-white hover:text-primary hover:bg-white transition-all flex items-center justify-center"
                >
                  <Heart class="w-4 h-4" />
                </button>

                <!-- Bottom Image Info Overlay -->
                <div
                  class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs"
                >
                  <span
                    class="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg"
                  >
                    <Flame class="w-3.5 h-3.5 text-amber-400" />
                    {{ item.calories }}
                  </span>
                  <span
                    class="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg font-bold"
                  >
                    <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {{ item.rating }}
                  </span>
                </div>
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span
                    class="text-[11px] font-bold uppercase tracking-wider text-primary/80 font-jakarta block mb-1"
                  >
                    {{ item.category }}
                  </span>
                  <h3
                    class="font-jakarta font-bold text-xl text-[#1F1D1D] group-hover:text-primary transition-colors line-clamp-1"
                  >
                    {{ item.title }}
                  </h3>
                  <p class="text-xs text-[#665E58] mt-2 line-clamp-2 leading-relaxed">
                    {{ item.desc }}
                  </p>
                </div>

                <!-- Health Tags -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="px-2.5 py-1 rounded-lg bg-second/60 text-[#1F1D1D] text-[10px] font-semibold border border-primary/5"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div class="pt-4 border-t border-black/5 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] text-gray-400 block font-semibold"
                      >Porsiyon Fiyatı</span
                    >
                    <span class="font-jakarta font-extrabold text-2xl text-primary">
                      {{ item.price }}
                    </span>
                  </div>

                  <button
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-second hover:bg-primary text-[#1F1D1D] hover:text-white font-jakarta font-bold text-xs transition-all duration-300 shadow-xs active:scale-95"
                  >
                    <Plus class="w-4 h-4" />
                    <span>Ekle</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.swiper-slide) {
  height: auto;
}
</style>
