const { useState, useEffect, useCallback } = React;

// ========== MOCK 数据（完整版） ==========
const MOCK = {
  businessTypes: [{ id: 'qiyue', name: '权益' }],
  channels: [{ id: 'guangdiantong', name: '广点通' }],
  specificProducts: [
    { id: 'sp1', name: '39.9元权益包' },
    { id: 'sp2', name: '99元权益包' },
    { id: 'sp3', name: '199元权益包' }
  ],
  placements: [
    { id: 'wechat_video', name: '微信视频号' },
    { id: 'wechat_mini', name: '微信公众号与小程序' }
  ],
  accounts: [
    { id: 'acc1', name: '账户A-广点通', kaboshi: 'KABOSHI_AAA111' },
    { id: 'acc2', name: '账户B-广点通', kaboshi: 'KABOSHI_BBB222' },
    { id: 'acc3', name: '账户C-广点通', kaboshi: 'KABOSHI_CCC333' },
    { id: 'acc4', name: '账户D-广点通', kaboshi: 'KABOSHI_DDD444' }
  ],
  targetingPackages: [
    { id: 'tp1', name: '定向包-一线城市男性', region: '北京,上海,广州,深圳', age: '25-40', gender: '男' },
    { id: 'tp2', name: '定向包-全国女性', region: '全国', age: '18-35', gender: '女' },
    { id: 'tp3', name: '定向包-二线城市', region: '成都,杭州,武汉', age: '30-50', gender: '不限' }
  ],
  audiencePackages: [
    { id: 'ap1', name: '人群包-39.9产品用户' },
    { id: 'ap2', name: '人群包-活跃用户' },
    { id: 'ap3', name: '人群包-次留用户' }
  ],
  materials: [
    { id: 'm1', name: '视频素材A', type: 'video' },
    { id: 'm2', name: '图片素材B', type: 'image' },
    { id: 'm3', name: '视频素材C', type: 'video' },
    { id: 'm4', name: '图片素材D', type: 'image' },
    { id: 'm5', name: '视频素材E', type: 'video' }
  ],
  copies: [
    { id: 'c1', content: '限时优惠，立即抢购！' },
    { id: 'c2', content: '新品上市，惊喜价格' },
    { id: 'c3', content: '专属福利，仅此一天' },
    { id: 'c4', content: '品质保障，放心选购' }
  ],
  regionCascade: {
    '中国': {
      '北京市': ['北京市'],
      '上海市': ['上海市'],
      '广东省': ['广州市','深圳市','东莞市','佛山市'],
      '浙江省': ['杭州市','宁波市','温州市'],
      '江苏省': ['南京市','苏州市','无锡市'],
      '四川省': ['成都市','绵阳市'],
      '湖北省': ['武汉市','宜昌市'],
      '湖南省': ['长沙市','株洲市'],
      '山东省': ['济南市','青岛市'],
      '河南省': ['郑州市','洛阳市'],
      '河北省': ['石家庄市','唐山市'],
      '辽宁省': ['沈阳市','大连市'],
      '陕西省': ['西安市','咸阳市'],
      '福建省': ['福州市','厦门市'],
      '天津市': ['天津市'],
      '重庆市': ['重庆市'],
      '江西省': ['南昌市','九江市'],
      '安徽省': ['合肥市','芜湖市'],
      '吉林省': ['长春市','吉林市'],
      '黑龙江省': ['哈尔滨市','大庆市']
    }
  }
};

// ========== 通知 ==========
function notify(msg, type) {
  type = type || 'info';
  var id = Date.now();
  var el = document.createElement('div');
  el.className = 'fixed top-4 right-4 z-50 ' + (type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500') + ' text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2';
  el.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle') + '"></i><span class="text-sm">' + msg + '</span><button onclick="this.parentElement.remove()" class="ml-2 text-white/80 hover:text-white">&times;</button>';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 3000);
}

// ========== 完整的腾讯广告表单 ==========
function TencentAdForm(props) {
  var onBack = props.onBack;
  
  // ===== 状态 =====
  var [selectedAccountIds, setSelectedAccountIds] = useState([]);
  var [selectAllAccounts, setSelectAllAccounts] = useState(false);
  var [targetingSource, setTargetingSource] = useState('package');
  var [selectedTargetingPackages, setSelectedTargetingPackages] = useState([]);
  var [unitName, setUnitName] = useState('');
  var [geoMode, setGeoMode] = useState('china');
  var [geoSelectedProvinces, setGeoSelectedProvinces] = useState([]);
  var [geoSelectedCities, setGeoSelectedCities] = useState([]);
  var [audienceMode, setAudienceMode] = useState('unlimited');
  var [selectedTargetAudiences, setSelectedTargetAudiences] = useState([]);
  var [selectedExcludeAudiences, setSelectedExcludeAudiences] = useState([]);
  var [audienceList, setAudienceList] = useState(MOCK.audiencePackages);
  var [excludeConvertedMode, setExcludeConvertedMode] = useState('unlimited');
  var [bidAmount, setBidAmount] = useState('');
  var [selectedMaterials, setSelectedMaterials] = useState([]);
  var [selectedCopies, setSelectedCopies] = useState([]);
  var [composeMode, setComposeMode] = useState('cross');
  var [composeRule, setComposeRule] = useState({ videos: 1, images: 1, copies: 1 });
  var [showPreview, setShowPreview] = useState(false);
  var [showMaterialModal, setShowMaterialModal] = useState(false);
  var [showCopyModal, setShowCopyModal] = useState(false);

  var regionData = MOCK.regionCascade['中国'];
  var provinces = Object.keys(regionData);

  function getBuildSummary() {
    var accountCount = selectedAccountIds.length;
    var materialCount = selectedMaterials.length;
    var copyCount = selectedCopies.length;
    var tpCount = Math.max(selectedTargetingPackages.length, 1);
    var unitsPerAccount = tpCount;
    var totalUnits = accountCount * unitsPerAccount;
    var creativesPerUnit = composeMode === 'cross' ? materialCount * copyCount : Math.min(
      Math.floor(selectedMaterials.filter(function(m) { return m.type === 'video'; }).length / Math.max(composeRule.videos, 1)),
      Math.floor(selectedMaterials.filter(function(m) { return m.type === 'image'; }).length / Math.max(composeRule.images, 1)),
      Math.floor(copyCount / Math.max(composeRule.copies, 1))
    ) || 1;
    var totalCreatives = totalUnits * creativesPerUnit;
    return { accountCount: accountCount, tpCount: tpCount, unitsPerAccount: unitsPerAccount, totalUnits: totalUnits, materialCount: materialCount, copyCount: copyCount, creativesPerUnit: creativesPerUnit, totalCreatives: totalCreatives };
  }

  return React.createElement('div', { className: 'max-w-6xl mx-auto pb-8' },
    // 顶部
    React.createElement('div', { className: 'flex items-center justify-between mb-6' },
      React.createElement('div', { className: 'flex items-center gap-3' },
        React.createElement('button', { onClick: onBack, className: 'text-gray-400 hover:text-gray-600' }, React.createElement('i', { className: 'fas fa-arrow-left text-lg' })),
        React.createElement('div', null,
          React.createElement('h2', { className: 'text-xl font-bold text-gray-900' }, '批量创意搭建'),
          React.createElement('p', { className: 'text-sm text-gray-500 mt-1' }, '广点通 · 权益产品')
        )
      ),
      React.createElement('div', { className: 'flex gap-3' },
        React.createElement('button', { onClick: function() { setShowPreview(true); }, className: 'btn-primary' },
          React.createElement('i', { className: 'fas fa-paper-plane mr-2' }), '预览搭建'
        )
      )
    ),

    // 业务类型 + 投放渠道（写死）
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '业务类型'),
          React.createElement('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-medium' }, '权益')
        ),
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '投放渠道'),
          React.createElement('div', { className: 'px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-medium' }, '广点通')
        )
      )
    ),

    // 账户选择
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '选择账户'),
      React.createElement('div', { className: 'flex items-center justify-between mb-3' },
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'checkbox', checked: selectAllAccounts, onChange: function(e) {
            setSelectAllAccounts(e.target.checked);
            setSelectedAccountIds(e.target.checked ? MOCK.accounts.map(function(a) { return a.id; }) : []);
          }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm font-medium' }, '全选')
        ),
        React.createElement('span', { className: 'text-xs text-gray-500' }, '已选 ' + selectedAccountIds.length + ' 个账户')
      ),
      React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-4 gap-3' },
        MOCK.accounts.map(function(acc) {
          return React.createElement('label', { key: acc.id, className: 'flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50' },
            React.createElement('input', { type: 'checkbox', checked: selectedAccountIds.indexOf(acc.id) >= 0, onChange: function(e) {
              setSelectedAccountIds(e.target.checked ? selectedAccountIds.concat([acc.id]) : selectedAccountIds.filter(function(x) { return x !== acc.id; }));
            }, className: 'mr-2' }),
            React.createElement('div', null,
              React.createElement('p', { className: 'text-sm font-medium text-gray-900' }, acc.name),
              React.createElement('p', { className: 'text-xs text-gray-400' }, acc.kaboshi)
            )
          );
        })
      )
    ),

    // 定向包配置
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '定向包配置'),
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '选择定向包（可多选）'),
        React.createElement('select', {
          onChange: function(e) {
            if (e.target.value && selectedTargetingPackages.indexOf(e.target.value) < 0) {
              setSelectedTargetingPackages(selectedTargetingPackages.concat([e.target.value]));
            }
          },
          className: 'w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm'
        },
          React.createElement('option', { value: '' }, '-- 添加定向包 --'),
          MOCK.targetingPackages.filter(function(tp) { return selectedTargetingPackages.indexOf(tp.id) < 0; }).map(function(tp) {
            return React.createElement('option', { key: tp.id, value: tp.id }, tp.name);
          })
        )
      ),
      selectedTargetingPackages.length > 0 && React.createElement('div', { className: 'flex flex-wrap gap-2' },
        selectedTargetingPackages.map(function(id) {
          var tp = MOCK.targetingPackages.find(function(x) { return x.id === id; });
          return React.createElement('span', { key: id, className: 'tag' },
            tp ? tp.name : id,
            React.createElement('button', { onClick: function() { setSelectedTargetingPackages(selectedTargetingPackages.filter(function(x) { return x !== id; })); } }, '\u00d7')
          );
        })
      )
    ),

    // 自定义人群
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '自定义人群'),
      React.createElement('div', { className: 'flex items-center gap-6 mb-4' },
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'audience_mode', value: 'unlimited', checked: audienceMode === 'unlimited', onChange: function(e) { setAudienceMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '不限')
        ),
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'audience_mode', value: 'target', checked: audienceMode === 'target', onChange: function(e) { setAudienceMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '定向人群')
        ),
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'audience_mode', value: 'exclude', checked: audienceMode === 'exclude', onChange: function(e) { setAudienceMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '排除人群')
        )
      ),
      (audienceMode === 'target' || audienceMode === 'exclude') && React.createElement('div', { className: 'ml-6 bg-orange-50 border border-orange-200 rounded-xl p-4' },
        React.createElement('div', { className: 'flex items-center justify-between mb-3' },
          React.createElement('span', { className: 'text-sm font-bold text-orange-800' }, audienceMode === 'target' ? '定向人群' : '排除人群'),
          React.createElement('button', { onClick: function() {
            // 刷新人群包列表（模拟）
            notify('人群包列表已刷新', 'success');
          }, className: 'text-xs text-blue-500 hover:text-blue-700' }, React.createElement('i', { className: 'fas fa-sync-alt mr-1' }), '刷新列表')
        ),
        React.createElement('div', { className: 'space-y-2' },
          audienceList.map(function(ap) {
            var isTarget = audienceMode === 'target';
            var selected = isTarget ? selectedTargetAudiences.indexOf(ap.id) >= 0 : selectedExcludeAudiences.indexOf(ap.id) >= 0;
            return React.createElement('label', { key: ap.id, className: 'flex items-center p-2 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100' },
              React.createElement('input', { type: 'checkbox', checked: selected, onChange: function(e) {
                if (isTarget) {
                  setSelectedTargetAudiences(e.target.checked ? selectedTargetAudiences.concat([ap.id]) : selectedTargetAudiences.filter(function(x) { return x !== ap.id; }));
                } else {
                  setSelectedExcludeAudiences(e.target.checked ? selectedExcludeAudiences.concat([ap.id]) : selectedExcludeAudiences.filter(function(x) { return x !== ap.id; }));
                }
              }, className: 'mr-2' }),
              React.createElement('span', { className: 'text-sm' }, ap.name)
            );
          })
        )
      )
    ),

    // 排除已转化用户
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '排除已转化用户'),
      React.createElement('div', { className: 'flex items-center gap-6 mb-4' },
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'exclude_conv', value: 'unlimited', checked: excludeConvertedMode === 'unlimited', onChange: function(e) { setExcludeConvertedMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '不限')
        ),
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'exclude_conv', value: 'same_account', checked: excludeConvertedMode === 'same_account', onChange: function(e) { setExcludeConvertedMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '同账户营销单元')
        )
      ),
      excludeConvertedMode !== 'unlimited' && React.createElement('div', { className: 'ml-6 bg-blue-50 border border-blue-200 rounded-xl p-4' },
        React.createElement('div', { className: 'mb-3' },
          React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '转化行为'),
          React.createElement('div', { className: 'flex items-center gap-4' },
            React.createElement('label', { className: 'flex items-center cursor-pointer' },
              React.createElement('input', { type: 'radio', name: 'conv_behavior', value: 'optimize', checked: true, className: 'mr-2' }),
              React.createElement('span', { className: 'text-sm' }, '优化目标')
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '转化时间区间'),
          React.createElement('div', { className: 'flex items-center gap-4' },
            [{ v: 'today', l: '当日' }, { v: '7day', l: '7天' }, { v: '1month', l: '1个月' }, { v: '3month', l: '3个月' }, { v: '6month', l: '6个月' }].map(function(opt) {
              return React.createElement('label', { key: opt.v, className: 'flex items-center cursor-pointer' },
                React.createElement('input', { type: 'radio', name: 'conv_time', value: opt.v, checked: true, className: 'mr-2' }),
                React.createElement('span', { className: 'text-sm' }, opt.l)
              );
            })
          )
        )
      )
    ),

    // 创意素材
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '创意素材'),
      React.createElement('button', { onClick: function() { setShowMaterialModal(true); }, className: 'btn-secondary text-sm mb-3' },
        React.createElement('i', { className: 'fas fa-plus mr-2' }), '选择素材'
      ),
      selectedMaterials.length > 0 && React.createElement('div', { className: 'flex flex-wrap gap-2' },
        selectedMaterials.map(function(m) {
          return React.createElement('span', { key: m.id, className: 'tag' },
            React.createElement('i', { className: 'fas fa-' + (m.type === 'video' ? 'video' : 'image') + ' mr-1' }),
            m.name,
            React.createElement('button', { onClick: function() { setSelectedMaterials(selectedMaterials.filter(function(x) { return x.id !== m.id; })); } }, '\u00d7')
          );
        })
      )
    ),

    // 广告文案
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '广告文案'),
      React.createElement('button', { onClick: function() { setShowCopyModal(true); }, className: 'btn-secondary text-sm mb-3' },
        React.createElement('i', { className: 'fas fa-plus mr-2' }), '选择文案'
      ),
      selectedCopies.length > 0 && React.createElement('div', { className: 'flex flex-wrap gap-2' },
        selectedCopies.map(function(c) {
          return React.createElement('span', { key: c.id, className: 'tag bg-green-50 text-green-700' },
            c.content,
            React.createElement('button', { onClick: function() { setSelectedCopies(selectedCopies.filter(function(x) { return x.id !== c.id; })); } }, '\u00d7')
          );
        })
      )
    ),

    // 创意数量分配
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '创意数量分配'),
      React.createElement('div', { className: 'flex gap-6 mb-4' },
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'composeMode', value: 'cross', checked: composeMode === 'cross', onChange: function(e) { setComposeMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '交叉组合（所有素材 × 所有文案）')
        ),
        React.createElement('label', { className: 'flex items-center cursor-pointer' },
          React.createElement('input', { type: 'radio', name: 'composeMode', value: 'fixed', checked: composeMode === 'fixed', onChange: function(e) { setComposeMode(e.target.value); }, className: 'mr-2' }),
          React.createElement('span', { className: 'text-sm' }, '固定数量分配')
        )
      ),
      composeMode === 'fixed' && React.createElement('div', { className: 'bg-blue-50 border border-blue-200 rounded-lg p-4' },
        React.createElement('div', { className: 'grid grid-cols-3 gap-4' },
          ['videos', 'images', 'copies'].map(function(key) {
            return React.createElement('div', { key: key },
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' },
                key === 'videos' ? '每个创意含视频数' : key === 'images' ? '每个创意含图片数' : '每个创意含文案数'
              ),
              React.createElement('input', {
                type: 'number', min: key === 'copies' ? '1' : '0', max: '10',
                value: composeRule[key],
                onChange: function(e) {
                  var v = Math.max(key === 'copies' ? 1 : 0, parseInt(e.target.value) || (key === 'copies' ? 1 : 0));
                  setComposeRule(Object.assign({}, composeRule, (function() { var o = {}; o[key] = v; return o; })()));
                },
                className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500'
              })
            );
          })
        )
      )
    ),

    // 出价与预算
    React.createElement('div', { className: 'bg-white rounded-xl shadow-sm border p-5 mb-6' },
      React.createElement('h3', { className: 'text-md font-bold text-gray-900 mb-4' }, '出价与预算'),
      React.createElement('div', { className: 'grid grid-cols-2 gap-4 max-w-md' },
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '出价（元）'),
          React.createElement('input', { value: bidAmount, onChange: function(e) { setBidAmount(e.target.value); }, placeholder: '0.00', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500' })
        ),
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '日预算（元）'),
          React.createElement('input', { placeholder: '100', className: 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500' })
        )
      ),
      React.createElement('div', { className: 'mt-4 bg-gray-100 rounded-lg px-3 py-2 inline-block' },
        React.createElement('span', { className: 'text-xs text-gray-500' }, React.createElement('i', { className: 'fas fa-lock mr-1' }), '一方数据跑量加强：已锁定为关闭')
      )
    ),

    // 预览弹窗
    showPreview && (function() {
      var s = getBuildSummary();
      return React.createElement('div', { className: 'modal-overlay', onClick: function() { setShowPreview(false); } },
        React.createElement('div', { className: 'modal-content w-full max-w-2xl', onClick: function(e) { e.stopPropagation(); } },
          React.createElement('div', { className: 'flex items-center justify-between p-5 border-b' },
            React.createElement('h3', { className: 'text-lg font-bold' }, '搭建预览'),
            React.createElement('button', { onClick: function() { setShowPreview(false); }, className: 'text-gray-400 hover:text-gray-600 text-lg' }, '\u00d7')
          ),
          React.createElement('div', { className: 'p-6', style: { maxHeight: '70vh', overflow: 'auto' } },
            React.createElement('div', { className: 'bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center mb-6' },
              React.createElement('p', { className: 'text-sm opacity-80 mb-2' }, '搭建总量预览'),
              React.createElement('div', { className: 'flex items-center justify-center gap-2 flex-wrap text-lg font-bold' },
                React.createElement('span', { className: 'bg-white/20 px-3 py-1 rounded-lg' }, s.accountCount + ' 账户'),
                '\u00d7',
                React.createElement('span', { className: 'bg-white/20 px-3 py-1 rounded-lg' }, s.tpCount + ' 定向包'),
                '\u00d7',
                React.createElement('span', { className: 'bg-white/20 px-3 py-1 rounded-lg' }, s.creativesPerUnit + ' 创意/单元')
              ),
              React.createElement('div', { className: 'mt-4 pt-4 border-t border-white/30' },
                React.createElement('p', { className: 'text-3xl font-extrabold' }, s.totalCreatives.toLocaleString()),
                React.createElement('p', { className: 'text-sm opacity-80 mt-1' }, '共搭建创意数')
              )
            ),
            // 定向包明细
            s.tpCount > 0 && React.createElement('div', { className: 'border border-gray-200 rounded-xl overflow-hidden' },
              React.createElement('div', { className: 'bg-gray-50 px-4 py-3 border-b' },
                React.createElement('h4', { className: 'text-sm font-semibold text-gray-700' }, '定向包明细')
              ),
              selectedTargetingPackages.map(function(id) {
                var tp = MOCK.targetingPackages.find(function(x) { return x.id === id; });
                return tp ? React.createElement('div', { key: id, className: 'px-4 py-3 border-b border-gray-100 flex justify-between' },
                  React.createElement('span', { className: 'text-sm text-gray-900' }, tp.name),
                  React.createElement('span', { className: 'text-xs text-gray-500' }, tp.region + ' · ' + tp.age + '岁 · ' + tp.gender)
                ) : null;
              })
            )
          ),
          React.createElement('div', { className: 'p-5 border-t flex justify-end gap-3' },
            React.createElement('button', { onClick: function() { setShowPreview(false); }, className: 'btn-secondary' }, '关闭'),
            React.createElement('button', { onClick: function() { setShowPreview(false); notify('搭建任务已提交（模拟）', 'success'); }, className: 'btn-primary' }, '\u786e\u8ba4\u642d\u5efa')
          )
        )
      );
    })(),

    // 素材选择弹窗
    showMaterialModal && React.createElement('div', { className: 'modal-overlay', onClick: function() { setShowMaterialModal(false); } },
      React.createElement('div', { className: 'modal-content w-full max-w-2xl', onClick: function(e) { e.stopPropagation(); } },
        React.createElement('div', { className: 'flex items-center justify-between p-5 border-b' },
          React.createElement('h3', { className: 'text-lg font-bold' }, '选择素材'),
          React.createElement('button', { onClick: function() { setShowMaterialModal(false); }, className: 'text-gray-400 hover:text-gray-600 text-lg' }, '\u00d7')
        ),
        React.createElement('div', { className: 'p-6 space-y-3' },
          MOCK.materials.map(function(m) {
            var selected = selectedMaterials.some(function(x) { return x.id === m.id; });
            return React.createElement('label', { key: m.id, className: 'flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50' },
              React.createElement('input', { type: 'checkbox', checked: selected, onChange: function(e) {
                setSelectedMaterials(e.target.checked ? selectedMaterials.concat([m]) : selectedMaterials.filter(function(x) { return x.id !== m.id; }));
              }, className: 'mr-3' }),
              React.createElement('i', { className: 'fas fa-' + (m.type === 'video' ? 'video text-blue-500' : 'image text-green-500') + ' mr-3' }),
              React.createElement('span', { className: 'text-sm' }, m.name)
            );
          })
        ),
        React.createElement('div', { className: 'p-5 border-t flex justify-end' },
          React.createElement('button', { onClick: function() { setShowMaterialModal(false); }, className: 'btn-primary' }, '确认')
        )
      )
    ),

    // 文案选择弹窗
    showCopyModal && React.createElement('div', { className: 'modal-overlay', onClick: function() { setShowCopyModal(false); } },
      React.createElement('div', { className: 'modal-content w-full max-w-2xl', onClick: function(e) { e.stopPropagation(); } },
        React.createElement('div', { className: 'flex items-center justify-between p-5 border-b' },
          React.createElement('h3', { className: 'text-lg font-bold' }, '选择文案'),
          React.createElement('button', { onClick: function() { setShowCopyModal(false); }, className: 'text-gray-400 hover:text-gray-600 text-lg' }, '\u00d7')
        ),
        React.createElement('div', { className: 'p-6 space-y-3' },
          MOCK.copies.map(function(c) {
            var selected = selectedCopies.some(function(x) { return x.id === c.id; });
            return React.createElement('label', { key: c.id, className: 'flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50' },
              React.createElement('input', { type: 'checkbox', checked: selected, onChange: function(e) {
                setSelectedCopies(e.target.checked ? selectedCopies.concat([c]) : selectedCopies.filter(function(x) { return x.id !== c.id; }));
              }, className: 'mr-3' }),
              React.createElement('span', { className: 'text-sm' }, c.content)
            );
          })
        ),
        React.createElement('div', { className: 'p-5 border-t flex justify-end' },
          React.createElement('button', { onClick: function() { setShowCopyModal(false); }, className: 'btn-primary' }, '确认')
        )
      )
    )
  );
}

// ========== 主应用 ==========
function App() {
  var [activeView, setActiveView] = useState('task-list');
  var [tasks, setTasks] = useState(function() {
    try { return JSON.parse(localStorage.getItem('batch_tasks') || '[]'); } catch(e) { return []; }
  });

  function handleCreateTask() {
    var newTask = {
      id: 'task_' + Date.now(),
      name: '任务-' + new Date().toLocaleString(),
      channel: 'guangdiantong',
      createdAt: new Date().toISOString(),
      status: 'created'
    };
    var list = tasks.concat([newTask]);
    setTasks(list);
    localStorage.setItem('batch_tasks', JSON.stringify(list));
    setActiveView('form-guangdiantong');
    notify('任务已创建，正在打开表单...', 'success');
  }

  function handleRunTask(task) {
    setActiveView('form-' + task.channel);
    notify('正在打开任务「' + task.name + '」', 'success');
  }

  function handleDeleteTask(id) {
    var list = tasks.filter(function(t) { return t.id !== id; });
    setTasks(list);
    localStorage.setItem('batch_tasks', JSON.stringify(list));
    notify('任务已删除', 'success');
  }

  return React.createElement('div', { className: 'flex min-h-screen bg-gray-50' },
    // 左侧菜单（只有一个）
    React.createElement('div', { className: 'w-56 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 bottom-0 z-40' },
      React.createElement('div', { className: 'p-5 border-b border-gray-200' },
        React.createElement('h1', { className: 'text-lg font-bold text-blue-600' }, 'AdBatch'),
        React.createElement('p', { className: 'text-xs text-gray-400 mt-1' }, '腾讯广告批量搭建')
      ),
      React.createElement('nav', { className: 'flex-1 p-3' },
        React.createElement('button', {
          onClick: function() { setActiveView('task-list'); },
          className: 'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ' + (activeView === 'task-list' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50')
        },
          React.createElement('i', { className: 'fas fa-rocket' }),
          '批创工具'
        )
      ),
      React.createElement('div', { className: 'p-4 border-t border-gray-200' },
        React.createElement('p', { className: 'text-xs text-gray-400' }, 'v2.0 · 原型版本')
      )
    ),

    // 主内容
    React.createElement('div', { className: 'flex-1 ml-56 p-8' },
      activeView === 'task-list' && React.createElement('div', { className: 'max-w-5xl mx-auto' },
        React.createElement('div', { className: 'flex items-center justify-between mb-6' },
          React.createElement('h2', { className: 'text-xl font-bold text-gray-900' }, '批创工具 - 任务列表'),
          React.createElement('button', { onClick: handleCreateTask, className: 'btn-primary' },
            React.createElement('i', { className: 'fas fa-plus mr-2' }), '新建任务'
          )
        ),
        tasks.length === 0 && React.createElement('div', { className: 'text-center py-20 text-gray-400' },
          React.createElement('i', { className: 'fas fa-tasks text-5xl mb-4' }),
          React.createElement('p', null, '暂无任务，点击「新建任务」开始')
        ),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
          tasks.map(function(task) {
            return React.createElement('div', { key: task.id, className: 'border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow' },
              React.createElement('div', { className: 'flex items-start justify-between mb-3' },
                React.createElement('div', null,
                  React.createElement('h4', { className: 'font-bold text-gray-900' }, task.name),
                  React.createElement('p', { className: 'text-xs text-gray-500 mt-1' }, '渠道：广点通'),
                  React.createElement('p', { className: 'text-xs text-gray-400 mt-1' }, '创建于 ' + new Date(task.createdAt).toLocaleDateString())
                ),
                React.createElement('button', { onClick: function() { handleDeleteTask(task.id); }, className: 'text-red-400 hover:text-red-600' }, React.createElement('i', { className: 'fas fa-trash' }))
              ),
              React.createElement('button', { onClick: function() { handleRunTask(task); }, className: 'w-full btn-primary text-sm py-2 mt-2' }, '运行任务')
            );
          })
        )
      ),
      activeView === 'form-guangdiantong' && React.createElement(TencentAdForm, { onBack: function() { setActiveView('task-list'); } })
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App, null));
