import ReactNativeAN from 'react-native-alarm-notification';

const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));     // set the fire date for 1 second from now

// const fireDate = '01-01-2060 00:00:00';			  // set exact date time | Format: dd-MM-yyyy HH:mm:ss

const alarmNotifData = {
	title: "My Notification Title",
	message: "My Notification Message",
	channel: "my_channel_id",
	small_icon: "ic_launcher",

	// You can add any additional data that is important for the notification
	// It will be added to the PendingIntent along with the rest of the bundle.
	// e.g.
  	data: { foo: "bar" },
};

class App {

    async method(){
        //Schedule Future Alarm
        const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
        console.log(alarm); // { id: 1 }

        //Delete Scheduled Alarm
        ReactNativeAN.deleteAlarm(alarm.id);

        //Delete Repeating Alarm
        ReactNativeAN.deleteRepeatingAlarm(alarm.id);

        //Stop Alarm
        ReactNativeAN.stopAlarmSound();

        //Send Local Notification Now
        ReactNativeAN.sendNotification(alarmNotifData);

        //Get All Scheduled Alarms
        const alarms = await ReactNativeAN.getScheduledAlarms();

        //Clear Notification(s) From Notification Center/Tray
        ReactNativeAN.removeFiredNotification(alarm.id);
        ReactNativeAN.removeAllFiredNotifications();
    }

}
export default App;