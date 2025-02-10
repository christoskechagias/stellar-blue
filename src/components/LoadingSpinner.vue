<template>
  <div class="flex flex-col items-center justify-center h-screen z-50">
    <div class="relative w-32 h-32">
      <img src="@/assets/bigCircle.png" alt="Big Circle" class="w-32 h-auto mb-4" />
      <img
        ref="smallCircle"
        src="@/assets/smallCircle.png"
        alt="Small Circle"
        class="smallCircle absolute top-1/2 left-1/2 w-5"
      />
    </div>
  </div>
</template>

<style>
.smallCircle {
  transform: translate(-50%, -50%);
  animation: smallCircle 4s linear infinite;
}

@keyframes smallCircle {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(60px);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(60px);
  }
}
</style>
