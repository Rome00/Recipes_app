<template>
  <div class="index container">
    <div class="columns is-multiline">
      <div
        class="column is-half is-mb-2"
        v-for="recipe in recipes"
        :key="recipe.id"
      >
        <div class="card is-grey lighten-5">
          <div class="columns is-multiline">
            <div class="column is-two-fifths">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="recipe.imageUrl" :alt="recipe.slug" />
                </figure>
              </div>
            </div>
            <div class="column">
              <div class="card-content">
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
                    <span v-if="recipe.prepTime.hour > 0" class="has-teal-text">
                      {{ recipe.prepTime.hour }}h :
                    </span>
                    <span class="has-teal-text">
                      {{ recipe.prepTime.minutes }}m
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
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  data() {
    return {
      recipes: []
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
}
</style>
