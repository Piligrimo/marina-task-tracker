import marina from '@/assets/marina.png'
import pinkKimono from '@/assets/skins/pink-kimono.png'
import greenKimono from '@/assets/skins/green-kimono.png'
import blueKimono from '@/assets/skins/blue-kimono.png'
import panama from '@/assets/skins/panama.png'
import rainbowKimono from '@/assets/skins/rainbow-kimono.png'
import summerFit from '@/assets/skins/summer-fit.png'
import leatherArmor from '@/assets/skins/leather-armor.png'
import ironArmor from '@/assets/skins/iron-armor.png'
import diamondArmor from '@/assets/skins/diamond-armor.png'
import clownMakeup from '@/assets/skins/сlown-makeup.png'
import clownFit from '@/assets/skins/clown-fit.png'
import knife from '@/assets/skins/knife.png'
import shortSword from '@/assets/skins/short-sword.png'
import longSword from '@/assets/skins/long-sword.png'
import pickaxe from '@/assets/skins/pickaxe.png'

export default [
  { 
    id: 0,
    name: 'Дефолтный',
    image: marina,
    type: 'body',
    price: 0,
  },
  { 
    id: 2,
    name: 'Розовое кимоно',
    image: pinkKimono,
    type: 'body',
    price: 50,
  },
  { 
    id: 3,
    name: 'Зеленое кимоно',
    image: greenKimono,
    type: 'body',
    price: 50,
  },
  { 
    id: 4,
    name: 'Синее кимоно',
    image: blueKimono,
    type: 'body',
    price: 50,
  },
  { 
    id: 1,
    name: 'Радужное кимоно',
    image: rainbowKimono,
    type: 'body',
    price: 250,
  },
  { 
    id: 5,
    name: 'Панама Писи',
    image: panama,
    type: 'head',
    price: 10,
  },
  { 
    id: 6,
    name: 'Отпускной фит',
    image: summerFit,
    type: 'body',
    price: 100,
  },

  { 
    id: 7,
    name: 'Кожаная броня',
    image: leatherArmor,
    type: 'body',
    price: 50,
  },
  { 
    id: 8,
    name: 'Железная броня',
    image: ironArmor,
    type: 'body',
    price: 300,
  },
  { 
    id: 9,
    name: 'Алмазная броня',
    image: diamondArmor,
    type: 'body',
    price: 1000,
  },
  { 
    id: 15,
    name: 'Алмазная кирка',
    image: pickaxe,
    type: 'weapon',
    offset: 50,
    price: 1000,
  },
  { 
    id: 10,
    name: 'Макияж клоуна',
    image: clownMakeup,
    type: 'head',
    price: 10,
  },
  { 
    id: 11,
    name: 'Костюм клоуна',
    image: clownFit,
    type: 'body',
    price: 100,
  },
  { 
    id: 12,
    name: 'Нож',
    image: knife,
    type: 'weapon',
    offset: 90,
    price: 5,
  },
  { 
    id: 13,
    name: 'Короткий меч',
    image: shortSword,
    type: 'weapon',
    offset: 60,
    price: 50,
  },
  { 
    id: 14,
    name: 'Длинный меч',
    image: longSword,
    type: 'weapon',
    offset: 10,
    price: 100,
  },
]