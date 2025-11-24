let sprite2, sprite1;
const totalFrames = 9;
const frameDelay = 6; // 控制每張圖顯示的畫格數，數字越小動畫越快

// 已知尺寸（不必等到 image 載入）
const frame2W = 985 / totalFrames;
const frame2H = 99;
const frame1W = 775 / totalFrames;
const frame1H = 102;

function preload() {
  // 兩張精靈圖
  sprite2 = loadImage('2/all2.png');
  sprite1 = loadImage('1/ALL 1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background('#5BC0EB');

  // 計算自動縮放，確保兩個動畫並排時不會超出畫面
  const maxPortion = 0.80; // 調整為 0.80，使動畫縮小一些（原本為 0.95）
  const gap = width * 0.03; // 兩張動畫之間間距
  const maxScaleCap = 12;

  // 高度限制（同時適用於兩張）
  const maxScaleByHeight = (height * maxPortion) / max(frame1H, frame2H);

  // 寬度限制（兩張合併）
  const combinedFrameW = frame1W + frame2W;
  const maxScaleByWidth = (width * maxPortion - gap) / combinedFrameW;

  const displayScale = min(maxScaleByHeight, maxScaleByWidth, maxScaleCap);

  const dw1 = frame1W * displayScale;
  const dh1 = frame1H * displayScale;
  const dw2 = frame2W * displayScale;
  const dh2 = frame2H * displayScale;

  // 計算並排後的位置（置中）
  const totalWidth = dw1 + gap + dw2;
  const leftCenterX = (width - totalWidth) / 2 + dw1 / 2;
  const rightCenterX = leftCenterX + dw1 / 2 + gap + dw2 / 2;
  const centerY = height / 2;

  // 畫第一張（1/ALL 1.png）
  if (sprite1) {
    const idx1 = floor((frameCount / frameDelay) % totalFrames);
    const sx1 = idx1 * frame1W;
    image(sprite1, leftCenterX, centerY, dw1, dh1, sx1, 0, frame1W, frame1H);
  }

  // 畫第二張（2/all2.png）
  if (sprite2) {
    const idx2 = floor((frameCount / frameDelay) % totalFrames);
    const sx2 = idx2 * frame2W;
    image(sprite2, rightCenterX, centerY, dw2, dh2, sx2, 0, frame2W, frame2H);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
