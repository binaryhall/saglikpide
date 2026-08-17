<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- GALERİ VERİSİ ---
const gallery = ref([
  {
    id: 1,
    title: 'Geleneksel Odun Ateşi Taş Fırın',
    subtitle: 'Meşe odunu ateşi ve doğal taş dokusu',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-4/5',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 2,
    title: 'Ahşap & Taş Doku Uyumu',
    subtitle: 'Sıcak atmosfer ve el işçiliği',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-square',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 3,
    title: 'Özel VIP Aile Locası',
    subtitle: 'Mahremiyet ve konforlu oturma düzeni',
    image:
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-4/3',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 4,
    title: 'Otantik Aydınlatma & Bakır Detaylar',
    subtitle: 'Geleneksel motifler ve sıcak tonlar',
    image:
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-16/10',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 5,
    title: 'Meşe Odunu Ateşinde Pişirme',
    subtitle: 'Usta ellerden çıkan lezzet şöleni',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-square',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 6,
    title: 'Geniş Ve Ferah Masa Düzeni',
    subtitle: 'Grup ve aile yemekleri için ideal alan',
    image:
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-16/9',
    colSpan: 'md:col-span-2 lg:col-span-3',
  },
  {
    id: 7,
    title: 'Közde Çay & Kahve Köşesi',
    subtitle: 'Yemek sonrası otantik dinlenme alanı',
    image:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-4/5',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 8,
    title: 'Geleneksel Şark Köşesi Dokunuşu',
    subtitle: 'Kültürel zenginliği yaşatan mimari',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-16/10',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
])

const activeImage = ref<(typeof gallery.value)[0] | null>(null)
const isExpanded = ref(false)

const handleMove = (e: MouseEvent | TouchEvent, target: HTMLElement) => {
  const rect = target.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY

  const x = clientX - rect.left
  const y = clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = ((y - centerY) / centerY) * -8
  const rotateY = ((x - centerX) / centerX) * 8

  const img = target.querySelector('.card-img')
  const overlay = target.querySelector('.card-overlay')

  gsap.to(target, {
    rotateX,
    rotateY,
    transformPerspective: 1000,
    duration: 0.4,
    ease: 'power2.out',
  })

  if (img) {
    gsap.to(img, {
      scale: 1.12,
      x: ((x - centerX) / centerX) * -12,
      y: ((y - centerY) / centerY) * -12,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  if (overlay) {
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
    })
  }
}

// 2. Etkileşim Bitişinde Kartı Eski Haline Getirme
const handleLeave = (target: HTMLElement) => {
  const img = target.querySelector('.card-img')
  const overlay = target.querySelector('.card-overlay')

  gsap.to(target, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.6,
    ease: 'power3.out',
  })

  if (img) {
    gsap.to(img, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  if (overlay) {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.4,
    })
  }
}

const expandImage = (item: (typeof gallery.value)[0], e: MouseEvent | TouchEvent) => {
  activeImage.value = item
  isExpanded.value = true

  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  requestAnimationFrame(() => {
    const modalEl = document.querySelector('.modal-stage')
    const modalImg = document.querySelector('.modal-img')
    const modalContent = document.querySelector('.modal-content')

    if (modalEl && modalImg) {
      gsap.fromTo(modalEl, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })

      gsap.fromTo(
        modalImg,
        {
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
          scale: 0.3,
          borderRadius: '24px',
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          borderRadius: '16px',
          duration: 0.5,
          ease: 'power4.out',
        },
      )

      if (modalContent) {
        gsap.fromTo(
          modalContent,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'power3.out' },
        )
      }
    }
  })
}

const shrinkImage = () => {
  const modalEl = document.querySelector('.modal-stage')
  const modalImg = document.querySelector('.modal-img')

  if (modalEl && modalImg) {
    gsap.to(modalImg, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    })

    gsap.to(modalEl, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        isExpanded.value = false
        activeImage.value = null
      },
    })
  } else {
    isExpanded.value = false
    activeImage.value = null
  }
}

// 5. Sayfa Yüklendiğinde Kaydırmaya Bağlı Görsel Belirme Animasyonları
onMounted(() => {
  const items = gsap.utils.toArray<HTMLElement>('.gallery-card')

  items.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        y: 60,
        opacity: 0,
        scale: 0.92,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: (index % 3) * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F5] p-4 sm:p-8 lg:p-12 overflow-x-hidden">
    <!-- EDITORIAL ASİMETRİK GALERİ GRID -->
    <main
      class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
    >
      <div
        v-for="item in gallery"
        :key="item.id"
        :class="[
          'gallery-card group relative rounded-3xl overflow-hidden bg-white border border-black/8 cursor-pointer select-none shadow-sm transition-shadow duration-500 hover:shadow-2xl',
          item.colSpan,
          item.aspect,
        ]"
        @mousemove="handleMove($event, $event.currentTarget as HTMLElement)"
        @mouseleave="handleLeave($event.currentTarget as HTMLElement)"
        @touchstart.passive="handleMove($event, $event.currentTarget as HTMLElement)"
        @touchend.passive="handleLeave($event.currentTarget as HTMLElement)"
        @click="expandImage(item, $event)"
      >
        <!-- Görsel -->
        <img
          :src="item.image"
          :alt="item.title"
          class="card-img w-full h-full object-cover pointer-events-none will-change-transform"
          loading="lazy"
        />

        <!-- Dokunmatik & Hover Dinamik Gradient Overlay -->
        <div
          class="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 pointer-events-none transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8 text-white"
        >
          <span
            class="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#f3e9e2] mb-1"
          >
            Dokun / Tıkla
          </span>
          <h3 class="font-black text-lg sm:text-2xl leading-snug tracking-tight">
            {{ item.title }}
          </h3>
          <p class="text-xs sm:text-sm text-white/80 mt-1 line-clamp-1">
            {{ item.subtitle }}
          </p>
        </div>

        <!-- Köşe Dokunmatik Işıma Efekti -->
        <div
          class="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none group-hover:border-[#c62828]/50 transition-colors duration-500"
        ></div>
      </div>
    </main>

    <!-- AKICI BÜYÜTÜLMÜŞ ODOK / ZOOM STAGE -->
    <Teleport to="body">
      <div
        v-if="isExpanded && activeImage"
        class="modal-stage fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        @click="shrinkImage"
      >
        <!-- Büyütülen Görsel -->
        <div class="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
          <img
            :src="activeImage.image"
            :alt="activeImage.title"
            class="modal-img max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10 will-change-transform"
          />

          <!-- Görsel Bilgisi Overlay -->
          <div class="modal-content mt-6 text-center text-white space-y-1 pointer-events-none">
            <h2 class="text-xl sm:text-3xl font-black tracking-tight">
              {{ activeImage.title }}
            </h2>
            <p class="text-xs sm:text-sm text-[#f3e9e2]/80">
              {{ activeImage.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.aspect-4\/5 {
  aspect-ratio: 4 / 5;
}
.aspect-16\/10 {
  aspect-ratio: 16 / 10;
}
.gallery-card {
  transform-style: preserve-3d;
  will-change: transform;
}
</style>
