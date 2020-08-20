import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';
import { route, routeProps } from '../utils/router';
import Badge from '../badge';

const [createComponent, bem] = createNamespace('sidebar-item');

export default createComponent({
  mixins: [ChildrenMixin('vanSidebar')],

  emits: ['click'],

  props: {
    ...routeProps,
    dot: Boolean,
    badge: [Number, String],
    title: String,
    disabled: Boolean,
  },

  computed: {
    select() {
      return this.index === +this.parent.modelValue;
    },
  },

  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }

      this.$emit('click', this.index);
      this.parent.$emit('update:modelValue', this.index);
      this.parent.setIndex(this.index);
      route(this.$router, this);
    },
  },

  render() {
    return (
      <a
        class={bem({ select: this.select, disabled: this.disabled })}
        onClick={this.onClick}
      >
        <div class={bem('text')}>
          {this.title}
          <Badge dot={this.dot} badge={this.badge} class={bem('badge')} />
        </div>
      </a>
    );
  },
});
