<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="Products"
        sort-by="name"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Products</v-toolbar-title>
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
                >Add Product</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="product.name" label="Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="product.code" label="Code"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="product.min_quantity" label="Minimum Quantity"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="product.cost" label="Cost"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="product.min_selling_price" label="Minimum Selling Price"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="product.selling_price" label="Selling Price"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
  export default {
    name: 'Product',
    data: () => ({
      product: {
        name:'',
        code:'',
        min_selling_price:'',
        selling_price:'',
        cost:'',
        min_quantity:''
      },
      Products: [],
      dialog: false,
      headers: [
        { text: 'Name', align: 'start', sortable: false, value: 'name' },
        { text: 'Code', value: 'code' },
        { text: 'Minimum Selling Price', value: 'min_selling_price' },
        { text: 'Selling Price', value: 'selling_price' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      defaultItem: {
        name:'',
        code:'',
        min_selling_price:'',
        selling_price:'',
        cost:'',
        min_quantity:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add New Product' : 'Edit Product'
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

    methods: {

      editItem (item) {
        this.editedIndex = this.Products.indexOf(item)
        this.product = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.Products.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.Products.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.product = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.Products[this.editedIndex], this.product)
        } else {
          this.Products.push(this.product)
        }
        this.close()
      }
    }
  }
</script>
