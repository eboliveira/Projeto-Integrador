<template>
    <v-dialog
      v-model="dialog"
      v-bind:width="widthModal ? widthModal: 500"
    >
      <v-btn
        slot = "activator"
        v-bind:color ="btnColor"
        dark
      >
        {{btnTitle}}
      </v-btn>

      <v-card>
        <v-card-title
          v-bind:class="headerColor"
          primary-title
        >
          {{headerTitle}}
        </v-card-title>

        <div v-for="components in componentsBody">
          <component is="components"></component>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
      widthModal: String,
      btnTitle: String,
      btnColor: String,
      headerColor: String,
      headerTitle: String,
      componentsBody: Array
    },
    data: () => ({
        dialog: false
    }),
  
}
    
</script>