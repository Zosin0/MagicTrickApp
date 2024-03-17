import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const StartMagicScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Começar a mágica"
        onPress={() => navigation.navigate('LockScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartMagicScreen;
