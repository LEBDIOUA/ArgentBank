![Argent Bank](https://github.com/LEBDIOUA/ArgentBank/blob/main/assets/argentBankLogo.png)

## Description

ArgentBank est un projet réalisé dans le cadre d'une formation avec OpenClassrooms. Il s'agit d'une plateforme web dédiée à une banque.

## L'objectif du projet

L'objectif du projet est divisé en deux phases :
- Phase 1 : Authentification des utilisateurs
- Phase 2 : Gestion des transactions

### Authetification des utilisateurs

Développement d'une application web complète et responsive permettant aux clients de se connecter et de gérer leurs comptes et leur profil. l'application est développée avec React et Redux, et les données à afficher sont récupérées d'un service API.

#### Actions à développer

1. L'utilisateur peut visiter la page d'accueil.
2. L'utilisateur peut se connecter au système.
3. L'utilisateur peut se déconnecter du système.
4. L'utilisateur ne peut voir les informations relatives à son propre profil qu'après s'être connecté avec succès.
5. L'utilisateur peut modifier son profil et conserver les données dans la base de données. 

### Transactions

Il s’agit de spécifier les endpoints d’API nécessaires pour la gestion des transactions.

## Prérequis

Avant d'exécuter ce projet localement, assurez-vous d'avoir installé les éléments suivants sur votre machine:

- [Node.js](https://nodejs.org/en) - Runtime JavaScript
- [npm](https://www.npmjs.com/) - Gestionnaire de paquets JavaScript
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) - Base de données MongoDB


## Installation && Configuration

### Installation

1. Clonez ce dépôt sur votre machine locale en utilisant la commande suivante :
`git clone <URL_DU_REPO`

2. Accédez au répertoire du projet :
`cd NOM_DU_REP`

3. Installez les dépendances du projet en exécutant la commande suivante :
`npm install`

4. Remplissez la base de données <b>populate-db</b> avec deux utilisateurs 
`npm run populate-db`

### Exécution - Démarrage du serveur Web

Dans ce projet, vous trouverez deux sous-dossiers:
- Front-End : Inclut des éléments visuels permettant à l'utilisateur d'interagir avec l'application.
- Back-End : Côté serveur.

#### Démarage du API, serveur et base de données

1. Base de données

Exécutez la ligne de commande suivante pour démarrer MongoDB:
`mongod`

2. API - Serveur Local

Accèdez au dossier Back-End:
`cd Back-End`

Exécutez la ligne de commande suivante pour démarrer le serveur API:
`npx -p node@12 npm run dev:server`

Cette commande démarre le serveur API sur le port 3001

3. Serveur Front-End

Accèdez au dossier Front-End:
`cd Front-End`

Exécutez la ligne de commande suivante pour démarrer le serveur:
`npm run dev`

Cette commande démarre le serveur sur le port 5173.
Vous pourrez accéder à l'application en ouvrant votre navigateur et en visitant l'URL suivante : http://localhost:5173

### Données de la base de données

Une fois que la base de données est peuplée avec la commande <b>"populate-db"</b> est lancée, vous devriez trouver deux utilisateus dans votre base de données:

1. Tony Stark
- First Name: Tony
- Last Name: Stark
- Email: tony@stark.com
- Password: password123

2. Steve Rogers
- First Name: Steve,
- Last Name: Rogers,
- Email: steve@rogers.com,
- Password: password456

### Documentation de l'API
Pour en savoir plus sur les APIs utilisées, une fois que votre environnement local est bien installé, visitez: http://localhost:3001/api-docs

### Outils Utilisés

Ce projet a été développé en utilisant les technologies suivantes :

- <b>Vite</b> - Un outil de build rapide pour les applications web modernes.
- <b>React</b> - Une bibliothèque JavaScript pour construire des interfaces utilisateur.
- <b>JavaScript (ES6+)</b> - La version moderne de JavaScript pour écrire du code côté client.
- <b>REDUX</b> - Une bibliothèque de gestion d'état pour les applications JavaScript
- <b>AXIOS</b> - Une bibliothèque HTTP pour faire des requêtes.

## Processus Principal et Fonctionnalités

Les étapes principales de processus et déroulement de l'application, de l'authentification à la récupération et la modification des données.

![Processus Principal et Fonctionnalités](https://github.com/LEBDIOUA/ArgentBank/blob/main/assets/processus.png)

Avant d'expliquer le diagramme, je voudrais attirer votre attention sur le conteneur du milieu, <b>apiReduxHandler</b>. Comme son nom l'indique, il s'agit du gestionnaire des interactions entre l'API et Redux. Son rôle de faciliter la communication entre API et l'état de mon store.

Lorsque l'utilisateur essaie de s'authentifier en saisissant son email et son mot de passe, apiReduxHandler récupère les données de l'api et met à jour l'état (state) de l'application, à condition que les informations d'identification soient correctes.

une fois connecté, l'utilisateur peut accéder à sa page de profil où il peut modifier son nom et/ou prénom. Dans ce cas, apiReduxHandler appelle l'api (via apiService) pour mettre à jour la base de données. Une fois cette mise à jour effectuée, apiReduxHandler met à jour l'état (state) de l'application.

En cas de déconnexion, apiReduxHandler se charge de vider l'état de l'application.

## Autres fonctionnalités

J'ai décrit les fonctionnalités requises pour la formation et la validation du projet. Vous pouvez découvrir d'autres fonctionnalités supplémentaires en explorant l'application par vous-même.