<template>
   <q-card>

        <modal-header>Edit Task</modal-header>

        <form @submit.prevent="submitForm">
            <q-card-section>

              <modal-task-name
                :name.sync="taskToSubmit.name"
                ref="modalTaskName"
               />

              <modal-due-date :dueDate.sync="taskToSubmit.dueDate" />

             <modal-due-time
              :dueTime.sync="taskToSubmit.dueTime"
              v-if="taskToSubmit.dueDate" />

          </q-card-section>

          <modal-buttons></modal-buttons>

          <pre>{{taskToSubmit}}</pre>
        </form>


      </q-card>
</template>

<script>

  import {mapActions} from 'vuex';
  import mixinAddEditTask from '../../../mixins/mixin-add-edit-task'


export default {

  mixins: [mixinAddEditTask],
  props: ['task', 'id'],
  data() {
    return {
      taskToSubmit: {}
    }
  },

  methods: {
    ...mapActions('tasks', ['updateTask']),

    submitTask(){
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit('close');
    }

  },
  components: {
    'modal-header': require('components/Tasks/Modals/Shared/ModalHeader.vue').default,
    'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName.vue').default,
    'modal-due-date': require('components/Tasks/Modals/Shared/ModalDueDate.vue').default,
    'modal-due-time': require('components/Tasks/Modals/Shared/ModalDueTime.vue').default,
    'modal-buttons': require('components/Tasks/Modals/Shared/ModalButtons.vue').default


  },
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>
