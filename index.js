import QQBotConfig from './commonconfig/qqbot.js';

// 仅确保配置文件存在（按 schema 默认值生成），便于用户在界面中配置；是否加载由配置项 enabled 控制，见 tasker/QQBotTasker.js load()
try {
  const cfgg = new QQBotConfig();
  if (!await cfgg.exists()) {
    await cfgg.write(cfgg.getDefaultFromSchema(), { backup: false, validate: true });
    Bot.makeLog('info', '已生成 QQBot 默认配置: data/QQBot.json', 'QQbot-Core');
  }
} catch (err) {
  Bot.makeLog('error', `QQBot 配置初始化失败: ${err.message}`, 'QQbot-Core', err);
}
