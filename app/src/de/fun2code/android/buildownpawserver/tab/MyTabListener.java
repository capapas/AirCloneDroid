package de.fun2code.android.buildownpawserver.tab;

import android.annotation.SuppressLint;
import android.app.ActionBar.Tab;
import android.app.ActionBar.TabListener;
import android.app.Fragment;
import android.app.FragmentTransaction;
import de.fun2code.android.buildownpawserver.R;

@SuppressLint("NewApi")
public class MyTabListener implements TabListener {
    Fragment fragment;

    public MyTabListener(Fragment fragment) {
        this.fragment = fragment;
    }

    public void onTabSelected(Tab tab, FragmentTransaction ft) {
        ft.replace(R.id.fragment_container, fragment);
    }

    public void onTabUnselected(Tab tab, FragmentTransaction ft) {
        ft.remove(fragment);
    }

    public void onTabReselected(Tab tab, FragmentTransaction ft) {
        // nothing done here
    }
}