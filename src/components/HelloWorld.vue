<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <div>
      <input type="text" v-model="model">
    </div>

    <div>
      <button @click="fn1">child btn</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, shallowRef, shallowReactive, defineComponent, defineOptions, toRefs, defineEmits, defineModel } from "vue"


defineProps<{
  msg: string,
  value: string
}>()

const model = defineModel() //vue3 vmodel实现方式


const emit = defineEmits(['toFatherThing']) //emit 实现


let val = 0
function fn1() {
  emit('toFatherThing', val++)
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
