import { StyleSheet, Text, View } from 'react-native';

export type IBudgetStatus = 'pending' | 'approved' | 'rejected' | 'sended';

interface IStatusTagProps {
  status: IBudgetStatus;
}

export const StatusTag = ({ status }: IStatusTagProps) => {
  const statusLabelMap: Record<IBudgetStatus, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado',
    sended: 'Enviado',
  };

  const tagStyles = getStatusTagStyles(status);

  return (
    <View
      style={[styles.container, { backgroundColor: tagStyles.backgroundColor }]}
    >
      <View
        style={{
          backgroundColor: tagStyles.dotColor,
          width: 10,
          height: 10,
          borderRadius: 999,
        }}
      />

      <Text style={[styles.text, { color: tagStyles.textColor }]}>
        {statusLabelMap[status]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface ITagStyles {
  backgroundColor: string;
  textColor: string;
  dotColor: string;
}

const getStatusTagStyles = (status: IBudgetStatus): ITagStyles => {
  const backgroundColorByStatus: Record<IBudgetStatus, ITagStyles> = {
    pending: {
      backgroundColor: '#E6E5E5',
      textColor: '#676767',
      dotColor: '#A1A2A1',
    },
    approved: {
      backgroundColor: '#BFF7BE',
      textColor: '#30752F',
      dotColor: '#4BB84A',
    },
    rejected: {
      backgroundColor: '#FFD6D6',
      textColor: '#9E4949',
      dotColor: '#DB4D4D',
    },
    sended: {
      backgroundColor: '#CEEFFF',
      textColor: '#1D7096',
      dotColor: '#2AA1D9',
    },
  };

  return backgroundColorByStatus[status];
};
