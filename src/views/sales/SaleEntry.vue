<template>
  <v-card flat>
    <v-card-title>
      <span class="headline">Sales Entry</span>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <router-link :to="{ name: 'Sales Entry'}" target="_blank">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon color="success" slot="activator" v-on="on">mdi-plus-circle-outline</v-icon>
          </template>
          <span>Add New Sale Entry</span>
        </v-tooltip>
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" class="d-flex" sm="6" md="3" >
          <v-select
            :items="Customers"
            label="Customer Name"
            v-model="sale.customer_id"
            dense hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" >
          <v-text-field v-model="sale.name" dense hide-details label="Bill Name"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3" style="padding-left:40px" >
          <v-radio-group v-model="sale.type" label="Type :" dense hide-details row>
            <v-radio label="Cash" value="1"></v-radio>
            <v-radio label="Credit" value="2"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="6" md="3" style="padding-top:30px">
          <label >Date : {{ dateFormatted(date) }}</label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="6" >
          <v-select
            :items="Products"
            label="Search your Produts"
            dense hide-details
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4" >
          <v-text-field v-model="sale.reference" dense hide-details label="Reference"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2" >
          <v-btn color="success" rounded @click="paymentDialog = true">Make Payment</v-btn>
        </v-col>
      </v-row>
      <v-simple-table fixed-header dense height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Sl.no</th>
            <th class="text-left">Description</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Price</th>
            <th class="text-left">Total</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.index">
            <td>{{ item.index }}</td>
            <td width="600px">{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.calories * item.price }}</td>
            <td>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon small color="success" @click="getPreviousPrice(item)" slot="activator" v-on="on">mdi-cash-multiple</v-icon>
                </template>
                <span>View Previous Price</span>
              </v-tooltip>&nbsp;&nbsp;
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon small color="success" @click="getStock(item)" slot="activator" v-on="on">mdi-format-list-numbered</v-icon>
                </template>
                <span>Stock</span>
              </v-tooltip>&nbsp;&nbsp;
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon  color="error" @click="removeProduct(index)" slot="activator" v-on="on">mdi-delete</v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="paymentDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          Amount : 10000
          <v-spacer></v-spacer>
          <v-icon color="error" @click="paymentDialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          Payment
        </v-card-text>
        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="2" >
        <v-btn color="success" dark large>
          10000
        </v-btn>
      </v-col>
    </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SaleEntry',
  data: () => ({
    date: new Date().toLocaleString(),
    sale: {},
    paymentDialog: false,
    Customers: [],
    Products: [],
    desserts: [
      {
        index:1,
        name: 'Frozen Yogurt',
        calories: 159,
        price: 25
      },
      {
        index:2,
        name: 'Ice cream sandwich',
        calories: 237,
        price: 25
      },
      {
        index:3,
        name: 'Eclair',
        calories: 262,
        price: 25
      },
      {
        index:4,
        name: 'Cupcake',
        calories: 305,
        price: 25
      },
      {
        index:5,
        name: 'Gingerbread',
        calories: 356,
        price: 25
      },
      {
        index:6,
        name: 'Jelly bean',
        calories: 375,
        price: 25
      },
      {
        index:7,
        name: 'Lollipop',
        calories: 392,
        price: 25
      },
      {
        index:8,
        name: 'Honeycomb',
        calories: 408,
        price: 25
      },
      {
        index:9,
        name: 'Donut',
        calories: 452,
        price: 25
      },
      {
        index:10,
        name: 'KitKat',
        calories: 518,
        price: 25
      },
      {
        index:11,
        name: 'Gingerbread',
        calories: 356,
        price: 25
      },
      {
        index:12,
        name: 'Ice cream sandwich',
        calories: 356,
        price: 25
      },
    ],
  }),
  computed: {
    //
  },
  methods: {
    dateFormatted (params) {
      return params ? moment(params).format('D-M-Y, h:mm:ss a') : ''
    },
  },

  watch: {
    //
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
