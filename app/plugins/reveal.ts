export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() { return {} },
    mounted(el, binding) {
      const delay = binding.value?.delay ?? 0
      el.style.transitionDelay = `${delay}ms`
      el.classList.add('will-reveal')

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed')
            observer.disconnect()
          }
        },
        { threshold: 0.12 }
      )
      observer.observe(el)
    },
  })
})
