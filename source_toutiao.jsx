const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
 * 头条（巨量引擎）批量投放表单
 * 复用广点通共享组件 window.UI（Notification/MaterialModal/CopyModal/TimeGrid）
 * 结构与样式与广点通表单保持一致，仅配置内容按头条渠道定制
 * ========================================================= */

// ========== Mock 数据（形态与 window.UI 组件对齐） ==========
const MOCK = {
  // 头条账户（含 卡博士 Kaboshi 投放链接）
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
  // 素材库（视频+图片），供 MaterialModal 读取（与广点通形态一致）
  videoMaterials: Array.from({ length: 120 }, (_, i) => ({
    id: 'tv_' + String(i + 1).padStart(3, '0'),
    name: '头条视频素材' + (i + 1),
    type: 'video',
    duration: ['0:30', '1:00', '1:30', '2:00'][i % 4],
    size: ['15MB', '28MB', '20MB', '55MB'][i % 4],
    thumb: '🎬',
    spend: Math.round((Math.random() * 5000 + 100) * 100) / 100,
    ctr: Math.round((Math.random() * 5 + 1) * 100) / 100,
    cvr: Math.round((Math.random() * 10 + 0.5) * 100) / 100
  })),
  imageMaterials: Array.from({ length: 120 }, (_, i) => ({
    id: 'ti_' + String(i + 1).padStart(3, '0'),
    name: '头条图片素材' + (i + 1),
    type: 'image',
    size: ['120KB', '250KB', '80KB', '300KB'][i % 4],
    thumb: '🖼️',
    spend: Math.round((Math.random() * 3000 + 50) * 100) / 100,
    ctr: Math.round((Math.random() * 4 + 0.5) * 100) / 100,
    cvr: Math.round((Math.random() * 8 + 0.3) * 100) / 100
  })),
  // 文案库（单条文案）+ 文案包（copies 为 id 数组），供 CopyModal 读取
  copyLibrary: [
    { id: 'tc_001', content: '限时福利！5G套餐首月0元，点击立即办理', ctr: 3.5 },
    { id: 'tc_002', content: '全网通流量，走到哪用到哪，速来抢', ctr: 2.8 },
    { id: 'tc_003', content: '老用户专享：宽带免费升千兆，仅限本月', ctr: 4.2 },
    { id: 'tc_004', content: '中国移动5G，让连接更快一步', ctr: 3.1 },
    { id: 'tc_005', content: '千兆宽带免费装，智能家居一步到位', ctr: 2.9 },
    { id: 'tc_006', content: '0元购新机，24期免息，轻松拿下心仪手机', ctr: 3.8 }
  ],
  copyPackages: [
    { id: 'tcp_001', name: '高转化文案包A', copies: ['tc_001', 'tc_002', 'tc_003'] },
    { id: 'tcp_002', name: '品牌文案包B', copies: ['tc_004', 'tc_005', 'tc_006'] }
  ],
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
  { token: '{序号}', desc: '自增序号' }
];

// 共享组件（与广点通同一套实现）
const { Notification, MaterialModal, CopyModal, TimeGrid } = window.UI;

/* =========================================================
 * 动态参数输入框（用于 项目名称 / 单元名称）
 * ========================================================= */
function DynamicNameInput({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const insert = (token) => { onChange((value || '') + token); setOpen(false); };
  return (
    <div className="relative flex-1">
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || '输入名称，可插入动态参数'}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button type="button" onClick={() => setOpen(!open)} className="btn-secondary whitespace-nowrap">插入参数 ▾</button>
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 p-1.5 flex flex-wrap gap-1.5" style={{ maxWidth: 360 }}>
          {DYNAMIC_PARAMS.map(p => (
            <button key={p.token} type="button" onClick={() => insert(p.token)}
              className="px-2.5 py-1 border border-gray-300 rounded-full text-xs bg-gray-50 hover:bg-gray-100 cursor-pointer">
              {p.token}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
 * 主表单
 * ========================================================= */
function App() {
  // ---- 任务上下文 ----
  const params = new URLSearchParams(window.location.search);
  const currentTaskId = params.get('taskId') || '';

  // ---- 1. 基础配置 ----
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [accountSearchText, setAccountSearchText] = useState('');
  const [buildType, setBuildType] = useState('project_unit'); // project_unit=搭建项目和单元, unit_only=仅搭建单元

  // ---- 2. 项目配置 ----
  const [productMode, setProductMode] = useState('shared'); // shared=全账户共用, per_account=分账户定制
  const [productShared, setProductShared] = useState('');
  const [productPerAccount, setProductPerAccount] = useState({});
  const [bidStrategy, setBidStrategy] = useState('stable_cost'); // stable_cost=稳定成本, max_conversion=最大转化
  const [dailyBudget, setDailyBudget] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTimeMode, setDeliveryTimeMode] = useState('long_term'); // long_term=从今天起长期, custom=自定义日期
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [deliveryPeriodMode, setDeliveryPeriodMode] = useState('unlimited'); // unlimited=不限, specified=指定时段
  const [timeSlots, setTimeSlots] = useState({});
  const [projectName, setProjectName] = useState('');

  // 定向配置（项目级，可全账户共用 / 分账户定制）
  const [targetingMode, setTargetingMode] = useState('shared');
  const [targetingShared, setTargetingShared] = useState([]);
  const [targetingPerAccount, setTargetingPerAccount] = useState({});

  // 人群包配置
  const [audienceMode, setAudienceMode] = useState('shared');
  const [audienceShared, setAudienceShared] = useState([]); // [{pkgId, action:'target'|'exclude'}]
  const [audiencePerAccount, setAudiencePerAccount] = useState({});

  // ---- 3. 单元配置 ----
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]); // 素材对象数组
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selectedCopies, setSelectedCopies] = useState([]); // 文案对象数组 {id,content,ctr}
  const [unitName, setUnitName] = useState('');
  const [ctaList, setCtaList] = useState(['了解更多']); // 行动号召（上限10）
  const [ctaDraft, setCtaDraft] = useState('');
  const [smartGen, setSmartGen] = useState(true); // 默认开启智能生成
  const [sourceText, setSourceText] = useState('');

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
  const accountDropdownRef = useRef(null);

  const toast = (msg, type) => setNotify({ msg, type: type || 'info' });

  // 当前所选账户对象
  const selectedAccounts = useMemo(
    () => MOCK.accounts.filter(a => selectedAccountIds.indexOf(a.id) >= 0),
    [selectedAccountIds]
  );
  const filteredAccounts = useMemo(() => {
    const q = accountSearchText.trim().toLowerCase();
    if (!q) return MOCK.accounts;
    return MOCK.accounts.filter(a => a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q));
  }, [accountSearchText]);

  // 投放链接匹配结果（基础配置匹配的卡博士链接）
  const deliveryLinks = useMemo(
    () => selectedAccounts.map(a => ({ accountId: a.id, accountName: a.name, link: a.kaboshi })),
    [selectedAccounts]
  );

  // 当前营销产品
  const currentProduct = useMemo(() => {
    const pid = productMode === 'shared' ? productShared : (productPerAccount[selectedAccountIds[0]] || '');
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
      if (d.bidStrategy) setBidStrategy(d.bidStrategy);
      if (d.dailyBudget) setDailyBudget(d.dailyBudget);
      if (d.bidAmount) setBidAmount(d.bidAmount);
      if (d.deliveryTimeMode) setDeliveryTimeMode(d.deliveryTimeMode);
      if (d.customStart) setCustomStart(d.customStart);
      if (d.customEnd) setCustomEnd(d.customEnd);
      if (d.deliveryPeriodMode) setDeliveryPeriodMode(d.deliveryPeriodMode);
      if (d.timeSlots) setTimeSlots(d.timeSlots);
      if (d.projectName) setProjectName(d.projectName);
      if (d.targetingMode) setTargetingMode(d.targetingMode);
      if (d.targetingShared) setTargetingShared(d.targetingShared);
      if (d.targetingPerAccount) setTargetingPerAccount(d.targetingPerAccount);
      if (d.audienceMode) setAudienceMode(d.audienceMode);
      if (d.audienceShared) setAudienceShared(d.audienceShared);
      if (d.audiencePerAccount) setAudiencePerAccount(d.audiencePerAccount);
      if (d.selectedMaterials) setSelectedMaterials(d.selectedMaterials);
      if (d.selectedCopies) setSelectedCopies(d.selectedCopies);
      if (d.unitName) setUnitName(d.unitName);
      if (d.ctaList) setCtaList(d.ctaList);
      if (typeof d.smartGen === 'boolean') setSmartGen(d.smartGen);
      if (d.sourceText) setSourceText(d.sourceText);
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
        productMode, productShared, productPerAccount,
        bidStrategy, dailyBudget, bidAmount,
        deliveryTimeMode, customStart, customEnd,
        deliveryPeriodMode, timeSlots,
        projectName,
        targetingMode, targetingShared, targetingPerAccount,
        audienceMode, audienceShared, audiencePerAccount,
        selectedMaterials, selectedCopies,
        unitName, ctaList, smartGen, sourceText,
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
  }, [selectedAccountIds, buildType, productShared, targetingShared, audienceShared, selectedMaterials, selectedCopies, projectName, unitName]);

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

  // ---- 人群包 ----
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
      return { accId, optimizer: getOptimizerName(accId), unitTotal, unitSucc: unitTotal - unitFail, unitFail, creaTotal, creaSucc: creaTotal - creaFail, creaFail, reasons };
    });
    return { buildId: 'build_' + Date.now(), startedAt: new Date(runStartRef.current).toISOString(), finishedAt: new Date().toISOString(), status, rows };
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
    if (selectedCopies.length === 0) { toast('请选择文案素材', 'error'); return; }
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

  return (
    <div className="max-w-[1000px] mx-auto px-2 pb-16">
      {notify && <Notification msg={notify.msg} type={notify.type} onClose={() => setNotify(null)} />}

      {/* ===== 快捷导航（与广点通一致） ===== */}
      <div className="bg-gray-50 border-b sticky top-[56px] z-30 shadow-sm">
        <div className="px-6 flex items-center gap-1 overflow-x-auto py-1">
          {[
            { id: 'section-basic', label: '基础配置', icon: 'fa-cog' },
            { id: 'section-project', label: '项目配置', icon: 'fa-project-diagram' },
            { id: 'section-unit', label: '单元配置', icon: 'fa-bullseye' },
            { id: 'section-run', label: '运行配置', icon: 'fa-play' }
          ].map(s => (
            <a key={s.id} href={'#' + s.id} onClick={e => { e.preventDefault(); document.getElementById(s.id) && document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' }); }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md text-gray-600 whitespace-nowrap transition-colors"
              style={{ color: '#374151' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0f5ff'; e.currentTarget.style.color = '#1890ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}>
              <i className={`fas ${s.icon}`}></i>
              <span>{s.label}</span>
            </a>
          ))}
          <div className="flex-1"></div>
          {selectedAccountIds.length > 0 && (
            <span className="text-2xs text-gray-400 mr-3"><i className="fas fa-users mr-1"></i>{selectedAccountIds.length}个账户</span>
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
            {/* 选择账户 */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">选择账户 <span className="text-red-500">*</span></label>
              <div className="relative max-w-sm w-full" ref={accountDropdownRef}>
                <div className="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white min-h-[42px] flex flex-wrap gap-1 items-center text-sm" onClick={() => { setShowAccountDropdown(!showAccountDropdown); }}>
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
                  {selectedAccountIds.length > 5 && (<span className="text-xs text-blue-600 font-medium ml-1">+{selectedAccountIds.length - 5}</span>)}
                  <span className="ml-auto text-gray-400 text-xs"><i className="fas fa-chevron-down"></i></span>
                </div>
                {showAccountDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-2 border-b">
                      <input type="text" value={accountSearchText} onChange={e => setAccountSearchText(e.target.value)} placeholder="输入账户ID搜索，支持英文逗号批量搜索..." className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm outline-none focus:ring-1 focus:ring-blue-400" onClick={e => e.stopPropagation()} autoFocus />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredAccounts.length === 0 ? (
                        <div className="px-3 py-4 text-sm text-gray-400 text-center">无匹配账户</div>
                      ) : (
                        filteredAccounts.map(acc => (
                          <div key={acc.id} onClick={() => toggleAccount(acc.id)} className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 flex items-center gap-2 text-sm border-b border-gray-100 last:border-b-0">
                            <input type="checkbox" checked={selectedAccountIds.includes(acc.id)} onChange={() => {}} className="w-4 h-4 text-blue-600 rounded pointer-events-none flex-shrink-0" />
                            <span className="flex-1 truncate min-w-0">{acc.id}</span>
                            {selectedAccountIds.includes(acc.id) && (<i className="fas fa-check text-blue-500 flex-shrink-0"></i>)}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => { toast('账户列表已刷新', 'success'); }} className="text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded px-2 py-1 hover:bg-blue-50 whitespace-nowrap">
                <i className="fas fa-sync-alt mr-1"></i>刷新账户列表
              </button>
            </div>
            {/* 搭建类型 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">搭建类型 <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: buildType === 'project_unit' ? '#1890ff' : '#e5e7eb', background: buildType === 'project_unit' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="buildType" value="project_unit" checked={buildType === 'project_unit'} onChange={() => setBuildType('project_unit')} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>搭建项目和单元</span>
                </label>
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: buildType === 'unit_only' ? '#1890ff' : '#e5e7eb', background: buildType === 'unit_only' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="buildType" value="unit_only" checked={buildType === 'unit_only'} onChange={() => setBuildType('unit_only')} className="w-4 h-4 mr-2 text-blue-600" />
                  <span>仅搭建单元</span>
                </label>
              </div>
            </div>
            {/* 投放链匹配结果 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="block text-sm font-medium text-gray-700 mb-2">投放链匹配结果 <span className="text-xs text-gray-400 font-normal">（根据所选账户匹配卡博士投放链接，用于单元落地页）</span></div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white min-h-[120px]">
                {selectedAccountIds.length === 0 ? (
                  <p className="text-sm text-gray-400 p-3">请先选择账户</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 text-gray-600 text-left">
                      <th className="px-3 py-2 font-medium">账户ID</th>
                      <th className="px-3 py-2 font-medium">账户名称</th>
                      <th className="px-3 py-2 font-medium">匹配投放链接（卡博士）</th>
                    </tr></thead>
                    <tbody>
                      {deliveryLinks.map(d => {
                        const matched = !!d.link;
                        return (
                          <tr key={d.accountId} className="border-t border-gray-100">
                            <td className={`px-3 py-2 align-top ${matched ? 'text-gray-800' : 'text-red-500 font-medium'}`}>{d.accountId}</td>
                            <td className="px-3 py-2 align-top text-gray-700">{d.accountName}</td>
                            <td className="px-3 py-2 align-top">
                              {matched ? <a href={d.link} target="_blank" rel="noreferrer" className="text-green-600 hover:underline break-all">{d.link}</a> : <span className="text-red-500 font-medium">未匹配到投放链接</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== 2. 项目配置 ===== */}
        <div id="section-project" className="">
          <div className="px-6 py-3.5 flex items-center gap-3 border-b border-gray-200">
            <span className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="text-base font-semibold text-gray-900">项目配置</h2>
            <span className="text-xs text-gray-400 ml-auto font-normal"><i className="fas fa-project-diagram mr-1"></i>配置营销产品、出价、定向与人群</span>
          </div>
          <div className="p-6">
            {/* 营销目的 / 营销场景 / 获取线索方式 / 优化目标 / 目标优化类型 / 深度优化方式（固定） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">营销目的</label>
                <input type="text" value="销售线索" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">营销场景</label>
                <input type="text" value="短视频 + 图文" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">获取线索方式</label>
                <input type="text" value="自研落地页" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">优化目标</label>
                <input type="text" value="表单提交" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">目标优化类型</label>
                <input type="text" value="不启用" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
              <div className="flex items-center gap-3 mb-5">
                <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">深度优化方式</label>
                <input type="text" value="不启动" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
            </div>
            {/* 营销产品 */}
            <div className="flex items-start gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0 pt-2">营销产品 <span className="text-red-500">*</span></label>
              <div className="flex-1">
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="prodMode" checked={productMode === 'shared'} onChange={() => setProductMode('shared')} className="mr-2" />全账户共用</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="prodMode" checked={productMode === 'per_account'} onChange={() => setProductMode('per_account')} className="mr-2" />分账户定制</label>
                </div>
                {productMode === 'shared' ? (
                  <select value={productShared} onChange={e => setProductShared(e.target.value)} className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option value="">请选择商品</option>
                    {MOCK.productLibrary.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                ) : (
                  <div className="flex flex-col gap-2">
                    {selectedAccountIds.length === 0 ? <span className="text-sm text-gray-400">请先在基础配置选择账户</span> :
                      selectedAccountIds.map(accId => {
                        const acc = MOCK.accounts.find(a => a.id === accId);
                        return (
                          <div key={accId} className="flex items-center gap-2">
                            <span className="w-32 text-sm text-gray-600 truncate">{acc.name}</span>
                            <select value={productPerAccount[accId] || ''} onChange={e => setProductPerAccount(prev => Object.assign({}, prev, { [accId]: e.target.value }))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                              <option value="">请选择商品</option>
                              {MOCK.productLibrary.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                          </div>
                        );
                      })
                    }
                  </div>
                )}
              </div>
            </div>
            {/* 竞价策略 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">竞价策略 <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: bidStrategy === 'stable_cost' ? '#1890ff' : '#e5e7eb', background: bidStrategy === 'stable_cost' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="bidStr" checked={bidStrategy === 'stable_cost'} onChange={() => setBidStrategy('stable_cost')} className="w-4 h-4 mr-2 text-blue-600" /><span>稳定成本</span>
                </label>
                <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: bidStrategy === 'max_conversion' ? '#1890ff' : '#e5e7eb', background: bidStrategy === 'max_conversion' ? '#eff6ff' : '#fff' }}>
                  <input type="radio" name="bidStr" checked={bidStrategy === 'max_conversion'} onChange={() => setBidStrategy('max_conversion')} className="w-4 h-4 mr-2 text-blue-600" /><span>最大转化</span>
                </label>
              </div>
            </div>
            {/* 日预算 + 出价 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">日预算（元） <span className="text-red-500">*</span></label>
                <input type="number" value={dailyBudget} onChange={e => setDailyBudget(e.target.value)} placeholder="如 500" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">出价（元） <span className="text-red-500">*</span></label>
                <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder="如 2.5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
            </div>
            {/* 投放时间 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">投放时间 <span className="text-red-500">*</span></label>
              <div className="flex-1">
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="dtMode" checked={deliveryTimeMode === 'long_term'} onChange={() => setDeliveryTimeMode('long_term')} className="mr-2" />从今天起长期投放</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="dtMode" checked={deliveryTimeMode === 'custom'} onChange={() => setDeliveryTimeMode('custom')} className="mr-2" />设置开始和结束日期</label>
                </div>
                {deliveryTimeMode === 'custom' && (
                  <div className="flex gap-3">
                    <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    <span className="self-center text-gray-400">至</span>
                    <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                )}
              </div>
            </div>
            {/* 投放时段 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">投放时段 <span className="text-red-500">*</span></label>
              <div className="flex-1">
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="dpMode" checked={deliveryPeriodMode === 'unlimited'} onChange={() => setDeliveryPeriodMode('unlimited')} className="mr-2" />不限</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="dpMode" checked={deliveryPeriodMode === 'specified'} onChange={() => setDeliveryPeriodMode('specified')} className="mr-2" />指定时间段</label>
                </div>
                {deliveryPeriodMode === 'specified' && <TimeGrid value={timeSlots} onChange={setTimeSlots} />}
              </div>
            </div>
            {/* 项目名称 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">项目名称 <span className="text-red-500">*</span></label>
              <DynamicNameInput value={projectName} onChange={setProjectName} placeholder="如 头条-{产品名称}-{日期}" />
            </div>
            {/* 定向配置 */}
            <div className="flex items-start gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0 pt-2">定向配置 <span className="text-red-500">*</span></label>
              <div className="flex-1">
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="tgtMode" checked={targetingMode === 'shared'} onChange={() => setTargetingMode('shared')} className="mr-2" />全账户共用</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="tgtMode" checked={targetingMode === 'per_account'} onChange={() => setTargetingMode('per_account')} className="mr-2" />分账户定制</label>
                </div>
                {targetingMode === 'shared' ? (
                  <div className="flex flex-wrap gap-2">
                    {MOCK.targetingPackages.map(pkg => {
                      const on = targetingShared.indexOf(pkg.id) >= 0;
                      return (
                        <span key={pkg.id} onClick={() => setTargetingShared(prev => prev.indexOf(pkg.id) >= 0 ? prev.filter(x => x !== pkg.id) : prev.concat([pkg.id]))}
                          className={on ? 'tag bg-blue-100 text-blue-800 cursor-pointer' : 'tag bg-gray-100 text-gray-600 cursor-pointer'}>
                          {pkg.name}（{pkg.region}）
                          {on && <button onClick={e => { e.stopPropagation(); setTargetingShared(prev => prev.filter(x => x !== pkg.id)); }}><i className="fas fa-times"></i></button>}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {selectedAccountIds.length === 0 ? <span className="text-sm text-gray-400">请先在基础配置选择账户</span> :
                      selectedAccountIds.map(accId => {
                        const acc = MOCK.accounts.find(a => a.id === accId);
                        const cur = targetingPerAccount[accId] || [];
                        return (
                          <div key={accId} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50">
                            <div className="text-xs font-semibold text-gray-900 truncate mb-2">{acc.name}</div>
                            <div className="flex flex-wrap gap-1.5">
                              {MOCK.targetingPackages.map(pkg => {
                                const on = cur.indexOf(pkg.id) >= 0;
                                return (
                                  <button key={pkg.id} onClick={() => togglePerAccountTargeting(accId, pkg.id)} className={on ? 'tag bg-blue-100 text-blue-800' : 'tag bg-white text-gray-600 border border-gray-300'}>{pkg.name}</button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                )}
              </div>
            </div>
            {/* 人群包配置 */}
            <div className="flex items-start gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0 pt-2">人群包配置 <span className="text-red-500">*</span></label>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <label className="flex items-center cursor-pointer"><input type="radio" name="audMode" checked={audienceMode === 'shared'} onChange={() => setAudienceMode('shared')} className="mr-2" />全账户共用</label>
                  <label className="flex items-center cursor-pointer"><input type="radio" name="audMode" checked={audienceMode === 'per_account'} onChange={() => setAudienceMode('per_account')} className="mr-2" />分账户定制</label>
                  <div className="ml-auto flex gap-2">
                    <button type="button" className="btn-secondary text-xs" onClick={refreshAudience}><i className="fas fa-sync-alt mr-1"></i>刷新人群包</button>
                    <button type="button" className="btn-secondary text-xs" onClick={syncAudience}><i className="fas fa-copy mr-1"></i>批量同步</button>
                  </div>
                </div>
                {audienceMode === 'shared' ? (
                  <div className="flex flex-col gap-2">
                    {MOCK.audiencePackages.map(pkg => {
                      const item = audienceShared.find(x => x.pkgId === pkg.id);
                      const on = !!item;
                      return (
                        <div key={pkg.id} className="flex items-center gap-3 p-2.5 border rounded-lg" style={{ borderColor: on ? '#1890ff' : '#e5e7eb', background: on ? '#eff6ff' : '#fff' }}>
                          <input type="checkbox" checked={on} onChange={() => toggleAudienceShared(pkg.id)} className="w-4 h-4 text-blue-600" />
                          <span className="text-sm flex-1">{pkg.name}</span>
                          {on && (
                            <select value={item.action} onChange={e => setAudienceAction(pkg.id, e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-xs">
                              <option value="target">定向</option>
                              <option value="exclude">排除</option>
                            </select>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {selectedAccountIds.length === 0 ? <span className="text-sm text-gray-400">请先在基础配置选择账户</span> :
                      selectedAccountIds.map(accId => {
                        const acc = MOCK.accounts.find(a => a.id === accId);
                        const cur = audiencePerAccount[accId] || [];
                        return (
                          <div key={accId} className="border border-gray-200 rounded-lg p-2.5 bg-gray-50">
                            <div className="text-xs font-semibold text-gray-900 truncate mb-2">{acc.name}</div>
                            <div className="flex flex-col gap-1.5">
                              {MOCK.audiencePackages.map(pkg => {
                                const item = cur.find(x => x.pkgId === pkg.id);
                                const on = !!item;
                                return (
                                  <div key={pkg.id} className="flex items-center gap-2">
                                    <input type="checkbox" checked={on} onChange={() => togglePerAccountAudience(accId, pkg.id)} className="w-3.5 h-3.5" />
                                    <span className="text-xs flex-1 truncate">{pkg.name}</span>
                                    {on && (
                                      <select value={item.action} onChange={e => setAudiencePerAccount(prev => { const arr = (prev[accId] || []).map(x => x.pkgId === pkg.id ? Object.assign({}, x, { action: e.target.value }) : x); return Object.assign({}, prev, { [accId]: arr }); })} className="px-1 py-0.5 border border-gray-300 rounded text-xs">
                                        <option value="target">定向</option>
                                        <option value="exclude">排除</option>
                                      </select>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== 3. 单元配置 ===== */}
        <div id="section-unit" className="">
          <div className="px-6 py-3.5 flex items-center gap-3 border-b border-gray-200">
            <span className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="text-base font-semibold text-gray-900">单元配置</h2>
            <span className="text-xs text-gray-400 ml-auto font-normal"><i className="fas fa-bullseye mr-1"></i>选择素材、文案与行动号召</span>
          </div>
          <div className="p-6">
            {/* 基础素材 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">基础素材 <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-3 flex-wrap">
                <button type="button" className="btn-primary" onClick={() => setShowMaterialModal(true)}>选择素材</button>
                <span className="text-sm text-gray-500">已选 {selectedMaterials.length} 个</span>
                <div className="flex flex-wrap gap-2">
                  {selectedMaterials.map(m => <span key={m.id} className="tag">{m.type === 'video' ? '🎬 ' : '🖼️ '}{m.name}</span>)}
                </div>
              </div>
            </div>
            {/* 文案素材 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">文案素材 <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-3 flex-wrap">
                <button type="button" className="btn-primary" onClick={() => setShowCopyModal(true)}>选择文案包</button>
                {selectedCopies.length > 0 ? <span className="tag">📝 已选 {selectedCopies.length} 条文案</span> : <span className="text-sm text-gray-400">未选择</span>}
              </div>
            </div>
            {/* 落地页 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">落地页</label>
              <div className="flex-1">
                {deliveryLinks.length === 0 ? (
                  <span className="text-sm text-gray-400">请先在基础配置选择账户</span>
                ) : (
                  <div className="text-sm text-green-600 break-all bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    {deliveryLinks[0].link}{selectedAccountIds.length > 1 ? '（已按所选 ' + selectedAccountIds.length + ' 个账户匹配）' : ''}
                  </div>
                )}
              </div>
            </div>
            {/* 产品信息 */}
            <div className="flex items-start gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0 pt-2">产品信息</label>
              <div className="flex-1">
                {currentProduct ? (
                  <div className="flex gap-4 items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="text-4xl">{currentProduct.image}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{currentProduct.name}</div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {currentProduct.sellingPoints.map((sp, i) => <span key={i} className="tag">✨ {sp}</span>)}
                      </div>
                    </div>
                  </div>
                ) : <span className="text-sm text-gray-400">请先在项目配置选择营销产品</span>}
              </div>
            </div>
            {/* 行动号召 */}
            <div className="flex items-start gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0 pt-2">行动号召</label>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <input type="text" value={ctaDraft} onChange={e => setCtaDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCta(); } }} placeholder="输入行动号召文案，回车添加（上限10条）" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  <button type="button" className="btn-secondary" onClick={addCta}>添加</button>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {ctaList.map((c, i) => (
                    <span key={i} className="tag bg-blue-50 text-gray-700">#{i + 1} {c}<button type="button" onClick={() => removeCta(i)} className="ml-1 text-red-500"><i className="fas fa-times"></i></button></span>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={smartGen} onChange={e => setSmartGen(e.target.checked)} />默认开启智能生成</label>
              </div>
            </div>
            {/* 来源 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">来源</label>
              <input type="text" value={sourceText} onChange={e => setSourceText(e.target.value)} placeholder="如 官网 / 活动落地页" className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            {/* 单元名称 */}
            <div className="flex items-center gap-3 mb-5">
              <label className="w-28 text-left text-sm font-medium text-gray-700 flex-shrink-0">单元名称 <span className="text-red-500">*</span></label>
              <DynamicNameInput value={unitName} onChange={setUnitName} placeholder="如 单元-{账户名称}-{序号}" />
            </div>
          </div>
        </div>

        {/* ===== 4. 运行配置 ===== */}
        <div id="section-run" className="">
          <div className="px-6 py-3.5 flex items-center gap-3 border-b border-gray-200">
            <span className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <h2 className="text-base font-semibold text-gray-900">运行配置</h2>
            <span className="text-xs text-gray-400 ml-auto font-normal"><i className="fas fa-play mr-1"></i>选择运行方式并提交搭建</span>
          </div>
          <div className="p-6">
            <div className="flex gap-3 mb-5">
              <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: runMode === 'immediate' ? '#1890ff' : '#e5e7eb', background: runMode === 'immediate' ? '#eff6ff' : '#fff' }}>
                <input type="radio" name="runMode" checked={runMode === 'immediate'} onChange={() => setRunMode('immediate')} className="w-4 h-4 mr-2 text-blue-600" /><span>立即运行</span>
              </label>
              <label className="flex items-center cursor-pointer px-4 py-2 border rounded-lg text-sm" style={{ borderColor: runMode === 'scheduled' ? '#1890ff' : '#e5e7eb', background: runMode === 'scheduled' ? '#eff6ff' : '#fff' }}>
                <input type="radio" name="runMode" checked={runMode === 'scheduled'} onChange={() => setRunMode('scheduled')} className="w-4 h-4 mr-2 text-blue-600" /><span>定时运行</span>
              </label>
            </div>
            {runMode === 'scheduled' && (
              <div className="flex gap-3 mb-5">
                <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            )}
            <button type="button" className="btn-primary w-full py-3 text-base" onClick={handleRun}>
              <i className="fas fa-play mr-2"></i>{runMode === 'immediate' ? '立即运行' : '提交定时任务'}
            </button>
          </div>
        </div>
      </div>

      {/* ===== 弹窗 ===== */}
      <MaterialModal
        show={showMaterialModal}
        onClose={() => setShowMaterialModal(false)}
        onConfirm={(mats) => { setSelectedMaterials(mats); setShowMaterialModal(false); }}
        onClear={() => setSelectedMaterials([])}
        selectedMaterials={selectedMaterials}
      />
      <CopyModal
        show={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        onConfirm={(copies) => { setSelectedCopies(copies); setShowCopyModal(false); }}
        selectedCopies={selectedCopies}
      />

      {/* 进度弹窗 */}
      {runModal && (
        <div className="modal-overlay" onClick={() => {}}>
          <div className="modal-content w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="text-base font-semibold mb-4">正在搭建…</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                <div className="bg-blue-500 h-2.5 rounded-full transition-all" style={{ width: runProgress + '%' }}></div>
              </div>
              <div className="text-sm text-gray-500 mb-4">{runProgress}%</div>
              <button onClick={goBackground} className="btn-secondary"><i className="fas fa-arrow-right mr-1.5"></i>转到后台运行</button>
              <p className="mt-3 text-xs text-gray-400">点击「转到后台运行」将跳回任务列表，搭建在后台继续</p>
            </div>
          </div>
        </div>
      )}

      {/* 结果弹窗 */}
      {runResult && (
        <div className="modal-overlay" onClick={() => {}}>
          <div className="modal-content w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-2">{runResult.status === '全部完成' ? '✅' : runResult.status === '部分完成' ? '⚠️' : '❌'}</div>
              <div className="text-base font-semibold mb-1">搭建{runResult.status}</div>
              <div className="text-sm text-gray-500 mb-4">共 {runResult.rows.length} 个账户，详见任务日志</div>
              <button onClick={confirmResult} className="btn-primary w-full">完成</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
