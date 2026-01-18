import { Button } from '@/components/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IChangeBudgetPropsHandlers } from '@/screens/Budget';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export const BottomButtons = ({ budget }: IChangeBudgetPropsHandlers) => {
  const { saveBudgetInLocalStorage } = useLocalStorage();
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        style={{
          backgroundColor: '#FAFAFA',
          borderColor: '#E6E5E5',
          borderWidth: 1,
        }}
        onPress={goBack}
      >
        <Text style={{ color: '#6A46EB' }}>Voltar</Text>
      </Button>

      <Button>
        <Text
          style={{ color: '#ffffff' }}
          onPress={async () => {
            await saveBudgetInLocalStorage(budget);
            goBack();
          }}
        >
          Salvar
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1,
    padding: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
});
