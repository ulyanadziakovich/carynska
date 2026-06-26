<script setup lang="ts">
const props = defineProps<{
  variant: 'hero' | 'fab'
}>()

const open = ref(false)
const menuEl = ref<HTMLElement | null>(null)

const phones = [
  { tag: 'Rezerwacje', label: 'Noclegi', number: '+48 691 944 266' },
  { tag: 'Restauracja', label: 'Tawerna', number: '+48 514 177 136' },
  { tag: 'Przystań', label: 'Bosmanat', number: '+48 536 700 537' },
]

function toggle() { open.value = !open.value }

function onClickOutside(e: MouseEvent) {
  if (menuEl.value && !menuEl.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="menuEl" class="call-wrap" :class="`call-wrap--${variant}`">
    <button
      type="button"
      class="call-btn"
      :class="`call-btn--${variant}`"
      @click.stop="toggle"
      aria-label="Zadzwoń do nas"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 9.11a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
      Zadzwoń do nas
    </button>

    <Transition name="pop">
      <div v-if="open" class="call-menu" :class="`call-menu--${variant}`">
        <p class="call-menu__hint">Wybierz dział</p>
        <a
          v-for="p in phones"
          :key="p.number"
          :href="`tel:${p.number.replace(/\s/g, '')}`"
          class="call-menu__item"
          @click="open = false"
        >
          <span class="call-menu__item-left">
            <span class="call-menu__tag">{{ p.tag }}</span>
            <span class="call-menu__label">{{ p.label }}</span>
          </span>
          <span class="call-menu__number">{{ p.number }}</span>
        </a>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.call-wrap {
  position: relative;
  display: inline-block;
}

/* ── Hero variant ── */
.call-btn--hero {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 2rem;
  background: #C9A96E;
  color: #162016;
  padding: 0.9rem 2rem;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.35);
  transition: background 0.25s, transform 0.2s;
}
.call-btn--hero:hover { background: #b8914f; transform: translateY(-2px); }

/* ── FAB variant ── */
.call-wrap--fab {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 50;
}
.call-btn--fab {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #C9A96E;
  color: #162016;
  padding: 0.8rem 1.4rem 0.8rem 1.1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 1px 4px rgba(0,0,0,0.15);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.call-btn--fab:hover {
  background: #b8914f;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

/* ── Dropdown menu ── */
.call-menu {
  position: absolute;
  bottom: calc(100% + 0.75rem);
  right: 0;
  background: #162016;
  border: 1px solid rgba(201,169,110,0.25);
  min-width: 280px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5);
  z-index: 60;
}
.call-menu--hero {
  bottom: calc(100% + 0.75rem);
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}
.call-menu__hint {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(201,169,110,0.5);
  padding: 0.85rem 1.1rem 0.5rem;
}
.call-menu__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  text-decoration: none;
  transition: background 0.15s;
}
.call-menu__item:hover { background: rgba(201,169,110,0.08); }
.call-menu__item-left {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.call-menu__tag {
  font-family: 'Raleway', sans-serif;
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(201,169,110,0.5);
}
.call-menu__label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  font-weight: 300;
  color: #F2E8D0;
}
.call-menu__number {
  font-family: 'Raleway', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #C9A96E;
  white-space: nowrap;
}

/* ── Transition ── */
.pop-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.pop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(6px); }
</style>
