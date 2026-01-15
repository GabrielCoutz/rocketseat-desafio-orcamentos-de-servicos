import { StyleSheet, View } from 'react-native';

import { HomeHeader } from '@/components/HomeHeader';

export default function Home() {
  return (
    <View style={homeStyles.container}>
      <HomeHeader />
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
});
