
# Subham Agarwal Portfolio

A premium, FAANG-level engineering portfolio built with Next.js and Tailwind CSS.

## 📂 Asset Management Strategy

This portfolio supports two modes for loading assets: **Google Drive** and **Local Files**. Configure this in `src/lib/config.ts` using the `sourceMode` toggle.

### Option 1: Google Drive (Recommended for easy updates)
1.  **Create a Root Folder**: e.g., `Subham_Portfolio`.
2.  **Set Sharing**: Right-click the folder > **Share** > Set access to **"Anyone with the link"**.
3.  **Organize Files**:
    *   `hero-image.png`
    *   `Subham_Agarwal_resume.pdf`
    *   `Subham_Agarwal_portfolio.pdf`
    *   `Subham_Agarwal_hobbies.pdf`
4.  **Get File IDs**: Right-click any file > **Share** > **Copy link**. Extract the `FILE_ID` from the URL and paste it into `CONFIG.driveIds` in `src/lib/config.ts`.
5.  **Note on Advanced Features**: Browser security (CORS) blocks custom PDF rendering for Google Drive files. Features like **Horizontal Scrolling** and **Autoscroll** will be disabled for Drive files, falling back to the standard Google Drive viewer. Use **Local Files** for the full high-fidelity experience.

### Option 2: Local Files (Fastest performance & Full Features)
Place your files in the following local directory structure within the project:
*   `/public/assets/images/hero-image.png`
*   `/public/assets/pdf/Subham_Agarwal_resume.pdf`
*   `/public/assets/pdf/Subham_Agarwal_portfolio.pdf`
*   `/public/assets/pdf/Subham_Agarwal_hobbies.pdf`

**Fallback Logic**: Even if `sourceMode` is set to `'drive'`, the app will automatically fall back to local files if the Drive ID is missing or left as the placeholder `YOUR_...`.

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.
   

## 🚀 Deployment to GitHub Pages

1. **Build the Project**:
   ```bash
   npm run build
   ```
2. **Push to GitHub**:
   Ensure your repository has **GitHub Actions** enabled for Pages. Every push to `main` will automatically build and deploy via the `.github/workflows/deploy.yml` workflow.

## 🔍 Note on PDF Viewers
The portfolio uses `pdf.js` for custom horizontal rendering of local files. For Google Drive files, it uses the `/preview` endpoint for optimal, security-compliant embedding.
