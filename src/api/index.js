const axios = require('axios');
const isLocal = false
const instance = axios.create(
    {
        baseURL: isLocal ? "http://localhost:8081/" :  "https://ribbon-awake-chance.glitch.me/",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        }
    })

export default {
    async getInfo() {
        try {
            const { data } = await instance.get('/info')
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getEquipment() {
        try {
            const { data } = await instance.get('/equipment')
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async buyItem(item) {
        try {
            const { data } = await instance.put('/buy-item', item)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async equipItem(item) {
      try {
          const { data } = await instance.put('/equip-item', item)
          return data
      } catch (e) {
          console.error(e)
      }
    },
    async learnSkill(id) {
        try {
            const { data } = await instance.put('/learn-skill', {id})
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async getQuests() {
        try {
            const { data } = await instance.get('/quests')
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async createQuest(quest) {
        try {
            const { data } = await instance.post('/quests', quest)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async deleteQuest(id) {
        try {
            const { data } = await instance.delete(`/quests/${id}`)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async checkQuest(id) { 
        try {
            const { data } = await instance.put(`/check-quest/${id}`)
            return data
        } catch (e) {
            console.error(e)
        }
    }
}