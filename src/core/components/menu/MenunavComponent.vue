<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lucide Icons
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  Search,
  Sparkles,
  Flame,
  ChefHat,
  UtensilsCrossed,
  Soup,
  Coffee,
  IceCream,
  SlidersHorizontal,
} from '@/core/utils/icon'

gsap.registerPlugin(ScrollTrigger)

// Kategoriler Veri Yapısı
const categories = ref([
  { id: 'all', name: 'Tüm Menü', icon: UtensilsCrossed, count: 24, badge: null },
  { id: 'pideler', name: 'Taş Fırın Pideler', icon: Flame, count: 10, badge: 'Çok Satan' },
  { id: 'corbalar', name: 'Şifalı Çorbalar', icon: Soup, count: 4, badge: 'Organik' },
  { id: 'menuler', name: 'Set Paketler', icon: ChefHat, count: 5, badge: '%20 İndirim' },
  { id: 'tatlilar', name: 'Fırın Tatlıları', icon: IceCream, count: 3, badge: null },
  { id: 'icecekler', name: 'Doğal İçecekler', icon: Coffee, count: 6, badge: null },
])

const activeCategory = ref('all')
const cartItemCount = ref(3)
const cartTotal = ref('₺480')
const searchQuery = ref('')

const selectCategory = (id: string) => {
  activeCategory.value = id
  // Buraya tıklanan kategoriye yumuşak kaydırma (smooth scroll) eklenebilir
}

// GSAP Animasyonları
onMounted(() => {
  const tl = gsap.timeline()

  tl.from('.gsap-menu-topbar', {
    y: -30,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    clearProps: 'all',
  }).from(
    '.gsap-category-bar',
    {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      clearProps: 'all',
    },
    '-=0.3',
  )
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-black/5 font-inter"
  >
    <!-- üst TOOLBAR: Ana Sayfaya Dön | Logo | Rezervasyon & Sepet -->
    <div class="gsap-menu-topbar container mx-auto px-4 sm:px-6 lg:px-12 py-3.5">
      <div class="grid grid-cols-3 gap-4">
        <!-- Sol Taraf: Ana Sayfaya Dön Butonu -->
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-black/8 text-[#1F1D1D] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-xs group font-jakarta font-bold text-xs"
          >
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span class="hidden sm:inline">Ana Sayfaya Dön</span>
          </RouterLink>
        </div>

        <!-- Orta Taraf: Marka Logosu -->
        <RouterLink to="/" class="flex items-center gap-2.5 group">
          <div class="flex justify-center items-center flex-col">
            <img src="@/assets/contents/logo/logo.png" class="h-12" alt="" />
          </div>
        </RouterLink>

        <!-- Sağ Taraf: Rezervasyon Yap & Sepetim Butonları -->
        <div class="flex items-center gap-2.5 sm:gap-3">
          <!-- Rezervasyon Butonu -->
          <button
            class="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-second hover:bg-second/80 text-[#1F1D1D] font-jakarta font-bold text-xs transition-all duration-300 border border-primary/10 active:scale-95"
          >
            <Calendar class="w-4 h-4 text-primary" />
            <span>Masa Rezerve Et</span>
          </button>

          <!-- Sepetim Butonu -->
          <button
            class="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-jakarta font-bold text-xs transition-all duration-300 shadow-md shadow-primary/20 active:scale-95 group"
          >
            <div class="relative">
              <ShoppingBag class="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-second text-primary font-black text-[10px] flex items-center justify-center border-2 border-primary"
              >
                {{ cartItemCount }}
              </span>
            </div>
            <span class="hidden sm:inline">Sepetim</span>
            <span class="bg-white/20 px-2 py-0.5 rounded-lg text-[11px] font-extrabold ml-0.5">
              {{ cartTotal }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ALT BÖLÜM: YATAY KAYDIRILABİLİR KATEGORİ BAR (SCROLLBAR) & HIZLI ARAMA -->
    <div class="gsap-category-bar border-t border-black/5 bg-white/60 backdrop-blur-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-3 py-2.5">
        <!-- Arama Kutusu (Masaüstü & Mobil) -->
        <div class="relative shrink-0 w-36 sm:w-48 lg:w-56">
          <Search class="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Menüde ara..."
            class="w-full bg-[#FAF8F5] border border-black/8 rounded-xl pl-9 pr-3 py-2 text-xs text-[#1F1D1D] placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium"
          />
        </div>

        <div class="h-6 w-px bg-black/10 shrink-0"></div>

        <!-- Kaydırılabilir Kategori Listesi -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat.id)"
            :class="[
              'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-jakarta font-bold whitespace-nowrap transition-all duration-300 shrink-0 select-none cursor-pointer',
              activeCategory === cat.id
                ? 'bg-[#1F1D1D] text-white shadow-md shadow-black/10 scale-102'
                : 'bg-[#FAF8F5] text-[#665E58] hover:bg-second/60 hover:text-[#1F1D1D] border border-black/5',
            ]"
          >
            <component
              :is="cat.icon"
              :class="['w-3.5 h-3.5', activeCategory === cat.id ? 'text-second' : 'text-primary']"
            />
            <span>{{ cat.name }}</span>

            <!-- Rozet / Sayı Bilgisi -->
            <span
              v-if="cat.badge"
              :class="[
                'px-1.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-wide uppercase',
                activeCategory === cat.id ? 'bg-second text-primary' : 'bg-primary/10 text-primary',
              ]"
            >
              {{ cat.badge }}
            </span>
            <span
              v-else
              :class="[
                'text-[10px] opacity-60 font-semibold',
                activeCategory === cat.id ? 'text-white' : 'text-gray-400',
              ]"
            >
              ({{ cat.count }})
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Yatay Scrollbar Gizleme Utility */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
