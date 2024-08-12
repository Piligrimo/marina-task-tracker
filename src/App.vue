<template>
  <div id="app">
    <template v-if="!initialLoading">
      <div class="image-container">
        <div class="character-container" :class="animationClass" >
          <img v-if="headPiece" class="head-piece pixel-img" alt="head-piece" :src="headPiece">
          <img v-if="weapon" class="weapon pixel-img" alt="weapon" :src="weapon">
          <img class="character pixel-img" alt="marina" :src="bodyPiece">
        </div>
      </div>
      <template v-if="section === 'info'">
        <div>
          <h2>Марина</h2>
          <div class="info">
            <h3>Уровень: {{ currentLevel }}</h3>
            <h3>Золото: {{ gold }}</h3>
          </div>
        </div>
        <div class="progress-container pixel-border">
          <div class="progress" :style="{ width: formattedProgress}"></div>
        </div>
        <button class="button pixel-border" @click="questsVisible = true">Квесты</button>
        <button class="button pixel-border" @click="section = 'skills'">Навыки</button>
        <button class="button pixel-border" @click="skinBookVisible = true">Шмотки</button>
      </template>
      <template v-else>
        <h2>Навыки</h2>
        <h3>Скиллпоинты: {{ skillPoints }}</h3>
        <button
          v-for="skill in learnedSkills"
          class="button pixel-border _compact"
          :key="skill.id"
          @click="playAnimation(skill.animation)"
        >
          {{ skill.shortName }}
        </button>
        <button class="button pixel-border _compact" @click="skillBookVisible = true">+</button>
        <button class="button pixel-border" @click="section = 'info'">Назад</button>
      </template>
    
      <quests
        v-show="questsVisible" 
        @close="closeQuests"
        @add-exp="experienceBuffer += $event"
        @add-gold="gold += $event"
      />
      <skill-book
        v-show="skillBookVisible" 
        :skill-points="skillPoints"
        :learned-skill-ids="skillIds"
        @close="closeSkillBook"
        @learn-skill="learnSkill"
      />
      <skin-book 
        v-show="skinBookVisible" 
        :gold="gold" 
        :equipment="equipment" 
        :bought-items="boughtItems"
        @close="skinBookVisible = false"
        @update-info="initInfo"
      />
    </template>
    <div v-else class="loader">
      <img src="./assets/h.png" alt="loading" class="pixel-img head">
      <h1>Загрузка...</h1>
    </div>
  </div>
</template>

<script>
import Quests from './components/Quests.vue'
import SkillBook from './components/SkillBook.vue'
import SkinBook from './components/SkinBook.vue'
import { skillList } from './utils/utils'
import skins from './utils/skins'
import api from '@/api'
import cat from '@/assets/skins/cat.png'
export default {
  name: 'App',
  components: {
    Quests,
    SkillBook,
    SkinBook
  },
  data() { 
   return {
     experience: 0,
     gold: 0,
     questsVisible: false,
     skillBookVisible: false,
     skinBookVisible: false,
     experienceBuffer: 0,
     section: 'info',
     skillIds:[],
     animationClass: '',
     timer: null,
     equipment: {
      body: null,
      head: null,
      weapon: null,
     },
     boughtItems: [],
     initialLoading: true
    }
  },
  async created() {
    await this.initInfo()
    this.initialLoading = false
  },
  computed: {
    currentLevel() {
      let level = 0
      while (this.experience >= this.experienceForNthLevel(level)) {
        level++
      }
      if (level <  1) return 1
      return level - 1
    },
    experienceDelta() {
      return this.experienceForNthLevel(this.currentLevel+1) - this.experienceForNthLevel(this.currentLevel)
    },
    progressThroughLevel() {
      return this.experience - this.experienceForNthLevel(this.currentLevel)
    },
    progressInPercents() {
      return Math.floor((this.progressThroughLevel / this.experienceDelta )* 100)
    }, 
    formattedProgress() {
      if (this.progressInPercents < 0) return '0'
      if (this.progressInPercents >= 99) return '100%'
      return this.progressInPercents + '%'
    },
    learnedSkills() {
      return this.skillIds.map(id => skillList.find(skill => skill.id === id))
    },
    skillPoints() {
      return this.currentLevel - this.learnedSkills.length - 1
    },
    bodyPiece() {
      const skin = skins.find(skin => skin.id === this.equipment.body)
      return skin ? skin.image : skins[0].image
    },
    headPiece() {
      const skin = skins.find(skin => skin.id === this.equipment.head)
      return skin ? skin.image : null
    },
    weapon() {
      if (this.animationClass === 'cat-ch-animation') return cat
      const skin = skins.find(skin => skin.id === this.equipment.weapon)
      return skin ? skin.image : null
    }
   },
  methods: {
    async initInfo() {
      const { experience, gold, skillIds} = await api.getInfo()
      const { body, head, weapon, boughtItems} = await api.getEquipment()

      this.equipment.body = body
      this.equipment.head = head
      this.equipment.weapon = weapon
      if (boughtItems) {
        this.boughtItems = JSON.parse(boughtItems)
      }
      this.experience = experience - 0.0001
      this.gold = gold
      if (skillIds) {
        this.skillIds = JSON.parse(skillIds)
      }
    },
    experienceForNthLevel(n) {
      if (n === 1) return 0
      return Math.floor(n * n * 2)
    },
    closeQuests() { 
      this.questsVisible = false
      this.initInfo()
    },
    closeSkillBook() {
      this.skillBookVisible = false
    },
    async learnSkill(skillId) {
      await api.learnSkill(skillId)
      this.skillIds.push(skillId)
    },
    playAnimation(animation) {
        this.animationClass = ''
        clearTimeout(this.timer)

        this.timer = setTimeout(() => {
          this.animationClass = animation+'-animation'
        }, 1)
    }
  }

}
</script>

<style>
@import url(./assets/animations.css);
body {
  background-color: #beb69f;
}

@font-face {
  font-family: 'MyWebFont';
  src: url("assets/ITP.woff2") format("woff2"),
      url("assets/ITP.woff") format("woff"),
      url('assets/ITP.ttf') format('truetype'), /* IE9 Compat Modes */
      url('assets/ITP.ttf?#iefix') format('embedded-opentype'), /* IE6-IE8 */
}
:root {
  --pixel-color: #ac6c06;
  --pixel-width: 4px;
}

#app {
  font-family: 'MyWebFont', system-ui;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #472e05;
  max-width: 350px;
  margin: auto;
  padding: 60px 20px;
}
.button {
  font-family: 'MyWebFont', monospace;
  width: 90px;
  margin-top: 20px;
  padding: 10px;
  font-size: 20px;
  background-color: #ffc904;
  border: none;
  color: #472e05;
  margin-right: 20px;
}
.button:active {
  transform: scale(0.95);
}
.button:disabled {
  background-color: #b7b7b7;
  color: #6f6f6f;
}
.button:disabled:active {
  transform: scale(1);
  background-color: #bc6c6c;
}
.button._compact {
  width: 45px;
}
.character {
  margin: auto;
  width: 150px;
}

.pixel-img {
  image-rendering: -o-crisp-edges;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}
.progress-container {
  height: 20px;
  width: 100%;
  margin: auto;
  background-color: #694d1f;
}
.progress {
  height: 100%;
  background-color: #ffc904;
  transition: width .4s;
}
.pixel-border {
  border: none;
  border-radius: 0;
  -webkit-box-shadow: 
    0px var(--pixel-width) 0px 0px var(--pixel-color),
    0px calc(var(--pixel-width) * -1) 0px 0px var(--pixel-color),
    calc(var(--pixel-width) * -1) 0px 0px 0px var(--pixel-color),
    var(--pixel-width) 0px 0px 0px var(--pixel-color);
  -moz-box-shadow: 
    0px var(--pixel-width) 0px 0px var(--pixel-color),
    0px calc(var(--pixel-width) * -1) 0px 0px var(--pixel-color),
    calc(var(--pixel-width) * -1) 0px 0px 0px var(--pixel-color),
    var(--pixel-width) 0px 0px 0px var(--pixel-color);
  box-shadow: 
    0px var(--pixel-width) 0px 0px var(--pixel-color),
    0px calc(var(--pixel-width) * -1) 0px 0px var(--pixel-color),
    calc(var(--pixel-width) * -1) 0px 0px 0px var(--pixel-color),
    var(--pixel-width) 0px 0px 0px var(--pixel-color);
}
.info {
  display: flex;
  justify-content: space-between;
}
.image-container {
  display: flex;
  justify-content: center;
}
input[type='date'] {
  -webkit-appearance: none;
  min-height: 1.2em; 
}
.character-container {
  position: relative;
}
.head-piece {
  position: absolute;
  width: 168px;
  top: -45px;
  left: 2px;
}

.weapon {
  position: absolute;
  width: 134px;
  top: 14px;
  left: -87px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
.loader {
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.head {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  width: 100px;
}
</style>