function searchToLatLong(query) {

  return Promise.resolve({
    search_query: query,
    formatted_query: 'Lynnwood, WA, USA',
    latitude: 47.8209301,
    longitude: -122.3151314
  });

}
