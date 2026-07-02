const { useState, useEffect } = React;

// ========== Mock 数据 ==========
const MOCK = {
  businessTypes: [
    { id: 'benefit_A', name: '权益A' },
    { id: 'benefit_B', name: '权益B' },
    { id: 'benefit_C', name: '权益C' }
  ],
  channels: [
    { id: 'gdt', name: '广点通' }
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
      { id: 'fw_conv_002', name: '服微-服务购买' },
      { id: 'fw_conv_003', name: '服微-关注公众号' }
    ]
  },
  accounts: [
    { id: 'acc_001', name: '账户001-北京移动', kaboshi: 'https://kaboshi.example.com/acc001', businessUnit: 'baiju' },
    { id: 'acc_002', name: '账户002-上海移动', kaboshi: 'https://kaboshi.example.com/acc002', businessUnit: 'baiju' },
    { id: 'acc_003', name: '账户003-广州移动', kaboshi: 'https://kaboshi.example.com/acc003', businessUnit: 'fenghua' },
    { id: 'acc_004', name: '账户004-深圳移动', kaboshi: 'https://kaboshi.example.com/acc004', businessUnit: 'fenghua' },
    { id: 'acc_005', name: '账户005-杭州移动', kaboshi: 'https://kaboshi.example.com/acc005', businessUnit: 'fuwei' },
  ],
  specificProducts: [
    { id: 'sp_001', name: '移动大王卡19元档' },
    { id: 'sp_002', name: '移动大王卡39元档' },
    { id: 'sp_003', name: '联通冰激凌99元档' },
    { id: 'sp_004', name: '电信天翼畅享套餐' }
  ],
  targetingPackages: [
    { id: 'tp_001', name: '一线城市年轻人群', region: '北京/上海/广州/深圳', age: '18-35', gender: '不限' },
    { id: 'tp_002', name: '全国流量敏感用户', region: '全国', age: '20-45', gender: '不限' },
    { id: 'tp_003', name: '学生群体', region: '全国', age: '18-24', gender: '不限' },
    { id: 'tp_004', name: '上班族', region: '一二线城市', age: '25-40', gender: '不限' },
    { id: 'tp_005', name: '中老年群体', region: '全国', age: '40-65', gender: '不限' },
    { id: 'tp_006', name: '游戏爱好者', region: '全国', age: '18-30', gender: '男' },
    { id: 'tp_007', name: '视频观看用户', region: '全国', age: '18-45', gender: '女' },
    { id: 'tp_008', name: '电商购物用户', region: '一二三线城市', age: '22-40', gender: '女' }
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
  // 品牌形象 & 视频号
  brandImages: [
    { id: 'bi_001', name: '品牌形象1', url: 'https://example.com/bi1.jpg' },
    { id: 'bi_002', name: '品牌形象2', url: 'https://example.com/bi2.jpg' },
    { id: 'bi_003', name: '品牌形象3', url: 'https://example.com/bi3.jpg' },
  ],
  videoAccounts: [
    { id: 'va_001', name: '视频号A' },
    { id: 'va_002', name: '视频号B' },
    { id: 'va_003', name: '视频号C' },
  ],
  // 素材库（视频+图片），带消耗/CTR/CVR数据
  videoMaterials: Array.from({length: 50}, (_, i) => ({
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
  imageMaterials: Array.from({length: 50}, (_, i) => ({
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
    { id: 'c_008', content: '家庭共享，多人更划算', ctr: 2.9 }
  ],
  videoSceneOptions: [
    { id: 'vs_001', label: '视频号原生广告-主入口', tip: '朋友圈上方视频号信息流中的广告位' },
    { id: 'vs_002', label: '视频号原生广告-订阅号入口', tip: '订阅号消息中的视频号内容广告位' },
    { id: 'vs_003', label: '视频号评论区广告', tip: '视频号内容评论区中的广告位' }
  ],
  mpSceneGroups: [
    {
      groupName: '公众号媒体类型',
      multi: true,
      options: [
        { id: 'mp_001', label: '不限' },
        { id: 'mp_002', label: '社会' },
        { id: 'mp_003', label: '生活' },
        { id: 'mp_004', label: '文化' },
        { id: 'mp_005', label: '教育' },
        { id: 'mp_006', label: '职场' },
        { id: 'mp_007', label: '健康' }
      ]
    },
    {
      groupName: '小程序小游戏流量类型',
      multi: true,
      options: [
        { id: 'mg_001', label: '小游戏：不限' },
        { id: 'mg_002', label: '小游戏：动作' },
        { id: 'mg_003', label: '小游戏：角色' },
        { id: 'mg_004', label: '小游戏：竞技' },
        { id: 'mg_005', label: '小游戏：其他' },
        { id: 'mg_009', label: '小程序：不限' },
        { id: 'mg_010', label: '小程序：共享充电' },
        { id: 'mg_011', label: '小程序：点餐外卖' },
        { id: 'mg_012', label: '小程序：快递生活' },
        { id: 'mg_013', label: '小程序：公共出行' },
        { id: 'mg_014', label: '小程序：车主服务' },
        { id: 'mg_015', label: '小程序：效率工具' },
        { id: 'mg_017', label: '小程序：电商' },
        { id: 'mg_018', label: '小程序：教育工具' },
        { id: 'mg_019', label: '小程序：微短剧' }
      ]
    },
    {
      groupName: '订单详情页消费场景',
      multi: true,
      options: [
        { id: 'os_001', label: '不限' },
        { id: 'os_002', label: '餐饮美食' },
        { id: 'os_003', label: '生活服务' },
        { id: 'os_004', label: '购物体验' },
        { id: 'os_005', label: '出行服务' }
      ]
    }
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
};

// 通知组件
function Notification({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const bg = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  return (
    <div className={`fixed left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-2xl text-white ${bg} max-w-sm text-center`} style={{top: '4rem', zIndex: 10000}}>
      {msg}
    </div>
  );
}

// 版位定投场景弹窗
function PlacementSceneModal({ placement, show, onClose, value, onChange }) {
  const [mode, setMode] = useState('unlimited');
  const [selected, setSelected] = useState([]);
  
  useEffect(() => {
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

  const handleToggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleConfirm = () => {
    onChange(mode === 'unlimited' ? 'unlimited' : selected.join(','));
    onClose();
  };

  const isVideo = placement === 'wechat_video';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">版位定投场景</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
        </div>
        <div className="p-4 border-b bg-gray-50">
          <label className="flex items-center cursor-pointer">
            <input type="radio" name="scene_mode" checked={mode === 'unlimited'} onChange={() => setMode('unlimited')} className="mr-2" />
            <span>不限</span>
          </label>
          <label className="flex items-center cursor-pointer mt-2">
            <input type="radio" name="scene_mode" checked={mode === 'custom'} onChange={() => setMode('custom')} className="mr-2" />
            <span>自定义</span>
          </label>
        </div>
        <div className="overflow-y-auto flex-1 p-4" style={{maxHeight: '50vh'}}>
          {mode === 'custom' && (
            <>
              {isVideo && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">视频号定投场景</p>
                  {MOCK.videoSceneOptions.map(opt => (
                    <label key={opt.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => handleToggle(opt.id)} className="mr-3" />
                        <span className="text-sm">{opt.label}</span>
                        {opt.tip && <span className="ml-2 text-gray-400 cursor-help" title={opt.tip}>❓</span>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {!isVideo && (
                <div className="space-y-6">
                  {MOCK.mpSceneGroups.map((group, gi) => (
                    <div key={gi}>
                      <p className="text-sm font-medium text-gray-700 mb-2">{group.groupName}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map(opt => (
                          <label key={opt.id} className="flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => handleToggle(opt.id)} className="mr-2" />
                            <span className="text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {mode === 'unlimited' && (
            <div className="text-center text-gray-400 py-8">已选择"不限"，将投放到所有可用场景</div>
          )}
        </div>
        <div className="p-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">取消</button>
          <button onClick={handleConfirm} className="btn-primary">确认</button>
        </div>
      </div>
    </div>
  );
}

// 素材库弹窗（视频+图片，带排序和日期维度）
function MaterialModal({ show, onClose, onConfirm, selectedMaterials, accountId }) {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'image'
  const [sortField, setSortField] = useState('spend'); // 'spend' | 'ctr' | 'cvr'
  const [sortOrder, setSortOrder] = useState('desc');
  const [timeRange, setTimeRange] = useState('7day'); // 'yesterday' | '7day'
  const [page, setPage] = useState(1);
  const [batchInputText, setBatchInputText] = useState('');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [localSelected, setLocalSelected] = useState(selectedMaterials.map(m => m.id));
  const perPage = 50;

  useEffect(() => {
    if (show) {
      setLocalSelected(selectedMaterials.map(m => m.id));
      setPage(1);
    }
  }, [show, selectedMaterials]);

  const allMaterials = activeTab === 'video' ? MOCK.videoMaterials : MOCK.imageMaterials;
  
  // 排序
  const sorted = [...allMaterials].sort((a, b) => {
    const field = sortField;
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    return (a[field] - b[field]) * multiplier;
  });
  
  const totalPages = Math.ceil(sorted.length / perPage);
  const paged = sorted.slice((page-1)*perPage, page*perPage);

  const toggleSelect = (id) => {
    if (localSelected.includes(id)) {
      setLocalSelected(localSelected.filter(s => s !== id));
    } else {
      if (localSelected.length >= 100) {
        alert('最多选择100个素材');
        return;
      }
      setLocalSelected([...localSelected, id]);
    }
  };

  const handleBatchInput = () => {
    const ids = batchInputText.split(/[,，\s]+/).map(s => s.trim()).filter(Boolean);
    let added = 0;
    ids.forEach(token => {
      const found = allMaterials.find(m => m.id === token || m.name === token);
      if (found && !localSelected.includes(found.id)) {
        if (localSelected.length + added >= 100) return;
        localSelected.push(found.id);
        added++;
      }
    });
    setLocalSelected([...localSelected]);
    setBatchInputText('');
    alert(`已批量添加 ${added} 个素材`);
  };

  const handleBatchModalInput = () => {
    const ids = batchInputText.split(/[\n,，\s]+/).map(s => s.trim()).filter(Boolean);
    let added = 0;
    ids.forEach(token => {
      const found = allMaterials.find(m => m.id === token || m.name === token);
      if (found && !localSelected.includes(found.id)) {
        if (localSelected.length + added >= 100) return;
        localSelected.push(found.id);
        added++;
      }
    });
    setLocalSelected([...localSelected]);
    setBatchInputText('');
    setShowBatchModal(false);
    alert(`已批量添加 ${added} 个素材`);
  };

  const handleConfirm = () => {
    const all = [...MOCK.videoMaterials, ...MOCK.imageMaterials];
    const result = localSelected.map(id => all.find(m => m.id === id)).filter(Boolean);
    onConfirm(result);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content w-full max-w-6xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">选择素材（已选 {localSelected.length}/100）</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
        </div>
        {/* 标签页 + 排序 + 时间维度 */}
        <div className="p-4 border-b bg-gray-50 flex flex-wrap items-center gap-4">
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            <button onClick={() => { setActiveTab('video'); setPage(1); }} className={`px-4 py-2 text-sm ${activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>🎬 视频素材</button>
            <button onClick={() => { setActiveTab('image'); setPage(1); }} className={`px-4 py-2 text-sm ${activeTab === 'image' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>🖼️ 图片素材</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">排序：</span>
            <select value={sortField} onChange={e => setSortField(e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option value="spend">消耗</option>
              <option value="ctr">CTR</option>
              <option value="cvr">CVR</option>
            </select>
            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option value="desc">从高到低</option>
              <option value="asc">从低到高</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">时间维度：</span>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="timeRange" value="yesterday" checked={timeRange === 'yesterday'} onChange={e => setTimeRange(e.target.value)} className="mr-1" />
              <span className="text-sm">昨日</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" name="timeRange" value="7day" checked={timeRange === '7day'} onChange={e => setTimeRange(e.target.value)} className="mr-1" />
              <span className="text-sm">近七日</span>
            </label>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <input
              type="text"
              value={batchInputText}
              onChange={e => setBatchInputText(e.target.value)}
              placeholder="批量输入素材ID或名称"
              className="px-2 py-1 border border-gray-300 rounded text-sm w-48"
            />
            <button onClick={handleBatchInput} className="btn-secondary text-sm">批量添加</button>
            <button onClick={() => setShowBatchModal(true)} className="btn-secondary text-sm bg-blue-50 text-blue-600 border-blue-300">
              <i className="fas fa-list mr-1"></i>批量选择
            </button>
          </div>
        </div>
        {/* 分页信息 */}
        <div className="px-4 py-2 border-b flex items-center justify-between text-sm text-gray-600">
          <span>第 {page} / {totalPages} 页，共 {sorted.length} 个{activeTab === 'video' ? '视频' : '图片'}素材</span>
          <div className="flex gap-2">
            <button onClick={() => {
              const currentPageIds = paged.map(m => m.id);
              const newSelected = [...new Set([...localSelected, ...currentPageIds])];
              if (newSelected.length > 100) {
                alert('最多选择100个素材');
                return;
              }
              setLocalSelected(newSelected);
            }} className="btn-secondary text-sm bg-green-50 text-green-700 border-green-300 hover:bg-green-100">
              <i className="fas fa-check-square mr-1"></i>全选本页
            </button>
            <button disabled={page <= 1} onClick={() => setPage(page-1)} className="btn-secondary text-sm" style={page <= 1 ? {opacity: 0.5, cursor: 'not-allowed'} : {}}>上一页</button>
            <button disabled={page >= totalPages} onClick={() => setPage(page+1)} className="btn-secondary text-sm" style={page >= totalPages ? {opacity: 0.5, cursor: 'not-allowed'} : {}}>下一页</button>
          </div>
        </div>
        {/* 素材网格 */}
        <div className="overflow-y-auto flex-1 p-4" style={{maxHeight: '50vh'}}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {paged.map(m => {
              const isSelected = localSelected.includes(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => toggleSelect(m.id)}
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                >
                  <div className="text-4xl text-center mb-2">{m.thumb}</div>
                  <p className="text-xs font-medium text-gray-900 text-center truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 text-center">{m.type === 'video' ? m.duration + ' | ' : ''}{m.size}</p>
                  {/* 素材数据 */}
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">消耗：</span>
                      <span className="font-medium text-orange-600">¥{m.spend.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CTR：</span>
                      <span className="font-medium text-blue-600">{m.ctr}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">CVR：</span>
                      <span className="font-medium text-green-600">{m.cvr}%</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="text-center mt-1"><i className="fas fa-check-circle text-blue-500"></i></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">已选择 {localSelected.length} 个素材（可多次选择，累计最多100个）</span>
          <div className="flex gap-3">
            <button onClick={() => { onConfirm(localSelected.map(id => [...MOCK.videoMaterials, ...MOCK.imageMaterials].find(m => m.id === id)).filter(Boolean)); setLocalSelected([]); }} className="btn-secondary text-sm">清空重选</button>
            <button onClick={handleConfirm} className="btn-primary">确认选择</button>
          </div>
        </div>
      </div>
      {/* 批量选择弹窗 */}
      {showBatchModal && (
        <div className="modal-overlay" style={{zIndex: 60}} onClick={() => setShowBatchModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold">批量选择素材</h4>
              <button onClick={() => setShowBatchModal(false)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
            </div>
            <p className="text-sm text-gray-600 mb-3">请输入素材ID或名称，每行一个或用逗号/空格分隔</p>
            <textarea
              value={batchInputText}
              onChange={e => setBatchInputText(e.target.value)}
              placeholder="例如：&#10;vm_001&#10;vm_002&#10;素材A"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="6"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowBatchModal(false)} className="btn-secondary">取消</button>
              <button onClick={handleBatchModalInput} className="btn-primary">确认添加</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 文案库弹窗（支持批量选择 + 添加文案，无CTR）
function CopyModal({ show, onClose, onConfirm, selectedCopies }) {
  const [localSelected, setLocalSelected] = useState(selectedCopies.map(c => c.id));
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCopyContent, setNewCopyContent] = useState('');
  const [copies, setCopies] = useState(MOCK.copyLibrary);

  useEffect(() => {
    if (show) {
      setLocalSelected(selectedCopies.map(c => c.id));
      setShowAddForm(false);
      setNewCopyContent('');
    }
  }, [show, selectedCopies]);

  const toggleSelect = (id) => {
    if (localSelected.includes(id)) {
      setLocalSelected(localSelected.filter(s => s !== id));
    } else {
      setLocalSelected([...localSelected, id]);
    }
  };

  const handleAddCopy = () => {
    if (!newCopyContent.trim()) return;
    const newCopy = {
      id: `c_${Date.now()}`,
      content: newCopyContent.trim(),
      ctr: 0
    };
    setCopies([newCopy, ...copies]);
    setLocalSelected([...localSelected, newCopy.id]);
    setNewCopyContent('');
    setShowAddForm(false);
  };

  const handleBatchInput = () => {
    const input = prompt('请输入文案内容，每行一条：');
    if (!input) return;
    const lines = input.split('\n').map(s => s.trim()).filter(Boolean);
    const newCopies = lines.map((content, i) => ({
      id: `c_batch_${Date.now()}_${i}`,
      content,
      ctr: 0
    }));
    setCopies([...newCopies, ...copies]);
    setLocalSelected([...localSelected, ...newCopies.map(c => c.id)]);
  };

  const handleConfirm = () => {
    const result = localSelected.map(id => copies.find(c => c.id === id)).filter(Boolean);
    onConfirm(result);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">选择广告文案（已选 {localSelected.length} 条，支持多选）</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
        </div>
        <div className="px-4 py-2 border-b bg-gray-50 flex gap-3">
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn-secondary text-sm">
            <i className="fas fa-plus mr-1"></i>{showAddForm ? '收起' : '添加文案'}
          </button>
          <button onClick={handleBatchInput} className="btn-secondary text-sm">
            <i className="fas fa-list mr-1"></i>批量添加
          </button>
        </div>
        {showAddForm && (
          <div className="px-4 py-3 border-b bg-blue-50">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">文案内容</label>
                <input
                  type="text"
                  value={newCopyContent}
                  onChange={e => setNewCopyContent(e.target.value)}
                  placeholder="输入文案内容"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button onClick={handleAddCopy} className="btn-primary text-sm">添加</button>
            </div>
          </div>
        )}
        <div className="overflow-y-auto flex-1 p-4" style={{maxHeight: '55vh'}}>
          <div className="space-y-2">
            {[...copies].map(copy => {
              const isSelected = localSelected.includes(copy.id);
              return (
                <div
                  key={copy.id}
                  onClick={() => toggleSelect(copy.id)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{copy.content}</span>
                  </div>
                  {isSelected && <div className="text-right mt-1"><i className="fas fa-check-circle text-blue-500"></i></div>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">已选择 {localSelected.length} 条文案</span>
          <button onClick={handleConfirm} className="btn-primary">确认选择</button>
        </div>
      </div>
    </div>
  );
}

// 周历时间网格组件
// 最小单位：1小时（视觉上每1小时分2个0.5h格子，共48列/天）
function TimeGrid({ value, onChange }) {
  const DAYS = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
  const HOURS = Array.from({length: 24}, (_, i) => i); // 0~23 整点
  const TOTAL_SLOTS = 48; // 48个0.5h格子（每天）
  const SLOTS_PER_HOUR = 2; // 每1小时=2个格子
  
  // value format: { "0-0": true/false, ... } where key is "dayIndex-slotIndex", slotIndex=0..47
  const [slots, setSlots] = useState(value || {});
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectStart, setSelectStart] = useState(null);
  
  useEffect(() => { if (value) setSlots(value); }, [value]);
  
  // 单击切换单个0.5h格子
  const handleCellClick = (dayIdx, slotIdx) => {
    const key = `${dayIdx}-${slotIdx}`;
    const newSlots = { ...slots };
    newSlots[key] = !newSlots[key];
    setSlots(newSlots);
    onChange(newSlots);
  };

  // 鼠标按下（开始拖选，切换单个0.5h格子）
  const handleMouseDown = (dayIdx, slotIdx) => {
    setIsSelecting(true);
    setSelectStart({ dayIdx, slotIdx });
    const key = `${dayIdx}-${slotIdx}`;
    const newSlots = { ...slots };
    newSlots[key] = !newSlots[key];
    setSlots(newSlots);
    onChange(newSlots);
  };
  
  const handleMouseEnter = (dayIdx, slotIdx) => {
    if (!isSelecting || !selectStart) return;
    const newSlots = { ...slots };
    const startDay = Math.min(selectStart.dayIdx, dayIdx);
    const endDay = Math.max(selectStart.dayIdx, dayIdx);
    const startSlot = Math.min(selectStart.slotIdx, slotIdx);
    const endSlot = Math.max(selectStart.slotIdx, slotIdx);
    const startKey = `${selectStart.dayIdx}-${selectStart.slotIdx}`;
    const shouldSet = !!slots[startKey];
    
    for (let d = startDay; d <= endDay; d++) {
      for (let s = startSlot; s <= endSlot; s++) {
        newSlots[`${d}-${s}`] = shouldSet;
      }
    }
    setSlots(newSlots);
    onChange(newSlots);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectStart(null);
  };

  useEffect(() => {
    if (isSelecting) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isSelecting]);

  const clearAll = () => {
    setSlots({});
    onChange({});
  };

  // 将slot索引转为时间字符串 "HH:MM"
  const slotToTime = (slotIdx) => {
    const h = Math.floor(slotIdx / SLOTS_PER_HOUR);
    const m = (slotIdx % SLOTS_PER_HOUR) * 30;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  };

  // 生成选中时间段描述文字（按0.5h合并，显示每个格子的起止时间）
  const buildSelectedText = () => {
    const parts = [];
    for (let di = 0; di < 7; di++) {
      let dayRanges = [];
      let rangeStart = null;
      for (let si = 0; si <= TOTAL_SLOTS; si++) {
        const key = `${di}-${si}`;
        const isSelected = si < TOTAL_SLOTS ? !!slots[key] : false;
        if (isSelected) {
          if (rangeStart === null) rangeStart = si;
        } else {
          if (rangeStart !== null) {
            // 结束时间 = 该段最后一个格子的结束时间（即下一个格子的开始时间）
            const endSi = si; // si 是第一个未选中的格子
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

  const selectedText = buildSelectedText();

  // 计算tooltip文本（显示鼠标所在格子的完整时间段）
  const getTooltip = (dayIdx, slotIdx) => {
    // 找到包含当前格子的连续选中区间
    let rangeStart = slotIdx, rangeEnd = slotIdx;
    while (rangeStart > 0 && slots[`${dayIdx}-${rangeStart-1}`]) rangeStart--;
    while (rangeEnd < TOTAL_SLOTS-1 && slots[`${dayIdx}-${rangeEnd+1}`]) rangeEnd++;
    // 只在这个格子被选中时才显示 tooltip
    if (!slots[`${dayIdx}-${slotIdx}`]) return '';
    return `${DAYS[dayIdx]} ${slotToTime(rangeStart)}-${slotToTime(rangeEnd + 1)}`;
  };

  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:'8px', overflow:'hidden'}}>
      <table cellSpacing={0} cellPadding={0} style={{width:'100%', borderCollapse:'collapse', fontSize:'13px', tableLayout:'fixed'}}>
        <thead>
          <tr style={{background:'#fafafa'}}>
            <th rowSpan={2} style={{width:'60px', borderRight:'1px solid #e5e7eb', borderBottom:'1px solid #e5e7eb', padding:'8px 4px', textAlign:'center', fontSize:'12px', color:'#666', fontWeight:400}}>星期\时间</th>
            <th colSpan={24} style={{textAlign:'center', fontSize:'12px', color:'#666', padding:'6px 2px', borderBottom:'1px solid #e5e7eb', width:'50%'}}>00:00 - 12:00</th>
            <th colSpan={24} style={{textAlign:'center', fontSize:'12px', color:'#666', padding:'6px 2px', borderBottom:'1px solid #e5e7eb', borderLeft:'1px solid #e5e7eb', width:'50%'}}>12:00 - 24:00</th>
          </tr>
          <tr style={{background:'#fafafa'}}>
            {HOURS.map(h => (
              <th key={h} colSpan={2} style={{
                textAlign:'center', fontSize:'11px', color:'#999',
                fontWeight:400, padding:'2px 0',
                borderBottom: '1px solid #e5e7eb',
                borderRight: (h === 11 || h === 23) ? '1px solid #e5e7eb' : '1px solid #f0f0f0'
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, di) => (
            <tr key={di}>
              <td style={{
                borderRight:'1px solid #e5e7eb', borderBottom: di === 6 ? 'none' : '1px solid #e5e7eb',
                padding:'6px 4px', textAlign:'center', fontSize:'13px', color:'#333',
                fontWeight:500, background:'#fafafa', whiteSpace:'nowrap'
              }}>{day}</td>
              {Array.from({length: TOTAL_SLOTS}, (_, si) => {
                const key = `${di}-${si}`;
                const isSelected = !!slots[key];
                const isHourBoundary = (si % SLOTS_PER_HOUR === 0); // 整点边界
                const isNoonBoundary = (si === 24); // 正午分隔
                return (
                  <td key={si}
                    onMouseDown={() => handleMouseDown(di, si)}
                    onMouseEnter={() => handleMouseEnter(di, si)}
                    title={isSelected ? getTooltip(di, si) : `${day} ${slotToTime(si)}`}
                    style={{
                      cursor: 'pointer',
                      borderBottom: di === 6 ? 'none' : '1px solid #f5f5f5',
                      borderRight: isNoonBoundary ? '2px solid #e5e7eb' : (isHourBoundary ? '1px solid #e5e7eb' : '1px solid #f0f0f0'),
                      padding: 0,
                      userSelect: 'none',
                      width: '2.0833%'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '26px',
                      margin: '1px 0',
                      borderRadius: '2px',
                      backgroundColor: isSelected ? '#3b82f6' : '#f9fafb'
                    }}
                    onMouseEnter={(e) => { if(!isSelected) e.target.style.backgroundColor='#dbeafe'; }}
                    onMouseLeave={(e) => { if(!isSelected) e.target.style.backgroundColor='#f9fafb'; }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/* 底部：已选时间段文字 + 操作 */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', background:'#fafafa', borderTop:'1px solid #e5e7eb'}}>
        <div style={{display:'flex', alignItems:'center', gap:'16px', fontSize:'12px', color:'#666'}}>
          <span style={{display:'flex', alignItems:'center', gap:'4px'}}><span style={{display:'inline-block', width:'14px', height:'14px', borderRadius:'2px', background:'#3b82f6'}}></span>已选</span>
          <span style={{display:'flex', alignItems:'center', gap:'4px'}}><span style={{display:'inline-block', width:'14px', height:'14px', borderRadius:'2px', background:'#f9fafb', border:'1px solid #e5e7eb'}}></span>未选</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          {selectedText ? (
            <span style={{fontSize:'12px', color:'#333', maxWidth:'480px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}
              title={selectedText}>{selectedText}</span>
          ) : (
            <span style={{fontSize:'12px', color:'#999'}}>未选择任何时段</span>
          )}
          <button onClick={clearAll} style={{fontSize:'12px', color:'#3b82f6', cursor:'pointer', background:'none', border:'none', padding:'0'}}>清空</button>
        </div>
      </div>
    </div>
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
  const [channel, setChannel] = useState('gdt');
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [batchInputText, setBatchInputText] = useState('');
  const [showBatchInput, setShowBatchInput] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // ===== 营销单元配置 =====
  // 业务单元
  const [businessUnit, setBusinessUnit] = useState('baiju');
  // 营销目的
  const [marketingObjective, setMarketingObjective] = useState('lead');
  // 产品（根据业务单元动态变化）
  const getProductsForBusinessUnit = () => {
    return MOCK.productsByBusinessUnit[businessUnit] || [];
  };
  const [specificProduct, setSpecificProduct] = useState(() => {
    const products = MOCK.productsByBusinessUnit['baiju'] || [];
    return products.length > 0 ? products[0].id : '';
  });
  // 当业务单元变化时，重置产品选择 + 清空已选账户
  useEffect(() => {
    const products = MOCK.productsByBusinessUnit[businessUnit] || [];
    setSpecificProduct(products.length > 0 ? products[0].id : '');
    setSelectedAccountIds([]);
  }, [businessUnit]);
  const [placement, setPlacement] = useState('wechat_video');
  const [placementScene, setPlacementScene] = useState('');
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  // ===== 营销单元配置 - 定向相关 =====
  const [targetingSource, setTargetingSource] = useState('package');
  // 用户自建定向包（从 localStorage 读取，与 index.html 共用 ad_targeting_packages）
  const [userTgtPkgs, setUserTgtPkgs] = useState([]);
  const [showSaveTgtPkgModal, setShowSaveTgtPkgModal] = useState(false);
  const [saveTgtPkgName, setSaveTgtPkgName] = useState('');
  // 加载自建定向包
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ad_targeting_packages');
      if (raw) setUserTgtPkgs(JSON.parse(raw));
    } catch(e) {}
  }, []);
  // 保存自建定向包
  const doSaveAsTgtPkg = () => {
    if (!saveTgtPkgName.trim()) return;
    const now = Date.now();
    const pkg = {
      id: 'user_tp_' + now,
      name: saveTgtPkgName.trim(),
      region: geoMode === 'unlimited' ? '不限' : (geoMode === 'region' ? getProvinceNames(geoSelectedProvinces) : '地图选择'),
      age: ageSelections.includes('unlimited') ? '不限' : ageSelections.join(','),
      gender: genderSelection === 'unlimited' ? '不限' : genderSelection,
      excludeConverted: excludeConvertedMode,
      audienceMode: audienceMode,
      targetAudiences: selectedTargetAudiences,
      excludeAudiences: selectedExcludeAudiences,
      conversionBehavior: conversionBehavior,
      conversionTimeRange: conversionTimeRange,
    };
    const updated = [...userTgtPkgs, pkg];
    setUserTgtPkgs(updated);
    localStorage.setItem('ad_targeting_packages', JSON.stringify(updated));
    setSaveTgtPkgName('');
    setShowSaveTgtPkgModal(false);
    notify('定向包已保存', 'success');
  };
  // 删除自建定向包
  const deleteUserTgtPkg = (id) => {
    const updated = userTgtPkgs.filter(p => p.id !== id);
    setUserTgtPkgs(updated);
    localStorage.setItem('ad_targeting_packages', JSON.stringify(updated));
    // 同时从已选中移除
    setSelectedTargetingPackages(selectedTargetingPackages.filter(tid => tid !== id));
  };
  // 改为多选：支持定向包组合（同账户不同定向包 = 多个单元）
  const [selectedTargetingPackages, setSelectedTargetingPackages] = useState([]);
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
  const [bidAmount, setBidAmount] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [onePartyData, setOnePartyData] = useState(false); // 默认关闭，且锁定
  const [quickLaunch, setQuickLaunch] = useState(false);
  const [quickLaunchBudget, setQuickLaunchBudget] = useState('');
  const [投放日期类型, set投放日期类型] = useState('long_term'); // 'long_term' | 'custom'
  const [长期投放日期, set长期投放日期] = useState('2026-07-01');
  const [自定义开始日期, set自定义开始日期] = useState('');
  const [自定义结束日期, set自定义结束日期] = useState('');
  const [投放时段模式, set投放时段模式] = useState('multi_slot'); // 'all_day' | 'time_range' | 'multi_slot'
  const [timeRangeStart, setTimeRangeStart] = useState('');
  const [timeRangeEnd, setTimeRangeEnd] = useState('');
  const [timeGridSlots, setTimeGridSlots] = useState({});
  const [首日开始, set首日开始] = useState(false);
  const [首日开始时间值, set首日开始时间值] = useState('00:00');
  const [unitName, setUnitName] = useState('');
  const [showNameVarDropdown, setShowNameVarDropdown] = useState(false);
  const nameVariables = ['日期', '定向包名称', '版位', '创建人'];
  
  // ===== 创意配置 =====
  const [creativeMax, setCreativeMax] = useState(false);
  const [creativeEnhanceMax, setCreativeEnhanceMax] = useState(false);
  const [creativeName, setCreativeName] = useState('');
  const creativeNameVariables = ['日期', '素材名称', '素材类型'];
  const [selectedMaterials, setSelectedMaterials] = useState([]); // {id, name, type, ...}
  const [selectedCopies, setSelectedCopies] = useState([]);
  const [videoStrategy, setVideoStrategy] = useState('average');
  const [copyStrategy, setCopyStrategy] = useState('average');
  const [landingPageMacro, setLandingPageMacro] = useState('');
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  // 创意数量分配
  const [creativeComposeMode, setCreativeComposeMode] = useState('cross_join'); // 'cross_join' | 'fixed'
  const [composeRule, setComposeRule] = useState({ videos: 1, images: 1, copies: 1 });
  // 品牌形象 & 营销组件
  const [brandImageType, setBrandImageType] = useState('video_account'); // 'custom' | 'video_account'
  const [selectedBrandImage, setSelectedBrandImage] = useState(null); // {id, name, url}
  const [selectedVideoAccount, setSelectedVideoAccount] = useState(null); // {id, name}
  const [marketingComponentType, setMarketingComponentType] = useState('floating_card'); // 'floating_card' | 'action_button'

  // ===== 预览 =====
  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState(null);
  // ===== 运行配置 =====
  const [runMode, setRunMode] = useState('immediate'); // 'immediate' | 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const notify = (msg, type = 'info') => setNotification({ msg, type });

  // 账户选择
  const toggleAccount = (id) => {
    if (selectedAccountIds.includes(id)) {
      setSelectedAccountIds(selectedAccountIds.filter(a => a !== id));
    } else {
      setSelectedAccountIds([...selectedAccountIds, id]);
    }
  };

  const handleBatchInput = () => {
    const tokens = batchInputText.split(/[,，\s]+/).map(s => s.trim()).filter(Boolean);
    const matched = [];
    tokens.forEach(t => {
      const byId = MOCK.accounts.find(a => a.id === t);
      if (byId) { matched.push(byId.id); return; }
      const byName = MOCK.accounts.find(a => a.name.includes(t));
      if (byName) { matched.push(byName.id); return; }
    });
    const newIds = [...new Set([...selectedAccountIds, ...matched])];
    setSelectedAccountIds(newIds);
    setBatchInputText('');
    setShowBatchInput(false);
    notify(`已添加 ${matched.length} 个账户，共选择 ${newIds.length} 个`);
  };

  // 获取当前账户默认落地页（已拼接宏参数）
  const getDefaultLandingPage = (accountId) => {
    const acc = MOCK.accounts.find(a => a.id === accountId);
    if (!acc) return '';
    return acc.kaboshi + '?click_id={click_id}&ad_id={ad_id}';
  };

  // 生成创意组合（考虑定向包组合）
  const getCreativeCombos = () => {
    if (selectedMaterials.length === 0 || selectedCopies.length === 0) return [];
    const combos = [];
    // 每个定向包 × 每个素材 × 每个文案 = 一个创意
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

  // 计算搭建总数（新增：定向包组合 + 创意数量分配）
  const getBuildSummary = () => {
    const accountCount = selectedAccountIds.length;
    const materialCount = selectedMaterials.length;
    const copyCount = selectedCopies.length;
    const videoCount = selectedMaterials.filter(m => m.type === 'video').length;
    const imageCount = selectedMaterials.filter(m => m.type === 'image').length;

    // 单元数 = 账户数 × 定向包数
    let tpCount = 0;
    if (targetingSource === 'package') {
      tpCount = Math.max(selectedTargetingPackages.length, 1);
    } else {
      tpCount = 1;
    }
    const unitsPerAccount = tpCount;
    const totalUnits = accountCount * unitsPerAccount;

    // 每个单元的创意数（根据创意数量分配规则）
    let creativesPerUnit = 0;
    if (creativeComposeMode === 'cross_join') {
      creativesPerUnit = materialCount * copyCount;
    } else if (creativeComposeMode === 'fixed') {
      const v = composeRule.videos || 0;
      const i = composeRule.images || 0;
      const c = composeRule.copies || 1;
      const maxByVideo = v > 0 ? Math.floor(videoCount / v) : Infinity;
      const maxByImage = i > 0 ? Math.floor(imageCount / i) : Infinity;
      const maxByCopy = Math.floor(copyCount / c);
      creativesPerUnit = Math.min(maxByVideo, maxByImage, maxByCopy);
      if (creativesPerUnit < 0) creativesPerUnit = 0;
    }
    const totalCreatives = totalUnits * creativesPerUnit;

    return { accountCount, tpCount, unitsPerAccount, totalUnits, materialCount, copyCount, videoCount, imageCount, creativesPerUnit, totalCreatives };
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
    } catch(e) { console.error('恢复草稿失败', e); }
  }, []);

  // 保存草稿的函数
  const doSaveForm = () => {
    if (!currentTaskId) return;
    try {
      const data = {
        selectedAccountIds, placement, unitName,
        targetingSource, selectedTargetingPackages,
        geoMode, geoSelectedCountry, geoSelectedProvinces, geoSelectedCities,
        locationTypeResident, ageSelections, customAgeMin, customAgeMax,
        genderSelection, audienceMode, selectedTargetAudiences, selectedExcludeAudiences,
        excludeConvertedMode, conversionBehavior, conversionTimeRange,
        bidAmount, dailyBudget, onePartyData,
        投放日期类型, 长期投放日期, 自定义开始日期, 自定义结束日期,
        投放时段模式, timeRangeStart, timeRangeEnd, timeGridSlots,
        首日开始, 首日开始时间值,
        creativeEnhanceMax, selectedMaterials, selectedCopies,
        videoStrategy, copyStrategy, landingPageMacro,
        creativeComposeMode, composeRule,
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
  useEffect(() => { const t = setTimeout(doSaveForm, 500); return () => clearTimeout(t); }, [selectedAccountIds, placement, unitName, selectedMaterials, selectedCopies, selectedTargetingPackages]);

  return (
    <div className="min-h-screen bg-gray-100">
      {notification && <Notification msg={notification.msg} type={notification.type} onClose={() => setNotification(null)} />}

      {/* ===== 顶部：基础配置 ===== */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span> 腾讯广告搭建流程原型
            <span className="text-sm font-normal text-gray-400 ml-2">完整交互验证版 v2</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">业务单元 <span className="text-red-500">*</span></label>
              <select value={businessUnit} onChange={e => setBusinessUnit(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                {MOCK.businessUnits.map(bu => <option key={bu.id} value={bu.id}>{bu.name}（{bu.id}）</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择账户 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div
                  className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white min-h-[42px] flex flex-wrap gap-1 items-center"
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                >
                  {selectedAccountIds.length === 0 ? (
                    <span className="text-gray-400 text-sm">点击选择账户（支持多选）</span>
                  ) : (
                    selectedAccountIds.map(id => {
                      const acc = MOCK.accounts.find(a => a.id === id);
                      return (
                        <span key={id} className="tag">
                          {acc ? acc.name : id}
                          <button onClick={(e) => { e.stopPropagation(); toggleAccount(id); }}><i className="fas fa-times"></i></button>
                        </span>
                      );
                    })
                  )}
                  <span className="ml-auto text-gray-400"><i className="fas fa-chevron-down"></i></span>
                </div>
                {showAccountDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {MOCK.accounts.filter(acc => acc.businessUnit === businessUnit).map(acc => (
                      <div
                        key={acc.id}
                        onClick={() => toggleAccount(acc.id)}
                        className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAccountIds.includes(acc.id)}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded pointer-events-none"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{acc.name}</div>
                          <div className="text-xs text-gray-500">{acc.id} · {acc.channel}</div>
                        </div>
                        {selectedAccountIds.includes(acc.id) && (
                          <i className="fas fa-check text-blue-500"></i>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setShowBatchInput(!showBatchInput)} className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                <i className="fas fa-edit mr-1"></i>{showBatchInput ? '收起' : '批量输入账户ID'}
              </button>
              {showBatchInput && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={batchInputText}
                    onChange={e => setBatchInputText(e.target.value)}
                    placeholder="输入账户ID或名称，逗号/空格分隔"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={e => { if (e.key === 'Enter') handleBatchInput(); }}
                  />
                  <button onClick={handleBatchInput} className="btn-primary text-sm">确认</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* ===== 中间：营销单元配置 ===== */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
              营销单元配置
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* 营销目的 & 推广产品 & 产品 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">营销目的 <span className="text-red-500">*</span></label>
                <select value={marketingObjective} onChange={e => setMarketingObjective(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  {MOCK.marketingObjectives.map(mo => <option key={mo.id} value={mo.id}>{mo.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">推广产品</label>
                <input type="text" value="运营商产品" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品 <span className="text-red-500">*</span></label>
                <select value={specificProduct} onChange={e => setSpecificProduct(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  {getProductsForBusinessUnit().map(sp => <option key={sp.id} value={sp.id}>{sp.name}</option>)}
                </select>
              </div>
            </div>

            {/* 营销载体 & 转化 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">营销载体</label>
                <input type="text" value="页面跳转" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">转化</label>
                <select value={conversionGoal} onChange={e => setConversionGoal(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  {(MOCK.conversionsByBusinessUnit[businessUnit] || []).map(conv => <option key={conv.id} value={conv.id}>{conv.name}</option>)}
                </select>
              </div>
            </div>

            {/* 投放版位 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">投放版位 <span className="text-red-500">*</span></label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="placement" value="wechat_video" checked={placement === 'wechat_video'} onChange={e => { setPlacement(e.target.value); setPlacementScene(''); }} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>微信视频号</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="placement" value="wechat_mp" checked={placement === 'wechat_mp'} onChange={e => { setPlacement(e.target.value); setPlacementScene(''); }} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>微信公众号与小程序</span>
                </label>
              </div>
            </div>

            {/* 版位定投场景 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">版位定投场景</label>
              <button
                onClick={() => setShowPlacementModal(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-left w-full md:w-auto min-w-[300px]"
              >
                <span className={placementScene ? 'text-gray-900' : 'text-gray-400'}>
                  {placementScene === 'unlimited' ? '不限' : placementScene ? (placement === 'wechat_video' ? MOCK.videoSceneOptions.filter(o => placementScene.split(',').includes(o.id)).map(o => o.label).join('、') : `已选择 ${placementScene.split(',').length} 个场景`) : '点击选择版位定投场景'}
                </span>
                <i className="fas fa-chevron-down ml-2 text-gray-400 text-sm"></i>
              </button>
              <PlacementSceneModal
                placement={placement}
                show={showPlacementModal}
                onClose={() => setShowPlacementModal(false)}
                value={placementScene}
                onChange={setPlacementScene}
              />
            </div>

            {/* 自定义人群配置（网格布局：一行多个账户） */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-semibold text-gray-900">自定义人群配置</h3>
                {selectedAccountIds.length > 3 && (
                  <button
                    onClick={() => {
                      const firstAccountId = selectedAccountIds[0];
                      const firstSettings = getAccountAudience(firstAccountId);
                      const newSettings = {};
                      selectedAccountIds.forEach(id => { newSettings[id] = { ...firstSettings }; });
                      setAccountAudienceSettings(newSettings);
                      notify('已将所有账户的人群配置同步为第一个账户的配置', 'success');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50"
                  >
                    <i className="fas fa-copy mr-1"></i>批量同步
                  </button>
                )}
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
                            <span className="text-xs">不限</span>
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
              <h3 className="text-md font-semibold text-gray-900 mb-3">定向配置</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="targeting" checked={targetingSource === 'package'} onChange={() => setTargetingSource('package')} className="mr-2" />
                  定向包
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="targeting" checked={targetingSource === 'custom'} onChange={() => setTargetingSource('custom')} className="mr-2" />
                  自定义定向
                </label>
              </div>
              {targetingSource === 'package' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择定向包（可多选，不同定向包将创建不同单元）</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTargetingPackages.map(tpId => {
                      const tp = MOCK.targetingPackages.find(t => t.id === tpId);
                      return tp ? (
                        <span key={tpId} className="tag bg-blue-100 text-blue-800">
                          {tp.name}
                          <button onClick={() => setSelectedTargetingPackages(selectedTargetingPackages.filter(id => id !== tpId))}><i className="fas fa-times"></i></button>
                        </span>
                      ) : null;
                    })}
                  </div>
                  <select
                    value=""
                    onChange={e => {
                      const val = e.target.value;
                      if (val && !selectedTargetingPackages.includes(val)) {
                        setSelectedTargetingPackages([...selectedTargetingPackages, val]);
                      }
                    }}
                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">++ 添加定向包 ++</option>
                    {MOCK.targetingPackages.map(tp => (
                      <option key={tp.id} value={tp.id} disabled={selectedTargetingPackages.includes(tp.id)}>
                        {tp.name}（{tp.region}，{tp.age}岁，{tp.gender}）{selectedTargetingPackages.includes(tp.id) ? ' ✓ 已选' : ''}
                      </option>
                    ))}
                    {userTgtPkgs.length > 0 && <option disabled>── 自建定向包 ──</option>}
                    {userTgtPkgs.map(tp => (
                      <option key={tp.id} value={tp.id} disabled={selectedTargetingPackages.includes(tp.id)}>
                        {tp.name}（{tp.region}，{tp.age}岁，{tp.gender}）[自建]{selectedTargetingPackages.includes(tp.id) ? ' ✓ 已选' : ''}
                      </option>
                    ))}
                  </select>
                  {selectedTargetingPackages.length === 0 && (
                    <p className="text-xs text-orange-500 mt-1"><i className="fas fa-exclamation-circle mr-1"></i>请至少选择一个定向包</p>
                  )}
                  {channel === 'gdt' && selectedTargetingPackages.length > 0 && (
                    <p className="text-xs text-blue-500 mt-1"><i className="fas fa-info-circle mr-1"></i>广点通渠道：同一定向包内容在同一账户下仅对应一个单元</p>
                  )}
                </div>
              )}
              {targetingSource === 'custom' && (
                <div className="space-y-0">
                  {/* 保存为定向包 */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <span className="text-sm text-gray-500">自定义定向配置</span>
                    <button
                      onClick={() => { setSaveTgtPkgName(''); setShowSaveTgtPkgModal(true); }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                      <i className="fas fa-save mr-1"></i> 保存为定向包
                    </button>
                  </div>
                  
                  {/* ===== 地理位置 ===== */}
                  <div className="pb-5 border-b border-gray-200">
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm font-semibold text-gray-900">地理位置</span>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input type="radio" name="geo_mode" checked={geoMode === 'unlimited'} onChange={() => { setGeoMode('unlimited'); setGeoSelectedProvinces([]); setGeoSelectedCities({}); setActiveProvinceId(''); }} className="mr-1.5" />
                        <span className="text-sm text-gray-700">不限</span>
                      </label>
                      <label className="flex items-center cursor-pointer ml-4">
                        <input type="radio" name="geo_mode" checked={geoMode === 'region'} onChange={() => { setGeoMode('region'); selectAllProvinceAndCities(); }} className="mr-1.5" />
                        <span className="text-sm text-gray-700">按区域</span>
                      </label>
                    </div>

                    {geoMode === 'region' && (
                      <>
                        {/* 按区域选择器：省份+城市双栏 */}
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 mb-3">
                          <div className="flex items-center gap-2 mb-3">
                            <i className="fas fa-map-marker-alt text-blue-500"></i>
                            <span className="text-sm font-medium text-gray-800">按区域</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {/* 省份列 */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                              <div className="px-3 py-2 bg-gray-50 border-b text-sm font-medium text-gray-700">省份（点击查看城市）</div>
                              <div className="max-h-52 overflow-y-auto p-1">
                                {(MOCK.regionCascade.provinces['cn'] || []).map(p => (
                                  <div key={p.id}
                                    
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 rounded flex items-center ${activeProvinceId === p.id ? 'bg-blue-200 text-blue-800 font-semibold' : ''} ${geoSelectedProvinces.includes(p.id) ? 'text-blue-700' : 'text-gray-700'}`}
                                  >
                                    <input type="checkbox" checked={geoSelectedProvinces.includes(p.id)} onChange={() => {
                                      const pid = p.id;
                                      if (geoSelectedProvinces.includes(pid)) {
                                        // 取消该省：去掉省份 + 清空该省城市
                                        setGeoSelectedProvinces(geoSelectedProvinces.filter(x => x !== pid));
                                        const newCities = { ...geoSelectedCities };
                                        delete newCities[pid];
                                        setGeoSelectedCities(newCities);
                                      } else {
                                        // 选中该省：添加省份 + 全选该省城市
                                        setGeoSelectedProvinces([...geoSelectedProvinces, pid]);
                                        setGeoSelectedCities({ ...geoSelectedCities, [pid]: [...(MOCK.regionCascade.cities[pid] || [])] });
                                      }
                                    }} className="mr-2 w-3.5 h-3.5 cursor-pointer" />
                                    <span className="truncate" onClick={() => setActiveProvinceId(p.id)}>{p.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* 城市列 */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                              <div className="px-3 py-2 bg-gray-50 border-b text-sm font-medium text-gray-700">
                                城市 {activeProvinceId ? `· ${MOCK.regionCascade.provinces['cn'].find(p => p.id === activeProvinceId)?.name || ''}` : '（请点击左侧省份）'}
                              </div>
                              <div className="max-h-52 overflow-y-auto p-1">
                                {activeProvinceId && ((MOCK.regionCascade.cities[activeProvinceId] || []).map(city => {
                                  const selected = (geoSelectedCities[activeProvinceId] || []).includes(city);
                                  return (
                                    <div key={city} onClick={() => {
                                      const prev = geoSelectedCities[activeProvinceId] || [];
                                      if (selected) {
                                        setGeoSelectedCities({...geoSelectedCities, [activeProvinceId]: prev.filter(c => c !== city)});
                                      } else {
                                        setGeoSelectedCities({...geoSelectedCities, [activeProvinceId]: [...prev, city]});
                                      }
                                    }} className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-50 rounded flex items-center ${selected ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}>
                                      <input type="checkbox" checked={selected} onChange={() => {
                                        const prev = geoSelectedCities[activeProvinceId] || [];
                                        if (selected) {
                                          setGeoSelectedCities({...geoSelectedCities, [activeProvinceId]: prev.filter(c => c !== city)});
                                        } else {
                                          setGeoSelectedCities({...geoSelectedCities, [activeProvinceId]: [...prev, city]});
                                        }
                                        // 同步更新省份选中状态
                                        const newCityList = selected ? prev.filter(c => c !== city) : [...prev, city];
                                        const allCities = (MOCK.regionCascade.cities[activeProvinceId] || []);
                                        if (newCityList.length === allCities.length) {
                                          // 全选了该省所有城市 → 确保省份被选中
                                          if (!geoSelectedProvinces.includes(activeProvinceId)) {
                                            setGeoSelectedProvinces([...geoSelectedProvinces, activeProvinceId]);
                                          }
                                        } else {
                                          // 没有全选 → 如果城市列表为空则取消省份选中
                                          if (newCityList.length === 0) {
                                            setGeoSelectedProvinces(geoSelectedProvinces.filter(x => x !== activeProvinceId));
                                            const newCities = {...geoSelectedCities};
                                            delete newCities[activeProvinceId];
                                            setGeoSelectedCities(newCities);
                                          }
                                        }
                                      }} className="mr-2 w-3.5 h-3.5 cursor-pointer" />
                                      <span>{city}</span>
                                    </div>
                                  );
                                }))}
                                {!activeProvinceId && (
                                  <div className="px-3 py-4 text-sm text-gray-400 text-center">请点击左侧省份查看城市</div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* 省份全选/取消快捷操作 */}
                          <div className="flex gap-2 mt-3">
                            <button onClick={() => {
                              const allPids = (MOCK.regionCascade.provinces['cn'] || []).map(p => p.id);
                              const allCities = {};
                              allPids.forEach(pid => { allCities[pid] = [...(MOCK.regionCascade.cities[pid] || [])]; });
                              setGeoSelectedProvinces(allPids);
                              setGeoSelectedCities(allCities);
                            }} className="text-xs text-blue-600 hover:text-blue-800">全选全部</button>
                            <button onClick={() => { setGeoSelectedProvinces([]); setGeoSelectedCities({}); }} className="text-xs text-gray-500 hover:text-gray-700">清空全部</button>
                          </div>
                        </div>
                      </>
                    )}

                    {geoMode === 'unlimited' && (
                      <p className="text-sm text-gray-400 py-2 px-3 bg-gray-50 rounded-lg inline-block">已选择"不限"，将投放到所有地域</p>
                    )}



                    {/* 地点类型 */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 whitespace-nowrap" style={{lineHeight:'2rem'}}>地点类型</span>
                      <label className="flex items-center cursor-pointer h-8">
                        <input type="radio" name="location_type" checked={true} readOnly className="mr-1.5 w-3.5 h-3.5" />
                        <span className="text-sm text-gray-700">常住地</span>
                      </label>
                    </div>
                  </div>

                  {/* ===== 年龄 ===== */}
                  <div className="py-4 border-b border-gray-200">
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm font-semibold text-gray-900">年龄</span>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 ml-2">
                        {[
                          {key:'unlimited', label:'不限'},
                          {key:'14-18', label:'14-18岁'},
                          {key:'19-24', label:'19-24岁'},
                          {key:'25-29', label:'25-29岁'},
                          {key:'30-39', label:'30-39岁'},
                          {key:'40-49', label:'40-49岁'},
                          {key:'50+', label:'50岁及以上'}
                        ].map(opt => (
                          <label key={opt.key} className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={ageSelections.includes(opt.key)}
                              onChange={e => {
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
                                    let next = ageSelections.filter(k => k !== 'unlimited');
                                    if (!next.includes(opt.key)) next.push(opt.key);
                                    setAgeSelections(next);
                                  } else {
                                    // 取消年龄段
                                    let next = ageSelections.filter(k => k !== opt.key && k !== 'unlimited');
                                    setAgeSelections(next.length > 0 ? next : ['unlimited']);
                                  }
                                }
                              }}
                              disabled={false}
                              className="mr-1.5"
                            />
                            <span className={`text-sm ${ageSelections.includes(opt.key) ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ===== 性别 ===== */}
                  <div className="py-4 border-b border-gray-200">
                    <div className="flex items-center gap-1 mb-0">
                      <span className="text-sm font-semibold text-gray-900">性别</span>
                      <div className="flex items-center gap-6 ml-4">
                        {[
                          {value:'unlimited', label:'不限'},
                          {value:'male', label:'男'},
                          {value:'female', label:'女'}
                        ].map(opt => (
                          <label key={opt.value} className="flex items-center cursor-pointer">
                            <input type="radio" name="gender_sel" value={opt.value} checked={genderSelection === opt.value} onChange={e => setGenderSelection(e.target.value)} className="mr-1.5" />
                            <span className={`text-sm ${genderSelection === opt.value ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ===== 排除已转化用户 ===== */}
                  <div className="py-4 border-b border-gray-200">
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm font-semibold text-gray-900">排除已转化用户</span>
                      <i className="fas fa-info-circle text-gray-300 ml-1 text-xs cursor-help" title="排除已经完成转化的用户，避免重复触达"></i>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 ml-4">
                        {[
                          {v:'unlimited', l:'不限'},
                          {v:'same_account', l:'同账户营销单元'},
                          {v:'same_principal', l:'同主体系营销单元'},
                          {v:'same_business', l:'同业务单元营销单元'},
                          {v:'same_group', l:'同集团'}
                        ].map(opt => (
                          <label key={opt.v} className="flex items-center cursor-pointer">
                            <input type="radio" name="exclude_conv" value={opt.v} checked={excludeConvertedMode === opt.v} onChange={e => setExcludeConvertedMode(e.target.value)} className="mr-1.5" />
                            <span className={`text-sm ${excludeConvertedMode === opt.v ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{opt.l}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ===== 转化行为 & 时间区间 ===== */}
                  {excludeConvertedMode !== 'unlimited' && (
                  <div className="py-4 animate-fadeIn">
                    {/* 转化行为 */}
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-sm font-semibold text-gray-900">转化行为</span>
                      <div className="flex items-center gap-6 ml-4">
                        <label className="flex items-center cursor-pointer">
                          <input type="radio" name="conv_behavior" value="optimize" checked={conversionBehavior === 'optimize'} onChange={e => setConversionBehavior(e.target.value)} className="mr-1.5" />
                          <span className="text-sm">优化目标</span>
                        </label>
                      </div>
                    </div>

                    {/* 转化时间区间 */}
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-sm font-semibold text-gray-900">转化时间区间</span>
                      <div className="flex items-center gap-6 ml-4">
                        {[
                          {v:'today', l:'当日'},
                          {v:'7day', l:'7天'},
                          {v:'1month', l:'1个月'},
                          {v:'3month', l:'3个月'},
                          {v:'6month', l:'6个月'}
                        ].map(opt => (
                          <label key={opt.v} className="flex items-center cursor-pointer">
                            <input type="radio" name="conv_time" value={opt.v} checked={conversionTimeRange === opt.v} onChange={e => setConversionTimeRange(e.target.value)} className="mr-1.5" />
                            <span className={`text-sm ${conversionTimeRange === opt.v ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>{opt.l}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              )}
            </div>

            {/* 出价与预算 */}
            <div className="border-t pt-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">出价与预算</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">计费方式</label>
                  <input type="text" value="oCPM" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">出价场景</label>
                  <input type="text" value="常规投放" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">出价（元）<span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={e => setBidAmount(e.target.value)}
                    placeholder="输入出价金额"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日预算（元）</label>
                  <input
                    type="number"
                    value={dailyBudget}
                    onChange={e => setDailyBudget(e.target.value)}
                    placeholder="输入日预算，0=不限"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* 一方数据 & 一键起量 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">一方数据跑量加强</label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-green-600">关闭</span>
                    <button
                      disabled
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-not-allowed opacity-60"
                    >
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                    <span className="text-sm font-medium text-gray-400">开启</span>
                    <span className="text-xs text-gray-400 ml-2"><i className="fas fa-lock mr-1"></i>已锁定为关闭</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">一键起量</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-medium ${!quickLaunch ? 'text-gray-400' : 'text-green-600'}`}>关闭</span>
                      <button
                        onClick={() => setQuickLaunch(!quickLaunch)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${quickLaunch ? 'bg-blue-500' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${quickLaunch ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                      <span className={`text-sm font-medium ${quickLaunch ? 'text-green-600' : 'text-gray-400'}`}>开启</span>
                    </div>
                    {quickLaunch && (
                      <input
                        type="number"
                        value={quickLaunchBudget}
                        onChange={e => setQuickLaunchBudget(e.target.value)}
                        placeholder="输入一键起量预算（必填）"
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 投放设置 */}
            <div className="border-t pt-4">
              <h3 className="text-md font-semibold text-gray-900 mb-4">投放设置</h3>
              
              {/* 投放日期 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">投放日期</label>
                <div className="flex gap-6 mb-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="date_type" checked={投放日期类型 === 'custom'} onChange={() => set投放日期类型('custom')} className="mr-2" />
                    指定开始及结束日期
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="date_type" checked={投放日期类型 === 'long_term'} onChange={() => set投放日期类型('long_term')} className="mr-2" />
                    长期投放
                  </label>
                </div>
                {投放日期类型 === 'long_term' ? (
                  <div className="relative w-full max-w-xs">
                    <input type="date" value={长期投放日期} onChange={e => set长期投放日期(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <div>
                      <input type="date" value={自定义开始日期} onChange={e => set自定义开始日期(e.target.value)} placeholder="开始日期" className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <input type="date" value={自定义结束日期} onChange={e => set自定义结束日期(e.target.value)} placeholder="结束日期" className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* 投放时段 - 周历网格样式 */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">投放时段</label>
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-sm text-gray-600 mr-2">选择时段</span>
                  <label className="flex items-center cursor-pointer mr-5">
                    <input type="radio" name="time_mode" checked={投放时段模式 === 'all_day'} onChange={() => set投放时段模式('all_day')} className="mr-1.5" />
                    <span className="text-sm">全天</span>
                  </label>
                  <label className="flex items-center cursor-pointer mr-5">
                    <input type="radio" name="time_mode" checked={投放时段模式 === 'time_range'} onChange={() => set投放时段模式('time_range')} className="mr-1.5" />
                    <span className="text-sm">指定开始时间和结束时间</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="time_mode" checked={投放时段模式 === 'multi_slot'} onChange={() => set投放时段模式('multi_slot')} className="mr-1.5" />
                    <span className="text-sm">指定多个时段</span>
                  </label>
                </div>
                
                {/* 时间范围模式：显示起止时间输入 */}
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

                {/* 多时段模式：显示周历网格 */}
                {投放时段模式 === 'multi_slot' && (
                  <TimeGrid value={timeGridSlots} onChange={setTimeGridSlots} />
                )}

                {投放时段模式 === 'all_day' && (
                  <p className="text-sm text-gray-400 py-2 px-4 bg-gray-50 rounded-lg inline-block">已选择"全天"，将在所有时间段投放</p>
                )}
              </div>

              {/* 首日开始时间 */}
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <label className="text-sm font-medium text-gray-700">首日开始时间</label>
                  <button
                    onClick={() => set首日开始(!首日开始)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${首日开始 ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${首日开始 ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm text-gray-500">{首日开始 ? '已开启' : '未开启'}</span>
                </div>
                {/* 开启后显示时间选择 */}
                {首日开始 && (
                  <div className="ml-1 flex items-center gap-3 animate-fadeIn">
                    <label className="text-xs text-gray-500">选择开始时间</label>
                    <input
                      type="time"
                      value={首日开始时间值}
                      onChange={e => set首日开始时间值(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <span className="text-xs text-gray-400">广告将在投放首日该时间开始投放</span>
                  </div>
                )}
              </div>

              {/* 营销单元名称 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">营销单元名称 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2 max-w-md">
                  <input
                    type="text"
                    value={unitName}
                    onChange={e => setUnitName(e.target.value)}
                    placeholder="输入营销单元名称"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {nameVariables.map(v => (
                      <span key={v} onClick={() => setUnitName(unitName + '{' + v + '}')} className="text-blue-500 hover:text-blue-700 cursor-pointer">+{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 底部：创意配置 ===== */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 border-b">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
              创意配置
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* 创意增强Max - 已禁用，锁定为关闭 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">创意增强Max</label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-green-600">关闭</span>
                <button
                  disabled
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 cursor-not-allowed opacity-60"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
                <span className="text-sm font-medium text-gray-400">开启</span>
                <span className="text-xs text-gray-400 ml-2"><i className="fas fa-lock mr-1"></i>已锁定为关闭</span>
              </div>
            </div>

            {/* 创意名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">创意名称</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={creativeName}
                  onChange={e => setCreativeName(e.target.value)}
                  placeholder="输入创意名称（支持变量）"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  {creativeNameVariables.map(v => (
                    <span key={v} onClick={() => setCreativeName(creativeName + '{' + v + '}')} className="text-blue-500 hover:text-blue-700 cursor-pointer">+{v}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 素材选择（视频+图片） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">创意素材 <span className="text-red-500">*</span>（已选 {selectedMaterials.length}/100 个，可多次选择）</label>
              <button onClick={() => { setShowMaterialModal(true); }} className="btn-secondary">
                <i className="fas fa-photo-video mr-2"></i>选择素材（视频/图片）
              </button>
              {selectedMaterials.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium mb-2">已选素材：</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterials.map(m => (
                      <span key={m.id} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-blue-200 rounded text-xs">
                        {m.type === 'video' ? '🎬' : '🖼️'} {m.name}
                        <button onClick={() => setSelectedMaterials(selectedMaterials.filter(sm => sm.id !== m.id))} className="text-red-500 hover:text-red-700 ml-1"><i className="fas fa-times"></i></button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 广告文案 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">广告文案 <span className="text-red-500">*</span>（已选 {selectedCopies.length} 条，支持多选和批量添加）</label>
              <button onClick={() => setShowCopyModal(true)} className="btn-secondary">
                <i className="fas fa-font mr-2"></i>选择广告文案
              </button>
              {selectedCopies.length > 0 && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900 font-medium mb-2">已选文案：</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCopies.map(c => (
                      <span key={c.id} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-green-200 rounded text-xs">
                        📝 {c.content}
                        <button onClick={() => setSelectedCopies(selectedCopies.filter(sc => sc.id !== c.id))} className="text-red-500 hover:text-red-700 ml-1"><i className="fas fa-times"></i></button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 创意组合预览 */}
            {selectedMaterials.length > 0 && selectedCopies.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-blue-900 mb-2">创意组合预览</h4>
                {creativeComposeMode === 'cross_join' ? (
                  <p className="text-sm text-blue-700">
                    交叉组合：<span className="font-bold">{selectedMaterials.length}素材 × {selectedCopies.length}文案 = {selectedMaterials.length * selectedCopies.length}</span> 个创意/单元
                  </p>
                ) : (
                  <p className="text-sm text-blue-700">
                    固定分配：每创意 {composeRule.videos}视频 + {composeRule.images}图片 + {composeRule.copies}文案，
                    预计可生成 <span className="font-bold">{(() => {
                      const videoCount = selectedMaterials.filter(m => m.type === 'video').length;
                      const imageCount = selectedMaterials.filter(m => m.type === 'image').length;
                      const copyCount = selectedCopies.length;
                      const maxByVideo = composeRule.videos > 0 ? Math.floor(videoCount / composeRule.videos) : Infinity;
                      const maxByImage = composeRule.images > 0 ? Math.floor(imageCount / composeRule.images) : Infinity;
                      const maxByCopy = Math.floor(copyCount / composeRule.copies);
                      return Math.min(maxByVideo, maxByImage, maxByCopy);
                    })()}</span> 个创意/单元
                  </p>
                )}
              </div>
            )}

            {/* 创意数量分配 */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3"><i className="fas fa-layer-group mr-2 text-blue-500"></i>创意数量分配</h4>
              <p className="text-xs text-gray-500 mb-3">定义每个创意由多少个素材和文案组成</p>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="compose_mode" value="cross_join" checked={creativeComposeMode === 'cross_join'} onChange={e => setCreativeComposeMode(e.target.value)} className="mr-2" />
                  <span className="text-sm">交叉组合（当前：{selectedMaterials.length}素材 × {selectedCopies.length}文案 = {selectedMaterials.length * selectedCopies.length}创意）</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="compose_mode" value="fixed" checked={creativeComposeMode === 'fixed'} onChange={e => setCreativeComposeMode(e.target.value)} className="mr-2" />
                  <span className="text-sm">固定数量分配</span>
                </label>
                {creativeComposeMode === 'fixed' && (
                  <div className="ml-6 bg-gray-50 border border-gray-200 rounded-xl p-4 animate-fadeIn">
                    <p className="text-xs text-gray-500 mb-3">设置每个创意包含的素材和文案数量：</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">视频数/创意</label>
                        <input type="number" min="0" max="10" value={composeRule.videos} onChange={e => setComposeRule({...composeRule, videos: Math.max(0, parseInt(e.target.value)||0)})} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">图片数/创意</label>
                        <input type="number" min="0" max="10" value={composeRule.images} onChange={e => setComposeRule({...composeRule, images: Math.max(0, parseInt(e.target.value)||0)})} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">文案数/创意</label>
                        <input type="number" min="1" max="10" value={composeRule.copies} onChange={e => setComposeRule({...composeRule, copies: Math.max(1, parseInt(e.target.value)||1)})} className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    {/* 实时计算 */}
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">预估可生成创意数：</p>
                      {(() => {
                        const videoCount = selectedMaterials.filter(m => m.type === 'video').length;
                        const imageCount = selectedMaterials.filter(m => m.type === 'image').length;
                        const copyCount = selectedCopies.length;
                        const perCreative = (composeRule.videos || 0) + (composeRule.images || 0);
                        let maxCreatives = 0;
                        if (perCreative > 0 && composeRule.copies > 0) {
                          const maxByVideo = composeRule.videos > 0 ? Math.floor(videoCount / composeRule.videos) : Infinity;
                          const maxByImage = composeRule.images > 0 ? Math.floor(imageCount / composeRule.images) : Infinity;
                          const maxByCopy = Math.floor(copyCount / composeRule.copies);
                          maxCreatives = Math.min(maxByVideo, maxByImage, maxByCopy);
                        }
                        return (
                          <p className="text-lg font-bold text-blue-600">{maxCreatives} 个创意</p>
                        );
                      })()}
                      <p className="text-xs text-gray-400 mt-1">
                        规则：每创意 {composeRule.videos}视频 + {composeRule.images}图片 + {composeRule.copies}文案
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 分配策略 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">素材分配策略</label>
                <select
                  value={videoStrategy}
                  onChange={e => setVideoStrategy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="average">平均分配</option>
                  <option value="copy">复制分配（所有账户用相同素材）</option>
                  <option value="random">随机分配</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">广告文案分配策略</label>
                <select
                  value={copyStrategy}
                  onChange={e => setCopyStrategy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="average">平均分配</option>
                  <option value="copy">复制分配（所有账户用相同文案）</option>
                  <option value="random">随机分配</option>
                </select>
              </div>
            </div>

            {/* 落地页（默认已拼接宏参数） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">落地页（卡博士链接 + 宏参数已自动拼接）</label>
              {selectedAccountIds.length > 0 ? (
                <div className="space-y-2">
                  {selectedAccountIds.map(id => {
                    const acc = MOCK.accounts.find(a => a.id === id);
                    const landingUrl = acc ? acc.kaboshi + '?click_id={click_id}&ad_id={ad_id}' : '';
                    return acc ? (
                      <div key={id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">{acc.name} 的落地页：</p>
                        <code className="text-sm text-gray-700 break-all">{landingUrl}</code>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400">请先选择账户，落地页将自动生成</p>
              )}
              <p className="text-xs text-gray-400 mt-2">✅ 宏参数已默认拼接：click_id、ad_id</p>
            </div>

            {/* 品牌形象 & 营销组件 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">品牌形象</label>
                <select value={brandImageType} onChange={e => setBrandImageType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-2">
                  <option value="custom">自定义</option>
                  <option value="video_account">视频号</option>
                </select>
                {brandImageType === 'custom' && (
                  <select
                    value={selectedBrandImage ? selectedBrandImage.id : ''}
                    onChange={e => {
                      const bi = MOCK.brandImages.find(x => x.id === e.target.value);
                      setSelectedBrandImage(bi || null);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">选择品牌形象图片</option>
                    {MOCK.brandImages.map(bi => (
                      <option key={bi.id} value={bi.id}>{bi.name}</option>
                    ))}
                  </select>
                )}
                {brandImageType === 'video_account' && (
                  <select
                    value={selectedVideoAccount ? selectedVideoAccount.id : ''}
                    onChange={e => {
                      const va = MOCK.videoAccounts.find(x => x.id === e.target.value);
                      setSelectedVideoAccount(va || null);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">选择视频号</option>
                    {MOCK.videoAccounts.map(va => (
                      <option key={va.id} value={va.id}>{va.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">营销组件</label>
                <select value={marketingComponentType} onChange={e => setMarketingComponentType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="floating_card">浮层卡片</option>
                  <option value="action_button">行动按钮</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">所有创意共用同一个品牌形象和营销组件</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 运行配置 ===== */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-md font-bold text-gray-900 mb-4">运行配置</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">定时日期</label>
                <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">定时时间</label>
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
              if (runMode === 'scheduled' && (!scheduledDate || !scheduledTime)) {
                notify('请设置定时日期和时间', 'error');
                return;
              }
              notify(`任务已提交${runMode === 'scheduled' ? `，将在 ${scheduledDate} ${scheduledTime} 运行` : '，将立即运行'}`, 'success');
            }}
            className="btn-secondary text-lg px-8 py-3"
          >
            <i className="fas fa-play mr-2"></i>{runMode === 'immediate' ? '立即运行' : '定时运行'}
          </button>
        </div>

        {/* 账户配置进度 */}
        {selectedAccountIds.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="text-md font-bold text-gray-900 mb-4">账户配置进度</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedAccountIds.map(id => {
                const acc = MOCK.accounts.find(a => a.id === id);
                const hasTargeting = targetingSource === 'package' ? selectedTargetingPackages.length > 0 : (geoSelectedProvinces.length > 0 || geoMode === 'unlimited');
                const hasBid = bidAmount !== '';
                const hasMaterial = selectedMaterials.length > 0;
                const hasCopy = selectedCopies.length > 0;
                const doneCount = [hasTargeting, hasBid, hasMaterial, hasCopy].filter(Boolean).length;
                const totalCount = 4;
                const pct = Math.round((doneCount / totalCount) * 100);
                const tpCount = targetingSource === 'package' ? Math.max(selectedTargetingPackages.length, 1) : 1;
                return (
                  <div key={id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">{acc ? acc.name : id}</span>
                      <span className="text-xs text-gray-500">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{width: `${pct}%`}}></div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className={hasTargeting ? 'text-green-600' : 'text-gray-400'}>{hasTargeting ? '✓' : '○'} 定向配置 {targetingSource === 'package' && selectedTargetingPackages.length > 0 ? `(${selectedTargetingPackages.length}包)` : ''}</p>
                      <p className={hasBid ? 'text-green-600' : 'text-gray-400'}>{hasBid ? '✓' : '○'} 出价设定</p>
                      <p className={hasMaterial ? 'text-green-600' : 'text-gray-400'}>{hasMaterial ? '✓' : '○'} 创意素材({selectedMaterials.length})</p>
                      <p className={hasCopy ? 'text-green-600' : 'text-gray-400'}>{hasCopy ? '✓' : '○'} 广告文案({selectedCopies.length})</p>
                      <p className="text-blue-600 font-medium">单元数：{tpCount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ===== 素材库弹窗 ===== */}
      <MaterialModal
        show={showMaterialModal}
        onClose={() => setShowMaterialModal(false)}
        onConfirm={(materials) => {
          setSelectedMaterials(materials);
          setShowMaterialModal(false);
        }}
        selectedMaterials={selectedMaterials}
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
      />

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
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-6 text-center shadow-xl">
                <p className="text-sm opacity-80 mb-3">搭建总量预览</p>
                <div className="flex items-center justify-center gap-3 flex-wrap text-2xl font-bold">
                  <span className="bg-white/20 px-4 py-2 rounded-xl">{accountCount} 个账户</span>
                  <span class="text-3xl">×</span>
                  <span className="bg-white/20 px-4 py-2 rounded-xl">{unitsPerAccount} 个单元/账户</span>
                  <span class="text-3xl">×</span>
                  <span className="bg-white/20 px-4 py-2 rounded-xl">{copyCount} 条文案</span>
                </div>
                <div className="mt-5 pt-5 border-t border-white/30">
                  <p className="text-5xl font-extrabold tracking-tight">{totalCreatives.toLocaleString()}</p>
                  <p className="text-base opacity-80 mt-1">共搭建 {totalCreatives.toLocaleString()} 个创意</p>
                </div>
              </div>

              {/* 详细拆解 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">{accountCount}</p>
                  <p className="text-xs text-blue-700 mt-1">选择账户</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">{totalUnits}</p>
                  <p className="text-xs text-green-700 mt-1">总单元数（{accountCount}×{unitsPerAccount}）</p>
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

              {/* 定向包明细 */}
              {targetingSource === 'package' && selectedTargetingPackages.length > 0 && (
                <div className="border border-blue-200 rounded-xl overflow-hidden mb-6">
                  <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-900"><i className="fas fa-bullseye mr-2"></i>定向包明细（每包 = 1 单元/账户）</h4>
                  </div>
                  <div className="divide-y divide-blue-100">
                    {selectedTargetingPackages.map((tpId, idx) => {
                      const tp = MOCK.targetingPackages.find(t => t.id === tpId);
                      return tp ? (
                        <div key={tpId} className="px-4 py-3 flex items-center justify-between hover:bg-blue-50">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{tp.name}</p>
                              <p className="text-xs text-gray-500">{tp.region} | {tp.age}岁 | {tp.gender}</p>
                            </div>
                          </div>
                          <span className="text-xs text-blue-600 font-medium">{accountCount} 账户 × 1 单元</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* 账户明细列表 */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h4 className="text-sm font-semibold text-gray-700"><i className="fas fa-list-ul mr-2"></i>各账户搭建明细</h4>
                </div>
                <div className="divide-y divide-gray-100">
                  {selectedAccountIds.map((id, idx) => {
                    const acc = MOCK.accounts.find(a => a.id === id);
                    return (
                      <div key={id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{acc ? acc.name : id}</p>
                            <p className="text-xs text-gray-400">{acc?.kaboshi ? acc.kaboshi.substring(0, 35) + '...' : ''}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{unitsPerAccount} 单元 × {copyCount} 文案 × {materialCount} 素材 = <span className="text-blue-600">{totalCreatives / accountCount} 创意</span></p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 配置摘要 */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3"><i className="fas fa-cog mr-2"></i>关键配置摘要</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><span className="text-gray-500">业务单元：</span><span className="font-medium">{MOCK.businessUnits.find(b => b.id === businessUnit)?.name}</span></div>
                  <div><span className="text-gray-500">营销目的：</span><span className="font-medium">{MOCK.marketingObjectives.find(m => m.id === marketingObjective)?.name}</span></div>
                  <div><span className="text-gray-500">产品：</span><span className="font-medium">{getProductsForBusinessUnit().find(sp => sp.id === specificProduct)?.name}</span></div>
                  <div><span className="text-gray-500">转化：</span><span className="font-medium">{(MOCK.conversionsByBusinessUnit[businessUnit] || []).find(c => c.id === conversionGoal)?.name}</span></div>
                  <div><span className="text-gray-500">投放版位：</span><span className="font-medium">{placement === 'wechat_video' ? '微信视频号' : '微信公众号与小程序'}</span></div>
                  <div><span className="text-gray-500">出价：</span><span className="font-medium">{bidAmount ? `¥${bidAmount}` : '未设置'}</span></div>
                  <div><span className="text-gray-500">定向方式：</span><span className="font-medium">{targetingSource === 'package' ? '定向包：' + (selectedTargetingPackages.length > 0 ? `${selectedTargetingPackages.length} 个定向包` : '未选择') : '自定义定向'}</span></div>
                  <div><span className="text-gray-500">营销单元名称：</span><span className="font-medium">{unitName || '未设置'}</span></div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="btn-secondary">关闭</button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  notify(`已确认搭建 ${accountCount} 个账户 × ${totalUnits} 个单元，共 ${totalCreatives} 个创意`, 'success');
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
            {/* 保存为定向包弹窗 */}
            {showSaveTgtPkgModal && (
              <div className="modal-overlay" onClick={() => setShowSaveTgtPkgModal(false)}>
                <div className="modal-content w-full max-w-lg" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="font-semibold text-gray-900">保存为定向包</h3>
                    <button onClick={() => setShowSaveTgtPkgModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* 定向包名称 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">定向包名称 <span className="text-red-500">*</span></label>
                      <input
                        value={saveTgtPkgName}
                        onChange={e => setSaveTgtPkgName(e.target.value)}
                        placeholder="输入定向包名称"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    {/* 当前配置摘要 */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">当前配置摘要</p>
                      
                      {/* 地理位置 */}
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">地理位置：</span>
                        <span className="text-xs text-gray-900 ml-1">
                            {geoMode === 'unlimited' ? '不限' : (geoMode === 'region' ? formatCitySummary() : '地图选择')}
                        </span>
                      </div>
                      
                      {/* 年龄 */}
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">年龄：</span>
                        <span className="text-xs text-gray-900 ml-1">
                          {ageSelections.includes('unlimited') ? '不限' : ageSelections.filter(a => a !== 'unlimited').join('、')}
                        </span>
                      </div>
                      
                      {/* 性别 */}
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">性别：</span>
                        <span className="text-xs text-gray-900 ml-1">
                          {genderSelection === 'unlimited' ? '不限' : genderSelection}
                        </span>
                      </div>
                      
                      {/* 排除已转化用户 */}
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">排除已转化用户：</span>
                        <span className="text-xs text-gray-900 ml-1">
                          {excludeConvertedMode === 'unlimited' ? '不限' : excludeConvertedMode}
                        </span>
                      </div>

                      {/* 自定义人群 */}
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">自定义人群：</span>
                        <span className="text-xs text-gray-900 ml-1">
                          {audienceMode === 'unlimited' ? '不限' : '排除人群：' + selectedExcludeAudiences.join('、')}
                        </span>
                      </div>

                      {/* 转化行为 */}
                      <div className="mb-2">
                        <span className="text-xs text-gray-500">转化行为：</span>
                        <span className="text-xs text-gray-900 ml-1">
                          {conversionBehavior === 'optimize' ? '优化行为' : '指定行为：' + (window.__customConversionName || '已选择指定行为')}
                        </span>
                      </div>

                      {/* 转化时间区间 */}
                      <div>
                        <span className="text-xs text-gray-500">转化时间区间：</span>
                        <span className="text-xs text-gray-900 ml-1">
                          {conversionTimeRange === 'today' ? '今天' : (conversionTimeRange === '7day' ? '最近7天' : (conversionTimeRange === '1month' ? '最近1个月' : (conversionTimeRange === '3month' ? '最近3个月' : '最近6个月')))}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500">将保存以上配置为定向包，可在「定向包」模式下重复使用。</p>
                  </div>
                  <div className="px-6 py-4 border-t flex gap-2 justify-end">
                    <button onClick={() => { setSaveTgtPkgName(''); setShowSaveTgtPkgModal(false); }} className="btn-secondary text-sm">取消</button>
                    <button onClick={doSaveAsTgtPkg} className="btn-primary text-sm">保存</button>
                  </div>
                </div>
              </div>
            )}

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
