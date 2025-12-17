<template>
  <div class="text-center">
    <v-snackbar v-model="showSnackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    snackbar: Boolean,
    text: String,
  },

  emits: ['update:snackbar'],

  computed: {
    showSnackbar: {
      get() {
        return this.snackbar
      },
      set(val) {
        this.$emit('update:snackbar', val)
      },
    },
  },

  data() {
    return { timeout: 2000 }
  },
}
</script>
