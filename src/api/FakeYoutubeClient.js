import axios from 'axios';

export default class FakeYoutubeClient {
  async search({ params }) {
    return params.relatedToVideoId ? axios.get('/videos/related.json') : axios.get('/videos/keyword.json');
  }

  async videos() {
    return axios.get('/videos/trend.json');
  }

  async channels() {
    return axios.get('/videos/channel.json');
  }

  async related() {
    console.log('씨발아');
    return axios.get('/videos/related.json');
  }
}
