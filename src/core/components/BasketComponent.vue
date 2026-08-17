<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Tag,
  Truck,
  Sparkles,
  CheckCircle2,
} from '@/core/utils/icon'

interface CartItem {
  id: number
  name: string
  variant: string
  price: number
  quantity: number
  image: string
}

const isOpen = ref(true)

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Duble Kavrulmuş Antep Fıstığı',
    variant: '500g - Özel Ambalaj',
    price: 340,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1543208105-8605c567e691?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Geleneksel Taş Fırın Kıymalı Pide',
    variant: '1 Porsiyon (Odun Ateşi)',
    price: 190,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Organik Çam Balı',
    variant: '850g Cam Kavanoz',
    price: 280,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=400&q=80',
  },
])

// --- KUPON STATE ---
const couponInput = ref('')
const isCouponApplied = ref(false)
const appliedDiscountRatio = ref(0)
const couponError = ref('')

// --- HESAPLAMALAR ---
const FREE_SHIPPING_THRESHOLD = 1000
const DEFAULT_SHIPPING_COST = 49

const subtotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

const freeShippingRemaining = computed(() => {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal.value
  return remaining > 0 ? remaining : 0
})

const freeShippingPercent = computed(() => {
  const percent = (subtotal.value / FREE_SHIPPING_THRESHOLD) * 100
  return percent > 100 ? 100 : percent
})

const shippingCost = computed(() => {
  if (cartItems.value.length === 0) return 0
  return subtotal.value >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST
})

const discountAmount = computed(() => {
  return Math.round(subtotal.value * appliedDiscountRatio.value)
})

const grandTotal = computed(() => {
  return subtotal.value - discountAmount.value + shippingCost.value
})

const totalItemCount = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
})

// --- METOTLAR ---
const toggleCart = () => {
  isOpen.value = !isOpen.value
}

const updateQuantity = (id: number, delta: number) => {
  const item = cartItems.value.find((i) => i.id === id)
  if (!item) return

  if (item.quantity + delta > 0) {
    item.quantity += delta
  } else {
    removeItem(id)
  }
}

const removeItem = (id: number) => {
  const targetEl = document.querySelector(`#cart-item-${id}`)
  if (targetEl) {
    gsap.to(targetEl, {
      x: 100,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        cartItems.value = cartItems.value.filter((i) => i.id !== id)
      },
    })
  } else {
    cartItems.value = cartItems.value.filter((i) => i.id !== id)
  }
}

const applyCoupon = () => {
  couponError.value = ''
  if (couponInput.value.trim().toUpperCase() === 'ASIR10') {
    isCouponApplied.value = true
    appliedDiscountRatio.value = 0.1
    couponInput.value = ''
  } else {
    couponError.value = 'Geçersiz kupon kodu (Deneyin: ASIR10)'
  }
}

const removeCoupon = () => {
  isCouponApplied.value = false
  appliedDiscountRatio.value = 0
}

// --- GSAP DRAWER ANİMASYONU ---
watch(isOpen, (newVal) => {
  nextTick(() => {
    if (newVal) {
      gsap.fromTo(
        '.cart-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
      )
      gsap.fromTo(
        '.cart-panel',
        { xPercent: 100 },
        { xPercent: 0, duration: 0.45, ease: 'power3.out' },
      )
      gsap.fromTo(
        '.cart-list-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.15, ease: 'power2.out' },
      )
    }
  })
})
</script>

<template>
  <div class="font-inter">
    <!-- TRIGGER BUTTON -->
    <button
      @click="toggleCart"
      class="fixed bottom-6 right-6 z-30 flex items-center gap-3 px-5 py-3.5 rounded-full bg-primary text-white shadow-xl hover:bg-primary-hover transition-all cursor-pointer font-jakarta font-bold text-sm"
    >
      <div class="relative">
        <ShoppingBag class="w-5 h-5" />
        <span
          v-if="totalItemCount > 0"
          class="absolute -top-2 -right-2 bg-white text-primary w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center border-2 border-primary"
        >
          {{ totalItemCount }}
        </span>
      </div>
      <span>Sepetim</span>
    </button>

    <!-- DRAWER COMPONENT -->
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Overlay Backdrop -->
      <div
        class="cart-overlay fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        @click="toggleCart"
      ></div>

      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <!-- Panel Container -->
        <div
          class="cart-panel w-screen max-w-md bg-[#FAF8F5] text-[#1F1D1D] shadow-2xl flex flex-col justify-between border-l border-black/5"
        >
          <!-- 1. HEADER -->
          <div
            class="p-5 sm:p-6 bg-white border-b border-black/8 flex items-center justify-between shadow-2xs"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-second text-primary flex items-center justify-center"
              >
                <ShoppingBag class="w-5 h-5" />
              </div>
              <div>
                <h2 class="font-jakarta font-extrabold text-lg leading-tight text-[#1F1D1D]">
                  Alışveriş Sepeti
                </h2>
                <p class="text-xs text-[#665E58] font-medium mt-0.5">
                  {{ totalItemCount }} adet ürün eklendi
                </p>
              </div>
            </div>

            <button
              @click="toggleCart"
              class="w-9 h-9 rounded-full bg-black/5 hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer text-[#1F1D1D]"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- 2. ÜCRETSİZ KARGO İLERLEME ÇUBUĞU -->
          <div class="bg-second/60 px-5 py-3.5 border-b border-primary/10">
            <div class="flex items-center justify-between text-xs font-jakarta font-bold mb-1.5">
              <span class="flex items-center gap-1.5 text-[#1F1D1D]">
                <Truck class="w-4 h-4 text-primary" />
                <template v-if="freeShippingRemaining > 0">
                  <span class="text-primary font-black">{{ freeShippingRemaining }} TL</span>
                  daha ekleyin, kargo bedava!
                </template>
                <template v-else>
                  <span class="text-success font-extrabold">Tebrikler, Kargo Ücretsiz!</span>
                </template>
              </span>
              <span class="text-[11px] text-[#665E58]">%{{ Math.round(freeShippingPercent) }}</span>
            </div>

            <div class="w-full h-2 bg-black/8 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${freeShippingPercent}%` }"
              ></div>
            </div>
          </div>

          <!-- 3. SEPET LİSTESİ -->
          <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            <!-- Boş Sepet Durumu -->
            <div
              v-if="cartItems.length === 0"
              class="h-full flex flex-col items-center justify-center text-center py-12 space-y-4"
            >
              <div
                class="w-20 h-20 rounded-full bg-second text-primary flex items-center justify-center"
              >
                <ShoppingBag class="w-10 h-10 stroke-[1.5]" />
              </div>
              <div class="space-y-1">
                <h3 class="font-jakarta font-bold text-lg text-[#1F1D1D]">Sepetiniz Henüz Boş</h3>
                <p class="text-xs text-[#665E58] max-w-xs">
                  Lezzetli ve taze doğal ürünlerimizi inceleyerek sepetinize ekleyebilirsiniz.
                </p>
              </div>
              <button
                @click="toggleCart"
                class="px-6 py-2.5 rounded-full bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-hover transition-colors"
              >
                Ürünleri Keşfet
              </button>
            </div>

            <!-- Ürün Kartları -->
            <div
              v-for="item in cartItems"
              :key="item.id"
              :id="`cart-item-${item.id}`"
              class="cart-list-item bg-white p-3.5 rounded-2xl border border-black/6 shadow-2xs flex gap-3.5 items-center relative group"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 rounded-xl object-cover border border-black/5 flex-shrink-0"
              />

              <div class="flex-1 min-w-0 space-y-1">
                <h4
                  class="font-jakarta font-bold text-xs sm:text-sm text-[#1F1D1D] truncate leading-tight"
                >
                  {{ item.name }}
                </h4>
                <p class="text-[11px] text-[#665E58] truncate">{{ item.variant }}</p>

                <div class="flex items-center justify-between pt-1">
                  <div
                    class="flex items-center gap-2 bg-[#FAF8F5] border border-black/10 rounded-lg p-1"
                  >
                    <button
                      @click="updateQuantity(item.id, -1)"
                      class="w-6 h-6 rounded-md bg-white hover:bg-black/5 flex items-center justify-center text-[#1F1D1D] transition-colors cursor-pointer"
                    >
                      <Minus class="w-3 h-3" />
                    </button>
                    <span class="font-jakarta font-bold text-xs px-1 text-[#1F1D1D]">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="updateQuantity(item.id, 1)"
                      class="w-6 h-6 rounded-md bg-white hover:bg-black/5 flex items-center justify-center text-[#1F1D1D] transition-colors cursor-pointer"
                    >
                      <Plus class="w-3 h-3" />
                    </button>
                  </div>

                  <span class="font-jakarta font-extrabold text-sm text-primary">
                    {{ item.price * item.quantity }} TL
                  </span>
                </div>
              </div>

              <button
                @click="removeItem(item.id)"
                class="absolute top-3 right-3 text-gray-400 hover:text-danger transition-colors p-1 cursor-pointer opacity-70 group-hover:opacity-100"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- 4. FOOTER -->
          <div
            v-if="cartItems.length > 0"
            class="p-5 sm:p-6 bg-white border-t border-black/8 space-y-4 shadow-lg"
          >
            <!-- Kupon Alanı -->
            <div class="space-y-1.5">
              <div v-if="!isCouponApplied" class="flex gap-2">
                <div class="relative flex-1">
                  <Tag class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    v-model="couponInput"
                    type="text"
                    placeholder="İndirim Kuponu"
                    class="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-black/12 focus:outline-none focus:border-primary uppercase bg-[#FAF8F5]"
                  />
                </div>
                <button
                  @click="applyCoupon"
                  class="px-4 py-2 rounded-xl bg-second text-primary font-jakarta font-bold text-xs hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  Uygula
                </button>
              </div>

              <div
                v-else
                class="flex items-center justify-between bg-success/10 border border-success/30 px-3 py-2 rounded-xl text-xs text-success"
              >
                <span class="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 class="w-4 h-4 text-success" />
                  %10 İndirim Kuponu Aktif
                </span>
                <button
                  @click="removeCoupon"
                  class="text-xs text-success underline font-semibold cursor-pointer"
                >
                  Kaldır
                </button>
              </div>

              <p v-if="couponError" class="text-[11px] text-danger font-medium">
                {{ couponError }}
              </p>
            </div>

            <!-- Fiyat Kırılımı -->
            <div class="space-y-2 text-xs font-medium text-[#665E58] pt-1">
              <div class="flex justify-between">
                <span>Ara Toplam</span>
                <span class="font-bold text-[#1F1D1D]">{{ subtotal }} TL</span>
              </div>

              <div v-if="isCouponApplied" class="flex justify-between text-success font-bold">
                <span>Kupon İndirimi</span>
                <span>-{{ discountAmount }} TL</span>
              </div>

              <div class="flex justify-between">
                <span>Kargo Bedeli</span>
                <span v-if="shippingCost === 0" class="text-success font-bold">Ücretsiz</span>
                <span v-else class="font-bold text-[#1F1D1D]">{{ shippingCost }} TL</span>
              </div>

              <div
                class="flex justify-between items-center pt-3 border-t border-black/8 text-sm sm:text-base font-jakarta font-black text-[#1F1D1D]"
              >
                <span>Genel Toplam</span>
                <span class="text-xl text-primary">{{ grandTotal }} TL</span>
              </div>
            </div>

            <!-- Checkout Butonu -->
            <button
              class="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-jakarta font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-primary-hover transition-all cursor-pointer shadow-md shadow-primary/20 group"
            >
              <span>Siparişi Tamamla</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
