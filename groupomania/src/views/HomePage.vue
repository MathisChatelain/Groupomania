<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
      class="overflow-hidden"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Groupomania Logo"
          class="shrink mr-2"
          contain
          src="../assets/icon-left-font-monochrome-white.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn
        text
        @click="disconnect"
      >
        <span class="mr-2">Disconnect</span>
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    width="100%"
    app
    clipped
    color="secondary"
    align="center"
    >
      <v-btn
        v-if="mini"
        class="mt-2 accent"
        fab
        small
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-container
      v-if="!mini"
      >
        <v-row>
          <v-col 
          cols="10"
          md="4"
          >
            <v-text-field
                v-model="title"
                label="Title"
                outlined
              />
          </v-col>
          <v-col cols="1">
            <v-btn
            class="mt-2 accent"
            fab
            small
            @click="closeNavigationDrawer"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col  
          cols="12"
          md="4"
          >
          </v-col>
          <v-col  
          cols="12"
          md="4"
          >
            <v-file-input
              v-model="imageFile"
              show-size
              counter
              dense
              accept="image/*"
              label="Add an image"
              @change="onFileChange"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col  
          cols="12"
          md="4"
          >
            <v-textarea
              v-model="description"
              label="Description"
              outlined
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col  
          cols="12"
          md="4"
          offset-md="4"
          >
              <v-btn
                block
                color="primary"
                class="anchor--text"
                elevation="10"
                x-large
                @click="postPost"
              >
                Post
              </v-btn>
            </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-main 
      app
      class="d-flex align-center"
      >
      <v-container>
        <v-row v-if="showMessageNoPosts">
          <v-col cols="mini ? '4-8' : '6-10'">
            <v-card
            outlined
            class="pa-5 d-flex align-center justify-center"
            >
              <v-icon class="mr-5">mdi-bell-alert</v-icon>
              <h2 class="font-weight-bold">
                There is currently no posts, do you want to add the first ?
              </h2>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col 
          v-for="post in posts"
          :key="post.postId"
          cols="12"
          md="4"
          >
            <v-card
            outlined
            class="pa-5 fluid ma-5"
            elevation="5"
            >
              <h2 class="font-weight-bold mb-2">
                {{ post.name }}
              </h2>
              <h3 class="mb-2">{{ post.description }}</h3>
              <v-btn class="mr-4" @click="postLike(1, post)">
                {{ post.likes }}
                <v-icon
                v-if="userLikeStatus(post) == 1"
                color="green" class="ml-1">mdi-thumb-up</v-icon>
                <v-icon v-else color="green lighten-4" class="ml-1">mdi-thumb-up</v-icon>
              </v-btn>
              <v-btn @click="postLike(-1, post)">
                {{ post.dislikes }}
                <v-icon
                v-if="userLikeStatus(post) == -1"
                color="red" class="ml-1">mdi-thumb-down</v-icon>
                <v-icon v-else color="red lighten-4" class="ml-1">mdi-thumb-down</v-icon>
              </v-btn>
              <v-btn
              v-if="isUserPostOrAdmin(post)"
              @click="deletePost(post)"
              class="ml-1"
              elevation="1"
              x-small
              fab
              >
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>         
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',

  components: {
  },

  data: () => ({
    drawer: true,
    mini: true,
    showMessageNoPosts: false,
    description: "",
    title: "",
    imageFile: null,
    imageIsLoaded: false,
    postColsSize: 6,
    posts: []
  }),

  async created() {
    await this.getPosts();
    await this.getCurrentUser();
  },

  computed: {
    computedImagePreviewURL(){
      return this.imagePreviewURL
    },
  },

  methods: {
    disconnect() {
      axios.defaults.headers["Authorization"] = "";
      this.$router.push("/")
    },

    onFileChange(payload) {
      const file = payload;
      if (file) {
        this.imagePreviewURL = URL.createObjectURL(file);
        this.imageIsLoaded = true;
      } else {
        this.imagePreviewURL =  null
      }
    },

    closeNavigationDrawer() {
      this.mini = true;
    },

    userLikeStatus(post) {
      const userId = axios.defaults.headers['userId']
      if (post.usersLiked.includes(userId)){
        return 1;
      } else if (post.usersDisliked.includes(userId)) {
        return -1;
      } else {
        return 0
      }
    },

    isUserPostOrAdmin(post) {
      const userId = axios.defaults.headers['userId']
      return post.userId == userId
    },

    async getCurrentUser() {
      try {
        const resp = await axios.get('users/', { data:{
              userId: axios.defaults.headers['userId']}
            });
        console.log(resp)
        } catch (e) {
          console.log("error")
          console.log(e)
      }
    },

    async getPosts() {
      try {
        const {data} = await axios.get('posts/');
        if (data.length == 0) {
          this.showMessageNoPosts = true;
        } else {
          this.posts= data.slice().reverse();
          this.showMessageNoPosts = false;
          console.log(this.posts)
        }
        } catch (e) {
          console.log("error")
          console.log(e)
      }
    },

    async postLike(value, post) {
      try {
          const resp = await axios.post(`posts/${post.postId}/like`, {
              like: value,
              userId: axios.defaults.headers['userId'],
              postId: post.postId
            })
          if(resp.statusText=="Created"){
            this.getPosts();
          }
        } catch (e) {
          console.log("error")
          console.log(e)
        }
    },

    async deletePost(post) {
      try {
          const resp = await axios.delete(`posts/${post.postId}`, { data:{
              userId: axios.defaults.headers['userId'],
              postId: post.postId
            }})
          if(resp.status=="200"){
            this.getPosts();
          }
        } catch (e) {
          console.log("error")
          console.log(e)
        }
    },


    async postPost() {
      try {
          this.mini = true;
          await axios.post('posts/', {
              name: this.title,
              description: this.description,
              file : {
                filename: "",
              }
            })
          this.name = "";
          this.description = "";
          await this.getPosts();
      } catch (e) {
          console.log("error")
          console.log(e)
      }
    }
  }
};
</script>
