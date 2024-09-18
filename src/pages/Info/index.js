import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Info = () => {
  const comunicados = [
    { id: 1, titulo: 'Novo Procedimento de Segurança', mensagem: 'Informamos a todos os residentes que, a partir do próximo mês, haverá uma nova política de segurança. Todos os visitantes deverão ser cadastrados na portaria antes de entrarem no prédio. Agradecemos pela compreensão e cooperação.' },
    { id: 2, titulo: 'Manutenção Programada', mensagem: 'A equipe de manutenção realizará uma inspeção e reparo nas áreas comuns do prédio no dia 15 de agosto, das 9h às 17h. Durante esse período, pode haver interrupção no fornecimento de água e energia em algumas áreas. Pedimos desculpas por qualquer inconveniente e agradecemos pela paciência.' },
    { id: 3, titulo: 'Evento Comunitário', mensagem: 'Convidamos todos os residentes para o evento comunitário de fim de ano que será realizado no salão de festas no dia 25 de dezembro, às 18h. Haverá música, comidas e muitas atividades para toda a família. Esperamos vê-los lá!' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>COMUNICADOS IMPORTANTES</Text>
      <FlatList
        data={comunicados}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.mensagem}>{item.mensagem}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9ecef',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardContent: {
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#343a40',
    textAlign: 'center',
    marginBottom: 20,
  },
  mensagem: {
    fontSize: 16,
    color: '#495057',
    marginTop: 8,
  },
});

export default Info;
