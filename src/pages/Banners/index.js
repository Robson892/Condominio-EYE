import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, Alert } from 'react-native';

const { width } = Dimensions.get('window');

const MainScreen = () => {
  const [anuncios, setAnuncios] = useState([]);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const fetchedAnuncios = [
          { id: '1', descricao: 'Anúncio 1', url: require('../../assets/jtf.jpg') },
          { id: '2', descricao: 'Anúncio 2', url: require('../../assets/jtf.jpg') },
          { id: '3', descricao: 'Anúncio 3', url: require('../../assets/jtf.jpg') },
          { id: '4', descricao: 'Anúncio 4', url: require('../../assets/jtf.jpg') }, // Ajuste o caminho conforme necessário
        ];
        setAnuncios(fetchedAnuncios);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os anúncios.');
      }
    };

    fetchAnuncios();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (anuncios.length > 0) {
        const nextIndex = (currentIndex + 1) % anuncios.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, anuncios]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.url ? (
        <Image source={item.url} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>Imagem não disponível</Text>
      )}
      <Text style={styles.itemDescription}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anúncios</Text>
      <FlatList
        ref={flatListRef}
        data={anuncios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x / (width * 0.8)
          );
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  carousel: {
    paddingVertical: 10,
  },
  itemContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: width * 0.8,
    height: 200,
    resizeMode: 'cover',
  },
  noImageText: {
    width: width * 0.8,
    height: 200,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#ccc',
  },
  itemDescription: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MainScreen;
