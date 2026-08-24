const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
 * 头条（巨量引擎）批量投放表单 — 自包含 MOCK 数据
 * ======================================================= */
const MOCK = {
  // 头条账户（含卡博士投放链接 kaboshi）
  accounts: [
    { id: 'tt_acc_001', name: '头条账户-北京移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT001' },
    { id: 'tt_acc_002', name: '头条账户-上海移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT002' },
    { id: 'tt_acc_003', name: '头条账户-广州移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT003' },
    { id: 'tt_acc_004', name: '头条账户-深圳移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT004' },
    { id: 'tt_acc_005', name: '头条账户-杭州移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT005' },
    { id: 'tt_acc_006', name: '头条账户-成都移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT006' },
    { id: 'tt_acc_007', name: '头条账户-武汉移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT007' },
    { id: 'tt_acc_008', name: '头条账户-南京移动', kaboshi: 'https://wp.kaboss.cn/h5-pack-pro/pages/pack/index?tgid=TT008' }
  ],
  // 商品库
  productLibrary: [
    { id: 'p_001', name: '5G智享套餐', image: '📱', sellingPoints: ['超大流量', '全国通用', '首月0元体验'] },
    { id: 'p_002', name: '家庭千兆宽带', image: '🌐', sellingPoints: ['千兆宽带', '免费上门安装', '送路由器'] },
    { id: 'p_003', name: '合约机0元购', image: '📦', sellingPoints: ['0元购机', '24期免息', '以旧换新补贴'] }
  ],
  // 文案包
  copyPackages: [
    { id: 'cp_001', name: '高转化文案包A', copies: [
      '限时福利！5G套餐首月0元，点击立即办理',
      '全网通流量，走到哪用到哪，速来抢',
      '老用户专享：宽带免费升千兆，仅限本月'
    ] },
    { id: 'cp_002', name: '品牌文案包B', copies: [
      '中国移动5G，让连接更快一步',
      '千兆宽带免费装，智能家居一步到位',
      '0元购新机，24期免息，轻松拿下心仪手机'
    ] }
  ],
  // 素材库（基础素材：图片/视频）
  materialLibrary: {
    video: [
      { id: 'mv_001', name: '短视频-产品展示01', type: 'video' },
      { id: 'mv_002', name: '短视频-用户证言02', type: 'video' },
      { id: 'mv_003', name: '短视频-场景剧情03', type: 'video' },
      { id: 'mv_004', name: '短视频-功能演示04', type: 'video' }
    ],
    image: [
      { id: 'mi_001', name: '主图-蓝金质感01', type: 'image' },
      { id: 'mi_002', name: '主图-促销红底02', type: 'image' },
      { id: 'mi_003', name: '主图-场景拼图03', type: 'image' },
      { id: 'mi_004', name: '主图-卖点清单04', type: 'image' }
    ]
  },
  // 头条渠道定向包
  targetingPackages: [
    { id: 'ttp_001', name: '头条定向包-华北', region: '北京、天津', age: '25-45', gender: '不限' },
    { id: 'ttp_002', name: '头条定向包-华东', region: '上海、江苏', age: '18-40', gender: '女' },
    { id: 'ttp_003', name: '头条定向包-华南', region: '广东、福建', age: '30-50', gender: '不限' },
    { id: 'ttp_004', name: '头条定向包-全国', region: '全国', age: '不限', gender: '不限' }
  ],
  // 头条人群包
  audiencePackages: [
    { id: 'tap_001', name: '头条人群包-高潜转化' },
    { id: 'tap_002', name: '头条人群包-活跃用户' },
    { id: 'tap_003', name: '头条人群包-竞品流失' },
    { id: 'tap_004', name: '头条人群包-新客拉新' }
  ]
};

// 动态参数（用于 项目名称 / 单元名称）
const DYNAMIC_PARAMS = [
  { token: '{账户ID}', desc: '账户ID' },
  { token: '{账户名称}', desc: '账户名称' },
  { token: '{产品名称}', desc: '产品名称' },
  { token: '{日期}', desc: '当前日期' },
  { token: '{序号}', desc: '自增序号' },
  { token: '{营销目的}', desc: '营销目的' }
];

const WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'];

/* =========================================================
 * Toast 通知
 * ======================================================= */
function Notification({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  const bg = type === 'error' ? '#ff4d4f' : (type === 'success' ? '#52c41a' : '#1890ff');
  return React.createElement('div', {
    style: {
      position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
      background: bg, color: '#fff', padding: '10px 18px', borderRadius: 8,
      fontSize: 14, zIndex: 99999, boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
    }
  }, msg);
}

/* =========================================================
 * 素材选择弹窗（图片/视频）
 * ======================================================= */
function MaterialModal({ show, onClose, onConfirm, onClear, selectedMaterials }) {
  const [activeTab, setActiveTab] = useState('video');
  const [localSelected, setLocalSelected] = useState((selectedMaterials || []).map(m => m.id));

  useEffect(() => {
    setLocalSelected((selectedMaterials || []).map(m => m.id));
    setActiveTab('video');
  }, [show]);

  if (!show) return null;
  const list = MOCK.materialLibrary[activeTab] || [];
  const toggle = (id) => {
    setLocalSelected(prev => prev.indexOf(id) >= 0 ? prev.filter(x => x !== id) : prev.concat([id]));
  };
  const handleConfirm = () => {
    const all = MOCK.materialLibrary.video.concat(MOCK.materialLibrary.image);
    const picked = all.filter(m => localSelected.indexOf(m.id) >= 0);
    onConfirm(picked);
  };

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-content', style: { width: 720, maxWidth: '92vw' }, onClick: e => e.stopPropagation() },
      React.createElement('div', { style: { padding: '16px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' } },
        React.createElement('h3', { style: { margin: 0, fontSize: 16 } }, '选择基础素材'),
        React.createElement('button', { onClick: onClose, style: { marginLeft: 'auto', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#999' } }, '×')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, padding: '12px 20px' } },
        React.createElement('button', {
          onClick: () => { setActiveTab('video'); },
          className: 'btn-secondary',
          style: { background: activeTab === 'video' ? '#1890FF' : '#f0f0f0', color: activeTab === 'video' ? '#fff' : '#333' }
        }, '🎬 视频素材'),
        React.createElement('button', {
          onClick: () => { setActiveTab('image'); },
          className: 'btn-secondary',
          style: { background: activeTab === 'image' ? '#1890FF' : '#f0f0f0', color: activeTab === 'image' ? '#fff' : '#333' }
        }, '🖼️ 图片素材')
      ),
      React.createElement('div', { style: { padding: '0 20px 16px', overflowY: 'auto', maxHeight: '50vh', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 } },
        list.map(m => {
          const checked = localSelected.indexOf(m.id) >= 0;
          return React.createElement('div', {
            key: m.id, onClick: () => toggle(m.id),
            style: {
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              border: '1px solid ' + (checked ? '#1890FF' : '#e5e7eb'),
              borderRadius: 8, cursor: 'pointer', background: checked ? '#eff6ff' : '#fff'
            }
          },
            React.createElement('input', { type: 'checkbox', readOnly: true, checked: checked }),
            React.createElement('span', { style: { fontSize: 13 } }, (m.type === 'video' ? '🎬 ' : '🖼️ ') + m.name)
          );
        })
      ),
      React.createElement('div', { style: { padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', gap: 10 } },
        React.createElement('button', {
          className: 'btn-secondary',
          onClick: () => { setLocalSelected([]); onClear && onClear(); }
        }, '清空重选'),
        React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 10 } },
          React.createElement('button', { className: 'btn-secondary', onClick: onClose }, '取消'),
          React.createElement('button', { className: 'btn-primary', onClick: handleConfirm }, '确认 (' + localSelected.length + ')')
        )
      )
    )
  );
}

/* =========================================================
 * 文案包选择弹窗
 * ======================================================= */
function CopyModal({ show, onClose, onConfirm, selectedCopyPackageId }) {
  const [localSel, setLocalSel] = useState(selectedCopyPackageId || '');
  useEffect(() => { setLocalSel(selectedCopyPackageId || ''); }, [show]);
  if (!show) return null;
  const handleConfirm = () => {
    const pkg = MOCK.copyPackages.find(p => p.id === localSel);
    if (!pkg) { alert('请选择一个文案包'); return; }
    onConfirm(pkg);
  };
  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-content', style: { width: 560, maxWidth: '92vw' }, onClick: e => e.stopPropagation() },
      React.createElement('div', { style: { padding: '16px 20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' } },
        React.createElement('h3', { style: { margin: 0, fontSize: 16 } }, '选择文案素材（文案包）'),
        React.createElement('button', { onClick: onClose, style: { marginLeft: 'auto', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#999' } }, '×')
      ),
      React.createElement('div', { style: { padding: '12px 20px', overflowY: 'auto', maxHeight: '55vh', display: 'flex', flexDirection: 'column', gap: 10 } },
        MOCK.copyPackages.map(pkg => {
          const checked = localSel === pkg.id;
          return React.createElement('div', {
            key: pkg.id, onClick: () => setLocalSel(pkg.id),
            style: {
              padding: '12px 14px', border: '1px solid ' + (checked ? '#1890FF' : '#e5e7eb'),
              borderRadius: 8, cursor: 'pointer', background: checked ? '#eff6ff' : '#fff'
            }
          },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
              React.createElement('input', { type: 'radio', readOnly: true, checked: checked, name: 'cppkg' }),
              React.createElement('span', { style: { fontWeight: 600, fontSize: 14 } }, pkg.name)
            ),
            React.createElement('div', { style: { marginLeft: 22, marginTop: 6, fontSize: 12, color: '#6b7280' } },
              pkg.copies.map((c, i) => React.createElement('div', { key: i }, '· ' + c))
            )
          );
        })
      ),
      React.createElement('div', { style: { padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 10 } },
        React.createElement('button', { className: 'btn-secondary', onClick: onClose }, '取消'),
        React.createElement('button', { className: 'btn-primary', onClick: handleConfirm }, '确认选择')
      )
    )
  );
}

/* =========================================================
 * 投放时段选择器（7×24 小时网格）
 * ======================================================= */
function TimeGrid({ value, onChange }) {
  const [slots, setSlots] = useState(value || {});
  useEffect(() => { if (value) setSlots(value); }, [value]);
  const has = (d, h) => slots[d + '_' + h];
  const toggle = (d, h) => {
    const key = d + '_' + h;
    const next = Object.assign({}, slots);
    if (next[key]) delete next[key]; else next[key] = 1;
    setSlots(next);
    onChange(next);
  };
  return React.createElement('div', { style: { border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, overflowX: 'auto' } },
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '40px repeat(24, 22px)', fontSize: 10, color: '#9ca3af', marginBottom: 4 } },
      React.createElement('div', null, ''),
      Array.from({ length: 24 }, (_, h) => React.createElement('div', { key: h, style: { textAlign: 'center' } }, h))
    ),
    WEEK_DAYS.map((wd, di) => React.createElement('div', {
      key: di, style: { display: 'grid', gridTemplateColumns: '40px repeat(24, 22px)', alignItems: 'center', marginBottom: 2 }
    },
      React.createElement('div', { style: { fontSize: 12, color: '#6b7280' } }, '周' + wd),
      Array.from({ length: 24 }, (_, h) => {
        const on = has(di, h);
        return React.createElement('div', {
          key: h, onClick: () => toggle(di, h),
          style: {
            height: 16, margin: 1, borderRadius: 2, cursor: 'pointer',
            background: on ? '#1890FF' : '#f3f4f6'
          }
        });
      })
    )),
    React.createElement('div', { style: { marginTop: 8, fontSize: 12, color: '#9ca3af' } }, '点击格子切换投放时段（蓝色=投放）')
  );
}

/* =========================================================
 * 动态参数输入框（用于 项目名称 / 单元名称）
 * ======================================================= */
function DynamicNameInput({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const insert = (token) => {
    onChange((value || '') + token);
    setOpen(false);
  };
  return React.createElement('div', { style: { position: 'relative', flex: 1 } },
    React.createElement('div', { style: { display: 'flex', gap: 8 } },
      React.createElement('input', { value: value || '', onChange: e => onChange(e.target.value), placeholder: placeholder || '输入名称，可插入动态参数', style: { flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none' } }),
      React.createElement('button', { type: 'button', onClick: () => setOpen(!open), className: 'btn-secondary', style: { whiteSpace: 'nowrap' } }, '插入参数 ▾')
    ),
    open && React.createElement('div', { style: { position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', zIndex: 30, padding: 6, display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 360 } },
      DYNAMIC_PARAMS.map(p => React.createElement('button', { key: p.token, type: 'button', onClick: () => insert(p.token), style: { padding: '4px 10px', border: '1px solid #d1d5db', borderRadius: 999, fontSize: 12, background: '#fafafa', cursor: 'pointer' } }, p.token))
    )
  );
}


/* =========================================================
 * 通用：区块卡片
 * ======================================================= */
function Section({ id, label, icon, children, right }) {
  return React.createElement('div', { id: id, style: { background: '#fff', borderRadius: 12, padding: '18px 20px', marginBottom: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: 16 } },
      React.createElement('span', { style: { fontSize: 18, marginRight: 8 } }, icon),
      React.createElement('h2', { style: { fontSize: 16, fontWeight: 600, margin: 0 } }, label),
      right && React.createElement('span', { style: { marginLeft: 'auto', fontSize: 13, color: '#6b7280' } }, right)
    ),
    children
  );
}

function Field({ label, required, children, hint }) {
  return React.createElement('div', { style: { marginBottom: 16 } },
    React.createElement('div', { style: { fontSize: 13, color: '#6b7280', marginBottom: 6 } },
      required && React.createElement('span', { style: { color: '#ff4d4f', marginRight: 4 } }, '*'),
      label),
    children,
    hint && React.createElement('div', { style: { fontSize: 12, color: '#9ca3af', marginTop: 4 } }, hint)
  );
}

/* =========================================================
 * 主表单
 * ======================================================= */
function App() {
  // ---- 任务上下文 ----
  const params = new URLSearchParams(window.location.search);
  const currentTaskId = params.get('taskId') || '';

  // ---- 1. 基础配置 ----
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [buildType, setBuildType] = useState('project_unit'); // project_unit=搭建项目和单元, unit_only=仅搭建单元

  // ---- 2. 项目配置 ----
  const [marketingObjective] = useState('lead'); // 固定：销售线索
  const [marketingScene] = useState('short_video_image'); // 固定：短视频+图文
  const [productMode, setProductMode] = useState('shared'); // shared=全账户共用, per_account=分账户定制
  const [productShared, setProductShared] = useState(''); // 共用时选中的商品
  const [productPerAccount, setProductPerAccount] = useState({}); // 分账户时 map
  const [leadMethod] = useState('self_landing'); // 固定：自研落地页
  const [optimizationGoal] = useState('form_submit'); // 固定：表单提交
  const [targetOptType] = useState('disabled'); // 固定：不启用
  const [deepOptMethod] = useState('disabled'); // 固定：不启动
  const [targetingMode, setTargetingMode] = useState('shared'); // 定向配置 全账户共用/分账户定制
  const [targetingShared, setTargetingShared] = useState([]); // 共用时选中的定向包
  const [targetingPerAccount, setTargetingPerAccount] = useState({}); // 分账户 map -> [pkgId]
  const [audienceMode, setAudienceMode] = useState('shared'); // 人群包 全账户共用/分账户定制
  const [audienceShared, setAudienceShared] = useState([]); // [{pkgId, action:'target'|'exclude'}]
  const [audiencePerAccount, setAudiencePerAccount] = useState({}); // map -> [{pkgId, action}]
  const [deliveryTimeMode, setDeliveryTimeMode] = useState('long_term'); // long_term=从今天起长期, custom=自定义日期
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [deliveryPeriodMode, setDeliveryPeriodMode] = useState('unlimited'); // unlimited=不限, specified=指定时段
  const [timeSlots, setTimeSlots] = useState({});
  const [bidStrategy, setBidStrategy] = useState('stable_cost'); // stable_cost=稳定成本, max_conversion=最大转化
  const [dailyBudget, setDailyBudget] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [projectName, setProjectName] = useState('');

  // ---- 3. 单元配置 ----
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selectedCopyPackage, setSelectedCopyPackage] = useState(null); // {id,name,copies}
  const [sourceText, setSourceText] = useState('');
  const [unitName, setUnitName] = useState('');
  const [ctaList, setCtaList] = useState(['了解更多']); // 行动号召（上限10）
  const [ctaDraft, setCtaDraft] = useState('');
  const [smartGen, setSmartGen] = useState(true); // 默认开启智能生成

  // ---- 运行配置 ----
  const [runMode, setRunMode] = useState('immediate'); // immediate=立即, scheduled=定时
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00');

  // ---- UI 状态 ----
  const [notify, setNotify] = useState(null);
  const [runModal, setRunModal] = useState(false);
  const [runProgress, setRunProgress] = useState(0);
  const [runResult, setRunResult] = useState(null);
  const [runBg, setRunBg] = useState(false);

  const runTimerRef = useRef(null);
  const runStartRef = useRef(Date.now());
  const runBgRef = useRef(false);

  const toast = (msg, type) => setNotify({ msg, type: type || 'info' });

  // 当前所选账户对象
  const selectedAccounts = useMemo(
    () => MOCK.accounts.filter(a => selectedAccountIds.indexOf(a.id) >= 0),
    [selectedAccountIds]
  );

  // 投放链接匹配结果（基础信息配置的卡博士链接）
  const deliveryLinks = useMemo(
    () => selectedAccounts.map(a => ({ accountId: a.id, accountName: a.name, link: a.kaboshi })),
    [selectedAccounts]
  );

  // 当前营销产品（用于产品信息展示）
  const currentProduct = useMemo(() => {
    let pid = productMode === 'shared' ? productShared : (productPerAccount[selectedAccountIds[0]] || '');
    return MOCK.productLibrary.find(p => p.id === pid) || null;
  }, [productMode, productShared, productPerAccount, selectedAccountIds]);

  // ---- 草稿 读取 ----
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ad_task_form_' + currentTaskId);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.selectedAccountIds) setSelectedAccountIds(d.selectedAccountIds);
      if (d.buildType) setBuildType(d.buildType);
      if (d.productMode) setProductMode(d.productMode);
      if (d.productShared) setProductShared(d.productShared);
      if (d.productPerAccount) setProductPerAccount(d.productPerAccount);
      if (d.targetingMode) setTargetingMode(d.targetingMode);
      if (d.targetingShared) setTargetingShared(d.targetingShared);
      if (d.targetingPerAccount) setTargetingPerAccount(d.targetingPerAccount);
      if (d.audienceMode) setAudienceMode(d.audienceMode);
      if (d.audienceShared) setAudienceShared(d.audienceShared);
      if (d.audiencePerAccount) setAudiencePerAccount(d.audiencePerAccount);
      if (d.deliveryTimeMode) setDeliveryTimeMode(d.deliveryTimeMode);
      if (d.customStart) setCustomStart(d.customStart);
      if (d.customEnd) setCustomEnd(d.customEnd);
      if (d.deliveryPeriodMode) setDeliveryPeriodMode(d.deliveryPeriodMode);
      if (d.timeSlots) setTimeSlots(d.timeSlots);
      if (d.bidStrategy) setBidStrategy(d.bidStrategy);
      if (d.dailyBudget) setDailyBudget(d.dailyBudget);
      if (d.bidAmount) setBidAmount(d.bidAmount);
      if (d.projectName) setProjectName(d.projectName);
      if (d.selectedMaterials) setSelectedMaterials(d.selectedMaterials);
      if (d.selectedCopyPackage) setSelectedCopyPackage(d.selectedCopyPackage);
      if (d.sourceText) setSourceText(d.sourceText);
      if (d.unitName) setUnitName(d.unitName);
      if (d.ctaList) setCtaList(d.ctaList);
      if (typeof d.smartGen === 'boolean') setSmartGen(d.smartGen);
      if (d.runMode) setRunMode(d.runMode);
      if (d.scheduledDate) setScheduledDate(d.scheduledDate);
      if (d.scheduledTime) setScheduledTime(d.scheduledTime);
    } catch (e) {}
  }, []);

  // ---- 草稿 保存 ----
  const doSaveForm = () => {
    try {
      const data = {
        channel: 'toutiao',
        selectedAccountIds, buildType,
        marketingObjective, marketingScene,
        productMode, productShared, productPerAccount,
        leadMethod, optimizationGoal, targetOptType, deepOptMethod,
        targetingMode, targetingShared, targetingPerAccount,
        audienceMode, audienceShared, audiencePerAccount,
        deliveryTimeMode, customStart, customEnd,
        deliveryPeriodMode, timeSlots,
        bidStrategy, dailyBudget, bidAmount, projectName,
        selectedMaterials, selectedCopyPackage, sourceText, unitName,
        ctaList, smartGen,
        runMode, scheduledDate, scheduledTime
      };
      localStorage.setItem('ad_task_form_' + currentTaskId, JSON.stringify(data));
    } catch (e) {}
  };

  useEffect(() => {
    const timer = setInterval(doSaveForm, 3000);
    window.__doSaveForm = doSaveForm;
    window.__getFormData = () => {
      doSaveForm();
      try { return JSON.parse(localStorage.getItem('ad_task_form_' + currentTaskId) || '{}'); } catch (e) { return {}; }
    };
    const msgHandler = (e) => { if (e.data && e.data.type === 'REQUEST_FORM_SAVE') doSaveForm(); };
    window.addEventListener('message', msgHandler);
    return () => { clearInterval(timer); window.removeEventListener('message', msgHandler); };
  }, []);

  useEffect(() => {
    const t = setTimeout(doSaveForm, 500);
    return () => clearTimeout(t);
  }, [selectedAccountIds, buildType, productShared, targetingShared, audienceShared, selectedMaterials, selectedCopyPackage, projectName, unitName]);

  // ---- 账户多选 ----
  const toggleAccount = (id) => {
    setSelectedAccountIds(prev => prev.indexOf(id) >= 0 ? prev.filter(x => x !== id) : prev.concat([id]));
  };

  // ---- 分账户定向包 ----
  const togglePerAccountTargeting = (accId, pkgId) => {
    setTargetingPerAccount(prev => {
      const cur = prev[accId] ? prev[accId].slice() : [];
      const next = Object.assign({}, prev);
      if (cur.indexOf(pkgId) >= 0) next[accId] = cur.filter(x => x !== pkgId);
      else next[accId] = cur.concat([pkgId]);
      return next;
    });
  };

  // ---- 人群包（共用 / 分账户）----
  const toggleAudienceShared = (pkgId) => {
    setAudienceShared(prev => {
      const exist = prev.find(x => x.pkgId === pkgId);
      if (exist) return prev.filter(x => x.pkgId !== pkgId);
      return prev.concat([{ pkgId, action: 'target' }]);
    });
  };
  const setAudienceAction = (pkgId, action) => {
    setAudienceShared(prev => prev.map(x => x.pkgId === pkgId ? Object.assign({}, x, { action }) : x));
  };
  const togglePerAccountAudience = (accId, pkgId) => {
    setAudiencePerAccount(prev => {
      const cur = prev[accId] ? prev[accId].slice() : [];
      const next = Object.assign({}, prev);
      const exist = cur.find(x => x.pkgId === pkgId);
      if (exist) next[accId] = cur.filter(x => x.pkgId !== pkgId);
      else next[accId] = cur.concat([{ pkgId, action: 'target' }]);
      return next;
    });
  };

  const refreshAudience = () => toast('人群包已刷新（模拟）', 'success');
  const syncAudience = () => toast('已批量同步人群包（模拟）', 'success');

  // ---- 行动号召（回车添加，上限10）----
  const addCta = () => {
    const v = ctaDraft.trim();
    if (!v) return;
    if (ctaList.length >= 10) { toast('行动号召最多 10 条', 'error'); return; }
    setCtaList(prev => prev.concat([v]));
    setCtaDraft('');
  };
  const removeCta = (i) => setCtaList(prev => prev.filter((_, idx) => idx !== i));

  // ---- 运行 / 搭建日志 ----
  const getOptimizerName = (accId) => {
    const names = ['张伟', '李娜', '王芳', '刘洋'];
    let h = 0; const s = '' + accId;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return names[h % names.length];
  };

  const buildEntry = () => {
    const ids = selectedAccountIds.length ? selectedAccountIds : ['tt_acc_001'];
    const seed = (currentTaskId ? currentTaskId.length : 1) * 31 + ids.length;
    const statusOptions = ['全部完成', '部分完成', '搭建失败'];
    const status = statusOptions[seed % 3];
    const rows = ids.map((accId, idx) => {
      let h = 0; const s = '' + accId;
      for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
      h = (h + seed * 7 + idx * 13) >>> 0;
      const unitTotal = buildType === 'unit_only' ? (1 + (h % 2)) : (2 + (h % 3));
      const creaPer = 2 + ((h >> 3) % 3);
      const creaTotal = unitTotal * creaPer;
      let unitFail = 0, creaFail = 0;
      if (status === '搭建失败') { unitFail = unitTotal; creaFail = creaTotal; }
      else if (status === '部分完成') { unitFail = unitTotal > 1 ? 1 : 0; creaFail = creaTotal > 1 ? creaPer : 0; }
      const reasons = status === '搭建失败'
        ? ['账户 ' + accId + ' 素材包缺失']
        : status === '部分完成'
          ? ['账户 ' + accId + ' 定向包未配置']
          : [];
      return {
        accId, optimizer: getOptimizerName(accId),
        unitTotal, unitSucc: unitTotal - unitFail, unitFail,
        creaTotal, creaSucc: creaTotal - creaFail, creaFail, reasons
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
    if (selectedAccountIds.length === 0) { toast('请先选择账户', 'error'); return; }
    if (!projectName) { toast('请填写项目名称', 'error'); return; }
    if (!unitName) { toast('请填写单元名称', 'error'); return; }
    if (selectedMaterials.length === 0) { toast('请选择基础素材', 'error'); return; }
    if (!selectedCopyPackage) { toast('请选择文案素材', 'error'); return; }
    if (deliveryTimeMode === 'custom' && (!customStart || !customEnd)) { toast('请设置投放开始/结束日期', 'error'); return; }
    if (runMode === 'scheduled' && !scheduledDate) { toast('请设置定时运行日期', 'error'); return; }
    if (runMode === 'scheduled') {
      toast('任务已提交，将在 ' + scheduledDate + ' ' + scheduledTime + ' 运行', 'success');
      doSaveForm();
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
    if (window.parent && window.parent !== window) window.parent.postMessage({ type: 'GOTO_TASKS' }, '*');
  };
  const confirmResult = () => {
    setRunModal(false); setRunResult(null); setRunProgress(0);
    if (window.parent && window.parent !== window) window.parent.postMessage({ type: 'GOTO_TASKS' }, '*');
  };

  useEffect(() => {
    if (runProgress < 100) return;
    clearInterval(runTimerRef.current);
    const entry = buildEntry();
    appendBuildLog(entry);
    if (runBgRef.current) {
      setRunModal(false); setRunProgress(0); setRunResult(null);
    } else {
      setRunResult(entry);
    }
  }, [runProgress]);

  /* ====================== 渲染 ====================== */
  return React.createElement('div', { style: { maxWidth: 1000, margin: '0 auto', padding: '4px 8px 60px' } },

    notify && React.createElement(Notification, { msg: notify.msg, type: notify.type, onClose: () => setNotify(null) }),

    /* ===== 1. 基础配置 ===== */
    React.createElement(Section, { id: 'section-basic', label: '基础配置', icon: '⚙️' },
      React.createElement(Field, { label: '选择账户', required: true, hint: '无需选择主体，直接选择投放账户' },
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 10 } },
          MOCK.accounts.map(a => {
            const checked = selectedAccountIds.indexOf(a.id) >= 0;
            return React.createElement('label', {
              key: a.id,
              style: {
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                border: '1px solid ' + (checked ? '#1890FF' : '#e5e7eb'), borderRadius: 8,
                cursor: 'pointer', background: checked ? '#eff6ff' : '#fff', fontSize: 13
              }
            },
              React.createElement('input', { type: 'checkbox', checked: checked, onChange: () => toggleAccount(a.id) }),
              React.createElement('span', null, a.name)
            );
          })
        )
      ),
      React.createElement(Field, { label: '搭建类型', required: true },
        React.createElement('div', { style: { display: 'flex', gap: 12 } },
          [
            { v: 'project_unit', t: '搭建项目和单元' },
            { v: 'unit_only', t: '仅搭建单元' }
          ].map(opt => {
            const on = buildType === opt.v;
            return React.createElement('label', {
              key: opt.v,
              style: {
                flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
                border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 10,
                cursor: 'pointer', background: on ? '#eff6ff' : '#fff', fontSize: 14
              }
            },
              React.createElement('input', { type: 'radio', name: 'ttBuildType', checked: on, onChange: () => setBuildType(opt.v) }),
              React.createElement('span', null, opt.t)
            );
          })
        )
      ),
      React.createElement(Field, { label: '投放链接匹配结果', hint: '根据所选账户匹配卡博士（Kaboshi）投放链接，用于单元落地页' },
        deliveryLinks.length === 0
          ? React.createElement('div', { style: { fontSize: 13, color: '#9ca3af', padding: '10px 0' } }, '请先选择账户')
          : React.createElement('div', { style: { border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' } },
            React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: 13 } },
              React.createElement('thead', null, React.createElement('tr', { style: { background: '#fafafa', color: '#6b7280' } },
                React.createElement('th', { style: cellHead }, '账户ID'),
                React.createElement('th', { style: cellHead }, '账户名称'),
                React.createElement('th', { style: cellHead }, '匹配投放链接（卡博士）')
              )),
              React.createElement('tbody', null, deliveryLinks.map((d, i) =>
                React.createElement('tr', { key: d.accountId, style: { borderTop: '1px solid #f0f0f0' } },
                  React.createElement('td', { style: cellBody }, d.accountId),
                  React.createElement('td', { style: cellBody }, d.accountName),
                  React.createElement('td', { style: Object.assign({}, cellBody, { color: '#1890FF', wordBreak: 'break-all' }) }, d.link)
                )
              ))
            )
          )
      )
    ),

    /* ===== 2. 项目配置 ===== */
    React.createElement(Section, { id: 'section-project', label: '项目配置', icon: '📋' },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' } },
        // 营销目的（固定）
        React.createElement(Field, { label: '营销目的' },
          React.createElement('div', { style: fixedBox }, '销售线索（固定）')
        ),
        // 营销场景（固定）
        React.createElement(Field, { label: '营销场景' },
          React.createElement('div', { style: fixedBox }, '短视频 + 图文（固定）')
        ),
        // 营销产品
        React.createElement(Field, { label: '营销产品', required: true },
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement('label', { style: radioInline },
              React.createElement('input', { type: 'radio', name: 'prodMode', checked: productMode === 'shared', onChange: () => setProductMode('shared') }),
              '全账户共用'
            ),
            React.createElement('label', { style: radioInline },
              React.createElement('input', { type: 'radio', name: 'prodMode', checked: productMode === 'per_account', onChange: () => setProductMode('per_account') }),
              '分账户定制'
            )
          ),
          productMode === 'shared'
            ? React.createElement('select', { value: productShared, onChange: e => setProductShared(e.target.value), style: selStyle },
                React.createElement('option', { value: '' }, '请选择商品'),
                MOCK.productLibrary.map(p => React.createElement('option', { key: p.id, value: p.id }, p.name))
              )
            : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
                selectedAccountIds.length === 0
                  ? React.createElement('span', { style: { fontSize: 13, color: '#9ca3af' } }, '请先在基础配置选择账户')
                  : selectedAccountIds.map(accId => {
                    const acc = MOCK.accounts.find(a => a.id === accId);
                    return React.createElement('div', { key: accId, style: { display: 'flex', alignItems: 'center', gap: 8 } },
                      React.createElement('span', { style: { width: 130, fontSize: 13, color: '#6b7280' } }, acc.name),
                      React.createElement('select', {
                        value: productPerAccount[accId] || '',
                        onChange: e => setProductPerAccount(prev => Object.assign({}, prev, { [accId]: e.target.value })),
                        style: Object.assign({}, selStyle, { flex: 1 })
                      },
                        React.createElement('option', { value: '' }, '请选择商品'),
                        MOCK.productLibrary.map(p => React.createElement('option', { key: p.id, value: p.id }, p.name))
                      )
                    );
                  })
              )
        ),
        // 获取线索方式（固定）
        React.createElement(Field, { label: '获取线索方式' },
          React.createElement('div', { style: fixedBox }, '自研落地页（固定）')
        ),
        // 优化目标（固定）
        React.createElement(Field, { label: '优化目标' },
          React.createElement('div', { style: fixedBox }, '表单提交（固定）')
        ),
        // 目标优化类型（固定）
        React.createElement(Field, { label: '目标优化类型' },
          React.createElement('div', { style: fixedBox }, '不启用（固定）')
        ),
        // 深度优化方式（固定）
        React.createElement(Field, { label: '深度优化方式' },
          React.createElement('div', { style: fixedBox }, '不启动（固定）')
        ),
        // 竞价策略
        React.createElement(Field, { label: '竞价策略', required: true },
          React.createElement('div', { style: { display: 'flex', gap: 12 } },
            [
              { v: 'stable_cost', t: '稳定成本' },
              { v: 'max_conversion', t: '最大转化' }
            ].map(opt => {
              const on = bidStrategy === opt.v;
              return React.createElement('label', {
                key: opt.v, style: {
                  flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                  border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 8,
                  cursor: 'pointer', background: on ? '#eff6ff' : '#fff', fontSize: 14
                }
              },
                React.createElement('input', { type: 'radio', name: 'bidStr', checked: on, onChange: () => setBidStrategy(opt.v) }),
                React.createElement('span', null, opt.t)
              );
            })
          )
        ),
        // 日预算 + 出价
        React.createElement(Field, { label: '日预算（元）', required: true },
          React.createElement('input', { type: 'number', value: dailyBudget, onChange: e => setDailyBudget(e.target.value), placeholder: '如 500', style: inputStyle })
        ),
        React.createElement(Field, { label: '出价（元）', required: true },
          React.createElement('input', { type: 'number', value: bidAmount, onChange: e => setBidAmount(e.target.value), placeholder: '如 2.5', style: inputStyle })
        ),
        // 投放时间
        React.createElement(Field, { label: '投放时间', required: true },
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement('label', { style: radioInline },
              React.createElement('input', { type: 'radio', name: 'dtMode', checked: deliveryTimeMode === 'long_term', onChange: () => setDeliveryTimeMode('long_term') }),
              '从今天起长期投放'
            ),
            React.createElement('label', { style: radioInline },
              React.createElement('input', { type: 'radio', name: 'dtMode', checked: deliveryTimeMode === 'custom', onChange: () => setDeliveryTimeMode('custom') }),
              '设置开始和结束日期'
            )
          ),
          deliveryTimeMode === 'custom' && React.createElement('div', { style: { display: 'flex', gap: 12 } },
            React.createElement('input', { type: 'date', value: customStart, onChange: e => setCustomStart(e.target.value), style: inputStyle }),
            React.createElement('span', { style: { alignSelf: 'center', color: '#9ca3af' } }, '至'),
            React.createElement('input', { type: 'date', value: customEnd, onChange: e => setCustomEnd(e.target.value), style: inputStyle })
          )
        ),
        // 投放时段
        React.createElement(Field, { label: '投放时段', required: true },
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement('label', { style: radioInline },
              React.createElement('input', { type: 'radio', name: 'dpMode', checked: deliveryPeriodMode === 'unlimited', onChange: () => setDeliveryPeriodMode('unlimited') }),
              '不限'
            ),
            React.createElement('label', { style: radioInline },
              React.createElement('input', { type: 'radio', name: 'dpMode', checked: deliveryPeriodMode === 'specified', onChange: () => setDeliveryPeriodMode('specified') }),
              '指定时间段'
            )
          ),
          deliveryPeriodMode === 'specified' && React.createElement(TimeGrid, { value: timeSlots, onChange: setTimeSlots })
        )
      ),
      // 项目名称（动态参数）
      React.createElement(Field, { label: '项目名称', required: true, hint: '可插入动态参数，如 {账户名称}_{产品名称}_{日期}' },
        React.createElement(DynamicNameInput, { value: projectName, onChange: setProjectName, placeholder: '如 头条-{产品名称}-{日期}' })
      ),

      /* 定向配置 */
      React.createElement(Field, { label: '定向配置', required: true },
        React.createElement('div', { style: { marginBottom: 8 } },
          React.createElement('label', { style: radioInline },
            React.createElement('input', { type: 'radio', name: 'tgtMode', checked: targetingMode === 'shared', onChange: () => setTargetingMode('shared') }),
            '全账户共用'
          ),
          React.createElement('label', { style: radioInline },
            React.createElement('input', { type: 'radio', name: 'tgtMode', checked: targetingMode === 'per_account', onChange: () => setTargetingMode('per_account') }),
            '分账户定制'
          )
        ),
        targetingMode === 'shared'
          ? React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
              MOCK.targetingPackages.map(pkg => {
                const on = targetingShared.indexOf(pkg.id) >= 0;
                return React.createElement('label', {
                  key: pkg.id, style: {
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px',
                    border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 8,
                    cursor: 'pointer', background: on ? '#eff6ff' : '#fff', fontSize: 13
                  }
                },
                  React.createElement('input', { type: 'checkbox', checked: on, onChange: () => setTargetingShared(prev => prev.indexOf(pkg.id) >= 0 ? prev.filter(x => x !== pkg.id) : prev.concat([pkg.id])) }),
                  React.createElement('span', null, pkg.name + '（' + pkg.region + '）')
                );
              })
            )
          : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
              selectedAccountIds.length === 0
                ? React.createElement('span', { style: { fontSize: 13, color: '#9ca3af' } }, '请先在基础配置选择账户')
                : selectedAccountIds.map(accId => {
                  const acc = MOCK.accounts.find(a => a.id === accId);
                  const cur = targetingPerAccount[accId] || [];
                  return React.createElement('div', { key: accId },
                    React.createElement('div', { style: { fontSize: 13, color: '#6b7280', marginBottom: 6 } }, acc.name),
                    React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
                      MOCK.targetingPackages.map(pkg => {
                        const on = cur.indexOf(pkg.id) >= 0;
                        return React.createElement('label', {
                          key: pkg.id, style: {
                            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
                            border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 8,
                            cursor: 'pointer', background: on ? '#eff6ff' : '#fff', fontSize: 12
                          }
                        },
                          React.createElement('input', { type: 'checkbox', checked: on, onChange: () => togglePerAccountTargeting(accId, pkg.id) }),
                          React.createElement('span', null, pkg.name)
                        );
                      })
                    )
                  );
                })
            )
      ),

      /* 自定义人群包配置 */
      React.createElement(Field, { label: '自定义人群包配置', required: true, hint: '选择头条人群包，定向/排除；可刷新或批量同步' },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 } },
          React.createElement('label', { style: radioInline },
            React.createElement('input', { type: 'radio', name: 'audMode', checked: audienceMode === 'shared', onChange: () => setAudienceMode('shared') }),
            '全账户共用'
          ),
          React.createElement('label', { style: radioInline },
            React.createElement('input', { type: 'radio', name: 'audMode', checked: audienceMode === 'per_account', onChange: () => setAudienceMode('per_account') }),
            '分账户定制'
          ),
          React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 8 } },
            React.createElement('button', { type: 'button', className: 'btn-secondary', onClick: refreshAudience }, '🔄 刷新人群包'),
            React.createElement('button', { type: 'button', className: 'btn-secondary', onClick: syncAudience }, '🔁 批量同步')
          )
        ),
        audienceMode === 'shared'
          ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
              MOCK.audiencePackages.map(pkg => {
                const item = audienceShared.find(x => x.pkgId === pkg.id);
                const on = !!item;
                return React.createElement('div', {
                  key: pkg.id, style: {
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                    border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 8, background: on ? '#eff6ff' : '#fff'
                  }
                },
                  React.createElement('input', { type: 'checkbox', checked: on, onChange: () => toggleAudienceShared(pkg.id) }),
                  React.createElement('span', { style: { fontSize: 13, flex: 1 } }, pkg.name),
                  on && React.createElement('select', {
                    value: item.action, onChange: e => setAudienceAction(pkg.id, e.target.value),
                    style: { padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 12 }
                  },
                    React.createElement('option', { value: 'target' }, '定向'),
                    React.createElement('option', { value: 'exclude' }, '排除')
                  )
                );
              })
            )
          : React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
              selectedAccountIds.length === 0
                ? React.createElement('span', { style: { fontSize: 13, color: '#9ca3af' } }, '请先在基础配置选择账户')
                : selectedAccountIds.map(accId => {
                  const acc = MOCK.accounts.find(a => a.id === accId);
                  const cur = audiencePerAccount[accId] || [];
                  return React.createElement('div', { key: accId },
                    React.createElement('div', { style: { fontSize: 13, color: '#6b7280', marginBottom: 6 } }, acc.name),
                    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
                      MOCK.audiencePackages.map(pkg => {
                        const item = cur.find(x => x.pkgId === pkg.id);
                        const on = !!item;
                        return React.createElement('div', {
                          key: pkg.id, style: {
                            display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px',
                            border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 8, background: on ? '#eff6ff' : '#fff'
                          }
                        },
                          React.createElement('input', { type: 'checkbox', checked: on, onChange: () => togglePerAccountAudience(accId, pkg.id) }),
                          React.createElement('span', { style: { fontSize: 12, flex: 1 } }, pkg.name),
                          on && React.createElement('select', {
                            value: item.action, onChange: e => setAudiencePerAccount(prev => {
                              const arr = (prev[accId] || []).map(x => x.pkgId === pkg.id ? Object.assign({}, x, { action: e.target.value }) : x);
                              return Object.assign({}, prev, { [accId]: arr });
                            }),
                            style: { padding: '3px 6px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 12 }
                          },
                            React.createElement('option', { value: 'target' }, '定向'),
                            React.createElement('option', { value: 'exclude' }, '排除')
                          )
                        );
                      })
                    )
                  );
                })
            )
      )
    ),

    /* ===== 3. 单元配置 ===== */
    React.createElement(Section, { id: 'section-unit', label: '单元配置', icon: '🧩' },
      // 基础素材
      React.createElement(Field, { label: '基础素材（图片 / 视频）', required: true },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' } },
          React.createElement('button', { type: 'button', className: 'btn-primary', onClick: () => setShowMaterialModal(true) }, '选择素材'),
          React.createElement('span', { style: { fontSize: 13, color: '#6b7280' } }, '已选 ' + selectedMaterials.length + ' 个'),
          selectedMaterials.length > 0 && React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
            selectedMaterials.map(m => React.createElement('span', { key: m.id, className: 'tag' }, (m.type === 'video' ? '🎬 ' : '🖼️ ') + m.name))
          )
        )
      ),
      // 文案素材
      React.createElement(Field, { label: '文案素材（文案包）', required: true },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' } },
          React.createElement('button', { type: 'button', className: 'btn-primary', onClick: () => setShowCopyModal(true) }, '选择文案包'),
          selectedCopyPackage
            ? React.createElement('span', { className: 'tag' }, '📝 ' + selectedCopyPackage.name + '（' + selectedCopyPackage.copies.length + ' 条文案）')
            : React.createElement('span', { style: { fontSize: 13, color: '#9ca3af' } }, '未选择')
        )
      ),
      // 落地页
      React.createElement(Field, { label: '落地页', hint: '取自基础配置匹配的卡博士投放链接' },
        deliveryLinks.length === 0
          ? React.createElement('div', { style: { fontSize: 13, color: '#9ca3af' } }, '请先在基础配置选择账户')
          : React.createElement('div', { style: { fontSize: 13, color: '#1890FF', wordBreak: 'break-all', background: '#f6fbff', border: '1px solid #d6ecff', borderRadius: 8, padding: '8px 12px' } },
              deliveryLinks[0].link + (selectedAccountIds.length > 1 ? '（已按所选 ' + selectedAccountIds.length + ' 个账户匹配）' : '')
            )
      ),
      // 产品信息
      React.createElement(Field, { label: '产品信息', hint: '读取商品库：产品名称 / 产品主图 / 产品卖点' },
        currentProduct
          ? React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, background: '#fafafa' } },
              React.createElement('div', { style: { fontSize: 40 } }, currentProduct.image),
              React.createElement('div', null,
                React.createElement('div', { style: { fontWeight: 600, fontSize: 15 } }, currentProduct.name),
                React.createElement('div', { style: { marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 6 } },
                  currentProduct.sellingPoints.map((sp, i) => React.createElement('span', { key: i, className: 'tag' }, '✨ ' + sp))
                )
              )
            )
          : React.createElement('div', { style: { fontSize: 13, color: '#9ca3af' } }, '请先在项目配置选择营销产品')
      ),
      // 创意组件：行动号召
      React.createElement(Field, { label: '创意组件 - 行动号召', hint: '输入后回车添加，上限 10 条；默认开启智能生成' },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
          React.createElement('input', {
            value: ctaDraft, onChange: e => setCtaDraft(e.target.value), onKeyDown: e => { if (e.key === 'Enter') { e.preventDefault(); addCta(); } },
            placeholder: '输入行动号召文案，回车添加', style: Object.assign({}, inputStyle, { flex: 1 })
          }),
          React.createElement('button', { type: 'button', className: 'btn-secondary', onClick: addCta }, '添加')
        ),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 } },
          ctaList.map((c, i) => React.createElement('span', {
            key: i, className: 'tag', style: { background: '#f0f5ff', color: '#333' }
          },
            '#' + (i + 1) + ' ' + c,
            React.createElement('button', { type: 'button', onClick: () => removeCta(i), style: { marginLeft: 6, color: '#ff4d4f' } }, '×')
          ))
        ),
        React.createElement('label', { style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7280' } },
          React.createElement('input', { type: 'checkbox', checked: smartGen, onChange: e => setSmartGen(e.target.checked) }),
          '默认开启智能生成'
        )
      ),
      // 来源
      React.createElement(Field, { label: '来源' },
        React.createElement('input', { value: sourceText, onChange: e => setSourceText(e.target.value), placeholder: '如 官网 / 活动落地页', style: inputStyle })
      ),
      // 单元名称（动态参数）
      React.createElement(Field, { label: '单元名称', required: true, hint: '可插入动态参数，如 {账户名称}_{序号}' },
        React.createElement(DynamicNameInput, { value: unitName, onChange: setUnitName, placeholder: '如 单元-{账户名称}-{序号}' })
      )
    ),

    /* ===== 4. 运行配置 ===== */
    React.createElement(Section, { id: 'section-run', label: '运行配置', icon: '🚀' },
      React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 16 } },
        [
          { v: 'immediate', t: '立即运行' },
          { v: 'scheduled', t: '定时运行' }
        ].map(opt => {
          const on = runMode === opt.v;
          return React.createElement('label', {
            key: opt.v, style: {
              flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
              border: '1px solid ' + (on ? '#1890FF' : '#e5e7eb'), borderRadius: 10,
              cursor: 'pointer', background: on ? '#eff6ff' : '#fff', fontSize: 14
            }
          },
            React.createElement('input', { type: 'radio', name: 'runMode', checked: on, onChange: () => setRunMode(opt.v) }),
            React.createElement('span', null, opt.t)
          );
        })
      ),
      runMode === 'scheduled' && React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 16 } },
        React.createElement('input', { type: 'date', value: scheduledDate, onChange: e => setScheduledDate(e.target.value), style: inputStyle }),
        React.createElement('input', { type: 'time', value: scheduledTime, onChange: e => setScheduledTime(e.target.value), style: inputStyle })
      ),
      React.createElement('button', {
        type: 'button', className: 'btn-primary', onClick: handleRun,
        style: { width: '100%', padding: '12px 0', fontSize: 15 }
      }, React.createElement('i', { className: 'fas fa-play', style: { marginRight: 8 } }), runMode === 'immediate' ? '立即运行' : '提交定时任务')
    ),

    /* 弹窗 */
    React.createElement(MaterialModal, {
      show: showMaterialModal, onClose: () => setShowMaterialModal(false),
      onConfirm: mats => { setSelectedMaterials(mats); setShowMaterialModal(false); },
      onClear: () => setSelectedMaterials([]),
      selectedMaterials: selectedMaterials
    }),
    React.createElement(CopyModal, {
      show: showCopyModal, onClose: () => setShowCopyModal(false),
      onConfirm: pkg => { setSelectedCopyPackage(pkg); setShowCopyModal(false); },
      selectedCopyPackageId: selectedCopyPackage ? selectedCopyPackage.id : ''
    }),

    /* 进度弹窗 */
    runModal && React.createElement('div', { className: 'modal-overlay' },
      React.createElement('div', { style: { background: '#fff', borderRadius: 12, padding: 28, width: 380, textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: 16, fontWeight: 600, marginBottom: 16 } }, '正在搭建…'),
        React.createElement('div', { style: { height: 10, background: '#f0f0f0', borderRadius: 999, overflow: 'hidden' } },
          React.createElement('div', { style: { width: runProgress + '%', height: '100%', background: '#1890FF', transition: 'width 0.2s' } })
        ),
        React.createElement('div', { style: { margin: '12px 0 18px', fontSize: 14, color: '#6b7280' } }, runProgress + '%'),
        React.createElement('button', { className: 'btn-secondary', onClick: goBackground }, React.createElement('i', { className: 'fas fa-arrow-right', style: { marginRight: 6 } }), '转到后台运行'),
        React.createElement('p', { style: { marginTop: 12, fontSize: 12, color: '#9ca3af' } }, '点击「转到后台运行」将跳回任务列表，搭建在后台继续')
      )
    ),

    /* 结果弹窗 */
    runResult && React.createElement('div', { className: 'modal-overlay' },
      React.createElement('div', { style: { background: '#fff', borderRadius: 12, padding: 28, width: 420, textAlign: 'center' } },
        React.createElement('div', { style: { fontSize: 40, marginBottom: 8 } }, runResult.status === '全部完成' ? '✅' : (runResult.status === '部分完成' ? '⚠️' : '❌')),
        React.createElement('div', { style: { fontSize: 16, fontWeight: 600, marginBottom: 6 } }, '搭建' + runResult.status),
        React.createElement('div', { style: { fontSize: 13, color: '#6b7280', marginBottom: 16 } }, '共 ' + runResult.rows.length + ' 个账户，详见任务日志'),
        React.createElement('button', { className: 'btn-primary', onClick: confirmResult }, '完成')
      )
    )
  );
}

/* 公共样式片段 */
const cellHead = { padding: '10px 12px', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid #e5e7eb' };
const cellBody = { padding: '10px 12px', borderBottom: '1px solid #f0f0f0', fontSize: 13 };
const fixedBox = { padding: '8px 12px', background: '#f6f8fa', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, color: '#333' };
const radioInline = { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, marginRight: 18, cursor: 'pointer' };
const selStyle = { width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff' };
const inputStyle = { width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, outline: 'none' };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
