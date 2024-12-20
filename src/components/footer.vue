<script>
export default {
  name: "footer"
}
</script>

<template>
  <footer>
    <div class="footer">
      <div class="footer_con">
        <div class="footer_dl">
          <dl>
            <dt>
              关于
            </dt>
            <dd>
              <a href="">关于我们</a>
            </dd>
            <dd>
              <a href="">校园地图</a>
            </dd>
            <dd>
              <a href="">档 案 馆</a>
            </dd>
            <dd>
              <a href="">院系设置</a>
            </dd>
          </dl>
          <dl>
            <dt>
              智慧门户
            </dt>
            <dd>
              <a href="">教务系统</a>
            </dd>
            <dd>
              <a href="">信息系统</a>
            </dd>
            <dd>
              <a href="">教师主页</a>
            </dd>
            <dd>
              <a href="">办事大厅</a>
            </dd>
          </dl>
          <dl>
            <dt>
              招生服务
            </dt>
            <dd>
              <a href="">招生信息</a>
            </dd>
            <dd>
              <a href="">就业信息</a>
            </dd>
            <dd>
              <a href="">官方信息</a>
            </dd>
            <dd>
              <a href="">校友总会</a>
            </dd>
          </dl>
          <dl class="footer_dl2" style="width:340px;">
            <dt>
              联系我们
            </dt>
            <dd>
              <img src="../assets/res/images/xinlang.png" alt="官方微博" />
              <a href="https://weibo.com" rel="noFollow" target="_blank">官方微博: http://weibo.com</a>
            </dd>
            <dd>
              <img src="../assets/res/images/mail.png" alt="咨询邮箱" />
              <a href="mailto:@qq.com">咨询邮箱：@qq.cn</a>
            </dd>
            <dd>
              <img src="../assets/res/images/tel.png" alt="咨询电话" />咨询热线：0668-8872988
            </dd>
            <dd>
              <img src="../assets/res/images/weixin.png" alt="信宜市职业技术学校" />微信：信宜市职业技术学校
            </dd>
          </dl>
          <form method="post" action="">
            <dl class="footer_dl3">
              <dt>
                给我们留言
              </dt>
              <dd>
                <input name="name" class="input" type="text" value="称呼（必填）" />
              </dd>
              <dd>
                <input name="tel" class="input" type="text" value="电话（必填）"  />
              </dd>
              <dd>
                <textarea name="content" cols="" rows=""></textarea>
              </dd>
              <dd>
                <input type="image" alt="提交留言" src="../assets/res/images/submit_button.png" />
              </dd>
            </dl>
          </form>
          <div class="clear"></div>
        </div>

      </div>
    </div>
    <div class="bottom">
      <div class="bottom_con">
        @2024 ⼴东易职教信息科技有限公司 版权所有 <a style=" color: #666;" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022101165号-1</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>