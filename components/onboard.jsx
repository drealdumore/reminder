
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import images from "@/constants/images";


const App = () => {
  return (
    <SafeAreaView style={styles.container} className='h-screen min-h-screen'>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content} className='flex justify-between items-center'>

      <View>
      
      </View>
        
      <View className='w-full mb-8 ' >
      
        <View style={styles.iconContainer} className='flex justify-between items-center'>
          <View style={styles.icon}>
            <Text style={styles.iconX}>✕</Text>
          </View>
        </View>

        <Text style={styles.title } className="font-rubik-extrabold">Start your new{'\n'}Social Jrny</Text>
        
        <Text style={styles.subtitle}>
          Post, react, and start conversations{'\n'}that bring good vibes only.
        </Text>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Add an existing account
          </Text>
        </TouchableOpacity>
      </View>
        
        

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9FE91A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 40,
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  iconContainer: {
    marginVertical: 20,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconX: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: '100%',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;