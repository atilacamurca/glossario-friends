<template>
  <a
    class="flex"
    href="#"
    @click.prevent="showShareWindow"
  >
    <facebook-icon></facebook-icon>
    <span
      class="hidden md:flex ml-1"
      v-if="this.$props.title_social"
    >
      {{ title_social }}
    </span>
  </a>
</template>

<script>
import { clickEvent } from "./helpers/events"
import { openPopUpWindow } from "./helpers/popup_window"

export default {
  name: 'FacebookButton',
  props: {
    page_url: {
      type: String,
      required: true
    },
    page_title: {
      type: String,
      required: true
    },
    title_social: {
      type: String,
      default: 'Facebook'
    }
  },
  methods: {
    /**
     * Show share window.
     *
     * @return {object} a pop-up window
     */
    showShareWindow: function () {
      // Variables
      const width = 640;
      const height = 480;
      const share_url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.$props.page_url
      )}`;
      // onClick event
      clickEvent(this, "facebook");
      return openPopUpWindow(share_url, width, height);
    }
  }
}
</script>
