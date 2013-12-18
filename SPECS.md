#Spécifications


##1. Présentation du projet


###1.1 Contexte

Ce projet s'inscrit dans un cadre scolaire, plus précisément comme projet de fin d'études, en vu de l'obtention du diplôme d'architecte logiciel en BAC+5. Un panel de projets proposés par différentes entreprises aux étudiants entraîne un choix par ces derniers d'un des projets. La réalisation d'une application proposée par des entreprises permet de simuler la mise en situation réelle, avec un projet devant être fonctionnel et en production à la fin de l'année.
Notre projet est une idée personnelle (et non un sujet d'entreprise). C'est une interface entre le PC et un Smartphone/une tablette permettant d'interagir avec ces derniers, directement depuis votre ordinateur. Ce projet a été validé par M. Sananes, qui jouera le rôle de l'entreprise dans la validation du **cahier des charges** et le suivi de projet.


###1.2 Objectifs

Ce projet a pour objectif de nous mettre en situation réelle, en prenant rendez-vous avec une entreprise, pour établir le cahier des charges, voir les enjeux économiques, etc. Il nous habitue également à employer des bonnes méthodes de gestion de projet. L'objectif est que le projet soit terminé et mis en production avant la fin de la démonstration à l'école.


###1.3 Description de l'existant

Il n'y a bien entendu pas d'existant, puisque c'est un projet qui part de zéro.
Le projet sera développé sur mobile, plus précisément sous Android. Il y aura une interaction Ordinateur/Smartphone(Tablette). Le développement se fera donc avec :

- Ordinateur,
- Smartphone/tablette,
- Divers logiciels,
- Réseau local.



##2. Expression des besoins

Le contrôle du téléphone sera possible grâce à un serveur web installé sur le téléphone, ce serveur web sera recevra des requêtes HTTP qui lui indiqueront quel sont les actions à mener. Afin de faciliter la prise en main de l'application, nous avons opté pour une interface web de type web desktop. Et chaque fonctionnalité sera accessible depuis le bureau.  

Dans un premier temps, nous vous décrirons les besoins fonctionnelles de l'application, et ensuite les besoins non-fontionnelles donc techniques de l'application.

###2.1 Besoins fonctionnels

L’intérêt d'une application réside dans sa capacité à répondre aux besoins les plus forts des utilisateurs. Elle y répond en mettant à leur disposotion des fonctionnalités, que l'on peut catégoriser, soit dans la catégorie « Must Have », pour les fonctionnalités dites "vitales", soit dans la catégorie « Nice to have », pour les fonctionnalités intéressantes mais pas indispensables.

####Must Have

**Gestion des SMS** : l’application doit permettre l’envoi de SMS aux contacts enregistrés dans le téléphone et des numéros non-enregistrés dans le téléphone. Elle doit aussi permettre la lecture et la suppression des SMS enregistrés sur le téléphone. Une notification doit également apparaître à l'écran lors de la réception d'un SMS.  
Cette gestion sera possible grâce à une fenêtre qui s'ouvrira lorsque l'utilisateur cliquera sur l'icône présente sur le bureau. Cette fenetre sera composée d'une barre d'outils, et d'une liste de conversations.  
La barre d'outils de cette fenêtre contiendra une barre de recherche, un bouton de suppression, et un bouton permettant l'écriture de nouveaux messages et permettra la suppresion des conversations, ainsi que l'écriture de nouveaux SMS.  
Pour écrire un nouveau SMS, il suffira de cliquer sur le bouton prévu à cet effet dans la barre d'outils. La vue se scindera en deux pour avoir d'un coté la liste des conversations et de l'autre une zone de texte prévu pour l'écriture du message et un champ dans lequel on renseignera le nom du contact s'il est enregistré dans le téléphone ou un numéro de téléphone.  
Pour visualiser une conversations, il faudra la sélectionner.  
Pour supprimer une conversation, nous avons deux possiblités. Soit on clique sur le bouton de suppression, qui va modifier la vue afin d'ajouter des checkbox permetttant la sélection des conversations que l'on souhaite supprimer. Soit en cliquant sur un bouton supprimer à côté de la conversation.

**Gestion des Contacts** : La liste des contacts doit être accessible depuis l’ordinateur, et fournir les informations de base, à savoir le nom et le numéro de téléphone du contact. Elle doit également permettre l'ajout et la suppression de contact.  
La fenêtre de gestion des contacts sera composée d'une barre d'outils et d'une liste de contacts. La barre d'outils contiendra une barre de recherche, un bouton d'ajout et un bouton de suppression.  
Pour supprimer un contact, nous prévoyons un process similaire à celui qui permet de supprimer des messages.  
Pour l'ajout de contact, il faudra cliquer sur le bouton d'ajout se trouvant dans la barre d'outils, qui affichera un formulaire dans lequel on pourra rensseigner toutes les informations nécessaires.
Nous pourrons également modifier un contact déjà existant, en cliquant sur un bouton "édition" présent à côté de chaque contact et y modifier les champs.

**Accès à la liste des applications** : L'acces à la liste des applications installées doit être possible, des actions supplémentaires, tels que la suppressions des applications.
Une barre d'outil sera présente. Elle permettra de rechercher une application parmis la liste des applications affichées. Nous pourrons bien évidemment supprimer une application, ou télécharger celle-ci sous forme d'APK.

**Gestion des fichiers** : les fichiers enregistrés sur le téléphone doivent être accessibles sur l’ordinateur, et des opérations tel que la modification du nom d’un fichier, le déplacement d’un fichier, la récupération d’un fichier, la suppression d'un fichier, et l’ajout d’un fichier, doivent être possibles.  
La fenêtre de gestions des fichiers sera semblable à un explorateur windows, mais en plus simple. Comme indiqué plus haut elle permettra l'exécution d'actions dites "classiques". Dans le cas où l'utilisateur tente de mettre un fichier déja existant au même emplacement sur le téléphone, un message s'affichera à l'écran afin de prévenir l'utilisateur, et lui demandera s'il souhaite remplacer le fichier déja existant par celui que l'on souhaite placer.
Nous pourrons également sélectionner plusieurs fichiers en même temps, puis les télécharger. L'appui sur le bouton de téléchargement doit permettre de créer un .ZIP ou .RAR contenant tous les fichiers et le télécharger ensuite sur l'ordinateur.

**Lecture de fichier vidéo et image** : L'application devra permettre la lecture de fichiers vidéos, et images.
Un diaporama pourra être utilisé également pour la visualisation des images.
Les images et vidéos étant des fichiers, les mêmes traitement que la gestion des fichiers seront également possibles sur ces derniers.


####Nice To Have

**TextToSpeech** : il s’agit d’une fonctionnalité de synthétisation de voix. L’application peut récupérer un texte écrit depuis l’ordinateur et le lire. 

**Journal d’appel** : l’application peut éventuellement permettre l’accès au journal d’appel sous forme de tableau. Les informations à afficher restent à définir, mais ça sera sous la forme d'une facture/d'un tableau de bord, avec par exemple la date d'appel, le contact appelé, les numéros appelés, la durée de l'appel si possible etc.

**Changer le fond d’écran** : l’application peut éventuellement permettre la modification du fond d’écran du téléphone.

**Utiliser la caméra** : l’application peut éventuellement permettre la prise de vidéo ou de photo à distance.

**Utiliser le microphone** : L'application peut éventuellement permettre l'enregistrement à distance. Au clic sur un bouton sur l'interface, l'enregistreur se lance sur le téléphone et enregistre tout ce qu'il y a aux alentours.

**L’envoi de mail** : l’application peut éventuellement permettre l’envoi de mail.


###2.2 Besoins non fonctionnels

Cette partie listera les spécifications non fonctionnelles qui sont toutes les spécifications qui n'expriment pas une fonction du logiciel (contraintes de performance, système d'exploitation cible...).

Les fonctionnalités devront être réactives dans la majorité des cas. Certaines comme la WebCam par exemple pourront avoir une marge un peu plus large quant à la réactivité. Le projet devra être disponible sous forme d'application (.APK) installable sur un **Smartphone** ou une **tablette** ayant comme système d'exploitation **Android**. La version minimale d'Android supportée par notre application n'a pas encore été définie, mais nous essayerons d'aller jusqu'à la version la plus ancienne possible par rapport aux fonctionnalités proposées.
L'application devra également être sécurisée avec des mots de passes cryptés.

Une bonne ergonomie sera également très souhaitable afin d'améliorer et de faciliter l'expérience utilisateur.

Le lancement de l'interface se faisant sur un navigateur web à travers le PC, nous essayeront de suivre le maximum de normes du W3C et de la rendre compatible avec la majorité des navigateurs les plus utilisés (au moins Firefox et Chrome).



##3. Contraintes


###3.1 Coûts

Les coûts budgétaires du développements seront inexistants pour l'instant. Ayant déjà le matériel nécessaire, et les logiciels, et utilisant beaucoup de logiciels libres, le coût sera nul.

Concernant les infrastructures logicielles, matérielles et humaines, nous allons détailler ce qui sera utilisé.

####Infrastructure humaines :

- Maxime HORCHOLLE
- Jean-Ernsso PIERRE
- Florim KELMENI

####Infrastructure matérielle :

- Ordinateur/Ordinateur Portable
- SmartPhone/Tablette **sous Android**

####Infrastructure logicielle :

- **Eclipse/Intellij (IDE)** :
Ce sont des environnements de développement intégrés très souples et très puissants permettant de développer un grand nombre d'applications différentes.

- **Serveur WEB mobile (PAW Server)** : PAW Server sera au coeur de notre application. C'est un serveur WEB qui est lancé sur le smartphone/tablette, et qui a un certain nombre de classes et de fonctions qui existe pour intéragir directement avec la device. C'est le serveur qui sera utilisé pour notre application. Comme dit précédement PAW Server est en effet un serveur d'application Java, basé sur le langage BeansShell (un dérivé de Java orienté script). De base il existe une appplication sur le store Android qui implemente quelques unes des fonctionnalités qu'il est possible d'utiliser avec PAW Server comme l'envoie de SMS, etc... Mais il est aussi possible de l'utiliser pour héberger sa propre application (c'est ce que nous ferront dans notre projet). Nous avons choisi cet outil car ils nous a semblé que c'est l'outil le plus abouti et le plus simple a utiliser pour le moment sur le marché. Grâce à sa communauté bien que restreinte mais très active et à sa documentation poussée et fournie. 

- **JAVA / BeanShell** :
Nous utiliserons principalement le langage JAVA, étant donné que nous développerons sur Android.
BeanShell est un interpréteur Java disponible en standard (au moins dans l'installation de Java6 sous Debian). L'idée de BeanShell est de fournir un interpréteur Java pouvant être embarqué dans une application pour la rendre scriptable.
Mais BeanShell est aussi livré avec un interpréteur de commande (shell) autonome: bsh. Tout comme un shell Unix vous permet d'exécuter des tâches en invoquant des commandes Unix, le shell BeanShell vous permet d'exécuter des instructions écrites en Java. Cet outil se révèle donc bien pratique pour expérimenter du code Java. Ou à fortiori pour se familiariser avec ce langage.

####Versioning et Documentation etc.

- **Github** :
Nous avons choisi d'héberger notre code sur GitHub car en plus d'utiliser un des meilleurs gestionnaires de version du marché (GIT), il propose aussi la meilleure interface du marché pour GIT. Il intègre par exemple un Wiki, un bugtracker, une gestion fine de l'équipe, etc.

- **Format MarkDown** :
Pour tout les documents du projet nous avons choisi d'utiliser le format MarkDown, il s'agit d'un langage de balisage léger qui permet de mettre en forme facilement son texte sans rentrer dans une mise en forme complexe. Un des autres avantages est de pouvoir placer ce texte dans le repository et que tout le monde puisse le voir mis en forme directement sur GitHub, mais aussi générer avec ce fichier un PDF avec une mise en forme plus ou moins complexe.  

- **Skype / Mail** :
Ces outils nous servirons à communiquer ensemble pour les réunions.

- **Google Drive** :
Cet outil nous servira pour tous les documents que nous ne pourrons pas écrire en Markdown (feuilles Excel, etc)

- **Gantter**: Il s'agit du service web que nous utilisont pour faire notre diagramme de Gantt, nous l'utilisont car en plus de fonctionner sur tout les systèmes d'exploitation, il permet de réaliser un export dans de nombreux formats (pdf/image/microsoft projetc, etc)

- **Trello** :
Pour gérer toutes les tâches de notre projet nous allons utiliser cette application. Elle se base en grande partie sur la philosophie agile. Chaque tâche est présentée sous forme d'un post-it qui peut être placer dans trois colonnes (A faire/ en cours / terminé). Des post-it peuvent être rajoutés. Il a beaucoup de similitudes avec JIRA.


###3.2 Délais

Ce projet étant un projet se réalisant dans le cadre de l’obtention du diplôme de fin d’année, il devra, bien évidemment, être terminée avant la fin de l'année scolaire.

**2 Décembre 2013** : Le cahier des charges, le diagramme de Gantt et la justification du modèle de gestion de projet retenu doivent être livrés.

**1er Avril 2014** : La justification de l’architecture logicielle retenue, les documents de structuration, le story-board et les premières vues devront être livrés.

**5 mai 2014** : l’application devra être terminée à 85% et une démonstration sera effetuée.


###3.3 Méthodologie de gestion de projet utilisée

Sur notre projet annuel nous allons appliquer les principaux fondamentaux des méthodes agiles. Car nous sommes convaincus qu'utiliser les règles de l'agile ne peut être que bénéfique à l'avancée du projet. Nous allons nous baser sur la méthode Scrums mais malheuresement il nous sera impossible de mettre en oeuvre totalement cette méthode. Nous allons donc ci-dessous vous expliquer comment va se dérouler notre méthode de travail. 

Dans un premier temps, le point le plus important des méthodes agiles est la réactivé. Pour cela, dans un projet Scrum, nous aurions dû avoir une réunion par jour (daily meeting) mais le temps que nous aurions dû y consacrer étant trop important, nous nous dirigerons plutôt vers une à trois courtes réunions par semaine. Comme dans scrums cette réunion énoncera ce qui a été réussi et raté pendant la semaine, servira à redéfinir les tâches à effectuer pour la semaine suivante, mais aussi à identifier et aider les membres qui éprouvent des difficultés.

Comme dans Scrums nous allons classer les tâches à réaliser en utilisant deux catégories.
Leurs utilités dans l'application

- **Must Have:** qui correspondent à toutes les fonctionnalités vitales pour le client
- **Nice to Have:** toutes les fonctionnalités classées dans cette catégorie correspondent aux fonctionnalités non vitales pour que l'application puisse être utilisée par le client.

Leurs niveaux de difficulté : si une tâche est difficile il vaut mieux soit retarder son développement afin que les membres du projet se sentent plus à l'aise, soit placer le membre le plus compétent sur cette tâche. La difficulté sera calculée sur 10 en faisant la moyenne de l'estimation de la difficulté qu'aura choisie chaque membre.

Comme le préconise Scrums, le chef de projet (scrum master) changera par cycle de deux semaines. De même en théorie n'ayant pas de réel client physique, ce sera un membre de l'equipe qui s'en chargera. Le client lui aussi changera toutes les deux semaines. Le fait de changer de chef de projet permet aux membres du projet d'être plus au courant de ce qui se passe dans le projet.



##4. Déroulement du projet


###4.1 Planication

CF. GANTT


###4.2 Plan d'assurance qualité

Une des règles fondamentales d'un projet agile est la réactivité et la livraison de code de qualité. C'est pour cela que nous essayerons d'utiliser des normes de codage. Nous écrirons aussi un maximum de tests unitaires afin de valider la non-régréssion dans le code et les fonctionnalités. Le fait d'utiliser une méthode agile suppose aussi que nous aurons plus de facilité à piloter finement notre projet par exemple rajouter une fonctionnalité qui n'etait pas prevu à la base ou choisir d'allouer plus de temps à une tâche.


###4.3 Documentation

Comme tout bon projet agile la documentation technique sera minimaliste (en restant conforme bien évidemment) mais complétée par un code clair, lisible et bien documenté.
En ce qui concerne la documentation utilisateur, elle se doit d'être elle aussi minimaliste car un projet bien réalisé doit permettre à ceux qui l'utilise de le comprendre facilement, et de ne se servir de la documentation que pour les fonctionnalités principales et les cas particuliers. En général peu d'utilisateurs prennent la peine de la lire ou du moins en partie. Dans un projet agile il est préférable de livrer un projet plus complet au niveau fonctionnalités qu'êxtrement bien documenté.
