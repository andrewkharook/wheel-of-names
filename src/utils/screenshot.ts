export const takeScreenshot = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ 
      preferCurrentTab: true,
      video: { 
        // @ts-ignore - mediaSource is a valid property for getDisplayMedia
        mediaSource: 'screen' 
      }
    });
    
    // Create a video element to capture the stream
    const video = document.createElement('video');
    video.srcObject = stream;
    await new Promise(resolve => video.onloadedmetadata = resolve);
    video.play();

    // Create a canvas to draw the video frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Draw the video frame on the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob and download
    const blob = await new Promise<Blob>((resolve) => 
      canvas.toBlob((blob) => resolve(blob!), 'image/png')
    );
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fortune-wheel-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Stop all tracks after getting the stream
    stream.getTracks().forEach(track => track.stop());
  } catch (err) {
    console.error('Error taking screenshot:', err);
  }
}; 