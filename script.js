const subtitles = [
  "有些答案，会先在心里排队。",
  "别急，人生还没到交卷的时候。",
  "问一句，借一口气。",
  "犹豫不是没方向，是方向还没敢出声。",
  "世界很吵，先听听你站在哪边。",
  "有些选择，不是想明白的，是忽然认出来的。",
];

const colors = ["#e8f1ff", "#f3dfb2", "#dfe8d1", "#f2d6d9", "#e7e2d7", "#fffdf7"];

const bubbles = [
  ["要不要裸辞？", "quit"],
  ["该不该复合？", "reunion"],
  ["我要不要分手？", "breakup"],
  ["要不要转行？", "career"],
  ["要不要创业？", "startup"],
  ["我炒股能不能赚钱？", "stock"],
  ["为什么努力没有结果？", "effort"],
  ["我是不是太普通了？", "ordinary"],
  ["要不要离开这座城市？", "city"],
  ["为什么我总在讨好别人？", "please"],
  ["我还能变好吗？", "effort"],
  ["要不要跟老板摊牌？", "quit"],
  ["我要不要读研？", "career"],
  ["我想证明他们都错了，幼稚吗？", "ordinary"],
  ["我是不是该回老家？", "city"],
  ["要不要赌一次大的？", "startup"],
  ["为什么我总觉得自己不够好？", "ordinary"],
  ["我是不是该承认自己撑不住了？", "effort"],
  ["我想拉黑一个人，可以吗？", "please"],
  ["人真的能重新开始吗？", "city"],
  ["我是不是不适合现在的生活？", "career"],
  ["要不要辞职去旅行？", "quit"],
];

const routes = {
  quit: {
    title: "要不要裸辞？",
    lead: "这类问题底下，最热闹的从来不是答案，是每个人都在替自己的那一次逃跑辩护。",
    tags: ["职场", "自由", "暂停键"],
    zhihuQuery: "裸辞 后来 怎么样 知乎 高赞",
    questions: [
      {
        text: "你想到辞职时，第一感觉更像什么？",
        note: "选第一眼，不用替自己显得成熟。",
        options: [
          ["终于能喘口气了", "我只想先从每天的消耗里出来。", { tired: 3, permission: 2 }],
          ["我怕再待下去就废了", "不是讨厌工作，是害怕自己越来越不像自己。", { escape: 3, tired: 2 }],
          ["我想证明我不只值这点钱", "这里低估了我，我想换个场子。", { prove: 3, action: 2 }],
          ["我也不知道，只是每天都很烦", "说不上来，但身体已经开始抗议。", { tired: 3, caution: 2 }],
        ],
      },
      {
        text: "如果知乎有一条高赞回答，你最希望它站在哪边？",
        note: "你想听见什么，往往比你问了什么更诚实。",
        options: [
          ["你早该走了", "有人替你把那句狠话说出口。", { permission: 3, action: 2 }],
          ["先别冲动，留条后路", "你想走，但不想把自己摔碎。", { caution: 3, action: 1 }],
          ["你不是废，你只是耗尽了", "你想被救的不是职业规划，是自尊。", { tired: 3, belonging: 2 }],
          ["辞职不是答案，但可能是开始", "你要的不是结论，是一个出口。", { hope: 3, action: 2 }],
        ],
      },
      {
        text: "你最怕哪句话是真的？",
        note: "怕听见的话，通常离真相最近。",
        options: [
          ["我只是逃避", "怕自己把离开说得太漂亮。", { escape: 3, caution: 2 }],
          ["我根本没准备好", "不是不想走，是怕走不稳。", { caution: 3, action: 1 }],
          ["我继续留下也不会变好", "真正吓人的不是离开，是不离开也一样坏。", { permission: 2, hope: 2 }],
          ["没人会为我的选择负责", "你知道自由的另一面叫自己兜底。", { action: 2, caution: 2 }],
        ],
      },
    ],
    endings: {
      tired: {
        side: "你更像站在：先把自己从耗尽里捞出来的人",
        deep: "你表面在问要不要裸辞，心里更像在问：我还能不能暂停一下，不再每天硬撑？",
        echo: "很多过来人的共识不是“别辞”，而是先分清：你需要的是离职，还是恢复。人在低电量时做的人生决定，常常只是身体替心喊救命。",
        line: "你不是一定要离开。你只是太久没有感觉到，自己还能选择。",
        next: "今晚先别提交人生申请。请一天假，关掉消息，看看休息后的你还想不想走。",
      },
      permission: {
        side: "你更像站在：已经偏向离开，只差一句允许的人",
        deep: "你问的是要不要裸辞，其实是在问：如果我不再忍，算不算任性？",
        echo: "高赞回答里最有力量的部分，往往不是鼓励裸辞，而是承认一个事实：有些环境不会因为你更努力就变好。",
        line: "想走不丢人。只是别把离开变成唯一的英雄主义。",
        next: "把离开拆成三件小事：存款、下家、作品集。先补齐一件，你就不是上头，是在准备。",
      },
      caution: {
        side: "你更像站在：想走，但不想输得太难看的人",
        deep: "你心里不是没有答案，你只是希望这个答案有台阶、有退路、有一点尊严。",
        echo: "知乎上很多裸辞故事最后都落回同一句话：自由不会自动长出结构，结构要自己搭。",
        line: "别急着把门摔上。真正的自由，是你走出去以后还能站稳。",
        next: "做一个 48 小时裸辞预演：不上班、不娱乐，按辞职后的计划生活两天。",
      },
      prove: {
        side: "你更像站在：想换个地方证明自己的人",
        deep: "你不是只想离开公司，你想确认自己不是只能被这里定义。",
        echo: "相似高赞里常见的提醒是：换工作能换评价系统，但不能替你建立能力系统。",
        line: "你想赢不丢人。只是别让一个坏环境，成为你判断自己的唯一尺子。",
        next: "先用一周做一份能带走的作品。让你的下一步，站在证据上。",
      },
    },
  },
  reunion: {
    title: "该不该复合？",
    lead: "复合问题最容易热闹，因为每个人都以为自己这一次会不一样。",
    tags: ["关系", "不甘心", "旧人"],
    zhihuQuery: "该不该复合 知乎 高赞 回答",
    questions: [
      {
        text: "你想复合时，最先冒出来的是哪一幕？",
        note: "不是哪一幕最体面，是哪一幕最先出现。",
        options: [
          ["以前最好的那段日子", "你怀念的是那个版本的你们。", { nostalgia: 3, hope: 1 }],
          ["他突然变好了的可能", "你还在等一个迟到的解释。", { hope: 3, risk: 1 }],
          ["我不想就这样输掉", "你要的可能不是爱，是收回败局。", { prove: 3, regret: 2 }],
          ["一个人太空了", "有时想复合，是孤独在冒充答案。", { tired: 2, belonging: 3 }],
        ],
      },
      {
        text: "如果对方现在发来一句“我想你了”，你会怎么回？",
        note: "这题看起来问回复，其实问边界。",
        options: [
          ["我也是", "你还没准备好把门关上。", { hope: 3, permission: 2 }],
          ["你想清楚了吗", "你要的不是回头，是负责。", { boundary: 3, action: 1 }],
          ["别再来了", "你想保住的不是冷漠，是自己。", { closure: 3, boundary: 2 }],
          ["先不回，等我冷静", "你知道自己会心软，所以先保护节奏。", { caution: 3, boundary: 1 }],
        ],
      },
      {
        text: "你最想从知乎高赞里得到哪种声音？",
        note: "选你想被哪一派收留。",
        options: [
          ["能复合，但要看问题有没有变", "你不是恋爱脑，你想要一套判断标准。", { action: 2, hope: 2 }],
          ["别回头，重复伤害最便宜", "你需要有人替你把狠心合理化。", { closure: 3, boundary: 2 }],
          ["放不下很正常，不代表要回去", "你需要的是允许自己难过。", { belonging: 3, closure: 1 }],
          ["先问问你到底缺什么", "你隐约知道答案不在对方身上。", { tired: 2, caution: 2 }],
        ],
      },
    ],
    endings: {
      hope: {
        side: "你更像站在：还想给旧故事一次机会的人",
        deep: "你真正想问的不是能不能复合，而是：这一次会不会终于有人认真对待我？",
        echo: "高赞里的清醒派常说，复合能不能成立，不看想念有多真，看旧问题有没有真的被处理。",
        line: "可以心动，但别只因为怀念就把门打开。旧路要重走，至少要有新的路灯。",
        next: "如果要聊，别先谈感情，先谈当初那个问题现在怎么解决。",
      },
      closure: {
        side: "你更像站在：其实准备放下，只是想要一个体面结尾的人",
        deep: "你问复合，是因为结束还没有在你心里真正完成。",
        echo: "很多相似回答最后会承认：放下不是突然不爱，是你终于不再用痛苦证明那段关系很重要。",
        line: "你放不下的也许不是那个人，是那个曾经很用力相信爱的自己。",
        next: "写一段不发送的话，把你没说完的说完。让结尾先在你这里成立。",
      },
      boundary: {
        side: "你更像站在：想要爱，也想保住自己的人",
        deep: "你不是不心软，你只是终于开始在意：这一次我会不会又把自己放低？",
        echo: "知乎关系问题里的高赞常见共识是：爱不是没有边界，边界是关系能不能重新开始的地基。",
        line: "你可以温柔，但不要用再次受伤来证明自己深情。",
        next: "给对方三个具体问题。答不出来，就先别把自己交出去。",
      },
      belonging: {
        side: "你更像站在：孤独太久，想找一个熟悉出口的人",
        deep: "你真正想问的可能不是要不要复合，而是：没有这个人，我是不是也能被接住？",
        echo: "许多高赞回答会把复合和孤独分开看：孤独是真的，但它不一定指向旧人。",
        line: "别让一个夜晚的空，把你推回一段很久以前就疼过的关系。",
        next: "先找一个朋友吃顿饭。等白天的你也想回头，再认真决定。",
      },
    },
  },
  breakup: {
    title: "我要不要分手？",
    lead: "分手题底下最难的不是选离开，是承认自己已经在关系里变小了。",
    tags: ["关系", "边界", "体面"],
    zhihuQuery: "什么样的恋爱该分手 知乎 高赞",
    questions: [
      {
        text: "你想到分手时，最明显的感受是什么？",
        note: "先别判断对错，只看那股感受的形状。",
        options: [
          ["轻松", "像终于可以不用解释了。", { closure: 3, permission: 2 }],
          ["愧疚", "你怕自己成为那个坏人。", { guilt: 3, belonging: 1 }],
          ["害怕以后再也遇不到", "恐惧在替关系续费。", { loss: 3, caution: 1 }],
          ["还是舍不得", "爱和消耗混在一起，很难分清。", { hope: 2, nostalgia: 2 }],
        ],
      },
      {
        text: "这段关系最常让你变成什么样？",
        note: "关系好不好，有时看你在里面像不像自己。",
        options: [
          ["越来越小心", "你在用谨慎换和平。", { boundary: 3, tired: 1 }],
          ["越来越不像自己", "你已经开始怀念原来的自己。", { closure: 2, boundary: 2 }],
          ["越来越暴躁", "你可能不是坏，是长期没有被听见。", { tired: 2, action: 1 }],
          ["其实也有很多好", "你还想给复杂留一点余地。", { hope: 2, caution: 2 }],
        ],
      },
      {
        text: "你更希望知乎怎么回答？",
        note: "你要的那派声音，会暴露你正在保护什么。",
        options: [
          ["别用内疚续命", "你需要允许自己离开。", { closure: 3, permission: 2 }],
          ["再认真沟通一次", "你想确定自己不是草率。", { action: 2, hope: 2 }],
          ["不快乐就是理由", "你想把感受也算作证据。", { permission: 3, boundary: 1 }],
          ["别轻易放弃一个人", "你还害怕错过。", { loss: 2, caution: 2 }],
        ],
      },
    ],
    endings: {
      closure: {
        side: "你更像站在：已经累到想体面离开的人",
        deep: "你表面在问要不要分手，心里更像在问：我可不可以不再靠委屈证明自己值得被爱？",
        echo: "相似高赞里最常见的提醒是：如果一段关系长期让你不像自己，离开不是背叛，是止损。",
        line: "有些关系不是不爱了，是你终于不想再用消耗证明它重要。",
        next: "先写下三个你反复受伤的事实。事实比一时情绪更适合做决定。",
      },
      guilt: {
        side: "你更像站在：怕伤害别人，所以一直伤害自己的人",
        deep: "你问要不要分手，其实是在问：我能不能不当一个永远懂事的人？",
        echo: "知乎关系回答里常有人说，善良不等于无限续约。你可以不恨对方，也可以不继续。",
        line: "你不需要把自己赔进去，来证明你是一个好人。",
        next: "把“我对不起你”换成“这段关系已经不适合我”。先在心里练一次。",
      },
      boundary: {
        side: "你更像站在：想留下，但需要新的边界的人",
        deep: "你不是只想分手，你想让自己在关系里重新长回来。",
        echo: "高赞共识常常不是劝分或劝和，而是：没有边界的关系，复合几次都一样会疼。",
        line: "如果继续，你也要把自己带进去，而不是只带着忍耐进去。",
        next: "开一次只谈边界的对话。对方的反应，就是你的答案之一。",
      },
      loss: {
        side: "你更像站在：不是舍不得痛苦，是害怕空出来的位置",
        deep: "你真正想问的是：如果这段关系结束，我还会不会有人爱？",
        echo: "许多相似问题底下，过来人会说：孤独不是留下的理由，它只是分开后必须经过的天气。",
        line: "别把害怕一个人，误认成还应该两个人。",
        next: "先把生活支点从一个人身上挪开一点点。找回朋友、睡眠和自己的节奏。",
      },
    },
  },
  career: {
    title: "要不要转行？",
    lead: "转行像一扇门，门外是新生活，门内是自己还没承认的厌倦。",
    tags: ["成长", "试错", "笨拙期"],
    zhihuQuery: "转行 来得及吗 知乎 高赞",
    questions: [
      {
        text: "你想转行，最像为了什么？",
        note: "答案不用宏大，诚实就行。",
        options: [
          ["现在这行看不到头", "你害怕的是一眼望到尽头。", { escape: 2, hope: 2 }],
          ["我真的对新方向有兴趣", "你不是逃，是被另一件事吸过去。", { action: 3, hope: 2 }],
          ["别人都转得很好", "比较在替你踩油门。", { prove: 2, caution: 2 }],
          ["我怕再不转就晚了", "时间焦虑在敲你。", { regret: 3, action: 1 }],
        ],
      },
      {
        text: "你最担心转行后的哪一刻？",
        note: "怕什么，说明你已经在想现实细节。",
        options: [
          ["从头开始很丢脸", "你怕笨拙期被看见。", { prove: 2, belonging: 1 }],
          ["收入掉下去", "你需要一条缓冲带。", { caution: 3, action: 1 }],
          ["发现自己也不喜欢", "你怕希望再次落空。", { caution: 2, regret: 2 }],
          ["家人朋友不理解", "你想要一个站队的声音。", { belonging: 3, permission: 1 }],
        ],
      },
      {
        text: "你想让知乎高赞给你哪种话？",
        note: "这里选的是你想借哪种力。",
        options: [
          ["不是太晚，是别再拖", "你需要行动许可。", { permission: 3, action: 2 }],
          ["先做副业验证", "你要勇气，也要地面。", { caution: 2, action: 3 }],
          ["转行不是换赛道，是补能力", "你想把恐惧变成路径。", { action: 3, hope: 1 }],
          ["别把逃避包装成理想", "你想被清醒地拦一下。", { caution: 3, escape: 1 }],
        ],
      },
    ],
    endings: {
      action: {
        side: "你更像站在：已经想走，只差把路画出来的人",
        deep: "你问要不要转行，其实是在问：我能不能允许自己重新笨拙一次？",
        echo: "知乎高赞里常见的一句话是：转行最难的不是开始，是接受自己重新当新人。",
        line: "你不是太晚了。你只是第一次认真承认，这条路不是你想走的。",
        next: "用 7 天做一个最小作品。作品比焦虑更适合回答“我适不适合”。",
      },
      caution: {
        side: "你更像站在：想转，但不想把现实赌光的人",
        deep: "你的答案不是不转，而是别用一次跳跃解决所有焦虑。",
        echo: "相似高赞通常会提醒：转行不是辞职那天发生的，是你还在旧行业时就开始铺的。",
        line: "真正稳的改变，不是没有风险，是风险被你一点点看见。",
        next: "先保留现金流，用晚上和周末验证新方向。别让梦想一开始就背上房租。",
      },
      belonging: {
        side: "你更像站在：需要有人承认你不是瞎折腾的人",
        deep: "你想问的不是行业，而是：我这样重新选择，会不会显得很失败？",
        echo: "很多知乎过来人会说，转行不是否定过去，过去的经验会换一种方式留下来。",
        line: "重新选择不是清零。你带走的那些年，也会在新路上发光。",
        next: "列出旧行业给你的 5 个能力。它们是行李，不是包袱。",
      },
      regret: {
        side: "你更像站在：怕再不动就会后悔的人",
        deep: "你问转行，其实是在问：我能不能不再拖到自己彻底麻木？",
        echo: "高赞里最戳人的部分常是：比失败更让人后悔的，是很多年后还在想“如果当时”。",
        line: "有些路不一定通向成功，但一直不走，肯定通向遗憾。",
        next: "给自己一个截止日。不是马上离开，是在那天前交出第一个证据。",
      },
    },
  },
  startup: {
    title: "要不要创业？",
    lead: "创业问题底下，总有人把自由说得很轻，把代价说得很小。",
    tags: ["野心", "风险", "验证"],
    zhihuQuery: "普通人 创业 失败 经验 知乎 高赞",
    questions: [
      {
        text: "你最想从创业里拿到什么？",
        note: "这个答案决定它是事业，还是逃生门。",
        options: [
          ["自由", "你想摆脱被安排。", { escape: 2, hope: 2 }],
          ["钱", "你想让努力和收益更直接。", { action: 2, risk: 2 }],
          ["证明自己判断对", "你想把自己的眼光交给现实验收。", { prove: 3, action: 1 }],
          ["不想再给别人打工", "你讨厌的可能是被动，不一定是上班。", { escape: 3, caution: 1 }],
        ],
      },
      {
        text: "如果前三个月没人买单，你会更可能怎样？",
        note: "别选理想状态，选你真实会干的。",
        options: [
          ["继续扛，我不服", "你有劲，但可能容易硬扛。", { prove: 2, risk: 2 }],
          ["快速换方案", "你更像在做实验。", { action: 3, caution: 1 }],
          ["怀疑自己是不是不行", "你把结果太快等同于自我。", { belonging: 2, tired: 2 }],
          ["先找份工作回血", "你知道活下来也是能力。", { caution: 3, action: 1 }],
        ],
      },
      {
        text: "你希望知乎高赞怎么泼你一盆水？",
        note: "愿意被泼水的人，通常还有救。",
        options: [
          ["别把不上班当创业", "你需要区分自由幻觉。", { caution: 3, escape: 1 }],
          ["先做最小验证", "你需要把梦变成试验。", { action: 3, caution: 2 }],
          ["普通人先别 All in", "你需要保留退路。", { caution: 3 }],
          ["想赢不丢人，但别只靠热血", "你需要被承认，也需要方法。", { prove: 2, action: 2 }],
        ],
      },
    ],
    endings: {
      action: {
        side: "你更像站在：可以试，但要先做小实验的人",
        deep: "你问要不要创业，其实是在问：我的判断能不能被真实世界接住？",
        echo: "知乎创业高赞里反复出现的词不是梦想，是验证。先有人愿意付钱，再谈故事。",
        line: "别急着开公司。先让一个陌生人为你的判断付一次钱。",
        next: "今晚写一个最小售卖页，明天找 10 个人问愿不愿意买。",
      },
      caution: {
        side: "你更像站在：想冲，但知道自己不能碎掉的人",
        deep: "你的答案不是不创业，是别把所有退路献祭给一次兴奋。",
        echo: "过来人的提醒很朴素：创业不是不用上班，是从此每一分钟都没人替你兜底。",
        line: "自由很贵。先确认你买得起它的账单。",
        next: "保留 6 个月生活费，再把创业拆成副业验证。活下来不是怂，是基本功。",
      },
      prove: {
        side: "你更像站在：想用结果让世界闭嘴的人",
        deep: "你真正想要的不是创业本身，是终于由自己定义一次输赢。",
        echo: "相似回答会提醒：证明别人错可以点火，但不能当燃料烧一辈子。",
        line: "想赢不丢人。只是别让伤害你的人，成为你一生唯一的观众。",
        next: "把“证明他们错”改成一个能量化的目标：第一个客户、第一个订单、第一个复购。",
      },
      escape: {
        side: "你更像站在：把创业当作逃离上班的人",
        deep: "你问创业，其实是在问：有没有一种生活不再被别人安排？",
        echo: "知乎里很多失败复盘都从同一处开始：以为自己讨厌上班，后来发现更讨厌没人兜底。",
        line: "创业不是逃离秩序，是亲手给自己造一个更难的秩序。",
        next: "先别辞。连续 14 天按创业者的节奏下班后工作，再问自己还想不想要这份自由。",
      },
    },
  },
  stock: {
    title: "我炒股能不能赚钱？",
    lead: "这个问题最迷人，因为它看起来问钱，其实常常在问命。",
    tags: ["金钱", "波动", "不甘"],
    zhihuQuery: "普通人 炒股 能赚钱吗 知乎 高赞",
    questions: [
      {
        text: "你最想从股市里拿到什么？",
        note: "这里只谈心态，不构成任何投资建议。",
        options: [
          ["翻身的机会", "你想把命运扳回来一次。", { risk: 3, hope: 2 }],
          ["证明我判断对", "你要的不只是钱，是验证。", { prove: 3, risk: 1 }],
          ["不想错过这一波", "你怕被时代落下。", { regret: 3, risk: 2 }],
          ["学会和钱相处", "你更像来训练判断。", { action: 3, caution: 2 }],
          ["把亏掉的赚回来", "不甘心正在替你下单。", { regret: 3, risk: 3 }],
        ],
      },
      {
        text: "如果明天亏 10%，你第一反应是？",
        note: "股市最会照出一个人如何面对失控。",
        options: [
          ["加仓，我不服", "情绪已经坐上驾驶位。", { risk: 3, prove: 2 }],
          ["卸载软件", "你想切断痛感。", { tired: 2, caution: 1 }],
          ["复盘原因", "你愿意把亏损变成材料。", { action: 3, caution: 2 }],
          ["问朋友怎么办", "你想找一个替你负责的声音。", { belonging: 2, caution: 1 }],
          ["装作没看见", "逃避会让亏损变成影子。", { escape: 2, risk: 1 }],
        ],
      },
      {
        text: "你最希望知乎高赞怎么说？",
        note: "想听哪句话，往往说明你现在缺哪种刹车。",
        options: [
          ["可以学，但先活下来", "你要的是长期入场券。", { caution: 3, action: 2 }],
          ["别碰你不懂的东西", "你想被狠一点地保护。", { caution: 3 }],
          ["普通人最大优势是别急", "你需要把速度降下来。", { patience: 3, caution: 2 }],
          ["亏钱不是学费，复盘才是", "你愿意把代价变成经验。", { action: 3, hope: 1 }],
        ],
      },
    ],
    endings: {
      risk: {
        side: "你更像站在：想翻身，也容易被不甘推着走的人",
        deep: "你问能不能赚钱，心里更像在问：我能不能靠一次判断，把过去的被动翻回来？",
        echo: "知乎相似高赞里常见的冷水是：市场不会因为你很想赢，就降低难度。先控制亏损，再谈赚钱。",
        line: "钱会放大判断，也会放大不甘。先别急着赢，先确认自己输得起。",
        next: "只用不会影响生活的钱做模拟仓。连续复盘 30 天，再决定要不要真上桌。",
      },
      action: {
        side: "你更像站在：想学习游戏规则，而不是只想押注的人",
        deep: "你真正想问的是：我能不能在不确定里训练出一点自己的判断？",
        echo: "高赞回答的稳妥派通常会说，普通人最大的优势不是消息灵通，而是承认自己慢、承认自己不懂。",
        line: "能赚钱的人很多，能长期不被情绪牵着走的人很少。",
        next: "先写交易日记，不写故事，只写买入理由、退出条件和复盘。",
      },
      patience: {
        side: "你更像站在：知道急会坏事，但还是被行情撩拨的人",
        deep: "你不是没有理性，你只是需要一个声音提醒你：错过也不等于失败。",
        echo: "知乎上很多过来人会把“别急”讲得很具体：看不懂时空仓，也是一种仓位。",
        line: "不是每一班车都要追。有些钱看似没赚，其实是你没有亏掉的命。",
        next: "给自己设一条铁律：看不懂不买，亏到预设线就走。",
      },
      regret: {
        side: "你更像站在：想把亏掉的尊严赚回来的人",
        deep: "你问股票，心里可能是在问：我能不能证明上一次只是运气不好？",
        echo: "相似高赞会提醒：回本心态最危险，因为它把市场变成了情绪补偿场。",
        line: "别让上一笔亏损，继续替你决定下一笔人生。",
        next: "先停止补仓冲动。把每一笔亏损写成原因，而不是写成委屈。",
      },
    },
  },
  effort: {
    title: "为什么努力没有结果？",
    lead: "这个问题最容易让人沉默，因为它不是抱怨，是长期没有回声后的自我怀疑。",
    tags: ["努力", "反馈", "低电量"],
    zhihuQuery: "为什么努力没有结果 知乎 高赞",
    questions: [
      {
        text: "你说努力没结果时，最想证明哪件事？",
        note: "选那个你最想替自己辩护的。",
        options: [
          ["我真的有在努力", "你怕自己的付出被看不见。", { belonging: 3, tired: 1 }],
          ["我不是笨", "你把结果压在自尊上。", { prove: 2, belonging: 2 }],
          ["我可能方法错了", "你还愿意相信能调整。", { action: 3, hope: 1 }],
          ["我只是太累了", "你可能需要先回血。", { tired: 3, caution: 1 }],
        ],
      },
      {
        text: "如果知乎高赞只能给你一句话，你想要哪种？",
        note: "这不是选答案，是选你现在需要哪种力。",
        options: [
          ["再坚持一下，反馈会晚到", "你想被托住。", { hope: 3, patience: 2 }],
          ["别用战术勤奋掩盖战略懒惰", "你愿意被点醒。", { action: 3, caution: 1 }],
          ["不是你不行，是环境不奖励你", "你需要有人替你松绑。", { belonging: 2, escape: 1 }],
          ["先睡觉，累坏了什么都像失败", "你需要先停一停。", { tired: 3 }],
        ],
      },
      {
        text: "你最怕哪种可能？",
        note: "怕，不代表它是真的。",
        options: [
          ["我其实不适合", "你把一段路误读成整个人。", { belonging: 2, caution: 1 }],
          ["再努力也没用", "你对世界的回声有点失望。", { tired: 2, hope: 1 }],
          ["别人早就超过我了", "比较正在偷走你的节奏。", { prove: 2, regret: 1 }],
          ["我一直在原地打转", "你需要换方法，不是换掉自己。", { action: 3 }],
        ],
      },
    ],
    endings: {
      tired: {
        side: "你更像站在：不是不努力，是已经低电量的人",
        deep: "你问为什么没有结果，其实是在问：我已经这样撑了，能不能先被看见？",
        echo: "相似高赞常把“努力无效”拆开：有时不是人不行，是反馈周期太长，而你已经太累。",
        line: "你不是没有价值。你只是太久把结果之外的自己忘了。",
        next: "今天只记录一件完成的小事。让大脑重新看见自己不是空手而归。",
      },
      action: {
        side: "你更像站在：还想赢，但愿意换打法的人",
        deep: "你真正想问的是：如果我换一种努力，会不会终于有回声？",
        echo: "知乎高赞里最有用的部分往往不鸡血，而是提醒：努力要变成可复盘的动作。",
        line: "努力没有开花，不代表你在荒地里。也可能只是季节和方法都还没对上。",
        next: "把目标拆成一个可被检查的动作。明天只改一个变量。",
      },
      belonging: {
        side: "你更像站在：想确认自己不是废物的人",
        deep: "你表面在问结果，心里更像在问：我是不是还有被肯定的资格？",
        echo: "很多相似回答会说，不要把暂时没有结果，误读成整个人的失败。",
        line: "你不是“不行”。你只是把一段没有回声的路，听成了对自己的否定。",
        next: "找一个能给你具体反馈的人。你需要证据，不是继续自责。",
      },
      hope: {
        side: "你更像站在：还愿意相信晚一点也算数的人",
        deep: "你其实还没有放弃，只是想知道继续是不是很傻。",
        echo: "高赞回声里常有一种温柔的现实：有些积累在结果出现前，都长得像白费。",
        line: "别急着给自己判输。有些答案，是慢慢抵达的。",
        next: "给这件事一个清晰期限。期限内认真做，期限后认真复盘。",
      },
    },
  },
  ordinary: {
    title: "我是不是太普通了？",
    lead: "普通感最扎心的地方，是它常常发生在你已经很努力之后。",
    tags: ["自我", "比较", "被看见"],
    zhihuQuery: "觉得自己很普通 怎么办 知乎 高赞",
    questions: [
      {
        text: "你觉得自己普通，是和谁比出来的？",
        note: "比较对象，就是焦虑的方向。",
        options: [
          ["同龄人", "你被进度条追着跑。", { regret: 2, prove: 2 }],
          ["朋友圈里的人", "你在用别人的展示面审判自己。", { belonging: 2, caution: 1 }],
          ["理想中的自己", "你不是普通，你是对自己要求太远。", { prove: 2, hope: 1 }],
          ["谁都不用比，我就是觉得空", "这更像低电量，不是能力问题。", { tired: 3 }],
        ],
      },
      {
        text: "你最希望别人承认你哪一点？",
        note: "这里藏着你真正想被看见的部分。",
        options: [
          ["我已经很努力了", "你想让过程被承认。", { belonging: 3 }],
          ["我其实有点天赋", "你想确认可能性还在。", { hope: 2, prove: 2 }],
          ["我不是他们说的那样", "你想从旧评价里出来。", { prove: 3, permission: 1 }],
          ["我只是暂时没结果", "你需要一个更长的时间线。", { patience: 3, hope: 1 }],
        ],
      },
      {
        text: "你想让知乎高赞给你哪种回应？",
        note: "别选正确的，选你现在最想要的。",
        options: [
          ["普通不等于没价值", "你需要托底。", { belonging: 3, hope: 1 }],
          ["想变强就别沉迷安慰", "你想要一点狠劲。", { action: 2, prove: 2 }],
          ["别拿别人的高光当日常", "你需要停止被比较绑架。", { caution: 2, patience: 2 }],
          ["你只是还没找到自己的场", "你愿意相信位置比天赋重要。", { hope: 3, action: 1 }],
        ],
      },
    ],
    endings: {
      belonging: {
        side: "你更像站在：想被看见，而不是想赢过所有人的人",
        deep: "你问自己是不是普通，其实是在问：我这样的人，能不能也值得被认真对待？",
        echo: "知乎相似回答里常有一句朴素共识：人的价值不只在可展示的成绩里。",
        line: "你不是普通到没有光。你只是太久把别人的进度条，当成了自己的成绩单。",
        next: "写下三件别人看不见、但你真实做过的努力。它们不是没有发生。",
      },
      prove: {
        side: "你更像站在：想让旧评价闭嘴的人",
        deep: "你真正想要的不是不普通，而是终于有一次由自己定义自己。",
        echo: "许多高赞会提醒：证明别人错可以点燃你，但别把自己的一生交给他们当观众。",
        line: "想赢不丢人。只是别让别人的声音，成为你唯一的燃料。",
        next: "把“我要让他们闭嘴”改成一个你自己也认可的作品或成绩。",
      },
      hope: {
        side: "你更像站在：还没找到场子，但没有放弃的人",
        deep: "你问普通，其实是在问：是不是换一个位置，我也能亮一点？",
        echo: "相似高赞里的温柔部分是：很多人不是没能力，是一直站在不适合自己的灯下。",
        line: "别急着定义自己。人有时不是不发光，是还没遇到能反射他的地方。",
        next: "去试一个小场景：投稿、面试、公开表达。让世界给你新的反馈。",
      },
      tired: {
        side: "你更像站在：比较太久，已经有点麻木的人",
        deep: "你不是在问普通，你是在问：我能不能先不要再被排名追着跑？",
        echo: "知乎很多回答会把比较说成一种偷走生活感的东西：它让你只看差距，看不见自己还活着。",
        line: "你不用马上变得耀眼。先把自己从别人的光里领回来。",
        next: "今天少看一次排行榜式生活。做一件只对你自己有意义的小事。",
      },
    },
  },
  city: {
    title: "要不要离开这座城市？",
    lead: "城市问题从来不只是地理，它常常装着一个人想换掉的生活版本。",
    tags: ["城市", "归属", "重启"],
    zhihuQuery: "要不要离开一座城市 知乎 高赞",
    questions: [
      {
        text: "你最想离开的，是这座城市的哪一部分？",
        note: "答案里藏着你想换掉的命题。",
        options: [
          ["房租和压力", "现实把你挤得太紧。", { tired: 2, caution: 2 }],
          ["没有朋友的孤独", "城市只是孤独的容器。", { belonging: 3 }],
          ["看不到未来", "你想换一个时间线。", { hope: 2, escape: 2 }],
          ["这里的自己", "你想和旧版本告别。", { closure: 2, permission: 2 }],
        ],
      },
      {
        text: "如果可以走，你最怕什么？",
        note: "怕什么，说明你还珍惜什么。",
        options: [
          ["去了也不会变好", "你知道城市不是万能药。", { caution: 3 }],
          ["留下会继续消耗", "你怕不走也一样坏。", { permission: 2, tired: 1 }],
          ["别人说我逃避", "你想让离开显得正当。", { belonging: 2, prove: 1 }],
          ["重新开始太累", "你想换生活，但身体怕再建一遍。", { tired: 3 }],
        ],
      },
      {
        text: "你想听知乎哪一派？",
        note: "每一派都有它保护你的方式。",
        options: [
          ["先试住，不要幻想", "你需要一个现实版本的重启。", { action: 3, caution: 2 }],
          ["能走就走，别困死自己", "你需要允许。", { permission: 3, hope: 1 }],
          ["换城市不等于换人生", "你想被清醒地提醒。", { caution: 3 }],
          ["在哪里都要重新建关系", "你想知道真正的代价。", { belonging: 2, action: 1 }],
        ],
      },
    ],
    endings: {
      permission: {
        side: "你更像站在：可以离开，但想被允许的人",
        deep: "你问要不要离开城市，其实是在问：我能不能承认这里已经不适合我？",
        echo: "高赞里常有一种声音：离开不是失败，有时是人和城市的缘分到期。",
        line: "你想离开的不一定是城市，是那个在这里越来越不像自己的你。",
        next: "先去目标城市住 7 天。不要旅游，按真实生活过。",
      },
      caution: {
        side: "你更像站在：想重启，但不想把城市当药的人",
        deep: "你心里知道，换地方能换空气，但不一定能换命题。",
        echo: "知乎相似回答常提醒：城市会放大机会，也会放大原来的问题。",
        line: "别把一张车票，当成整个人生的解药。",
        next: "写清楚你想换掉的三件事。看它们是城市问题，还是生活结构问题。",
      },
      belonging: {
        side: "你更像站在：不是想走，是想有一个地方接住你的人",
        deep: "你问城市，其实是在问：我到底属于哪里？",
        echo: "许多高赞会说，归属感不是城市给的，是关系、节奏和可预期的日子一点点长出来的。",
        line: "你缺的可能不是远方，是一个不用每次都重新解释自己的地方。",
        next: "先在现在的城市找一个稳定关系或固定地点。再判断孤独是不是地理造成的。",
      },
      closure: {
        side: "你更像站在：想给旧生活一个结尾的人",
        deep: "你想离开，不是因为远方一定好，而是因为这里已经写满了旧剧情。",
        echo: "相似高赞里有句话很像：有些城市不是留不住人，是你不能一直留在同一个自己里。",
        line: "重新开始不是清零，是终于承认上一局已经结束。",
        next: "给这座城市写一段告别。写完再决定走不走。",
      },
    },
  },
  please: {
    title: "为什么我总在讨好别人？",
    lead: "讨好题底下的高赞，常常不是教人变冷，而是教人把自己放回关系里。",
    tags: ["边界", "关系", "自尊"],
    zhihuQuery: "如何停止讨好别人 知乎 高赞",
    questions: [
      {
        text: "你最常讨好谁？",
        note: "对象不同，你保护的东西也不同。",
        options: [
          ["亲密关系里的人", "你怕失去爱。", { belonging: 3, loss: 1 }],
          ["领导同事", "你怕失去位置。", { caution: 2, boundary: 1 }],
          ["朋友", "你怕自己不被需要。", { belonging: 2, guilt: 1 }],
          ["几乎所有人", "你可能太习惯把安全感外包。", { tired: 2, boundary: 2 }],
        ],
      },
      {
        text: "当你拒绝别人时，最先出现的念头是什么？",
        note: "这句话就是边界的门槛。",
        options: [
          ["他会不会讨厌我", "你把拒绝等同于失去。", { loss: 2, belonging: 2 }],
          ["我是不是太自私", "你把照顾自己误读成亏欠。", { guilt: 3 }],
          ["算了忍一下也没事", "你习惯性把自己往后放。", { tired: 2, boundary: 1 }],
          ["我凭什么总让步", "你已经开始想拿回位置。", { boundary: 3, action: 1 }],
        ],
      },
      {
        text: "你希望知乎高赞怎么把你拉回来？",
        note: "选你最想借来的那句底气。",
        options: [
          ["不舒服就是理由", "你需要承认自己的感受算数。", { permission: 3, boundary: 2 }],
          ["善良不是没有边界", "你要保留温柔，也保留自己。", { boundary: 3 }],
          ["真正的关系经得起拒绝", "你想验证关系质量。", { belonging: 2, boundary: 2 }],
          ["别用懂事换安全感", "你需要有人说破这件事。", { action: 2, guilt: 2 }],
        ],
      },
    ],
    endings: {
      boundary: {
        side: "你更像站在：已经想把自己放回关系里的人",
        deep: "你问为什么讨好，其实是在问：我的感受能不能也算数？",
        echo: "知乎高赞里常见的共识是：边界不是变坏，是让关系不用靠委屈维持。",
        line: "你不是太懂事。你只是太早学会了用委屈换安全感。",
        next: "今天练习一次小拒绝。不是为了赢，是为了让身体记住你也可以站住。",
      },
      guilt: {
        side: "你更像站在：一照顾自己就内疚的人",
        deep: "你真正想问的是：我可不可以不永远优先照顾别人？",
        echo: "相似回答会提醒：把自己放前面一点，不等于把别人推下去。",
        line: "你不需要通过持续亏待自己，来证明你值得被喜欢。",
        next: "把“我是不是太自私”改成“我有没有真实不舒服”。先承认感觉。",
      },
      belonging: {
        side: "你更像站在：害怕一拒绝就被丢下的人",
        deep: "你问讨好，其实是在问：如果我不一直好用，还会有人留下吗？",
        echo: "很多高赞会说，真正稳定的关系，不会因为你有边界就立刻塌掉。",
        line: "能被你拒绝一次就失去的人，本来也没打算认真接住你。",
        next: "从最安全的人开始表达一个小小的不愿意。",
      },
      tired: {
        side: "你更像站在：已经照顾太多人，快忘了自己的人",
        deep: "你不是不会拒绝，你是太久没练习把自己算进去。",
        echo: "知乎过来人常把讨好描述成一种长期透支：看起来关系和平，实际身体一直在还债。",
        line: "别再把所有人的舒服，建在你一个人的沉默上。",
        next: "今天只做一件事：在答应之前，先停三秒。",
      },
    },
  },
};

const genericEndings = {
  hope: {
    side: "你更像站在：还愿意相信事情会变好的人",
    deep: "你表面在问一个选择，心里更像在问：我还能不能给自己一次机会？",
    echo: "相似高赞里常有这样的回声：很多答案不是突然出现的，是人在走着走着才认出来的。",
    line: "别急着把自己交卷。你还有改写题目的时间。",
    next: "今晚只做一个小动作，让明天的你有一点证据。",
  },
  caution: {
    side: "你更像站在：想往前，但希望别摔碎自己的人",
    deep: "你不是没有答案，你只是想给答案找一个更稳的落点。",
    echo: "高赞回答常常不负责替你热血，它负责提醒你把退路和代价也放进故事里。",
    line: "慢一点不是怂，是你终于开始珍惜自己。",
    next: "先把最坏情况写下来。能承受，再往前一步。",
  },
};

const state = {
  route: null,
  step: 0,
  scores: {},
  answers: [],
  customText: "",
  result: null,
};

const $ = (selector) => document.querySelector(selector);

function addScore(weights = {}) {
  Object.entries(weights).forEach(([key, value]) => {
    state.scores[key] = (state.scores[key] || 0) + value;
  });
}

function topKey(scores) {
  const priority = [
    "tired",
    "permission",
    "caution",
    "action",
    "hope",
    "closure",
    "boundary",
    "belonging",
    "prove",
    "risk",
    "patience",
    "regret",
    "guilt",
    "loss",
    "escape",
  ];
  return priority
    .map((key) => [key, scores[key] || 0])
    .sort((a, b) => b[1] - a[1] || priority.indexOf(a[0]) - priority.indexOf(b[0]))[0][0];
}

function zhihuSearchUrl(query) {
  return `https://www.zhihu.com/search?type=content&q=${encodeURIComponent(query)}`;
}

function setView(view) {
  $("#homeView").classList.toggle("hidden", view !== "home");
  $("#playView").classList.toggle("hidden", view !== "play");
  $("#resultView").classList.toggle("hidden", view !== "result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderSubtitle() {
  let index = 0;
  $("#subtitleText").textContent = subtitles[index];
  setInterval(() => {
    index = (index + 1) % subtitles.length;
    $("#subtitleText").textContent = subtitles[index];
  }, 2800);
}

function renderBubbles() {
  const positions = [
    [14, 18], [35, 14], [58, 15], [80, 20], [22, 34], [47, 31], [70, 35], [88, 42],
    [12, 53], [34, 51], [56, 50], [77, 56], [20, 70], [43, 70], [64, 73], [86, 72],
    [30, 86], [53, 87], [73, 88], [8, 82], [91, 83], [50, 60],
  ];
  $("#questionSky").innerHTML = bubbles
    .map(([label, routeId], index) => {
      const [x, y] = positions[index % positions.length];
      const color = colors[index % colors.length];
      const rotation = `${(index % 7) - 3}deg`;
      const speed = `${4.8 + (index % 5) * 0.45}s`;
      return `<button class="question-bubble" type="button" data-route="${routeId}" style="--x:${x}%;--y:${y}%;--r:${rotation};--speed:${speed};--bubble:${color}">${label}</button>`;
    })
    .join("");
  document.querySelectorAll(".question-bubble").forEach((button) => {
    button.addEventListener("click", () => startRoute(button.dataset.route, button.textContent.trim()));
  });
}

function pickRouteFromText(text) {
  const rules = [
    ["股|基金|投资|股票|炒股|赚钱|亏", "stock"],
    ["复合|前任|回头|旧爱", "reunion"],
    ["分手|离婚|不爱|关系", "breakup"],
    ["裸辞|辞职|老板|上班|工作", "quit"],
    ["转行|读研|读博|专业|行业", "career"],
    ["创业|开店|副业|自媒体|all in|赌", "startup"],
    ["努力|结果|撑不住|焦虑|废", "effort"],
    ["普通|不够好|证明|看不起|自卑", "ordinary"],
    ["城市|回老家|大城市|离开|旅行", "city"],
    ["讨好|拒绝|边界|拉黑|朋友|懂事", "please"],
  ];
  const hit = rules.find(([pattern]) => new RegExp(pattern, "i").test(text));
  return hit ? hit[1] : "effort";
}

function startRoute(routeId, label = "") {
  state.route = routes[routeId] || routes.effort;
  state.step = 0;
  state.scores = {};
  state.answers = [];
  state.customText = label;
  $("#routeTitle").textContent = label && label !== state.route.title ? label : state.route.title;
  $("#routeLead").textContent = state.route.lead;
  $("#routeTags").innerHTML = state.route.tags.map((tag) => `<span>${tag}</span>`).join("");
  renderStep();
  setView("play");
}

function renderStep() {
  const route = state.route;
  const question = route.questions[state.step];
  const total = route.questions.length;
  $("#stepLabel").textContent = `第 ${state.step + 1} 问 / ${total}`;
  $("#progressBar").style.width = `${(state.step / total) * 100}%`;
  $("#questionNote").textContent = question.note;
  $("#questionText").textContent = question.text;
  $("#optionGrid").innerHTML = question.options
    .map(([label, hint], index) => {
      const color = colors[(state.step + index) % colors.length];
      return `<button class="option-button" type="button" data-index="${index}" style="--option:${color}"><strong>${label}</strong><span>${hint}</span></button>`;
    })
    .join("");
  document.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => chooseOption(Number(button.dataset.index)));
  });
}

function chooseOption(index) {
  const question = state.route.questions[state.step];
  const [label, hint, weights] = question.options[index];
  addScore(weights);
  state.answers.push({ question: question.text, label, hint, weights });
  state.step += 1;
  if (state.step >= state.route.questions.length) {
    finishRoute();
    return;
  }
  renderStep();
}

function finishRoute() {
  const route = state.route;
  const key = topKey(state.scores);
  const ending = route.endings[key] || route.endings[Object.keys(route.endings)[0]] || genericEndings.hope;
  const title = state.customText || route.title;
  state.result = {
    ...ending,
    title,
    routeTitle: route.title,
    zhihuTitle: `${route.title} - 知乎相似高赞`,
    zhihuUrl: zhihuSearchUrl(route.zhihuQuery),
  };
  $("#resultSide").textContent = ending.side;
  $("#deepQuestion").textContent = ending.deep;
  $("#zhihuLink").textContent = state.result.zhihuTitle;
  $("#zhihuLink").href = state.result.zhihuUrl;
  $("#zhihuEcho").textContent = ending.echo;
  $("#finalLine").textContent = ending.line;
  $("#nextStep").textContent = ending.next;
  $("#choiceTrace").innerHTML = state.answers
    .slice(0, 3)
    .map(
      (answer, index) => `
        <div class="trace-chip">
          <span>第 ${index + 1} 个选择</span>
          <strong>${answer.label}</strong>
          <em>${answer.hint}</em>
        </div>
      `
    )
    .join("");
  drawShareCard();
  setView("result");
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines = 12) {
  const chars = Array.from(text);
  const lines = [];
  let line = "";
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight));
  return y + Math.min(lines.length, maxLines) * lineHeight;
}

function drawShareCard() {
  const canvas = $("#shareCanvas");
  const ctx = canvas.getContext("2d");
  const result = state.result;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f4f0e6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#1677ff";
  ctx.fillRect(68, 68, 944, 126);
  ctx.fillStyle = "#fffdf6";
  ctx.font = "900 56px sans-serif";
  ctx.fillText("知乎吹牛逼", 108, 150);
  ctx.fillStyle = "#17191f";
  ctx.strokeStyle = "#242833";
  ctx.lineWidth = 5;
  ctx.strokeRect(68, 238, 944, 1040);
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(68, 238, 944, 1040);
  ctx.fillStyle = "#e8f1ff";
  ctx.fillRect(820, 276, 132, 132);
  ctx.fillStyle = "#dfe8d1";
  ctx.fillRect(116, 1072, 152, 92);
  ctx.fillStyle = "#17191f";
  ctx.font = "900 42px sans-serif";
  drawWrapped(ctx, `我问：${result.title}`, 118, 350, 760, 58, 3);
  ctx.font = "900 72px sans-serif";
  const nextY = drawWrapped(ctx, result.line, 118, 555, 820, 90, 6);
  ctx.font = "500 34px sans-serif";
  ctx.fillStyle = "#6d6a62";
  drawWrapped(ctx, result.deep, 118, Math.max(nextY + 80, 940), 800, 50, 4);
  ctx.fillStyle = "#17191f";
  ctx.font = "900 28px sans-serif";
  ctx.fillText("问一句，借一口气。", 118, 1210);
}

async function copyResult() {
  const text = `${state.result.line}\n\n来自「知乎吹牛逼」`;
  try {
    await navigator.clipboard.writeText(text);
    $("#copyBtn").textContent = "已复制";
    setTimeout(() => {
      $("#copyBtn").textContent = "复制这句话";
    }, 1400);
  } catch {
    $("#shareHint").textContent = text;
  }
}

function saveCard() {
  const link = document.createElement("a");
  link.download = "zhihu-chuiniubi-card.png";
  link.href = $("#shareCanvas").toDataURL("image/png");
  link.click();
}

function demoLogin() {
  $("#loginBtn").classList.add("is-on");
  $("#loginBtn").textContent = "知乎授权演示已开启";
  $("#matchHint").textContent = "正式接入 OAuth 后，会结合账号兴趣和授权 API 匹配更贴近的问题。现在先用演示题库体验。";
}

function bindEvents() {
  $("#customForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $("#customQuestion").value.trim();
    if (!value) return;
    const routeId = pickRouteFromText(value);
    $("#matchHint").textContent = `已匹配到「${routes[routeId].title}」这条路径。`;
    startRoute(routeId, value);
  });
  $("#backBtn").addEventListener("click", () => setView("home"));
  $("#resultBackBtn").addEventListener("click", () => setView("home"));
  $("#againBtn").addEventListener("click", () => setView("home"));
  $("#copyBtn").addEventListener("click", copyResult);
  $("#saveCardBtn").addEventListener("click", saveCard);
  $("#loginBtn").addEventListener("click", demoLogin);
}

function bootFromParams() {
  const params = new URLSearchParams(location.search);
  const routeId = params.get("route");
  const ask = params.get("ask");
  if (routeId && routes[routeId]) {
    startRoute(routeId);
  } else if (ask) {
    startRoute(pickRouteFromText(ask), ask);
  }
}

renderSubtitle();
renderBubbles();
bindEvents();
bootFromParams();
