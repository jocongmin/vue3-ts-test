import { defineStore } from "pinia"

interface stateInterface {
  name: string,
  num: number,
  aobj: {  //对象键值约束定义方式
    [key: string]: string | number | boolean | object
  },
  barr: Array<any>
}

interface aobjInterface {
  key: string,
  value: any
}


const store= defineStore('homeStore', {
  state: (): stateInterface => {
    return {
      name: '',
      num: 1,
      aobj: {},
      barr: []
    }
  },
  actions: {
    setName(payload?: string) {
      this.name = payload || "slkfjslkffd"
    },
    consoleName() {
      console.log(this.name, "this_name")
    },
    setAobj(payload: aobjInterface) {
      console.log(this.aobj, "aobj")
      // Object.defineProperty(this.aobj, payload.key, {value:payload.value})
      this.aobj[payload.key] = payload.value
    },
    setBarr() {
      this.barr.push({
        a: {
          b: {
            c: 'sdlfjsfjslkdf'
          }
        }
      })
    }
  },
  getters: {

  }
})


export default store

