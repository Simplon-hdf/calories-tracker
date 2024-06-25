# Stratégie de sécurisation

## Introduction 

Ici, vous trouverez la stratégie de sécurisation que nous avons décidé de mettre en place. Nous avons choisi de la scinder en trois couches ainsi qu’une partie transversale. La première étant la couche Client, incluant la partie navigateur (Frontend) et la partie mobile. La deuxième sera axée sur l’API et la dernière sur la couche base de données (BDD).

Nous avons identifié quatre règles d’hygiène primordiales, que nous expliciterons à travers nos couches, qui sont les suivantes : défense en profondeur, principe de moindre privilège, réduction de la surface d’attaque ainsi que l’audit.

## Sécurité transversale 


### Principe de défense en profondeur

Le principe de défense en profondeur consiste à mettre en œuvre plusieurs mesures de protection indépendantes les unes des autres. Nous allons ici essayer de verrouiller chaque couche de notre application indépendamment les unes des autres.

### Mise en place d'audit

Un audit d’application est une évaluation systématique et indépendante de l’application informatique d’une organisation. Son objectif est de vérifier et d’assurer que l’application est conforme aux normes, réglementations et bonnes pratiques en matière de sécurité, performance et fonctionnalité.

## Client 


### Sanitization des formulaires (regex)

Etant donné que l'un des concept fondamental est de ne pas faire confiance au client. Nous utilisons des regex pour pouvoir vérifier que les données renseignées par les utilisateurs sont bien conformes au format attendu (type de données de chaque input) avant d'envoyer les élements à la base de données.

#### Se prémunir contre les injections SQL 

Nous allons mettre en place des éléments permettant de réduire au maximum les chances d’injection SQL grâce à des requêtes préparées ainsi qu’à la vérification des données entrées par les utilisateurs.


### Mise en place du protocle HTTPS/HSTS au niveau du Client

La mise en œuvre de HSTS se fait par la transmission d’un en-tête HTTP lors de l’accès au site en HTTPS pour assurer son intégrité. Il est nécessaire de mettre en œuvre HSTS afin de limiter les risques d’attaque de type Man-In-The-Middle dus à des accès non sécurisés générés par les utilisateurs ou par un attaquant.

### Mise en place du CORS au niveau du Client

Il est parfois nécessaire de contourner la SOP (stratégie de sécurité par défaut du navigateur) afin de permettre l’appel de ressources en dehors de l’Origin telles que peuvent en fournir des services web tiers de météo ou d’actualités par exemple.

## API

### Authentification

- Mise en place de token

Nous avons décidé que notre application n’a pas d’informations sensibles qui nécessitent une sécurité très poussée. Donc, nous allons utiliser des tokens d’un an pour améliorer l’ergonomie avec la technologie JWT.

- Session et durée de vie

Pour les applications sensibles, la question de la durée de vie de session est primordiale car elle permet de sécuriser les données. Nous allons configurer un timeout qui agira toutes les 1 ans d’inactivité.

### Autorisation 

- Principe du moindre privilège

Ce principe vise à n’octroyer aux éléments et acteurs du système que les permissions strictement nécessaires pour fonctionner, ceci afin de limiter le risque de vol, d’altération ou de destruction de données en cas de compromission d’un ou plusieurs éléments.

- [RBAC](./rbac.md)

### Mise en place du CORS au niveau de l'API

Nous allons utiliser le CORS à ce niveau-là pour plusieurs raisons.
- La protection contre les requêtes inter-origines non autorisées.
- Prévention des fuites de données sensibles.

## Base de données


### Identification des utilisateurs

Pour l'identification des utilisateur nous avons fais le choix d'utiliser un UID qui sont plus difficiles à deviner ou à falsifier, ce qui réduit le risque d'usurpation d'identité. Leur génération aléatoire et leur longueur rendent les attaques par force brute beaucoup plus difficiles.

### Règlement Général sur la Protection des Données (RGPD)

Nous allons nous appuyer sur les principes et règlements du RGPD pour nous aider à sécuriser le plus possible les données de notre application avec quelques principes simples comme :

- Droit à la consultation des données
- Droit de rectification des données
- Droit de suppression des données
- Un formulaire de demande aux administrateurs afin de faire les modifications nécessaires.

### Politique des mots de passe

- Le mot de passe requiert au minimun 8 caractères.
- Le mot de passe requiert au minimun une majuscule, une minuscule, un chiffre et un caractère spécial.
- L'utilisateur aura le droit à 8 tentatives d'authentification erronées.
- Mise en place d'un système de récupération de mot de passe en cas d'échec répétés (mot de passe oublié) par mail.
- L'utilisateur devra réinitialiser son mot de passe une fois par an.
- Hachage et salage des mots de passe.  




