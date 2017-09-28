export default {
  logo: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    perPage: 18,
  },

  map: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    dimension: w => w >= 500,
    dimensionTip: '宽度大于等于500像素',
    perPage: 18,
  },

  hotspot: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    perPage: 12,
  },

  wxicon: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    dimension: w => w >= 200,
    dimensionTip: '宽度大于等于200像素',
    perPage: 12,
  },

  sky: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    dimension: w => w >= 300,
    dimensionTip: '宽度大于等于300像素',
    perPage: 12,
  },

  thumb: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    dimension: (w, h) => w === 200 && h === 200,
    dimensionTip: '等于200*200像素',
    perPage: 12,
  },

  rotate: {
    perPage: 12,
  },

  audio: {
    mimeTypes: 'mp3',
    size: '15MB',
    perPage: 24,
  },

  photo: {
    mimeTypes: 'jpg,jpeg,png,gif',
    size: '2MB',
    perPage: 8,
  },

  other: {
    mimeTypes: 'jpg,jpeg,png,mp3',
    size: '15MB',
    perPage: 18,
  },
}
