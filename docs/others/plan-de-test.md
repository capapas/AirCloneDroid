#Plan de test

##Introduction
Dans ce document nous allons voir comment va ce déroulé notre plan de test. Dans un premier temps nous allons voir en quoi consiste le plan de test que nous allons appliqué, puis justifier de sont intéret et enfin nous allons voir comment il va être mis en place

##Quoi
Notre plan de qualité va ce basé le plus possible sur les tests unitaires afin que nous application soit testable le plus rapidement possible sans avoir besoin d'une presence humaine afin de la tester. Nous allons aussi tenté d'utiliser des tests fonctionnels afin de tester la validité d'un scénario dans son navigateur.

##Pourquoi
Nous avons choisi ce plan de test car nous somme convaincu qu'il s'agit de la meilleur solutions pour ecrire du code de qualité et durable. Malheuresement étant donné notre inexpérience dans ce domaine il y à de forte chance que ce plan de test ne soit pas suivi à la lettre, car il peut s'avérer gourmand en temps

##Comment
Pour tout ce qui est du code métier écrit en Beanshell il pourra être testé facilement grâce aux tests unitaires, pour l'écriture de test unitaire nous utiliseront JUnit. Pour ce qui est de l'interface Web, elle sera testée grâce à un script Selenium qui va simulé des actions qu'un utilisateur ferait normalement sur son navigateur (clic, taper sur son clavier, ...), ce script peut être facilement intégré aux tests unitaires afin d'être toujours sûr que son application fonctionne à un instant T.
