// EnviarSMS.js
import React, { useState } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import Communications from 'react-native-communications';

const EnviarSMS = () => {
  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handlePress = () => {
    Communications.text(numero, mensagem);
  };

  return (
    <View>
      <Text>Digite o número de telefone:</Text>
      <TextInput
        value={numero}
        onChangeText={(text) => setNumero(text)}
        placeholder="Ex: 5511999999999"
      />
      <Text>Digite a mensagem:</Text>
      <TextInput
        value={mensagem}
        onChangeText={(text) => setMensagem(text)}
        placeholder="Ex: Olá, tudo bem?"
      />
      <Button title="Enviar SMS" onPress={handlePress} />
    </View>
  );
};

export default EnviarSMS;