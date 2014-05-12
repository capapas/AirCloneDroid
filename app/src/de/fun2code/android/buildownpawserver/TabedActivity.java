package de.fun2code.android.buildownpawserver;

import android.annotation.SuppressLint;
import android.app.ActionBar;
import android.app.ActionBar.TabListener;
import android.app.Fragment;
import android.content.Intent;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.view.Menu;
import android.view.Window;
import android.widget.TextView;
import de.fun2code.android.buildownpawserver.tab.ChangePassword;
import de.fun2code.android.buildownpawserver.tab.Connexion;
import de.fun2code.android.buildownpawserver.tab.MyTabListener;
import de.fun2code.android.pawserver.PawServerActivity;
import de.fun2code.android.pawserver.PawServerService;
import de.fun2code.android.pawserver.listener.ServiceListener;
import de.fun2code.android.pawserver.util.Utils;

import java.io.*;
import java.util.HashMap;


@SuppressLint("NewApi")
public class TabedActivity extends PawServerActivity implements ServiceListener {

    @SuppressWarnings("unused")
    private Handler handler;

    // View that displays the server URL
    private TextView viewUrl;

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    ActionBar.Tab tab1, tab2;
    Fragment fragmentTab1 = new Connexion();
    Fragment fragmentTab2 = new ChangePassword();

    @SuppressLint({"InlinedApi", "NewApi"})
    @Override
    public void onCreate(Bundle savedInstanceState) {
        TAG = "BuildOwnPawServer";

        // Use sdcard
        INSTALL_DIR = Environment.getExternalStorageDirectory().getPath() + "/www";

        /*
         * Turn the PawServerActivity into runtime mode.
		 * Otherwise an error may occur if some things special to the
		 * original PAW server are not available.
		 */
        calledFromRuntime = true;

        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_ACTION_BAR);
//        setContentView(R.layout.activity_tabed);
        handler = new Handler();

        // URL TextView
        viewUrl = (TextView) findViewById(R.id.server_state);

        checkInstallationTmp();

        /*
		 * Register handler This is needed in order to get dialogs etc. to work.
		 */
        messageHandler = new MessageHandler(this);
        BuildOwnPawServerService.setActivityHandler(messageHandler);

		/*
		 * Register activity with service.
		 */

        setContentView(R.layout.activity_tabed);

        ActionBar actionBar = getActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);

        tab1 = actionBar.newTab().setText("Connexion");
        tab2 = actionBar.newTab().setText("Change Password");

        tab1.setTabListener((TabListener) new MyTabListener(fragmentTab1));
        tab2.setTabListener((TabListener) new MyTabListener(fragmentTab2));

        actionBar.addTab(tab1);
        actionBar.addTab(tab2);
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

        Intent serviceIntent = new Intent(TabedActivity.this,
                BuildOwnPawServerService.class);

        startService(serviceIntent);
    }

    /**
     * Called when the service has been started
     *
     * @param success <code>true</code> if service was started successfully,
     *                otherwise <code>false</code>
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
                    Log.e("zzzzzz", String.valueOf(url));
//                    viewUrl.setText("Server running on: " + url);
                }
            });

        } else {
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
     *                otherwise <code>false</code>
     */
    @Override
    public void onServiceStop(boolean success) {

    }

    /**
     * Checks the installation and extracts the content.zip file
     * to INSTALL_DIR if needed
     */
    private void checkInstallation() {
        if (!new File(INSTALL_DIR).exists()) {
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


    private void checkInstallationTmp() {
        File installdir = new File(INSTALL_DIR);
//        installdir.delete();
//        if (!installdir.exists()) {
        // Create directories
        installdir.mkdirs();

        // Files not to overwrite
        HashMap<String, Integer> keepFiles = new HashMap<String, Integer>();

        // Extract ZIP file form assets
//            try {
//                getAssets().open("content");
//                extractZip(getAssets().open("content.zip"),
//                        INSTALL_DIR, keepFiles);
//            } catch (IOException e) {
//                Log.e(TAG, e.getMessage());
//            }
//        }
        copyFileOrDir("");
    }

    private void copyFileOrDir(String path) {
        AssetManager assetManager = this.getAssets();
        String assets[] = null;
        try {
            Log.i("tag1", "copyFileOrDir() " + path);
            assets = assetManager.list(path);
            if (assets.length == 0) {
                copyFile(path);
            } else {
                String fullPath = INSTALL_DIR + "/" + path;
                Log.i("tag2", "path=" + fullPath);
                File dir = new File(fullPath);
                if (!dir.exists())
                    if (!dir.mkdirs()) ;
                Log.i("tag3", "could not create dir " + fullPath);
                for (int i = 0; i < assets.length; ++i) {
                    String p;
                    if (path.equals(""))
                        p = "";
                    else
                        p = path + "/";

                    copyFileOrDir(p + assets[i]);
                }
            }
        } catch (IOException ex) {
            Log.e("tag4", "I/O Exception", ex);
        }
    }

    private void copyFile(String filename) {
        AssetManager assetManager = this.getAssets();

        InputStream in = null;
        OutputStream out = null;
        String newFileName = null;
        try {
            Log.i("tag5", "copyFile() " + filename);
            in = assetManager.open(filename);
            if (filename.endsWith(".jpg")) // extension was added to avoid compression on APK file
                newFileName = INSTALL_DIR + "/" + filename.substring(0, filename.length() - 4);
            else
                newFileName = INSTALL_DIR + "/" + filename;
            out = new FileOutputStream(newFileName);

            byte[] buffer = new byte[1024];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            in.close();
            in = null;
            out.flush();
            out.close();
            out = null;
        } catch (Exception e) {
            Log.e("tag6", "Exception in copyFile() of " + newFileName);
            Log.e("tag7", "Exception in copyFile() " + e.toString());
        }

    }

}