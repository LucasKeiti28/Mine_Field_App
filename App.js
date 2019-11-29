import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Text, View, Alert} from 'react-native';

import params from './src/params';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import ChooseLevel from './src/screens/ChooseLevel';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/functions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(rows * columns * params.difficultLevel);
  };

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, columns, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert('Boooommm!!!!', 'Tente Novamente!');
    }

    if (won) {
      Alert.alert('Voce venceu!!', 'Parabens!');
    }

    this.setState({board, won, lost});
  };

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert('Voce venceu!!', 'Parabens!');
    }
    this.setState({board, won});
  };

  onLevelSelected = level => {
    params.difficultLevel = level;
    this.setState(this.createState());
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({showLevelSelection: true})}
        />
        <ChooseLevel
          isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({showLevelSelection: false})}
        />
        <View style={styles.board}>
          <MineField
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
});
