<template>
  <div class="addItem container">
    <h2 class="has-text-centered has-indigo-text">Add New Recipe</h2>
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
            v-model="title"
            placeholder="Mojito"
            autocomplete="off"
          />
        </div>
      </div>
      <!-- add title -->

      <!-- add ingredients -->
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
            @keydown.tab.prevent="addIng"
            @input="iconReset"
          />
          <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
            :duration="200"
          >
            <span
              @click="addIng"
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
      <!-- add ingredients -->

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
            v-for="(item, index) in ingredients"
            :key="index"
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
              v-model="prepTime.hour"
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
              v-model="prepTime.minutes"
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
              v-model="cookTime.hour"
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
              v-model="cookTime.minutes"
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
      <div class="box addImage" v-if="imageUrl">
        <figure class="image is-16by9">
          <img class="" :src="imageUrl" />
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
            @keydown.tab="addPrepMethods"
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
            v-for="(item, index) in prepMethods"
            :key="index"
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
          Add Item
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import slugify from 'slugify'
import { mapGetters } from 'vuex'

export default {
  name: 'addItem',
  data() {
    return {
      title: null,
      cookTime: {
        hour: 0,
        minutes: 0
      },
      prepTime: {
        hour: 0,
        minutes: 0
      },
      item: null,
      ingredients: [],
      methodItem: null,
      prepMethods: [],
      feedback: null,
      prepFeedback: null,
      icon: 'add',
      slug: null,
      imageUrl: null,
      image: null
    }
  },
  computed: {
    ...mapGetters(['user']),
    check() {
      return this.item !== null && this.item.length >= 3
    },
    fullCookTime() {
      let fullTime = {
        hour: this.prepTime.hour + this.cookTime.hour,
        minutes: this.prepTime.minutes + this.cookTime.minutes
      }
      return fullTime
    }
  },
  methods: {
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
    // add items to firebase
    onSubmit() {
      if (
        this.title != null &&
        this.ingredients.length >= 1 &&
        this.cookTime !== null &&
        this.prepTime !== null &&
        this.prepMethods.length >= 1
      ) {
        this.feedback = null
        // create slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        let imageUrl
        let key
        // add to firebase db
        firebase
          .firestore()
          .collection('allRecipes')
          .add({
            title: this.title,
            Ingredients: this.ingredients,
            slug: this.slug,
            prepTime: this.prepTime,
            methods: this.prepMethods,
            imageUrl: this.imageUrl,
            preparing: this.prepTime,
            cook: this.cookTime,
            ready_in: this.fullCookTime,
            userID: this.user.data.userID
          })
          .then(docRef => {
            key = docRef.id
            const filename = this.image.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            return firebase
              .storage()
              .ref('allRecipes/' + key + ext)
              .put(this.image)
          })
          .then(fileData => {
            return fileData.ref.getDownloadURL()
          })
          .then(data => {
            imageUrl = data
            firebase
              .firestore()
              .collection('allRecipes')
              .doc(key)
              .update({ imageUrl: imageUrl })
            this.$router.push({ name: 'Index' })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.feedback = 'please fill all forms'
      }
    },
    // add items before submit
    addIng() {
      if (this.item) {
        this.ingredients.push(this.item)
        this.item = null
        this.feedback = null
        this.icon = 'check'
      } else {
        this.feedback = 'You must enter ingredients'
      }
    },
    // remove ingredients before submit
    removeItem(item) {
      this.ingredients = this.ingredients.filter(id => {
        return id != item
      })
    },
    // add methods before submit
    addPrepMethods() {
      if (this.methodItem) {
        this.prepMethods.push(this.methodItem)
        this.methodItem = null
        this.prepFeedback = null
      } else {
        this.prepFeedback = 'You must enter methods'
      }
    },
    // remove methoods before submit
    removeMethod(item) {
      this.prepMethods = this.prepMethods.filter(id => {
        return id != item
      })
    },
    iconReset() {
      this.icon = 'add'
    }
  }
}
</script>

<style lang="scss" scoped>
.addItem {
  margin-top: 30px;
  padding: 20px;
  max-width: 600px;
  h2 {
    font-size: 1.8em;
    margin: 25px auto;
    font-weight: 500;
  }
  .is-timepick {
    flex-direction: column;
  }
  .field {
    margin: 25px auto;
    .add-ingredient {
      cursor: pointer;
      pointer-events: auto;
    }
  }
  .submit-form {
    margin: 10px auto;
    button {
      margin-top: 10px;
    }
    p {
      font-size: 14px;
    }
  }
  .addImage {
    padding: 0.5rem;
  }
  .ingredients-box {
    display: flex;
    flex-wrap: wrap;
    .tag {
      padding: 1.15rem 1rem 1.15rem 1rem;
      font-size: 13px;
      border: #48c774 solid 1px;
      button {
        position: absolute;
        top: 6px;
        right: 12px;
        background-color: rgba(10, 10, 10, 0.7);
        transition: background-color 0.3s ease-in;
        &:hover {
          background-color: rgb(192, 35, 35);
          transition: background-color 0.3s ease-in;
        }
      }
    }
  }
}
</style>
