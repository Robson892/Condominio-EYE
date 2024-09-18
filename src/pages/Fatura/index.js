import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList } from 'react-native';

const BoletosScreen = () => {
  const [boletos, setBoletos] = useState([]);

  // Simulação de dados de boletos - substitua com sua lógica de fetch de dados
  useEffect(() => {
    const fetchBoletos = async () => {
      try {
        // Exemplo de dados
        const fetchedBoletos = [
          { id: '1', descricao: 'Boleto Janeiro', url: 'https://via.placeholder.com/300x100?text=Boleto+Janeiro' },
          { id: '2', descricao: 'Boleto Fevereiro', url: 'https://via.placeholder.com/300x100?text=Boleto+Fevereiro' },
          { id: '3', descricao: 'Boleto Março', url: 'https://via.placeholder.com/300x100?text=Boleto+Março' },
        ];
        setBoletos(fetchedBoletos);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os boletos.');
      }
    };

    fetchBoletos();
  }, []);

  const handleDownloadBoleto = (url) => {
    // Adicione a lógica para download ou visualização do boleto
    Alert.alert('Download', `O boleto será baixado de: ${url}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemDescription}>{item.descricao}</Text>
      <Button title="Baixar Boleto" onPress={() => handleDownloadBoleto(item.url)} />
    </View>
  );

  return (
    <FlatList
      data={boletos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<Text style={styles.title}>Meus Boletos</Text>}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  itemDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  button:{
    backgroundColor: '#6A5ACD'
  }
});

export default BoletosScreen;
