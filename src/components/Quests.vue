<template>
  <div class="quests pixel-border">
    <div class="page">
      <header class="header">
        <h1>Квесты 
          <b v-if="page === 'list'" class="add _big" @click="page = 'add'">+</b> 
          <b v-else class="back _big" @click="page = 'list'"> &lt;= </b> 
        </h1>
        <h1 class="cross" @click="$emit('close')">x</h1>
      </header>
      <div class="list" v-if="page === 'list'">
        <p 
          v-if="quests.length === 0" 
          class="empty-list"
        >
          Пока нет квестов, нажми <b class="add" @click="page = 'add'">+</b> чтобы создать
        </p>
        <div v-else>
          <h2 v-if="dailyQuests.length > 0">Ежедневные квесты</h2>
          <div class="quest" v-for="(quest,i) in dailyQuests" :key="i+'daily'">
            <div class="quest-header">
              <h3>
                {{ quest.text }}
                <img src="@/assets/trash.png" alt="" class="trash" @click="deleteQuest(i)">
              </h3>
              <h3 @click="changeDailyDone(quest, i)" class="is-done" :class="isDailyDone(quest) ? 'add' : 'back'"> {{ isDailyDone(quest) ? 'Готово' : 'Не готово' }} </h3>
            </div>
            <p class="difficulty">{{ diffсulties[quest.difficulty] }}   ( {{dailyRewards[quest.difficulty]}} ед. опыта )</p>
          </div>
          <h2 v-if="notDoneQuests.length > 0">Квесты с дедлайном</h2>
          <div class="quest" v-for="(quest,i) in notDoneQuests" :key="i+'nondaily'">
            <div class="quest-header">
              <h3>
                {{ quest.text }}
                <img src="@/assets/trash.png" alt="" class="trash" @click="deleteQuest(i)">
              </h3>
              <h3 @click="changeDone(quest)" class="is-done" > Выполнен </h3>
            </div>
            <p class="difficulty">{{ diffсulties[quest.difficulty] }}   ( {{nonDailyRewards[quest.difficulty]}} золота )</p>
          </div>
          <h2 v-if="doneQuests.length > 0">Выполненые квесты</h2>
          <div class="quest _done" v-for="(quest,i) in doneQuests" :key="i+'done'">
            <div class="quest-header">
              <h3>
                {{ quest.text }}
                <img src="@/assets/trash.png" alt="" class="trash" @click="deleteQuest(i)">
              </h3>
              <h3 @click="changeDone(quest)" class="is-done" > Отменить </h3>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <textarea class="input pixel-border" placeholder="Введи задание" v-model="text" />
        <div class="checkbox-container">
          <input type="checkbox" class="pixel-border" v-model="daily"> <span style="margin-left:6px;"> ежедневный</span>
        </div>
        <p class="label">сложность</p>
        <select  v-model="difficulty" class="input pixel-border">
          <option
            v-for="option in diffсultyOptions"
            :value="option.difficulty"
            :key="option.difficulty"
          >
            {{ option.text }}
          </option>
        </select>
        <template v-if="!daily"> 
          <p class="label">срок</p>
          <input placeholder="Выбери дедлайн"  class="input pixel-border" type="date" v-model="deadline">
        </template>
        <button :disabled="disable" class="button pixel-border" @click="create">создать</button>
      </div>
    </div>
  </div>
</template>

<script>
import { diffсulties, dailyRewards, nonDailyRewards } from '@/utils'
export default {
  name: 'QuestList',
  data () {
    return {
      quests: [],
      page: 'list',
      text: '',
      daily: false,
      deadline: null,
      difficulty: 0,
      diffсulties,
      dailyRewards,
      nonDailyRewards,
    }
  },
  methods: {
    create() {
      this.quests.push({
        text: this.text,
        daily: this.daily,
        deadline: this.deadline,
        difficulty: this.difficulty
      })
      this.text = ''
      this.daily = false
      this.deadline = null
      this.difficulty = 0
      this.page = 'list'
    },
    deleteQuest(i) {
      this.quests.splice(i, 1)
    },
    isDailyDone (quest) {
      if (!quest.date) false
      var start = new Date();
      start.setUTCHours(0,0,0,0);
      return Number(new Date(quest.date)) > Number(start)
    },
    changeDailyDone (quest) {
      if (this.isDailyDone(quest)) { 
        this.$set(quest, 'date', null)
        this.$emit('add-exp', -dailyRewards[quest.difficulty])
      } else {
        this.$set(quest, 'date', new Date())
        this.$emit('add-exp', dailyRewards[quest.difficulty])
      }
    },
    changeDone(quest) {
      if (quest.done) {
        this.$set(quest, 'done', false)
         this.$emit('add-gold', -nonDailyRewards[quest.difficulty])
      } else {
        this.$set(quest, 'done', true)
        this.$emit('add-gold', nonDailyRewards[quest.difficulty])
      }
    }
  },
  created() {
    addEventListener("unload", () => {
      localStorage.setItem('quests', JSON.stringify(this.quests))
    })
    const quests = localStorage.getItem('quests')
    if (quests) {
      this.quests = JSON.parse(quests)
    }
  },
  computed: {
    diffсultyOptions () {
      const options = []
      for (let i=0; i<3; i++) { 
        const reward = this.daily ? dailyRewards[i] : nonDailyRewards[i]
        const rewardText = `${reward} ${this.daily ? 'ед. опыта' : 'золота'}`
        options.push({
          difficulty: i,
          text: `${diffсulties[i]} - ${rewardText} `,
        })
      }
      return options
    },
    disable () {
      return this.text.length === 0 || (!this.daily && this.deadline === null)
    },
    dailyQuests () {
      return this.quests.filter(quest => quest.daily)
    },
    nonDailyQuests () {
      return this.quests.filter(quest => !quest.daily)
    },
    notDoneQuests () {
      return this.nonDailyQuests.filter(quest => !quest.done)
    },
    doneQuests () {
      return this.nonDailyQuests.filter(quest => quest.done)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  margin: 20px 0 -12px 0
}
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
.quest-header {
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
