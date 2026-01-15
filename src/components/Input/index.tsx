import { inputStyles } from '@/components/Input/styles';
import { TextInput, TextInputProps, View } from 'react-native';

interface IInputProps extends TextInputProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = (props: IInputProps) => {
  return (
    <View style={inputStyles.container}>
      {props?.icon && props.iconPosition === 'left' && props.icon}

      <TextInput
        {...props}
        style={[inputStyles.input, props?.style]}
        placeholderTextColor='#676767'
      />

      {props?.icon && props.iconPosition === 'right' && props.icon}
    </View>
  );
};
