


console.log("my_ts_test")


interface objInterface {
  a: string,
  b: number,
  myAlert: Function, //函数约束的方式1
  myAlert2(payload: string): void, //函数的约束方式2
}

// 接口继承接口使用extends
interface obj2Interface extends Partial<objInterface> {

  six: string

}

// type 使用联合方式继承接口
type abcType = objInterface & { c: Array<any> }

//class 用implements 实现接口
class abcCls implements objInterface {
  a: string = "";
  b: number = 0;
  static c: string = ""; //静态属性

  private d: string = ""; //私有属性，只能被子类调用,不能实例使用

  public e: string = ""; //公共属性，可以子类使用，实例使用

  myAlert() {

  }
  myAlert2(payload: string) {
    console.log(payload)
  }
}

abstract class abcCls2 {
  eat() {
    console.log("eat")
  }
  abstract eat2(): void; //抽象方法，父类不用实现，子类需要实现
}

class abcCls3 extends abcCls2 {

  eat2() {
    console.log("eat2")
  }

}

const abcCls3Demo = new abcCls3;

abcCls3Demo.eat() //可以调用到抽象类中的方法



