<template>
  <v-card flat>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="Branches"
        sort-by="calories"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Branches</v-toolbar-title>
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
                >Add Branch</v-btn>
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
                          <v-text-field v-model="branch.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select 
                            :items="BranchTypes"
                            item-value = id
                            item-text = text
                            :rules="requiredRules"
                            v-model="branch.branch_type_id"
                            label="Branch Type"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="branch.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="branch.contact_number" label="Conatact Number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="branch.location" label="Location"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="branch.pincode" label="Pincode"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <v-textarea v-model="branch.address" label="Address"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error darken-1" text @click="close">Cancel</v-btn>
                  <v-btn v-if="editedIndex == -1" color="success darken-1" text @click="save">Save</v-btn>
                  <v-btn v-else color="success darken-1" text @click="update">Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.index`]="{ item }">
          {{Branches.indexOf(item) + 1}}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
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
    name: 'Branch',
    data: () => ({
      valid: true,
      branch: {
        name:'',
        branch_type_id:'',
        email:'',
        contact_number:'',
        address:'',
        location:'',
        pincode:''
      },
      dialog: false,
      headers: [
        { text: 'SL.No', value: 'index' },
        { text: 'Name', value: 'name' },
        { text: 'Branch Type', value: 'branch_type_id' },
        { text: 'Location', value: 'location' },
        { text: 'Contact Number', value: 'contact_number' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      BranchTypes: [
        {id: 1, text: 'Sales'},
        {id: 2, text: 'Warehuse'}
      ],
      Branches: [],
      editedIndex: -1,
      defaultItem: {
        name:'',
        branch_type_id:'',
        email:'',
        contact_number:'',
        address:'',
        location:'',
        pincode:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add New Branch' : 'Edit Branch'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      // this.initialize()
    },
    mounted () {
      this.getBranches();
    },
    methods: {
      getBranches () {
        WebService.getCall('branch').then((response) => {
          this.Branches = response.data.branches
        })
      },
      editItem (item) {
        this.editedIndex = this.Branches.indexOf(item)
        this.branch = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        const index = this.Branches.indexOf(item)
        if (confirm('Are you sure you want to delete this Branch?')) {
          WebService.deleteCall('branch/'+item.id).then((response) => {
            alert(response.data.message)
            this.Branches.splice(index, 1)
          })
        }
      },
      close () {
        this.resetValidation ()
        this.dialog = false
        this.$nextTick(() => {
          this.branch = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        WebService.postCall('branch', this.branch).then((response) => {
          alert(response.data)
          this.Branches.push(this.branch)
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
