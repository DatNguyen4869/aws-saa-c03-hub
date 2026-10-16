// Bộ Giáo Trình Chi Tiết Toàn Diện Phần 2 (Buổi 11 -> 28: Chặng 2 & Chặng 3)
window.DEEP_CONTENT_PART2 = {
  11: {
    jargon: [
      { term: "Layer 7 (Application Layer)", plain: "Tầng ứng dụng Web: Load Balancer hiểu được nội dung bên trong gói tin HTTP/HTTPS (biết người dùng đang vào trang /login hay /cart, đọc được Cookie và Header)." },
      { term: "Target Group (Nhóm đích)", plain: "Nhóm các máy chủ nhận việc phía sau Load Balancer. Ví dụ: Target Group A là dàn máy xử lý Thanh toán; Target Group B là dàn máy xử lý Giỏ hàng." },
      { term: "X-Forwarded-For Header", plain: "Tờ giấy ghi chú do ALB kẹp thêm vào request: 'Khách hàng thật sự có IP là 203.113.x.x nhé!' (vì nếu không có tờ giấy này, EC2 chỉ nhìn thấy IP nội bộ của ALB)." },
      { term: "Dynamic Port Mapping", plain: "Cho phép chạy 5 container Docker của cùng 1 dịch vụ trên duy nhất 1 máy EC2 ở các cổng ngẫu nhiên (32768, 32769...), ALB tự động biết cổng nào để gọi vào mà không bị đụng cổng 8080!" }
    ],
    diagram: `
[Khách hàng (IP: 203.0.113.5)]
       │
       ▼ (HTTPS:443)
┌─────────────────────────────────────────────────────────────────┐
│ Application Load Balancer (ALB - Layer 7)                       │
│  ├─ Nếu URL là /api/users/*  ──► Chuyển sang [Target Group: EC2]│
│  ├─ Nếu URL là /api/orders/* ──► Chuyển sang [Target Group: ECS]│
│  └─ Kẹp thêm Header: X-Forwarded-For: 203.0.113.5               │
└─────────────────────────────────────────────────────────────────┘`,
    deepSections: [
      {
        title: "1. Tại sao ALB là lựa chọn số 1 cho ứng dụng Web & Microservices?",
        content: "• Thay vì phải tốn tiền mua 5 cái Load Balancer cho 5 dịch vụ Microservices khác nhau, bạn chỉ cần dùng <strong>duy nhất 1 Application Load Balancer (ALB)</strong>.<br>• Dùng tính năng <strong>Path-based Routing</strong> (chia theo đường dẫn <code>example.com/users</code> vs <code>example.com/orders</code>), <strong>Host-based Routing</strong> (<code>api.example.com</code> vs <code>web.example.com</code>), hoặc <strong>Query String / HTTP Header Routing</strong> để đẩy về các Target Groups tương ứng.<br>• ALB có thể điều hướng lưu lượng thẳng vào một hàm <strong>AWS Lambda</strong> (tự động dịch HTTP request thành JSON event) hoặc các <strong>Docker Containers (ECS)</strong> chạy chung trên 1 máy EC2 nhờ tính năng <em>Dynamic Port Mapping</em>.<br>• ALB còn hỗ trợ xác thực người dùng tập trung (<strong>Authenticate Users</strong>) ngay tại cửa ngõ thông qua <em>Amazon Cognito</em> hoặc <em>OIDC IdP</em> trước khi cho request đi vào backend."
      },
      {
        title: "2. Cơ chế Health Check & Thuật toán chia tải (Routing Algorithm)",
        content: "• <strong>Health Check</strong>: ALB định kỳ gọi thử vào đường dẫn <code>/health</code> của từng máy EC2. Nếu máy nào trả về <code>200 OK</code> thì được tính là <em>Healthy</em>; nếu lỗi liên tiếp thì tự động ngắt không gửi khách vào máy đó.<br>• <strong>LOR (Least Outstanding Requests)</strong>: Mặc định ALB chia đều kiểu xoay vòng (Round Robin), nhưng bạn có thể đổi sang chế độ <em>Least Outstanding Requests</em> để ưu tiên gửi việc mới cho máy EC2 nào đang ít việc tồn đọng nhất!"
      }
    ],
    extraCards: [
      { q: "Làm thế nào để chạy nhiều Docker containers của cùng một microservice trên duy nhất 1 máy chủ EC2 mà không bị xung đột cổng (Port conflict), đồng thời vẫn chia tải tự động được?", a: "Sử dụng Application Load Balancer (ALB) kết hợp với Amazon ECS và tính năng Dynamic Host Port Mapping (không gán cứng host port)." },
      { q: "Ngoài địa chỉ IP gốc nằm ở X-Forwarded-For, ALB lưu thông tin Cổng gốc (Port) và Giao thức gốc (HTTP/HTTPS) của người dùng vào 2 HTTP Headers nào?", a: "X-Forwarded-Port và X-Forwarded-Proto." }
    ],
    quizzes: [
      {
        qEn: "A company runs multiple microservices on Amazon ECS behind a single load balancer. Requests to 'api.example.com/orders' must go to the Orders service, while requests to 'api.example.com/payments' must go to the Payments service. Which load balancer should be used?",
        qVi: "Công ty chạy nhiều microservices trên ECS phía sau 1 bộ cân bằng tải duy nhất. Yêu cầu tới '/orders' phải vào dịch vụ Orders, còn '/payments' phải vào dịch vụ Payments. Chọn loại Load Balancer nào?",
        options: [
          "A. Network Load Balancer (NLB)",
          "B. Application Load Balancer (ALB) with path-based routing listener rules",
          "C. Gateway Load Balancer (GWLB)",
          "D. Classic Load Balancer (CLB)"
        ],
        correctIdx: 1,
        explanation: "Chỉ có Application Load Balancer (ALB - Layer 7) mới đọc được đường dẫn URL Path (/orders, /payments) để điều hướng về từng Target Group riêng biệt."
      },
      {
        qEn: "A web application hosted on EC2 instances behind an Application Load Balancer (ALB) logs the client IP address for security auditing. However, the logs only show the private IP addresses of the ALB nodes instead of the actual end-user IPs. How can the developer fix this?",
        qVi: "Ứng dụng web trên EC2 đứng sau ALB ghi log địa chỉ IP khách hàng để kiểm toán. Nhưng trong log chỉ toàn thấy IP nội bộ của ALB chứ không thấy IP thật của người dùng. Sửa bằng cách nào?",
        options: [
          "A. Migrate from the ALB to a Gateway Load Balancer.",
          "B. Configure the web application to read the client IP address from the 'X-Forwarded-For' HTTP request header.",
          "C. Attach Elastic IP addresses directly to each backend EC2 instance.",
          "D. Disable Cross-Zone Load Balancing on the ALB."
        ],
        correctIdx: 1,
        explanation: "ALB thực hiện kết thúc kết nối (connection termination) và tự động ghi IP gốc của khách hàng vào HTTP Header 'X-Forwarded-For'."
      }
    ]
  },

  12: {
    jargon: [
      { term: "Layer 4 (Transport Layer - TCP/UDP)", plain: "Tầng giao vận: Chỉ nhìn địa chỉ IP và số Cổng (Port), không cần biết bên trong là web hay game hay cuộc gọi video. Nhờ không mở phong bì ra đọc nên tốc độ nhanh khủng khiếp!" },
      { term: "Static IP / Whitelisting", plain: "Nhiều công ty tài chính/ngân hàng có tường lửa rất gắt: Họ đòi bạn đưa cho họ đúng 2 con số địa chỉ IP cố định không bao giờ thay đổi để họ mở tường lửa (Whitelist). ALB không làm được việc này, nhưng NLB thì làm được!" },
      { term: "GENEVE Protocol (Port 6081)", plain: "Giao thức đóng gói gói tin mạng của Gateway Load Balancer (GWLB) để bê nguyên gói tin đi qua máy chủ tường lửa kiểm tra rồi trả về." }
    ],
    diagram: `
Khi nào chọn NLB vs GWLB vs Kết hợp NLB + ALB?
 • Cần TCP/UDP siêu tốc + Cấp IP Tĩnh (Elastic IP) cố định cho mỗi AZ? ──► Network Load Balancer (NLB - Layer 4)
 • Vừa cần IP Tĩnh (Elastic IP) VỪA cần định tuyến URL Path (Layer 7)? ──► Đặt [NLB] ở trước trỏ vào [ALB] ở sau!
 • Cần cho gói tin đi qua Tường lửa ảo của bên thứ 3 (Palo Alto/Fortinet)? ──► Gateway Load Balancer (GWLB - Layer 3)`,
    deepSections: [
      {
        title: "1. Hai trường hợp bắt buộc phải chọn Network Load Balancer (NLB) thay vì ALB",
        content: "1. <strong>Giao thức không phải HTTP (Non-HTTP traffic) hoặc đòi hỏi hiệu năng cực đại</strong>: Ví dụ ứng dụng truyền dữ liệu qua TCP thuần, UDP (Game server, DNS, IoT, Video streaming) cần xử lý hàng triệu request/giây với độ trễ ~100ms.<br>2. <strong>Yêu cầu địa chỉ IP tĩnh cố định (Static IP / Elastic IP)</strong>: ALB chỉ cho bạn một tên miền DNS chứ IP bên dưới đổi liên tục. Ngược lại, <strong>NLB cho phép gắn cố định 1 địa chỉ Elastic IP trên mỗi Availability Zone</strong>!"
      },
      {
        title: "2. Mẹo xử lý khi đề bài vừa đòi tính năng của ALB (Layer 7) vừa đòi Static IP của NLB!",
        content: "Đề thi SAA-C03 có một câu hỏi nâng cao rất hay: <em>'Ứng dụng web cần định tuyến theo URL Path hoặc HTTP Header của ALB, nhưng khách hàng doanh nghiệp lại bắt buộc chỉ kết nối qua danh sách địa chỉ Elastic IP tĩnh cố định. Phải làm sao?'</em><br>👉 <strong>Giải pháp chuẩn AWS</strong>: Đặt một <strong>Network Load Balancer (NLB) ở phía trước</strong> (để lấy Static Elastic IP cho khách hàng whitelist), sau đó cấu hình Target Group của NLB trỏ thẳng về phía <strong>Application Load Balancer (ALB) ở phía sau</strong> (để xử lý định tuyến Layer 7)!"
      },
      {
        title: "3. Gateway Load Balancer (GWLB) và Kiến trúc Tường lửa Tập trung",
        content: "Khi công ty mua phần mềm tường lửa ảo (Virtual Appliances như Fortinet, Check Point, Palo Alto, Cisco, Suricata IDS/IPS) chạy trên một dàn máy EC2 và muốn <strong>mọi gói tin mạng đi vào/đi ra VPC đều phải đi xuyên qua dàn máy tường lửa này để khám xét (Deep Packet Inspection)</strong> → Luôn chọn <strong>Gateway Load Balancer (GWLB) kết hợp với Gateway Load Balancer Endpoint (GWLBe)</strong>."
      }
    ],
    extraCards: [
      { q: "Làm thế nào để một ứng dụng Web vừa sử dụng được tính năng định tuyến URL Path (Layer 7 của ALB) vừa cung cấp được địa chỉ Elastic IP tĩnh cố định cho đối tác mở tường lửa?", a: "Đặt một Network Load Balancer (NLB - gắn Elastic IP) ở phía trước, và cấu hình NLB chuyển tiếp lưu lượng vào một Application Load Balancer (ALB) ở phía sau." },
      { q: "Gateway Load Balancer (GWLB) hoạt động ở tầng mấy của mô hình OSI và sử dụng giao thức đóng gói nào trên cổng 6081?", a: "Hoạt động ở Layer 3 (Network Layer) và sử dụng giao thức GENEVE trên cổng 6081." }
    ],
    quizzes: [
      {
        qEn: "A financial services application uses a custom TCP protocol and requires ultra-low latency capable of handling millions of requests per second. Additionally, corporate clients require fixed Static IP addresses so they can whitelist the application in their corporate firewalls. Which load balancer should be used?",
        qVi: "Ứng dụng tài chính dùng giao thức TCP tùy chỉnh, đòi hỏi độ trễ cực thấp xử lý hàng triệu request/giây. Ngoài ra khách hàng yêu cầu địa chỉ IP tĩnh cố định để họ mở tường lửa (whitelist). Nên dùng Load Balancer nào?",
        options: [
          "A. Application Load Balancer (ALB)",
          "B. Network Load Balancer (NLB) with Elastic IP addresses assigned",
          "C. Gateway Load Balancer (GWLB)",
          "D. Amazon CloudFront"
        ],
        correctIdx: 1,
        explanation: "Network Load Balancer (NLB) hoạt động ở Layer 4 (TCP/UDP), xử lý hàng triệu request/s với độ trễ cực thấp và hỗ trợ gắn cố định 1 Static/Elastic IP trên mỗi AZ."
      },
      {
        qEn: "A security team wants to deploy a fleet of third-party virtual network appliances (IDS/IPS and deep packet inspection firewalls) on EC2 instances to inspect all traffic entering the VPC before it reaches the application servers. Which load balancer is specifically designed to scale and manage this fleet transparently?",
        qVi: "Đội bảo mật muốn triển khai một cụm thiết bị mạng ảo của bên thứ 3 (IDS/IPS và tường lửa kiểm tra gói tin sâu) trên EC2 để kiểm tra mọi lưu lượng đi vào VPC. Loại Load Balancer nào sinh ra chuyên cho mục đích này?",
        options: [
          "A. Application Load Balancer (ALB)",
          "B. Network Load Balancer (NLB)",
          "C. Gateway Load Balancer (GWLB)",
          "D. AWS Global Accelerator"
        ],
        correctIdx: 2,
        explanation: "Gateway Load Balancer (GWLB) hoạt động ở Layer 3 dùng giao thức GENEVE chuyên để triển khai, co giãn và quản lý cụm thiết bị bảo mật mạng ảo của bên thứ 3."
      }
    ]
  },

  13: {
    jargon: [
      { term: "Sticky Sessions (Session Affinity)", plain: "Dán keo dính: Một khi khách hàng A đã rơi vào máy EC2 số 1 ở lần bấm đầu tiên, mọi lần bấm tiếp theo của khách A đều bị ép quay lại đúng máy EC2 số 1 đó (nhờ Cookie)." },
      { term: "Cross-Zone Load Balancing", plain: "Chia đều không phân biệt vùng: Dù AZ-a chỉ có 2 máy EC2 còn AZ-b có 8 máy EC2, nếu bật Cross-Zone thì cả 10 máy đều nhận đúng 10% việc bằng nhau!" },
      { term: "SNI (Server Name Indication)", plain: "Công nghệ giúp gắn 20 chứng chỉ bảo mật HTTPS của 20 tên miền web khác nhau lên chung 1 cái Load Balancer duy nhất mà không bị nhầm lẫn." },
      { term: "Deregistration Delay (Connection Draining)", plain: "Thời gian chờ xả khách: Khi 1 máy EC2 chuẩn bị tắt để bảo trì, Load Balancer ngừng cho khách mới vào máy đó và chờ (mặc định 300s) cho các khách cũ bên trong xử lý xong xuôi rồi mới rút điện." }
    ],
    diagram: `
[Cross-Zone Load Balancing]
 • TẮT Cross-Zone (Mặc định trên NLB): Node LB ở AZ-a (nhận 50% traffic) chỉ chia cho 2 máy ở AZ-a (Mỗi máy gánh 25%!)
 • BẬT Cross-Zone (Mặc định trên ALB): Node LB ở AZ-a và AZ-b chia đều cho toàn bộ 10 máy ở cả 2 AZ (Mỗi máy đúng 10%!)`,
    deepSections: [
      {
        title: "1. Sticky Sessions: Khi nào dùng và tại sao ElastiCache lại tốt hơn?",
        content: "• Nếu ứng dụng cũ lưu thông tin đăng nhập (User Session) trực tiếp vào thanh RAM của từng máy chủ EC2, khi Load Balancer chuyển request tiếp theo của user sang máy EC2 khác thì user bị văng khỏi tài khoản (mất đăng nhập).<br>• <strong>Giải pháp chữa cháy nhanh (Không sửa code)</strong>: Bật <strong>Sticky Sessions (Session Affinity)</strong> trên ALB (có thể dùng <em>Application-based cookie</em> do app tự sinh hoặc <em>Duration-based cookie</em> <code>AWSALB</code> do ALB tự sinh).<br>• <strong>Giải pháp kiến trúc chuẩn nhất (Stateless Architecture)</strong>: Đẩy toàn bộ dữ liệu Session ra lưu tập trung ở <strong>Amazon ElastiCache (Redis/Memcached)</strong> hoặc <strong>Amazon DynamoDB</strong> để máy EC2 nào xử lý hay bị tắt đi cũng không ảnh hưởng tới người dùng!"
      },
      {
        title: "2. Bảng nhớ nhanh trạng thái Cross-Zone Load Balancing (Hay gài bẫy!)",
        content: "• <strong>Application Load Balancer (ALB)</strong>: Mặc định <strong>LUÔN BẬT</strong> ở cấp độ Load Balancer và <strong>MIỄN PHÍ</strong> truyền dữ liệu liên AZ.<br>• <strong>Network Load Balancer (NLB) & Gateway Load Balancer (GWLB)</strong>: Mặc định <strong>TẮT</strong> ở cấp độ Target Group. Nếu bạn bật nó lên, bạn sẽ <strong>bị tính phí truyền dữ liệu giữa các AZ (Inter-AZ data transfer charges)</strong>!"
      },
      {
        title: "3. SSL/TLS Offloading & SNI (Server Name Indication)",
        content: "• Việc giải mã HTTPS tốn khá nhiều CPU. Đặt chứng chỉ SSL trên ALB/NLB (quản lý miễn phí bằng <strong>AWS Certificate Manager - ACM</strong>) để Load Balancer giải mã HTTPS thay cho máy chủ EC2 gọi là <strong>SSL Termination / Offloading</strong>.<br>• Khi đề bài hỏi: <em>'Công ty chạy 15 website có tên miền khác nhau trên cùng một cụm máy chủ phía sau 1 ALB duy nhất. Làm sao gắn 15 chứng chỉ SSL khác nhau lên 1 ALB?'</em> → Nhờ tính năng <strong>SNI (Server Name Indication)</strong>!"
      }
    ],
    extraCards: [
      { q: "So sánh trạng thái bật/tắt mặc định và chi phí của tính năng Cross-Zone Load Balancing giữa ALB và NLB?", a: "Trên ALB: Luôn bật mặc định và miễn phí. Trên NLB: Mặc định tắt, nếu bật lên sẽ bị tính phí truyền dữ liệu liên vùng (Inter-AZ data transfer)." },
      { q: "Khi bật Sticky Sessions trên ALB nhưng máy chủ EC2 đó bị quá tải CPU, giải pháp kiến trúc dài hạn tốt nhất để bỏ Sticky Sessions mà người dùng không bị mất phiên đăng nhập là gì?", a: "Chuyển việc lưu trữ Session từ bộ nhớ cục bộ của EC2 ra Amazon ElastiCache (Redis) hoặc Amazon DynamoDB." }
    ],
    quizzes: [
      {
        qEn: "A company hosts multiple websites (site1.com, site2.com, site3.com) on a single fleet of EC2 instances behind one Application Load Balancer (ALB). Each website requires its own separate SSL/TLS certificate. How can the solutions architect configure this at the lowest cost?",
        qVi: "Công ty chạy nhiều website có tên miền khác nhau phía sau duy nhất 1 ALB. Mỗi website yêu cầu một chứng chỉ SSL/TLS riêng biệt. Cấu hình thế nào để tiết kiệm chi phí nhất?",
        options: [
          "A. Create 3 separate Application Load Balancers, one for each SSL certificate.",
          "B. Bind all 3 SSL/TLS certificates to the same HTTPS listener on the single ALB using Server Name Indication (SNI).",
          "C. Switch to a Classic Load Balancer (CLB).",
          "D. Attach 3 Elastic IP addresses to the single ALB."
        ],
        correctIdx: 1,
        explanation: "Tính năng SNI (Server Name Indication) trên ALB và NLB cho phép gắn tối đa 25 chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên cùng 1 Listener mà không cần mua thêm Load Balancer."
      },
      {
        qEn: "A company has 2 EC2 instances in AZ-a and 8 EC2 instances in AZ-b behind a Network Load Balancer (NLB). The team notices that the 2 instances in AZ-a are running at 90% CPU utilization while the 8 instances in AZ-b are only at 20% CPU. Why is this happening and how can it be fixed?",
        qVi: "Công ty có 2 máy EC2 ở AZ-a và 8 máy EC2 ở AZ-b đứng sau một NLB. Đội ngũ phát hiện 2 máy ở AZ-a bị quá tải 90% CPU trong khi 8 máy ở AZ-b chỉ chạy 20% CPU. Tại sao và cách sửa là gì?",
        options: [
          "A. Cross-Zone Load Balancing is disabled by default on NLBs, so each AZ receives 50% of the traffic. Enable Cross-Zone Load Balancing on the NLB target group.",
          "B. Sticky Sessions have not been enabled on the NLB.",
          "C. The Deregistration Delay is configured too high.",
          "D. SNI certificates have not been attached."
        ],
        correctIdx: 0,
        explanation: "Trên NLB, Cross-Zone Load Balancing mặc định bị tắt, khiến node NLB ở AZ-a đẩy trọn 50% tổng lưu lượng vào chỉ 2 máy ở AZ-a. Bật Cross-Zone Load Balancing sẽ chia đều tải (10% mỗi máy) cho cả 10 máy."
      }
    ]
  },

  14: {
    jargon: [
      { term: "Scale Out vs Scale In", plain: "Scale Out = Đẻ thêm máy chủ EC2 mới khi đông khách (Horizontal Scaling). Scale In = Tắt và xóa bớt máy chủ khi vắng khách để tiết kiệm tiền." },
      { term: "ASG Lifecycle Hooks", plain: "Cái phanh tạm dừng: Khi 1 máy EC2 chuẩn bị bị ASG xóa bỏ (Scale In), Lifecycle Hook giữ máy đó ở trạng thái chờ (Terminating:Wait) vài phút để kịp chạy script đẩy nốt file log cuối cùng lên S3 rồi mới cho xóa thật!" },
      { term: "ASG Warm Pools", plain: "Dàn máy dự bị đã khởi động và cài đặt sẵn nhưng đang được cho 'ngủ chờ' (Stopped/Hibernated) — hễ cần Scale Out là bật dậy vào việc trong 10 giây thay vì chờ tạo máy mới mất 5 phút!" },
      { term: "ASG Instance Refresh", plain: "Cập nhật cuốn chiếu (Rolling update): Tự động thay thế dần dần từng nhóm máy cũ bằng máy mới dùng AMI phiên bản mới mà không làm sập web." }
    ],
    diagram: `
[Auto Scaling Group (Min: 2, Desired: 4, Max: 10)]
  ├── Khi Scale Out: [Pending] ──► (Lifecycle Hook: Pending:Wait) ──► [InService] (Nhận traffic từ ALB)
  └── Khi Scale In : [InService] ──► (Connection Draining trên ALB) ──► (Lifecycle Hook: Terminating:Wait: Đẩy Log lên S3!) ──► [Terminated]`,
    deepSections: [
      {
        title: "1. Bốn chính sách Co giãn tự động (Scaling Policies) trong đề thi",
        content: "1. <strong>Target Tracking Scaling (Đơn giản nhất - Khuyên dùng)</strong>: Bạn chỉ định 1 con số mục tiêu, ví dụ <em>'Giữ CPU trung bình ở mức 50%'</em> hoặc <em>'Giữ số lượng Request trên mỗi máy (ALBRequestCountPerTarget) ở mức 1,000'</em>, ASG tự lo hết phần còn lại.<br>2. <strong>Step Scaling</strong>: Co giãn theo từng bậc thang của CloudWatch Alarm.<br>3. <strong>Scheduled Scaling</strong>: Hẹn giờ cố định (ví dụ đúng 8h30 sáng tăng lên 20 máy).<br>4. <strong>Predictive Scaling</strong>: Dùng Machine Learning học quy luật lưu lượng hàng ngày/hàng tuần để <strong>chủ động bật máy đón đầu trước khi giờ cao điểm ập tới</strong>."
      },
      {
        title: "2. Ba tính năng nâng cao cực hay hỏi: Lifecycle Hooks, Warm Pools & Termination Policy",
        content: "• <strong>ASG Lifecycle Hooks (Câu hỏi tủ!)</strong>: Đề bài hỏi: <em>'Trước khi một máy EC2 trong Auto Scaling Group bị xóa bỏ (Terminated), công ty cần chạy một đoạn script để gom toàn bộ file log cục bộ trên máy đó đẩy lên S3 để không bị mất log. Dùng tính năng gì?'</em> → Đáp án chắc chắn 100% là: <strong>EC2 Auto Scaling Lifecycle Hook (ở bước <code>autoscaling:EC2_INSTANCE_TERMINATING</code>) kết hợp với Amazon EventBridge + SSM Run Command!</strong><br>• <strong>ASG Warm Pools</strong>: Giải quyết bài toán ứng dụng mất nhiều thời gian khởi tạo nhưng không muốn dùng Golden AMI. Các máy được khởi tạo trước rồi để ở trạng thái <code>Stopped</code> (hoặc <code>Hibernated</code>) trong Warm Pool, chỉ tốn tiền ổ cứng EBS rẻ bèo, khi cần là nhảy vào cụm trong vài giây.<br>• <strong>Default Termination Policy (Quy tắc chọn máy để xóa khi Scale In)</strong>: (1) Chọn AZ nào đang có nhiều máy nhất → (2) Chọn máy nào đang dùng Launch Template phiên bản cũ nhất → (3) Chọn máy nào sắp đến giờ tính tiền tiếp theo nhất."
      }
    ],
    extraCards: [
      { q: "Trước khi một máy EC2 bị Auto Scaling Group xóa bỏ (Terminate) trong quá trình Scale In, làm thế nào để tạm dừng quá trình xóa nhằm kịp thời sao lưu các file log cục bộ từ máy đó lên S3?", a: "Sử dụng EC2 Auto Scaling Lifecycle Hook (trạng thái Terminating:Wait) kết hợp với EventBridge và SSM Run Command." },
      { q: "Tính năng nào của Auto Scaling Group cho phép tạo sẵn một nhóm máy chủ đã khởi tạo xong nhưng để ở trạng thái Stopped/Hibernated nhằm rút ngắn thời gian Scale Out xuống còn vài giây?", a: "EC2 Auto Scaling Warm Pools." },
      { q: "Khi cập nhật phiên bản AMI mới trong Launch Template, tính năng nào của Auto Scaling Group giúp tự động thay thế cuốn chiếu (Rolling replacement) toàn bộ các máy EC2 cũ sang AMI mới?", a: "ASG Instance Refresh." }
    ],
    quizzes: [
      {
        qEn: "An application runs on an Auto Scaling group of EC2 instances and writes diagnostic logs to the local disk before uploading them to Amazon S3 every 15 minutes. During scale-in events, instances are terminated before the latest logs are uploaded, causing data loss. How can the solutions architect ensure all logs are uploaded to S3 before an instance is terminated?",
        qVi: "Ứng dụng chạy trên cụm Auto Scaling ghi log ra đĩa cục bộ rồi mỗi 15 phút mới đẩy lên S3. Khi Scale-in, máy EC2 bị xóa trước khi kịp đẩy log mới nhất gây mất dữ liệu. Làm sao đảm bảo toàn bộ log được đẩy lên S3 trước khi máy bị xóa?",
        options: [
          "A. Increase the Auto Scaling group cooldown period to 30 minutes.",
          "B. Configure an EC2 Auto Scaling Lifecycle Hook for the Terminating:Wait state to trigger a script that uploads the remaining logs to S3 before termination completes.",
          "C. Enable Sticky Sessions on the load balancer.",
          "D. Change the scaling policy to Predictive Scaling."
        ],
        correctIdx: 1,
        explanation: "Auto Scaling Lifecycle Hook (Terminating:Wait) cho phép tạm giữ máy EC2 trước khi bị xóa hoàn toàn để thực thi các tác vụ dọn dẹp hoặc đẩy log cuối cùng lên S3."
      },
      {
        qEn: "A company's e-commerce website experiences predictable weekly traffic patterns with spikes every Friday evening and Saturday morning. However, instances take several minutes to warm up. Which Auto Scaling policy uses machine learning to analyze historical traffic and provision capacity ahead of forecasted spikes?",
        qVi: "Website thương mại điện tử có lưu lượng truy cập mang tính chu kỳ hàng tuần, luôn tăng cao vào tối thứ Sáu và sáng thứ Bảy. Chính sách Auto Scaling nào dùng Machine Learning phân tích lịch sử và tự động bật máy đón đầu trước khi đợt cao điểm diễn ra?",
        options: [
          "A. Target Tracking Scaling",
          "B. Step Scaling",
          "C. Simple Scaling",
          "D. Predictive Scaling"
        ],
        correctIdx: 3,
        explanation: "Predictive Scaling sử dụng Machine Learning phân tích dữ liệu lịch sử từ CloudWatch để dự báo tải tương lai và tự động lập lịch cấp phát máy trước giờ cao điểm."
      }
    ]
  },

  15: {
    jargon: [
      { term: "Object Storage vs Block Storage", plain: "Block Storage (EBS) là ổ cứng cài được Windows/MySQL. Object Storage (S3) là kho chứa từng file nguyên vẹn (ảnh, video, zip, csv) truy cập qua link web HTTP — không cài hệ điều hành hay chạy DB giao dịch trực tiếp trên S3 được." },
      { term: "Delete Marker (Thẻ đánh dấu xóa)", plain: "Khi bật Versioning trên S3 mà bạn bấm nút Delete 1 file, S3 không xóa thật đâu! Nó chỉ đè 1 tờ giấy ghi 'Đã ẩn (Delete Marker)' lên trên cùng. Xóa tờ giấy này đi là file cũ hiện lại nguyên vẹn!" },
      { term: "S3 Replication Time Control (S3 RTC)", plain: "Cam kết SLA sao chép 99.99% các file mới sang Region khác trong vòng tối đa 15 phút (dành cho các bài toán Compliance khắt khe đòi hỏi RPO <= 15 phút)." }
    ],
    diagram: `
[S3 Bucket Nguồn (Bật Versioning!)] ──(Tự động chép file MỚI qua CRR/SRR)──► [S3 Bucket Đích (Bật Versioning!)]
        │
        ├── Thế còn các file CŨ đã có từ trước lúc bật Replication thì sao? ──► Phải chạy [S3 Batch Operations]!
        └── Cần cam kết sao chép xong trong vòng 15 phút có SLA?           ──► Bật [S3 Replication Time Control (RTC)]!`,
    deepSections: [
      {
        title: "1. Tính nhất quán mạnh (Strong Read-After-Write Consistency) của S3",
        content: "Hiện tại Amazon S3 cung cấp <strong>Strong Consistency (Tính nhất quán mạnh tự động và miễn phí)</strong> cho mọi thao tác PUT và DELETE. Nghĩa là: Ngay giây thứ nhất ứng dụng Java của bạn vừa ghi đè hoặc upload xong 1 file lên S3, ở giây thứ hai bất kỳ ai gọi lệnh đọc (GET) hoặc liệt kê danh sách file (LIST) đều sẽ <strong>nhìn thấy ngay phiên bản mới nhất 100%</strong>!"
      },
      {
        title: "2. Những quy tắc ngầm về S3 Versioning & Replication (CRR / SRR)",
        content: "• Một khi đã bật <code>S3 Versioning</code> cho Bucket, bạn <strong>KHÔNG THỂ tắt (Disable) nó đi được nữa</strong>, mà chỉ có thể <strong>Tạm dừng (Suspend)</strong>.<br>• Khi bật <code>Cross-Region Replication (CRR)</code> hoặc <code>Same-Region Replication (SRR)</code>:<br>  1. Bắt buộc phải bật Versioning ở cả Bucket nguồn và đích.<br>  2. Chỉ các file được upload mới sau thời điểm bật mới tự động chép sang. <strong>Muốn chép các file cũ đã có sẵn từ trước → Dùng S3 Batch Operations (Batch Replication)</strong>.<br>  3. Mặc định việc xóa file (Delete Marker) không bị chép sang đích (trừ khi bật tùy chọn <em>Delete Marker Replication</em>). Còn việc xóa vĩnh viễn theo <code>Version ID</code> thì <strong>KHÔNG BAO GIỜ</strong> bị chép sang đích.<br>  4. Không có tính bắc cầu (No chaining): Bucket 1 replicate sang Bucket 2, Bucket 2 replicate sang Bucket 3 thì file từ Bucket 1 sẽ KHÔNG tự chạy sang Bucket 3.<br>• <strong>S3 Replication Time Control (S3 RTC)</strong>: Khi đề bài yêu cầu sao chép S3 giữa các Region với cam kết <strong>trong vòng 15 phút</strong>."
      }
    ],
    extraCards: [
      { q: "Trên Amazon S3, sau khi một file vừa được ghi đè (PUT) hoặc xóa (DELETE), người dùng đọc lại ngay lập tức có nguy cơ đọc phải bản cũ không? Tại sao?", a: "KHÔNG. Vì Amazon S3 hỗ trợ tính nhất quán mạnh (Strong Read-After-Write Consistency) cho mọi thao tác đọc/ghi/liệt kê đối tượng." },
      { q: "Khi đề bài yêu cầu sao chép dữ liệu giữa hai S3 Bucket ở 2 Region khác nhau và phải có cam kết SLA 99.99% hoàn tất sao chép trong vòng 15 phút, ta bật tính năng gì?", a: "S3 Replication Time Control (S3 RTC)." }
    ],
    quizzes: [
      {
        qEn: "A company has 500,000 existing objects in an S3 bucket and just enabled Cross-Region Replication (CRR) to a destination bucket in another Region. However, the engineer notices that only newly uploaded objects are being replicated. How can the engineer replicate the 500,000 existing objects?",
        qVi: "Công ty có sẵn 500.000 file trong S3 bucket và vừa bật Cross-Region Replication (CRR) sang Region khác. Nhưng kỹ sư thấy chỉ có các file mới upload mới được sao chép sang. Làm sao để sao chép 500.000 file cũ đã tồn tại trước đó?",
        options: [
          "A. Disable and then re-enable S3 Versioning on the source bucket.",
          "B. Use S3 Batch Operations (S3 Batch Replication) to replicate all existing objects to the destination bucket.",
          "C. Switch from Cross-Region Replication (CRR) to Same-Region Replication (SRR).",
          "D. Wait 24 hours for S3 to automatically scan and replicate historical objects."
        ],
        correctIdx: 1,
        explanation: "S3 CRR/SRR mặc định chỉ sao chép các object mới từ thời điểm bật. Để sao chép các object cũ đã có sẵn (existing objects), bạn phải chạy một job S3 Batch Replication (S3 Batch Operations)."
      },
      {
        qEn: "A financial institution uses S3 Cross-Region Replication (CRR) for disaster recovery. Strict compliance rules require a predictable replication time backed by an SLA where 99.99% of objects must be replicated within 15 minutes. Which S3 feature should be enabled?",
        qVi: "Tổ chức tài chính dùng S3 CRR để dự phòng thảm họa. Quy định yêu cầu thời gian sao chép có cam kết SLA sao cho 99.99% các file phải được sao chép xong trong vòng 15 phút. Cần bật tính năng nào?",
        options: [
          "A. S3 Transfer Acceleration",
          "B. S3 Replication Time Control (S3 RTC)",
          "C. S3 Intelligent-Tiering",
          "D. S3 Multipart Upload"
        ],
        correctIdx: 1,
        explanation: "S3 Replication Time Control (S3 RTC) đảm bảo sao chép hầu hết các object trong vài giây và cam kết SLA 99.99% hoàn tất trong vòng 15 phút."
      }
    ]
  },

  16: {
    jargon: [
      { term: "Durability (Độ bền 11 số 9) vs Availability (Độ sẵn sàng)", plain: "Durability (99.999999999%) = Xác suất file của bạn bị mất tích (Mọi tầng S3 đều bền 11 số 9 như nhau!). Availability (99.9% hoặc 99.5%) = Xác suất lúc bạn bấm tải file mà S3 phản hồi ngay không bị lỗi mạng." },
      { term: "Minimum Storage Duration Charge", plain: "Phí lưu tối thiểu: Ở tầng Standard-IA (30 ngày), Glacier (90 ngày), Deep Archive (180 ngày), nếu bạn vừa upload file hôm trước mà hôm sau xóa luôn thì AWS vẫn thu đủ tiền lưu của 30/90/180 ngày!" },
      { term: "S3 Storage Class Analysis & S3 Storage Lens", plain: "Công cụ theo dõi thói quen đọc file của bạn trong 30 ngày rồi gợi ý: 'Các file trong thư mục /logs này chẳng ai đọc đâu, hãy viết Lifecycle Rule chuyển xuống Standard-IA đi!'." }
    ],
    diagram: `
Sơ đồ Chuyển tầng tự động (S3 Lifecycle Policy):
[S3 Standard] ──(Sau 30 ngày)──► [Standard-IA / One Zone-IA] ──(Sau 90 ngày)──► [Glacier Instant / Flexible] ──(Sau 365 ngày)──► [Glacier Deep Archive]
   *(Hoặc nếu KHÔNG ĐOÁN ĐƯỢC thói quen truy cập ──► Đưa thẳng vào [S3 Intelligent-Tiering] để AWS tự chuyển miễn phí!)*`,
    deepSections: [
      {
        title: "1. Bí kíp phân biệt 7 tầng lưu trữ S3 trong 10 giây",
        content: "• <strong>S3 Standard</strong>: Truy cập thường xuyên.<br>• <strong>S3 Intelligent-Tiering</strong>: Từ khóa <strong><em>Unknown, unpredictable, or changing access patterns</em></strong> (Tự động chuyển giữa các tầng mà <strong>không tốn phí Retrieval</strong>, chỉ tốn một khoản phí giám sát cực nhỏ hàng tháng; các file nhỏ hơn 128 KB sẽ không được chuyển sang tầng lạnh).<br>• <strong>S3 Standard-IA</strong>: Ít truy cập (< 1 lần/tháng), lấy ra ngay lập tức (mili-giây), lưu trên $\\ge 3$ AZ (tối thiểu 30 ngày).<br>• <strong>S3 One Zone-IA</strong>: Chỉ lưu trên <strong>1 AZ duy nhất</strong> (rẻ hơn 20%). Từ khóa: <strong><em>Easily reproducible data (thumbnails), secondary backup copies</em></strong>.<br>• <strong>S3 Glacier Instant Retrieval</strong>: Hiếm khi truy cập (1 lần/quý), lưu tối thiểu 90 ngày, nhưng khi cần là phải <strong>mở được ngay trong mili-giây</strong>.<br>• <strong>S3 Glacier Flexible Retrieval</strong>: Lưu tối thiểu 90 ngày. Có 3 chế độ lấy: <strong>Expedited (1–5 phút)</strong>, Standard (3–5 giờ), Bulk (5–12 giờ).<br>• <strong>S3 Glacier Deep Archive</strong>: Rẻ nhất! Lưu tối thiểu 180 ngày. Lấy ra mất <strong>12 giờ (Standard)</strong> hoặc <strong>48 giờ (Bulk)</strong>."
      },
      {
        title: "2. S3 Lifecycle Rules & Dọn dẹp Multipart Uploads bị treo",
        content: "Một bẫy chi phí rất hay hỏi trong đề thi: Khi người dùng upload các file lớn bằng <em>Multipart Upload</em> nhưng bị rớt mạng giữa chừng (Incomplete Multipart Uploads), các mảnh file tải dở đó vẫn nằm ẩn trong S3 và <strong>bị tính tiền lưu trữ mãi mãi</strong>! 👉 Giải pháp: Cấu hình một <strong>S3 Lifecycle Rule với hành động <code>AbortIncompleteMultipartUpload</code></strong> (ví dụ tự động xóa các mảnh tải dở sau 7 ngày)."
      }
    ],
    extraCards: [
      { q: "Khi người dùng upload file lớn bằng S3 Multipart Upload nhưng bị hủy giữa chừng, các mảnh file tải dở vẫn chiếm dung lượng và tốn tiền. Làm sao tự động dọn dẹp chúng?", a: "Cấu hình S3 Lifecycle Policy với quy tắc 'Abort incomplete multipart uploads' sau một số ngày nhất định (ví dụ 7 ngày)." },
      { q: "Tầng lưu trữ nào của S3 phù hợp nhất cho kho hồ sơ bệnh án điện tử hiếm khi được xem (chỉ xem 1-2 lần mỗi năm), nhưng khi bệnh nhân cấp cứu thì bác sĩ phải mở xem được ngay lập tức trong vài mili-giây?", a: "S3 Glacier Instant Retrieval." }
    ],
    quizzes: [
      {
        qEn: "A healthcare company stores millions of high-resolution medical images in Amazon S3. These images are rarely accessed (once every few months), but when a patient arrives at the emergency room, doctors must be able to retrieve the images immediately within milliseconds. Which S3 storage class is the MOST cost-effective?",
        qVi: "Công ty y tế lưu hàng triệu ảnh chụp y khoa độ phân giải cao trên S3. Các ảnh này hiếm khi được mở (vài tháng 1 lần), nhưng khi bệnh nhân vào phòng cấp cứu thì bác sĩ phải mở xem được ngay lập tức trong vài mili-giây. Tầng lưu trữ nào tiết kiệm nhất?",
        options: [
          "A. S3 Standard-IA",
          "B. S3 One Zone-IA",
          "C. S3 Glacier Instant Retrieval",
          "D. S3 Glacier Flexible Retrieval (Expedited)"
        ],
        correctIdx: 2,
        explanation: "S3 Glacier Instant Retrieval rẻ hơn tới 68% so với Standard-IA cho dữ liệu hiếm khi truy cập (mỗi quý 1 lần) mà vẫn cung cấp tốc độ truy xuất trong vài mili-giây."
      },
      {
        qEn: "A media company allows users to upload large video files to Amazon S3 using Multipart Upload. A cost audit reveals that the bucket is incurring significant storage charges for thousands of unfinished, abandoned upload parts from failed connections. How can the architect automatically clean up these parts?",
        qVi: "Công ty truyền thông cho phép người dùng tải video lớn lên S3 bằng Multipart Upload. Kiểm toán chi phí phát hiện tốn rất nhiều tiền lưu trữ cho hàng nghìn mảnh file tải dở bị bỏ rơi do đứt mạng. Làm sao tự động dọn dẹp chúng?",
        options: [
          "A. Enable S3 Intelligent-Tiering on the bucket.",
          "B. Create an S3 Lifecycle rule configured to 'Abort incomplete multipart uploads' after 7 days.",
          "C. Enable S3 Versioning and MFA Delete.",
          "D. Enable S3 Transfer Acceleration."
        ],
        correctIdx: 1,
        explanation: "S3 Lifecycle Rule hỗ trợ tính năng tự động hủy và xóa các phiên Multipart Upload chưa hoàn tất (AbortIncompleteMultipartUpload) sau số ngày chỉ định."
      }
    ]
  },

  17: {
    jargon: [
      { term: "S3 Prefix (Tiền tố thư mục)", plain: "Trong S3 thực chất không có khái niệm thư mục vật lý mà chỉ là tên file có dấu gạch chéo. Ví dụ file 's3://my-bucket/logs/2025/app.log' thì phần '/logs/2025/' chính là 1 Prefix!" },
      { term: "S3 Object Lambda", plain: "Trạm biến hình file trực tiếp: Khi 1 ứng dụng gọi lệnh tải 1 file từ S3, S3 Object Lambda tự động chạy code ẩn bớt thông tin nhạy cảm (che số điện thoại) hoặc đổi định dạng XML sang JSON ngay trên đường tải về mà không cần tạo thêm bản sao file trên S3!" },
      { term: "S3 Event Notifications vs EventBridge", plain: "S3 Event thường chỉ bắn được vào 3 nơi (Lambda, SQS, SNS). Còn bật tích hợp S3 với Amazon EventBridge thì bắn được tới 18+ dịch vụ AWS, lọc nâng cao theo nội dung JSON và lưu trữ sự kiện để phát lại (Replay)." }
    ],
    diagram: `
[Bucket S3 Gốc (Chứa thông tin nhạy cảm PII)]
       │
       ├──► Ứng dụng Phân tích (Marketing) ──► Đi qua [S3 Object Lambda Access Point] ──► Hàm Lambda tự động che số CCCD/SĐT ──► Nhận file đã ẩn PII!
       └──► Ứng dụng Kiểm toán (Finance)   ──► Đi qua [S3 Access Point thường]        ──► Nhận nguyên bản file gốc!`,
    deepSections: [
      {
        title: "1. Tối ưu hiệu năng S3: Prefix Limits, Multipart Upload & Transfer Acceleration",
        content: "• <strong>Giới hạn Request mỗi Prefix</strong>: S3 tự động đáp ứng <strong>3,500 PUT/COPY/POST/DELETE và 5,500 GET/HEAD mỗi giây trên mỗi Prefix</strong>. Không giới hạn số lượng Prefix trong 1 Bucket.<br>• <strong>S3 Multipart Upload</strong>: Khuyên dùng cho file > 100 MB và <strong>bắt buộc cho file > 5 GB</strong>. Cắt file thành nhiều mảnh nhỏ gửi song song giúp tăng tốc độ upload.<br>• <strong>S3 Transfer Acceleration</strong>: Tăng tốc upload/download đường dài xuyên quốc gia bằng cách đưa file vào trạm <strong>CloudFront Edge Location</strong> gần nhất rồi chạy qua cáp quang nội bộ của AWS.<br>• <strong>S3 Byte-Range Fetches</strong>: Tải song song từng đoạn byte của file (tăng tốc độ Download) hoặc chỉ đọc vài chục byte đầu tiên của file."
      },
      {
        title: "2. S3 Object Lambda (Tính năng cực kỳ hay xuất hiện trong đề SAA-C03 mới!)",
        content: "Bài toán thực tế trong đề thi: <em>'Công ty có 1 S3 Bucket chứa dữ liệu khách hàng dùng chung cho nhiều phòng ban. Phòng Nghiên cứu khi tải file về thì phải bị ẩn đi các thông tin cá nhân (PII Redaction), hoặc ứng dụng Mobile tải ảnh về thì cần tự động resize ảnh nhỏ lại, nhưng công ty KHÔNG MUỐN tốn tiền lưu trữ nhiều bản sao của cùng 1 file trên S3.'</em><br>👉 <strong>Giải pháp chuẩn 100%</strong>: Sử dụng <strong>S3 Object Lambda (gắn hàm Lambda vào S3 Object Lambda Access Point)</strong> để tự động biến đổi dữ liệu ngay lúc file đang được tải về (Transform data on the fly during GET requests)!"
      }
    ],
    extraCards: [
      { q: "Tính năng nào cho phép tự động chạy code biến đổi nội dung file (ví dụ: che giấu dữ liệu nhạy cảm PII, giải nén, hoặc resize ảnh) ngay khi ứng dụng gọi lệnh GET tải file từ S3 mà không cần lưu trữ nhiều bản sao file?", a: "Amazon S3 Object Lambda." },
      { q: "Khi cần lọc sự kiện S3 dựa trên nhiều thuộc tính phức tạp (kích thước file, metadata) hoặc gửi sự kiện S3 đồng thời tới AWS Step Functions và Kinesis Data Firehose, ta dùng tính năng gì?", a: "Bật tích hợp S3 Event Notifications với Amazon EventBridge." }
    ],
    quizzes: [
      {
        qEn: "An e-commerce company stores customer order files in a single S3 bucket. The analytics application needs to read these files, but compliance rules require that all Personally Identifiable Information (PII) be masked before the analytics application receives the data. The company does not want to duplicate or create modified copies of the files in S3. Which solution meets these requirements?",
        qVi: "Công ty lưu file đơn hàng trong 1 S3 bucket. Ứng dụng phân tích cần đọc các file này, nhưng luật bảo mật bắt buộc phải che giấu toàn bộ thông tin cá nhân (PII) trước khi ứng dụng phân tích nhận được dữ liệu. Công ty không muốn tốn tiền lưu thêm bản sao thứ 2 của file trên S3. Chọn giải pháp nào?",
        options: [
          "A. Use S3 Cross-Region Replication.",
          "B. Use an S3 Object Lambda Access Point to invoke a Lambda function that dynamically masks PII data during GET requests.",
          "C. Use S3 Batch Operations.",
          "D. Use S3 Glacier Vault Lock."
        ],
        correctIdx: 1,
        explanation: "S3 Object Lambda cho phép gắn một hàm AWS Lambda vào quá trình xử lý lệnh S3 GET để tự động biến đổi hoặc ẩn dữ liệu nhạy cảm trực tiếp trên đường truyền mà không cần tạo bản sao file."
      },
      {
        qEn: "Users located across Europe, Asia, and South America upload 50 GB video files to a centralized S3 bucket in us-east-1. Users complain about slow upload speeds over the public internet. Which combination of S3 features will maximize upload performance?",
        qVi: "Người dùng ở khắp Châu Âu, Châu Á và Nam Mỹ upload các file video 50 GB về 1 S3 bucket đặt tại Mỹ (us-east-1) và phàn nàn tốc độ quá chậm. Kết hợp 2 tính năng nào của S3 để tăng tốc tối đa?",
        options: [
          "A. S3 Transfer Acceleration and S3 Multipart Upload",
          "B. S3 Byte-Range Fetches and S3 Intelligent-Tiering",
          "C. AWS Global Accelerator and S3 Versioning",
          "D. Amazon CloudFront Origin Access Control (OAC) and S3 Same-Region Replication"
        ],
        correctIdx: 0,
        explanation: "Với file lớn 50 GB (>5GB bắt buộc dùng Multipart Upload) gửi từ xa xuyên lục địa, kết hợp Multipart Upload (chia nhỏ gửi song song) và S3 Transfer Acceleration (đi qua Edge Location vào mạng trục AWS) sẽ cho tốc độ nhanh nhất."
      }
    ]
  },

  18: {
    jargon: [
      { term: "Encryption at Rest vs Encryption in Transit", plain: "At Rest = Mã hóa file khi đang nằm im trên ổ cứng S3 (SSE-S3, SSE-KMS, SSE-C). In Transit = Mã hóa file trên đường truyền mạng thông qua HTTPS/TLS (ép buộc bằng điều kiện aws:SecureTransport = true)." },
      { term: "S3 Bucket Keys", plain: "Bộ đệm khóa KMS ở cấp độ Bucket: Giúp giảm 99% số lần S3 phải chạy sang gọi dịch vụ KMS để xin giải mã từng file lẻ, từ đó vừa giảm 99% chi phí KMS vừa chống lỗi nghẽn cổ chai KMS (Throttling)!" },
      { term: "S3 Presigned URL", plain: "Chiếc vé mời VIP có hạn sử dụng (ví dụ 15 phút): Người cầm đường link này có thể tải xuống (GET) hoặc tải lên (PUT) đúng 1 file chỉ định trong Private S3 Bucket mà không cần có tài khoản AWS." }
    ],
    diagram: `
[Người dùng Web/Mobile] ──(1. Xin quyền upload ảnh)──► [Server Java Backend (Có IAM Role)]
         │                                                      │
         │                                       (2. Ký và trả về S3 Presigned URL hạn 15 phút)
         ▼                                                      │
[Upload/Download TRỰC TIẾP lên Private S3 Bucket] ◄─────────────┘ (Không làm nghẽn băng thông Server Java!)`,
    deepSections: [
      {
        title: "1. Bảng so sánh 4 phương pháp Mã hóa S3 (Đề thi hỏi cực kỳ chi tiết!)",
        content: "1. <strong>SSE-S3 (Server-Side Encryption with Amazon S3-Managed Keys)</strong>: Bật mặc định cho mọi bucket. AWS tự quản lý toàn bộ khóa (AES-256). Người dùng không nhìn thấy khóa và không kiểm soát được lịch xoay vòng khóa.<br>2. <strong>SSE-KMS (AWS Key Management Service)</strong>: Chọn ngay trong đề thi khi có từ khóa: <strong><em>Audit trail of key usage in CloudTrail (Kiểm toán ai đã dùng khóa qua CloudTrail), control who can access the key, or custom key rotation policies</em></strong>. Nhớ: Người tải file phải có cả quyền <code>s3:GetObject</code> lẫn quyền <code>kms:Decrypt</code>! Và nhớ bật <strong>S3 Bucket Keys</strong> để giảm 99% chi phí và tránh lỗi KMS Throttling.<br>3. <strong>SSE-C (Customer-Provided Keys)</strong>: Khách hàng tự tạo và giữ khóa ở dưới On-premise, AWS không lưu khóa này. Mỗi lần gọi đọc/ghi phải đính kèm khóa vào HTTP Header (Bắt buộc phải dùng HTTPS).<br>4. <strong>Client-Side Encryption</strong>: Ứng dụng tự mã hóa file trước khi gửi lên S3."
      },
      {
        title: "2. Làm sao bắt buộc mọi kết nối tới S3 phải dùng HTTPS (Encryption in Transit)?",
        content: "Trong S3 Bucket Policy, bạn viết một quy tắc <strong><code>Effect: Deny</code></strong> cho mọi hành động (<code>s3:*</code>) nếu điều kiện <strong><code>\"aws:SecureTransport\": \"false\"</code></strong>! Nghĩa là ai gọi bằng HTTP thường sẽ bị chặn ngay lập tức, chỉ cho phép HTTPS."
      }
    ],
    extraCards: [
      { q: "Một S3 Bucket dùng mã hóa SSE-KMS có lưu lượng đọc/ghi hàng nghìn file mỗi giây dẫn đến lỗi KMS ThrottlingException và chi phí KMS tăng vọt. Tính năng nào của S3 giúp giảm 99% số lượt gọi API sang KMS?", a: "S3 Bucket Keys." },
      { q: "Làm thế nào để cấu hình S3 Bucket Policy bắt buộc toàn bộ các kết nối đọc/ghi vào S3 phải được mã hóa trên đường truyền (HTTPS/TLS)?", a: "Thêm một câu lệnh Explicit Deny trong S3 Bucket Policy với điều kiện Condition: 'aws:SecureTransport': 'false'." },
      { q: "Khi công ty muốn S3 tự thực hiện việc mã hóa/giải mã trên server của AWS nhưng công ty muốn tự quản lý hoàn toàn khóa mã hóa ở dưới On-premise (không bao giờ lưu khóa trên AWS), chọn phương pháp nào?", a: "SSE-C (Server-Side Encryption with Customer-Provided Keys) qua kết nối HTTPS." }
    ],
    quizzes: [
      {
        qEn: "A company stores millions of sensitive financial documents in an S3 bucket encrypted with a custom AWS KMS key (SSE-KMS). Recently, high-volume analytics jobs reading from the bucket started failing with KMS 'ThrottlingException' errors, and AWS KMS costs have spiked. How can the architect resolve the throttling and reduce KMS costs by up to 99%?",
        qVi: "Công ty lưu hàng triệu tài liệu tài chính trên S3 mã hóa bằng khóa SSE-KMS. Gần đây các tác vụ phân tích đọc lượng lớn file bị báo lỗi KMS 'ThrottlingException' và chi phí KMS tăng vọt. Làm sao khắc phục lỗi nghẽn này và giảm tới 99% chi phí KMS?",
        options: [
          "A. Disable encryption on the S3 bucket.",
          "B. Enable Amazon S3 Bucket Keys on the S3 bucket.",
          "C. Enable S3 Transfer Acceleration.",
          "D. Create 10 additional S3 Access Points."
        ],
        correctIdx: 1,
        explanation: "S3 Bucket Keys tạo một khóa cấp độ bucket tạm thời từ KMS để mã hóa các object bên trong, giúp giảm tới 99% lưu lượng gọi API trực tiếp tới AWS KMS."
      },
      {
        qEn: "A security policy mandates that all objects in an S3 bucket must be encrypted in transit. How should the solutions architect enforce this requirement?",
        qVi: "Chính sách bảo mật yêu cầu toàn bộ dữ liệu truyền qua lại với một S3 bucket bắt buộc phải được mã hóa trên đường truyền (Encrypted in transit). Thực thi yêu cầu này như thế nào?",
        options: [
          "A. Enable default SSE-S3 encryption on the bucket.",
          "B. Add an explicit Deny statement to the S3 Bucket Policy with the condition 'aws:SecureTransport': 'false'.",
          "C. Enable S3 Object Lock in Compliance mode.",
          "D. Enable S3 Versioning."
        ],
        correctIdx: 1,
        explanation: "Điều kiện 'aws:SecureTransport': 'false' dùng với lệnh Effect: Deny trong S3 Bucket Policy sẽ từ chối mọi kết nối HTTP không mã hóa, ép buộc dùng HTTPS."
      }
    ]
  },

  19: {
    jargon: [
      { term: "WORM (Write Once, Read Many)", plain: "Ghi 1 lần, Đọc nhiều lần: Một khi file đã lưu vào là cấm tiệt mọi hành vi xóa hay sửa đổi nội dung file trong suốt thời hạn quy định." },
      { term: "CORS (Cross-Origin Resource Sharing)", plain: "Cơ chế bảo mật của Trình duyệt Web: Khi trang web ở tên miền A (web-cua-ban.com) dùng JavaScript gọi lấy ảnh/font chữ ở tên miền B (bucket-s3.amazonaws.com), Bucket B phải bật CORS cho phép tên miền A thì trình duyệt mới không chặn!" },
      { term: "S3 Requester Pays", plain: "Người tải trả tiền: Bình thường chủ Bucket phải trả mọi chi phí. Khi bật Requester Pays, ai vào tải dữ liệu người đó phải tự trả tiền băng thông mạng (Data transfer cost), chủ Bucket chỉ trả tiền lưu ổ cứng!" },
      { term: "S3 Multi-Region Access Points", plain: "Một tên miền S3 toàn cầu duy nhất đứng trước nhiều S3 Buckets ở nhiều Region khác nhau — tự động định tuyến người dùng vào Bucket ở Region gần nhất và tự Failover nếu 1 Region gặp sự cố." }
    ],
    diagram: `
So sánh các chế độ Khóa chống xóa trên S3 (S3 Object Lock):
 ├── [Compliance Mode] : Cứng rắn tuyệt đối! Kể cả Root Account cũng KHÔNG THỂ xóa hay rút ngắn hạn giữ file!
 ├── [Governance Mode] : Khóa user thường, nhưng Admin có quyền đặc biệt (s3:BypassGovernanceRetention) vẫn mở khóa được.
 └── [Legal Hold]      : Nút bấm tạm giữ vô thời hạn (không có ngày hết hạn cố định) phục vụ điều tra pháp lý.`,
    deepSections: [
      {
        title: "1. S3 Object Lock vs Glacier Vault Lock",
        content: "• <strong>S3 Object Lock</strong> (Yêu cầu bắt buộc phải bật <em>S3 Versioning</em>): Áp dụng mô hình WORM ở cấp độ từng phiên bản file trên S3. Nhớ kỹ 3 chế độ: <strong>Compliance Mode</strong> (Không ai kể cả Root xóa được), <strong>Governance Mode</strong> (Admin có quyền đặc biệt xóa được), và <strong>Legal Hold</strong> (Đóng băng vô thời hạn đến khi gỡ cờ).<br>• <strong>S3 Glacier Vault Lock</strong>: Áp dụng mô hình WORM cho kho lưu trữ S3 Glacier thông qua một <em>Vault Lock Policy</em>. Sau khi khóa cứng (Complete the lock trong 24h), chính sách này không bao giờ sửa đổi được nữa."
      },
      {
        title: "2. S3 Access Points, Multi-Region Access Points & S3 Requester Pays",
        content: "• <strong>S3 Access Points</strong>: Đơn giản hóa việc phân quyền cho Bucket Data Lake dùng chung bằng cách tạo các cổng truy cập riêng cho từng bộ phận (mỗi Access Point có chính sách IAM riêng và có thể khóa chỉ cho phép gọi từ bên trong 1 VPC).<br>• <strong>S3 Multi-Region Access Points</strong>: Cung cấp 1 điểm truy cập toàn cầu duy nhất (Global endpoint) sử dụng AWS Global Accelerator ngầm bên dưới để tự động dẫn request về S3 Bucket ở Region có độ trễ thấp nhất (Active-Active / Active-Passive Multi-Region S3).<br>• <strong>S3 Requester Pays</strong>: Dùng khi bạn muốn chia sẻ kho dữ liệu nghiên cứu khổng lồ cho các đối tác khác tải về nhưng muốn <strong>người tải phải tự trả tiền phí truyền tải dữ liệu (Data transfer / request costs)</strong>. (Lưu ý: Người tải bắt buộc phải đăng nhập bằng tài khoản AWS mới tải được, không hỗ trợ truy cập ẩn danh)."
      }
    ],
    extraCards: [
      { q: "Một viện nghiên cứu chia sẻ bộ dữ liệu thời tiết dung lượng 500 TB trên S3 cho nhiều trường đại học tải về nhưng chỉ muốn trả tiền lưu trữ, còn phí truyền dữ liệu (Data transfer) thì bên nào tải bên đó phải tự trả. Bật tính năng gì?", a: "S3 Requester Pays." },
      { q: "Khi một trang web tĩnh chạy ở tên miền 'https://www.example.com' dùng JavaScript (AJAX/Fetch) gọi tài nguyên nằm ở S3 bucket 'https://assets.example.com' và bị trình duyệt chặn lỗi bảo mật chéo miền, ta cần cấu hình gì và ở đâu?", a: "Bật cấu hình CORS (Cross-Origin Resource Sharing) trên bucket ĐÍCH ('assets.example.com') và thêm 'https://www.example.com' vào mục AllowedOrigins." },
      { q: "Chế độ nào của S3 Object Lock dùng để khóa đóng băng một file vô thời hạn nhằm phục vụ quá trình điều tra pháp lý/kiện tụng cho đến khi được gỡ bỏ thủ công?", a: "Legal Hold (Tạm giữ pháp lý)." }
    ],
    quizzes: [
      {
        qEn: "A financial firm must store transaction records in Amazon S3 for 7 years to meet strict regulatory standards. During this 7-year period, NO user—not even the AWS account root user or system administrators—can be allowed to modify or delete the files, or shorten the retention period. Which S3 feature meets this requirement?",
        qVi: "Công ty tài chính phải lưu hồ sơ giao dịch trên S3 trong 7 năm theo luật định. Trong suốt 7 năm này, KHÔNG MỘT AI — kể cả tài khoản Root hay Admin — được phép sửa, xóa file hoặc rút ngắn thời hạn lưu giữ. Tính năng nào đáp ứng được?",
        options: [
          "A. S3 Versioning combined with MFA Delete",
          "B. S3 Object Lock in Governance Mode",
          "C. S3 Object Lock in Compliance Mode",
          "D. S3 Bucket Policy with an Explicit Deny"
        ],
        correctIdx: 2,
        explanation: "S3 Object Lock ở chế độ Compliance Mode đảm bảo tính bất biến tuyệt đối (WORM): Không bất kỳ ai, kể cả tài khoản Root của AWS, có thể xóa file hoặc rút ngắn thời gian lưu giữ trước khi hết hạn."
      },
      {
        qEn: "A company shares large genomic datasets stored in an Amazon S3 bucket with external partner organizations that have their own AWS accounts. The company wants to pay only for the storage of the data, while requiring the partner organizations to pay for the data transfer and request costs when they download the files. Which feature should be enabled?",
        qVi: "Công ty chia sẻ bộ dữ liệu gen khổng lồ trên S3 cho các tổ chức đối tác (có tài khoản AWS riêng) tải về. Công ty chỉ muốn trả tiền lưu trữ, còn đối tác nào tải về thì đối tác đó phải tự trả phí truyền tải mạng. Cần bật tính năng gì?",
        options: [
          "A. S3 Presigned URLs",
          "B. S3 Requester Pays",
          "C. S3 Transfer Acceleration",
          "D. S3 Access Points"
        ],
        correctIdx: 1,
        explanation: "Với S3 Requester Pays buckets, người yêu cầu tải dữ liệu (Requester) sẽ trả chi phí cho các lệnh gọi và chi phí băng thông truyền dữ liệu ra khỏi S3, trong khi chủ sở hữu bucket chỉ trả tiền lưu trữ."
      }
    ]
  },

  20: {
    jargon: [
      { term: "Synchronous vs Asynchronous Replication", plain: "Synchronous (Đồng bộ - dùng cho RDS Multi-AZ) = Ghi vào máy Chính phải chờ chép xong sang máy Phụ rồi mới báo 'Thành công' cho code Java (Đảm bảo mất điện không mất 1 byte dữ liệu nào!). Asynchronous (Bất đồng bộ - dùng cho Read Replica) = Ghi xong ở máy Chính là báo thành công ngay, rồi mới túc tắc chép ngầm sang các máy Đọc." },
      { term: "RPO = 0 (Zero Data Loss)", plain: "Khi máy chính chết đột ngột, máy dự phòng có đủ 100% dữ liệu vừa giao dịch ở giây cuối cùng mà không bị rơi rớt giao dịch nào." },
      { term: "RDS Blue/Green Deployments", plain: "Tạo một môi trường DB bản sao hoàn chỉnh (Green) chạy song song với DB thật (Blue) để bạn thoải mái nâng cấp phiên bản MySQL lớn hoặc sửa cấu trúc bảng mà không làm gián đoạn ứng dụng, kiểm tra ngon lành xong chỉ cần bấm Switchover 1 giây!" }
    ],
    diagram: `
[Ứng dụng Java]
   ├── Ghi/Đọc giao dịch chính ──► [RDS Primary (AZ-a)] ══(Đồng bộ Synchronous / Tự động Failover)══► [RDS Standby (AZ-b)] (KHÔNG ĐỌC ĐƯỢC!)
   │
   └── Chạy Báo cáo nặng (SELECT) ──────────────────────(Bất đồng bộ Asynchronous)──────────────────► [RDS Read Replica] (Giảm tải cho Primary!)`,
    deepSections: [
      {
        title: "1. Phân biệt sống còn: RDS Multi-AZ vs RDS Read Replicas",
        content: "• <strong>RDS Multi-AZ Deployment (Mục đích: High Availability & Disaster Recovery)</strong>:<br>  - Nhân bản <strong>Đồng bộ (Synchronous)</strong> sang 1 máy Standby ở AZ khác.<br>  - Máy Standby <strong>KHÔNG nhận câu lệnh đọc/ghi từ ứng dụng</strong>.<br>  - Khi AZ chính mất điện, máy chính hỏng phần cứng, hoặc khi AWS nâng cấp bản vá hệ điều hành → RDS tự động chuyển đổi (Automatic Failover) sang máy Standby mà bạn <strong>không cần sửa chuỗi kết nối JDBC</strong>!<br>• <strong>RDS Read Replicas (Mục đích: Scale Read / Giảm tải truy vấn đọc)</strong>:<br>  - Nhân bản <strong>Bất đồng bộ (Asynchronous)</strong> (tối đa 15 Read Replicas, có thể đặt cùng AZ, khác AZ hoặc khác Region).<br>  - <strong>Miễn phí băng thông truyền dữ liệu sao chép</strong> nếu Read Replica nằm trong <strong>cùng một Region</strong> (dù khác AZ)!<br>  - Có thể nâng cấp (Promote) một Read Replica lên thành một DB độc lập."
      },
      {
        title: "2. RDS Multi-AZ DB Cluster (1 Primary + 2 Readable Standbys) & RDS Blue/Green",
        content: "• <strong>RDS Multi-AZ DB Cluster</strong>: Chế độ nâng cao mới của RDS có 1 máy Writer và 2 máy Standby ở 3 AZ khác nhau. Điểm khác biệt là 2 máy Standby này <strong>vừa dự phòng Failover cực nhanh (<35s) vừa cho phép đọc dữ liệu (Readable standbys)</strong>!<br>• <strong>RDS Blue/Green Deployments (Mới trong SAA-C03)</strong>: Khi đề bài hỏi <em>'Làm sao nâng cấp phiên bản chính (Major version upgrade) của RDS MySQL/PostgreSQL hoặc thay đổi Schema lớn với thời gian gián đoạn tối thiểu ( dưới 1 phút) và an toàn nhất?'</em> → Chọn ngay <strong>RDS Blue/Green Deployments</strong>!"
      }
    ],
    extraCards: [
      { q: "Khi cần nâng cấp phiên bản lớn (Major engine version upgrade) cho cơ sở dữ liệu RDS MySQL hoặc Aurora với thời gian ngừng hoạt động tối thiểu (< 1 phút) và có môi trường kiểm thử an toàn trước khi chuyển đổi, ta dùng tính năng gì?", a: "Amazon RDS Blue/Green Deployments." },
      { q: "Làm thế nào để mã hóa một cơ sở dữ liệu Amazon RDS hiện đang chạy ở trạng thái CHƯA ĐƯỢC MÃ HÓA (Unencrypted)?", a: "Chụp một bản DB Snapshot của DB chưa mã hóa -> Copy Snapshot đó sang một bản Snapshot mới và bật tùy chọn Encryption -> Khôi phục (Restore) DB mới từ bản Snapshot đã mã hóa." }
    ],
    quizzes: [
      {
        qEn: "An e-commerce application uses an Amazon RDS for MySQL database. Every afternoon, the business intelligence team runs complex reporting queries against the database, which slows down customer order processing. What should the solutions architect do to improve performance?",
        qVi: "Ứng dụng thương mại điện tử dùng RDS MySQL. Mỗi buổi chiều, đội phân tích chạy các câu truy vấn báo cáo phức tạp làm chậm hệ thống đặt hàng của khách. Kiến trúc sư nên làm gì để cải thiện hiệu năng?",
        options: [
          "A. Enable RDS Multi-AZ and point the reporting tool to the Standby instance.",
          "B. Create an RDS Read Replica and configure the business intelligence reporting tool to query the Read Replica.",
          "C. Migrate the database to S3 Glacier.",
          "D. Place a NAT Gateway in front of the RDS database."
        ],
        correctIdx: 1,
        explanation: "Máy Standby trong RDS Multi-AZ tiêu chuẩn không thể dùng để đọc dữ liệu. Để tách tải các câu lệnh đọc/báo cáo nặng ra khỏi DB chính, giải pháp đúng là tạo RDS Read Replica."
      },
      {
        qEn: "A company needs to perform a major version upgrade on its production Amazon RDS for PostgreSQL database with minimal downtime (under 1 minute) and wants a fully managed staging environment to test the upgrade before switching production traffic. Which feature should be used?",
        qVi: "Công ty cần nâng cấp phiên bản lớn cho RDS PostgreSQL đang chạy thực tế với thời gian gián đoạn dưới 1 phút, đồng thời muốn có môi trường thử nghiệm đồng bộ tự động trước khi chuyển luồng chính thức. Dùng tính năng nào?",
        options: [
          "A. RDS Read Replica Promotion",
          "B. Amazon RDS Blue/Green Deployments",
          "C. AWS Database Migration Service (DMS)",
          "D. Amazon RDS Proxy"
        ],
        correctIdx: 1,
        explanation: "RDS Blue/Green Deployments tạo môi trường staging (Green) nhân bản liên tục từ môi trường thật (Blue), cho phép nâng cấp và kiểm thử trên Green rồi chuyển đổi (Switchover) trong dưới 1 phút mà không mất dữ liệu."
      }
    ]
  },

  21: {
    jargon: [
      { term: "Connection Pooling (RDS Proxy)", plain: "Hồ chứa kết nối dùng chung: Thay vì để 1.000 hàm Lambda mở toang 1.000 kết nối mới làm sập RDS, RDS Proxy đứng chặn ở giữa mở sẵn 50 kết nối bền vững tới RDS rồi cho 1.000 hàm Lambda luân phiên mượn lại!" },
      { term: "Aurora Fast Database Cloning", plain: "Nhân bản DB hàng chục Terabyte chỉ trong vài giây mà KHÔNG tốn gấp đôi tiền ổ cứng (nhờ cơ chế Copy-on-Write: bản Clone dùng chung các khối dữ liệu gốc cho tới khi có lệnh sửa đổi)." },
      { term: "Aurora Custom Endpoints", plain: "Giả sử bạn có 5 máy Read Replica: 2 máy cấu hình cực mạnh chuyên để chạy báo cáo kế toán, 3 máy nhỏ phục vụ web. Bạn tạo 1 Custom Endpoint chỉ gom riêng 2 máy mạnh đó lại cho phòng kế toán gọi!" }
    ],
    diagram: `
[1,000 Hàm AWS Lambda bật cùng lúc] ──► [Amazon RDS Proxy (Gom và tái sử dụng kết nối)] ──► [Amazon Aurora / RDS]
                                                                                                  │
                                                       ┌──────────────────────────────────────────┴──────────────────────────────────────────┐
                                                       ▼                                                                                     ▼
                                        [6 bản sao dữ liệu trên 3 AZ]                                                       [Aurora Fast Clone (Copy-on-Write)]
                                  (Tự chữa lành, tối đa 15 Read Replicas)                                             (Tạo DB Test từ DB Prod 50TB trong vài phút!)`,
    deepSections: [
      {
        title: "1. Ba vũ khí độc quyền của Amazon Aurora trong đề thi SAA-C03",
        content: "• <strong>Kiến trúc lưu trữ 6 bản sao trên 3 AZ</strong>: Aurora tự động chia ổ đĩa thành các phân đoạn và lưu <strong>6 bản sao rải đều trên 3 Availability Zones</strong>. Chỉ cần 4/6 bản để Ghi và 3/6 bản để Đọc. Hỗ trợ tối đa <strong>15 Read Replicas</strong> và tất cả đều dùng chung tầng ổ đĩa dưới nên độ trễ nhân bản cực thấp (<10ms).<br>• <strong>Aurora Fast Database Cloning (Copy-on-Write protocol)</strong>: Khi đề bài nói <em>'Đội QA/Dev muốn tạo một bản sao của Database Production nặng 20 TB để chạy kiểm thử tải ngay lập tức với chi phí lưu trữ thấp nhất'</em> → Chọn ngay <strong>Aurora Database Cloning</strong> (nhanh hơn Snapshot Restore rất nhiều và không tốn tiền lưu trữ ban đầu!).<br>• <strong>Aurora Global Database</strong>: Nhân bản sang tới 5 Region phụ với độ trễ <strong>dưới 1 giây (< 1s)</strong> và thời gian khôi phục thảm họa toàn Region <strong>dưới 1 phút (RTO < 1 min)</strong>."
      },
      {
        title: "2. Khi nào chọn RDS Proxy, RDS Custom và Aurora Serverless v2?",
        content: "• <strong>RDS Proxy</strong>: Chọn ngay khi thấy <strong>AWS Lambda gọi vào RDS/Aurora gây lỗi <code>Too many connections</code></strong>, hoặc khi muốn <strong>giảm thời gian Failover đi 66%</strong> và bắt buộc xác thực IAM/Secrets Manager. (Lưu ý: RDS Proxy luôn nằm trong VPC và <strong>không bao giờ truy cập trực tiếp từ ngoài Internet được</strong>).<br>• <strong>RDS Custom (Oracle & SQL Server)</strong>: Chọn khi cần <strong>quyền Admin truy cập trực tiếp vào Hệ điều hành (SSH/RDP vào OS)</strong> để cài đặt phần mềm/bản vá đặc thù.<br>• <strong>Aurora Serverless v2</strong>: Tự động co giãn theo đơn vị <em>ACU (Aurora Capacity Units)</em> trong tích tắc → Chọn khi tải <strong>thất thường, ngắt quãng, không dự đoán trước được (Intermittent / Unpredictable workloads)</strong>."
      }
    ],
    extraCards: [
      { q: "Đội phát triển cần tạo nhanh một bản sao từ cơ sở dữ liệu Amazon Aurora Production dung lượng 30 TB để chạy kiểm thử hiệu năng trong 2 ngày mà không muốn tốn gấp đôi chi phí lưu trữ hay chờ khôi phục từ Snapshot. Dùng tính năng gì?", a: "Aurora Fast Database Cloning (sử dụng cơ chế Copy-on-Write)." },
      { q: "Trong cụm Amazon Aurora có 6 máy Read Replicas với kích cỡ khác nhau (3 máy r6g.2xlarge và 3 máy t3.medium). Làm thế nào để ứng dụng phân tích BI chỉ kết nối vào đúng 3 máy r6g.2xlarge mạnh nhất?", a: "Tạo một Aurora Custom Endpoint chỉ chứa 3 máy r6g.2xlarge đó." },
      { q: "Một cơ sở dữ liệu Amazon Aurora mặc định lưu trữ bao nhiêu bản sao (copies) của dữ liệu trên bao nhiêu Availability Zones?", a: "6 bản sao dữ liệu trải đều trên 3 Availability Zones." }
    ],
    quizzes: [
      {
        qEn: "A serverless application uses hundreds of concurrent AWS Lambda functions that read and write to an Amazon RDS for MySQL database. During traffic spikes, the database experiences high CPU usage and 'Too many connections' errors due to the rapid opening and closing of database connections. Which solution resolves this issue?",
        qVi: "Ứng dụng Serverless dùng hàng trăm hàm AWS Lambda chạy đồng thời đọc ghi vào RDS MySQL. Khi lưu lượng tăng vọt, DB bị quá tải CPU và báo lỗi 'Too many connections' do đóng mở kết nối liên tục. Giải pháp nào xử lý triệt để vấn đề này?",
        options: [
          "A. Place Amazon RDS Proxy between the AWS Lambda functions and the RDS database.",
          "B. Enable RDS Multi-AZ deployment.",
          "C. Migrate to Amazon ElastiCache for Memcached.",
          "D. Increase the Lambda function timeout to 15 minutes."
        ],
        correctIdx: 0,
        explanation: "Amazon RDS Proxy quản lý hồ kết nối (Connection Pool) tập trung, giữ các kết nối mở sẵn tới DB và tái sử dụng chúng cho hàng nghìn hàm Lambda."
      },
      {
        qEn: "A company runs a 40 TB production database on Amazon Aurora. The QA team needs an identical copy of the production data to run performance tests today, but wants to minimize storage costs and create the test database as quickly as possible without impacting production. Which feature should be used?",
        qVi: "Công ty chạy DB chính nặng 40 TB trên Amazon Aurora. Đội QA cần một bản sao dữ liệu giống hệt để chạy kiểm thử ngay hôm nay, yêu cầu tạo nhanh nhất có thể và tốn ít chi phí lưu trữ nhất. Nên dùng tính năng gì?",
        options: [
          "A. Take a DB Snapshot and restore it to a new cluster.",
          "B. Use Aurora Fast Database Cloning (Copy-on-Write protocol).",
          "C. Use AWS DMS to copy the data to a new database.",
          "D. Create an additional Aurora Read Replica."
        ],
        correctIdx: 1,
        explanation: "Aurora Database Cloning sử dụng giao thức Copy-on-Write giúp tạo bản sao độc lập của DB 40 TB chỉ trong vài phút và ban đầu không tốn thêm bất kỳ chi phí lưu trữ nào vì dùng chung các trang dữ liệu gốc."
      }
    ]
  },

  22: {
    jargon: [
      { term: "Cache Hit vs Cache Miss", plain: "Cache Hit = Dữ liệu khách hỏi đã có sẵn trên thanh RAM của Redis, lấy ra ngay trong 1 mili-giây! Cache Miss = Chưa có trên RAM, ứng dụng phải chạy xuống ổ cứng RDS lấy lên rồi tiện tay cất vào Redis cho lần sau." },
      { term: "Lazy Loading vs Write-Through", plain: "Lazy Loading (Đọc tới đâu nạp tới đó) = Khi nào có người hỏi mà thiếu thì mới nạp vào Cache (dữ liệu trong cache có thể bị cũ). Write-Through (Ghi xuyên thấu) = Hễ cập nhật dữ liệu vào DB là cập nhật ngay vào Cache cùng lúc (dữ liệu luôn mới tinh!)." },
      { term: "Redis Sorted Sets", plain: "Cấu trúc dữ liệu tự động sắp xếp điểm số từ cao xuống thấp theo thời gian thực — hễ trong đề thi có chữ 'Gaming Leaderboard (Bảng xếp hạng điểm số người chơi)' là 100% chọn ElastiCache for Redis!" }
    ],
    diagram: `
2 Chiến lược Caching kinh điển trên ElastiCache:
 1. [Lazy Loading (Cache-Aside)]: App hỏi Cache ──► Nếu có (Hit): Trả về ngay! | Nếu chưa có (Miss): App đọc DB ──► Ghi vào Cache!
 2. [Write-Through]             : App ghi dữ liệu mới vào DB ──► Đồng thời ghi đè luôn vào Cache (Không bao giờ sợ dữ liệu cũ/Stale data!)`,
    deepSections: [
      {
        title: "1. So sánh toàn diện ElastiCache for Redis vs Memcached vs MemoryDB",
        content: "• <strong>ElastiCache for Redis</strong>: Lựa chọn mặc định trong 95% câu hỏi đề thi! Hỗ trợ <strong>Multi-AZ với Auto-Failover</strong>, Read Replicas (Shards), sao lưu bền vững (Backup & Restore), mã hóa và xác thực (<code>Redis AUTH</code> / IAM), hỗ trợ Pub/Sub, dữ liệu vị trí địa lý (Geospatial) và <strong>Sorted Sets (Bảng xếp hạng Game - Gaming Leaderboards)</strong>.<br>• <strong>ElastiCache for Memcached</strong>: Chỉ chọn khi đề bài nhấn mạnh <em>'Simple multi-threaded distributed cache, no high availability or backup needed'</em>.<br>• <strong>Amazon MemoryDB for Redis</strong>: Khi đề bài yêu cầu <em>'Tốc độ đọc ghi In-memory micro-giây tương thích Redis NHƯNG phải đóng vai trò là Database chính bền vững đa AZ (Durable Multi-AZ transactional log) không bao giờ mất dữ liệu'</em>."
      },
      {
        title: "2. Ba chiến lược Caching thường hỏi trong đề SAA-C03",
        content: "• <strong>Lazy Loading (Cache-Aside)</strong>: Chỉ cache những dữ liệu thực sự được người dùng hỏi tới. Ưu điểm: Không tốn RAM cho dữ liệu rác. Nhược điểm: Lần đọc đầu tiên bị chậm (Cache miss penalty) và dữ liệu có thể bị cũ (Stale data).<br>• <strong>Write-Through</strong>: Mỗi khi ghi vào DB là ghi luôn vào Cache. Ưu điểm: Dữ liệu trên Cache luôn mới nhất, không bị trễ lần đọc đầu. Nhược điểm: Tốn RAM lưu cả những dữ liệu không ai đọc.<br>• <strong>Giải pháp kết hợp hoàn hảo</strong>: Dùng <strong>Lazy Loading kết hợp với TTL (Time To Live - thời gian tự hết hạn)</strong> để vừa tiết kiệm RAM vừa đảm bảo dữ liệu tự làm mới định kỳ!"
      }
    ],
    extraCards: [
      { q: "Phân biệt chiến lược caching Lazy Loading và Write-Through trên Amazon ElastiCache?", a: "Lazy Loading: Chỉ nạp dữ liệu vào cache khi có Cache Miss (tiết kiệm RAM nhưng dễ bị dữ liệu cũ). Write-Through: Ghi vào cache đồng thời mỗi khi ghi vào DB (dữ liệu luôn mới nhưng tốn RAM)." },
      { q: "Khi đề bài yêu cầu một cơ sở dữ liệu chính (Primary database) tương thích hoàn toàn với Redis, có tốc độ đọc micro-giây và đảm bảo độ bền giao dịch Multi-AZ (không mất dữ liệu), ta chọn dịch vụ nào?", a: "Amazon MemoryDB for Redis." }
    ],
    quizzes: [
      {
        qEn: "A gaming company is developing a multiplayer mobile game that requires a real-time global leaderboard for millions of players. The solution must provide sub-millisecond latency, high availability with automatic failover across Availability Zones, and native support for sorting player scores. Which service should be used?",
        qVi: "Công ty game đang phát triển trò chơi di động nhiều người chơi cần một bảng xếp hạng điểm số thời gian thực (real-time leaderboard) cho hàng triệu người. Giải pháp cần độ trễ dưới 1ms, có Multi-AZ tự động failover và hỗ trợ sẵn việc sắp xếp điểm số. Chọn dịch vụ nào?",
        options: [
          "A. Amazon ElastiCache for Memcached",
          "B. Amazon ElastiCache for Redis (using Sorted Sets)",
          "C. Amazon RDS for MySQL Read Replicas",
          "D. Amazon Athena"
        ],
        correctIdx: 1,
        explanation: "ElastiCache for Redis hỗ trợ cấu trúc dữ liệu Sorted Sets giúp tự động sắp xếp điểm số thời gian thực cho Gaming Leaderboards, đồng thời hỗ trợ Multi-AZ Auto-Failover."
      },
      {
        qEn: "An application uses Amazon ElastiCache in front of an RDS database to cache user profiles. The team wants to ensure that customers NEVER see stale profile data immediately after updating their profile, while keeping read latency as low as possible. Which caching strategy should be implemented?",
        qVi: "Ứng dụng dùng ElastiCache đứng trước RDS để cache hồ sơ người dùng. Đội ngũ muốn đảm bảo khách hàng KHÔNG BAO GIỜ nhìn thấy dữ liệu cũ ngay sau khi họ vừa cập nhật hồ sơ. Nên áp dụng chiến lược caching nào?",
        options: [
          "A. Use Lazy Loading only without a TTL.",
          "B. Implement a Write-Through caching strategy (updating the cache synchronously whenever data is written to the database).",
          "C. Flush the entire ElastiCache cluster every 5 minutes.",
          "D. Switch from Redis to Memcached."
        ],
        correctIdx: 1,
        explanation: "Chiến lược Write-Through cập nhật dữ liệu trong Cache đồng bộ ngay khi dữ liệu được ghi vào Database, đảm bảo dữ liệu trên Cache không bao giờ bị cũ (never stale)."
      }
    ]
  },

  23: {
    jargon: [
      { term: "RCU (Read Capacity Unit) & WCU (Write Capacity Unit)", plain: "Đơn vị đo sức mạnh Đọc và Ghi của DynamoDB ở chế độ Provisioned. Nếu ứng dụng đọc/ghi vượt quá số RCU/WCU đã mua trước sẽ bị lỗi ProvisionedThroughputExceededException!" },
      { term: "Hot Partition / Hot Key", plain: "Nghẽn cổ chai cục bộ: Ví dụ ngày bầu cử hoặc săn sale iPhone, hàng triệu người cùng bấm vào đúng 1 mã sản phẩm duy nhất (1 Partition Key) làm quá tải phân vùng chứa sản phẩm đó." },
      { term: "DAX (DynamoDB Accelerator)", plain: "Bộ nhớ đệm In-memory cắm thẳng vào trước DynamoDB: Hạ thời gian đọc từ vài mili-giây xuống vài micro-giây và trị dứt điểm bệnh Hot Key mà không cần viết lại code!" }
    ],
    diagram: `
[Ứng dụng Java] ──(Dùng nguyên bộ SDK DynamoDB)──► [Cụm DAX (In-Memory Cache - Microseconds)] ──► [Bảng Amazon DynamoDB (3 AZ)]
   • Tải đều đặn, biết trước lưu lượng ──► Chọn [Provisioned Mode + Auto Scaling] (Tiết kiệm!)
   • Tải thất thường, tăng vọt đột ngột ──► Chọn [On-Demand Mode (Pay-per-request)] (Không bao giờ bị lỗi Throttling!)`,
    deepSections: [
      {
        title: "1. Khi nào chọn DynamoDB Provisioned Mode vs On-Demand Mode?",
        content: "• <strong>Provisioned Mode (Kèm Auto Scaling)</strong>: Dùng khi lưu lượng truy cập <strong>ổn định, dự đoán được hoặc tăng giảm từ từ (Predictable / Steady traffic)</strong>. Có thể mua <em>DynamoDB Reserved Capacity</em> để giảm giá sâu hơn.<br>• <strong>On-Demand Mode</strong>: Dùng khi <strong>tải không thể dự đoán trước, ứng dụng mới ra mắt, hoặc có những đợt tăng vọt gấp hàng chục lần trong vài giây (Unpredictable / Spiky workloads)</strong>. Trả tiền theo từng lệnh đọc/ghi thực tế."
      },
      {
        title: "2. Cách xử lý lỗi ProvisionedThroughputExceededException trong đề thi",
        content: "Khi đề bài báo bảng DynamoDB bị lỗi <code>ProvisionedThroughputExceededException</code>, có 3 hướng giải quyết tùy ngữ cảnh:<br>1. Nếu do <strong>một vài dòng dữ liệu phổ biến bị đọc quá nhiều lần (Hot Keys / Read-heavy)</strong> → Đặt <strong>DynamoDB Accelerator (DAX)</strong> ở phía trước (lưu trữ cache tới 5 phút mặc định).<br>2. Nếu do tải tăng vọt thất thường ở cả chiều đọc và ghi → Chuyển bảng sang chế độ <strong>On-Demand Mode</strong>.<br>3. Ở phía code ứng dụng (SDK): Bật cơ chế <strong>Exponential Backoff (Thử lại với khoảng thời gian chờ tăng dần theo cấp số nhân)</strong> — đã có sẵn trong AWS SDK, và thiết kế <strong>Partition Key có độ phân tán cao (High cardinality)</strong>."
      }
    ],
    extraCards: [
      { q: "Làm thế nào để thiết kế Partition Key trong bảng Amazon DynamoDB nhằm tránh hiện tượng nghẽn cổ chai trên 1 phân vùng (Hot Partition)?", a: "Chọn thuộc tính có độ đa dạng giá trị cao (High cardinality, như UserID, OrderID) hoặc thêm hậu tố ngẫu nhiên (Random suffix / Write sharding) để chia đều tải." },
      { q: "DynamoDB Accelerator (DAX) có hỗ trợ tăng tốc độ cho các câu lệnh GHI (Write) nhiều vào DynamoDB không?", a: "KHÔNG. DAX là bộ nhớ đệm Write-through sinh ra để tăng tốc cho các tác vụ ĐỌC nhiều (Read-heavy) và giải quyết lỗi Hot Key khi đọc." }
    ],
    quizzes: [
      {
        qEn: "A flash-sale e-commerce website uses Amazon DynamoDB. For 23 hours a day, traffic is almost zero, but during a 1-hour flash sale, traffic spikes unpredictably to 50,000 requests per second within seconds, causing 'ProvisionedThroughputExceededException' errors because Auto Scaling cannot react fast enough. Which solution resolves this?",
        qVi: "Website săn sale dùng DynamoDB. Suốt 23 giờ mỗi ngày hầu như không có khách, nhưng trong 1 giờ Flash Sale lưu lượng vọt lên 50.000 request/giây chỉ trong vài giây khiến Auto Scaling không kịp phản ứng và gây lỗi 'ProvisionedThroughputExceededException'. Giải pháp nào xử lý triệt để?",
        options: [
          "A. Switch the DynamoDB table capacity mode to On-Demand Mode.",
          "B. Enable DynamoDB Time To Live (TTL).",
          "C. Migrate the workload to Amazon RDS for MySQL.",
          "D. Create a Local Secondary Index (LSI)."
        ],
        correctIdx: 0,
        explanation: "DynamoDB On-Demand Mode có khả năng mở rộng tức thì (instantly scales) để đón các đợt lưu lượng tăng đột biến (spiky/unpredictable traffic) mà không bị lỗi Throttling và chỉ tính phí theo request thực tế."
      },
      {
        qEn: "A social media application stores celebrity posts in Amazon DynamoDB. When a celebrity posts an update, millions of users read that single item simultaneously, causing throttling on that specific partition key. How can the architect reduce read latency to microseconds and eliminate the hot key issue without changing application logic?",
        qVi: "Ứng dụng mạng xã hội lưu bài đăng của người nổi tiếng trên DynamoDB. Khi người nổi tiếng đăng bài, hàng triệu người cùng đọc đúng 1 bản ghi đó gây nghẽn phân vùng (Hot Key). Làm sao giảm độ trễ đọc xuống micro-giây và xóa bỏ lỗi Hot Key mà không cần viết lại logic ứng dụng?",
        options: [
          "A. Enable DynamoDB Streams.",
          "B. Deploy Amazon DynamoDB Accelerator (DAX) in front of the table.",
          "C. Use S3 Transfer Acceleration.",
          "D. Use Amazon RDS Proxy."
        ],
        correctIdx: 1,
        explanation: "DynamoDB Accelerator (DAX) là bộ nhớ đệm in-memory tương thích hoàn toàn với API của DynamoDB, giúp trả kết quả đọc cho các Hot Keys ngay từ RAM trong vài micro-giây."
      }
    ]
  },

  24: {
    jargon: [
      { term: "LSI (Local Secondary Index) vs GSI (Global Secondary Index)", plain: "Hai loại chỉ mục phụ giúp tìm kiếm nhanh trên các cột khác ngoài khóa chính: LSI = Phải tạo ngay lúc mới đẻ bảng (không thêm sau được!). GSI = Tạo thêm hay xóa đi lúc nào cũng được sau khi bảng đã chạy!" },
      { term: "DynamoDB Streams (24h retention)", plain: "Cuốn băng ghi hình theo đúng thứ tự mọi thao tác Thêm/Sửa/Xóa trên bảng DynamoDB và giữ lại trong 24 giờ để kích hoạt hàm AWS Lambda." },
      { term: "S3 Export vs Point-in-Time Recovery (PITR)", plain: "PITR = Cho phép tua ngược bảng DynamoDB về bất kỳ giây nào trong vòng 35 ngày qua! S3 Export = Xuất toàn bộ bảng DynamoDB ra S3 mà không làm tốn RCU của bảng đang chạy." }
    ],
    diagram: `
[Bảng DynamoDB (Bật Streams)] ──(Sự kiện Insert/Update/Delete)──► [DynamoDB Streams (Lưu 24h)] ──► [Hàm AWS Lambda] ──► Gửi Email qua SES!
              │
              └──(Nhân bản đa vùng Active-Active < 1 giây)───────► [DynamoDB Global Tables (Đọc & Ghi cục bộ ở cả Mỹ, Âu, Á)]`,
    deepSections: [
      {
        title: "1. DynamoDB Streams, Global Tables & TTL",
        content: "• <strong>DynamoDB Streams</strong>: Lưu giữ các thay đổi cấp độ dòng trong <strong>24 giờ</strong>. Có thể chọn kiểu dữ liệu xuất ra: Chỉ lấy khóa (<code>KEYS_ONLY</code>), lấy bản ghi mới (<code>NEW_IMAGE</code>), lấy bản ghi cũ (<code>OLD_IMAGE</code>), hoặc lấy cả cũ lẫn mới (<code>NEW_AND_OLD_IMAGES</code>).<br>• <strong>DynamoDB Global Tables</strong>: Kiến trúc <strong>Active-Active Multi-Region</strong> thực thụ. Ứng dụng ở Châu Âu ghi thẳng vào bảng ở Châu Âu, ứng dụng ở Mỹ ghi thẳng vào bảng ở Mỹ với độ trễ vài mili-giây, AWS tự đồng bộ 2 chiều ngầm bên dưới (bắt buộc phải bật <em>DynamoDB Streams</em>).<br>• <strong>DynamoDB TTL (Time To Live)</strong>: Tự động xóa các dòng hết hạn hoàn toàn <strong>miễn phí (không tốn WCU)</strong>. Các dòng bị xóa bởi TTL cũng xuất hiện trong DynamoDB Streams (có thể dùng Lambda bắt sự kiện xóa của TTL để đem dòng dữ liệu cũ đó cất vào S3 Glacier lưu trữ lâu dài!)."
      },
      {
        title: "2. Phân biệt LSI vs GSI & Tính năng Sao lưu PITR (Point-in-Time Recovery)",
        content: "• <strong>Local Secondary Index (LSI)</strong>: Dùng chung Partition Key với bảng gốc nhưng khác Sort Key. <strong>Bắt buộc phải tạo ngay tại thời điểm tạo bảng (Cannot be added later!)</strong>.<br>• <strong>Global Secondary Index (GSI)</strong>: Có thể đổi cả Partition Key lẫn Sort Key mới. <strong>Có thể tạo mới hoặc sửa xóa bất kỳ lúc nào trên bảng đang chạy</strong>.<br>• <strong>Point-in-Time Recovery (PITR)</strong>: Bảo vệ chống ghi/xóa nhầm bằng cách cho phép khôi phục bảng về bất kỳ giây nào trong <strong>35 ngày gần nhất</strong>. Khi bạn muốn <strong>xuất dữ liệu từ DynamoDB ra S3 (Export to S3)</strong> để dùng Amazon Athena phân tích mà không muốn tiêu tốn RCU của bảng chính → Chỉ cần bật <strong>PITR</strong> rồi dùng tính năng <em>DynamoDB Export to S3</em>!"
      }
    ],
    extraCards: [
      { q: "Bảng DynamoDB đã chạy được 6 tháng, nay lập trình viên muốn tạo thêm một chỉ mục phụ (Secondary Index) trên một cột mới để tăng tốc truy vấn mà không muốn tạo lại bảng. Phải dùng LSI hay GSI?", a: "Bắt buộc phải dùng GSI (Global Secondary Index), vì LSI chỉ có thể được tạo ngay lúc khởi tạo bảng mới." },
      { q: "Làm thế nào để tự động lưu trữ (Archive) các bản ghi đã hết hạn trong bảng DynamoDB sang S3 Glacier với chi phí thấp nhất mà không tốn WCU?", a: "Bật DynamoDB TTL để tự xóa bản ghi hết hạn miễn phí -> Bật DynamoDB Streams để bắt sự kiện xóa của TTL -> Dùng AWS Lambda (hoặc Kinesis Firehose) đẩy bản ghi đó vào S3." },
      { q: "Tính năng nào của DynamoDB cho phép xuất toàn bộ dữ liệu bảng ra Amazon S3 (định dạng Parquet/JSON) để phân tích bằng Athena mà KHÔNG tiêu tốn bất kỳ đơn vị đọc (RCU) nào của bảng chính?", a: "DynamoDB Export to S3 (yêu cầu bật Point-in-Time Recovery - PITR)." }
    ],
    quizzes: [
      {
        qEn: "A company stores temporary user session tokens in an Amazon DynamoDB table. Each item has an 'expiration_time' epoch timestamp attribute. The company wants to automatically delete expired sessions after 24 hours and archive the deleted items to Amazon S3 for audit purposes without consuming write capacity units (WCUs) for deletions. Which architecture meets these requirements?",
        qVi: "Công ty lưu token phiên đăng nhập trong DynamoDB có cột 'expiration_time'. Công ty muốn tự động xóa các phiên hết hạn sau 24 giờ và chuyển các bản ghi vừa bị xóa đó sang lưu trữ ở S3 mà không tốn WCU khi xóa. Kiến trúc nào đáp ứng được?",
        options: [
          "A. Run an hourly Lambda function that performs a full table Scan and calls DeleteItem.",
          "B. Enable DynamoDB Time To Live (TTL) on 'expiration_time', enable DynamoDB Streams, and trigger an AWS Lambda function to archive the TTL-deleted records to Amazon S3.",
          "C. Enable DynamoDB Accelerator (DAX).",
          "D. Configure an S3 Lifecycle Policy."
        ],
        correctIdx: 1,
        explanation: "DynamoDB TTL tự động xóa các dòng hết hạn miễn phí (không tốn WCU), và sự kiện xóa đó được đẩy vào DynamoDB Streams để hàm Lambda bắt lấy và lưu trữ sang S3."
      },
      {
        qEn: "A data science team wants to run complex SQL analytics using Amazon Athena on data stored in a production Amazon DynamoDB table. However, running Scan operations on the DynamoDB table throttles production traffic. How can the team export the data to S3 without consuming ANY read capacity (RCUs) on the active table?",
        qVi: "Đội khoa học dữ liệu muốn dùng Athena chạy SQL phân tích dữ liệu của một bảng DynamoDB Production, nhưng không muốn quét trực tiếp làm tốn RCU gây nghẽn bảng thật. Làm sao xuất dữ liệu ra S3 mà KHÔNG tốn bất kỳ RCU nào của bảng đang chạy?",
        options: [
          "A. Enable Point-in-Time Recovery (PITR) and use the native 'DynamoDB Export to S3' feature.",
          "B. Create a Global Secondary Index (GSI).",
          "C. Increase the table's provisioned RCUs by 10x.",
          "D. Use DynamoDB Accelerator (DAX)."
        ],
        correctIdx: 0,
        explanation: "Tính năng DynamoDB Export to S3 đọc dữ liệu từ bản sao lưu PITR ở hậu trường nên hoàn toàn không tiêu tốn RCU hay ảnh hưởng đến hiệu năng của bảng Production đang chạy."
      }
    ]
  },

  25: {
    jargon: [
      { term: "OLTP vs OLAP (Columnar Storage)", plain: "OLTP (RDS, Aurora) = Lưu dữ liệu theo từng DÒNG để thêm/sửa đơn hàng cực nhanh. OLAP (Redshift) = Lưu dữ liệu theo từng CỘT để tính tổng doanh thu của 10 tỷ đơn hàng chỉ trong 2 giây!" },
      { term: "Redshift Spectrum", plain: "Cánh tay nối dài của Redshift: Cho phép cụm Redshift chạy câu lệnh SQL JOIN trực tiếp với hàng trăm Terabyte dữ liệu lịch sử đang nằm im trên S3 mà không cần nạp vào ổ cứng của Redshift!" },
      { term: "Graph Database (Amazon Neptune)", plain: "Cơ sở dữ liệu lưu các Đỉnh (Nodes) và Cạnh nối (Edges): Chuyên trị bài toán 'Bạn của bạn của bạn trên Facebook là ai?', gợi ý mua hàng, hoặc dò tìm đường dây chuyển tiền lòng vòng để rửa tiền." }
    ],
    diagram: `
Bản đồ Chọn Nhanh Database Chuyên Biệt trên AWS:
 ├── Phân tích Kho dữ liệu OLAP hàng Petabyte + SQL + BI? ──► Amazon Redshift (+ Redshift Spectrum đọc thẳng S3)
 ├── Tương thích MongoDB (JSON Document)?                 ──► Amazon DocumentDB
 ├── Tương thích Apache Cassandra (NoSQL phân tán)?       ──► Amazon Keyspaces
 ├── Mạng xã hội, Đồ thị quan hệ (Graph: Gremlin/SPARQL)? ──► Amazon Neptune
 └── Dữ liệu chuỗi thời gian IoT, Metrics (Time-series)?  ──► Amazon Timestream`,
    deepSections: [
      {
        title: "1. Amazon Redshift, Redshift Spectrum & Redshift Serverless",
        content: "• <strong>Amazon Redshift</strong>: Kho dữ liệu phân tích (Enterprise Data Warehouse) lưu trữ dạng cột (Columnar storage) và xử lý song song hàng loạt (MPP). Phù hợp cho các báo cáo tổng hợp phức tạp trên hàng Petabyte dữ liệu.<br>• <strong>Redshift Spectrum vs Amazon Athena</strong>: Nếu công ty <strong>đang có sẵn cụm Redshift</strong> và muốn kết hợp (JOIN) dữ liệu nóng trong Redshift với dữ liệu lạnh khổng lồ nằm trên S3 → Dùng <strong>Redshift Spectrum</strong>. Còn nếu công ty <strong>chưa có Redshift</strong> và chỉ muốn chạy câu lệnh SQL đột xuất (Ad-hoc queries) trực tiếp trên S3 → Dùng <strong>Amazon Athena</strong>!<br>• <strong> tính năng DR của Redshift</strong>: Có thể cấu hình tự động chép Snapshots của Redshift sang một Region khác (Cross-Region Snapshot Copy)."
      },
      {
        title: "2. Nhận diện các hệ Database chuyên dụng qua từ khóa đề thi",
        content: "• <strong>Amazon DocumentDB</strong>: Từ khóa <code>MongoDB compatibility, JSON documents</code>.<br>• <strong>Amazon Neptune</strong>: Từ khóa <code>Highly connected datasets, social networking, recommendation engines, fraud detection graphs, Knowledge graphs, Gremlin / SPARQL</code>.<br>• <strong>Amazon Timestream</strong>: Từ khóa <code>Time-series data, IoT sensor telemetry, operational metrics, trillions of events per day</code>.<br>• <strong>Amazon Keyspaces</strong>: Từ khóa <code>Managed Apache Cassandra, CQL (Cassandra Query Language)</code>.<br>• <strong>Amazon QLDB (Quantum Ledger Database)</strong>: Sổ cái bất biến có xác thực mật mã (Cryptographically verifiable transaction log) do 1 cơ quan trung ương quản lý (khác với <em>Amazon Managed Blockchain</em> là phi tập trung nhiều bên dùng Hyperledger Fabric / Ethereum)."
      }
    ],
    extraCards: [
      { q: "Công ty đang sử dụng Amazon Redshift làm Data Warehouse chính và muốn chạy truy vấn SQL kết hợp dữ liệu trong Redshift với 500 TB dữ liệu lịch sử lưu dưới dạng file Parquet trên S3 mà không cần nạp vào Redshift. Dùng tính năng gì?", a: "Amazon Redshift Spectrum." },
      { q: "Khi đề bài yêu cầu một cơ sở dữ liệu Sổ cái (Ledger database) lưu lịch sử giao dịch tài chính bất biến, minh bạch và có thể kiểm chứng bằng mật mã học do một tổ chức trung tâm quản lý, ta chọn dịch vụ nào?", a: "Amazon QLDB (Quantum Ledger Database)." }
    ],
    quizzes: [
      {
        qEn: "A financial company is building a fraud detection system that analyzes complex relationships between bank accounts, shared phone numbers, IP addresses, and devices to uncover hidden fraud rings. Which AWS database service is purpose-built for storing and querying these highly connected datasets?",
        qVi: "Công ty tài chính xây dựng hệ thống phát hiện gian lận bằng cách phân tích mối quan hệ chằng chịt giữa các tài khoản ngân hàng, số điện thoại dùng chung, địa chỉ IP và thiết bị để tìm ra đường dây gian lận ngầm. Dịch vụ DB nào sinh ra chuyên cho dữ liệu có tính liên kết cao này?",
        options: [
          "A. Amazon DocumentDB",
          "B. Amazon Neptune",
          "C. Amazon Timestream",
          "D. Amazon Redshift"
        ],
        correctIdx: 1,
        explanation: "Amazon Neptune là cơ sở dữ liệu đồ thị (Graph Database) chuyên dụng để lưu trữ và truy vấn các tập dữ liệu có mối liên kết phức tạp (mạng xã hội, phát hiện đường dây gian lận)."
      },
      {
        qEn: "A manufacturing company collects temperature and vibration metrics every second from 100,000 IoT sensors in its factories. The company needs a serverless database specifically optimized for storing and analyzing time-series data with built-in time-series analytics functions. Which service should be used?",
        qVi: "Công ty sản xuất thu thập chỉ số nhiệt độ và độ rung mỗi giây từ 100.000 cảm biến IoT trong nhà máy. Họ cần một cơ sở dữ liệu Serverless được tối ưu hóa riêng cho dữ liệu chuỗi thời gian (Time-series). Chọn dịch vụ nào?",
        options: [
          "A. Amazon Timestream",
          "B. Amazon Aurora",
          "C. Amazon Neptune",
          "D. Amazon ElastiCache"
        ],
        correctIdx: 0,
        explanation: "Amazon Timestream là cơ sở dữ liệu chuỗi thời gian (Time-series database) hoàn toàn Serverless, nhanh gấp hàng nghìn lần DB quan hệ truyền thống cho dữ liệu cảm biến IoT theo thời gian."
      }
    ]
  },

  26: {
    jargon: [
      { term: "Zone Apex / Root Domain (Tên miền gốc)", plain: "Tên miền trần trụi không có chữ gì đằng trước (ví dụ: 'shopee.vn' hoặc 'google.com'). Còn 'www.shopee.vn' hay 'api.shopee.vn' gọi là Subdomain (Tên miền phụ)." },
      { term: "Public Hosted Zone vs Private Hosted Zone", plain: "Public Hosted Zone = Danh bạ tên miền công khai cho cả thế giới trên Internet tra cứu. Private Hosted Zone = Danh bạ tên miền nội bộ chỉ có các máy chủ nằm bên trong VPC của công ty bạn mới tra cứu được (vd: db.internal.company.local)." },
      { term: "Route 53 Resolver (Inbound vs Outbound Endpoints)", plain: "Cầu nối DNS Hybrid: Inbound Endpoint = Cho phép máy chủ dưới công ty (On-premise) hỏi tên miền nội bộ nằm trong VPC trên AWS. Outbound Endpoint = Cho phép máy EC2 trên AWS hỏi tên miền nội bộ nằm dưới công ty!" }
    ],
    diagram: `
[DNS Hybrid giữa On-premise & AWS VPC qua VPN / Direct Connect]
 • Máy chủ dưới Công ty (On-prem) muốn giải mã tên miền trong VPC? ──► Gửi tới [Route 53 Resolver INBOUND Endpoint]
 • Máy EC2 trong VPC muốn giải mã tên miền dưới Công ty (On-prem)? ──► Gửi qua [Route 53 Resolver OUTBOUND Endpoint (+ Forwarding Rules)]`,
    deepSections: [
      {
        title: "1. Tại sao trong đề thi luôn chọn Alias Record thay vì CNAME Record?",
        content: "• <strong>CNAME Record</strong>: Chỉ dùng được cho tên miền phụ (<code>www.example.com</code>). <strong>TUYỆT ĐỐI KHÔNG dùng được cho tên miền gốc (Zone Apex <code>example.com</code>)</strong> và tốn tiền cho mỗi lượt truy vấn.<br>• <strong>Alias Record</strong>: Dùng được cho <strong>CẢ tên miền gốc (<code>example.com</code>) lẫn tên miền phụ</strong>, trỏ trực tiếp tới các dịch vụ AWS (ALB, NLB, CloudFront, API Gateway, S3 Website, Global Accelerator, VPC Interface Endpoint) và <strong>HOÀN TOÀN MIỄN PHÍ truy vấn</strong>!<br>• <strong>Lưu ý cực quan trọng</strong>: Một bản ghi Alias <strong>KHÔNG THỂ trỏ trực tiếp vào địa chỉ IP của một máy chủ EC2</strong>! (Muốn trỏ vào EC2 phải dùng <code>A Record</code> thường, hoặc đặt EC2 sau một ALB rồi dùng Alias trỏ vào ALB)."
      },
      {
        title: "2. Route 53 Resolver cho mạng Hybrid (Inbound vs Outbound Endpoints - Rất hay hỏi!)",
        content: "Khi công ty đã nối mạng từ On-premise lên AWS VPC (qua VPN hoặc Direct Connect) và muốn phân giải tên miền nội bộ xuyên qua lại giữa 2 bên:<br>1. <strong>Route 53 Resolver INBOUND Endpoint</strong>: Cho phép máy chủ DNS ở dưới <strong>On-premise gửi truy vấn ĐI VÀO AWS</strong> để hỏi địa chỉ IP của các bản ghi trong <em>Route 53 Private Hosted Zone</em>.<br>2. <strong>Route 53 Resolver OUTBOUND Endpoint (kèm Resolver Rules)</strong>: Cho phép các máy EC2 ở <strong>trên AWS VPC gửi truy vấn ĐI RA ngoài về phía máy chủ DNS dưới On-premise</strong> để hỏi các tên miền nội bộ của công ty (như <code>corp.internal.local</code>)."
      }
    ],
    extraCards: [
      { q: "Một bản ghi Route 53 Alias Record có thể trỏ trực tiếp tới địa chỉ IP của một máy chủ Amazon EC2 đơn lẻ được không?", a: "KHÔNG. Alias Record có thể trỏ tới ELB (ALB/NLB), CloudFront, API Gateway, S3 Website, Global Accelerator... nhưng KHÔNG THỂ trỏ trực tiếp vào một EC2 instance." },
      { q: "Trong môi trường Hybrid kết nối qua Direct Connect, các máy chủ EC2 trong VPC cần phân giải các tên miền nội bộ đang được quản lý bởi hệ thống DNS dưới On-premise. Cần tạo thành phần nào trên Route 53?", a: "Tạo một Route 53 Resolver Outbound Endpoint kèm theo Forwarding Rule trỏ về địa chỉ IP của DNS server dưới On-premise." },
      { q: "Ngược lại, nếu các máy chủ ở dưới On-premise cần phân giải các tên miền nằm trong Route 53 Private Hosted Zone trên AWS VPC thì cần tạo thành phần nào?", a: "Tạo một Route 53 Resolver Inbound Endpoint." }
    ],
    quizzes: [
      {
        qEn: "A company has connected its on-premises data center to an AWS VPC using AWS Direct Connect. Applications running on EC2 instances inside the VPC need to resolve DNS domain names (such as 'db.corp.internal') that are hosted on an on-premises Microsoft Active Directory DNS server. Which solution enables this DNS resolution?",
        qVi: "Công ty đã nối trung tâm dữ liệu dưới đất lên AWS VPC qua Direct Connect. Các ứng dụng trên EC2 trong VPC cần phân giải các tên miền nội bộ (như 'db.corp.internal') nằm trên máy chủ DNS dưới công ty. Giải pháp nào giúp thực hiện việc này?",
        options: [
          "A. Create a Route 53 Resolver Inbound Endpoint.",
          "B. Create a Route 53 Resolver Outbound Endpoint and configure a Conditional Forwarding Rule to forward queries for 'corp.internal' to the on-premises DNS server IP.",
          "C. Create an Alias record in a Public Hosted Zone.",
          "D. Enable Sticky Sessions on the ALB."
        ],
        correctIdx: 1,
        explanation: "Vì luồng truy vấn DNS đi từ TRONG VPC đi RA ngoài về phía On-premise, ta phải dùng Route 53 Resolver Outbound Endpoint kết hợp với Forwarding Rule."
      },
      {
        qEn: "A marketing team wants to host a web application at the root domain 'example.com' (Zone Apex) pointing to an Application Load Balancer (ALB). Which Route 53 record type should be created?",
        qVi: "Đội marketing muốn trỏ tên miền gốc 'example.com' (Zone Apex) thẳng vào một Application Load Balancer (ALB). Cần tạo loại bản ghi nào trên Route 53?",
        options: [
          "A. CNAME Record",
          "B. Route 53 Alias A Record pointing to the ALB",
          "C. PTR Record",
          "D. MX Record"
        ],
        correctIdx: 1,
        explanation: "Chuẩn DNS không cho phép tạo CNAME ở Zone Apex (tên miền gốc). Bắt buộc phải dùng bản ghi A ở chế độ Alias (Alias Record) của Route 53 để trỏ vào ALB."
      }
    ]
  },

  27: {
    jargon: [
      { term: "Latency Routing vs Geolocation Routing", plain: "Latency = Chọn server nào mạng chạy NHANH NHẤT (độ trễ mili-giây thấp nhất). Geolocation = Chọn server theo đúng BIÊN GIỚI QUỐC GIA của người dùng (dù mạng có chậm hơn cũng phải vào đúng server quy định cho nước đó!)." },
      { term: "Geoproximity Routing (Bias)", plain: "Dùng hệ số Bias (từ +1 đến +99 để mở rộng vòng tròn hút khách, hoặc -1 đến -99 để thu hẹp vòng tròn) nhằm dịch chuyển ranh giới chia tải giữa 2 Region nằm cạnh nhau." },
      { term: "Route 53 Calculated Health Checks", plain: "Gộp tối đa 255 Health Checks con thành 1 Health Check cha (ví dụ: Chỉ cần 2 trên 3 trạm kiểm tra báo sống thì coi như cả hệ thống vẫn đang sống)." }
    ],
    diagram: `
Mẹo Chọn Nhanh 7 Chính Sách Điều Hướng Route 53:
 ├── "Lowest latency / Fastest response time for users"         ──► Latency-based Routing
 ├── "Active-Passive Disaster Recovery / Backup static S3 page" ──► Failover Routing
 ├── "Test new version with 10% traffic / Blue-Green split"     ──► Weighted Routing
 ├── "Content licensing by Country / Local language / GDPR"     ──► Geolocation Routing
 └── "Shift traffic between two Regions by expanding radius"    ──► Geoproximity Routing (Bias)`,
    deepSections: [
      {
        title: "1. Cách phân biệt không bao giờ nhầm giữa Latency, Geolocation và Geoproximity",
        content: "• <strong>Latency-based Routing</strong>: Dựa hoàn toàn trên tốc độ phản hồi mạng (Network latency). Ví dụ người dùng ở Việt Nam nếu đường cáp đi Tokyo đang nhanh hơn Singapore thì Route 53 sẽ tự động đẩy về Tokyo.<br>• <strong>Geolocation Routing</strong>: Dựa trên vị trí hành chính (Lục địa, Quốc gia, hoặc Tiểu bang của Mỹ). Dùng khi đề bài nói tới: <strong><em>Bản quyền phát sóng theo từng nước, hiển thị ngôn ngữ/tiền tệ bản địa, hoặc chặn hẳn người dùng từ các quốc gia không được cấp phép</em></strong> (Nhớ: Luôn phải tạo thêm 1 bản ghi <code>Default</code> để hứng những người dùng không xác định được quốc gia!).<br>• <strong>Geoproximity Routing</strong>: Chỉ dùng khi đề bài nhắc tới việc <strong><em>tăng hoặc giảm lượng lưu lượng đổ về một Region lân cận bằng cách thay đổi hệ số Bias (Route 53 Traffic Flow)</em></strong>."
      },
      {
        title: "2. Làm sao để Route 53 Health Check kiểm tra được một máy EC2 nằm trong Private Subnet?",
        content: "Các máy trạm kiểm tra sức khỏe của Route 53 nằm ở ngoài mạng Internet công cộng, nên chúng <strong>KHÔNG THỂ gọi trực tiếp vào địa chỉ Private IP của một máy EC2 nằm trong Private Subnet</strong>!<br>👉 <strong>Giải pháp chuẩn đề thi SAA-C03</strong>: Tạo một <strong>CloudWatch Metric + CloudWatch Alarm</strong> theo dõi sức khỏe của máy EC2 trong Private Subnet đó, rồi cấu hình <strong>Route 53 Health Check theo dõi trạng thái của cái CloudWatch Alarm kia</strong>!"
      }
    ],
    extraCards: [
      { q: "Làm thế nào để Route 53 Health Check có thể kiểm tra trạng thái sống/chết của một máy chủ EC2 nằm kín bên trong Private Subnet (không có Public IP)?", a: "Tạo một CloudWatch Alarm giám sát chỉ số của máy EC2 đó, sau đó cấu hình Route 53 Health Check theo dõi trạng thái của CloudWatch Alarm này." },
      { q: "Khi cấu hình Route 53 Geolocation Routing để chỉ cho phép khách hàng từ 3 quốc gia truy cập và chặn toàn bộ các nước còn lại, hoặc để xử lý các IP không rõ vị trí, ta cần chú ý bản ghi đặc biệt nào?", a: "Bản ghi 'Default' (Mặc định) trong Geolocation Routing." }
    ],
    quizzes: [
      {
        qEn: "A streaming media company has legal broadcasting rights to show specific video content only to users located in Japan and Germany. Users from all other countries must be routed to a static page informing them that the content is unavailable in their country. Which Route 53 routing policy should be used?",
        qVi: "Công ty truyền thông có bản quyền hợp pháp chỉ được phép chiếu video cho người dùng tại Nhật Bản và Đức. Người dùng từ mọi quốc gia khác phải được chuyển hướng tới một trang tĩnh thông báo không hỗ trợ. Chọn chính sách điều hướng nào của Route 53?",
        options: [
          "A. Latency-based Routing",
          "B. Geolocation Routing",
          "C. Geoproximity Routing",
          "D. Multi-Value Answer Routing"
        ],
        correctIdx: 1,
        explanation: "Geolocation Routing định tuyến dựa trên biên giới quốc gia/lục địa của người dùng, hoàn hảo cho bài toán giới hạn bản quyền nội dung theo lãnh thổ (Geo-restriction)."
      },
      {
        qEn: "A company wants to configure Route 53 Failover routing for an internal database server running on an EC2 instance inside a Private Subnet with no internet access. Since Route 53 health checkers cannot reach private IP addresses directly, how can the architect implement a health check for this instance?",
        qVi: "Công ty muốn cấu hình Route 53 Failover cho một máy chủ DB nằm trong Private Subnet không có Internet. Vì Route 53 Health Checker không gọi trực tiếp vào Private IP được, làm sao kiểm tra sức khỏe cho máy này?",
        options: [
          "A. Open port 80 to 0.0.0.0/0 in the Network ACL.",
          "B. Create a CloudWatch Alarm monitoring the private EC2 instance's status, and configure a Route 53 Health Check to monitor the state of that CloudWatch Alarm.",
          "C. Use Simple Routing instead of Failover Routing.",
          "D. Place a NAT Gateway inside the Private Subnet."
        ],
        correctIdx: 1,
        explanation: "Route 53 hỗ trợ loại Health Check dựa trên CloudWatch Alarm (Health Check that monitors a CloudWatch Alarm), giúp giám sát gián tiếp các tài nguyên nằm trong Private Subnet."
      }
    ]
  },

  28: {
    jargon: [
      { term: "OAC (Origin Access Control)", plain: "Thẻ căn cước đặc biệt của CloudFront: Bạn cài S3 Bucket Policy chỉ mở cửa cho duy nhất tấm thẻ OAC này, nhờ đó khách hàng bắt buộc phải đi qua trạm CloudFront chứ không thể gõ link S3 trực tiếp để tải chùa!" },
      { term: "CloudFront Functions vs Lambda@Edge", plain: "Hai cách chạy code ngay tại trạm CDN: CloudFront Functions = Siêu nhẹ, chạy dưới 1 mili-giây, giá rẻ bằng 1/6 (dùng để sửa Header, đổi URL, kiểm tra JWT). Lambda@Edge = Chạy Node.js/Python nặng tới 10GB RAM, gọi được ra mạng ngoài và sửa được cả phần thân Body của trang web." },
      { term: "CloudFront Origin Groups", plain: "Chế độ dự phòng tự động của CloudFront: Gom 1 S3 Bucket ở Mỹ (Primary) và 1 S3 Bucket ở Châu Âu (Secondary) thành 1 nhóm — nếu Bucket ở Mỹ trả về lỗi 5xx thì CloudFront tự động lấy file từ Bucket ở Châu Âu trả cho khách!" }
    ],
    diagram: `
So sánh CloudFront Functions vs Lambda@Edge:
 ├── Cần chạy cực nhanh (< 1ms), hàng triệu req/s, giá siêu rẻ để sửa Header / Redirect URL / Check JWT? ──► [CloudFront Functions] (Chỉ ở Viewer Request/Response)
 └── Cần chạy code nặng (> 5ms), gọi DB/API bên ngoài hoặc sửa nội dung Body tại Origin Request/Response? ──► [Lambda@Edge]`,
    deepSections: [
      {
        title: "1. Các tính năng nâng cao của Amazon CloudFront hay ra thi nhất",
        content: "• <strong>Origin Access Control (OAC)</strong> (thay thế cho OAI cũ): Bảo vệ S3 Origin chỉ cho phép CloudFront truy cập, hỗ trợ đầy đủ mã hóa <strong>SSE-KMS</strong> và các request động (PUT/POST).<br>• <strong>CloudFront Signed URL vs Signed Cookies</strong>: Dùng để bán nội dung trả phí (khóa học video, báo trả tiền). Nhớ quy tắc: <strong>Truy cập 1 file lẻ → Dùng Signed URL; Truy cập hàng loạt nhiều file (như các mảnh video HLS hoặc toàn bộ trang web VIP) → Dùng Signed Cookies!</strong><br>• <strong>CloudFront Origin Groups (High Availability)</strong>: Thiết lập 1 Primary Origin và 1 Secondary Origin để CloudFront tự động Failover khi Origin chính trả về mã lỗi HTTP 4xx/5xx.<br>• <strong>Field-Level Encryption</strong>: Mã hóa riêng tối đa 10 trường dữ liệu cực kỳ nhạy cảm (như số thẻ tín dụng) bằng khóa bất đối xứng ngay tại trạm Edge để các tầng xử lý trung gian không đọc trộm được."
      },
      {
        title: "2. Phân biệt CloudFront Functions vs Lambda@Edge vs Global Accelerator",
        content: "• <strong>CloudFront Functions</strong>: Chạy trực tiếp tại hơn 400+ Edge Locations, thời gian chạy <strong>< 1 ms</strong>, chỉ can thiệp được vào <em>Viewer Request</em> và <em>Viewer Response</em>. Phù hợp cho: <strong>URL rewrites/redirects, HTTP header manipulation, JWT token validation</strong>.<br>• <strong>Lambda@Edge</strong>: Chạy tại Regional Edge Caches, thời gian chạy tới 5s–30s, can thiệp được cả 4 bước (Viewer & Origin Request/Response), có thể gọi mạng ra dịch vụ AWS khác.<br>• <strong>AWS Global Accelerator</strong>: <strong>Không cache nội dung!</strong> Cấp <strong>2 địa chỉ Anycast Static IP cố định toàn cầu</strong> cho cả giao thức <strong>TCP / UDP / HTTP</strong>, chạy qua mạng trục riêng của AWS và hỗ trợ kiểm tra sức khỏe tự động Failover giữa các Region trong dưới 1 phút."
      }
    ],
    extraCards: [
      { q: "Khi bán gói thành viên VIP trên website cho phép người dùng đã trả tiền được xem hàng trăm file ảnh và các phân đoạn video streaming (HLS) qua CloudFront, nên dùng CloudFront Signed URL hay Signed Cookies?", a: "Sử dụng CloudFront Signed Cookies (vì Signed Cookies cấp quyền truy cập cho nhiều file cùng lúc, còn Signed URL chỉ dành cho từng file đơn lẻ)." },
      { q: "Phân biệt khi nào chọn CloudFront Functions và khi nào chọn Lambda@Edge?", a: "CloudFront Functions: Tác vụ siêu nhẹ (<1ms) ở Viewer Request/Response như sửa HTTP Header, Redirect URL, kiểm tra JWT với chi phí thấp nhất. Lambda@Edge: Tác vụ nặng cần gọi mạng/DB ngoài hoặc can thiệp vào Origin Request/Response." },
      { q: "Tính năng nào của CloudFront cho phép thiết lập 2 S3 Buckets ở 2 Region khác nhau để tự động chuyển đổi dự phòng (Failover) khi Bucket chính trả về lỗi HTTP 5xx?", a: "CloudFront Origin Groups." }
    ],
    quizzes: [
      {
        qEn: "A media website uses Amazon CloudFront to deliver premium video courses consisting of thousands of small HLS video segment files stored in Amazon S3. Only authenticated paid subscribers should be able to access all the video segments of a course. What is the MOST efficient way to restrict access?",
        qVi: "Website truyền thông dùng CloudFront để phát các khóa học video trả phí gồm hàng nghìn file phân đoạn video nhỏ (HLS) lưu trên S3. Chỉ những học viên đã trả tiền mới được xem toàn bộ các file phân đoạn này. Cách hiệu quả nhất để giới hạn truy cập là gì?",
        options: [
          "A. Generate thousands of individual S3 Presigned URLs for each video segment.",
          "B. Use CloudFront Signed Cookies.",
          "C. Enable public read access on the S3 bucket.",
          "D. Use AWS Global Accelerator."
        ],
        correctIdx: 1,
        explanation: "Khi cần cấp quyền truy cập tạm thời cho NHIỀU file (như hàng nghìn phân đoạn video HLS hoặc toàn bộ khu vực thành viên VIP) qua CloudFront, CloudFront Signed Cookies là giải pháp tối ưu nhất."
      },
      {
        qEn: "A company runs a global multiplayer online game that uses the UDP protocol hosted on Network Load Balancers across three AWS Regions. Players complain about high latency and jitter, and corporate partners require fixed static IP addresses for whitelisting. Which AWS service should be placed in front of the NLBs?",
        qVi: "Công ty chạy game online nhiều người chơi toàn cầu dùng giao thức UDP đặt sau các NLB ở 3 Region. Người chơi phàn nàn về độ trễ cao và đối tác yêu cầu có địa chỉ IP tĩnh cố định để mở tường lửa. Nên đặt dịch vụ nào ở phía trước các NLB?",
        options: [
          "A. Amazon CloudFront",
          "B. AWS Global Accelerator",
          "C. Amazon API Gateway",
          "D. AWS WAF"
        ],
        correctIdx: 1,
        explanation: "CloudFront không hỗ trợ giao thức UDP và không cấp IP tĩnh cố định. AWS Global Accelerator hỗ trợ cả TCP và UDP, cấp 2 Anycast Static IP cố định toàn cầu và định tuyến qua mạng cáp quang nội bộ của AWS."
      }
    ]
  }
};
