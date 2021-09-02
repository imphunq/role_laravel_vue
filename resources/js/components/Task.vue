<template>
    <div>
        <div class="error" v-if="error.message.length">
            <div class="alert alert-danger" role="alert">
                {{ error.message }}
            </div>
        </div>
        <div class="row">
            <div class="col-9">
                <input type="text" v-model="content" class="form-control" placeholder="Enter task...">
            </div>
            <div class="col-3">
                <button class="btn btn-primary" @click="saveTask">Save</button>
            </div>
        </div>
        <div class="list-tasks">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Content</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks" :key="'task-' + index">
                        <th scope="row">{{ task.id }}</th>
                        <td>{{ task.content }}</td>
                        <td>
                            <button @click="deleteTask(task, index)" class="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                tasks: [],
                content: '',
                error: {
                    message: ''
                }
            }
        },

        created () {
            this.getTasks()
        },

        methods: {
            getTasks () {
                axios.get('/tasks').then(response => {
                    this.tasks = response.data
                }).catch (error => {
                    console.log(error)
                })
            },

            saveTask () {
                axios.post('/tasks', {content: this.content}).then(response => {
                    if (response.data.status === false) {
                        this.error.message = response.data.message
                        setTimeout(() => {
                            this.error.message = ''
                        }, 3000)
                    } else {
                        this.tasks.push(response.data)
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            deleteTask(task, index) {
                axios.delete('/tasks/' + task.id)
                .then(response => {
                    if (response.data.status === false) {
                        this.error.message = response.data.message
                        setTimeout(() => {
                            this.error.message = ''
                        }, 3000)
                    } else {
                        this.tasks.splice(index, 1)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-tasks {
        margin-top: 50px;
    }
    .error {
        margin-bottom: 15px;
    }
</style>
