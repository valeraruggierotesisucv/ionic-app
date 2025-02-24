// context/PushNotificationContext.js

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';

interface NotificationContextType {
    registrationToken: string | null; 
    notifications: PushNotificationSchema[]
}

const PushNotificationContext = createContext<NotificationContextType| undefined>(undefined);

export const PushNotificationProvider = ({ children }: { children: ReactNode }) => {
    const [registrationToken, setRegistrationToken] = useState<string | null>(null);
    const [notifications, setNotifications] = useState<PushNotificationSchema[]>([]);

    useEffect(() => {
        const registerNotifications = async () => {
            let permStatus = await PushNotifications.checkPermissions();

            if (permStatus.receive === 'prompt') {
                permStatus = await PushNotifications.requestPermissions();
            }

            if (permStatus.receive !== 'granted') {
                throw new Error('User denied permissions!');
            }

            await PushNotifications.register();
        };

        const addListeners = async () => {
            await PushNotifications.addListener('registration', token => {
                console.info('Registration token: ', token.value);
                setRegistrationToken(token.value);
            });

            await PushNotifications.addListener('registrationError', err => {
                console.error('Registration error: ', err.error);
            });

            await PushNotifications.addListener('pushNotificationReceived', notification => {
                console.log('Push notification received: ', notification);
                setNotifications(prev => [...prev, notification]);
            });

            await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
                console.log('Push notification action performed', notification.actionId, notification.inputValue);
            });
        };

        registerNotifications().catch(err => console.error('Error on registering notifications', err));
        addListeners().catch(err => console.error('Error on adding listeners', err));

        return () => {
            PushNotifications.removeAllListeners();
        };
    }, []);

    return (
        <PushNotificationContext.Provider value={{ registrationToken, notifications }}>
            {children}
        </PushNotificationContext.Provider>
    );
};


export function usePushNotifications() {
    const context = useContext(PushNotificationContext); 
    if(context === undefined){
        throw new Error('usePushNotifications must be used within an PushNotificationsProvider');
    }
    return context; 
}