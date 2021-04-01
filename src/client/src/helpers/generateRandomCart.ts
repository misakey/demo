import getRandomInt from 'helpers/getRandomInt';

const colors = [
    'blanches',
    'bleues',
    'rouges',
    'vertes',
    'noires',
    'grises',
    'jaunes',
];

interface Cart {
    price: number;
    color: string;
  }

const generateRandomCart = ():Cart => ({
    price: getRandomInt(50, 150),
    color: colors[getRandomInt(0, colors.length)],
});

export default generateRandomCart;