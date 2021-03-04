import AsyncStorage from '@react-native-community/async-storage';
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications"
const NOTIFICATION_KEY = 'Flashcard:notifications';
const CHANNEL_ID = 'DailyReminder'
export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return {
        title: "Haven't seen you around!",
        body: "Don't forget to practice your flashcards today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            vibrate: true,
            channelId: CHANNEL_ID,
            sticky: false,
            color: 'red'
        }
    }
}

// export function setLocalNotification() {
//     AsyncStorage.getItem(NOTIFICATION_KEY)
//         .then(JSON.parse)
//         .then(data => {
//             if (data === null) {
//                 Permissions.askAsync(Permissions.NOTIFICATIONS)
//                     .then(({ status }) => {
//                         if (status === 'granted') {
//                             Notifications.cancelAllScheduledNotificationsAsync()

//                             let tomorrow = new Date()
//                             tomorrow.setDate(tomorrow.getDate() + 1)
//                             tomorrow.setHours(18)
//                             tomorrow.setMinutes(0)

//                             Notifications.scheduleLocalNotificationAsync(
//                                 createNotification(),
//                                 {
//                                     time: tomorrow,
//                                     repeat: 'day'
//                                 }
//                             )
//                             AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//                         }
//                     })
//             }
//         })
// }

function createChannel() {
    return {
        name: 'Daily Reminder',
        description: 'This is a daily reminder for you to study your flashcards.',
        sound: true,
        priority: 'high'
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
                            .then(val => console.log('channel return:', val))
                            .then(() => {
                                Notifications.cancelAllScheduledNotificationsAsync();

                                const tomorrow = new Date();

                                tomorrow.setDate(tomorrow.getDate() + 1);
                                tomorrow.setHours(20);
                                tomorrow.setMinutes(0);

                                Notifications.scheduleLocalNotificationAsync(
                                    createNotification(),
                                    {
                                        time: tomorrow,
                                        repeat: 'day'
                                    }
                                );

                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                            })
                            .catch(err => {
                                console.log('err', err);
                            });
                    }
                });
            }
        });
}