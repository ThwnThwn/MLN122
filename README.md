# MLN122 Present

[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-6B7280)]()
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

Web thuyết trình học thuật về **Kinh tế chính trị Mác - Lênin**, xây bằng **React + Vite + Tailwind CSS**.

Project có dạng deck/slide, gồm:
- Mở đầu cinematic
- Lý luận
- Case Study
- Đánh giá
- Game mô phỏng
- Q&A / Trợ lý học thuật
- Trang riêng `/game-play` để nhúng Unity WebGL

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- lucide-react
- react-icons
- API nội bộ `api/chat.js` cho Q&A AI

## Chức Năng Chính

- Slide presentation có navbar điều hướng
- Hero mở đầu full-screen kiểu cinematic
- Tab `Lý luận` có nhiều mục nội dung và animation chuyển tab
- `Game` có preview image, nút chơi game, nút tải Windows/Android tạm thời
- `Q&A` có khung chat AI và lưu hội thoại cục bộ
- Route `/game-play` hiển thị Unity WebGL từ `public/TheLastShop/index.html`

## Cấu Trúc Quan Trọng

- `src/App.jsx`: điều phối route và section chính
- `src/components/TheorySection.jsx`: section Lý luận
- `src/components/GameSection.jsx`: section Game
- `src/components/GamePlay.jsx`: trang Unity WebGL
- `src/components/QASection.jsx`: phần Q&A / Trợ lý học thuật
- `src/lib/chatService.js`: logic gọi AI và lọc phạm vi trả lời
- `api/chat.js`: API handler cho môi trường deploy
- `public/TheLastShop/`: Unity WebGL build
- `public/game-preview/`: ảnh preview cho Game

## Yêu Cầu Môi Trường

Tạo file `.env` ở root project và thêm:

```bash
DEEPSEEK_API_KEY=your_api_key_here
```

Ghi chú:
- `api/chat.js` và `vite.config.js` đều đọc biến `DEEPSEEK_API_KEY`
- Không để key lộ trong source code

## Chạy Local

```bash
npm install
npm run dev
```

Sau đó mở URL do Vite in ra, thường là:

```bash
http://localhost:5173
```

## Build Production

```bash
npm run build
npm run preview
```

## API Chat

Khi người dùng hỏi ở tab Q&A:

- client gửi request tới `/api/chat`
- server đọc `DEEPSEEK_API_KEY`
- hệ thống chỉ trả lời trong phạm vi nội dung bài thuyết trình

## Route Quan Trọng

- `/` hoặc `/?section=...`: trang thuyết trình chính
- `/game-play`: trang Unity WebGL riêng

## Unity WebGL

Game hiện chạy từ:

```bash
/TheLastShop/index.html
```

Để game hoạt động:

- giữ nguyên folder `public/TheLastShop`
- đảm bảo trong đó có `index.html`, `Build/`, `TemplateData/`

## Lệnh Hữu Ích

```bash
npm run dev
npm run build
npm run lint
```

## Ghi Chú

- Project ưu tiên UI sáng, premium, cinematic
- Không dùng backend ngoài trừ API chat nội bộ
- Các section nội dung được tách data trong `src/data/` để dễ chỉnh sửa
# MLN122
