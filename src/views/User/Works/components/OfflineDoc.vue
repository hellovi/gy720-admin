<template>
  <div class="works-offlinedoc">
    <dl v-for="section in doc" :key="section.title">
      <dt>{{section.title}}</dt>
      <dd
        v-for="(content, index) in section.contents" :key="index"
       >{{`${index + 1}、${content}`}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'works-offline-doc',

  data: () => ({
    doc: [
      {
        title: '离线下载功能说明：',
        contents: [
          '非商业版会员，支持试用3次离线下载功能。',
          '单个作品（99元商业版）支持该作品永久使用离线下载功能。',
          '2299元年费商业版会员，所有作品均可以使用离线下载功能。',
        ],
      },
      {
        title: '离线下载使用说明：',
        contents: [
          '点击“创建离线数据包”，系统开始创建离线数据包。',
          '创建进度为100%时，可以点击“下载离线数据包”进行下载。',
          '如果您在高级编辑中修改过作品的数据，可以点击“重新创建离线数据包”，获取最新的离线数据包。',
        ],
      },
      {
        title: '离线数据包使用说明：',
        contents: [
          '离线数据包可以运行在本地电脑上。Windows系统点击“Windows-Run.exe”文件，Mac OS X 系统 点击“Mac-Run”文件。',
          '离线数据包可以上传到您的网站服务器上使用。',
          '离线数据包功能与线上作品功能会有差异（例如：说一说功能等）。',
        ],
      },
    ],
  }),
}
</script>

<style>
.works-offlinedoc {
  padding: 0 35px;

  &>dl {
    margin-bottom: 40px;

    &>dd {
      margin-left: 30px;
      margin-top: 15px;
    }
  }
}
</style>
