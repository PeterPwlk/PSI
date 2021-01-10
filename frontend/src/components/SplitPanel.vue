<template>
  <div class="split-container">
    <transition name="slide-fade">
      <div
        v-show="leftPanel && panel"
        ref="leftPanel"
        class="left-panel"
        style="overflow:auto"
      >
        <slot name="leftPanel" />
      </div>
    </transition>
    <div
      ref="panel"
      class="right-panel"
    >
      <div
        v-show="leftPanel"
        ref="leftResizer"
        class="gutter"
      />
      <div class="flex">
        <div class="nav-bar">
          <slot name="navigationBar" />
        </div>
        <div class="right-slot">
          <slot name="rightPanel" />
        </div>
        <div class="secondary-footer">
          <slot name="secondaryFooter" />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Footer from './Footer';
export default {
  name: 'SplitPanel',
  components: {
    Footer
  },
  props: {
  },
  data: () => ({
    panel: true,
    dragging: false
  }),
  computed: {
    slots() {
      return this.$slots;
    },
    leftPanel() {
      return !!this.slots.leftPanel;
    }
  },
  mounted() {
    this.setEvents();
  },
  methods: {
    startDrag() {
      this.dragging = true;
    },

    setEvents() {
      const panel = this.$refs.panel;
      const leftResizer = this.$refs.leftResizer;
      const leftPanel = this.$refs.leftPanel;

      panel.style.width = (document.body.scrollWidth - leftPanel.style.width) + 'px';

      const resize = (e) => {
        document.body.style.cursor = 'e-resize';
        const f = document.body.scrollWidth - e.clientX;
        panel.style.width = f + 'px';
      };

      const resizeLeft = (e) => {
        document.body.style.cursor = 'e-resize';
        const f = e.clientX;
        leftPanel.style.width = f + 'px';
      };

      leftResizer.addEventListener('dblclick', () => {
        this.panel = !this.panel;
      });

      leftResizer.addEventListener(
        'mousedown',
        (e) => {
          e.preventDefault();
          document.addEventListener('mousemove', resizeLeft, false);
          document.addEventListener('mousemove', resize, false);
        },
        false
      );
      document.addEventListener('mouseup', () => {
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', resize, false);
        document.removeEventListener('mousemove', resizeLeft, false);
      }, false);
    }
  }

};
</script>

<style scoped>
  .table{
      width:auto;
  }
  .gutter{
      height: 100%;
      width: 16px;
      background-color: transparent;
      min-width: 16px;
      position:absolute;
  }
  .gutter:hover{
      cursor: e-resize;
  }
  .right-panel{
      height:100%;
      min-width:30%;
      position: relative;
      padding: 0;
      margin:0;
      max-height: 100%;
      width:70%;
      overflow:hidden;
      flex-grow:1;
  }

  .left-panel{
      background-color:#f8fafb;
      position: relative;
      height:100%;
      min-width:100px;
      padding: 0;
      margin: 0;
      overflow-y: auto;
      overflow-x: hidden;
      width:30%;
      max-height: 100%;
      border-right: solid 1px #e7edf1;
  }

  .split-container{
      height:100%;
      width:100%;
      display:flex;
      padding: 56px 0 0;
      margin:0;
      position:absolute;
      max-height:100%;
  }
  .right-slot{
    padding-left: 16px;
    overflow: auto;
    height:100%;
  }
  .flex{
    flex-direction: column;
    display:flex;
    height:100%;
    width:100%;
  }
  .secondary-footer{
    width:100%;
  }
  .nav-bar{
    width: 100%;
    height: 50px;
  }
</style>
