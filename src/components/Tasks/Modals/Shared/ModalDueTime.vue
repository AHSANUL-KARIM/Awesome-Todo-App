<template>
              <div
                class="row q-mb-sm">
                <q-input
                  outlined
                  clearable
                  label="Due Time"
                  class="col"
                  :value="dueTime"
                  @input="$emit('update:dueTime', $event)"
                  >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-time
                          :value="dueTime"
                          @input="$emit('update:dueTime', $event)"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
</template>

<script>
export default {

  props: ['dueTime']
}
</script>
