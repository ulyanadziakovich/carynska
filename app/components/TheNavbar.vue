<script setup lang="ts">
import type { NavLink } from '~/composables/useNav'

defineProps<{
  nav: { links: NavLink[]; cta: { label: string; href: string } }
  alwaysShowLogo?: boolean
}>()

const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const menuOpen = ref(false)
const openDropdown = ref<string | null>(null)

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false; openDropdown.value = null }
function toggleDropdown(label: string) {
  openDropdown.value = openDropdown.value === label ? null : label
}
</script>

<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-forest/95 backdrop-blur-sm py-3 shadow-2xl' : 'bg-forest/70 backdrop-blur-sm py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

      <!-- Logo -->
      <a
        href="/"
        class="select-none transition-all duration-500 flex items-center"
        :class="(scrolled || alwaysShowLogo) ? 'opacity-100' : 'opacity-80'"
      >
        <img
          src="/images/logonew.png"
          alt="Przystań Caryńska"
          class="h-7 md:h-10 w-auto object-contain"
          style="filter: brightness(0) invert(1) sepia(0.18) brightness(0.96);"
        />
      </a>

      <!-- Hamburger (mobile only) — always just opens -->
      <button
        class="md:hidden relative z-[60] flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
        @click="toggleMenu"
        aria-label="Otwórz menu"
      >
        <span class="block w-6 h-px bg-white transition-all duration-300" />
        <span class="block w-6 h-px bg-white transition-all duration-300" />
        <span class="block w-4 h-px bg-white transition-all duration-300 self-end" />
      </button>

      <!-- Mobile fullscreen menu -->
      <Teleport to="body">
        <Transition name="menu-fade">
          <div v-if="menuOpen" class="menu-overlay md:hidden">

            <!-- Background: ken-burns photo -->
            <div class="menu-bg" style="background-image: url('/images/solina2.avif')" />
            <!-- Vignette: tylko krawędzie dla głębi, bez zabijania zdjęcia -->
            <div class="menu-vignette" />

            <!-- Close -->
            <button @click="closeMenu" class="menu-close" aria-label="Zamknij menu">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </button>

            <!-- Logo top-left -->
            <a href="/" @click="closeMenu" class="menu-logo menu-item" style="--i:0">
              <img src="/images/logonew.png" alt="Przystań Caryńska" style="filter: brightness(0) invert(1) sepia(0.18) brightness(0.96);" />
            </a>

            <!-- Nav links -->
            <nav class="menu-links">
              <template v-for="(link, idx) in nav.links" :key="link.label">

                <!-- With children -->
                <div v-if="link.children" class="menu-item" :style="`--i: ${idx + 1}`">
                  <button class="menu-link" @click="toggleDropdown(link.label)">
                    <span class="menu-num">0{{ idx + 1 }}</span>
                    <span class="menu-link-text">{{ link.label }}</span>
                    <svg
                      class="menu-chevron"
                      :class="{ 'rotate-180': openDropdown === link.label }"
                      viewBox="0 0 10 6" fill="none"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
                    </svg>
                  </button>
                  <Transition name="accordion">
                    <div v-if="openDropdown === link.label" class="menu-children">
                      <a
                        v-for="child in link.children"
                        :key="child.label"
                        :href="child.href"
                        :target="child.external ? '_blank' : undefined"
                        :rel="child.external ? 'noopener' : undefined"
                        @click="closeMenu"
                        class="menu-child"
                      >
                        {{ child.label }}
                        <span v-if="child.subtitle" class="menu-child-sub">{{ child.subtitle }}</span>
                      </a>
                    </div>
                  </Transition>
                </div>

                <!-- Simple link -->
                <div v-else class="menu-item" :style="`--i: ${idx + 1}`">
                  <a :href="link.href" @click="closeMenu" class="menu-link">
                    <span class="menu-num">0{{ idx + 1 }}</span>
                    <span class="menu-link-text">{{ link.label }}</span>
                  </a>
                </div>

              </template>
            </nav>

            <!-- Footer -->
            <footer class="menu-footer menu-item" :style="`--i: ${nav.links.length + 2}`">
              <p class="menu-tagline">Luksus w sercu Bieszczad</p>
              <a
                :href="nav.cta.href"
                target="_blank" rel="noopener"
                @click="closeMenu"
                class="menu-cta"
              >
                {{ nav.cta.label }}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </footer>

          </div>
        </Transition>
      </Teleport>

      <!-- Links (desktop only) -->
      <div class="hidden md:flex items-center gap-8">
        <div
          v-for="link in nav.links"
          :key="link.label"
          class="relative group"
        >
          <!-- Top-level link -->
          <a
            :href="link.href"
            class="flex items-center gap-1 text-white/70 hover:text-white text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 font-sans py-2"
          >
            {{ link.label }}
            <svg
              v-if="link.children"
              class="w-2.5 h-2.5 opacity-50 transition-transform duration-200 group-hover:rotate-180"
              viewBox="0 0 10 6" fill="none"
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </a>

          <!-- Dropdown -->
          <div
            v-if="link.children"
            class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200"
          >
            <div class="bg-forest/97 backdrop-blur-md border border-gold/20 py-2 min-w-[200px] shadow-2xl">
              <a
                v-for="child in link.children"
                :key="child.label"
                :href="child.href"
                :target="child.external ? '_blank' : undefined"
                :rel="child.external ? 'noopener' : undefined"
                class="block px-5 py-2.5 hover:bg-white/5 transition-colors duration-150 whitespace-nowrap"
              >
                <span class="text-white/60 hover:text-gold text-[11px] tracking-[0.15em] uppercase font-sans">{{ child.label }}</span>
                <span v-if="child.subtitle" class="block text-gold/70 text-[11px] tracking-[0.08em] mt-0.5 font-sans normal-case">{{ child.subtitle }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <a
          :href="nav.cta.href"
          target="_blank"
          rel="noopener"
          class="border border-gold text-gold hover:bg-gold hover:text-forest transition-all duration-300 px-5 py-2 text-[11px] tracking-[0.18em] uppercase font-sans"
        >
          {{ nav.cta.label }}
        </a>
      </div>

    </div>
  </nav>
</template>

<style scoped>
/* ── Overlay shell ── */
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  padding: 28px 32px 36px 18px;
  overflow: hidden;
  gap: 0;
}

/* ── Background ── */
.menu-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 30%;
  animation: menu-kb 20s ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes menu-kb {
  0%   { transform: scale(1.0) translate(0%, 0%); }
  100% { transform: scale(1.14) translate(-3%, -2%); }
}

/* Subtelna wineta — ciemne krawędzie, środek otwarty */
.menu-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 40%,
    rgba(10, 16, 10, 0.55) 100%
  );
  pointer-events: none;
}

/* ── Close ── */
.menu-close {
  position: absolute;
  top: 24px;
  right: 28px;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
  filter: drop-shadow(0 1px 6px rgba(0,0,0,0.7));
  border-radius: 0;
}
.menu-close:hover { color: #fff; }

/* ── Logo ── */
.menu-logo {
  position: relative;
  z-index: 10;
  grid-row: 1;
  padding-bottom: 40px;
}
.menu-logo img {
  height: 28px;
  width: auto;
  object-fit: contain;
}

/* ── Links ── */
.menu-links {
  position: relative;
  z-index: 10;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}
.menu-links::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: rgba(201, 169, 110, 0.25);
}

/* ── Stagger animation ── */
.menu-item {
  opacity: 0;
  animation: menu-slide-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i) * 0.08s);
}

@keyframes menu-slide-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Single link row ── */
.menu-link {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 10px 0;
  color: rgba(245, 237, 214, 0.9);
  transition: color 0.2s ease;
  width: 100%;
  text-align: left;
  cursor: pointer;
  background: none;
  border: none;
}
.menu-link:hover { color: #fff; }
.menu-link:hover .menu-link-text {
  letter-spacing: 0.01em;
}

.menu-num {
  font-family: 'Raleway', sans-serif;
  font-size: 8.5px;
  letter-spacing: 0.22em;
  color: rgba(201, 169, 110, 0.85);
  flex-shrink: 0;
  line-height: 1;
  padding-bottom: 2px;
  text-shadow: 0 1px 8px rgba(0,0,0,0.9);
}

.menu-link-text {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 9vw, 3.2rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1;
  letter-spacing: 0.02em;
  transition: letter-spacing 0.3s ease;
  text-shadow: 0 2px 16px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9);
}

.menu-chevron {
  width: 12px;
  height: 12px;
  color: rgba(201, 169, 110, 0.4);
  margin-left: auto;
  flex-shrink: 0;
  transition: transform 0.25s ease;
  align-self: center;
}

/* ── Sub-links ── */
.menu-children {
  display: flex;
  flex-direction: column;
  padding: 8px 14px 12px;
  gap: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  background: rgba(14, 20, 14, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(201, 169, 110, 0.15);
  border-left: 2px solid rgba(201, 169, 110, 0.35);
}

.menu-child {
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245, 237, 214, 0.75);
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: color 0.2s;
  text-shadow: 0 1px 10px rgba(0,0,0,0.95), 0 2px 20px rgba(0,0,0,0.8);
}
.menu-child:hover { color: #C9A96E; }

.menu-child-sub {
  display: block;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: rgba(201, 169, 110, 0.65);
  margin-top: 2px;
  text-shadow: 0 1px 8px rgba(0,0,0,0.9);
}

/* ── Accordion ── */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.25s ease;
  max-height: 300px;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

/* ── Footer ── */
.menu-footer {
  position: relative;
  z-index: 10;
  grid-row: 3;
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-tagline {
  font-family: 'Raleway', sans-serif;
  font-size: 8px;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: rgba(201, 169, 110, 0.7);
  text-align: center;
  text-shadow: 0 1px 8px rgba(0,0,0,0.9);
}

.menu-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  border: 1px solid rgba(201, 169, 110, 0.6);
  background: rgba(22, 32, 22, 0.55);
  backdrop-filter: blur(8px);
  color: #C9A96E;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s;
}
.menu-cta:hover {
  background: #C9A96E;
  color: #162016;
  border-color: #C9A96E;
}

/* ── Menu entrance ── */
.menu-fade-enter-active {
  transition: opacity 0.4s ease;
}
.menu-fade-leave-active {
  transition: opacity 0.25s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>
