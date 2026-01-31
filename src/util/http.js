import axios from 'axios';
import {DOMParser} from 'xmldom';
import {createMMKV} from 'react-native-mmkv';
export const localStorage = createMMKV();

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
  let urlToLoad;
  if (
    localStorage.getString('selectedStream') === undefined ||
    localStorage.getString('selectedStream') === 'stream1'
  ) {
    urlToLoad =
      'https://stream.daskoimladja.com/proxy/daskomladja/status-json.xsl';
  } else if (localStorage.getString('selectedStream') === 'stream2') {
    urlToLoad = 'http://stream.daskoimladja.com:8000/status-json.xsl';
  }

  try {
    const response = await axios.get(urlToLoad, {
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    const icestatsResponse = response.data?.icestats?.source;

    const numberOfListeners = Array.isArray(icestatsResponse)
      ? icestatsResponse?.[0]?.listeners
      : icestatsResponse?.listeners;

    return numberOfListeners.toString();
  } catch (error) {
    return '-';
  }
}

export async function fetchNumberOfListenersLive() {
  let urlToLoad;
  if (
    localStorage.getString('selectedStream') === undefined ||
    localStorage.getString('selectedStream') === 'stream1'
  ) {
    urlToLoad =
      'https://stream.daskoimladja.com/proxy/daskomladja/status-json.xsl';
  } else if (localStorage.getString('selectedStream') === 'stream2') {
    urlToLoad = 'http://stream.daskoimladja.com:8000/status-json.xsl';
  }

  try {
    const response = await axios.get(urlToLoad, {
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    const icestatsResponse = response.data?.icestats?.source;

    const numberOfListeners = Array.isArray(icestatsResponse)
      ? icestatsResponse?.[1]?.listeners
      : icestatsResponse?.listeners;

    return numberOfListeners.toString();
  } catch (error) {
    return '-';
  }
}

export async function fetchNumberOfListenersStream() {
  let urlToLoad;
  if (
    localStorage.getString('selectedStream') === undefined ||
    localStorage.getString('selectedStream') === 'stream1'
  ) {
    urlToLoad =
      'https://stream.daskoimladja.com/proxy/daskomladja/status-json.xsl';
  } else if (localStorage.getString('selectedStream') === 'stream2') {
    urlToLoad = 'http://stream.daskoimladja.com:8000/status-json.xsl';
  }

  try {
    const response = await axios.get(urlToLoad, {
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    const icestatsResponse = response.data?.icestats?.source;

    const numberOfListeners = Array.isArray(icestatsResponse)
      ? icestatsResponse?.[2]?.listeners
      : icestatsResponse?.listeners;

    return numberOfListeners.toString();
  } catch (error) {
    return '-';
  }
}
