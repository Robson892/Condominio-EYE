import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const CadastroPage = () => {
    const navigation = useNavigation();
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [bloco, setBloco] = useState('');
    const [apartamento, setApartamento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validarTelefone(telefone) {
        const re = /^\+?\d{10,15}$/; // Exemplo simples, ajuste conforme necessário
        return re.test(telefone);
    }

    async function handleCadastro() {
        if (!nome || !email || !telefone || !bloco || !apartamento || !senha || !confirmarSenha) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'Todos os campos são obrigatórios!',
            });
            return;
        }

        if (senha !== confirmarSenha) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'As senhas não coincidem!',
            });
            return;
        }

        if (!validarEmail(email)) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'O email informado é inválido!',
            });
            return;
        }

        if (!validarTelefone(telefone)) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'O telefone informado é inválido!',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/cadastrar', {  // Substitua pelo IP correto
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    bloco,
                    apartamento,
                    senha,
                    confirmarsenha: confirmarSenha,
                }),
            });

            const data = await response.json();

            console.log('Resposta do servidor:', data);

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Sucesso',
                    text2: 'Cadastro realizado com sucesso!',
                });
                // Limpa o formulário
                setNome('');
                setEmail('');
                setTelefone('');
                setBloco('');
                setApartamento('');
                setSenha('');
                setConfirmarSenha('');
                navigation.navigate('Main');
            } else {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Erro',
                    text2: data.error || 'Não foi possível realizar o cadastro.',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Erro',
                text2: 'Não foi possível conectar ao servidor.',
            });
            console.error('Erro ao realizar o cadastro:', error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Bloco"
                value={bloco}
                onChangeText={setBloco}
            />
            <TextInput
                style={styles.input}
                placeholder="Apartamento"
                value={apartamento}
                onChangeText={setApartamento}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consulta')}>
                <Text style={styles.buttonText}>Consultar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '100%',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4682B4',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CadastroPage;
