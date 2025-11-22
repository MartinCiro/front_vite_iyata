<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TaskBoardHeader 
          :project-id="projectId"
          :project="project"
        />
        
        <Card class="mb-6">
          <TaskFilters v-model="statusFilter" />
        </Card>

        <Loader v-if="isLoading" text="Loading tasks..." />
        
        <div v-else class="space-y-4">
          <TaskColumn
            v-if="filteredTasks.todo.length > 0"
            title="To Do"
            :tasks="filteredTasks.todo"
            :project-id="projectId"
            type="todo"
            @status-change="handleStatusChange"
            @delete="handleDeleteTask"
          />

          <TaskColumn
            v-if="filteredTasks.in_progress.length > 0"
            title="In Progress"
            :tasks="filteredTasks.in_progress"
            :project-id="projectId"
            type="in_progress"
            @status-change="handleStatusChange"
            @delete="handleDeleteTask"
          />

          <TaskColumn
            v-if="filteredTasks.done.length > 0"
            title="Done"
            :tasks="filteredTasks.done"
            :project-id="projectId"
            type="done"
            @status-change="handleStatusChange"
            @delete="handleDeleteTask"
          />

          <TaskBoardEmptyState 
            v-if="!isLoading && tasks.length === 0"
            :project-id="projectId"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Loader from 'useable/Loader.vue'

// Components
import TaskBoardHeader from 'components/Task/TaskBoardHeader.vue'
import TaskFilters from 'components/TaskFilters.vue'
import TaskColumn from 'components/Task/TaskColumn.vue'
import TaskBoardEmptyState from 'components/Task/TaskBoardEmptyState.vue'

// Composables
import { useTaskBoard } from 'hooks/useTaskBoard'

const {
  projectId,
  project,
  statusFilter,
  filteredTasks,
  isLoading,
  tasks,
  handleStatusChange,
  handleDeleteTask,
  initialize
} = useTaskBoard()

onMounted(initialize)
</script>