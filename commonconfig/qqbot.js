import ConfigBase from '../../../src/infrastructure/commonconfig/commonconfig.js';

/** QQ 官机配置，供 QQBotTasker 读取；事件链见 tasker/QQBotTasker.js、events/qqbot.js */
export default class QQBotConfig extends ConfigBase {
  constructor() {
    super({
      name: 'qqbot',
      displayName: 'QQBot',
      description: 'QQ官机适配',
      filePath: 'data/QQBot.json',
      fileType: 'json',
      schema: {
        fields: {
          enabled: {
            type: 'boolean',
            label: '启用',
            description: '关闭后 Tasker 不加载，不连接官机',
            default: true,
            component: 'Switch',
            group: '基础'
          },
          toQRCode: {
            type: 'boolean',
            label: 'URL转二维码',
            default: true,
            component: 'Switch'
          },
          toCallback: {
            type: 'boolean',
            label: '按钮回调',
            default: true,
            component: 'Switch'
          },
          toBotUpload: {
            type: 'boolean',
            label: 'Bot上传资源',
            default: true,
            component: 'Switch'
          },
          hideGuildRecall: {
            type: 'boolean',
            label: '隐藏频道撤回',
            default: false,
            component: 'Switch'
          },
          imageLength: {
            type: 'number',
            label: '图片压缩阈值(MB)',
            min: 0,
            max: 50,
            default: 0,
            component: 'InputNumber'
          },
          markdown: {
            type: 'object',
            label: 'Markdown',
            component: 'SubForm',
            fields: {
              template: {
                type: 'string',
                label: '模板ID序列',
                component: 'Input'
              }
            }
          },
          bot: {
            type: 'object',
            label: 'Bot连接',
            component: 'SubForm',
            fields: {
              sandbox: { type: 'boolean', label: '沙箱', default: false, component: 'Switch' },
              maxRetry: { type: 'number', label: '重试次数', min: 0, default: 10, component: 'InputNumber' },
              timeout: { type: 'number', label: '超时(ms)', min: 1000, default: 30000, component: 'InputNumber' }
            }
          },
          token: {
            type: 'array',
            label: 'Token',
            description: 'id:appid:token:secret:群消息(0/1):频道消息(0/1)',
            itemType: 'string',
            default: [],
            component: 'Tags'
          }
        }
      }
    });
  }

  async write(data, options = {}) {
    return await super.write(data, { ...options, cleanEmpty: true });
  }

  async addToken(token) {
    const data = await this.read();
    if (!data.token) data.token = [];
    if (!data.token.includes(token)) {
      data.token.push(token);
      await this.write(data);
    }
    return data.token;
  }

  async removeToken(token) {
    const data = await this.read();
    if (data.token) {
      data.token = data.token.filter(t => t !== token);
      await this.write(data);
    }
    return data.token;
  }

  async setMarkdownTemplate(botId, templateId) {
    const data = await this.read();
    if (!data.markdown) data.markdown = { template: 'abcdefghij' };
    data.markdown[botId] = templateId;
    await this.write(data);
    return data.markdown;
  }
}
