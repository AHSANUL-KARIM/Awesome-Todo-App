import Vue from 'vue'
import {uid} from 'quasar'
import {firebaseDb, firebaseAuth, } from 'boot/firebase'
import { ref, onChildAdded, onChildChanged, onChildRemoved, set, update, remove, get, child, onValue,  } from "firebase/database";

const state = {
    tasks: {
        // 'ID1': {
        //     name: 'Go to shop',
        //     completed: false,
        //     dueDate: '2019/05/12',
        //     dueTime: '18:30'
        // },
        // 'ID2': {
        //     name: 'Get bananas',
        //     completed: true,
        //     dueDate: '2019/05/13',
        //     dueTime: '14:00'
        // },
        // 'ID3': {
        //     name: 'Get apples',
        //     completed: false,
        //     dueDate: '2019/05/14',
        //     dueTime: '16:00'
        // }
    },
    search: '',
    sort: 'name',
    tasksDownloaded: false
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    console.log('delete id: ', id);
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value
  }
}

const actions = {
  updateTask({dispatch}, payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({dispatch}, id) {
    dispatch('fbDeleteTask', id);
  },
  addTask({dispatch}, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    dispatch('fbAddTask', payload)
  },
  clearTasks(state) {
    state.tasks = {}
  },
  setSearch({commit}, value) {
    commit('setSearch', value)
  },
  setSort({commit}, value) {
    commit('setSort', value)
  },
  fbReadData({commit}) {
    let userId = firebaseAuth.currentUser.uid
    console.log(userId)
    let userTasks = ref(firebaseDb, 'tasks/' + userId)

    onValue(userTasks, snapshot => {
      if(snapshot.exists) {
        console.log('exists')
        commit('setTasksDownloaded', true)
      }
    }, {
      onlyOnce: true
    })

    onChildAdded(userTasks, snapshot => {
      let task =snapshot.val()
      let payload = {
        id: snapshot.key,
        task: task
      }

      commit('addTask', payload)

    })

    onChildChanged(userTasks, snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task

      }
      commit('updateTask', payload)
    })

    onChildRemoved(userTasks, snapshot => {
      let taskId = snapshot.key
      commit('deleteTask', taskId)
    })

  },

  fbAddTask({}, payload) {

    let userId = firebaseAuth.currentUser.uid

    let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
    set(taskRef, payload.task)
  },

  fbUpdateTask({}, payload) {

    let userId = firebaseAuth.currentUser.uid

    let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
    update(taskRef, payload.updates)
  },
  fbDeleteTask({}, payload) {

    let userId = firebaseAuth.currentUser.uid

    let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
    remove(taskRef)
  }

}

const getters = {

    tasksSorted: (state) => {
      let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks)

      keysOrdered.sort((a, b) => {
        let taskAProp = state.tasks[a][state.sort].toLowerCase(),
            taskBProp = state.tasks[b][state.sort].toLowerCase()

            if(taskAProp > taskBProp) return 1
            else if(taskAProp < taskBProp) return -1
            else return 0
      })

      keysOrdered.forEach((key) => {
        tasksSorted[key] = state.tasks[key]
      })

      return tasksSorted
    },
    tasksFiltered: (state, getters) => {
      let tasksSorted = getters.tasksSorted,
          tasksFiltered = {}

      if(state.search) {
        Object.keys(tasksSorted).forEach(function(key) {

          let task = state.tasks[key],
            taskNameLowerCase = task.name.toLowerCase(),
            searchLowerCase = state.search.toLowerCase()
          if(taskNameLowerCase.includes(searchLowerCase)) {
            tasksFiltered[key] = task
          }
        })
        return tasksFiltered
      }
      return tasksSorted
    },

    tasksTodo: (state, getters) => {

      let tasksFiltered = getters.tasksFiltered
      let tasks ={}

      Object.keys(tasksFiltered).forEach(function(key) {

        let task = state.tasks[key];
        console.log('task: ', task);
        if(!task.completed) {
          tasks[key] = task
        }
      })

      return tasks
    },
    tasksCompleted: (state, getters) => {
      let tasksFiltered = getters.tasksFiltered
      let tasks ={}
      Object.keys(tasksFiltered).forEach(function(key) {
        let task = state.tasks[key];
        console.log('task: ', task);
        if(task.completed) {
          tasks[key] = task
        }
      })
      return tasks
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
