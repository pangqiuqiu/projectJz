<template>
  <div>
    <!-- 新增品牌 -->
    <div class="top" v-show="this.radio === 1 || this.radio === '1'">
      <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
      <el-input v-model="form.series" placeholder="请输入车系"></el-input>
      <el-input v-model="form.type" placeholder="请输入车型"></el-input>
    </div>
    <!-- 新增车系 -->
    <div class="top" v-show="this.radio === 2 || this.radio === '2'">
      <el-select filterable v-model="form.brand" placeholder="请选择品牌">
        <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input v-model="form.series" placeholder="请输入车系"></el-input>
      <el-input v-model="form.type" placeholder="请输入车型"></el-input>
    </div>
    <!-- 新增车型 -->
    <div class="top" v-show="this.radio === 3 || this.radio === '3'">
      <el-select filterable @change="changeBrand" v-model="form.brand" placeholder="请选择品牌">
        <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select filterable @visible-change="drop($event)" v-model="form.series" placeholder="请选择车系">
        <el-option v-for="item in seriesList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input v-model="form.type" placeholder="请输入车型"></el-input>
    </div>
    <!-- 参数 -->
    <div class="main">
      <div>
        <span>官方价</span>
        <el-input v-model="form.guidePrice" placeholder="请输入内容"></el-input>万
      </div>
      <h5 class="title">基本参数</h5>
      <div>
        <span>厂商</span>
        <el-input v-model="form.cs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>级别</span>
        <el-input v-model="form.level" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>上市时间</span>
        <el-input v-model="form.year" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>发动机</span>
        <el-input v-model="form.fdj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>发动机型号</span>
        <el-input v-model="form.fdjxh" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>进气形式</span>
        <el-input v-model="form.jqxs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最大马力(PS)</span>
        <el-input v-model="form.zdml" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最大扭矩(N/m)</span>
        <el-input v-model="form.zdnj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>变速箱</span>
        <el-input v-model="form.bsx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车身类型</span>
        <el-input v-model="form.carType" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>长x宽x高(mm)</span>
        <el-input v-model="form.ckg" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>轴距(mm)</span>
        <el-input v-model="form.zj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最高车速(km/h)</span>
        <el-input v-model="form.zgss" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>官方0-100km/h加速(s)</span>
        <el-input v-model="form.gfjs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>实测0-100km/h加速(s)</span>
        <el-input v-model="form.scjs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>实测100-0km/h制动(m)</span>
        <el-input v-model="form.sczd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>实测油耗(L/100km)</span>
        <el-input v-model="form.scyh" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>工信部综合油耗(L/100km)</span>
        <el-input v-model="form.xgbzhyh" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>整车质保</span>
        <el-input v-model="form.zczb" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>能源类型</span>
        <el-input v-model="form.nylx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>工信部纯电续驶里程(km)</span>
        <el-input v-model="form.gxbcdxslc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>快充时间(小时)</span>
        <el-input v-model="form.kcsj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>慢充时间(小时)</span>
        <el-input v-model="form.mcsj" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">电动机</h5>
      <div>
        <span>电机类型</span>
        <el-input v-model="form.djlx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电动机总功率(kW)</span>
        <el-input v-model="form.ddjzgl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电动机总扭矩(N·m)</span>
        <el-input v-model="form.ddjznj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前电动机最大功率(kW)</span>
        <el-input v-model="form.qddjzdgl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前电动机最大扭矩(N·m)</span>
        <el-input v-model="form.qddjzdnj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后电动机最大功率(kW)</span>
        <el-input v-model="form.hddjzdgl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后电动机最大扭矩(N·m)</span>
        <el-input v-model="form.hddjzdnj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>系统综合功率(kW)</span>
        <el-input v-model="form.xtzhgl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>系统综合扭矩(N·m)</span>
        <el-input v-model="form.xtzhnj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>驱动电机数</span>
        <el-input v-model="form.qddjs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电机布局</span>
        <el-input v-model="form.djbj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电池类型</span>
        <el-input v-model="form.dclx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>工信部续航里程(km)</span>
        <el-input v-model="form.gxbxhlc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电池容量(kWh)</span>
        <el-input v-model="form.dcrl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>百公里耗电量(kWh/100km)</span>
        <el-input v-model="form.bglhdl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电池组质保</span>
        <el-input v-model="form.dczzb" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>快充时间(小时)</span>
        <el-input v-model="form.kcsj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>慢充时间(小时)</span>
        <el-input v-model="form.mcsj" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">车身</h5>
      <div>
        <span>车身类型</span>
        <el-input v-model="form.carType" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>长度(mm)</span>
        <el-input v-model="form.cd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>宽度(mm)</span>
        <el-input v-model="form.kd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>高度(mm)</span>
        <el-input v-model="form.gd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>轴距(mm)</span>
        <el-input v-model="form.zj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前轮距(mm)</span>
        <el-input v-model="form.qlj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后轮距(mm)</span>
        <el-input v-model="form.hlj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最小离地间隙(mm)</span>
        <el-input v-model="form.zxldjx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车重(kg)</span>
        <el-input v-model="form.zbzl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车门数(个)</span>
        <el-input v-model="form.cms" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>座位数(个)</span>
        <el-input v-model="form.zws" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>油箱容积(L)</span>
        <el-input v-model="form.yxrj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>行李厢容积(L)</span>
        <el-input v-model="form.xlxrj" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">发动机</h5>
      <div>
        <span>发动机型号</span>
        <el-input v-model="form.fdjxh" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>排量(ml)</span>
        <el-input v-model="form.engine" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>进气形式</span>
        <el-input v-model="form.jqxs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最大马力(PS)</span>
        <el-input v-model="form.zdml" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最大功率(kw)</span>
        <el-input v-model="form.zdgl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最大功率转速(rpm)</span>
        <el-input v-model="form.zdglzs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最大扭矩(N/m)</span>
        <el-input v-model="form.zdnj" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>最大扭矩转速(rpm)</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>气缸排列形式</span>
        <el-input v-model="form.qgplxs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>气缸数(个)</span>
        <el-input v-model="form.qgs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>每缸气门数(个)</span>
        <el-input v-model="form.mgqms" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>压缩比</span>
        <el-input v-model="form.ysb" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>配气结构</span>
        <el-input v-model="form.pqjg" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>缸径(mm)</span>
        <el-input v-model="form.gj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>行程(mm)</span>
        <el-input v-model="form.xc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>发动机特有技术</span>
        <el-input v-model="form.fdjtyjs" placeholder="请输入内容"></el-input></div>
      <div>
        <span>燃料形式</span>
        <el-input v-model="form.rlxs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>燃油标号</span>
        <el-input v-model="form.rybh" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>供油方式</span>
        <el-input v-model="form.gyfs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>缸盖材料</span>
        <el-input v-model="form.ggcl" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>缸体材料</span>
        <el-input v-model="form.gtcl" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>排放标准</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <h5 class="title">变速箱</h5>
      <div>
        <span>简称</span>
        <el-input v-model="form.jc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>挡位个数</span>
        <el-input v-model="form.gwgs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>变速箱类型</span>
        <el-input v-model="form.bsxlx" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">底盘转向</h5>
      <div>
        <span>驱动方式</span>
        <el-input v-model="form.qdfs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前悬挂类型</span>
        <el-input v-model="form.qxjlx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后悬挂类型</span>
        <el-input v-model="form.hxjlx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>转向助力类型</span>
        <el-input v-model="form.zllx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车体结构</span>
        <el-input v-model="form.ctjg" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">车轮制动</h5>
      <div>
        <span>前制动器类型</span>
        <el-input v-model="form.qzdqlx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后制动器类型</span>
        <el-input v-model="form.hzdqlx" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>驱车制动类型</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>前轮胎规格</span>
        <el-input v-model="form.qltgg" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后轮胎规格</span>
        <el-input v-model="form.hltgg" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>备胎规格</span>
        <el-input v-model="form.btgg" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>备胎尺寸</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <h5 class="title">主动安全配置</h5>
      <div>
        <span>ABS防抱死</span>
        <el-input v-model="form.ABSfbs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>制动力分配(EBD/CBC等)</span>
        <el-input v-model="form.zdlfb" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>刹车辅助(EBA/BAS/BA等)</span>
        <el-input v-model="form.scfz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>牵引力控制(ASR/TCS/TRC等)</span>
        <el-input v-model="form.qylkz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车身稳定控制(ESP/DSC/ESC等)</span>
        <el-input v-model="form.cswdkz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>胎压监测装置</span>
        <el-input v-model="form.tyjczz" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>防爆轮胎</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>安全带未系提示</span>
        <el-input v-model="form.aqdwxts" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>并线辅助</span>
        <el-input v-model="form.bxfz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车道偏离预警系统</span>
        <el-input v-model="form.cdplyjxt" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>车道保持辅助系统</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>主动刹车/主动安全系统</span>
        <el-input v-model="form.zdsczdaqxt" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>道路交通标示识别</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <!-- <div>
        <span>疲劳驾驶提示</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>夜视系统</span>
        <el-input v-model="form.ysxt" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">被动安全配置</h5>
      <!-- <div>
        <span>前排正面安全气囊</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>前/后排侧气囊</span>
        <el-input v-model="form.qhpcqn" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前/后排头部气囊(气帘)</span>
        <el-input v-model="form.qhptbqnql" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前排膝部气囊</span>
        <el-input v-model="form.xbqn" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>行人碰撞防护系统</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>ISO FIX儿童座椅接口</span>
        <el-input v-model="form.ISOFIXetzyjk" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">防盗配置</h5>
      <div>
        <span>发动机电子防盗</span>
        <el-input v-model="form.fdjdzfd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>车内中控锁</span>
        <el-input v-model="form.cnzks" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>遥控钥匙</span>
        <el-input v-model="form.ykys" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>遥控升降车窗</span>
        <el-input v-model="form.qhddcc" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>远程启动</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>无钥匙启动系统</span>
        <el-input v-model="form.wysqdxt" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>无钥匙进入系统</span>
        <el-input v-model="form.wysjrxt" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">驾驶辅助配置</h5>
      <!-- <div>
        <span>巡航系统</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>前/后雷达</span>
        <el-input v-model="form.qhzcld" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>泊车影像系统</span>
        <el-input v-model="form.dcspyx" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>车侧盲区影像系统</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <!-- <div>
        <span>倒车动态提醒系统</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <!-- <div>
        <span>驾驶模式切换</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>发动机启停技术</span>
        <el-input v-model="form.fdjqtjs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>自动泊车入位</span>
        <el-input v-model="form.zdbcrw" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>自动驾驶辅助</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>上坡辅助</span>
        <el-input v-model="form.spfz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>自动驻车</span>
        <el-input v-model="form.zdzc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>陡坡缓降</span>
        <el-input v-model="form.dphj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>可变悬架</span>
        <el-input v-model="form.kbxj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>空气悬架</span>
        <el-input v-model="form.kqxj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>可变转向比</span>
        <el-input v-model="form.kbzxb" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>整体主动转向系统</span>
        <el-input v-model="form.ztzdzxxt" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前桥限滑差速器/差速锁</span>
        <el-input v-model="form.qqxhcsqcss" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>中央差速器锁止功能</span>
        <el-input v-model="form.zycsqszgn" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后桥限滑差速器/差速锁</span>
        <el-input v-model="form.hqxhcsqcss" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">外部配置</h5>
      <!-- <div>
        <span>天窗类型</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <!-- <div>
        <span>天窗尺寸(mm)</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>运动外观套件</span>
        <el-input v-model="form.ydwgtj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>铝合金轮毂</span>
        <el-input v-model="form.lhjlq" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电动吸合门</span>
        <el-input v-model="form.ddxhm" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电动后备箱</span>
        <el-input v-model="form.ddhbx" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后备厢感应开启</span>
        <el-input v-model="form.gyhbx" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>电动后备厢位置记忆</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>车顶行李架</span>
        <el-input v-model="form.cdxlj" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>主动进气格栅</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <h5 class="title">内部配置</h5>
      <div>
        <span>方向盘材质</span>
        <el-input v-model="form.fxpcz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>方向盘调节范围</span>
        <el-input v-model="form.fxptj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>方向盘电动调节</span>
        <el-input v-model="form.fxpddtj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>多功能方向盘</span>
        <el-input v-model="form.dgnfxp" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>方向盘换挡</span>
        <el-input v-model="form.fxphd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>方向盘加热</span>
        <el-input v-model="form.fxpjr" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>方向盘记忆</span>
        <el-input v-model="form.fxpjy" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>行车电脑显示屏功能</span>
        <el-input v-model="form.xcdnxsp" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>全液晶仪表盘</span>
        <el-input v-model="form.qyjybp" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>液晶仪表盘尺寸</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>HUD抬头数字显示</span>
        <el-input v-model="form.HUDttszxs" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>车载行车记录仪</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <!-- <div>
        <span>手机无线充电</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <h5 class="title">座椅配置</h5>
      <div>
        <span>座椅材质</span>
        <el-input v-model="form.zycz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>运动风格座椅</span>
        <el-input v-model="form.ydfgzy" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>前排座椅高低调节</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前排座垫倾角调节</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前排腰部支撑调节</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前排肩部支撑调节</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>主/副驾驶座电动调节</span>
        <el-input v-model="form.zfjsddtj" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>副驾驶席座椅后排电动可调</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后排座椅调节</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>后排座椅电动调节</span>
        <el-input v-model="form.hpzyddtj" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电动座椅记忆</span>
        <el-input v-model="form.ddzyjy" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>方向盘/座椅舒适进出</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>前/后排座椅加热</span>
        <el-input v-model="form.qhpzyjr" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前/后排座椅通风</span>
        <el-input v-model="form.qhpzytf" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前/后排座椅按摩</span>
        <el-input v-model="form.qhpzyam" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后排座椅放倒形式</span>
        <el-input v-model="form.hpzyfdfs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>第三排座椅</span>
        <el-input v-model="form.dspzy" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前/后座中央扶手</span>
        <el-input v-model="form.qhzyfs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后排杯架</span>
        <el-input v-model="form.hpbj" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">空调配置</h5>
      <div>
        <span>空调调节方式</span>
        <el-input v-model="form.ktkzfs" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>温度分区控制</span>
        <el-input v-model="form.wdfqkz" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后排独立空调</span>
        <el-input v-model="form.hpdlkt" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>后座出风口</span>
        <el-input v-model="form.hzcfk" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>车内PM2.5过滤装置</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <!-- <div>
        <span>车载空气净化器</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>车载冰箱</span>
        <el-input v-model="form.czbx" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">灯光配置</h5>
      <div>
        <span>近光灯光源</span>
        <el-input v-model="form.jgd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>远光灯光源</span>
        <el-input v-model="form.ygd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>自适应远近光灯</span>
        <el-input v-model="form.zsyyjg" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>日间行车灯</span>
        <el-input v-model="form.rjxcd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>自动头灯</span>
        <el-input v-model="form.zddt" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>转向辅助灯</span>
        <el-input v-model="form.zxfzd" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>随动转向大灯(AFS)</span>
        <el-input v-model="form.AFS" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>前雾灯</span>
        <el-input v-model="form.qwd" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>前大灯雨雾模式</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>大灯高度可调</span>
        <el-input v-model="form.ddldkt" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>大灯清洗装置</span>
        <el-input v-model="form.ddqxzz" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div>
        <span>大灯延时关闭</span>
        <el-input v-model="form" placeholder="请输入内容"></el-input>
      </div> -->
      <div>
        <span>车内氛围灯</span>
        <el-input v-model="form.cnfwd" placeholder="请输入内容"></el-input>
      </div>
      <h5 class="title">颜色配置</h5>
      <div class="col">
        <span>车身颜色</span>
        <div>
          <el-input v-for="(item,index) in colorList1" :key="index" v-model="colorList1[index]" placeholder="请输入内容" style="width: 300px"></el-input>
          <el-button @click="addList1">增加</el-button>
        </div>
      </div>
      <div class="col">
        <span>内饰颜色</span>
        <div>
          <el-input v-for="(item,index) in colorList2" :key="index" v-model="colorList2[index]" placeholder="请输入内容" style="width: 300px"></el-input>
          <el-button @click="addList2">增加</el-button>
        </div>
      </div>
    </div>
    <div class="btn">
      <el-button type="success" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 车型
      radio: '',
      brandList: [],
      seriesList: [],
      form: {
        radio: '',
        brand: '',
        series: '',
        type: '',
        zdbj: '',
        xszt: '',
        cxmc: '',
        year: '',
        guidePrice: '',
        engine: '',
        cs: '',
        level: '',
        fdj: '',
        bsx: '',
        ckg: '',
        carType: '',
        zgss: '',
        gfjs: '',
        scjs: '',
        sczd: '',
        scyh: '',
        xgbzhyh: '',
        scldjx: '',
        fxpcz: '',
        zczb: '',
        nylx: '',
        gxbcdxslc: '',
        kcsj: '',
        mcsj: '',
        djlx: '',
        ddjzgl: '',
        ddjznj: '',
        qddjzdgl: '',
        qddjzdnj: '',
        hddjzdgl: '',
        hddjzdnj: '',
        xtzhgl: '',
        xtzhnj: '',
        qddjs: '',
        djbj: '',
        dclx: '',
        gxbxhlc: '',
        dcrl: '',
        bglhdl: '',
        dczzb: '',
        cd: '',
        kd: '',
        gd: '',
        zj: '',
        qlj: '',
        hlj: '',
        zxldjx: '',
        zbzl: '',
        cms: '',
        zws: '',
        yxrj: '',
        xlxrj: '',
        fdjxh: '',
        plml: '',
        pll: '',
        jqxs: '',
        qgplxs: '',
        qgs: '',
        mgqms: '',
        ysb: '',
        pqjg: '',
        gj: '',
        xc: '',
        zdml: '',
        zdgl: '',
        zdglzs: '',
        zdnj: '',
        zdnhzs: '',
        fdjtyjs: '',
        rlxs: '',
        rybh: '',
        gyfs: '',
        ggcl: '',
        gtcl: '',
        hbbz: '',
        jc: '',
        gwgs: '',
        bsxlx: '',
        qdfs: '',
        sqxs: '',
        zycsqjg: '',
        qxjlx: '',
        hxjlx: '',
        zllx: '',
        ctjg: '',
        qzdqlx: '',
        hzdqlx: '',
        zczdlx: '',
        qltgg: '',
        hltgg: '',
        btgg: '',
        zfjszaqqn: '',
        qhpcqn: '',
        qhptbqnql: '',
        xbqn: '',
        tyjczz: '',
        ltyjxxs: '',
        aqdwxts: '',
        ISOFIXetzyjk: '',
        fdjdzfd: '',
        cnzks: '',
        ykys: '',
        wysqdxt: '',
        wysjrxt: '',
        ABSfbs: '',
        zdlfb: '',
        scfz: '',
        qylkz: '',
        cswdkz: '',
        spfz: '',
        zdzc: '',
        dphj: '',
        kbxj: '',
        kqxj: '',
        kbzxb: '',
        qqxhcsqcss: '',
        zycsqszgn: '',
        hqxhcsqcss: '',
        ddtc: '',
        qjtc: '',
        ydwgtj: '',
        lhjlq: '',
        ddxhm: '',
        chm: '',
        ddhbx: '',
        gyhbx: '',
        cdxlj: '',
        zpfxp: '',
        fxptj: '',
        fxpddtj: '',
        dgnfxp: '',
        fxphd: '',
        fxpjr: '',
        fxpjy: '',
        dsxh: '',
        qhzcld: '',
        dcspyx: '',
        xcdnxsp: '',
        qyjybp: '',
        HUDttszxs: '',
        zycz: '',
        ydfgzy: '',
        zygdtj: '',
        ybzctj: '',
        jbzctj: '',
        zfjsddtj: '',
        depkbjdtj: '',
        depzyyd: '',
        hpzyddtj: '',
        ddzyjy: '',
        qhpzyjr: '',
        qhpzytf: '',
        qhpzyam: '',
        dspzy: '',
        hpzyfdfs: '',
        qhzyfs: '',
        hpbj: '',
        gps: '',
        dwhdfw: '',
        zktcsdp: '',
        lyczdh: '',
        czds: '',
        hpyjp: '',
        dy: '',
        wjyyjk: '',
        CDzc: '',
        dmtx: '',
        ysqpp: '',
        ysqsl: '',
        jgd: '',
        ygd: '',
        rjxcd: '',
        zsyyjg: '',
        zddt: '',
        zxfzd: '',
        zxtd: '',
        qwd: '',
        ddldkt: '',
        ddqxzz: '',
        cnfwd: '',
        qhddcc: '',
        ccfjsgn: '',
        fzwxgrbl: '',
        hsjddtj: '',
        hsjjr: '',
        nwhsjzdfxm: '',
        hsjddzd: '',
        hsjjy: '',
        hfdzyl: '',
        hpczyl: '',
        hpcysbl: '',
        zybhzj: '',
        hys: '',
        gyys: '',
        ktkzfs: '',
        hpdlkt: '',
        hzcfk: '',
        wdfqkz: '',
        cnkqtjhfgl: '',
        czbx: '',
        zdbcrw: '',
        fdjqtjs: '',
        bxfz: '',
        cdplyjxt: '',
        zdsczdaqxt: '',
        ztzdzxxt: '',
        ysxt: '',
        zkyjfpxs: '',
        zsyxh: '',
        qjsxt: '',
        wgys: '',
        wgysm: '',
        nsys: '',
        nsysm: '',
        hpcmkqfs: '',
        hxcc: '',
        zdzzzl: '',
        ddj: '',
        color: [],
        innercolor: []
      },
      // 电动型
      formAlign: {
      },
      // 颜色数组
      colorList1: [],
      colorList2: []
    }
  },
  methods: {
    // 获取radio
    async getTypeList () {
      const id = this.$route.query.id
      this.radio = id
    },
    // 获取品牌
    async getBrand () {
      const { data: res } = await this.$http.post('/car/showAllBrand')
      this.brandList = res
    },
    // 获取车系
    async drop (callback) {
      if (callback) {
        const { data: res } = await this.$http.post('/car/showSeries', {
          brand: this.form.brand
        })
        this.seriesList = res
      }
    },
    changeBrand () {
      this.form.series = ''
    },
    // 增加颜色
    addList1 () {
      this.colorList1.push('')
    },
    // 增加内饰颜色
    addList2 () {
      this.colorList2.push('')
    },
    // 提交
    async submit () {
      if (this.form.brand === '' || this.form.series === '' || this.form.type === '') return this.$message.error('请输入品牌车系车型')
      this.form.radio = this.radio
      this.form.color = this.colorList1
      this.form.innercolor = this.colorList2
      const res = await this.$http.post('/car/addCarConfig', this.form)
      if (res.status !== 200 || res.data !== true) return this.$message.error('提交失败')
      this.$message.success('提交成功')
    }
  },
  created () {
    // 获取品牌
    this.getBrand()
    // 获取radio
    this.getTypeList()
  },
  mounted () {
    // 获取radio
    this.getTypeList()
  }
}
</script>

<style lang="less" scoped>
.top {
  width: 500px;
  margin: 0 auto;
  .el-input, .el-select {
    margin-bottom: 20px;
  }
}
.el-input, .el-select {
  width: 500px;
}
.main {
  width: 750px;
  margin: 0 auto;
  >div {
    margin-bottom: 10px;
  }
  .title {
    font-size: 18px;
    margin-bottom: 10px;
    color: rgb(43, 121, 255);
  }
  span {
    display: inline-block;
    width: 230px;
    font-size: 14px;
  }
  .col {
    display: flex;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 230px;
      font-size: 14px;
    }
    div {
      width: 500px;
    }
  }
}
.btn {
  .el-button {
    width: 750px;
  }
  width: 750px;
  margin: 0 auto;
}
</style>
