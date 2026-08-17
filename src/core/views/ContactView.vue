<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { MapPin, Phone, Clock, Send, Check, Navigation, Mail } from '@lucide/vue'

// --- ŞUBE VERİLERİ ---
interface Branch {
  id: number
  name: string
  tagline: string
  address: string
  phone: string
  email: string
  workingHours: string
  mapEmbedUrl: string
  directionUrl: string
  isMain?: boolean
}

const branches: Branch[] = [
  {
    id: 1,
    name: 'Merkez Şube (Bulvar)',
    tagline: 'Bulvar',
    address: 'Büyükdere, Böğürtlen Sk. No:12, 26040 Odunpazarı/Eskişehir',
    phone: '+90 (222) 231 62 62',
    email: 'info@saglikpide.com',
    workingHours: 'Hafta içi & Hafta sonu: 08:30 - 22:00',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.1190918421203!2d30.498345196375908!3d39.75943444773327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc17500a27a67f%3A0x235994c57111826d!2zU2HEn2zEsWsgUGlkZSBCdWx2YXI!5e0!3m2!1str!2str!4v1786974323337!5m2!1str!2str',
    directionUrl: 'https://maps.app.goo.gl/AU6K1WTBMdnWNKVM7',
    isMain: true,
  },
  {
    id: 2,
    name: 'Sağlık Pide (Adalar)',
    tagline: 'Adalar',
    address: 'İstiklal, Başarılı Sk. No:35, 26010 Odunpazarı/Eskişehir',
    phone: '+90 (222) 230 11 99',
    email: 'info@saglikpide.com',
    workingHours: 'Hafta içi & Hafta sonu: 09:00 - 23:00',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.32833153619!2d30.512404776524924!3d39.777186494315046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc16080b3fb69d%3A0xe2feb196f55a2cde!2zU2HEn2zEsWsgUGlkZSBBZGFsYXI!5e0!3m2!1str!2str!4v1786974471628!5m2!1str!2str',
    directionUrl: 'https://maps.app.goo.gl/hQwsheaDBgQh6NbK8',
  },
  {
    id: 3,
    name: 'Sağlık Pide (Yenibağlar)',
    tagline: 'Gurme Lezzetler & Drive-Thru',
    address: 'Yenibağlar, Yılmaz Büyükerşen Blv No:132, 26170 Tepebaşı/Eskişehir',
    phone: '+90 (222) 322 23 24',
    email: 'info@saglikpide.com',
    workingHours: 'Hafta içi & Hafta sonu: 08:00 - 00:00',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.8804506687543!2d30.50595987652531!3d39.78723819371111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc15e64d474793%3A0x728e78a64b3325ee!2zU2HEn2zEsWsgUGlkZSBCYcSfbGFy!5e0!3m2!1str!2str!4v1786974603062!5m2!1str!2str',
    directionUrl: 'https://maps.app.goo.gl/bhosuRCaNH9vUv3J8',
  },
]

// --- STATE HESAPLAMALARI & REAKTİF DEĞİŞKENLER ---
const activeBranchId = ref<number>(1)

const activeBranch = computed<Branch>(
  () => branches.find((b) => b.id === activeBranchId.value) ?? branches[0]!,
)

// İletişim Formu State
const form = ref({
  fullName: '',
  phone: '',
  email: '',
  branchId: 1,
  subject: 'Genel Bilgi / Talep',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

// --- METOTLAR ---
const selectBranch = (id: number) => {
  if (activeBranchId.value === id) return
  activeBranchId.value = id
  form.value.branchId = id

  // Map konteynerine yumuşak geçiş
  nextTick(() => {
    gsap.fromTo(
      '#map-container',
      { opacity: 0.6, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,transform' },
    )
  })
}

const handleSubmit = () => {
  if (isSubmitting.value) return
  isSubmitting.value = true

  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true

    form.value = {
      fullName: '',
      phone: '',
      email: '',
      branchId: activeBranchId.value,
      subject: 'Genel Bilgi / Talep',
      message: '',
    }

    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
  }, 1200)
}

// --- GSAP SAHNE GİRİŞ ANİMASYONLARI ---
onMounted(() => {
  gsap.context(() => {
    gsap.from('.anim-header', {
      y: -25,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'all',
    })

    gsap.from('.anim-card', {
      y: 35,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.15,
      clearProps: 'all',
    })

    gsap.from('.anim-section', {
      y: 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.35,
      clearProps: 'all',
    })
  })
})
</script>

<template>
  <div class="min-h-screen bg-second/30 text-[#1F1D1D] font-jakarta py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-12">
      <!-- HERO HEADER -->
      <div class="text-center space-y-4 max-w-3xl mx-auto anim-header">
        <span
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase border border-primary/20"
        >
          <MapPin class="w-3.5 h-3.5" />
          Lokasyonlarımız & İletişim
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1F1D1D]">
          Sizleri Şubelerimizde
          <span class="text-primary underline decoration-primary/30 decoration-wavy decoration-2"
            >Ağırlamaktan</span
          >
          Mutluluk Duyarız
        </h1>
        <p class="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
          Eskişehir genelindeki 3 lezzet noktamızda taze fırından çıkan pidelerimizi deneyimleyin
          veya sorularınız için doğrudan bize ulaşın.
        </p>
      </div>

      <!-- 3 ŞUBE KARTLARI SEKSİYONU -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="branch in branches"
          :key="branch.id"
          @click="selectBranch(branch.id)"
          :class="[
            'anim-card relative cursor-pointer p-6 rounded-3xl transition-all duration-300 border flex flex-col justify-between group',
            activeBranchId === branch.id
              ? 'bg-white border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20 -translate-y-1'
              : 'bg-white hover:border-primary/40 border-black/10 shadow-sm hover:shadow-md',
          ]"
        >
          <!-- Rozet (Merkez Şube) -->
          <div
            v-if="branch.isMain"
            class="absolute -top-3 right-6 bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm"
          >
            Merkez
          </div>

          <div class="space-y-4">
            <!-- Başlık & Slogan -->
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3
                  class="font-bold text-lg text-[#1F1D1D] group-hover:text-primary transition-colors"
                >
                  {{ branch.name }}
                </h3>
                <p class="text-xs text-primary font-semibold mt-0.5">{{ branch.tagline }}</p>
              </div>
              <div
                :class="[
                  'w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors',
                  activeBranchId === branch.id
                    ? 'bg-primary text-white'
                    : 'bg-second text-gray-700 group-hover:bg-primary/10 group-hover:text-primary',
                ]"
              >
                <MapPin class="w-5 h-5" />
              </div>
            </div>

            <hr class="border-black/5" />

            <!-- Şube Detay Bilgileri -->
            <div class="space-y-2.5 text-xs text-gray-700 font-medium">
              <div class="flex items-start gap-2.5">
                <MapPin class="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span class="leading-snug">{{ branch.address }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <Phone class="w-4 h-4 text-primary shrink-0" />
                <span class="font-bold text-[#1F1D1D]">{{ branch.phone }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <Clock class="w-4 h-4 text-primary shrink-0" />
                <span>{{ branch.workingHours }}</span>
              </div>
            </div>
          </div>

          <!-- Yol Tarifi Aksiyon Butonu -->
          <div class="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
            <span
              class="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline"
            >
              Haritada Odaklan
            </span>
            <a
              :href="branch.directionUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-second hover:bg-primary hover:text-white text-gray-800 text-xs font-bold transition-all shadow-2xs"
            >
              <Navigation class="w-3.5 h-3.5" />
              Yol Tarifi
            </a>
          </div>
        </div>
      </div>

      <!-- HARİTA & İLETİŞİM FORMU ÇİFT KOLONLU DÜZEN -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- HARİTA SEKSİYONU (7 Kolon) -->
        <div class="lg:col-span-7 space-y-4 anim-section">
          <div class="bg-white p-4 sm:p-6 rounded-3xl border border-black/10 shadow-xl space-y-4">
            <!-- Harita Üst Bilgi Barı -->
            <div
              class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/5"
            >
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                <div>
                  <h4 class="font-bold text-sm text-[#1F1D1D]">Aktif Şube Konumu</h4>
                  <p class="text-xs text-gray-600 font-medium">{{ activeBranch.name }}</p>
                </div>
              </div>
              <div class="text-xs font-semibold text-primary bg-second px-3 py-1 rounded-xl">
                Canlı Google Maps Görünümü
              </div>
            </div>

            <!-- Google Map Iframe Container -->
            <div
              id="map-container"
              class="relative w-full h-95 sm:h-110 rounded-2xl overflow-hidden bg-gray-100 border border-black/5 shadow-inner"
            >
              <iframe
                :src="activeBranch.mapEmbedUrl"
                class="w-full h-full border-0 transition-opacity duration-300"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Hızlı İletişim Şeridi -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                :href="`tel:${activeBranch.phone}`"
                class="flex items-center gap-3 p-3 rounded-2xl bg-second/40 hover:bg-second transition-colors border border-black/5"
              >
                <div
                  class="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"
                >
                  <Phone class="w-4 h-4" />
                </div>
                <div class="min-w-0">
                  <p class="text-[10px] text-gray-500 font-bold uppercase">Hızlı Arama</p>
                  <p class="text-xs font-bold text-[#1F1D1D] truncate">{{ activeBranch.phone }}</p>
                </div>
              </a>

              <a
                :href="`mailto:${activeBranch.email}`"
                class="flex items-center gap-3 p-3 rounded-2xl bg-second/40 hover:bg-second transition-colors border border-black/5"
              >
                <div
                  class="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"
                >
                  <Mail class="w-4 h-4" />
                </div>
                <div class="min-w-0">
                  <p class="text-[10px] text-gray-500 font-bold uppercase">E-Posta Gönder</p>
                  <p class="text-xs font-bold text-[#1F1D1D] truncate">{{ activeBranch.email }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- İLETİŞİM FORMU SEKSİYONU (5 Kolon) -->
        <div class="lg:col-span-5 anim-section">
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-black/10 shadow-xl space-y-6">
            <div>
              <h3 class="text-xl font-bold text-[#1F1D1D]">Bize Mesaj Gönderin</h3>
              <p class="text-xs text-gray-600 font-medium mt-1">
                Aşağıdaki formu doldurarak ilgili şubemize direkt ulaşabilirsiniz.
              </p>
            </div>

            <!-- Başarılı Gönderim Bildirimi -->
            <div
              v-if="isSubmitted"
              class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-3"
            >
              <Check class="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p class="font-bold text-sm">Mesajınız Alındı!</p>
                <p class="mt-0.5">
                  En kısa sürede seçmiş olduğunuz şube temsilcimiz sizinle iletişime geçecektir.
                </p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Şube Seçimi Dropdown/Select -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >İlgili Şube</label
                >
                <select
                  v-model="form.branchId"
                  @change="selectBranch(form.branchId)"
                  class="w-full bg-second/30 border border-black/10 rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer text-gray-800"
                >
                  <option v-for="b in branches" :key="b.id" :value="b.id">
                    {{ b.name }}
                  </option>
                </select>
              </div>

              <!-- Ad Soyad & Telefon -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >Ad Soyad *</label
                  >
                  <input
                    v-model="form.fullName"
                    type="text"
                    required
                    placeholder="Ahmet Yılmaz"
                    class="w-full bg-second/30 border border-black/10 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-800"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >Telefon *</label
                  >
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    class="w-full bg-second/30 border border-black/10 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-800"
                  />
                </div>
              </div>

              <!-- E-Posta -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >E-Posta Adresi</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="ornek@email.com"
                  class="w-full bg-second/30 border border-black/10 rounded-2xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-800"
                />
              </div>

              <!-- Konu -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider">Konu</label>
                <select
                  v-model="form.subject"
                  class="w-full bg-second/30 border border-black/10 rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all cursor-pointer text-gray-800"
                >
                  <option>Genel Bilgi / Talep</option>
                  <option>Toptan Satış & Kurumsal Sipariş</option>
                  <option>Öneri & Şikayet</option>
                  <option>İnsan Kaynakları / Başvuru</option>
                </select>
              </div>

              <!-- Mesaj -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >Mesajınız *</label
                >
                <textarea
                  v-model="form.message"
                  required
                  rows="4"
                  placeholder="Mesajınızı detaylıca buraya yazabilirsiniz..."
                  class="w-full bg-second/30 border border-black/10 rounded-2xl p-4 text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all resize-none text-gray-800"
                ></textarea>
              </div>

              <!-- Gönder Butonu -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group active:scale-98 disabled:opacity-60 cursor-pointer"
              >
                <template v-if="!isSubmitting">
                  <span>Mesajı Gönder</span>
                  <Send class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </template>
                <template v-else>
                  <span
                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  ></span>
                  <span>Gönderiliyor...</span>
                </template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
