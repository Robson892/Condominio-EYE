import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export function ChamadaPage() {
    const [blocosApartamentos, setBlocosApartamentos] = useState({ blocos: [], apartamentos: [] });
    const [selectedBloco, setSelectedBloco] = useState('');
    const [selectedApartamento, setSelectedApartamento] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://192.168.15.9:3000/api/blocos-apartamentos')
            .then(response => response.json())
            .then(data => {
                setBlocosApartamentos(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
                Alert.alert('Erro', 'Não foi possível buscar blocos e apartamentos.');
                console.error('Erro ao buscar blocos e apartamentos:', error);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Erro ao buscar dados.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de Chamada</Text>

            <Text>Bloco:</Text>
            <Picker
                selectedValue={selectedBloco}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedBloco(itemValue)}
            >
                <Picker.Item label="Selecione um bloco" value="" />
                {blocosApartamentos.blocos.map((bloco, index) => (
                    <Picker.Item key={index} label={bloco} value={bloco} />
                ))}
            </Picker>

            <Text>Apartamento:</Text>
            <Picker
                selectedValue={selectedApartamento}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedApartamento(itemValue)}
            >
                <Picker.Item label="Selecione um apartamento" value="" />
                {blocosApartamentos.apartamentos.map((apartamento, index) => (
                    <Picker.Item key={index} label={apartamento} value={apartamento} />
                ))}
            </Picker>

            <TouchableOpacity style={styles.button} onPress={() => alert(`Chamar Bloco: ${selectedBloco}, Apartamento: ${selectedApartamento}`)}>
                <Text style={styles.buttonText}>Iniciar Chamada</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    error: {
        color: 'red',
    },
});

export default ChamadaPage;
