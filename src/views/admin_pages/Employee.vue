<template>
  <v-card flat>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="Employees"
        sort-by="name"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Employees</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >Add New Employee</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="employee.name" :rules="nameRules" :error-messages="errorMsg.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select 
                            :items="UserTypes"
                            item-value = id
                            item-text = text
                            :rules="requiredRules"
                            v-model="employee.user_type_id"
                            label="Employee Type"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select 
                            :items="Branches"
                            item-value = id
                            item-text = text
                            :rules="requiredRules"
                            v-model="employee.branch_id"
                            label="Branch"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="employee.email" :rules="requiredRules" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="employee.contact_number" :rules="requiredRules" label="Conatact Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="employee.location" :rules="requiredRules" label="Location"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="employee.pincode" :rules="numberRule" label="Pincode"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="employee.username" :rules="nameRules" label="Username"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-if="editedIndex == -1">
                          <v-text-field  v-model="employee.password" :rules="requiredRules" label="Password"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-textarea v-model="employee.address" :rules="requiredRules" label="Address"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn v-if="editedIndex == -1" color="blue darken-1" text @click="register">Save</v-btn>
                  <v-btn v-else color="blue darken-1" text @click="update">Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.index`]="{ item }">
          {{Employees.indexOf(item) + 1}}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-switch
            @change="changeStatus(item.id, item.status)"
            :true-value="1" :false-value="0"
            v-model="item.status" hide-details
            :label="(item.status==1)?'Active':'Inactive'"
          ></v-switch>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            color="primary"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-container>
            <v-alert
              outlined
              type="error"
              prominent
              border="left"
            >
              <v-row align="center">
                <v-col class="grow">You have'nt added any data.</v-col>
                <v-col class="shrink">
                  <v-btn @click="dialog = true" dark color="error">Add Some</v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-container>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import WebService from '@/service/WebService'
  export default {
    name: 'Employee',
    data: () => ({
      valid: true,
      employee: {
        name:'',
        username: '',
        password: '',
        branch_id:'',
        user_type_id: '',
        email:'',
        contact_number:'',
        address:'',
        location:'',
        pincode:''
      },
      dialog: false,
      headers: [
        { text: 'Sl.no', value: 'index' },
        { text: 'Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Employee Type', value: 'user_type_id' },
        { text: 'Email', value: 'employee.email' },
        { text: 'Contact Number', value: 'employee.contact_number' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      Employees: [],
      editedIndex: -1,
      defaultItem: {
        name:'',
        username: '',
        password: '',
        branch_id:'',
        user_type_id:'',
        email:'',
        contact_number:'',
        address:'',
        location:'',
        pincode:''
      },
      errorMsg: {},
      UserTypes: [
        {id: 1, text: 'Admin'},
        {id: 2, text: 'Sales'},
        {id: 3, text: 'Accounts'}
      ],
      Branches: [],
      requiredRules: [
        v => !!v || 'This field is required.'
      ],
      nameRules: [
        v => !!v || 'This field is required.',
        v => (v && v.length <= 50) || 'Must be less than 50 characters'
        // v => /^[0-9A-Za-z-(][0-9A-Z-&a-z-(-)\s]*$/.test(v) || 'Must be valid data'
      ],
      numberRule: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Must be less than 15 characters',
        v => /^[0-9]+$/.test(v) || 'Must be number'
      ],
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add New Employee' : 'Edit Employee'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      // 
    },
    mounted () {
      this.getEmployees()
      this.getBranches()
    },
    methods: {
      getEmployees () {
        WebService.getCall('getEmployees').then((response) => {
          this.Employees = response.data.employees
        })
      },
      getBranches () {
        WebService.getCall('branch').then((response) => {
          this.Branches = response.data.branches
        })
      },
      editItem (item) {
        this.editedIndex = this.Employees.indexOf(item)
        this.employee = Object.assign({}, item)
        this.employee.email = item.employee.email
        this.employee.contact_number = item.employee.contact_number
        this.employee.address = item.employee.address
        this.employee.location = item.employee.location
        this.employee.pincode = item.employee.pincode
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.Employees.indexOf(item)
        if (confirm('Are you sure you want to delete this item?')) {
          WebService.postCall('deleteEmployee', this.employee).then((response) => {
            alert(response.data)
            this.Employees.splice(index, 1)
          })
        }
      },
      close () {
        this.resetValidation ()
        this.dialog = false
        this.$nextTick(() => {
          this.employee = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      register () {
        if (this.$refs.form.validate()) {
          WebService.postCall('registerEmployee', this.employee).then((response) => {
            alert(response.data)
            this.Employees.push(this.employee)
            this.close()
          })
        }
      },
      update () {
        WebService.postCall('updateEmployee', this.employee).then((response) => {
          alert(response.data)
          Object.assign(this.Employees[this.editedIndex], this.employee)
          this.close()
        })
      },
      changeStatus (id, status) {
        var data = { 'id': id, 'status': status }
        WebService.postCall('changeEmployeeStatus', data).then((response) => {
          if (response.data.status == 200) {
            alert(response.data)
          }
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
    beforeRouteEnter (to, from, next) {
      if (localStorage.getItem('loggedIn') === 'true') {
        next()
      } else {
        next('/')
      }
    }
  }
</script>
