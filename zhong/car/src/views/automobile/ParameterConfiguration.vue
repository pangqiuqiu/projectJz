<template>
  <div>
    <!-- 筛选条件 -->
    <div class="screen w" ref="screening_conditions">
      <h4>筛选条件</h4>
      <div>
        <span>年款：</span>
        <el-radio-group v-model="form.radio1" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in yearList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>燃料：</span>
        <el-radio-group v-model="form.radio2" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in fuelList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>排量：</span>
        <el-radio-group v-model="form.radio3" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in displacementList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>变速箱：</span>
        <el-radio-group v-model="form.radio4" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in transmissionCaseList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>排放标准：</span>
        <el-radio-group v-model="form.radio5" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in emissionStandardList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>车身结构：</span>
        <el-radio-group v-model="form.radio6" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in structureList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
      <div>
        <span>驱动方式：</span>
        <el-radio-group v-model="form.radio7" @change="change1" size="small">
          <el-radio border label="全部" class="all"></el-radio>
          <el-radio border v-for="item in driveWayList" :key="item" :label="item"></el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 查询结果 -->
    <div class="query_results w">
      <div class="left">
        <div style="font-weight: 700;font-size: 16px;">款式</div>
        <div>官方价</div>
        <div>最低报价</div>
        <div>分期方案</div>
        <h5 class="title">基本参数</h5>
        <div>厂商</div>
        <div>级别</div>
        <div>上市时间</div>
        <div>发动机</div>
        <div>进气形式</div>
        <div>最大马力(PS)</div>
        <div>最大扭矩(N/m)</div>
        <div>变速箱</div>
        <div>车身类型</div>
        <div>长x宽x高(mm)</div>
        <div>轴距(mm)</div>
        <div>最高车速(km/h)</div>
        <div>官方0-100km/h加速(s)</div>
        <div>实测0-100km/h加速(s)</div>
        <div>实测100-0km/h制动(m)</div>
        <div>实测油耗(L/100km)</div>
        <div>工信部综合油耗(L/100km)</div>
        <div>整车质保</div>
        <h5 class="title">车身</h5>
        <div>车身类型</div>
        <div>长度(mm)</div>
        <div>宽度(mm)</div>
        <div>高度(mm)</div>
        <div>轴距(mm)</div>
        <div>前轮距(mm)</div>
        <div>后轮距(mm)</div>
        <div>最小离地间隙(mm)</div>
        <div>车重(kg)</div>
        <div>车门数(个)</div>
        <div>座位数(个)</div>
        <div>油箱容积(L)</div>
        <div>行李厢容积(L)</div>
        <div>行李厢最大容积(L)</div>
        <div>行李厢内部尺寸(mm)</div>
        <h5 class="title">发动机</h5>
        <div>发动机型号</div>
        <div>排量(ml)</div>
        <div>进气形式</div>
        <div>最大马力(PS)</div>
        <div>最大功率(kw)</div>
        <div>最大功率转速(rpm)</div>
        <div>最大扭矩(N/m)</div>
        <div>最大扭矩转速(rpm)</div>
        <div>气缸排列形式</div>
        <div>气缸数(个)</div>
        <div>每缸气门数(个)</div>
        <div>压缩比</div>
        <div>配气结构</div>
        <div>缸径(mm)</div>
        <div>行程(mm)</div>
        <div>发动机特有技术</div>
        <div>燃料形式</div>
        <div>燃油标号</div>
        <div>供油方式</div>
        <div>缸盖材料</div>
        <div>缸体材料</div>
        <div>排放标准</div>
        <h5 class="title">变速箱</h5>
        <div>简称</div>
        <div>挡位个数</div>
        <div>变速箱类型</div>
        <h5 class="title">底盘转向</h5>
        <div>驱动方式</div>
        <div>前悬挂类型</div>
        <div>后悬挂类型</div>
        <div>转向助力类型</div>
        <div>车体结构</div>
        <h5 class="title">车轮制动</h5>
        <div>前制动器类型</div>
        <div>后制动器类型</div>
        <div>驱车制动类型</div>
        <div>前轮胎规格</div>
        <div>后轮胎规格</div>
        <div>备胎规格</div>
        <div>备胎尺寸</div>
        <h5 class="title">主动安全配置</h5>
        <div>ABS防抱死</div>
        <div>制动力分配(EBD/CBC等)</div>
        <div>刹车辅助(EBA/BAS/BA等)</div>
        <div>牵引力控制(ASR/TCS/TRC等)</div>
        <div>车身稳定控制(ESP/DSC/ESC等)</div>
        <div>胎压监测装置</div>
        <div>防爆轮胎</div>
        <div>安全带未系提示</div>
        <div>并线辅助</div>
        <div>车道偏离预警系统</div>
        <div>车道保持辅助系统</div>
        <div>主动刹车/主动安全系统</div>
        <div>道路交通标示识别</div>
        <div>疲劳驾驶提示</div>
        <div>夜视系统</div>
        <h5 class="title">被动安全配置</h5>
        <div>前排正面安全气囊</div>
        <div>前/后排侧气囊</div>
        <div>前/后排头部气囊(气帘)</div>
        <div>前排膝部气囊</div>
        <div>行人碰撞防护系统</div>
        <div>ISO FIX儿童座椅接口</div>
        <h5 class="title">防盗配置</h5>
        <div>发动机电子防盗</div>
        <div>车内中控锁</div>
        <div>遥控钥匙</div>
        <div>遥控升降车窗</div>
        <div>远程启动</div>
        <div>无钥匙启动系统</div>
        <div>无钥匙进入系统</div>
        <h5 class="title">驾驶辅助配置</h5>
        <div>巡航系统</div>
        <div>前/后雷达</div>
        <div>泊车影像系统</div>
        <div>车侧盲区影像系统</div>
        <div>倒车动态提醒系统</div>
        <div>驾驶模式切换</div>
        <div>发动机启停技术</div>
        <div>自动泊车入位</div>
        <div>自动驾驶辅助</div>
        <div>上坡辅助</div>
        <div>自动驻车</div>
        <div>陡坡缓降</div>
        <div>可变悬挂</div>
        <div>空气悬挂</div>
        <div>可变转向比</div>
        <div>整体主动转向系统</div>
        <div>前桥限滑差速器/差速锁</div>
        <div>中央差速器锁止功能</div>
        <div>后桥限滑差速器/差速锁</div>
        <h5 class="title">外部配置</h5>
        <div>天窗类型</div>
        <div>天窗尺寸(mm)</div>
        <div>运动外观套件</div>
        <div>铝合金轮毂</div>
        <div>电动吸合门</div>
        <div>电动后备箱</div>
        <div>后备厢感应开启</div>
        <div>电动后备厢位置记忆</div>
        <div>车顶行李架</div>
        <div>主动进气格栅</div>
        <h5 class="title">内部配置</h5>
        <div>方向盘材质</div>
        <div>方向盘调节范围</div>
        <div>方向盘电动调节</div>
        <div>多功能方向盘</div>
        <div>方向盘换挡</div>
        <div>方向盘加热</div>
        <div>方向盘记忆</div>
        <div>行车电脑显示屏功能</div>
        <div>全液晶仪表盘</div>
        <div>液晶仪表盘尺寸</div>
        <div>HUD抬头数字显示</div>
        <div>车载行车记录仪</div>
        <div>手机无线充电</div>
        <h5 class="title">座椅配置</h5>
        <div>座椅材质</div>
        <div>运动风格座椅</div>
        <div>前排座椅高低调节</div>
        <div>前排座垫倾角调节</div>
        <div>前排腰部支撑调节</div>
        <div>前排肩部支撑调节</div>
        <div>主/副驾驶座电动调节</div>
        <div>副驾驶席座椅后排电动可调</div>
        <div>后排座椅调节</div>
        <div>后排座椅电动调节</div>
        <div>电动座椅记忆</div>
        <div>方向盘/座椅舒适进出</div>
        <div>前/后排座椅加热</div>
        <div>前/后排座椅通风</div>
        <div>前/后排座椅按摩</div>
        <div>后排座椅放倒形式</div>
        <div>第三排座椅</div>
        <div>前/后座中央扶手</div>
        <div>后排杯架</div>
        <h5 class="title">空调配置</h5>
        <div>空调调节方式</div>
        <div>温度分区控制</div>
        <div>后排独立空调</div>
        <div>后座出风口</div>
        <div>车内PM2.5过滤装置</div>
        <div>车载空气净化器</div>
        <div>车载冰箱</div>
        <h5 class="title">灯光配置</h5>
        <div>近光灯光源</div>
        <div>远光灯光源</div>
        <div>自适应远近光灯</div>
        <div>日间行车灯</div>
        <div>自动头灯</div>
        <div>转向辅助灯</div>
        <div>随动转向大灯(AFS)</div>
        <div>前雾灯</div>
        <div>前大灯雨雾模式</div>
        <div>大灯高度可调</div>
        <div>大灯清洗装置</div>
        <div>大灯延时关闭</div>
        <div>车内氛围灯</div>
        <h5 class="title">颜色配置</h5>
        <div>车身颜色</div>
        <div>内饰颜色</div>
      </div>
      <div class="right" v-for="(item,index) in configureList" :key="index">
        <div class="items">
          <div>{{item.c}}</div>
          <div>{{item.o.厂商指导价}}</div>
          <div>最低</div>
          <div>分期</div>
          <div class="other"></div>
          <div>{{item.o.厂商}}</div>
          <div>{{item.o.级别}}</div>
          <div>{{item.o.上市时间}}</div>
          <div>{{item.o.发动机}}</div>
          <div>{{item.o.进气形式}}</div>
          <div>{{item.o.最大马力}}</div>
          <div>{{item.o.最大扭矩}}</div>
          <div>{{item.o.变速箱}}</div>
          <div>{{item.o.车身类型}}</div>
          <div>{{item.o.长x宽x高}}</div>
          <div>{{item.o.轴距}}</div>
          <div>{{item.o.最高车速}}</div>
          <div>{{item.o.官方百公里加速}}</div>
          <div>{{item.o.实测百公里加速}}</div>
          <div>{{item.o.实测百公里制动}}</div>
          <div>{{item.o.实测油耗}}</div>
          <div>{{item.o.工信部综合油耗}}</div>
          <div>{{item.o.整车质保}}</div>
          <div class="other"></div>
          <div>{{item.o.车身类型}}</div>
          <div>{{item.o.长度}}</div>
          <div>{{item.o.宽度}}</div>
          <div>{{item.o.高度}}</div>
          <div>{{item.o.轴距}}</div>
          <div>{{item.o.前轮距}}</div>
          <div>{{item.o.后轮距}}</div>
          <div>{{item.o.最小离地间隙}}</div>
          <div>{{item.o.车重}}</div>
          <div>{{item.o.车门数}}</div>
          <div>{{item.o.座位数}}</div>
          <div>{{item.o.油箱容积}}</div>
          <div>{{item.o.行李厢容积}}</div>
          <div>{{item.o.行李厢最大容积}}</div>
          <div>{{item.o.行李厢内部尺寸}}</div>
          <div class="other"></div>
          <div>{{item.o.发动机型号}}</div>
          <div>{{item.o.排量}}</div>
          <div>{{item.o.进气形式}}</div>
          <div>{{item.o.最大马力}}</div>
          <div>{{item.o.最大功率}}</div>
          <div>{{item.o.最大功率转速}}</div>
          <div>{{item.o.最大扭矩}}</div>
          <div>{{item.o.最大扭矩转速}}</div>
          <div>{{item.o.气缸排列形式}}</div>
          <div>{{item.o.气缸数}}</div>
          <div>{{item.o.每缸气门数}}</div>
          <div>{{item.o.压缩比}}</div>
          <div>{{item.o.配气结构}}</div>
          <div>{{item.o.缸径}}</div>
          <div>{{item.o.行程}}</div>
          <div>{{item.o.发动机特有技术}}</div>
          <div>{{item.o.燃料形式}}</div>
          <div>{{item.o.燃油标号}}</div>
          <div>{{item.o.供油方式}}</div>
          <div>{{item.o.缸盖材料}}</div>
          <div>{{item.o.缸体材料}}</div>
          <div>{{item.o.排放标准}}</div>
          <div class="other"></div>
          <div>{{item.o.简称}}</div>
          <div>{{item.o.挡位个数}}</div>
          <div>{{item.o.变速箱类型}}</div>
          <div class="other"></div>
          <div>{{item.o.驱动方式}}</div>
          <div>{{item.o.前悬挂类型}}</div>
          <div>{{item.o.后悬挂类型}}</div>
          <div>{{item.o.转向助力类型}}</div>
          <div>{{item.o.车体结构}}</div>
          <div class="other"></div>
          <div>{{item.o.前制动器类型}}</div>
          <div>{{item.o.后制动器类型}}</div>
          <div>{{item.o.驱动制动类型}}</div>
          <div>{{item.o.前轮胎规格}}</div>
          <div>{{item.o.后轮胎规格}}</div>
          <div>{{item.o.备胎规格}}</div>
          <div>{{item.o.备胎尺寸}}</div>
          <div class="other"></div>
          <div>{{item.op.ABS防抱死}}</div>
          <div>{{item.op.制动力分配}}</div>
          <div>{{item.op.刹车辅助}}</div>
          <div>{{item.op.牵引力控制}}</div>
          <div>{{item.op.车身稳定控制}}</div>
          <div>{{item.op.胎压监测装置}}</div>
          <div>{{item.op.防爆轮胎}}</div>
          <div>{{item.op.安全带未系提示}}</div>
          <div>{{item.op.并线辅助}}</div>
          <div>{{item.op.车道偏离预警系统}}</div>
          <div>{{item.op.车道保持辅助系统}}</div>
          <div></div>
          <div>{{item.op.道路交通标示识别}}</div>
          <div>{{item.op.疲劳驾驶提示}}</div>
          <div>{{item.op.夜视系统}}</div>
          <div class="other"></div>
          <div>{{item.op.前排正面安全气囊}}</div>
          <div>{{item.op.前后排侧气塞}}</div>
          <div>{{item.op.前后排头部气囊}}</div>
          <div>{{item.op.前排膝部气囊}}</div>
          <div>{{item.op.行人碰撞防护系统}}</div>
          <div>{{item.op.ISOFIX儿童座椅接口}}</div>
          <div class="other"></div>
          <div>{{item.op.发动机电子防盗}}</div>
          <div>{{item.op.车内中控锁}}</div>
          <div>{{item.op.遥控钥匙}}</div>
          <div>{{item.op.遥控升降车窗}}</div>
          <div>{{item.op.远程启动}}</div>
          <div>{{item.op.无钥匙启动系统}}</div>
          <div>{{item.op.无钥匙进入系统}}</div>
          <div class="other"></div>
          <div>{{item.op.巡航系统}}</div>
          <div>{{item.op.前后雷达}}</div>
          <div>{{item.op.泊车影像系统}}</div>
          <div>{{item.op.车侧盲区影像系统}}</div>
          <div>{{item.op.倒车动态提醒系统}}</div>
          <div>{{item.op.驾驶模式切换}}</div>
          <div>{{item.op.发动机启停技术}}</div>
          <div>{{item.op.自动泊车入位}}</div>
          <div>{{item.op.自动驾驶辅助}}</div>
          <div>{{item.op.上坡辅助}}</div>
          <div>{{item.op.自动驻车}}</div>
          <div>{{item.op.陡坡缓降}}</div>
          <div>{{item.op.可变悬挂}}</div>
          <div>{{item.op.空气悬挂}}</div>
          <div>{{item.op.可变转向比}}</div>
          <div>{{item.op.整体主动转向系统}}</div>
          <div>{{item.op.前桥限滑差速器差速锁}}</div>
          <div>{{item.op.中央差速器锁止功能}}</div>
          <div>{{item.op.后桥限滑差速器差速锁}}</div>
          <div class="other"></div>
          <div>{{item.op.天窗类型}}</div>
          <div>{{item.op.天窗尺寸}}</div>
          <div>{{item.op.运动外观套件}}</div>
          <div>{{item.op.铝合金轮毂}}</div>
          <div>{{item.op.电动吸合门}}</div>
          <div>{{item.op.电动后备箱}}</div>
          <div>{{item.op.后备厢感应开启}}</div>
          <div>{{item.op.电动后备厢位置记忆}}</div>
          <div>{{item.op.车顶行李架}}</div>
          <div>{{item.op.主动进气格栅}}</div>
          <div class="other"></div>
          <div>{{item.op.方向盘材质}}</div>
          <div>{{item.op.方向盘调节范围}}</div>
          <div>{{item.op.方向盘电动调节}}</div>
          <div>{{item.op.多功能方向盘}}</div>
          <div>{{item.op.方向盘换挡}}</div>
          <div>{{item.op.方向盘加热}}</div>
          <div>{{item.op.方向盘记忆}}</div>
          <div>{{item.op.行车电脑显示屏功能}}</div>
          <div>{{item.op.全液晶仪表盘}}</div>
          <div>{{item.op.液晶仪表盘尺寸}}</div>
          <div>{{item.op.HUD抬头数字显示}}</div>
          <div>{{item.op.车载行车记录仪}}</div>
          <div>{{item.op.手机无线充电}}</div>
          <div class="other"></div>
          <div>{{item.op.座椅材质}}</div>
          <div>{{item.op.运动风格座椅}}</div>
          <div>{{item.op.前排座椅高低调节}}</div>
          <div>{{item.op.前排座垫倾角调节}}</div>
          <div>{{item.op.前排腰部支撑调节}}</div>
          <div>{{item.op.前排肩部支撑调节}}</div>
          <div>{{item.op.主副驾驶座电动调节}}</div>
          <div>{{item.op.副驾驶席座椅后排电动可调}}</div>
          <div>{{item.op.后排座椅调节}}</div>
          <div>{{item.op.后排座椅电动调节}}</div>
          <div>{{item.op.电动座椅记忆}}</div>
          <div>{{item.op.方向盘座椅舒适进出}}</div>
          <div>{{item.op.前后排座椅加热}}</div>
          <div>{{item.op.前后排座椅通风}}</div>
          <div>{{item.op.前后排座椅按摩}}</div>
          <div>{{item.op.后排座椅放倒形式}}</div>
          <div>{{item.op.第三排座椅}}</div>
          <div>{{item.op.前后座中央扶手}}</div>
          <div>{{item.op.后排杯架}}</div>
          <div class="other"></div>
          <div>{{item.op.空调调节方式}}</div>
          <div>{{item.op.温度分区控制}}</div>
          <div>{{item.op.后排独立空调}}</div>
          <div>{{item.op.后座出风口}}</div>
          <div>{{item.op.车内PM过滤装置}}</div>
          <div>{{item.op.车载空气净化器}}</div>
          <div>{{item.op.车载冰箱}}</div>
          <div class="other"></div>
          <div>{{item.op.近光灯光源}}</div>
          <div>{{item.op.远光灯光源}}</div>
          <div>{{item.op.自适应远近光灯}}</div>
          <div>{{item.op.日间行车灯}}</div>
          <div>{{item.op.自动头灯}}</div>
          <div>{{item.op.转向辅助灯}}</div>
          <div>{{item.op.随动转向大灯}}</div>
          <div>{{item.op.前雾灯}}</div>
          <div>{{item.op.前大灯雨雾模式}}</div>
          <div>{{item.op.大灯高度可调}}</div>
          <div>{{item.op.大灯清洗装置}}</div>
          <div>{{item.op.大灯延时关闭}}</div>
          <div>{{item.op.车内氛围灯}}</div>
          <div class="other"></div>
          <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.color}}</div>
          <div>{{item.innercolor}}</div>
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
const series = window.sessionStorage.getItem('carDetails')
export default {
  data () {
    return {
      // 车身结构
      structureList: [],
      // 排放标准
      emissionStandardList: [],
      // 驱动方式
      driveWayList: [],
      // 排量
      displacementList: [],
      // 燃料
      fuelList: [],
      // 变速箱
      transmissionCaseList: [],
      // 年代
      yearList: [],
      // 参数配置
      configureList: [],
      form: {
        radio1: '全部', // 年代
        radio2: '全部', // 燃料
        radio3: '全部', // 排量
        radio4: '全部', // 变速箱
        radio5: '全部', // 排放标准
        radio6: '全部', // 车身结构
        radio7: '全部' // 驱动方式
      }
    }
  },
  methods: {
    // 车身结构
    async getStructure () {
      const { data: res } = await this.$http.post(`/car/getCCarType`, {
        series: series
      })
      // console.log(res)
      this.structureList = res
    },
    // 排量
    async getDisplacement () {
      const { data: res } = await this.$http.post(`/car/getCEngine`, {
        series: series
      })
      // console.log(res)
      this.displacementList = res
    },
    // 驱动方式
    async getDriveWay () {
      const { data: res } = await this.$http.post(`/car/getCDriveWay`, {
        series: series
      })
      // console.log(res)
      this.driveWayList = res
    },
    // 排放标准
    async getEmissionStandard () {
      const { data: res } = await this.$http.post(`/car/getCDischarge`, {
        series: series
      })
      // console.log(res)
      this.emissionStandardList = res
    },
    // 燃料
    async getFuel () {
      const { data: res } = await this.$http.post(`/car/getCEnergy`, {
        series: series
      })
      // console.log(res)
      this.fuelList = res
    },
    // 变速箱
    async getTransmissionCase () {
      const { data: res } = await this.$http.post(`/car/getCGearBox`, {
        series: series
      })
      // console.log(res)
      this.transmissionCaseList = res
    },
    // 年代
    async getYear () {
      const { data: res } = await this.$http.post(`/car/getCYear`, {
        series: series
      })
      this.yearList = res
    },
    // 参数配置
    async getConfigureList () {
      const { data: res } = await this.$http.post(`/car/getCarConfig2`, {
        series: series,
        years: this.form.radio1,
        engine: this.form.radio3,
        gearBox: this.form.radio4,
        energy: this.form.radio2,
        driveWay: this.form.radio7,
        discharge: this.form.radio5,
        carBody: this.form.radio6
      })
      this.configureList = res
    },
    // 当单选框发生变化时，调用初始化函数
    change1 () {
      // console.log(this.form)
      this.getConfigureList()
    },
    change2 () {
      // console.log(this.form)
      this.getConfigureList()
    },
    change3 () {
      // console.log(this.form)
      this.getConfigureList()
    },
    change4 () {
      // console.log(this.form)
      this.getConfigureList()
    },
    change5 () {
      // console.log(this.form)
      this.getConfigureList()
    },
    change6 () {
      // console.log(this.form)
      this.getConfigureList()
    },
    change7 () {
      // console.log(this.form)
      this.getConfigureList()
    }
  },
  created () {
    // 获取汽车配置数据
    this.getConfigureList()
    // 车身结构
    this.getStructure()
    // 排量
    this.getDisplacement()
    // 驱动方式
    this.getDriveWay()
    // 排放标准
    this.getEmissionStandard()
    // 燃料
    this.getFuel()
    // 变速箱
    this.getTransmissionCase()
    // 年代
    this.getYear()
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 1200px;
  margin: 0 auto;
}
// 筛选条件
.screen {
  margin-top: 30px;
  border-bottom: 1px #ccc solid;
  h4 {
    padding-left: 20px;
    background-color: #E9E9E9;
    color: #333;
    height: 40px;
    line-height: 40px;
  }
  >div {
    padding-left: 10px;
    border: 1px solid #ccc;
    border-bottom: 0;
    span {
      display: inline-block;
      width: 80px;
    }
  }
  .el-radio {
    margin: 6px;
  }
}
// 查询结果
.query_results {
  display: flex;
  justify-content: flex-start;
  .left {
    div {
      background-color: #E9E9E9;
      box-sizing: border-box;
      padding-right: 10px;
      height: 40px;
      line-height: 40px;
      color: #333;
      border: 1px solid #cccccc;
      border-bottom: 0;
      text-align: right;
      font-size: 12px;
      width: 200px;
    }
    h5 {
      box-sizing: border-box;
      padding-left: 10px;
      border: 1px solid #cccccc;
      border-bottom: 0;
      color: #FF6B09;
      text-align: left;
      height: 40px;
      line-height: 40px;
      font-weight: 700;
    }
  }
  .right {
    border-bottom: 1px solid #cccccc;
    margin-bottom: 20px;
    .items {
      float: left;
      >div {
        box-sizing: border-box;
        border-top: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
        height: 40px;
        line-height: 40px;
        width: 400px;
        font-size: 12px;
        text-align: center;
      }
      .other {
        background-color: #E9E9E9;
      }
    }
  }
}
</style>
