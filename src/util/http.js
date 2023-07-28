import axios from 'axios';
import {DOMParser} from 'xmldom';
import {MMKV} from 'react-native-mmkv';
export const localStorage = new MMKV();

const parser = new DOMParser();

const url = 'https://podcast.daskoimladja.com/feed.xml';

export async function fetchEpisodes() {
  try {
    const response = await axios.get(url, {
      timeout: 30000,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    const podcastXML = parser.parseFromString(response.data);
    const podcastItemsXML = podcastXML.getElementsByTagName('item');
    const episodes = [];

    for (let i = 0; i < podcastItemsXML.length; i++) {
      const episodeObj = {
        title:
          podcastItemsXML[i].getElementsByTagName('title')[0].childNodes[0]
            ?.nodeValue ?? 'Nema datuma',
        artist:
          podcastItemsXML[i].getElementsByTagName('description')[0]
            .childNodes[0]?.nodeValue ?? 'Nema naslova',
        url:
          podcastItemsXML[i]
            .getElementsByTagName('enclosure')[0]
            .getAttribute('url') ?? '',
        duration:
          podcastItemsXML[i].getElementsByTagName('itunes:duration')[0]
            .childNodes[0]?.nodeValue ?? '',
        pubDate:
          podcastItemsXML[i].getElementsByTagName('pubDate')[0].childNodes[0]
            ?.nodeValue ?? 'Nema datuma',
      };

      localStorage.set('title', episodeObj.title);
      localStorage.set('artist', episodeObj.artist);
      localStorage.set('url', episodeObj.url);
      localStorage.set('duration', episodeObj.duration);
      localStorage.set('pubDate', episodeObj.pubDate);

      episodes.push(episodeObj);
    }

    return episodes;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchNumberOfListenersAutodj() {
  try {
    const response = await axios.get(
      'https://stream.daskoimladja.com:9000/autodj.xspf',
      {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    );

    const responseDataArr = response.data.split('\n');
    let numberOfListeners;
    responseDataArr.forEach(element => {
      if (element.includes('Current Listeners: ')) {
        numberOfListeners = element.substring(19, element.length);
      }
    });

    return numberOfListeners;
  } catch (error) {
    return 'nedostupno';
  }
}

export async function fetchNumberOfListenersLive() {
  try {
    const response = await axios.get(
      'https://stream.daskoimladja.com:9000/live.xspf',
      {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    );

    const responseDataArr = response.data.split('\n');
    let numberOfListeners;
    responseDataArr.forEach(element => {
      if (element.includes('Current Listeners: ')) {
        numberOfListeners = element.substring(19, element.length);
      }
    });

    return numberOfListeners;
  } catch (error) {
    return 'nedostupno';
  }
}

export async function fetchNumberOfListenersStream() {
  try {
    const response = await axios.get(
      'https://stream.daskoimladja.com:9000/stream.xspf',
      {
        timeout: 10000,
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    );

    const responseDataArr = response.data.split('\n');
    let numberOfListeners;
    responseDataArr.forEach(element => {
      if (element.includes('Current Listeners: ')) {
        numberOfListeners = element.substring(19, element.length);
      }
    });

    return numberOfListeners;
  } catch (error) {
    return 'nedostupno';
  }
}
