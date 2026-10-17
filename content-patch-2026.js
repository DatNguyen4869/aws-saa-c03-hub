// content-patch-2026.js — Bổ sung 12 chủ đề trọng tâm (G01–G12) cho kỳ thi AWS SAA-C03 (chỉ append để bảo toàn key SRS).
(function (root) {
  "use strict";

  const CONTENT_PATCHES = {
    // G11 — Buổi 1: Shared Responsibility Model & Well-Architected Framework 6 trụ cột
    1: {
      patchId: "2026-10-G11",
      appendCorePoints: [
        "<strong>Shared Responsibility Model (Mô hình Trách nhiệm Chia sẻ)</strong>: AWS chịu trách nhiệm <em>Security OF the Cloud</em> (phần cứng vật lý, trung tâm dữ liệu, mạng trục toàn cầu, tầng ảo hóa Hypervisor, và bản vá OS/DB cho các dịch vụ Managed/Serverless như S3, DynamoDB, RDS, Lambda). Khách hàng chịu trách nhiệm <em>Security IN the Cloud</em> (dữ liệu khách hàng, cấu hình IAM/MFA, Security Group, NACL, mã hóa dữ liệu, và cập nhật bản vá Hệ điều hành trên máy ảo EC2).",
        "<strong>AWS Well-Architected Framework (6 Trụ cột)</strong>: (1) <strong>Operational Excellence</strong> (IaC bằng CloudFormation, tự động hóa vận hành, cải tiến liên tục từ sự cố); (2) <strong>Security</strong> (Least privilege, mã hóa mọi nơi, truy vết CloudTrail); (3) <strong>Reliability</strong> (Multi-AZ, tự động phục hồi, kiểm thử chịu lỗi); (4) <strong>Performance Efficiency</strong> (chọn đúng loại tài nguyên, Serverless, caching/CDN); (5) <strong>Cost Optimization</strong> (trả tiền theo nhu cầu, dùng Savings Plans/Spot, tắt tài nguyên thừa); (6) <strong>Sustainability</strong> (tối ưu hiệu suất sử dụng phần cứng, dùng Graviton để giảm phát thải carbon)."
      ],
      appendDeepSections: [
        {
          title: "4. Shared Responsibility Model & 6 Trụ cột AWS Well-Architected Framework",
          content: "• <strong>Phân định ranh giới Shared Responsibility Model trong đề thi</strong>:<br>  - Trên <strong>Amazon EC2 (IaaS)</strong>: Khách hàng phải tự vá lỗi hệ điều hành (OS patching), cấu hình tường lửa Security Group và quản lý khóa SSH.<br>  - Trên <strong>Amazon RDS (Managed Service)</strong>: AWS tự động vá lỗi hệ điều hành và cài bản vá DB Engine; khách hàng chịu trách nhiệm thiết lập quyền truy cập DB user, bật tham số Encryption và cấu hình Security Group.<br>  - Trên <strong>Amazon S3 / DynamoDB (Abstracted Services)</strong>: AWS quản lý toàn bộ hạ tầng và OS; khách hàng chịu trách nhiệm cấu hình Bucket Policy, IAM Policy, S3 Block Public Access và Versioning.<br>• <strong>Bảng từ khóa nhận diện 6 Trụ cột Well-Architected</strong>:<br>  - <em>Operational Excellence</em>: Thực hiện thay đổi nhỏ có thể đảo ngược (small, frequent, reversible changes), Infrastructure as Code, Runbooks &amp; Playbooks.<br>  - <em>Security</em>: Bảo vệ dữ liệu khi truyền/lưu trữ, nguyên tắc đặc quyền tối thiểu, kiểm toán tự động.<br>  - <em>Reliability</em>: Tự phục hồi sau lỗi (recover automatically), co giãn ngang theo tải, không phụ thuộc 1 điểm lỗi đơn (SPOF).<br>  - <em>Performance Efficiency</em>: Dùng công nghệ Serverless, đưa dữ liệu gần người dùng bằng CloudFront/Global Accelerator.<br>  - <em>Cost Optimization</em>: Phân tích chi tiêu bằng Cost Explorer, chọn đúng kích cỡ (right-sizing).<br>  - <em>Sustainability</em>: Tối đa hóa mức sử dụng CPU/RAM, dùng chip AWS Graviton tiết kiệm điện năng, xóa dữ liệu log cũ không cần thiết bằng Lifecycle Policy."
        }
      ],
      appendExamTraps: [
        "Bẫy Shared Responsibility: Nếu đề hỏi 'Ai chịu trách nhiệm cập nhật bản vá hệ điều hành (OS patching) cho Amazon RDS?' → Đáp án là AWS! Nhưng nếu hỏi 'Ai chịu trách nhiệm OS patching cho Amazon EC2?' → Đáp án là Khách hàng (Customer)."
      ],
      appendCards: [
        {
          q: "Theo AWS Shared Responsibility Model, việc cập nhật bản vá hệ điều hành (OS patching) trên Amazon EC2 và trên Amazon RDS thuộc trách nhiệm của ai?",
          a: "Trên Amazon EC2: thuộc trách nhiệm của Khách hàng (Security IN the Cloud). Trên Amazon RDS: thuộc trách nhiệm của AWS (Security OF the Cloud), còn khách hàng quản lý dữ liệu, tài khoản DB và Security Group."
        },
        {
          q: "Kể tên đủ 6 trụ cột của AWS Well-Architected Framework và từ khóa nhận diện trụ cột thứ 6 (mới nhất).",
          a: "6 trụ cột: (1) Operational Excellence, (2) Security, (3) Reliability, (4) Performance Efficiency, (5) Cost Optimization, và (6) Sustainability (Bền vững — tối ưu hiệu suất sử dụng hạ tầng, dùng chip Graviton để giảm tiêu thụ năng lượng và khí thải carbon)."
        }
      ]
    },

    // G05 (phần 1) — Buổi 18: S3 Block Public Access & S3 Object Ownership
    18: {
      patchId: "2026-10-G05A",
      appendCorePoints: [
        "<strong>S3 Block Public Access (Chặn truy cập công cộng ở cấp Bucket và Account)</strong>: Gồm 4 công tắc độc lập giúp chặn mọi ACL hoặc Bucket Policy vô tình mở quyền Public. Có thể bật một lần ở cấp <strong>AWS Account (hoặc dùng SCP trong Organizations)</strong> để khóa cứng toàn bộ các S3 Buckets hiện tại và tương lai trong tài khoản.",
        "<strong>S3 Object Ownership (Bucket owner enforced — Mặc định tắt ACL)</strong>: Khi đặt chế độ <code>Bucket owner enforced</code> (mặc định cho mọi bucket mới), toàn bộ ACL bị vô hiệu hóa hoàn toàn, và mọi object được tài khoản khác upload vào bucket đều <strong>tự động thuộc quyền sở hữu của chủ Bucket (Bucket Owner)</strong> mà không cần truyền header <code>bucket-owner-full-control</code>."
      ],
      appendDeepSections: [
        {
          title: "3. S3 Block Public Access & S3 Object Ownership (Bucket Owner Enforced)",
          content: "• <strong>S3 Block Public Access</strong>: Khi đề bài yêu cầu <em>'Đảm bảo không một nhân viên nào trong toàn bộ tài khoản AWS có thể vô tình tạo S3 Bucket công khai hoặc sửa Bucket Policy thành Public'</em> → Bật <strong>S3 Block Public Access ở cấp độ Account (Account-level Block Public Access)</strong>!<br>• <strong>Giải quyết bài toán Cross-Account Upload bằng S3 Object Ownership</strong>: Trước đây khi Tài khoản A upload file vào Bucket của Tài khoản B, file đó vẫn thuộc sở hữu của Tài khoản A khiến Tài khoản B không đọc được nếu quên gắn ACL <code>bucket-owner-full-control</code>. Cách chuẩn hiện đại: Bật <strong>S3 Object Ownership = Bucket owner enforced (Disable ACLs)</strong> trên Bucket của Tài khoản B → Mọi object trong bucket tự động thuộc quyền sở hữu 100% của Tài khoản B và quyền truy cập chỉ quản lý tập trung qua IAM Policy / Bucket Policy!"
        }
      ],
      appendExamTraps: [
        "Nếu Tài khoản A upload object sang S3 Bucket của Tài khoản B nhưng Tài khoản B không đọc được object đó → Chuyển S3 Object Ownership của Bucket sang chế độ 'Bucket owner enforced' để vô hiệu hóa ACL và tự động gán quyền sở hữu cho chủ Bucket."
      ],
      appendCards: [
        {
          q: "Làm thế nào để ngăn chặn triệt để việc bất kỳ người dùng nào trong tài khoản AWS vô tình cấu hình công khai (Public) cho các S3 Bucket hiện có hoặc tạo mới?",
          a: "Bật tính năng S3 Block Public Access ở cấp độ toàn tài khoản (Account-level S3 Block Public Access) và dùng SCP cấm tắt tính năng này."
        },
        {
          q: "Khi nhiều tài khoản AWS khác nhau cùng upload file vào một S3 Bucket trung tâm, chế độ cấu hình nào của S3 Object Ownership giúp chủ sở hữu Bucket tự động nắm toàn quyền sở hữu mọi file mà không cần dùng ACL?",
          a: "S3 Object Ownership ở chế độ 'Bucket owner enforced' (vô hiệu hóa toàn bộ ACL và tự động gán quyền sở hữu mọi object cho Bucket Owner)."
        }
      ]
    },

    // G05 (phần 2) — Buổi 19: S3 MFA Delete
    19: {
      patchId: "2026-10-G05B",
      appendCorePoints: [
        "<strong>S3 MFA Delete (Bảo vệ chống xóa bằng xác thực đa yếu tố)</strong>: Yêu cầu nhập mã MFA mỗi khi thực hiện 1 trong 2 hành động nguy hiểm: (1) <strong>Xóa vĩnh viễn một phiên bản object (Permanently delete an object version)</strong>, hoặc (2) <strong>Tạm dừng Versioning (Suspend Versioning)</strong> trên Bucket. Lưu ý: Xóa thông thường (tạo Delete Marker) KHÔNG cần MFA. Chỉ <strong>Root Account</strong> mới được phép bật/tắt MFA Delete và <strong>bắt buộc phải gọi qua AWS CLI / REST API</strong> (không bật được trên giao diện Web Console)."
      ],
      appendDeepSections: [
        {
          title: "3. Quy tắc sống còn về S3 MFA Delete trong đề thi SAA-C03",
          content: "• <strong>Điều kiện tiên quyết</strong>: Bắt buộc phải bật <strong>S3 Versioning</strong> trên Bucket trước khi bật <strong>MFA Delete</strong>.<br>• <strong>Ai được quyền bật/tắt MFA Delete?</strong> Duy nhất <strong>AWS Account Root User (chủ tài khoản gốc)</strong> thực hiện thông qua <strong>AWS CLI hoặc API</strong> (IAM Admin cũng không bật được MFA Delete!).<br>• <strong>Khi nào S3 đòi mã MFA?</strong><br>  - ✅ Khi xóa vĩnh viễn 1 phiên bản cụ thể (<code>DELETE Object versionId</code>).<br>  - ✅ Khi chuyển trạng thái Bucket từ Versioning Enabled sang <code>Suspended</code>.<br>  - ❌ Khi xóa file bình thường không truyền <code>versionId</code> (vì lúc đó S3 chỉ tạo một <em>Delete Marker</em> chứ chưa xóa mất dữ liệu thật)."
        }
      ],
      appendExamTraps: [
        "Bẫy S3 MFA Delete: Quản trị viên IAM (IAM Administrator) cố gắng bật MFA Delete trên giao diện AWS Management Console nhưng bị báo lỗi → Vì MFA Delete CHỈ có thể được bật bởi Root User thông qua AWS CLI hoặc API trên Bucket đã bật Versioning!"
      ],
      appendCards: [
        {
          q: "Trên Amazon S3, tính năng MFA Delete yêu cầu người dùng phải nhập mã xác thực MFA khi thực hiện hai thao tác cụ thể nào?",
          a: "(1) Xóa vĩnh viễn một phiên bản đối tượng (Permanently delete an object version) và (2) Tạm dừng tính năng Versioning (Suspend Versioning) trên S3 Bucket."
        },
        {
          q: "Ai là người duy nhất có quyền bật hoặc tắt tính năng S3 MFA Delete, và thao tác này phải thực hiện qua công cụ nào?",
          a: "Chỉ AWS Root Account user mới có quyền bật/tắt S3 MFA Delete, và bắt buộc phải thực hiện qua AWS CLI hoặc API (cần bật sẵn S3 Versioning)."
        }
      ]
    },

    // G04 — Buổi 23: Công thức tính RCU / WCU trên DynamoDB
    23: {
      patchId: "2026-10-G04",
      appendCorePoints: [
        "<strong>Công thức tính RCU &amp; WCU của DynamoDB (Provisioned Mode)</strong>:<br>  • <strong>Đơn vị Đọc (RCU — theo từng khối 4 KB)</strong>: <code>1 RCU</code> = 1 lượt đọc <em>Strongly Consistent</em>/giây hoặc <strong>2 lượt đọc <em>Eventually Consistent</em>/giây</strong> cho một item kích thước tới <strong>4 KB</strong>. Nếu dùng <em>Transactional Read</em> thì tốn <strong>gấp đôi (2 RCU cho mỗi 4 KB)</strong>.<br>  • <strong>Đơn vị Ghi (WCU — theo từng khối 1 KB)</strong>: <code>1 WCU</code> = 1 lượt ghi chuẩn/giây cho một item kích thước tới <strong>1 KB</strong>. Nếu dùng <em>Transactional Write</em> thì tốn <strong>gấp đôi (2 WCU cho mỗi 1 KB)</strong>.<br>  • <strong>Quy tắc làm tròn vàng</strong>: Luôn <strong>làm tròn LÊN (<code>ceil</code>) kích thước của 1 item theo bội số 4 KB (khi đọc) hoặc 1 KB (khi ghi) TRƯỚC</strong>, rồi mới nhân với số lượng request mỗi giây!"
      ],
      appendDeepSections: [
        {
          title: "3. Công thức và Ví dụ tính nhanh RCU / WCU DynamoDB trong 15 giây",
          content: "• <strong>Công thức tổng quát</strong>:<br>  - <code>Số khối 4 KB mỗi item = ceil(Item_Size_KB / 4)</code>.<br>    + <strong>Strongly Consistent Read</strong>: <code>RCU = Số_đọc_mỗi_giây × ceil(Size_KB / 4)</code>.<br>    + <strong>Eventually Consistent Read</strong>: <code>RCU = ceil( (Số_đọc_mỗi_giây / 2) × ceil(Size_KB / 4) )</code>.<br>    + <strong>Transactional Read</strong>: <code>RCU = Số_đọc_mỗi_giây × ceil(Size_KB / 4) × 2</code>.<br>  - <code>Số khối 1 KB mỗi item = ceil(Item_Size_KB / 1)</code>.<br>    + <strong>Standard Write</strong>: <code>WCU = Số_ghi_mỗi_giây × ceil(Size_KB)</code>.<br>    + <strong>Transactional Write</strong>: <code>WCU = Số_ghi_mỗi_giây × ceil(Size_KB) × 2</code>.<br>• <strong>Ví dụ 1 (Tính RCU)</strong>: Ứng dụng cần đọc <strong>80 items/giây</strong>, mỗi item nặng <strong>6.5 KB</strong>. Hãy tính số RCU cần thiết:<br>  - Bước 1: Làm tròn kích thước item theo khối 4 KB: <code>ceil(6.5 / 4) = ceil(1.625) = 2 khối (tương đương 8 KB)</code>.<br>  - Bước 2: Nếu đọc <em>Strongly Consistent</em> → <code>80 × 2 = 160 RCU</code>. Nếu đọc <em>Eventually Consistent</em> → <code>(80 / 2) × 2 = 80 RCU</code>. Nếu đọc <em>Transactional</em> → <code>80 × 2 × 2 = 320 RCU</code>.<br>• <strong>Ví dụ 2 (Tính WCU)</strong>: Ứng dụng cần ghi <strong>50 items/giây</strong>, mỗi item nặng <strong>2.2 KB</strong>:<br>  - Bước 1: Làm tròn kích thước item theo khối 1 KB: <code>ceil(2.2) = 3 KB</code>.<br>  - Bước 2: Nếu ghi chuẩn → <code>50 × 3 = 150 WCU</code>. Nếu ghi <em>Transactional</em> → <code>50 × 3 × 2 = 300 WCU</code>."
        }
      ],
      appendExamTraps: [
        "Bẫy tính toán RCU/WCU DynamoDB: Tuyệt đối KHÔNG lấy tổng dung lượng KB nhân với số request rồi mới chia 4! Phải làm tròn LÊN kích thước của từng item đơn lẻ theo bội số 4 KB (cho RCU) hoặc 1 KB (cho WCU) trước, sau đó mới nhân với số request/giây."
      ],
      appendCards: [
        {
          q: "Công thức chuẩn tính RCU (đơn vị 4 KB) trên DynamoDB là gì? Nếu ứng dụng đọc 100 items/giây (mỗi item nặng 5 KB) ở chế độ Eventually Consistent thì cần bao nhiêu RCU?",
          a: "Mỗi khối 4 KB cần 1 RCU cho Strongly Consistent (hoặc 0.5 RCU cho Eventually Consistent, 2 RCU cho Transactional). Với item 5 KB -> làm tròn lên ceil(5 / 4) = 2 khối 4 KB. Ở chế độ Eventually Consistent: (100 / 2) * 2 = 100 RCU."
        },
        {
          q: "Công thức chuẩn tính WCU (đơn vị 1 KB) trên DynamoDB là gì? Nếu ứng dụng ghi 40 items/giây (mỗi item nặng 2.3 KB) ở chế độ Transactional Write thì cần bao nhiêu WCU?",
          a: "Mỗi khối 1 KB cần 1 WCU cho ghi chuẩn (hoặc 2 WCU cho Transactional Write). Với item 2.3 KB -> làm tròn lên ceil(2.3) = 3 khối 1 KB. Ở chế độ Transactional Write: 40 * 3 * 2 = 240 WCU."
        }
      ]
    },

    // G10 — Buổi 27: Route 53 IP-based Routing Policy (Chính sách thứ 8)
    27: {
      patchId: "2026-10-G10",
      retitle: "Route 53: 8 Chính sách Điều hướng (Routing Policies) & Health Checks",
      appendCorePoints: [
        "<strong>8. IP-based Routing Policy (Định tuyến dựa trên dải địa chỉ IP của Client)</strong>: Cho phép bạn tải lên bảng ánh xạ các dải địa chỉ <strong>CIDR blocks (IPv4/IPv6) của người dùng hoặc nhà mạng ISP</strong> để điều hướng chính xác từng dải IP về đúng Endpoint mong muốn (ví dụ: điều hướng khách hàng thuộc nhà mạng ISP A về máy chủ đặt tại trung tâm dữ liệu kết nối trực tiếp với ISP A để tối ưu hiệu năng và giảm chi phí băng thông)."
      ],
      appendExamTraps: [
        "Phân biệt Geolocation vs IP-based Routing trên Route 53: Nếu đề bài điều hướng theo Quốc gia/Châu lục → Geolocation. Nếu đề bài có sẵn danh sách các dải CIDR IP của khách hàng/ISP và muốn ánh xạ từng dải CIDR về đúng Endpoint cụ thể → Chọn IP-based Routing!"
      ],
      appendCards: [
        {
          q: "Chính sách định tuyến thứ 8 của Amazon Route 53 là IP-based Routing được sử dụng trong trường hợp nào?",
          a: "Sử dụng khi công ty muốn định tuyến lưu lượng DNS dựa trên dải địa chỉ CIDR IP nguồn của người dùng hoặc nhà mạng ISP (CIDR blocks) về các Endpoint cụ thể nhằm tối ưu hóa độ trễ và chi phí truyền tải mạng."
        }
      ]
    },

    // G06 — Buổi 33: Amazon MSK (Managed Streaming for Apache Kafka)
    33: {
      patchId: "2026-10-G06",
      appendCorePoints: [
        "<strong>Amazon MSK (Managed Streaming for Apache Kafka)</strong>: Dịch vụ chạy cụm <strong>Apache Kafka</strong> được AWS quản lý hoàn toàn (tự động dựng broker, ZooKeeper/KRaft, Multi-AZ, vá lỗi). Có 2 chế độ: <strong>MSK Provisioned</strong> (tự chọn loại broker instance và dung lượng EBS, phù hợp tải ổn định lớn) và <strong>MSK Serverless</strong> (tự động co giãn dung lượng tính toán/lưu trữ khi tải thất thường, không cần quản lý broker capacity)."
      ],
      appendDeepSections: [
        {
          title: "3. Khi nào chọn Amazon MSK thay vì Amazon Kinesis Data Streams?",
          content: "• <strong>Từ khóa chọn Amazon MSK 100%</strong>: Khi đề bài nói <em>'Công ty đang chạy sẵn cụm Apache Kafka dưới On-premise (sử dụng Kafka Producer/Consumer APIs, Kafka Connect, MirrorMaker) và muốn di chuyển (lift-and-shift) lên dịch vụ được AWS quản lý mà KHÔNG SỬA ĐỔI CODE ứng dụng hiện tại'</em> → Chọn ngay <strong>Amazon MSK (Managed Streaming for Apache Kafka)</strong>!<br>• <strong>MSK Provisioned vs MSK Serverless</strong>:<br>  - Chọn <strong>MSK Serverless</strong> khi lưu lượng <em>biến thiên mạnh, không đoán trước được (variable/unpredictable traffic)</em> và đội ngũ không muốn tự cấu hình số lượng Kafka brokers hay phân vùng ổ cứng.<br>  - Chọn <strong>MSK Provisioned</strong> khi cần kiểm soát phiên bản Kafka cụ thể, cấu hình tùy chỉnh sâu hoặc có tải ổn định quy mô lớn."
        }
      ],
      appendExamTraps: [
        "Bẫy di chuyển Streaming: Đang dùng RabbitMQ/ActiveMQ (JMS/AMQP) không sửa code → Chọn Amazon MQ. Đang dùng Apache Kafka không sửa code → Chọn Amazon MSK (Managed Streaming for Apache Kafka), KHÔNG chọn Kinesis Data Streams vì Kinesis dùng SDK/API riêng của AWS!"
      ],
      appendCards: [
        {
          q: "Một doanh nghiệp đang vận hành cụm Apache Kafka dưới On-premise muốn chuyển lên dịch vụ quản lý hoàn toàn của AWS mà không phải viết lại code Producer/Consumer hiện có. Nên chọn dịch vụ nào và chế độ nào nếu lưu lượng thất thường?",
          a: "Chọn Amazon MSK (Managed Streaming for Apache Kafka). Nếu lưu lượng biến thiên thất thường và không muốn quản lý dung lượng broker, chọn chế độ Amazon MSK Serverless."
        }
      ]
    },

    // G08 — Buổi 35: Lambda Asynchronous Invocation, Destinations/DLQ & Event Source Mapping
    35: {
      patchId: "2026-10-G08",
      appendCorePoints: [
        "<strong>Lambda Asynchronous Invocation (Gọi bất đồng bộ — từ S3, SNS, EventBridge)</strong>: Lambda đặt sự kiện vào hàng đợi nội bộ và <strong>tự động thử lại tối đa 2 lần (2 retries = tổng cộng 3 lần chạy)</strong> nếu hàm trả về lỗi (khoảng cách 1 phút rồi 2 phút; thời gian giữ sự kiện tối đa 6 giờ). Để bắt các sự kiện thất bại (hoặc cả thành công), cấu hình <strong>Lambda Destinations (khuyên dùng — gửi sang SQS, SNS, Lambda, EventBridge cho cả On-Success và On-Failure)</strong> hoặc <strong>Dead-Letter Queue (DLQ — chỉ gửi sang SQS/SNS khi lỗi hết số lần retry)</strong>.",
        "<strong>Lambda Event Source Mapping (Luồng đọc từ SQS, Kinesis Data Streams, DynamoDB Streams)</strong>: Lambda chủ động kéo (poll) dữ liệu theo từng lô (Batch). Nếu 1 bản ghi trong Batch bị lỗi khiến cả hàm throw exception, mặc định <strong>cả Batch sẽ bị trả lại để xử lý lại từ đầu</strong>! Để chỉ thử lại đúng bản ghi bị lỗi mà không xử lý trùng các bản ghi đã thành công → Bật <strong>Partial Batch Response (<code>ReportBatchItemFailures</code>)</strong> hoặc bật <strong><code>BisectBatchOnFunctionError</code> + <code>On-Failure Destination</code></strong> (cho Kinesis/DynamoDB Streams)."
      ],
      appendDeepSections: [
        {
          title: "3. Cơ chế Retry, Lambda Destinations vs DLQ & Xử lý lỗi Batch trong Event Source Mapping",
          content: "• <strong>Phân biệt 3 mô hình gọi hàm AWS Lambda</strong>:<br>  1. <em>Synchronous (API Gateway, ALB, SDK trực tiếp)</em>: Lambda KHÔNG tự động retry; ứng dụng gọi phải tự retry.<br>  2. <em>Asynchronous (S3 Event, SNS, EventBridge, CLI <code>--invocation-type Event</code>)</em>: Tự động retry <strong>2 lần</strong>. Nên dùng <strong>Lambda Destinations</strong> thay cho DLQ truyền thống vì Destinations hỗ trợ cả nhánh <code>OnSuccess</code> lẫn <code>OnFailure</code>, truyền kèm đầy đủ stack trace/context và hỗ trợ đích đến là cả <strong>SQS, SNS, Lambda, và EventBridge</strong>.<br>  3. <em>Event Source Mapping / Stream &amp; Queue Polling (SQS, Kinesis, DynamoDB Streams)</em>:<br>     - Với <strong>Kinesis / DynamoDB Streams</strong>: Mặc định nếu lỗi sẽ retry cho đến khi bản ghi hết hạn (24h–365 ngày) làm tắc nghẽn cả Shard! Giải pháp chuẩn: Cấu hình <strong>Maximum Retry Attempts</strong>, bật <strong><code>BisectBatchOnFunctionError</code></strong> (chia đôi batch để cô lập bản ghi lỗi), bật <strong><code>ReportBatchItemFailures</code></strong> và gắn <strong>On-Failure Destination (SQS/SNS/S3)</strong>.<br>     - Với <strong>SQS Queue</strong>: Bật <strong><code>ReportBatchItemFailures</code></strong> để Lambda chỉ trả những message lỗi về lại hàng đợi SQS, và cấu hình <strong>SQS Dead-Letter Queue (DLQ) trên chính hàng đợi SQS nguồn</strong> (không phải DLQ của Lambda!)."
        }
      ],
      appendExamTraps: [
        "Bẫy kinh điển SQS + Lambda: Khi Lambda đọc từ hàng đợi SQS qua Event Source Mapping, nếu muốn đẩy các tin nhắn lỗi nhiều lần sang Dead-Letter Queue (DLQ), bạn PHẢI cấu hình Redrive Policy (DLQ) ngay trên hàng đợi Amazon SQS nguồn (vì DLQ gắn trên hàm Lambda chỉ hoạt động cho Asynchronous invocation như S3/SNS, không hoạt động cho SQS Event Source Mapping!)."
      ],
      appendCards: [
        {
          q: "Khi hàm AWS Lambda được kích hoạt bất đồng bộ (Asynchronous invocation từ S3 hoặc SNS) và gặp lỗi, Lambda tự động retry mấy lần và nên dùng tính năng nào để chuyển tiếp kết quả On-Success / On-Failure?",
          a: "Lambda tự động retry tối đa 2 lần (tổng cộng 3 lần thực thi). Nên dùng Lambda Destinations (hỗ trợ cả On-Success và On-Failure gửi tới SQS, SNS, Lambda, EventBridge) hoặc cấu hình Dead-Letter Queue (DLQ — chỉ cho On-Failure tới SQS/SNS)."
        },
        {
          q: "Khi hàm AWS Lambda đọc một lô (batch) 100 tin nhắn từ SQS hoặc Kinesis qua Event Source Mapping nhưng chỉ có 1 tin nhắn bị lỗi, làm sao để tránh việc 99 tin nhắn thành công bị xử lý lại từ đầu?",
          a: "Bật tính năng Partial Batch Response ('ReportBatchItemFailures') trên Event Source Mapping (và có thể kết hợp 'BisectBatchOnFunctionError' đối với Kinesis/DynamoDB Streams)."
        }
      ]
    },

    // G09 — Buổi 36: Step Functions Standard vs Express & API Gateway REST vs HTTP API (29s timeout)
    36: {
      patchId: "2026-10-G09",
      appendCorePoints: [
        "<strong>AWS Step Functions: Standard Workflow vs Express Workflow</strong>:<br>  • <strong>Standard Workflow</strong>: Thời gian chạy tối đa <strong>1 năm</strong>, đảm bảo thực thi <strong>đúng 1 lần (Exactly-once)</strong>, lưu lịch sử kiểm toán đầy đủ 90 ngày, hỗ trợ <em>Callback Task Token (chờ người duyệt)</em>; tính tiền theo số lần chuyển trạng thái (state transitions).<br>  • <strong>Express Workflow</strong>: Thời gian chạy tối đa <strong>5 phút</strong>, tốc độ cực cao (<strong>&gt; 100,000 executions/giây</strong>), dành cho IoT/Streaming/Mobile microservice nhanh; tính tiền theo số lần chạy và thời lượng bộ nhớ. Có 2 kiểu: <em>Asynchronous Express</em> (At-least-once) và <em>Synchronous Express</em> (At-most-once).",
        "<strong>Amazon API Gateway: REST API vs HTTP API &amp; Giới hạn Timeout 29 giây</strong>:<br>  • <strong>HTTP API</strong>: Rẻ hơn tới <strong>~70%</strong> và độ trễ thấp hơn REST API; hỗ trợ sẵn OIDC/OAuth 2.0 JWT Authorizer và CORS tự động — chọn khi chỉ cần làm API Proxy đơn giản trỏ vào Lambda/ALB.<br>  • <strong>REST API</strong>: Chọn khi bắt buộc cần các tính năng nâng cao: <strong>API Caching, API Keys &amp; Usage Plans (giới hạn quota theo đối tác), Request Validation, gắn trực tiếp AWS WAF, hoặc Private API (chỉ gọi từ trong VPC)</strong>.<br>  • <strong>Giới hạn Integration Timeout mặc định 29 giây (29s)</strong>: API Gateway có ngưỡng timeout tích hợp tiêu chuẩn là <strong>29 giây</strong> — nếu tác vụ backend mất vài phút, phải chuyển sang mô hình bất đồng bộ (API Gateway đẩy vào SQS/Step Functions rồi trả ngay mã <code>202 Accepted</code> kèm Job ID để client poll hoặc nhận qua WebSocket)."
      ],
      appendDeepSections: [
        {
          title: "3. Bảng phân biệt Step Functions (Standard vs Express) & API Gateway (REST vs HTTP, bẫy 29 giây)",
          content: "• <strong>Khi nào chọn Step Functions Standard vs Express?</strong><br>  - Chọn <strong>Standard Workflow</strong> khi đề bài nhắc tới: <em>Xử lý thanh toán ngân hàng không được phép chạy trùng lặp (Exactly-once), quy trình chờ con người phê duyệt kéo dài nhiều ngày/tháng (Human approval / Wait state up to 1 year)</em>.<br>  - Chọn <strong>Express Workflow</strong> khi đề bài nhắc tới: <em>Xử lý dòng dữ liệu IoT/Clickstream tần suất hàng trăm nghìn sự kiện mỗi giây, kết thúc nhanh dưới 5 phút và muốn tiết kiệm chi phí tối đa</em>.<br>• <strong>Khi nào chọn API Gateway HTTP API vs REST API?</strong><br>  - Chọn <strong>HTTP API</strong>: Khi từ khóa là <em>'Cost-effective API proxy for Lambda/HTTP backends with JWT/OAuth2 authentication'</em>.<br>  - Chọn <strong>REST API</strong>: Khi từ khóa là <em>'API Keys &amp; Usage Plans for third-party monetization, built-in response caching, AWS WAF integration, or XML/SOAP transformation'</em>.<br>• <strong>Bẫy lỗi 504 Gateway Timeout sau 29 giây trên API Gateway</strong>: Khi ứng dụng gọi qua API Gateway vào Lambda để tạo báo cáo PDF mất 60 giây, client luôn bị lỗi <code>504 Integration Timeout</code> ở giây thứ 29! Cách giải quyết chuẩn kiến trúc: Tách bất đồng bộ — API Gateway nhận request đẩy vào <strong>SQS (hoặc khởi chạy Step Functions)</strong> và trả lời ngay lập tức cho người dùng."
        }
      ],
      appendExamTraps: [
        "Nếu hàm Lambda chạy mất 45 giây nhưng được gọi đồng bộ phía sau Amazon API Gateway và luôn bị đứt kết nối ở giây thứ 29 (29s integration timeout) → Không thể chỉ tăng timeout của Lambda; phải đổi sang kiến trúc bất đồng bộ (API Gateway → SQS → Lambda) hoặc WebSocket!"
      ],
      appendCards: [
        {
          q: "So sánh Step Functions Standard Workflow và Express Workflow về thời gian chạy tối đa, cơ chế thực thi và bài toán áp dụng.",
          a: "Standard Workflow: tối đa 1 năm, thực thi Exactly-once, phù hợp quy trình thanh toán hoặc chờ duyệt thủ công. Express Workflow: tối đa 5 phút, tốc độ > 100,000 req/s, thực thi At-least-once (Async) hoặc At-most-once (Sync), chi phí rẻ cho IoT/Streaming."
        },
        {
          q: "Sự khác biệt chính giữa API Gateway HTTP API và REST API là gì, và tại sao các tác vụ chạy lâu hơn 29 giây phía sau API Gateway lại bị lỗi 504 Timeout?",
          a: "HTTP API rẻ hơn ~70% dùng làm proxy đơn giản kèm JWT/OAuth2; REST API hỗ trợ Caching, Usage Plans/API Keys, WAF, Private API. API Gateway có giới hạn Integration Timeout mặc định là 29 giây (29s), nên tác vụ chạy lâu hơn 29s cần chuyển sang xử lý bất đồng bộ (SQS/Step Functions)."
        }
      ]
    },

    // G02 — Buổi 42: Client VPN, VPN CloudHub & Route 53 Resolver Inbound/Outbound Endpoints
    42: {
      patchId: "2026-10-G02",
      appendCorePoints: [
        "<strong>AWS Client VPN vs AWS VPN CloudHub</strong>:<br>  • <strong>AWS Client VPN</strong>: Dịch vụ VPN quản lý hoàn toàn dựa trên chuẩn <strong>OpenVPN</strong> dành cho <strong>nhân viên làm việc từ xa (Remote workers / Laptop cá nhân)</strong> kết nối an toàn vào VPC và mạng On-premise.<br>  • <strong>AWS VPN CloudHub</strong>: Khi công ty có <strong>nhiều văn phòng chi nhánh (Multiple branch offices)</strong> đều đã có kết nối Site-to-Site VPN lên chung 1 <em>Virtual Private Gateway (VGW)</em> có bật BGP, VPN CloudHub cho phép các chi nhánh <strong>liên lạc trực tiếp với nhau theo mô hình Hub-and-Spoke chi phí thấp</strong> qua Internet có mã hóa IPsec.",
        "<strong>Route 53 Resolver Inbound Endpoint vs Outbound Endpoint (Hybrid DNS)</strong>:<br>  • <strong>Inbound Endpoint</strong>: Cho phép máy chủ DNS đặt dưới <strong>On-premise gửi truy vấn DNS VÀO trong VPC</strong> để phân giải các tên miền thuộc <em>Route 53 Private Hosted Zones</em>.<br>  • <strong>Outbound Endpoint (+ Resolver Rules)</strong>: Cho phép máy chủ EC2 nằm <strong>TRONG VPC gửi truy vấn DNS RA ngoài về máy chủ DNS dưới On-premise</strong> (thông qua <em>Conditional Forwarding Rules</em> có thể chia sẻ cho nhiều tài khoản bằng AWS RAM)."
      ],
      appendDeepSections: [
        {
          title: "3. Bốn mảnh ghép Hybrid nâng cao: Client VPN, VPN CloudHub & Route 53 Resolver (Inbound vs Outbound)",
          content: "• <strong>Phân biệt 3 dịch vụ VPN của AWS</strong>:<br>  1. <em>AWS Site-to-Site VPN</em>: Nối cố định 1 Data Center công ty (cần Customer Gateway) với VPC.<br>  2. <em>AWS Client VPN</em>: Nhân viên ngồi ở quán cafe mở phần mềm OpenVPN trên máy tính cá nhân để nối vào VPC (hỗ trợ xác thực Active Directory, MFA, SAML 2.0 hoặc Mutual TLS certificate).<br>  3. <em>AWS VPN CloudHub</em>: Nối 10 văn phòng chi nhánh lại với nhau thông qua 1 VGW duy nhất trên AWS làm trạm trung chuyển (Hub-and-Spoke qua VPN giá rẻ).<br>• <strong>Mẹo nhớ không bao giờ ngược giữa Route 53 Resolver Inbound và Outbound Endpoint</strong>:<br>  - Luôn lấy <strong>AWS VPC làm gốc tọa độ</strong>!<br>  - Truy vấn DNS đi từ <em>On-premise → VÀO VPC</em> (để tìm IP của máy trong Private Hosted Zone <code>db.aws.internal</code>) = <strong>Inbound Endpoint</strong>.<br>  - Truy vấn DNS đi từ <em>EC2 trong VPC → RA On-premise</em> (để tìm IP của máy chủ cũ <code>erp.corp.local</code> dưới tòa nhà công ty) = <strong>Outbound Endpoint + Resolver Conditional Forwarding Rule</strong>!"
        }
      ],
      appendExamTraps: [
        "Bẫy Hybrid DNS: Nếu đề bài yêu cầu 'Cả máy chủ On-premise lẫn máy EC2 trong VPC đều phải phân giải được tên miền nội bộ của nhau (Two-way DNS resolution)' → Phải tạo CẢ HAI: Route 53 Resolver Inbound Endpoint VÀ Route 53 Resolver Outbound Endpoint (kèm Resolver Rules)!"
      ],
      appendCards: [
        {
          q: "Dịch vụ nào của AWS cho phép nhân viên làm việc từ xa sử dụng phần mềm OpenVPN trên máy tính cá nhân để kết nối an toàn trực tiếp vào các tài nguyên trong Private Subnet của VPC?",
          a: "AWS Client VPN."
        },
        {
          q: "Khi một doanh nghiệp có 15 văn phòng chi nhánh trên toàn quốc muốn kết nối mạng bảo mật giữa các chi nhánh với nhau và với AWS với chi phí thấp nhất thông qua các đường truyền Site-to-Site VPN sẵn có trên một Virtual Private Gateway, ta dùng mô hình gì?",
          a: "AWS VPN CloudHub (sử dụng định tuyến BGP qua Virtual Private Gateway theo mô hình Hub-and-Spoke)."
        },
        {
          q: "Phân biệt vai trò của Route 53 Resolver Inbound Endpoint và Route 53 Resolver Outbound Endpoint trong kiến trúc Hybrid DNS.",
          a: "Route 53 Resolver Inbound Endpoint nhận truy vấn DNS từ mạng On-premise gửi VÀO VPC (phân giải Private Hosted Zone). Route 53 Resolver Outbound Endpoint kèm Resolver Rules chuyển tiếp truy vấn DNS từ EC2 trong VPC RA máy chủ DNS dưới On-premise."
        }
      ]
    },

    // G07 — Buổi 45: Amazon SageMaker vs Amazon Bedrock
    45: {
      patchId: "2026-10-G07",
      appendCorePoints: [
        "<strong>Amazon SageMaker vs Amazon Bedrock (Xây dựng ML tùy chỉnh vs GenAI Serverless qua API)</strong>:<br>  • <strong>Amazon SageMaker</strong>: Nền tảng đầy đủ (End-to-end ML platform) dành cho Data Scientists để <strong>tự chuẩn bị dữ liệu, gắn nhãn (Ground Truth), huấn luyện (Train), tinh chỉnh và triển khai các mô hình Machine Learning tùy chỉnh riêng</strong> (có hỗ trợ <em>SageMaker Canvas</em> không cần viết code).<br>  • <strong>Amazon Bedrock</strong>: Dịch vụ <strong>hoàn toàn Serverless</strong> cho phép gọi các <strong>Foundation Models (FMs) / Generative AI</strong> hàng đầu (Claude, Llama, Titan...) thông qua một <strong>API thống nhất</strong>, hỗ trợ <em>Knowledge Bases (RAG trên dữ liệu S3/OpenSearch riêng của công ty)</em> và <em>Bedrock Guardrails</em> mà không cần quản lý bất kỳ máy chủ GPU nào."
      ],
      appendDeepSections: [
        {
          title: "3. Khi nào chọn Amazon SageMaker và khi nào chọn Amazon Bedrock?",
          content: "• <strong>Chọn Amazon Bedrock khi</strong>: Đề bài yêu cầu xây dựng nhanh tính năng <strong>Generative AI (Chatbot tóm tắt văn bản, sinh nội dung, hỏi đáp tài liệu nội bộ theo cơ chế RAG - Retrieval-Augmented Generation)</strong> bằng cách gọi API tới các Foundation Models dựng sẵn với <strong>chi phí vận hành thấp nhất (Serverless)</strong> và đảm bảo dữ liệu riêng tư không bị dùng để train lại model gốc.<br>• <strong>Chọn Amazon SageMaker khi</strong>: Đội ngũ khoa học dữ liệu (Data Science team) muốn <strong>tự huấn luyện mô hình Machine Learning riêng từ dữ liệu lịch sử đặc thù</strong>, quản lý vòng đời MLOps, hoặc triển khai các thuật toán dự báo/phân loại tùy chỉnh."
        }
      ],
      appendExamTraps: [
        "Nếu đề bài yêu cầu xây dựng ứng dụng Generative AI / Chatbot hỏi đáp trên kho tài liệu nội bộ (RAG) bằng Foundation Models qua API Serverless mà không muốn quản lý hạ tầng → Chọn Amazon Bedrock (với Knowledge Bases), KHÔNG chọn SageMaker từ đầu!"
      ],
      appendCards: [
        {
          q: "Dịch vụ Serverless nào của AWS cung cấp quyền truy cập thông qua API vào các mô hình nền tảng (Foundation Models) để xây dựng ứng dụng Generative AI và hỗ trợ tính năng RAG (Knowledge Bases) mà không cần quản lý máy chủ?",
          a: "Amazon Bedrock."
        },
        {
          q: "Khi đội ngũ Data Scientists cần một nền tảng quản lý trọn gói để tự huấn luyện (train), thử nghiệm và triển khai mô hình Machine Learning tùy chỉnh riêng trên hạ tầng AWS, ta chọn dịch vụ nào?",
          a: "Amazon SageMaker."
        }
      ]
    },

    // G03 — Buổi 46: AWS X-Ray, CloudWatch Logs Insights, Metric Filter & Subscription Filter
    46: {
      patchId: "2026-10-G03",
      appendCorePoints: [
        "<strong>AWS X-Ray (Truy vết phân tán End-to-End cho Microservices)</strong>: Giúp <strong>trực quan hóa bản đồ dịch vụ (Service Map) và đo độ trễ từng chặng (Trace end-to-end requests)</strong> đi xuyên qua API Gateway → Lambda → ECS → DynamoDB → SQS để tìm ra chính xác microservice nào đang gây nghẽn cổ chai hoặc trả về lỗi HTTP 5xx/4xx.",
        "<strong>Bộ ba xử lý Log trên CloudWatch Logs</strong>:<br>  • <strong>CloudWatch Logs Insights</strong>: Công cụ chạy <strong>câu lệnh truy vấn tương tác (Query language)</strong> để tìm kiếm, lọc và thống kê log từ nhiều Log Groups.<br>  • <strong>CloudWatch Metric Filter</strong>: Quét dòng log theo mẫu từ khóa (ví dụ đếm chữ <code>ERROR</code> hoặc <code>InvalidPassword</code>) để <strong>biến thành con số CloudWatch Metric và kích hoạt CloudWatch Alarm</strong>.<br>  • <strong>CloudWatch Logs Subscription Filter</strong>: Đẩy dòng log <strong>theo thời gian thực (Real-time log streaming)</strong> sang <strong>Kinesis Data Streams, Amazon Data Firehose, hoặc AWS Lambda</strong> để chuyển tiếp vào S3/OpenSearch/Splunk (tối đa 2 Subscription Filters trên mỗi Log Group)."
      ],
      appendDeepSections: [
        {
          title: "3. Phân biệt AWS X-Ray với CloudWatch Logs Insights, Metric Filter & Subscription Filter",
          content: "• <strong>Từ khóa chọn AWS X-Ray 100%</strong>: Hễ đề bài nói <em>'Ứng dụng gồm hàng chục microservices / hàm Lambda gọi lẫn nhau bị chậm bất thường, kiến trúc sư cần công cụ Distributed Tracing để vẽ bản đồ phụ thuộc (Service Map) và theo dõi hành trình của từng request từ đầu đến cuối (Trace end-to-end)'</em> → Chọn ngay <strong>AWS X-Ray</strong>!<br>• <strong>Từ khóa phân biệt 3 tính năng của CloudWatch Logs</strong>:<br>  - Muốn <strong>báo động (Alarm)</strong> mỗi khi trong file log xuất hiện từ <code>OutOfMemory</code> hoặc hơn 5 lần <code>FailedLogin</code> trong 1 phút → Tạo <strong>CloudWatch Metric Filter</strong> gắn với <strong>CloudWatch Alarm</strong>!<br>  - Muốn <strong>truy vấn tìm kiếm ad-hoc</strong> trong log của 3 ngày qua để điều tra sự cố → Dùng <strong>CloudWatch Logs Insights</strong>.<br>  - Muốn <strong>stream toàn bộ log thời gian thực</strong> từ CloudWatch Logs sang S3 hoặc OpenSearch ở tài khoản tập trung → Dùng <strong>CloudWatch Logs Subscription Filter</strong> nối với <em>Amazon Data Firehose</em> (hoặc <em>Kinesis Data Streams</em>)."
        }
      ],
      appendExamTraps: [
        "Bẫy giám sát Microservices: CloudWatch Logs chỉ xem được log của từng dịch vụ rời rạc. Nếu đề bài có cụm từ 'trace end-to-end requests across microservices, identify performance bottlenecks, view service map' → Bắt buộc chọn AWS X-Ray!"
      ],
      appendCards: [
        {
          q: "Dịch vụ nào của AWS cung cấp tính năng truy vết phân tán (Distributed tracing) và vẽ bản đồ dịch vụ (Service Map) để tìm điểm nghẽn hiệu năng từ đầu đến cuối (end-to-end) giữa các microservices trên ECS, EC2 và Lambda?",
          a: "AWS X-Ray."
        },
        {
          q: "Phân biệt cách sử dụng CloudWatch Logs Insights, CloudWatch Metric Filter và CloudWatch Logs Subscription Filter.",
          a: "Logs Insights: Chạy câu lệnh truy vấn phân tích log tương tác. Metric Filter: Đếm mẫu từ khóa (như 'ERROR') trong log để tạo Metric kích hoạt CloudWatch Alarm. Subscription Filter: Stream log theo thời gian thực sang Kinesis Data Streams, Amazon Data Firehose hoặc Lambda."
        }
      ]
    },

    // G01 & G12 — Buổi 47: AWS Directory Service (Managed AD, AD Connector, Simple AD) & RCP (Resource Control Policies)
    47: {
      patchId: "2026-10-G01-G12",
      appendCorePoints: [
        "<strong>AWS Directory Service (3 lựa chọn tích hợp Active Directory)</strong>:<br>  • <strong>AWS Managed Microsoft AD</strong>: Dựng hệ thống Microsoft Active Directory thật trên AWS, hỗ trợ <strong>thiết lập mối quan hệ tin cậy (One-way / Two-way Forest Trust) với AD dưới On-premise</strong>, tích hợp trực tiếp với <strong>Amazon RDS for SQL Server/Oracle, Amazon FSx for Windows File Server, Amazon WorkSpaces, và AWS IAM Identity Center</strong>.<br>  • <strong>AD Connector</strong>: Chỉ là một <strong>cổng Proxy chuyển tiếp (Directory Gateway)</strong> mọi yêu cầu đăng nhập về thẳng máy chủ Active Directory dưới On-premise qua VPN/Direct Connect — <strong>HOÀN TOÀN KHÔNG lưu trữ hay đồng bộ thông tin user lên đám mây AWS</strong>.<br>  • <strong>Simple AD</strong>: Thư mục tương thích AD giá rẻ chạy trên Samba 4 dành cho quy mô nhỏ (&lt; 5,000 users), không hỗ trợ Trust với AD On-premise, không hỗ trợ MFA hay RDS SQL Server.",
        "<span class=\"fact-update\" data-since=\"2024-11\"><strong>Resource Control Policies (RCP) trong AWS Organizations</strong></span>: Chính sách quản trị cấp Organization dùng để đặt <strong>ranh giới quyền tối đa trên TÀI NGUYÊN (Resource-centric guardrails — hỗ trợ S3, KMS, SQS, Secrets Manager, IAM Roles/STS)</strong>, ví dụ ép buộc mọi tài nguyên trong công ty chỉ được truy cập từ các Principal thuộc đúng Organization của mình (<code>aws:PrincipalOrgID</code>). Nhớ quy tắc chung của cả <strong>SCP và RCP</strong>: Chúng <strong>KHÔNG BAO GIỜ áp dụng lên Management Account</strong> và <strong>KHÔNG giới hạn các Service-Linked Roles</strong>!"
      ],
      appendDeepSections: [
        {
          title: "3. Bảng chọn nhanh AWS Directory Service: Managed Microsoft AD vs AD Connector vs Simple AD",
          content: "• <strong>Khi nào chọn AD Connector? (Câu hỏi bẫy cực hay gặp!)</strong>:<br>  - Khi đề bài có từ khóa: <em>'Công ty đã có sẵn Active Directory dưới On-premise, muốn cho phép nhân viên dùng tài khoản AD đó để đăng nhập vào AWS Management Console hoặc Amazon WorkSpaces nhưng quy định bảo mật CẤM lưu trữ hay nhân bản thông tin định danh người dùng lên đám mây (without caching/replicating user credentials in the cloud)'</em> → Chọn ngay <strong>AD Connector</strong>!<br>• <strong>Khi nào chọn AWS Managed Microsoft AD?</strong>:<br>  - Khi đề bài yêu cầu: <em>Chạy Amazon RDS for SQL Server với Windows Authentication, hoặc dùng Amazon FSx for Windows File Server tích hợp AD trên mây, hoặc muốn tạo Two-way Trust với hệ thống AD dưới On-premise để vẫn đăng nhập được ngay cả khi đường truyền VPN tạm thời bị gián đoạn</em>.<br>• <strong>Phân biệt SCP (Service Control Policy) vs RCP (Resource Control Policy)</strong>:<br>  - <strong>SCP</strong> kiểm soát <em>Principal (IAM Users/Roles thuộc các Member Accounts được phép gọi API gì)</em>.<br>  - <strong>RCP</strong> kiểm soát <em>Resource (Tài nguyên S3, KMS, SQS, Secrets Manager, IAM Role trong Member Accounts cho phép ai từ bên ngoài chạm vào)</em>.<br>  - Cả SCP và RCP đều chỉ là <strong>hàng rào giới hạn tối đa (Guardrails — không tự cấp quyền)</strong>, không ảnh hưởng tới <strong>Management Account</strong> và không chặn <strong>Service-Linked Roles</strong>."
        }
      ],
      appendExamTraps: [
        "Bẫy Directory Service: 'Xác thực người dùng với Active Directory dưới On-premise mà KHÔNG đồng bộ hay lưu trữ thông tin user trên AWS' → Chọn AD Connector (nếu đề bài cần RDS SQL Server Windows Auth hoặc Trust hai chiều thì mới chọn AWS Managed Microsoft AD).",
        "Bẫy AWS Organizations: SCP và Resource Control Policies (RCP) KHÔNG có tác dụng lên các User/Role nằm trong Management Account và KHÔNG giới hạn Service-Linked Roles!"
      ],
      appendCards: [
        {
          q: "Trong AWS Directory Service, khi nào ta chọn AD Connector thay vì AWS Managed Microsoft AD?",
          a: "Chọn AD Connector khi công ty chỉ muốn chuyển tiếp (proxy) toàn bộ yêu cầu xác thực về Active Directory sẵn có dưới On-premise qua VPN/Direct Connect mà KHÔNG lưu trữ hay đồng bộ bất kỳ dữ liệu user nào trên đám mây. Chọn AWS Managed Microsoft AD khi cần Trust với On-premise hoặc dùng cho RDS SQL Server / FSx for Windows."
        },
        {
          q: "Khi cần chạy Amazon RDS for SQL Server với Windows Authentication hoặc Amazon FSx for Windows File Server có thiết lập Forest Trust hai chiều với Active Directory dưới On-premise, ta chọn dịch vụ nào trong AWS Directory Service?",
          a: "AWS Managed Microsoft AD (Simple AD không hỗ trợ Trust Relationship và không hỗ trợ RDS for SQL Server)."
        },
        {
          q: "Trong AWS Organizations, Resource Control Policies (RCP) khác gì với Service Control Policies (SCP), và hai loại chính sách này có tác động lên Management Account hay Service-Linked Roles không?",
          a: "SCP đặt giới hạn quyền tối đa cho các IAM Principals trong tài khoản thành viên, còn Resource Control Policies (RCP) đặt giới hạn quyền tối đa trực tiếp trên các Tài nguyên (S3, KMS, SQS, Secrets Manager, IAM Roles). Cả SCP và RCP đều KHÔNG tác động lên Management Account và KHÔNG giới hạn Service-Linked Roles."
        }
      ]
    }
  };

  if (root) {
    root.CONTENT_PATCHES = CONTENT_PATCHES;
    if (root.ContentPatcher && root.STUDY_DATA && Array.isArray(root.STUDY_DATA.sessions)) {
      root.ContentPatcher.applyContentPatches(root.STUDY_DATA.sessions, CONTENT_PATCHES);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CONTENT_PATCHES;
  }
})(typeof window !== "undefined" ? window : globalThis);
