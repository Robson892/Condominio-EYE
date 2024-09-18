import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const SendMessageScreen = ({ user }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Atenção', 'Por favor, insira uma mensagem antes de enviar.');
      return;
    }

    try {
      // Enviar a mensagem para o servidor
      const response = await fetch('http://192.168.15.9:3000/api/enviarMensagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conteudo: message,
          remetenteNome: user.nome,
          remetenteEmail: user.email,
        }),
      });

      if (response.ok) {
        Alert.alert('Mensagem Enviada', 'Sua mensagem foi enviada com sucesso.');
        setMessage(''); // Limpa o campo de mensagem após o envio
      } else {
        Alert.alert('Erro', 'Não foi possível enviar a mensagem. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem. Tente novamente mais tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enviar Mensagem para a Portaria</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem aqui..."
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Enviar Mensagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
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

export default SendMessageScreen;
