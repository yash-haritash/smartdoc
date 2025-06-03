# SmartDoc AI

SmartDoc AI is a modern, professional React app for document summarization and keyword extraction. It features a beautiful UI, dark/light mode, persistent history, a collapsible sidebar, About page, and responsive theming. All user data and preferences are stored in localStorage for a seamless experience.

## Features
- **Document Summarizer**: Summarize any text using HuggingFace's DistilBART model.
- **Keyword Extraction**: Instantly extract keywords from your input.
- **Dark/Light Mode**: Toggle between dark and light themes. Theme is persisted.
- **Persistent History**: All summaries are saved and can be revisited or deleted.
- **Collapsible Sidebar**: History panel can be collapsed/expanded and is sticky.
- **About Page**: Learn more about the app and its creator.
- **Modern UI**: Built with Tailwind CSS for a clean, beautiful look.

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd smartDoc
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add your HuggingFace API token:
   ```env
   VITE_HF_API_TOKEN=your_huggingface_token_here
   ```

### Running the App
```sh
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure
```
smartDoc/
├── public/
├── src/
│   ├── components/
│   ├── utils/
│   ├── App.jsx
│   └── ...
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Environment Variables
- `VITE_HF_API_TOKEN`: Your HuggingFace API token for summarization.

## Credits
- Summarization powered by [HuggingFace Inference API](https://huggingface.co/inference-api).
- UI built with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/).

## License
MIT

---

**Designed by Yash.**

