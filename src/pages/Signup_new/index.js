import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    if (!validatePassword(senha)) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Senha inválida',
        text2: 'A senha deve ter no mínimo 6 caracteres.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      return;
    }

    try {
      // Enviar uma solicitação para o servidor para validar o login
      const response = await fetch('http://192.168.15.9:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Login realizado com sucesso!',
          text2: 'Você foi redirecionado para a página inicial.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });

        navigation.navigate('Main');
      } else {
        setError(data.error || 'Usuário ou senha incorretos.');
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro de login',
          text2: data.error || 'Usuário ou senha incorretos.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Erro',
        text2: 'Não foi possível realizar o login.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
      console.error('Erro ao realizar o login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </View>

      <View style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha."
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        {error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('First_Access')}
        >
          <Text style={styles.registerText}>Não possui conta? Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('No_Register')}
        >
          {/* Adicione o texto ou funcionalidade para o botão No_Register */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4682B4',
  },

  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },

  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingBottom: '5%',
  },

  title: {
    fontSize: 20,
    marginTop: 28,
  },

  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#4682B4',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },

  registerText: {
    color: '#a1a1a1',
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
