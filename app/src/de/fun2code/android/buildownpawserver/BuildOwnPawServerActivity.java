package de.fun2code.android.buildownpawserver;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import android.content.Intent;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.widget.TextView;
import de.fun2code.android.pawserver.PawServerActivity;
import de.fun2code.android.pawserver.PawServerService;
import de.fun2code.android.pawserver.listener.ServiceListener;
import de.fun2code.android.pawserver.util.Utils;

/**
 * Sample "Build your own PAW server" Activity.
 * 
 *
 */
public class BuildOwnPawServerActivity extends PawServerActivity implements ServiceListener {
	@SuppressWarnings("unused")
	private Handler handler;
	
	// View that displays the server URL
	private TextView viewUrl;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		TAG = "BuildOwnPawServer";
		
		/*
		 * Defines the installation directory.
		 */
		// Use /data/data/... directory
		INSTALL_DIR = getFilesDir().getAbsolutePath() + "/www";
		
		// Use sdcard
		//INSTALL_DIR = Environment.getExternalStorageDirectory().getPath() + "/www";

		/*
		 * Turn the PawServerActivity into runtime mode.
		 * Otherwise an error may occur if some things special to the
		 * original PAW server are not available.
		 */
		calledFromRuntime = true;

		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		handler = new Handler();
		
		// URL TextView
		viewUrl = (TextView) findViewById(R.id.url);
		
		/* Check installation and extract ZIP if necessary */
		checkInstallation();

		/*
		 * Register handler This is needed in order to get dialogs etc. to work.
		 */
		messageHandler = new MessageHandler(this);
		BuildOwnPawServerService.setActivityHandler(messageHandler);

		/*
		 * Register activity with service.
		 */
		BuildOwnPawServerService.setActivity(this);
	}

	@Override
	public void onResume() {
		super.onResume();
		/*
		 *  Registers the listener that calls onServiceStart() and
		 *  onServiceStop().
		 */
		BuildOwnPawServerService.registerServiceListener(this);
		startService();
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		stopService();
		
		/*
		 * Unregisters the listener
		 */
		BuildOwnPawServerService.unregisterServiceListener(this);

	}

	/**
	 * Stops the service
	 */
	@Override
	public void stopService() {
		Intent serviceIntent = new Intent(this.getApplicationContext(),
				BuildOwnPawServerService.class);
		stopService(serviceIntent);
	}

	/**
	 * Starts the service
	 */
	@Override
	public void startService() {
		/*
		 * Do nothing, if service is already running.
		 */
		if (BuildOwnPawServerService.isRunning()) {
			return;
		}

		Intent serviceIntent = new Intent(BuildOwnPawServerActivity.this,
				BuildOwnPawServerService.class);

		startService(serviceIntent);
	}

	/**
	 * Called when the service has been started
	 * 
	 * @param success <code>true</code> if service was started successfully, 
	 * 					otherwise <code>false</code>
	 */
	@Override
	public void onServiceStart(boolean success) {
		if (success) {
			// Display URL
			PawServerService service = BuildOwnPawServerService.getService();
			final String url = service.getPawServer().server.protocol
					+ "://" + Utils.getLocalIpAddress() + ":"
					+ service.getPawServer().serverPort;
			
			runOnUiThread(new Runnable() {
				@Override
				public void run() {
					viewUrl.setText("Server running on: " +  url);	
				}
			});
			
		}
		else {
			runOnUiThread(new Runnable() {
				@Override
				public void run() {
					viewUrl.setText("Server could not be started!");
				}
			});
		}

	}
	
	/**
	 * Called when the service has been stopped
	 * 
	 * @param success <code>true</code> if service was started successfully, 
	 * 					otherwise <code>false</code>
	 */
	@Override
	public void onServiceStop(boolean success) {
		
	}
	
	/**
	 * Checks the installation and extracts the content.zip file
	 * to INSTALL_DIR if needed
	 */
	private void checkInstallation() {
		if(!new File(INSTALL_DIR).exists()) {
			// Create directories
			new File(INSTALL_DIR).mkdirs();
			
			// Files not to overwrite
			HashMap<String, Integer> keepFiles = new HashMap<String, Integer>();
			
			// Extract ZIP file form assets
			try {
				extractZip(getAssets().open("content.zip"),
						INSTALL_DIR, keepFiles);
			} catch (IOException e) {
				Log.e(TAG, e.getMessage());
			}
			
		}
	}

}