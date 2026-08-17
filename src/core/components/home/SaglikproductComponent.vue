<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper/types'

import { Autoplay, EffectCreative, Pagination, Navigation } from 'swiper/modules'
// Lucide Icons
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Users,
  CheckCircle2,
  Tag,
  BadgePercent,
  ChefHat,
} from '@/core/utils/icon'

// Swiper Stilleri
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

gsap.registerPlugin(ScrollTrigger)

const modules = [Autoplay, EffectCreative, Pagination, Navigation]

// Özel Set Menüler Veri Yapısı
const specialMenus = ref([
  {
    id: 1,
    title: 'Ustanın İmzası Menü',
    subtitle: 'Tek kişilik tam doyurucu fırın ziyafeti',
    badge: 'Çok Satan',
    personCount: '1 Kişilik',
    oldPrice: '₺410',
    price: '₺340',
    discount: '%17 İndirim',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    contents: [
      '1 Adet Özel Kuşbaşılı Kaşarlı Pide',
      '1 Kase Fırın İlikli Kemik Suyu Çorbası',
      '1 Adet Çömlek Ev Ayranı',
      '1 Adet Fırın Sütlaç',
    ],
  },
  {
    id: 2,
    title: 'Ata Mirası Aile Menüsü',
    subtitle: 'Kalabalık sofralar için geleneksel pide şöleni',
    badge: 'Aile Boyu',
    personCount: '3-4 Kişilik',
    oldPrice: '₺1.150',
    price: '₺920',
    discount: '%20 İndirim',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    contents: [
      '2 Adet Karadeniz Yağlısı',
      '2 Adet Karışık Taş Fırın Pide',
      '1 Porsiyon Tereyağlı Trabzon Humusu',
      '1 Litre Ev Yapımı Yayık Ayranı',
      '2 Adet Fırın Sütlaç',
    ],
  },
  {
    id: 3,
    title: 'Gurme Karadeniz Menüsü',
    subtitle: 'Doğal tereyağı ve özel peynirlerin buluşması',
    badge: 'Özel Tarif',
    personCount: '2 Kişilik',
    oldPrice: '₺680',
    price: '₺560',
    discount: '%18 İndirim',
    image:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    contents: [
      '1 Adet Trabzon Yağlısı (Kolot Peynirli)',
      '1 Adet Kıymalı Yumurtalı Bafra Pidesi',
      '1 Porsiyon Rize Turşu Kavurması',
      '2 Adet Çömlek Ayran',
    ],
  },
  {
    id: 4,
    title: 'Fit & Taş Fırın Menü',
    subtitle: 'Hafif, tam buğdaylı ve yüksek proteinli',
    badge: 'Sağlıklı Seçim',
    personCount: '1 Kişilik',
    oldPrice: '₺360',
    price: '₺295',
    discount: '%18 İndirim',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    contents: [
      '1 Adet Tam Buğday Otlu Çökelekli Pide',
      '1 Porsiyon Nar Ekşili Bahçe Salatası',
      '1 Adet Probiyotik Ev Ayranı',
    ],
  },
])

const swiperRef = ref<SwiperInstance | null>(null)

const onSwiper = (swiper: SwiperInstance) => {
  swiperRef.value = swiper
}

// GSAP Giriş Animasyonu (Çoklu Opasite ve Kaybolma Sorunu Çözüldü)
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.special-packages-section',
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
    clearProps: 'all', // Animasyon bittiğinde geçici inline opasite stillerini temizler
  }).from(
    '.gsap-menu-swiper',
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
  <section class="special-packages-section relative py-20 bg-[#FAF8F5] overflow-hidden font-inter">
    <!-- Arka Plan Dekoratif Işıklar ve Şekiller -->
    <div
      class="absolute top-0 right-1/4 w-96 h-96 bg-second/50 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-10 w-80 h-80 bg-primary/5 rounded-full blur-2xl pointer-events-none"
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
              <BadgePercent class="w-4 h-4 text-primary" />
              <span>Avantajlı Set Menüler</span>
            </div>
          </div>

          <!-- Main Title -->
          <h2
            class="gsap-header-item font-jakarta text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1D1D] tracking-tight leading-tight"
          >
            Geleneksel Sofralara <br />
            <span class="text-primary underline decoration-second decoration-4 underline-offset-6"
              >Özel Menülerimiz</span
            >
          </h2>

          <!-- Subtitle -->
          <p
            class="gsap-header-item text-sm sm:text-base text-[#665E58] font-normal leading-relaxed"
          >
            Taş fırından taze çıkan pidelerimizi, şifalı çorbalarımız ve ev yapımı ayranlarımızla
            dilediğiniz kişi sayısına özel indirimli paketlerle buluşturduk.
          </p>
        </div>

        <!-- Right Side: Navigation Controls -->
        <div class="gsap-header-item flex items-center gap-3 self-start md:self-end">
          <button
            @click="swiperRef?.slidePrev()"
            class="w-12 h-12 rounded-2xl bg-white border border-black/10 text-[#1F1D1D] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center shadow-sm group"
            aria-label="Önceki Menü"
          >
            <ChevronLeft class="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            @click="swiperRef?.slideNext()"
            class="w-12 h-12 rounded-2xl bg-white border border-black/10 text-[#1F1D1D] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center shadow-sm group"
            aria-label="Sonraki Menü"
          >
            <ChevronRight class="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <!-- CREATIVE SWIPER CAROUSEL -->
      <div class="gsap-menu-swiper">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="28"
          :loop="true"
          :speed="800"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :effect="'creative'"
          :creative-effect="{
            prev: {
              shadow: true,
              translate: ['-100%', 0, -200],
              rotate: [0, 0, -4],
            },
            next: {
              shadow: true,
              translate: ['100%', 0, -200],
              rotate: [0, 0, 4],
            },
          }"
          :breakpoints="{
            '768': { slidesPerView: 2, spaceBetween: 24 },
            '1280': { slidesPerView: 3, spaceBetween: 32 },
          }"
          @swiper="onSwiper"
          class="pb-12! pt-2! w-full"
        >
          <SwiperSlide v-for="menu in specialMenus" :key="menu.id">
            <!-- Paket Menü Kartı -->
            <div
              class="h-full bg-white rounded-[32px] border border-black/5 shadow-xl shadow-black/5 overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-all duration-500"
            >
              <!-- Kart Üst Görsel Alanı -->
              <div class="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                <img
                  :src="menu.image"
                  :alt="menu.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                ></div>

                <!-- Sol Üst: İndirim & Etiket Rozetleri -->
                <div class="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    class="px-3 py-1.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs shadow-md flex items-center gap-1"
                  >
                    <Tag class="w-3.5 h-3.5" />
                    {{ menu.discount }}
                  </span>
                  <span
                    class="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[#1F1D1D] font-jakarta font-bold text-xs shadow-md"
                  >
                    {{ menu.badge }}
                  </span>
                </div>

                <!-- Sağ Üst: Kişi Sayısı Rozeti -->
                <div class="absolute top-4 right-4">
                  <span
                    class="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md text-white font-inter text-xs font-semibold flex items-center gap-1.5 border border-white/10"
                  >
                    <Users class="w-3.5 h-3.5 text-second" />
                    {{ menu.personCount }}
                  </span>
                </div>

                <!-- Görsel Üzeri Başlık Metni -->
                <div class="absolute bottom-4 left-5 right-5 text-white">
                  <h3
                    class="font-jakarta font-extrabold text-2xl group-hover:text-second transition-colors leading-snug"
                  >
                    {{ menu.title }}
                  </h3>
                  <p class="text-xs text-white/80 font-inter mt-0.5 line-clamp-1">
                    {{ menu.subtitle }}
                  </p>
                </div>
              </div>

              <!-- Kart Gövdesi: Menü İçeriği Kutusu -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-6">
                <!-- İçerik Listesi Kutusu -->
                <div class="bg-[#FAF8F5] rounded-2xl p-4 border border-black/5 space-y-3">
                  <div
                    class="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider font-jakarta"
                  >
                    <ChefHat class="w-4 h-4 text-primary" />
                    <span>Menü İçeriği</span>
                  </div>

                  <ul class="space-y-2">
                    <li
                      v-for="(item, idx) in menu.contents"
                      :key="idx"
                      class="flex items-start gap-2.5 text-xs sm:text-sm text-[#1F1D1D] font-medium"
                    >
                      <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span class="line-clamp-1">{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Kart Altı: Fiyat & Sipariş Butonu -->
                <div class="pt-2 flex items-center justify-between border-t border-black/5">
                  <div>
                    <span class="text-xs text-gray-400 line-through block font-semibold">
                      {{ menu.oldPrice }}
                    </span>
                    <span class="font-jakarta font-extrabold text-2xl text-primary">
                      {{ menu.price }}
                    </span>
                  </div>

                  <button
                    class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-second hover:bg-primary text-[#1F1D1D] hover:text-white font-jakarta font-bold text-xs transition-all duration-300 shadow-xs active:scale-95"
                  >
                    <ShoppingBag class="w-4 h-4" />
                    <span>Sipariş Et</span>
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
