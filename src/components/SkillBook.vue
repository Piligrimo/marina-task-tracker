<template>
  <div class="quests pixel-border">
    <div class="page">
      <header class="header">
        <h1>Изучение навыков 
        </h1>
        <h1 class="cross" @click="$emit('close')">x</h1>
      </header>
      <h3>Скиллпоинты: {{ skillPoints }}</h3>
      <div class="list">
        <h2 class="label" v-if="unlearnedSkills.length">Неизученные навыки</h2>
        <div class="list-item" v-for="skill in unlearnedSkills" :key="skill.id">
          <h3>{{ skill.name }}</h3>
          <h3 v-if="skillPoints > 0" @click="$emit('learn-skill', skill.id)">Изучить</h3>
        </div>
        <h2 class="label"  v-if="learnedSkills.length">Изученные навыки</h2>
        <div class="list-item" v-for="skill in learnedSkills" :key="skill.id">
          <h3>{{ skill.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { skillList } from '@/utils/utils'
export default {
  name: 'SkillBook',
  props: {
    learnedSkillIds: Array,
    skillPoints: Number
  },
  data () {
    return {
      skillList
    }
  },
  methods: {
 
  },
  computed: {
    learnedSkills() {
      return this.skillList.filter(skill => this.learnedSkillIds.includes(skill.id))
    },
    unlearnedSkills() {
      return this.skillList.filter(skill => !this.learnedSkillIds.includes(skill.id)) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quests {
  width: calc(100% - 60px);
  height: 450px;
  background-color: #ac6c06;
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 100;
  padding: 2px 2px 2px 20px ;
  margin: 20px;
  box-sizing: content-box;
}
h1,h3 {
  margin: 0;
  word-break: break-all;
}

.checkbox-container {
  margin-top: 10px;
}
.page{
  background-color: #f6d8aa;
  width: 100%;
  height: 100%;
  padding: 18px;
  box-sizing: border-box;
  border-left: 5px solid #845304;
}
.header {
  display: flex;
  justify-content: space-between;
   align-items: center;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cross {
  color: #991e1e;
  transform: scaleY(0.6);
}
.difficulty {
  font-size: 12px;
  margin-top: 2px;
}
.add {
  color: #1e991e;
  display: inline-block;
}
.back {
  color: #991e1e;
}
._big {
  transform: scale(1.6) translate(5px, 2px);
}
.input {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background-color: #f6d8aa;
  font-family: 'MyWebFont', monospace;
  font-size: 20px;
  padding: 10px;
  box-sizing: border-box;
  border: none;
}
.list {
  overflow-y: auto;
  height: 380px
}
.is-done {
  min-width: 100px;
  margin-left: 5px;
  text-align: end;
}
.trash {
  height: 15px;;
}
._done {
  opacity: 0.6;
}
</style>
@/utils/utils