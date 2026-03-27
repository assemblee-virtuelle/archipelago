# Calendrier embarquable

## Objectif
Le calendrier embarquable permet de générer une URL ou un code iframe afin d’afficher les événements du site Archipelago sur un autre site.
Les événements peuvent être affichés soit en calendrier, soit en liste.


## Utilisation
Le code iframe peut être intégré dans un site externe.
Il suffit de copier ce code et de l’ajouter dans un fichier HTML ou dans une zone dédiée d’un CMS.
L’URL peut contenir des paramètres permettant de filtrer les événements (par thème, par organisation, ou les deux).


## Fonctionnement général
Lorsque l’iframe est affichée sur un site externe, elle récupère les événements depuis Archipelago.
Les événements peuvent être affichés avec ou sans filtres, selon les paramètres définis dans l’URL.
Cela permet à un site externe d’afficher des événements sans être directement sur le site Archipelago.
Par exemple, une organisation peut afficher uniquement les événements qui la concernent.

## Paramètres URL
L’URL du calendrier accepte plusieurs paramètres permettant de modifier l’affichage et de filtrer les événements.
Ces paramètres peuvent être utilisés séparément ou combinés.

### view
Permet de choisir la vue du calendrier :
- `view=calendar` : affichage en vue calendrier
- `view=list` : affichage en vue liste

### theme
Permet de filtrer les événements par thème.
Exemple :
- `theme=jeunesse` (affiche uniquement les événements liés au thème "jeunesse")

### organization
Permet de filtrer les événements par organisation.
Exemple :
- `organization=organisation-creative` (affiche uniquement les événements de l’organisation "organisation créative")

### Exemples d’URL (en local)
- Vue calendrier avec filtres thème et organisation :

http://localhost:5173/embeddedcalendar?view=calendar&theme=sport&organization=organisation-creative

- Vue liste avec filtre par thème :

http://localhost:5173/embeddedcalendar?view=list&theme=jeunesse

- Vue liste avec filtre par organisation :

http://localhost:5173/embeddedcalendar?view=list&organization=organisation-creative

- Vue calendrier sans filtre :

http://localhost:5173/embeddedcalendar?view=calendar

## Structure générale
- `demo/src/DemoEmbeddedCalendar.tsx`
- `frontend/src/resources/Agent/Event/EmbeddedCalendar.tsx`
- `middleware/services/embeddedcalendar.service.js`

`DemoEmbeddedCalendar.tsx` est l’application de démonstration qui permet de générer une URL ou un code iframe du calendrier, avec ou sans filtres.

`EmbeddedCalendar.tsx` est le composant qui affiche le calendrier des événements. Il lit les paramètres dans l’URL (vue, thème, organisation) et affiche les événements correspondants.

`embeddedcalendar.service.js` est le service backend qui permet de récupérer les événements et d’appliquer les filtres (thème, organisation). Il est utilisé par le frontend pour obtenir les données à afficher.
Le service utilise un endpoint backend pour récupérer les événements :
`GET /api/embeddedcalendar/events`
Cet endpoint renvoie les événements filtrés.

## Intégration dans la fiche organisation
Le composant `frontend/src/resources/Agent/Actor/Organization/OrganizationIntegration.jsx` permet d’afficher un module simplifié de la démonstration directement sur la page d’une organisation.
Cela facilite l’utilisation pour les utilisateurs non techniques, en leur permettant d’obtenir rapidement une vue (calendrier ou liste) personnalisée pour leur organisation, grâce aux boutons suivants :
- afficher un aperçu du calendrier ou de la liste  
- copier le lien  
- copier le code iframe  
L’URL générée contient automatiquement le paramètre `organization`, correspondant à l’organisation affichée.

## Fonctionnement technique

- Le composant `EmbeddedCalendar.tsx` lit les paramètres dans l’URL
- Il appelle le backend pour récupérer les événements
- Le service `embeddedcalendar.service.js` filtre les événements
- Le frontend affiche les résultats (calendrier ou liste)
