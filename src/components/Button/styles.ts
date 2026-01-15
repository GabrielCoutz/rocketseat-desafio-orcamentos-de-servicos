import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#6A46EB',
    borderRadius: 999,

    padding: 12,
    paddingRight: 16,
    paddingLeft: 16,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    alignSelf: 'flex-start',
  },
});
