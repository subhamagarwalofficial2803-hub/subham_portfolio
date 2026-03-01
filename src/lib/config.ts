
export const CONFIG = {
  // Set to 'drive' to use Google Drive IDs, or 'local' to use files from /public/assets/
  sourceMode: 'local' as 'drive' | 'local',

  // Google Drive File IDs (Extracted from shareable links)
  driveIds: {
    heroImage: "1IFH23vOke4mRB7GKBCCGj2Z-MeFn0bHO",
    resumePdf: "1O3f_0ct87Jb5cXZkKNCa1umqwyHhaUrj",
    portfolioPdf: "1JgOzRxtrDmRQNNZlGyEs9mhyLlbvlsOG",
    hobbiesPdf: "1S_Qj3iKWmbG8aJaSp_BYQhcoXMu0n4Ek",
  },

  // Local paths relative to the /public directory
  localPaths: {
    heroImage: "subham_portfolio/assets/images/hero-image.png",
    resumePdf: "subham_portfolio/assets/pdf/Subham_Agarwal_resume.pdf",
    portfolioPdf: "subham_portfolio/assets/pdf/Subham_Agarwal_portfolio.pdf",
    hobbiesPdf: "subham_portfolio/assets/pdf/Subham_Agarwal_hobbies.pdf",
  }
};

export type AssetKey = keyof typeof CONFIG.driveIds;

export const ASSET_CONFIG = {
  // External Profiles
  linkedinUrl: "https://www.linkedin.com/in/go2-shubham-agarwal",
  email: "subham.agarwal.official2803@gmail.com",
  phone: "+91-9782211556",

  // Helper to determine if a Drive ID is valid or just a placeholder
  isDriveValid: (id: string) => id && typeof id === 'string' && !id.startsWith('YOUR_') && !id.startsWith('ID_') && id.length > 5,

  /**
   * Returns a complete asset object with all relevant URLs.
   */
  getAsset: (key: AssetKey) => {
    const driveId = CONFIG.driveIds[key];
    const localPath = CONFIG.localPaths[key];
    const driveValid = ASSET_CONFIG.isDriveValid(driveId);

    // Ensure we have a valid Drive preview URL or keep it empty if invalid
    const drivePreview = driveValid 
      ? `https://drive.google.com/file/d/${driveId}/preview` 
      : "";
    
    const driveDownload = driveValid 
      ? `https://drive.google.com/uc?export=download&id=${driveId}` 
      : localPath;

    const driveDirectImage = driveValid
      ? `https://lh3.googleusercontent.com/d/${driveId}`
      : localPath;

    const hasDrive = driveValid;

    return {
      local: localPath,
      drivePreview,
      driveDownload,
      driveDirectImage,
      hasDrive,
      // The "preferred" URL based on sourceMode
      preferred: (CONFIG.sourceMode === 'drive' && hasDrive) ? drivePreview : localPath,
      // The "fallback" URL to use if the preferred one fails
      fallback: (CONFIG.sourceMode === 'drive') ? localPath : drivePreview,
      // Specifically for <img> tags or next/image
      imagePreferred: (CONFIG.sourceMode === 'drive' && hasDrive) ? driveDirectImage : localPath,
      imageFallback: (CONFIG.sourceMode === 'drive') ? localPath : (hasDrive ? driveDirectImage : localPath)
    };
  }
};

