import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

// Função para converter o URL do YouTube para o formato de embed
const convertToEmbedUrl = (url) => {
  if (!url) return '';
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Monitoramento = () => {
  const cameras = [
    { id: '1', nome: 'Câmera 1', uri: 'https://www.youtube.com/watch?v=iAZA4yX0mf4' },
    { id: '2', nome: 'Câmera 2', uri: 'https://www.youtube.com/watch?v=bhrxz6kq7qA' },
    { id: '3', nome: 'Câmera 3', uri: 'https://www.youtube.com/watch?v=XtroQ8ipXFI' },
  ];

  const [selectedCamera, setSelectedCamera] = React.useState(null);

  const handlePress = (camera) => {
    const embedUrl = convertToEmbedUrl(camera.uri);
    if (embedUrl) {
      setSelectedCamera({ ...camera, uri: embedUrl });
    } else {
      Alert.alert('Erro', 'URL inválido do YouTube.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento de Câmeras</Text>

      <FlatList
        data={cameras}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cameraItem}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.cameraName}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cameraList}
      />

      {selectedCamera && (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: selectedCamera.uri }}
            style={styles.video}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true}
            onError={(e) => {
              Alert.alert('Erro', 'Não foi possível carregar o vídeo.');
              setSelectedCamera(null); // Remove a câmera selecionada se houver erro
            }}
            onLoad={(e) => console.log('Video carregado com sucesso!')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Tom de azul claro
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0277BD', // Azul escuro
    textAlign: 'center',
    marginVertical: 20,
  },
  cameraList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  cameraItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#B3E5FC', // Azul mais claro
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cameraName: {
    fontSize: 18,
    color: '#0277BD', // Azul escuro
  },
  videoContainer: {
    marginTop: 20,
    width: screenWidth,
    height: screenHeight * 0.4, // Ajuste para 40% da altura da tela
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default Monitoramento;
