import { djPlaceholder, type Img } from './images';

export interface DjService {
  id: string;
  title: string;
  description: string;
  image: Img;
  eventType: string;
}

/** DJ service cards. Descriptions avoid claims about equipment or experience — edit to add confirmed details. */
export const djServices: DjService[] = [
  {
    id: 'punjabi-wedding-dj',
    title: 'Punjabi Wedding DJ',
    description: 'Punjabi beats and energetic mixes for your wedding celebrations.',
    image: djPlaceholder('wedding', 1),
    eventType: 'Punjabi Wedding',
  },
  {
    id: 'reception-dj',
    title: 'Wedding Reception DJ',
    description: 'The right soundtrack for your reception, from entrance to the last dance.',
    image: djPlaceholder('dancefloor', 1),
    eventType: 'Wedding Reception',
  },
  {
    id: 'jaago-dj',
    title: 'Jaago Night DJ',
    description: 'Lively music to keep your Jaago night full of energy and dancing.',
    image: djPlaceholder('atmosphere', 1),
    eventType: 'Jaago Night',
  },
  {
    id: 'sangeet-dj',
    title: 'Sangeet Night DJ',
    description: 'Music for performances, family dances and a joyful Sangeet night.',
    image: djPlaceholder('performance', 1),
    eventType: 'Sangeet Night',
  },
  {
    id: 'birthday-dj',
    title: 'Birthday Party DJ',
    description: 'Music chosen around your guests, from kids’ parties to milestone birthdays.',
    image: djPlaceholder('setup', 1),
    eventType: 'Birthday Party',
  },
  {
    id: 'private-dj',
    title: 'Private Event DJ',
    description: 'Custom music for private parties, anniversaries and get-togethers.',
    image: djPlaceholder('atmosphere', 2),
    eventType: 'Private Party',
  },
  {
    id: 'corporate-dj',
    title: 'Corporate Event DJ',
    description: 'Entertainment and music tailored to your corporate event.',
    image: djPlaceholder('setup', 2),
    eventType: 'Corporate Event',
  },
];

export const musicCategories = [
  { title: 'Punjabi', note: 'The heartbeat of Punjabi celebrations.' },
  { title: 'Bollywood', note: 'Favourites to get every generation dancing.' },
  { title: 'Bhangra', note: 'High-energy tracks for the dance floor.' },
  { title: 'Hip-hop', note: 'Crowd-pleasing beats and club classics.' },
  { title: 'International hits', note: 'Global chart tracks and party anthems.' },
  { title: 'Commercial', note: 'Popular music for a mixed crowd.' },
  { title: 'Custom playlists', note: 'Tell us your must-play and do-not-play songs.' },
];

export interface DjMix {
  title: string;
  /** Link to YOUR OWN mix (SoundCloud, YouTube, Mixcloud...). Opens in a new tab — nothing is embedded. */
  url: string;
  platform?: string;
}

/**
 * Add your own mixes here, e.g.
 * { title: 'Wedding Mix Vol. 1', url: 'https://soundcloud.com/your-account/your-mix', platform: 'SoundCloud' }
 * Only link to music you own or have permission to share.
 */
export const djMixes: DjMix[] = [];
