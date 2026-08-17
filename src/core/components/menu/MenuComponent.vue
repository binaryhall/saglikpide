<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Lucide Icons
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  Search,
  Flame,
  ChefHat,
  UtensilsCrossed,
  Soup,
  Coffee,
  IceCream,
  Plus,
  Minus,
  Star,
  Heart,
  Eye,
  X,
  Check,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
} from '@/core/utils/icon'

gsap.registerPlugin(ScrollTrigger)

// --- KATEGORİLER VERİSİ ---
const categories = ref([
  { id: 'all', name: 'Tüm Menü', icon: UtensilsCrossed, count: 12, badge: null },
  { id: 'pideler', name: 'Pideler', icon: Flame, count: 4, badge: 'Çok Satan' },
  { id: 'corbalar', name: 'Çorbalar', icon: Soup, count: 2, badge: 'Organik' },
  { id: 'menuler', name: 'Set Paketler', icon: ChefHat, count: 2, badge: '%20 İndirim' },
  { id: 'tatlilar', name: 'Fırın Tatlıları', icon: IceCream, count: 2, badge: null },
  { id: 'icecekler', name: 'İçecekler', icon: Coffee, count: 2, badge: null },
])

// --- ÜRÜNLER VERİSİ ---
const products = ref([
  {
    id: 101,
    categoryId: 'pideler',
    title: 'Kuşbaşılı Kaşarlı',
    desc: 'Odun ateşinde pişmiş ince hamur, taze dana kuşbaşı, erimiş özel kaşar ve tereyağı dokunuşu.',
    price: 240,
    rating: '4.9',
    calories: '520 kcal',
    prepTime: '12 dk',
    badge: 'Çok Satan',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Geleneksel', 'Odun Ateşi'],
    isFavorite: false,
  },
  {
    id: 102,
    categoryId: 'pideler',
    title: 'Tam Buğday Otlu Çökelekli',
    desc: 'Atalık siyez unlu tam buğday hamuru, Ege otları, hafif çökelek ve sızma zeytinyağı ile.',
    price: 210,
    rating: '4.8',
    calories: '380 kcal',
    prepTime: '10 dk',
    badge: 'Düşük Kalori',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Fit', 'Sindirimi Kolay'],
    isFavorite: true,
  },
  {
    id: 103,
    categoryId: 'pideler',
    title: 'Trabzon Yağlısı & Yumurtalı',
    desc: 'Özel Karadeniz peynir harcı, ortasında taze köy yumurtası ve bol Trabzon tereyağı.',
    price: 260,
    rating: '5.0',
    calories: '640 kcal',
    prepTime: '15 dk',
    badge: 'Gurme',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Tereyağlı', 'Yöresel'],
    isFavorite: false,
  },
  {
    id: 104,
    categoryId: 'pideler',
    title: 'Glutensiz Sebzeli Taş Pide',
    desc: 'Glutensiz özel un karışımı, köz patlıcan, kapya biber, zeytin ve taze kekik dokunuşu.',
    price: 230,
    rating: '4.7',
    calories: '320 kcal',
    prepTime: '12 dk',
    badge: 'Glutensiz',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Glutensiz', 'Veggie'],
    isFavorite: false,
  },
  {
    id: 201,
    categoryId: 'corbalar',
    title: 'Şifalı İlikli Kemik Suyu',
    desc: '18 saat odun ateşinde ağır ağır kaynatılmış dana ilikli kemik suyu, sarımsak ve limon ile.',
    price: 130,
    rating: '5.0',
    calories: '190 kcal',
    prepTime: '5 dk',
    badge: '%100 Kolajen',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Bağışıklık Dostu', 'Katkısız'],
    isFavorite: true,
  },
  {
    id: 202,
    categoryId: 'corbalar',
    title: 'Geleneksel Fırın Ezogelin',
    desc: 'Kırmızı mercimek, fırınlanmış biber salçası, nane ve taş fırın kruton ekmeği eşliğinde.',
    price: 95,
    rating: '4.8',
    calories: '210 kcal',
    prepTime: '5 dk',
    badge: null,
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Nefis', 'Klasik'],
    isFavorite: false,
  },
  {
    id: 301,
    categoryId: 'menuler',
    title: 'Ailename Gurme Pide Seti',
    desc: '2 Adet Karışık Pide, 1 İlikli Kemik Suyu, 2 Ev Ayranı ve Fırın Sütlaç İkramı.',
    price: 580,
    rating: '4.9',
    calories: '1100 kcal',
    prepTime: '20 dk',
    badge: 'Avantajlı',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['3-4 Kişilik', 'Ekonomik'],
    isFavorite: false,
  },
  {
    id: 302,
    categoryId: 'menuler',
    title: 'Fit & Sağlıklı Öğle Menüsü',
    desc: 'Tam Buğday Otlu Pide, Probiyotik Yayık Ayranı ve Yeşil Organik Bahçe Salatası.',
    price: 290,
    rating: '4.8',
    calories: '490 kcal',
    prepTime: '10 dk',
    badge: '%15 İndirim',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Öğle Menüsü', 'Hafif'],
    isFavorite: false,
  },
  {
    id: 401,
    categoryId: 'tatlilar',
    title: 'Fırınlanmış Karadeniz Sütlacı',
    desc: 'Gündelik manda sütü, fındık parçaları ve taş fırında üzeri kızarmış geleneksel lezzet.',
    price: 110,
    rating: '4.9',
    calories: '280 kcal',
    prepTime: '5 dk',
    badge: 'Katkısız',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Manda Sütü', 'Tatlı'],
    isFavorite: true,
  },
  {
    id: 402,
    categoryId: 'tatlilar',
    title: 'Çıtır Fırın Katmeri & Dondurma',
    desc: 'Gaziantep boz fıstığı, bol katmer kaymağı ve yanında kesme keçi sütü dondurması.',
    price: 180,
    rating: '5.0',
    calories: '450 kcal',
    prepTime: '8 dk',
    badge: 'Sıcak Servis',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Antep Fıstıklı', 'Çıtır'],
    isFavorite: false,
  },
  {
    id: 501,
    categoryId: 'icecekler',
    title: 'Çömlekte Probiyotik Ev Ayranı',
    desc: 'Toros yayla yoğurdundan çalkalanmış, üzeri bol köpüklü taze soğuk yayık ayranı.',
    price: 45,
    rating: '4.9',
    calories: '90 kcal',
    prepTime: '2 dk',
    badge: 'Soğuk',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['Ev Yapımı', 'Köpüklü'],
    isFavorite: false,
  },
  {
    id: 502,
    categoryId: 'icecekler',
    title: 'Organik Sıkma Nar & Portakal',
    desc: 'Anında taze sıkılmış katkısız narenciye karışımı, C vitamini deposu iksir.',
    price: 75,
    rating: '4.8',
    calories: '120 kcal',
    prepTime: '3 dk',
    badge: 'Taze Sıkma',
    image: new URL('@/assets/contents/menu/karadenizpide.jpeg', import.meta.url).href,
    tags: ['%100 Taze', 'C Vitamini'],
    isFavorite: false,
  },
])

// --- REAKTİF DURUMLAR (STATE) ---
const activeCategory = ref('all')
const searchQuery = ref('')
const selectedProduct = ref<any | null>(null)
const cart = ref<{ product: any; quantity: number }[]>([])
const addedAnimationId = ref<number | null>(null)

// --- HESAPLANAN VERİLER (COMPUTED) ---
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesCategory = activeCategory.value === 'all' || p.categoryId === activeCategory.value
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const cartTotal = computed(() =>
  cart.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
)
const cartItemCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

// --- METOTLAR ---
const selectCategory = (id: string) => {
  activeCategory.value = id
}

const toggleFavorite = (product: any) => {
  product.isFavorite = !product.isFavorite
}

const addToCart = (product: any, qty = 1) => {
  if (!product) return
  const existing = cart.value.find((item) => item.product.id === product.id)
  if (existing) {
    existing.quantity += qty
  } else {
    cart.value.push({ product, quantity: qty })
  }

  // Anlık Sepete Eklendi İkon Efekti
  addedAnimationId.value = product.id
  setTimeout(() => {
    addedAnimationId.value = null
  }, 1200)
}

const openDetailModal = (product: any) => {
  selectedProduct.value = product
}

const closeDetailModal = () => {
  selectedProduct.value = null
}

const addToCartAndClose = (product: any) => {
  addToCart(product)
  closeDetailModal()
}

const clearFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'all'
}

// Kategori ve arama değişimlerinde kartların GSAP animasyonu
const animateCards = () => {
  nextTick(() => {
    gsap.fromTo(
      '.product-card',
      { y: 25, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'all',
      },
    )
  })
}

watch([activeCategory, searchQuery], () => {
  animateCards()
})

onMounted(() => {
  animateCards()
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F5] text-[#1F1D1D] font-inter pb-24">
    <!-- STICKY HEADER & CATEGORY NAVIGATION BAR -->
    <header
      class="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-black/5"
    >
      <!-- ÜST TOOLBAR -->
      <div class="gsap-menu-topbar container mx-auto px-4 sm:px-6 lg:px-12 py-3">
        <div class="flex items-center justify-between gap-3">
          <!-- Sol: Ana Sayfaya Dön -->
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-black/8 text-[#1F1D1D] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-2xs group font-jakarta font-bold text-xs shrink-0"
          >
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span class="hidden sm:inline">Ana Sayfaya Dön</span>
          </RouterLink>

          <!-- Orta: Logo -->
          <RouterLink to="/" class="flex items-center gap-2 group shrink-0">
            <div class="flex justify-center items-center flex-col">
              <img
                src="@/assets/contents/logo/logo.png"
                class="h-9 sm:h-11 object-contain"
                alt="Asır Logo"
              />
            </div>
          </RouterLink>

          <!-- Sağ: Masa Rezerve & Sepetim -->
          <div class="flex items-center gap-2">
            <button
              class="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-second hover:bg-second/80 text-[#1F1D1D] font-jakarta font-bold text-xs transition-all duration-300 border border-primary/10 active:scale-95"
            >
              <Calendar class="w-3.5 h-3.5 text-primary" />
              <span>Rezerve Et</span>
            </button>

            <!-- Sepetim Butonu -->
            <button
              class="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-jakarta font-bold text-xs transition-all duration-300 shadow-md shadow-primary/20 active:scale-95 group"
            >
              <div class="relative">
                <ShoppingBag class="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span
                  v-if="cartItemCount > 0"
                  class="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-second text-primary font-black text-[10px] flex items-center justify-center border-2 border-primary animate-pulse"
                >
                  {{ cartItemCount }}
                </span>
              </div>
              <span class="hidden sm:inline">Sepetim</span>
              <span class="bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-extrabold ml-0.5">
                ₺{{ cartTotal }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- ALT BÖLÜM: YATAY KAYDIRILABİLİR KATEGORİ BAR & ARAMA -->
      <div class="gsap-category-bar border-t border-black/5 bg-white/70 backdrop-blur-md">
        <div class="container mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-2.5 py-2">
          <!-- Arama Kutusu -->
          <div class="relative shrink-0 w-32 sm:w-48 lg:w-56">
            <Search class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Menüde ara..."
              class="w-full bg-[#FAF8F5] border border-black/8 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#1F1D1D] placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-all font-medium"
            />
          </div>

          <div class="h-5 w-px bg-black/10 shrink-0"></div>

          <!-- Kategori Listesi -->
          <div
            class="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 w-full"
          >
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="selectCategory(cat.id)"
              :class="[
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jakarta font-bold whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer select-none',
                activeCategory === cat.id
                  ? 'bg-[#1F1D1D] text-white shadow-sm scale-102'
                  : 'bg-[#FAF8F5] text-[#665E58] hover:bg-second/60 hover:text-[#1F1D1D] border border-black/5',
              ]"
            >
              <component
                :is="cat.icon"
                :class="['w-3.5 h-3.5', activeCategory === cat.id ? 'text-second' : 'text-primary']"
              />
              <span>{{ cat.name }}</span>

              <span
                v-if="cat.badge"
                :class="[
                  'px-1.5 py-0.2 rounded text-[8px] font-extrabold tracking-wide uppercase',
                  activeCategory === cat.id
                    ? 'bg-second text-primary'
                    : 'bg-primary/10 text-primary',
                ]"
              >
                {{ cat.badge }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ANA İÇERİK: ÜRÜN LİSTESİ GRID -->
    <main class="container mx-auto px-3 sm:px-6 lg:px-12 pt-6">
      <!-- Aktif Kategori Başlığı ve Sayıcı -->
      <div class="flex items-center justify-between mb-5 px-1">
        <div>
          <h1 class="font-jakarta font-extrabold text-xl sm:text-2xl text-[#1F1D1D] tracking-tight">
            {{ categories.find((c) => c.id === activeCategory)?.name || 'Tüm Ürünler' }}
          </h1>
          <p class="text-xs text-[#665E58] mt-0.5 font-medium">
            Toplam {{ filteredProducts.length }} lezzet listeleniyor
          </p>
        </div>

        <div
          class="flex items-center gap-1.5 text-xs text-primary font-jakarta font-bold bg-second/50 px-3 py-1.5 rounded-full border border-primary/10"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>Odun Ateşinde Taze</span>
        </div>
      </div>

      <!-- Sonuç Bulunamadı Durumu -->
      <div
        v-if="filteredProducts.length === 0"
        class="bg-white rounded-3xl border border-black/5 p-12 text-center space-y-3 my-8"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-second text-primary flex items-center justify-center mx-auto"
        >
          <Search class="w-6 h-6" />
        </div>
        <h3 class="font-jakarta font-bold text-lg text-[#1F1D1D]">Aradığınız ürün bulunamadı</h3>
        <p class="text-xs text-[#665E58] max-w-sm mx-auto">
          Lütfen farklı bir arama terimi deneyin veya kategoriler arasında geçiş yapın.
        </p>
        <button
          @click="clearFilters"
          class="px-4 py-2 rounded-xl bg-primary text-white text-xs font-jakarta font-bold hover:bg-primary/90 transition-all"
        >
          Filtreleri Temizle
        </button>
      </div>

      <!-- Mobil: grid-cols-2 | Tablet: md:grid-cols-3 | Masaüstü: lg:grid-cols-4 -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
        <!-- SİMETRİK VE STABİL ÜRÜN KARTLARI -->
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card group bg-white rounded-2xl sm:rounded-[24px] border border-black/5 shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
        >
          <!-- Üst Görsel Alanı (Sabit En/Boy Oranı: Aspect 4/3) -->
          <div class="relative aspect-4/3 w-full bg-gray-100 overflow-hidden shrink-0">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
            ></div>

            <!-- Sol Üst: Rozet / Badge -->
            <div v-if="product.badge" class="absolute top-2 left-2 z-10">
              <span
                class="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-primary font-jakarta font-black text-[9px] sm:text-[10px] shadow-2xs inline-flex items-center gap-1"
              >
                <ShieldCheck class="w-3 h-3 text-emerald-600 hidden sm:inline" />
                {{ product.badge }}
              </span>
            </div>

            <!-- Sağ Üst: Favori Butonu -->
            <button
              @click.stop="toggleFavorite(product)"
              class="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black/30 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all flex items-center justify-center z-10"
              aria-label="Favorilere Ekle"
            >
              <Heart
                :class="[
                  'w-3.5 h-3.5 sm:w-4 sm:h-4',
                  product.isFavorite ? 'fill-red-500 text-red-500' : '',
                ]"
              />
            </button>

            <!-- Görsel Altı Kalori & Puan Bilgisi -->
            <div
              class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-medium z-10"
            >
              <span
                class="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <Flame class="w-3 h-3 text-amber-400" />
                {{ product.calories }}
              </span>
              <span
                class="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-0.5 font-bold"
              >
                <Star class="w-3 h-3 fill-amber-400 text-amber-400" />
                {{ product.rating }}
              </span>
            </div>
          </div>

          <!-- Kart İçerik Alanı (Flex-1 & Equal Height) -->
          <div class="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <!-- Başlık -->
              <h3
                @click="openDetailModal(product)"
                class="font-jakarta font-bold text-xs sm:text-base text-[#1F1D1D] group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
              >
                {{ product.title }}
              </h3>

              <!-- Açıklama (Mobil: 1 Satır | Masaüstü: 2 Satır) -->
              <p
                class="text-[11px] sm:text-xs text-[#665E58] mt-1 line-clamp-1 sm:line-clamp-2 leading-relaxed"
              >
                {{ product.desc }}
              </p>
            </div>

            <!-- Etiketler (Sadece Masaüstünde veya Uygun Alanda) -->
            <div class="hidden sm:flex flex-wrap gap-1 pt-0.5">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="px-2 py-0.5 rounded-md bg-second/60 text-[#1F1D1D] text-[9px] font-bold border border-primary/5"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Fiyat & Aksiyon Butonları (Sabit Alt Kısım) -->
            <div
              class="pt-2 border-t border-black/5 flex items-center justify-between gap-1 mt-auto"
            >
              <!-- Fiyat -->
              <div class="flex flex-col">
                <span class="text-[9px] text-gray-400 font-semibold leading-none hidden sm:block"
                  >Porsiyon</span
                >
                <span
                  class="font-jakarta font-extrabold text-sm sm:text-lg text-primary leading-tight"
                >
                  ₺{{ product.price }}
                </span>
              </div>

              <!-- Butonlar: Detay ve Sepete Ekle -->
              <div class="flex items-center gap-1">
                <!-- Detay Butonu (Göz İkonu) -->
                <button
                  @click="openDetailModal(product)"
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF8F5] hover:bg-black/5 text-[#1F1D1D] flex items-center justify-center transition-all border border-black/5"
                  title="Ürün Detayları"
                >
                  <Eye class="w-3.5 h-3.5" />
                </button>

                <!-- Sepete Ekle Butonu -->
                <button
                  @click="addToCart(product)"
                  :class="[
                    'px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-jakarta font-bold text-xs inline-flex items-center gap-1 transition-all duration-300 shadow-2xs active:scale-95',
                    addedAnimationId === product.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary hover:bg-primary/90 text-white',
                  ]"
                >
                  <Check
                    v-if="addedAnimationId === product.id"
                    class="w-3.5 h-3.5 animate-bounce"
                  />
                  <Plus v-else class="w-3.5 h-3.5" />
                  <span class="hidden sm:inline">Ekle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- CREATIVE ÜRÜN DETAY MODAL / DRAWER -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="selectedProduct"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeDetailModal"
      >
        <div
          class="bg-white w-full max-w-lg rounded-[28px] border border-black/10 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        >
          <!-- Kapat Butonu -->
          <button
            @click="closeDetailModal"
            class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Modal Görseli -->
          <div class="relative aspect-16/9 w-full bg-gray-100 overflow-hidden shrink-0">
            <img
              :src="selectedProduct.image"
              :alt="selectedProduct.title"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            ></div>
            <div
              class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold"
            >
              <span class="bg-primary/90 backdrop-blur-md px-2.5 py-1 rounded-lg">
                {{ selectedProduct.badge || 'Geleneksel Taş Fırın' }}
              </span>
              <span
                class="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg"
              >
                <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {{ selectedProduct.rating }} (120+ Değerlendirme)
              </span>
            </div>
          </div>

          <!-- Modal İçerik -->
          <div class="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
            <div>
              <span
                class="text-[10px] font-black uppercase tracking-widest text-primary font-jakarta"
              >
                {{ categories.find((c) => c.id === selectedProduct.categoryId)?.name }}
              </span>
              <h2 class="font-jakarta font-extrabold text-xl text-[#1F1D1D] mt-0.5">
                {{ selectedProduct.title }}
              </h2>
              <p class="text-xs text-[#665E58] mt-2 leading-relaxed">
                {{ selectedProduct.desc }}
              </p>
            </div>

            <!-- Bilgi Rozetleri -->
            <div class="grid grid-cols-2 gap-2 py-2 border-y border-black/5">
              <div
                class="flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-black/5"
              >
                <Flame class="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span class="text-[9px] text-gray-400 font-bold block">KALORİ DEĞERİ</span>
                  <span class="text-xs font-bold text-[#1F1D1D]">{{
                    selectedProduct.calories
                  }}</span>
                </div>
              </div>

              <div
                class="flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-black/5"
              >
                <Calendar class="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span class="text-[9px] text-gray-400 font-bold block">HAZIRLANMA SÜRESİ</span>
                  <span class="text-xs font-bold text-[#1F1D1D]">{{
                    selectedProduct.prepTime
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Malzemeler ve Özellikler -->
            <div>
              <h4 class="font-jakarta font-bold text-xs text-[#1F1D1D] mb-2">
                Öne Çıkan Özellikler
              </h4>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in selectedProduct.tags"
                  :key="tag"
                  class="px-3 py-1 rounded-lg bg-second text-primary text-xs font-bold inline-flex items-center gap-1"
                >
                  <Check class="w-3 h-3" /> {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modal Alt Sepet Ekle Barı -->
          <div
            class="p-4 bg-[#FAF8F5] border-t border-black/5 flex items-center justify-between gap-4 shrink-0"
          >
            <div>
              <span class="text-[10px] text-gray-400 font-bold block">TOPLAM FİYAT</span>
              <span class="font-jakarta font-extrabold text-2xl text-primary">
                ₺{{ selectedProduct.price }}
              </span>
            </div>

            <button
              @click="addToCartAndClose(selectedProduct)"
              class="flex-1 py-3 px-5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-jakarta font-bold text-xs sm:text-sm transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <ShoppingBag class="w-4 h-4" />
              <span>Sepete Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
