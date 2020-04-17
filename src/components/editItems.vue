<template>
  <div v-if="recipe" class="addItem container">
    <h2 class="is-capitalized">Edit {{ recipe.title }} Recipe</h2>
    <form @submit.prevent class="is-relative">
      <!-- add title -->
      <div class="field">
        <label class="label has-grey-text text-darken-2" for="title"
          >Recipe Title:</label
        >
        <div class="control">
          <input
            class="input is-info is-rounded"
            type="text"
            name="title"
            v-model="recipe.title"
            placeholder="Mojito"
            autocomplete="off"
          />
        </div>
      </div>
      <!-- add title -->

      <!-- update ingredients -->
      <div class="field">
        <label class="label has-grey-text text-darken-2" for="ingredients"
          >Add an ingredients:</label
        >
        <div class="control has-icons-right">
          <input
            class="input is-info is-rounded"
            type="text"
            name="ingredients"
            v-model="item"
            placeholder="white rum"
            autocomplete="off"
            @keydown.tab.prevent="updateItems"
            @input="iconReset"
          />
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
            :duration="200"
          >
            <span
              @click="updateItems"
              class="icon is-small is-right add-ingredient"
              :key="icon"
            >
              <i
                class="material-icons has-green-text text-darken-2 animated flash infinite"
              >
                {{ icon }}
              </i>
            </span>
          </transition>
        </div>
      </div>
      <!-- update ingredients -->

      <!-- display  ingredients-->
      <div class="is-block">
        <transition-group
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
          :duration="850"
          tag="div"
          class="columns is-vcentered ingredients-box"
        >
          <div
            class="column is-3 is-relative is-pl-small25 is-mb-1"
            v-for="(item, index) in recipe.Ingredients"
            :key="index + '_item'"
          >
            <span class="tag is-100">
              {{ item | shortText(10) }}
              <button
                class="delete is-small"
                @click="removeItem(item)"
              ></button>
            </span>
          </div>
        </transition-group>
      </div>
      <!-- display  ingredients-->

      <!-- add prepiaring -->
      <b-field class="time" label="Select preparing time">
        <div class="is-flex is-timepick ">
          <div class="is-flex is-between is-vcenter">
            <p>hour</p>
            <b-slider
              class="is-90"
              type="is-success"
              size="is-medium"
              tooltip-type="is-black"
              :min="0"
              :max="12"
              ticks
              v-model="recipe.preparing.hour"
            ></b-slider>
          </div>
          <div class="is-flex is-between is-vcenter">
            <p>minutes</p>
            <b-slider
              class="is-85"
              type="is-success"
              size="is-medium"
              tooltip-type="is-primary"
              :min="0"
              :max="60"
              ticks
              v-model="recipe.preparing.minutes"
            ></b-slider>
          </div>
        </div>
      </b-field>
      <!-- add prepiaring -->

      <!-- add cooktime -->
      <b-field class="time" label="Select Cook time">
        <div class="is-flex is-timepick">
          <div class="is-flex is-between is-vcenter">
            <p>hour</p>
            <b-slider
              class="is-90"
              type="is-success"
              size="is-medium"
              tooltip-type="is-black"
              :min="0"
              :max="12"
              ticks
              v-model="recipe.cook.hour"
            ></b-slider>
          </div>
          <div class="is-flex is-between is-vcenter">
            <p>minutes</p>
            <b-slider
              class="is-85"
              type="is-success"
              size="is-medium"
              tooltip-type="is-black"
              :min="0"
              :max="60"
              ticks
              v-model="recipe.cook.minutes"
            ></b-slider>
          </div>
        </div>
      </b-field>
      <!-- add cooktime -->

      <!-- add image -->
      <div class="file has-name is-flex is-vcenter is-between">
        <label class="file-label">
          <input
            class="file-input is-rounded"
            type="file"
            name="image"
            @change="imgUpload"
            accept="image/*"
            ref="imageFile"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose an image
            </span>
          </span>
          <span v-if="image" class="file-name has-green-text text-darken-3">
            {{ image.name }}</span
          >
        </label>
      </div>
      <!-- add image -->

      <!-- image prew -->
      <div class="box addImage">
        <figure class="image is-16by9" v-if="image">
          <img class="" :src="imageUrl" />
        </figure>
        <figure class="image is-16by9" v-else>
          <img :src="recipe.imageUrl" />
        </figure>
      </div>
      <!-- image prew -->

      <!-- add methods -->
      <div class="field">
        <div class="control">
          <textarea
            class="textarea has-fixed-size"
            placeholder="add method and press  'Tab'"
            v-model="methodItem"
            @keydown.tab="updatePrepMethods"
          ></textarea>
        </div>
      </div>
      <!-- add methods -->

      <!-- display  methods-->
      <div class="is-block">
        <transition-group
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
          :duration="850"
          tag="div"
          class="columns is-vcentered ingredients-box"
        >
          <div
            class="column is-relative if-full is-pl-small25"
            v-for="(item, index) in recipe.methods"
            :key="index + '_item'"
          >
            <span class="tag is-100">
              <span class="has-amber-text text-darken-3 is-pr-0-half"
                >{{ index + 1 }}.</span
              >
              {{ item | shortText(50) }}
              <button
                class="delete is-small"
                @click="removeMethod(item)"
              ></button>
            </span>
          </div>
        </transition-group>
      </div>
      <!-- display  methods-->

      <div class="field submit-form">
        <p v-if="feedback" class="has-text-danger">{{ feedback }}</p>
        <p v-if="prepFeedback" class="has-text-danger">{{ prepFeedback }}</p>
        <button class="button is-link is-rounded" @click="onSubmit">
          Update Item
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import slugify from 'slugify'

export default {
  name: 'editItems',
  data() {
    return {
      recipe: null,
      item: null,
      methodItem: null,
      feedback: null,
      prepFeedback: null,
      icon: 'add',
      imageUrl: null,
      image: null
    }
  },
  created() {
    let ref = firebase
      .firestore()
      .collection('allRecipes')
      .where('slug', '==', this.$route.params.recipe_slug)
    ref.get().then(snaps => {
      snaps.forEach(doc => {
        this.recipe = doc.data()
        this.recipe.id = doc.id
      })
    })
  },
  computed: {
    // calc full time
    fullCookTime() {
      let fullTime = {
        hour: this.recipe.preparing.hour + this.recipe.cook.hour,
        minutes: this.recipe.preparing.minutes + this.recipe.cook.minutes
      }
      return fullTime
    }
  },
  methods: {
    updateItems() {
      if (this.item) {
        this.recipe.Ingredients.push(this.item)
        this.item = null
        this.feedback = null
        this.icon = 'check'
      } else {
        this.feedback = 'You must enter ingredients'
      }
    },
    updatePrepMethods() {
      if (this.methodItem) {
        this.recipe.methods.push(this.methodItem)
        this.methodItem = null
        this.prepFeedback = null
      } else {
        this.prepFeedback = 'You must enter methods'
      }
    },
    // remove ingredients before submit
    removeItem(item) {
      this.recipe.Ingredients = this.recipe.Ingredients.filter(id => {
        return id != item
      })
    },
    // remove methoods before submit
    removeMethod(item) {
      this.recipe.methods = this.recipe.methods.filter(id => {
        return id != item
      })
    },
    // add image
    imgUpload(event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please add a viled file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    // icon change
    iconReset() {
      this.icon = 'add'
    },
    //update firebase
    onSubmit() {
      // if image change
      if (
        this.recipe.title != null &&
        this.recipe.Ingredients.length >= 1 &&
        this.recipe.cook !== null &&
        this.recipe.preparing !== null &&
        this.recipe.methods.length >= 1 &&
        this.image !== null
      ) {
        this.feedback = null
        // create slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        const ext = this.image.name.slice(this.image.name.lastIndexOf('.'))
        // delete image from firebase
        firebase
          .storage()
          .ref('allRecipes/' + this.recipe.id + this.recipe.ext)
          .delete()
          // add new image
          .then(() => {
            return firebase
              .storage()
              .ref('allRecipes/' + this.recipe.id + ext)
              .put(this.image)
          })
          .then(fileData => {
            return fileData.ref.getDownloadURL()
          })
          // update imageUrl in database
          .then(data => {
            let imageUrl = data
            firebase
              .firestore()
              .collection('allRecipes')
              .doc(this.recipe.id)
              .update({ imageUrl: imageUrl })
            this.$router.push({ name: 'Index' })
          })
      } else if (
        // not change image
        this.recipe.title != null &&
        this.recipe.Ingredients.length >= 1 &&
        this.recipe.cook !== null &&
        this.recipe.preparing !== null &&
        this.recipe.methods.length >= 1 &&
        this.image === null
      ) {
        firebase
          .firestore()
          .collection('allRecipes')
          .doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            Ingredients: this.recipe.Ingredients,
            slug: this.recipe.slug,
            methods: this.recipe.methods,
            preparing: this.recipe.preparing,
            cook: this.recipe.cook,
            ready_in: this.fullCookTime
          })
          .then(() => {
            this.$router.push({ name: 'Index' })
          })
      } else {
        this.feedback = 'please fill all forms'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
