<template>
  <div>
    <div class="point-rule">
      <section class="point-rule__sec">
        <h4>1、总则</h4>
        <p>光鱼用户成长体系于2017年1月30日正式启用，共包含积分、经验、等级五部分。为保证您的权益最大化，请认真阅读以下内容。</p>
      </section>

      <section class="point-rule__sec">
        <h4>2、积分</h4>
        <p>积分为用户在网站的日常积累。用户通过签到、发布作品、发布帖子等日常操作时获取积分，并在获取网站资源（例如领取优惠券）时消耗积分。</p>
      </section>

      <section class="point-rule__sec">
        <h4>3、经验、等级</h4>
        <p>经验值为用户所有获取的积分总和（消耗积分时不消耗经验），用户等级由经验值决定。</p>
      </section>

      <section class="point-rule__sec">
        <h4>4、积分、经验获取规则</h4>
        <table class="app-table">
          <thead>
            <tr>
              <th>操作</th>
              <th>奖励经验值</th>
              <th>奖励积分</th>
              <th>领取限制</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>签到</td>
              <td>5</td>
              <td>5</td>
              <td>每日限领1次</td>
            </tr>
            <tr>
              <td>完善个人资料</td>
              <td>20</td>
              <td>20</td>
              <td>一次性给予</td>
            </tr>
            <tr>
              <td>发布作品</td>
              <td>20/个</td>
              <td>20/个</td>
              <td>作品通过审核后才可领取，每日上限为5次</td>
            </tr>
            <tr>
              <td>作品加精</td>
              <td>30/个</td>
              <td>30/个</td>
              <td>不限</td>
            </tr>
            <tr>
              <td>回复帖子</td>
              <td>1个</td>
              <td>1个</td>
              <td>每日上限为10次</td>
            </tr>
            <tr>
              <td>发布帖子</td>
              <td>2个</td>
              <td>2个</td>
              <td>每日上限为10次</td>
            </tr>
            <tr>
              <td>帖子加精</td>
              <td>30/个</td>
              <td>30/个</td>
              <td>不限</td>
            </tr>
            <tr>
              <td>邀请注册</td>
              <td>10/个</td>
              <td>10/个</td>
              <td>不限</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="point-rule__sec">
        <h4>5、等级所需经验对照表</h4>
        <table class="app-table app-table--level">
          <tbody>
            <tr>
              <th scope="row">等级</th>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>...</td>
              <td>N</td>
            </tr>
            <tr>
              <th scope="row">所需经验值</th>
              <td>0</td>
              <td>500</td>
              <td>1200</td>
              <td>2100</td>
              <td>3200</td>
              <td>4500</td>
              <td>6000</td>
              <td>7700</td>
              <td>9600</td>
              <td>...</td>
              <td>（N+1）²×100-400</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="point-rule__sec">
        <h4>6、积分、经验记录查询</h4>
        <p>用户的积分、经验记录可在“个人中心”中“我的积分”页面查询，若有积分异动问题可直接联系光鱼客服。</p>
      </section>
    </div>
  </div>
</template>

<script>
/**
 * 积分规则
 *
 * @author yangjun | luminghuai
 * @version 2017-08-25
 */

export default {
  name: 'point-rule',

  created() {
    this.$emit('stop-loading')
  },
}
</script>

<style lang="postcss">
@import "vars.css";

.app-table--level {
  th,
  td {
    border: 1px solid var(--gray-light);
  }

  th {
    width: 11%;
  }

  td {
    width: 7.4%;

    &:last-child {
      width: 15%;
    }
  }
}

.point-rule {
  font-size: 14px;

  &__sec {
    & + section  {
      margin-top: 30px;
    }

    & > h4 {
      margin-bottom: 26px;
    }
  }
}
</style>
