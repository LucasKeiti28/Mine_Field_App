import {Dimensions} from 'react-native';

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15, //Proporcao do painel superior na tela
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get('window').width;
    return Math.floor(width / this.blockSize);
  },

  getRowsAmount() {
    const height = Dimensions.get('window').height;
    const heightAvailable = height * (1 - this.headerRatio);
    return Math.floor(heightAvailable / this.blockSize);
  },
};

export default params;
