import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BannerAd from '../Banners/index';

const handleQuadrantPress = (quadrant, navigation) => {
  switch (quadrant.id) {
    case 1:
      navigation.navigate('Portaria');
      break;
    case 2:
      navigation.navigate('Cadastro');
      break;
    case 3:
      navigation.navigate('Info');
      break;
    case 4:
      navigation.navigate('Fatura');
      break;
    case 5:
      navigation.navigate('Reservas');
      break;
    case 6:
      navigation.navigate('Assembleia');
      break;
    case 7:
      navigation.navigate('Monitoramento');
      break;
    case 8:
      navigation.navigate('Ouvidoria');
      break;
    case 9:
      navigation.navigate('Interfone');
      break;
    case 10:
      handleLogout(navigation);
      break;
    default:
      break;
  }
};

const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('@cdm:auth');
    navigation.navigate('Welcome');
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível realizar o logout.');
  }
};

export default function Main() {
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const navigation = useNavigation();
  const quadrantButtons = [
    { id: 1, icon: 'vcard-o', name: 'Portaria', color: '#4682B4' },
    { id: 2, icon: 'user-plus', name: 'Cadastro', color: '#4682B4' },
    { id: 3, icon: 'newspaper-o', name: 'Comunicados', color: '#4682B4' },
    { id: 4, icon: 'envelope', name: 'Contas', color: '#4682B4' },
    { id: 5, icon: 'calendar', name: 'Reservas', color: '#4682B4' },
    { id: 6, icon: 'users', name: 'Assembleia', color: '#4682B4' },
    { id: 7, icon: 'video-camera', name: 'Monitoramento', color: '#4682B4' },
    { id: 8, icon: 'headphones', name: 'Ouvidoria', color: '#4682B4' },
    { id: 9, icon: 'phone', name: 'Interfone', color: '#4682B4' },
    { id: 10, icon: 'sign-out', name: 'Sair', color: '#E74C3C' }, 
  ];

  const handlePress = useCallback((quadrant) => {
    setSelectedQuadrant(quadrant.id);
    handleQuadrantPress(quadrant, navigation);
  }, [navigation]);

  const handleChatPress = () => {
    navigation.navigate('Chat');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <BannerAd />
        <View style={styles.quadrantGrid}>
          {quadrantButtons.map((quadrant) => (
            <TouchableOpacity
              key={quadrant.id}
              style={[
                styles.quadrant,
                { borderColor: quadrant.color },
                selectedQuadrant === quadrant.id && styles.selectedQuadrant,
              ]}
              onPress={() => handlePress(quadrant)}
            >
              <Icon name={quadrant.icon} size={36} color={quadrant.color} />
              <Text style={styles.text}>{quadrant.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botão Flutuante de Chat */}
      <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
        <Icon name="comments" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadrantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  quadrant: {
    width: '42%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 0.5,
  },
  selectedQuadrant: {
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
  chatButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: '#4682B4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
