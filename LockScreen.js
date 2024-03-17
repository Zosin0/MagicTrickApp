import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import bgImage from './assets/bg.png';

import lanternIcon from './assets/Camera.png';
import cameraIcon from './assets/Flashlight.png';
import moonIcon from './assets/Moon.png';
import lockIcon from './assets/lock.png';

const LockScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [futureTime, setFutureTime] = useState(null);
    const [tapCount, setTapCount] = useState(0);
    const [lastTap, setLastTap] = useState(null);

    useEffect(() => {
        // Set the future time immediately after a tap.
        if (tapCount > 0) {
            const newFutureTime = new Date(currentTime.getTime());
            newFutureTime.setMinutes(newFutureTime.getMinutes() + tapCount);
            setFutureTime(newFutureTime);
        }
    }, [tapCount, currentTime]);

    useEffect(() => {
        let timer;
        let interval; 
        if (lastTap) {
            timer = setTimeout(() => {
                interval = setInterval(() => {
                    setFutureTime((prevTime) => {
                        let newTime = new Date(prevTime.getTime());
                        newTime.setMinutes(newTime.getMinutes() - 1);
                        if (newTime <= currentTime) {
                            clearInterval(interval);
                            return currentTime;
                        } else {
                            return newTime;
                        }
                    });
                }, 700); // Decrease time rapidly
            }, 5000);

            // Clear the timer and interval when unmounting
            return () => {
                clearTimeout(timer);
                if (interval) clearInterval(interval);
            };
        }
    }, [lastTap, currentTime]);

    const handleTouch = () => {
        setLastTap(Date.now());
        setTapCount((prevTapCount) => prevTapCount + 1);
    };

    const startMagic = () => {
        // Reset tap count and the last tap time
        setTapCount(0);
        setLastTap(null);
        // Set the current time to the actual time when the magic starts
        setCurrentTime(new Date());
        setFutureTime(new Date());
    };

    const formatTime = (time) => {
        return time ? time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : "";
    };

    const formatDate = (time) => {
        return time ? time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : "";
    };

    // Start the magic as soon as the lock screen appears
    useEffect(() => {
        startMagic();
    }, []);

    return (
        <ImageBackground
            source={bgImage}
            style={styles.background}
        >
            <View style={styles.topContainer}>
                <Image source={lockIcon} style={styles.icon} />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.timeContainer} onPress={handleTouch}>
                    <Text style={styles.time}>{formatTime(futureTime || currentTime)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.date}>{formatDate(currentTime)}</Text>
            <View style={styles.bottomContainer}>
                <Image source={lanternIcon} style={styles.icon} />

                <View style={styles.midContainer}>
                    <Image source={moonIcon} style={styles.moon} />
                    <Text style={styles.notDisturbText}>Do not disturb</Text>
                </View>

                <Image source={cameraIcon} style={styles.icon} />
            </View>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start', // Ajustado para 'flex-start' para começar do topo
    },
    topContainer: {
        marginTop: 60, // Ajuste conforme necessário
        alignItems: 'center',
    },
    lockIcon: {
        fontSize: 30,
        color: 'white',
    },
    timeContainer: {
        alignItems: 'center',
    },
    time: {
        fontSize: 90,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 10, // Espaço entre o tempo e a data
    },
    date: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20, // Espaço entre a data e o resto do conteúdo
        textAlign: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute', // Posicionamento absoluto na parte inferior
        bottom: 48,
        width: '100%', // Largura total do container
        paddingHorizontal: 30, // Espaçamento lateral
    },
    midContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 50, // Ajuste conforme necessário
        height: 50, // Ajuste conforme necessário
    },
    moon: {
        width: 30, // Ajuste conforme necessário
        height: 30, // Ajuste conforme necessário
    },

        iconSmall: {
        width: 30, // Ajuste conforme necessário
        height: 30, // Ajuste conforme necessário
    },
    notDisturbText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 10, // Ajuste o espaço entre o ícone e o texto
    },
    // Adicione mais estilos conforme necessário
});
export default LockScreen;
