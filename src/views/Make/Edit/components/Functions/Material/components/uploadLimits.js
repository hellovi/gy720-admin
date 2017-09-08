export default {
  logo: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
  },

  map: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    dimension: w => w >= 500,
    dimensionTip: '图片宽度必须大于等于500像素',
  },

  hotspot: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
  },

  wxicon: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    dimension: w => w >= 200,
    dimensionTip: '图片宽度必须大于等于200像素',
  },

  ad: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    dimension: w => w >= 300,
    dimensionTip: '图片宽度必须大于等于300像素',
  },

  thumb: {
    mimeTypes: 'jpg,jpeg,png',
    size: '2MB',
    ratio: [1, 1],
    dimension: (w, h) => w === 200 && h === 200,

    dimensionTip: '图片尺寸必须为200*200像素',
  },

  audio: {
    mimeTypes: 'mp3',
    size: '15MB',
  },

  other: {
    mimeTypes: 'jpg,jpeg,png,mp3',
    size: '15MB',
  },
}
