#Architecture logicielle de notre application

##Introduction
Dans ce document nous allons justifier tous nos choix techniques

##Serveur
Nous allons utiliser la technologie PAW Server, c'est sans doute à l'heure actuelle la meilleure solution à la disposition des développeurs pour créer une application "copiant" les fonctionnalités de AirDroid, en effet toutes les autres solutions n'étaient pas satisfaisante, en effet soit elles auraient été trop longue à mettre en place (création directement d'un outil clone de PAW Server), soit pas assez complètes (utilise un serveur web mobile nous aurait pris aussi beaucoup de temps d'adaptation à notre problématique). PAW Server l'avantage d'avoir une documentation bien fournis et une communauté assez importante qui soutient son développement, il semblerait qu'AirDroid utilise lui-même PAWServer. De nombreux choix technique liée au projet vont découler du choix de cette application

##Sytème d'exploitation
Bien évidemment l'application doit tourner sur Android donc sur un système linux. Mais étant donné que la plus grande partie l'application ce déroulera un ordinateur il faudra veiller à ce que l'application fonctionne bien sûr les navigateurs les plus communs (Firefox/Chrome). Cette application ne pourra être développé que pour la plateforme Android étant donné que c'est la seule à permettre le déploiement d'un serveur sur sa plateforme.

##Type d'application
Il s'agit d'une application mobile qui contiendra un site web accessible via un ordinateur. Il y aura donc deux types d'application: une application mobile qui lancera un serveur hébergé sur le téléphone et un site web qui sera visible depuis un autre terminal et qui permettra d'administrer son téléphone à distance

##Langage
Pour la partie application mobile elle sera développée avec le langage Java avec la sur-couche Android. Pour ce qui est de l'application web, elle sera developpée en BeanShell (un dérivé du Java orienté Script) pour ce qui est de la partie métier, le rendu quant à lui en HTML mis en forme via du CSS et du JavaScript, il est fort probable que nous utilisions un framework JavaScript (JQuery) pour nous aider à développer efficacement.

##Autre Outils:
Nous utiliseront bien évidemment un IDE nous facilitant le développement (Eclipse/IDEA), nos sources seront versionné sous Git via GitHub

##Schéma:
Voici le schéma standard de développement de notre application
![Cycle de développement](https://github.com/capapas/AirCloneDroid/blob/master/docs/img/archi-logi.png)
