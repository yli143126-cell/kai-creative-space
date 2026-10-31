// 热区坐标以原图 1629 × 965 像素为基准，随整个画面等比缩放。
// 后续接入其他选择方式时，只需调用 selectCharacter(id)。
const characters = [
  { id: 'guanyu', name: '关羽', image: 'assets/关羽界面.png', points: '95,105 164,85 192,62 288,68 368,110 386,173 373,245 395,310 369,387 332,455 265,473 198,458 133,425 121,341 139,270 107,207' },
  { id: 'muguiying', name: '穆桂英', image: 'assets/穆桂英界面.png', points: '128,478 207,475 285,483 365,504 432,535 452,617 502,705 511,797 479,857 409,891 303,892 213,866 148,839 112,781 113,681 128,595' },
  { id: 'sunwukong', name: '孙悟空', image: 'assets/孙悟空界面.png', points: '691,328 735,309 819,307 887,321 931,350 949,427 937,511 969,604 957,698 923,782 858,813 783,809 704,780 670,714 681,633 658,542 663,440' },
  { id: 'baogong', name: '包公', image: 'assets/包公.png', points: '1183,105 1232,86 1349,77 1458,104 1508,156 1518,245 1500,324 1502,408 1464,463 1381,482 1283,461 1187,435 1156,372 1158,267' },
  { id: 'bajie', name: '猪八戒', image: 'assets/八戒.png', points: '1246,511 1322,489 1432,497 1510,540 1516,616 1497,687 1534,761 1550,849 1500,911 1417,911 1350,881 1282,874 1211,831 1165,748 1167,657 1192,571' }
];

const home = document.querySelector('#home');
const detail = document.querySelector('#detail');
const detailImage = document.querySelector('#detail-image');
const status = document.querySelector('#status');
const hotspots = document.querySelector('#hotspots');
const glowLayer = document.querySelector('#glow-layer');
let selectionToken = 0;
let activeCharacter = null;

for (const character of characters) {
  const glow = document.createElement('div');
  glow.className = 'glow';
  glow.dataset.character = character.id;
  glow.style.setProperty('--glow-image', `url("assets/glow/${character.id}-glow.png")`);
  glowLayer.append(glow);
  const shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  shape.setAttribute('points', character.points);
  shape.setAttribute('class', 'hotspot');
  shape.setAttribute('tabindex', '0');
  shape.setAttribute('role', 'button');
  shape.setAttribute('aria-label', `查看${character.name}介绍`);
  shape.dataset.character = character.id;
  shape.addEventListener('pointerenter', () => glow.classList.add('is-lit'));
  shape.addEventListener('pointerleave', () => glow.classList.remove('is-lit', 'is-pressed'));
  shape.addEventListener('focus', () => glow.classList.add('is-lit'));
  shape.addEventListener('blur', () => glow.classList.remove('is-lit', 'is-pressed'));
  shape.addEventListener('click', () => {
    glow.classList.add('is-pressed');
    selectCharacter(character.id);
  });
  shape.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCharacter(character.id);
    }
  });
  hotspots.append(shape);
}

// 提前缓存详情图，首次点击也能顺畅过渡。
for (const character of characters) {
  const preload = new Image();
  preload.src = character.image;
}

async function selectCharacter(id) {
  const character = characters.find(item => item.id === id);
  if (!character) return;
  const token = ++selectionToken;
  const image = new Image();
  image.src = character.image;
  try { await image.decode(); } catch { status.textContent = `${character.name}图片加载失败`; return; }
  if (token !== selectionToken) return;
  activeCharacter = id;
  detailImage.src = character.image;
  detailImage.alt = `${character.name}三联屏人物介绍页面`;
  detail.setAttribute('aria-label', `${character.name}人物介绍`);
  home.classList.remove('is-active');
  home.setAttribute('aria-hidden', 'true');
  detail.classList.add('is-active');
  detail.setAttribute('aria-hidden', 'false');
  status.textContent = `已打开${character.name}介绍，按 Esc 返回首页`;
  document.querySelector('#back-button').focus({ preventScroll: true });
}

function showHome() {
  if (!activeCharacter) return;
  const previousCharacter = activeCharacter;
  ++selectionToken;
  activeCharacter = null;
  detail.classList.remove('is-active');
  detail.setAttribute('aria-hidden', 'true');
  home.classList.add('is-active');
  home.setAttribute('aria-hidden', 'false');
  status.textContent = '已返回首页';
  hotspots.querySelector(`[data-character="${previousCharacter}"]`)?.focus({ preventScroll: true });
  glowLayer.querySelectorAll('.glow').forEach(glow => glow.classList.remove('is-lit', 'is-pressed'));
}

document.querySelector('#back-button').addEventListener('click', showHome);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') showHome();
  if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey && !event.altKey) toggleFullscreen();
});

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { status.textContent = '当前浏览器未允许网页全屏，可使用 Safari 的全屏显示功能'; }
}
document.querySelector('#fullscreen-button').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', () => {
  document.querySelector('#fullscreen-button').textContent = document.fullscreenElement ? '⛶ 退出全屏' : '⛶ 全屏';
});
