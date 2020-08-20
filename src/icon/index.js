import { addUnit, createNamespace } from '../utils';
import Badge from '../badge';

const [createComponent, bem] = createNamespace('icon');

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

export default createComponent({
  props: {
    dot: Boolean,
    name: String,
    size: [Number, String],
    badge: [Number, String],
    color: String,
    tag: {
      type: String,
      default: 'i',
    },
    classPrefix: {
      type: String,
      default: bem(),
    },
  },

  render() {
    const { name } = this;
    const imageIcon = isImage(name);

    return (
      <this.tag
        class={[
          this.classPrefix,
          imageIcon ? '' : `${this.classPrefix}-${name}`,
        ]}
        style={{
          color: this.color,
          fontSize: addUnit(this.size),
        }}
      >
        {this.$slots.default?.()}
        {imageIcon && <img class={bem('image')} src={name} />}
        <Badge dot={this.dot} badge={this.badge} />
      </this.tag>
    );
  },
});
