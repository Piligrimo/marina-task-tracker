<template>
  <div class="quests pixel-border">
    <div class="page">
      <header class="header">
        <h1>Шмотки</h1>
        <h1 class="cross" @click="$emit('close')">x</h1>
      </header>
      <h2 v-if="pending" style="text-align: center; margin-top: 30px;">Загрузка...</h2>
      <template v-else>
        <h2>Золото: {{ gold }}</h2>
        <div class="shop" >
          <h1 :class="{transparent: currentItem <= 0}" @click="prevItem">&lt;</h1>
          <img 
            class="item pixel-img"
            :style="{marginRight:offset}"
            alt="marina" 
            :src="image"
          >
          <h1 :class="{transparent: currentItem >= skins.length - 1}" @click="nextItem">></h1>
        </div>
        <h2 class="item-name">{{ skins[currentItem].name }}</h2>
        <h3 v-if="!isBought" class="item-price">{{ skins[currentItem].price }} золота</h3>
        <h3 v-else-if="isEquipped" class="item-price">Надето</h3>
        <div class="button-container">
          <button v-if="!isEquipped && isBought" class="button pixel-border" @click="equip">Надеть</button>
          <button v-if="canBuy" class="button pixel-border" @click="buy">Купить</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import skins from '@/utils/skins'
import api from '@/api'

export default {
  name: 'SkinBook',
  props: {
    boughtItems: Array,
    gold: Number,
    equipment: Object
  },
  data () {
    return {
      skins,
      currentItem: 0,
      pending: false
    }
  },
  methods: {
    nextItem() {
      if (this.currentItem < this.skins.length - 1) {
        this.currentItem ++
      }
    },
    prevItem() {
      if (this.currentItem > 0) {
        this.currentItem --
      }
    },
    async equip() {
      this.pending = true
      await api.equipItem(skins[this.currentItem])
      this.$emit('update-info')
      this.pending = false
    },
    async buy() {
      this.pending = true
      await api.buyItem(skins[this.currentItem])
      this.$emit('update-info')
      this.pending = false
    }
  },
  computed: {
    image() {
      return skins[this.currentItem].image
    },
    isBought() {
      if (skins[this.currentItem].id === 0) return true
      return this.boughtItems.includes(skins[this.currentItem].id)
    },
    isEquipped() {
      const id = skins[this.currentItem].id
      if (!this.equipment.body && skins[this.currentItem].id === 0) return true
      return this.equipment.body === id ||
        this.equipment.head === id ||
        this.equipment.weapon === id
    },
    canBuy() {
      return this.gold >= this.skins[this.currentItem].price && !this.isBought
    },
    offset() {
      const offset = skins[this.currentItem].offset
      return offset ? offset + 'px' : '0px'
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
.transparent {
  opacity: 0.5;
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
.cross {
  color: #991e1e;
  transform: scaleY(0.6);
}
.shop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40%;
}
.item {
  height: 100%;
}
.item-name { 
  text-align: center;
  margin-bottom: 5px;
}
.item-price { 
  text-align: center;
}
.button {
  margin-right: 0;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>