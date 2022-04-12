<template>
  <v-app id="inspire">
    <v-layout grid-list-md text-xs-center v-if="$route.meta.public">
      <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <v-list dense>
          <template v-for="item in menu">
            <v-row v-if="item.heading" :key="item.heading" align="center">
              <v-col cols="6">
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-col>
              <v-col cols="6" class="text-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-col>
            </v-row>
            <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(child, i) in item.children" :key="i" link :to="'/' + child.link">
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ child.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.text" link :to="'/' + item.link">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="success" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <span class="hidden-sm-and-down">TAB Enterprise</span>
        </v-toolbar-title>
        <!-- <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
        ></v-text-field> -->
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
    <v-layout grid-list-md text-xs-center v-if="!$route.meta.public">
      <router-view></router-view>
    </v-layout>
    <!-- <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn> -->
  </v-app>
</template>

<script>
import Menus from './sidemenu.js'
export default {
  props: {
    source: String,
    Menus: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.menu = Menus
  },
  data: () => ({
    menu: [],
    dialog: false,
    drawer: null,
  }),
};
</script>