// Utils
import { createNamespace, isDef } from '../utils';

// Components
import Popup, { popupSharedProps } from '../popup';

const PRESET_ICONS = ['qq', 'weibo', 'wechat', 'link', 'qrcode', 'poster'];

const [createComponent, bem, t] = createNamespace('share-sheet');

export default createComponent({
  props: {
    ...popupSharedProps,
    title: String,
    duration: [Number, String],
    cancelText: String,
    description: String,
    getContainer: [String, Function],
    options: {
      type: Array,
      default: () => [],
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['cancel', 'select', 'update:show', 'click-overlay'],

  methods: {
    onCancel() {
      this.toggle(false);
      this.$emit('cancel');
    },

    onSelect(option, index) {
      this.$emit('select', option, index);
    },

    toggle(val) {
      this.$emit('update:show', val);
    },

    getIconURL(icon) {
      if (PRESET_ICONS.indexOf(icon) !== -1) {
        return `https://img.yzcdn.cn/vant/share-icon-${icon}.png`;
      }

      return icon;
    },

    genHeader() {
      const title = this.$slots.title ? this.$slots.title() : this.title;
      const description = this.$slots.description
        ? this.$slots.description()
        : this.description;

      if (!title && !description) {
        return;
      }

      return (
        <div class={bem('header')}>
          {title && <h2 class={bem('title')}>{title}</h2>}
          {description && <span class={bem('description')}>{description}</span>}
        </div>
      );
    },

    genOptions(options, showBorder) {
      return (
        <div class={bem('options', { border: showBorder })}>
          {options.map((option, index) => (
            <div
              role="button"
              tabindex="0"
              class={[bem('option'), option.className]}
              onClick={() => {
                this.onSelect(option, index);
              }}
            >
              <img src={this.getIconURL(option.icon)} class={bem('icon')} />
              {option.name && <span class={bem('name')}>{option.name}</span>}
              {option.description && (
                <span class={bem('option-description')}>
                  {option.description}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    },

    genRows() {
      const { options } = this;
      if (Array.isArray(options[0])) {
        return options.map((item, index) => this.genOptions(item, index !== 0));
      }
      return this.genOptions(options);
    },

    genCancelText() {
      const cancelText = isDef(this.cancelText) ? this.cancelText : t('cancel');

      if (cancelText) {
        return (
          <button type="button" class={bem('cancel')} onClick={this.onCancel}>
            {cancelText}
          </button>
        );
      }
    },

    onClickOverlay() {
      this.$emit('click-overlay');
    },
  },

  render() {
    return (
      <Popup
        round
        show={this.show}
        class={bem()}
        position="bottom"
        overlay={this.overlay}
        duration={this.duration}
        lazyRender={this.lazyRender}
        lockScroll={this.lockScroll}
        getContainer={this.getContainer}
        closeOnPopstate={this.closeOnPopstate}
        closeOnClickOverlay={this.closeOnClickOverlay}
        safeAreaInsetBottom={this.safeAreaInsetBottom}
        {...{
          'onUpdate:show': this.toggle,
          'onClick-overlay': this.onClickOverlay,
        }}
      >
        {this.genHeader()}
        {this.genRows()}
        {this.genCancelText()}
      </Popup>
    );
  },
});
