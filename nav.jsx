const { useState, useEffect } = React;

// ========== 任务列表页 ==========
function TaskListPage(props) {
  const tasks = props.tasks;
  const setTasks = props.setTasks;
  const setCurrentView = props.setCurrentView;
  const setSelectedChannel = props.setSelectedChannel;

  function handleDeleteTask(id) {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    try { localStorage.setItem('ad_tasks', JSON.stringify(newTasks)); } catch(e) {}
  }

  function handleRunTask(task) {
    alert('开始执行任务：「' + task.name + '」（模拟）');
  }

  return (
    React.createElement('div', { className: 'max-w-5xl mx-auto py-8 px-6' },
      React.createElement('div', { className: 'flex items-center justify-between mb-8' },
        React.createElement('div', null,
          React.createElement('h2', { className: 'text-2xl font-bold text-gray-900' }, '批创工具'),
          React.createElement('p', { className: 'text-sm text-gray-500 mt-1' }, '管理批量创意搭建任务')
        ),
        React.createElement('button', {
          onClick: () => setCurrentView('channel-select'),
          className: 'btn-primary text-base px-6 py-3'
        }, React.createElement('i', { className: 'fas fa-plus mr-2' }), '新建任务')
      ),
      tasks.length === 0 && React.createElement('div', { className: 'text-center py-20 text-gray-400' },
        React.createElement('div', { className: 'text-6xl mb-4' }, '📋'),
        React.createElement('p', { className: 'text-lg' }, '暂无任务'),
        React.createElement('p', { className: 'text-sm mt-2' }, '点击「新建任务」开始创建批量创意搭建')
      ),
      tasks.length > 0 && React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        tasks.map(task =>
          React.createElement('div', { key: task.id, className: 'bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow' },
            React.createElement('div', { className: 'flex items-start justify-between mb-3' },
              React.createElement('div', null,
                React.createElement('h4', { className: 'font-bold text-gray-900 text-lg' }, task.name),
                React.createElement('p', { className: 'text-xs text-gray-500 mt-1' }, '渠道：' + (task.channelName || task.channel)),
                React.createElement('p', { className: 'text-xs text-gray-400 mt-1' }, '创建于 ' + new Date(task.createdAt).toLocaleDateString())
              ),
              React.createElement('button', {
                onClick: () => handleDeleteTask(task.id),
                className: 'text-red-400 hover:text-red-600 p-2'
              }, React.createElement('i', { className: 'fas fa-trash' }))
            ),
            React.createElement('button', {
              onClick: () => handleRunTask(task),
              className: 'w-full btn-primary text-sm py-2.5'
            }, React.createElement('i', { className: 'fas fa-play mr-2' }), '运行任务')
          )
        )
      )
    )
  );
}

// ========== 新建任务 - 选择渠道页 ==========
function ChannelSelectionPage(props) {
  const setCurrentView = props.setCurrentView;
  const setSelectedChannel = props.setSelectedChannel;
  const setTasks = props.setTasks;
  const tasks = props.tasks;

  const channels = [
    { id: 'gdt', name: '广点通', icon: '🎯', desc: '腾讯广告广点通渠道' },
    { id: 'wechat_ads', name: '微信广告', icon: '💬', desc: '微信公众号与小程序广告' },
    { id: 'tencent_union', name: '腾讯广告联盟', icon: '🤝', desc: '腾讯广告联盟渠道' }
  ];

  function handleSelectChannel(ch) {
    setSelectedChannel(ch.id);
    const newTask = {
      id: 'task_' + Date.now(),
      name: '任务-' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      channel: ch.id,
      channelName: ch.name,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };
    const newTasks = tasks.concat([newTask]);
    setTasks(newTasks);
    try { localStorage.setItem('ad_tasks', JSON.stringify(newTasks)); } catch(e) {}
    setCurrentView('form');
  }

  return (
    React.createElement('div', { className: 'max-w-3xl mx-auto py-8 px-6' },
      React.createElement('button', {
        onClick: () => setCurrentView('task-list'),
        className: 'flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6'
      },
        React.createElement('i', { className: 'fas fa-arrow-left' }),
        React.createElement('span', { className: 'text-sm' }, '返回任务列表')
      ),
      React.createElement('div', { className: 'mb-8' },
        React.createElement('h2', { className: 'text-2xl font-bold text-gray-900 mb-2' }, '选择投放渠道'),
        React.createElement('p', { className: 'text-sm text-gray-500' }, '选择要投放的渠道，进入对应的广告搭建表单')
      ),
      React.createElement('div', { className: 'space-y-4' },
        channels.map(ch =>
          React.createElement('button', {
            key: ch.id,
            onClick: () => handleSelectChannel(ch),
            className: 'w-full flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left'
          },
            React.createElement('div', { className: 'text-3xl' }, ch.icon),
            React.createElement('div', { className: 'flex-1' },
              React.createElement('h3', { className: 'font-bold text-gray-900 text-lg' }, ch.name),
              React.createElement('p', { className: 'text-sm text-gray-500 mt-1' }, ch.desc)
            ),
            React.createElement('i', { className: 'fas fa-chevron-right text-gray-400' })
          )
        )
      )
    )
  );
}
