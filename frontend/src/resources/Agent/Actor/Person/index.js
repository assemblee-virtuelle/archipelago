import PersonList from './PersonList';
import PersonIcon from '@material-ui/icons/Person';

export default {
  config: {
    list: PersonList,
    icon: PersonIcon,
    options: {
      label: 'Personnes',
      parent: 'Actor'
    }
  },
  dataModel: {
    types: ['foaf:Person', 'as:Person'],
    list: {
      servers: '@default',
      forceArray: ['pair:actorOfMembership']
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Personne |||| Personnes',
      fields: {
        'vcard:given-name': 'Prénom',
        'vcard:note': 'En deux mots',
        'vcard:photo': 'Photo',
        'pair:firstName': 'Prénom',
        'pair:lastName': 'Nom de famille',
        'pair:comment': 'En deux mots',
        image: 'Photo',
        'pair:involvedIn': 'Impliqué dans',
        'pair:affiliatedBy': 'Membre de',
        'pair:offers': 'A pour compétences',
        'pair:hasTopic': 'A pour intérêt',
        'pair:hasLocation': 'Adresse'
      }
    }
  }
};
