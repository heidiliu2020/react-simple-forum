# Succulents Society 多肉植物討論區

「Succulents Society 多肉植物討論區」，是一個以 SPA 架構實作的簡易部落格系統，採用前端技術為 React Hooks，搭配 JSON Server 模擬 Restful API 進行開發。

[網站 DEMO](https://heidiliu2020.github.io/react-blog-test/#/)

![](![](https://i.imgur.com/G2phauR.jpg)

## 核心功能

- 簡易會員系統：使用者能夠註冊、登入會員，登入後會進行身分驗證
- 瀏覽文章功能：依照文章篇數顯示分頁，可瀏覽單篇文章頁面
- 管理文章功能：可輸入標題、內文、封面圖片來發布文章，user 可編輯或刪除本人的文章，admin 具有最高權限管理文章
- 錨點功能：點擊回到頂部按鈕、或 URL 改變時均會回到網頁頂部

![](https://i.imgur.com/2qkNfak.png)

## 專案前端技術

#### 框架

- React Hooks
- React DOM

#### 第三方套件

- styled-components：使用 JSX 語法撰寫 CSS 樣式
- react-router-dom：使用 HashRouter 建立路由
- styled-reset：進行 CSS Reset
- PropTypes：進行型別檢查
- Prettier：統一程式碼格式
- ESLint：檢查語法，統一程式碼撰寫風格
- react-spinners：套用 Loading 的效果

## JSON Server 模擬資料庫

專案連結：[react-demo-json-api-server](https://github.com/heidiliu2020/react-demo-json-api-server)

- 使用 JSON Server 模組執行 Express Server，模擬 Restful API 作為資料來源。
- 網站串接的 API Server 僅供測試用，密碼是以明文儲存，因此統一在後端將所有 user 的密碼改為 `React`

## 學習筆記

- [React：用 SPA 架構實作一個部落格（一）- Router](https://heidiliu2020.github.io/react-router/)
- [React：用 SPA 架構實作一個部落格（二）- 身分驗證](https://heidiliu2020.github.io/react-usecontext/)
- [React：用 SPA 架構實作一個部落格（三）- 淺談測試](https://heidiliu2020.github.io/react-test/)
- [React：用 SPA 架構實作一個部落格（四）- 優化篇](https://heidiliu2020.github.io/react-optimization/)

## 專案授權

[MIT License](https://choosealicense.com/licenses/mit/)
