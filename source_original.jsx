    const { useState, useEffect } = React;

    // ==================== Mock 数据 ====================
    const MOCK_DATA = {
      products: [
        { id: 1, name: '运营商产品A', type: '运营商' },
        { id: 2, name: '运营商产品B', type: '运营商' },
      ],
      channels: [
        { id: 1, name: '微信视频号', type: '视频号' },
        { id: 2, name: '朋友圈', type: '社交' },
      ],
      accounts: [
        { 
          id: 1, 
          name: '账户A-运营商专线', 
          balance: 50000,
          kaboshiLink: 'https://kaboshi.com/accountA?click_id={{CLICK_ID}}&time={{TIMESTAMP}}'
        },
        { 
          id: 2, 
          name: '账户B-代理商', 
          balance: 120000,
          kaboshiLink: 'https://kaboshi.com/accountB?click_id={{CLICK_ID}}&time={{TIMESTAMP}}'
        },
        { 
          id: 3, 
          name: '账户C-直客', 
          balance: 80000,
          kaboshiLink: 'https://kaboshi.com/accountC?click_id={{CLICK_ID}}&time={{TIMESTAMP}}'
        },
      ],
      targetingPackages: [
        { 
          id: 1, 
          name: '一线城市-25-40岁-男性', 
          region: ['北京', '上海', '广州', '深圳'], 
          age: [25, 40], 
          gender: '男', 
          audience: '自定义人群A',
          excludeConverted: true 
        },
        { 
          id: 2, 
          name: '新一线城市-18-35岁-女性', 
          region: ['成都', '杭州', '武汉', '南京', '重庆'], 
          age: [18, 35], 
          gender: '女', 
          audience: '自定义人群B',
          excludeConverted: true 
        },
        { 
          id: 3, 
          name: '全国-30-50岁-不限', 
          region: ['全国'], 
          age: [30, 50], 
          gender: '不限', 
          audience: '',
          excludeConverted: false 
        },
        { 
          id: 4, 
          name: '珠三角-28-45岁-男性', 
          region: ['广州', '深圳', '佛山', '东莞'], 
          age: [28, 45], 
          gender: '男', 
          audience: '珠三角商务人群',
          excludeConverted: true 
        },
        { 
          id: 5, 
          name: '长三角-25-40岁-女性', 
          region: ['上海', '杭州', '苏州', '宁波'], 
          age: [25, 40], 
          gender: '女', 
          audience: '长三角白领人群',
          excludeConverted: true 
        },
      ],
      creativeLibrary: [
        { 
          id: 1, 
          name: '视频素材A-产品介绍', 
          type: 'video', 
          duration: '15s',
          thumbnail: 'https://via.placeholder.com/160x90/1890FF/FFFFFF?text=Video+A',
          stats7d: { views: 120000, clicks: 3500, conversions: 280, ctr: 2.9, cvr: 8.0 }, 
          stats30d: { views: 450000, clicks: 12000, conversions: 980, ctr: 2.7, cvr: 8.2 } 
        },
        { 
          id: 2, 
          name: '视频素材B-用户见证', 
          type: 'video', 
          duration: '30s',
          thumbnail: 'https://via.placeholder.com/160x90/52C41A/FFFFFF?text=Video+B',
          stats7d: { views: 98000, clicks: 2800, conversions: 210, ctr: 2.9, cvr: 7.5 }, 
          stats30d: { views: 380000, clicks: 10500, conversions: 850, ctr: 2.8, cvr: 8.1 } 
        },
        { 
          id: 3, 
          name: '视频素材C-优惠活动', 
          type: 'video', 
          duration: '20s',
          thumbnail: 'https://via.placeholder.com/160x90/FA8C16/FFFFFF?text=Video+C',
          stats7d: { views: 156000, clicks: 4200, conversions: 350, ctr: 2.7, cvr: 8.3 }, 
          stats30d: { views: 520000, clicks: 15000, conversions: 1200, ctr: 2.9, cvr: 8.0 } 
        },
        { 
          id: 4, 
          name: '视频素材D-功能演示', 
          type: 'video', 
          duration: '25s',
          thumbnail: 'https://via.placeholder.com/160x90/722ED1/FFFFFF?text=Video+D',
          stats7d: { views: 89000, clicks: 2100, conversions: 180, ctr: 2.4, cvr: 8.6 }, 
          stats30d: { views: 320000, clicks: 8900, conversions: 720, ctr: 2.8, cvr: 8.1 } 
        },
        { 
          id: 5, 
          name: '视频素材E-品牌故事', 
          type: 'video', 
          duration: '45s',
          thumbnail: 'https://via.placeholder.com/160x90/EB2F96/FFFFFF?text=Video+E',
          stats7d: { views: 203000, clicks: 5100, conversions: 420, ctr: 2.5, cvr: 8.2 }, 
          stats30d: { views: 680000, clicks: 18000, conversions: 1500, ctr: 2.6, cvr: 8.3 } 
        },
      ],
      copyLibrary: [
        { id: 1, content: '限时优惠！办理即享专属福利', stats7d: { ctr: 3.2, conversions: 180, impressions: 50000 } },
        { id: 2, content: '免费领取！运营商专属套餐', stats7d: { ctr: 4.1, conversions: 220, impressions: 45000 } },
        { id: 3, content: '一键办理，快速上门安装', stats7d: { ctr: 2.8, conversions: 150, impressions: 55000 } },
        { id: 4, content: '极速网络，畅享无限流量', stats7d: { ctr: 3.5, conversions: 195, impressions: 48000 } },
        { id: 5, content: '新老用户同享，优惠不容错过', stats7d: { ctr: 3.9, conversions: 205, impressions: 52000 } },
        { id: 6, content: '5G全覆盖，网速提升10倍', stats7d: { ctr: 4.3, conversions: 240, impressions: 42000 } },
      ],
    };

    // ==================== 主应用组件 ====================
    function App() {
      const [currentStep, setCurrentStep] = useState('selection');
      const [selectedProduct, setSelectedProduct] = useState(null);
      const [selectedChannel, setSelectedChannel] = useState(null);
      const [selectedAccounts, setSelectedAccounts] = useState([]);
      const [setups, setSetups] = useState([]);
      const [showPreview, setShowPreview] = useState(false);
      const [showAccountPicker, setShowAccountPicker] = useState(false);
      const [showTargetingPicker, setShowTargetingPicker] = useState(false);
      const [showCreativePicker, setShowCreativePicker] = useState(false);
      const [showCopyPicker, setShowCopyPicker] = useState(false);
      const [currentSetupId, setCurrentSetupId] = useState(null);
      const [statsPeriod, setStatsPeriod] = useState('7d');

      const addAccount = (account) => {
        if (!selectedAccounts.find(a => a.id === account.id)) {
          setSelectedAccounts([...selectedAccounts, account]);
        }
        setShowAccountPicker(false);
      };

      const removeAccount = (accountId) => {
        setSelectedAccounts(selectedAccounts.filter(a => a.id !== accountId));
      };

      const startSetup = () => {
        if (selectedAccounts.length === 0) {
          alert('请至少选择一个账户');
          return;
        }
        const newSetups = selectedAccounts.map(account => ({
          id: Date.now() + account.id,
          account,
          unit: {
            name: `${account.name}-${new Date().toLocaleDateString('zh-CN')}`,
            marketingGoal: '线索留资',
            product: selectedProduct,
            channel: selectedChannel,
            specificProduct: '',
            targeting: null,
            bidding: {
              bid: '',
              dataBoost: false,
              quickLaunch: false,
            },
          },
          creatives: [],
          currentCreative: {
            video: null,
            copy: '',
            landingPage: account.kaboshiLink,
            brandImage: '视频号',
            floatingCard: ''
          },
        }));
        setSetups(newSetups);
        setCurrentStep('setup');
      };

      const updateUnit = (setupId, field, value) => {
        setSetups(setups.map(s => 
          s.id === setupId ? { ...s, unit: { ...s.unit, [field]: value } } : s
        ));
      };

      const updateCreative = (setupId, field, value) => {
        setSetups(setups.map(s => 
          s.id === setupId ? { ...s, currentCreative: { ...s.currentCreative, [field]: value } } : s
        ));
      };

      const addCreative = (setupId) => {
        setSetups(setups.map(s => {
          if (s.id === setupId) {
            if (!s.currentCreative.video || !s.currentCreative.copy) {
              alert('请先选择视频素材和输入文案');
              return s;
            }
            const newCreative = { ...s.currentCreative, id: Date.now() };
            return { 
              ...s, 
              creatives: [...s.creatives, newCreative], 
              currentCreative: { 
                video: null, 
                copy: '', 
                landingPage: s.account.kaboshiLink, 
                brandImage: '视频号', 
                floatingCard: '' 
              } 
            };
          }
          return s;
        }));
      };

      return (
        <div className="app-container">
          {/* 顶部导航 */}
          <header className="header">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h1 className="text-3xl font-bold mb-2" style={{letterSpacing: '-0.5px'}}>
                  <i className="fas fa-bolt"></i> 腾讯广告快速搭建平台
                </h1>
                <p className="text-lg opacity-90" style={{fontWeight: '300'}}>面向投手的专业广告搭建体验环境</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-3 mb-2 justify-end">
                  <span className="badge badge-blue">
                    <i className="fas fa-users"></i>
                    已选择 {selectedAccounts.length} 个账户
                  </span>
                {setups.length > 0 && (
                  <span className="badge badge-green">
                    <i className="fas fa-check-circle"></i> 已配置 {setups.length} 个单元
                  </span>
                )}
                </div>
                <div className="text-sm opacity-75">快速验证 • 即时反馈 • 高效搭建</div>
              </div>
            </div>
          </header>

          {currentStep === 'selection' ? (
            <SelectionStep
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              selectedAccounts={selectedAccounts}
              addAccount={addAccount}
              removeAccount={removeAccount}
              startSetup={startSetup}
              showAccountPicker={showAccountPicker}
              setShowAccountPicker={setShowAccountPicker}
            />
          ) : (
            <SetupStep
              setups={setups}
              updateUnit={updateUnit}
              updateCreative={updateCreative}
              addCreative={addCreative}
              setCurrentStep={setCurrentStep}
              setShowPreview={setShowPreview}
              setShowTargetingPicker={setShowTargetingPicker}
              setShowCreativePicker={setShowCreativePicker}
              setShowCopyPicker={setShowCopyPicker}
              setCurrentSetupId={setCurrentSetupId}
            />
          )}

          {/* 各种弹窗 */}
          {showAccountPicker && (
            <AccountPicker
              accounts={MOCK_DATA.accounts}
              onSelect={addAccount}
              onClose={() => setShowAccountPicker(false)}
            />
          )}

          {showTargetingPicker && (
            <TargetingPicker
              packages={MOCK_DATA.targetingPackages}
              onSelect={(pkg) => { 
                updateUnit(currentSetupId, 'targeting', pkg); 
                setShowTargetingPicker(false); 
              }}
              onClose={() => setShowTargetingPicker(false)}
            />
          )}

          {showCreativePicker && (
            <CreativePicker
              library={MOCK_DATA.creativeLibrary}
              statsPeriod={statsPeriod}
              onSelect={(video) => { 
                updateCreative(currentSetupId, 'video', video); 
                setShowCreativePicker(false); 
              }}
              onClose={() => setShowCreativePicker(false)}
            />
          )}

          {showCopyPicker && (
            <CopyPicker
              library={MOCK_DATA.copyLibrary}
              onSelect={(copy) => { 
                updateCreative(currentSetupId, 'copy', copy.content); 
                setShowCopyPicker(false); 
              }}
              onClose={() => setShowCopyPicker(false)}
            />
          )}

          {showPreview && (
            <PreviewModal 
              setups={setups}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      );
    }

    // ==================== 步骤1: 选择配置 ====================
    function SelectionStep({ 
      selectedProduct, 
      setSelectedProduct, 
      selectedChannel, 
      setSelectedChannel, 
      selectedAccounts, 
      addAccount, 
      removeAccount, 
      startSetup,
      showAccountPicker,
      setShowAccountPicker 
    }) {
      return (
        <div className="space-y-8">
          <div className="card p-8">
            <h2 className="section-title">
              <i className="fas fa-sliders-h text-primary"></i>
              基础配置选择
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* 产品选择 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-box text-primary mr-2"></i>
                  选择推广产品
                </label>
                <div className="space-y-3">
                  {MOCK_DATA.products.map(product => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedProduct?.id === product.id 
                          ? 'border-primary bg-gradient-to-br from-blue-50 to-blue-100 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{product.type}</div>
                      {selectedProduct?.id === product.id && (
                        <div className="mt-2 text-primary text-sm">
                          <i className="fas fa-check-circle"></i> 已选择
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 渠道选择 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-bullhorn text-primary mr-2"></i>
                  选择投放渠道
                </label>
                <div className="space-y-3">
                  {MOCK_DATA.channels.map(channel => (
                    <div
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedChannel?.id === channel.id 
                          ? 'border-primary bg-gradient-to-br from-blue-50 to-blue-100 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="font-semibold text-gray-800">{channel.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{channel.type}</div>
                      {selectedChannel?.id === channel.id && (
                        <div className="mt-2 text-primary text-sm">
                          <i className="fas fa-check-circle"></i> 已选择
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 账户选择 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-user-circle text-primary mr-2"></i>
                  选择投放账户
                </label>
                <button 
                  onClick={() => setShowAccountPicker(true)} 
                  className="btn btn-primary w-full mb-4"
                  style={{justifyContent: 'center'}}
                >
                  <i className="fas fa-plus"></i> 添加投放账户
                </button>
                
                {selectedAccounts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedAccounts.map(account => (
                      <div key={account.id} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-800">{account.name}</span>
                          <button 
                            onClick={() => removeAccount(account.id)} 
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="移除账户"
                          >
                            <i className="fas fa-times-circle"></i>
                          </button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            <i className="fas fa-wallet text-green-600 mr-1"></i>
                            余额: ¥{account.balance.toLocaleString()}
                          </span>
                          <span className="badge badge-green" style={{fontSize: '10px'}}>
                            <i className="fas fa-link"></i> 卡博士已绑定
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <i className="fas fa-inbox text-4xl mb-3"></i>
                    <div>暂未选择账户</div>
                    <div className="text-sm mt-1">点击上方按钮添加账户</div>
                  </div>
                )}
              </div>
            </div>

            {/* 开始搭建按钮 */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <button
                onClick={startSetup}
                disabled={!selectedProduct || !selectedChannel || selectedAccounts.length === 0}
                className="btn btn-success text-lg px-16 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-rocket"></i> 开始搭建广告
              </button>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-700 mb-4">
              <i className="fas fa-info-circle text-primary mr-2"></i>
              使用说明
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-primary font-bold mb-2">
                  <i className="fas fa-1"></i> 选择配置
                </div>
                <div className="text-sm text-gray-600">选择产品、渠道和账户，为搭建做准备</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-primary font-bold mb-2">
                  <i className="fas fa-2"></i> 配置单元
                </div>
                <div className="text-sm text-gray-600">设置营销单元参数和定向包</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-primary font-bold mb-2">
                  <i className="fas fa-3"></i> 添加创意
                </div>
                <div className="text-sm text-gray-600">为每个单元添加视频、文案和落地页</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ==================== 账户选择器 ====================
    function AccountPicker({ accounts, onSelect, onClose }) {
      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content w-[480px]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-user-plus text-primary mr-2"></i>
                选择投放账户
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="space-y-3">
              {accounts.map(account => (
                <div
                  key={account.id}
                  onClick={() => onSelect(account)}
                  className="p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-800">{account.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        <i className="fas fa-coins text-yellow-500 mr-1"></i>
                        余额: ¥{account.balance.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-primary">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==================== 步骤2: 广告搭建 ====================
    function SetupStep({ 
      setups, 
      updateUnit, 
      updateCreative, 
      addCreative, 
      setCurrentStep,
      setShowPreview,
      setShowTargetingPicker,
      setShowCreativePicker,
      setShowCopyPicker,
      setCurrentSetupId 
    }) {
      return (
        <div className="space-y-8">
          {/* 顶部操作栏 */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setCurrentStep('selection')} 
              className="btn btn-secondary"
            >
              <i className="fas fa-arrow-left"></i> 返回重新选择
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                共 {setups.length} 个账户待配置
              </span>
              <button 
                onClick={() => setShowPreview(true)} 
                className="btn btn-primary"
              >
                <i className="fas fa-eye"></i> 生成配置预览
              </button>
            </div>
          </div>

          {/* 多账户搭建卡片 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {setups.map(setup => (
              <SetupCard
                key={setup.id}
                setup={setup}
                updateUnit={(field, value) => updateUnit(setup.id, field, value)}
                updateCreative={(field, value) => updateCreative(setup.id, field, value)}
                addCreative={() => addCreative(setup.id)}
                onPickTargeting={() => { 
                  setCurrentSetupId(setup.id); 
                  setShowTargetingPicker(true); 
                }}
                onPickCreative={() => { 
                  setCurrentSetupId(setup.id); 
                  setShowCreativePicker(true); 
                }}
                onPickCopy={() => { 
                  setCurrentSetupId(setup.id); 
                  setShowCopyPicker(true); 
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    // ==================== 搭建卡片 ====================
    function SetupCard({ 
      setup, 
      updateUnit, 
      updateCreative, 
      addCreative, 
      onPickTargeting, 
      onPickCreative, 
      onPickCopy 
    }) {
      const [activeTab, setActiveTab] = useState('unit');

      const progressPercentage = setup.unit.targeting ? 50 : 25;
      const creativeCount = setup.creatives.length;

      return (
        <div className="card overflow-hidden">
          {/* 账户信息头部 */}
          <div className="account-card-header">
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl mb-1">{setup.account.name}</h3>
                  <div className="flex items-center gap-3 text-sm opacity-90">
                    <span>
                      <i className="fas fa-wallet mr-1"></i>
                      ¥{setup.account.balance.toLocaleString()}
                    </span>
                    <span className="badge badge-green" style={{fontSize: '10px', background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                      <i className="fas fa-link"></i> 卡博士已绑定
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{progressPercentage}%</div>
                  <div className="text-xs opacity-75">完成进度</div>
                </div>
              </div>
              
              {/* 进度条 */}
              <div className="mt-4 bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{width: `${progressPercentage}%`}}
                ></div>
              </div>
            </div>
          </div>

          {/* Tab切换 */}
          <div className="flex bg-gray-50 border-b">
            <button
              onClick={() => setActiveTab('unit')}
              className={`tab-button flex-1 ${activeTab === 'unit' ? 'active' : ''}`}
            >
              <i className="fas fa-cog mr-2"></i>
              营销单元设置
            </button>
            <button
              onClick={() => setActiveTab('creative')}
              className={`tab-button flex-1 ${activeTab === 'creative' ? 'active' : ''}`}
            >
              <i className="fas fa-film mr-2"></i>
              创意设置 ({creativeCount}/100)
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'unit' ? (
              <UnitSettings 
                unit={setup.unit} 
                updateUnit={updateUnit} 
                onPickTargeting={onPickTargeting}
              />
            ) : (
              <CreativeSettings
                currentCreative={setup.currentCreative}
                creatives={setup.creatives}
                updateCreative={updateCreative}
                addCreative={addCreative}
                onPickCreative={onPickCreative}
                onPickCopy={onPickCopy}
                kaboshiLink={setup.account.kaboshiLink}
              />
            )}
          </div>
        </div>
      );
    }

    // ==================== 营销单元设置 ====================
    function UnitSettings({ unit, updateUnit, onPickTargeting }) {
      return (
        <div className="space-y-6">
          {/* 基础信息 */}
          <div className="config-section">
            <h4>
              <i className="fas fa-info-circle mr-2"></i>
              基础信息
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">营销目的</label>
                  <input value="线索留资" disabled className="input-field bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">推广产品</label>
                  <input value="运营商产品" disabled className="input-field bg-gray-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">具体产品</label>
                  <input
                    value={unit.specificProduct}
                    onChange={e => updateUnit('specificProduct', e.target.value)}
                    placeholder="输入具体产品名称，如：5G畅享套餐"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">营销载体</label>
                  <input value="页面跳转" disabled className="input-field bg-gray-50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">转化</label>
                  <input value="数据源上报" disabled className="input-field bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">投放版位</label>
                  <input value="微信视频号" disabled className="input-field bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">版位定投场景</label>
                <input value="视频号信息流-视频号入口" disabled className="input-field bg-gray-50" />
              </div>
            </div>
          </div>

          {/* 定向配置 */}
          <div className="config-section">
            <h4>
              <i className="fas fa-crosshairs mr-2"></i>
              定向配置
            </h4>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">
                  <i className="fas fa-bullseye text-primary mr-2"></i>
                  定向包
                </span>
                <button 
                  onClick={onPickTargeting} 
                  className="btn btn-primary"
                  style={{padding: '8px 16px', fontSize: '13px'}}
                >
                  <i className="fas fa-folder-open mr-2"></i> 选择定向包
                </button>
              </div>
              
              {unit.targeting ? (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
                  <div className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-check-circle text-green-600 mr-2"></i>
                    {unit.targeting.name}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                    <div>
                      <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                      地域: {unit.targeting.region.join(', ')}
                    </div>
                    <div>
                      <i className="fas fa-birthday-cake text-purple-500 mr-2"></i>
                      年龄: {unit.targeting.age[0]}-{unit.targeting.age[1]}岁
                    </div>
                    <div>
                      <i className="fas fa-venus-mars text-pink-500 mr-2"></i>
                      性别: {unit.targeting.gender}
                    </div>
                    {unit.targeting.audience && (
                      <div>
                        <i className="fas fa-users text-blue-500 mr-2"></i>
                        人群: {unit.targeting.audience}
                      </div>
                    )}
                  </div>
                  {unit.targeting.excludeConverted && (
                    <div className="mt-3 text-sm text-green-600">
                      <i className="fas fa-shield-alt mr-2"></i>
                      已开启排除已转化人群
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <i className="fas fa-folder-open text-3xl mb-3"></i>
                  <div>未选择定向包</div>
                  <div className="text-sm mt-1">点击上方按钮从定向库选择</div>
                </div>
              )}
            </div>
          </div>

          {/* 出价与预算 */}
          <div className="config-section">
            <h4>
              <i className="fas fa-dollar-sign mr-2"></i>
              出价与预算
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">计费方式</label>
                  <input value="oCPM" disabled className="input-field bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">出价场景</label>
                  <input value="常规投放" disabled className="input-field bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">出价设定 (¥)</label>
                  <input
                    type="number"
                    value={unit.bidding.bid}
                    onChange={e => updateUnit('bidding', { ...unit.bidding, bid: e.target.value })}
                    placeholder="如：50"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`dataBoost-${unit.name}`}
                      checked={unit.bidding.dataBoost}
                      onChange={e => updateUnit('bidding', { ...unit.bidding, dataBoost: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <label htmlFor={`dataBoost-${unit.name}`} className="text-sm font-medium text-gray-700">
                      一方数据跑量加强
                    </label>
                  </div>
                  <span className={`badge ${unit.bidding.dataBoost ? 'badge-green' : 'bg-gray-200 text-gray-600'}`}>
                    {unit.bidding.dataBoost ? '已开启' : '已关闭'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`quickLaunch-${unit.name}`}
                      checked={unit.bidding.quickLaunch}
                      onChange={e => updateUnit('bidding', { ...unit.bidding, quickLaunch: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <label htmlFor={`quickLaunch-${unit.name}`} className="text-sm font-medium text-gray-700">
                      一键起量
                    </label>
                  </div>
                  <span className={`badge ${unit.bidding.quickLaunch ? 'badge-green' : 'bg-gray-200 text-gray-600'}`}>
                    {unit.bidding.quickLaunch ? '已开启' : '已关闭'}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-600 mb-2">营销单元日预算</label>
                  <input value="不限" disabled className="input-field bg-gray-50" />
                </div>
              </div>
            </div>
          </div>

          {/* 投放设置 */}
          <div className="config-section">
            <h4>
              <i className="fas fa-calendar-alt mr-2"></i>
              投放设置
            </h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">投放日期</label>
                  <input value="从创建日开始长期投放" disabled className="input-field bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">投放时段</label>
                  <input value="全天" disabled className="input-field bg-gray-50" />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`startTime-${unit.name}`}
                  checked={unit.delivery?.startTime || false}
                  onChange={e => updateUnit('delivery', { ...unit.delivery, startTime: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor={`startTime-${unit.name}`} className="text-sm font-medium text-gray-700">
                  首日开始时间
                </label>
              </div>
            </div>
          </div>

          {/* 单元名称 */}
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              <i className="fas fa-tag mr-2"></i>
              营销单元名称
            </label>
            <input
              value={unit.name}
              onChange={e => updateUnit('name', e.target.value)}
              className="input-field font-semibold"
            />
          </div>
        </div>
      );
    }

    // ==================== 创意设置 ====================
    function CreativeSettings({ 
      currentCreative, 
      creatives, 
      updateCreative, 
      addCreative, 
      onPickCreative, 
      onPickCopy,
      kaboshiLink 
    }) {
      return (
        <div className="space-y-6">
          {/* 创意增强 */}
          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
            <input type="checkbox" className="w-5 h-5" />
            <label className="text-sm font-medium text-gray-700">
              创意增强 Max（智能优化创意组合）
            </label>
          </div>

          {/* 视频素材 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="fas fa-video text-primary mr-2"></i>
              视频素材
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
              {currentCreative.video ? (
                <div>
                  <div className="mb-3">
                    <i className="fas fa-video text-4xl text-primary"></i>
                  </div>
                  <div className="font-semibold text-gray-800">{currentCreative.video.name}</div>
                  <div className="text-sm text-gray-500 mt-1">时长: {currentCreative.video.duration}</div>
                  <button 
                    onClick={() => updateCreative('video', null)} 
                    className="mt-4 text-red-500 text-sm hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> 删除视频
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-3">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                  </div>
                  <button 
                    onClick={onPickCreative} 
                    className="btn btn-primary"
                    style={{padding: '10px 20px', fontSize: '13px'}}
                  >
                    <i className="fas fa-folder-open mr-2"></i> 从创意库选择
                  </button>
                  <div className="text-sm text-gray-400 mt-2">或拖拽上传新视频</div>
                </div>
              )}
            </div>
          </div>

          {/* 文案 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="fas fa-font text-primary mr-2"></i>
              广告文案
            </label>
            <textarea
              value={currentCreative.copy}
              onChange={e => updateCreative('copy', e.target.value)}
              placeholder="输入吸引人的广告文案，或从轻语文库选择..."
              className="input-field h-24 resize-none"
            />
            <button 
              onClick={onPickCopy} 
              className="mt-2 text-primary text-sm hover:underline"
            >
              <i className="fas fa-book mr-1"></i> 从轻语文库选择
            </button>
          </div>

          {/* 落地页 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="fas fa-external-link-alt text-primary mr-2"></i>
              落地页（卡博士链接）
            </label>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-green-800">
                  <i className="fas fa-link mr-2"></i>
                  预设链接（与账户自动绑定）
                </span>
                <span className="badge badge-green">
                  <i className="fas fa-check-circle"></i> 自动填充
                </span>
              </div>
              <div className="font-mono text-sm text-green-700 bg-white bg-opacity-50 p-2 rounded">
                {kaboshiLink}
              </div>
            </div>
            <input
              value={currentCreative.landingPage || kaboshiLink}
              onChange={e => updateCreative('landingPage', e.target.value)}
              className="input-field font-mono text-sm"
              readOnly
              title="此链接为账户预设值，系统自动填充，无需修改"
            />
            <p className="text-xs text-gray-400 mt-2">
              <i className="fas fa-info-circle mr-1"></i>
              链接已根据账户自动绑定，包含宏参数配置
            </p>
          </div>

          {/* 品牌形象 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="fas fa-image text-primary mr-2"></i>
              品牌形象
            </label>
            <select
              value={currentCreative.brandImage}
              onChange={e => updateCreative('brandImage', e.target.value)}
              className="select-field"
            >
              <option value="视频号">视频号</option>
              <option value="公众号">公众号</option>
              <option value="小程序">小程序</option>
            </select>
          </div>

          {/* 营销组件 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <i className="fas fa-layer-group text-primary mr-2"></i>
              营销组件（浮层卡片）
            </label>
            <input
              value={currentCreative.floatingCard}
              onChange={e => updateCreative('floatingCard', e.target.value)}
              placeholder="输入浮层卡片显示内容，如：立即咨询"
              className="input-field"
            />
          </div>

          {/* 添加创意按钮 */}
          <button
            onClick={addCreative}
            disabled={!currentCreative.video || !currentCreative.copy}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            style={{padding: '14px'}}
          >
            <i className="fas fa-plus-circle"></i> 
            添加创意到列表 ({creatives.length}/100)
          </button>

          {/* 已添加的创意列表 */}
          {creatives.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-4">
                <i className="fas fa-list mr-2"></i>
                已添加的创意 ({creatives.length})
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {creatives.map((creative, index) => (
                  <div key={creative.id} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 mb-2">
                          <i className="fas fa-ad text-primary mr-2"></i>
                          创意 {index + 1}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>
                            <i className="fas fa-video text-blue-500 mr-2"></i>
                            {creative.video?.name}
                          </div>
                          <div>
                            <i className="fas fa-quote-left text-green-500 mr-2"></i>
                            {creative.copy.substring(0, 40)}...
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-blue" style={{fontSize: '10px'}}>
                        就绪
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // ==================== 定向包选择器 ====================
    function TargetingPicker({ packages, onSelect, onClose }) {
      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content w-[680px]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-bullseye text-primary mr-2"></i>
                选择定向包
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {packages.map(pkg => (
                <div
                  key={pkg.id}
                  onClick={() => onSelect(pkg)}
                  className="p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-gray-800 text-lg">{pkg.name}</div>
                    <div className="text-primary">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-red-500 mr-2 w-5"></i>
                      <span>地域: {pkg.region.join(', ')}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-birthday-cake text-purple-500 mr-2 w-5"></i>
                      <span>年龄: {pkg.age[0]}-{pkg.age[1]}岁</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-venus-mars text-pink-500 mr-2 w-5"></i>
                      <span>性别: {pkg.gender}</span>
                    </div>
                    {pkg.audience && (
                      <div className="flex items-center">
                        <i className="fas fa-users text-blue-500 mr-2 w-5"></i>
                        <span>人群: {pkg.audience}</span>
                      </div>
                    )}
                  </div>

                  {pkg.excludeConverted && (
                    <div className="bg-green-50 text-green-700 text-sm p-2 rounded-lg">
                      <i className="fas fa-shield-alt mr-2"></i>
                      已开启排除已转化人群
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==================== 创意库选择器 ====================
    function CreativePicker({ library, onSelect, onClose }) {
      const [showStats, setShowStats] = useState('7d');

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content w-[900px]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-film text-primary mr-2"></i>
                创意库
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setShowStats('7d')}
                    className={`px-4 py-2 rounded ${showStats === '7d' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
                    style={{fontSize: '13px', fontWeight: '600'}}
                  >
                    近7天
                  </button>
                  <button
                    onClick={() => setShowStats('30d')}
                    className={`px-4 py-2 rounded ${showStats === '30d' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
                    style={{fontSize: '13px', fontWeight: '600'}}
                  >
                    近30天
                  </button>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {library.map(item => (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-lg mb-2">{item.name}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>
                          <i className="fas fa-clock text-gray-400 mr-1"></i>
                          时长: {item.duration}
                        </span>
                        <span className="badge badge-blue">
                          <i className="fas fa-chart-line mr-1"></i>
                          {showStats === '7d' ? '近7天数据' : '近30天数据'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="stats-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
                        <div className="stat-item">
                          <div className="stat-value">
                            {showStats === '7d' 
                              ? (item.stats7d.views / 1000).toFixed(1) + 'K'
                              : (item.stats30d.views / 1000).toFixed(0) + 'K'
                            }
                          </div>
                          <div className="stat-label">曝光</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">
                            {showStats === '7d' 
                              ? item.stats7d.ctr + '%'
                              : item.stats30d.ctr + '%'
                            }
                          </div>
                          <div className="stat-label">CTR</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">
                            {showStats === '7d' 
                              ? item.stats7d.conversions
                              : item.stats30d.conversions
                            }
                          </div>
                          <div className="stat-label">转化</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==================== 文案库选择器 ====================
    function CopyPicker({ library, onSelect, onClose }) {
      const [sortBy, setSortBy] = useState('ctr');

      const sortedLibrary = [...library].sort((a, b) => {
        if (sortBy === 'ctr') return b.stats7d.ctr - a.stats7d.ctr;
        if (sortBy === 'conversions') return b.stats7d.conversions - a.stats7d.conversions;
        return 0;
      });

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content w-[680px]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                <i className="fas fa-font text-primary mr-2"></i>
                文案库
              </h3>
              <div className="flex items-center gap-3">
                <select 
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                  className="select-field"
                  style={{width: 'auto', padding: '8px 12px'}}
                >
                  <option value="ctr">按CTR排序</option>
                  <option value="conversions">按转化排序</option>
                </select>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {sortedLibrary.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-2" style={{fontSize: '16px'}}>
                        "{item.content}"
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="badge badge-blue">
                          排名 #{index + 1}
                        </span>
                        <span>
                          <i className="fas fa-chart-line text-green-500 mr-1"></i>
                          近7天 CTR: {item.stats7d.ctr}%
                        </span>
                        <span>
                          <i className="fas fa-bullseye text-red-500 mr-1"></i>
                          转化: {item.stats7d.conversions}
                        </span>
                      </div>
                    </div>
                    <div className="text-primary ml-4">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ==================== 预览弹窗 ====================
    function PreviewModal({ setups, onClose }) {
      const [generatedConfig, setGeneratedConfig] = useState(null);
      const [copied, setCopied] = useState(false);

      useEffect(() => {
        const config = setups.map(setup => ({
          账户: setup.account.name,
          营销单元: {
            名称: setup.unit.name,
            产品: setup.unit.product?.name || '未设置',
            具体产品: setup.unit.specificProduct || '未填写',
            定向包: setup.unit.targeting?.name || '未设置',
            出价: setup.unit.bidding.bid ? `¥${setup.unit.bidding.bid}` : '未设置',
            日预算: '不限',
          },
          创意数量: setup.creatives.length,
          创意列表: setup.creatives.map((c, i) => ({
            序号: i + 1,
            视频: c.video?.name || '未设置',
            文案: c.copy || '未设置',
            落地页: c.landingPage || '未设置',
          })),
        }));
        setGeneratedConfig(config);
      }, []);

      const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(generatedConfig, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      const handleDownload = () => {
        const blob = new Blob([JSON.stringify(generatedConfig, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ad-config-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };

      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content w-[1000px]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                <i className="fas fa-eye text-primary mr-2"></i>
                配置预览
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            {generatedConfig && (
              <div className="space-y-6">
                {/* 配置概览 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-800 mb-4">
                    <i className="fas fa-clipboard-check text-primary mr-2"></i>
                    配置概览
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-primary">{setups.length}</div>
                      <div className="text-sm text-gray-600">投放单元</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-green-600">
                        {setups.reduce((sum, s) => sum + s.creatives.length, 0)}
                      </div>
                      <div className="text-sm text-gray-600">总创意数</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-purple-600">
                        ¥{setups.reduce((sum, s) => sum + s.account.balance, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">总余额</div>
                    </div>
                  </div>
                </div>

                {/* JSON配置 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-700">
                      <i className="fas fa-code mr-2"></i>
                      JSON 配置
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className={`btn ${copied ? 'btn-success' : 'btn-secondary'}`}
                        style={{padding: '8px 16px', fontSize: '13px'}}
                      >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-2`}></i>
                        {copied ? '已复制' : '复制配置'}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="btn btn-secondary"
                        style={{padding: '8px 16px', fontSize: '13px'}}
                      >
                        <i className="fas fa-download mr-2"></i>
                        下载JSON
                      </button>
                    </div>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto text-sm font-mono" style={{maxHeight: '400px'}}>
                    {JSON.stringify(generatedConfig, null, 2)}
                  </pre>
                </div>

                {/* 验证要点 */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-800 mb-3">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    验证要点
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                      <span>检查每个账户的单元配置是否完整</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                      <span>确认定向包设置是否符合投放策略</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                      <span>验证创意数量和素材质量</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                      <span>检查落地页宏参数格式是否正确</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            <button onClick={onClose} className="btn btn-secondary w-full mt-6" style={{padding: '12px'}}>
              <i className="fas fa-times mr-2"></i>
              关闭预览
            </button>
          </div>
        </div>
      );
    }

    // ==================== 渲染应用 ====================
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
