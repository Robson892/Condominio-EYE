import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const isAvailable = (date, type) => {
    return !reservas.some(reserva =>
      reserva.date === date &&
      reserva.type === type
    );
  };

  const handleReservation = () => {
    if (!selectedType || !selectedDate) {
      Alert.alert('Erro', 'Por favor, selecione todos os campos.');
      return;
    }

    if (!isAvailable(selectedDate, selectedType)) {
      Alert.alert('Erro', 'Este tipo de reserva já está ocupado nesta data.');
      return;
    }

    setReservas([...reservas, {
      date: selectedDate,
      type: selectedType
    }]);

    Alert.alert(
      'Reserva Confirmada',
      `Sua reserva para ${selectedType} foi agendada para ${selectedDate}.`
    );

    setSelectedType('');
    setSelectedDate('');
  };

  const handleConsultation = () => {
    if (reservas.length === 0) {
      Alert.alert('Nenhuma Reserva', 'Não há reservas cadastradas.');
      return;
    }

    const formattedReservas = reservas.map(reserva => 
      `- ${reserva.type} em ${reserva.date}`
    ).join('\n');

    Alert.alert('Reservas Cadastradas', formattedReservas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>
      <Text style={styles.subtitle}>Selecione um tipo de reserva:</Text>
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma opção" value="" />
        <Picker.Item label="Salão de festas" value="salão de festas" />
        <Picker.Item label="Academia" value="academia" />
        <Picker.Item label="Churrasqueira-01" value="churrasqueira-01" />
        <Picker.Item label="Churrasqueira-02" value="churrasqueira-02" />
        <Picker.Item label="Churrasqueira-03" value="churrasqueira-03" />
      </Picker>
      <Text style={styles.subtitle}>Selecione uma data:</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        style={styles.calendar}
      />
      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Confirmar Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.consultButton} onPress={handleConsultation}>
        <Text style={styles.buttonText}>Consultar Reservas</Text>
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  consultButton: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
