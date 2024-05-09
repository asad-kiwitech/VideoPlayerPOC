import { ImageSourcePropType } from "react-native";

export const dummyMovieData = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  rating: 4.5,
  cast: [
    'Keri Russell as Sari',
    'Alden Ehrenreich as Eddie',
    "O'Shea Jackson Jr. as Daveed",
    'Ray Liotta as Syd',
    'Isiah Whitlock Jr. as Bob',
    'Brooklynn Prince as Dee Dee',
    'Christian Convery as Henry',
    'Margo Martindale as Ranger Liz',
    'Jesse Tyler Ferguson as Peter',
    'Kristofer Hivju as Olaf (Kristoffer)',
    'Hannah Hoekstra as Elsa',
    'Ayoola Smart as Officer Reba',
    'Aaron Holliday as Kid (Stache)',
    'J.B. Moore as Vest',
    'Leo Hanna as Ponytail',
    'Kahyun Kim as Beth',
    'Scott Seiss as Tom',
    'Matthew Rhys as Andrew Thornton',
    'Shane Connellan as Ray the Pediatrician',
    'Conor Lambert as Trucker',
    'George Kerslake as Gabe',
    'Allan Henry as Bear Performer',
    'Keith Gallagher as Police Officer (uncredited)',
    'Chloe Harris as Citizen in Police Station (uncredited)',
    'Christopher Livingstone as Detective (uncredited)',
    "Oisín Nolan as Henry's Dad (uncredited)",
  ],
  imdbRating: 8.0,
};

export const moviesListApi = 'https://d34asb5d0oww7f.cloudfront.net/data.json';

export const getMovieLink = (assetId: string, name: string) => {
  return `https://d34asb5d0oww7f.cloudfront.net/assets/${assetId}/HLS/${name}.m3u8`;
};

export const getThumbnailLink = (
  assetId: number,
  name: string,
  duration: string,
) => {
  return `https://d34asb5d0oww7f.cloudfront.net/assets/${assetId}/Thumbnails/${name}.00000${duration}.jpg`;
};
export type preDefinedSpeedTrackType = {
  id: number;
  speed: number;
  name: string;
};
export const preDefinedSpeedTrack = [
  {id: 1, speed: 0.5, name: '0.5x'},
  {id: 1, speed: 1.0, name: '1x'},
  {id: 1, speed: 1.25, name: '1.25x'},
  {id: 1, speed: 1.5, name: '1.5x'},
  {id: 2, speed: 2.0, name: '2x'},
];
export type resolutionType = {
  label: string;
  resolutionValue: {type: string};
  image: ImageSourcePropType;
};