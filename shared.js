// 共享 UI 组件库：由广点通表单 source_33a3c4b.jsx 逐字抽取
// 两个表单（广点通 / 头条）共用同一套实现，确保交互与样式一致
// React 由父页 react.production.min.js 注入（全局），组件内用 React.useState 等
// 用 IIFE 包裹：组件定义为局部，仅把 window.UI 暴露到全局，
// 避免与两个 app 脚本中 `const { Notification, ... } = window.UI` 的全局词法声明冲突。
(function () {
  function Notification({
    msg,
    type,
    onClose
  }) {
    React.useEffect(() => {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }, [onClose]);
    const bg = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';
    return /*#__PURE__*/React.createElement("div", {
      className: `fixed left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-2xl text-white ${bg} max-w-sm text-center`,
      style: {
        top: '4rem',
        zIndex: 10000
      }
    }, msg);
  }
  function MaterialModal({
    show,
    onClose,
    onConfirm,
    onClear,
    selectedMaterials,
    accountId
  }) {
    const [activeTab, setActiveTab] = React.useState('video'); // 'video' | 'image'
    const [dateStart, setDateStart] = React.useState(() => {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      return d.toISOString().slice(0, 10);
    });
    const [dateEnd, setDateEnd] = React.useState(() => new Date().toISOString().slice(0, 10));
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(50);
    const [localSelected, setLocalSelected] = React.useState(selectedMaterials.map(m => m.id));
    const [selectMode, setSelectMode] = React.useState('none'); // 'none' | 'current_page' | 'custom'
    const [customSelectCount, setCustomSelectCount] = React.useState(10);
    React.useEffect(() => {
      if (show) {
        setLocalSelected(selectedMaterials.map(m => m.id));
        setPage(1);
      }
    }, [show, selectedMaterials]);

    // 时间范围限制：最多1个月
    const handleDateStartChange = val => {
      const end = new Date(dateEnd);
      const start = new Date(val);
      const diffDays = Math.abs((end - start) / (1000 * 60 * 60 * 24));
      if (diffDays > 31) {
        alert('时间跨度不能超过1个月');
        return;
      }
      setDateStart(val);
      setPage(1);
    };
    const handleDateEndChange = val => {
      const end = new Date(val);
      const start = new Date(dateStart);
      const diffDays = Math.abs((end - start) / (1000 * 60 * 60 * 24));
      if (diffDays > 31) {
        alert('时间跨度不能超过1个月');
        return;
      }
      setDateEnd(val);
      setPage(1);
    };
    const allMaterials = activeTab === 'video' ? MOCK.videoMaterials : MOCK.imageMaterials;

    // 过滤+排序（按上传时间倒序）
    const filtered = [...allMaterials].sort((a, b) => {
      const idxA = parseInt(a.id.replace(/^\D+/g, ''));
      const idxB = parseInt(b.id.replace(/^\D+/g, ''));
      return idxB - idxA; // 最新优先
    });

    // 按上传时间筛选
    const dateFiltered = filtered.filter(m => {
      const idx = parseInt(m.id.replace(/^\D+/g, ''));
      // 模拟：id索引越大越新，假设每天10个素材
      const dayFromStart = Math.floor(idx / 10);
      const startDay = 0; // 第一天
      const endDay = 50; // 共50天数据
      const startIdx = Math.max(0, Math.min(50, parseInt(dateStart.slice(-2))));
      const endIdx = Math.max(0, Math.min(50, parseInt(dateEnd.slice(-2))));
      // 简化模拟：用素材id的数值范围来模拟时间筛选
      return true; // 不做实际过滤，仅模拟
    });

    // 使用过滤后的数据
    const displayData = dateFiltered;
    const totalPages = Math.ceil(displayData.length / perPage);
    const paged = displayData.slice((page - 1) * perPage, page * perPage);

    // 选择模式变更时执行选择

    const handleModeChange = mode => {
      if (selectMode === mode) {
        setSelectMode('none');
        return;
      }
      setSelectMode(mode);
      if (mode === 'current_page') {
        const currentPageIds = paged.map(m => m.id);
        const newSelected = [...new Set([...localSelected, ...currentPageIds])];
        if (newSelected.length <= 500) {
          setLocalSelected(newSelected);
        }
      } else if (mode === 'custom') {
        doCustomSelect(customSelectCount);
      }
    };
    const doCustomSelect = count => {
      const n = Math.min(count, 500);
      const allFiltered = displayData;
      const newSelected = [...new Set(allFiltered.slice(0, n).map(m => m.id))];
      if (newSelected.length <= 500) {
        setLocalSelected(newSelected);
      }
    };

    // 自定义选择数量变化时自动重选
    React.useEffect(() => {
      if (selectMode === 'custom') {
        doCustomSelect(customSelectCount);
      }
    }, [customSelectCount]);
    const toggleSelect = id => {
      if (localSelected.includes(id)) {
        setLocalSelected(localSelected.filter(s => s !== id));
      } else {
        if (localSelected.length >= 500) {
          alert('最多选择500个素材');
          return;
        }
        setLocalSelected([...localSelected, id]);
      }
    };
    const handleConfirm = () => {
      const all = [...MOCK.videoMaterials, ...MOCK.imageMaterials];
      const result = localSelected.map(id => all.find(m => m.id === id)).filter(Boolean);
      onConfirm(result);
      onClose();
    };
    if (!show) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content w-full max-w-6xl",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between p-4 border-b"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold"
    }, "选择素材（已选 ", localSelected.length, "/500）"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      className: "text-gray-400 hover:text-gray-600"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 border-b bg-gray-50 flex flex-wrap items-center gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex rounded-lg overflow-hidden border border-gray-300"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setActiveTab('video');
        setPage(1);
      },
      className: `px-4 py-2 text-sm ${activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`
    }, "🎬 视频素材"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setActiveTab('image');
        setPage(1);
      },
      className: `px-4 py-2 text-sm ${activeTab === 'image' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`
    }, "🖼️ 图片素材")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-600"
    }, "上传时间："), /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: dateStart,
      onChange: e => handleDateStartChange(e.target.value),
      className: "px-2 py-1 border border-gray-300 rounded text-sm"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-400"
    }, "至"), /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: dateEnd,
      onChange: e => handleDateEndChange(e.target.value),
      className: "px-2 py-1 border border-gray-300 rounded text-sm"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-2xs text-gray-400"
    }, "跨度不超过1个月")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4 ml-auto"
    }, /*#__PURE__*/React.createElement("label", {
      className: "flex items-center cursor-pointer gap-1.5"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "select_mode",
      checked: selectMode === 'current_page',
      onChange: () => handleModeChange('current_page'),
      className: "w-3.5 h-3.5 text-blue-600"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-700"
    }, "选择当前页面")), /*#__PURE__*/React.createElement("label", {
      className: "flex items-center cursor-pointer gap-1.5"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "select_mode",
      checked: selectMode === 'custom',
      onChange: () => handleModeChange('custom'),
      className: "w-3.5 h-3.5 text-blue-600"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-700"
    }, "自定义选择")), selectMode === 'custom' && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 ml-1 animate-fadeIn"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-600"
    }, "选择前"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "1",
      max: "500",
      value: customSelectCount,
      onChange: e => setCustomSelectCount(Math.min(500, Math.max(1, parseInt(e.target.value) || 1))),
      className: "w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-600"
    }, "个")))), /*#__PURE__*/React.createElement("div", {
      className: "px-4 py-2 border-b flex items-center justify-between text-sm text-gray-600"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-4"
    }, /*#__PURE__*/React.createElement("span", null, "共 ", displayData.length, " 个", activeTab === 'video' ? '视频' : '图片', "素材"), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement("span", null, "每页"), /*#__PURE__*/React.createElement("select", {
      value: perPage,
      onChange: e => {
        setPerPage(parseInt(e.target.value));
        setPage(1);
      },
      className: "px-2 py-1 border border-gray-300 rounded text-sm"
    }, /*#__PURE__*/React.createElement("option", {
      value: "30"
    }, "30"), /*#__PURE__*/React.createElement("option", {
      value: "50"
    }, "50"), /*#__PURE__*/React.createElement("option", {
      value: "100"
    }, "100")), /*#__PURE__*/React.createElement("span", null, "条"))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      disabled: page <= 1,
      onClick: () => setPage(page - 1),
      className: "btn-secondary text-sm",
      style: page <= 1 ? {
        opacity: 0.5,
        cursor: 'not-allowed'
      } : {}
    }, "上一页"), /*#__PURE__*/React.createElement("span", {
      className: "flex items-center gap-1"
    }, /*#__PURE__*/React.createElement("span", null, "第"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "1",
      max: totalPages,
      value: page,
      onChange: e => {
        const v = parseInt(e.target.value);
        if (v >= 1 && v <= totalPages) setPage(v);
      },
      className: "w-14 px-2 py-1 border border-gray-300 rounded text-sm text-center"
    }), /*#__PURE__*/React.createElement("span", null, "/ ", totalPages, " 页")), /*#__PURE__*/React.createElement("button", {
      disabled: page >= totalPages,
      onClick: () => setPage(page + 1),
      className: "btn-secondary text-sm",
      style: page >= totalPages ? {
        opacity: 0.5,
        cursor: 'not-allowed'
      } : {}
    }, "下一页"))), /*#__PURE__*/React.createElement("div", {
      className: "overflow-y-auto flex-1 p-4",
      style: {
        maxHeight: '50vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
    }, paged.map(m => {
      const isSelected = localSelected.includes(m.id);
      return /*#__PURE__*/React.createElement("div", {
        key: m.id,
        onClick: () => toggleSelect(m.id),
        className: `border-2 rounded-lg p-3 cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "text-4xl text-center mb-2"
      }, m.thumb), /*#__PURE__*/React.createElement("p", {
        className: "text-xs font-medium text-gray-900 text-center truncate"
      }, m.name), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-gray-500 text-center"
      }, m.type === 'video' ? m.duration + ' | ' : '', m.size), isSelected && /*#__PURE__*/React.createElement("div", {
        className: "text-center mt-1"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fas fa-check-circle text-blue-500"
      })));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 border-t flex justify-between items-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-600"
    }, "已选择 ", /*#__PURE__*/React.createElement("span", {
      className: "text-red-500"
    }, localSelected.length, "/500"), " 个素材"), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setLocalSelected([]);
        onClear && onClear();
      },
      className: "btn-secondary text-sm"
    }, "清空重选"), /*#__PURE__*/React.createElement("button", {
      onClick: handleConfirm,
      className: "btn-primary"
    }, "确认选择")))));
  }
  function CopyModal({
    show,
    onClose,
    onConfirm,
    selectedCopies
  }) {
    const [localSelected, setLocalSelected] = React.useState(selectedCopies.map(c => c.id));
    const [copies, setCopies] = React.useState(MOCK.copyLibrary);
    const [packages, setPackages] = React.useState(MOCK.copyPackages);
    const [expandedPkg, setExpandedPkg] = React.useState(null); // 当前展开的文案包id
    const [showNewPkg, setShowNewPkg] = React.useState(false);
    const [newPkgName, setNewPkgName] = React.useState('');
    const [newPkgCopies, setNewPkgCopies] = React.useState(['']); // 最多10条，与文案包菜单一致

    React.useEffect(() => {
      if (show) {
        setLocalSelected(selectedCopies.map(c => c.id));
        setExpandedPkg(null);
        setShowNewPkg(false);
      }
    }, [show, selectedCopies]);
    const toggleSelect = id => {
      if (localSelected.includes(id)) {
        setLocalSelected(localSelected.filter(s => s !== id));
      } else {
        setLocalSelected([...localSelected, id]);
      }
    };
    const togglePackage = pkgId => {
      const pkg = packages.find(p => p.id === pkgId);
      if (!pkg) return;
      const pkgCopyIds = pkg.copies;
      const allSelected = pkgCopyIds.every(id => localSelected.includes(id));
      if (allSelected) {
        setLocalSelected(localSelected.filter(s => !pkgCopyIds.includes(s)));
      } else {
        const newSelected = [...new Set([...localSelected, ...pkgCopyIds])];
        setLocalSelected(newSelected);
      }
    };
    const handleAddCopyRow = () => {
      if (newPkgCopies.length >= 10) {
        alert('单个文案包最多添加 10 条文案');
        return;
      }
      setNewPkgCopies([...newPkgCopies, '']);
    };
    const handleRemoveCopyRow = i => {
      if (newPkgCopies.length <= 1) return;
      setNewPkgCopies(newPkgCopies.filter((_, idx) => idx !== i));
    };
    const handleAddPackage = () => {
      if (!newPkgName.trim()) {
        alert('请输入文案包名称');
        return;
      }
      const validCopies = newPkgCopies.filter(c => c.trim());
      if (validCopies.length === 0) {
        alert('请至少输入一条文案');
        return;
      }
      const newCopyIds = validCopies.map((_, i) => `c_${Date.now()}_${i}`);
      const newCopies = validCopies.map((content, i) => ({
        id: newCopyIds[i],
        content: content.trim(),
        ctr: 0
      }));
      const newPkg = {
        id: `cpkg_${Date.now()}`,
        name: newPkgName.trim(),
        copies: newCopyIds
      };
      setCopies([...copies, ...newCopies]);
      setPackages([...packages, newPkg]);
      setLocalSelected([...localSelected, ...newCopyIds]);
      setNewPkgName('');
      setNewPkgCopies(['']);
      setShowNewPkg(false);
    };
    const handleConfirm = () => {
      const result = localSelected.map(id => copies.find(c => c.id === id)).filter(Boolean);
      if (result.length > 50) {
        alert('最多选择 50 条文案，已为您保留前 50 条');
        onConfirm(result.slice(0, 50));
      } else {
        onConfirm(result);
      }
      onClose();
    };
    if (!show) return null;
    const getPackageCopyCount = pkg => pkg.copies.filter(id => copies.find(c => c.id === id)).length;
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content w-full max-w-2xl",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between p-4 border-b"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold"
    }, "选择广告文案（已选 ", localSelected.length, " 条，以文案包为单位）"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      className: "text-gray-400 hover:text-gray-600"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "px-4 py-2 border-b bg-gray-50 flex gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setShowNewPkg(!showNewPkg),
      className: "btn-secondary text-sm"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-plus mr-1"
    }), showNewPkg ? '收起' : '新增文案包')), showNewPkg && /*#__PURE__*/React.createElement("div", {
      className: "px-4 py-3 border-b bg-blue-50 animate-fadeIn"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "text-sm text-gray-700 font-medium"
    }, "文案包名称："), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: newPkgName,
      onChange: e => setNewPkgName(e.target.value),
      placeholder: "输入文案包名称",
      className: "flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
    })), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 mb-2"
    }, "输入文案内容（最多10条，至少1条，单条不超过30字）："), newPkgCopies.map((v, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-2 mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-gray-500 w-12"
    }, i + 1, "."), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: v,
      maxLength: 30,
      onChange: e => {
        const newArr = [...newPkgCopies];
        newArr[i] = e.target.value;
        setNewPkgCopies(newArr);
      },
      placeholder: `文案${i + 1}（${v.length}/30）`,
      className: "flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
    }), newPkgCopies.length > 1 && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => handleRemoveCopyRow(i),
      className: "px-2 py-1.5 border border-red-200 rounded text-xs text-red-500 hover:bg-red-50",
      title: "删除这条"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-times"
    })))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: handleAddCopyRow,
      className: "mt-1 inline-flex items-center gap-1 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fas fa-plus"
    }), " 添加一条文案"), /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end gap-2 mt-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setShowNewPkg(false),
      className: "btn-secondary text-sm"
    }, "取消"), /*#__PURE__*/React.createElement("button", {
      onClick: handleAddPackage,
      className: "btn-primary text-sm"
    }, "创建文案包"))), /*#__PURE__*/React.createElement("div", {
      className: "overflow-y-auto flex-1 p-4",
      style: {
        maxHeight: '55vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, packages.map(pkg => {
      const pkgCopyIds = pkg.copies;
      const allSelected = pkgCopyIds.every(id => localSelected.includes(id));
      const someSelected = pkgCopyIds.some(id => localSelected.includes(id));
      const isExpanded = expandedPkg === pkg.id;
      return /*#__PURE__*/React.createElement("div", {
        key: pkg.id,
        className: "border border-gray-200 rounded-xl overflow-hidden"
      }, /*#__PURE__*/React.createElement("div", {
        onClick: () => setExpandedPkg(isExpanded ? null : pkg.id),
        className: `flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${allSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-3 flex-1 min-w-0",
        onClick: e => e.stopPropagation()
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: allSelected,
        onChange: () => togglePackage(pkg.id),
        className: "w-4 h-4 text-blue-600 rounded flex-shrink-0"
      }), /*#__PURE__*/React.createElement("div", {
        className: "flex-1 min-w-0"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-sm font-medium text-gray-900"
      }, pkg.name), /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-gray-500 ml-2"
      }, "（", getPackageCopyCount(pkg), "条文案）")), someSelected && !allSelected && /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-orange-500"
      }, "部分已选")), /*#__PURE__*/React.createElement("i", {
        className: `fas fa-chevron-${isExpanded ? 'up' : 'down'} text-gray-400 text-sm ml-2`
      })), isExpanded && /*#__PURE__*/React.createElement("div", {
        className: "border-t border-gray-100 divide-y divide-gray-100 bg-gray-50"
      }, pkg.copies.map(copyId => {
        const copy = copies.find(c => c.id === copyId);
        if (!copy) return null;
        return /*#__PURE__*/React.createElement("div", {
          key: copy.id,
          className: "flex items-center gap-3 px-4 py-2.5"
        }, /*#__PURE__*/React.createElement("span", {
          className: "text-sm text-gray-600 pl-1"
        }, "• ", copy.content));
      })));
    }))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 border-t flex justify-between items-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-600"
    }, "已选择 ", localSelected.length, " 条文案"), /*#__PURE__*/React.createElement("button", {
      onClick: handleConfirm,
      className: "btn-primary"
    }, "确认选择"))));
  }
  function TimeGrid({
    value,
    onChange
  }) {
    const DAYS = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    const HOURS = Array.from({
      length: 24
    }, (_, i) => i); // 0~23 整点
    const TOTAL_SLOTS = 48; // 48个0.5h格子（每天）
    const SLOTS_PER_HOUR = 2; // 每1小时=2个格子

    // value format: { "0-0": true/false, ... } where key is "dayIndex-slotIndex", slotIndex=0..47
    const [slots, setSlots] = React.useState(value || {});
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [selectStart, setSelectStart] = React.useState(null);
    React.useEffect(() => {
      if (value) setSlots(value);
    }, [value]);

    // 单击切换单个0.5h格子
    const handleCellClick = (dayIdx, slotIdx) => {
      const key = `${dayIdx}-${slotIdx}`;
      const newSlots = {
        ...slots
      };
      newSlots[key] = !newSlots[key];
      setSlots(newSlots);
      onChange(newSlots);
    };

    // 鼠标按下（开始拖选，切换单个0.5h格子）
    const handleMouseDown = (dayIdx, slotIdx) => {
      setIsSelecting(true);
      setSelectStart({
        dayIdx,
        slotIdx
      });
      const key = `${dayIdx}-${slotIdx}`;
      const newSlots = {
        ...slots
      };
      newSlots[key] = !newSlots[key];
      setSlots(newSlots);
      onChange(newSlots);
    };
    const handleMouseEnter = (dayIdx, slotIdx) => {
      if (!isSelecting || !selectStart) return;
      const newSlots = {
        ...slots
      };
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
    React.useEffect(() => {
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
    const slotToTime = slotIdx => {
      const h = Math.floor(slotIdx / SLOTS_PER_HOUR);
      const m = slotIdx % SLOTS_PER_HOUR * 30;
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
      let rangeStart = slotIdx,
        rangeEnd = slotIdx;
      while (rangeStart > 0 && slots[`${dayIdx}-${rangeStart - 1}`]) rangeStart--;
      while (rangeEnd < TOTAL_SLOTS - 1 && slots[`${dayIdx}-${rangeEnd + 1}`]) rangeEnd++;
      // 只在这个格子被选中时才显示 tooltip
      if (!slots[`${dayIdx}-${slotIdx}`]) return '';
      return `${DAYS[dayIdx]} ${slotToTime(rangeStart)}-${slotToTime(rangeEnd + 1)}`;
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      cellSpacing: 0,
      cellPadding: 0,
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
        tableLayout: 'fixed',
        minWidth: '900px'
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
    }, "星期\\时间"), /*#__PURE__*/React.createElement("th", {
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
    }, HOURS.map(h => /*#__PURE__*/React.createElement("th", {
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
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, DAYS.map((day, di) => /*#__PURE__*/React.createElement("tr", {
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
    }, (_, si) => {
      const key = `${di}-${si}`;
      const isSelected = !!slots[key];
      const isHourBoundary = si % SLOTS_PER_HOUR === 0; // 整点边界
      const isNoonBoundary = si === 24; // 正午分隔
      return /*#__PURE__*/React.createElement("td", {
        key: si,
        onMouseDown: () => handleMouseDown(di, si),
        onMouseEnter: () => handleMouseEnter(di, si),
        title: isSelected ? getTooltip(di, si) : `${day} ${slotToTime(si)}`,
        style: {
          cursor: 'pointer',
          borderBottom: di === 6 ? 'none' : '1px solid #f5f5f5',
          borderRight: isNoonBoundary ? '2px solid #e5e7eb' : isHourBoundary ? '1px solid #e5e7eb' : '1px solid #f0f0f0',
          padding: 0,
          userSelect: 'none',
          width: '2.0833%',
          verticalAlign: 'middle',
          lineHeight: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%',
          height: '24px',
          margin: 0,
          borderRadius: '2px',
          backgroundColor: isSelected ? '#3b82f6' : '#f9fafb'
        },
        onMouseEnter: e => {
          if (!isSelected) e.target.style.backgroundColor = '#dbeafe';
        },
        onMouseLeave: e => {
          if (!isSelected) e.target.style.backgroundColor = '#f9fafb';
        }
      }));
    }))))), /*#__PURE__*/React.createElement("div", {
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
    }), "已选"), /*#__PURE__*/React.createElement("span", {
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
    }), "未选")), /*#__PURE__*/React.createElement("div", {
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
    }, "未选择任何时段"), /*#__PURE__*/React.createElement("button", {
      onClick: clearAll,
      style: {
        fontSize: '12px',
        color: '#3b82f6',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: '0'
      }
    }, "清空"))));
  }

  // 统一挂载到 window.UI，供两个表单脚本引用（IIFE 内定义，不污染全局词法作用域）
  window.UI = {
    Notification: Notification,
    MaterialModal: MaterialModal,
    CopyModal: CopyModal,
    TimeGrid: TimeGrid
  };
})();