import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { GeneralInfos } from '@/components/GeneralInfos';
import { Status } from '@/components/Status';
import { ServicesIncluded } from '@/components/ServicesIncluded';
import { ServiceResume } from '@/components/ServiceResume';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IQuoteDoc } from '@/types/budget';
import { useCallback, useState } from 'react';
import { RootStackParamList } from '@/types/navigation';
import { BottomButtons } from '@/components/BottomButtons';

export interface IChangeBudgetPropsHandlers {
  budget: IQuoteDoc;
  handleChangeBudgetData: React.Dispatch<React.SetStateAction<IQuoteDoc>>;
}

export default function Budget() {
  const [budget, setBudget] = useState<IQuoteDoc>({} as IQuoteDoc);
  const { goBack } = useNavigation();
  const { getBudgetFromLocalStorage } = useLocalStorage();
  const { params } = useRoute<RouteProp<RootStackParamList, 'budget'>>();

  useFocusEffect(
    useCallback(() => {
      const fetchBudget = async (id: string) => {
        const fetchedBudget = await getBudgetFromLocalStorage(id);

        if (fetchedBudget) setBudget(fetchedBudget);
        else Alert.alert('Erro', 'Orçamento não encontrado.');
      };

      if (params?.id) fetchBudget(params?.id);
    }, [params?.id])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
          <MaterialIcons name='arrow-back-ios' size={24} color='#4A4A4A' />
        </TouchableOpacity>

        <Text style={styles.headerText}>Orçamento</Text>
      </View>

      <ScrollView>
        <View style={styles.formContainer}>
          <GeneralInfos budget={budget} handleChangeBudgetData={setBudget} />

          <Status budget={budget} handleChangeBudgetData={setBudget} />

          <ServicesIncluded
            budget={budget}
            handleChangeBudgetData={setBudget}
          />

          <ServiceResume budget={budget} handleChangeBudgetData={setBudget} />
        </View>
      </ScrollView>

      <BottomButtons budget={budget} handleChangeBudgetData={setBudget} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  formContainer: {
    padding: 20,
    gap: 20,
  },
});
