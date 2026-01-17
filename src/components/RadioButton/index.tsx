import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IRadioButtonProps {
  checked: boolean;
  label?: string | ReactNode;
  onPress: () => void;
}

export const RadioButton = ({ checked, label, onPress }: IRadioButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View
        style={[styles.checkbox, checked ? styles.checked : styles.default]}
      >
        {checked && <View style={styles.innerCircle} />}
      </View>

      {label && <Text>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    borderColor: '#A1A2A1',
  },
  checked: {
    borderColor: '#6A46EB',
    backgroundColor: '#6A46EB',
  },
  label: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#4A4A4A',
  },
  innerCircle: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});
