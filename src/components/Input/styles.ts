import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    height: 48,
    borderWidth: 1,
    borderColor: '#E6E5E5',
    backgroundColor: '#FAFAFA',
    flexShrink: 1,
  },
  input: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#0F0F0F',
    width: '90%',
  },
});
