const rows = [
['Source on GitHub ↗','GitHub 原始碼 ↗','GitHub でコードを見る ↗'],
['A SMALL TOOL FOR YOUR NEXT ADVENTURE','下一場冒險，用得上的小工具','次の冒険に、小さな道具を'],
['Every hero starts','每位英雄，','どんな勇者も、'],['with a little practice.','都從練習開始。','まずは練習から。'],
['I wanted to make a game. Getting a character to walk was… a whole side quest.','我本來只是想做個遊戲。結果，光是讓角色走路……就變成一整段支線任務。','ゲームを作りたかったんです。でも、キャラを歩かせるだけで……ひとつのサブクエストになりました。'],
['These motion guides helped. Maybe they’ll help you, too.','這些動作參考幫了不少忙。也許，你也用得上。','この動きのガイドに助けられました。あなたにも役立つかもしれません。'],
['01 / SET THE SCENE','01 / 先調好動作','01 / 動きを決めよう'],['What’s the move?','想怎麼動？','どんな動きにする？'],
['Motion','動作','動き'],['Walk in place','原地走路','その場で歩く'],['Stand & breathe','站立呼吸','立って呼吸する'],['Facing preset','預設朝向','向きのプリセット'],['Custom angle','自訂角度','自由な角度'],['Right →','向右 →','右 →'],['Left ←','向左 ←','左 ←'],['Front ↓','正面 ↓','正面 ↓'],['Back ↑','背面 ↑','背面 ↑'],['Turn around','轉個方向','横に回す'],['Camera elevation','鏡頭俯角','カメラの高さ（角度）'],['Preview speed','預覽速度','プレビュー速度'],['Original timing','原始速度','元の速さ'],['Half speed','半速','半分の速さ'],
['Side views start at 27.1°. Front and back use 40°. These are the angles that worked for our map characters.','側面預設 27.1°，正面和背面是 40°。這些角度用在我們的地圖角色上，效果不錯。','横は 27.1°、正面と背面は 40° から。私たちのマップ用キャラでは、この角度がうまくいきました。'],
['LIVE MOTION GUIDE','即時動作預覽','動きのプレビュー'],['8 frames · one complete loop','8 格 · 一個完整循環','8 コマ · ひとつのループ'],['Pause','暫停','一時停止'],['Play','播放','再生'],['Restart','重新播放','最初から'],['Next frame →','下一格 →','次のコマ →'],['Loading the mannequin…','正在載入模型……','モデルを読み込み中…'],
['Bring your own animation','帶上你的動畫','自分のアニメーションでも'],['Have an animated GLB? Open it here and try your own moves. Your file stays in your browser.','有帶動畫的 GLB 嗎？打開來，試試自己的動作。檔案只留在你的瀏覽器裡。','アニメーション付きの GLB はありますか？読み込んで、自分の動きでも試してみてください。ファイルはブラウザの中だけで扱います。'],['Open a GLB ↗','開啟 GLB ↗','GLB を開く ↗'],['Animation clip','動畫片段','アニメーションクリップ'],['Use built-in mannequin','使用內建模型','内蔵モデルに戻す'],['Up to 30 MB. Include the model and animation in one GLB. We use its own rig.','上限 30 MB。模型和動畫要放在同一個 GLB，會沿用檔案裡的骨架。','30 MB まで。モデルとアニメーションをひとつの GLB にまとめてください。元のリグをそのまま使います。'],
['02 / TAKE IT WITH YOU','02 / 帶著走吧','02 / 持っていこう'],['Pack a little.','帶點小東西，','少しだけ準備して、'],['Make a character move.','讓角色動起來。','キャラを動かそう。'],['Take the poses.','先把姿勢帶走。','ポーズを持っていく。'],['Like the move? Download these eight poses as one sprite sheet.','喜歡這個動作？把這八個姿勢下載成一張精靈圖集。','この動き、よさそう？8 つのポーズを一枚のスプライトシートにしてダウンロード。'],['Download sprite sheet ↗','下載精靈圖集 ↗','スプライトシートを保存 ↗'],['Bring your character.','再帶上你的角色。','キャラも連れていく。'],['Open your image generator. Attach the guide and your character’s still image. Either order is fine.','打開你的圖片生成工具，附上動作參考圖和角色靜態圖。順序不拘。','画像生成ツールを開いて、動きのガイドとキャラの静止画を添付します。順番はどちらでも大丈夫。'],['Give it a little direction.','給它一點方向。','ひとこと、お願いする。'],['Copy this prompt, paste it there, and generate. The poses are ready. Now for the costume.','複製提示詞，貼到圖片生成工具裡，就能開始生成。姿勢準備好了，接下來換角色上場。','プロンプトをコピーして、画像生成ツールに貼り付けたら生成。ポーズはできました。あとは衣装です。'],['Copy image prompt','複製英文圖片提示詞','画像用プロンプトをコピー（英語）'],
['Got your sheet? Make it move.','拿到圖集了？讓它動起來。','シートができたら、動かそう。'],['Slice the result into eight frames in your game or animation tool. Play them at the timing in this file. Check the feet and loop—AI still likes a little detour.','用遊戲或動畫工具把結果切成八格，照這份檔案的時間設定播放。記得看看腳步和循環，AI 還是偶爾會繞點路。','ゲームやアニメーションのツールで、結果を 8 コマに分割。このファイルのタイミングで再生します。足元とループは確認を。AI はまだ、ときどき寄り道します。'],['Download timing JSON','下載時間設定 JSON','タイミング JSON を保存'],['Guide: transparent PNG · 1536 × 512','參考圖：透明 PNG · 1536 × 512','ガイド：透過 PNG · 1536 × 512'],['One row, eight poses. Original animation timing.','一列八個姿勢，沿用原始動畫時間。','横一列に 8 ポーズ。元のアニメーションのタイミングです。'],['No account. No generation credits here.','不用註冊。這裡不提供圖片生成額度。','登録は不要。ここで画像生成クレジットは提供していません。'],['Use the guide with your own image tool.','搭配你自己的圖片生成工具使用就好。','いつもの画像生成ツールでガイドを使ってください。'],
['YOUR EIGHT POSES','你的八個姿勢','あなたの 8 ポーズ'],['A LITTLE PROOF','來看看成果','こんな感じになりました'],['Meet Hua.','這是 Hua。','こちらは Hua。'],['She can finally walk.','她終於會走路了。','やっと歩けました。'],['This is a result from our actual game project. Same idea: a motion guide, a simple character still, and a frame-conversion prompt.','這是我們遊戲專案的實際成果。方法一樣：動作參考圖、簡單的角色靜態圖，再加上逐格轉換的提示詞。','実際に作っているゲームでの成果です。使ったのは同じもの。動きのガイド、シンプルなキャラの静止画、それと各コマを変換するプロンプト。'],['AI can still wander off. Check the feet, silhouette, and loop at the size you’ll use in your game.','AI 還是可能走偏。用遊戲裡實際顯示的大小，檢查腳步、輪廓和循環。','AI が脱線することもあります。ゲームで使うサイズで、足元、シルエット、ループを確認してください。'],['Generated example · 8 frames · 1.33s','生成範例 · 8 格 · 1.33 秒','生成例 · 8 コマ · 1.33 秒'],['YOUR TURN','換你了','次はあなたの番'],['Export a guide you like.','匯出你喜歡的動作參考圖。','気に入ったガイドを書き出す。'],['Attach the motion guide and your original character still, in either order.','附上動作參考圖和原始角色靜態圖，順序不拘。','動きのガイドと元のキャラの静止画を添付。順番は自由です。'],['Paste the prompt into your image generator.','把提示詞貼到圖片生成工具。','画像生成ツールにプロンプトを貼り付ける。'],['Slice the result and play it at the exported timing.','把結果切格，照匯出的時間設定播放。','結果をコマに分けて、書き出したタイミングで再生。'],['Keep your original character still as the appearance reference. A previous animation can carry its mistakes into the next one.','外觀參考請用原始角色靜態圖。拿之前生成的動畫當參考，錯誤也可能跟著傳下去。','見た目の参考には、元のキャラの静止画を。前に生成したアニメーションを使うと、間違いまで引き継ぐことがあります。'],['Made while building Bloom Beyond the Mirror.','在製作 Bloom Beyond the Mirror 的途中做出來的小工具。','Bloom Beyond the Mirror を作る途中で生まれました。'],['Built with Codex · Three.js ·','使用 Codex · Three.js ·','制作：Codex · Three.js ·'],['Quaternius motion','Quaternius 動作','Quaternius のモーション'],['· ImageGen example','· ImageGen 生成範例','· ImageGen の生成例'],
['Sheet downloaded. Eight poses, ready for their costume.','圖集下載好了。八個姿勢，等角色上場。','シートを保存しました。8 ポーズ、あとは衣装です。'],['Prompt copied. Attach your guide and character still.','提示詞複製好了。記得附上參考圖和角色靜態圖。','コピーしました。ガイドとキャラの静止画も添付してください。'],['Select and copy the prompt below.','請選取並複製下方提示詞。','下のプロンプトを選択してコピーしてください。'],['Back to the built-in mannequin.','切回內建模型了。','内蔵モデルに戻りました。'],['Please use a GLB smaller than 30 MB.','請使用小於 30 MB 的 GLB。','30 MB 未満の GLB を使ってください。'],['Opening your animation…','正在開啟你的動畫……','アニメーションを読み込み中…'],['Use a self-contained GLB with embedded textures.','請使用內含材質貼圖的完整 GLB。','テクスチャを含む、単体で使える GLB を選んでください。'],['This model has no animation clips. Try an animated GLB.','這個模型沒有動畫片段。試試帶動畫的 GLB。','このモデルにはアニメーションがありません。アニメーション付きの GLB を試してください。'],['Loaded locally. Your model stays in this browser. Facing assumes +Z is forward; use the direction control to turn it.','載入好了，模型只留在瀏覽器裡。預設 +Z 是正前方，可以用方向控制調整。','読み込みました。モデルはブラウザ内だけで扱います。+Z を正面としているので、向きの設定で調整してください。'],['Could not open this GLB.','無法開啟這個 GLB。','この GLB を開けませんでした。'],['This clip has no duration.','這個片段沒有有效的播放時間。','このクリップには再生時間がありません。'],['The guide could not load. Please reload, or try a browser with WebGL enabled.','無法載入參考模型。請重新整理，或使用已啟用 WebGL 的瀏覽器。','ガイドを読み込めませんでした。再読み込みするか、WebGL が使えるブラウザで試してください。'],
['Restart animation','重新播放動畫','アニメーションを最初から'],['Open an animated GLB file','開啟帶動畫的 GLB 檔案','アニメーション付き GLB を開く'],['Image generation prompt','圖片生成提示詞','画像生成プロンプト'],['Exported eight-frame motion guide','匯出的八格動作參考圖','書き出した 8 コマの動きガイド'],['Hua walking animation example','Hua 走路動畫範例','Hua の歩行アニメーション例'],['New · simple shoe feet 3D animation','簡化鞋型模型 3D 動畫','シンプルな靴のモデルの 3D アニメーション']
];
const dictionary = new Map(rows.map(row => [row[0], row]));
const normalize = value => value.replace(/\s+/g, ' ').trim();
export function detectLanguage(languages) {
  for (const language of languages) {
    if (/^ja(?:-|$)/i.test(language)) return 'ja';
    if (/^zh(?:-|$)/i.test(language)) return 'zh-TW';
    if (/^en(?:-|$)/i.test(language)) return 'en';
  }
  return 'en';
}
let saved;
try { saved = localStorage.getItem('training-grounds-language'); } catch {}
let locale = ['en','zh-TW','ja'].includes(saved) ? saved : detectLanguage(navigator.languages || [navigator.language]);
function translate(text) {
  const key = normalize(text), row = dictionary.get(key);
  if (row) return row[['en','zh-TW','ja'].indexOf(locale)];
  const match = key.match(/^(Paused|Playing) · ([\d.]+)s loop · frame (\d+)\/8$/);
  if (match && locale !== 'en') return locale === 'ja' ? `${match[1] === 'Paused' ? '一時停止中' : '再生中'} · ${match[2]} 秒ループ · ${match[3]}/8 コマ` : `${match[1] === 'Paused' ? '已暫停' : '播放中'} · ${match[2]} 秒循環 · 第 ${match[3]}/8 格`;
  return text;
}
const dynamicIds = ['pause','status','notice','import-status'];
const originals = new WeakMap();
const staticRecords = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  if (node.parentElement.closest('script, style, textarea, #language') || dynamicIds.includes(node.parentElement.id)) continue;
  if (dictionary.has(normalize(node.nodeValue))) staticRecords.push([node, node.nodeValue]);
}
const attrs = [];
for (const el of document.querySelectorAll('[aria-label], [alt]')) for (const attr of ['aria-label','alt']) {
  const value = el.getAttribute(attr); if (value && dictionary.has(normalize(value))) attrs.push([el,attr,value]);
}
const dynamic = dynamicIds.map(id => document.getElementById(id));
function updateDynamic() {
  observer.disconnect();
  const canvas = document.querySelector("#cards canvas");
  if (canvas) canvas.setAttribute("aria-label", translate("New · simple shoe feet 3D animation"));
  for (const el of dynamic) {
    const current = el.textContent;
    const previous = originals.get(el);
    const source = previous && current === previous.rendered ? previous.source : current;
    const rendered = translate(source);
    originals.set(el, {source, rendered});
    if (current !== rendered) el.textContent = rendered;
  }
  for (const el of dynamic) observer.observe(el, {childList:true, characterData:true, subtree:true});
}
const observer = new MutationObserver(updateDynamic);
function apply() {
  document.documentElement.lang = locale;
  document.getElementById('language').value = locale;
  for (const [node, source] of staticRecords) node.nodeValue = translate(source);
  for (const [el,attr,source] of attrs) el.setAttribute(attr, translate(source));
  document.title = `Training Grounds · ${locale === 'ja' ? '冒険の前に、少し練習' : locale === 'zh-TW' ? '冒險之前，先練習一下' : 'A little practice before the adventure'}`;
  updateDynamic();
}
document.getElementById('language').addEventListener('change', e => {
  locale = e.target.value;
  try { localStorage.setItem('training-grounds-language', locale); } catch {}
  apply();
});
apply();
