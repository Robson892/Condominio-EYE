import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Ouvidoria() {
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleSendMessage = () => {
    if (message.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, digite sua mensagem antes de enviar.');
      return;
    }

    // Aqui você pode implementar a lógica de envio da mensagem, como enviar por e-mail ou salvar em um banco de dados.
    Alert.alert('Mensagem Enviada', 'Sua mensagem foi enviada com sucesso!');
    setMessage('');
    navigation.goBack(); // Voltar para a tela anterior após o envio
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ouvidoria</Text>
      <Text style={styles.subtitle}>
        Deixe aqui sua reclamação, sugestão ou denúncia. Sua opinião é muito importante para nós.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem aqui..."
        value={message}
        onChangeText={setMessage}
        multiline={true}
        numberOfLines={5}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  input: {
    height: 150,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});
