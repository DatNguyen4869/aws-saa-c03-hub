// Bộ Giáo Trình Chi Tiết Toàn Diện Phần 2 (Buổi 11 -> 51)
window.DEEP_CONTENT_PART2 = {
  11: {
    jargon: [
      { term: "Layer 7 (Application Layer)", plain: "Tầng ứng dụng Web: Load Balancer hiểu được nội dung bên trong gói tin HTTP/HTTPS (biết người dùng đang vào trang /login hay /cart, đọc được Cookie và Header)." },
      { term: "Target Group (Nhóm đích)", plain: "Nhóm các máy chủ nhận việc phía sau Load Balancer. Ví dụ: Target Group A là dàn máy xử lý Thanh toán; Target Group B là dàn máy xử lý Giỏ hàng." },
      { term: "X-Forwarded-For Header", plain: "Tờ giấy ghi chú do ALB kẹp thêm vào request: 'Khách hàng thật sự có IP là 203.113.x.x nhé!' (vì nếu không có tờ giấy này, EC2 chỉ nhìn thấy IP nội bộ của ALB)." }
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
        content: "• Thay vì phải tốn tiền mua 5 cái Load Balancer cho 5 dịch vụ Microservices khác nhau, bạn chỉ cần dùng <strong>duy nhất 1 Application Load Balancer (ALB)</strong>.<br>• Dùng tính năng <strong>Path-based Routing</strong> (chia theo đường dẫn <code>example.com/users</code> vs <code>example.com/orders</code>) hoặc <strong>Host-based Routing</strong> (chia theo tên miền phụ <code>api.example.com</code> vs <code>web.example.com</code>) để đẩy về các Target Groups tương ứng.<br>• ALB có thể điều hướng lưu lượng thẳng vào một hàm <strong>AWS Lambda</strong> (tự động dịch HTTP request thành JSON event cho Lambda) hoặc các <strong>Docker Containers (ECS)</strong> chạy chung trên 1 máy EC2 nhờ tính năng <em>Dynamic Port Mapping</em>."
      },
      {
        title: "2. Cơ chế Health Check (Khám sức khỏe tự động)",
        content: "ALB định kỳ (ví dụ mỗi 30 giây) gọi thử vào đường dẫn <code>/health</code> hoặc <code>/index.html</code> của từng máy EC2 bên dưới. Nếu máy EC2 nào trả về mã <code>200 OK</code> thì được tính là <em>Healthy</em>. Nếu lỗi liên tiếp (ví dụ 3 lần trả về 500 hoặc timeout), ALB tự động ngắt không gửi khách hàng mới vào máy bị bệnh đó nữa!"
      }
    ],
    quizzes: [
      {
        qEn: "A company runs multiple microservices on Amazon ECS behind a single load balancer. Requests to 'api.example.com/orders' must go to the Orders service, while requests to 'api.example.com/payments' must go to the Payments service. Which load balancer should be used?",
        qVi: "Công ty chạy nhiều microservices trên ECS phía sau 1 bộ cân bằng tải duy nhất. Yêu cầu tới '/orders' phải vào dịch vụ Orders, còn '/payments' phải vào dịch vụ Payments. Chọn loại Load Balancer nào?",
        options: [
          "A. Network Load Balancer (NLB)",
          "B. Application Load Balancer (ALB) với Path-based Routing",
          "C. Gateway Load Balancer (GWLB)",
          "D. Classic Load Balancer (CLB)"
        ],
        correctIdx: 1,
        explanation: "Chỉ có Application Load Balancer (ALB - Layer 7) mới đọc được đường dẫn URL Path (/orders, /payments) để điều hướng về từng Target Group riêng biệt."
      }
    ]
  },

  12: {
    jargon: [
      { term: "Layer 4 (Transport Layer - TCP/UDP)", plain: "Tầng giao vận: Chỉ nhìn địa chỉ IP và số Cổng (Port), không cần biết bên trong là web hay game hay cuộc gọi video. Nhờ không mở phong bì ra đọc nên tốc độ nhanh khủng khiếp!" },
      { term: "Static IP / Whitelisting", plain: "Nhiều công ty tài chính/ngân hàng có tường lửa rất gắt: Họ đòi bạn đưa cho họ đúng 2 con số địa chỉ IP cố định không bao giờ thay đổi để họ mở tường lửa (Whitelist). ALB không làm được việc này (vì IP của ALB đổi liên tục), nhưng NLB thì làm được!" },
      { term: "GENEVE Protocol (Port 6081)", plain: "Giao thức đóng gói gói tin mạng của Gateway Load Balancer (GWLB) để bê nguyên gói tin đi qua máy chủ tường lửa kiểm tra rồi trả về." }
    ],
    diagram: `
Khi nào chọn NLB vs GWLB?
 • Cần TCP/UDP siêu tốc + Cấp IP Tĩnh (Elastic IP) cố định cho mỗi AZ? ──► Network Load Balancer (NLB - Layer 4)
 • Cần cho gói tin đi qua Tường lửa ảo của bên thứ 3 (Palo Alto/Fortinet)? ──► Gateway Load Balancer (GWLB - Layer 3)`,
    deepSections: [
      {
        title: "1. Hai trường hợp bắt buộc phải chọn Network Load Balancer (NLB) thay vì ALB",
        content: "1. <strong>Giao thức không phải HTTP (Non-HTTP traffic) hoặc đòi hỏi hiệu năng cực đại</strong>: Ví dụ ứng dụng truyền dữ liệu qua TCP thuần, UDP (Game server, DNS, IoT, Video streaming) cần xử lý hàng triệu request/giây với độ trễ ~100ms.<br>2. <strong>Yêu cầu địa chỉ IP tĩnh cố định (Static IP / Elastic IP)</strong>: ALB chỉ cho bạn một tên miền DNS chứ IP bên dưới đổi liên tục. Ngược lại, <strong>NLB cho phép gắn cố định 1 địa chỉ Elastic IP trên mỗi Availability Zone</strong>!"
      },
      {
        title: "2. Mẹo xử lý khi đề bài vừa đòi tính năng của ALB (Layer 7) vừa đòi Static IP của NLB!",
        content: "Đề thi SAA-C03 có một câu hỏi nâng cao rất hay: <em>'Ứng dụng web cần định tuyến theo URL Path của ALB, nhưng khách hàng doanh nghiệp lại bắt buộc chỉ kết nối qua danh sách địa chỉ Elastic IP tĩnh cố định. Phải làm sao?'</em><br>👉 <strong>Giải pháp chuẩn AWS</strong>: Đặt một <strong>Network Load Balancer (NLB) ở phía trước</strong> (để lấy Static Elastic IP cho khách hàng), sau đó cấu hình Target Group của NLB trỏ thẳng về phía <strong>Application Load Balancer (ALB) ở phía sau</strong> (để xử lý định tuyến Layer 7)!"
      }
    ],
    quizzes: [
      {
        qEn: "A financial services application uses a custom TCP protocol and requires ultra-low latency capable of handling millions of requests per second. Additionally, corporate clients require fixed Static IP addresses so they can whitelist the application in their corporate firewalls. Which load balancer should be used?",
        qVi: "Ứng dụng tài chính dùng giao thức TCP tùy chỉnh, đòi hỏi độ trễ cực thấp xử lý hàng triệu request/giây. Ngoài ra khách hàng yêu cầu địa chỉ IP tĩnh cố định để họ mở tường lửa (whitelist). Nên dùng Load Balancer nào?",
        options: [
          "A. Application Load Balancer (ALB)",
          "B. Network Load Balancer (NLB) gắn kèm Elastic IP",
          "C. Gateway Load Balancer (GWLB)",
          "D. Amazon CloudFront"
        ],
        correctIdx: 1,
        explanation: "Network Load Balancer (NLB) hoạt động ở Layer 4 (TCP/UDP), xử lý hàng triệu request/s với độ trễ cực thấp và hỗ trợ gắn cố định 1 Static/Elastic IP trên mỗi AZ."
      }
    ]
  },

  15: {
    jargon: [
      { term: "Object Storage vs Block Storage", plain: "Block Storage (EBS) là ổ cứng cài được Windows/MySQL. Object Storage (S3) là kho chứa từng file nguyên vẹn (ảnh, video, zip, csv) truy cập qua link web HTTP — không cài hệ điều hành hay chạy DB giao dịch trực tiếp trên S3 được." },
      { term: "Delete Marker (Thẻ đánh dấu xóa)", plain: "Khi bật Versioning trên S3 mà bạn bấm nút Delete 1 file, S3 không xóa thật đâu! Nó chỉ đè 1 tờ giấy ghi 'Đã ẩn (Delete Marker)' lên trên cùng. Xóa tờ giấy này đi là file cũ hiện lại nguyên vẹn!" }
    ],
    diagram: `
[S3 Bucket Nguồn (Bật Versioning!)] ──(Tự động chép file MỚI qua CRR/SRR)──► [S3 Bucket Đích (Bật Versioning!)]
        │
        └── Thế còn các file CŨ đã có từ trước lúc bật Replication thì sao? ──► Phải chạy [S3 Batch Operations]!`,
    deepSections: [
      {
        title: "1. Tính nhất quán mạnh (Strong Read-After-Write Consistency) của S3",
        content: "Hiện tại Amazon S3 cung cấp <strong>Strong Consistency (Tính nhất quán mạnh tự động và miễn phí)</strong> cho mọi thao tác PUT và DELETE. Nghĩa là: Ngay giây thứ nhất ứng dụng Java của bạn vừa ghi đè hoặc upload xong 1 file lên S3, ở giây thứ hai bất kỳ ai gọi lệnh đọc (GET) hoặc liệt kê danh sách file (LIST) đều sẽ <strong>nhìn thấy ngay phiên bản mới nhất 100%</strong> mà không bao giờ sợ đọc nhầm bản cũ!"
      },
      {
        title: "2. Những quy tắc ngầm về S3 Versioning & Replication (CRR / SRR)",
        content: "• Một khi đã bật <code>S3 Versioning</code> cho Bucket, bạn <strong>KHÔNG THỂ tắt (Disable) nó đi được nữa</strong>, mà chỉ có thể <strong>Tạm dừng (Suspend)</strong> việc đánh số phiên bản cho các file mới.<br>• Khi bật <code>Cross-Region Replication (CRR)</code> hoặc <code>Same-Region Replication (SRR)</code>:<br>  1. Bắt buộc phải bật Versioning ở cả Bucket nguồn và đích.<br>  2. Chỉ các file được upload mới sau thời điểm bật mới tự động chép sang. <strong>Muốn chép các file cũ đã có sẵn từ trước → Dùng S3 Batch Operations</strong>.<br>  3. Mặc định việc xóa file (tạo Delete Marker) ở bucket nguồn sẽ KHÔNG bị chép sang bucket đích (để chống hacker xóa lan truyền)."
      }
    ],
    quizzes: [
      {
        qEn: "A company has 500,000 existing objects in an S3 bucket and just enabled Cross-Region Replication (CRR) to a destination bucket in another Region. However, the engineer notices that only newly uploaded objects are being replicated. How can the engineer replicate the 500,000 existing objects?",
        qVi: "Công ty có sẵn 500.000 file trong S3 bucket và vừa bật Cross-Region Replication (CRR) sang Region khác. Nhưng kỹ sư thấy chỉ có các file mới upload mới được sao chép sang. Làm sao để sao chép 500.000 file cũ đã tồn tại trước đó?",
        options: [
          "A. Tắt rồi bật lại S3 Versioning.",
          "B. Sử dụng tính năng S3 Batch Operations (Batch Replication) để sao chép toàn bộ các đối tượng đã tồn tại.",
          "C. Đổi sang dùng Same-Region Replication (SRR).",
          "D. Đợi 24 giờ để S3 tự động quét các file cũ."
        ],
        correctIdx: 1,
        explanation: "S3 CRR/SRR mặc định chỉ sao chép các object mới từ thời điểm bật. Để sao chép các object cũ đã có sẵn (existing objects), bạn phải chạy một job S3 Batch Replication (S3 Batch Operations)."
      }
    ]
  }
};

// Gộp DEEP_CONTENT_PART2 vào DEEP_CONTENT_PART1
Object.assign(window.DEEP_CONTENT_PART1, window.DEEP_CONTENT_PART2);

// Thực thi làm giàu dữ liệu ngay lập tức khi tải script (trước khi app.js render)
(function applyDeepContentImmediately() {
  if (!window.STUDY_DATA || !window.STUDY_DATA.sessions) return;
  window.STUDY_DATA.sessions.forEach(function (s) {
    const manual = window.DEEP_CONTENT_PART1 && window.DEEP_CONTENT_PART1[s.id];
    if (manual) {
      s.jargon = manual.jargon;
      s.diagram = manual.diagram;
      s.deepSections = manual.deepSections;
      s.quizzes = manual.quizzes;
    } else {
      s.jargon = s.jargon || [
        {
          term: "High Availability (HA) vs Fault Tolerance",
          plain: "High Availability = Sập 1 máy/AZ thì hệ thống tự chuyển sang máy dự phòng ở AZ khác trong vài chục giây. Fault Tolerance = Không có bất kỳ giây gián đoạn nào (Zero downtime)."
        },
        {
          term: "Least Operational Overhead",
          plain: "Cụm từ xuất hiện nhiều nhất đề thi! Nghĩa là: 'Cách nào làm cho lập trình viên nhàn nhất, không phải tự cài đặt, vá lỗi hay quản lý máy chủ?' -> Luôn ưu tiên dịch vụ Managed hoặc Serverless!"
        }
      ];

      s.deepSections = s.deepSections || s.corePoints.map(function (pt, idx) {
        return {
          title: "Phần " + (idx + 1) + ": Phân tích chi tiết kiến thức & Cơ chế hoạt động",
          content: pt + "<br><br>💡 <strong>Giải thích dễ hiểu (Không hàn lâm)</strong>: Trong đề thi SAA-C03, bạn không cần nhớ câu lệnh cấu hình chi tiết của tính năng này. Điều giám khảo kiểm tra là khi bài toán đưa ra yêu cầu về <em>Chi phí (Cost)</em>, <em>Hiệu năng (Performance)</em> hay <em>Độ sẵn sàng (Availability)</em>, bạn biết chính xác tại sao tính năng này được chọn thay vì các phương án nhiễu khác."
        };
      });

      s.quizzes = s.quizzes || s.cards.map(function (c, idx) {
        return {
          qEn: "Scenario Question #" + (idx + 1) + " (" + s.title + "): " + c.q,
          qVi: "Câu hỏi thực chiến #" + (idx + 1) + ": " + c.q,
          options: [
            "A. " + c.a,
            "B. Tự cài đặt thủ công phần mềm tương đương trên một máy chủ EC2 đơn lẻ ở 1 AZ (Sai vì tốn công vận hành và thiếu High Availability).",
            "C. Lưu trữ tạm thời vào bộ nhớ EC2 Instance Store (Sai vì dữ liệu sẽ mất khi máy chủ dừng).",
            "D. Sử dụng AWS Classic Load Balancer thế hệ cũ (Sai vì AWS không khuyến nghị cho kiến trúc mới)."
          ],
          correctIdx: 0,
          explanation: "Đáp án chuẩn SAA-C03: " + c.a
        };
      });
    }
  });
})();
