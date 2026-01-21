import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { RootStackParamList } from '@/types/navigation';
import { IQuoteDoc, IQuoteDocItem } from '@/types/budget';
import { StatusTag } from '@/components/StatusTag';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default function Details() {
  const { goBack, navigate } = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'details'>>();
  const {
    getBudgetFromLocalStorage,
    deleteBudgetFromLocalStorage,
    duplicateBudgetInLocalStorage,
  } = useLocalStorage();
  const [budgetDetails, setBudgetDetails] = useState<IQuoteDoc>(
    {} as IQuoteDoc
  );

  const budgetId = params.id;

  useEffect(() => {
    const fetchBudgetDetails = async (id: string) => {
      const budgetDetails = await getBudgetFromLocalStorage(id);

      if (!budgetDetails)
        return Alert.alert('Erro', 'Detalhes do orçamento não encontrados.');

      setBudgetDetails(budgetDetails);
    };

    fetchBudgetDetails(budgetId);
  }, [budgetId]);

  const totalPrice =
    budgetDetails?.items?.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    ) || 0;
  const discountAmount = totalPrice * ((budgetDetails?.discountPct || 0) / 100);
  const finalPrice = totalPrice - discountAmount;
  const hasDiscount =
    budgetDetails?.discountPct && budgetDetails.discountPct > 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
            <MaterialIcons name='arrow-back-ios' size={24} color='#4A4A4A' />
          </TouchableOpacity>

          <Text style={styles.headerText}>Orçamento #{budgetDetails?.id}</Text>
        </View>

        <StatusTag status={budgetDetails?.status} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.projectSection}>
          <View>
            <View style={styles.projectHeader}>
              <View style={styles.iconContainer}>
                <MaterialIcons name='storefront' size={16} color='#6A46EB' />
              </View>
              <Text style={styles.projectTitle}>
                {budgetDetails?.title || 'Não informado'}
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={[styles.infoRow, { flex: 1 }]}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Cliente</Text>
                <Text style={styles.infoValue}>
                  {budgetDetails?.client || 'Não informado'}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Criado em</Text>
              <Text style={styles.infoValue}>
                {budgetDetails?.createdAt
                  ? new Date(budgetDetails.createdAt).toLocaleDateString(
                      'pt-BR'
                    )
                  : 'Não informado'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Atualizado em</Text>
              <Text style={styles.infoValue}>
                {budgetDetails?.updatedAt
                  ? new Date(budgetDetails.updatedAt).toLocaleDateString(
                      'pt-BR'
                    )
                  : 'Não informado'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name='short-text' size={16} color='#6A46EB' />
            <Text style={styles.sectionHeaderText}>Serviços inclusos</Text>
          </View>

          <View style={styles.servicesList}>
            {budgetDetails?.items?.length ? (
              budgetDetails.items.map((item: IQuoteDocItem) => (
                <View key={item.id} style={styles.serviceItem}>
                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceTitle}>{item.title}</Text>
                    <Text style={styles.serviceDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.servicePricing}>
                    <Text style={styles.servicePrice}>
                      <Text style={styles.currency}>R$ </Text>
                      <Text>{item.price.toFixed(2).replace('.', ',')}</Text>
                    </Text>
                    <Text style={styles.serviceQuantity}>Qt: {item.qty}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noServicesText}>
                Nenhum serviço adicionado ainda.
              </Text>
            )}
          </View>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryIconContainer}>
            <MaterialIcons name='credit-card' size={16} color='#6A46EB' />
          </View>

          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text
                style={[
                  styles.summaryValue,
                  hasDiscount
                    ? {
                        textDecorationLine: 'line-through',
                      }
                    : undefined,
                ]}
              >
                {formatCurrency(totalPrice)}
              </Text>
            </View>

            {hasDiscount && (
              <View
                style={[
                  {
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  },
                ]}
              >
                <View style={[styles.summaryRow, { gap: 8 }]}>
                  <Text style={styles.summaryLabel}>Desconto</Text>

                  <View style={styles.discountContainer}>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>
                        {budgetDetails.discountPct}% off
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.discountValue}>
                  - {formatCurrency(discountAmount)}
                </Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Investimento total</Text>
              <Text style={styles.totalValue}>
                <Text style={styles.totalCurrency}>R$ </Text>
                <Text>{finalPrice.toFixed(2).replace('.', ',')}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            Alert.alert(
              'Deletar orçamento',
              'Tem certeza que deseja deletar este orçamento? Essa ação é irreversível.',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                  isPreferred: true,
                },
                {
                  text: 'Sim, deletar',
                  style: 'destructive',
                  onPress: async () => {
                    await deleteBudgetFromLocalStorage(budgetDetails.id);

                    Alert.alert('Sucesso', 'Orçamento deletado com sucesso.');

                    goBack();
                  },
                },
              ]
            )
          }
        >
          <MaterialIcons name='delete-outline' size={20} color='#FF4757' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={async () => {
            Alert.alert(
              'Duplicar orçamento',
              'Tem certeza que deseja duplicar este orçamento?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                  isPreferred: true,
                },
                {
                  text: 'Sim, duplicar',
                  style: 'default',
                  onPress: async () => {
                    const duplicatedBudget =
                      await duplicateBudgetInLocalStorage(budgetDetails.id);

                    if (!duplicatedBudget?.id)
                      return Alert.alert(
                        'Erro',
                        'Não foi possível duplicar o orçamento.'
                      );

                    Alert.alert('Sucesso', 'Orçamento duplicado com sucesso.');

                    navigate('budget', { id: duplicatedBudget.id });
                  },
                },
              ]
            );
          }}
        >
          <MaterialIcons name='content-copy' size={20} color='#6A46EB' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigate('budget', {
              id: budgetDetails.id,
            })
          }
        >
          <MaterialIcons name='edit' size={20} color='#6A46EB' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <MaterialIcons name='share' size={16} color='#FFFFFF' />
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  projectSection: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F0F0F',
    flex: 1,
  },
  infoSection: {
    paddingBottom: 20,
    backgroundColor: '#FAFAFA',
    gap: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  infoRow: {
    gap: 8,
  },
  infoItem: {
    flex: 1,
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#676767',
  },
  infoValue: {
    fontSize: 14,
    color: '#0F0F0F',
    fontWeight: '500',
  },
  servicesSection: {
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionHeaderText: {
    fontSize: 12,
    color: '#676767',
  },
  servicesList: {
    gap: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 8,
  },
  serviceContent: {
    flex: 1,
    gap: 4,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#676767',
    lineHeight: 16,
  },
  servicePricing: {
    alignItems: 'flex-end',
    gap: 2,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  currency: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  serviceQuantity: {
    fontSize: 12,
    color: '#4A4A4A',
  },
  noServicesText: {
    fontSize: 14,
    color: '#676767',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  summarySection: {
    backgroundColor: '#F8F9FA',
    gap: 16,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
  },
  summaryIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#333333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discountBadge: {
    backgroundColor: '#D4F4DD',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  discountBadgeText: {
    fontSize: 10,
    color: '#16A085',
    fontWeight: '500',
  },
  discountValue: {
    fontSize: 14,
    color: '#30752F',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 16,
    color: '#0F0F0F',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F0F0F',
  },
  totalCurrency: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 40,
    gap: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6A46EB',

    paddingVertical: 12,
    borderRadius: 24,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
