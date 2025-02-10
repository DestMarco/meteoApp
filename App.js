import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const getMockWeatherData = (city) => {
  const mockData = {
    temp: Math.floor(Math.random() * (30 - 10) + 10),
    humidity: Math.floor(Math.random() * (100 - 40) + 40),
    windspeed: Math.floor(Math.random() * 50),
    condition: ['Soleggiato', 'Piovoso', 'Nuvoloso', 'Nevoso'][Math.floor(Math.random() * 4)],
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 2000);
  });
};

const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'Soleggiato':
      return <Icon name="sun" size={50} color="#FFA500" />;
    case 'Piovoso':
      return <Icon name="cloud-rain" size={50} color="#007AFF" />;
    case 'Nuvoloso':
      return <Icon name="cloud" size={50} color="#A9A9A9" />;
    case 'Nevoso':
      return <Icon name="cloud-snow" size={50} color="#ADD8E6" />;
    default:
      return null;
  }
};

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      Alert.alert('Errore', 'Per favore inserisci una città');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getMockWeatherData(city);
      setWeatherData(data);
    } catch {
      setError('Errore nel recupero dei dati');
      Alert.alert('Errore', 'Impossibile recuperare i dati meteo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsione Meteo (DEMO)</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Inserisci una città" value={city} onChangeText={setCity} />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData} disabled={loading}>
          <Text style={styles.buttonText}>CERCA</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{city}</Text>
          {getWeatherIcon(weatherData.condition)}
          <Text style={styles.temperature}>{weatherData.temp} °C</Text>
          <Text style={styles.description}>{weatherData.condition}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>Umidità: {weatherData.humidity} %</Text>
            <Text style={styles.details}>Vento: {weatherData.windspeed} km/h</Text>
          </View>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 15,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});