# Team Images Optimization Guide

## Current Team Images:
- **Monish.png** - Designer
- **abhijit.jpeg** - Developer  
- **saarathi.jpg** - Developer
- **joel.jpg** - Designer (updated from external URL)
- **faleel.jpeg** - Developer

## Image Optimization Recommendations:

### 1. File Format & Size
- **Format**: Use WebP format for better compression (fallback to JPG)
- **Dimensions**: 800x800px or 600x600px for consistent aspect ratio
- **File Size**: Target 100-200KB per image

### 2. Compression Tips
```bash
# Using ImageMagick (if available)
magick input.jpg -resize 800x800^ -gravity center -extent 800x800 -quality 85 optimized.jpg

# Using online tools:
# - TinyPNG.com
# - Squoosh.app (Google)
# - ImageOptim (Mac)
```

### 3. Naming Convention
Use consistent naming:
- `monish.jpg` (lowercase, no spaces)
- `abhijit.jpg`
- `saarathi.jpg` 
- `joel.jpg`
- `faleel.jpg`

### 4. Performance Features Added:
✅ **Lazy Loading** - Images load only when visible
✅ **Loading Spinner** - Shows while image loads
✅ **Error Handling** - Fallback if image fails to load
✅ **Smooth Transitions** - Fade-in effect when loaded
✅ **Local Images** - Removed external URL dependency

### 5. Directory Structure:
```
public/
└── images/
    ├── monish.jpg
    ├── abhijit.jpg
    ├── saarathi.jpg
    ├── joel.jpg
    └── faleel.jpg
```

## Next Steps:
1. Optimize existing images using tools above
2. Save optimized images to `/public/images/` directory
3. Ensure all images are under 200KB
4. Test loading performance in browser Dev Tools

## Performance Monitoring:
- Check Network tab in browser Dev Tools
- Aim for < 1 second total image load time
- Monitor Largest Contentful Paint (LCP) metrics
