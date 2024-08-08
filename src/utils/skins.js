import marina from '@/assets/marina.png'
import pinkKimono from '@/assets/skins/pink-kimono.png'
import greenKimono from '@/assets/skins/green-kimono.png'
import blueKimono from '@/assets/skins/blue-kimono.png'
import panama from '@/assets/skins/panama.png'
import rainbowKimono from '@/assets/skins/rainbow-kimono.png'
import summerFit from '@/assets/skins/summer-fit.png'

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
]