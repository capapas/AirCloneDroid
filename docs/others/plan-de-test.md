#Plan de test

##Introduction
Dans ce document nous allons voir comment va se dérouler notre plan de test. Dans un premier temps nous allons voir en quoi consiste le plan de test que nous allons appliquer, puis justifier de son intérêt et enfin nous allons voir comment il va être mis en place

##Quoi

Notre plan de qualité va se baser le plus possible sur les tests unitaires afin que notre application soit testable le plus rapidement possible sans avoir besoin d'une présence humaine afin de la tester. Nous allons aussi tenter d'utiliser des tests fonctionnels afin de tester la validité d'un scénario dans son navigateur.

##Pourquoi

Nous avons choisi ce plan de test car nous sommes convaincus qu'il s'agit de la meilleure solution pour écrire du code de qualité et durable. Malheureusement étant donné notre inexpérience dans ce domaine il y a de fortes chances que ce plan de test ne soit pas suivi à la lettre, car il peut s'avérer gourmand en temps

##Comment
Pour tout ce qui est du code métier écrit en Beanshell il pourra être testé facilement grâce aux tests unitaires, pour l'écriture de test unitaire nous utiliseront JUnit.
Voici les principaux tests unitaires qui seront créé pour l'application:

- Tester le bon lancement du serveur
- Tester la connexion de l'utilisateur à l'application avec son mot de passe
- Tester la deconnexion au serveur
- Test de la fonctionnalité SMS (consultation, reception, envoie)
- Test de la fonctionnalité contact (Voir tous les contacts, consulté un contact)

Pour ce qui est de l'interface Web, elle sera testée grâce à un script Selenium qui va simulé des actions qu'un utilisateur ferait normalement sur son navigateur (clic, taper sur son clavier, ...), ce script peut être facilement intégré aux tests unitaires afin d'être toujours sûr que son application fonctionne à un instant T.

Enfin l'application que le code écrit est bien formaté en suivant les normes Java [http://www.oracle.com/technetwork/java/codeconv-138413.html](http://www.oracle.com/technetwork/java/codeconv-138413.html), l'interet d'avoir un code bien formaté est double dans un premier temps il permet de naviguer rapidement dans le code que l'ont vient d'écrire, dans un deuxième temps il va permettre aux développeurs de comprendre bien plus rapidement le code écrit dans le cadre de la maintenance de l'application. 
