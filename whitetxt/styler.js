var html = document.body.innerHTML;
var toReplace = {
  _whitetxt: `color:#fff`,
  "Python#lang": `color:#009BF7`,
  "C#lang": `color:#AABACD`,
  "JavaScript#lang": `color:#EAD64C`,
  "PHP#lang": `color:#8790BA`,
  "Flutter#lang": `color:#01C2EB`,
  "LaTeX#lang": `color:#00BDBD`,
  CyberCenturion: `color:#F46E76`,
  "punch#comp": `color:#FFFFFF`,
  Decentraland: `color:#FF8859`,
  "Vue.js": `color:#3FB984`,
  Vuetify: `color:#79C3FB`,
  "Beat ": `color:#FD2B2B`,
  Saber: `color:#3EA3FF`,
  Minecraft: `color:#96C539`,
  "Team Fortress 2": `color:#F49C3F`,
  flyLAT: "color:#3E8DC3",
};
for (const [key, value] of Object.entries(toReplace)) {
  const keyReplace = key.split("#", 1);
  html = html.replaceAll(key, `<span style="${value}">${keyReplace}</span>`);
}
document.body.innerHTML = html;
