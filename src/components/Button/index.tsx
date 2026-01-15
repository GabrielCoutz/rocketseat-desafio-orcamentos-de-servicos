import { buttonStyles } from '@/components/Button/styles';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const Button = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.button, props?.style]}
      {...props}
      activeOpacity={0.8}
    >
      {props.children}
    </TouchableOpacity>
  );
};
