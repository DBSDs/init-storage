
## 为何而生
你是不是受够了`Storage.getItem(key: string): string | null`没有类型提示的日子     
你是不是需要一个在应用中更加清晰可见的缓存列表
* {
  * token: number
  * info: { id: string, pwd: string}
  * version: string
* }

那请你试用下`init-storage`吧！

---

## 特性
- 📦包大小仅为1kb
- ✅无任何生产依赖。
- 💪🏼使用原生 Javascript Api，支持任意框架使用
- 💯100%测试场景覆盖
- 🚀SSR支持

## 快速开始

```bash
// npm
npm install init-storage --save
```

```typescript
import { setInitStorage } from "init-storage";

const { getLocalStorageItem } = setInitStorage(
  local: {
    local: { token: "1" },
    session: {},
  }, 
  session: {}
)

console.log(getLocalStorageItem('token', true)) // "1"
```

| 方法                      | 说明               | 类 型                                                               | 
|--------------------------|--------------------|--------------------------------------------------------------------|
| getLocalStorageItem      | 获取本地存储空间      | (item: 'aa' \| 'bb' \| '...',  ifNullIsGetInit: boolean) => void   |
| setLocalStorageItem      | 存储本地存储空间(某键) | (item: 'aa' \| 'bb' \| '...',  value: ValueType) => void           | 
| removeLocalStorageItem   | 移除本地存储空间(某键) | (item: 'aa' \| 'bb' \| '...') => void                              | 
| clearLocalStorageItem    | 清空本地存储空间      | (item: 'aa' \| 'bb' \| '...') => void                              |
| getSessionStorageItem    | 获取会话存储空间      | (item: 'aa' \| 'bb' \| '...',  ifNullIsGetInit: boolean) => void   |
| setSessionStorageItem    | 存储会话存储空间(某键) | (item: 'aa' \| 'bb' \| '...',  value: ValueType) => void           | 
| removeSessionStorageItem | 移除会话存储空间(某键) | (item: 'aa' \| 'bb' \| '...') => void                              | 
| clearSessionStorageIte   | 清空会话存储空间      | (item: 'aa' \| 'bb' \| '...') => void                              |

同时`setInitStorage(INIT, option)`还有用可配置项

| 参数            | 说明                                | 类 型       | 默认值                           |
|----------------|-------------------------------------|------------|---------------------------------|
| defaultUseInit | 返回的方法中ifNullIsGetInit参数的默认值 |  boolean   | false (如果存储中没有就返回null)    | 
## 示例

* [React](https://codesandbox.io/s/init-storage-react-fgkfhp?file=/src/App.tsx)
* [Angular](https://codesandbox.io/s/init-storage-angular-e7ul73?file=/src/app/app.component.ts)
* [Vue](https://codesandbox.io/s/init-storage-vue-3sq17x?file=/src/components/MyComponent.vue)

---
## 许可证

MIT