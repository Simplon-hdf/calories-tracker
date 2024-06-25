# Stratégie de sécurisation

## Introduction 

Ici, vous trouverez la stratégie de sécurisation que nous avons décidé de mettre en place. Nous avons choisi de travailler en couche N-tiers et de la scinder en trois ainsi qu’une partie transversale. La première étant la couche Client, incluant la partie navigateur (Frontend) et la partie mobile. La deuxième sera axée sur l’API et la dernière sur la couche base de données (BDD).

Nous avons identifié quatre règles d’hygiène primordiales, que nous expliciterons à travers nos couches, qui sont les suivantes : défense en profondeur, principe de moindre privilège, réduction de la surface d’attaque ainsi qu'une veille sécuritaire régulière.

## Sécurité transversale 


### Principe de défense en profondeur

Dans le cadre de notre stratégie de sécurité, nous avons opté pour la défense en profondeur. Cette approche consiste à superposer plusieurs couches de protection pour renforcer la sécurité de nos systèmes et données.

### Mise en place d'une veille sécuritaire régulière

Nous mettons en place une veille sécuritaire régulière afin de garantir la protection continue de nos systèmes et données sensibles. Cette démarche proactive nous permettra de surveiller en permanence les menaces potentielles et d'anticiper les risques de sécurité. Grâce à une analyse constante des vulnérabilités et à l'actualisation de nos mesures de protection, nous serons en mesure de réagir rapidement et efficacement aux incidents, assurant ainsi la pérennité et la sécurité de nos opérations.

## Client 


### Sanitization des formulaires (regex)

Etant donné que l'un des concept fondamental est de ne pas faire confiance au client. Nous allons servir de regex pour pouvoir vérifier que les données que les utilisateurs renseigne sont bien conforme au format attendu (type de données de chaque input) avant d'envoyer les élements à la base données.

// A REFORMULER
#### Vérification des mots des passe

Pour la sécurisation des mots de passe ainsi que le renforcement de celui ci nous avons décider de mettre en place une politique des mots de passe adaptée que nous détaillerons [ici](#politique-des-mots-de-passe)

#### Se prémunir contre les injections SQL 

Nous allons mettre en place des éléments permettant de réduire au maximum les chances d’injection SQL grâce à des requêtes préparées ainsi qu’à la vérification des données entrées par les utilisateurs.
// FIN

### Mise en place du protocle HTTPS/HSTS au niveau du Client

La mise en œuvre de HSTS se fait par la transmission d’un en-tête HTTP lors de l’accès au site en HTTPS pour assurer son intégrité. Il est nécessaire de mettre en œuvre HSTS afin de limiter les risques d’attaque de type Man-In-The-Middle dus à des accès non sécurisés générés par les utilisateurs ou par un attaquant.

### Mise en place du CORS au niveau du Client

Il est parfois nécessaire de contourner la SOP (stratégie de sécurité par défaut du navigateur) afin de permettre l’appel de ressources en dehors de l’Origin telles que peuvent en fournir des services web tiers de météo ou d’actualités par exemple.

## API (découpe en 2 § = Authentification / Authorization)

### Mise en place du CORS au niveau de l'API

Nous allons utiliser le CORS à ce niveau-là pour plusieurs raisons.
- La protection contre les requêtes inter-origines non autorisées.
- Prévention des fuites de données sensibles.

### Authentification et autorisation (2 paragraphes)

L'authentification passe par l'email et le mot de passe. combo authent/autoriz

#### Mise en place de token

// REECRIRE: utilisation principe de sessions, curseur confort user/sécurite, appli pas ultra sensible
Nous utiliserons des tokens pour permettre une meilleur gestion des sessions ainsi qu'un renforcement de la sécurité en assurant l’intégrité et la confidentialité des informations transmises.

#### Session et durée de vie

Pour les applications sensibles, la question de la durée de vie de session est primordiale car elle permet de sécuriser les données. Nous allons configurer un timeout qui agira toutes les 6 mois d’inactivité.

### Principe du moindre privilège

Ce principe vise à n’octroyer aux éléments et acteurs du système que les permissions strictement nécessaires pour fonctionner, ceci afin de limiter le risque de vol, d’altération ou de destruction de données en cas de compromission d’un ou plusieurs éléments.

#### [RBAC](./rbac.md)

## Base de données

### Identification des utilisateurs

// A REVOIR
Universally Unique IDentifier (UUID) évite le stockage par suite logique 

### Règlement Général sur la Protection des Données (RGPD)

Nous sommes soumis au Règlement Général de la Protection des Données (RGPD) qui impose un cadre légal à la collecte des données des utilisateurs. Dans ce cadre-ci, nous mettons en place :

- Droit à la consultation des données
- Droit de rectification des données
- Droit de suppression des données
- // A REVOIR
- Non automatique, par principe de demande aux administrateurs

### Politique des mots de passe

- Le mot de passe requiert au minimun 8 caractères et un maximum de 255 caractères.
- Le mot de passe requiert au minimun une majuscule, une minuscule, un chiffre et un caractère spécial.
- L'utilisateur aura le droit à 8 tentatives d'authentification erronées.
- Mise en place d'un système de récupération de mot de passe en cas d'échec répétés (mot de passe oublié) par mail.
- L'utilisateur devra réinitialiser son mot de passe une fois par an.
- Hashage (bcrypt) et salage des mots de passe.
