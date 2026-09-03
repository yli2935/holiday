// 2026 Labour Day · Grand Bend + 小伦敦 两日游 —— 行程数据
// 改行程只需要改这个文件

export const TRIP = {
  title: "Grand Bend 海滩之旅",
  subtitle: "2026 Labour Day 长周末",
  dates: "2026.09.06 周日 — 09.07 周一 · Labour Day",
  departAt: "2026-09-06T12:00:00-04:00",
  endAt: "2026-09-07T23:59:59-04:00",
};

export const TRAVELERS = [
  { name: "Adam", emoji: "🏄" },
  { name: "鹿鹿", emoji: "🦌" },
  { name: "妹妹", emoji: "🎀" },
  { name: "Shawn", emoji: "🕶️" },
  { name: "Yuki", emoji: "🍧" },
  { name: "Gaven", emoji: "🏐" },
  { name: "Kisty", emoji: "🦩" },
  { name: "嘉嘉", emoji: "✨" },
  { name: "璨", emoji: "🌟" },
];

export const gmaps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export type RouteStep = {
  time: string;
  text: string;
  mapQuery?: string;
  drive?: boolean; // 开车路段
};

export type Car = {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  note: string;
  members: string[];
  steps: RouteStep[];
};

export const CARS: Car[] = [
  {
    id: "a",
    name: "A车",
    emoji: "🚗",
    gradient: "from-orange-400 to-rose-400",
    note: "中午出发 · 途中接 Shawn",
    members: ["Adam", "鹿鹿", "妹妹", "Shawn"],
    steps: [
      { time: "12:00", text: "Scarborough 集合出发" },
      {
        drive: true,
        time: "约 45 分钟 · ~40 km",
        text: "401 → DVP/427 → Gardiner 西行；周日中午 Gardiner 可能小堵，导航看实时路况",
      },
      {
        time: "12:45",
        text: "接 Shawn：1 Palace Pier Ct, Etobicoke（楼下即停即走，预留 15 分钟）",
        mapQuery: "1 Palace Pier Ct, Etobicoke, ON M8V 3W9",
      },
      { time: "13:00", text: "重新出发，导航 Grand Bend" },
      {
        drive: true,
        time: "约 2 小时 45 分 · ~220 km",
        text: "427 N → 401 W → 402 W → Hwy 81 N（Grand Bend 方向）；顺畅约 2.5 小时，含 ONroute Cambridge 休息 15 分钟。长周末 401 Milton–Cambridge 段易堵",
      },
      {
        time: "≈16:00",
        text: "抵达 Grand Bend（若 401 拥堵，最晚 16:30 前），先自由逛逛等人齐",
        mapQuery: "Grand Bend, Ontario",
      },
    ],
  },
  {
    id: "b",
    name: "B车",
    emoji: "🚙",
    gradient: "from-sky-400 to-cyan-400",
    note: "上午随意出发 · 接 Kisty",
    members: ["Yuki", "Gaven", "Kisty"],
    steps: [
      { time: "上午", text: "Yuki & Gaven 上午随意出发，接上 Kisty 后直奔 Grand Bend" },
      {
        drive: true,
        time: "约 2 小时 45 分 · ~220 km",
        text: "401 W → 402 W → Hwy 81 N；不停靠约 2.5 小时，停一次 ONroute 约 +15 分钟。想 15:00 左右到，12:00 出头上路就行，早走更从容",
      },
      {
        time: "≈15:00",
        text: "抵达 Grand Bend：随便逛逛，等大家到齐",
        mapQuery: "Grand Bend Beach",
      },
    ],
  },
  {
    id: "c",
    name: "C车",
    emoji: "🚕",
    gradient: "from-amber-400 to-orange-400",
    note: "自由双人组 · 直达",
    members: ["嘉嘉", "璨"],
    steps: [
      { time: "12:30", text: "从家出发（建议 12:30 前上路）" },
      {
        drive: true,
        time: "约 2 小时 45 分 · ~220 km",
        text: "401 W → 402 W → Hwy 81 N；不停靠约 2.5 小时，停一次 ONroute 约 +15 分钟",
      },
      {
        time: "≈15:15",
        text: "抵达 Grand Bend，先自由逛逛等人齐",
        mapQuery: "Colonial Hotel & Suites Grand Bend",
      },
    ],
  },
];

export type Activity = {
  time: string;
  emoji: string;
  title: string;
  desc: string;
  mapQuery?: string;
  tag?: "行" | "住" | "玩" | "吃" | "景";
};

export type Day = {
  id: string;
  label: string;
  date: string;
  theme: string;
  gradient: string;
  activities: Activity[];
};

export const DAYS: Day[] = [
  {
    id: "day1",
    label: "Day 1",
    date: "9月6日 · 周日",
    theme: "出发 · 海滩 · 世界级日落",
    gradient: "from-sky-500 to-cyan-400",
    activities: [
      {
        time: "12:00",
        emoji: "🚗",
        title: "三车出发",
        desc: "A车从 Scarborough 出发去接 Shawn；B车上午已在路上；C车直奔目的地。全员导航 Grand Bend！",
        tag: "行",
      },
      {
        time: "16:00",
        emoji: "🏨",
        title: "酒店会师 & 入住",
        desc: "先到的自己在主街逛逛、吃点东西、海边踩踩水；16:00 在 Colonial Hotel & Suites（1 Main St W）会师办入住，放行李换泳衣。",
        mapQuery: "Colonial Hotel & Suites Grand Bend",
        tag: "住",
      },
      {
        time: "16:30",
        emoji: "🏖️",
        title: "海滩集合！",
        desc: "Grand Bend 主海滩：游泳、沙滩排球、拍照、躺平——九个人终于齐了！",
        mapQuery: "Grand Bend Beach",
        tag: "玩",
      },
      {
        time: "16:45",
        emoji: "🌊",
        title: "Jet Ski 分批上水",
        desc: "River Rd 码头出发（Splash / Xtreme Watersports），约 1 小时一批。18+ 带驾照，需押金，长周末强烈建议提前预订。最好戴隐形眼镜；戴框架眼镜的一定用眼镜绳绑住，不然容易喂给 Lake Huron（湖底已经有Adam的眼镜了）。❄️ 当天太冷就切 Plan B：卡丁车 Grand Bend Speedway（70114D Grand Bend Line, Parkhill，约 5-10 分钟）或 Alton Farms 酒庄（5547 Aberarder Line, Plympton-Wyoming，约 35 分钟，周日开到 18:00）。",
        mapQuery: "Xtreme Water Sports 59 River Rd Grand Bend",
        tag: "玩",
      },
      {
        time: "18:30",
        emoji: "🍔",
        title: "主街晚餐",
        desc: "长周末人多，18:30 前入座稳一点。海边薯条、taphouse、墨西哥卷都在步行范围内。",
        mapQuery: "restaurants Grand Bend Main Street",
        tag: "吃",
      },
      {
        time: "19:30",
        emoji: "🌅",
        title: "世界级日落",
        desc: "Grand Bend 的落日号称世界前十。提前 20 分钟去海滩占位，日落约 19:50，别在餐厅坐过头！",
        tag: "景",
      },
      {
        time: "20:30",
        emoji: "🍦",
        title: "夜游主街",
        desc: "冰淇淋收尾，逛逛纪念品小店，桥上吹吹晚风；回酒店围着 fireplace 小酌一杯，桌游/开黑/休息。",
        tag: "玩",
      },
    ],
  },
  {
    id: "day2",
    label: "Day 2",
    date: "9月7日 · 周一 · Labour Day",
    theme: "沙丘 · 小伦敦 · 满载而归",
    gradient: "from-orange-500 to-rose-400",
    activities: [
      {
        time: "08:30",
        emoji: "☕",
        title: "早餐 & 退房",
        desc: "主街咖啡早餐，收拾行李，11:00 前退房，行李上车。",
        tag: "吃",
      },
      {
        time: "09:30",
        emoji: "🌲",
        title: "Pinery 省立公园",
        desc: "车程约 10 分钟：Cedar Trail 沙丘步道 + 罕见的橡树草原。长周末建议提前在 Ontario Parks 买日票（约 $21/车）。不想动的可以继续赖在海滩。",
        mapQuery: "Pinery Provincial Park",
        tag: "景",
      },
      {
        time: "11:30",
        emoji: "🛣️",
        title: "南下小伦敦",
        desc: "Hwy 81 S → Hwy 4 S 一路向南，约 63 km / 55 分钟抵达 London。",
        tag: "行",
      },
      {
        time: "12:30",
        emoji: "🥟",
        title: "东北一家人",
        desc: "锅包肉、地三鲜、尖椒干豆腐、蒜泥白肉、干锅肥肠、五彩大拉皮、番茄牛肉煲全都安排上！法定假日建议提前电话确认营业时间并订位。",
        mapQuery: "东北一家人 London Ontario",
        tag: "吃",
      },
      {
        time: "14:15",
        emoji: "🏙️",
        title: "London Downtown 散步",
        desc: "Victoria Park、Richmond Row、街头壁画随手拍。假日部分店铺关门，权当饭后消食。",
        mapQuery: "Victoria Park London Ontario",
        tag: "景",
      },
      {
        time: "15:00",
        emoji: "🍦",
        title: "Haven's Creamery",
        desc: "Downtown 人气手工冰淇淋店，散步途中来一勺再上路。",
        mapQuery: "Haven's Creamery London Ontario",
        tag: "吃",
      },
      {
        time: "15:45",
        emoji: "🍓",
        title: "Heeman's 草莓时间",
        desc: "招牌草莓圣代 + 玻璃花房，带点秋草莓回家。从 downtown 过去约 15 km / 20 分钟，就在上 401 前的顺路上。",
        mapQuery: "Heeman's Garden Centre Thorndale",
        tag: "吃",
      },
      {
        time: "17:00",
        emoji: "🚗",
        title: "踏上归途",
        desc: "Highbury Ave → 401 E 回多伦多，约 200 km：顺畅 2 小时 15 分，Labour Day 返程按 2.5 小时算，尽量 17:00 前出发。",
        tag: "行",
      },
      {
        time: "19:30",
        emoji: "🏠",
        title: "到家",
        desc: "完美收官！群里交作业：谁拍的日落最好看？",
        tag: "行",
      },
    ],
  },
];

export type Spot = {
  emoji: string;
  name: string;
  en: string;
  desc: string;
  gradient: string;
  tags: string[];
  mapQuery: string;
};

export const SPOTS: Spot[] = [
  {
    emoji: "🏖️",
    name: "Grand Bend 主海滩",
    en: "Grand Bend Main Beach",
    gradient: "from-sky-400 via-cyan-300 to-teal-300",
    desc: "蓝旗认证海滩，细软白沙配 Lake Huron 的果冻蓝，日落全加拿大出名。",
    tags: ["游泳", "日落", "拍照"],
    mapQuery: "Grand Bend Beach",
  },
  {
    emoji: "🌊",
    name: "Jet Ski 水上摩托",
    en: "Splash / Xtreme Watersports",
    gradient: "from-blue-500 via-sky-400 to-cyan-300",
    desc: "River Rd 码头出发冲进 Lake Huron。18+ 带驾照，没有船牌现场发临时证，建议提前预订。眼镜党记得备眼镜绳。",
    tags: ["刺激", "约1小时", "18+"],
    mapQuery: "Xtreme Water Sports Grand Bend",
  },
  {
    emoji: "🏎️",
    name: "卡丁车（Plan B）",
    en: "Grand Bend Speedway & Go Kart Centre",
    gradient: "from-slate-500 via-slate-400 to-zinc-300",
    desc: "湖水太冷的备选：9 人分组刷圈速，输的请冰淇淋。完全不沾水，离镇上仅 5-10 分钟。地址：70114D Grand Bend Line, Parkhill。",
    tags: ["Plan B", "刺激", "不沾水"],
    mapQuery: "70114D Grand Bend Line, Parkhill, ON N0M 2K0",
  },
  {
    emoji: "🍷",
    name: "Alton Farms 酒庄（Plan B）",
    en: "Alton Farms Estate Winery",
    gradient: "from-purple-500 via-fuchsia-400 to-rose-300",
    desc: "湖水太冷的备选：Lambton 第一家酒庄，露台品酒 + 葡萄园步道，免预约，周日开到 18:00。车程约 35 分钟，司机浅尝。地址：5547 Aberarder Line, Plympton-Wyoming。",
    tags: ["Plan B", "品酒", "出片"],
    mapQuery: "Alton Farms Estate Winery, 5547 Aberarder Line, Plympton-Wyoming",
  },
  {
    emoji: "🏨",
    name: "Colonial Hotel & Suites",
    en: "大本营 · 9/6 一晚",
    gradient: "from-amber-400 via-orange-300 to-rose-300",
    desc: "就在主街上（1 Main St W），步行 5 分钟到海滩。入住 16:00 / 退房 11:00。",
    tags: ["主街", "近海滩"],
    mapQuery: "Colonial Hotel & Suites Grand Bend",
  },
  {
    emoji: "🌲",
    name: "Pinery 省立公园",
    en: "Pinery Provincial Park",
    gradient: "from-emerald-400 via-teal-300 to-cyan-300",
    desc: "10 公里海岸线、连绵沙丘和罕见的橡树草原，Cedar Trail 轻松好走。日票记得提前买。",
    tags: ["徒步", "沙丘", "备选"],
    mapQuery: "Pinery Provincial Park",
  },
  {
    emoji: "🥟",
    name: "东北一家人",
    en: "小伦敦 · 东北菜",
    gradient: "from-rose-400 via-red-300 to-orange-300",
    desc: "锅包肉、地三鲜——海边吹完风就该吃点硬菜。记得电话订位。",
    tags: ["午餐", "硬菜"],
    mapQuery: "东北一家人 London Ontario",
  },
  {
    emoji: "🍓",
    name: "Heeman's",
    en: "草莓农场 & 花房",
    gradient: "from-pink-400 via-rose-300 to-red-300",
    desc: "招牌草莓圣代和秋草莓，还有一整个玻璃花房可以逛。位置就在回多伦多的顺路上。",
    tags: ["甜品", "伴手礼", "顺路"],
    mapQuery: "Heeman's Garden Centre Thorndale",
  },
  {
    emoji: "🍦",
    name: "Haven's Creamery",
    en: "Downtown 手工冰淇淋",
    gradient: "from-cyan-400 via-sky-300 to-indigo-300",
    desc: "小伦敦 downtown 的人气手工冰淇淋，散步途中的甜点补给站。",
    tags: ["甜品", "散步顺路"],
    mapQuery: "Haven's Creamery London Ontario",
  },
  {
    emoji: "🏙️",
    name: "Downtown London",
    en: "Victoria Park · Richmond Row",
    gradient: "from-violet-400 via-purple-300 to-fuchsia-300",
    desc: "饭后在 Victoria Park 和 Richmond Row 散步消食，街头壁画随手出片。",
    tags: ["散步", "街拍"],
    mapQuery: "Victoria Park London Ontario",
  },
];

export type ChecklistGroup = { group: string; emoji: string; items: string[] };

export const CHECKLIST: ChecklistGroup[] = [
  {
    group: "必带",
    emoji: "🎒",
    items: [
      "泳衣 & 换洗衣物",
      "防晒霜 SPF50+",
      "沙滩巾 / 浴巾",
      "拖鞋 & 水鞋",
      "洗漱用品",
      "驾照（Jet Ski 要用）",
      "充电宝 & 车充",
    ],
  },
  {
    group: "进阶装备",
    emoji: "✨",
    items: [
      "沙滩椅",
      "蓝牙音箱",
      "零食 & 一箱水",
      "酒水（带一点 · 海滩禁酒，回酒店喝）",
      "桌游 / UNO",
      "厚外套（晚上湖边凉）",
    ],
  },
];

export const TIPS: { emoji: string; title: string; desc: string }[] = [
  {
    emoji: "🚦",
    title: "错峰出行",
    desc: "长周末 401/402 车多，去程按计划错峰；返程尽量 17:00 前从伦敦上高速。",
  },
  {
    emoji: "🌅",
    title: "日落约 19:50",
    desc: "Day 1 的重头戏。提前 20 分钟到海滩占位，别在餐厅坐过头。",
  },
  {
    emoji: "🛥️",
    title: "Jet Ski 先预订",
    desc: "长周末现场排队够呛，提前线上或电话预订；18+ 带驾照，需信用卡押金。",
  },
  {
    emoji: "🌲",
    title: "Pinery 日票",
    desc: "长周末日票可能售罄，提前在 Ontario Parks 官网购买每日车辆许可。",
  },
  {
    emoji: "📞",
    title: "假日营业时间",
    desc: "9/7 是法定假日，东北一家人和 Heeman's 出发前电话确认营业时间。",
  },
  {
    emoji: "🧊",
    title: "九月的湖水",
    desc: "Lake Huron 九月初水温偏凉，下水循序渐进；晚上湖边记得带件外套。Jet Ski 嫌冷就启动 Plan B：卡丁车或 Alton Farms 酒庄。",
  },
];
