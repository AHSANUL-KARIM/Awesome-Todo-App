<template>
   <q-input
     outlined
     v-model="searchField"
     @keyup.esc="searchField = ''"
     v-select-all
     class="col"
     label="Search">

        <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>


  </q-input>

</template>

<script>

  import {mapState, mapActions} from 'vuex'
 import { selectAll } from 'src/directives/directive-select-all'
  export default {

    computed: {
      ...mapState('tasks', ['search']),
      searchField: {
        get() {
          return this.search
        },

        set(value) {
          this.setSearch(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', ['setSearch'])
    },
    directives: {
      selectAll
    }
  }
</script>
