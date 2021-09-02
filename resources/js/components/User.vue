<template>
    <div>
        <div class="error" v-if="error.message.length">
            <div class="alert alert-danger" role="alert">
                {{ error.message }}
            </div>
        </div>
        <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User name</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="'user-' + index">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
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
                users: [],
                error: {
                    message: ''
                }
            }
        },
        created () {
            this.getUsers()
        },
        methods: {
            getUsers () {
                axios.get('/users')
                .then(response => {
                    if (response.data.status === false) {
                        this.error.message = response.data.message
                    } else {
                        this.users = response.data
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style>

</style>
