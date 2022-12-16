import ProfileShow from './ProfileShow';
import ProfileEdit from './ProfileEdit';

export default {
  config: {
    show: ProfileShow,
    edit: ProfileEdit
  },
  dataModel: {
    types: ['as:Profile'],
    list: {
      servers: '@default',
      forceArray: ['pair:actorOfMembership']
    },
    fieldsMapping: {
      title: 'vcard:given-name',
      image: 'vcard:photo'
    }
  },
  translations: {
    fr: {
      name: 'Profile |||| Profiles',
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
