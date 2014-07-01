package de.fun2code.android.buildownpawserver.tab;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import de.fun2code.android.buildownpawserver.R;
import de.fun2code.android.buildownpawserver.TabedActivity;

@SuppressLint("NewApi")
public class Connexion extends Fragment implements View.OnClickListener {

    public View onCreateView(LayoutInflater inflater, final ViewGroup container,
			final Bundle savedInstanceState) {
		final View view = inflater.inflate(
                R.layout.activity_connexion
            , container, false);

        Button btn = (Button) view.findViewById(R.id.runButton);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                TabedActivity myTabActivity = (TabedActivity)getActivity();
                myTabActivity.runOrStopServer();
            }
        });

		return view;
	}

    @Override
    public void onClick(View view) {}
}
