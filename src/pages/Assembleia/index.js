import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';

const meetings = [
  { id: '1', title: 'Assembleia Geral', date: '2024-08-25', location: 'Salão de Festas', details: 'Detalhes adicionais sobre a Assembleia Geral...' },
  { id: '2', title: 'Reunião de Comissão', date: '2024-08-30', location: 'Sala de Reuniões', details: 'Detalhes adicionais sobre a Reunião de Comissão...' },
  // Adicione mais reuniões conforme necessário
];

export default function Assembleia({ navigation }) {
  const [expandedId, setExpandedId] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = (id) => {
    if (expandedId === id) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedId(null);
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedId(id);
    }
  };

  const renderMeetingItem = (item) => {
    const isExpanded = item.id === expandedId;
    const expandedHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.meetingItem}
        onPress={() => toggleExpand(item.id)}
      >
        <Text style={styles.meetingTitle}>{item.title}</Text>
        <Text style={styles.meetingDate}>{item.date}</Text>
        <Text style={styles.meetingLocation}>{item.location}</Text>
        {isExpanded && (
          <Animated.View style={[styles.detailsContainer, { height: expandedHeight }]}>
            <Text style={styles.detailsText}>{item.details}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.titulo}>ASSEMBLÉIAS</Text>
      <View style={styles.meetingList}>
        {meetings.map((item) => renderMeetingItem(item))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  meetingList: {
    paddingVertical: 10,
  },
  meetingItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#CCE3FF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003B6F',
  },
  meetingDate: {
    fontSize: 16,
    color: '#003B6F',
  },
  meetingLocation: {
    fontSize: 16,
    color: '#0056A0',
  },
  detailsContainer: {
    marginTop: 10,
    overflow: 'hidden',
  },
  detailsText: {
    fontSize: 14,
    color: '#003B6F',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003B6F',
    textAlign: 'center',
  },
});
