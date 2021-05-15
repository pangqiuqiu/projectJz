const citylist = [
  {
    "id": "1",
    "cityid": "110000",
    "city": "北京市",
    "provinceid": "110000"
  },
  {
    "id": "2",
    "cityid": "310000",
    "city": "上海市",
    "provinceid": "310000"
  },
  {
    "id": "3",
    "cityid": "500000",
    "city": "重庆市",
    "provinceid": "500000"
  },
  {
    "id": "4",
    "cityid": "120000",
    "city": "天津市",
    "provinceid": "120000"
  },
  {
    "id": "5",
    "cityid": "130100",
    "city": "石家庄市",
    "provinceid": "130000"
  },
  {
    "id": "6",
    "cityid": "130200",
    "city": "唐山市",
    "provinceid": "130000"
  },
  {
    "id": "7",
    "cityid": "130300",
    "city": "秦皇岛市",
    "provinceid": "130000"
  },
  {
    "id": "8",
    "cityid": "130400",
    "city": "邯郸市",
    "provinceid": "130000"
  },
  {
    "id": "9",
    "cityid": "130500",
    "city": "邢台市",
    "provinceid": "130000"
  },
  {
    "id": "10",
    "cityid": "130600",
    "city": "保定市",
    "provinceid": "130000"
  },
  {
    "id": "11",
    "cityid": "130700",
    "city": "张家口市",
    "provinceid": "130000"
  },
  {
    "id": "12",
    "cityid": "130800",
    "city": "承德市",
    "provinceid": "130000"
  },
  {
    "id": "13",
    "cityid": "130900",
    "city": "沧州市",
    "provinceid": "130000"
  },
  {
    "id": "14",
    "cityid": "131000",
    "city": "廊坊市",
    "provinceid": "130000"
  },
  {
    "id": "15",
    "cityid": "131100",
    "city": "衡水市",
    "provinceid": "130000"
  },
  {
    "id": "16",
    "cityid": "140100",
    "city": "太原市",
    "provinceid": "140000"
  },
  {
    "id": "17",
    "cityid": "140200",
    "city": "大同市",
    "provinceid": "140000"
  },
  {
    "id": "18",
    "cityid": "140300",
    "city": "阳泉市",
    "provinceid": "140000"
  },
  {
    "id": "19",
    "cityid": "140400",
    "city": "长治市",
    "provinceid": "140000"
  },
  {
    "id": "20",
    "cityid": "140500",
    "city": "晋城市",
    "provinceid": "140000"
  },
  {
    "id": "21",
    "cityid": "140600",
    "city": "朔州市",
    "provinceid": "140000"
  },
  {
    "id": "22",
    "cityid": "140700",
    "city": "晋中市",
    "provinceid": "140000"
  },
  {
    "id": "23",
    "cityid": "140800",
    "city": "运城市",
    "provinceid": "140000"
  },
  {
    "id": "24",
    "cityid": "140900",
    "city": "忻州市",
    "provinceid": "140000"
  },
  {
    "id": "25",
    "cityid": "141000",
    "city": "临汾市",
    "provinceid": "140000"
  },
  {
    "id": "26",
    "cityid": "141100",
    "city": "吕梁市",
    "provinceid": "140000"
  },
  {
    "id": "27",
    "cityid": "150100",
    "city": "呼和浩特市",
    "provinceid": "150000"
  },
  {
    "id": "28",
    "cityid": "150200",
    "city": "包头市",
    "provinceid": "150000"
  },
  {
    "id": "29",
    "cityid": "150300",
    "city": "乌海市",
    "provinceid": "150000"
  },
  {
    "id": "30",
    "cityid": "150400",
    "city": "赤峰市",
    "provinceid": "150000"
  },
  {
    "id": "31",
    "cityid": "150500",
    "city": "通辽市",
    "provinceid": "150000"
  },
  {
    "id": "32",
    "cityid": "150600",
    "city": "鄂尔多斯市",
    "provinceid": "150000"
  },
  {
    "id": "33",
    "cityid": "150700",
    "city": "呼伦贝尔市",
    "provinceid": "150000"
  },
  {
    "id": "34",
    "cityid": "150800",
    "city": "巴彦淖尔市",
    "provinceid": "150000"
  },
  {
    "id": "35",
    "cityid": "150900",
    "city": "乌兰察布市",
    "provinceid": "150000"
  },
  {
    "id": "36",
    "cityid": "152200",
    "city": "兴安盟",
    "provinceid": "150000"
  },
  {
    "id": "37",
    "cityid": "152500",
    "city": "锡林郭勒盟",
    "provinceid": "150000"
  },
  {
    "id": "38",
    "cityid": "152900",
    "city": "阿拉善盟",
    "provinceid": "150000"
  },
  {
    "id": "39",
    "cityid": "210100",
    "city": "沈阳市",
    "provinceid": "210000"
  },
  {
    "id": "40",
    "cityid": "210200",
    "city": "大连市",
    "provinceid": "210000"
  },
  {
    "id": "41",
    "cityid": "210300",
    "city": "鞍山市",
    "provinceid": "210000"
  },
  {
    "id": "42",
    "cityid": "210400",
    "city": "抚顺市",
    "provinceid": "210000"
  },
  {
    "id": "43",
    "cityid": "210500",
    "city": "本溪市",
    "provinceid": "210000"
  },
  {
    "id": "44",
    "cityid": "210600",
    "city": "丹东市",
    "provinceid": "210000"
  },
  {
    "id": "45",
    "cityid": "210700",
    "city": "锦州市",
    "provinceid": "210000"
  },
  {
    "id": "46",
    "cityid": "210800",
    "city": "营口市",
    "provinceid": "210000"
  },
  {
    "id": "47",
    "cityid": "210900",
    "city": "阜新市",
    "provinceid": "210000"
  },
  {
    "id": "48",
    "cityid": "211000",
    "city": "辽阳市",
    "provinceid": "210000"
  },
  {
    "id": "49",
    "cityid": "211100",
    "city": "盘锦市",
    "provinceid": "210000"
  },
  {
    "id": "50",
    "cityid": "211200",
    "city": "铁岭市",
    "provinceid": "210000"
  },
  {
    "id": "51",
    "cityid": "211300",
    "city": "朝阳市",
    "provinceid": "210000"
  },
  {
    "id": "52",
    "cityid": "211400",
    "city": "葫芦岛市",
    "provinceid": "210000"
  },
  {
    "id": "53",
    "cityid": "220100",
    "city": "长春市",
    "provinceid": "220000"
  },
  {
    "id": "54",
    "cityid": "220200",
    "city": "吉林市",
    "provinceid": "220000"
  },
  {
    "id": "55",
    "cityid": "220300",
    "city": "四平市",
    "provinceid": "220000"
  },
  {
    "id": "56",
    "cityid": "220400",
    "city": "辽源市",
    "provinceid": "220000"
  },
  {
    "id": "57",
    "cityid": "220500",
    "city": "通化市",
    "provinceid": "220000"
  },
  {
    "id": "58",
    "cityid": "220600",
    "city": "白山市",
    "provinceid": "220000"
  },
  {
    "id": "59",
    "cityid": "220700",
    "city": "松原市",
    "provinceid": "220000"
  },
  {
    "id": "60",
    "cityid": "220800",
    "city": "白城市",
    "provinceid": "220000"
  },
  {
    "id": "61",
    "cityid": "222400",
    "city": "延边朝鲜族自治州",
    "provinceid": "220000"
  },
  {
    "id": "62",
    "cityid": "230100",
    "city": "哈尔滨市",
    "provinceid": "230000"
  },
  {
    "id": "63",
    "cityid": "230200",
    "city": "齐齐哈尔市",
    "provinceid": "230000"
  },
  {
    "id": "64",
    "cityid": "230300",
    "city": "鸡西市",
    "provinceid": "230000"
  },
  {
    "id": "65",
    "cityid": "230400",
    "city": "鹤岗市",
    "provinceid": "230000"
  },
  {
    "id": "66",
    "cityid": "230500",
    "city": "双鸭山市",
    "provinceid": "230000"
  },
  {
    "id": "67",
    "cityid": "230600",
    "city": "大庆市",
    "provinceid": "230000"
  },
  {
    "id": "68",
    "cityid": "230700",
    "city": "伊春市",
    "provinceid": "230000"
  },
  {
    "id": "69",
    "cityid": "230800",
    "city": "佳木斯市",
    "provinceid": "230000"
  },
  {
    "id": "70",
    "cityid": "230900",
    "city": "七台河市",
    "provinceid": "230000"
  },
  {
    "id": "71",
    "cityid": "231000",
    "city": "牡丹江市",
    "provinceid": "230000"
  },
  {
    "id": "72",
    "cityid": "231100",
    "city": "黑河市",
    "provinceid": "230000"
  },
  {
    "id": "73",
    "cityid": "231200",
    "city": "绥化市",
    "provinceid": "230000"
  },
  {
    "id": "74",
    "cityid": "232700",
    "city": "大兴安岭地区",
    "provinceid": "230000"
  },
  {
    "id": "77",
    "cityid": "320100",
    "city": "南京市",
    "provinceid": "320000"
  },
  {
    "id": "78",
    "cityid": "320200",
    "city": "无锡市",
    "provinceid": "320000"
  },
  {
    "id": "79",
    "cityid": "320300",
    "city": "徐州市",
    "provinceid": "320000"
  },
  {
    "id": "80",
    "cityid": "320400",
    "city": "常州市",
    "provinceid": "320000"
  },
  {
    "id": "81",
    "cityid": "320500",
    "city": "苏州市",
    "provinceid": "320000"
  },
  {
    "id": "82",
    "cityid": "320600",
    "city": "南通市",
    "provinceid": "320000"
  },
  {
    "id": "83",
    "cityid": "320700",
    "city": "连云港市",
    "provinceid": "320000"
  },
  {
    "id": "84",
    "cityid": "320800",
    "city": "淮安市",
    "provinceid": "320000"
  },
  {
    "id": "85",
    "cityid": "320900",
    "city": "盐城市",
    "provinceid": "320000"
  },
  {
    "id": "86",
    "cityid": "321000",
    "city": "扬州市",
    "provinceid": "320000"
  },
  {
    "id": "87",
    "cityid": "321100",
    "city": "镇江市",
    "provinceid": "320000"
  },
  {
    "id": "88",
    "cityid": "321200",
    "city": "泰州市",
    "provinceid": "320000"
  },
  {
    "id": "89",
    "cityid": "321300",
    "city": "宿迁市",
    "provinceid": "320000"
  },
  {
    "id": "90",
    "cityid": "330100",
    "city": "杭州市",
    "provinceid": "330000"
  },
  {
    "id": "91",
    "cityid": "330200",
    "city": "宁波市",
    "provinceid": "330000"
  },
  {
    "id": "92",
    "cityid": "330300",
    "city": "温州市",
    "provinceid": "330000"
  },
  {
    "id": "93",
    "cityid": "330400",
    "city": "嘉兴市",
    "provinceid": "330000"
  },
  {
    "id": "94",
    "cityid": "330500",
    "city": "湖州市",
    "provinceid": "330000"
  },
  {
    "id": "95",
    "cityid": "330600",
    "city": "绍兴市",
    "provinceid": "330000"
  },
  {
    "id": "96",
    "cityid": "330700",
    "city": "金华市",
    "provinceid": "330000"
  },
  {
    "id": "97",
    "cityid": "330800",
    "city": "衢州市",
    "provinceid": "330000"
  },
  {
    "id": "98",
    "cityid": "330900",
    "city": "舟山市",
    "provinceid": "330000"
  },
  {
    "id": "99",
    "cityid": "331000",
    "city": "台州市",
    "provinceid": "330000"
  },
  {
    "id": "100",
    "cityid": "331100",
    "city": "丽水市",
    "provinceid": "330000"
  },
  {
    "id": "101",
    "cityid": "340100",
    "city": "合肥市",
    "provinceid": "340000"
  },
  {
    "id": "102",
    "cityid": "340200",
    "city": "芜湖市",
    "provinceid": "340000"
  },
  {
    "id": "103",
    "cityid": "340300",
    "city": "蚌埠市",
    "provinceid": "340000"
  },
  {
    "id": "104",
    "cityid": "340400",
    "city": "淮南市",
    "provinceid": "340000"
  },
  {
    "id": "105",
    "cityid": "340500",
    "city": "马鞍山市",
    "provinceid": "340000"
  },
  {
    "id": "106",
    "cityid": "340600",
    "city": "淮北市",
    "provinceid": "340000"
  },
  {
    "id": "107",
    "cityid": "340700",
    "city": "铜陵市",
    "provinceid": "340000"
  },
  {
    "id": "108",
    "cityid": "340800",
    "city": "安庆市",
    "provinceid": "340000"
  },
  {
    "id": "109",
    "cityid": "341000",
    "city": "黄山市",
    "provinceid": "340000"
  },
  {
    "id": "110",
    "cityid": "341100",
    "city": "滁州市",
    "provinceid": "340000"
  },
  {
    "id": "111",
    "cityid": "341200",
    "city": "阜阳市",
    "provinceid": "340000"
  },
  {
    "id": "112",
    "cityid": "341300",
    "city": "宿州市",
    "provinceid": "340000"
  },
  {
    "id": "113",
    "cityid": "341400",
    "city": "巢湖市",
    "provinceid": "340000"
  },
  {
    "id": "114",
    "cityid": "341500",
    "city": "六安市",
    "provinceid": "340000"
  },
  {
    "id": "115",
    "cityid": "341600",
    "city": "亳州市",
    "provinceid": "340000"
  },
  {
    "id": "116",
    "cityid": "341700",
    "city": "池州市",
    "provinceid": "340000"
  },
  {
    "id": "117",
    "cityid": "341800",
    "city": "宣城市",
    "provinceid": "340000"
  },
  {
    "id": "118",
    "cityid": "350100",
    "city": "福州市",
    "provinceid": "350000"
  },
  {
    "id": "119",
    "cityid": "350200",
    "city": "厦门市",
    "provinceid": "350000"
  },
  {
    "id": "120",
    "cityid": "350300",
    "city": "莆田市",
    "provinceid": "350000"
  },
  {
    "id": "121",
    "cityid": "350400",
    "city": "三明市",
    "provinceid": "350000"
  },
  {
    "id": "122",
    "cityid": "350500",
    "city": "泉州市",
    "provinceid": "350000"
  },
  {
    "id": "123",
    "cityid": "350600",
    "city": "漳州市",
    "provinceid": "350000"
  },
  {
    "id": "124",
    "cityid": "350700",
    "city": "南平市",
    "provinceid": "350000"
  },
  {
    "id": "125",
    "cityid": "350800",
    "city": "龙岩市",
    "provinceid": "350000"
  },
  {
    "id": "126",
    "cityid": "350900",
    "city": "宁德市",
    "provinceid": "350000"
  },
  {
    "id": "127",
    "cityid": "360100",
    "city": "南昌市",
    "provinceid": "360000"
  },
  {
    "id": "128",
    "cityid": "360200",
    "city": "景德镇市",
    "provinceid": "360000"
  },
  {
    "id": "129",
    "cityid": "360300",
    "city": "萍乡市",
    "provinceid": "360000"
  },
  {
    "id": "130",
    "cityid": "360400",
    "city": "九江市",
    "provinceid": "360000"
  },
  {
    "id": "131",
    "cityid": "360500",
    "city": "新余市",
    "provinceid": "360000"
  },
  {
    "id": "132",
    "cityid": "360600",
    "city": "鹰潭市",
    "provinceid": "360000"
  },
  {
    "id": "133",
    "cityid": "360700",
    "city": "赣州市",
    "provinceid": "360000"
  },
  {
    "id": "134",
    "cityid": "360800",
    "city": "吉安市",
    "provinceid": "360000"
  },
  {
    "id": "135",
    "cityid": "360900",
    "city": "宜春市",
    "provinceid": "360000"
  },
  {
    "id": "136",
    "cityid": "361000",
    "city": "抚州市",
    "provinceid": "360000"
  },
  {
    "id": "137",
    "cityid": "361100",
    "city": "上饶市",
    "provinceid": "360000"
  },
  {
    "id": "138",
    "cityid": "370100",
    "city": "济南市",
    "provinceid": "370000"
  },
  {
    "id": "139",
    "cityid": "370200",
    "city": "青岛市",
    "provinceid": "370000"
  },
  {
    "id": "140",
    "cityid": "370300",
    "city": "淄博市",
    "provinceid": "370000"
  },
  {
    "id": "141",
    "cityid": "370400",
    "city": "枣庄市",
    "provinceid": "370000"
  },
  {
    "id": "142",
    "cityid": "370500",
    "city": "东营市",
    "provinceid": "370000"
  },
  {
    "id": "143",
    "cityid": "370600",
    "city": "烟台市",
    "provinceid": "370000"
  },
  {
    "id": "144",
    "cityid": "370700",
    "city": "潍坊市",
    "provinceid": "370000"
  },
  {
    "id": "145",
    "cityid": "370800",
    "city": "济宁市",
    "provinceid": "370000"
  },
  {
    "id": "146",
    "cityid": "370900",
    "city": "泰安市",
    "provinceid": "370000"
  },
  {
    "id": "147",
    "cityid": "371000",
    "city": "威海市",
    "provinceid": "370000"
  },
  {
    "id": "148",
    "cityid": "371100",
    "city": "日照市",
    "provinceid": "370000"
  },
  {
    "id": "149",
    "cityid": "371200",
    "city": "莱芜市",
    "provinceid": "370000"
  },
  {
    "id": "150",
    "cityid": "371300",
    "city": "临沂市",
    "provinceid": "370000"
  },
  {
    "id": "151",
    "cityid": "371400",
    "city": "德州市",
    "provinceid": "370000"
  },
  {
    "id": "152",
    "cityid": "371500",
    "city": "聊城市",
    "provinceid": "370000"
  },
  {
    "id": "153",
    "cityid": "371600",
    "city": "滨州市",
    "provinceid": "370000"
  },
  {
    "id": "154",
    "cityid": "371700",
    "city": "荷泽市",
    "provinceid": "370000"
  },
  {
    "id": "155",
    "cityid": "410100",
    "city": "郑州市",
    "provinceid": "410000"
  },
  {
    "id": "156",
    "cityid": "410200",
    "city": "开封市",
    "provinceid": "410000"
  },
  {
    "id": "157",
    "cityid": "410300",
    "city": "洛阳市",
    "provinceid": "410000"
  },
  {
    "id": "158",
    "cityid": "410400",
    "city": "平顶山市",
    "provinceid": "410000"
  },
  {
    "id": "159",
    "cityid": "410500",
    "city": "安阳市",
    "provinceid": "410000"
  },
  {
    "id": "160",
    "cityid": "410600",
    "city": "鹤壁市",
    "provinceid": "410000"
  },
  {
    "id": "161",
    "cityid": "410700",
    "city": "新乡市",
    "provinceid": "410000"
  },
  {
    "id": "162",
    "cityid": "410800",
    "city": "焦作市",
    "provinceid": "410000"
  },
  {
    "id": "163",
    "cityid": "410900",
    "city": "濮阳市",
    "provinceid": "410000"
  },
  {
    "id": "164",
    "cityid": "411000",
    "city": "许昌市",
    "provinceid": "410000"
  },
  {
    "id": "165",
    "cityid": "411100",
    "city": "漯河市",
    "provinceid": "410000"
  },
  {
    "id": "166",
    "cityid": "411200",
    "city": "三门峡市",
    "provinceid": "410000"
  },
  {
    "id": "167",
    "cityid": "411300",
    "city": "南阳市",
    "provinceid": "410000"
  },
  {
    "id": "168",
    "cityid": "411400",
    "city": "商丘市",
    "provinceid": "410000"
  },
  {
    "id": "169",
    "cityid": "411500",
    "city": "信阳市",
    "provinceid": "410000"
  },
  {
    "id": "170",
    "cityid": "411600",
    "city": "周口市",
    "provinceid": "410000"
  },
  {
    "id": "171",
    "cityid": "411700",
    "city": "驻马店市",
    "provinceid": "410000"
  },
  {
    "id": "172",
    "cityid": "420100",
    "city": "武汉市",
    "provinceid": "420000"
  },
  {
    "id": "173",
    "cityid": "420200",
    "city": "黄石市",
    "provinceid": "420000"
  },
  {
    "id": "174",
    "cityid": "420300",
    "city": "十堰市",
    "provinceid": "420000"
  },
  {
    "id": "175",
    "cityid": "420500",
    "city": "宜昌市",
    "provinceid": "420000"
  },
  {
    "id": "176",
    "cityid": "420600",
    "city": "襄樊市",
    "provinceid": "420000"
  },
  {
    "id": "177",
    "cityid": "420700",
    "city": "鄂州市",
    "provinceid": "420000"
  },
  {
    "id": "178",
    "cityid": "420800",
    "city": "荆门市",
    "provinceid": "420000"
  },
  {
    "id": "179",
    "cityid": "420900",
    "city": "孝感市",
    "provinceid": "420000"
  },
  {
    "id": "180",
    "cityid": "421000",
    "city": "荆州市",
    "provinceid": "420000"
  },
  {
    "id": "181",
    "cityid": "421100",
    "city": "黄冈市",
    "provinceid": "420000"
  },
  {
    "id": "182",
    "cityid": "421200",
    "city": "咸宁市",
    "provinceid": "420000"
  },
  {
    "id": "183",
    "cityid": "421300",
    "city": "随州市",
    "provinceid": "420000"
  },
  {
    "id": "184",
    "cityid": "422800",
    "city": "恩施土家族苗族自治州",
    "provinceid": "420000"
  },
  {
    "id": "186",
    "cityid": "430100",
    "city": "长沙市",
    "provinceid": "430000"
  },
  {
    "id": "187",
    "cityid": "430200",
    "city": "株洲市",
    "provinceid": "430000"
  },
  {
    "id": "188",
    "cityid": "430300",
    "city": "湘潭市",
    "provinceid": "430000"
  },
  {
    "id": "189",
    "cityid": "430400",
    "city": "衡阳市",
    "provinceid": "430000"
  },
  {
    "id": "190",
    "cityid": "430500",
    "city": "邵阳市",
    "provinceid": "430000"
  },
  {
    "id": "191",
    "cityid": "430600",
    "city": "岳阳市",
    "provinceid": "430000"
  },
  {
    "id": "192",
    "cityid": "430700",
    "city": "常德市",
    "provinceid": "430000"
  },
  {
    "id": "193",
    "cityid": "430800",
    "city": "张家界市",
    "provinceid": "430000"
  },
  {
    "id": "194",
    "cityid": "430900",
    "city": "益阳市",
    "provinceid": "430000"
  },
  {
    "id": "195",
    "cityid": "431000",
    "city": "郴州市",
    "provinceid": "430000"
  },
  {
    "id": "196",
    "cityid": "431100",
    "city": "永州市",
    "provinceid": "430000"
  },
  {
    "id": "197",
    "cityid": "431200",
    "city": "怀化市",
    "provinceid": "430000"
  },
  {
    "id": "198",
    "cityid": "431300",
    "city": "娄底市",
    "provinceid": "430000"
  },
  {
    "id": "199",
    "cityid": "433100",
    "city": "湘西土家族苗族自治州",
    "provinceid": "430000"
  },
  {
    "id": "200",
    "cityid": "440100",
    "city": "广州市",
    "provinceid": "440000"
  },
  {
    "id": "201",
    "cityid": "440200",
    "city": "韶关市",
    "provinceid": "440000"
  },
  {
    "id": "202",
    "cityid": "440300",
    "city": "深圳市",
    "provinceid": "440000"
  },
  {
    "id": "203",
    "cityid": "440400",
    "city": "珠海市",
    "provinceid": "440000"
  },
  {
    "id": "204",
    "cityid": "440500",
    "city": "汕头市",
    "provinceid": "440000"
  },
  {
    "id": "205",
    "cityid": "440600",
    "city": "佛山市",
    "provinceid": "440000"
  },
  {
    "id": "206",
    "cityid": "440700",
    "city": "江门市",
    "provinceid": "440000"
  },
  {
    "id": "207",
    "cityid": "440800",
    "city": "湛江市",
    "provinceid": "440000"
  },
  {
    "id": "208",
    "cityid": "440900",
    "city": "茂名市",
    "provinceid": "440000"
  },
  {
    "id": "209",
    "cityid": "441200",
    "city": "肇庆市",
    "provinceid": "440000"
  },
  {
    "id": "210",
    "cityid": "441300",
    "city": "惠州市",
    "provinceid": "440000"
  },
  {
    "id": "211",
    "cityid": "441400",
    "city": "梅州市",
    "provinceid": "440000"
  },
  {
    "id": "212",
    "cityid": "441500",
    "city": "汕尾市",
    "provinceid": "440000"
  },
  {
    "id": "213",
    "cityid": "441600",
    "city": "河源市",
    "provinceid": "440000"
  },
  {
    "id": "214",
    "cityid": "441700",
    "city": "阳江市",
    "provinceid": "440000"
  },
  {
    "id": "215",
    "cityid": "441800",
    "city": "清远市",
    "provinceid": "440000"
  },
  {
    "id": "216",
    "cityid": "441900",
    "city": "东莞市",
    "provinceid": "440000"
  },
  {
    "id": "217",
    "cityid": "442000",
    "city": "中山市",
    "provinceid": "440000"
  },
  {
    "id": "218",
    "cityid": "445100",
    "city": "潮州市",
    "provinceid": "440000"
  },
  {
    "id": "219",
    "cityid": "445200",
    "city": "揭阳市",
    "provinceid": "440000"
  },
  {
    "id": "220",
    "cityid": "445300",
    "city": "云浮市",
    "provinceid": "440000"
  },
  {
    "id": "221",
    "cityid": "450100",
    "city": "南宁市",
    "provinceid": "450000"
  },
  {
    "id": "222",
    "cityid": "450200",
    "city": "柳州市",
    "provinceid": "450000"
  },
  {
    "id": "223",
    "cityid": "450300",
    "city": "桂林市",
    "provinceid": "450000"
  },
  {
    "id": "224",
    "cityid": "450400",
    "city": "梧州市",
    "provinceid": "450000"
  },
  {
    "id": "225",
    "cityid": "450500",
    "city": "北海市",
    "provinceid": "450000"
  },
  {
    "id": "226",
    "cityid": "450600",
    "city": "防城港市",
    "provinceid": "450000"
  },
  {
    "id": "227",
    "cityid": "450700",
    "city": "钦州市",
    "provinceid": "450000"
  },
  {
    "id": "228",
    "cityid": "450800",
    "city": "贵港市",
    "provinceid": "450000"
  },
  {
    "id": "229",
    "cityid": "450900",
    "city": "玉林市",
    "provinceid": "450000"
  },
  {
    "id": "230",
    "cityid": "451000",
    "city": "百色市",
    "provinceid": "450000"
  },
  {
    "id": "231",
    "cityid": "451100",
    "city": "贺州市",
    "provinceid": "450000"
  },
  {
    "id": "232",
    "cityid": "451200",
    "city": "河池市",
    "provinceid": "450000"
  },
  {
    "id": "233",
    "cityid": "451300",
    "city": "来宾市",
    "provinceid": "450000"
  },
  {
    "id": "234",
    "cityid": "451400",
    "city": "崇左市",
    "provinceid": "450000"
  },
  {
    "id": "235",
    "cityid": "460100",
    "city": "海口市",
    "provinceid": "460000"
  },
  {
    "id": "236",
    "cityid": "460200",
    "city": "三亚市",
    "provinceid": "460000"
  },
  {
    "id": "241",
    "cityid": "510100",
    "city": "成都市",
    "provinceid": "510000"
  },
  {
    "id": "242",
    "cityid": "510300",
    "city": "自贡市",
    "provinceid": "510000"
  },
  {
    "id": "243",
    "cityid": "510400",
    "city": "攀枝花市",
    "provinceid": "510000"
  },
  {
    "id": "244",
    "cityid": "510500",
    "city": "泸州市",
    "provinceid": "510000"
  },
  {
    "id": "245",
    "cityid": "510600",
    "city": "德阳市",
    "provinceid": "510000"
  },
  {
    "id": "246",
    "cityid": "510700",
    "city": "绵阳市",
    "provinceid": "510000"
  },
  {
    "id": "247",
    "cityid": "510800",
    "city": "广元市",
    "provinceid": "510000"
  },
  {
    "id": "248",
    "cityid": "510900",
    "city": "遂宁市",
    "provinceid": "510000"
  },
  {
    "id": "249",
    "cityid": "511000",
    "city": "内江市",
    "provinceid": "510000"
  },
  {
    "id": "250",
    "cityid": "511100",
    "city": "乐山市",
    "provinceid": "510000"
  },
  {
    "id": "251",
    "cityid": "511300",
    "city": "南充市",
    "provinceid": "510000"
  },
  {
    "id": "252",
    "cityid": "511400",
    "city": "眉山市",
    "provinceid": "510000"
  },
  {
    "id": "253",
    "cityid": "511500",
    "city": "宜宾市",
    "provinceid": "510000"
  },
  {
    "id": "254",
    "cityid": "511600",
    "city": "广安市",
    "provinceid": "510000"
  },
  {
    "id": "255",
    "cityid": "511700",
    "city": "达州市",
    "provinceid": "510000"
  },
  {
    "id": "256",
    "cityid": "511800",
    "city": "雅安市",
    "provinceid": "510000"
  },
  {
    "id": "257",
    "cityid": "511900",
    "city": "巴中市",
    "provinceid": "510000"
  },
  {
    "id": "258",
    "cityid": "512000",
    "city": "资阳市",
    "provinceid": "510000"
  },
  {
    "id": "259",
    "cityid": "513200",
    "city": "阿坝藏族羌族自治州",
    "provinceid": "510000"
  },
  {
    "id": "260",
    "cityid": "513300",
    "city": "甘孜藏族自治州",
    "provinceid": "510000"
  },
  {
    "id": "261",
    "cityid": "513400",
    "city": "凉山彝族自治州",
    "provinceid": "510000"
  },
  {
    "id": "262",
    "cityid": "520100",
    "city": "贵阳市",
    "provinceid": "520000"
  },
  {
    "id": "263",
    "cityid": "520200",
    "city": "六盘水市",
    "provinceid": "520000"
  },
  {
    "id": "264",
    "cityid": "520300",
    "city": "遵义市",
    "provinceid": "520000"
  },
  {
    "id": "265",
    "cityid": "520400",
    "city": "安顺市",
    "provinceid": "520000"
  },
  {
    "id": "266",
    "cityid": "522200",
    "city": "铜仁地区",
    "provinceid": "520000"
  },
  {
    "id": "267",
    "cityid": "522300",
    "city": "黔西南布依族苗族自治州",
    "provinceid": "520000"
  },
  {
    "id": "268",
    "cityid": "522400",
    "city": "毕节地区",
    "provinceid": "520000"
  },
  {
    "id": "269",
    "cityid": "522600",
    "city": "黔东南苗族侗族自治州",
    "provinceid": "520000"
  },
  {
    "id": "270",
    "cityid": "522700",
    "city": "黔南布依族苗族自治州",
    "provinceid": "520000"
  },
  {
    "id": "271",
    "cityid": "530100",
    "city": "昆明市",
    "provinceid": "530000"
  },
  {
    "id": "272",
    "cityid": "530300",
    "city": "曲靖市",
    "provinceid": "530000"
  },
  {
    "id": "273",
    "cityid": "530400",
    "city": "玉溪市",
    "provinceid": "530000"
  },
  {
    "id": "274",
    "cityid": "530500",
    "city": "保山市",
    "provinceid": "530000"
  },
  {
    "id": "275",
    "cityid": "530600",
    "city": "昭通市",
    "provinceid": "530000"
  },
  {
    "id": "276",
    "cityid": "530700",
    "city": "丽江市",
    "provinceid": "530000"
  },
  {
    "id": "277",
    "cityid": "530800",
    "city": "思茅市",
    "provinceid": "530000"
  },
  {
    "id": "278",
    "cityid": "530900",
    "city": "临沧市",
    "provinceid": "530000"
  },
  {
    "id": "279",
    "cityid": "532300",
    "city": "楚雄彝族自治州",
    "provinceid": "530000"
  },
  {
    "id": "280",
    "cityid": "532500",
    "city": "红河哈尼族彝族自治州",
    "provinceid": "530000"
  },
  {
    "id": "281",
    "cityid": "532600",
    "city": "文山壮族苗族自治州",
    "provinceid": "530000"
  },
  {
    "id": "282",
    "cityid": "532800",
    "city": "西双版纳傣族自治州",
    "provinceid": "530000"
  },
  {
    "id": "283",
    "cityid": "532900",
    "city": "大理白族自治州",
    "provinceid": "530000"
  },
  {
    "id": "284",
    "cityid": "533100",
    "city": "德宏傣族景颇族自治州",
    "provinceid": "530000"
  },
  {
    "id": "285",
    "cityid": "533300",
    "city": "怒江傈僳族自治州",
    "provinceid": "530000"
  },
  {
    "id": "286",
    "cityid": "533400",
    "city": "迪庆藏族自治州",
    "provinceid": "530000"
  },
  {
    "id": "287",
    "cityid": "540100",
    "city": "拉萨市",
    "provinceid": "540000"
  },
  {
    "id": "288",
    "cityid": "542100",
    "city": "昌都地区",
    "provinceid": "540000"
  },
  {
    "id": "289",
    "cityid": "542200",
    "city": "山南地区",
    "provinceid": "540000"
  },
  {
    "id": "290",
    "cityid": "542300",
    "city": "日喀则地区",
    "provinceid": "540000"
  },
  {
    "id": "291",
    "cityid": "542400",
    "city": "那曲地区",
    "provinceid": "540000"
  },
  {
    "id": "292",
    "cityid": "542500",
    "city": "阿里地区",
    "provinceid": "540000"
  },
  {
    "id": "293",
    "cityid": "542600",
    "city": "林芝地区",
    "provinceid": "540000"
  },
  {
    "id": "294",
    "cityid": "610100",
    "city": "西安市",
    "provinceid": "610000"
  },
  {
    "id": "295",
    "cityid": "610200",
    "city": "铜川市",
    "provinceid": "610000"
  },
  {
    "id": "296",
    "cityid": "610300",
    "city": "宝鸡市",
    "provinceid": "610000"
  },
  {
    "id": "297",
    "cityid": "610400",
    "city": "咸阳市",
    "provinceid": "610000"
  },
  {
    "id": "298",
    "cityid": "610500",
    "city": "渭南市",
    "provinceid": "610000"
  },
  {
    "id": "299",
    "cityid": "610600",
    "city": "延安市",
    "provinceid": "610000"
  },
  {
    "id": "300",
    "cityid": "610700",
    "city": "汉中市",
    "provinceid": "610000"
  },
  {
    "id": "301",
    "cityid": "610800",
    "city": "榆林市",
    "provinceid": "610000"
  },
  {
    "id": "302",
    "cityid": "610900",
    "city": "安康市",
    "provinceid": "610000"
  },
  {
    "id": "303",
    "cityid": "611000",
    "city": "商洛市",
    "provinceid": "610000"
  },
  {
    "id": "304",
    "cityid": "620100",
    "city": "兰州市",
    "provinceid": "620000"
  },
  {
    "id": "305",
    "cityid": "620200",
    "city": "嘉峪关市",
    "provinceid": "620000"
  },
  {
    "id": "306",
    "cityid": "620300",
    "city": "金昌市",
    "provinceid": "620000"
  },
  {
    "id": "307",
    "cityid": "620400",
    "city": "白银市",
    "provinceid": "620000"
  },
  {
    "id": "308",
    "cityid": "620500",
    "city": "天水市",
    "provinceid": "620000"
  },
  {
    "id": "309",
    "cityid": "620600",
    "city": "武威市",
    "provinceid": "620000"
  },
  {
    "id": "310",
    "cityid": "620700",
    "city": "张掖市",
    "provinceid": "620000"
  },
  {
    "id": "311",
    "cityid": "620800",
    "city": "平凉市",
    "provinceid": "620000"
  },
  {
    "id": "312",
    "cityid": "620900",
    "city": "酒泉市",
    "provinceid": "620000"
  },
  {
    "id": "313",
    "cityid": "621000",
    "city": "庆阳市",
    "provinceid": "620000"
  },
  {
    "id": "314",
    "cityid": "621100",
    "city": "定西市",
    "provinceid": "620000"
  },
  {
    "id": "315",
    "cityid": "621200",
    "city": "陇南市",
    "provinceid": "620000"
  },
  {
    "id": "316",
    "cityid": "622900",
    "city": "临夏回族自治州",
    "provinceid": "620000"
  },
  {
    "id": "317",
    "cityid": "623000",
    "city": "甘南藏族自治州",
    "provinceid": "620000"
  },
  {
    "id": "318",
    "cityid": "630100",
    "city": "西宁市",
    "provinceid": "630000"
  },
  {
    "id": "319",
    "cityid": "632100",
    "city": "海东地区",
    "provinceid": "630000"
  },
  {
    "id": "320",
    "cityid": "632200",
    "city": "海北藏族自治州",
    "provinceid": "630000"
  },
  {
    "id": "321",
    "cityid": "632300",
    "city": "黄南藏族自治州",
    "provinceid": "630000"
  },
  {
    "id": "322",
    "cityid": "632500",
    "city": "海南藏族自治州",
    "provinceid": "630000"
  },
  {
    "id": "323",
    "cityid": "632600",
    "city": "果洛藏族自治州",
    "provinceid": "630000"
  },
  {
    "id": "324",
    "cityid": "632700",
    "city": "玉树藏族自治州",
    "provinceid": "630000"
  },
  {
    "id": "325",
    "cityid": "632800",
    "city": "海西蒙古族藏族自治州",
    "provinceid": "630000"
  },
  {
    "id": "326",
    "cityid": "640100",
    "city": "银川市",
    "provinceid": "640000"
  },
  {
    "id": "327",
    "cityid": "640200",
    "city": "石嘴山市",
    "provinceid": "640000"
  },
  {
    "id": "328",
    "cityid": "640300",
    "city": "吴忠市",
    "provinceid": "640000"
  },
  {
    "id": "329",
    "cityid": "640400",
    "city": "固原市",
    "provinceid": "640000"
  },
  {
    "id": "330",
    "cityid": "640500",
    "city": "中卫市",
    "provinceid": "640000"
  },
  {
    "id": "331",
    "cityid": "650100",
    "city": "乌鲁木齐市",
    "provinceid": "650000"
  },
  {
    "id": "332",
    "cityid": "650200",
    "city": "克拉玛依市",
    "provinceid": "650000"
  },
  {
    "id": "333",
    "cityid": "652100",
    "city": "吐鲁番地区",
    "provinceid": "650000"
  },
  {
    "id": "334",
    "cityid": "652200",
    "city": "哈密地区",
    "provinceid": "650000"
  },
  {
    "id": "335",
    "cityid": "652300",
    "city": "昌吉回族自治州",
    "provinceid": "650000"
  },
  {
    "id": "336",
    "cityid": "652700",
    "city": "博尔塔拉蒙古自治州",
    "provinceid": "650000"
  },
  {
    "id": "337",
    "cityid": "652800",
    "city": "巴音郭楞蒙古自治州",
    "provinceid": "650000"
  },
  {
    "id": "338",
    "cityid": "652900",
    "city": "阿克苏地区",
    "provinceid": "650000"
  },
  {
    "id": "339",
    "cityid": "653000",
    "city": "克孜勒苏柯尔克孜自治州",
    "provinceid": "650000"
  },
  {
    "id": "340",
    "cityid": "653100",
    "city": "喀什地区",
    "provinceid": "650000"
  },
  {
    "id": "341",
    "cityid": "653200",
    "city": "和田地区",
    "provinceid": "650000"
  },
  {
    "id": "342",
    "cityid": "654000",
    "city": "伊犁哈萨克自治州",
    "provinceid": "650000"
  },
  {
    "id": "343",
    "cityid": "654200",
    "city": "塔城地区",
    "provinceid": "650000"
  },
  {
    "id": "344",
    "cityid": "654300",
    "city": "阿勒泰地区",
    "provinceid": "650000"
  }
]

export default citylist