export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#trend();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: 'snippet', id } })
      .then(res => res.data.items[0].snippet.thumbnails.default.url);
  }

  async related(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          relatedToVideoId: id,
          type: 'video',
        },
      })
      .then(res => res.data.items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 24,
          type: 'video',
          q: keyword,
        },
      })
      .then(res => res.data.items.map(item => ({ ...item, id: item.id.videoId })));
  }

  async #trend() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 24,
          chart: 'mostPopular',
        },
      })
      .then(res => res.data.items);
  }
}
