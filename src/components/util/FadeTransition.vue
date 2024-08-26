<template>
  <Transition name="fade" appear>
    <slot></slot>
  </Transition>
</template>

<style>
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
