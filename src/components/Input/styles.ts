import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E6E5E5',

    backgroundColor: '#FAFAFA',
    flex: 1,
    overflow: 'hidden',
  },
  input: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#0F0F0F',
    width: '90%',
  },
});
