import {
  Blocks,
  Building2,
  Cpu,
  Database,
  Gamepad2,
  Landmark,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

export const navItems = [
  { id: 'hero', label: 'Mở đầu' },
  { id: 'theory', label: 'Cơ sở lý luận' },
  { id: 'monopoly-forms', label: 'Biểu hiện mới của độc quyền' },
  { id: 'state-monopoly', label: 'Độc quyền nhà nước' },
  { id: 'practical', label: 'Liên hệ thực tiễn' },
  { id: 'closing', label: 'Kết luận & Q&A' },
  { id: 'creative-product', label: 'Sản phẩm sáng tạo' },
]

export const heroTimeline = [
  'Cạnh tranh tự do',
  'Tích tụ tư bản',
  'Độc quyền',
  'Độc quyền nhà nước',
  'Kinh tế số',
]

export const heroHighlights = [
  {
    icon: TrendingUp,
    title: 'Quy luật vận động',
    text: 'Độc quyền là kết quả lịch sử của cạnh tranh, tích tụ và tập trung tư bản.',
  },
  {
    icon: Network,
    title: 'Hình thức mới',
    text: 'Ngày nay độc quyền biểu hiện qua nền tảng số, dữ liệu, cloud và hệ sinh thái.',
  },
  {
    icon: Landmark,
    title: 'Vai trò nhà nước',
    text: 'Nhà nước vừa điều tiết thị trường, vừa tham gia vào cấu trúc quyền lực kinh tế.',
  },
]

export const theoryData = [
  {
    id: 'theory-1',
    title: 'Bản chất và nguyên nhân hình thành độc quyền',
    lead:
      'Độc quyền không xuất hiện ngẫu nhiên. Nó là kết quả tất yếu của cạnh tranh gay gắt trong chủ nghĩa tư bản.',
    bullets: [
      'Cạnh tranh buộc doanh nghiệp phải đổi mới, mở rộng quy mô và tìm lợi nhuận siêu ngạch.',
      'Tích lũy, tích tụ và tập trung tư bản làm sức mạnh kinh tế dồn vào số ít doanh nghiệp lớn.',
      'Khi quy mô và thị phần vượt ngưỡng, các tổ chức độc quyền hình thành để chi phối thị trường.',
    ],
    more:
      'Về logic lịch sử, cạnh tranh tự do càng phát triển thì xu hướng tập trung sản xuất và tập trung tư bản càng mạnh. Quá trình này chuyển cạnh tranh từ nhiều doanh nghiệp nhỏ sang quyền lực của một số ít chủ thể chi phối giá cả, sản lượng và điều kiện thị trường.',
  },
  {
    id: 'theory-2',
    title: 'Chủ nghĩa tư bản độc quyền nhà nước',
    lead:
      'Khi độc quyền lớn lên, nhà nước không đứng ngoài mà dần tham gia điều tiết, hỗ trợ và hợp thức hóa quyền lực kinh tế.',
    bullets: [
      'Nhà nước dùng pháp luật, ngân sách và chính sách công để ổn định môi trường tích lũy.',
      'Nhiều ngành chiến lược gắn chặt với đầu tư công, cứu trợ, mua sắm công và hạ tầng.',
      'Quan hệ giữa tư bản độc quyền và nhà nước trở nên đan xen hơn trong khủng hoảng và cạnh tranh toàn cầu.',
    ],
    more:
      'Chủ nghĩa tư bản độc quyền nhà nước là sự kết hợp giữa sức mạnh của các tổ chức độc quyền và sức mạnh tổ chức của nhà nước tư sản. Điều này làm cho cạnh tranh không mất đi mà đổi hình thức, mở rộng sang đấu tranh về công nghệ, hạ tầng, dữ liệu và chuỗi cung ứng.',
  },
  {
    id: 'theory-3',
    title: 'Giá trị lý luận của V.I.\u00A0Lênin',
    lead:
      'Lý luận của Lênin giúp giải thích vì sao độc quyền là xu hướng tất yếu của chủ nghĩa tư bản hiện đại.',
    bullets: [
      'Giúp nhận diện cấu trúc quyền lực kinh tế vượt ra khỏi thị trường hàng hóa truyền thống.',
      'Làm rõ mối liên hệ giữa độc quyền, tài chính, nhà nước và xuất khẩu tư bản.',
      'Tạo cơ sở để nhìn các hiện tượng mới như Big Tech, nền tảng số và độc quyền dữ liệu.',
    ],
    more:
      'Giá trị lớn nhất của học thuyết là phương pháp luận: nhìn hiện tượng kinh tế như một quá trình vận động lịch sử, trong đó các hình thức độc quyền luôn biến đổi nhưng quy luật tích lũy, tập trung và chi phối vẫn còn nguyên.',
  },
]

export const monopolyFormsData = [
  {
    icon: Network,
    title: 'Độc quyền nền tảng số',
    summary:
      'Nền tảng giữ vai trò cổng vào thị trường, kiểm soát nơi người dùng gặp sản phẩm và dịch vụ.',
    bullets: ['Quyền định vị nội dung và lưu lượng', 'Khóa hệ sinh thái người dùng', 'Làm chủ hạ tầng tương tác'],
  },
  {
    icon: Database,
    title: 'Độc quyền dữ liệu lớn',
    summary:
      'Dữ liệu trở thành tài sản chiến lược, tạo lợi thế học máy, cá nhân hóa và dự báo hành vi.',
    bullets: ['Dữ liệu càng nhiều, mô hình càng mạnh', 'Rào cản gia nhập ngày càng cao', 'Tích lũy dữ liệu thay cho tích lũy hàng hóa'],
  },
  {
    icon: Cpu,
    title: 'Độc quyền công nghệ lõi',
    summary:
      'AI, chip, cloud, thuật toán và tiêu chuẩn kỹ thuật trở thành điểm then chốt của sức mạnh độc quyền.',
    bullets: ['Nắm công nghệ gốc', 'Chi phối chuỗi cung ứng', 'Quyết định tốc độ đổi mới'],
  },
  {
    icon: Building2,
    title: 'Vai trò công ty xuyên quốc gia',
    summary:
      'Các tập đoàn xuyên biên giới mở rộng quyền lực qua mua bán, liên minh và kiểm soát chuỗi giá trị.',
    bullets: ['Thâu tóm thị trường mới', 'Tối ưu lợi nhuận toàn cầu', 'Điều phối công nghệ và vốn'],
  },
]

export const stateMonopolyData = [
  {
    icon: ShieldCheck,
    title: 'Biểu hiện mới về quan hệ nhân sự',
    bullets: [
      'Sự luân chuyển giữa cơ quan công quyền, tư vấn chính sách và doanh nghiệp lớn ngày càng dày.',
      'Nhóm lợi ích tác động mạnh hơn vào quy trình ra quyết định.',
      'Ranh giới giữa điều tiết và hỗ trợ lợi ích doanh nghiệp trở nên mờ hơn.',
    ],
  },
  {
    icon: Landmark,
    title: 'Biểu hiện mới về sở hữu nhà nước',
    bullets: [
      'Nhà nước nắm các ngành, hạ tầng hoặc quỹ đầu tư chiến lược trong những lĩnh vực trọng yếu.',
      'Vốn nhà nước tham gia cứu trợ, tái cấu trúc hoặc mở rộng năng lực sản xuất.',
      'Sở hữu công không tách rời logic thị trường mà tương tác với tư bản lớn.',
    ],
  },
  {
    icon: Blocks,
    title: 'Công cụ điều tiết kinh tế',
    bullets: [
      'Ngân sách, thuế, đầu tư công và an sinh được dùng để ổn định chu kỳ kinh tế.',
      'Nhà nước can thiệp khi thị trường rơi vào khủng hoảng hoặc đứt gãy cung ứng.',
      'Quyết định công có thể định hướng hạ tầng, giáo dục, y tế và môi trường.',
    ],
  },
]

export const bigTechData = [
  {
    title: 'OpenAI',
    tag: 'Mô hình nền tảng AI',
    ecosystem: 'ChatGPT, API, model ecosystem, công cụ sinh nội dung và agent.',
    advantage: 'Lợi thế ở mô hình lõi, thương hiệu AI và tốc độ lan tỏa người dùng.',
    monopolyLink: 'Liên hệ lý luận: OpenAI được nhóm sử dụng như một trường hợp minh họa cho vai trò của mô hình nền tảng, năng lực tính toán, dữ liệu và hệ sinh thái API trong ngành AI. Những yếu tố này cho thấy AI hiện đại đòi hỏi nguồn lực lớn và có thể tạo lợi thế đáng kể cho các doanh nghiệp có khả năng đầu tư liên tục. Đây là phân tích học thuật của nhóm, không phải kết luận rằng OpenAI là doanh nghiệp độc quyền.',
  },
  {
    title: 'Microsoft AI',
    tag: 'Cloud + Enterprise',
    ecosystem: 'Azure, Copilot, GitHub, Office, tích hợp doanh nghiệp và hạ tầng cloud.',
    advantage: 'Nắm cloud enterprise, hệ sinh thái công việc và kênh phân phối doanh nghiệp.',
    monopolyLink: 'Liên hệ lý luận: Microsoft có lợi thế về cloud, công cụ phát triển và kênh phân phối tới doanh nghiệp. Việc AI được tích hợp vào Azure, GitHub và các công cụ làm việc minh họa khả năng kết hợp giữa hạ tầng, phần mềm và hệ sinh thái phân phối. Sự kết hợp này có thể tạo lợi thế quy mô và làm tăng chi phí chuyển đổi của người dùng, nhưng cần phân tích từng thị trường cụ thể trước khi đưa ra kết luận về độc quyền.',
  },
  {
    title: 'Google AI',
    tag: 'Search + Data + Ads',
    ecosystem: 'Search, Gemini, Android, YouTube, quảng cáo và dữ liệu người dùng lớn.',
    advantage: 'Sở hữu dữ liệu hành vi, phân phối toàn cầu và tiêu chuẩn truy cập thông tin.',
    monopolyLink: 'Độc quyền dữ liệu và cổng vào thị trường thể hiện rõ trong nền tảng tìm kiếm và quảng cáo.',
  },
]

export const practicalTabs = [
  {
    id: 'capital',
    label: 'Tập trung tư bản',
    title: 'AI đòi hỏi vốn cực lớn',
    bullets: [
      'Huấn luyện mô hình cần hạ tầng, chip, điện năng và nhân lực chuyên sâu.',
      'Chỉ số ít doanh nghiệp đủ khả năng duy trì vòng đầu tư liên tục.',
    ],
  },
  {
    id: 'data',
    label: 'Độc quyền dữ liệu',
    title: 'Dữ liệu là nguồn lợi thế cạnh tranh',
    bullets: [
      'Dữ liệu người dùng, tương tác và hành vi tạo lợi thế huấn luyện và cá nhân hóa.',
      'Doanh nghiệp có dữ liệu lớn thường giữ vị thế thị trường cao hơn.',
    ],
  },
  {
    id: 'cloud',
    label: 'Hạ tầng cloud',
    title: 'Điện toán đám mây là cổng vào AI',
    bullets: [
      'Cloud quyết định khả năng mở rộng, tốc độ triển khai và chi phí vận hành.',
      'Ai kiểm soát hạ tầng sẽ kiểm soát nhịp phát triển hệ sinh thái.',
    ],
  },
  {
    id: 'ecosystem',
    label: 'Hệ sinh thái',
    title: 'Độc quyền qua liên kết chiến lược',
    bullets: [
      'Mua bán, đối tác và tích hợp chéo khóa người dùng trong một vòng tròn dịch vụ.',
      'Giá trị không nằm riêng ở sản phẩm mà ở hệ sinh thái bao quanh nó.',
    ],
  },
  {
    id: 'strategy',
    label: 'Liên kết chiến lược',
    title: 'Liên minh làm tăng sức mạnh độc quyền',
    bullets: [
      'Các quan hệ đầu tư, mua lại hoặc ký kết độc quyền làm thị trường càng tập trung.',
      'Từ góc nhìn Mác - Lênin, đây là hình thức mới của tập trung và chi phối tư bản.',
    ],
  },
]

export const conclusionData = [
  {
    title: 'Kết luận đề tài',
    body:
      'Độc quyền là kết quả của quá trình cạnh tranh, tích tụ và tập trung tư bản. Trong điều kiện hiện nay, nó chuyển sang các hình thức mới như nền tảng số, dữ liệu lớn, công nghệ lõi, cloud và hệ sinh thái Big Tech.',
  },
  {
    title: 'Thông điệp chính',
    body:
      'Nhìn độc quyền bằng lăng kính Mác - Lênin giúp thấy rõ quyền lực thị trường không tự nhiên hình thành mà gắn với cấu trúc tích lũy và nhà nước.',
  },
  {
    title: 'Ý nghĩa thực tiễn',
    body:
      'The Last Shop biến lý luận kinh tế chính trị thành trải nghiệm trực quan, giúp người học thấy được quá trình từ cạnh tranh tự do đến độc quyền.',
  },
]

export const creativeProductData = {
  eyebrow: 'Sản phẩm sáng tạo',
  title: 'The Last Shop',
  subtitle: 'Mô phỏng quá trình cạnh tranh tự do dẫn đến độc quyền.',
  description:
    'Người chơi nhập vai doanh nghiệp, ra quyết định về giá, sản xuất, đổi mới công nghệ và mở rộng thị phần. Qua nhiều vòng, thị trường xuất hiện xu hướng tích tụ, tập trung và hình thành độc quyền.',
  cards: [
    {
      icon: Gamepad2,
      title: 'Nhập vai doanh nghiệp',
      body: 'Mỗi người chơi đại diện cho một chủ thể cạnh tranh trên thị trường.',
    },
    {
      icon: TrendingUp,
      title: 'Ra quyết định chiến lược',
      body: 'Lựa chọn đầu tư, giảm giá, đổi mới công nghệ hoặc mở rộng sản xuất.',
    },
    {
      icon: Sparkles,
      title: 'Quan sát độc quyền hình thành',
      body: 'Kết quả mô phỏng cho thấy cạnh tranh có thể dẫn tới tích tụ và tập trung tư bản.',
    },
  ],
  downloads: [
    {
      id: 'android',
      label: 'Tải Android',
      href: 'https://drive.google.com/file/d/1bw1bKQNAgHkhdC3aZMHp0OLyo9sL7w1s/view?usp=sharing',
      enabled: true,
      message: 'Bản tải Android đang được cập nhật.',
    },
  ],
  previewImage: '/game-preview/the-last-shop-background.png',
}

export const qaData = {
  quickQuestions: [
    'Vì sao cạnh tranh tự do dẫn đến độc quyền?',
    'Big Tech AI liên hệ với độc quyền thế nào?',
    'Độc quyền nhà nước khác gì độc quyền tư bản?',
    'The Last Shop giúp minh họa lý luận ra sao?',
  ],
  conclusionItems: [
    {
      title: 'Hỏi đáp học thuật',
      body: 'Dùng để trao đổi nhanh về các nội dung trong bài thuyết trình và mở rộng câu hỏi học thuật.',
    },
    {
      title: 'Phản biện',
      body: 'Có thể hỏi theo hướng so sánh, chứng minh, hoặc liên hệ thực tiễn để dùng khi trình bày.',
    },
    {
      title: 'Liên hệ thực tế',
      body: 'Trợ lý sẽ ưu tiên trả lời theo góc nhìn Mác - Lênin, kinh tế chính trị và thực tiễn thị trường hiện nay.',
    },
  ],
  welcomeMessage:
    'Xin chào, mình là trợ lý học thuật của bài thuyết trình. Bạn có thể hỏi về độc quyền, độc quyền nhà nước, Big Tech AI, nền tảng số, dữ liệu lớn, công nghệ lõi hoặc cách phản biện khi thuyết trình.',
}
