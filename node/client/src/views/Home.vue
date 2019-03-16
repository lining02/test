<template>
  <div class="home">
    <SmallHeader></SmallHeader>
  </div>
</template>

<script>
import SmallHeader from '@/components/SmallHeader.vue'
import LargeHeader from '@/components/LargeHeader.vue'

export default {
  name: 'home',
  components: {
    SmallHeader, LargeHeader
  }
}
</script>
