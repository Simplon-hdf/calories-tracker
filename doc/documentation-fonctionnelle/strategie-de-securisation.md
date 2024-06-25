# Stratégie de sécurisation

## Introduction 

Ici, vous trouverez la stratégie de sécurisation que nous avons décidé de mettre en place. Nous avons choisi de travailler en couche N-tiers et de la scinder en trois ainsi qu’une partie transversale. La première étant la couche Client, incluant la partie navigateur (Frontend) et la partie mobile. La deuxième sera axée sur l’API et la dernière sur la couche base de données (BDD).

Nous avons identifié quatre règles d’hygiène primordiales, que nous expliciterons à travers nos couches, qui sont les suivantes : défense en profondeur, principe de moindre privilège, réduction de la surface d’attaque ainsi que l’audit.

## Sécurité transversale 


### Principe de défense en profondeur

Le principe de défense en profondeur consiste à mettre en œuvre plusieurs mesures de protection indépendantes les unes des autres. Nous allons ici essayer de verrouiller chaque couche de notre application indépendamment les unes des autres.

### Mise en place d'audit

Un audit d’application est une évaluation systématique et indépendante de l’application informatique d’une organisation. Son objectif est de vérifier et d’assurer que l’application est conforme aux normes, réglementations et bonnes pratiques en matière de sécurité, performance et fonctionnalité.

## Client 


### Sanitization des formulaires (regex)

Nous allons servir de regex pour pouvoir vérifier que les données que les utilisateurs renseigne sont bien conforme au format attendu avant d'envoyer les élements à la base données. 

#### Vérification des mots des passe

Pour la sécurisation des mots de passe ainsi que le renforcement de celui ci nous avons décider de mettre en place une politique des mots de passe adaptée que nous détaillerons [ici](#politique-des-mots-de-passe)

#### Se prémunir contre les injections SQL 

Nous allons mettre en place des éléments permettant de réduire au maximum les chances d’injection SQL grâce à des requêtes préparées ainsi qu’à la vérification des données entrées par les utilisateurs.


### Mise en place du protocle HTTPS/HSTS au niveau du Client

La mise en œuvre de HSTS se fait par la transmission d’un en-tête HTTP lors de l’accès au site en HTTPS pour assurer son intégrité. Il est nécessaire de mettre en œuvre HSTS afin de limiter les risques d’attaque de type Man-In-The-Middle dus à des accès non sécurisés générés par les utilisateurs ou par un attaquant.

### Mise en place du CORS au niveau du Client

Il est parfois nécessaire de contourner la SOP (stratégie de sécurité par défaut du navigateur) afin de permettre l’appel de ressources en dehors de l’Origin telles que peuvent en fournir des services web tiers de météo ou d’actualités par exemple.

## API 


### Mise en place du CORS au niveau de l'API

Nous allons utiliser le CORS à ce niveau-là pour plusieurs raisons.
- La protection contre les requêtes inter-origines non autorisées.
- Prévention des fuites de données sensibles.

### Authentification

Au niveeau de l'Authentification nous avons décider d'instaurer une authentification multifacteur pour couvrir les deux catégories 
- Ce que je sais.
- Ce que je possède.

#### Mise en place de token

Nous utiliserons des tokens pour permettre une meilleur gestion des sessions ainsi qu'un renforcement de la sécurité en assurant l’intégrité et la confidentialité des informations transmises.

#### Session et durée de vie

Pour les applications sensibles, la question de la durée de vie de session est primordiale car elle permet de sécuriser les données. Nous allons configurer un timeout qui agira toutes les 12h d’inactivité.

### Principe du moindre privilège

Ce principe vise à n’octroyer aux éléments et acteurs du système que les permissions strictement nécessaires pour fonctionner, ceci afin de limiter le risque de vol, d’altération ou de destruction de données en cas de compromission d’un ou plusieurs éléments.

#### [RBAC](./rbac.md)

## Base de données


### Règlement Général sur la Protection des Données (RGPD)

Nous allons nous appuyer sur les principes et règlements du RGPD pour nous aider à sécuriser le plus possible les données de notre application avec quelques principes simples comme :

- La cartographie des données.
- Le controle d'accès au données.

### Politique des mots de passe

- Le mot de passe requiert au minimun 8 caractères.
- Le mot de passe requiert au minimun une majuscule, une minuscule, un chiffre et un caractère spécial.
- L'utilisateur aura le droit à 8 tentatives d'authentification erronées.
- L'utilisateur devra réinitialiser son mot de passe une fois par an.
- Hachage et salage des mots de passe.  




