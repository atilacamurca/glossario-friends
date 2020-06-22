<template>
  <a
    class="flex"
    href="#"
    @click.prevent="showShareWindow"
  >
    <twitter-icon></twitter-icon>
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
  name: 'TwitterButton',
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
      default: 'Twitter'
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
      const share_url = `https://twitter.com/share?url=${encodeURIComponent(
        this.$props.page_url
      )}&text=${encodeURIComponent(this.$props.page_title)}`;
      // onClick event
      clickEvent(this, "twitter");
      return openPopUpWindow(share_url, width, height);
    }
  }
}
</script>
