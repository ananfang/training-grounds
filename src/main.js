import * as T from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
let imported = null;
let direction = "right";
const entries = [
  [
    "quaternius-walk-joints-shoes",
    "New · simple shoe feet",
    "Source foot rotation · neutral bind alignment",
  ],
];
const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(192, 512);
renderer.setClearColor(0, 0);
const cam = new T.OrthographicCamera(-0.85, 0.85, 0.95, -0.95, 0.1, 30),
  r = 8,
  a =
    ((direction === "up" || direction === "down" ? 40 : 27.1) * Math.PI) / 180;
cam.position.set(0, 0.9 + r * Math.sin(a), r * Math.cos(a));
cam.lookAt(0, 0.9, 0);
const motionSelect = document.querySelector("#motion");
const clips = [];
for (const [id, label, note] of entries) {
  const motion = await (
    await fetch(import.meta.env.BASE_URL + "assets/walk.json")
  ).json();
  const card = document.createElement("article");
  card.innerHTML = `<h2>${label}</h2><canvas width="192" height="512" aria-label="${label} 3D animation"></canvas><p>${note} · ${motion.duration.toFixed(2)}s</p><small>${id}</small>`;
  document.querySelector("#cards").append(card);
  const scene = new T.Scene();
  scene.rotation.y = {
    right: Math.PI / 2,
    left: -Math.PI / 2,
    up: Math.PI,
    down: 0,
  }[direction];
  scene.add(new T.HemisphereLight(0xffffff, 0x667788, 2.5));
  const light = new T.DirectionalLight(0xffffff, 2);
  light.position.set(-3, 7, 5);
  scene.add(light);
  const flat = id.includes("-flat");
  function outlined(m, isLimb = false) {
    if (flat) {
      const edge = new T.Mesh(
        m.geometry,
        new T.MeshBasicMaterial({ color: 0x30343b, side: T.BackSide }),
      );
      edge.scale.set(
        isLimb ? 1.36 : 1.1,
        isLimb ? 1.065 : 1.02,
        isLimb ? 1.36 : 1.1,
      );
      if (m.geometry.type === "SphereGeometry") edge.scale.setScalar(1.04);
      m.add(edge);
    }
    return m;
  }
  function sphere(rad, col) {
    const m = new T.Mesh(
      new T.SphereGeometry(rad, 16, 12),
      new (flat ? T.MeshBasicMaterial : T.MeshStandardMaterial)({ color: col }),
    );
    scene.add(m);
    return outlined(m);
  }
  function bone(col, isLimb = false) {
    const m = new T.Mesh(
      new T.CylinderGeometry(0.045, 0.045, 1, 12),
      new (flat ? T.MeshBasicMaterial : T.MeshStandardMaterial)({ color: col }),
    );
    scene.add(m);
    return outlined(m, isLimb);
  }
  const head = sphere(0.32, 0xc9cbd0),
    nose = sphere(0.035, 0xeeeeee),
    torso = bone(0xc9cbd0);
  torso.scale.x = 3.6;
  torso.scale.z = 2.8;
  if (flat) {
    nose.visible = false;
    const ink = new T.LineBasicMaterial({ color: 0x555963 });
    for (const axis of ["vertical", "horizontal"]) {
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const t = (i / 64) * Math.PI * 2;
        pts.push(
          axis === "vertical"
            ? new T.Vector3(0, Math.sin(t) * 0.322, Math.cos(t) * 0.322)
            : new T.Vector3(Math.sin(t) * 0.322, 0, Math.cos(t) * 0.322),
        );
      }
      head.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), ink));
    }
    const ring = [];
    for (let i = 0; i <= 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      ring.push(new T.Vector3(Math.sin(t) * 0.046, 0, Math.cos(t) * 0.046));
    }
    torso.add(new T.Line(new T.BufferGeometry().setFromPoints(ring), ink));
  }
  const eyes = [sphere(0.025, 0x263238), sphere(0.025, 0x263238)];
  const chestMarker = new T.Mesh(
    new T.BoxGeometry(0.025, 0.19, 0.015),
    new T.MeshBasicMaterial({ color: 0x263238 }),
  );
  scene.add(chestMarker);
  chestMarker.visible = false;
  eyes.forEach((eye) => (eye.visible = false));
  const limbs = [];
  for (const side of ["l", "r"])
    for (const type of ["leg", "arm"]) {
      const names =
        type === "leg"
          ? id.endsWith("-straight")
            ? ["thigh", "foot", "ball"]
            : ["thigh", "calf", "foot", "ball"]
          : id.endsWith("-straight")
            ? ["upperarm", "hand"]
            : ["upperarm", "lowerarm", "hand"];
      const col =
        type === "leg"
          ? side === "r"
            ? 0x20cfe5
            : 0xff9630
          : side === "r"
            ? 0x43df68
            : 0xdb46d5;
      for (let i = 0; i < names.length - 1; i++)
        limbs.push({
          from: names[i] + "_" + side,
          to: names[i + 1] + "_" + side,
          mesh: bone(
            type === "leg" && id.endsWith("-straight") && names[i] === "foot"
              ? side === "r"
                ? 0x087b91
                : 0xa54d08
              : col,
            true,
          ),
        });
    }
  const first = motion.frames[0],
    shoulder = new T.Vector3(...first.upperarm_l).sub(
      new T.Vector3(...first.upperarm_r),
    ),
    yaw = id.startsWith("quaternius-walk-joints")
      ? 0
      : Math.atan2(shoulder.z, shoulder.x);
  const shoes = {};
  if (id.endsWith("-shoes")) {
    for (const side of ["l", "r"]) {
      const geometry = new T.BoxGeometry(0.1, 0.065, 0.19);
      geometry.translate(0, -0.025, 0.045);
      const shoe = new T.Mesh(
        geometry,
        new T.MeshStandardMaterial({
          color: side === "r" ? 0x087b91 : 0xa54d08,
        }),
      );
      scene.add(shoe);
      shoes[side] = shoe;
    }
    limbs
      .filter((l) => l.from.startsWith("foot_"))
      .forEach((l) => (l.mesh.visible = false));
  }
  clips.push({
    shoes,
    id,
    yaw,
    motion,
    scene,
    head,
    nose,
    torso,
    eyes,
    chestMarker,
    limbs,
    ctx: card.querySelector("canvas").getContext("2d"),
  });
}
function join(m, a, b) {
  const delta = b.clone().sub(a);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.scale.y = delta.length();
  m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), delta.normalize());
}
let exporting = false;
let time = 0,
  last = performance.now(),
  paused = false;
const btn = document.querySelector("#pause");
btn.onclick = () => {
  paused = !paused;
  btn.textContent = paused ? "Play" : "Pause";
};
document.querySelector("#restart").onclick = () => (time = 0);
document.querySelector("#step").onclick = () => {
  paused = true;
  btn.textContent = "Play";
  time =
    (((Math.floor((time / clips[0].motion.duration) * 8) + 1) % 8) *
      clips[0].motion.duration) /
    8;
};
function draw(now) {
  if (!paused && !document.hidden)
    time +=
      (Math.max(0, Math.min(now - last, 100)) / 1000) *
      Number(document.querySelector("#speed").value);
  last = now;
  for (const c of clips) {
    const phase = (time % c.motion.duration) / c.motion.duration;
    const frameIndex = c.id.endsWith("-eight")
      ? Math.floor(phase * 8) * 15
      : Math.floor(phase * 120) % 120;
    const f = c.motion.frames[frameIndex];
    const rotate = (p) => p.applyAxisAngle(new T.Vector3(0, 1, 0), c.yaw);
    const raw = (n) =>
      rotate(new T.Vector3(...f[n]).sub(new T.Vector3(...f.pelvis)));
    const isWalk = c.id.startsWith("quaternius-walk-joints");
    const isKay = c.id === "kaykit-Idle";
    const hips = new T.Vector3(
        0,
        isKay
          ? 0.877 + (f.pelvis[1] - c.motion.frames[0].pelvis[1])
          : f.pelvis[1] - (isWalk ? 0.2 : 0),
        0,
      ),
      chest = hips.clone().add(new T.Vector3(0, 0.27, 0));
    c.torso.scale.x = 3.6;
    c.torso.scale.z = 2.8;
    join(c.torso, hips, chest);
    c.head.position.copy(chest).add(new T.Vector3(0, 0.34, 0));
    c.nose.position.copy(c.head.position).add(new T.Vector3(0, 0, 0.31));
    c.eyes.forEach((eye, i) =>
      eye.position
        .copy(c.head.position)
        .add(new T.Vector3(i === 0 ? -0.09 : 0.09, 0.065, 0.3)),
    );
    c.chestMarker.position.copy(hips).add(new T.Vector3(0, 0.15, 0.133));
    const points = {};
    for (const side of ["l", "r"]) {
      const sign = side === "l" ? 1 : -1;
      // Rigidly relocate each chain: preserve every source limb length and bend.
      const shoulder = raw("upperarm_" + side),
        hip = raw("thigh_" + side);
      const armAnchor = chest.clone().add(new T.Vector3(sign * 0.19, 0, 0));
      const legAnchor = hips.clone().add(new T.Vector3(sign * 0.09, 0, 0));
      for (const n of ["upperarm", "lowerarm", "hand"])
        points[n + "_" + side] = raw(n + "_" + side)
          .sub(shoulder)
          .multiplyScalar(c.id.endsWith("-straight") ? 0.8 : 1)
          .add(armAnchor);
      for (const n of ["thigh", "calf", "foot", "ball"])
        points[n + "_" + side] = raw(n + "_" + side)
          .sub(hip)
          .multiplyScalar(isKay ? 2 : isWalk ? 0.7 : 1)
          .add(legAnchor);
    }
    for (const side of ["l", "r"])
      if (c.shoes[side]) {
        const shoe = c.shoes[side];
        shoe.position.copy(points["foot_" + side]);
        shoe.quaternion
          .fromArray(f.footRotations[side])
          .multiply(
            new T.Quaternion().fromArray(c.motion.bindFeet[side]).invert(),
          );
      }
    if (motionSelect.value === "idle") {
      const breath = (1 - Math.cos(phase * Math.PI * 2)) / 2;
      const bounce = -0.018 * (1 - breath);
      const pelvis = new T.Vector3(0, 0.64 + bounce, 0),
        sternum = new T.Vector3(0, 0.91 + bounce + 0.035 * breath, 0);
      join(c.torso, pelvis, sternum);
      c.torso.scale.x = 3.6 * (1 + 0.09 * breath);
      c.torso.scale.z = 2.8 * (1 + 0.12 * breath);
      c.head.position.set(0, 1.25 + bounce + 0.012 * breath, 0);
      c.nose.position.copy(c.head.position).add(new T.Vector3(0, 0, 0.31));
      for (const side of ["l", "r"]) {
        const sign = side === "l" ? 1 : -1;
        points["thigh_" + side] = new T.Vector3(sign * 0.09, 0.64 + bounce, 0);
        points["foot_" + side] = new T.Vector3(sign * 0.12, 0.1, 0);
        const hip = points["thigh_" + side],
          ankle = points["foot_" + side],
          halfDistance = hip.distanceTo(ankle) / 2;
        const segmentLength = Math.sqrt(
          0.015 * 0.015 + 0.27 * 0.27 + 0.008 * 0.008,
        );
        points["calf_" + side] = hip
          .clone()
          .add(ankle)
          .multiplyScalar(0.5)
          .add(
            new T.Vector3(
              0,
              0,
              Math.sqrt(
                Math.max(
                  0,
                  segmentLength * segmentLength - halfDistance * halfDistance,
                ),
              ),
            ),
          );
        points["ball_" + side] = new T.Vector3(sign * 0.12, 0.075, 0.1);
        points["upperarm_" + side] = new T.Vector3(
          sign * (0.19 + 0.015 * breath),
          0.91 + bounce + 0.03 * breath,
          0,
        );
        points["lowerarm_" + side] = new T.Vector3(
          sign * (0.235 + 0.02 * breath),
          0.72 + bounce + 0.018 * breath,
          0.008,
        );
        points["hand_" + side] = new T.Vector3(
          sign * (0.245 + 0.025 * breath),
          0.55 + bounce + 0.01 * breath,
          0.025,
        );
        c.shoes[side].position.copy(points["foot_" + side]);
        c.shoes[side].quaternion.identity();
      }
    }
    for (const limb of c.limbs)
      join(limb.mesh, points[limb.from], points[limb.to]);
    const frameWidth = c.ctx.canvas.width;
    if (renderer.domElement.width !== frameWidth)
      renderer.setSize(frameWidth, 512);
    cam.left = (-0.85 * 420) / 384;
    cam.right = -cam.left;
    cam.top = (cam.right * 512) / 192;
    cam.bottom = -cam.top;
    cam.updateProjectionMatrix();
    if (imported) {
      imported.mixer.setTime(time % clips[0].motion.duration);
      imported.scene.rotation.y = c.scene.rotation.y;
    }
    renderer.render(imported ? imported.scene : c.scene, cam);
    c.ctx.clearRect(0, 0, frameWidth, 512);
    c.ctx.drawImage(renderer.domElement, 0, 0);
  }
  document.querySelector("#status").textContent =
    (paused ? "Paused" : "Playing") +
    " · " +
    clips[0].motion.duration.toFixed(2) +
    "s loop · frame " +
    (Math.floor(
      ((time % clips[0].motion.duration) / clips[0].motion.duration) * 8,
    ) +
      1) +
    "/8";
  if (!exporting) requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function configure() {
  const rotation = Number(document.querySelector("#rotation").value);
  direction = ({0: "down", 90: "right", "-90": "left", 180: "up", "-180": "up"})[rotation] || "custom";
  document.querySelector("#direction").value = direction;
  const elevation = Number(document.querySelector("#elevation").value);
  const angle = (elevation * Math.PI) / 180;
  cam.position.set(0, 0.9 + 8 * Math.sin(angle), 8 * Math.cos(angle));
  cam.lookAt(0, 0.9, 0);
  clips[0].scene.rotation.y = rotation * Math.PI / 180;
  document.querySelector("#rotation-angle").textContent = rotation + "°";
  clips[0].motion.duration = imported
    ? imported.clip.duration
    : motionSelect.value === "idle"
      ? 3
      : 1.333333373;
  time = 0;
  document.querySelector("#angle").textContent = elevation + "°";
  if (!document.querySelector("#prompt").hidden) document.querySelector("#prompt").value = prompt();
  document.querySelector("#sheet-result").hidden = true;
  document.querySelector("#notice").textContent = "";
}
document.querySelector("#direction").onchange = () => {
  document.querySelector("#rotation").value = ({down: 0, right: 90, left: -90, up: 180})[document.querySelector("#direction").value];
  document.querySelector("#elevation").value = ["up", "down"].includes(
    document.querySelector("#direction").value,
  )
    ? 40
    : 27.1;
  configure();
};
motionSelect.onchange = () => {
  if (imported) {
    disposeImport();
  }
  if (motionSelect.value === "idle") {
    document.querySelector("#direction").value = "down";
    document.querySelector("#rotation").value = 0;
    document.querySelector("#elevation").value = 40;
  }
  configure();
};
document.querySelector("#elevation").oninput = configure;
document.querySelector("#rotation").oninput = configure;
function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function metadata() {
  return {
    motion: imported ? imported.clip.name : motionSelect.value,
    direction,
    frames: 8,
    columns: 8,
    rows: 1,
    width: 1536,
    height: 512,
    cellWidth: 192,
    cellHeight: 512,
    durationSeconds: clips[0].motion.duration,
    frameDurationMs: (clips[0].motion.duration * 1000) / 8,
    modelRotationDegrees: Number(document.querySelector("#rotation").value),
    cameraElevation: Number(document.querySelector("#elevation").value),
    sampleTimes: Array.from(
      { length: 8 },
      (_, i) => (i * clips[0].motion.duration) / 8,
    ),
  };
}
document.querySelector("#export").onclick = async () => {
  const old = time,
    wasPaused = paused;
  paused = true;
  const sheet = document.createElement("canvas");
  sheet.width = 1536;
  sheet.height = 512;
  const ctx = sheet.getContext("2d");
  for (let i = 0; i < 8; i++) {
    time = (clips[0].motion.duration * i) / 8;
    exporting = true;
    draw(performance.now());
    ctx.drawImage(clips[0].ctx.canvas, i * 192, 0);
  }
  time = old;
  paused = wasPaused;
  exporting = false;
  const blob = await new Promise((resolve) => sheet.toBlob(resolve));
  download(
    blob,
    "training-grounds-" + motionSelect.value + "-" + direction + ".png",
  );
  document.querySelector("#sheet-preview").src = sheet.toDataURL();
  document.querySelector("#sheet-result").hidden = false;
  document.querySelector("#notice").textContent =
    "Sheet downloaded. Eight poses, ready for their costume.";
};
document.querySelector("#metadata").onclick = () =>
  download(
    new Blob([JSON.stringify(metadata(), null, 2)], {
      type: "application/json",
    }),
    "animation.json",
  );
function prompt() {
  return `Use the attached references by their content, regardless of attachment order: the sprite sheet showing eight motion poses is the motion guide; the single character still is the appearance reference. Convert every frame of the motion guide into the character shown in the appearance reference. Preserve the eight poses in their exact left-to-right order, the overall shape of each pose, limb angles, foot tilt, camera view, scale and placement. Match the viewing direction shown in the guide exactly. This is a ${imported ? imported.clip.name : motionSelect.value === "idle" ? "planted standing breathing" : "walking"} animation. Carefully follow each limb in each frame. ${imported ? "The guide shows an imported animated model. Use its pose geometry, not its existing costume or colors." : "Guide colors identify anatomical sides: right arm green, left arm magenta, right leg cyan, left leg orange; darker blocks are feet, gray parts are head and torso."} Completely cover every guide component with the character’s anatomy and clothing from the appearance reference. No guide colors, rods, joints, or construction marks may remain. Preserve character identity, outfit, colors and pixel-art style. Keep one horizontal row of eight frames, consistent character proportions and a transparent background. Do not add frames, captions or scenery. This sheet represents one ${clips[0].motion.duration.toFixed(3)}-second loop; do not repeat the first pose at the end.`;
}
document.querySelector("#copy").onclick = async () => {
  document.querySelector("#prompt").value = prompt();
  try {
    await navigator.clipboard.writeText(prompt());
    document.querySelector("#notice").textContent =
      "Prompt copied. Attach your guide and character still.";
  } catch {
    document.querySelector("#notice").textContent =
      "Select and copy the prompt below.";
  }
  document.querySelector("#prompt").hidden = false;
};
configure();
const example = document.querySelector("#example"),
  ex = example.getContext("2d"),
  art = new Image();
art.src = import.meta.env.BASE_URL + "assets/hua-walk.png";
function animateExample(now) {
  if (art.complete && art.naturalWidth) {
    ex.clearRect(0, 0, 320, 450);
    ex.drawImage(
      art,
      (Math.floor(now / (1333.333373 / 8)) % 8) * 320,
      0,
      320,
      450,
      0,
      0,
      320,
      450,
    );
  }
  requestAnimationFrame(animateExample);
}
requestAnimationFrame(animateExample);

function disposeImport() {
  if (!imported) return;
  imported.mixer.stopAllAction();
  imported.scene.traverse((o) => {
    o.geometry?.dispose();
    if (o.material) {
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        for (const v of Object.values(m)) if (v?.isTexture) v.dispose();
        m.dispose();
      }
    }
  });
  imported = null;
  document.querySelector("#clip-label").hidden = true;
  document.querySelector("#import-status").textContent =
    "Back to the built-in mannequin.";
}
document.querySelector("#glb").onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const status = document.querySelector("#import-status");
  if (file.size > 30 * 1024 * 1024) {
    status.textContent = "Please use a GLB smaller than 30 MB.";
    return;
  }
  status.textContent = "Opening your animation…";
  try {
    const manager = new T.LoadingManager();
    manager.setURLModifier((url) => {
      if (/^(data:|blob:)/.test(url)) return url;
      throw new Error("Use a self-contained GLB with embedded textures.");
    });
    const gltf = await new GLTFLoader(manager).parseAsync(
      await file.arrayBuffer(),
      "",
    );
    if (!gltf.animations.length)
      throw new Error(
        "This model has no animation clips. Try an animated GLB.",
      );
    disposeImport();
    const scene = new T.Scene();
    scene.add(new T.HemisphereLight(0xffffff, 0x667788, 2.5));
    const light = new T.DirectionalLight(0xffffff, 2);
    light.position.set(-3, 7, 5);
    scene.add(light);
    const pivot = new T.Group();
    pivot.add(gltf.scene);
    scene.add(pivot);
    const mixer = new T.AnimationMixer(gltf.scene);
    imported = {
      scene,
      mixer,
      root: gltf.scene,
      pivot,
      clips: gltf.animations,
      clip: gltf.animations[0],
    };
    const select = document.querySelector("#clip");
    select.replaceChildren(
      ...gltf.animations.map(
        (clip, i) => new Option(clip.name || "Clip " + (i + 1), i),
      ),
    );
    document.querySelector("#clip-label").hidden = false;
    selectClip(0);
    status.textContent =
      "Loaded locally. Your model stays in this browser. Facing assumes +Z is forward; use the direction control to turn it.";
  } catch (err) {
    status.textContent = err.message || "Could not open this GLB.";
  }
  e.target.value = "";
};
function selectClip(index) {
  if (!imported) return;
  const i = imported;
  i.mixer.stopAllAction();
  i.clip = i.clips[index];
  if (!(i.clip.duration > 0)) {
    document.querySelector("#import-status").textContent =
      "This clip has no duration.";
    disposeImport();
    configure();
    return;
  }
  i.mixer.clipAction(i.clip).reset().play();
  i.pivot.scale.setScalar(1);
  i.pivot.position.set(0, 0, 0);
  const bounds = new T.Box3();
  for (let n = 0; n < 32; n++) {
    i.mixer.setTime((n * i.clip.duration) / 32);
    i.scene.updateMatrixWorld(true);
    bounds.union(new T.Box3().setFromObject(i.root));
  }
  const size = bounds.getSize(new T.Vector3()),
    center = bounds.getCenter(new T.Vector3());
  const scale = 1.5 / Math.max(size.x, size.y, size.z, 0.001);
  i.pivot.scale.setScalar(scale);
  i.pivot.position.set(
    -center.x * scale,
    0.9 - center.y * scale,
    -center.z * scale,
  );
  configure();
}
document.querySelector("#clip").onchange = (e) =>
  selectClip(Number(e.target.value));

document.querySelector('#builtin').onclick=()=>{disposeImport();configure()};
