<template>
  <div class="home">
    <div>
      fone:{{ fone }}
    </div>


    <div>
      ftwo:{{ ftwo }}
    </div>

    <div>
      ffour:{{ ffour }}
    </div>

    <div>
      ffive:{{ ffive }}
    </div>
    <HelloWorld @toFatherThing="getChildThing" msg="Welcome to Your Vue.js + TypeScript App" v-model="fsix" />
    <div>
      fsix:{{ fsix }}
    </div>


    <div>
      feight:{{ feight }}

      <div>feight循环测试</div>
      <ul>
        <li v-for="item in feight">{{ item.name }}</li>
      </ul>
    </div>

    <div>ften:{{ ften }}</div>


    <div>aOne:{{ aOne }}</div>
    <div>aTwo:{{ aTwo }}</div>

    <!-- 成功渲染render子组件 -->
    <MyRender msg="msg" msg2="msg2" />



    <div>store_name：{{ homeStore.name }}</div>
    <div>
      store：{{ homeStore }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from "../components/HelloWorld"
import MyRender from "../components/myRender"
import "./mytsTest"
import "./mytsabc"
import { onUpdated, onMounted, onBeforeUnmount, onUnmounted, onBeforeMount, computed, watchEffect, watch, ref, unref, reactive, shallowRef, shallowReactive, defineComponent, defineOptions, toRefs } from "vue"

import { myAbcHook } from "./homeHook"

import useHomeStore from "./homeStore"


/** pinia store测试 */

const homeStore = useHomeStore() //这里本质上就是返回一个proxy代理对象

console.log(homeStore, "homeStore")

let { name, num } = homeStore;
console.log(name, num, "store_name_num")
name = "sldfsjkldfsdf" //尝试能不能解构后的变量修改到store里面的name 

homeStore.consoleName() //store里面的name还是空，说明上面的解构name是重新一个内存记录store的name的，所以无法直接修改。

homeStore.setName() //store actions调用方式

homeStore.consoleName()

homeStore.setAobj({ key: 'a', value: "sdlfkjsdlfjslfd" }) //设置store里面的对象，可以修改成功

setTimeout(() => {
  homeStore.setBarr()
  setTimeout(() => {
    homeStore.barr[0].a.b.d = "修改成功" //可以新增多层对象下的属性成功，说明store proxy对象默认也是深度监听

    setTimeout(() => {
      // homeStore.$reset() //reset成功，可以重置数据
    }, 2000)
  }, 2000)
}, 3000)


console.log(homeStore.$state, "获取整个store的state")

homeStore.$patch(state => {
  state.name = "patch 修改state数据"
}) //成功修改，说明$patch 也可以修改数据


// store 中action监听
homeStore.$onAction(({ name, after }) => {
  console.log(name, "actionName") //可以监听到异步后的action
  //没有写after是在修改好state数据就开始执行

  //after 在完全执行完action后观察者的操作后执行
  after((result) => {
    console.log(result, "result")
  })
})



//定义组件的一些配置
defineOptions({
  name: 'Home'
})


/** ref reactive 测试 */

//ref 定义基本数据类型
const foneRef = ref('slkfjsklfdjskfd')

const fone = unref(foneRef) //获取ref的value

const ftwo = reactive({
  a: {
    b: {
      c: 'sdlfjslfkjsdf'
    }
  },
  a2: "sldfkjsklfjslkfj"
})

setTimeout(() => {
  ftwo.a.b.c = "3424234242342423"
  // ftwo.a2="slkfjlskdjflksfd"
}, 1000);

// watchEffect(()=>{
//    console.log(ftwo.a2,"ftwo-effect")  
// })

// watchEffect(()=>{
//    console.log(ftwo,"ftwo-ccc-effect")  
// })

watchEffect(() => {
  console.log(ftwo.a.b.c, "ftwo-abc-effect")  //可以监听到，说明watchEffect实现了深度监听
})


let fthree = toRefs(ftwo)

console.log(ftwo, "ftwo") //proxy 代理对象
console.log(fthree, "fthree") //返回一个对象，使用对象属性都通过ref实现监听


const ffourSref = shallowRef({
  a: {
    b: {
      c: 'sdkflsjdflkjsfd'
    }
  },
  a2: "before"
})

let ffour = unref(ffourSref)

setTimeout(() => {
  ffour.a.b.c = "changed"  //页面渲染没变，说明shallowRef不是深度监听

  ffour.a2 = "now" //也无法改变说明shallowRef只能监听基本的数据类型

}, 1000)


let ffive = shallowReactive({ //浅监听，只对第一层的引用类型进行监听
  a: {
    b: {
      c: "sdfkjsldsfjsdf"
    }
  },
  a2: "slkfjslksdf"
})

setTimeout(() => {
  ffive.a.b.c = "cccccc"//无法改变，说明shallowReactive 只能监听到直接的引用类型第一层
  // ffive.a2="now"
}, 1000)


let fsix = ref<string>()


function getChildThing(val:any) {
  console.log(val, "val") //获取子组件事件传过来的值
}


let feight = reactive<Array<any>>([{
  id: 0,
  name: 'sfksjdf'
}, {
  id: 1,
  name: 'neuvodsksf'
}, {
  id: 2,
  b: {
    c: {
      d: 2342342
    }
  }
}])

setTimeout(() => {
  // feight[1].name="now"
  feight[2].b.c.d = 4056805468049
}, 1000)

/** watch wactchEffect computed 测试
 * 
 * watch 需要指定watch的变量，可以多个，可以停止watch
 * 
 * watchEffect 不用指定，注重过程，函数里面的ref reactive变量有修改就会自动执行，可以停止
 * 
 * computed 类似watchEffect ，但是最终需要返回一个值，注重结果，且有缓存
 */
watchEffect(() => {
  console.log(feight, "feight_sdfklsjdflsf") //上面的更改也监听到了，说明watchEffect 对数组也是深度监听
})

const stopWatch = watch(feight, () => {
  console.log(feight, "feight监听")
})

setTimeout(() => {
  //停止监听方法
  stopWatch(); //成功停止了监听
  feight[2].b.c.d = 8989898989898 //修改成功，dom重新渲染
}, 6000)

let wone = ref('ksjldfkjsfd')

setTimeout(() => {
  wone.value = "34234242"
}, 1000)

watch(wone, (value, old) => {
  console.log(value, "wone") //直接获取到值
})

watchEffect(() => {
  console.log(wone, "effect")
  console.log(wone.value, "effect") //这样才能打印出来，这样才能监听到
})

let cone = computed(() => {
  return wone.value
})

console.log(cone, "cone")
console.log(cone.value, "cone_value") //类似ref需要通过value访问

/** v3 生命周期测试 */
onBeforeMount(() => {
  console.log('onBeforeMount')
})
onMounted(() => {
  console.log('onMounted')
})
onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})
onUnmounted(() => {
  console.log('onUnmounted')
})

let ften = ref(11111)
onUpdated(() => {
  console.log("onUpdated") //在数据都更新到dom之后才执行,说明是异步的任务
})

setTimeout(() => {
  ften.value = 2222   //这里修改后，dom执行完成后会再次触发onUpdated
}, 3000)


//测试自定义hooks使用,自定义hook类似utils功能，都是hook可以通用组件的钩子和生命周期等
let { aOne, aTwo } = myAbcHook(9999)


</script>

<style lang="scss">
.home {
  width: 50vw;
  position: relative;
  margin: 0 auto;
}
</style>
