<template>
    <v-row class="main-row h-screen">
      <v-col cols="12" sm="6" class="branding-left">
        <h2 class="display-2 font-weight-bold mb-3">
          Add your branding
        </h2>
        <p class="p-label mb-2">
          Professionalize your proposals and invoices with you brand.
        </p>

        <div class="img-left mb-6">
          <v-avatar class="logo mb-6">
            <v-img :src="imageUrl" v-if="imageUrl"></v-img>
            <v-img v-else src="../assets/images/insert_your_logo2.jpg"></v-img>
          </v-avatar>
          <v-input
            type="file"
            class="purple-label"
            @click="onFileChange"
            accept="image/png, image/jpeg"
          >+  add your logo</v-input>
        </div>
        <div>
          <v-label class="field-title">BUSINESS NAME</v-label>
          <v-text-field
            placeholder="eg. da Vinci Design"
            variant="outlined"
            class="input-prop"
            v-model="businessName"
          ></v-text-field>
        </div>
        
        <v-row>
          <v-col cols="12" sm="6" >
            <v-label class="field-title">BRAND COLOR</v-label>
            <v-select
              placeholder="8C92AC"
              variant="outlined"
              disabled="true"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" >
            <v-label class="field-title">FONT</v-label>
            <v-select
              placeholder="Lato"
              :items="fontList"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>

        <p class="brand-color-message mb-6">
          Brand Color and Font selections are not included in the free plan, but you can set them now in case you upgrade later.
        </p>

        <div class="buttons-left">
          <v-btn variant="outlined" class="save-button" @click="toBeDefine">
            save
          </v-btn>

          <v-btn
            append-icon="mdi-arrow-right"
            variant="text"
            class="skip-button"
            @click="toBeDefine"
          >
            skip for now
            <template v-slot:append>
              <v-icon></v-icon>
            </template>
          </v-btn>
        </div>

      </v-col>
      <v-col cols="12" sm="6" class="branding-right">
        <p class="title-right">PREVIEW</p>

        <v-btn-toggle borderless class="toggle-right">
          <v-btn value="left" class="selected-toggle">
            <span class="hidden-sm-and-down">Proposals</span>
          </v-btn>

          <v-btn value="center">
            <span class="hidden-sm-and-down">Invoices</span>
          </v-btn>
        </v-btn-toggle>

        <div class="content-right">
          <v-col>
            <v-row class="pb-6 content-head mb-6" no-gutters>
              <v-col cols="6">
                <v-btn class="button-img-right pa-2 ma-2">
                  <template v-slot:prepend>
                    <v-avatar class="logo">
                      <v-img
                        alt="John"
                        src="../assets/images/insert_your_logo2.jpg"
                      ></v-img>
                    </v-avatar>
                  </template>

                  {{businessName ? businessName : 'Your studio name' }}

                </v-btn>
              </v-col>
              <v-col cols="4" offset="2">
                <div class="pa-1 ma-1 monthly-align">
                  <p> Monthly Retainer</p>
                  <p> $ {{ projectGoal.totalPrice }}</p>
                </div>
              </v-col>
            </v-row>
            
            <v-label class="mb-4"><v-icon color="">mdi-card</v-icon>Project Goals</v-label>
            <p class="project-goals-message">
              {{ projectGoal.clientGoal }}
            </p>

            <v-label class="mb-4"><v-icon color="">mdi-card</v-icon>Scope</v-label>
            
            <v-expansion-panels
              color="#F6F6F6"
              variant="default"
              static="true"
              class="mb-2"
              v-for="(category, index) in previewScope.categoryList" :key="index"
            > 
              <v-expansion-panel>
                <v-expansion-panel-title class="expansion-header">
                  <div class="expansion-title">
                    <p>{{category}}</p>
                    <p>$ {{previewScope.totalCategoryPrice[category]}}</p>
                    
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  v-for="(task, index) in previewScope.hashMap[category]"
                  :key="index"
                  class="expansion-box"
                >
                  <div>
                    <div class="expansion-content pb-3">
                      <p>{{task.name}}</p>
                      <p>$ {{task.price}}</p>
                    </div>
                    <div>{{task.description}}</div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </div>

      </v-col>
    </v-row>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getPreviewDataService, getProjectGoal, getPreviewScope } from '../services/PreviewDataService'
import { windowAlert } from '../assets/utils/alertsFunctions';
export default {
  emits: ['image-uploaded'],
  setup() {
    let previewInfo;
    let businessName = ref('');
    let projectGoal = ref({});
    let previewScope = ref([]);
    let imageUrl = ref('');
    let fontList = ref([
      'Arial',
      'Verdana',
      'Tahoma',
      'Trebuchet MS',
      'Times New Roman',
      'Georgia',
      'Garamond',
      'Courier',
    ])
    onMounted(async () => {
      previewInfo = await getPreviewDataService();
      projectGoal.value = getProjectGoal(previewInfo?.project);
      previewScope.value = getPreviewScope(previewInfo?.scope?.tasks);
    })

    const toBeDefine = () => {
      windowAlert('To Be Define');
    }

    const onFileChange = (element) => {
 
      const reader = new FileReader();
      reader.onload = () => {
        imageUrl.value = reader.result;
      };
      console.log('onFileChange: ', reader, element, imageUrl);
      // reader.readAsDataURL(element);

    };
    

    return {
      projectGoal,
      previewScope,
      businessName,
      onFileChange,
      imageUrl,
      fontList,
      toBeDefine
    }
  }
}
</script>

<style scoped>
  .main-row {
    margin: 48px;
  }
  .purple-label {
    text-decoration: none;
    color: #730A73;
    font-weight: 600;
    cursor: pointer;
  }
  .branding-left {
    padding-right: 60px;
    max-height: 100vh;
    .img-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        min-width: 100px;
        min-height: 100px;
      }
    }
    .p-label{
      padding-right: 12px;
    }
    .brand-color-message {
      background-color: #D29ED2;
      font-size: 12px;
      padding: 12px 18px;
      font-weight: 600;
      color: #730A73;
      border-radius: 6px;
    }
    .buttons-left {
      display: flex;
      justify-content: space-evenly;
      margin: 12px 0;
      .save-button {
        background-color: #3C013C;
        color: white;
        border-radius: 25px;
        font-size: 12px;
        text-transform: lowercase;
        min-width: 80px;
        min-height: 40px;
      }
      .skip-button {
        font-size: 12px;
        min-width: 80px;
        min-height: 40px;
        font-weight: 800;
        text-transform: lowercase;
        color: #730A73;
      }
    }
    .input-prop {

    }
    .field-title {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .branding-right {
    background-color: #eeeeeed8;
    border: 2px solid #B2B5B5;
    border-radius: 25px; 
    border-style: groove;
    padding: 0 48px;
    z-index: 5;
    .title-right {
      font-weight: 600;
      font-size: 14px;
      display: flex;
      justify-content: center;
      padding-top: 24px;
    }
    .toggle-right {
      display: flex;
      justify-content: center;
      margin: 18px 0;
      max-height: 40px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
      .selected-toggle {
        color: #730A73;
        background-color: #e4bde4;
      }
    }
    .content-right {
      display: flex;
      background-color: white;
      width: 100%;
      max-height: 84vh;
      min-height: 84vh;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 15px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
      }
      .monthly-align {
        display: flex;
        flex-direction: column;
        align-items: end;
      }
      .expansion-header {
        border: 2px solid #eeeeeed8;
      }
      .expansion-title {
        display: flex;
        justify-content: space-between;
        margin-left: 36px;
        width: 100%;
        p {
          font-weight: 600;
        }
      }
      .expansion-box {
        border: 1px solid #eeeeeed8;
        .expansion-content {
          display: flex;
          justify-content: space-between;
          width: 100%;
          p {
            font-weight: 600;
          }
        }
      }
      
      &.v-expansion-panel-title__icon {
        position: absolute;
      }
      .content-head {
        border-bottom: 1px solid #B2B5B5;
        .logo {
          min-width: 50px;
          min-height: 50px;
          margin-right: 12px;
        }
      }
    }
    .button-img-right {
      height: 80px;
      border-style: dotted;
      border: 1px solid #B2B5B5;
      border-radius: 12px;
      margin-left: 12px;
      background-color: #e8eeee;
      font-size: 12px;
      font-weight: 800;
      color: #9da3a3;
      min-width: 220px;
      text-transform: capitalize;

    }
    .project-goals-message {
      min-height: 80px;
    }
    .icon {
      order: 0;
    }
    .header {
      order: 1;
    }
  }  
</style>