<template>
  <div class="index container">
    <div class="columns is-centered is-mobile">
      <div class="column is-four-fifths-mobile is-mt-5" v-if="!recipes.length">
        <div class="columns is-mobile">
          <div class="column is-one-third ">
            <figure class="image is-square cheaf">
              <img src="../assets/cheaf.png" alt="cheaf" />
            </figure>
          </div>
          <div class="column is-flex is-vcenter is-mt-2-mobile">
            <h1 class="is-size-2">
              You don't have a recipe yet, please add
              <router-link
                @mouseover.native="hover = true"
                @mouseleave.native="hover = false"
                :class="{ pulse: hover }"
                class="has-text-info animated infinite is-inline-block"
                :to="{ name: 'addItem' }"
                tag="a"
              >
                new recipe
              </router-link>
            </h1>
          </div>
        </div>
      </div>
      <div
        v-else
        class="column is-half is-mb-2"
        v-for="recipe in recipes"
        :key="recipe.id"
      >
        <div class="card is-grey lighten-5">
          <div class="columns is-multiline">
            <div class="column is-two-fifths">
              <div class="card-image is-mt-2-half is-ml-small25">
                <figure class="image is-square">
                  <img :src="recipe.imageUrl" :alt="recipe.slug" />
                </figure>
              </div>
            </div>
            <div class="column">
              <div class="card-content">
                <!-- edit Item -->
                <router-link
                  :to="{
                    name: 'editItems',
                    params: { recipe_slug: recipe.slug }
                  }"
                  tag="button"
                  class="edit-icon button"
                >
                  <div class="icon is-small">
                    <i class="material-icons ">edit</i>
                  </div>
                </router-link>

                <!-- edit Item -->

                <!-- delete item -->
                <div class="icon delete-icon">
                  <i class="material-icons" @click="deleteItem(recipe.id)"
                    >delete</i
                  >
                </div>
                <!-- delete item -->
                <h2 class="title is-pb-1">{{ recipe.title }}</h2>

                <!-- ingredients section -->
                <div
                  class="breadcrumb has-dot-separator"
                  aria-label="breadcrumbs"
                >
                  <ul class="ingredients">
                    <li v-for="(ing, index) in recipe.Ingredients" :key="index">
                      <span class="has-grey-text text-darken-2">{{ ing }}</span>
                    </li>
                  </ul>
                </div>
                <!-- ingredients section -->
              </div>
            </div>
            <div class="column is-full">
              <!-- timing section -->
              <div class="card-footer">
                <div class="is-flex is-vcenter card-footer-item">
                  <span class="icon is-small">
                    <i class="material-icons">update</i>
                  </span>
                  <div class="timing-box">
                    prep.
                    <span
                      v-if="recipe.preparing.hour > 0"
                      class="has-teal-text"
                    >
                      {{ recipe.preparing.hour }}h :
                    </span>
                    <span class="has-teal-text">
                      {{ recipe.preparing.minutes }}m
                    </span>
                  </div>
                </div>
                <div class="is-flex is-vcenter card-footer-item">
                  <span class="icon is-small">
                    <i class="material-icons">timelapse</i>
                  </span>
                  <div class="timing-box">
                    Cook
                    <span v-if="recipe.cook.hour > 0" class="has-teal-text">
                      {{ recipe.cook.hour }}h :
                    </span>
                    <span class="has-teal-text"
                      >{{ recipe.cook.minutes }}m</span
                    >
                  </div>
                </div>
                <div class="is-flex is-vcenter card-footer-item">
                  <span class="icon is-small">
                    <i class="material-icons">alarm_on</i>
                  </span>
                  <div class="timing-box">
                    full
                    <span v-if="recipe.ready_in.hour > 0" class="has-teal-text"
                      >{{ recipe.ready_in.hour }}m</span
                    >
                    <span class="has-teal-text"
                      >{{ recipe.ready_in.minutes }}m</span
                    >
                  </div>
                </div>
              </div>
              <!-- timing section -->

              <!-- card content section -->
              <div class="card-footer">
                <div class="content methods">
                  <ol type="1">
                    <li v-for="(step, index) in recipe.methods" :key="index">
                      {{ step }}
                    </li>
                  </ol>
                </div>
              </div>
              <!-- card content section -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  data() {
    return {
      recipes: [],
      hover: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    deleteItem(id) {
      // Delete item from firegase
      firebase
        .firestore()
        .collection('allRecipes')
        .doc(id)
        .delete()
        // remove from local storage
        .then(() => {
          this.recipes = this.recipes.filter(items => {
            return items.id != id
          })
        })
    }
  },
  created() {
    // load data on load from firebase
    firebase
      .firestore()
      .collection('allRecipes')
      .get()
      .then(data => {
        data.forEach(element => {
          let recipe = element.data()
          if (this.user.data.userID === recipe.userID) {
            recipe.id = element.id
            this.recipes.push(recipe)
          }
        })
      })
  }
}
</script>

<style lang="scss" scoped>
.index {
  margin-top: 60px;
  .timing-box {
    padding-left: 10px;
  }
  .cheaf img {
    transform: scaleX(-1);
  }
  .edit-icon {
    position: absolute;
    bottom: -20px;
    right: 10px;
    color: #e8e5e5;
    border-color: #662974;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
    background-color: #662974;
    width: 40px;
    height: 40px;
    &::active {
      box-shadow: 0 7px 8px 4px rgba(0, 0, 0, 0.2) 0 12px 17px 2px
        rgba(0, 0, 0, 0.14) 0 5px 22px 4px rgba(0, 0, 0, 0.12);
    }
    &::hover {
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2) 0 8px 10px 1px rgba(
          0,
          0,
          0,
          0.14
        ) 0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }
  }
  .delete-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    color: #aaa;
    cursor: pointer;
  }
  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
    border-bottom: 1px solid #42a5f5;
  }
  .methods {
    ol {
      list-style: none;
      counter-reset: my-awesome-counter;
      margin-left: 1em;
    }
    li {
      counter-increment: my-awesome-counter;
      margin: 0.25rem;
    }
    li::before {
      content: counter(my-awesome-counter);
      background: #662974;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: inline-block;
      line-height: 2rem;
      color: white;
      text-align: center;
      margin-right: 0.5rem;
    }
    ol ol li::before {
      background: #de51ff;
    }
    ol ol ol li::before {
      background: #ee9eff;
    }
  }
  .ingredients {
    margin: 20px auto;
    ul {
      list-style: none;
      margin-left: 1em;
    }
    li {
      margin: 0.25rem;
    }
    li::before {
      content: '';
      background: #662974;
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      display: inline-block;
      line-height: 2rem;
      color: white;
      text-align: center;
      margin-right: 0.5rem;
    }
    ol ol li::before {
      background: #de51ff;
    }
    ol ol ol li::before {
      background: #ee9eff;
    }
  }
  .breadcrumb {
    font-size: 1rem;
    white-space: pre-line !important;
    li {
      align-items: baseline;
    }
  }
  .image {
    border-radius: 6px;
    overflow: hidden;
  }
}
// pulse animation
.animated {
  animation-duration: 2s;
  animation-fill-mode: both;
}
.animated.infinite {
  animation-iteration-count: infinite;
}
.pulse {
  animation-name: pulse;
}
@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
