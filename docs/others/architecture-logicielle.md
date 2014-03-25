#Architecture logicielle de notre application

##Introduction
Dans ce document nous allons justifier tout nos choix techniques

##Serveur
Nous allons utiliser la technologie PAW Server, c'est sans doute à l'heure actuelle la meilleurs solutions à la disposition des développeurs pour créer une application "copiant" les fonctionnalité de AirDroid, en effet toutes les autres solutions n'était pas satisfaisante, en effet soit elles aurait été trop longue à mettre en place (création directement d'un outil clone de PAW Server), soit pas assez complètes (utilise un serveur web mobile nous aurait pris aussi beaucoup de temps d'adaptation à notre problématique). De nombreux choix technique lié au projet vont découler du choix de cette application

##Sytème d'exploitation
Bien évidement l'application doit tourner sur Android donc sur un système linux. Mais étant donné que la plus grande partie l'application ce déroulera un ordinateur il faudra veiller à ce que l'application fonctionne bien sur les navigateurs les plus communs (Firefox/Chrome). Malheureusement cette application ne pourra être développé que pour la plateforme Android étant donnée que c'est la seule à permettre le déploiement d'un serveur sur sa plateforme

##Type d'application
Il s'agit d'une application mobile qui contiendra un site web accessible via un ordinateur. Il y aura donc deux type d'application: un application mobile

##Langage
Pour la partie application mobile elle sera développé avec le langage Java avec la surcouche Android. Pour ce qui est de l'application web, elle sera developpé en BeanShell (un dérivé du Java orienté Script) pour ce qui est de la partie métier, le rendu quant à lui en HTML mis en forme via du CSS et du JavaScript, il est fort probable que nous utilisions un framework JavaScript (JQuery) pour nous faciliter la vie.

##Autre Outils:
Nous utiliseront bien évidement un IDE nous facilitant le développement (Eclipse/IDEA), nos sources seront versionné sous Git via GitHub

##Schéma:
Voici le schéma standard de développement de notre application
