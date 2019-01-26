import * as IG from './';
// tslint:disable-next-line:no-any
const fetchMock = fetch as any;
const igMediaListMock = [
  {
    caption: 'test',
    comments_count: 3,
    id: '18025572241021954',
    like_count: 86,
    media_type: 'IMAGE',
    media_url: 'media_url',
    permalink: 'permalink'
  },
  {
    caption: '2',
    comments_count: 3,
    id: '2',
    like_count: 86,
    media_type: 'IMAGE',
    media_url: 'media_url',
    permalink: 'permalink'
  },
  {
    caption: '3',
    comments_count: 3,
    id: '3',
    like_count: 86,
    media_type: 'IMAGE',
    media_url: 'media_url',
    permalink: 'permalink'
  }
];

beforeEach(() => {
  fetchMock.resetMocks();
});

test('Fetch Instagram Media object', () => {
  fetchMock.mockResponseOnce(JSON.stringify(igMediaListMock[0]));

  const result = IG.fetchMediaData('url');
  expect(fetchMock.mock.calls.length).toEqual(1);
  result.then(d => {
    expect(d).toEqual({
      caption: 'test',
      comments_count: 3,
      id: '18025572241021954',
      like_count: 86,
      media_type: 'IMAGE',
      media_url: 'media_url',
      permalink: 'permalink'
    });
  });
});
