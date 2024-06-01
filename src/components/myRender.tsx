import { h, defineComponent } from "vue";
export default defineComponent({
  name: "MyRender",
  props: {
    msg: {
      type: String,
      default: "这是子组件render",
    },
  },
  setup(props, context) {
    const { msg } = props;

    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs);

    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots);

    // 触发事件（函数，等价于 $emit）
    console.log(context.emit);

    // 暴露公共属性（函数）
    console.log(context.expose);

    console.log(context, "context");
    console.log(context.attrs, "attrs"); //可以获取到组件标签的属性值，但是如果被props读取后，这个属性值就不会在attrs里面了，attrs是一个对象
    console.log(context.attrs.msg2, "msg2"); //可以打印到msg2这个属性值

    return {
      msg,
    };
  },
  render() {
    console.log(this.$props.msg, "props_msg"); //这里可以直接通过this访问到props slots
    return [h("div", this.msg)];
  },
});
