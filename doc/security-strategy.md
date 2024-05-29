# Introduction

Aujourd'hui, nous avons un défi ! Nous devons travailler sur l'aspect sécurité de notre application de suivi des calories. Pour ce faire, nous allons esquisser notre stratégie de sécurité ici et également répertorier les principales mesures de protection.

Cette application vise à aider toute personne souhaitant atteindre ses objectifs de condition physique.

# Les 3 Grands Axes

Les trois grands axes sur lesquels nous allons nous concentrer aujourd'hui sont :
- La protection des données personnelles.
- L’identification.
- La protection de la partie client.

# La Mise en Place

La mise en place de tous les éléments suivants respecte les bonnes pratiques ainsi que les recommandations relatives à la sécurité du guide ANSSI.

# La Protection des Données Personnelles

- Utiliser le principe de Moindre Privilège.
- HTTPS.
- CSP (permet de sécuriser les échanges avec l’API).
- Les précautions d’usage des bases de données de type IndexedDB.
- Ne pas stocker d’informations sensibles dans les cookies.
- La sauvegarde des données.
- Utilisation de tokens anti-CSRF.
- La journalisation.

# La Sécurité liée aux Mots de Passe

Nous allons dans un premier temps définir notre plan d’action dans la partie authentification et mots de passe, car c’est le premier élément auquel notre utilisateur sera confronté.

- Interdire l’accès après trop de tentatives échouées (8) de mots de passe pour contrer les attaques en ligne.
- Hacher le mot de passe et ajouter un salage pour contrer les attaques hors ligne.
- Utiliser des caractères spéciaux dans les mots de passe pour contrer les attaques par dictionnaire.
- Une Authentification Multifacteur.
- Utiliser un canal sécurisé comme un flux encapsulé pour un protocole TLS pour contrer les attaques par homme du milieu.
- Complexité et longueur minimale requises.
- Notifications d’activités suspectes.

# La Sécurité liée à l’Expérience Utilisateur

Dans cette partie, nous allons nous intéresser à la sécurité au moment où l’utilisateur interagit avec l’application.

- Défense en profondeur.
- Réduction de la surface d’attaque.
- HSTS (pour limiter les risques d’attaque 'man in the middle').
- SOP.
- CORS.
- Encodage des données au format JSON.
- Choisir une API selon sa méthode HTTP.
- Les solutions face aux vulnérabilités XSS.
- Utiliser la protection X-XSS.
- Préférer l'utilisation de l'API Fetch à XMLHttpRequest.
- Audit.

# La Description des Éléments

## Partie 1 :

### Principe de Moindre Privilège

Ce principe vise à n’octroyer aux éléments et acteurs du système que les permissions strictement nécessaires pour fonctionner, ceci afin de limiter le risque de vol, d’altération ou de destruction de données en cas de compromission d’un ou plusieurs éléments.

- À la conception de l’application, prévoir autant de rôles que de besoins d’accès aux données (lecture seule, écriture, etc.).
- Limiter les permissions d’accès aux Application Programming Interfaces (APIs) du navigateur pour une application web.
- Limiter les permissions de l’utilisateur applicatif sur le système de fichiers.

### HTTPS

La mise en place de HTTPS a pour objectif :

- De garantir, autant que possible, l’authenticité du site consulté.
- De garantir également l’intégrité et la confidentialité des données échangées en bloquant les attaques de type Man-In-The-Middle (écoute, interception ou modification des échanges à la volée par des tiers, à l’insu de l’utilisateur).

### CSP

Permet de définir une stratégie de contrôle des accès aux ressources atteignables d’un site web donné par l’application de restrictions sous forme de liste d’autorisations. La maîtrise de l’ensemble des ressources récupérées par un site web permet de réduire le risque d’apparition et l’exploitabilité de vulnérabilités XSS. La définition de la liste des ressources autorisées peut être effectuée en utilisant :

- L’en-tête HTTP dédié, Content-Security-Policy, dans la réponse HTTP.
- La balise équivalente, `<meta http-equiv="Content-Security-Policy">`, dans la réponse HTML.

### Les précautions d’usage des bases de données de type IndexedDB

#### Ne pas stocker des informations sensibles dans les bases de données IndexedDB.

Les bases de données IndexedDB ne doivent être utilisées que pour le stockage de données non sensibles et pour lesquelles la perte ou la divulgation sera sans conséquence, par exemple pour mettre en cache l’état d’une application web.

#### Proscrire l'usage de l'API Web SQL Database

Interdire l’usage de l’API Web SQL Database, désormais obsolète.

### La sauvegarde des données

- Définition de la fréquence de sauvegarde : Les sauvegardes des données sensibles nécessitent une sauvegarde plus fréquente que le reste.
- Choix de la méthode de sauvegarde : Nous aurons le choix entre plusieurs bonnes méthodes de sauvegarde comme la sauvegarde par incrémentation ou les sauvegardes différentielles.

### Utilisation de tokens anti-CSRF

Générez des jetons anti-CSRF (Cross-Site Request Forgery) uniques pour chaque formulaire et vérifiez-les côté serveur pour vous assurer que les requêtes proviennent bien du formulaire de votre site et non d'une source malveillante.

### Ne pas stocker d’informations sensibles dans les cookies

Dans le cadre de la défense en profondeur et à l’exception des jetons de session, il est recommandé de ne pas stocker des informations sensibles dans les cookies. Leur utilisation n’est souhaitable que pour le stockage temporaire d’informations de faible volume, pour lesquelles la perte ou la divulgation sera sans conséquence.

## Partie 3 :

### Défense en profondeur

Le principe général de défense en profondeur consiste à mettre en œuvre plusieurs mesures de protection indépendantes face à chaque menace envisagée. Il est plus facile d’appliquer ce principe si le système à sécuriser est composé d’unités distinctes, aux interactions bien définies et possédant leurs propres mécanismes de sécurité. La défense en profondeur demande que soient mises en œuvre les mesures de protection nécessaires et disponibles au niveau de chaque unité.

### Réduction de la surface d’attaque

La réduction de la surface d’attaque consiste à ne pas exposer des services, accès et autres points d’entrée s’ils ne sont pas indispensables. Ce principe appliqué au développement logiciel demande que soit limitée la présence de composants logiciels dont l’usage n’est pas strictement nécessaire.

### HSTS

Il est nécessaire de mettre en œuvre HSTS afin de limiter les risques d’attaque de type Man-In-The-Middle dus à des accès non sécurisés générés par les utilisateurs ou par un attaquant. La mise en œuvre de HSTS se fait par la transmission d’un en-tête HTTP lors de l’accès au site en HTTPS pour assurer son intégrité. Par défaut, la stratégie HSTS d’un site est enregistrée par le navigateur lorsqu’il est visité pour la première fois.

### SOP

L’objectif de la Same-Origin Policy est de fournir un cadre de contrôle des interactions possiblement effectuées par les éléments embarqués dans une page web. SOP est une contrainte implémentée par tous les navigateurs du marché. Cette contrainte ne signifie pas que toutes les ressources doivent provenir d’un même Origin, mais impose des restrictions dans la communication entre composants lorsque ceux-ci ont des Origins différentes.

### CORS

Il est parfois nécessaire de contourner la SOP (stratégie de sécurité par défaut du navigateur) afin de permettre l’appel de ressources en dehors de l’Origin telles que peuvent en fournir des services web tiers de météo ou d’actualités par exemple. La méthode utilisée dans ce cas est nommée Cross-Origin Resource Sharing. Cette méthode est normalisée et vient en remplacement de plusieurs autres techniques jusqu’alors utilisées mais considérées comme dangereuses et limitées telles que la proxyfication ou l’utilisation de JSON with Padding. Il s’agit de l’interface structurée de programmation pour les documents.

CORS est un standard qui permet la définition explicite d’un contrat entre le serveur web et le navigateur qui spécifie les conditions d’acceptation d’échanges Cross-Origin. La négociation de ce contrat a lieu par l’intermédiaire d’en-têtes HTTP.

### Encodage des réponses XMLHttpRequest

Le contenu d’une réponse de requête XHR doit être formaté par le serveur sous un format de données non exécutable par le client (ex. : JSON). Placer un contenu HTML dans une réponse XMLHttpRequest sous-entend une utilisation de la méthode JavaScript `innerHTML` pour inclure ce fragment dans la page courante. Cette pratique permet l’injection de code JavaScript.

### Choisir une API selon sa méthode HTTP

Il est recommandé de vérifier que le niveau de confidentialité de la donnée manipulée est compatible avec la méthode HTTP proposée par l’API. Dans le cas contraire, il est recommandé de ne pas utiliser l’API proposée et de demander son évolution à son concepteur.

- Utiliser XHR avec la méthode GET sous certaines conditions : La méthode GET véhicule les données des formulaires directement dans l’URL, cette dernière est conservée dans l’historique du navigateur, dans les journaux (logs) des serveurs d’applications, mais aussi dans ceux de tous les proxies d’interception, reverse-proxies ou autres points de terminaison TLS traversés par la requête. En outre, les réponses à ce type de requêtes sont sujettes à la mise en cache par les équipements. L’usage de la méthode GET n’est donc pas adapté à toutes les situations.
- Utiliser XHR avec la méthode POST : Il est recommandé d’utiliser la méthode POST pour
