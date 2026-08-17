<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCreative, Pagination, Navigation } from 'swiper/modules'

// Lucide Icons
import {
  Flame,
  UtensilsCrossed,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Award,
  Heart,
} from '@/core/utils/icon'

// Swiper Stilleri
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Swiper Modülleri
const modules = [Autoplay, EffectCreative, Pagination, Navigation]

// Menü ve Slide Verileri
const pideSlides = ref([
  {
    id: 1,
    title: 'Karadeniz pide',
    subtitle: 'Taş Fırından Taze',
    desc: 'Dinlendirilmiş dana kontrfile, erimiş özel Karadeniz kaşarı ve hakiki yayık tereyağının eşsiz uyumu.',
    price: '₺280',
    rating: '4.9',
    prepTime: '12-15 dk',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    badge: 'En Çok Satan',
  },
  {
    id: 2,
    title: 'Adana kebap',
    subtitle: 'Odun Ateşinde Lezzet',
    desc: 'Zırh kıyması, taze fırın baharatları ve fırından çıkmadan önce eklenen gezen tavuk yumurtası.',
    price: '₺240',
    rating: '4.8',
    prepTime: '10-12 dk',
    image: new URL('@/assets/contents/menu/adana-kebap.jpeg', import.meta.url).href,
    badge: 'Şefin Seçimi',
  },
  {
    id: 3,
    title: 'Etli konfor',
    subtitle: 'Yöresel Karadeniz Tarifi',
    desc: 'El açması özel hamur, uzayan kolot peyniri ve kenarlarına sürülen bol köy tereyağı.',
    price: '₺260',
    rating: '5.0',
    prepTime: '15 dk',

    image: new URL('@/assets/contents/menu/etlikonfor.jpeg', import.meta.url).href,
    badge: 'Gurme Özel',
  },
])

const activeIndex = ref(0)
const swiperInstance = ref(null)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex

  // Slide değiştiğinde metin alanına mikro GSAP efekti
  gsap.fromTo(
    '.gsap-slide-title',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
  )
}

// Sayfa Yüklendiğinde GSAP Entrance Animasyonları
onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })

  tl.from('.gsap-badge', { y: -20, opacity: 0 })
    .from('.gsap-heading', { y: 30, opacity: 0 }, '-=0.5')
    .from('.gsap-desc', { y: 20, opacity: 0 }, '-=0.6')
    .from('.gsap-cta', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.5')
    .from('.gsap-stats', { y: 20, opacity: 0 }, '-=0.4')
    .from('.gsap-slider-container', { scale: 0.92, opacity: 0, duration: 1 }, '-=0.8')
    .from('.gsap-floating-card', { y: 20, opacity: 0, stagger: 0.2 }, '-=0.4')
})
</script>

<template>
  <section
    class="relative min-h-[90vh] w-full bg-[#FAF8F5] overflow-hidden flex items-center py-12 lg:py-20 font-inter"
  >
    <div
      class="absolute top-0 right-0 w-1/2 h-full bg-second/40 rounded-l-[120px] pointer-events-none -z-0 hidden lg:block"
    ></div>
    <div
      class="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div class="lg:col-span-7 flex flex-col items-start space-y-6">
          <!-- Badge -->
          <div
            class="gsap-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-second border border-primary/20 text-primary font-jakarta font-semibold text-sm shadow-sm"
          >
            <Flame class="w-4 h-4 text-primary animate-pulse" />
            <span>Indirim ve fırsatları kaçırmayın</span>
          </div>

          <h1
            class="gsap-heading font-jakarta text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1D1D] leading-[1.1] tracking-tight"
          >
            Geleneksel Lezzet, <br />
            <span class="text-primary underline decoration-second decoration-4 underline-offset-8">
              Sıcak & Çıtır Pide
            </span>
            Keyfi.
          </h1>

          <p
            class="gsap-desc text-base sm:text-lg text-[#665E58] max-w-xl font-normal leading-relaxed"
          >
            Sağlık Pide Lokantası'nda ata mirası hamur tarifimizi 350°C odun ateşinde pişiriyor, en
            taze yerel malzemelerle sofranıza getiriyoruz.
          </p>

          <div
            class="gsap-slide-title w-full max-w-lg p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-black/5 shadow-sm flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3">
              <div class="p-2.5 rounded-xl bg-second text-primary">
                <UtensilsCrossed class="w-5 h-5" />
              </div>
              <div>
                <span class="text-xs font-semibold uppercase tracking-wider text-primary"
                  >Öne Çıkan Menü</span
                >
                <h4 class="font-jakarta font-bold text-gray-900 text-base">
                  {{ pideSlides[activeIndex].title }}
                </h4>
              </div>
            </div>
            <div class="text-right">
              <span class="font-jakarta font-extrabold text-xl text-primary block">
                {{ pideSlides[activeIndex].price }}
              </span>
              <span class="text-xs text-gray-500 flex items-center justify-end gap-1">
                <Clock class="w-3 h-3" /> {{ pideSlides[activeIndex].prepTime }}
              </span>
            </div>
          </div>

          <div class="gsap-cta flex flex-wrap items-center gap-4 pt-2">
            <router-link
              href="/restourant/menu"
              class="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-jakarta font-bold text-base transition-all duration-300 shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag class="w-5 h-5" />
              <span>Sipariş Ver</span>
            </router-link>

            <a
              href="tel:4442605"
              class="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-second hover:bg-primary/10 text-[#1F1D1D] hover:text-primary font-jakarta font-semibold text-base border border-primary/15 transition-all duration-300"
            >
              <span>Masa Rezerve Et</span>
            </a>
          </div>

          <div
            class="gsap-stats grid grid-cols-3 gap-6 pt-6 border-t border-black/10 w-full max-w-lg"
          >
            <div>
              <span class="font-jakarta font-extrabold text-2xl text-primary block">4.9 / 5</span>
              <span class="text-xs text-[#665E58] flex items-center gap-1 mt-0.5">
                <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 1.2k+ Yorum
              </span>
            </div>
            <div>
              <span class="font-jakarta font-extrabold text-2xl text-primary block">
                <Heart class="w-8 h-8 fill-primary" />
              </span>
              <span class="text-xs text-[#665E58] mt-0.5 block">Sağlıkla afyet olsun</span>
            </div>
            <div>
              <span class="font-jakarta font-extrabold text-2xl text-primary block">%100</span>
              <span class="text-xs text-[#665E58] mt-0.5 block">Doğal Malzeme</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 relative flex justify-center items-center">
          <div
            class="absolute w-[110%] h-[110%] bg-second/80 rounded-[40px] rotate-3 -z-10 scale-95 sm:scale-100"
          ></div>

          <div
            class="gsap-floating-card absolute -top-4 -left-4 sm:-left-6 z-30 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
            >
              <Award class="w-5 h-5" />
            </div>
            <div>
              <span class="font-jakarta font-bold text-xs text-gray-900 block">Usta Tescilli</span>
              <span class="text-[11px] text-gray-500">Ata Tarifi Hamur</span>
            </div>
          </div>

          <div
            class="gsap-floating-card absolute -bottom-4 -right-2 sm:-right-4 z-30 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3"
          >
            <div class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <span class="font-jakarta font-bold text-xs text-gray-800">Şu An Fırında Pişiyor</span>
          </div>

          <div
            class="gsap-slider-container w-full max-w-105 rounded-4xl overflow-hidden shadow-2xl border-4 border-white bg-white relative group"
          >
            <Swiper
              :modules="modules"
              :slides-per-view="1"
              :space-between="0"
              :loop="true"
              :speed="700"
              :autoplay="{ delay: 4000, disableOnInteraction: false }"
              :effect="'creative'"
              :creative-effect="{
                prev: { shadow: true, translate: ['-20%', 0, -1] },
                next: { translate: ['100%', 0, 0] },
              }"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
              class="w-full aspect-4/5"
            >
              <SwiperSlide v-for="item in pideSlides" :key="item.id">
                <div class="relative w-full h-full">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                  <!-- Görsel Üzerindeki Gradient Overlay -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  ></div>

                  <!-- Sol Üst Etiket -->
                  <div class="absolute top-4 left-4">
                    <span
                      class="px-3 py-1.5 rounded-lg bg-primary/90 text-white font-jakarta text-xs font-bold backdrop-blur-sm shadow-md inline-flex items-center gap-1"
                    >
                      <Sparkles class="w-3.5 h-3.5" />
                      {{ item.badge }}
                    </span>
                  </div>

                  <!-- Alt Görsel Başlığı -->
                  <div class="absolute bottom-6 left-6 right-6 text-white">
                    <span class="text-xs font-interitalic text-second/90 block mb-1">{{
                      item.subtitle
                    }}</span>
                    <h3 class="font-jakarta font-bold text-xl sm:text-2xl leading-snug">
                      {{ item.title }}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            <div
              class="absolute bottom-5 right-5 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                @click="swiperInstance?.slidePrev()"
                class="w-9 h-9 rounded-full bg-white/80 hover:bg-primary text-gray-800 hover:text-white backdrop-blur-sm flex items-center justify-center transition-colors shadow-md"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                @click="swiperInstance?.slideNext()"
                class="w-9 h-9 rounded-full bg-white/80 hover:bg-primary text-gray-800 hover:text-white backdrop-blur-sm flex items-center justify-center transition-colors shadow-md"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Swiper Custom Bullet Rengi */
:deep(.swiper-pagination-bullet-active) {
  background-color: var(--color-primary, #c62828) !important;
  width: 20px;
  border-radius: 6px;
}
</style>
