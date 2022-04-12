<template>
  <v-card flat>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="FinancialYears"
        sort-by="start_date"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Financial Years</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >Add Financial Year</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12" sm="6" >
                          <v-text-field v-model="year.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field v-model="year.code" label="Code"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <!-- <v-text-field v-model="year.start_date" label="Start Date"></v-text-field> -->
                          <v-menu
                            v-model="dobPicker1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-on="on"
                                slot="activator"
                                label="Start Date*"
                                prepend-icon="mdi-calendar-month"
                                :rules="requiredRules"
                                readonly
                                :value="dateFormatted(year.start_date)"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="year.start_date" @input="dobPicker1 = false; year.end_date=null"></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" >
                          <v-menu
                            v-model="dobPicker2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                class="textcls brdrcls"
                                v-on="on"
                                label="End Date*"
                                prepend-icon="mdi-calendar-month"
                                readonly
                                :rules="requiredRules"
                                :value="dateFormatted(year.end_date)"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="year.end_date" :min="year.start_date" @input="dobPicker2 = false"></v-date-picker>
                          </v-menu>
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
        <template v-slot:[`item.index`]="{ item }">
          {{FinancialYears.indexOf(item) + 1}}
        </template>
        <template v-slot:[`item.start_date`]="{ item }">
          {{dateFormatted(item.start_date)}}
        </template>
        <template v-slot:[`item.end_date`]="{ item }">
          {{dateFormatted(item.end_date)}}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <!-- <template v-if="item.status==0">
            Previous Year
          </template> -->
          <template>
            <v-switch
              @change="changeStatus(item.id, item.status)"
              :true-value="1" :false-value="0"
              v-model="item.status" hide-details
              :label="(item.status==1)?'Active':'Inactive'"
            ></v-switch>
          </template>
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
  import moment from 'moment'
  export default {
    name: 'FinancialYear',
    data: () => ({
      valid: true,
      dialog: false,
      dobPicker1: '',
      dobPicker2: '',
      editedIndex: -1,
      FinancialYears: [],
      year: {
        name: '',
        code: '',
        start_date: '',
        end_date: ''
      },
      defaultItem: {
        name: '',
        code: '',
        start_date: '',
        end_date: ''
      },
      headers: [
        { text: 'Sl.No', value: 'index' },
        { text: 'Name', align: 'start', sortable: false, value: 'name',},
        { text: 'Code', value: 'code' },
        { text: 'StartDate', value: 'start_date' },
        { text: 'End Date ', value: 'end_date' },
        { text: 'Status ', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add New Year' : 'Edit Year'
      },
    },
    mounted () {
      this.getFinancialYear();
    },
    methods: {
      getFinancialYear () {
        WebService.getCall('financialyear').then((response) => {
          this.FinancialYears = response.data.financial_years
        })
      },
      editItem (item) {
        this.editedIndex = this.FinancialYears.indexOf(item)
        this.year = Object.assign({}, item)
        this.dialog = true
      },
      dateFormatted (params) {
        return params ? moment(params).format('D-M-Y') : ''
      },
      close () {
        this.resetValidation ()
        this.dialog = false
        this.$nextTick(() => {
          this.year = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        WebService.postCall('financialyear', this.year).then((response) => {
          alert(response.data.message)
          this.FinancialYears.push(this.year)
          this.close()
        })
      },
      update () {
        WebService.putCall('financialyear/'+this.year.id, this.year).then((response) => {
          alert(response.data.message)
          Object.assign(this.FinancialYears[this.editedIndex], this.year)
          this.close()
        })
      },
      changeStatus (id, status) {
        var data = { 'id': id, 'status': status }
        WebService.postCall('changeFinancialYearStatus', data).then((response) => {
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

    watch: {
      dialog (val) {
        val || this.close()
      },
    },
  }
</script>
