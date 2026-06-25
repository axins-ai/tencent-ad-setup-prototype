function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;

// ========== Mock 数据 ==========
var MOCK = {
  businessTypes: [{
    id: 'benefit_A',
    name: '权益A'
  }, {
    id: 'benefit_B',
    name: '权益B'
  }, {
    id: 'benefit_C',
    name: '权益C'
  }],
  channels: [{
    id: 'gdt',
    name: '广点通'
  }],
  accounts: [{
    id: 'acc_001',
    name: '账户001-北京移动',
    kaboshi: 'https://kaboshi.example.com/acc001'
  }, {
    id: 'acc_002',
    name: '账户002-上海移动',
    kaboshi: 'https://kaboshi.example.com/acc002'
  }, {
    id: 'acc_003',
    name: '账户003-广州移动',
    kaboshi: 'https://kaboshi.example.com/acc003'
  }, {
    id: 'acc_004',
    name: '账户004-深圳移动',
    kaboshi: 'https://kaboshi.example.com/acc004'
  }, {
    id: 'acc_005',
    name: '账户005-杭州移动',
    kaboshi: 'https://kaboshi.example.com/acc005'
  }],
  specificProducts: [{
    id: 'sp_001',
    name: '移动大王卡19元档'
  }, {
    id: 'sp_002',
    name: '移动大王卡39元档'
  }, {
    id: 'sp_003',
    name: '联通冰激凌99元档'
  }, {
    id: 'sp_004',
    name: '电信天翼畅享套餐'
  }],
  targetingPackages: [{
    id: 'tp_001',
    name: '一线城市年轻人群',
    region: '北京/上海/广州/深圳',
    age: '18-35',
    gender: '不限'
  }, {
    id: 'tp_002',
    name: '全国流量敏感用户',
    region: '全国',
    age: '20-45',
    gender: '不限'
  }, {
    id: 'tp_003',
    name: '学生群体',
    region: '全国',
    age: '18-24',
    gender: '不限'
  }, {
    id: 'tp_004',
    name: '上班族',
    region: '一二线城市',
    age: '25-40',
    gender: '不限'
  }, {
    id: 'tp_005',
    name: '中老年群体',
    region: '全国',
    age: '40-65',
    gender: '不限'
  }, {
    id: 'tp_006',
    name: '游戏爱好者',
    region: '全国',
    age: '18-30',
    gender: '男'
  }, {
    id: 'tp_007',
    name: '视频观看用户',
    region: '全国',
    age: '18-45',
    gender: '女'
  }, {
    id: 'tp_008',
    name: '电商购物用户',
    region: '一二三线城市',
    age: '22-40',
    gender: '女'
  }],
  regions: ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '武汉', '南京', '西安', '全国'],
  ages: ['18-24', '25-30', '31-35', '36-40', '41-50', '不限'],
  genders: ['男', '女', '不限'],
  customAudiences: [{
    id: 'ca_001',
    name: '上周访问用户'
  }, {
    id: 'ca_002',
    name: '近30天活跃用户'
  }, {
    id: 'ca_003',
    name: '高价值用户'
  }],
  excludeConversions: [{
    id: 'ec_001',
    name: '已提交表单用户'
  }, {
    id: 'ec_002',
    name: '已转化用户'
  }],
  // 素材库（视频+图片），带消耗/CTR/CVR数据
  videoMaterials: Array.from({
    length: 50
  }, function (_, i) {
    return {
      id: "v_".concat(String(i + 1).padStart(3, '0')),
      name: "\u89C6\u9891\u7D20\u6750".concat(i + 1),
      type: 'video',
      duration: ['0:30', '1:00', '1:30', '2:00'][i % 4],
      size: ['15MB', '28MB', '20MB', '55MB'][i % 4],
      thumb: '🎬',
      spend: Math.round((Math.random() * 5000 + 100) * 100) / 100,
      ctr: Math.round((Math.random() * 5 + 1) * 100) / 100,
      cvr: Math.round((Math.random() * 10 + 0.5) * 100) / 100
    };
  }),
  imageMaterials: Array.from({
    length: 50
  }, function (_, i) {
    return {
      id: "i_".concat(String(i + 1).padStart(3, '0')),
      name: "\u56FE\u7247\u7D20\u6750".concat(i + 1),
      type: 'image',
      size: ['120KB', '250KB', '80KB', '300KB'][i % 4],
      thumb: '🖼️',
      spend: Math.round((Math.random() * 3000 + 50) * 100) / 100,
      ctr: Math.round((Math.random() * 4 + 0.5) * 100) / 100,
      cvr: Math.round((Math.random() * 8 + 0.3) * 100) / 100
    };
  }),
  copyLibrary: [{
    id: 'c_001',
    content: '限时优惠，立即办理！',
    ctr: 3.5
  }, {
    id: 'c_002',
    content: '高速流量，畅享无忧',
    ctr: 2.8
  }, {
    id: 'c_003',
    content: '新用户专享，首月免费',
    ctr: 4.2
  }, {
    id: 'c_004',
    content: '点击下方，立即领取',
    ctr: 3.1
  }, {
    id: 'c_005',
    content: '全国通用，无漫游费',
    ctr: 2.5
  }, {
    id: 'c_006',
    content: '套餐可续订，随时取消',
    ctr: 3.8
  }, {
    id: 'c_007',
    content: '5G极速，畅快体验',
    ctr: 3.2
  }, {
    id: 'c_008',
    content: '家庭共享，多人更划算',
    ctr: 2.9
  }],
  videoSceneOptions: [{
    id: 'vs_001',
    label: '视频号原生广告-主入口',
    tip: '朋友圈上方视频号信息流中的广告位'
  }, {
    id: 'vs_002',
    label: '视频号原生广告-订阅号入口',
    tip: '订阅号消息中的视频号内容广告位'
  }, {
    id: 'vs_003',
    label: '视频号评论区广告',
    tip: '视频号内容评论区中的广告位'
  }],
  mpSceneGroups: [{
    groupName: '公众号媒体类型',
    multi: true,
    options: [{
      id: 'mp_001',
      label: '不限'
    }, {
      id: 'mp_002',
      label: '社会'
    }, {
      id: 'mp_003',
      label: '生活'
    }, {
      id: 'mp_004',
      label: '文化'
    }, {
      id: 'mp_005',
      label: '教育'
    }, {
      id: 'mp_006',
      label: '职场'
    }, {
      id: 'mp_007',
      label: '健康'
    }]
  }, {
    groupName: '小程序小游戏流量类型',
    multi: true,
    options: [{
      id: 'mg_001',
      label: '小游戏：不限'
    }, {
      id: 'mg_002',
      label: '小游戏：动作'
    }, {
      id: 'mg_003',
      label: '小游戏：角色'
    }, {
      id: 'mg_004',
      label: '小游戏：竞技'
    }, {
      id: 'mg_005',
      label: '小游戏：其他'
    }, {
      id: 'mg_009',
      label: '小程序：不限'
    }, {
      id: 'mg_010',
      label: '小程序：共享充电'
    }, {
      id: 'mg_011',
      label: '小程序：点餐外卖'
    }, {
      id: 'mg_012',
      label: '小程序：快递生活'
    }, {
      id: 'mg_013',
      label: '小程序：公共出行'
    }, {
      id: 'mg_014',
      label: '小程序：车主服务'
    }, {
      id: 'mg_015',
      label: '小程序：效率工具'
    }, {
      id: 'mg_017',
      label: '小程序：电商'
    }, {
      id: 'mg_018',
      label: '小程序：教育工具'
    }, {
      id: 'mg_019',
      label: '小程序：微短剧'
    }]
  }, {
    groupName: '订单详情页消费场景',
    multi: true,
    options: [{
      id: 'os_001',
      label: '不限'
    }, {
      id: 'os_002',
      label: '餐饮美食'
    }, {
      id: 'os_003',
      label: '生活服务'
    }, {
      id: 'os_004',
      label: '购物体验'
    }, {
      id: 'os_005',
      label: '出行服务'
    }]
  }],
  // 级联地区数据（用于自定义定向）
  regionCascade: {
    countries: [{
      id: 'cn',
      name: '中国'
    }],
    provinces: {
      cn: [{
        id: 'anhui',
        name: '安徽省'
      }, {
        id: 'beijing',
        name: '北京市'
      }, {
        id: 'chongqing',
        name: '重庆市'
      }, {
        id: 'fujian',
        name: '福建省'
      }, {
        id: 'guangdong',
        name: '广东省'
      }, {
        id: 'guangxi',
        name: '广西壮族自治区'
      }, {
        id: 'gansu',
        name: '甘肃省'
      }, {
        id: 'guizhou',
        name: '贵州省'
      }, {
        id: 'hainan',
        name: '海南省'
      }, {
        id: 'hebei',
        name: '河北省'
      }, {
        id: 'henan',
        name: '河南省'
      }, {
        id: 'heilongjiang',
        name: '黑龙江省'
      }, {
        id: 'hubei',
        name: '湖北省'
      }, {
        id: 'hunan',
        name: '湖南省'
      }, {
        id: 'jilin',
        name: '吉林省'
      }, {
        id: 'jiangsu',
        name: '江苏省'
      }, {
        id: 'jiangxi',
        name: '江西省'
      }, {
        id: 'liaoning',
        name: '辽宁省'
      }, {
        id: 'neimenggu',
        name: '内蒙古自治区'
      }, {
        id: 'ningxia',
        name: '宁夏回族自治区'
      }, {
        id: 'qinghai',
        name: '青海省'
      }, {
        id: 'shandong',
        name: '山东省'
      }, {
        id: 'shanxi',
        name: '山西省'
      }, {
        id: 'shaanxi',
        name: '陕西省'
      }, {
        id: 'shanghai',
        name: '上海市'
      }, {
        id: 'sichuan',
        name: '四川省'
      }, {
        id: 'tianjin',
        name: '天津市'
      }, {
        id: 'xinjiang',
        name: '新疆维吾尔自治区'
      }, {
        id: 'yunnan',
        name: '云南省'
      }, {
        id: 'zhejiang',
        name: '浙江省'
      }]
    },
    cities: {
      anhui: ['安庆市', '蚌埠市', '亳州市', '巢湖市', '池州市', '滁州市', '阜阳市', '合肥市', '淮北市', '淮南市', '黄山市', '六安市', '马鞍山市', '宿州市', '铜陵市', '芜湖市', '宣城市'],
      beijing: ['北京市'],
      chongqing: ['重庆市'],
      fujian: ['福州市', '龙岩市', '南平市', '宁德市', '莆田市', '泉州市', '三明市', '厦门市', '漳州市'],
      guangdong: ['潮州市', '东莞市', '佛山市', '广州市', '河源市', '惠州市', '江门市', '揭阳市', '茂名市', '梅州市', '清远市', '汕头市', '汕尾市', '韶关市', '深圳市', '阳江市', '云浮市', '湛江市', '肇庆市', '中山市', '珠海市'],
      guangxi: ['百色市', '北海市', '崇左市', '防城港市', '贵港市', '桂林市', '河池市', '贺州市', '来宾市', '柳州市', '南宁市', '钦州市', '梧州市', '玉林市'],
      gansu: ['白银市', '定西市', '甘南州', '嘉峪关市', '金昌市', '酒泉市', '兰州市', '临夏州', '陇南市', '平凉市', '庆阳市', '天水市', '武威市', '张掖市'],
      guizhou: ['安顺市', '毕节地区', '贵阳市', '六盘水市', '黔东南州', '黔南州', '黔西南州', '铜仁市', '遵义市'],
      hainan: ['白沙县', '昌江县', '澄迈县', '儋州市', '东方市', '海口市', '乐东县', '陵水县', '琼海市', '琼中县', '三亚市', '屯昌县', '万宁市', '文昌市', '五指山市'],
      hebei: ['保定市', '沧州市', '承德市', '邯郸市', '衡水市', '廊坊市', '秦皇岛市', '石家庄市', '唐山市', '邢台市', '张家口市'],
      henan: ['安阳市', '鹤壁市', '济源市', '焦作市', '开封市', '洛阳市', '漯河市', '南阳市', '平顶山', '濮阳市', '三门峡', '商丘市', '新乡市', '信阳市', '许昌市', '郑州市', '周口市', '驻马店市'],
      heilongjiang: ['大庆市', '大兴安岭', '哈尔滨市', '鹤岗市', '黑河市', '鸡西市', '佳木斯市', '牡丹江市', '七台河市', '齐齐哈尔市', '双鸭山市', '绥化市', '伊春市'],
      hubei: ['鄂州市', '恩施州', '黄冈市', '黄石市', '荆门市', '荆州市', '潜江市', '神农架', '十堰市', '随州市', '天门市', '武汉市', '咸宁市', '仙桃市', '襄阳市', '孝感市', '宜昌市'],
      hunan: ['长沙市', '常德市', '郴州市', '衡阳市', '怀化市', '娄底市', '邵阳市', '湘潭市', '湘西州', '益阳市', '永州市', '岳阳市', '张家界市', '株洲市'],
      jilin: ['白城市', '白山市', '吉林市', '辽源市', '四平市', '松原市', '通化市', '延边州', '长春市'],
      jiangsu: ['常州市', '淮安市', '连云港市', '南京市', '南通市', '苏州市', '宿迁市', '泰州市', '无锡市', '徐州市', '盐城市', '扬州市', '镇江市'],
      jiangxi: ['抚州市', '赣州市', '吉安市', '景德镇市', '九江市', '南昌市', '萍乡市', '上饶市', '新余市', '宜春市', '鹰潭市'],
      liaoning: ['鞍山市', '本溪市', '朝阳市', '大连市', '丹东市', '抚顺市', '阜新市', '葫芦岛市', '锦州市', '辽阳市', '盘锦市', '沈阳市', '铁岭市', '营口市'],
      neimenggu: ['阿拉善盟', '巴彦淖尔市', '包头市', '赤峰市', '鄂尔多斯市', '呼和浩特市', '呼伦贝尔市', '通辽市', '乌海市', '乌兰察布市', '锡林郭勒盟', '兴安盟'],
      ningxia: ['固原市', '石嘴山市', '吴忠市', '银川市', '中卫市'],
      qinghai: ['果洛州', '海北州', '海东市', '海南州', '海西州', '黄南州', '玉树市', '西宁市'],
      shandong: ['滨州市', '德州市', '东营市', '菏泽市', '济南市', '济宁市', '莱芜市', '聊城市', '青岛市', '日照市', '泰安市', '威海市', '潍坊市', '烟台市', '枣庄市', '淄博市'],
      shanxi: ['长治市', '大同市', '晋城市', '晋中市', '临汾市', '吕梁市', '朔州市', '太原市', '忻州市', '阳泉市', '运城市'],
      shaanxi: ['安康市', '宝鸡市', '汉中市', '商洛市', '铜川市', '渭南市', '西安市', '咸阳市', '延安市', '榆林市'],
      shanghai: ['上海市'],
      sichuan: ['阿坝州', '巴中市', '成都市', '达州市', '德阳市', '甘孜州', '广安市', '广元市', '乐山市', '凉山州', '泸州市', '眉山市', '绵阳市', '内江市', '南充市', '攀枝花市', '遂宁市', '雅安市', '宜宾市', '自贡市', '资阳市'],
      tianjin: ['天津市'],
      xinjiang: ['阿克苏地区', '阿拉尔市', '阿勒泰地区', '巴音郭楞州', '博尔塔拉州', '昌吉州', '哈密市', '和田地区', '喀什地区', '克拉玛依市', '石河子市', '图木舒克市', '吐鲁番地区', '乌鲁木齐市', '五家渠市', '伊犁州'],
      yunnan: ['保山市', '楚雄州', '大理州', '德宏州', '迪庆州', '红河州', '昆明市', '丽江市', '临沧市', '怒江州', '普洱市', '曲靖市', '文山州', '西双版纳州', '玉溪市', '昭通市'],
      zhejiang: ['杭州市', '湖州市', '嘉兴市', '金华市', '丽水市', '宁波市', '衢州市', '绍兴市', '台州市', '温州市', '舟山市']
    }
  }
};

// 通知组件
function Notification(_ref) {
  var msg = _ref.msg,
    type = _ref.type,
    onClose = _ref.onClose;
  useEffect(function () {
    var t = setTimeout(onClose, 3000);
    return function () {
      return clearTimeout(t);
    };
  }, [onClose]);
  var bg = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ".concat(bg, " max-w-sm")
  }, msg);
}

// 版位定投场景弹窗
function PlacementSceneModal(_ref2) {
  var placement = _ref2.placement,
    show = _ref2.show,
    onClose = _ref2.onClose,
    value = _ref2.value,
    onChange = _ref2.onChange;
  var _useState = useState('unlimited'),
    _useState2 = _slicedToArray(_useState, 2),
    mode = _useState2[0],
    setMode = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selected = _useState4[0],
    setSelected = _useState4[1];
  useEffect(function () {
    if (show) {
      if (value && value !== 'unlimited') {
        setMode('custom');
        setSelected(value.split(','));
      } else {
        setMode('unlimited');
        setSelected([]);
      }
    }
  }, [show, value]);
  if (!show) return null;
  var handleToggle = function handleToggle(id) {
    setSelected(function (prev) {
      return prev.includes(id) ? prev.filter(function (s) {
        return s !== id;
      }) : [].concat(_toConsumableArray(prev), [id]);
    });
  };
  var handleConfirm = function handleConfirm() {
    onChange(mode === 'unlimited' ? 'unlimited' : selected.join(','));
    onClose();
  };
  var isVideo = placement === 'wechat_video';
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content w-full max-w-2xl",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-4 border-b"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold"
  }, "\u7248\u4F4D\u5B9A\u6295\u573A\u666F"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-gray-400 hover:text-gray-600"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-times"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-b bg-gray-50"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "scene_mode",
    checked: mode === 'unlimited',
    onChange: function onChange() {
      return setMode('unlimited');
    },
    className: "mr-2"
  }), /*#__PURE__*/React.createElement("span", null, "\u4E0D\u9650")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer mt-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "scene_mode",
    checked: mode === 'custom',
    onChange: function onChange() {
      return setMode('custom');
    },
    className: "mr-2"
  }), /*#__PURE__*/React.createElement("span", null, "\u81EA\u5B9A\u4E49"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-y-auto flex-1 p-4",
    style: {
      maxHeight: '50vh'
    }
  }, mode === 'custom' && /*#__PURE__*/React.createElement(React.Fragment, null, isVideo && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-gray-700 mb-2"
  }, "\u89C6\u9891\u53F7\u5B9A\u6295\u573A\u666F"), MOCK.videoSceneOptions.map(function (opt) {
    return /*#__PURE__*/React.createElement("label", {
      key: opt.id,
      className: "flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: selected.includes(opt.id),
      onChange: function onChange() {
        return handleToggle(opt.id);
      },
      className: "mr-3"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm"
    }, opt.label), opt.tip && /*#__PURE__*/React.createElement("span", {
      className: "ml-2 text-gray-400 cursor-help",
      title: opt.tip
    }, "\u2753")));
  })), !isVideo && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, MOCK.mpSceneGroups.map(function (group, gi) {
    return /*#__PURE__*/React.createElement("div", {
      key: gi
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium text-gray-700 mb-2"
    }, group.groupName), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-2"
    }, group.options.map(function (opt) {
      return /*#__PURE__*/React.createElement("label", {
        key: opt.id,
        className: "flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: selected.includes(opt.id),
        onChange: function onChange() {
          return handleToggle(opt.id);
        },
        className: "mr-2"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-sm"
      }, opt.label));
    })));
  }))), mode === 'unlimited' && /*#__PURE__*/React.createElement("div", {
    className: "text-center text-gray-400 py-8"
  }, "\u5DF2\u9009\u62E9\"\u4E0D\u9650\"\uFF0C\u5C06\u6295\u653E\u5230\u6240\u6709\u53EF\u7528\u573A\u666F")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t flex justify-end gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "btn-secondary"
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("button", {
    onClick: handleConfirm,
    className: "btn-primary"
  }, "\u786E\u8BA4"))));
}

// 素材库弹窗（视频+图片，带排序和日期维度）
function MaterialModal(_ref3) {
  var show = _ref3.show,
    onClose = _ref3.onClose,
    onConfirm = _ref3.onConfirm,
    selectedMaterials = _ref3.selectedMaterials,
    accountId = _ref3.accountId;
  var _useState5 = useState('video'),
    _useState6 = _slicedToArray(_useState5, 2),
    activeTab = _useState6[0],
    setActiveTab = _useState6[1]; // 'video' | 'image'
  var _useState7 = useState('spend'),
    _useState8 = _slicedToArray(_useState7, 2),
    sortField = _useState8[0],
    setSortField = _useState8[1]; // 'spend' | 'ctr' | 'cvr'
  var _useState9 = useState('desc'),
    _useState0 = _slicedToArray(_useState9, 2),
    sortOrder = _useState0[0],
    setSortOrder = _useState0[1];
  var _useState1 = useState('7day'),
    _useState10 = _slicedToArray(_useState1, 2),
    timeRange = _useState10[0],
    setTimeRange = _useState10[1]; // 'yesterday' | '7day'
  var _useState11 = useState(1),
    _useState12 = _slicedToArray(_useState11, 2),
    page = _useState12[0],
    setPage = _useState12[1];
  var _useState13 = useState(''),
    _useState14 = _slicedToArray(_useState13, 2),
    batchInputText = _useState14[0],
    setBatchInputText = _useState14[1];
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    showBatchModal = _useState16[0],
    setShowBatchModal = _useState16[1];
  var _useState17 = useState(selectedMaterials.map(function (m) {
      return m.id;
    })),
    _useState18 = _slicedToArray(_useState17, 2),
    localSelected = _useState18[0],
    setLocalSelected = _useState18[1];
  var perPage = 50;
  useEffect(function () {
    if (show) {
      setLocalSelected(selectedMaterials.map(function (m) {
        return m.id;
      }));
      setPage(1);
    }
  }, [show, selectedMaterials]);
  var allMaterials = activeTab === 'video' ? MOCK.videoMaterials : MOCK.imageMaterials;

  // 排序
  var sorted = _toConsumableArray(allMaterials).sort(function (a, b) {
    var field = sortField;
    var multiplier = sortOrder === 'desc' ? -1 : 1;
    return (a[field] - b[field]) * multiplier;
  });
  var totalPages = Math.ceil(sorted.length / perPage);
  var paged = sorted.slice((page - 1) * perPage, page * perPage);
  var toggleSelect = function toggleSelect(id) {
    if (localSelected.includes(id)) {
      setLocalSelected(localSelected.filter(function (s) {
        return s !== id;
      }));
    } else {
      if (localSelected.length >= 100) {
        alert('最多选择100个素材');
        return;
      }
      setLocalSelected([].concat(_toConsumableArray(localSelected), [id]));
    }
  };
  var handleBatchInput = function handleBatchInput() {
    var ids = batchInputText.split(/[,，\s]+/).map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var added = 0;
    ids.forEach(function (token) {
      var found = allMaterials.find(function (m) {
        return m.id === token || m.name === token;
      });
      if (found && !localSelected.includes(found.id)) {
        if (localSelected.length + added >= 100) return;
        localSelected.push(found.id);
        added++;
      }
    });
    setLocalSelected(_toConsumableArray(localSelected));
    setBatchInputText('');
    alert("\u5DF2\u6279\u91CF\u6DFB\u52A0 ".concat(added, " \u4E2A\u7D20\u6750"));
  };
  var handleBatchModalInput = function handleBatchModalInput() {
    var ids = batchInputText.split(/[\n,，\s]+/).map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var added = 0;
    ids.forEach(function (token) {
      var found = allMaterials.find(function (m) {
        return m.id === token || m.name === token;
      });
      if (found && !localSelected.includes(found.id)) {
        if (localSelected.length + added >= 100) return;
        localSelected.push(found.id);
        added++;
      }
    });
    setLocalSelected(_toConsumableArray(localSelected));
    setBatchInputText('');
    setShowBatchModal(false);
    alert("\u5DF2\u6279\u91CF\u6DFB\u52A0 ".concat(added, " \u4E2A\u7D20\u6750"));
  };
  var handleConfirm = function handleConfirm() {
    var all = [].concat(_toConsumableArray(MOCK.videoMaterials), _toConsumableArray(MOCK.imageMaterials));
    var result = localSelected.map(function (id) {
      return all.find(function (m) {
        return m.id === id;
      });
    }).filter(Boolean);
    onConfirm(result);
    onClose();
  };
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content w-full max-w-6xl",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-4 border-b"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold"
  }, "\u9009\u62E9\u7D20\u6750\uFF08\u5DF2\u9009 ", localSelected.length, "/100\uFF09"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-gray-400 hover:text-gray-600"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-times"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-b bg-gray-50 flex flex-wrap items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex rounded-lg overflow-hidden border border-gray-300"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setActiveTab('video');
      setPage(1);
    },
    className: "px-4 py-2 text-sm ".concat(activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700')
  }, "\uD83C\uDFAC \u89C6\u9891\u7D20\u6750"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setActiveTab('image');
      setPage(1);
    },
    className: "px-4 py-2 text-sm ".concat(activeTab === 'image' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700')
  }, "\uD83D\uDDBC\uFE0F \u56FE\u7247\u7D20\u6750")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600"
  }, "\u6392\u5E8F\uFF1A"), /*#__PURE__*/React.createElement("select", {
    value: sortField,
    onChange: function onChange(e) {
      return setSortField(e.target.value);
    },
    className: "px-2 py-1 border border-gray-300 rounded text-sm"
  }, /*#__PURE__*/React.createElement("option", {
    value: "spend"
  }, "\u6D88\u8017"), /*#__PURE__*/React.createElement("option", {
    value: "ctr"
  }, "CTR"), /*#__PURE__*/React.createElement("option", {
    value: "cvr"
  }, "CVR")), /*#__PURE__*/React.createElement("select", {
    value: sortOrder,
    onChange: function onChange(e) {
      return setSortOrder(e.target.value);
    },
    className: "px-2 py-1 border border-gray-300 rounded text-sm"
  }, /*#__PURE__*/React.createElement("option", {
    value: "desc"
  }, "\u4ECE\u9AD8\u5230\u4F4E"), /*#__PURE__*/React.createElement("option", {
    value: "asc"
  }, "\u4ECE\u4F4E\u5230\u9AD8"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600"
  }, "\u65F6\u95F4\u7EF4\u5EA6\uFF1A"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "timeRange",
    value: "yesterday",
    checked: timeRange === 'yesterday',
    onChange: function onChange(e) {
      return setTimeRange(e.target.value);
    },
    className: "mr-1"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u6628\u65E5")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "timeRange",
    value: "7day",
    checked: timeRange === '7day',
    onChange: function onChange(e) {
      return setTimeRange(e.target.value);
    },
    className: "mr-1"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u8FD1\u4E03\u65E5"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 ml-auto"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: batchInputText,
    onChange: function onChange(e) {
      return setBatchInputText(e.target.value);
    },
    placeholder: "\u6279\u91CF\u8F93\u5165\u7D20\u6750ID\u6216\u540D\u79F0",
    className: "px-2 py-1 border border-gray-300 rounded text-sm w-48"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleBatchInput,
    className: "btn-secondary text-sm"
  }, "\u6279\u91CF\u6DFB\u52A0"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowBatchModal(true);
    },
    className: "btn-secondary text-sm bg-blue-50 text-blue-600 border-blue-300"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-list mr-1"
  }), "\u6279\u91CF\u9009\u62E9"))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 border-b flex items-center justify-between text-sm text-gray-600"
  }, /*#__PURE__*/React.createElement("span", null, "\u7B2C ", page, " / ", totalPages, " \u9875\uFF0C\u5171 ", sorted.length, " \u4E2A", activeTab === 'video' ? '视频' : '图片', "\u7D20\u6750"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var currentPageIds = paged.map(function (m) {
        return m.id;
      });
      var newSelected = _toConsumableArray(new Set([].concat(_toConsumableArray(localSelected), _toConsumableArray(currentPageIds))));
      if (newSelected.length > 100) {
        alert('最多选择100个素材');
        return;
      }
      setLocalSelected(newSelected);
    },
    className: "btn-secondary text-sm bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-check-square mr-1"
  }), "\u5168\u9009\u672C\u9875"), /*#__PURE__*/React.createElement("button", {
    disabled: page <= 1,
    onClick: function onClick() {
      return setPage(page - 1);
    },
    className: "btn-secondary text-sm",
    style: page <= 1 ? {
      opacity: 0.5,
      cursor: 'not-allowed'
    } : {}
  }, "\u4E0A\u4E00\u9875"), /*#__PURE__*/React.createElement("button", {
    disabled: page >= totalPages,
    onClick: function onClick() {
      return setPage(page + 1);
    },
    className: "btn-secondary text-sm",
    style: page >= totalPages ? {
      opacity: 0.5,
      cursor: 'not-allowed'
    } : {}
  }, "\u4E0B\u4E00\u9875"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-y-auto flex-1 p-4",
    style: {
      maxHeight: '50vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
  }, paged.map(function (m) {
    var isSelected = localSelected.includes(m.id);
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      onClick: function onClick() {
        return toggleSelect(m.id);
      },
      className: "border-2 rounded-lg p-3 cursor-pointer transition-all ".concat(isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50')
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-4xl text-center mb-2"
    }, m.thumb), /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-medium text-gray-900 text-center truncate"
    }, m.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 text-center"
    }, m.type === 'video' ? m.duration + ' | ' : '', m.size), /*#__PURE__*/React.createElement("div", {
      className: "mt-2 space-y-1 text-xs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u6D88\u8017\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-orange-600"
    }, "\xA5", m.spend.toFixed(2))), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "CTR\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-blue-600"
    }, m.ctr, "%")), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "CVR\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-green-600"
    }, m.cvr, "%"))), isSelected && /*#__PURE__*/React.createElement("div", {
      className: "text-center mt-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-check-circle text-blue-500"
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600"
  }, "\u5DF2\u9009\u62E9 ", localSelected.length, " \u4E2A\u7D20\u6750\uFF08\u53EF\u591A\u6B21\u9009\u62E9\uFF0C\u7D2F\u8BA1\u6700\u591A100\u4E2A\uFF09"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      onConfirm(localSelected.map(function (id) {
        return [].concat(_toConsumableArray(MOCK.videoMaterials), _toConsumableArray(MOCK.imageMaterials)).find(function (m) {
          return m.id === id;
        });
      }).filter(Boolean));
      setLocalSelected([]);
    },
    className: "btn-secondary text-sm"
  }, "\u6E05\u7A7A\u91CD\u9009"), /*#__PURE__*/React.createElement("button", {
    onClick: handleConfirm,
    className: "btn-primary"
  }, "\u786E\u8BA4\u9009\u62E9")))), showBatchModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    style: {
      zIndex: 60
    },
    onClick: function onClick() {
      return setShowBatchModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-6 w-full max-w-lg",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-lg font-bold"
  }, "\u6279\u91CF\u9009\u62E9\u7D20\u6750"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowBatchModal(false);
    },
    className: "text-gray-400 hover:text-gray-600"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-times"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mb-3"
  }, "\u8BF7\u8F93\u5165\u7D20\u6750ID\u6216\u540D\u79F0\uFF0C\u6BCF\u884C\u4E00\u4E2A\u6216\u7528\u9017\u53F7/\u7A7A\u683C\u5206\u9694"), /*#__PURE__*/React.createElement("textarea", {
    value: batchInputText,
    onChange: function onChange(e) {
      return setBatchInputText(e.target.value);
    },
    placeholder: "\u4F8B\u5982\uFF1A\nvm_001\nvm_002\n\u7D20\u6750A",
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-4",
    rows: "6"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowBatchModal(false);
    },
    className: "btn-secondary"
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("button", {
    onClick: handleBatchModalInput,
    className: "btn-primary"
  }, "\u786E\u8BA4\u6DFB\u52A0")))));
}

// 文案库弹窗（支持批量选择 + 添加文案，无CTR）
function CopyModal(_ref4) {
  var show = _ref4.show,
    onClose = _ref4.onClose,
    onConfirm = _ref4.onConfirm,
    selectedCopies = _ref4.selectedCopies;
  var _useState19 = useState(selectedCopies.map(function (c) {
      return c.id;
    })),
    _useState20 = _slicedToArray(_useState19, 2),
    localSelected = _useState20[0],
    setLocalSelected = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    showAddForm = _useState22[0],
    setShowAddForm = _useState22[1];
  var _useState23 = useState(''),
    _useState24 = _slicedToArray(_useState23, 2),
    newCopyContent = _useState24[0],
    setNewCopyContent = _useState24[1];
  var _useState25 = useState(MOCK.copyLibrary),
    _useState26 = _slicedToArray(_useState25, 2),
    copies = _useState26[0],
    setCopies = _useState26[1];
  useEffect(function () {
    if (show) {
      setLocalSelected(selectedCopies.map(function (c) {
        return c.id;
      }));
      setShowAddForm(false);
      setNewCopyContent('');
    }
  }, [show, selectedCopies]);
  var toggleSelect = function toggleSelect(id) {
    if (localSelected.includes(id)) {
      setLocalSelected(localSelected.filter(function (s) {
        return s !== id;
      }));
    } else {
      setLocalSelected([].concat(_toConsumableArray(localSelected), [id]));
    }
  };
  var handleAddCopy = function handleAddCopy() {
    if (!newCopyContent.trim()) return;
    var newCopy = {
      id: "c_".concat(Date.now()),
      content: newCopyContent.trim(),
      ctr: 0
    };
    setCopies([newCopy].concat(_toConsumableArray(copies)));
    setLocalSelected([].concat(_toConsumableArray(localSelected), [newCopy.id]));
    setNewCopyContent('');
    setShowAddForm(false);
  };
  var handleBatchInput = function handleBatchInput() {
    var input = prompt('请输入文案内容，每行一条：');
    if (!input) return;
    var lines = input.split('\n').map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var newCopies = lines.map(function (content, i) {
      return {
        id: "c_batch_".concat(Date.now(), "_").concat(i),
        content: content,
        ctr: 0
      };
    });
    setCopies([].concat(_toConsumableArray(newCopies), _toConsumableArray(copies)));
    setLocalSelected([].concat(_toConsumableArray(localSelected), _toConsumableArray(newCopies.map(function (c) {
      return c.id;
    }))));
  };
  var handleConfirm = function handleConfirm() {
    var result = localSelected.map(function (id) {
      return copies.find(function (c) {
        return c.id === id;
      });
    }).filter(Boolean);
    onConfirm(result);
    onClose();
  };
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content w-full max-w-2xl",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-4 border-b"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold"
  }, "\u9009\u62E9\u5E7F\u544A\u6587\u6848\uFF08\u5DF2\u9009 ", localSelected.length, " \u6761\uFF0C\u652F\u6301\u591A\u9009\uFF09"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-gray-400 hover:text-gray-600"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-times"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-2 border-b bg-gray-50 flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAddForm(!showAddForm);
    },
    className: "btn-secondary text-sm"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-plus mr-1"
  }), showAddForm ? '收起' : '添加文案'), /*#__PURE__*/React.createElement("button", {
    onClick: handleBatchInput,
    className: "btn-secondary text-sm"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-list mr-1"
  }), "\u6279\u91CF\u6DFB\u52A0")), showAddForm && /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-b bg-blue-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 items-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs text-gray-600 mb-1"
  }, "\u6587\u6848\u5185\u5BB9"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: newCopyContent,
    onChange: function onChange(e) {
      return setNewCopyContent(e.target.value);
    },
    placeholder: "\u8F93\u5165\u6587\u6848\u5185\u5BB9",
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleAddCopy,
    className: "btn-primary text-sm"
  }, "\u6DFB\u52A0"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-y-auto flex-1 p-4",
    style: {
      maxHeight: '55vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, _toConsumableArray(copies).map(function (copy) {
    var isSelected = localSelected.includes(copy.id);
    return /*#__PURE__*/React.createElement("div", {
      key: copy.id,
      onClick: function onClick() {
        return toggleSelect(copy.id);
      },
      className: "p-3 border-2 rounded-lg cursor-pointer transition-all ".concat(isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300')
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-900"
    }, copy.content)), isSelected && /*#__PURE__*/React.createElement("div", {
      className: "text-right mt-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-check-circle text-blue-500"
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600"
  }, "\u5DF2\u9009\u62E9 ", localSelected.length, " \u6761\u6587\u6848"), /*#__PURE__*/React.createElement("button", {
    onClick: handleConfirm,
    className: "btn-primary"
  }, "\u786E\u8BA4\u9009\u62E9"))));
}

// 周历时间网格组件
// 最小单位：1小时（视觉上每1小时分2个0.5h格子，共48列/天）
function TimeGrid(_ref5) {
  var value = _ref5.value,
    onChange = _ref5.onChange;
  var DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  var HOURS = Array.from({
    length: 24
  }, function (_, i) {
    return i;
  }); // 0~23 整点
  var TOTAL_SLOTS = 48; // 48个0.5h格子（每天）
  var SLOTS_PER_HOUR = 2; // 每1小时=2个格子

  // value format: { "0-0": true/false, ... } where key is "dayIndex-slotIndex", slotIndex=0..47
  var _useState27 = useState(value || {}),
    _useState28 = _slicedToArray(_useState27, 2),
    slots = _useState28[0],
    setSlots = _useState28[1];
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    isSelecting = _useState30[0],
    setIsSelecting = _useState30[1];
  var _useState31 = useState(null),
    _useState32 = _slicedToArray(_useState31, 2),
    selectStart = _useState32[0],
    setSelectStart = _useState32[1];
  useEffect(function () {
    if (value) setSlots(value);
  }, [value]);

  // 单击切换单个0.5h格子
  var handleCellClick = function handleCellClick(dayIdx, slotIdx) {
    var key = "".concat(dayIdx, "-").concat(slotIdx);
    var newSlots = _objectSpread({}, slots);
    newSlots[key] = !newSlots[key];
    setSlots(newSlots);
    onChange(newSlots);
  };

  // 鼠标按下（开始拖选，切换单个0.5h格子）
  var handleMouseDown = function handleMouseDown(dayIdx, slotIdx) {
    setIsSelecting(true);
    setSelectStart({
      dayIdx: dayIdx,
      slotIdx: slotIdx
    });
    var key = "".concat(dayIdx, "-").concat(slotIdx);
    var newSlots = _objectSpread({}, slots);
    newSlots[key] = !newSlots[key];
    setSlots(newSlots);
    onChange(newSlots);
  };
  var handleMouseEnter = function handleMouseEnter(dayIdx, slotIdx) {
    if (!isSelecting || !selectStart) return;
    var newSlots = _objectSpread({}, slots);
    var startDay = Math.min(selectStart.dayIdx, dayIdx);
    var endDay = Math.max(selectStart.dayIdx, dayIdx);
    var startSlot = Math.min(selectStart.slotIdx, slotIdx);
    var endSlot = Math.max(selectStart.slotIdx, slotIdx);
    var startKey = "".concat(selectStart.dayIdx, "-").concat(selectStart.slotIdx);
    var shouldSet = !!slots[startKey];
    for (var d = startDay; d <= endDay; d++) {
      for (var s = startSlot; s <= endSlot; s++) {
        newSlots["".concat(d, "-").concat(s)] = shouldSet;
      }
    }
    setSlots(newSlots);
    onChange(newSlots);
  };
  var handleMouseUp = function handleMouseUp() {
    setIsSelecting(false);
    setSelectStart(null);
  };
  useEffect(function () {
    if (isSelecting) {
      document.addEventListener('mouseup', handleMouseUp);
      return function () {
        return document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isSelecting]);
  var clearAll = function clearAll() {
    setSlots({});
    onChange({});
  };

  // 将slot索引转为时间字符串 "HH:MM"
  var slotToTime = function slotToTime(slotIdx) {
    var h = Math.floor(slotIdx / SLOTS_PER_HOUR);
    var m = slotIdx % SLOTS_PER_HOUR * 30;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  };

  // 生成选中时间段描述文字（按0.5h合并，显示每个格子的起止时间）
  var buildSelectedText = function buildSelectedText() {
    var parts = [];
    for (var di = 0; di < 7; di++) {
      var dayRanges = [];
      var rangeStart = null;
      for (var si = 0; si <= TOTAL_SLOTS; si++) {
        var key = "".concat(di, "-").concat(si);
        var isSelected = si < TOTAL_SLOTS ? !!slots[key] : false;
        if (isSelected) {
          if (rangeStart === null) rangeStart = si;
        } else {
          if (rangeStart !== null) {
            // 结束时间 = 该段最后一个格子的结束时间（即下一个格子的开始时间）
            var endSi = si; // si 是第一个未选中的格子
            dayRanges.push(slotToTime(rangeStart) + '-' + slotToTime(endSi));
            rangeStart = null;
          }
        }
      }
      if (dayRanges.length > 0) {
        parts.push(DAYS[di] + ' ' + dayRanges.join('、'));
      }
    }
    return parts.length > 0 ? parts.join('；') : '';
  };
  var selectedText = buildSelectedText();

  // 计算tooltip文本（显示鼠标所在格子的完整时间段）
  var getTooltip = function getTooltip(dayIdx, slotIdx) {
    // 找到包含当前格子的连续选中区间
    var rangeStart = slotIdx,
      rangeEnd = slotIdx;
    while (rangeStart > 0 && slots["".concat(dayIdx, "-").concat(rangeStart - 1)]) rangeStart--;
    while (rangeEnd < TOTAL_SLOTS - 1 && slots["".concat(dayIdx, "-").concat(rangeEnd + 1)]) rangeEnd++;
    // 只在这个格子被选中时才显示 tooltip
    if (!slots["".concat(dayIdx, "-").concat(slotIdx)]) return '';
    return "".concat(DAYS[dayIdx], " ").concat(slotToTime(rangeStart), "-").concat(slotToTime(rangeEnd + 1));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    cellSpacing: 0,
    cellPadding: 0,
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px',
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#fafafa'
    }
  }, /*#__PURE__*/React.createElement("th", {
    rowSpan: 2,
    style: {
      width: '60px',
      borderRight: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb',
      padding: '8px 4px',
      textAlign: 'center',
      fontSize: '12px',
      color: '#666',
      fontWeight: 400
    }
  }, "\u661F\u671F\\\u65F6\u95F4"), /*#__PURE__*/React.createElement("th", {
    colSpan: 24,
    style: {
      textAlign: 'center',
      fontSize: '12px',
      color: '#666',
      padding: '6px 2px',
      borderBottom: '1px solid #e5e7eb',
      width: '50%'
    }
  }, "00:00 - 12:00"), /*#__PURE__*/React.createElement("th", {
    colSpan: 24,
    style: {
      textAlign: 'center',
      fontSize: '12px',
      color: '#666',
      padding: '6px 2px',
      borderBottom: '1px solid #e5e7eb',
      borderLeft: '1px solid #e5e7eb',
      width: '50%'
    }
  }, "12:00 - 24:00")), /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#fafafa'
    }
  }, HOURS.map(function (h) {
    return /*#__PURE__*/React.createElement("th", {
      key: h,
      colSpan: 2,
      style: {
        textAlign: 'center',
        fontSize: '11px',
        color: '#999',
        fontWeight: 400,
        padding: '2px 0',
        borderBottom: '1px solid #e5e7eb',
        borderRight: h === 11 || h === 23 ? '1px solid #e5e7eb' : '1px solid #f0f0f0'
      }
    }, h);
  }))), /*#__PURE__*/React.createElement("tbody", null, DAYS.map(function (day, di) {
    return /*#__PURE__*/React.createElement("tr", {
      key: di
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        borderRight: '1px solid #e5e7eb',
        borderBottom: di === 6 ? 'none' : '1px solid #e5e7eb',
        padding: '6px 4px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#333',
        fontWeight: 500,
        background: '#fafafa',
        whiteSpace: 'nowrap'
      }
    }, day), Array.from({
      length: TOTAL_SLOTS
    }, function (_, si) {
      var key = "".concat(di, "-").concat(si);
      var isSelected = !!slots[key];
      var isHourBoundary = si % SLOTS_PER_HOUR === 0; // 整点边界
      var isNoonBoundary = si === 24; // 正午分隔
      return /*#__PURE__*/React.createElement("td", {
        key: si,
        onMouseDown: function onMouseDown() {
          return handleMouseDown(di, si);
        },
        onMouseEnter: function onMouseEnter() {
          return handleMouseEnter(di, si);
        },
        title: isSelected ? getTooltip(di, si) : "".concat(day, " ").concat(slotToTime(si)),
        style: {
          cursor: 'pointer',
          borderBottom: di === 6 ? 'none' : '1px solid #f5f5f5',
          borderRight: isNoonBoundary ? '2px solid #e5e7eb' : isHourBoundary ? '1px solid #e5e7eb' : '1px solid #f0f0f0',
          padding: 0,
          userSelect: 'none',
          width: '2.0833%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%',
          height: '26px',
          margin: '1px 0',
          borderRadius: '2px',
          backgroundColor: isSelected ? '#3b82f6' : '#f9fafb'
        },
        onMouseEnter: function onMouseEnter(e) {
          if (!isSelected) e.target.style.backgroundColor = '#dbeafe';
        },
        onMouseLeave: function onMouseLeave(e) {
          if (!isSelected) e.target.style.backgroundColor = '#f9fafb';
        }
      }));
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      background: '#fafafa',
      borderTop: '1px solid #e5e7eb'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      fontSize: '12px',
      color: '#666'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '14px',
      height: '14px',
      borderRadius: '2px',
      background: '#3b82f6'
    }
  }), "\u5DF2\u9009"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '14px',
      height: '14px',
      borderRadius: '2px',
      background: '#f9fafb',
      border: '1px solid #e5e7eb'
    }
  }), "\u672A\u9009")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, selectedText ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: '#333',
      maxWidth: '480px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    title: selectedText
  }, selectedText) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: '#999'
    }
  }, "\u672A\u9009\u62E9\u4EFB\u4F55\u65F6\u6BB5"), /*#__PURE__*/React.createElement("button", {
    onClick: clearAll,
    style: {
      fontSize: '12px',
      color: '#3b82f6',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '0'
    }
  }, "\u6E05\u7A7A"))));
}
// 主应用
function App() {
  var _MOCK$regionCascade$p;
  // ===== 基础配置 =====
  // 省份 ID -> 中文名称映射
  var provinceNameMap = {};
  (MOCK.regionCascade.provinces['cn'] || []).forEach(function (p) {
    provinceNameMap[p.id] = p.name;
  });
  var getProvinceNames = function getProvinceNames(ids) {
    return ids.map(function (id) {
      return provinceNameMap[id] || id;
    }).join('、');
  };
  // 获取所有已选城市名称
  var getSelectedCityNames = function getSelectedCityNames() {
    var cities = [];
    Object.values(geoSelectedCities).forEach(function (cityList) {
      cities.push.apply(cities, _toConsumableArray(cityList));
    });
    return cities.length > 0 ? cities.join('、') : '不限';
  };
  var _useState33 = useState('benefit_A'),
    _useState34 = _slicedToArray(_useState33, 2),
    businessType = _useState34[0],
    setBusinessType = _useState34[1];
  var _useState35 = useState('gdt'),
    _useState36 = _slicedToArray(_useState35, 2),
    channel = _useState36[0],
    setChannel = _useState36[1];
  var _useState37 = useState([]),
    _useState38 = _slicedToArray(_useState37, 2),
    selectedAccountIds = _useState38[0],
    setSelectedAccountIds = _useState38[1];
  var _useState39 = useState(''),
    _useState40 = _slicedToArray(_useState39, 2),
    batchInputText = _useState40[0],
    setBatchInputText = _useState40[1];
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    showBatchInput = _useState42[0],
    setShowBatchInput = _useState42[1];
  var _useState43 = useState(false),
    _useState44 = _slicedToArray(_useState43, 2),
    showAccountDropdown = _useState44[0],
    setShowAccountDropdown = _useState44[1];

  // ===== 营销单元配置 =====
  var _useState45 = useState('sp_001'),
    _useState46 = _slicedToArray(_useState45, 2),
    specificProduct = _useState46[0],
    setSpecificProduct = _useState46[1];
  var _useState47 = useState('wechat_video'),
    _useState48 = _slicedToArray(_useState47, 2),
    placement = _useState48[0],
    setPlacement = _useState48[1];
  var _useState49 = useState(''),
    _useState50 = _slicedToArray(_useState49, 2),
    placementScene = _useState50[0],
    setPlacementScene = _useState50[1];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    showPlacementModal = _useState52[0],
    setShowPlacementModal = _useState52[1];
  // ===== 营销单元配置 - 定向相关 =====
  var _useState53 = useState('package'),
    _useState54 = _slicedToArray(_useState53, 2),
    targetingSource = _useState54[0],
    setTargetingSource = _useState54[1];
  // 用户自建定向包（从 localStorage 读取，与 index.html 共用 ad_targeting_packages）
  var _useState55 = useState([]),
    _useState56 = _slicedToArray(_useState55, 2),
    userTgtPkgs = _useState56[0],
    setUserTgtPkgs = _useState56[1];
  var _useState57 = useState(false),
    _useState58 = _slicedToArray(_useState57, 2),
    showSaveTgtPkgModal = _useState58[0],
    setShowSaveTgtPkgModal = _useState58[1];
  var _useState59 = useState(''),
    _useState60 = _slicedToArray(_useState59, 2),
    saveTgtPkgName = _useState60[0],
    setSaveTgtPkgName = _useState60[1];
  // 加载自建定向包
  useEffect(function () {
    try {
      var raw = localStorage.getItem('ad_targeting_packages');
      if (raw) setUserTgtPkgs(JSON.parse(raw));
    } catch (e) {}
  }, []);
  // 保存自建定向包
  var doSaveAsTgtPkg = function doSaveAsTgtPkg() {
    if (!saveTgtPkgName.trim()) return;
    var now = Date.now();
    var pkg = {
      id: 'user_tp_' + now,
      name: saveTgtPkgName.trim(),
      region: geoMode === 'unlimited' ? '不限' : geoMode === 'region' ? getProvinceNames(geoSelectedProvinces) : '地图选择',
      age: ageSelections.includes('unlimited') ? '不限' : ageSelections.join(','),
      gender: genderSelection === 'unlimited' ? '不限' : genderSelection,
      excludeConverted: excludeConvertedMode,
      audienceMode: audienceMode,
      targetAudiences: selectedTargetAudiences,
      excludeAudiences: selectedExcludeAudiences,
      conversionBehavior: conversionBehavior,
      conversionTimeRange: conversionTimeRange
    };
    var updated = [].concat(_toConsumableArray(userTgtPkgs), [pkg]);
    setUserTgtPkgs(updated);
    localStorage.setItem('ad_targeting_packages', JSON.stringify(updated));
    setSaveTgtPkgName('');
    setShowSaveTgtPkgModal(false);
    notify('定向包已保存', 'success');
  };
  // 删除自建定向包
  var deleteUserTgtPkg = function deleteUserTgtPkg(id) {
    var updated = userTgtPkgs.filter(function (p) {
      return p.id !== id;
    });
    setUserTgtPkgs(updated);
    localStorage.setItem('ad_targeting_packages', JSON.stringify(updated));
    // 同时从已选中移除
    setSelectedTargetingPackages(selectedTargetingPackages.filter(function (tid) {
      return tid !== id;
    }));
  };
  // 改为多选：支持定向包组合（同账户不同定向包 = 多个单元）
  var _useState61 = useState([]),
    _useState62 = _slicedToArray(_useState61, 2),
    selectedTargetingPackages = _useState62[0],
    setSelectedTargetingPackages = _useState62[1];
  // 自定义定向 - 地理位置级联
  var _useState63 = useState('region'),
    _useState64 = _slicedToArray(_useState63, 2),
    geoMode = _useState64[0],
    setGeoMode = _useState64[1]; // 'unlimited' | 'region'
  var _useState65 = useState('cn'),
    _useState66 = _slicedToArray(_useState65, 2),
    geoSelectedCountry = _useState66[0],
    setGeoSelectedCountry = _useState66[1];
  // 默认全选所有省份+城市
  var defaultProvinceIds = (MOCK.regionCascade.provinces['cn'] || []).map(function (p) {
    return p.id;
  });
  var defaultCitiesMap = {};
  defaultProvinceIds.forEach(function (pid) {
    defaultCitiesMap[pid] = _toConsumableArray(MOCK.regionCascade.cities[pid] || []);
  });
  var _useState67 = useState(defaultProvinceIds),
    _useState68 = _slicedToArray(_useState67, 2),
    geoSelectedProvinces = _useState68[0],
    setGeoSelectedProvinces = _useState68[1];
  var _useState69 = useState(defaultCitiesMap),
    _useState70 = _slicedToArray(_useState69, 2),
    geoSelectedCities = _useState70[0],
    setGeoSelectedCities = _useState70[1]; // { provinceId: [city1, city2] }
  var _useState71 = useState(defaultProvinceIds[0] || ''),
    _useState72 = _slicedToArray(_useState71, 2),
    activeProvinceId = _useState72[0],
    setActiveProvinceId = _useState72[1]; // 默认选中第一个省份，右侧显示城市列表
  // 地点类型（只保留常住地）
  var _useState73 = useState(true),
    _useState74 = _slicedToArray(_useState73, 2),
    locationTypeResident = _useState74[0],
    setLocationTypeResident = _useState74[1];

  // 地理位置：默认全选所有省份+城市
  var selectAllProvinceAndCities = function selectAllProvinceAndCities() {
    var allProvinceIds = (MOCK.regionCascade.provinces['cn'] || []).map(function (p) {
      return p.id;
    });
    var allCitiesMap = {};
    allProvinceIds.forEach(function (pid) {
      allCitiesMap[pid] = _toConsumableArray(MOCK.regionCascade.cities[pid] || []);
    });
    setGeoSelectedProvinces(allProvinceIds);
    setGeoSelectedCities(allCitiesMap);
    setActiveProvinceId(allProvinceIds.length > 0 ? allProvinceIds[0] : '');
  };

  // 年龄
  var _useState75 = useState(['unlimited']),
    _useState76 = _slicedToArray(_useState75, 2),
    ageSelections = _useState76[0],
    setAgeSelections = _useState76[1]; // array of selected age keys
  var _useState77 = useState(''),
    _useState78 = _slicedToArray(_useState77, 2),
    customAgeMin = _useState78[0],
    setCustomAgeMin = _useState78[1];
  var _useState79 = useState(''),
    _useState80 = _slicedToArray(_useState79, 2),
    customAgeMax = _useState80[0],
    setCustomAgeMax = _useState80[1];
  // 性别
  var _useState81 = useState('unlimited'),
    _useState82 = _slicedToArray(_useState81, 2),
    genderSelection = _useState82[0],
    setGenderSelection = _useState82[1]; // 'unlimited' | 'male' | 'female'
  // 自定义人群
  var _useState83 = useState('unlimited'),
    _useState84 = _slicedToArray(_useState83, 2),
    audienceMode = _useState84[0],
    setAudienceMode = _useState84[1]; // 'unlimited' | 'target' | 'exclude'
  // 自定义人群 - 已选列表
  var _useState85 = useState([]),
    _useState86 = _slicedToArray(_useState85, 2),
    selectedTargetAudiences = _useState86[0],
    setSelectedTargetAudiences = _useState86[1];
  var _useState87 = useState([]),
    _useState88 = _slicedToArray(_useState87, 2),
    selectedExcludeAudiences = _useState88[0],
    setSelectedExcludeAudiences = _useState88[1];
  // 人群包列表（可刷新）
  var _useState89 = useState(_toConsumableArray(MOCK.customAudiences)),
    _useState90 = _slicedToArray(_useState89, 2),
    audiencePackageList = _useState90[0],
    setAudiencePackageList = _useState90[1];
  var _useState91 = useState(_toConsumableArray(MOCK.excludeConversions)),
    _useState92 = _slicedToArray(_useState91, 2),
    excludeAudiencePackageList = _useState92[0],
    setExcludeAudiencePackageList = _useState92[1];
  var refreshAudiencePackages = function refreshAudiencePackages() {
    setAudiencePackageList(_toConsumableArray(MOCK.customAudiences));
    notify('定向人群包列表已刷新', 'success');
  };
  var refreshExcludeAudiencePackages = function refreshExcludeAudiencePackages() {
    setExcludeAudiencePackageList(_toConsumableArray(MOCK.excludeConversions));
    notify('排除人群包列表已刷新', 'success');
  };
  // 排除已转化用户
  var _useState93 = useState('unlimited'),
    _useState94 = _slicedToArray(_useState93, 2),
    excludeConvertedMode = _useState94[0],
    setExcludeConvertedMode = _useState94[1];
  // 转化行为
  var _useState95 = useState('optimize'),
    _useState96 = _slicedToArray(_useState95, 2),
    conversionBehavior = _useState96[0],
    setConversionBehavior = _useState96[1]; // 'optimize' | 'custom'
  // 转化时间区间
  var _useState97 = useState('7day'),
    _useState98 = _slicedToArray(_useState97, 2),
    conversionTimeRange = _useState98[0],
    setConversionTimeRange = _useState98[1]; // 'today' | '7day' | '1month' | '3month' | '6month'
  var _useState99 = useState(''),
    _useState100 = _slicedToArray(_useState99, 2),
    bidAmount = _useState100[0],
    setBidAmount = _useState100[1];
  var _useState101 = useState(''),
    _useState102 = _slicedToArray(_useState101, 2),
    dailyBudget = _useState102[0],
    setDailyBudget = _useState102[1];
  var _useState103 = useState(false),
    _useState104 = _slicedToArray(_useState103, 2),
    onePartyData = _useState104[0],
    setOnePartyData = _useState104[1]; // 默认关闭，且锁定
  var _useState105 = useState(false),
    _useState106 = _slicedToArray(_useState105, 2),
    quickLaunch = _useState106[0],
    setQuickLaunch = _useState106[1];
  var _useState107 = useState(''),
    _useState108 = _slicedToArray(_useState107, 2),
    quickLaunchBudget = _useState108[0],
    setQuickLaunchBudget = _useState108[1];
  var _useState109 = useState('long_term'),
    _useState110 = _slicedToArray(_useState109, 2),
    投放日期类型 = _useState110[0],
    set投放日期类型 = _useState110[1]; // 'long_term' | 'custom'
  var _useState111 = useState('2026-07-01'),
    _useState112 = _slicedToArray(_useState111, 2),
    长期投放日期 = _useState112[0],
    set长期投放日期 = _useState112[1];
  var _useState113 = useState(''),
    _useState114 = _slicedToArray(_useState113, 2),
    自定义开始日期 = _useState114[0],
    set自定义开始日期 = _useState114[1];
  var _useState115 = useState(''),
    _useState116 = _slicedToArray(_useState115, 2),
    自定义结束日期 = _useState116[0],
    set自定义结束日期 = _useState116[1];
  var _useState117 = useState('multi_slot'),
    _useState118 = _slicedToArray(_useState117, 2),
    投放时段模式 = _useState118[0],
    set投放时段模式 = _useState118[1]; // 'all_day' | 'time_range' | 'multi_slot'
  var _useState119 = useState(''),
    _useState120 = _slicedToArray(_useState119, 2),
    timeRangeStart = _useState120[0],
    setTimeRangeStart = _useState120[1];
  var _useState121 = useState(''),
    _useState122 = _slicedToArray(_useState121, 2),
    timeRangeEnd = _useState122[0],
    setTimeRangeEnd = _useState122[1];
  var _useState123 = useState({}),
    _useState124 = _slicedToArray(_useState123, 2),
    timeGridSlots = _useState124[0],
    setTimeGridSlots = _useState124[1];
  var _useState125 = useState(false),
    _useState126 = _slicedToArray(_useState125, 2),
    首日开始 = _useState126[0],
    set首日开始 = _useState126[1];
  var _useState127 = useState('00:00'),
    _useState128 = _slicedToArray(_useState127, 2),
    首日开始时间值 = _useState128[0],
    set首日开始时间值 = _useState128[1];
  var _useState129 = useState(''),
    _useState130 = _slicedToArray(_useState129, 2),
    unitName = _useState130[0],
    setUnitName = _useState130[1];
  var _useState131 = useState(false),
    _useState132 = _slicedToArray(_useState131, 2),
    showNameVarDropdown = _useState132[0],
    setShowNameVarDropdown = _useState132[1];
  var nameVariables = ['日期', '定向包名称', '版位', '创建人'];

  // ===== 创意配置 =====
  var _useState133 = useState(false),
    _useState134 = _slicedToArray(_useState133, 2),
    creativeMax = _useState134[0],
    setCreativeMax = _useState134[1];
  var _useState135 = useState(false),
    _useState136 = _slicedToArray(_useState135, 2),
    creativeEnhanceMax = _useState136[0],
    setCreativeEnhanceMax = _useState136[1];
  var _useState137 = useState(''),
    _useState138 = _slicedToArray(_useState137, 2),
    creativeName = _useState138[0],
    setCreativeName = _useState138[1];
  var creativeNameVariables = ['日期', '素材名称', '素材类型'];
  var _useState139 = useState([]),
    _useState140 = _slicedToArray(_useState139, 2),
    selectedMaterials = _useState140[0],
    setSelectedMaterials = _useState140[1]; // {id, name, type, ...}
  var _useState141 = useState([]),
    _useState142 = _slicedToArray(_useState141, 2),
    selectedCopies = _useState142[0],
    setSelectedCopies = _useState142[1];
  var _useState143 = useState('average'),
    _useState144 = _slicedToArray(_useState143, 2),
    videoStrategy = _useState144[0],
    setVideoStrategy = _useState144[1];
  var _useState145 = useState('average'),
    _useState146 = _slicedToArray(_useState145, 2),
    copyStrategy = _useState146[0],
    setCopyStrategy = _useState146[1];
  var _useState147 = useState(''),
    _useState148 = _slicedToArray(_useState147, 2),
    landingPageMacro = _useState148[0],
    setLandingPageMacro = _useState148[1];
  var _useState149 = useState(false),
    _useState150 = _slicedToArray(_useState149, 2),
    showMaterialModal = _useState150[0],
    setShowMaterialModal = _useState150[1];
  var _useState151 = useState(false),
    _useState152 = _slicedToArray(_useState151, 2),
    showCopyModal = _useState152[0],
    setShowCopyModal = _useState152[1];
  // 创意数量分配
  var _useState153 = useState('cross_join'),
    _useState154 = _slicedToArray(_useState153, 2),
    creativeComposeMode = _useState154[0],
    setCreativeComposeMode = _useState154[1]; // 'cross_join' | 'fixed'
  var _useState155 = useState({
      videos: 1,
      images: 1,
      copies: 1
    }),
    _useState156 = _slicedToArray(_useState155, 2),
    composeRule = _useState156[0],
    setComposeRule = _useState156[1];

  // ===== 预览 =====
  var _useState157 = useState(false),
    _useState158 = _slicedToArray(_useState157, 2),
    showPreview = _useState158[0],
    setShowPreview = _useState158[1];
  var _useState159 = useState(null),
    _useState160 = _slicedToArray(_useState159, 2),
    notification = _useState160[0],
    setNotification = _useState160[1];
  var notify = function notify(msg) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    return setNotification({
      msg: msg,
      type: type
    });
  };

  // 账户选择
  var toggleAccount = function toggleAccount(id) {
    if (selectedAccountIds.includes(id)) {
      setSelectedAccountIds(selectedAccountIds.filter(function (a) {
        return a !== id;
      }));
    } else {
      setSelectedAccountIds([].concat(_toConsumableArray(selectedAccountIds), [id]));
    }
  };
  var handleBatchInput = function handleBatchInput() {
    var tokens = batchInputText.split(/[,，\s]+/).map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var matched = [];
    tokens.forEach(function (t) {
      var byId = MOCK.accounts.find(function (a) {
        return a.id === t;
      });
      if (byId) {
        matched.push(byId.id);
        return;
      }
      var byName = MOCK.accounts.find(function (a) {
        return a.name.includes(t);
      });
      if (byName) {
        matched.push(byName.id);
        return;
      }
    });
    var newIds = _toConsumableArray(new Set([].concat(_toConsumableArray(selectedAccountIds), matched)));
    setSelectedAccountIds(newIds);
    setBatchInputText('');
    setShowBatchInput(false);
    notify("\u5DF2\u6DFB\u52A0 ".concat(matched.length, " \u4E2A\u8D26\u6237\uFF0C\u5171\u9009\u62E9 ").concat(newIds.length, " \u4E2A"));
  };

  // 获取当前账户默认落地页（已拼接宏参数）
  var getDefaultLandingPage = function getDefaultLandingPage(accountId) {
    var acc = MOCK.accounts.find(function (a) {
      return a.id === accountId;
    });
    if (!acc) return '';
    return acc.kaboshi + '?click_id={click_id}&ad_id={ad_id}';
  };

  // 生成创意组合（考虑定向包组合）
  var getCreativeCombos = function getCreativeCombos() {
    if (selectedMaterials.length === 0 || selectedCopies.length === 0) return [];
    var combos = [];
    // 每个定向包 × 每个素材 × 每个文案 = 一个创意
    var tpCount = selectedTargetingPackages.length || 1; // 若未选定向包，默认为1
    for (var t = 0; t < Math.max(tpCount, 1); t++) {
      var _iterator = _createForOfIteratorHelper(selectedMaterials),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var m = _step.value;
          var _iterator2 = _createForOfIteratorHelper(selectedCopies),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var c = _step2.value;
              combos.push({
                material: m,
                copy: c,
                targetingPackageId: selectedTargetingPackages[t] || null
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return combos;
  };

  // 计算搭建总数（新增：定向包组合 + 创意数量分配）
  var getBuildSummary = function getBuildSummary() {
    var accountCount = selectedAccountIds.length;
    var materialCount = selectedMaterials.length;
    var copyCount = selectedCopies.length;
    var videoCount = selectedMaterials.filter(function (m) {
      return m.type === 'video';
    }).length;
    var imageCount = selectedMaterials.filter(function (m) {
      return m.type === 'image';
    }).length;

    // 单元数 = 账户数 × 定向包数
    var tpCount = 0;
    if (targetingSource === 'package') {
      tpCount = Math.max(selectedTargetingPackages.length, 1);
    } else {
      tpCount = 1;
    }
    var unitsPerAccount = tpCount;
    var totalUnits = accountCount * unitsPerAccount;

    // 每个单元的创意数（根据创意数量分配规则）
    var creativesPerUnit = 0;
    if (creativeComposeMode === 'cross_join') {
      creativesPerUnit = materialCount * copyCount;
    } else if (creativeComposeMode === 'fixed') {
      var v = composeRule.videos || 0;
      var i = composeRule.images || 0;
      var c = composeRule.copies || 1;
      var maxByVideo = v > 0 ? Math.floor(videoCount / v) : Infinity;
      var maxByImage = i > 0 ? Math.floor(imageCount / i) : Infinity;
      var maxByCopy = Math.floor(copyCount / c);
      creativesPerUnit = Math.min(maxByVideo, maxByImage, maxByCopy);
      if (creativesPerUnit < 0) creativesPerUnit = 0;
    }
    var totalCreatives = totalUnits * creativesPerUnit;
    return {
      accountCount: accountCount,
      tpCount: tpCount,
      unitsPerAccount: unitsPerAccount,
      totalUnits: totalUnits,
      materialCount: materialCount,
      copyCount: copyCount,
      videoCount: videoCount,
      imageCount: imageCount,
      creativesPerUnit: creativesPerUnit,
      totalCreatives: totalCreatives
    };
  };

  // ===== 持久化：从 URL 读取 taskId，localStorage 恢复/保存数据 =====
  var urlParams = new URLSearchParams(window.location.search);
  var currentTaskId = urlParams.get('taskId');

  // 恢复草稿（仅挂载时执行一次）
  useEffect(function () {
    if (!currentTaskId) return;
    try {
      var saved = localStorage.getItem('ad_task_form_' + currentTaskId);
      if (saved) {
        var data = JSON.parse(saved);
        if (data.selectedAccountIds) setSelectedAccountIds(data.selectedAccountIds);
        if (data.placement) setPlacement(data.placement);
        if (data.unitName) setUnitName(data.unitName);
        if (data.targetingSource) setTargetingSource(data.targetingSource);
        if (data.selectedTargetingPackages) setSelectedTargetingPackages(data.selectedTargetingPackages);
        if (data.geoMode) setGeoMode(data.geoMode);
        if (data.ageSelections) setAgeSelections(data.ageSelections);
        if (data.genderSelection) setGenderSelection(data.genderSelection);
        if (data.audienceMode) setAudienceMode(data.audienceMode);
        if (data.excludeConvertedMode) setExcludeConvertedMode(data.excludeConvertedMode);
        if (data.bidAmount !== undefined) setBidAmount(data.bidAmount);
        if (data.dailyBudget !== undefined) setDailyBudget(data.dailyBudget);
        if (data.投放日期类型) set投放日期类型(data.投放日期类型);
        if (data.投放时段模式) set投放时段模式(data.投放时段模式);
        if (data.timeGridSlots) setTimeGridSlots(data.timeGridSlots);
        if (data.selectedMaterials) setSelectedMaterials(data.selectedMaterials);
        if (data.selectedCopies) setSelectedCopies(data.selectedCopies);
        if (data.creativeComposeMode) setCreativeComposeMode(data.creativeComposeMode);
        if (data.composeRule) setComposeRule(data.composeRule);
        notify('已恢复上次保存的草稿', 'success');
      }
    } catch (e) {
      console.error('恢复草稿失败', e);
    }
  }, []);

  // 保存草稿的函数
  var doSaveForm = function doSaveForm() {
    if (!currentTaskId) return;
    try {
      var data = {
        selectedAccountIds: selectedAccountIds,
        placement: placement,
        unitName: unitName,
        targetingSource: targetingSource,
        selectedTargetingPackages: selectedTargetingPackages,
        geoMode: geoMode,
        geoSelectedCountry: geoSelectedCountry,
        geoSelectedProvinces: geoSelectedProvinces,
        geoSelectedCities: geoSelectedCities,
        locationTypeResident: locationTypeResident,
        ageSelections: ageSelections,
        customAgeMin: customAgeMin,
        customAgeMax: customAgeMax,
        genderSelection: genderSelection,
        audienceMode: audienceMode,
        selectedTargetAudiences: selectedTargetAudiences,
        selectedExcludeAudiences: selectedExcludeAudiences,
        excludeConvertedMode: excludeConvertedMode,
        conversionBehavior: conversionBehavior,
        conversionTimeRange: conversionTimeRange,
        bidAmount: bidAmount,
        dailyBudget: dailyBudget,
        onePartyData: onePartyData,
        投放日期类型: 投放日期类型,
        长期投放日期: 长期投放日期,
        自定义开始日期: 自定义开始日期,
        自定义结束日期: 自定义结束日期,
        投放时段模式: 投放时段模式,
        timeRangeStart: timeRangeStart,
        timeRangeEnd: timeRangeEnd,
        timeGridSlots: timeGridSlots,
        首日开始: 首日开始,
        首日开始时间值: 首日开始时间值,
        creativeEnhanceMax: creativeEnhanceMax,
        selectedMaterials: selectedMaterials,
        selectedCopies: selectedCopies,
        videoStrategy: videoStrategy,
        copyStrategy: copyStrategy,
        landingPageMacro: landingPageMacro,
        creativeComposeMode: creativeComposeMode,
        composeRule: composeRule
      };
      localStorage.setItem('ad_task_form_' + currentTaskId, JSON.stringify(data));
    } catch (e) {
      console.error('保存草稿失败', e);
    }
  };

  // 定期自动保存 + 暴露接口给外部调用
  useEffect(function () {
    var timer = setInterval(doSaveForm, 3000);
    window.__doSaveForm = doSaveForm;
    window.__getFormData = function () {
      doSaveForm();
      try {
        return JSON.parse(localStorage.getItem('ad_task_form_' + currentTaskId) || '{}');
      } catch (e) {
        return {};
      }
    };
    var msgHandler = function msgHandler(e) {
      if (e.data && e.data.type === 'REQUEST_FORM_SAVE') doSaveForm();
    };
    window.addEventListener('message', msgHandler);
    return function () {
      clearInterval(timer);
      window.removeEventListener('message', msgHandler);
    };
  }, []);

  // 关键状态变更时立即保存（debounce 用 setTimeout）
  useEffect(function () {
    var t = setTimeout(doSaveForm, 500);
    return function () {
      return clearTimeout(t);
    };
  }, [selectedAccountIds, placement, unitName, selectedMaterials, selectedCopies, selectedTargetingPackages]);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gray-100"
  }, notification && /*#__PURE__*/React.createElement(Notification, {
    msg: notification.msg,
    type: notification.type,
    onClose: function onClose() {
      return setNotification(null);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-b shadow-sm sticky top-0 z-40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 py-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u26A1"), " \u817E\u8BAF\u5E7F\u544A\u642D\u5EFA\u6D41\u7A0B\u539F\u578B", /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-normal text-gray-400 ml-2"
  }, "\u5B8C\u6574\u4EA4\u4E92\u9A8C\u8BC1\u7248 v2")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u4E1A\u52A1\u7C7B\u578B"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u6743\u76CA",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u6295\u653E\u6E20\u9053"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u5E7F\u70B9\u901A",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u9009\u62E9\u8D26\u6237 ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white min-h-[42px] flex flex-wrap gap-1 items-center",
    onClick: function onClick() {
      return setShowAccountDropdown(!showAccountDropdown);
    }
  }, selectedAccountIds.length === 0 ? /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-sm"
  }, "\u70B9\u51FB\u9009\u62E9\u8D26\u6237\uFF08\u652F\u6301\u591A\u9009\uFF09") : selectedAccountIds.map(function (id) {
    var acc = MOCK.accounts.find(function (a) {
      return a.id === id;
    });
    return /*#__PURE__*/React.createElement("span", {
      key: id,
      className: "tag"
    }, acc ? acc.name : id, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        toggleAccount(id);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    })));
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-auto text-gray-400"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-chevron-down"
  }))), showAccountDropdown && /*#__PURE__*/React.createElement("div", {
    className: "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
  }, MOCK.accounts.map(function (acc) {
    return /*#__PURE__*/React.createElement("div", {
      key: acc.id,
      onClick: function onClick() {
        return toggleAccount(acc.id);
      },
      className: "px-4 py-2.5 cursor-pointer hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: selectedAccountIds.includes(acc.id),
      onChange: function onChange() {},
      className: "w-4 h-4 text-blue-600 rounded pointer-events-none"
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm font-medium text-gray-900"
    }, acc.name), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-500"
    }, acc.id, " \xB7 ", acc.channel)), selectedAccountIds.includes(acc.id) && /*#__PURE__*/React.createElement("i", {
      className: "fas fa-check text-blue-500"
    }));
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowBatchInput(!showBatchInput);
    },
    className: "mt-2 text-sm text-blue-600 hover:text-blue-800"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-edit mr-1"
  }), showBatchInput ? '收起' : '批量输入账户ID'), showBatchInput && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: batchInputText,
    onChange: function onChange(e) {
      return setBatchInputText(e.target.value);
    },
    placeholder: "\u8F93\u5165\u8D26\u6237ID\u6216\u540D\u79F0\uFF0C\u9017\u53F7/\u7A7A\u683C\u5206\u9694",
    className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500",
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') handleBatchInput();
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleBatchInput,
    className: "btn-primary text-sm"
  }, "\u786E\u8BA4")))))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 py-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl shadow-sm border overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold text-gray-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm"
  }, "2"), "\u8425\u9500\u5355\u5143\u914D\u7F6E")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u63A8\u5E7F\u4EA7\u54C1"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u8FD0\u8425\u5546\u4EA7\u54C1",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u5177\u4F53\u4EA7\u54C1 ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    value: specificProduct,
    onChange: function onChange(e) {
      return setSpecificProduct(e.target.value);
    },
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  }, MOCK.specificProducts.map(function (sp) {
    return /*#__PURE__*/React.createElement("option", {
      key: sp.id,
      value: sp.id
    }, sp.name);
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u8425\u9500\u8F7D\u4F53"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u9875\u9762\u8DF3\u8F6C",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u8F6C\u5316"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u6570\u636E\u6E90\u4E0A\u62A5",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u6295\u653E\u7248\u4F4D ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "placement",
    value: "wechat_video",
    checked: placement === 'wechat_video',
    onChange: function onChange(e) {
      setPlacement(e.target.value);
      setPlacementScene('');
    },
    className: "w-4 h-4 mr-2 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", null, "\u5FAE\u4FE1\u89C6\u9891\u53F7")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "placement",
    value: "wechat_mp",
    checked: placement === 'wechat_mp',
    onChange: function onChange(e) {
      setPlacement(e.target.value);
      setPlacementScene('');
    },
    className: "w-4 h-4 mr-2 text-blue-600"
  }), /*#__PURE__*/React.createElement("span", null, "\u5FAE\u4FE1\u516C\u4F17\u53F7\u4E0E\u5C0F\u7A0B\u5E8F")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u7248\u4F4D\u5B9A\u6295\u573A\u666F"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowPlacementModal(true);
    },
    className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left w-full md:w-auto min-w-[300px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: placementScene ? 'text-gray-900' : 'text-gray-400'
  }, placementScene === 'unlimited' ? '不限' : placementScene ? placement === 'wechat_video' ? MOCK.videoSceneOptions.filter(function (o) {
    return placementScene.split(',').includes(o.id);
  }).map(function (o) {
    return o.label;
  }).join('、') : "\u5DF2\u9009\u62E9 ".concat(placementScene.split(',').length, " \u4E2A\u573A\u666F") : '点击选择版位定投场景'), /*#__PURE__*/React.createElement("i", {
    className: "fas fa-chevron-down ml-2 text-gray-400 text-sm"
  })), /*#__PURE__*/React.createElement(PlacementSceneModal, {
    placement: placement,
    show: showPlacementModal,
    onClose: function onClose() {
      return setShowPlacementModal(false);
    },
    value: placementScene,
    onChange: setPlacementScene
  })), /*#__PURE__*/React.createElement("div", {
    className: "border-t pt-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-md font-semibold text-gray-900 mb-3"
  }, "\u5B9A\u5411\u914D\u7F6E"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "targeting",
    checked: targetingSource === 'package',
    onChange: function onChange() {
      return setTargetingSource('package');
    },
    className: "mr-2"
  }), "\u5B9A\u5411\u5305"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "targeting",
    checked: targetingSource === 'custom',
    onChange: function onChange() {
      return setTargetingSource('custom');
    },
    className: "mr-2"
  }), "\u81EA\u5B9A\u4E49\u5B9A\u5411")), targetingSource === 'package' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u9009\u62E9\u5B9A\u5411\u5305\uFF08\u53EF\u591A\u9009\uFF0C\u4E0D\u540C\u5B9A\u5411\u5305\u5C06\u521B\u5EFA\u4E0D\u540C\u5355\u5143\uFF09"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, selectedTargetingPackages.map(function (tpId) {
    var tp = MOCK.targetingPackages.find(function (t) {
      return t.id === tpId;
    });
    return tp ? /*#__PURE__*/React.createElement("span", {
      key: tpId,
      className: "tag bg-blue-100 text-blue-800"
    }, tp.name, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedTargetingPackages(selectedTargetingPackages.filter(function (id) {
          return id !== tpId;
        }));
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    }))) : null;
  })), /*#__PURE__*/React.createElement("select", {
    value: "",
    onChange: function onChange(e) {
      var val = e.target.value;
      if (val && !selectedTargetingPackages.includes(val)) {
        setSelectedTargetingPackages([].concat(_toConsumableArray(selectedTargetingPackages), [val]));
      }
    },
    className: "w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "++ \u6DFB\u52A0\u5B9A\u5411\u5305 ++"), MOCK.targetingPackages.map(function (tp) {
    return /*#__PURE__*/React.createElement("option", {
      key: tp.id,
      value: tp.id,
      disabled: selectedTargetingPackages.includes(tp.id)
    }, tp.name, "\uFF08", tp.region, "\uFF0C", tp.age, "\u5C81\uFF0C", tp.gender, "\uFF09", selectedTargetingPackages.includes(tp.id) ? ' ✓ 已选' : '');
  }), userTgtPkgs.length > 0 && /*#__PURE__*/React.createElement("option", {
    disabled: true
  }, "\u2500\u2500 \u81EA\u5EFA\u5B9A\u5411\u5305 \u2500\u2500"), userTgtPkgs.map(function (tp) {
    return /*#__PURE__*/React.createElement("option", {
      key: tp.id,
      value: tp.id,
      disabled: selectedTargetingPackages.includes(tp.id)
    }, tp.name, "\uFF08", tp.region, "\uFF0C", tp.age, "\u5C81\uFF0C", tp.gender, "\uFF09[\u81EA\u5EFA]", selectedTargetingPackages.includes(tp.id) ? ' ✓ 已选' : '');
  })), selectedTargetingPackages.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-orange-500 mt-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-exclamation-circle mr-1"
  }), "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u4E2A\u5B9A\u5411\u5305"), channel === 'gdt' && selectedTargetingPackages.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-500 mt-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle mr-1"
  }), "\u5E7F\u70B9\u901A\u6E20\u9053\uFF1A\u540C\u4E00\u5B9A\u5411\u5305\u5185\u5BB9\u5728\u540C\u4E00\u8D26\u6237\u4E0B\u4EC5\u5BF9\u5E94\u4E00\u4E2A\u5355\u5143")), targetingSource === 'custom' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-4 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500"
  }, "\u81EA\u5B9A\u4E49\u5B9A\u5411\u914D\u7F6E"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setSaveTgtPkgName('');
      setShowSaveTgtPkgModal(true);
    },
    className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-save mr-1"
  }), " \u4FDD\u5B58\u4E3A\u5B9A\u5411\u5305")), /*#__PURE__*/React.createElement("div", {
    className: "pb-5 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u5730\u7406\u4F4D\u7F6E"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer ml-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "geo_mode",
    checked: geoMode === 'unlimited',
    onChange: function onChange() {
      setGeoMode('unlimited');
      setGeoSelectedProvinces([]);
      setGeoSelectedCities({});
      setActiveProvinceId('');
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-700"
  }, "\u4E0D\u9650")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer ml-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "geo_mode",
    checked: geoMode === 'region',
    onChange: function onChange() {
      setGeoMode('region');
      selectAllProvinceAndCities();
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-700"
  }, "\u6309\u533A\u57DF"))), geoMode === 'region' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-map-marker-alt text-blue-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-800"
  }, "\u6309\u533A\u57DF")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded-lg overflow-hidden bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 bg-gray-50 border-b text-sm font-medium text-gray-700"
  }, "\u7701\u4EFD\uFF08\u70B9\u51FB\u67E5\u770B\u57CE\u5E02\uFF09"), /*#__PURE__*/React.createElement("div", {
    className: "max-h-52 overflow-y-auto p-1"
  }, (MOCK.regionCascade.provinces['cn'] || []).map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 rounded flex items-center ".concat(activeProvinceId === p.id ? 'bg-blue-200 text-blue-800 font-semibold' : '', " ").concat(geoSelectedProvinces.includes(p.id) ? 'text-blue-700' : 'text-gray-700')
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: geoSelectedProvinces.includes(p.id),
      onChange: function onChange() {
        var pid = p.id;
        if (geoSelectedProvinces.includes(pid)) {
          // 取消该省：去掉省份 + 清空该省城市
          setGeoSelectedProvinces(geoSelectedProvinces.filter(function (x) {
            return x !== pid;
          }));
          var newCities = _objectSpread({}, geoSelectedCities);
          delete newCities[pid];
          setGeoSelectedCities(newCities);
        } else {
          // 选中该省：添加省份 + 全选该省城市
          setGeoSelectedProvinces([].concat(_toConsumableArray(geoSelectedProvinces), [pid]));
          setGeoSelectedCities(_objectSpread(_objectSpread({}, geoSelectedCities), {}, _defineProperty({}, pid, _toConsumableArray(MOCK.regionCascade.cities[pid] || []))));
        }
      },
      className: "mr-2 w-3.5 h-3.5 cursor-pointer"
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate",
      onClick: function onClick() {
        return setActiveProvinceId(p.id);
      }
    }, p.name));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded-lg overflow-hidden bg-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 bg-gray-50 border-b text-sm font-medium text-gray-700"
  }, "\u57CE\u5E02 ", activeProvinceId ? "\xB7 ".concat(((_MOCK$regionCascade$p = MOCK.regionCascade.provinces['cn'].find(function (p) {
    return p.id === activeProvinceId;
  })) === null || _MOCK$regionCascade$p === void 0 ? void 0 : _MOCK$regionCascade$p.name) || '') : '（请点击左侧省份）'), /*#__PURE__*/React.createElement("div", {
    className: "max-h-52 overflow-y-auto p-1"
  }, activeProvinceId && (MOCK.regionCascade.cities[activeProvinceId] || []).map(function (city) {
    var selected = (geoSelectedCities[activeProvinceId] || []).includes(city);
    return /*#__PURE__*/React.createElement("div", {
      key: city,
      onClick: function onClick() {
        var prev = geoSelectedCities[activeProvinceId] || [];
        if (selected) {
          setGeoSelectedCities(_objectSpread(_objectSpread({}, geoSelectedCities), {}, _defineProperty({}, activeProvinceId, prev.filter(function (c) {
            return c !== city;
          }))));
        } else {
          setGeoSelectedCities(_objectSpread(_objectSpread({}, geoSelectedCities), {}, _defineProperty({}, activeProvinceId, [].concat(_toConsumableArray(prev), [city]))));
        }
      },
      className: "px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-50 rounded flex items-center ".concat(selected ? 'bg-blue-100 text-blue-700' : 'text-gray-700')
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: selected,
      onChange: function onChange() {
        var prev = geoSelectedCities[activeProvinceId] || [];
        if (selected) {
          setGeoSelectedCities(_objectSpread(_objectSpread({}, geoSelectedCities), {}, _defineProperty({}, activeProvinceId, prev.filter(function (c) {
            return c !== city;
          }))));
        } else {
          setGeoSelectedCities(_objectSpread(_objectSpread({}, geoSelectedCities), {}, _defineProperty({}, activeProvinceId, [].concat(_toConsumableArray(prev), [city]))));
        }
        // 同步更新省份选中状态
        var newCityList = selected ? prev.filter(function (c) {
          return c !== city;
        }) : [].concat(_toConsumableArray(prev), [city]);
        var allCities = MOCK.regionCascade.cities[activeProvinceId] || [];
        if (newCityList.length === allCities.length) {
          // 全选了该省所有城市 → 确保省份被选中
          if (!geoSelectedProvinces.includes(activeProvinceId)) {
            setGeoSelectedProvinces([].concat(_toConsumableArray(geoSelectedProvinces), [activeProvinceId]));
          }
        } else {
          // 没有全选 → 如果城市列表为空则取消省份选中
          if (newCityList.length === 0) {
            setGeoSelectedProvinces(geoSelectedProvinces.filter(function (x) {
              return x !== activeProvinceId;
            }));
            var newCities = _objectSpread({}, geoSelectedCities);
            delete newCities[activeProvinceId];
            setGeoSelectedCities(newCities);
          }
        }
      },
      className: "mr-2 w-3.5 h-3.5 cursor-pointer"
    }), /*#__PURE__*/React.createElement("span", null, city));
  }), !activeProvinceId && /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-4 text-sm text-gray-400 text-center"
  }, "\u8BF7\u70B9\u51FB\u5DE6\u4FA7\u7701\u4EFD\u67E5\u770B\u57CE\u5E02")))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      var allPids = (MOCK.regionCascade.provinces['cn'] || []).map(function (p) {
        return p.id;
      });
      var allCities = {};
      allPids.forEach(function (pid) {
        allCities[pid] = _toConsumableArray(MOCK.regionCascade.cities[pid] || []);
      });
      setGeoSelectedProvinces(allPids);
      setGeoSelectedCities(allCities);
    },
    className: "text-xs text-blue-600 hover:text-blue-800"
  }, "\u5168\u9009\u5168\u90E8"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setGeoSelectedProvinces([]);
      setGeoSelectedCities({});
    },
    className: "text-xs text-gray-500 hover:text-gray-700"
  }, "\u6E05\u7A7A\u5168\u90E8")))), geoMode === 'unlimited' && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 py-2 px-3 bg-gray-50 rounded-lg inline-block"
  }, "\u5DF2\u9009\u62E9\"\u4E0D\u9650\"\uFF0C\u5C06\u6295\u653E\u5230\u6240\u6709\u5730\u57DF"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900 whitespace-nowrap",
    style: {
      lineHeight: '2rem'
    }
  }, "\u5730\u70B9\u7C7B\u578B"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer h-8"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "location_type",
    checked: true,
    readOnly: true,
    className: "mr-1.5 w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-700"
  }, "\u5E38\u4F4F\u5730")))), /*#__PURE__*/React.createElement("div", {
    className: "py-4 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u5E74\u9F84"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-x-5 gap-y-1 ml-2"
  }, [{
    key: 'unlimited',
    label: '不限'
  }, {
    key: '14-18',
    label: '14-18岁'
  }, {
    key: '19-24',
    label: '19-24岁'
  }, {
    key: '25-29',
    label: '25-29岁'
  }, {
    key: '30-39',
    label: '30-39岁'
  }, {
    key: '40-49',
    label: '40-49岁'
  }, {
    key: '50+',
    label: '50岁及以上'
  }].map(function (opt) {
    return /*#__PURE__*/React.createElement("label", {
      key: opt.key,
      className: "flex items-center cursor-pointer"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: ageSelections.includes(opt.key),
      onChange: function onChange(e) {
        if (opt.key === 'unlimited') {
          // 不限：切换选中状态
          if (ageSelections.includes('unlimited')) {
            setAgeSelections([]);
          } else {
            setAgeSelections(['unlimited']);
          }
        } else {
          if (e.target.checked) {
            // 选中年龄段：取消不限，添加当前年龄段
            var next = ageSelections.filter(function (k) {
              return k !== 'unlimited';
            });
            if (!next.includes(opt.key)) next.push(opt.key);
            setAgeSelections(next);
          } else {
            // 取消年龄段
            var _next = ageSelections.filter(function (k) {
              return k !== opt.key && k !== 'unlimited';
            });
            setAgeSelections(_next.length > 0 ? _next : ['unlimited']);
          }
        }
      },
      disabled: false,
      className: "mr-1.5"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm ".concat(ageSelections.includes(opt.key) ? 'text-gray-900 font-medium' : 'text-gray-700')
    }, opt.label));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "py-4 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u6027\u522B"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 ml-4"
  }, [{
    value: 'unlimited',
    label: '不限'
  }, {
    value: 'male',
    label: '男'
  }, {
    value: 'female',
    label: '女'
  }].map(function (opt) {
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      className: "flex items-center cursor-pointer"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "gender_sel",
      value: opt.value,
      checked: genderSelection === opt.value,
      onChange: function onChange(e) {
        return setGenderSelection(e.target.value);
      },
      className: "mr-1.5"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm ".concat(genderSelection === opt.value ? 'text-gray-900 font-medium' : 'text-gray-700')
    }, opt.label));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "py-4 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u81EA\u5B9A\u4E49\u4EBA\u7FA4"), /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle text-gray-300 ml-1 text-xs cursor-help",
    title: "\u901A\u8FC7\u4E0A\u4F20\u7528\u6237\u5305\u7B49\u65B9\u5F0F\u6392\u9664\u7279\u5B9A\u4EBA\u7FA4"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 ml-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "audience_mode",
    value: "unlimited",
    checked: audienceMode === 'unlimited',
    onChange: function onChange(e) {
      return setAudienceMode(e.target.value);
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u4E0D\u9650")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "audience_mode",
    value: "exclude",
    checked: audienceMode === 'exclude',
    onChange: function onChange(e) {
      return setAudienceMode(e.target.value);
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u6392\u9664\u4EBA\u7FA4")))), audienceMode === 'exclude' && /*#__PURE__*/React.createElement("div", {
    className: "ml-[72px] bg-orange-50 border border-orange-200 rounded-xl p-4 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-user-slash text-orange-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-orange-800"
  }, "\u9009\u62E9\u6392\u9664\u4EBA\u7FA4\u5305")), /*#__PURE__*/React.createElement("button", {
    onClick: refreshExcludeAudiencePackages,
    className: "text-xs text-orange-600 hover:text-orange-800 border border-orange-200 rounded px-2 py-1 hover:bg-orange-100"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-sync-alt mr-1"
  }), "\u5237\u65B0\u5217\u8868")), /*#__PURE__*/React.createElement("select", {
    value: "",
    onChange: function onChange(e) {
      var val = e.target.value;
      if (val && !selectedExcludeAudiences.includes(val)) {
        setSelectedExcludeAudiences([].concat(_toConsumableArray(selectedExcludeAudiences), [val]));
      }
    },
    className: "w-full px-3 py-2 border border-orange-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 mb-3"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "++ \u6DFB\u52A0\u6392\u9664\u4EBA\u7FA4\u5305 ++"), excludeAudiencePackageList.map(function (ep) {
    return /*#__PURE__*/React.createElement("option", {
      key: ep.id,
      value: ep.id,
      disabled: selectedExcludeAudiences.includes(ep.id)
    }, ep.name, selectedExcludeAudiences.includes(ep.id) ? ' ✓ 已选' : '');
  })), selectedExcludeAudiences.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1"
  }, selectedExcludeAudiences.map(function (id) {
    var pkg = excludeAudiencePackageList.find(function (e) {
      return e.id === id;
    });
    return pkg ? /*#__PURE__*/React.createElement("span", {
      key: id,
      className: "tag bg-orange-100 text-orange-800"
    }, pkg.name, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedExcludeAudiences(selectedExcludeAudiences.filter(function (i) {
          return i !== id;
        }));
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    }))) : null;
  })), selectedExcludeAudiences.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-orange-400"
  }, "\u672A\u9009\u62E9\u4EFB\u4F55\u6392\u9664\u4EBA\u7FA4\u5305"))), /*#__PURE__*/React.createElement("div", {
    className: "py-4 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u6392\u9664\u5DF2\u8F6C\u5316\u7528\u6237"), /*#__PURE__*/React.createElement("i", {
    className: "fas fa-info-circle text-gray-300 ml-1 text-xs cursor-help",
    title: "\u6392\u9664\u5DF2\u7ECF\u5B8C\u6210\u8F6C\u5316\u7684\u7528\u6237\uFF0C\u907F\u514D\u91CD\u590D\u89E6\u8FBE"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-x-5 gap-y-1 ml-4"
  }, [{
    v: 'unlimited',
    l: '不限'
  }, {
    v: 'same_account',
    l: '同账户营销单元'
  }, {
    v: 'same_principal',
    l: '同主体系营销单元'
  }, {
    v: 'same_business',
    l: '同业务单元营销单元'
  }, {
    v: 'same_group',
    l: '同集团'
  }].map(function (opt) {
    return /*#__PURE__*/React.createElement("label", {
      key: opt.v,
      className: "flex items-center cursor-pointer"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "exclude_conv",
      value: opt.v,
      checked: excludeConvertedMode === opt.v,
      onChange: function onChange(e) {
        return setExcludeConvertedMode(e.target.value);
      },
      className: "mr-1.5"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm ".concat(excludeConvertedMode === opt.v ? 'text-gray-900 font-medium' : 'text-gray-700')
    }, opt.l));
  })))), excludeConvertedMode !== 'unlimited' && /*#__PURE__*/React.createElement("div", {
    className: "py-4 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u8F6C\u5316\u884C\u4E3A"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 ml-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "conv_behavior",
    value: "optimize",
    checked: conversionBehavior === 'optimize',
    onChange: function onChange(e) {
      return setConversionBehavior(e.target.value);
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u4F18\u5316\u76EE\u6807")))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "\u8F6C\u5316\u65F6\u95F4\u533A\u95F4"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 ml-4"
  }, [{
    v: 'today',
    l: '当日'
  }, {
    v: '7day',
    l: '7天'
  }, {
    v: '1month',
    l: '1个月'
  }, {
    v: '3month',
    l: '3个月'
  }, {
    v: '6month',
    l: '6个月'
  }].map(function (opt) {
    return /*#__PURE__*/React.createElement("label", {
      key: opt.v,
      className: "flex items-center cursor-pointer"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "conv_time",
      value: opt.v,
      checked: conversionTimeRange === opt.v,
      onChange: function onChange(e) {
        return setConversionTimeRange(e.target.value);
      },
      className: "mr-1.5"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm ".concat(conversionTimeRange === opt.v ? 'text-gray-900 font-medium' : 'text-gray-700')
    }, opt.l));
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t pt-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-md font-semibold text-gray-900 mb-3"
  }, "\u51FA\u4EF7\u4E0E\u9884\u7B97"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u8BA1\u8D39\u65B9\u5F0F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "oCPM",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u51FA\u4EF7\u573A\u666F"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u5E38\u89C4\u6295\u653E",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u51FA\u4EF7\uFF08\u5143\uFF09", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: bidAmount,
    onChange: function onChange(e) {
      return setBidAmount(e.target.value);
    },
    placeholder: "\u8F93\u5165\u51FA\u4EF7\u91D1\u989D",
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u65E5\u9884\u7B97\uFF08\u5143\uFF09"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: dailyBudget,
    onChange: function onChange(e) {
      return setDailyBudget(e.target.value);
    },
    placeholder: "\u8F93\u5165\u65E5\u9884\u7B97\uFF0C0=\u4E0D\u9650",
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u4E00\u65B9\u6570\u636E\u8DD1\u91CF\u52A0\u5F3A"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-green-600"
  }, "\u5173\u95ED"), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    className: "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-not-allowed opacity-60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-400"
  }, "\u5F00\u542F"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 ml-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-lock mr-1"
  }), "\u5DF2\u9501\u5B9A\u4E3A\u5173\u95ED"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u4E00\u952E\u8D77\u91CF"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium ".concat(!quickLaunch ? 'text-gray-400' : 'text-green-600')
  }, "\u5173\u95ED"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setQuickLaunch(!quickLaunch);
    },
    className: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors ".concat(quickLaunch ? 'bg-blue-500' : 'bg-gray-300')
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform ".concat(quickLaunch ? 'translate-x-6' : 'translate-x-1')
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium ".concat(quickLaunch ? 'text-green-600' : 'text-gray-400')
  }, "\u5F00\u542F")), quickLaunch && /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: quickLaunchBudget,
    onChange: function onChange(e) {
      return setQuickLaunchBudget(e.target.value);
    },
    placeholder: "\u8F93\u5165\u4E00\u952E\u8D77\u91CF\u9884\u7B97\uFF08\u5FC5\u586B\uFF09",
    className: "w-full px-3 py-2 border border-orange-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "border-t pt-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-md font-semibold text-gray-900 mb-4"
  }, "\u6295\u653E\u8BBE\u7F6E"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u6295\u653E\u65E5\u671F"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-6 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "date_type",
    checked: 投放日期类型 === 'custom',
    onChange: function onChange() {
      return set投放日期类型('custom');
    },
    className: "mr-2"
  }), "\u6307\u5B9A\u5F00\u59CB\u53CA\u7ED3\u675F\u65E5\u671F"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "date_type",
    checked: 投放日期类型 === 'long_term',
    onChange: function onChange() {
      return set投放日期类型('long_term');
    },
    className: "mr-2"
  }), "\u957F\u671F\u6295\u653E")), 投放日期类型 === 'long_term' ? /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-xs"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: 长期投放日期,
    onChange: function onChange(e) {
      return set长期投放日期(e.target.value);
    },
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: 自定义开始日期,
    onChange: function onChange(e) {
      return set自定义开始日期(e.target.value);
    },
    placeholder: "\u5F00\u59CB\u65E5\u671F",
    className: "px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: 自定义结束日期,
    onChange: function onChange(e) {
      return set自定义结束日期(e.target.value);
    },
    placeholder: "\u7ED3\u675F\u65E5\u671F",
    className: "px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-3"
  }, "\u6295\u653E\u65F6\u6BB5"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600 mr-2"
  }, "\u9009\u62E9\u65F6\u6BB5"), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer mr-5"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "time_mode",
    checked: 投放时段模式 === 'all_day',
    onChange: function onChange() {
      return set投放时段模式('all_day');
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u5168\u5929")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer mr-5"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "time_mode",
    checked: 投放时段模式 === 'time_range',
    onChange: function onChange() {
      return set投放时段模式('time_range');
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u6307\u5B9A\u5F00\u59CB\u65F6\u95F4\u548C\u7ED3\u675F\u65F6\u95F4")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "time_mode",
    checked: 投放时段模式 === 'multi_slot',
    onChange: function onChange() {
      return set投放时段模式('multi_slot');
    },
    className: "mr-1.5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u6307\u5B9A\u591A\u4E2A\u65F6\u6BB5"))), 投放时段模式 === 'time_range' && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 items-center p-4 bg-gray-50 rounded-lg border border-gray-200 max-w-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs text-gray-500 mb-1"
  }, "\u5F00\u59CB\u65F6\u95F4"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: timeRangeStart,
    onChange: function onChange(e) {
      return setTimeRangeStart(e.target.value);
    },
    className: "px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 mt-5"
  }, "\u81F3"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs text-gray-500 mb-1"
  }, "\u7ED3\u675F\u65F6\u95F4"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: timeRangeEnd,
    onChange: function onChange(e) {
      return setTimeRangeEnd(e.target.value);
    },
    className: "px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
  }))), 投放时段模式 === 'multi_slot' && /*#__PURE__*/React.createElement(TimeGrid, {
    value: timeGridSlots,
    onChange: setTimeGridSlots
  }), 投放时段模式 === 'all_day' && /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 py-2 px-4 bg-gray-50 rounded-lg inline-block"
  }, "\u5DF2\u9009\u62E9\"\u5168\u5929\"\uFF0C\u5C06\u5728\u6240\u6709\u65F6\u95F4\u6BB5\u6295\u653E")), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-sm font-medium text-gray-700"
  }, "\u9996\u65E5\u5F00\u59CB\u65F6\u95F4"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return set首日开始(!首日开始);
    },
    className: "relative inline-flex h-6 w-11 items-center rounded-full transition-colors ".concat(首日开始 ? 'bg-blue-500' : 'bg-gray-300')
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform ".concat(首日开始 ? 'translate-x-6' : 'translate-x-1')
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500"
  }, 首日开始 ? '已开启' : '未开启')), 首日开始 && /*#__PURE__*/React.createElement("div", {
    className: "ml-1 flex items-center gap-3 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs text-gray-500"
  }, "\u9009\u62E9\u5F00\u59CB\u65F6\u95F4"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: 首日开始时间值,
    onChange: function onChange(e) {
      return set首日开始时间值(e.target.value);
    },
    className: "px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400"
  }, "\u5E7F\u544A\u5C06\u5728\u6295\u653E\u9996\u65E5\u8BE5\u65F6\u95F4\u5F00\u59CB\u6295\u653E"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u8425\u9500\u5355\u5143\u540D\u79F0 ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 max-w-md"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: unitName,
    onChange: function onChange(e) {
      return setUnitName(e.target.value);
    },
    placeholder: "\u8F93\u5165\u8425\u9500\u5355\u5143\u540D\u79F0",
    className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 text-sm text-gray-500"
  }, nameVariables.map(function (v) {
    return /*#__PURE__*/React.createElement("span", {
      key: v,
      onClick: function onClick() {
        return setUnitName(unitName + '{' + v + '}');
      },
      className: "text-blue-500 hover:text-blue-700 cursor-pointer"
    }, "+", v);
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl shadow-sm border overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 border-b"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold text-gray-900 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm"
  }, "3"), "\u521B\u610F\u914D\u7F6E")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u521B\u610F\u589E\u5F3AMax"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-green-600"
  }, "\u5173\u95ED"), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    className: "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-not-allowed opacity-60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block h-4 w-4 transform rounded-full bg-white translate-x-1"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-400"
  }, "\u5F00\u542F"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 ml-2"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-lock mr-1"
  }), "\u5DF2\u9501\u5B9A\u4E3A\u5173\u95ED"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u521B\u610F\u540D\u79F0"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: creativeName,
    onChange: function onChange(e) {
      return setCreativeName(e.target.value);
    },
    placeholder: "\u8F93\u5165\u521B\u610F\u540D\u79F0\uFF08\u652F\u6301\u53D8\u91CF\uFF09",
    className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 text-sm text-gray-500"
  }, creativeNameVariables.map(function (v) {
    return /*#__PURE__*/React.createElement("span", {
      key: v,
      onClick: function onClick() {
        return setCreativeName(creativeName + '{' + v + '}');
      },
      className: "text-blue-500 hover:text-blue-700 cursor-pointer"
    }, "+", v);
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u521B\u610F\u7D20\u6750 ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*"), "\uFF08\u5DF2\u9009 ", selectedMaterials.length, "/100 \u4E2A\uFF0C\u53EF\u591A\u6B21\u9009\u62E9\uFF09"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setShowMaterialModal(true);
    },
    className: "btn-secondary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-photo-video mr-2"
  }), "\u9009\u62E9\u7D20\u6750\uFF08\u89C6\u9891/\u56FE\u7247\uFF09"), selectedMaterials.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-900 font-medium mb-2"
  }, "\u5DF2\u9009\u7D20\u6750\uFF1A"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, selectedMaterials.map(function (m) {
    return /*#__PURE__*/React.createElement("span", {
      key: m.id,
      className: "inline-flex items-center gap-1 px-2 py-1 bg-white border border-blue-200 rounded text-xs"
    }, m.type === 'video' ? '🎬' : '🖼️', " ", m.name, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedMaterials(selectedMaterials.filter(function (sm) {
          return sm.id !== m.id;
        }));
      },
      className: "text-red-500 hover:text-red-700 ml-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    })));
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u5E7F\u544A\u6587\u6848 ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*"), "\uFF08\u5DF2\u9009 ", selectedCopies.length, " \u6761\uFF0C\u652F\u6301\u591A\u9009\u548C\u6279\u91CF\u6DFB\u52A0\uFF09"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowCopyModal(true);
    },
    className: "btn-secondary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-font mr-2"
  }), "\u9009\u62E9\u5E7F\u544A\u6587\u6848"), selectedCopies.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 bg-green-50 border border-green-200 rounded-lg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-green-900 font-medium mb-2"
  }, "\u5DF2\u9009\u6587\u6848\uFF1A"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, selectedCopies.map(function (c) {
    return /*#__PURE__*/React.createElement("span", {
      key: c.id,
      className: "inline-flex items-center gap-1 px-2 py-1 bg-white border border-green-200 rounded text-xs"
    }, "\uD83D\uDCDD ", c.content, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setSelectedCopies(selectedCopies.filter(function (sc) {
          return sc.id !== c.id;
        }));
      },
      className: "text-red-500 hover:text-red-700 ml-1"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    })));
  })))), selectedMaterials.length > 0 && selectedCopies.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50 border border-blue-200 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-blue-900 mb-2"
  }, "\u521B\u610F\u7EC4\u5408\u9884\u89C8"), creativeComposeMode === 'cross_join' ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-700"
  }, "\u4EA4\u53C9\u7EC4\u5408\uFF1A", /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, selectedMaterials.length, "\u7D20\u6750 \xD7 ", selectedCopies.length, "\u6587\u6848 = ", selectedMaterials.length * selectedCopies.length), " \u4E2A\u521B\u610F/\u5355\u5143") : /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-blue-700"
  }, "\u56FA\u5B9A\u5206\u914D\uFF1A\u6BCF\u521B\u610F ", composeRule.videos, "\u89C6\u9891 + ", composeRule.images, "\u56FE\u7247 + ", composeRule.copies, "\u6587\u6848\uFF0C \u9884\u8BA1\u53EF\u751F\u6210 ", /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, function () {
    var videoCount = selectedMaterials.filter(function (m) {
      return m.type === 'video';
    }).length;
    var imageCount = selectedMaterials.filter(function (m) {
      return m.type === 'image';
    }).length;
    var copyCount = selectedCopies.length;
    var maxByVideo = composeRule.videos > 0 ? Math.floor(videoCount / composeRule.videos) : Infinity;
    var maxByImage = composeRule.images > 0 ? Math.floor(imageCount / composeRule.images) : Infinity;
    var maxByCopy = Math.floor(copyCount / composeRule.copies);
    return Math.min(maxByVideo, maxByImage, maxByCopy);
  }()), " \u4E2A\u521B\u610F/\u5355\u5143")), /*#__PURE__*/React.createElement("div", {
    className: "border-t pt-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-gray-900 mb-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-layer-group mr-2 text-blue-500"
  }), "\u521B\u610F\u6570\u91CF\u5206\u914D"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-3"
  }, "\u5B9A\u4E49\u6BCF\u4E2A\u521B\u610F\u7531\u591A\u5C11\u4E2A\u7D20\u6750\u548C\u6587\u6848\u7EC4\u6210"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "compose_mode",
    value: "cross_join",
    checked: creativeComposeMode === 'cross_join',
    onChange: function onChange(e) {
      return setCreativeComposeMode(e.target.value);
    },
    className: "mr-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u4EA4\u53C9\u7EC4\u5408\uFF08\u5F53\u524D\uFF1A", selectedMaterials.length, "\u7D20\u6750 \xD7 ", selectedCopies.length, "\u6587\u6848 = ", selectedMaterials.length * selectedCopies.length, "\u521B\u610F\uFF09")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "compose_mode",
    value: "fixed",
    checked: creativeComposeMode === 'fixed',
    onChange: function onChange(e) {
      return setCreativeComposeMode(e.target.value);
    },
    className: "mr-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, "\u56FA\u5B9A\u6570\u91CF\u5206\u914D")), creativeComposeMode === 'fixed' && /*#__PURE__*/React.createElement("div", {
    className: "ml-6 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-fadeIn"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-3"
  }, "\u8BBE\u7F6E\u6BCF\u4E2A\u521B\u610F\u5305\u542B\u7684\u7D20\u6750\u548C\u6587\u6848\u6570\u91CF\uFF1A"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs text-gray-600 mb-1"
  }, "\u89C6\u9891\u6570/\u521B\u610F"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "10",
    value: composeRule.videos,
    onChange: function onChange(e) {
      return setComposeRule(_objectSpread(_objectSpread({}, composeRule), {}, {
        videos: Math.max(0, parseInt(e.target.value) || 0)
      }));
    },
    className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs text-gray-600 mb-1"
  }, "\u56FE\u7247\u6570/\u521B\u610F"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    max: "10",
    value: composeRule.images,
    onChange: function onChange(e) {
      return setComposeRule(_objectSpread(_objectSpread({}, composeRule), {}, {
        images: Math.max(0, parseInt(e.target.value) || 0)
      }));
    },
    className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs text-gray-600 mb-1"
  }, "\u6587\u6848\u6570/\u521B\u610F"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "10",
    value: composeRule.copies,
    onChange: function onChange(e) {
      return setComposeRule(_objectSpread(_objectSpread({}, composeRule), {}, {
        copies: Math.max(1, parseInt(e.target.value) || 1)
      }));
    },
    className: "w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 bg-white rounded-lg border border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-1"
  }, "\u9884\u4F30\u53EF\u751F\u6210\u521B\u610F\u6570\uFF1A"), function () {
    var videoCount = selectedMaterials.filter(function (m) {
      return m.type === 'video';
    }).length;
    var imageCount = selectedMaterials.filter(function (m) {
      return m.type === 'image';
    }).length;
    var copyCount = selectedCopies.length;
    var perCreative = (composeRule.videos || 0) + (composeRule.images || 0);
    var maxCreatives = 0;
    if (perCreative > 0 && composeRule.copies > 0) {
      var maxByVideo = composeRule.videos > 0 ? Math.floor(videoCount / composeRule.videos) : Infinity;
      var maxByImage = composeRule.images > 0 ? Math.floor(imageCount / composeRule.images) : Infinity;
      var maxByCopy = Math.floor(copyCount / composeRule.copies);
      maxCreatives = Math.min(maxByVideo, maxByImage, maxByCopy);
    }
    return /*#__PURE__*/React.createElement("p", {
      className: "text-lg font-bold text-blue-600"
    }, maxCreatives, " \u4E2A\u521B\u610F");
  }(), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "\u89C4\u5219\uFF1A\u6BCF\u521B\u610F ", composeRule.videos, "\u89C6\u9891 + ", composeRule.images, "\u56FE\u7247 + ", composeRule.copies, "\u6587\u6848"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u7D20\u6750\u5206\u914D\u7B56\u7565"), /*#__PURE__*/React.createElement("select", {
    value: videoStrategy,
    onChange: function onChange(e) {
      return setVideoStrategy(e.target.value);
    },
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  }, /*#__PURE__*/React.createElement("option", {
    value: "average"
  }, "\u5E73\u5747\u5206\u914D"), /*#__PURE__*/React.createElement("option", {
    value: "copy"
  }, "\u590D\u5236\u5206\u914D\uFF08\u6240\u6709\u8D26\u6237\u7528\u76F8\u540C\u7D20\u6750\uFF09"), /*#__PURE__*/React.createElement("option", {
    value: "random"
  }, "\u968F\u673A\u5206\u914D"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u5E7F\u544A\u6587\u6848\u5206\u914D\u7B56\u7565"), /*#__PURE__*/React.createElement("select", {
    value: copyStrategy,
    onChange: function onChange(e) {
      return setCopyStrategy(e.target.value);
    },
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
  }, /*#__PURE__*/React.createElement("option", {
    value: "average"
  }, "\u5E73\u5747\u5206\u914D"), /*#__PURE__*/React.createElement("option", {
    value: "copy"
  }, "\u590D\u5236\u5206\u914D\uFF08\u6240\u6709\u8D26\u6237\u7528\u76F8\u540C\u6587\u6848\uFF09"), /*#__PURE__*/React.createElement("option", {
    value: "random"
  }, "\u968F\u673A\u5206\u914D")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-2"
  }, "\u843D\u5730\u9875\uFF08\u5361\u535A\u58EB\u94FE\u63A5 + \u5B8F\u53C2\u6570\u5DF2\u81EA\u52A8\u62FC\u63A5\uFF09"), selectedAccountIds.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, selectedAccountIds.map(function (id) {
    var acc = MOCK.accounts.find(function (a) {
      return a.id === id;
    });
    var landingUrl = acc ? acc.kaboshi + '?click_id={click_id}&ad_id={ad_id}' : '';
    return acc ? /*#__PURE__*/React.createElement("div", {
      key: id,
      className: "p-3 bg-gray-50 border border-gray-200 rounded-lg"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 mb-1"
    }, acc.name, " \u7684\u843D\u5730\u9875\uFF1A"), /*#__PURE__*/React.createElement("code", {
      className: "text-sm text-gray-700 break-all"
    }, landingUrl)) : null;
  })) : /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400"
  }, "\u8BF7\u5148\u9009\u62E9\u8D26\u6237\uFF0C\u843D\u5730\u9875\u5C06\u81EA\u52A8\u751F\u6210"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-2"
  }, "\u2705 \u5B8F\u53C2\u6570\u5DF2\u9ED8\u8BA4\u62FC\u63A5\uFF1Aclick_id\u3001ad_id")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u54C1\u724C\u5F62\u8C61"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u89C6\u9891\u53F7",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u8425\u9500\u7EC4\u4EF6"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: "\u6D6E\u5C42\u5361\u7247",
    disabled: true,
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "\u6240\u6709\u521B\u610F\u5171\u7528\u540C\u4E00\u4E2A\u54C1\u724C\u5F62\u8C61\u548C\u8425\u9500\u7EC4\u4EF6"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center gap-4 pb-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (selectedAccountIds.length === 0) {
        notify('请先选择至少一个账户', 'error');
        return;
      }
      var summary = getBuildSummary();
      notify("\u914D\u7F6E\u5DF2\u51C6\u5907\u597D\uFF0C\u5171 ".concat(summary.accountCount, " \u4E2A\u8D26\u6237\uFF0C\u5C06\u521B\u5EFA ").concat(summary.totalUnits, " \u4E2A\u5355\u5143\u3001").concat(summary.totalCreatives, " \u4E2A\u521B\u610F"), 'success');
    },
    className: "btn-primary text-lg px-8 py-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-paper-plane mr-2"
  }), "\u5E94\u7528\u914D\u7F6E\u5230\u6240\u6709\u8D26\u6237"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      if (selectedAccountIds.length === 0) {
        notify('请先选择账户', 'error');
        return;
      }
      setShowPreview(true);
    },
    className: "btn-secondary text-lg px-8 py-3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fas fa-eye mr-2"
  }), "\u9884\u89C8\u5168\u90E8")), selectedAccountIds.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl shadow-sm border p-6 mb-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-md font-bold text-gray-900 mb-4"
  }, "\u8D26\u6237\u914D\u7F6E\u8FDB\u5EA6"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  }, selectedAccountIds.map(function (id) {
    var acc = MOCK.accounts.find(function (a) {
      return a.id === id;
    });
    var hasTargeting = targetingSource === 'package' ? selectedTargetingPackages.length > 0 : geoSelectedProvinces.length > 0 || geoMode === 'unlimited';
    var hasBid = bidAmount !== '';
    var hasMaterial = selectedMaterials.length > 0;
    var hasCopy = selectedCopies.length > 0;
    var doneCount = [hasTargeting, hasBid, hasMaterial, hasCopy].filter(Boolean).length;
    var totalCount = 4;
    var pct = Math.round(doneCount / totalCount * 100);
    var tpCount = targetingSource === 'package' ? Math.max(selectedTargetingPackages.length, 1) : 1;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: "border border-gray-200 rounded-lg p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-medium text-gray-900 text-sm"
    }, acc ? acc.name : id), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-gray-500"
    }, pct, "%")), /*#__PURE__*/React.createElement("div", {
      className: "w-full bg-gray-200 rounded-full h-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-blue-500 h-2 rounded-full transition-all",
      style: {
        width: "".concat(pct, "%")
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1 text-xs"
    }, /*#__PURE__*/React.createElement("p", {
      className: hasTargeting ? 'text-green-600' : 'text-gray-400'
    }, hasTargeting ? '✓' : '○', " \u5B9A\u5411\u914D\u7F6E ", targetingSource === 'package' && selectedTargetingPackages.length > 0 ? "(".concat(selectedTargetingPackages.length, "\u5305)") : ''), /*#__PURE__*/React.createElement("p", {
      className: hasBid ? 'text-green-600' : 'text-gray-400'
    }, hasBid ? '✓' : '○', " \u51FA\u4EF7\u8BBE\u5B9A"), /*#__PURE__*/React.createElement("p", {
      className: hasMaterial ? 'text-green-600' : 'text-gray-400'
    }, hasMaterial ? '✓' : '○', " \u521B\u610F\u7D20\u6750(", selectedMaterials.length, ")"), /*#__PURE__*/React.createElement("p", {
      className: hasCopy ? 'text-green-600' : 'text-gray-400'
    }, hasCopy ? '✓' : '○', " \u5E7F\u544A\u6587\u6848(", selectedCopies.length, ")"), /*#__PURE__*/React.createElement("p", {
      className: "text-blue-600 font-medium"
    }, "\u5355\u5143\u6570\uFF1A", tpCount)));
  })))), /*#__PURE__*/React.createElement(MaterialModal, {
    show: showMaterialModal,
    onClose: function onClose() {
      return setShowMaterialModal(false);
    },
    onConfirm: function onConfirm(materials) {
      setSelectedMaterials(materials);
      setShowMaterialModal(false);
    },
    selectedMaterials: selectedMaterials
  }), /*#__PURE__*/React.createElement(CopyModal, {
    show: showCopyModal,
    onClose: function onClose() {
      return setShowCopyModal(false);
    },
    onConfirm: function onConfirm(copies) {
      setSelectedCopies(copies);
      setShowCopyModal(false);
    },
    selectedCopies: selectedCopies
  }), showPreview && function (_MOCK$businessTypes$f, _MOCK$specificProduct) {
    var summary = getBuildSummary();
    var accountCount = summary.accountCount,
      tpCount = summary.tpCount,
      unitsPerAccount = summary.unitsPerAccount,
      totalUnits = summary.totalUnits,
      materialCount = summary.materialCount,
      copyCount = summary.copyCount,
      creativesPerUnit = summary.creativesPerUnit,
      totalCreatives = summary.totalCreatives;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      onClick: function onClick() {
        return setShowPreview(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content w-full max-w-3xl",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between p-5 border-b"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold text-gray-900"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-chart-pie mr-2 text-blue-500"
    }), "\u642D\u5EFA\u914D\u7F6E\u9884\u89C8"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setShowPreview(false);
      },
      className: "text-gray-400 hover:text-gray-600"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "overflow-auto flex-1 p-6",
      style: {
        maxHeight: '70vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-6 text-center shadow-xl"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm opacity-80 mb-3"
    }, "\u642D\u5EFA\u603B\u91CF\u9884\u89C8"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-3 flex-wrap text-2xl font-bold"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bg-white/20 px-4 py-2 rounded-xl"
    }, accountCount, " \u4E2A\u8D26\u6237"), /*#__PURE__*/React.createElement("span", {
      class: "text-3xl"
    }, "\xD7"), /*#__PURE__*/React.createElement("span", {
      className: "bg-white/20 px-4 py-2 rounded-xl"
    }, unitsPerAccount, " \u4E2A\u5355\u5143/\u8D26\u6237"), /*#__PURE__*/React.createElement("span", {
      class: "text-3xl"
    }, "\xD7"), /*#__PURE__*/React.createElement("span", {
      className: "bg-white/20 px-4 py-2 rounded-xl"
    }, copyCount, " \u6761\u6587\u6848")), /*#__PURE__*/React.createElement("div", {
      className: "mt-5 pt-5 border-t border-white/30"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-5xl font-extrabold tracking-tight"
    }, totalCreatives.toLocaleString()), /*#__PURE__*/React.createElement("p", {
      className: "text-base opacity-80 mt-1"
    }, "\u5171\u642D\u5EFA ", totalCreatives.toLocaleString(), " \u4E2A\u521B\u610F"))), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-3xl font-bold text-blue-600"
    }, accountCount), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-blue-700 mt-1"
    }, "\u9009\u62E9\u8D26\u6237")), /*#__PURE__*/React.createElement("div", {
      className: "bg-green-50 border border-green-200 rounded-xl p-4 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-3xl font-bold text-green-600"
    }, totalUnits), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-green-700 mt-1"
    }, "\u603B\u5355\u5143\u6570\uFF08", accountCount, "\xD7", unitsPerAccount, "\uFF09")), /*#__PURE__*/React.createElement("div", {
      className: "bg-orange-50 border border-orange-200 rounded-xl p-4 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-3xl font-bold text-orange-600"
    }, materialCount), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-orange-700 mt-1"
    }, "\u7D20\u6750\u6570")), /*#__PURE__*/React.createElement("div", {
      className: "bg-purple-50 border border-purple-200 rounded-xl p-4 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-3xl font-bold text-purple-600"
    }, copyCount), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-purple-700 mt-1"
    }, "\u5E7F\u544A\u6587\u6848"))), targetingSource === 'package' && selectedTargetingPackages.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "border border-blue-200 rounded-xl overflow-hidden mb-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-blue-50 px-4 py-3 border-b border-blue-200"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-sm font-semibold text-blue-900"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-bullseye mr-2"
    }), "\u5B9A\u5411\u5305\u660E\u7EC6\uFF08\u6BCF\u5305 = 1 \u5355\u5143/\u8D26\u6237\uFF09")), /*#__PURE__*/React.createElement("div", {
      className: "divide-y divide-blue-100"
    }, selectedTargetingPackages.map(function (tpId, idx) {
      var tp = MOCK.targetingPackages.find(function (t) {
        return t.id === tpId;
      });
      return tp ? /*#__PURE__*/React.createElement("div", {
        key: tpId,
        className: "px-4 py-3 flex items-center justify-between hover:bg-blue-50"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold"
      }, idx + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "text-sm font-medium text-gray-900"
      }, tp.name), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-gray-500"
      }, tp.region, " | ", tp.age, "\u5C81 | ", tp.gender))), /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-blue-600 font-medium"
      }, accountCount, " \u8D26\u6237 \xD7 1 \u5355\u5143")) : null;
    }))), /*#__PURE__*/React.createElement("div", {
      className: "border border-gray-200 rounded-xl overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gray-50 px-4 py-3 border-b"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-sm font-semibold text-gray-700"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-list-ul mr-2"
    }), "\u5404\u8D26\u6237\u642D\u5EFA\u660E\u7EC6")), /*#__PURE__*/React.createElement("div", {
      className: "divide-y divide-gray-100"
    }, selectedAccountIds.map(function (id, idx) {
      var acc = MOCK.accounts.find(function (a) {
        return a.id === id;
      });
      return /*#__PURE__*/React.createElement("div", {
        key: id,
        className: "px-4 py-3 flex items-center justify-between hover:bg-gray-50"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-3"
      }, /*#__PURE__*/React.createElement("span", {
        className: "w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold"
      }, idx + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "text-sm font-medium text-gray-900"
      }, acc ? acc.name : id), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-gray-400"
      }, acc !== null && acc !== void 0 && acc.kaboshi ? acc.kaboshi.substring(0, 35) + '...' : ''))), /*#__PURE__*/React.createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-sm font-bold text-gray-900"
      }, unitsPerAccount, " \u5355\u5143 \xD7 ", copyCount, " \u6587\u6848 \xD7 ", materialCount, " \u7D20\u6750 = ", /*#__PURE__*/React.createElement("span", {
        className: "text-blue-600"
      }, totalCreatives / accountCount, " \u521B\u610F"))));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 bg-gray-50 rounded-xl p-4"
    }, /*#__PURE__*/React.createElement("h4", {
      className: "text-sm font-semibold text-gray-700 mb-3"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-cog mr-2"
    }), "\u5173\u952E\u914D\u7F6E\u6458\u8981"), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-x-6 gap-y-2 text-sm"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u4E1A\u52A1\u7C7B\u578B\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, (_MOCK$businessTypes$f = MOCK.businessTypes.find(function (b) {
      return b.id === businessType;
    })) === null || _MOCK$businessTypes$f === void 0 ? void 0 : _MOCK$businessTypes$f.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u6295\u653E\u7248\u4F4D\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, placement === 'wechat_video' ? '微信视频号' : '微信公众号与小程序')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u5177\u4F53\u4EA7\u54C1\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, (_MOCK$specificProduct = MOCK.specificProducts.find(function (sp) {
      return sp.id === specificProduct;
    })) === null || _MOCK$specificProduct === void 0 ? void 0 : _MOCK$specificProduct.name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u51FA\u4EF7\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, bidAmount ? "\xA5".concat(bidAmount) : '未设置')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u5B9A\u5411\u65B9\u5F0F\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, targetingSource === 'package' ? '定向包：' + (selectedTargetingPackages.length > 0 ? "".concat(selectedTargetingPackages.length, " \u4E2A\u5B9A\u5411\u5305") : '未选择') : '自定义定向')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-500"
    }, "\u8425\u9500\u5355\u5143\u540D\u79F0\uFF1A"), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, unitName || '未设置'))))), /*#__PURE__*/React.createElement("div", {
      className: "p-5 border-t flex justify-end gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setShowPreview(false);
      },
      className: "btn-secondary"
    }, "\u5173\u95ED"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setShowPreview(false);
        notify("\u5DF2\u786E\u8BA4\u642D\u5EFA ".concat(accountCount, " \u4E2A\u8D26\u6237 \xD7 ").concat(totalUnits, " \u4E2A\u5355\u5143\uFF0C\u5171 ").concat(totalCreatives, " \u4E2A\u521B\u610F"), 'success');
      },
      className: "btn-primary"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-check mr-2"
    }), "\u786E\u8BA4\u642D\u5EFA"))));
  }(), showSaveTgtPkgModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: function onClick() {
      return setShowSaveTgtPkgModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content w-full max-w-lg",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-6 py-4 border-b"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-gray-900"
  }, "\u4FDD\u5B58\u4E3A\u5B9A\u5411\u5305"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowSaveTgtPkgModal(false);
    },
    className: "text-gray-400 hover:text-gray-600 text-xl"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1"
  }, "\u5B9A\u5411\u5305\u540D\u79F0 ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    value: saveTgtPkgName,
    onChange: function onChange(e) {
      return setSaveTgtPkgName(e.target.value);
    },
    placeholder: "\u8F93\u5165\u5B9A\u5411\u5305\u540D\u79F0",
    className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-50 border border-gray-200 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-gray-700 mb-3"
  }, "\u5F53\u524D\u914D\u7F6E\u6458\u8981"), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u5730\u7406\u4F4D\u7F6E\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, geoMode === 'unlimited' ? '不限' : geoMode === 'region' ? Object.values(geoSelectedCities).flat().length > 0 ? Object.values(geoSelectedCities).flat().join('、') : '已选择城市' : '地图选择')), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u5E74\u9F84\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, ageSelections.includes('unlimited') ? '不限' : ageSelections.filter(function (a) {
    return a !== 'unlimited';
  }).join('、'))), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u6027\u522B\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, genderSelection === 'unlimited' ? '不限' : genderSelection)), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u6392\u9664\u5DF2\u8F6C\u5316\u7528\u6237\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, excludeConvertedMode === 'unlimited' ? '不限' : excludeConvertedMode)), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u81EA\u5B9A\u4E49\u4EBA\u7FA4\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, audienceMode === 'unlimited' ? '不限' : '排除人群：' + selectedExcludeAudiences.join('、'))), /*#__PURE__*/React.createElement("div", {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u8F6C\u5316\u884C\u4E3A\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, conversionBehavior === 'optimize' ? '优化行为' : '指定行为：' + (window.__customConversionName || '已选择指定行为'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u8F6C\u5316\u65F6\u95F4\u533A\u95F4\uFF1A"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-900 ml-1"
  }, conversionTimeRange === 'today' ? '今天' : conversionTimeRange === '7day' ? '最近7天' : conversionTimeRange === '1month' ? '最近1个月' : conversionTimeRange === '3month' ? '最近3个月' : '最近6个月'))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "\u5C06\u4FDD\u5B58\u4EE5\u4E0A\u914D\u7F6E\u4E3A\u5B9A\u5411\u5305\uFF0C\u53EF\u5728\u300C\u5B9A\u5411\u5305\u300D\u6A21\u5F0F\u4E0B\u91CD\u590D\u4F7F\u7528\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-4 border-t flex gap-2 justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setSaveTgtPkgName('');
      setShowSaveTgtPkgModal(false);
    },
    className: "btn-secondary text-sm"
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("button", {
    onClick: doSaveAsTgtPkg,
    className: "btn-primary text-sm"
  }, "\u4FDD\u5B58")))));
}

window.App = App;
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
