
import { reactive, ref, onMounted } from "vue"
import delay from "lodash/delay"

export function myAbcHook(val: number) {
  type aTwoType = {
    a: string,
    b: unknown
  }
  let aTwo = reactive<aTwoType>({
    a: 'sfsdfs',
    b: 'sdfsdfsf' as string
  })

  let aOne = ref(val)

  onMounted(() => {
    delay(() => {
      console.log("delay")
      aOne.value = 366666  //成功改变数据到视图

      console.log(aOne.value, "aone")

      aTwo.a = "修改reactive 对象在hooks中"

    }, 1000)
  })

  //要返回整个ref才能是响应式，返回.value 只是读取ref的值而已
  return {
    aTwo,
    aOne
  }
}


