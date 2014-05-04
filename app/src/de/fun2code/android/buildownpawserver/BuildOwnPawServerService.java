package de.fun2code.android.buildownpawserver;

import de.fun2code.android.pawserver.PawServerService;

/**
 * Sample "Build your own PAW server" Service.
 * 
 *
 */
public class BuildOwnPawServerService extends PawServerService {

	@Override
	public void onCreate() {
		super.onCreate();
		
		/*
		 * Individual settings.
		 */
		init();
	}
	
	
	/*
	 * Service options are:
	 * TAG = Tag name for message logging.
	 * startOnBoot = Indicates if service has been started on boot.
	 * isRuntime = If set to true this will  only allow local connections.
	 * serverConfig = Path to server configuration directory.
	 * pawHome = PAW installation directory.
	 * useWakeLock = Switch wakelock on or off.
	 * hideNotificationIcon = Set to true if no notifications should be shown.
	 * execAutostartScripts = Set to true if scripts inside the autostart directory should be executed onstartup.
	 * showUrlInNotification = Set to true if URL should be shown in notification.
	 * notificationTitle = The notification title.
	 * notificationMessage = The notification message.
	 * appName = Application name"
	 * activityClass = Activity class name.
	 * notificationDrawableId = ID of the notification icon to display.
	 */
	
	private void init() {
		TAG = getString(R.string.app_name);
		startedOnBoot = false;
		isRuntime = false;
		serverConfig = BuildOwnPawServerActivity.INSTALL_DIR + "/conf/server.xml";
		pawHome = BuildOwnPawServerActivity.INSTALL_DIR + "/";
		useWakeLock = true;
		hideNotificationIcon = false;
		execAutostartScripts = false;
		showUrlInNotification = false;
		notificationTitle = "Notification Title";
		notificationMessage = "Notification Message";
		appName = getString(R.string.app_name);
		activityClass = "de.fun2code.android.buildownpawserver.BuildOwnPawServerActivity";
		notificationDrawableId = R.drawable.ic_launcher;
	}
	
}
