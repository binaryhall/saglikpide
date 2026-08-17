<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { Flame, ShoppingBag, Phone, Menu, X, ChevronRight, Clock, MapPin } from '@/core/utils/icon'
import TitleComponent from '../TitleComponent.vue'

const navLinks = ref([
  { name: 'Ana Sayfa', href: '/', active: true },
  { name: 'Menümüz', href: '/restourant/menu' },
  { name: 'Interier', href: '/interier' },
  { name: 'İletişim', href: '/contact' },
])

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const mobileDrawerRef = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(isMobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    gsap.to('.mobile-overlay', { opacity: 1, duration: 0.3, pointerEvents: 'auto' })
    gsap.fromTo('.mobile-drawer', { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' })
    gsap.fromTo(
      '.mobile-nav-item',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, delay: 0.1, ease: 'power2.out' },
    )
  } else {
    document.body.style.overflow = ''
    gsap.to('.mobile-overlay', { opacity: 0, duration: 0.3, pointerEvents: 'none' })
    gsap.to('.mobile-drawer', { x: '100%', duration: 0.3, ease: 'power3.in' })
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  gsap.from('.gsap-header', {
    y: -40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <TitleComponent />
  <header
    class="gsap-header sticky top-0 left-0 right-0 z-50 transition-all duration-300 font-inter"
    :class="[
      isScrolled
        ? 'bg-white/90 backdrop-blur-md shadow-md py-3 border-b border-black/5'
        : 'bg-transparent py-5',
    ]"
  >
    <div
      v-show="!isScrolled"
      class="hidden lg:block border-b border-black/5 pb-2.5 mb-2.5 transition-all duration-300"
    >
      <div
        class="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center text-xs text-[#665E58]"
      >
        <div class="flex items-center gap-6">
          <span class="flex items-center gap-1.5">
            <Clock class="w-3.5 h-3.5 text-primary" />
            Her Gün: 10:00 - 22:00
          </span>
          <span class="flex items-center gap-1.5">
            <MapPin class="w-3.5 h-3.5 text-primary" />
            Büyükdere, Böğürtlen Sk. No:12, 26040 Odunpazarı/Eskişehir
          </span>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="tel:02222316262"
            class="hover:text-primary transition-colors flex items-center gap-1 font-semibold"
          >
            <Phone class="w-3.5 h-3.5 text-primary" />
            0 (222) 231 62 62
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-12">
      <div class="flex items-center justify-between">
        <!-- LOGO -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="flex justify-center items-center">
            <img src="@/assets/contents/logo/logo.png" class="h-16" alt="" />
          </div>
        </a>

        <!-- DESKTOP NAV LINKS -->
        <nav
          class="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-sm p-1.5 rounded-2xl border border-black/5 shadow-sm"
        >
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="px-5 py-2 rounded-xl text-sm font-jakarta font-semibold transition-all duration-200"
            :class="[
              link.active
                ? 'bg-second text-primary shadow-xs'
                : 'text-[#1F1D1D] hover:text-primary hover:bg-second/50',
            ]"
          >
            {{ link.name }}
          </a>
        </nav>

        <!-- DESKTOP RIGHT ACTIONS -->
        <div class="hidden lg:flex items-center gap-3">
          <a
            href="tel:4442605"
            class="px-5 py-2.5 rounded-xl text-sm font-jakarta font-bold text-[#1F1D1D] hover:text-primary bg-second/80 hover:bg-second transition-colors border border-primary/10"
          >
            Masa Rezerve Et
          </a>

          <router-link
            to="/restourant/menu"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-jakarta font-bold transition-all duration-300 shadow-md shadow-primary/20 hover:-translate-y-0.5"
          >
            <ShoppingBag class="w-4 h-4" />
            <span>Sipariş Ver</span>
          </router-link>
        </div>

        <!-- MOBILE HAMBURGER BUTTON -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden p-2.5 rounded-xl bg-second text-[#1F1D1D] hover:text-primary transition-colors focus:outline-none"
          aria-label="Menüyü Aç"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  </header>

  <div class="lg:hidden">
    <div
      @click="toggleMobileMenu"
      class="mobile-overlay fixed inset-0 bg-black/50 backdrop-blur-xs z-50 opacity-0 pointer-events-none transition-opacity duration-300"
    ></div>

    <div
      ref="mobileDrawerRef"
      class="mobile-drawer fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col justify-between p-6 translate-x-full overflow-y-auto"
    >
      <div>
        <div class="flex items-center justify-between pb-6 border-b border-black/5">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
              <Flame class="w-5 h-5" />
            </div>
            <span class="font-jakarta font-extrabold text-lg text-[#1F1D1D]">
              SAĞLIK<span class="text-primary">PİDE</span>
            </span>
          </div>

          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-xl bg-second text-gray-700 hover:text-primary transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <nav class="flex flex-col gap-2 py-6">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            @click="toggleMobileMenu"
            class="mobile-nav-item flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-jakarta font-semibold transition-all"
            :class="[
              link.active ? 'bg-second text-primary font-bold' : 'text-[#1F1D1D] hover:bg-gray-50',
            ]"
          >
            <span>{{ link.name }}</span>
            <ChevronRight class="w-4 h-4 opacity-50" />
          </a>
        </nav>
      </div>

      <div class="mobile-nav-item pt-6 border-t border-black/5 space-y-3">
        <a
          href="#siparis"
          @click="toggleMobileMenu"
          class="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-jakarta font-bold text-base shadow-lg shadow-primary/25"
        >
          <ShoppingBag class="w-5 h-5" />
          <span>Online Sipariş Ver</span>
        </a>

        <a
          href="tel:02222416262"
          class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-second text-[#1F1D1D] font-jakarta font-semibold text-sm border border-primary/10"
        >
          <Phone class="w-4 h-4 text-primary" />
          <span>Hemen Ara: 0 (222) 231 62 62</span>
        </a>

        <div class="text-center pt-2">
          <span class="text-xs text-[#665E58] flex items-center justify-center gap-1">
            <Clock class="w-3.5 h-3.5 text-primary" /> Açık: 10:00 - 22:00
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
