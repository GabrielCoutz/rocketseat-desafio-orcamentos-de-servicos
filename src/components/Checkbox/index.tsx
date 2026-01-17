import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ReactNode } from 'react';

interface ICheckboxProps {
  checked: boolean;
  label?: string | ReactNode;
  onPress: () => void;
}

export const Checkbox = ({ checked, label, onPress }: ICheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View
        style={[styles.checkbox, checked ? styles.checked : styles.default]}
      >
        {checked && <MaterialIcons name='check' color='white' size={14} />}
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
    borderRadius: 6,
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
});
