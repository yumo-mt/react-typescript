# react-typescript
react-ts 脚手架

## ts 在react 上的写法差异

- import React from 'react'  --->   import * as React from 'react';    react-dom等也是如此
- import {A} from 'AA' 不变



## 样式的导入有差异

webpack 中 rule 需要使用 typings-for-css-modules-loader 来进行编译

最简单的配置,同样使用的是css-module 的方式 ， 不使用 css-loader 改为 typings-for-css-modules-loader

```
    {
        test: /\.css$/,
        include: [resolve('src')],
        use: [
            'style-loader',
            typingsForCssModulesLoader,
        ]
    },

```
导入方式改为 `import * as './styles.css'`

