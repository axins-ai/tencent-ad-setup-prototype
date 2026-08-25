const { useState, useEffect, useRef, useMemo } = React;

// ========== Mock 数据 ==========
const MOCK = {
  businessTypes: [
    { id: 'benefit_A', name: '权益A' },
    { id: 'benefit_B', name: '权益B' },
    { id: 'benefit_C', name: '权益C' }
  ],
  channels: [
    { id: 'oceanengine', name: '巨量引擎' }
  ],
  // 业务单元
  businessUnits: [
    { id: 'baiju', name: '白驹' },
    { id: 'fenghua', name: '烽华' },
    { id: 'fuwei', name: '服微' }
  ],
  // 营销目的
  marketingObjectives: [
    { id: 'lead', name: '线索留咨' },
    { id: 'sales', name: '商品销售' }
  ],
  // 产品（按业务单元分类）
  productsByBusinessUnit: {
    'baiju': [
      { id: 'bj_001', name: '白驹产品A' },
      { id: 'bj_002', name: '白驹产品B' },
      { id: 'bj_003', name: '白驹产品C' }
    ],
    'fenghua': [
      { id: 'fh_001', name: '烽华产品X' },
      { id: 'fh_002', name: '烽华产品Y' },
      { id: 'fh_003', name: '烽华产品Z' }
    ],
    'fuwei': [
      { id: 'fw_001', name: '服微产品1' },
      { id: 'fw_002', name: '服微产品2' },
      { id: 'fw_003', name: '服微产品3' }
    ]
  },
  // 活动类产品（推广产品=活动时展示）
  activityProducts: [
    { id: 'act_001', name: '618品牌大促' },
    { id: 'act_002', name: '双11狂欢活动' },
    { id: 'act_003', name: '会员日专享活动' }
  ],
  // 商品库（营销产品下拉）
  productLibrary: [
    { id: 'p_001', name: '5G智享套餐', image: '📱', sellingPoints: ['高速流量', '全国通话', '免费副卡'] },
    { id: 'p_002', name: '家庭千兆宽带', image: '🌐', sellingPoints: ['千兆速率', '稳定不掉线', '免费安装'] },
    { id: 'p_003', name: '合约机0元购', image: '📦', sellingPoints: ['0元购机', '月租返还', '免息分期'] },
    { id: 'p_004', name: '移动云盘会员', image: '☁️', sellingPoints: ['空间扩容', '自动备份', '多端同步'] },
    { id: 'p_005', name: '权益会员包', image: '🎁', sellingPoints: ['视频会员', '音乐会员', '购物折扣'] }
  ],
  // 转化目标（按业务单元分类）
  conversionsByBusinessUnit: {
    'baiju': [
      { id: 'bj_conv_001', name: '白驹-表单提交' },
      { id: 'bj_conv_002', name: '白驹-在线咨询' },
      { id: 'bj_conv_003', name: '白驹-电话咨询' }
    ],
    'fenghua': [
      { id: 'fh_conv_001', name: '烽华-商品购买' },
      { id: 'fh_conv_002', name: '烽华-加入购物车' },
      { id: 'fh_conv_003', name: '烽华-收藏商品' }
    ],
    'fuwei': [
      { id: 'fw_conv_001', name: '服微-预约咨询' },
      { id: 'fw_conv_002', name: '服微-服务购买' }
    ]
  },
  accounts: [
    { id: '38572691', name: '38572691', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG001', businessUnit: 'baiju' },
    { id: '92743108', name: '92743108', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG002', businessUnit: 'baiju' },
    { id: '61480293', name: '61480293', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG003', businessUnit: 'baiju' },
    { id: '50371846', name: '50371846', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG004', businessUnit: 'fenghua' },
    { id: '18264903', name: '18264903', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG005', businessUnit: 'fenghua' },
    { id: '74058261', name: '74058261', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG006', businessUnit: 'fenghua' },
    { id: '36901784', name: '36901784', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG007', businessUnit: 'fuwei' },
    { id: '21835097', name: '21835097', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG008', businessUnit: 'fuwei' },
    { id: '95620143', name: '95620143', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG009', businessUnit: 'fuwei' },
    { id: '84761502', name: '84761502', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TG010', businessUnit: 'baiju' },
    { id: '88550021', name: '88550021', kaboshi: null, businessUnit: 'baiju' },
  ],
  specificProducts: [
    { id: 'sp_001', name: '移动大王卡19元档' },
    { id: 'sp_002', name: '移动大王卡39元档' },
    { id: 'sp_003', name: '联通冰激凌99元档' },
    { id: 'sp_004', name: '电信天翼畅享套餐' }
  ],
  targetingPackages: [
    { id: 'tp_001', channel: 'toutiao', name: '一线城市年轻人群', region: '北京/上海/广州/深圳', age: '18-35', gender: '不限' },
    { id: 'tp_002', channel: 'toutiao', name: '全国流量敏感用户', region: '全国', age: '20-45', gender: '不限' },
    { id: 'tp_003', channel: 'toutiao', name: '学生群体', region: '全国', age: '18-24', gender: '不限' },
    { id: 'tp_004', channel: 'toutiao', name: '上班族', region: '一二线城市', age: '25-40', gender: '不限' },
    { id: 'tp_005', channel: 'toutiao', name: '中老年群体', region: '全国', age: '40-65', gender: '不限' },
    { id: 'tp_006', channel: 'toutiao', name: '游戏爱好者', region: '全国', age: '18-30', gender: '男' },
    { id: 'tp_007', channel: 'toutiao', name: '视频观看用户', region: '全国', age: '18-45', gender: '女' },
    { id: 'tp_008', channel: 'toutiao', name: '电商购物用户', region: '一二三线城市', age: '22-40', gender: '女' },
    { id: 'tp_tt_001', channel: 'toutiao', name: '头条-美妆兴趣人群', region: '全国', age: '18-35', gender: '女' }
  ],
  regions: ['北京','上海','广州','深圳','杭州','成都','重庆','武汉','南京','西安','全国'],
  ages: ['18-24','25-30','31-35','36-40','41-50','不限'],
  genders: ['男','女','不限'],
  customAudiences: [
    { id: 'ca_001', name: '上周访问用户' },
    { id: 'ca_002', name: '近30天活跃用户' },
    { id: 'ca_003', name: '高价值用户' }
  ],
  excludeConversions: [
    { id: 'ec_001', name: '已提交表单用户' },
    { id: 'ec_002', name: '已转化用户' }
  ],
  // 品牌形象 & 抖音号
  brandImages: [
    { id: 'bi_001', name: '品牌形象1', url: 'https://example.com/bi1.jpg' },
    { id: 'bi_002', name: '品牌形象2', url: 'https://example.com/bi2.jpg' },
    { id: 'bi_003', name: '品牌形象3', url: 'https://example.com/bi3.jpg' },
  ],
  videoAccounts: [
    { id: 'va_001', name: '抖音号A' },
    { id: 'va_002', name: '抖音号B' },
    { id: 'va_003', name: '抖音号C' },
  ],
  // 素材库（视频+图片），带消耗/CTR/CVR数据
  videoMaterials: Array.from({length: 500}, (_, i) => ({
    id: `v_${String(i+1).padStart(3,'0')}`,
    name: `视频素材${i+1}`,
    type: 'video',
    duration: ['0:30','1:00','1:30','2:00'][i%4],
    size: ['15MB','28MB','20MB','55MB'][i%4],
    thumb: '🎬',
    spend: Math.round((Math.random()*5000+100)*100)/100,
    ctr: Math.round((Math.random()*5+1)*100)/100,
    cvr: Math.round((Math.random()*10+0.5)*100)/100,
  })),
  imageMaterials: Array.from({length: 500}, (_, i) => ({
    id: `i_${String(i+1).padStart(3,'0')}`,
    name: `图片素材${i+1}`,
    type: 'image',
    size: ['120KB','250KB','80KB','300KB'][i%4],
    thumb: '🖼️',
    spend: Math.round((Math.random()*3000+50)*100)/100,
    ctr: Math.round((Math.random()*4+0.5)*100)/100,
    cvr: Math.round((Math.random()*8+0.3)*100)/100,
  })),
  copyLibrary: [
    { id: 'c_001', content: '限时优惠，立即办理！', ctr: 3.5 },
    { id: 'c_002', content: '高速流量，畅享无忧', ctr: 2.8 },
    { id: 'c_003', content: '新用户专享，首月免费', ctr: 4.2 },
    { id: 'c_004', content: '点击下方，立即领取', ctr: 3.1 },
    { id: 'c_005', content: '全国通用，无漫游费', ctr: 2.5 },
    { id: 'c_006', content: '套餐可续订，随时取消', ctr: 3.8 },
    { id: 'c_007', content: '5G极速，畅快体验', ctr: 3.2 },
    { id: 'c_008', content: '家庭共享，多人更划算', ctr: 2.9 },
    { id: 'c_tt_001', content: '刷到就是缘分，点个关注不迷路～', ctr: 3.6 },
    { id: 'c_tt_002', content: '这款好物真的绝了，姐妹们冲鸭！', ctr: 4.1 },
    { id: 'c_tt_003', content: '限时福利，点击下方链接马上领', ctr: 3.3 }
  ],
  // 文案包
  copyPackages: [
    { id: 'cpkg_001', channel: 'toutiao', name: '新客引流包', copies: ['c_002', 'c_003', 'c_007'] },
    { id: 'cpkg_002', channel: 'toutiao', name: '优惠促活包', copies: ['c_001', 'c_004', 'c_006'] },
    { id: 'cpkg_003', channel: 'toutiao', name: '品牌形象包', copies: ['c_005', 'c_008'] },
    { id: 'cpkg_tt_001', channel: 'toutiao', name: '头条-短视频种草包', copies: ['c_tt_001', 'c_tt_002', 'c_tt_003'] }
  ],
  // 级联地区数据（用于自定义定向）
  // 若已加载 region-data.js，则使用完整数据；否则使用内联数据（降级）
  regionCascade: window.REGION_DATA ? {
    countries: [{ id: 'cn', name: '中国' }],
    provinces: { cn: window.REGION_DATA.provinces },
    cities: window.REGION_DATA.cities
  } : {
    countries: [{ id: 'cn', name: '中国' }],
    provinces: {
      cn: [
        { id: 'beijing', name: '北京市' },
        { id: 'tianjin', name: '天津市' },
        { id: 'hebei', name: '河北省' },
        { id: 'shanxi', name: '山西省' },
        { id: 'neimenggu', name: '内蒙古自治区' },
        { id: 'liaoning', name: '辽宁省' },
        { id: 'jilin', name: '吉林省' },
        { id: 'heilongjiang', name: '黑龙江省' },
        { id: 'shanghai', name: '上海市' },
        { id: 'jiangsu', name: '江苏省' },
        { id: 'zhejiang', name: '浙江省' },
        { id: 'anhui', name: '安徽省' },
        { id: 'fujian', name: '福建省' },
        { id: 'jiangxi', name: '江西省' },
        { id: 'shandong', name: '山东省' },
        { id: 'henan', name: '河南省' },
        { id: 'hubei', name: '湖北省' },
        { id: 'hunan', name: '湖南省' },
        { id: 'guangdong', name: '广东省' },
        { id: 'guangxi', name: '广西壮族自治区' },
        { id: 'hainan', name: '海南省' },
        { id: 'chongqing', name: '重庆市' },
        { id: 'sichuan', name: '四川省' },
        { id: 'guizhou', name: '贵州省' },
        { id: 'yunnan', name: '云南省' },
        { id: 'xizang', name: '西藏自治区' },
        { id: 'shaanxi', name: '陕西省' },
        { id: 'gansu', name: '甘肃省' },
        { id: 'qinghai', name: '青海省' },
        { id: 'ningxia', name: '宁夏回族自治区' },
        { id: 'xinjiang', name: '新疆维吾尔自治区' },
        { id: 'taiwan', name: '台湾省' },
        { id: 'xianggang', name: '香港特别行政区' },
        { id: 'aomen', name: '澳门特别行政区' }
      ]
    },
    cities: {
      beijing: ['北京市'],
      tianjin: ['天津市'],
      hebei: ['石家庄市','唐山市','秦皇岛市','邯郸市','邢台市','保定市','张家口市','承德市','沧州市','廊坊市','衡水市'],
      shanxi: ['太原市','大同市','阳泉市','长治市','晋城市','朔州市','晋中市','运城市','忻州市','临汾市','吕梁市'],
      neimenggu: ['呼和浩特市','包头市','乌海市','赤峰市','通辽市','鄂尔多斯市','呼伦贝尔市','巴彦淖尔市','乌兰察布市'],
      liaoning: ['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','营口市','阜新市','辽阳市','盘锦市','铁岭市','朝阳市','葫芦岛市'],
      jilin: ['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延边朝鲜族自治州'],
      heilongjiang: ['哈尔滨市','齐齐哈尔市','鸡西市','鹤岗市','双鸭山市','大庆市','伊春市','佳木斯市','七台河市','牡丹江市','黑河市','绥化市','大兴安岭地区'],
      shanghai: ['上海市'],
      jiangsu: ['南京市','无锡市','徐州市','常州市','苏州市','南通市','连云港市','淮安市','盐城市','扬州市','镇江市','泰州市','宿迁市'],
      zhejiang: ['杭州市','宁波市','温州市','嘉兴市','湖州市','绍兴市','金华市','衢州市','舟山市','台州市','丽水市'],
      anhui: ['合肥市','芜湖市','蚌埠市','淮南市','马鞍山市','淮北市','铜陵市','安庆市','黄山市','滁州市','阜阳市','宿州市','六安市','亳州市','池州市','宣城市'],
      fujian: ['福州市','厦门市','莆田市','三明市','泉州市','漳州市','南平市','龙岩市','宁德市'],
      jiangxi: ['南昌市','景德镇市','萍乡市','九江市','新余市','鹰潭市','赣州市','吉安市','宜春市','抚州市','上饶市'],
      shandong: ['济南市','青岛市','淄博市','枣庄市','东营市','烟台市','潍坊市','济宁市','泰安市','威海市','日照市','临沂市','德州市','聊城市','滨州市','菏泽市'],
      henan: ['郑州市','开封市','洛阳市','平顶山市','安阳市','鹤壁市','新乡市','焦作市','濮阳市','许昌市','漯河市','三门峡市','南阳市','商丘市','信阳市','周口市','驻马店市','济源市'],
      hubei: ['武汉市','黄石市','十堰市','宜昌市','襄阳市','鄂州市','荆门市','孝感市','荆州市','黄冈市','咸宁市','随州市','恩施土家族苗族自治州','仙桃市','潜江市','天门市','神农架林区'],
      hunan: ['长沙市','株洲市','湘潭市','衡阳市','邵阳市','岳阳市','常德市','张家界市','益阳市','郴州市','永州市','怀化市','娄底市','湘西土家族苗族自治州'],
      guangdong: ['广州市','韶关市','深圳市','珠海市','汕头市','佛山市','江门市','湛江市','茂名市','肇庆市','惠州市','梅州市','汕尾市','河源市','阳江市','清远市','东莞市','中山市','潮州市','揭阳市','云浮市'],
      guangxi: ['南宁市','柳州市','桂林市','梧州市','北海市','防城港市','钦州市','贵港市','玉林市','百色市','贺州市','河池市','来宾市','崇左市'],
      hainan: ['海口市','三亚市','三沙市','儋州市'],
      chongqing: ['重庆市'],
      sichuan: ['成都市','自贡市','攀枝花市','泸州市','德阳市','绵阳市','广元市','遂宁市','内江市','乐山市','南充市','眉山市','宜宾市','广安市','达州市','雅安市','巴中市','资阳市','阿坝藏族羌族自治州','甘孜藏族自治州','凉山彝族自治州'],
      guizhou: ['贵阳市','六盘水市','遵义市','安顺市','毕节市','铜仁市','黔西南布依族苗族自治州','黔东南苗族侗族自治州','黔南布依苗族自治州'],
      yunnan: ['昆明市','曲靖市','玉溪市','保山市','昭通市','丽江市','普洱市','临沧市','楚雄彝族自治州','红河哈尼族彝族自治州','文山壮族苗族自治州','西双版纳傣族自治州','大理白族自治州','德宏傣族景颇族自治州','怒江傈僳族自治州','迪庆藏族自治州'],
      xizang: ['拉萨市','日喀则市','昌都市','林芝市','山南市','那曲市'],
      shaanxi: ['西安市','铜川市','宝鸡市','咸阳市','渭南市','延安市','汉中市','榆林市','安康市','商洛市'],
      gansu: ['兰州市','嘉峪关市','金昌市','白银市','天水市','武威市','张掖市','平凉市','酒泉市','庆阳市','定西市','陇南市','临夏回族自治州','甘南藏族自治州'],
      qinghai: ['西宁市','海东市','海北藏族自治州','黄南藏族自治州','海南藏族自治州','果洛藏族自治州','玉树藏族自治州','海西蒙古族藏族自治州'],
      ningxia: ['银川市','石嘴山市','吴忠市','固原市','中卫市'],
      xinjiang: ['乌鲁木齐市','克拉玛依市','吐鲁番市','哈密市','昌吉回族自治州','博尔塔拉蒙古自治州','巴音郭楞蒙古自治州','阿克苏地区','克孜勒苏柯尔克孜自治州','喀什地区','和田地区','伊犁哈萨克自治州','塔城地区','阿勒泰地区','石河子市','阿拉尔市','图木舒克市','五家渠市'],
      taiwan: ['台北市','新北市','桃园市','台中市','台南市','高雄市'],
      xianggang: ['香港'],
      aomen: ['澳门']
    }
  },
  // 附加广告组件 - 资产库（点击「附加广告组件」按钮拉起）
  creativeComponents: [
    { id: 'cc_001', name: '门店地址卡', type: '门店', desc: '展示附近门店与地图导航' },
    { id: 'cc_002', name: '表单组件', type: '表单', desc: '落地页内嵌留资表单' },
    { id: 'cc_003', name: '商品卡片', type: '商品', desc: '展示商品主图与卖点' },
    { id: 'cc_004', name: '优惠券组件', type: '优惠', desc: '领取与使用优惠券' },
    { id: 'cc_005', name: '预约组件', type: '预约', desc: '在线预约到店/服务' },
    { id: 'cc_006', name: '电话拨打', type: '联系', desc: '一键拨打咨询电话' },
    { id: 'cc_007', name: '投票调研', type: '互动', desc: '用户投票与问卷' },
    { id: 'cc_008', name: '粉丝关注', type: '关注', desc: '引导关注抖音号' }
  ],
};


// 素材库弹窗（视频+图片，带排序和日期维度）

// 文案库弹窗（以文案包为单位选择，支持新增文案包）

// 周历时间网格组件
// 最小单位：1小时（视觉上每1小时分2个0.5h格子，共48列/天）
// 带图片的自定义下拉（原生 select 无法显示图片，用按钮+浮层模拟）
function ImageSelect({ value, options, placeholder, emptyText, onSelect }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-left"
      >
        <span className="flex items-center gap-2 min-w-0">
          {selected ? (
            <>
              <img src={selected.thumb} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
              <span className="text-sm text-gray-800 truncate">{selected.label}</span>
            </>
          ) : (
            <span className="text-sm text-gray-400">{placeholder}</span>
          )}
        </span>
        <span className="text-gray-400 text-xs ml-2 flex-shrink-0">▾</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-400">{emptyText}</div>
          ) : (
            options.map(o => (
              <button
                type="button"
                key={o.value}
                onClick={() => { onSelect(o); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 ${o.value === value ? 'bg-blue-50' : ''}`}
              >
                <img src={o.thumb} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                <span className="text-sm text-gray-800 truncate">{o.label}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
// 通用「点击展开」多选下拉（替代原生 select multiple，保证美观）
function MultiSelectDropdown({ options, selected, onChange, placeholder = '请选择', emptyText = '暂无选项', triggerClass = '', panelMaxHeight = 240, compact = false, single = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);
  const toggle = (val) => {
    if (single) {
      // 单选：点击已选项则清空，否则替换为该项
      onChange((selected.length === 1 && selected[0] === val) ? [] : [val]);
    } else {
      const next = selected.includes(val) ? selected.filter(x => x !== val) : [...selected, val];
      onChange(next);
    }
  };
  const summary = selected.length === 0
    ? <span className="text-gray-400">{placeholder}</span>
    : (single
        ? <span className="text-gray-800 truncate">{options.find(o => o.value === selected[0]) ? options.find(o => o.value === selected[0]).label : placeholder}</span>
        : <span className="text-gray-800">{`已选 ${selected.length} 个`}</span>);
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-2.5 py-1.5 border border-gray-300 rounded-md bg-white text-left hover:border-blue-400 focus:ring-1 focus:ring-blue-500 outline-none ${compact ? 'text-xs' : 'text-sm'} ${triggerClass}`}
      >
        <span className="truncate">{summary}</span>
        <span className={`text-gray-400 ml-1 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="absolute z-40 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-auto" style={{ maxHeight: panelMaxHeight }}>
          {options.length === 0 ? (
            <div className="px-3 py-2 text-xs text-gray-400">{emptyText}</div>
          ) : (
            options.map(o => {
              const checked = selected.includes(o.value);
              return (
                <button
                  type="button"
                  key={o.value}
                  onClick={() => toggle(o.value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 ${compact ? 'text-xs' : 'text-sm'} ${checked ? 'bg-blue-50' : ''}`}
                >
                  {checked ? (
                    <span className="w-4 h-4 rounded bg-blue-500 border border-blue-500 flex items-center justify-center flex-shrink-0 text-white">
                      <i className="fas fa-check text-[10px]"></i>
                    </span>
                  ) : (
                    <span className="w-4 h-4 flex-shrink-0"></span>
                  )}
                  <span className={checked ? 'text-blue-700 font-medium truncate' : 'text-gray-800 truncate'}>{o.label}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// 优化师：根据账户ID确定性映射到姓名（原型 mock）
const OPTIMIZERS = ['张伟', '李娜', '王芳', '刘洋', '陈静', '赵磊', '孙强', '周敏'];
function getOptimizerName(accountId) {
  let h = 0;
  for (let i = 0; i < accountId.length; i++) h = (h * 31 + accountId.charCodeAt(i)) >>> 0;
  return OPTIMIZERS[h % OPTIMIZERS.length];
}

// 当前登录优化师（原型 mock；用于和账户优化师比对，不一致时标红警示）
const LOGIN_USER = '张伟';

// 通知组件
const { Notification, MaterialModal, CopyModal, TimeGrid } = window.UI;

// 按钮开关组件（关闭状态样式）
function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

// 主应用
function App() {
  // ===== 基础配置 =====
  // 省份 ID -> 中文名称映射
  const provinceNameMap = {};
  (MOCK.regionCascade.provinces['cn'] || []).forEach(p => { provinceNameMap[p.id] = p.name; });
  const getProvinceNames = (ids) => ids.map(id => provinceNameMap[id] || id).join('、');
  // 获取所有已选城市名称
  const getSelectedCityNames = () => {
    const cities = [];
    Object.values(geoSelectedCities).forEach(cityList => {
      cities.push(...cityList);
    });
    return cities.length > 0 ? cities.join('、') : '不限';
  };
  // 配置摘要中格式化城市列表（最多显示5个，超出显示"等XX个地区"）
  const formatCitySummary = () => {
    const cities = [];
    Object.values(geoSelectedCities).forEach(cityList => {
      cities.push(...cityList);
    });
    if (cities.length === 0) return '不限';
    if (cities.length <= 5) return cities.join('、');
    return cities.slice(0, 5).join('、') + ' 等' + cities.length + '个地区';
  };


  const [businessType, setBusinessType] = useState('benefit_A');
  const [channel, setChannel] = useState('oceanengine');
  const [selectedAccountIds, setSelectedAccountIds] = useState(MOCK.accounts.map(a => a.id)); // 默认全选账户
  const [buildType, setBuildType] = useState('project_unit'); // 搭建类型：project_unit=搭建项目和广告, unit_only=仅搭建广告
  // 项目生成规则
  const [projectGenRule, setProjectGenRule] = useState('total_per_project'); // total_per_project=按总广告数/每项目广告数, fixed=指定数量
  const [adsPerProject, setAdsPerProject] = useState(10); // 每个项目广告数上限
  const [projectsPerAccount, setProjectsPerAccount] = useState(1); // 每个账户指定项目数量
  const [projectRuleHover, setProjectRuleHover] = useState(null); // 项目生成规则角标 hover 提示
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const accountDropdownRef = useRef(null);

  // 选择账户下拉：点击空白处收起
  useEffect(() => {
    if (!showAccountDropdown) return;
    function onDocMouseDown(e) {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(e.target)) {
        setShowAccountDropdown(false);
      }
    }
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [showAccountDropdown]);
  // 投放链匹配结果刷新计数（用于强制重算/重渲染）
  const [matchRefreshKey, setMatchRefreshKey] = useState(0);

  // ===== 营销项目配置 =====
  // 任务名称
  const [taskName, setTaskName] = useState('');
  // 仅搭建广告：每个账户下已选营销项目（多选）{ [accountId]: string[] }
  const [selectedUnits, setSelectedUnits] = useState({});
  // 仅搭建项目：按账户选择要搭建的项目
  const [selectedProjects, setSelectedProjects] = useState({}); // { [accountId]: projectId[] }
  // 根据账户 id 确定性生成该账户下的营销项目明细（mock 数据）
  const getAccountUnits = (accountId) => {
    let h = 0; const s = '' + (accountId || '');
    for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; }
    const n = 3 + (h % 4); // 3~6 个项目
    const cats = ['品牌', '促销', '新品', '活动', '拉新', '留存'];
    const arr = [];
    for (let i = 0; i < n; i++) {
      const hh = (h + i * 2654435761) >>> 0;
      arr.push({ id: accountId + '_u' + i, name: cats[hh % cats.length] + '项目_' + String.fromCharCode(65 + (i % 26)) + (i + 1) });
    }
    return arr;
  };
  // 账户下的项目列表（确定性生成，模拟「已选账户下的项目列表」）
  const getAccountProjects = (accountId) => {
    let h = 0; const s = '' + (accountId || '');
    for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; }
    const n = 2 + (h % 3); // 2~4 个项目
    const cats = ['618大促', '品牌专区', '新品首发', '常规投放', '拉新拉活'];
    const arr = [];
    for (let i = 0; i < n; i++) {
      const hh = (h + i * 40503) >>> 0;
      arr.push({ id: accountId + '_p' + i, name: cats[hh % cats.length] + '项目_' + String.fromCharCode(65 + (i % 26)) + (i + 1) });
    }
    return arr;
  };
  const toggleUnit = (accountId, unitId) => {
    setSelectedUnits(prev => {
      const cur = prev[accountId] ? [...prev[accountId]] : [];
      const next = cur.includes(unitId) ? cur.filter(x => x !== unitId) : [...cur, unitId];
      return { ...prev, [accountId]: next };
    });
  };
  // 业务单元
  const [businessUnit, setBusinessUnit] = useState('baiju');
  // 推广产品类型：operator=运营商产品, activity=活动
  const [promotionType, setPromotionType] = useState('operator');
  // 营销目的
  const [marketingObjective, setMarketingObjective] = useState('lead');
  // 营销场景：short_video=短视频, image_text=图文
  const [marketingScene, setMarketingScene] = useState('short_video');
  // 营销产品分配：shared=全账户共用, per_account=分账户定制
  const [productAllocMode, setProductAllocMode] = useState('shared');
  const [perAccountProduct, setPerAccountProduct] = useState({}); // { [accountId]: productId }
  // 目标优化类型 / 深度优化方式 开关（默认关闭）
  const [targetOptType, setTargetOptType] = useState(false);
  const [deepOptType, setDeepOptType] = useState(false);
  // 产品（根据推广产品类型动态变化）
  const getProductsForBusinessUnit = () => {
    if (promotionType === 'activity') return MOCK.activityProducts || [];
    return MOCK.productsByBusinessUnit[businessUnit] || [];
  };
  const [specificProduct, setSpecificProduct] = useState(() => {
    const products = MOCK.productsByBusinessUnit['baiju'] || [];
    return products.length > 0 ? products[0].id : '';
  });
  // 当业务单元或推广产品类型变化时，重置产品选择 + 清空已选账户（跳过首次挂载，避免清空默认全选账户）
  const prevBuRef = useRef(businessUnit);
  useEffect(() => {
    if (prevBuRef.current === businessUnit) return; // 跳过首次挂载
    prevBuRef.current = businessUnit;
    const products = getProductsForBusinessUnit();
    setSpecificProduct(products.length > 0 ? products[0].id : '');
    setSelectedAccountIds([]);
  }, [businessUnit, promotionType]);
  // ===== 营销项目配置 - 定向相关 =====
  const [targetingSource, setTargetingSource] = useState('package');
  // 用户自建定向包（从 localStorage 读取，与 index.html 共用 ad_targeting_packages）
  const [userTgtPkgs, setUserTgtPkgs] = useState([]);
  // 加载自建定向包
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ad_targeting_packages');
      if (raw) setUserTgtPkgs(JSON.parse(raw));
    } catch(e) {}
  }, []);
  // 保存自建定向包
  // 删除自建定向包
  const deleteUserTgtPkg = (id) => {
    const updated = userTgtPkgs.filter(p => p.id !== id);
    setUserTgtPkgs(updated);
    localStorage.setItem('ad_targeting_packages', JSON.stringify(updated));
    // 同时从已选中移除
    setSelectedTargetingPackages(selectedTargetingPackages.filter(tid => tid !== id));
  };
  // 改为多选：支持定向包组合（同账户不同定向包 = 多个项目）
  const [selectedTargetingPackages, setSelectedTargetingPackages] = useState([]);
  const [showTgtPkgModal, setShowTgtPkgModal] = useState(false);
  // 定向包分配策略：shared=全账户共用 / per_account=分账户定制
  const [tgtAllocMode, setTgtAllocMode] = useState('shared');
  const [perAccountTgtPkgs, setPerAccountTgtPkgs] = useState({});
  const [modalSelectedIds, setModalSelectedIds] = useState([]);
  const [modalTargetAccount, setModalTargetAccount] = useState(null);
  const openSharedTgtModal = () => { setModalSelectedIds([...selectedTargetingPackages]); setModalTargetAccount(null); setShowTgtPkgModal(true); };
  const openPerAccountTgtModal = (accountId) => { setModalSelectedIds([...(perAccountTgtPkgs[accountId] || [])]); setModalTargetAccount(accountId); setShowTgtPkgModal(true); };
  // 单选：一个任务只能选择一个定向包
  const toggleModalTp = (tpId) => { setModalSelectedIds(prev => (prev.length === 1 && prev[0] === tpId) ? [] : [tpId]); };
  const confirmTgtPkgModal = () => { if (modalTargetAccount === null) { setSelectedTargetingPackages(modalSelectedIds); } else { setPerAccountTgtPkgs(prev => ({ ...prev, [modalTargetAccount]: modalSelectedIds })); } setShowTgtPkgModal(false); };
  const handleNewTgtPkg = () => { try { window.parent.postMessage({ type: 'GOTO_TARGETING_PACKAGES' }, '*'); } catch (e) {} };
  const handleRefreshTgtPkgs = () => { try { const raw = localStorage.getItem('ad_targeting_packages'); if (raw) setUserTgtPkgs(JSON.parse(raw)); notify('定向包列表已刷新', 'success'); } catch (e) { notify('刷新定向包列表失败', 'error'); } };
  // 自定义定向 - 地理位置级联
  const [geoMode, setGeoMode] = useState('region'); // 'unlimited' | 'region'
  const [geoSelectedCountry, setGeoSelectedCountry] = useState('cn');
  // 默认全选所有省份+城市
  const defaultProvinceIds = (MOCK.regionCascade.provinces['cn'] || []).map(p => p.id);
  const defaultCitiesMap = {};
  defaultProvinceIds.forEach(pid => {
    defaultCitiesMap[pid] = [...(MOCK.regionCascade.cities[pid] || [])];
  });
  const [geoSelectedProvinces, setGeoSelectedProvinces] = useState(defaultProvinceIds);
  const [geoSelectedCities, setGeoSelectedCities] = useState(defaultCitiesMap); // { provinceId: [city1, city2] }
  const [activeProvinceId, setActiveProvinceId] = useState(defaultProvinceIds[0] || ''); // 默认选中第一个省份，右侧显示城市列表
  // 地点类型（只保留常住地）
  const [locationTypeResident, setLocationTypeResident] = useState(true);

  // 地理位置：默认全选所有省份+城市
  const selectAllProvinceAndCities = () => {
    const allProvinceIds = (MOCK.regionCascade.provinces['cn'] || []).map(p => p.id);
    const allCitiesMap = {};
    allProvinceIds.forEach(pid => {
      allCitiesMap[pid] = [...(MOCK.regionCascade.cities[pid] || [])];
    });
    setGeoSelectedProvinces(allProvinceIds);
    setGeoSelectedCities(allCitiesMap);
    setActiveProvinceId(allProvinceIds.length > 0 ? allProvinceIds[0] : '');
  };

  // 年龄
  const [ageSelections, setAgeSelections] = useState(['unlimited']); // array of selected age keys
  const [customAgeMin, setCustomAgeMin] = useState('');
  const [customAgeMax, setCustomAgeMax] = useState('');
  // 性别
  const [genderSelection, setGenderSelection] = useState('unlimited'); // 'unlimited' | 'male' | 'female'
  // 自定义人群（按账户分别配置）
  const [accountAudienceSettings, setAccountAudienceSettings] = useState({}); // { [accountId]: { mode: 'unlimited'|'exclude', excludeList: [] } }
  // 人群包列表（可刷新）
  const [audiencePackageList, setAudiencePackageList] = useState([...MOCK.customAudiences]);
  const [excludeAudiencePackageList, setExcludeAudiencePackageList] = useState([...MOCK.excludeConversions]);
  const refreshAudiencePackages = (accountId) => {
    // 模拟刷新，实际应该根据账户ID从后端获取
    setAudiencePackageList([...MOCK.customAudiences]);
    notify(`账户 ${accountId} 的人群包列表已刷新`, 'success');
  };
  const refreshExcludeAudiencePackages = (accountId) => {
    setExcludeAudiencePackageList([...MOCK.excludeConversions]);
    notify(`账户 ${accountId} 的排除人群包列表已刷新`, 'success');
  };
  // 获取账户的人群配置
  const getAccountAudience = (accountId) => {
    return accountAudienceSettings[accountId] || { mode: 'unlimited', excludeList: [] };
  };
  // 更新账户的人群配置
  const updateAccountAudience = (accountId, updates) => {
    setAccountAudienceSettings(prev => ({
      ...prev,
      [accountId]: { ...getAccountAudience(accountId), ...updates }
    }));
  };
  // 排除已转化用户
  const [excludeConvertedMode, setExcludeConvertedMode] = useState('unlimited');
  // 转化目标（根据业务单元选择）
  const [conversionGoal, setConversionGoal] = useState(() => {
    const conversions = MOCK.conversionsByBusinessUnit['baiju'] || [];
    return conversions.length > 0 ? conversions[0].id : '';
  });
  // 当业务单元变化时，重置转化目标
  useEffect(() => {
    const conversions = MOCK.conversionsByBusinessUnit[businessUnit] || [];
    setConversionGoal(conversions.length > 0 ? conversions[0].id : '');
  }, [businessUnit]);
  // 转化行为
  const [conversionBehavior, setConversionBehavior] = useState('optimize'); // 'optimize' | 'custom'
  // 转化时间区间
  const [conversionTimeRange, setConversionTimeRange] = useState('7day'); // 'today' | '7day' | '1month' | '3month' | '6month'
  // 自定义人群（修复：原未声明导致弹窗渲染崩溃）
  const [audienceMode, setAudienceMode] = useState('unlimited'); // 'unlimited' | 'exclude'
  const [selectedTargetAudiences, setSelectedTargetAudiences] = useState([]);
  const [selectedExcludeAudiences, setSelectedExcludeAudiences] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [onePartyData, setOnePartyData] = useState(false); // 默认关闭，且锁定
  const [quickLaunch, setQuickLaunch] = useState(false);
  const [quickLaunchBudget, setQuickLaunchBudget] = useState('');
  const [投放日期类型, set投放日期类型] = useState('long_term'); // 'long_term' | 'custom'
  const [长期投放日期, set长期投放日期] = useState('2026-07-01');
  const [自定义开始日期, set自定义开始日期] = useState('');
  const [自定义结束日期, set自定义结束日期] = useState('');
  const [投放时段模式, set投放时段模式] = useState('all_day'); // 'all_day' | 'time_range' | 'multi_slot'
  const [timeRangeStart, setTimeRangeStart] = useState('');
  const [timeRangeEnd, setTimeRangeEnd] = useState('');
  const [timeGridSlots, setTimeGridSlots] = useState({});
  const [unitName, setUnitName] = useState('');
  const [showNameVarDropdown, setShowNameVarDropdown] = useState(false);
  const nameVariables = ['日期', '定向包名称', '版位', '创建人'];
  
  // ===== 广告配置 =====
  const [creativeMax, setCreativeMax] = useState(false);
  const [creativeEnhanceMax, setCreativeEnhanceMax] = useState(false);
  const [creativeName, setCreativeName] = useState('');
  const creativeNameVariables = ['日期', '素材名称'];
  const [selectedMaterials, setSelectedMaterials] = useState([]); // {id, name, type, ...}
  const [selectedCopies, setSelectedCopies] = useState([]);
  const [videoStrategy, setVideoStrategy] = useState('average');
  const [composeStrategy, setComposeStrategy] = useState('copy'); // 'copy' | 'average' 广告分配策略
  const [hoverStrategy, setHoverStrategy] = useState(null); // 悬停展示策略注释
  // 截图样式广告配置：账户分配规则 / 广告组配置 / 广告组数据
  const [accountAllocMode, setAccountAllocMode] = useState('all'); // 'all'=全账户复用, 'average'=平均分配
  const [groupVideos, setGroupVideos] = useState(1);
  const [groupImages, setGroupImages] = useState(1);
  const [groupNameTpl, setGroupNameTpl] = useState('');
  const [accountGroups, setAccountGroups] = useState({}); // { [accountId]: [{id, name, videoMaterials:[], imageMaterials:[]}] }
  const [landingPageMacro, setLandingPageMacro] = useState('');
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  // 素材数量配置：图片x个 / 视频x个 / 文案x个（单个广告内的素材数量）
  const [composeRule, setComposeRule] = useState({ images: 1, videos: 1, copies: 1 });
  // 品牌形象 & 营销组件
  const [brandImageType, setBrandImageType] = useState('video_account'); // 'custom' | 'video_account'
  const [selectedBrandImage, setSelectedBrandImage] = useState(null); // {id, name, url}
  const [selectedVideoAccount, setSelectedVideoAccount] = useState(null); // {id, name}
  const [marketingComponentType, setMarketingComponentType] = useState('floating_card'); // 'floating_card' | 'action_button'
  const [actionButtonType, setActionButtonType] = useState('claim'); // 'claim' | 'details'
  // 广告资产（与 index.html 共用 ad_brand_images）：品牌形象（type=brand） / 营销组件（type=component）
  const [creativeAssets, setCreativeAssets] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null); // {id, title, btnText, thumb}
  // 行动号召：输入文案回车添加，上限10条，默认开启智能生成
  const [ctaList, setCtaList] = useState([]); // string[]
  const [ctaInput, setCtaInput] = useState('');
  const [smartGen, setSmartGen] = useState(true); // 默认开启智能生成
  // 来源（文本输入）
  const [sourceText, setSourceText] = useState('');
  // 附加广告组件（点击按钮拉起资产库，多选）
  const [showCreativeCompModal, setShowCreativeCompModal] = useState(false);
  const [selectedCreativeComponents, setSelectedCreativeComponents] = useState([]); // { id, name }
  useEffect(() => {
    const loadAssets = () => {
      try {
        const raw = localStorage.getItem('ad_brand_images');
        if (raw) setCreativeAssets(JSON.parse(raw));
      } catch(e) {}
    };
    loadAssets();
    // 菜单中“加载示例资产”后实时刷新（表单为 iframe，同源 storage 事件触发）
    window.addEventListener('storage', loadAssets);
    return () => window.removeEventListener('storage', loadAssets);
  }, []);

  // ===== 预览 =====
  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState(null);
  // ===== 运行配置 =====
  const [runMode, setRunMode] = useState('immediate'); // 'immediate' | 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  // ===== 立即运行：进度弹窗 =====
  const [runModal, setRunModal] = useState(false);
  const [runProgress, setRunProgress] = useState(0);
  const [runBg, setRunBg] = useState(false);
  const [runResult, setRunResult] = useState(null); // 搭建完成后展示的日志条目
  const runTimerRef = useRef(null);
  const runBgRef = useRef(false);
  const runStartRef = useRef(Date.now());
  // ===== 账户搜索 =====
  const [accountSearchText, setAccountSearchText] = useState('');
  // ===== 校验提示 =====
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  // ===== 计算属性 =====
  const filteredAccounts = useMemo(() => MOCK.accounts.filter(acc =>
    acc.businessUnit === businessUnit &&
    (!accountSearchText || acc.name.includes(accountSearchText) || acc.id.includes(accountSearchText))
  ), [businessUnit, accountSearchText]);
  // 搜索命中自动勾选（支持英文逗号分隔批量搜索）
  useEffect(() => {
    if (!accountSearchText) return;

    // 批量模式：英文逗号分隔搜索
    if (accountSearchText.includes(',')) {
      const parts = accountSearchText.split(',').map(s => s.trim()).filter(Boolean);
      const matchedIds = parts
        .map(part => MOCK.accounts.find(acc => acc.id === part))
        .filter(Boolean)
        .map(acc => acc.id)
        .filter(id => !selectedAccountIds.includes(id));

      if (matchedIds.length > 0) {
        setSelectedAccountIds(prev => [...prev, ...matchedIds]);
        setAccountSearchText('');
      }
      return;
    }

    // 单账户自动勾选（输入纯数字时尝试精确匹配账户ID）
    if (/^\d+$/.test(accountSearchText)) {
      const matched = MOCK.accounts.find(acc => acc.id === accountSearchText);
      if (matched && !selectedAccountIds.includes(matched.id)) {
        setSelectedAccountIds(prev => [...prev, matched.id]);
        setAccountSearchText('');
      }
    }
  }, [accountSearchText]);
  const overallProgress = (() => {
    const checks = [
      selectedAccountIds.length > 0,
      specificProduct !== '',
      conversionGoal !== '',
      targetingSource === 'package' ? selectedTargetingPackages.length > 0 : (geoSelectedProvinces.length > 0 || geoMode === 'unlimited'),
      bidAmount !== '',
      selectedMaterials.length > 0,
      selectedCopies.length > 0,
      unitName !== '',
    ];
    const done = checks.filter(Boolean).length;
    return done === 0 ? 0 : Math.round((done / checks.length) * 100);
  })();
  const validationErrors = (() => {
    const errors = [];
    if (bidAmount === '') errors.push('请设置出价');
    if (bidAmount !== '' && (parseFloat(bidAmount) < 0.01 || parseFloat(bidAmount) > 300)) errors.push('出价需在 0.01 ~ 300 元之间');
    if (selectedMaterials.length === 0) errors.push('请选择素材');
    if (selectedCopies.length === 0) errors.push('请选择文案');
    if (unitName === '') errors.push('请输入项目名称');
    if (buildType === 'unit_only') {
      selectedAccountIds.forEach(function(id) {
        var su = selectedUnits[id];
        if (!su || su.length === 0) errors.push('账户 ' + (MOCK.accounts.find(function(a){return a.id === id;}) || {name:id}).name + ' 未选择营销项目');
      });
    }
    if (targetingSource === 'package' && selectedTargetingPackages.length === 0) errors.push('请选择定向包');
    // 广告数量上限 1000：超限直接拦截，阻止立即运行
    if (getBuildSummary().totalCreatives > 1000) errors.push('广告数量超限（1000个），请减少物料选择');
    return errors;
  })();

  const notify = (msg, type = 'info') => setNotification({ msg, type });

  // 账户选择
  const toggleAccount = (id) => {
    if (selectedAccountIds.includes(id)) {
      setSelectedAccountIds(selectedAccountIds.filter(a => a !== id));
    } else {
      setSelectedAccountIds([...selectedAccountIds, id]);
    }
  };

  // 获取当前账户落地页（纯URL，宏参数投放时自动拼接）
  const getDefaultLandingPage = (accountId) => {
    const acc = MOCK.accounts.find(a => a.id === accountId);
    if (!acc) return '';
    return acc.kaboshi || '';
  };

  // 生成广告组合（考虑定向包组合）
  const getCreativeCombos = () => {
    if (selectedMaterials.length === 0 || selectedCopies.length === 0) return [];
    const combos = [];
    // 每个定向包 × 每个素材 × 每个文案 = 一个广告
    const tpCount = selectedTargetingPackages.length || 1; // 若未选定向包，默认为1
    for (let t = 0; t < Math.max(tpCount, 1); t++) {
      for (let m of selectedMaterials) {
        for (let c of selectedCopies) {
          combos.push({
            material: m,
            copy: c,
            targetingPackageId: selectedTargetingPackages[t] || null
          });
        }
      }
    }
    return combos;
  };

  // 计算搭建总数（新增：定向包组合 + 广告数量分配）
  function getBuildSummary() {
    const accountCount = selectedAccountIds.length;
    const materialCount = selectedMaterials.length;
    const copyCount = selectedCopies.length;

    // 各账户项目数 = 该账户定向包数（默认至少1）
    const tpFor = (accountId) => {
      if (tgtAllocMode === 'per_account') {
        return Math.max((perAccountTgtPkgs[accountId] || []).length, 1);
      }
      return Math.max(selectedTargetingPackages.length, 1);
    };
    const unitsPerAccount = tgtAllocMode === 'per_account'
      ? (accountCount > 0 ? Math.round(selectedAccountIds.reduce((s, id) => s + tpFor(id), 0) / accountCount) : 0)
      : Math.max(selectedTargetingPackages.length, 1);
    const tpCount = tgtAllocMode === 'per_account'
      ? Math.max(1, ...selectedAccountIds.map(tpFor))
      : Math.max(selectedTargetingPackages.length, 1);

    let totalUnits = 0;
    if (buildType === 'unit_only') {
      totalUnits = selectedAccountIds.reduce(function(sum, id) {
        const su = selectedUnits[id] || [];
        return sum + su.length;
      }, 0);
    } else {
      totalUnits = selectedAccountIds.reduce((sum, id) => sum + tpFor(id), 0);
    }

    // 根据素材确定广告数：每个广告捆绑「图片+视频」个素材（文案仅顺序选取，不影响总数）
    let creativesPerUnit = 0;
    {
      const m = ((composeRule.images || 0) + (composeRule.videos || 0)) || 1;
      creativesPerUnit = m > 0 ? Math.floor(materialCount / m) : 0;
      if (creativesPerUnit < 0) creativesPerUnit = 0;
    }
    // 平均分配：素材在项目间均分 → 总广告数 = 每项目广告数 = 已选素材数 ÷ 单广告素材数
    // 复制分配：每个项目独立使用全部素材 → 项目数 × (素材数 ÷ 单广告素材数)
    let totalCreatives = 0;
    if (composeStrategy === 'average') {
      totalCreatives = creativesPerUnit;
    } else {
      totalCreatives = totalUnits * creativesPerUnit;
    }

    const CREATIVE_LIMIT = 1000;
    const overLimit = totalCreatives > CREATIVE_LIMIT;
    // 单个项目最多可分配 100 个广告：
    // 复制分配：每项目共用全部素材 = 每项目广告数(creativesPerUnit)
    // 平均分配：总广告数在项目间均分 → 每项目 = creativesPerUnit ÷ 项目数
    const perUnitCreatives = composeStrategy === 'average'
      ? (totalUnits > 0 ? Math.floor(creativesPerUnit / totalUnits) : creativesPerUnit)
      : creativesPerUnit;
    const UNIT_LIMIT = 100;
    const overUnit = perUnitCreatives > UNIT_LIMIT;
    return { accountCount, tpCount, unitsPerAccount, totalUnits, materialCount, copyCount, creativesPerUnit, totalCreatives, perUnitCreatives, UNIT_LIMIT, CREATIVE_LIMIT, overLimit, overUnit };
  }

  // ===== 截图样式广告配置：广告组操作 =====
  const ensureAccountGroups = (accountIds) => {
    setAccountGroups(prev => {
      const next = { ...prev };
      accountIds.forEach(id => {
        if (!next[id] || next[id].length === 0) {
          next[id] = [{ id: id + '_g1', name: groupNameTpl || '广告组01', videoMaterials: [], imageMaterials: [] }];
        }
      });
      return next;
    });
  };
  useEffect(() => { ensureAccountGroups(selectedAccountIds); }, [selectedAccountIds]);
  const addGroup = (accountId) => {
    setAccountGroups(prev => {
      const list = prev[accountId] || [];
      const idx = list.length + 1;
      const name = (groupNameTpl || '广告组').replace(/\{n\}/g, String(idx)) || ('广告组' + String(idx).padStart(2, '0'));
      return { ...prev, [accountId]: [...list, { id: accountId + '_g' + idx, name, videoMaterials: [], imageMaterials: [] }] };
    });
  };
  const removeGroup = (accountId, groupIndex) => {
    setAccountGroups(prev => {
      const list = [...(prev[accountId] || [])];
      list.splice(groupIndex, 1);
      return { ...prev, [accountId]: list };
    });
  };
  const updateGroupName = (accountId, groupIndex, name) => {
    setAccountGroups(prev => {
      const list = [...(prev[accountId] || [])];
      list[groupIndex] = { ...list[groupIndex], name };
      return { ...prev, [accountId]: list };
    });
  };
  const [materialPickerTarget, setMaterialPickerTarget] = useState(null); // {accountId, groupIndex, type:'video'|'image'}
  const openMaterialPicker = (accountId, groupIndex, type) => {
    setMaterialPickerTarget({ accountId, groupIndex, type });
    setShowMaterialModal(true);
  };
  const applyPickedMaterials = (materials) => {
    if (!materialPickerTarget) return;
    const { accountId, groupIndex, type } = materialPickerTarget;
    const filtered = materials.filter(m => (type === 'video' ? m.type === 'video' : m.type === 'image'));
    setAccountGroups(prev => {
      const list = [...(prev[accountId] || [])];
      const group = { ...list[groupIndex] };
      const key = type === 'video' ? 'videoMaterials' : 'imageMaterials';
      group[key] = [...group[key], ...filtered];
      list[groupIndex] = group;
      return { ...prev, [accountId]: list };
    });
    setMaterialPickerTarget(null);
    setShowMaterialModal(false);
  };
  const removeGroupMaterial = (accountId, groupIndex, type, materialId) => {
    setAccountGroups(prev => {
      const list = [...(prev[accountId] || [])];
      const group = { ...list[groupIndex] };
      const key = type === 'video' ? 'videoMaterials' : 'imageMaterials';
      group[key] = group[key].filter(m => m.id !== materialId);
      list[groupIndex] = group;
      return { ...prev, [accountId]: list };
    });
  };
  // 批量添加素材：给当前账户所有组补齐视频/图片配额（先视频后图片）
  const batchFillGroups = (accountId, materials) => {
    setAccountGroups(prev => {
      const list = [...(prev[accountId] || [])];
      const videos = materials.filter(m => m.type === 'video');
      const images = materials.filter(m => m.type === 'image');
      const nextList = list.map((g, i) => {
        const needV = Math.max(0, groupVideos - g.videoMaterials.length);
        const needI = Math.max(0, groupImages - g.imageMaterials.length);
        return {
          ...g,
          videoMaterials: [...g.videoMaterials, ...videos.slice(i * groupVideos, i * groupVideos + needV)],
          imageMaterials: [...g.imageMaterials, ...images.slice(i * groupImages, i * groupImages + needI)]
        };
      });
      return { ...prev, [accountId]: nextList };
    });
  };

  // ===== 持久化：从 URL 读取 taskId，localStorage 恢复/保存数据 =====
  const urlParams = new URLSearchParams(window.location.search);
  const currentTaskId = urlParams.get('taskId');

  // 恢复草稿（仅挂载时执行一次）
  useEffect(() => {
    if (!currentTaskId) return;
    try {
      const saved = localStorage.getItem('ad_task_form_' + currentTaskId);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.selectedAccountIds) setSelectedAccountIds(data.selectedAccountIds);
        if (data.unitName) setUnitName(data.unitName);
        if (data.buildType) setBuildType(data.buildType);
        if (data.selectedUnits) setSelectedUnits(data.selectedUnits);
        if (data.targetingSource) setTargetingSource(data.targetingSource);
        if (data.tgtAllocMode) setTgtAllocMode(data.tgtAllocMode);
        if (data.perAccountTgtPkgs) setPerAccountTgtPkgs(data.perAccountTgtPkgs);
        if (data.selectedTargetingPackages) setSelectedTargetingPackages(data.selectedTargetingPackages);
        if (data.geoMode) setGeoMode(data.geoMode);
        if (data.ageSelections) setAgeSelections(data.ageSelections);
        if (data.genderSelection) setGenderSelection(data.genderSelection);
        if (data.audienceMode) setAudienceMode(data.audienceMode);
        if (data.excludeConvertedMode) setExcludeConvertedMode(data.excludeConvertedMode);
        if (data.bidAmount !== undefined) setBidAmount(data.bidAmount);
        if (data.dailyBudget !== undefined) setDailyBudget(data.dailyBudget);
        if (data.投放日期类型) set投放日期类型(data.投放日期类型);
        if (data.自定义开始日期) set自定义开始日期(data.自定义开始日期);
        if (data.自定义结束日期) set自定义结束日期(data.自定义结束日期);
        if (data.materials) setSelectedMaterials(data.materials);
        if (data.copies) setSelectedCopies(data.copies);
        if (data.composeRule) setComposeRule(data.composeRule);
        if (data.composeStrategy) setComposeStrategy(data.composeStrategy);
        if (data.marketingObjective) setMarketingObjective(data.marketingObjective);
        if (data.marketingScene) setMarketingScene(data.marketingScene);
        if (data.productAllocMode) setProductAllocMode(data.productAllocMode);
        if (data.specificProduct) setSpecificProduct(data.specificProduct);
        if (data.perAccountProduct) setPerAccountProduct(data.perAccountProduct);
        if (data.targetOptType !== undefined) setTargetOptType(data.targetOptType);
        if (data.deepOptType !== undefined) setDeepOptType(data.deepOptType);
        if (data.ctaList) setCtaList(data.ctaList);
        if (data.smartGen !== undefined) setSmartGen(data.smartGen);
        if (data.sourceText !== undefined) setSourceText(data.sourceText);
        if (data.creativeName !== undefined) setCreativeName(data.creativeName);
        if (data.selectedCreativeComponents) setSelectedCreativeComponents(data.selectedCreativeComponents);
        notify('已恢复上次保存的草稿', 'success');
      }
    } catch(e) { console.error('恢复草稿失败', e); }
  }, []);

  // 保存草稿的函数
  const doSaveForm = () => {
    if (!currentTaskId) return;
    try {
      const data = {
        selectedAccountIds, unitName,
        buildType, selectedUnits,
        targetingSource, tgtAllocMode, perAccountTgtPkgs, selectedTargetingPackages,
        geoMode, geoSelectedCountry, geoSelectedProvinces, geoSelectedCities,
        locationTypeResident, ageSelections, customAgeMin, customAgeMax,
        genderSelection, audienceMode, selectedTargetAudiences, selectedExcludeAudiences,
        excludeConvertedMode, conversionBehavior, conversionTimeRange,
        bidAmount, dailyBudget,
        投放日期类型, 自定义开始日期, 自定义结束日期,
        selectedMaterials, selectedCopies,
        composeRule, composeStrategy,
        marketingObjective, marketingScene, productAllocMode, specificProduct, perAccountProduct,
        targetOptType, deepOptType, ctaList, smartGen, sourceText, creativeName,
        selectedCreativeComponents,
      };
      localStorage.setItem('ad_task_form_' + currentTaskId, JSON.stringify(data));
    } catch(e) { console.error('保存草稿失败', e); }
  };

  // 定期自动保存 + 暴露接口给外部调用
  useEffect(() => {
    const timer = setInterval(doSaveForm, 3000);
    window.__doSaveForm = doSaveForm;
    window.__getFormData = () => {
      doSaveForm();
      try { return JSON.parse(localStorage.getItem('ad_task_form_' + currentTaskId) || '{}'); } catch(e) { return {}; }
    };
    const msgHandler = (e) => {
      if (e.data && e.data.type === 'REQUEST_FORM_SAVE') doSaveForm();
    };
    window.addEventListener('message', msgHandler);
    return () => { clearInterval(timer); window.removeEventListener('message', msgHandler); };
  }, []);

  // 关键状态变更时立即保存（debounce 用 setTimeout）
  useEffect(() => { const t = setTimeout(doSaveForm, 500); return () => clearTimeout(t); }, [selectedAccountIds, unitName, selectedMaterials, selectedCopies, selectedTargetingPackages]);

  // ===== 立即运行：进度弹窗 + 后台运行 + 搭建日志 =====
  const buildEntry = () => {
    const ids = selectedAccountIds.length
      ? selectedAccountIds
      : ['acc_90000001', 'acc_90000002', 'acc_90000003'];
    const seed = (currentTaskId ? currentTaskId.length : 1) * 31 + ids.length;
    const statusOptions = ['全部完成', '部分完成', '搭建失败'];
    const status = statusOptions[seed % 3];
    const rows = ids.map((accId, idx) => {
      let h = 0; const s = '' + accId;
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
      h = (h + seed * 7 + idx * 13) >>> 0;
      const unitTotal = 1 + (h % 3);
      const creaPer = 2 + ((h >> 3) % 3);
      const creaTotal = unitTotal * creaPer;
      let unitFail = 0, creaFail = 0;
      if (status === '搭建失败') { unitFail = unitTotal; creaFail = creaTotal; }
      else if (status === '部分完成') { unitFail = unitTotal > 1 ? 1 : 0; creaFail = creaTotal > 1 ? creaPer : 0; }
      const reasons = status === '搭建失败'
        ? ['账户 ' + accId + ' 缺失素材包']
        : status === '部分完成'
          ? ['账户 ' + accId + ' 定向包未配置']
          : [];
      return {
        accId,
        optimizer: getOptimizerName(accId),
        unitTotal, unitSucc: unitTotal - unitFail, unitFail,
        creaTotal, creaSucc: creaTotal - creaFail, creaFail,
        reasons
      };
    });
    return {
      buildId: 'build_' + Date.now(),
      startedAt: new Date(runStartRef.current).toISOString(),
      finishedAt: new Date().toISOString(),
      status, rows
    };
  };

  const appendBuildLog = (entry) => {
    try {
      const key = 'ad_task_buildlogs_' + (currentTaskId || 'unknown');
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push(entry);
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {}
  };

  const handleRun = () => {
    if (selectedAccountIds.length === 0) { notify('请先选择账户', 'error'); return; }
    // 广告数量超限：单次任务最多 1000 条、单个项目最多 100 个，任一超限均阻止运行
    const s = getBuildSummary();
    if (s.overLimit || s.overUnit) {
      setShowValidationSummary(true);
      notify('广告数量超限（单次任务最多 1000 条、单个项目最多 100 个），请调整物料选择', 'error');
      return;
    }
    runBgRef.current = false;
    setRunBg(false);
    setRunResult(null);
    setRunProgress(0);
    setRunModal(true);
    runStartRef.current = Date.now();
    const timer = setInterval(() => {
      setRunProgress(p => Math.min(100, p + Math.floor(Math.random() * 7) + 4));
    }, 180);
    runTimerRef.current = timer;
  };

  const goBackground = () => {
    runBgRef.current = true;
    setRunBg(true);
    setRunModal(false);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'GOTO_TASKS' }, '*');
    }
  };

  const confirmResult = () => {
    setRunModal(false);
    setRunResult(null);
    setRunProgress(0);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'GOTO_TASKS' }, '*');
    }
  };

  // 进度到达 100%：写入搭建日志（后台运行时静默关闭，前台则展示明细）
  useEffect(() => {
    if (runProgress < 100) return;
    clearInterval(runTimerRef.current);
    const entry = buildEntry();
    appendBuildLog(entry);
    if (runBgRef.current) {
      setRunModal(false);
      setRunProgress(0);
      setRunResult(null);
    } else {
      setRunResult(entry);
    }
  }, [runProgress]);

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && <Notification msg={notification.msg} type={notification.type} onClose={() => setNotification(null)} />}

      {/* ===== 顶部：精简信息栏 ===== */}
      <div className="bg-gray-50 border-b shadow-sm sticky top-0 z-40">
        <div className="px-6">
          {/* 错误详情条 */}
          {showValidationSummary && validationErrors.length > 0 && (
            <div className="border-t bg-red-50 px-4 py-1.5">
              <div className="flex items-center gap-2 text-xs text-red-700 flex-wrap">
                <i className="fas fa-exclamation-triangle"></i>
                <span>请完善：</span>
                {validationErrors.map((err, i) => (
                  <span key={i} className="bg-red-100 px-1.5 py-0.5 rounded whitespace-nowrap">{err}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== 快捷导航 ===== */}
      <div className="bg-gray-50 border-b sticky top-[56px] z-30 shadow-sm">
        <div className="px-6 flex items-center gap-1 overflow-x-auto py-1">
          {[
            {id:'section-basic', label:'基础配置', icon:'fa-cog'},
            {id:'section-unit', label:'项目配置', icon:'fa-bullseye'},
            {id:'section-creative', label:'广告配置', icon:'fa-paint-brush'},
            {id:'section-run', label:'运行配置', icon:'fa-play'},
          ].map(s => (
            <a key={s.id} href={'#'+s.id} onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({behavior:'smooth'}); }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md text-gray-600 whitespace-nowrap transition-colors"
              style={{color: '#374151'}}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0f5ff'; e.currentTarget.style.color = '#1890ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}>
              <i className={`fas ${s.icon}`}></i>
              <span>{s.label}</span>
            </a>
          ))}
          <div className="flex-1"></div>
          {selectedAccountIds.length > 0 && (
            <span className="text-2xs text-gray-400 mr-3">
              <i className="fas fa-users mr-1"></i>{selectedAccountIds.length}个账户
            </span>
          )}
          {/* 配置进度 — 仅展示 */}
          {selectedAccountIds.length > 0 && (
            <div className="flex-shrink-0 flex items-center gap-1.5 mr-3">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{width: `${overallProgress}%`}}></div>
              </div>
              <span className="text-xs text-gray-500">{overallProgress}%</span>
            </div>
          )}
          {/* 未配置警示 */}
          {validationErrors.length > 0 && (
            <button onClick={() => setShowValidationSummary(!showValidationSummary)}
              className="flex-shrink-0 text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-2 py-1 whitespace-nowrap">
              <i className="fas fa-exclamation-circle mr-1"></i>{validationErrors.length}项未完成
            </button>
          )}
        </div>
      </div>
      <div className="px-6 py-6 space-y-6">
        {/* ===== 1. 基础配置 ===== */}
        <div id="section-basic" className="">
          <div className="px-6 py-3.5 flex items-center gap-3 border-b border-gray-200">
            <span className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h2 className="text-base font-semibold text-gray-900">基础配置</h2>
            <span className="text-xs text-gray-400 ml-auto font-normal"><i className="fas fa-info-circle mr-1"></i>选择投放账户与搭建类型</span>
          </div>
          <div className="p-6">
            {/* 任务名称：标签在左，输入栏在右 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">任务名称 <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                placeholder="请输入任务名称，如：618大促-抖音投放"
                maxLength={50}
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            {/* 选择账户：选项框缩短，刷新按钮在选项框右侧 */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">选择账户 <span className="text-red-500">*</span></label>
              <div className="relative max-w-sm w-full" ref={accountDropdownRef}>
                {/* 合并搜索框和已选标签 */}
                <div
                  className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white min-h-[42px] flex flex-wrap gap-1 items-center text-sm"
                  onClick={() => { setShowAccountDropdown(!showAccountDropdown); }}
                >
                  {selectedAccountIds.length === 0 ? (
                    <span className="text-gray-400" onClick={e => { e.stopPropagation(); setShowAccountDropdown(true); }}>点击或输入账户ID搜索...</span>
                  ) : (
                    selectedAccountIds.slice(0, 5).map(id => {
                      const acc = MOCK.accounts.find(a => a.id === id);
                      return (
                        <span key={id} className="tag">
                          {acc ? acc.name : id}
                          <button onClick={(e) => { e.stopPropagation(); toggleAccount(id); }}><i className="fas fa-times"></i></button>
                        </span>
                      );
                    })
                  )}
                  {selectedAccountIds.length > 5 && (
                    <span className="text-xs text-blue-600 font-medium ml-1">+{selectedAccountIds.length - 5}</span>
                  )}
                  <span className="ml-auto text-gray-400 text-xs"><i className="fas fa-chevron-down"></i></span>
                </div>
                {showAccountDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-2 border-b">
                      <input type="text" value={accountSearchText} onChange={e => setAccountSearchText(e.target.value)}
                        placeholder="输入账户ID搜索，支持英文逗号批量搜索..."
                        className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-blue-400"
                        onClick={e => e.stopPropagation()} autoFocus
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredAccounts.length === 0 ? (
                        <div className="px-3 py-4 text-sm text-gray-400 text-center">无匹配账户</div>
                      ) : (
                        filteredAccounts.map(acc => (
                          <div key={acc.id} onClick={() => toggleAccount(acc.id)}
                            className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 flex items-center gap-2 text-sm border-b border-gray-100 last:border-b-0"
                          >
                            <input type="checkbox" checked={selectedAccountIds.includes(acc.id)} onChange={() => {}}
                              className="w-4 h-4 text-blue-600 rounded pointer-events-none flex-shrink-0" />
                            <span className="flex-1 truncate min-w-0">{acc.id}</span>
                            {selectedAccountIds.includes(acc.id) && (
                              <i className="fas fa-check text-blue-500 flex-shrink-0"></i>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => { notify('账户列表已刷新', 'success'); }} className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50 whitespace-nowrap">
                <i className="fas fa-sync-alt mr-1"></i>刷新账户列表
              </button>
            </div>
            {/* 搭建类型 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">搭建类型 <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: buildType === 'project_unit' ? '#1890ff' : '#e5e7eb', background: buildType === 'project_unit' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="buildType" value="project_unit" checked={buildType === 'project_unit'} onChange={() => setBuildType('project_unit')} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>搭建项目和广告</span>
                </label>
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: buildType === 'unit_only' ? '#1890ff' : '#e5e7eb', background: buildType === 'unit_only' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="buildType" value="unit_only" checked={buildType === 'unit_only'} onChange={() => setBuildType('unit_only')} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>仅搭建广告</span>
                </label>
              </div>
            </div>

            {/* 项目生成规则（仅搭建项目和广告时显示） */}
            {buildType === 'project_unit' && (
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">项目生成规则</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setProjectGenRule('total_per_project')}
                    className={`relative rounded-lg border px-4 py-3 text-left transition ${projectGenRule === 'total_per_project' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                    <div className="text-sm font-medium text-gray-900">按总广告数/每项目广告数</div>
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-gray-400 text-white text-xs cursor-pointer group"
                      onMouseEnter={() => setProjectRuleHover('total_per_project')} onMouseLeave={() => setProjectRuleHover(null)}>
                      <i className="fas fa-info"></i>
                      {projectRuleHover === 'total_per_project' && (
                        <span className="absolute -top-2 -right-2 whitespace-nowrap bg-gray-700 text-white text-xs rounded px-2 py-1 z-10 pointer-events-none">根据生成的广告总数与项目内广告数上限，自动生成项目</span>
                      )}
                    </span>
                  </button>
                  <button type="button" onClick={() => setProjectGenRule('fixed')}
                    className={`relative rounded-lg border px-4 py-3 text-left transition ${projectGenRule === 'fixed' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                    <div className="text-sm font-medium text-gray-900">指定数量</div>
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-gray-400 text-white text-xs cursor-pointer"
                      onMouseEnter={() => setProjectRuleHover('fixed')} onMouseLeave={() => setProjectRuleHover(null)}>
                      <i className="fas fa-info"></i>
                      {projectRuleHover === 'fixed' && (
                        <span className="absolute -top-2 -right-2 whitespace-nowrap bg-gray-700 text-white text-xs rounded px-2 py-1 z-10 pointer-events-none">手动指定每个账户的项目数量</span>
                      )}
                    </span>
                  </button>
                </div>
                {projectGenRule === 'total_per_project' && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 whitespace-nowrap">每个项目广告数上限</label>
                    <input type="number" min="1" max="1000" value={adsPerProject} onChange={e => setAdsPerProject(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))} className="w-24 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                )}
                {projectGenRule === 'fixed' && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 whitespace-nowrap">每个账户指定项目数</label>
                    <input type="number" min="1" max="100" value={projectsPerAccount} onChange={e => setProjectsPerAccount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))} className="w-24 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  </div>
                )}
              </div>
            )}
            
            {/* 投放链匹配结果：全宽整行，置于任务名称/主体/搭建类型下方 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="block text-sm font-medium text-gray-700">投放链匹配结果</div>
                <button
                  onClick={() => { setMatchRefreshKey(k => k + 1); notify('投放链匹配结果已刷新', 'success'); }}
                  className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50"
                >
                  <i className="fas fa-sync-alt mr-1"></i>刷新
                </button>
              </div>
              <div key={matchRefreshKey} className="border border-gray-200 rounded-lg overflow-hidden bg-white min-h-[120px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-left">
                      <th className="px-3 py-2 font-medium w-1/4">账户ID</th>
                      <th className="px-3 py-2 font-medium">优化师</th>
                      <th className="px-3 py-2 font-medium">投放链接</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAccountIds.map(id => {
                      const acc = MOCK.accounts.find(a => a.id === id);
                      const matched = !!(acc && acc.kaboshi);
                      return (
                        <tr key={id} className="border-t border-gray-100">
                          <td className={`px-3 py-2 align-top ${matched ? 'text-gray-800' : 'text-red-500 font-medium'}`}>{id}</td>
                          <td className="px-3 py-2 align-top text-gray-700">{getOptimizerName(id)}</td>
                          <td className="px-3 py-2 align-top">
                            {matched ? (
                              <a href={acc.kaboshi} target="_blank" rel="noreferrer" className="text-green-600 hover:underline break-all">{acc.kaboshi}</a>
                            ) : (
                              <span className="text-red-500 font-medium">未匹配到投放链接</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {/* 示例：优化师与登录人（{LOGIN_USER}）不一致，标红警示 */}
                    {[
                      { id: 'ACC-EX-001', optimizer: '李娜', link: 'https://e.qq.com/demo/li-na' },
                      { id: 'ACC-EX-002', optimizer: '王芳', link: 'https://e.qq.com/demo/wang-fang' }
                    ].map(ex => (
                      <tr key={ex.id} className="border-t border-gray-100 bg-red-50">
                        <td className="px-3 py-2 align-top text-red-500 font-medium">{ex.id}</td>
                        <td className="px-3 py-2 align-top text-red-500 font-medium">
                          {ex.optimizer}
                          <span className="ml-1 inline-block text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded">与登录人不一致</span>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <a href={ex.link} target="_blank" rel="noreferrer" className="text-green-600 hover:underline break-all">{ex.link}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 2. 营销项目配置 ===== */}
        <div id="section-unit" className="">
          <div className="px-6 py-3.5 flex items-center gap-3 border-b border-gray-200">
            <span className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="text-base font-semibold text-gray-900">项目配置</h2>
            <span className="text-xs text-gray-400 ml-auto font-normal"><i className="far fa-clock mr-1"></i>配置营销目的、产品、优化目标与投放设置</span>
          </div>
          {buildType === 'project_unit' && (
            <div className="p-6 space-y-6">
            {/* 营销目的 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">营销目的 <span className="text-red-500">*</span></label>
              <select value={marketingObjective} onChange={e => setMarketingObjective(e.target.value)} className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="lead">销售线索</option>
              </select>
            </div>
            {/* 营销场景：固定单选项「短视频+图文」 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">营销场景</label>
              <div className="flex gap-3">
                <span className="flex items-center px-4 py-2 border rounded-lg text-sm" style={{ borderColor: '#1890ff', background: '#eff6ff' }}>
                  <i className="fas fa-check-circle text-blue-500 mr-2 text-xs"></i>
                  <span>短视频+图文</span>
                </span>
              </div>
            </div>
            {/* 营销产品：全账户共用/分账户定制 做成按钮单选，与定向配置交互一致 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">营销产品 <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: productAllocMode === 'shared' ? '#1890ff' : '#e5e7eb', background: productAllocMode === 'shared' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="productAllocMode" checked={productAllocMode === 'shared'} onChange={() => setProductAllocMode('shared')} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>全账户共用</span>
                </label>
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: productAllocMode === 'per_account' ? '#1890ff' : '#e5e7eb', background: productAllocMode === 'per_account' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="productAllocMode" checked={productAllocMode === 'per_account'} onChange={() => setProductAllocMode('per_account')} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>分账户定制</span>
                </label>
              </div>
              {productAllocMode === 'shared' ? (
                <select value={specificProduct} onChange={e => setSpecificProduct(e.target.value)} className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  {MOCK.productLibrary.map(sp => <option key={sp.id} value={sp.id}>{sp.name}</option>)}
                </select>
              ) : (
                <span className="text-sm text-gray-500">分账户定制：在下方按账户分别选择商品</span>
              )}
            </div>
            {/* 分账户定制商品（网格） */}
            {productAllocMode === 'per_account' && (
              <div className="mb-5 pl-28">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedAccountIds.map(accountId => {
                    const acc = MOCK.accounts.find(a => a.id === accountId);
                    const pid = perAccountProduct[accountId] || '';
                    return (
                      <div key={accountId} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50">
                        <div className="text-xs font-semibold text-gray-900 truncate mb-1.5" title={acc ? acc.name : accountId}>{acc ? acc.name : accountId}</div>
                        <select value={pid} onChange={e => setPerAccountProduct(prev => ({ ...prev, [accountId]: e.target.value }))} className="w-full px-2 py-1 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500">
                          <option value="">请选择商品</option>
                          {MOCK.productLibrary.map(sp => <option key={sp.id} value={sp.id}>{sp.name}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* 获取线索方式 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">获取线索方式</label>
              <input type="text" value="自研落地页" disabled className="w-48 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
            </div>
            {/* 优化目标 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">优化目标</label>
              <input type="text" value="表单提交" disabled className="w-48 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
            </div>
            {/* 目标优化类型：锁定关闭状态（禁用按钮，左对齐） */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">目标优化类型</label>
              <button type="button" disabled
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed">
                <i className="fas fa-lock text-xs"></i>
                <span>关闭</span>
              </button>
            </div>
            {/* 深度优化方式：锁定关闭状态（禁用按钮，左对齐） */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">深度优化方式</label>
              <button type="button" disabled
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed">
                <i className="fas fa-lock text-xs"></i>
                <span>关闭</span>
              </button>
            </div>


            {/* 自定义人群配置（网格布局：一行多个账户） */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">自定义人群配置</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // 刷新所有账户的人群包列表
                      setAudiencePackageList([...MOCK.customAudiences, 
                        { id: 'ca_004', name: '近期转化用户' },
                        { id: 'ca_005', name: '高活跃度用户' }
                      ]);
                      setExcludeAudiencePackageList([...MOCK.excludeConversions,
                        { id: 'ec_003', name: '已注册用户' }
                      ]);
                      notify('所有人群包列表已刷新', 'success');
                    }}
                    className="text-xs text-green-600 hover:text-green-800 border border-green-200 rounded px-2 py-1 hover:bg-green-50"
                  >
                    <i className="fas fa-sync-alt mr-1"></i>刷新人群包
                  </button>
                  <button
                    onClick={() => {
                      // 检查所选账户是否有相同人群包
                      const firstAccountId = selectedAccountIds[0];
                      const firstAudience = getAccountAudience(firstAccountId);
                      
                      // 获取所有账户都可用的人群包（模拟：这里假设acc_001-acc_005有相同人群包）
                      const syncableAccounts = selectedAccountIds.filter(id => {
                        // 模拟逻辑：acc_001-acc_005 属于同一业务单元，有相同人群包
                        const acc = MOCK.accounts.find(a => a.id === id);
                        if (!acc) return false;
                        // 白驹和烽华的账户有相同人群包
                        return ['baiju', 'fenghua'].includes(acc.businessUnit);
                      });
                      
                      if (syncableAccounts.length < 2) {
                        notify('所选账户中没有可同步的人群包（需要属于同一业务单元）', 'error');
                        return;
                      }
                      
                      const newSettings = {};
                      syncableAccounts.forEach(id => { newSettings[id] = { ...firstAudience }; });
                      setAccountAudienceSettings(prev => ({ ...prev, ...newSettings }));
                      notify(`已将 ${syncableAccounts.length} 个账户的人群配置同步为 ${firstAccountId} 的配置`, 'success');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50"
                  >
                    <i className="fas fa-copy mr-1"></i>批量同步
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">每个账户需单独配置，支持批量同步</p>
              {selectedAccountIds.length === 0 ? (
                <p className="text-sm text-gray-400">请先选择账户</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedAccountIds.map(accountId => {
                    const acc = MOCK.accounts.find(a => a.id === accountId);
                    if (!acc) return null;
                    const audienceSettings = getAccountAudience(accountId);
                    return (
                      <div key={accountId} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2">
                          <i className="fas fa-user-friends text-blue-500 text-xs"></i>
                          <span className="text-xs font-semibold text-gray-900 truncate flex-1" title={acc.name}>{acc.name}</span>
                          {audienceSettings.mode === 'exclude' && (
                            <button onClick={() => refreshExcludeAudiencePackages(accountId)} className="text-xs text-orange-600 hover:text-orange-800 flex-shrink-0">
                              <i className="fas fa-sync-alt"></i>
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name={`audience_mode_${accountId}`} value="unlimited" checked={audienceSettings.mode === 'unlimited'} onChange={() => updateAccountAudience(accountId, { mode: 'unlimited' })} className="mr-1 w-3 h-3" />
                            <span className="text-xs">定向</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name={`audience_mode_${accountId}`} value="exclude" checked={audienceSettings.mode === 'exclude'} onChange={() => updateAccountAudience(accountId, { mode: 'exclude' })} className="mr-1 w-3 h-3" />
                            <span className="text-xs">排除</span>
                          </label>
                        </div>
                        {audienceSettings.mode === 'exclude' && (
                          <div className="animate-fadeIn">
                            <select
                              value=""
                              onChange={e => {
                                const val = e.target.value;
                                if (val && !audienceSettings.excludeList.includes(val)) {
                                  updateAccountAudience(accountId, { excludeList: [...audienceSettings.excludeList, val] });
                                }
                              }}
                              className="w-full px-1.5 py-1 border border-orange-200 rounded text-xs outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              <option value="">+ 排除人群包 +</option>
                              {excludeAudiencePackageList.map(ep => (
                                <option key={ep.id} value={ep.id} disabled={audienceSettings.excludeList.includes(ep.id)}>
                                  {ep.name.length > 10 ? ep.name.substring(0, 10) + '...' : ep.name}{audienceSettings.excludeList.includes(ep.id) ? ' ✓' : ''}
                                </option>
                              ))}
                            </select>
                            {audienceSettings.excludeList.length > 0 && (
                              <div className="flex flex-wrap gap-0.5 mt-1">
                                {audienceSettings.excludeList.map(id => {
                                  const pkg = excludeAudiencePackageList.find(e => e.id === id);
                                  return pkg ? (
                                    <span key={id} className="tag bg-orange-100 text-orange-800 text-xs px-1 py-0">
                                      {pkg.name.length > 8 ? pkg.name.substring(0, 8) + '...' : pkg.name}
                                      <button onClick={() => updateAccountAudience(accountId, { excludeList: audienceSettings.excludeList.filter(i => i !== id) })} className="ml-0.5"><i className="fas fa-times text-xs"></i></button>
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 定向配置 */}
            <div className="border-t pt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">定向配置</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="tgt_alloc" checked={tgtAllocMode === 'shared'} onChange={() => setTgtAllocMode('shared')} className="mr-2" />
                  全账户共用
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="tgt_alloc" checked={tgtAllocMode === 'per_account'} onChange={() => setTgtAllocMode('per_account')} className="mr-2" />
                  分账户定制
                </label>
              </div>
              {tgtAllocMode === 'shared' && (
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">选择定向包（一个任务仅能选择一个定向包）</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTargetingPackages.map(tpId => {
                      const tp = MOCK.targetingPackages.find(t => t.id === tpId) || userTgtPkgs.find(t => t.id === tpId);
                      return tp ? (
                        <span key={tpId} className="tag bg-blue-100 text-blue-800">
                          {tp.name}
                          <button onClick={() => setSelectedTargetingPackages(selectedTargetingPackages.filter(id => id !== tpId))}><i className="fas fa-times"></i></button>
                        </span>
                      ) : null;
                    })}
                  </div>
                  <button
                    onClick={openSharedTgtModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left w-full md:w-auto min-w-[200px]"
                  >
                    <span className={selectedTargetingPackages.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
                      {selectedTargetingPackages.length > 0 ? (MOCK.targetingPackages.find(t => t.id === selectedTargetingPackages[0]) || userTgtPkgs.find(t => t.id === selectedTargetingPackages[0]) || {}).name : '点击选择定向包'}
                    </span>
                    <i className="fas fa-chevron-down ml-2 text-gray-400 text-sm"></i>
                  </button>
                  {selectedTargetingPackages.length === 0 && (
                    <p className="text-xs text-orange-500 mt-1"><i className="fas fa-exclamation-circle mr-1"></i>请选择一个定向包</p>
                  )}
                  {channel === 'oceanengine' && selectedTargetingPackages.length > 0 && (
                    <p className="text-xs text-blue-500 mt-1"><i className="fas fa-info-circle mr-1"></i>巨量引擎渠道：一个任务仅能选择一个定向包，同一定向包内容在同一账户下仅对应一个项目</p>
                  )}
                </div>
              )}

              {/* 分账户定制：每个账户独立选择定向包 */}
              {tgtAllocMode === 'per_account' && (
                <div>
                  <p className="text-xs text-gray-500 mb-3">为每个账户独立选择一个定向包（每个账户仅能选一个）：</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {(selectedAccountIds.length > 0 ? selectedAccountIds : MOCK.accounts.map(a => a.id)).map((id) => {
                      const acc = MOCK.accounts.find(a => a.id === id);
                      if (!acc) return null;
                      const sel = perAccountTgtPkgs[id] || [];
                      return (
                        <div key={id} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-1.5 mb-2 min-w-0">
                            <i className="fas fa-user-friends text-blue-500 text-xs flex-shrink-0"></i>
                            <span className="text-xs font-semibold text-gray-900 truncate" title={acc.name}>
                              {acc.name.length > 10 ? acc.name.substring(0, 10) + '...' : acc.name}
                            </span>
                          </div>
                          <MultiSelectDropdown
                            options={[...MOCK.targetingPackages, ...userTgtPkgs].filter(tp => tp.channel === 'toutiao').map(tp => ({ value: tp.id, label: tp.name }))}
                            selected={sel}
                            onChange={vals => setPerAccountTgtPkgs(prev => ({ ...prev, [id]: vals }))}
                            placeholder="选择定向包"
                            emptyText="暂无可用的定向包"
                            compact
                            single
                            panelMaxHeight={220}
                          />
                          {sel.length > 0 && (
                            <div className="flex flex-wrap gap-0.5 mt-1.5">
                              {sel.slice(0, 6).map(tpId => {
                                const tp = MOCK.targetingPackages.find(t => t.id === tpId) || userTgtPkgs.find(t => t.id === tpId);
                                return tp ? (
                                  <span key={tpId} className="tag bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">{tp.name.length > 8 ? tp.name.substring(0, 8) + '...' : tp.name}</span>
                                ) : null;
                              })}
                              {sel.length > 6 && <span className="text-xs text-gray-400 px-1">+{sel.length - 6}</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 定向包选择弹窗 */}
              {showTgtPkgModal && (
                    <div className="modal-overlay" onClick={() => setShowTgtPkgModal(false)}>
                      <div className="modal-content w-full max-w-lg" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-4 border-b">
                          <h3 className="text-lg font-bold">选择定向包</h3>
                          <button onClick={() => setShowTgtPkgModal(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
                        </div>
                        <div className="overflow-y-auto p-4" style={{maxHeight: '55vh'}}>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700 mb-2">系统定向包</p>
                            {MOCK.targetingPackages.filter(tp => tp.channel === 'toutiao').map(tp => (
                              <label key={tp.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    name="tgt_pkg_single"
                                    checked={modalSelectedIds.includes(tp.id)}
                                    onChange={() => toggleModalTp(tp.id)}
                                    className="mr-3"
                                  />
                                  <div>
                                    <span className="text-sm font-medium">{tp.name}</span>
                                    <p className="text-xs text-gray-500 mt-0.5">{tp.region}，{tp.age}岁，{tp.gender}</p>
                                  </div>
                                </div>
                                {modalSelectedIds.includes(tp.id) && (
                                  <i className="fas fa-check text-blue-500"></i>
                                )}
                              </label>
                            ))}
                            {userTgtPkgs.filter(tp => tp.channel === 'toutiao').length > 0 && (
                              <>
                                <p className="text-sm font-medium text-gray-700 mb-2 mt-4">自建定向包</p>
                                {userTgtPkgs.filter(tp => tp.channel === 'toutiao').map(tp => (
                                  <label key={tp.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-center">
                                      <input
                                        type="radio"
                                        name="tgt_pkg_single"
                                        checked={modalSelectedIds.includes(tp.id)}
                                        onChange={() => toggleModalTp(tp.id)}
                                        className="mr-3"
                                      />
                                      <div>
                                        <span className="text-sm font-medium">{tp.name} <span className="text-xs text-blue-500 font-normal">[自建]</span></span>
                                        <p className="text-xs text-gray-500 mt-0.5">{tp.region}，{tp.age}岁，{tp.gender}</p>
                                      </div>
                                    </div>
                                    {modalSelectedIds.includes(tp.id) && (
                                      <i className="fas fa-check text-blue-500"></i>
                                    )}
                                  </label>
                                ))}
                              </>
                            )}
                            <div className="pt-3 mt-2">
                              <div className="flex gap-2">
                                <button onClick={handleNewTgtPkg} className="px-3 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 text-sm"><i className="fas fa-plus mr-1"></i>新建定向包</button>
                                <button onClick={handleRefreshTgtPkgs} className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"><i className="fas fa-sync mr-1"></i>刷新</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t flex justify-end items-center gap-2">
                          <span className="text-sm text-gray-500">已选 {modalSelectedIds.length} 个定向包</span>                          <button onClick={confirmTgtPkgModal} className="btn-primary">确认</button>
                        </div>
                      </div>
                    </div>
                  )}
            </div>

            {/* 出价与预算 */}
            <div className="border-t pt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">出价与预算</h3>

              {/* 竞价策略 & 出价（固定，与日预算同宽） */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">竞价策略</div>
                  <input type="text" value="稳定成本" disabled className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500" />
                </div>
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">出价（元）<span className="text-red-500">*</span></div>
                  <input
                    type="number"
                    min="0.01"
                    max="300"
                    step="0.01"
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    onBlur={e => {
                      const v = e.target.value;
                      if (v === '') return;
                      let n = parseFloat(v);
                      if (isNaN(n)) return;
                      if (n < 0.01) n = 0.01;
                      if (n > 300) n = 300;
                      setBidAmount(String(n));
                    }}
                    placeholder="0.01 ~ 300"
                    className={`w-1/2 px-3 py-2 border rounded-lg outline-none focus:ring-2 ${bidAmount !== '' && (parseFloat(bidAmount) < 0.01 || parseFloat(bidAmount) > 300) ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'}`}
                  />
                  {bidAmount !== '' && (parseFloat(bidAmount) < 0.01 || parseFloat(bidAmount) > 300) && (
                    <p className="text-xs text-red-500 mt-1">出价需在 0.01 ~ 300 元之间</p>
                  )}
                </div>
              </div>

              {/* 日预算 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-1">日预算（元）</div>
                  <input
                    type="number"
                    value={dailyBudget}
                    onChange={e => setDailyBudget(e.target.value)}
                    placeholder="输入日预算，留空=不限"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-left"
                  />
                </div>
              </div>
            </div>

            {/* 投放设置 */}
            <div className="border-t pt-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">投放设置</h3>

              {/* 投放日期 */}
              <div className="mb-6">
                <div className="block text-sm font-medium text-gray-700 mb-2">投放日期</div>
                <div className="flex gap-6 mb-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="date_type" checked={投放日期类型 === 'long_term'} onChange={() => set投放日期类型('long_term')} className="mr-2" />
                    从今天起长期投放
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="date_type" checked={投放日期类型 === 'custom'} onChange={() => set投放日期类型('custom')} className="mr-2" />
                    设置开始和结束日期
                  </label>
                </div>
                {投放日期类型 === 'custom' ? (
                  <div className="flex gap-4">
                    <div>
                      <input type="date" value={自定义开始日期} onChange={e => set自定义开始日期(e.target.value)} placeholder="开始日期" className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <input type="date" value={自定义结束日期} onChange={e => set自定义结束日期(e.target.value)} placeholder="结束日期" className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                ) : null}
              </div>

              {/* 投放时段 - 广点通同款样式 */}
              <div className="mb-2">
                <div className="block text-sm font-medium text-gray-700 mb-2">投放时段</div>
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-sm text-gray-600 mr-2">选择时段</span>
                  <label className="flex items-center cursor-pointer mr-5">
                    <input type="radio" name="time_mode" checked={投放时段模式 === 'all_day'} onChange={() => set投放时段模式('all_day')} className="mr-1.5" />
                    <span className="text-sm">全天</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="time_mode" checked={投放时段模式 === 'multi_slot'} onChange={() => set投放时段模式('multi_slot')} className="mr-1.5" />
                    <span className="text-sm">指定多个时段</span>
                  </label>
                </div>

                {投放时段模式 === 'time_range' && (
                  <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg border border-gray-200 max-w-xl">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">开始时间</label>
                      <input
                        type="time"
                        value={timeRangeStart}
                        onChange={e => setTimeRangeStart(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    </div>
                    <span className="text-gray-400 mt-5">至</span>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">结束时间</label>
                      <input
                        type="time"
                        value={timeRangeEnd}
                        onChange={e => setTimeRangeEnd(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                    </div>
                  </div>
                )}

                {投放时段模式 === 'multi_slot' && (
                  <TimeGrid value={timeGridSlots} onChange={setTimeGridSlots} />
                )}
              </div>

              {/* 项目名称：仅在搭建项目和项目时填写，与其它字段左对齐 */}
              {buildType === 'project_unit' && (
                <div className="flex items-center gap-3 mb-5">
                  <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">项目名称 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={unitName}
                    onChange={e => setUnitName(e.target.value)}
                    placeholder="输入项目名称"
                    className="w-80 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {nameVariables.map(v => (
                      <span key={v} onClick={() => setUnitName(unitName + '{' + v + '}')} className="text-blue-500 hover:text-blue-700 cursor-pointer">+{v}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
            )}

          {/* 账户项目明细（仅搭建项目模式） */}
          {buildType === 'unit_only' && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-700">账户项目明细 <span className="text-red-500">*</span></span>
                <span className="text-xs text-gray-400">每个账户下选择要投放的营销项目（支持多选，每个账户至少选 1 个）</span>
              </div>
              {selectedAccountIds.length === 0 ? (
                <div className="text-sm text-gray-400 py-4">请先在「基础配置」选择投放账户</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedAccountIds.map(accountId => {
                    const acc = MOCK.accounts.find(a => a.id === accountId);
                    if (!acc) return null;
                    const units = getAccountUnits(accountId);
                    const sel = selectedUnits[accountId] || [];
                    return (
                      <div key={accountId} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2 min-w-0">
                          <i className="fas fa-cubes text-blue-500 text-xs flex-shrink-0"></i>
                          <span className="text-xs font-semibold text-gray-900 truncate" title={acc.name}>
                            {acc.name.length > 10 ? acc.name.substring(0, 10) + '...' : acc.name}
                          </span>
                        </div>
                        <MultiSelectDropdown
                          options={units.map(u => ({ value: u.id, label: u.name }))}
                          selected={sel}
                          onChange={vals => setSelectedUnits(prev => ({ ...prev, [accountId]: vals }))}
                          placeholder="选择营销项目"
                          emptyText="该账户暂无可投放项目"
                          compact
                          panelMaxHeight={200}
                        />
                        {sel.length > 0 ? (
                          <div className="flex flex-wrap gap-0.5 mt-1.5">
                            {sel.map(uid => {
                              const u = units.find(x => x.id === uid);
                              return u ? (
                                <span key={uid} className="tag bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5">{u.name.length > 8 ? u.name.substring(0, 8) + '...' : u.name}</span>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-orange-400 mt-1.5"><i className="fas fa-exclamation-triangle mr-0.5"></i>未选择</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== 底部：广告配置 ===== */}
        <div id="section-creative" className="">
          <div className="px-6 py-3.5 flex items-center gap-3 border-b border-gray-200">
            <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="text-base font-semibold text-gray-900">广告配置</h2>
            <span className="text-xs text-gray-400 ml-auto font-normal"><i className="far fa-clock mr-1"></i>配置广告素材、广告文案、产品与广告组件</span>
          </div>
          <div className="p-6 space-y-6">
            {/* 广告素材（视频+图片） */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">广告素材 <span className="text-red-500">*</span>（已选 <span className="text-red-500">{selectedMaterials.length}/500</span> 个）</span>
              <button onClick={() => { setMaterialPickerTarget(null); setShowMaterialModal(true); }} className="btn-secondary">
                <i className="fas fa-photo-video mr-2"></i>选择素材（视频/图片）
              </button>
            </div>



            {/* 广告制作（按账户分广告组）已下线；广告素材选择请见上方「广告素材」按钮 */}


            {/* 广告文案 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">广告文案 <span className="text-red-500">*</span>（已选 <span className="text-red-500">{selectedCopies.length}/50</span> 条）</span>
              <button onClick={() => setShowCopyModal(true)} className="btn-secondary">
                <i className="fas fa-font mr-2"></i>选择广告文案
              </button>
            </div>

            {/* 产品信息 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3">产品信息</h4>
              {(() => {
                const pid = productAllocMode === 'per_account' ? (perAccountProduct[selectedAccountIds[0]] || '') : specificProduct;
                const prod = MOCK.productLibrary.find(p => p.id === pid);
                if (!prod) return <p className="text-xs text-gray-400">请在「项目配置」选择营销产品</p>;
                return (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-3xl flex-shrink-0">{prod.image}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900 mb-1">{prod.name}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.sellingPoints.map((sp, i) => (
                          <span key={i} className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2 py-0.5">{sp}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 广告组件 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4">广告组件</h4>
              {/* 附加广告组件（置灰不可交互） */}
              <div className="mb-5">
                <button type="button" disabled className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-400 text-sm cursor-not-allowed">附加广告组件</button>
              </div>
              {/* 行动号召 */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700">行动号召</span>
                  <span className="text-red-500">*</span>
                  <i className="far fa-question-circle text-gray-400 text-xs" title="回车添加行动号召文案，最多 10 条"></i>
                  <input type="text" value={ctaInput} onChange={e => setCtaInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const v = ctaInput.trim(); if (v && ctaList.length < 10 && !ctaList.includes(v)) { setCtaList([...ctaList, v]); setCtaInput(''); } else if (ctaList.length >= 10) { notify('行动号召最多 10 条', 'error'); } } }} placeholder="输入行动号召文案，回车添加（最多10条）" className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-xs text-gray-400">{ctaList.length}/10</span>
                </div>
                {ctaList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {ctaList.map((c, i) => (
                      <span key={i} className="tag bg-gray-100 text-gray-800 text-xs px-2 py-1 flex items-center gap-1">
                        {c}
                        <button onClick={() => setCtaList(ctaList.filter((_, idx) => idx !== i))} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* 开启智能生成 */}
              <div>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={smartGen} onChange={e => setSmartGen(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">开启智能生成</span>
                  <i className="far fa-question-circle text-gray-400 text-xs" title="开启后系统将智能生成广告组合"></i>
                </label>
              </div>
            </div>

            {/* 来源 */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">来源</span>
              <input type="text" value={sourceText} onChange={e => setSourceText(e.target.value)} placeholder="请输入来源信息" className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* 素材数量配置 */}
            <div className="border-t pt-4">
              <div className="space-y-4">
                {/* 素材数量配置：图片x个/视频x个/文案x个 */}
                <div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">素材数量配置</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">图片</span>
                      <input type="number" min="1" max="15" value={composeRule.images}
                        onChange={e => {
                          const v = Math.max(1, Math.min(15, parseInt(e.target.value) || 1));
                          setComposeRule({...composeRule, images: v});
                        }}
                        className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <span className="text-xs text-gray-500">个</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">视频</span>
                      <input type="number" min="1" max="15" value={composeRule.videos}
                        onChange={e => {
                          const v = Math.max(1, Math.min(15, parseInt(e.target.value) || 1));
                          setComposeRule({...composeRule, videos: v});
                        }}
                        className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <span className="text-xs text-gray-500">个</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">文案</span>
                      <input type="number" min="1" max="3" value={composeRule.copies}
                        onChange={e => {
                          const v = Math.max(1, Math.min(3, parseInt(e.target.value) || 1));
                          setComposeRule({...composeRule, copies: v});
                        }}
                        className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      <span className="text-xs text-gray-500">个</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">单个广告内的素材数量</div>
                </div>

                {/* 广告分配策略 */}
                <div className="pt-2 mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">广告分配策略</span>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setComposeStrategy('copy')}
                        className={`relative rounded-lg border px-3 py-2 text-left transition ${composeStrategy === 'copy' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                        <div className="text-sm font-medium text-gray-900">复制分配</div>
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs cursor-pointer"
                          onMouseEnter={() => setHoverStrategy('copy')} onMouseLeave={() => setHoverStrategy(null)}>
                          <i className="fas fa-info"></i>
                          {hoverStrategy === 'copy' && (
                            <span className="absolute -top-2 -right-2 whitespace-nowrap bg-blue-500 text-white text-xs rounded px-2 py-1">所有项目共用同一批广告</span>
                          )}
                        </span>
                      </button>
                      <button type="button" onClick={() => setComposeStrategy('average')}
                        className={`relative rounded-lg border px-3 py-2 text-left transition ${composeStrategy === 'average' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                        <div className="text-sm font-medium text-gray-900">平均分配</div>
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs cursor-pointer"
                          onMouseEnter={() => setHoverStrategy('average')} onMouseLeave={() => setHoverStrategy(null)}>
                          <i className="fas fa-info"></i>
                          {hoverStrategy === 'average' && (
                            <span className="absolute -top-2 -right-2 whitespace-nowrap bg-blue-500 text-white text-xs rounded px-2 py-1">根据项目数均分广告数</span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 预估可生成广告数 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
                  <p className="text-xs text-gray-500 mb-1">预估可生成广告数：</p>
                  {(() => {
                    const s = getBuildSummary();
                    const total = s.totalCreatives;
                    const over = s.overLimit || s.overUnit;
                    const isAvg = composeStrategy === 'average';
                    return (
                      <p className={`text-lg font-bold ${over ? 'text-red-600' : 'text-blue-600'}`}>
                        {isNaN(total) ? 0 : total} 个广告
                        {s.overLimit && <span className="text-xs font-normal text-red-500 ml-2">（已超限，单次任务上限 1000 个）</span>}
                        {s.overUnit && <span className="text-xs font-normal text-red-500 ml-2">（单项目超限，上限 100 个）</span>}
                        <span className="text-xs font-normal text-gray-500 ml-2">
                          {isAvg
                            ? `素材数 ${s.materialCount} ÷ 单广告素材数 ${(composeRule.images || 0) + (composeRule.videos || 0)}`
                            : `项目数 ${s.totalUnits} × 素材数 ${s.materialCount} ÷ 单广告素材数 ${(composeRule.images || 0) + (composeRule.videos || 0)}`}
                        </span>
                      </p>
                    );
                  })()}
                  {(() => {
                    const s = getBuildSummary();
                    if (!s.overUnit) return null;
                    return (
                      <div className="mt-2 text-xs text-red-500">单个项目广告数 {s.perUnitCreatives} 超出上限 100 个，请调整素材 / 单广告素材数 / 项目数</div>
                    );
                  })()}
                  <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                    <div>规则：默认根据素材确定广告数，文案选取方式为顺序选取</div>
                    <div>复制分配：预估可生成广告数 = 项目数 × 已选素材数 ÷ 单广告素材数；</div>
                    <div>平均分配：预估可生成广告数 = 已选素材数 ÷ 单广告素材数</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 广告名称 */}
            <div>
              <div className="flex items-center gap-2 max-w-md">
                <span className="text-sm font-medium text-gray-700 flex-shrink-0">广告名称</span>
                <input type="text" value={creativeName} onChange={e => setCreativeName(e.target.value)} placeholder="输入广告名称（支持变量）" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  {creativeNameVariables.map(v => (
                    <span key={v} onClick={() => setCreativeName(creativeName + '{' + v + '}')} className="text-blue-500 hover:text-blue-700 cursor-pointer">+{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===== 运行配置 ===== */}
        <div id="section-run" className="px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">4</span>
            运行配置
          </h3>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="runMode" checked={runMode === 'immediate'} onChange={() => setRunMode('immediate')} className="mr-2" />
              <span>立即运行</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="runMode" checked={runMode === 'scheduled'} onChange={() => setRunMode('scheduled')} className="mr-2" />
              <span>定时运行</span>
            </label>
          </div>
          {runMode === 'scheduled' && (
            <div className="flex items-center gap-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">定时日期</div>
                <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">定时时间</div>
                <input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          )}
        </div>

        {/* ===== 操作按钮 ===== */}
        <div className="flex justify-center gap-4 pb-8">
          <button
            onClick={() => {
              if (selectedAccountIds.length === 0) { notify('请先选择账户', 'error'); return; }
              setShowPreview(true);
            }}
            className="btn-primary text-lg px-8 py-3"
          >
            <i className="fas fa-eye mr-2"></i>预览全部
          </button>
          <button
            onClick={() => {
              if (selectedAccountIds.length === 0) { notify('请先选择账户', 'error'); return; }
              if (runMode === 'scheduled') {
                if (!scheduledDate || !scheduledTime) {
                  notify('请设置定时日期和时间', 'error');
                  return;
                }
                notify(`任务已提交，将在 ${scheduledDate} ${scheduledTime} 运行`, 'success');
                return;
              }
              handleRun();
            }}
            className="btn-secondary text-lg px-8 py-3"
          >
            <i className="fas fa-play mr-2"></i>{runMode === 'immediate' ? '立即运行' : '定时运行'}
          </button>
        </div>

      
      {/* ===== 素材库弹窗 ===== */}
      <MaterialModal
        show={showMaterialModal}
        onClose={() => { setShowMaterialModal(false); setMaterialPickerTarget(null); }}
        onConfirm={(materials) => {
          if (!materialPickerTarget) {
            setSelectedMaterials(materials);
          } else if (materialPickerTarget.type === 'batch') {
            batchFillGroups(materialPickerTarget.accountId, materials);
          } else {
            applyPickedMaterials(materials);
            return;
          }
          setMaterialPickerTarget(null);
          setShowMaterialModal(false);
        }}
        onClear={() => {
          if (!materialPickerTarget) setSelectedMaterials([]);
        }}
        selectedMaterials={materialPickerTarget ? [] : selectedMaterials}
      />

      {/* ===== 文案库弹窗 ===== */}
      <CopyModal
        show={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        onConfirm={(copies) => {
          setSelectedCopies(copies);
          setShowCopyModal(false);
        }}
        selectedCopies={selectedCopies}
        copyLibrary={MOCK.copyLibrary}
        copyPackages={MOCK.copyPackages}
        channel="toutiao"
      />

      {/* ===== 附加广告组件 - 资产库弹窗 ===== */}
      {showCreativeCompModal && (
        <div className="modal-overlay" onClick={() => setShowCreativeCompModal(false)}>
          <div className="modal-content w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">选择附加广告组件（资产库）</h3>
              <button onClick={() => setShowCreativeCompModal(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
            </div>
            <div className="overflow-y-auto p-4" style={{ maxHeight: '55vh' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {MOCK.creativeComponents.map(cc => {
                  const checked = selectedCreativeComponents.some(x => x.id === cc.id);
                  return (
                    <label key={cc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              setSelectedCreativeComponents(selectedCreativeComponents.filter(x => x.id !== cc.id));
                            } else {
                              setSelectedCreativeComponents([...selectedCreativeComponents, { id: cc.id, name: cc.name }]);
                            }
                          }}
                          className="mr-3"
                        />
                        <div>
                          <span className="text-sm font-medium">{cc.name}</span>
                          <span className="ml-2 text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{cc.type}</span>
                          <p className="text-xs text-gray-500 mt-0.5">{cc.desc}</p>
                        </div>
                      </div>
                      {checked && <i className="fas fa-check text-blue-500"></i>}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t flex justify-end items-center gap-2">
              <span className="text-sm text-gray-500">已选 {selectedCreativeComponents.length} 个</span>
              <button onClick={() => setShowCreativeCompModal(false)} className="btn-primary">确认</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== 立即运行：进度弹窗（可转后台运行） ===== */}
      {runModal && (
        <div className="modal-overlay" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="modal-content" style={{ background:'#fff', borderRadius:'14px', width:'460px', maxWidth:'92vw', padding:'24px', boxShadow:'0 20px 60px rgba(0,0,0,0.25)' }}>
            {!runResult ? (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <i className="fas fa-cog fa-spin text-blue-500"></i>搭建进行中…
                </h3>
                <p className="text-sm text-gray-500 mb-4">正在为 {selectedAccountIds.length || 3} 个账户搭建广告，请稍候</p>
                <div style={{ height:'10px', background:'#eef2f7', borderRadius:'999px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width: runProgress + '%', background:'linear-gradient(90deg,#1890ff,#52c41a)', transition:'width .2s' }}></div>
                </div>
                <div className="text-right text-xs text-gray-400 mt-2">{runProgress}%</div>
                <div className="flex justify-center mt-5">
                  <button onClick={goBackground} className="btn-secondary text-sm px-5 py-2">
                    <i className="fas fa-arrow-right mr-2"></i>转到后台运行
                  </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-3">点击「转到后台运行」将跳回任务列表，搭建在后台继续</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>搭建完成
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-left">
                        <th className="px-3 py-2 font-medium">账户</th>
                        <th className="px-3 py-2 font-medium">项目</th>
                        <th className="px-3 py-2 font-medium">广告</th>
                        <th className="px-3 py-2 font-medium">失败原因</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(runResult.rows || []).map((r, i) => {
                        const reasons = [...new Set(r.reasons || [])];
                        return (
                          <tr key={i} className="border-t border-gray-100">
                            <td className="px-3 py-2 align-top text-gray-700">{r.accId}</td>
                            <td className="px-3 py-2 align-top text-gray-700">{r.unitSucc}成 / {r.unitFail}败</td>
                            <td className="px-3 py-2 align-top text-gray-700">{r.creaSucc}成 / {r.creaFail}败</td>
                            <td className="px-3 py-2 align-top">
                              {reasons.length
                                ? reasons.map((rr, ri) => (
                                    <span key={ri} className="inline-block px-2 py-1 mb-1 mr-1 rounded bg-red-50 text-red-500 text-xs">{rr}</span>
                                  ))
                                : <span className="text-green-500 text-xs"><i className="fas fa-check-circle mr-1"></i>无</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center">
                  <button onClick={confirmResult} className="btn-primary text-sm px-8 py-2">确定</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== 预览弹窗 ===== */}
      {showPreview && (() => {
        const summary = getBuildSummary();
        const { accountCount, tpCount, unitsPerAccount, totalUnits, materialCount, copyCount, creativesPerUnit, totalCreatives } = summary;

        return (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="modal-content w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold text-gray-900"><i className="fas fa-chart-pie mr-2 text-blue-500"></i>搭建配置预览</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
            </div>
            <div className="overflow-auto flex-1 p-6" style={{maxHeight: '70vh'}}>
              {/* 核心统计卡片 */}
              {/* 搭建总量预览卡片已按需求删除（文案与广告数无关，不再用 账户×项目×文案 估算） */}

              {/* 详细拆解 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{accountCount}</p>
                  <p className="text-xs text-blue-700 mt-1">选择账户</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{totalUnits}</p>
                  <p className="text-xs text-green-700 mt-1">总项目数</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-orange-600">{materialCount}</p>
                  <p className="text-xs text-orange-700 mt-1">素材数</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">{copyCount}</p>
                  <p className="text-xs text-purple-700 mt-1">广告文案</p>
                </div>
              </div>

              {/* 账户明细列表 */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h4 className="text-sm font-semibold text-gray-700"><i className="fas fa-list-ul mr-2"></i>各账户搭建明细</h4>
                </div>
                <div className="divide-y divide-gray-100">
                  {selectedAccountIds.map((id, idx) => {
                    return (
                      <div key={id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{id}</p>
                            <p className="text-xs text-gray-400">子账户 ID</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{unitsPerAccount} 项目 × {materialCount} 素材 = <span className="text-blue-600">{Math.floor(totalCreatives / accountCount)} 广告</span></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 配置摘要：列出整个表单所有配置项，未配置的必填项目标红 */}
              {(() => {
                const configItems = (() => {
                  const bu = MOCK.businessUnits.find(b => b.id === businessUnit);
                  const mo = MOCK.marketingObjectives.find(m => m.id === marketingObjective);
                  const prod = getProductsForBusinessUnit().find(sp => sp.id === specificProduct);
                  const conv = (MOCK.conversionsByBusinessUnit[businessUnit] || []).find(c => c.id === conversionGoal);
                  const geoDetail = geoMode === 'unlimited' ? '不限' : (geoSelectedProvinces.length > 0 ? (geoSelectedProvinces.length + ' 个省份') : '未选择');
                  const geoOk = geoMode === 'unlimited' || geoSelectedProvinces.length > 0;
                  const items = [];
                  items.push({ label: '选择账户', value: selectedAccountIds.length > 0 ? (selectedAccountIds.length + ' 个') : '未选择', required: true, ok: selectedAccountIds.length > 0 });
                  items.push({ label: '业务单元', value: bu ? bu.name : '未设置', required: false, ok: !!bu });
                  items.push({ label: '营销目的', value: mo ? mo.name : '未设置', required: false, ok: !!mo });
                  items.push({ label: '产品', value: prod ? prod.name : '未设置', required: true, ok: !!prod });
                  items.push({ label: '转化目标', value: conv ? conv.name : '未设置', required: true, ok: !!conv });
                  items.push({ label: '营销项目名称', value: unitName || '未设置', required: true, ok: !!unitName });
                  items.push({ label: '地域定向', value: geoDetail, required: false, ok: geoOk });
                  items.push({ label: '出价', value: bidAmount !== '' ? ('¥' + bidAmount) : '未设置', required: true, ok: bidAmount !== '' });
                  items.push({ label: '日预算', value: dailyBudget !== '' ? ('¥' + dailyBudget) : '未设置', required: false, ok: dailyBudget !== '' });
                  items.push({ label: '广告素材数', value: (selectedMaterials.length + ' 个'), required: true, ok: selectedMaterials.length > 0 });
                  items.push({ label: '广告文案数', value: (selectedCopies.length + ' 条'), required: true, ok: selectedCopies.length > 0 });
                  items.push({ label: '图片个数', value: String(composeRule.images || 0), required: false, ok: true });
                  items.push({ label: '视频个数', value: String(composeRule.videos || 0), required: false, ok: true });
                  items.push({ label: '文案个数', value: String(composeRule.copies || 0), required: false, ok: true });
                  items.push({ label: '广告分配策略', value: composeStrategy === 'average' ? '平均分配' : '复制分配', required: false, ok: true });
                  items.push({ label: '营销产品', value: (productAllocMode === 'shared' ? (MOCK.productLibrary.find(p => p.id === specificProduct) || {}).name : '分账户定制') || '未设置', required: false, ok: !!(productAllocMode === 'shared' ? specificProduct : Object.keys(perAccountProduct).length > 0) });
                  items.push({ label: '行动号召', value: ctaList.length > 0 ? (ctaList.length + ' 条') : '未设置', required: true, ok: ctaList.length > 0 });
                  items.push({ label: '来源', value: sourceText || '未设置', required: false, ok: !!sourceText });
                  items.push({ label: '广告名称', value: creativeName || '未设置', required: false, ok: !!creativeName });
                  items.push({ label: '运行模式', value: runMode === 'scheduled' ? '定时运行' : '立即运行', required: false, ok: true });
                  if (runMode === 'scheduled') items.push({ label: '定时时间', value: (scheduledDate && scheduledTime) ? (scheduledDate + ' ' + scheduledTime) : '未设置', required: true, ok: !!(scheduledDate && scheduledTime) });
                  items.push({ label: '投放日期', value: 投放日期类型 === 'long_term' ? '从今天起长期投放' : '设置开始和结束日期', required: false, ok: true });
                  items.push({ label: '搭建类型', value: buildType === 'unit_only' ? '仅搭建项目' : '搭建项目和项目', required: false, ok: true });
                  items.push({ label: '推官链接', value: getDefaultLandingPage(selectedAccountIds[0] || '') ? '已设置' : '未设置', required: false, ok: true });
                  return items;
                })();
                const missCount = configItems.filter(i => i.required && !i.ok).length;
                return (
                  <div className="mt-6 bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      <i className="fas fa-cog mr-2"></i>关键配置摘要
                      {missCount > 0
                        ? <span className="ml-2 text-xs text-red-500 font-normal">（{missCount} 项必填未配置）</span>
                        : <span className="ml-2 text-xs text-green-600 font-normal">（必填项均已配置）</span>}
                    </h4>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      {configItems.map((it, i) => {
                        const miss = it.required && !it.ok;
                        return (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-gray-500 flex-shrink-0">{it.label}：</span>
                            {miss ? (
                              <span className="font-medium text-red-500">{it.value}<span className="ml-1 text-xs border border-red-300 rounded px-1">未配置</span></span>
                            ) : (
                              <span className="font-medium text-gray-900">{it.value}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="p-5 border-t flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="btn-secondary">关闭</button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  notify(`已确认搭建 ${accountCount} 个账户 × ${totalUnits} 个项目，共 ${totalCreatives} 个广告`, 'success');
                }}
                className="btn-primary"
              >
                <i className="fas fa-check mr-2"></i>确认搭建
              </button>
            </div>
          </div>
        </div>
        );
      })()}

        </div>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
