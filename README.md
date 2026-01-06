# TsPopup - 轻量级划词弹窗库

<p align="center">
  <img src="https://img.shields.io/badge/Version-v0.1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow" alt="JavaScript">
  <img src="https://img.shields.io/badge/Size-5KB-brightgreen" alt="Size">
</p>

> A lightweight, high-performance text selection popup library for modern web applications.

**TsPopup** 是一个轻量级的JavaScript划词弹窗库，能够在用户选中文本时智能弹出功能菜单，提供复制、搜索、翻译等常用操作。

---

## 🌟 特性 / Features

- 🚀 **轻量高效** - 纯JavaScript实现，无依赖，仅5KB
- 🎯 **智能定位** - 自动计算弹窗位置，支持边界检测
- 🎨 **美观易用** - 现代化UI设计，平滑动画效果
- 🔧 **高度可定制** - 支持自定义按钮、样式和功能
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🔒 **事件优化** - 智能防抖处理，避免频繁触发

## 📦 安装 / Installation

### 方式1: 直接引入
```html
<!-- 引入Font Awesome图标库 -->
<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- 引入TsPopup -->
<script src="TsPopup.js"></script>
```

### 方式2: NPM安装 (计划中)
```bash
npm install tspopup
```

## 🚀 快速开始 / Quick Start

### 基础使用
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="TsPopup.js"></script>
</head>
<body>
    <div>
        <p>选中这段文字测试划词弹窗功能...</p>
    </div>
    
    <script>
        // 初始化划词弹窗
        const popup = new TextSelectionPopup();
    </script>
</body>
</html>
```

### 自定义配置
```javascript
const popup = new TextSelectionPopup({
    // 按钮配置
    buttons: [
        {
            id: 'copyBtn',
            className: 'popup-btn copy',
            tooltip: '复制',
            icon: 'fas fa-copy'
        },
        {
            id: 'searchBtn',
            className: 'popup-btn search',
            tooltip: '搜索',
            icon: 'fas fa-search'
        }
    ],
    // 弹窗位置偏移
    offsetX: 10,
    offsetY: 10,
    // 防抖时间(毫秒)
    debounceDelay: 50
});
```

## ⚙️ 配置选项 / Configuration

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `containerId` | string | `'textSelectionPopup'` | 弹窗容器ID |
| `popupClass` | string | `'text-selection-popup'` | 弹窗样式类名 |
| `offsetX` | number | `5` | 水平偏移量(px) |
| `offsetY` | number | `5` | 垂直偏移量(px) |
| `debounceDelay` | number | `50` | 防抖延迟(ms) |
| `buttons` | array | 预定义按钮 | 功能按钮配置 |

## 🔧 API 文档 / API Documentation

### 方法 / Methods

#### `addButton(buttonConfig)`
添加自定义按钮
```javascript
popup.addButton({
    id: 'shareBtn',
    className: 'popup-btn share',
    tooltip: '分享',
    icon: 'fas fa-share',
    action: function() {
        // 自定义功能
        alert('分享: ' + popup.selectedText);
    }
});
```

#### `removeButton(buttonId)`
移除指定按钮
```javascript
popup.removeButton('translateBtn');
```

#### `destroy()`
销毁实例，清理事件监听
```javascript
popup.destroy();
```

### 属性 / Properties

- `selectedText` - 当前选中的文本内容
- `container` - 弹窗容器DOM元素

## 🎨 自定义样式 / Customization

### 修改默认样式
```css
.text-selection-popup {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.popup-btn {
    background: #f8f9fa;
    color: #495057;
}

.popup-btn:hover {
    background: #e9ecef;
    transform: scale(1.1);
}
```

### 添加自定义CSS类
```javascript
const popup = new TextSelectionPopup({
    popupClass: 'my-custom-popup'
});
```

## 🌍 浏览器兼容性 / Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 移动端支持 / Mobile Support

TsPopup 完全支持移动端触摸操作，提供良好的移动端用户体验。

## 🔧 开发 / Development

### 项目结构
```
TsPopup/
├── TsPopup.js          # 核心库文件
├── Configuration_Demo.html  # 配置演示
├── README.md           # 项目文档
└── LICENSE             # 开源协议
```

### 构建说明
当前版本为纯JavaScript实现，无需构建工具。未来版本将提供压缩版本和模块化支持。

## 🤝 贡献 / Contributing

欢迎提交Issue和Pull Request来改善这个项目！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证 / License

本项目采用 MIT 协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢 / Acknowledgments

- Font Awesome - 提供精美的图标
- 所有贡献者和用户

## 📞 联系 / Contact

- 项目主页: [[GitHub Repository]](https://github.com/Vvisi0n/TextSelectionPopup.git)
- 问题反馈: [[Issues]](https://github.com/Vvisi0n/TextSelectionPopup/issues)
- 邮箱: 2478258536@qq.com

---

**TsPopup** - 让文本选择更智能，让用户体验更美好！ 🎉
```

这个README.md文件包含了：

## 主要内容：
1. **项目介绍** - 中英双语项目简介
2. **特性展示** - 核心功能亮点
3. **安装指南** - 多种安装方式
4. **快速开始** - 基础使用示例
5. **配置文档** - 详细的API说明
6. **自定义指南** - 样式和功能定制
7. **开发信息** - 项目结构和贡献指南

## 特色功能：
- 🛡️ 完整的徽章系统
- 📚 详细的中英双语文档
- 🔧 实用的代码示例
- 🌍 国际化支持
- 📱 移动端兼容说明
