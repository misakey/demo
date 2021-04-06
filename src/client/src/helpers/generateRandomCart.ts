import getRandomInt from 'helpers/getRandomInt';

const colors = [
    'bleues',
    'rouges',
    'vertes',
    'noires',
    'grises',
    'jaunes',
];

export const colorsToHex = (color:string):string => {
    switch (color) {
        case 'bleues':
            return '#0D4374';
        case 'rouges':
            return '#C71316';
        case 'vertes':
            return '#00A88F';
        case 'noires':
            return '#232323';
        case 'grises':
            return '#777777';
        case 'jaunes':
            return '#FFCA06';
        default:
            return '#CCC';
    }
}

export type Cart = {
    price: number;
    color: string;
  }

const generateRandomCart = ():Cart => ({
    price: getRandomInt(50, 150),
    color: colors[getRandomInt(0, colors.length)],
});

export default generateRandomCart;