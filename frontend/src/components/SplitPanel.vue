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
      v-show="leftPanel"
      ref="leftResizer"
      class="gutter"
    />
    <div
      ref="panel"
      class="right-panel"
    >
      <div class="flex">
        <div class="nav-bar" v-show="navigationBar">
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
    <div
      v-show="rightPanel"
      ref="rightResizer"
      class="gutter gutter-right"
    />
    <div
      v-show="rightPanel && rightPanelShow"
      ref="rightSidePanel"
      class="right-side-panel"
      style="overflow:auto"
    >
      <slot name="rightSidePanel" />
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
    dragging: false,
    rightPanelShow: true
  }),
  computed: {
    slots() {
      return this.$slots;
    },
    leftPanel() {
      return !!this.slots.leftPanel;
    },
    rightPanel() {
      return !!this.slots.rightSidePanel;
    },
    navigationBar(){
      return !!this.slots.navigationBar
    }
  },
  watch: {
    async $route() {
      await this.$nextTick();
      this.$refs.panel.style.width = (document.body.scrollWidth - this.$refs.leftPanel.clientWidth - this.$refs.rightSidePanel.clientWidth) + 'px';
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
      const rightPanel = this.$refs.rightSidePanel;
      const rightResizer = this.$refs.rightResizer;

      panel.style.width = (document.body.scrollWidth - leftPanel.clientWidth - rightPanel.clientWidth) + 'px';

      const resize = (e) => {
        document.body.style.cursor = 'e-resize';
        const f = document.body.scrollWidth - leftPanel.clientWidth - rightPanel.clientWidth;
        panel.style.width = f + 'px';
      };

      const resizeLeft = (e) => {
        document.body.style.cursor = 'e-resize';
        const f = e.clientX;
        leftPanel.style.width = f + 'px';
      };

      const resizeRight = (e) => {
        document.body.style.cursor = 'e-resize';
        const f = document.body.scrollWidth - e.clientX;
        rightPanel.style.width = f + 'px';
      };

      leftResizer.addEventListener('dblclick', () => {
        this.panel = !this.panel;
      });
      rightResizer.addEventListener('dblclick', () => {
        this.rightPanelShow = !this.rightPanelShow;
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

      rightResizer.addEventListener(
        'mousedown',
        (e) => {
          e.preventDefault();
          document.addEventListener('mousemove', resizeRight, false);
          document.addEventListener('mousemove', resize, false);
        },
        false
      );

      window.addEventListener('resize', resize);

      document.addEventListener('mouseup', () => {
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', resize, false);
        document.removeEventListener('mousemove', resizeLeft, false);
        document.removeEventListener('mousemove', resizeRight, false);
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
  }
  .gutter-right{
    margin-right: -16px;
    z-index: 99;
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
      /*width:70%;*/
      overflow:hidden;
      /*flex-grow:1;*/
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
      width: 300px;
      max-height: 100%;
      border-right: solid 1px #e7edf1;
  }

  .right-side-panel{
      background-color:#f8fafb;
      position: relative;
      height:100%;
      min-width:100px;
      padding: 0;
      margin: 0;
      overflow-y: auto;
      overflow-x: hidden;
      width: 500px;
      max-height: 100%;
      border-left: solid 1px #e7edf1;
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
