package de.fun2code.android.buildownpawserver.tab;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import de.fun2code.android.buildownpawserver.R;


@SuppressLint("NewApi")
public class Connexion extends Fragment {
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View view = inflater.inflate(
                R.layout.activity_connexion
            , container, false);
		TextView textview = (TextView) view.findViewById(R.id.textView1);
		return view;
	}

}
