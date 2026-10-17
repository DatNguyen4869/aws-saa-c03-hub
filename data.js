window.STUDY_DATA = {
  phases: [
    { id: 1, name: "Chặng 1: Nền tảng IAM, EC2 & Lưu trữ gắn kèm (EBS, EFS)", desc: "10 Buổi • Xây dựng gốc rễ về Phân quyền, Máy chủ ảo và Ổ cứng mạng" },
    { id: 2, name: "Chặng 2: Load Balancing, Auto Scaling & Amazon S3 Toàn tập", desc: "9 Buổi • Thiết kế hệ thống chịu tải cao (HA) và làm chủ dịch vụ lưu trữ S3" },
    { id: 3, name: "Chặng 3: Databases (RDS, Aurora, DynamoDB), Cache & DNS", desc: "9 Buổi • Tận dụng lợi thế 5 năm Java Dev để làm chủ tầng Data & Điều hướng" },
    { id: 4, name: "Chặng 4: Storage Mở rộng, Decoupling (SQS/SNS/Kinesis) & Serverless", desc: "8 Buổi • Kiến trúc bất đồng bộ, Microservices, Docker ECS Fargate & Lambda" },
    { id: 5, name: "Chặng 5: Mạng VPC Chuyên Sâu & Hybrid Cloud (Trọng tâm cho Dev)", desc: "7 Buổi • Lấp đầy lỗ hổng lớn nhất của Developer về Mạng, Subnet, NAT, Endpoint, VPN/DX" },
    { id: 6, name: "Chặng 6: Data Analytics, AI, Bảo mật, Giám sát & Disaster Recovery", desc: "8 Buổi • Hoàn thiện mảnh ghép Bảo mật đa tầng, Quản trị & Khôi phục thảm họa" },
    { id: 7, name: "Chặng 7: Hệ Thống Hóa Bảng So Sánh & Chiến Dịch Luyện 6 Đề", desc: "29 Buổi • 5 buổi tổng duyệt Cheat Sheets + 24 buổi chia nhỏ 6 đề thi (16 câu/buổi)" }
  ],

  sessions: [
    // ================= CHẶNG 1 =================
    {
      id: 1, phase: 1, section: "Section 4 • Bài 15 → 22",
      title: "IAM Users, Groups, Policies & MFA",
      mode: "Xem Video + Thực hành tạo Account/MFA",
      javaAnalogy: "Hãy hình dung IAM giống như Spring Security trong ứng dụng của bạn, nhưng thay vì phân quyền cho User của web, nó phân quyền xem ai được phép tạo/xóa máy chủ, database trong toàn bộ hạ tầng AWS.",
      corePoints: [
        "<strong>Root Account</strong>: Tài khoản chủ tạo bằng email. Tuyệt đối KHÔNG dùng cho công việc hàng ngày, phải bật MFA ngay lập tức và không tạo Access Key cho Root.",
        "<strong>IAM Groups</strong>: Chỉ chứa <code>Users</code>, <strong>KHÔNG THỂ chứa Group khác</strong> (không lồng group). Một User có thể thuộc nhiều Group hoặc không thuộc Group nào.",
        "<strong>IAM Policy Structure</strong>: Văn bản JSON gồm <code>Effect</code> (Allow/Deny), <code>Action</code> (vd: <code>s3:GetObject</code>), <code>Resource</code>, và <code>Condition</code>.",
        "<strong>Billing Alarm</strong>: Vào AWS Budgets tạo ngay cảnh báo ngân sách $1 - $3/tháng để nhận email nếu quên tắt dịch vụ."
      ],
      examTraps: [
        "<strong>Quy tắc tối thượng của IAM</strong>: <code>Explicit Deny</code> (Lệnh cấm tường minh) <strong>LUÔN THẮNG</strong> mọi lệnh <code>Allow</code>. Nếu 1 user có 5 policy Allow nhưng dính 1 policy Deny thì kết quả cuối cùng là BỊ TỪ CHỐI.",
        "Đề thi hỏi: 'Làm sao phân quyền nhanh và dễ bảo trì nhất cho 50 nhân viên mới thuộc phòng Dev?' → Đáp án luôn là tạo <strong>IAM Group</strong>, gắn Policy vào Group rồi thêm Users vào Group."
      ],
      freeDocTitle: "Tutorials Dojo - AWS IAM Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/aws-identity-and-access-management-iam/",
      cards: [
        { q: "Trong AWS IAM, một IAM Group có thể chứa một IAM Group khác bên trong không?", a: "KHÔNG. IAM Group chỉ có thể chứa IAM Users, không thể lồng Group trong Group." },
        { q: "Khi đánh giá IAM Policy, nếu một hành động vừa có lệnh Allow ở Policy A vừa có lệnh Explicit Deny ở Policy B thì kết quả là gì?", a: "Bị từ chối (Denied). Explicit Deny luôn ghi đè (override) mọi lệnh Allow." }
      ]
    },
    {
      id: 2, phase: 1, section: "Section 4 • Bài 23 → 32",
      title: "IAM Roles, Access Keys & Công cụ kiểm toán IAM",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi viết code Java Spring Boot cần gọi S3, người mới hay lưu cứng `aws.accessKeyId` và `aws.secretKey` trong file `application.properties` (rất nguy hiểm nếu lộ lên Git!). Trong AWS, ta gắn `IAM Role` cho máy chủ EC2 để SDK Java tự động lấy token tạm thời mà không cần lưu bất kỳ mật khẩu nào trong code.",
      corePoints: [
        "<strong>IAM Roles</strong>: Dành cho các dịch vụ AWS (EC2, Lambda, ECS) hoặc tài khoản khác mượn quyền tạm thời (sử dụng dịch vụ <code>AWS STS - Security Token Service</code> bên dưới).",
        "<strong>IAM Credentials Report (Cấp độ Account)</strong>: Xuất file CSV liệt kê toàn bộ Users trong tài khoản và trạng thái mật khẩu, Access Key, MFA của họ.",
        "<strong>IAM Access Advisor (Cấp độ từng User/Role)</strong>: Cho biết User đó đã truy cập những dịch vụ nào lần cuối khi nào → Dùng để cắt bỏ các quyền thừa không dùng đến (Nguyên tắc <strong>Least Privilege</strong>)."
      ],
      examTraps: [
        "<strong>Bẫy kinh điển</strong>: Đề bài nói 'Ứng dụng chạy trên EC2 cần truy cập S3/DynamoDB an toàn nhất' → Chọn ngay <strong>Attach IAM Role to EC2 Instance</strong> (Loại ngay mọi đáp án có chữ Access Key / Secret Key!).",
        "Phân biệt: Cần kiểm tra toàn bộ user xem ai chưa bật MFA → <strong>Credentials Report</strong>. Cần thu gọn quyền của 1 user theo chuẩn Least Privilege → <strong>Access Advisor</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - IAM Roles & Security Tools",
      freeDocUrl: "https://tutorialsdojo.com/aws-identity-and-access-management-iam/",
      cards: [
        { q: "Ứng dụng Java chạy trên EC2 cần đọc/ghi dữ liệu vào S3 Bucket một cách an toàn nhất, không tốn công xoay vòng key. Giải pháp là gì?", a: "Tạo một IAM Role có quyền truy cập S3 và gắn (attach) trực tiếp IAM Role đó vào EC2 Instance." },
        { q: "Phân biệt IAM Credentials Report và IAM Access Advisor?", a: "Credentials Report: Liệt kê toàn bộ Users và trạng thái MFA/Key (cấp Account). Access Advisor: Xem lịch sử dịch vụ 1 User đã dùng để cắt giảm quyền thừa (Least Privilege)." }
      ]
    },
    {
      id: 3, phase: 1, section: "Section 5 • Bài 34 → 40",
      title: "EC2 Căn bản, Instance Types & EC2 User Data",
      mode: "Xem Video + Thực hành nhẹ",
      javaAnalogy: "EC2 chính là máy chủ ảo Linux/Windows (VPS) nơi bạn cài JDK, Tomcat, Docker để chạy ứng dụng. `EC2 User Data` giống như file script `init.sh` tự động chạy 1 lần duy nhất khi máy chủ mới mua về được bấm nút nguồn lần đầu.",
      corePoints: [
        "<strong>EC2 User Data</strong>: Đoạn bash script tự động chạy <strong>1 lần duy nhất ở lần khởi động đầu tiên (First boot)</strong> với quyền <code>root</code> (dùng để cài đặt web server, pull code, cài Docker).",
        "<strong>Cách nhớ các dòng máy EC2 (Instance Families)</strong>:",
        "• <strong>M (General Purpose)</strong>: Cân bằng CPU & RAM (Web app thông thường).",
        "• <strong>C (Compute Optimized)</strong>: CPU cực mạnh (Batch processing, nén video, gaming server, ML inference).",
        "• <strong>R / X (Memory Optimized)</strong>: RAM cực lớn (In-memory database, Redis, SAP HANA, xử lý Big Data trên RAM).",
        "• <strong>I / D (Storage Optimized)</strong>: Ổ cứng cục bộ NVMe IOPS cực cao (NoSQL DB, OLTP, Data warehousing)."
      ],
      examTraps: [
        "Nếu đề bài yêu cầu 'In-memory caches / High-performance relational databases' → Chọn dòng <strong>R</strong>.",
        "Mặc định EC2 User Data KHÔNG chạy lại ở các lần Reboot sau (trừ khi cấu hình đặc biệt với `cloud-init`)."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon EC2 Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/",
      cards: [
        { q: "EC2 User Data chạy khi nào và chạy dưới quyền của user nào trong hệ điều hành?", a: "Chỉ chạy 1 lần duy nhất khi khởi tạo máy (first boot) và chạy dưới quyền root." },
        { q: "Mẹo phân biệt các dòng máy EC2: C, R, I dùng cho bài toán gì?", a: "C (Compute): Nặng về CPU/Batch/Media. R (RAM): In-memory DB/Cache. I (IOPS): Cơ sở dữ liệu đòi hỏi đọc ghi đĩa tốc độ cực cao." }
      ]
    },
    {
      id: 4, phase: 1, section: "Section 5 • Bài 41 → 48",
      title: "Security Groups chuyên sâu & Kết nối EC2",
      mode: "Xem Video",
      javaAnalogy: "Security Group là tường lửa bọc sát bên ngoài mỗi máy chủ EC2, kiểm soát cổng nào (ví dụ 80, 443, 8080, 3306) được phép đi vào hoặc đi ra.",
      corePoints: [
        "<strong>Đặc tính Stateful (Có trạng thái)</strong>: Nếu một gói tin được phép đi VÀO (Inbound) qua cổng 80, nó sẽ <strong>TỰ ĐỘNG được phép đi RA (Outbound)</strong> mà không cần kiểm tra bảng Outbound Rules.",
        "<strong>Chỉ có quy tắc Allow</strong>: Security Group KHÔNG CÓ nút chặn (Deny) một IP cụ thể.",
        "<strong>Security Group Referencing (Tham chiếu chéo)</strong>: Trong Inbound Rule của tầng Database, thay vì điền địa chỉ IP của máy Web (vì IP có thể đổi khi Auto Scaling), ta điền <strong>ID của Security Group tầng Web</strong>!"
      ],
      examTraps: [
        "<strong>Bẫy lỗi kết nối</strong>: Khi truy cập vào EC2 bị lỗi <code>Connection Timed Out</code> → 99% là do <strong>Security Group</strong> (hoặc NACL) chưa mở cổng hoặc sai IP. Còn nếu báo <code>Connection Refused</code> → Đã qua được Security Group nhưng ứng dụng Java/Web bên trong EC2 chưa chạy!",
        "Mặc định khi mới tạo một Security Group: Toàn bộ Inbound bị chặn hết; Toàn bộ Outbound được mở hết (Allow All)."
      ],
      freeDocTitle: "Tutorials Dojo - Security Group vs NACL",
      freeDocUrl: "https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/",
      cards: [
        { q: "Tại sao nói Security Group có tính chất Stateful?", a: "Vì nếu request được phép đi vào (Inbound) thì luồng phản hồi sẽ tự động được phép đi ra (Outbound) bất kể Outbound rule viết gì." },
        { q: "Làm sao để cấu hình tường lửa cho phép hàng chục máy EC2 tầng Web (tự động co giãn) kết nối vào EC2 tầng Database ở cổng 3306 mà không dùng dải IP?", a: "Trong Inbound Rule của Security Group tầng DB, tham chiếu trực tiếp tới Security Group ID của tầng Web." }
      ]
    },
    {
      id: 5, phase: 1, section: "Section 6 • Bài 50 → 55",
      title: "Các hình thức mua EC2 (EC2 Purchasing Options)",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Giống như thuê phòng khách sạn: On-Demand là thuê theo giờ giá cao; Reserved/Savings Plans là ký hợp đồng thuê nhà 1-3 năm giá rẻ; Spot là thuê phòng trống giờ chót giá siêu rẻ (giảm tới 90%) nhưng chủ nhà có thể thu hồi lại phòng bất cứ lúc nào (báo trước 2 phút) khi khách sạn cần lại phòng cho khách chính thức.",
      corePoints: [
        "<strong>On-Demand</strong>: Không cam kết, trả tiền theo giây (Linux/Windows). Dùng cho workload ngắn hạn, chưa đoán được tải.",
        "<strong>Reserved Instances (RI) & Savings Plans</strong>: Cam kết 1 hoặc 3 năm (tiết kiệm tới 72%). Dùng cho tải <strong>Steady-state (chạy ổn định 24/7)</strong> như Database chính. <em>Convertible RI</em> cho phép đổi loại máy; <em>Savings Plans</em> cam kết theo số tiền $/giờ linh hoạt nhất.",
        "<strong>Spot Instances</strong>: Rẻ nhất (giảm tới 90%), <span class=\"fact-update\" data-since=\"2018\">không còn cơ chế đấu giá (bidding) — bị thu hồi (báo trước 2 phút) khi AWS cần lấy lại dung lượng tính toán (capacity) hoặc khi giá vượt mức max price tùy chọn</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: đấu giá / bị thu hồi khi người khác trả giá cao hơn</span>. Dùng cho: Batch jobs, xử lý dữ liệu phụ, CI/CD, stateless workers.",
        "<strong>Dedicated Hosts</strong>: Thuê nguyên cả tủ server vật lý. Dùng cho bài toán <strong>BYOL (Bring Your Own License - bản quyền Windows/Oracle tính theo số lõi CPU vật lý)</strong> hoặc yêu cầu Compliance nghiêm ngặt.",
        "<strong>Capacity Reservations</strong>: Giữ chỗ trước số lượng máy ở 1 AZ cụ thể để đảm bảo luôn bật được máy khi cần (dù máy đang tắt vẫn trả tiền giữ chỗ)."
      ],
      examTraps: [
        "Đề bài có chữ <strong>'Fault-tolerant, flexible start and end times, most cost-effective'</strong> → Chọn ngay <strong>Spot Instances</strong>.",
        "Đề bài có chữ <strong>'Server-bound software licenses (per-socket / per-core) / Regulatory compliance'</strong> → Chọn ngay <strong>Dedicated Hosts</strong> (không chọn Dedicated Instances vì Dedicated Instances không cho phép nhìn thấy socket/core vật lý)."
      ],
      freeDocTitle: "Tutorials Dojo - EC2 Instance Pricing Options",
      freeDocUrl: "https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/",
      cards: [
        { q: "Khi nào bắt buộc phải chọn EC2 Dedicated Hosts thay vì Dedicated Instances?", a: "Khi cần quản lý bản quyền phần mềm tính theo số Socket / Core vật lý (BYOL) hoặc yêu cầu kiểm toán phần cứng nghiêm ngặt." },
        { q: "Loại hình mua EC2 nào tiết kiệm tới 90% chi phí cho các tác vụ xử lý lô (Batch processing) có thể chịu được việc bị ngắt quãng?", a: "EC2 Spot Instances." }
      ]
    },
    {
      id: 6, phase: 1, section: "Section 6 • Bài 56 → 62",
      title: "Elastic IP, Placement Groups & ENI",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Placement Groups giúp bạn chỉ định cho AWS biết nên xếp các máy chủ ảo nằm chung 1 tủ rack để truyền mạng siêu tốc, hay xếp cách xa nhau ra nhiều tủ rack để tránh chết chùm khi chập điện.",
      corePoints: [
        "<strong>Elastic IP (EIP)</strong>: Địa chỉ IPv4 công cộng cố định (mặc định mỗi Region tối đa 5 EIP). <span class=\"fact-update\" data-since=\"2024-02\">Từ 02/2024, AWS tính phí ~$0.005/giờ cho MỌI địa chỉ Public IPv4 (kể cả EIP đang gắn vào EC2 đang chạy lẫn EIP chưa gắn hoặc gắn vào máy Stopped)</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Miễn phí nếu đang gắn vào 1 máy EC2 đang chạy; chỉ bị tính phí nếu không gắn hoặc gắn vào máy đang Stop</span>.",
        "<strong>3 loại EC2 Placement Groups</strong>:",
        "1. <strong>Cluster</strong>: Gom toàn bộ máy vào chung 1 Rack trong 1 AZ → Mạng nội bộ cực nhanh (10 Gbps, Low-latency, <strong>HPC - High Performance Computing</strong>). Rủi ro: Sập rack là chết hết.",
        "2. <strong>Spread</strong>: Mỗi máy nằm trên 1 phần cứng tách biệt hoàn toàn. Giới hạn cứng: <strong>Tối đa 7 instances / mỗi AZ</strong>. Dùng cho các máy cực kỳ quan trọng (Critical instances).",
        "3. <strong>Partition</strong>: Chia thành các phân vùng (tối đa 7 partitions/AZ), mỗi partition là 1 rack chứa được hàng trăm máy → Dùng cho hệ thống phân tán lớn như <strong>HDFS, HBase, Cassandra, Apache Kafka</strong>."
      ],
      examTraps: [
        "Từ khóa <strong>'Low-latency network performance, High-Performance Computing (HPC), tight node-to-node communication'</strong> → <strong>Cluster Placement Group</strong>.",
        "Từ khóa <strong>'Maximize high availability, critical instances isolated on distinct hardware, small number of instances'</strong> → <strong>Spread Placement Group</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - EC2 Placement Groups",
      freeDocUrl: "https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/",
      cards: [
        { q: "Phân biệt 3 loại EC2 Placement Groups: Cluster, Spread và Partition?", a: "Cluster: Chung 1 AZ, mạng 10Gbps cực nhanh cho HPC. Spread: Khác phần cứng, tối đa 7 máy/AZ cho app tối quan trọng. Partition: Chia theo rack cho Big Data (Kafka, Hadoop, Cassandra)." },
        { q: "Chính sách tính phí đối với địa chỉ Public IPv4 và Elastic IP (EIP) trên AWS là gì?", a: "<span class=\"fact-update\" data-since=\"2024-02\">Từ 02/2024, mọi địa chỉ Public IPv4 (bao gồm EIP đang gắn vào EC2 đang chạy và EIP nhàn rỗi) đều bị tính phí $0.005/giờ.</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Miễn phí nếu gắn vào 1 máy EC2 đang chạy; chỉ tính phí khi không gắn vào máy nào hoặc gắn vào máy đang Stopped.</span>" }
      ]
    },
    {
      id: 7, phase: 1, section: "Section 6 • Bài 63 → 66",
      title: "EC2 Hibernate & Nitro",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Giống như chế độ ngủ đông (Hibernate) trên laptop Windows: Khi ứng dụng Java khởi động mất 10 phút để nạp hàng chục GB cache vào RAM, dùng EC2 Hibernate sẽ lưu toàn bộ RAM xuống ổ cứng EBS để lần sau bật máy lên là chạy tiếp ngay lập tức.",
      corePoints: [
        "<strong>EC2 Hibernate</strong>: Khi tắt máy, dữ liệu trên RAM (in-memory state) được chép xuống ổ đĩa <strong>Root EBS Volume</strong>. Khi bật lại, dữ liệu từ EBS nạp thẳng lại vào RAM giúp rút ngắn tối đa thời gian khởi động ứng dụng.",
        "<strong>Điều kiện bắt buộc để dùng Hibernate</strong>: Ổ đĩa Root EBS <strong>PHẢI ĐƯỢC MÃ HÓA (Encrypted)</strong> và phải có dung lượng trống đủ chứa toàn bộ RAM (RAM phải < 150 GB, thời gian ngủ đông tối đa 60 ngày)."
      ],
      examTraps: [
        "Đề bài mô tả: 'Một ứng dụng mất rất nhiều thời gian để khởi tạo cache trên bộ nhớ RAM mỗi khi khởi động lại. Làm sao để bật lại máy nhanh nhất?' → Chọn <strong>EC2 Hibernate</strong> (với Root EBS Volume được bật Encryption)."
      ],
      freeDocTitle: "Tutorials Dojo - EC2 Hibernation",
      freeDocUrl: "https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/",
      cards: [
        { q: "Hai điều kiện bắt buộc đối với ổ đĩa Root EBS Volume để có thể bật tính năng EC2 Hibernate là gì?", a: "Ổ Root EBS bắt buộc phải được mã hóa (Encrypted) và có đủ dung lượng trống để lưu toàn bộ dữ liệu từ RAM." }
      ]
    },
    {
      id: 8, phase: 1, section: "Section 7 • Bài 67 → 72",
      title: "EBS Volumes & EBS Snapshots",
      mode: "Xem Video",
      javaAnalogy: "EBS giống như chiếc ổ cứng rời cắm qua cáp mạng vào máy chủ EC2. Rút từ máy này cắm sang máy khác được, nhưng chỉ trong phạm vi cùng một tòa nhà Data Center (cùng 1 AZ).",
      corePoints: [
        "<strong>Giới hạn cấp độ AZ</strong>: Một ổ đĩa EBS khi tạo ở <code>us-east-1a</code> thì <strong>chỉ gắn được cho máy EC2 nằm trong <code>us-east-1a</code></strong>.",
        "<strong>EBS Snapshots</strong>: Bản sao lưu gia tăng (Incremental backup - chỉ lưu phần thay đổi) được lưu trữ ngầm trên S3. Dùng để di chuyển ổ EBS sang AZ khác hoặc Region khác.",
        "<strong>EBS Snapshot Archive</strong>: Chuyển snapshot ít dùng sang tầng lưu trữ lạnh để <strong>tiết kiệm tới 75% chi phí</strong> (nhưng mất từ 24 đến 72 giờ để khôi phục lại).",
        "<strong>Recycle Bin for EBS Snapshots</strong>: Thùng rác giúp giữ lại các snapshot bị xóa nhầm trong một khoảng thời gian từ 1 ngày đến 1 năm.",
        "<strong>Fast Snapshot Restore (FSR)</strong>: Khôi phục ổ đĩa từ snapshot với hiệu năng I/O tối đa ngay lập tức (không bị độ trễ khởi tạo ở lần đọc đầu tiên)."
      ],
      examTraps: [
        "Đề bài hỏi: 'Làm sao gắn ổ EBS đang ở AZ-a sang cho máy EC2 ở AZ-b?' → <strong>Tạo EBS Snapshot từ ổ đĩa đó, sau đó tạo EBS Volume mới từ Snapshot tại AZ-b</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon EBS Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-ebs/",
      cards: [
        { q: "Một ổ đĩa EBS tạo ở us-east-1a có thể gắn trực tiếp vào máy EC2 ở us-east-1b không? Làm cách nào để chuyển dữ liệu sang?", a: "Không thể gắn trực tiếp vì EBS bị khóa theo từng AZ. Phải chụp EBS Snapshot rồi tạo Volume mới từ Snapshot đó tại us-east-1b." },
        { q: "Tính năng nào giúp khôi phục ngay lập tức toàn bộ hiệu năng IOPS của ổ EBS được tạo từ Snapshot mà không bị trễ ở lần đọc đầu?", a: "Fast Snapshot Restore (FSR)." }
      ]
    },
    {
      id: 9, phase: 1, section: "Section 7 • Bài 73 → 77",
      title: "Các loại ổ EBS (gp3, io2, st1, sc1) & EC2 Instance Store",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Chọn ổ cứng cho server: Cần nhanh vừa rẻ thì chọn SSD gp3; chạy DB ngân hàng cần tốc độ bàn thờ thì chọn SSD io2; lưu log tuần tự giá rẻ thì chọn HDD st1; còn cần nháp dữ liệu siêu tốc xong xóa luôn thì dùng ổ cứng vật lý Instance Store.",
      corePoints: [
        "<strong>EC2 Instance Store</strong>: Ổ cứng gắn chết vào máy chủ vật lý → <strong>IOPS cực đại (hàng triệu IOPS)</strong>, nhưng <strong>MẤT DỮ LIỆU KHI STOP MÁY (Ephemeral)</strong>. Dùng cho: Bộ nhớ đệm (buffer, cache, scratch data).",
        "<strong>EBS gp3 / gp2 (General Purpose SSD)</strong>: <span class=\"fact-update\" data-since=\"2024\">Ổ <code>gp3</code> đạt tối đa <strong>80,000 IOPS</strong>, băng thông <strong>2,000 MiB/s (2,000 MB/s)</strong> và dung lượng <strong>64 TiB</strong></span> <span class=\"exam-legacy\">Đề cũ có thể ghi: gp3 tối đa 16,000 IOPS và 1,000 MB/s (gp2 vẫn giữ trần 16,000 IOPS)</span>. <code>gp3</code> rẻ hơn 20% so với gp2 và cho phép tăng IOPS/Throughput độc lập mà không cần tăng dung lượng GB.",
        "<strong>EBS io1 / io2 Block Express (Provisioned IOPS SSD)</strong>: Dành cho Database <strong>quan trọng (mission-critical)</strong> yêu cầu <span class=\"fact-update\" data-since=\"2024\"><strong>IOPS &gt; 80,000</strong> (lên tới 256,000 IOPS với io2 Block Express), độ bền <strong>99.999%</strong> (chỉ có trên <code>io2</code>, còn <code>io1</code> đạt 99.8%–99.9%)</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: yêu cầu IOPS &gt; 16,000</span>. Hỗ trợ tính năng <strong>EBS Multi-Attach</strong> (gắn 1 ổ io1/io2 cho tối đa 16 máy EC2 trong <strong>cùng 1 AZ</strong>).",
        "<strong>EBS st1 (Throughput Optimized HDD)</strong> & <strong>sc1 (Cold HDD)</strong>: Ổ đĩa cơ học giá rẻ cho Big Data, Log tuần tự (<strong>Không thể dùng làm ổ Boot chứa hệ điều hành!</strong>)."
      ],
      examTraps: [
        "Đề bài yêu cầu <strong>IOPS cực cao (&gt; 80,000 IOPS, tới 256,000 IOPS), độ bền 99.999% (sub-millisecond latency) hoặc EBS Multi-Attach</strong> <span class=\"exam-legacy\">Đề cũ có thể ghi: IOPS &gt; 16,000 (ví dụ 32,000 hoặc 50,000 IOPS)</span> → Chọn <strong>EBS io1 / io2 Block Express</strong>.",
        "Đề bài hỏi 'Tối ưu chi phí cho ổ EBS SSD hiện tại mà vẫn điều chỉnh được IOPS độc lập với dung lượng' → Chuyển từ <code>gp2</code> sang <strong><code>gp3</code></strong>.",
        "Khi dùng <strong>EBS Multi-Attach (io1/io2)</strong>, ứng dụng phải dùng hệ thống quản lý file nhận biết cụm (Cluster-aware file system như GFS2), không dùng ext4/XFS thông thường được vì sẽ hỏng dữ liệu khi ghi đè."
      ],
      freeDocTitle: "Tutorials Dojo - EBS Volume Types Comparison",
      freeDocUrl: "https://tutorialsdojo.com/amazon-ebs/",
      cards: [
        { q: "Khi nào bắt buộc phải chọn ổ đĩa EBS loại io1 / io2 Block Express thay vì gp3?", a: "Khi Database quan trọng (mission-critical) cần &gt; 80,000 IOPS (tới 256,000 IOPS), cần độ bền 99.999% (trên io2) hoặc cần tính năng EBS Multi-Attach trong cùng 1 AZ. <span class=\"exam-legacy\">Đề cũ có thể ghi: khi cần trên 16,000 IOPS.</span>" },
        { q: "Sự khác biệt lớn nhất về an toàn dữ liệu giữa EC2 Instance Store và EBS là gì?", a: "Instance Store sẽ mất sạch dữ liệu nếu máy EC2 bị Stop hoặc lỗi phần cứng vật lý; còn EBS vẫn giữ nguyên dữ liệu." }
      ]
    },
    {
      id: 10, phase: 1, section: "Section 7 • Bài 78 → 82",
      title: "Amazon EFS (Elastic File System) & So sánh Lưu trữ",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi bạn chạy 10 máy chủ EC2 phía sau Load Balancer và muốn cả 10 máy cùng đọc/ghi chung vào 1 thư mục `/var/www/uploads` (ví dụ lưu file ảnh người dùng upload lên), bạn không dùng EBS được mà phải dùng ổ đĩa mạng chia sẻ Amazon EFS.",
      corePoints: [
        "<strong>Amazon EFS</strong>: Hệ thống file mạng (Managed NFS) có thể mount đồng thời vào <strong>hàng trăm máy EC2 (hoặc ECS, Lambda) nằm rải rác trên NHIỀU AZ (Multi-AZ)</strong>.",
        "<strong>Chỉ hỗ trợ Linux (POSIX)</strong>: EFS không dùng cho máy Windows.",
        "<strong>EFS Storage Classes & Lifecycle</strong>: Có thể bật Lifecycle Policy để tự động chuyển các file không được truy cập sau $N$ ngày (ví dụ 30 ngày) sang tầng <strong>EFS Standard-IA (Infrequent Access)</strong> giúp <strong>tiết kiệm tới 90% chi phí</strong>.",
        "<strong>EFS One Zone</strong>: Rẻ hơn EFS Standard 47%, chỉ lưu trên 1 AZ (dùng cho môi trường Dev/Test)."
      ],
      examTraps: [
        "Từ khóa vàng nhận diện EFS: <strong>'Shared file storage across multiple AZs + Linux instances + POSIX-compliant + Automatically scales'</strong>.",
        "Đề bài hỏi: 'Đang dùng EFS nhưng chi phí tăng cao do có hàng triệu file cũ hiếm khi được mở lại' → Giải pháp: <strong>Bật EFS Lifecycle Management để chuyển file sang EFS Standard-IA</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon EFS Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-efs/",
      cards: [
        { q: "Cần chia sẻ một thư mục lưu trữ file chuẩn POSIX cho 50 máy chủ Linux EC2 chạy trên 3 Availability Zones khác nhau. Chọn dịch vụ nào?", a: "Amazon EFS (Elastic File System)." },
        { q: "Làm thế nào để giảm tới 90% chi phí lưu trữ trên Amazon EFS đối với các file cũ ít khi được truy cập mà không phải xóa chúng?", a: "Cấu hình EFS Lifecycle Policy để tự động chuyển các file đó sang tầng EFS Infrequent Access (EFS-IA)." }
      ]
    },

    // ================= CHẶNG 2 =================
    {
      id: 11, phase: 2, section: "Section 8 • Bài 83 → 89",
      title: "Nguyên lý Load Balancing & Application Load Balancer (ALB)",
      mode: "Xem Video",
      javaAnalogy: "ALB giống như Nginx Reverse Proxy đứng trước dàn server Spring Boot của bạn: Nó nhìn được đường dẫn URL (`/api/users` hay `/api/orders`), đọc được Cookie, Header và chia tải thông minh tới từng cụm Microservice tương ứng.",
      corePoints: [
        "<strong>Application Load Balancer (ALB)</strong> hoạt động ở <strong>Layer 7 (Application Layer - HTTP, HTTPS, WebSocket, HTTP/2, gRPC)</strong>.",
        "<strong>Routing thông minh</strong>: Chia tải tới các <em>Target Groups</em> khác nhau dựa trên: URL Path (<code>/users</code>, <code>/posts</code>), Hostname (<code>one.example.com</code>, <code>two.example.com</code>), HTTP Headers, hoặc Query Strings.",
        "<strong>Target Groups của ALB</strong> có thể là: EC2 instances, ECS tasks (Containers), hàm AWS Lambda, hoặc địa chỉ IP nội bộ.",
        "<strong>Lấy IP thật của khách hàng</strong>: Vì ALB đứng chặn ở giữa nên EC2 chỉ thấy IP nội bộ của ALB. Muốn lấy IP gốc của người dùng cuối trong code Java, hãy đọc HTTP Header <strong><code>X-Forwarded-For</code></strong> (Cổng gốc ở <code>X-Forwarded-Port</code>, Giao thức ở <code>X-Forwarded-Proto</code>)."
      ],
      examTraps: [
        "Đề bài có chữ <strong>'Microservices / Containers / Route based on URL path, Host header, Query string / Redirect HTTP to HTTPS'</strong> → Chọn ngay <strong>ALB</strong>.",
        "Đề bài hỏi: 'Web server phía sau ALB chỉ ghi log thấy IP nội bộ của ALB thay vì IP khách hàng' → Giải pháp: Cấu hình web server đọc header <strong><code>X-Forwarded-For</code></strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Elastic Load Balancing (ELB)",
      freeDocUrl: "https://tutorialsdojo.com/elastic-load-balancing/",
      cards: [
        { q: "Khi ứng dụng đứng sau Application Load Balancer (ALB), làm thế nào để lấy được địa chỉ IPv4 thật của người dùng cuối?", a: "Đọc giá trị trong HTTP Header 'X-Forwarded-For' do ALB đính kèm vào request." },
        { q: "Loại Load Balancer nào hỗ trợ định tuyến lưu lượng dựa trên đường dẫn URL (/orders, /payments) hoặc Hostname cho kiến trúc Microservices?", a: "Application Load Balancer (ALB - Layer 7)." }
      ]
    },
    {
      id: 12, phase: 2, section: "Section 8 • Bài 90 → 94",
      title: "Network Load Balancer (NLB) & Gateway Load Balancer (GWLB)",
      mode: "Xem Video",
      javaAnalogy: "Nếu ALB là nhân viên lễ tân mở từng phong bì thư (HTTP) ra đọc rồi mới chỉ đường (hơi mất thời gian), thì NLB là hệ thống băng chuyền siêu tốc chỉ nhìn địa chỉ IP/Port ngoài vỏ hộp (TCP/UDP) rồi bắn thẳng đi với tốc độ hàng triệu gói/giây!",
      corePoints: [
        "<strong>Network Load Balancer (NLB)</strong> hoạt động ở <strong>Layer 4 (Transport Layer - TCP, UDP, TLS)</strong>.",
        "<strong>Đặc điểm ăn tiền của NLB</strong>: Xử lý hàng triệu request/giây với độ trễ cực thấp (~100ms), và <strong>cấp 1 địa chỉ Static IP (Elastic IP) cố định trên mỗi AZ</strong>.",
        "<strong>Gateway Load Balancer (GWLB)</strong> hoạt động ở <strong>Layer 3 (Network Layer - IP Packets)</strong> dùng giao thức GENEVE trên cổng 6081.",
        "<strong>Mục đích duy nhất của GWLB</strong>: Đưa toàn bộ lưu lượng mạng đi qua một cụm thiết bị bảo mật ảo của bên thứ 3 (<strong>Third-party network virtual appliances</strong> như Fortinet, Palo Alto Firewall, IDS/IPS, Deep Packet Inspection) rồi mới trả lại vào hệ thống."
      ],
      examTraps: [
        "Từ khóa chọn <strong>NLB</strong>: <strong>'Extreme performance, millions of requests per second, ultra-low latency, TCP/UDP traffic, or requires a Static / Elastic IP for whitelisting'</strong>.",
        "Từ khóa chọn <strong>GWLB</strong>: <strong>'Deploy, scale, and manage a fleet of third-party virtual network appliances (Firewalls, Intrusion Detection Systems)'</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - ALB vs NLB vs GWLB",
      freeDocUrl: "https://tutorialsdojo.com/application-load-balancer-vs-network-load-balancer-vs-gateway-load-balancer/",
      cards: [
        { q: "Khách hàng đối tác yêu cầu ứng dụng của bạn phải có danh sách địa chỉ IP tĩnh cố định (Static IP / Elastic IP) để họ mở tường lửa (Whitelist), đồng thời chạy giao thức TCP hiệu năng cao. Chọn Load Balancer nào?", a: "Network Load Balancer (NLB)." },
        { q: "Khi cần điều hướng toàn bộ lưu lượng mạng đi qua một cụm máy chủ tường lửa ảo của bên thứ 3 (Third-party firewall/IDS/IPS appliances) để kiểm tra gói tin ở Layer 3, ta dùng dịch vụ gì?", a: "Gateway Load Balancer (GWLB)." }
      ]
    },
    {
      id: 13, phase: 2, section: "Section 8 • Bài 95 → 99",
      title: "Sticky Sessions, Cross-Zone LB, SSL/SNI & Connection Draining",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Connection Draining giống như thông báo 'Quầy thu ngân sắp đóng': Những khách hàng đang đứng thanh toán dở thì vẫn được tính tiền cho xong, nhưng khách mới sẽ được hướng dẫn sang quầy khác trước khi nhân viên thu ngân nghỉ ca.",
      corePoints: [
        "<strong>Sticky Sessions (Session Affinity)</strong>: Dùng Cookie để buộc mọi request của cùng 1 user luôn gửi về đúng máy EC2 ban đầu (tránh mất dữ liệu giỏ hàng lưu trên RAM của EC2 đó). Nhược điểm: Có thể làm 1 máy EC2 bị quá tải. (Giải pháp tốt hơn là lưu Session ra <strong>ElastiCache/DynamoDB</strong>).",
        "<strong>Cross-Zone Load Balancing</strong>: Giúp mỗi node Load Balancer chia đều tải sang tất cả EC2 ở mọi AZ. Trên <strong>ALB: Luôn bật mặc định và miễn phí</strong>. Trên <strong>NLB/GWLB: Tắt mặc định, nếu bật sẽ bị tính phí truyền dữ liệu liên AZ</strong>.",
        "<strong>SNI (Server Name Indication)</strong>: Giải quyết bài toán gắn <strong>nhiều chứng chỉ SSL của nhiều website khác nhau</strong> lên cùng 1 ALB hoặc NLB.",
        "<strong>Connection Draining (Deregistration Delay)</strong>: Chờ cho các request đang xử lý dở (in-flight requests) hoàn tất trước khi rút EC2 ra khỏi cụm."
      ],
      examTraps: [
        "Đề bài hỏi: 'Làm sao chạy 10 tên miền HTTPS khác nhau với 10 chứng chỉ SSL riêng biệt trên duy nhất 1 ALB để tiết kiệm tiền?' → Nhờ tính năng <strong>SNI (Server Name Indication)</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - ELB Advanced Features",
      freeDocUrl: "https://tutorialsdojo.com/elastic-load-balancing/",
      cards: [
        { q: "Tính năng nào của ALB và NLB cho phép gắn nhiều chứng chỉ bảo mật SSL/TLS cho nhiều tên miền khác nhau trên cùng một Load Balancer?", a: "SNI (Server Name Indication)." },
        { q: "Khi một máy EC2 đang chuẩn bị bị Auto Scaling tắt đi, tính năng nào trên Load Balancer giúp chờ các request đang xử lý dở hoàn tất mà không làm đứt kết nối của user?", a: "Deregistration Delay (Connection Draining)." }
      ]
    },
    {
      id: 14, phase: 2, section: "Section 8 • Bài 100 → 106",
      title: "Auto Scaling Groups (ASG) & Các chiến lược Co giãn",
      mode: "Xem Video",
      javaAnalogy: "ASG là người quản lý tự động theo dõi CPU/Request của dàn server Java: Hễ thấy CPU trung bình vượt 70% là tự động bật thêm 2 máy mới gắn vào ALB; đêm vắng khách thì tự tắt bớt máy để đỡ tốn tiền.",
      corePoints: [
        "<strong>Launch Template</strong>: Khuôn mẫu cấu hình (AMI ID, Instance Type, Security Groups, User Data, IAM Role) để ASG dùng khi đẻ máy mới. (Lưu ý: <em>Launch Configuration</em> là đồ cũ đã ngừng khuyến nghị, luôn chọn <strong>Launch Template</strong>).",
        "<strong>4 loại Scaling Policies</strong>:",
        "1. <strong>Target Tracking Scaling</strong>: Cài đặt dễ nhất (Vd: Giữ CPU trung bình luôn ở mức 40%, hoặc giữ số request/mục tiêu `RequestCountPerTarget` trên ALB ở mức 1000).",
        "2. <strong>Step Scaling</strong>: Co giãn theo từng nấc thang của CloudWatch Alarm (CPU > 70% thêm 2 máy, > 90% thêm 4 máy).",
        "3. <strong>Scheduled Scaling</strong>: Tăng/giảm máy theo lịch giờ biết trước (Vd: 9h sáng mỗi thứ Hai tăng lên 10 máy).",
        "4. <strong>Predictive Scaling</strong>: Dùng Machine Learning phân tích dữ liệu lịch sử để tự động bật máy đón đầu trước khi giờ cao điểm diễn ra.",
        "<strong>Cooldown Period vs Instance Warmup</strong>: <span class=\"fact-update\" data-since=\"2022\"><strong>Default Cooldown (mặc định 300 giây)</strong> chỉ áp dụng cho chính sách <em>Simple Scaling</em>; còn các chính sách hiện đại (<em>Target Tracking Scaling</em> và <em>Step Scaling</em>) sử dụng <strong>Default Instance Warmup</strong> (thời gian chờ máy mới khởi động xong trước khi tính chỉ số vào trung bình cụm và mở rộng tiếp)</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Cooldown 300 giây áp dụng chung sau mọi lần scaling</span>."
      ],
      examTraps: [
        "Nếu ASG phát hiện một máy EC2 bị lỗi phần cứng (Unhealthy), nó sẽ <strong>Terminate (xóa bỏ máy đó và tạo máy mới thay thế)</strong> chứ không sửa hay khởi động lại máy cũ!",
        "Đề bài hỏi: 'Lưu lượng truy cập có tính chu kỳ lặp lại hàng tuần nhưng muốn dùng AI dự báo tự động để cấp phát máy trước giờ cao điểm' → Chọn <strong>Predictive Scaling</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon EC2 Auto Scaling",
      freeDocUrl: "https://tutorialsdojo.com/amazon-ec2-auto-scaling/",
      cards: [
        { q: "Trong Auto Scaling Group, khi muốn giữ cho chỉ số CPU trung bình của toàn cụm luôn duy trì quanh mốc 50% một cách đơn giản nhất, ta chọn chính sách co giãn nào?", a: "Target Tracking Scaling Policy." },
        { q: "Khoảng thời gian mặc định 300 giây mà Auto Scaling Group tạm dừng sau một hành động Simple Scaling gọi là gì, và khác gì với Target Tracking / Step Scaling?", a: "Gọi là Default Cooldown Period (300 giây, chỉ áp dụng cho Simple Scaling). Với Target Tracking và Step Scaling, ASG dùng Default Instance Warmup để chờ máy mới khởi động xong trước khi tính metric." }
      ]
    },
    {
      id: 15, phase: 2, section: "Section 12 • Bài 135 → 145",
      title: "Amazon S3 Căn bản, Bucket Policy, Versioning & Replication",
      mode: "Xem Video + Thực hành tạo Bucket",
      javaAnalogy: "S3 không phải là ổ cứng gắn vào máy chủ, mà là một kho lưu trữ file khổng lồ qua giao thức HTTP REST API (Object Storage). Mỗi file lưu kèm một đường dẫn Key và có độ bền 11 số 9 (99.999999999%).",
      corePoints: [
        "<strong>Quy tắc S3</strong>: Tên Bucket phải là duy nhất toàn cầu (Globally Unique), tạo ở 1 Region cụ thể. Kích thước tối đa 1 file là <span class=\"fact-update\" data-since=\"2025\"><strong>50 TB</strong></span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 1 file là 5 TB</span>, nhưng một lần PUT đơn lẻ tối đa chỉ 5 GB (<strong>File &gt; 5 GB bắt buộc phải dùng Multipart Upload!</strong>).",
        "<strong>S3 Versioning</strong>: Bảo vệ chống xóa/ghi đè nhầm. Khi xóa 1 file có bật Versioning, S3 chỉ gắn thêm một <code>Delete Marker</code> lên trên; muốn khôi phục file chỉ cần xóa cái <code>Delete Marker</code> đó đi.",
        "<strong>S3 Replication</strong>: Tự động chép file bất đồng bộ sang bucket khác trong cùng Region (<strong>SRR - Same-Region Replication</strong>) hoặc khác Region (<strong>CRR - Cross-Region Replication</strong>). <strong>Bắt buộc phải bật Versioning ở cả Bucket nguồn và đích!</strong>"
      ],
      examTraps: [
        "<strong>Bẫy cực hay ra thi</strong>: Khi bạn mới bật tính năng S3 Replication (CRR/SRR), <strong>các file cũ đã có sẵn trong Bucket trước đó SẼ KHÔNG TỰ ĐỘNG ĐƯỢC SAO CHÉP!</strong> Muốn chép toàn bộ các file cũ đã tồn tại từ trước → Phải dùng tính năng <strong>S3 Batch Operations</strong>.",
        "Xóa vĩnh viễn (Permanent delete) chỉ xảy ra khi bạn xóa chỉ định rõ <code>Version ID</code> của file đó."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon S3 Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-s3/",
      cards: [
        { q: "Hai điều kiện/lưu ý sống còn khi cấu hình S3 Cross-Region Replication (CRR) là gì?", a: "1) Phải bật Versioning ở cả Bucket nguồn và đích. 2) CRR chỉ tự động chép các file mới từ lúc bật; muốn chép các file cũ đã có sẵn phải dùng S3 Batch Operations." },
        { q: "Kích thước tối đa của 1 file trên S3 là bao nhiêu, và khi file lớn hơn bao nhiêu GB thì bắt buộc phải dùng S3 Multipart Upload?", a: "<span class=\"fact-update\" data-since=\"2025\">Tối đa 50 TB cho 1 file</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 5 TB</span>. Một lệnh PUT đơn lẻ tối đa 5 GB; khi file lớn hơn 5 GB thì bắt buộc phải dùng Multipart Upload (khuyên dùng từ &gt; 100 MB)." }
      ]
    },
    {
      id: 16, phase: 2, section: "Section 14 • Bài 146 → 151 & 161 → 164",
      title: "S3 Storage Classes (Các tầng lưu trữ) & Lifecycle Rules",
      mode: "Đọc Slide + Hỏi AI (Học kỹ bảng so sánh)",
      javaAnalogy: "Giống như cất hồ sơ trong công ty: Hồ sơ dùng hàng ngày để trên mặt bàn (S3 Standard); ít dùng thì cất vào tủ trong phòng (Standard-IA); hồ sơ kiểm toán 5 năm trước thì đóng thùng gửi xuống kho ngoại thành giá siêu rẻ nhưng lấy về mất vài tiếng (Glacier).",
      corePoints: [
        "<strong>S3 Standard</strong>: Mặc định, truy cập thường xuyên, lưu trên $\\ge 3$ AZ.",
        "<strong>S3 Standard-IA (Infrequent Access)</strong>: Ít truy cập nhưng khi cần là lấy ra <strong>ngay lập tức (mili-giây)</strong>, lưu tối thiểu 30 ngày, có tính phí mỗi lần đọc file.",
        "<strong>S3 One Zone-IA</strong>: Giống Standard-IA nhưng chỉ nằm ở <strong>1 AZ duy nhất</strong> (rẻ hơn 20%, mất dữ liệu nếu AZ đó bị hủy diệt). Dùng cho: Bản sao phụ hoặc ảnh Thumbnail có thể tạo lại từ ảnh gốc.",
        "<strong>S3 Intelligent-Tiering</strong>: Tự động di chuyển file giữa các tầng nóng/lạnh dựa trên thói quen sử dụng, <strong>không tốn phí Retrieval</strong>. Dùng khi: <strong>Không biết trước hoặc tần suất truy cập thay đổi thất thường (Unknown / Unpredictable access patterns)</strong>.",
        "<strong>3 tầng S3 Glacier (Lưu trữ lạnh)</strong>:",
        "• <strong>Glacier Instant Retrieval</strong>: Lưu tối thiểu 90 ngày, lấy ra ngay trong <strong>mili-giây</strong> (rẻ hơn Standard-IA, hợp với ảnh y tế hiếm khi xem nhưng khi cấp cứu cần mở ngay).",
        "• <strong>Glacier Flexible Retrieval</strong>: Lưu tối thiểu 90 ngày. Có 3 tốc độ lấy: <em>Expedited</em> (<strong>1 – 5 phút</strong>), <em>Standard</em> (3 – 5 giờ), <em>Bulk</em> (5 – 12 giờ, miễn phí).",
        "• <strong>Glacier Deep Archive</strong>: Rẻ nhất trên AWS! Lưu tối thiểu 180 ngày. Lấy ra mất: <em>Standard</em> (<strong>12 giờ</strong>), <em>Bulk</em> (<strong>48 giờ</strong>)."
      ],
      examTraps: [
        "Đề bài nói: 'Dữ liệu có thể tái tạo dễ dàng (Easily reproducible data) + ít truy cập + tiết kiệm chi phí nhất' → <strong>S3 One Zone-IA</strong>.",
        "Đề bài nói: 'Lưu trữ hồ sơ tuân thủ pháp luật trong 7 năm, chi phí thấp nhất, chấp nhận thời gian chờ 12 tiếng khi kiểm toán' → <strong>S3 Glacier Deep Archive</strong>.",
        "Đề bài nói: 'Lưu trữ lạnh nhưng khi cần khôi phục phải lấy lại được trong vòng 5 phút' → <strong>S3 Glacier Flexible Retrieval (chế độ Expedited)</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - S3 Storage Classes Comparison",
      freeDocUrl: "https://tutorialsdojo.com/amazon-s3/",
      cards: [
        { q: "Phân biệt thời gian lấy dữ liệu (Retrieval time) của 3 tầng S3 Glacier: Instant, Flexible và Deep Archive?", a: "Glacier Instant: Mili-giây. Glacier Flexible: 1-5 phút (Expedited), 3-5h (Standard), 5-12h (Bulk). Glacier Deep Archive: 12h (Standard), 48h (Bulk)." },
        { q: "Khi đề bài nói dữ liệu trên S3 có tần suất truy cập thay đổi thất thường hoặc không dự đoán trước được (Unknown/Changing access patterns), chọn tầng lưu trữ nào?", a: "S3 Intelligent-Tiering." },
        { q: "Cần lưu trữ các file ảnh thu nhỏ (Thumbnails) ít được xem và có thể dễ dàng tạo lại từ ảnh gốc nếu mất, giải pháp tiết kiệm nhất là gì?", a: "S3 One Zone-IA." }
      ]
    },
    {
      id: 17, phase: 2, section: "Section 14 • Bài 165 → 171",
      title: "S3 Performance, Event Notifications & EventBridge",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi user ở Mỹ upload video 50GB về S3 ở Singapore, nếu đi qua mạng Internet công cộng sẽ rất chậm. S3 Transfer Acceleration cho phép file nhảy vào trạm AWS ở ngay tại Mỹ rồi đi cáp quang riêng của AWS về Singapore cực nhanh.",
      corePoints: [
        "<strong>S3 Multipart Upload</strong>: Cắt 1 file lớn thành nhiều phần nhỏ để upload song song lên S3 (tăng tốc độ và nếu rớt mạng chỉ cần gửi lại mảnh bị lỗi).",
        "<strong>S3 Transfer Acceleration</strong>: Tăng tốc độ truyền file xuyên lục địa bằng cách định tuyến qua điểm <strong>AWS Edge Location</strong> gần người dùng nhất rồi đi qua mạng trục (Backbone network) của AWS.",
        "<strong>S3 Byte-Range Fetches</strong>: Tải song song từng dải byte của file về, hoặc chỉ tải 100 byte đầu tiên để đọc phần Header của file.",
        "<strong>S3 Event Notifications vs Amazon EventBridge</strong>: S3 Event cơ bản gửi sự kiện tới SNS, SQS hoặc Lambda. Nếu cần <strong>lọc nâng cao theo nội dung JSON, kích thước file, hoặc gửi sự kiện tới hơn 18 dịch vụ AWS (Step Functions, Kinesis, ECS...) và tính năng Replay</strong> → Bật tích hợp <strong>S3 với Amazon EventBridge</strong>."
      ],
      examTraps: [
        "S3 hiện tại tự động chịu tải được <strong>3,500 lệnh PUT/COPY/POST/DELETE và 5,500 lệnh GET/HEAD mỗi giây trên mỗi Prefix (thư mục)</strong>. Muốn đạt 55,000 GET/s chỉ cần chia đều file vào 10 thư mục (prefixes) khác nhau!"
      ],
      freeDocTitle: "Tutorials Dojo - S3 Performance & Event Notifications",
      freeDocUrl: "https://tutorialsdojo.com/amazon-s3/",
      cards: [
        { q: "Người dùng toàn cầu cần upload các file video dung lượng 20 GB về một S3 Bucket duy nhất đặt tại Tokyo với tốc độ nhanh nhất. Nên kết hợp 2 tính năng nào?", a: "S3 Multipart Upload + S3 Transfer Acceleration." },
        { q: "Một S3 Bucket hỗ trợ tối đa bao nhiêu request Đọc (GET) và Ghi (PUT) mỗi giây trên mỗi Prefix?", a: "3,500 PUT/s và 5,500 GET/s trên mỗi Prefix." }
      ]
    },
    {
      id: 18, phase: 2, section: "Section 15 • Bài 172 → 178",
      title: "S3 Security: 4 Cơ chế Mã hóa (Encryption) & Presigned URLs",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "`S3 Presigned URL` là kỹ thuật cực kỳ phổ biến trong dự án Java thực tế: Thay vì cho user upload file 1GB đi xuyên qua server Spring Boot làm treo RAM của server, backend Java chỉ sinh ra 1 đường link có chữ ký số sống trong 15 phút để trình duyệt của user tự bắn file thẳng lên S3!",
      corePoints: [
        "<strong>4 phương pháp mã hóa dữ liệu trên S3</strong>:",
        "1. <strong>SSE-S3</strong>: AWS tự quản lý cả dữ liệu lẫn khóa mã hóa (AES-256). Đã được <strong>bật mặc định cho mọi bucket mới</strong>.",
        "2. <strong>SSE-KMS</strong>: Dùng dịch vụ AWS KMS để quản lý khóa → Cho phép bạn <strong>kiểm soát quyền ai được dùng khóa, tự động xoay vòng khóa (Key Rotation), và kiểm toán mọi lệnh giải mã qua CloudTrail</strong>.",
        "3. <strong>SSE-C (Customer-Provided Keys)</strong>: Khách hàng tự giữ khóa ở ngoài và phải gửi kèm khóa trong Header của mọi request HTTPS lên S3.",
        "4. <strong>Client-Side Encryption</strong>: Ứng dụng Java tự mã hóa file trước khi upload lên S3.",
        "<strong>S3 Presigned URLs</strong>: Cấp quyền tạm thời (Download hoặc Upload) một file Private trên S3 cho người dùng không có tài khoản AWS."
      ],
      examTraps: [
        "Nếu dùng <strong>SSE-KMS</strong> cho bucket có hàng chục nghìn request/giây, bạn có thể gặp lỗi <code>ThrottlingException</code> do chạm trần hạn mức gọi KMS API → Giải pháp: Bật <strong>S3 Bucket Keys</strong> để giảm 99% số lượt gọi sang KMS!",
        "Khi một IAM User tải file được mã hóa bằng <strong>SSE-KMS</strong>, User đó phải có <strong>CẢ 2 QUYỀN</strong>: Quyền <code>s3:GetObject</code> trên Bucket VÀ quyền <code>kms:Decrypt</code> trên khóa KMS!"
      ],
      freeDocTitle: "Tutorials Dojo - S3 Encryption & Presigned URLs",
      freeDocUrl: "https://tutorialsdojo.com/amazon-s3/",
      cards: [
        { q: "Khi một người dùng đã được cấp quyền s3:GetObject đầy đủ nhưng vẫn bị báo lỗi Access Denied khi tải một file mã hóa bằng SSE-KMS, nguyên nhân là gì?", a: "Người dùng đó chưa được cấp quyền kms:Decrypt trong Key Policy của khóa AWS KMS dùng để mã hóa file đó." },
        { q: "Làm thế nào để cho phép người dùng cuối upload file dung lượng lớn trực tiếp lên một Private S3 Bucket mà không làm tốn băng thông của máy chủ EC2?", a: "Sinh ra một S3 Presigned URL từ backend để trình duyệt người dùng upload trực tiếp lên S3." }
      ]
    },
    {
      id: 19, phase: 2, section: "Section 15 • Bài 179 → 186",
      title: "S3 Object Lock (WORM), CORS, MFA Delete & Access Points",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "S3 Object Lock giống như việc khắc dữ liệu lên đĩa đá (Write Once Read Many - WORM): Một khi đã ghi vào là khóa cứng, ngay cả giám đốc công ty hay hacker chiếm được quyền Admin/Root cũng không thể xóa hay sửa file đó trước thời hạn!",
      corePoints: [
        "<strong>S3 Object Lock (Yêu cầu phải bật Versioning trước)</strong>:",
        "• <strong>Compliance Mode</strong>: Nghiêm ngặt nhất. <strong>KHÔNG AI (kể cả Root Account)</strong> có thể xóa, sửa file hoặc rút ngắn thời gian giữ file cho đến khi hết hạn.",
        "• <strong>Governance Mode</strong>: Bảo vệ file khỏi user thường, nhưng Admin có quyền đặc biệt (<code>s3:BypassGovernanceRetention</code>) thì có thể xóa hoặc chỉnh sửa thời hạn.",
        "• <strong>Legal Hold</strong>: Khóa file vô thời hạn để phục vụ điều tra pháp lý cho đến khi người có thẩm quyền gỡ cờ Legal Hold.",
        "<strong>Glacier Vault Lock</strong>: Khóa chính sách WORM vĩnh viễn trên S3 Glacier bằng một <em>Vault Lock Policy</em> (sau 24 giờ xác nhận là không ai sửa được nữa).",
        "<strong>S3 Access Points</strong>: Tạo hàng chục cổng truy cập riêng biệt (mỗi cổng có DNS và Policy riêng cho từng phòng ban Finance, Marketing...) trỏ vào chung 1 Bucket lớn để tránh việc file Bucket Policy trở nên quá dài và rối."
      ],
      examTraps: [
        "Đề bài có chữ <strong>'WORM (Write Once Read Many) + No user, including the root account, can delete or modify objects during the retention period'</strong> → Chọn <strong>S3 Object Lock ở chế độ Compliance Mode</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - S3 Object Lock & Security",
      freeDocUrl: "https://tutorialsdojo.com/amazon-s3/",
      cards: [
        { q: "Phân biệt S3 Object Lock ở chế độ Compliance Mode và Governance Mode?", a: "Compliance Mode: Không ai (kể cả Root user) có thể xóa/sửa trước hạn. Governance Mode: Admin có quyền đặc biệt (BypassGovernanceRetention) vẫn có thể mở khóa." },
        { q: "Khi một S3 Bucket dùng làm Data Lake chung cho hàng chục phòng ban khiến Bucket Policy quá phức tạp và chạm giới hạn kích thước 20KB, giải pháp là gì?", a: "Sử dụng S3 Access Points (tạo Access Point riêng với policy riêng cho từng phòng ban/ứng dụng)." }
      ]
    },

    // ================= CHẶNG 3 =================
    {
      id: 20, phase: 3, section: "Section 9 • Bài 107 → 113",
      title: "Amazon RDS: Read Replicas vs Multi-AZ",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Với Java Dev, đây là MySQL/PostgreSQL/Oracle được AWS quản lý sẵn. Nhưng trong đề thi, 90% câu hỏi về RDS sẽ xoáy vào việc bạn có phân biệt được khi nào dùng Read Replicas và khi nào dùng Multi-AZ hay không!",
      corePoints: [
        "<strong>RDS Multi-AZ (Mục đích: High Availability / Chịu lỗi)</strong>:",
        "• Sao chép dữ liệu <strong>ĐỒNG BỘ (Synchronous)</strong> từ máy chính (Primary) sang máy dự phòng (Standby) ở AZ khác.",
        "• Máy Standby <strong>KHÔNG THỂ DÙNG ĐỂ ĐỌC DỮ LIỆU</strong> (nó chỉ nằm chờ, khi máy chính chết thì tự động nhảy lên thay thế trong ~60-120s với cùng 1 chuỗi kết nối DNS).",
        "<strong>RDS Read Replicas (Mục đích: Tăng hiệu năng Đọc / Scalability)</strong>:",
        "• Tạo tối đa <strong>15 bản sao chỉ đọc</strong>, sao chép <strong>BẤT ĐỒNG BỘ (Asynchronous)</strong>.",
        "• Dùng để tách các tác vụ chạy báo cáo nặng (BI/Reporting queries) ra khỏi DB chính để không làm đơ ứng dụng giao dịch chính. Phải sửa code ứng dụng trỏ câu lệnh <code>SELECT</code> sang chuỗi kết nối của Read Replica.",
        "• <em>RDS Multi-AZ DB Cluster</em> (chế độ mới có 1 Primary + 2 Readable Standbys): Vừa HA vừa cho phép đọc trên 2 máy Standby nhưng độ trễ đọc có thể hơi trễ nhẹ."
      ],
      examTraps: [
        "Đề bài nói: 'Đội ngũ phân tích dữ liệu chạy báo cáo cuối ngày làm chậm hệ thống đặt hàng trên RDS' → Chọn <strong>Tạo RDS Read Replica</strong> và trỏ công cụ báo cáo vào đó (KHÔNG chọn Multi-AZ vì Multi-AZ không giảm tải đọc!).",
        "Đề bài nói: 'Cần đảm bảo cơ sở dữ liệu tự động chuyển đổi dự phòng mà không mất dữ liệu nếu 1 AZ gặp sự cố mất điện' → Chọn <strong>RDS Multi-AZ</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon RDS Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-relational-database-service-amazon-rds/",
      cards: [
        { q: "Phân biệt RDS Multi-AZ và RDS Read Replicas về cơ chế sao chép (Synchronous/Asynchronous) và mục đích sử dụng?", a: "Multi-AZ: Sao chép ĐỒNG BỘ (Synchronous), chỉ để dự phòng HA/Failover, không dùng để đọc. Read Replicas: Sao chép BẤT ĐỒNG BỘ (Asynchronous), dùng để chia tải cho các truy vấn Đọc (SELECT/Reporting)." },
        { q: "Khi tạo RDS Read Replica ở một Availability Zone khác nhưng nằm trong CÙNG một Region, bạn có bị tính phí truyền dữ liệu sao chép (Replication data transfer fee) không?", a: "Không. Truyền dữ liệu để tạo Read Replica giữa các AZ trong cùng 1 Region được AWS miễn phí (chỉ tính phí nếu Cross-Region)." }
      ]
    },
    {
      id: 21, phase: 3, section: "Section 9 • Bài 114 → 120",
      title: "RDS Proxy, RDS Custom & Amazon Aurora Toàn tập",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Trong Spring Boot bạn dùng HikariCP để quản lý Connection Pool. Nhưng khi dùng Serverless (AWS Lambda), mỗi request đẻ ra 1 hàm Lambda riêng khiến HikariCP vô tác dụng và làm nổ kết nối DB! `RDS Proxy` chính là HikariCP nằm ở tầng hạ tầng AWS đứng trước DB của bạn.",
      corePoints: [
        "<strong>Amazon RDS Proxy</strong>: Gom và tái sử dụng các kết nối DB (Connection Pooling), giảm áp lực CPU/RAM cho DB khi có hàng nghìn hàm <strong>AWS Lambda</strong> gọi vào cùng lúc; giảm thời gian Failover đi 66% và bắt buộc xác thực qua IAM/Secrets Manager.",
        "<strong>RDS Custom (cho Oracle & SQL Server)</strong>: Cho phép Admin quyền <strong>SSH/RDP trực tiếp vào hệ điều hành bên dưới</strong> để cài đặt các bản vá hoặc phần mềm bên thứ 3 mà RDS thường khóa lại.",
        "<strong>Amazon Aurora</strong>: Đứa con cưng của AWS (tương thích MySQL & PostgreSQL). Tự động lưu <strong>6 bản sao dữ liệu trên 3 AZ</strong>, tự chữa lành ổ đĩa lỗi, hỗ trợ tối đa 15 Read Replicas qua 1 <em>Reader Endpoint</em> tự cân bằng tải.",
        "<strong>Aurora Serverless v2</strong>: Tự động co giãn năng lực tính toán theo từng giây → Hoàn hảo cho <strong>tải thất thường, không dự đoán được (Unpredictable / Intermittent workloads)</strong>.",
        "<strong>Aurora Global Database</strong>: Sao chép sang <span class=\"fact-update\" data-since=\"2024\">tối đa 10 Regions phụ</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 5 Regions phụ</span> với độ trễ <strong>dưới 1 giây</strong>; phục hồi thảm họa toàn Region trong <strong>dưới 1 phút</strong>."
      ],
      examTraps: [
        "Đề bài có chữ <strong>'Lambda functions exhausting database connections / Too many connections error on RDS'</strong> → Chọn ngay <strong>RDS Proxy</strong>.",
        "Đề bài có chữ <strong>'Need OS-level access / sysadmin access on managed Oracle or SQL Server'</strong> → Chọn <strong>Amazon RDS Custom</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon Aurora Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-aurora/",
      cards: [
        { q: "Khi hàng trăm hàm AWS Lambda đồng thời mở kết nối mới vào cơ sở dữ liệu RDS gây quá tải kết nối, dịch vụ nào giải quyết triệt để vấn đề này?", a: "Amazon RDS Proxy (Quản lý Connection Pooling tập trung)." },
        { q: "Khi nào nên chọn Amazon RDS Custom thay vì Amazon RDS thông thường hoặc tự cài DB trên EC2?", a: "Khi sử dụng Oracle hoặc Microsoft SQL Server muốn được AWS quản lý tự động nhưng vẫn bắt buộc phải có quyền truy cập vào Hệ điều hành (OS/root access) để tùy chỉnh sâu." }
      ]
    },
    {
      id: 22, phase: 3, section: "Section 9 • Bài 121 → 125",
      title: "Amazon ElastiCache (Redis vs Memcached) & Chiến lược Caching",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Bạn đã quen dùng Redis trong Java để cache dữ liệu hoặc lưu Session. Trong đề thi SAA-C03, bạn chỉ cần nắm rõ bảng đối đầu giữa ElastiCache for Redis và ElastiCache for Memcached.",
      corePoints: [
        "<strong>Công dụng chính của ElastiCache</strong>: Giảm tải đọc cho RDS (Cache DB queries) và <strong>lưu trữ User Session tập trung</strong> để biến các máy chủ EC2 thành Stateless.",
        "<strong>ElastiCache for Redis</strong>: Có đầy đủ <strong>Multi-AZ với Auto-Failover</strong>, Read Replicas, lưu trữ bền vững xuống đĩa (AOF Persistence), Backup/Restore, hỗ trợ kiểu dữ liệu phức tạp như <strong>Sorted Sets (Bảng xếp hạng Game - Gaming Leaderboards)</strong>, hỗ trợ xác thực bằng <code>Redis Auth</code>.",
        "<strong>ElastiCache for Memcached</strong>: Bộ nhớ đệm phân tán đa luồng (Multi-threaded) thuần túy, <strong>KHÔNG có Multi-AZ failover, KHÔNG có sao lưu, mất điện là mất sạch dữ liệu</strong>.",
        "<strong>Amazon MemoryDB for Redis</strong>: Biến thể của Redis nhưng có nhật ký giao dịch bền vững đa AZ (Multi-AZ transactional log) → Dùng làm <strong>Database chính</strong> chứ không chỉ là bộ nhớ đệm."
      ],
      examTraps: [
        "Đề bài có chữ <strong>'In-memory cache + High Availability (Multi-AZ) / Auto-failover / Backup / Gaming Leaderboards (Sorted Sets)'</strong> → Luôn chọn <strong>ElastiCache for Redis</strong>.",
        "Đề bài có chữ <strong>'Simple distributed multi-threaded cache, data loss is acceptable'</strong> → Chọn <strong>ElastiCache for Memcached</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon ElastiCache Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-elasticache/",
      cards: [
        { q: "Cần triển khai bộ nhớ đệm In-memory có hỗ trợ Multi-AZ Auto-Failover, sao lưu dữ liệu và làm bảng xếp hạng thời gian thực (Sorted Sets). Chọn Redis hay Memcached?", a: "Amazon ElastiCache for Redis." }
      ]
    },
    {
      id: 23, phase: 3, section: "Section 20 • Bài 243 → 249",
      title: "Amazon DynamoDB: Căn bản, Capacity Modes & DAX",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "DynamoDB là NoSQL dạng Key-Value/JSON siêu tốc của AWS. Điểm tuyệt vời nhất là nó hoàn toàn Serverless (không cần tạo server, không cần chọn dung lượng ổ cứng, tự động sao lưu trên 3 AZ).",
      corePoints: [
        "<strong>2 chế độ tính phí (Capacity Modes)</strong>:",
        "1. <strong>Provisioned Mode</strong>: Khai báo trước số lượng đọc/ghi mỗi giây (RCU & WCU), có thể bật Auto Scaling. Rẻ hơn nếu lưu lượng truy cập ổn định, dự đoán được.",
        "2. <strong>On-Demand Mode</strong>: Tự động co giãn tức thì, trả tiền theo từng request thực tế (Pay-per-request). Hoàn hảo cho <strong>ứng dụng mới ra mắt chưa rõ tải hoặc tải tăng đột biến gấp hàng chục lần không báo trước (Spiky / Unpredictable workloads)</strong>.",
        "<strong>DynamoDB Accelerator (DAX)</strong>: Cụm bộ nhớ đệm In-memory tích hợp sẵn cho DynamoDB, giảm độ trễ đọc từ mili-giây xuống <strong>micro-giây (Microseconds)</strong>. Giải quyết triệt để lỗi <strong>Hot Key (1 dòng dữ liệu bị đọc quá nhiều lần)</strong> mà không cần viết lại code."
      ],
      examTraps: [
        "<strong>Bẫy phân biệt DAX vs ElastiCache</strong>: Nếu đề bài nói cần giảm tải đọc trực tiếp cho DynamoDB với độ trễ micro-giây mà không muốn sửa code logic → Chọn <strong>DAX</strong>. Nếu cần lưu kết quả tính toán phức tạp đã tổng hợp từ nhiều dịch vụ khác nhau → Chọn <strong>ElastiCache</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon DynamoDB Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-dynamodb/",
      cards: [
        { q: "Một bảng DynamoDB gặp lỗi ProvisionedThroughputExceededException do một vài sản phẩm hot bị đọc hàng trăm nghìn lần/giây. Giải pháp khắc phục nhanh nhất mà không cần sửa code ứng dụng là gì?", a: "Bật DynamoDB Accelerator (DAX) đứng trước bảng DynamoDB." },
        { q: "Khi nào nên chọn DynamoDB On-Demand Capacity Mode thay vì Provisioned Mode?", a: "Khi ứng dụng có lưu lượng truy cập không thể dự đoán trước, tải thấp nhưng thỉnh thoảng tăng vọt đột ngột (Spiky/Unpredictable workloads)." }
      ]
    },
    {
      id: 24, phase: 3, section: "Section 20 • Bài 250 → 253",
      title: "DynamoDB Nâng cao: Streams, Global Tables & TTL",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "`DynamoDB Streams` giống như Database Trigger nhưng chạy bất đồng bộ: Hễ có dòng nào vừa được Insert/Update/Delete trong bảng là nó bắn sự kiện ra cho hàm AWS Lambda xử lý tiếp.",
      corePoints: [
        "<strong>DynamoDB Streams</strong>: Ghi lại luồng sự kiện thay đổi cấp độ từng dòng (Item-level modifications) trong vòng 24 giờ. Thường dùng để kích hoạt <strong>AWS Lambda</strong> (vd: gửi thông báo, đồng bộ dữ liệu sang OpenSearch).",
        "<strong>DynamoDB Global Tables</strong>: Cho phép bảng DynamoDB vừa Đọc vừa Ghi (<strong>Active-Active</strong>) ở nhiều Region trên toàn cầu với độ trễ cực thấp (Yêu cầu bắt buộc phải bật <em>DynamoDB Streams</em>).",
        "<strong>DynamoDB TTL (Time To Live)</strong>: Đặt một cột chứa mốc thời gian hết hạn (Epoch timestamp). Khi quá hạn, DynamoDB tự động xóa dòng đó trong vòng 48h mà <strong>HOÀN TOÀN MIỄN PHÍ (không tốn WCU)</strong>."
      ],
      examTraps: [
        "Đề bài hỏi: 'Làm sao xóa hàng triệu dòng dữ liệu phiên đăng nhập cũ quá 30 ngày trong DynamoDB một cách tiết kiệm chi phí nhất?' → Bật <strong>DynamoDB TTL (Time To Live)</strong>.",
        "Đề bài hỏi: 'Ứng dụng toàn cầu dùng DynamoDB cần kiến trúc Active-Active Multi-Region với độ trễ đọc và ghi một chữ số mili-giây tại mỗi khu vực' → Chọn <strong>DynamoDB Global Tables</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - DynamoDB Streams & Global Tables",
      freeDocUrl: "https://tutorialsdojo.com/amazon-dynamodb/",
      cards: [
        { q: "Tính năng nào của DynamoDB giúp tự động xóa các bản ghi đã hết hạn mà không tiêu tốn đơn vị ghi (WCU)?", a: "DynamoDB TTL (Time To Live)." },
        { q: "Để thiết lập cơ sở dữ liệu NoSQL đa vùng Active-Active (đọc và ghi cục bộ ở nhiều Region) trên AWS, ta dùng tính năng gì?", a: "DynamoDB Global Tables (yêu cầu bật DynamoDB Streams)." }
      ]
    },
    {
      id: 25, phase: 3, section: "Section 21 • Bài 259 → 268",
      title: "Các hệ Database chuyên biệt trên AWS (Redshift, DocumentDB, Neptune...)",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Không dùng một cái búa cho mọi việc: Lưu quan hệ bạn bè mạng xã hội thì dùng Graph DB (Neptune), lưu JSON giống MongoDB thì dùng DocumentDB, còn chạy báo cáo OLAP hàng tỷ dòng thì dùng Redshift.",
      corePoints: [
        "<strong>Amazon Redshift</strong>: Kho dữ liệu phân tích (<strong>Columnar Data Warehouse - OLAP</strong>) cho hàng Petabyte dữ liệu. Tính năng <strong>Redshift Spectrum</strong> cho phép chạy truy vấn SQL trực tiếp trên các file lưu trong S3 mà không cần nạp vào Redshift.",
        "<strong>Amazon DocumentDB</strong>: Dịch vụ quản lý tương thích hoàn toàn với <strong>MongoDB</strong>.",
        "<strong>Amazon Neptune</strong>: Cơ sở dữ liệu đồ thị (<strong>Graph Database</strong>) dùng cho mạng xã hội, gợi ý sản phẩm, phát hiện vòng lặp rửa tiền/gian lận.",
        "<strong>Amazon Timestream</strong>: Cơ sở dữ liệu chuỗi thời gian (<strong>Time-series DB</strong>) chuyên thu thập dữ liệu cảm biến IoT, DevOps metrics.",
        "<strong>Amazon Keyspaces</strong>: Tương thích với <strong>Apache Cassandra</strong> (Serverless)."
      ],
      examTraps: [
        "Thấy chữ <strong>MongoDB</strong> → Chọn <strong>DocumentDB</strong>. Thấy chữ <strong>Cassandra</strong> → Chọn <strong>Keyspaces</strong>. Thấy chữ <strong>Graph / Social network / Fraud relationship</strong> → Chọn <strong>Neptune</strong>. Thấy chữ <strong>Petabyte-scale OLAP Data Warehouse</strong> → Chọn <strong>Redshift</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - AWS Database Services Comparison",
      freeDocUrl: "https://tutorialsdojo.com/comparison-of-aws-services/",
      cards: [
        { q: "Ghép cặp nhanh: MongoDB, Cassandra, Graph DB và Time-series DB tương ứng với 4 dịch vụ nào trên AWS?", a: "MongoDB -> DocumentDB; Cassandra -> Keyspaces; Graph DB -> Neptune; Time-series -> Timestream." }
      ]
    },
    {
      id: 26, phase: 3, section: "Section 10 • Bài 126 → 131",
      title: "Amazon Route 53: CNAME vs Alias & Health Checks",
      mode: "Xem Video",
      javaAnalogy: "Route 53 là tổng đài phân giải tên miền (DNS) của AWS. Điểm đặc biệt nhất bạn phải nhớ là sự khác nhau giữa bản ghi CNAME chuẩn quốc tế và bản ghi Alias độc quyền của AWS.",
      corePoints: [
        "<strong>CNAME Record</strong>: Trỏ một tên miền phụ (vd: <code>app.example.com</code>) sang một tên miền khác. <strong>KHÔNG ĐƯỢC PHÉP dùng cho tên miền gốc (Root domain / Zone Apex như <code>example.com</code>)</strong> và bị tính phí cho mỗi lượt truy vấn DNS.",
        "<strong>Alias Record (Độc quyền của Route 53)</strong>: Trỏ tên miền thẳng tới các tài nguyên AWS (ALB, NLB, CloudFront, S3 Website, API Gateway...). <strong>Dùng được cho cả tên miền gốc (<code>example.com</code>)</strong>, tự động cập nhật khi IP của Load Balancer thay đổi, và <strong>HOÀN TOÀN MIỄN PHÍ truy vấn!</strong>"
      ],
      examTraps: [
        "Đề bài hỏi: 'Muốn trỏ tên miền gốc (Zone Apex `company.com`) vào một Application Load Balancer hoặc CloudFront với chi phí thấp nhất' → Luôn chọn <strong>Route 53 Alias Record</strong> (Loại ngay đáp án chọn CNAME hoặc A Record tĩnh!)."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon Route 53 Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-route-53/",
      cards: [
        { q: "Tại sao khi trỏ tên miền gốc (Zone Apex như example.com) vào Application Load Balancer thì bắt buộc phải dùng Route 53 Alias Record thay vì CNAME?", a: "Vì chuẩn DNS không cho phép tạo CNAME ở tên miền gốc (Zone Apex). Hơn nữa Alias Record trỏ tới ALB được miễn phí truy vấn và tự động theo dõi sự thay đổi IP của ALB." }
      ]
    },
    {
      id: 27, phase: 3, section: "Section 10 • Bài 132 → 134",
      title: "8 Chính sách Điều hướng (Routing Policies) của Route 53",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi người dùng gõ tên miền web của bạn, Route 53 có <span class=\"fact-update\" data-since=\"2022\">8 cách thông minh (bao gồm cả IP-based Routing)</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: 7 chính sách</span> để quyết định xem nên trả về địa chỉ IP của server ở Singapore, ở Mỹ hay ở Châu Âu.",
      corePoints: [
        "1. <strong>Simple Routing</strong>: Trả về 1 hoặc nhiều IP ngẫu nhiên, không gắn được Health Check.",
        "2. <strong>Weighted Routing</strong>: Chia lưu lượng theo trọng số % (Vd: Gửi 10% user sang server phiên bản mới để test <strong>Canary / Blue-Green Deployment</strong>, 90% giữ ở bản cũ).",
        "3. <strong>Latency-based Routing</strong>: Chuyển người dùng về Region nào cho <strong>độ trễ mạng thấp nhất (nhanh nhất)</strong>.",
        "4. <strong>Failover Routing (Active-Passive)</strong>: Bình thường 100% vào cụm Primary; nếu Primary chết (Health Check báo đỏ) thì tự động bẻ lái sang cụm Secondary (DR site hoặc trang báo lỗi tĩnh trên S3).",
        "5. <strong>Geolocation Routing</strong>: Điều hướng theo <strong>quốc gia/châu lục của người dùng</strong> (Vd: Khách từ Đức vào hiện giao diện tiếng Đức và tuân thủ luật GDPR; khách từ nước không hỗ trợ thì chặn).",
        "6. <strong>Geoproximity Routing</strong>: Điều hướng theo khoảng cách địa lý nhưng có hệ số <strong><code>Bias</code></strong> (từ -99 đến +99) để phóng to hoặc thu nhỏ bán kính hút lưu lượng của một Region.",
        "7. <strong>Multi-Value Answer</strong>: Giống Simple nhưng có kiểm tra Health Check để chỉ trả về các IP đang sống."
      ],
      examTraps: [
        "Phân biệt kỹ: Đề bài nhắc tới <strong>'Quốc gia / Ngôn ngữ bản địa / Chặn truy cập theo lãnh thổ (Compliance/Data residency)'</strong> → Chọn <strong>Geolocation</strong>. Đề bài nhắc tới <strong>'Tăng/giảm vùng phủ lưu lượng giữa 2 Region gần nhau bằng hệ số Bias'</strong> → Chọn <strong>Geoproximity</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Route 53 Routing Policies",
      freeDocUrl: "https://tutorialsdojo.com/amazon-route-53/",
      cards: [
        { q: "Phân biệt khi nào dùng Route 53 Geolocation Routing và khi nào dùng Geoproximity Routing?", a: "Geolocation: Dựa theo biên giới Quốc gia/Châu lục (phục vụ ngôn ngữ, bản quyền, luật pháp). Geoproximity: Dựa theo khoảng cách địa lý và dùng hệ số Bias để mở rộng/thu hẹp lượng traffic đổ về từng Region." },
        { q: "Chính sách điều hướng nào của Route 53 phù hợp nhất cho mô hình Disaster Recovery kiểu Active-Passive?", a: "Failover Routing Policy (kết hợp với Route 53 Health Check)." }
      ]
    },
    {
      id: 28, phase: 3, section: "Section 16 • Bài 187 → 196",
      title: "Amazon CloudFront (CDN) vs AWS Global Accelerator",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "CloudFront và Global Accelerator đều giúp người dùng toàn cầu truy cập nhanh hơn, nhưng bản chất hoàn toàn khác nhau: CloudFront lưu bản sao (Cache) file ảnh/web ở trạm gần khách hàng; còn Global Accelerator là đường cao tốc VIP đưa khách chạy thẳng về server gốc qua cáp quang riêng của AWS!",
      corePoints: [
        "<strong>Amazon CloudFront (CDN)</strong>:",
        "• Lưu <strong>Cache</strong> nội dung tĩnh/động tại hơn 400 điểm Edge Locations. Giảm tải trực tiếp cho S3/ALB.",
        "• Khi dùng S3 làm nguồn (Origin): Bắt buộc dùng <strong><code>OAC (Origin Access Control)</code></strong> (hoặc OAI cũ) kèm Bucket Policy để chặn người dùng vào thẳng S3, buộc phải đi qua CloudFront.",
        "• <strong>Signed URL</strong> (cấp quyền truy cập 1 file lẻ) vs <strong>Signed Cookies</strong> (cấp quyền truy cập nhiều file).",
        "• <strong>Lambda@Edge / CloudFront Functions</strong>: Chạy code nhẹ ngay tại trạm Edge để sửa Header, kiểm tra JWT token trước khi chạm tới server gốc.",
        "<strong>AWS Global Accelerator</strong>:",
        "• <strong>KHÔNG LƯU CACHE!</strong> Nó cấp cho bạn <strong>2 địa chỉ Anycast Static IP cố định toàn cầu</strong>.",
        "• Dùng cho giao thức <strong>TCP / UDP, Gaming, VoIP, IoT</strong>, hoặc ứng dụng HTTP cần <strong>IP tĩnh toàn cầu để khách hàng Whitelist</strong> và tự động Failover giữa các Region trong < 1 phút."
      ],
      examTraps: [
        "Đề bài nói: 'Ứng dụng Gaming / UDP / Non-HTTP cần giảm độ trễ toàn cầu và giữ nguyên 2 địa chỉ IP tĩnh cố định' → Chọn <strong>AWS Global Accelerator</strong> (KHÔNG chọn CloudFront vì CloudFront chỉ hỗ trợ HTTP/HTTPS và không cấp Static IP cố định!)."
      ],
      freeDocTitle: "Tutorials Dojo - CloudFront vs Global Accelerator",
      freeDocUrl: "https://tutorialsdojo.com/aws-global-accelerator-vs-amazon-cloudfront/",
      cards: [
        { q: "So sánh điểm khác biệt cốt lõi nhất giữa Amazon CloudFront và AWS Global Accelerator?", a: "CloudFront lưu Cache nội dung HTTP/HTTPS tại Edge. Global Accelerator KHÔNG lưu cache mà cấp 2 Anycast Static IP để định tuyến mọi giao thức (TCP/UDP/HTTP) qua mạng cáp quang nội bộ của AWS về thẳng server." },
        { q: "Làm thế nào để khóa một S3 Bucket chỉ cho phép người dùng tải file thông qua CloudFront chứ không thể truy cập trực tiếp bằng link S3?", a: "Cấu hình Origin Access Control (OAC) trên CloudFront và cập nhật S3 Bucket Policy chỉ cho phép CloudFront đọc." }
      ]
    },

    // ================= CHẶNG 4 =================
    {
      id: 29, phase: 4, section: "Section 17 • Bài 197 → 202",
      title: "Amazon FSx: 4 Hệ thống File Chuyên dụng (Windows, Lustre, NetApp, OpenZFS)",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Ở Chặng 1 bạn đã biết EFS dùng để chia sẻ file cho máy Linux. Vậy nếu công ty chạy máy chủ Windows cần ổ mạng chung chuẩn SMB, hoặc chạy siêu máy tính AI cần tốc độ đọc file hàng trăm GB/s thì sao? Đó là lúc dùng dòng họ Amazon FSx!",
      corePoints: [
        "<strong>1. Amazon FSx for Windows File Server</strong>: Ổ đĩa mạng chia sẻ dành riêng cho <strong>Windows</strong>, dùng giao thức <strong>SMB & NTFS</strong>, tích hợp sẵn với <strong>Microsoft Active Directory (AD)</strong>, hỗ trợ Multi-AZ.",
        "<strong>2. Amazon FSx for Lustre</strong>: Từ ghép của <em>Linux + Cluster</em>. Dành cho bài toán <strong>Tính toán hiệu năng cao (HPC - High Performance Computing), Machine Learning, xử lý Video lớn</strong>. Đạt tốc độ hàng trăm GB/s, hàng triệu IOPS và tích hợp đồng bộ 2 chiều trực tiếp với <strong>Amazon S3</strong>.",
        "<strong>3. Amazon FSx for NetApp ONTAP</strong>: Tương thích hệ thống NetApp (hỗ trợ đa giao thức NFS, SMB, iSCSI).",
        "<strong>4. Amazon FSx for OpenZFS</strong>: Dành cho việc di chuyển các máy chủ file ZFS lên AWS."
      ],
      examTraps: [
        "Thấy chữ <strong>Windows + SMB + Active Directory</strong> → <strong>FSx for Windows File Server</strong>.",
        "Thấy chữ <strong>HPC (High Performance Computing) + Sub-millisecond latencies + Hundreds of GB/s throughput + S3 integration</strong> → <strong>FSx for Lustre</strong> (Lưu ý: Chọn <em>Scratch File System</em> nếu xử lý ngắn hạn giá rẻ không cần HA; chọn <em>Persistent File System</em> nếu cần lưu trữ lâu dài có tự phục hồi lỗi)."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon FSx Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-fsx/",
      cards: [
        { q: "Khi nào chọn Amazon EFS, khi nào chọn FSx for Windows, và khi nào chọn FSx for Lustre?", a: "EFS: Chia sẻ file cho nhiều máy Linux (NFS). FSx for Windows: Chia sẻ file cho Windows (SMB, Active Directory). FSx for Lustre: Siêu máy tính HPC, Machine Learning tốc độ hàng trăm GB/s gắn liền với S3." }
      ]
    },
    {
      id: 30, phase: 4, section: "Section 17 • Bài 203 → 212",
      title: "Hybrid Storage: Storage Gateway, DataSync, Snowball Edge & Transfer Family",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Các công cụ giúp kết nối hoặc bê kho dữ liệu hàng trăm Terabyte từ phòng server vật lý của công ty (On-premise) lên đám mây AWS.",
      corePoints: [
        "<strong>AWS Storage Gateway (Cầu nối Hybrid giữa On-premise và Cloud)</strong>:",
        "• <strong>S3 File Gateway</strong>: Biến S3 bucket thành ổ đĩa mạng (NFS/SMB) ngay tại văn phòng công ty; có bộ nhớ đệm cục bộ (Local Cache) giúp mở các file vừa dùng cực nhanh.",
        "• <strong>Volume Gateway</strong>: Sao lưu ổ cứng máy chủ nội bộ qua giao thức <strong>iSCSI</strong> lên EBS Snapshot.",
        "• <strong>Tape Gateway</strong>: Thay thế các cuộn băng từ vật lý (Backup Tapes) bằng băng từ ảo lưu trên S3 Glacier.",
        "<strong>AWS DataSync</strong>: Công cụ chép dữ liệu tự động qua đường truyền mạng từ On-premise lên S3/EFS/FSx (nhanh gấp 10 lần công cụ mã nguồn mở, giữ nguyên quyền file metadata, đặt lịch chạy định kỳ hàng ngày/tuần).",
        "<strong>AWS Snowball Edge</strong>: Thiết bị vật lý chống sốc (Storage Optimized ~80 TB / 210 TB NVMe) để chuyển dữ liệu offline khi đường truyền Internet quá chậm. <span class=\"fact-update\" data-since=\"2025-11\">Lưu ý cập nhật: AWS Snowcone và Snowmobile đã ngừng cung cấp; Snowball Edge ngừng nhận khách hàng mới từ 07/11/2025 (AWS khuyến nghị dùng AWS DataSync hoặc AWS Data Transfer Terminal), nhưng trong đề thi SAA-C03 vẫn chọn Snowball Edge cho bài toán di chuyển hàng chục/trăm TB khi băng thông mạng quá yếu</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Snowcone (8–14 TB), Snowball Edge (80 TB), Snowmobile (100 PB)</span>.",
        "<strong>AWS Transfer Family</strong>: Dịch vụ quản lý sẵn máy chủ <strong>SFTP / FTPS / FTP</strong> đọc ghi trực tiếp vào S3 hoặc EFS."
      ],
      examTraps: [
        "<strong>Bẫy Snowball + Glacier</strong>: Snowball Edge <strong>KHÔNG THỂ</strong> chép dữ liệu trực tiếp vào S3 Glacier! Nếu đề bài nói 'Dùng Snowball để đưa 500 TB dữ liệu lưu trữ lạnh vào S3 Glacier', quy trình đúng phải là: <strong>Chép từ Snowball vào S3 Standard trước, sau đó dùng S3 Lifecycle Policy để chuyển xuống S3 Glacier</strong>!"
      ],
      freeDocTitle: "Tutorials Dojo - Storage Gateway & DataSync",
      freeDocUrl: "https://tutorialsdojo.com/aws-storage-gateway/",
      cards: [
        { q: "Thiết bị AWS Snowball Edge có thể nhập (import) dữ liệu trực tiếp thẳng vào S3 Glacier Deep Archive được không?", a: "KHÔNG. Dữ liệu từ Snowball phải được chép vào S3 trước, sau đó dùng S3 Lifecycle Policy để chuyển tiếp xuống S3 Glacier." },
        { q: "Công ty muốn giữ nguyên ứng dụng ở dưới On-premise truy cập file qua giao thức SMB/NFS với độ trễ thấp (nhờ local cache), nhưng toàn bộ dữ liệu gốc được đẩy lên lưu trữ lâu dài trên Amazon S3. Dùng dịch vụ gì?", a: "AWS Storage Gateway - chế độ S3 File Gateway." }
      ]
    },
    {
      id: 31, phase: 4, section: "Section 18 • Bài 213 → 219",
      title: "Amazon SQS (Simple Queue Service): Standard, FIFO, DLQ & Long Polling",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Bạn đã biết RabbitMQ hay Kafka để tách rời (Decouple) các module trong Java. SQS là hàng đợi tin nhắn hoàn toàn Serverless của AWS: Web server chỉ việc quăng yêu cầu đặt hàng vào SQS rồi báo thành công ngay cho khách, còn dàn máy EC2 phía sau cứ thong thả bốc từng tin nhắn ra xử lý!",
      corePoints: [
        "<strong>SQS Standard Queue</strong>: Thông lượng không giới hạn, gửi ít nhất 1 lần (có thể bị trùng lặp nhẹ) và thứ tự tương đối. Thời gian lưu tin nhắn: Mặc định 4 ngày, <strong>tối đa 14 ngày</strong>. Kích thước tối đa 1 tin nhắn: <span class=\"fact-update\" data-since=\"2025-08\"><strong>1 MiB (1,024 KB)</strong></span> <span class=\"exam-legacy\">Đề cũ có thể ghi: 256 KB</span>.",
        "<strong>SQS FIFO Queue</strong>: Đảm bảo <strong>Đúng thứ tự tuyệt đối (First-In-First-Out)</strong> và <strong>Chỉ xử lý đúng 1 lần (Exactly-once)</strong>. Tên queue bắt buộc có đuôi <code>.fifo</code>.",
        "<strong>Visibility Timeout (Thời gian tàng hình - mặc định 30 giây)</strong>: Khi EC2 A lấy 1 tin nhắn ra xử lý, tin nhắn đó ẩn đi 30s để EC2 B không lấy trùng. Nếu EC2 A xử lý mất 2 phút mà để Visibility Timeout có 30s → Hết 30s tin nhắn sẽ hiện lại và bị EC2 B bốc ra xử lý lần 2!",
        "<strong>Dead Letter Queue (DLQ)</strong>: Hàng đợi phụ dùng để hứng các tin nhắn bị lỗi xử lý thất bại quá $N$ lần để tránh làm tắc nghẽn hàng đợi chính.",
        "<strong>Long Polling (WaitTimeSeconds từ 1 đến 20 giây)</strong>: Giúp Consumer kiên nhẫn chờ tại hàng đợi nếu chưa có tin nhắn mới → <strong>Giảm số lượt gọi API rỗng và tiết kiệm chi phí</strong>."
      ],
      examTraps: [
        "Đề bài mô tả: 'Một đơn hàng trong SQS thỉnh thoảng bị hai máy EC2 xử lý trùng lặp 2 lần' → Nguyên nhân: <strong>Visibility Timeout quá ngắn</strong>. Giải pháp: <strong>Tăng Visibility Timeout</strong> hoặc dùng hàm <code>ChangeMessageVisibility</code>.",
        "Đề bài nói: 'Cần giảm chi phí gọi API và giảm độ trễ nhận tin nhắn trên SQS' → Bật <strong>SQS Long Polling</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon SQS Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-sqs/",
      cards: [
        { q: "Tại sao một tin nhắn trong hàng đợi SQS lại bị 2 máy chủ EC2 khác nhau xử lý lặp lại 2 lần, và cách khắc phục là gì?", a: "Do thời gian xử lý thực tế lâu hơn Visibility Timeout khiến tin nhắn hiện trở lại trong queue. Khắc phục: Tăng Visibility Timeout hoặc gọi API ChangeMessageVisibility." },
        { q: "Tính năng nào của SQS giúp giảm số lần truy vấn trả về rỗng (Empty responses), từ đó giảm tải CPU cho EC2 và tiết kiệm chi phí?", a: "SQS Long Polling (cấu hình WaitTimeSeconds từ 1 đến 20 giây)." }
      ]
    },
    {
      id: 32, phase: 4, section: "Section 18 • Bài 220 → 224",
      title: "Amazon SNS (Simple Notification Service) & Mô hình Fan-out (SNS + SQS)",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Nếu SQS là hòm thư (1 thông điệp chỉ có 1 người lấy ra xử lý), thì SNS là cái loa phóng thanh (Pub/Sub): Bạn hét lên 1 tiếng 'Có đơn hàng mới!', lập tức cả phòng Kho, phòng Kế toán và phòng Chăm sóc khách hàng đều nhận được bản sao của thông báo đó cùng lúc.",
      corePoints: [
        "<strong>Amazon SNS</strong>: Mô hình <strong>Publish / Subscribe (Đẩy tin nhắn - Push)</strong> từ 1 Topic ra hàng triệu người nhận (Email, SMS, HTTP Endpoint, AWS Lambda, hoặc hàng đợi SQS; hoặc đẩy sang <span class=\"fact-update\" data-since=\"2024\">Amazon Data Firehose</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Kinesis Data Firehose</span>).",
        "<strong>Mô hình kinh điển nhất trong đề thi: Fan-Out Pattern (<code>1 SNS Topic + Nhiều SQS Queues</code>)</strong>:",
        "• Khi cần gửi 1 sự kiện duy nhất (ví dụ: người dùng vừa upload ảnh hoặc vừa thanh toán) tới <strong>nhiều dịch vụ xử lý độc lập nhau</strong> (1 bên đóng dấu watermark, 1 bên tạo thumbnail, 1 bên lưu hóa đơn) mà <strong>đảm bảo không bị mất gói tin nếu 1 bên bị sập tạm thời</strong> → Gửi sự kiện vào <strong>SNS Topic</strong>, rồi cho các <strong>SQS Queues</strong> đăng ký nhận tin từ SNS Topic đó!",
        "<strong>SNS FIFO + SQS FIFO</strong>: Nếu bài toán vừa cần Fan-out ra nhiều dịch vụ vừa bắt buộc giữ đúng thứ tự nghiêm ngặt."
      ],
      examTraps: [
        "Một S3 Bucket không thể tạo 2 quy tắc Event Notification trùng hoàn toàn cùng 1 sự kiện (ví dụ cùng là `s3:ObjectCreated:*` với cùng đuôi `.jpg`) bắn thẳng vào 2 SQS khác nhau được → Bắt buộc phải bắn từ <strong>S3 vào 1 SNS Topic, rồi từ SNS Fan-out ra 2 SQS</strong>!"
      ],
      freeDocTitle: "Tutorials Dojo - Amazon SNS Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-sns/",
      cards: [
        { q: "Kiến trúc chuẩn trên AWS để gửi cùng một sự kiện đơn hàng tới 3 hệ thống xử lý độc lập, đảm bảo tính bền vững (không mất tin nhắn nếu 1 hệ thống bảo trì) là gì?", a: "Mô hình Fan-out: Đẩy sự kiện vào 1 Amazon SNS Topic, sau đó kết nối 3 hàng đợi Amazon SQS riêng biệt làm Subscribers của SNS Topic đó." }
      ]
    },
    {
      id: 33, phase: 4, section: "Section 18 • Bài 225 → 231",
      title: "Amazon Kinesis (Data Streams vs Data Firehose) & Amazon MQ",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "<span class=\"fact-update\" data-since=\"2024\">Kinesis Data Streams có kiến trúc tương tự Apache Kafka nhưng là dịch vụ độc quyền của AWS (còn dịch vụ Apache Kafka được quản lý thực sự trên AWS là <strong>Amazon MSK - Managed Streaming for Apache Kafka</strong>)</span> <span class=\"exam-legacy\">Đề cũ có thể ví von: Kinesis như Kafka của AWS</span>, dùng để hứng dòng chảy dữ liệu thời gian thực (IoT, Clickstream, Log) hàng gigabyte mỗi giây.",
      corePoints: [
        "<strong>1. Kinesis Data Streams (Real-time)</strong>:",
        "• Thu thập và xử lý dữ liệu <strong>Thời gian thực (Real-time ~200ms)</strong>.",
        "• Chia thành các <code>Shards</code> (bạn phải quản lý số lượng Shards hoặc dùng On-demand), <strong>lưu trữ lại dữ liệu từ 1 đến 365 ngày</strong> và cho phép <strong>tua lại (Replay)</strong> để nhiều ứng dụng cùng đọc.",
        "<strong>2. Amazon Data Firehose (trước đây là Kinesis Data Firehose - Near Real-time)</strong>:",
        "• Dịch vụ vận chuyển dữ liệu hoàn toàn <strong>Serverless</strong>, có độ trễ <strong>Gần thời gian thực</strong> (<span class=\"fact-update\" data-since=\"2024\">cho phép chỉnh thời gian gom buffer từ <strong>0 đến 900 giây</strong> và hỗ trợ đổ vào bảng <strong>Apache Iceberg</strong></span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Kinesis Data Firehose, gom buffer tối thiểu 60 giây hoặc 1 MB</span>).",
        "• Có thể gọi Lambda để chuyển đổi định dạng dữ liệu rồi <strong>đổ thẳng vào các đích: Amazon S3, Amazon Redshift, Amazon OpenSearch, bảng Apache Iceberg, hoặc HTTP Endpoint (Splunk/Datadog)</strong>. <strong>KHÔNG lưu trữ dữ liệu để Replay!</strong>",
        "<strong>3. Amazon MQ</strong>: Dịch vụ quản lý <strong>ActiveMQ và RabbitMQ</strong> → Chỉ dùng khi đề bài nói: <strong>'Di chuyển ứng dụng cũ từ On-premise lên AWS đang dùng giao thức chuẩn mở (MQTT, AMQP, STOMP, JMS) mà không muốn viết lại code'</strong>."
      ],
      examTraps: [
        "Phân biệt cực nhanh: Thấy chữ <strong>'Real-time + Custom processing / Replay data'</strong> → <strong>Kinesis Data Streams</strong>. Thấy chữ <strong>'Near real-time + Load directly into S3 / Redshift / OpenSearch with least operational overhead'</strong> → <strong>Amazon Data Firehose (trước đây là Kinesis Data Firehose)</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon Kinesis Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-kinesis/",
      cards: [
        { q: "Phân biệt khi nào chọn Kinesis Data Streams và khi nào chọn Amazon Data Firehose (trước đây là Kinesis Data Firehose)?", a: "Data Streams: Xử lý Real-time tức thì, lưu dữ liệu 1-365 ngày, hỗ trợ Replay. Amazon Data Firehose: Near real-time (buffer 0–900 giây, <span class=\"exam-legacy\">Đề cũ có thể ghi: &gt;= 60s</span>), Serverless, tự động đẩy thẳng dữ liệu vào S3, Redshift, OpenSearch hoặc Apache Iceberg mà không cần viết code." },
        { q: "Khi migrate một hệ thống Java từ On-premise lên AWS đang sử dụng RabbitMQ/ActiveMQ qua giao thức AMQP/JMS và yêu cầu không sửa đổi code ứng dụng, ta chọn dịch vụ nào?", a: "Amazon MQ (không chọn SQS vì SQS dùng giao thức API riêng của AWS, phải sửa code)." }
      ]
    },
    {
      id: 34, phase: 4, section: "Section 19 • Bài 232 → 240",
      title: "Containers trên AWS: ECS (EC2 vs Fargate), ECR & EKS",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi bạn đóng gói ứng dụng Spring Boot thành Docker Image, bạn đẩy Image đó lên kho `ECR` (giống Docker Hub), rồi nhờ `ECS` hoặc `EKS` chạy các Container đó lên. Trong đó `AWS Fargate` là chân ái vì bạn không cần quản lý bất kỳ con máy chủ EC2 nào!",
      corePoints: [
        "<strong>Amazon ECS (Elastic Container Service)</strong> có 2 chế độ chạy:",
        "• <strong>EC2 Launch Type</strong>: Bạn phải tự tạo và quản lý các máy chủ EC2 bên dưới (mỗi máy chạy <code>ECS Agent</code>). Phù hợp nếu đã mua sẵn EC2 Reserved Instances muốn tận dụng.",
        "• <strong>Fargate Launch Type (Serverless Containers)</strong>: Bạn chỉ khai báo Container cần bao nhiêu CPU và RAM, AWS tự động chạy Container mà <strong>không có bất kỳ máy chủ EC2 nào để bạn phải quản lý hay vá lỗi!</strong>",
        "<strong>Amazon EKS (Elastic Kubernetes Service)</strong>: Dùng khi công ty đang chạy sẵn <strong>Kubernetes (K8s)</strong> ở dưới On-premise hoặc trên Cloud khác và muốn chuẩn hóa đa đám mây (Multi-cloud / Cloud-agnostic).",
        "<strong>Lưu trữ chia sẻ cho ECS Fargate</strong>: Kết hợp <strong>ECS Fargate + Amazon EFS</strong> để nhiều Container ở nhiều AZ cùng đọc/ghi chung 1 hệ thống file."
      ],
      examTraps: [
        "Từ khóa vàng xuất hiện liên tục: <strong>'Run Docker containers + No server management / Least operational overhead'</strong> → Chọn ngay <strong>AWS Fargate (ECS Fargate)</strong>!",
        "Khi một Container chạy trên ECS cần quyền gọi vào S3 hoặc DynamoDB → Gắn quyền vào <strong>ECS Task Role</strong> (không gắn vào EC2 Instance Profile vì sẽ làm mọi container khác trên cùng máy đó hưởng ké quyền)."
      ],
      freeDocTitle: "Tutorials Dojo - Amazon ECS & Fargate Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-ecs/",
      cards: [
        { q: "Công ty muốn chuyển ứng dụng sang chạy Docker Container trên AWS nhưng không muốn quản lý máy chủ ảo EC2 hay cụm hạ tầng bên dưới (Least operational overhead). Chọn giải pháp nào?", a: "Amazon ECS với chế độ khởi chạy AWS Fargate (Serverless Container)." },
        { q: "Làm thế nào để cấp quyền IAM riêng biệt cho từng Container (Task) chạy trên Amazon ECS truy cập vào S3 Bucket?", a: "Cấu hình và gắn một IAM Role vào cấp độ ECS Task Role (trong Task Definition)." }
      ]
    },
    {
      id: 35, phase: 4, section: "Section 20 • Bài 241 → 242",
      title: "AWS Lambda: Serverless Compute, Giới hạn & Tích hợp VPC",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Thay vì bật máy chủ Tomcat chạy 24/24 tốn tiền ngay cả lúc nửa đêm không có khách, với AWS Lambda bạn chỉ upload đúng 1 hàm Java lên. Khi có sự kiện (upload ảnh, gọi API), AWS tự bật hàm đó lên chạy vài giây rồi tắt, tính tiền theo từng mili-giây!",
      corePoints: [
        "<strong>Đặc điểm của AWS Lambda</strong>: Tự động co giãn tới hàng nghìn bản chạy song song (Concurrency mặc định 1,000), trả tiền theo số lượng request và thời gian chạy.",
        "<strong>Các giới hạn cứng (Limits) bắt buộc phải thuộc để loại đáp án sai</strong>:",
        "• Thời gian chạy tối đa (Timeout): <strong>15 phút (900 giây)</strong>.",
        "• Bộ nhớ RAM tối đa: <strong>10 GB (10,240 MB)</strong> (Tăng RAM sẽ tự động tăng luôn sức mạnh CPU và mạng!).",
        "• Dung lượng thư mục tạm <code>/tmp</code>: Tối đa <strong>10 GB</strong>.",
        "• Kích thước gói code triển khai (Deployment package): 50 MB (nén .zip) / 250 MB (giải nén), hoặc dùng Container Image tới 10 GB.",
        "<strong>Lambda SnapStart for Java</strong>: Khắc phục điểm yếu khởi động chậm (Cold Start) của Java Spring Boot trên Lambda (nhanh hơn tới 10 lần mà không tốn thêm phí)."
      ],
      examTraps: [
        "<strong>Bẫy thời gian 15 phút</strong>: Nếu đề bài nói 'Tác vụ xử lý video mất từ 20 đến 45 phút mới xong' → <strong>LOẠI NGAY AWS LAMBDA!</strong> (Hãy chọn <strong>ECS Fargate</strong> hoặc <strong>AWS Batch</strong>).",
        "Nếu hàm Lambda đã được gắn vào Private Subnet để gọi RDS, mà bây giờ Lambda đó muốn gọi thêm ra một API bên ngoài Internet → Private Subnet nơi đặt Lambda <strong>bắt buộc phải có đường đi qua NAT Gateway</strong>!"
      ],
      freeDocTitle: "Tutorials Dojo - AWS Lambda Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/aws-lambda/",
      cards: [
        { q: "Giới hạn thời gian chạy tối đa (Maximum execution timeout) và dung lượng RAM tối đa của một hàm AWS Lambda là bao nhiêu?", a: "Thời gian chạy tối đa là 15 phút (900 giây) và RAM tối đa là 10 GB." },
        { q: "Khi một hàm AWS Lambda xử lý tính toán bị chậm do thiếu CPU, làm thế nào để tăng sức mạnh CPU cho hàm Lambda đó?", a: "Tăng dung lượng bộ nhớ RAM cấu hình cho Lambda (vì trên Lambda, CPU và băng thông mạng tỷ lệ thuận trực tiếp với dung lượng RAM)." }
      ]
    },
    {
      id: 36, phase: 4, section: "Section 20 • Bài 254 → 258",
      title: "Amazon API Gateway, AWS Step Functions & Amazon Cognito",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Bộ tứ hoàn hảo của kiến trúc Serverless hiện đại: `Cognito` lo đăng nhập lấy JWT Token → `API Gateway` làm cổng kiểm soát bảo mật và cache API → gọi hàm `Lambda` xử lý logic → hoặc gọi `Step Functions` nếu là quy trình đơn hàng dài nhiều bước.",
      corePoints: [
        "<strong>Amazon API Gateway</strong>: Quản lý RESTful API, HTTP API và WebSocket API (dùng cho app Chat thời gian thực, thông báo giá chứng khoán 2 chiều). Hỗ trợ <strong>API Caching</strong> (TTL tối đa 3600s) để giảm tải cho backend, và <strong>Throttling</strong> chống quá tải.",
        "<strong>3 loại Endpoint của API Gateway</strong>: <em>Edge-Optimized</em> (cho khách hàng toàn cầu qua CloudFront), <em>Regional</em> (cho khách trong cùng 1 Region), và <em>Private</em> (chỉ gọi nội bộ trong VPC qua Interface VPC Endpoint).",
        "<strong>AWS Step Functions</strong>: Điều phối quy trình công việc (Serverless Workflow Orchestration) dưới dạng sơ đồ trạng thái JSON. Hỗ trợ tự động thử lại khi lỗi (Retry), chạy song song, chờ con người bấm nút duyệt (Human approval), thời gian chạy tối đa tới <strong>1 năm</strong>.",
        "<strong>Amazon Cognito</strong>: <strong>Cognito User Pools</strong> (Quản lý đăng nhập User cho Web/Mobile, tích hợp thẳng với API Gateway) vs <strong>Cognito Identity Pools</strong> (Cấp quyền AWS tạm thời để app Mobile upload trực tiếp lên S3)."
      ],
      examTraps: [
        "Đề bài nói: 'Xây dựng ứng dụng Chat hai chiều thời gian thực hoàn toàn Serverless' → Chọn <strong>API Gateway (WebSocket API) + AWS Lambda + DynamoDB</strong>.",
        "Đề bài nói: 'Điều phối chuỗi 5 hàm Lambda chạy theo thứ tự có xử lý lỗi và chờ phê duyệt thủ công' → Chọn <strong>AWS Step Functions</strong> (Tuyệt đối KHÔNG gọi hàm Lambda A từ bên trong code của hàm Lambda B!)."
      ],
      freeDocTitle: "Tutorials Dojo - API Gateway & Cognito Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-api-gateway/",
      cards: [
        { q: "Để điều phối một quy trình xử lý đơn hàng gồm nhiều hàm AWS Lambda chạy nối tiếp nhau, có rẽ nhánh điều kiện, tự động thử lại khi lỗi (Retry) và chờ con người phê duyệt, ta dùng dịch vụ gì?", a: "AWS Step Functions." },
        { q: "Phân biệt Cognito User Pools và Cognito Identity Pools?", a: "User Pools: Quản lý đăng ký/đăng nhập người dùng (xác thực JWT cho API Gateway/ALB). Identity Pools: Đổi token đăng nhập lấy quyền IAM tạm thời để truy cập trực tiếp dịch vụ AWS (như S3, DynamoDB)." }
      ]
    },

    // ================= CHẶNG 5 =================
    {
      id: 37, phase: 5, section: "Section 27 • Bài 318 → 323",
      title: "VPC Căn bản: CIDR Blocks, Public Subnet vs Private Subnet",
      mode: "Xem Video kỹ (Phần cốt lõi nhất của Networking)",
      javaAnalogy: "Hãy coi VPC như một khu đất riêng của công ty bạn trên mây. Trong khu đất đó, bạn chia thành các phòng ban: Phòng Lễ tân mở cửa đón khách ngoài đường vào gọi là `Public Subnet` (đặt Load Balancer); còn Phòng Két sắt giấu kín bên trong không cho người lạ bước vào gọi là `Private Subnet` (đặt 서버 Java và Database RDS).",
      corePoints: [
        "<strong>Quy tắc tính nhanh số lượng IP từ CIDR</strong>: Lấy $32$ trừ đi số đứng sau dấu gạch chéo `/`, rồi lấy $2$ mũ kết quả đó:",
        "• <code>/24</code> $\\rightarrow 32 - 24 = 8 \\rightarrow 2^8 = 256$ địa chỉ IP.",
        "• <code>/26</code> $\\rightarrow 32 - 26 = 6 \\rightarrow 2^6 = 64$ địa chỉ IP.",
        "• <code>/16</code> $\\rightarrow 32 - 16 = 16 \\rightarrow 2^{16} = 65,536$ địa chỉ IP (Kích thước lớn nhất của 1 VPC; nhỏ nhất là <code>/28</code> = 16 IP).",
        "<strong>Quy tắc 5 IP bị AWS giữ lại trong MỖI Subnet</strong>: Trong bất kỳ Subnet nào, AWS luôn khóa <strong>4 địa chỉ IP đầu tiên và 1 địa chỉ IP cuối cùng</strong> (tổng cộng <strong>5 IP</strong> dùng cho Network address, VPC Router, DNS, Dự phòng và Broadcast). Ví dụ: Subnet <code>/28</code> có 16 IP thì chỉ tạo được tối đa $16 - 5 = 11$ máy EC2!"
      ],
      examTraps: [
        "Đề bài hỏi: 'Công ty cần chạy 29 máy chủ EC2 trong 1 Subnet, cần chọn CIDR nhỏ nhất là bao nhiêu để không lãng phí IP?' → Nếu chọn `/27` (32 IP) thì trừ đi 5 IP của AWS chỉ còn $32 - 5 = 27$ IP (Thiếu 2 IP!). Do đó bắt buộc phải chọn <strong><code>/26</code> (64 IP - 5 = 59 IP khả dụng)</strong>!"
      ],
      freeDocTitle: "Tutorials Dojo - Amazon VPC Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-vpc/",
      cards: [
        { q: "Trong mỗi VPC Subnet, AWS luôn giữ lại (reserve) bao nhiêu địa chỉ IP không thể gán cho máy chủ EC2? Một Subnet /27 (32 IP) thực tế dùng được bao nhiêu IP?", a: "AWS luôn giữ lại 5 địa chỉ IP (4 IP đầu và 1 IP cuối). Do đó Subnet /27 chỉ còn 32 - 5 = 27 IP dùng được." }
      ]
    },
    {
      id: 38, phase: 5, section: "Section 27 • Bài 324 → 327",
      title: "Internet Gateway (IGW), Route Tables & SSM Session Manager",
      mode: "Xem Video",
      javaAnalogy: "Internet Gateway là cánh cổng chính nối khu đất VPC ra đường cái Internet. Nhưng lắp cổng xong chưa đủ, bạn phải vẽ bản đồ chỉ đường (`Route Table`) cho từng phòng để biết đi lối nào ra cổng.",
      corePoints: [
        "<strong>Internet Gateway (IGW)</strong>: Cổng kết nối VPC ra Internet (co giãn tự động, HA sẵn). Một VPC chỉ gắn được tối đa <strong>1 IGW</strong>.",
        "<strong>Bản chất của Public Subnet vs Private Subnet</strong>:",
        "• Một Subnet được gọi là <strong>Public Subnet</strong> KHI VÀ CHỈ KHI bảng chỉ đường (<strong>Route Table</strong>) của nó có dòng định tuyến <code>0.0.0.0/0</code> trỏ thẳng ra <strong>Internet Gateway (`igw-xxxx`)</strong>.",
        "• Một Subnet là <strong>Private Subnet</strong> khi Route Table của nó KHÔNG có đường trỏ trực tiếp ra Internet Gateway.",
        "<strong>Truy cập quản trị vào EC2 trong Private Subnet</strong>: Thay vì dựng <em>Bastion Host</em> ở Public Subnet (tốn tiền, phải mở cổng SSH 22 nguy hiểm), giải pháp hiện đại chuẩn SAA-C03 là dùng <strong>AWS Systems Manager (SSM) Session Manager</strong> (không cần mở bất kỳ cổng Inbound nào, không cần SSH Key, ghi log mọi câu lệnh vào S3/CloudWatch)."
      ],
      examTraps: [
        "Đề bài mô tả: 'Đã tạo EC2 trong Subnet, đã gắn Public IP, đã mở cổng 80 trong Security Group, đã gắn Internet Gateway vào VPC nhưng từ ngoài Internet vẫn không vào được web' → Nguyên nhân: <strong>Quên chưa thêm route `0.0.0.0/0 -> Internet Gateway` vào trong Route Table của Subnet đó!</strong>"
      ],
      freeDocTitle: "Tutorials Dojo - Subnets, IGW & Route Tables",
      freeDocUrl: "https://tutorialsdojo.com/amazon-vpc/",
      cards: [
        { q: "Yếu tố cấu hình quyết định một Subnet trở thành Public Subnet là gì?", a: "Bảng định tuyến (Route Table) gắn với Subnet đó phải có một đường dẫn (Route) cho 0.0.0.0/0 trỏ tới Internet Gateway (IGW)." },
        { q: "Làm thế nào để quản trị viên truy cập dòng lệnh (Shell/Terminal) vào các máy EC2 trong Private Subnet một cách an toàn nhất mà không cần dùng Bastion Host hay mở cổng SSH 22?", a: "Sử dụng AWS Systems Manager (SSM) Session Manager." }
      ]
    },
    {
      id: 39, phase: 5, section: "Section 27 • Bài 328 → 330",
      title: "NAT Gateway vs NAT Instance",
      mode: "Xem Video (Chú ý vị trí đặt NAT Gateway!)",
      javaAnalogy: "Máy chủ Java nằm trong phòng kín `Private Subnet` không cho hacker ngoài Internet chui vào. Nhưng khi bạn chạy lệnh `mvn clean install` hoặc `apt update`, máy chủ lại cần đi ra Internet để tải thư viện về. `NAT Gateway` chính là người lễ tân đứng ở phòng ngoài (`Public Subnet`) đi mua hàng ngoài Internet hộ cho các máy ở phòng trong!",
      corePoints: [
        "<strong>Công dụng của NAT Gateway</strong>: Cho phép các máy trong <strong>Private Subnet chủ động kết nối một chiều đi ra ngoài Internet</strong> (để tải bản vá, gọi API bên thứ 3), đồng thời chặn mọi kết nối từ ngoài Internet khởi tạo ngược vào trong.",
        "<strong>Quy tắc cấu hình sống còn (Rất hay gài bẫy)</strong>:",
        "1. <strong>NAT Gateway BẮT BUỘC phải được tạo bên trong một PUBLIC SUBNET</strong> (và phải gắn kèm 1 địa chỉ Elastic IP).",
        "2. Sau đó, vào <strong>Route Table của PRIVATE SUBNET</strong> thêm dòng: <code>0.0.0.0/0 -> trỏ về nat-gateway-id</code>.",
        "<strong>Tính sẵn sàng cao (High Availability)</strong>: NAT Gateway chỉ sống trong 1 AZ. Để đạt chuẩn Multi-AZ Fault-Tolerant, bạn phải tạo <strong>mỗi AZ một NAT Gateway riêng biệt</strong>."
      ],
      examTraps: [
        "<strong>Bẫy kinh điển nhất phần VPC</strong>: Đề bài nói 'Đã tạo một NAT Gateway ở bên trong Private Subnet nhưng các máy EC2 vẫn không ra được Internet' → Sai vì <strong>NAT Gateway phải được đặt ở Public Subnet</strong> chứ không phải Private Subnet!",
        "Luôn ưu tiên chọn <strong>NAT Gateway</strong> (AWS quản lý, băng thông lên tới 100 Gbps, không cần tắt Source/Destination check) thay vì <em>NAT Instance</em> (cũ, tự quản lý EC2)."
      ],
      freeDocTitle: "Tutorials Dojo - NAT Gateway vs NAT Instance",
      freeDocUrl: "https://tutorialsdojo.com/amazon-vpc/",
      cards: [
        { q: "Khi cấu hình NAT Gateway để giúp máy chủ trong Private Subnet đi ra Internet, NAT Gateway phải được đặt ở Subnet nào và Route Table nào sẽ trỏ tới nó?", a: "NAT Gateway BẮT BUỘC phải đặt trong Public Subnet; còn Route Table của Private Subnet sẽ trỏ 0.0.0.0/0 về NAT Gateway đó." },
        { q: "Làm thế nào để thiết kế NAT Gateway đảm bảo tính sẵn sàng cao (High Availability) không bị mất kết nối Internet khi 1 AZ gặp sự cố?", a: "Triển khai một NAT Gateway riêng biệt tại Public Subnet của từng Availability Zone (Multi-AZ NAT Gateways)." }
      ]
    },
    {
      id: 40, phase: 5, section: "Section 27 • Bài 331 → 335",
      title: "Network ACL (NACL) vs Security Groups & VPC Flow Logs",
      mode: "Xem Video",
      javaAnalogy: "Nếu Security Group là anh bảo vệ đứng ngay cửa từng căn hộ (EC2), thì Network ACL (NACL) là trạm gác cổng chắn ở đầu khu phố (Subnet). NACL khó tính hơn vì đi vào hỏi giấy tờ, lúc đi ra cũng hỏi lại giấy tờ (Stateless), nhưng bù lại NACL có cuốn sổ đen để cấm cửa (Deny) đích danh những kẻ phá hoại!",
      corePoints: [
        "<strong>Bảng đối đầu kinh điển: Security Group vs Network ACL (NACL)</strong>:",
        "• <strong>Vị trí</strong>: Security Group ở tầng <strong>Instance (ENI)</strong>; NACL ở tầng <strong>Subnet</strong>.",
        "• <strong>Trạng thái</strong>: Security Group là <strong>Stateful</strong> (vào được là tự ra được); NACL là <strong>Stateless</strong> (phải mở cả chiều Inbound lẫn chiều Outbound cho dải cổng tạm <em>Ephemeral Ports 1024 – 65535</em>).",
        "• <strong>Quy tắc</strong>: Security Group <strong>chỉ có Allow</strong>; NACL <strong>có cả Allow và Deny</strong> (đánh giá theo thứ tự số Rule từ nhỏ đến lớn; Rule <code>*</code> cuối cùng từ chối tất cả).",
        "<strong>VPC Flow Logs</strong>: Ghi lại nhật ký lưu lượng mạng đi qua VPC / Subnet / ENI để biết gói tin nào bị <code>REJECT</code> hay <code>ACCEPT</code>, xuất ra S3 hoặc CloudWatch Logs."
      ],
      examTraps: [
        "<strong>Từ khóa chọn ngay NACL</strong>: Đề bài yêu cầu <strong>'Block / Deny a specific malicious IP address or CIDR range at the network/subnet level'</strong> → Chọn <strong>Network ACL (NACL)</strong> (vì Security Group không có nút Deny!).",
        "Lưu ý: Mặc định NACL khi AWS tạo sẵn cho VPC (Default NACL) sẽ <strong>Allow All</strong> cả Inbound và Outbound; nhưng khi bạn <strong>tự tạo một Custom NACL mới</strong> thì mặc định nó sẽ <strong>Deny All</strong> cả Inbound lẫn Outbound!"
      ],
      freeDocTitle: "Tutorials Dojo - Security Group vs Network ACL",
      freeDocUrl: "https://tutorialsdojo.com/security-group-vs-nacl/",
      cards: [
        { q: "Phân biệt 3 điểm khác nhau cốt lõi giữa Security Group và Network ACL (NACL)?", a: "1) Cấp độ: SG ở tầng Instance, NACL ở tầng Subnet. 2) Trạng thái: SG là Stateful, NACL là Stateless. 3) Quy tắc: SG chỉ có Allow, NACL có cả Allow và Deny." },
        { q: "Phát hiện 3 địa chỉ IP cố định đang liên tục tấn công máy chủ EC2. Làm sao chặn (Block/Deny) 3 địa chỉ IP này ở tầng hạ tầng mạng VPC?", a: "Thêm quy tắc Deny cho 3 địa chỉ IP đó vào Inbound Rules của Network ACL (NACL) với số thứ tự (Rule number) nhỏ hơn quy tắc Allow." }
      ]
    },
    {
      id: 41, phase: 5, section: "Section 27 • Bài 336 → 340",
      title: "VPC Peering & VPC Endpoints (Gateway vs Interface)",
      mode: "Xem Video kỹ (Đề thi hỏi phần này cực nhiều!)",
      javaAnalogy: "Hãy tưởng tượng máy EC2 trong Private Subnet muốn tải file từ kho S3 nằm ngay sát vách trong cùng khu AWS. Nếu không biết dùng `VPC Endpoint`, máy EC2 phải đi vòng qua NAT Gateway ra ngoài đường cái Internet rồi mới quay ngược vào S3, vừa chậm vừa tốn tiền phí NAT Gateway đắt đỏ!",
      corePoints: [
        "<strong>VPC Peering</strong>: Nối 2 VPC (cùng hoặc khác tài khoản/Region) thông nhau bằng IP nội bộ. <strong>Hai điều kiện sống còn</strong>: (1) Dải IP CIDR của 2 VPC <strong>không được trùng nhau (Non-overlapping CIDR)</strong>; (2) <strong>Không có tính bắc cầu (Non-transitive)</strong>: A nối B, B nối C thì A KHÔNG thông sang C!",
        "<strong>VPC Endpoints (Kết nối nội bộ từ Private Subnet tới dịch vụ AWS mà KHÔNG CẦN NAT Gateway hay Internet Gateway)</strong>:",
        "1. <strong>Gateway VPC Endpoint</strong>: Chỉ hỗ trợ đúng <strong>2 dịch vụ duy nhất là Amazon S3 và DynamoDB</strong>! Hoạt động bằng cách tự thêm đường đi vào Route Table, và <strong>HOÀN TOÀN MIỄN PHÍ!</strong>",
        "2. <strong>Interface VPC Endpoint (AWS PrivateLink)</strong>: Hỗ trợ hầu hết các dịch vụ AWS còn lại (SQS, SNS, KMS, CloudWatch, Secrets Manager...) bằng cách tạo 1 card mạng ENI có IP riêng trong Subnet (Có tính phí theo giờ và theo GB dữ liệu)."
      ],
      examTraps: [
        "<strong>Câu hỏi tủ của đề thi SAA-C03</strong>: 'Các máy EC2 trong Private Subnet tải hàng chục TB dữ liệu từ S3 và DynamoDB qua NAT Gateway làm hóa đơn tiền mạng cuối tháng tăng vọt. Làm sao giảm chi phí nhất?' → Đáp án luôn là: <strong>Tạo một Gateway VPC Endpoint cho S3 và DynamoDB</strong> (vì nó miễn phí 100%!)."
      ],
      freeDocTitle: "Tutorials Dojo - VPC Peering & VPC Endpoints",
      freeDocUrl: "https://tutorialsdojo.com/amazon-vpc/",
      cards: [
        { q: "Phân biệt Gateway VPC Endpoint và Interface VPC Endpoint về dịch vụ hỗ trợ và chi phí?", a: "Gateway Endpoint: Chỉ dùng cho S3 và DynamoDB, cấu hình qua Route Table và HOÀN TOÀN MIỄN PHÍ. Interface Endpoint (PrivateLink): Dùng cho hầu hết các dịch vụ còn lại (SQS, KMS, SNS...), tạo ENI và có tính phí." },
        { q: "VPC A được nối Peering với VPC B, và VPC B được nối Peering với VPC C. Các máy chủ ở VPC A có tự động gọi sang VPC C được không?", a: "KHÔNG. VPC Peering không có tính bắc cầu (Non-transitive). Muốn A gọi C thì phải tạo thêm kết nối Peering trực tiếp giữa A và C (hoặc dùng Transit Gateway)." }
      ]
    },
    {
      id: 42, phase: 5, section: "Section 27 • Bài 341 → 346",
      title: "Hybrid Networking: Site-to-Site VPN, Direct Connect (DX) & Transit Gateway",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi ngân hàng hoặc tập đoàn lớn muốn nối Data Center vật lý của họ với AWS: Cần nối nhanh trong chiều nay thì dùng đường hầm `VPN` qua Internet; cần đường cáp quang riêng ổn định 10Gbps thì thuê `Direct Connect`; còn nếu có tới 50 cái VPC rối như mạng nhện thì dùng trạm trung chuyển `Transit Gateway`.",
      corePoints: [
        "<strong>AWS Site-to-Site VPN</strong>: Kết nối giữa <em>Customer Gateway (CGW)</em> ở công ty và <em>Virtual Private Gateway (VGW)</em> trên AWS qua mạng Internet công cộng. <strong>Được mã hóa IPsec sẵn</strong>, cài đặt xong trong vài phút, chi phí rẻ nhưng băng thông phụ thuộc Internet.",
        "<strong>AWS Direct Connect (DX)</strong>: Kéo cáp quang vật lý riêng từ công ty tới trạm Direct Connect Location của AWS. Băng thông cực cao và ổn định (1 Gbps – 100 Gbps), nhưng <strong>mất vài tuần đến vài tháng để lắp đặt</strong> và <strong>KHÔNG MÃ HÓA SẴN</strong> (có chữ dữ liệu đi riêng tư nhưng không mã hóa IPsec).",
        "<strong>AWS Transit Gateway (TGW)</strong>: Bộ định tuyến trung tâm mô hình <strong>Hub-and-Spoke (Hình ngôi sao)</strong> giúp nối hàng nghìn VPC, VPN và Direct Connect lại với nhau tại 1 điểm duy nhất (không còn cảnh mạng nhện VPC Peering!). TGW là dịch vụ duy nhất hỗ trợ <strong>IP Multicast</strong> trên AWS."
      ],
      examTraps: [
        "Đề bài nói: 'Cần đường truyền vật lý riêng biệt băng thông cao ổn định VÀ bắt buộc phải mã hóa IPsec toàn bộ dữ liệu trên đường truyền' → Chọn <strong>AWS Direct Connect kết hợp với AWS Site-to-Site VPN chạy đè lên trên</strong>!",
        "Đề bài nói: 'Đường cáp Direct Connect chính nếu bị đứt thì cần phương án dự phòng (Backup connection) tiết kiệm chi phí nhất' → Chọn <strong>Site-to-Site VPN làm đường dự phòng cho Direct Connect</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Direct Connect & Transit Gateway",
      freeDocUrl: "https://tutorialsdojo.com/aws-direct-connect/",
      cards: [
        { q: "Kết nối AWS Direct Connect mặc định có được mã hóa (Encrypted in transit) bằng giao thức IPsec không? Nếu yêu cầu tuân thủ bắt buộc phải mã hóa IPsec trên đường truyền riêng thì làm thế nào?", a: "Direct Connect đi qua cáp vật lý riêng nhưng KHÔNG mã hóa sẵn. Để mã hóa IPsec, phải thiết lập thêm một đường hầm AWS Site-to-Site VPN chạy bên trên kết nối Direct Connect." },
        { q: "Khi công ty có 30 VPC và 2 Data Center dưới On-premise cần kết nối thông suốt với nhau mà không muốn quản lý hàng trăm kết nối VPC Peering chằng chịt, ta dùng dịch vụ gì?", a: "AWS Transit Gateway (Mô hình Hub-and-Spoke)." }
      ]
    },
    {
      id: 43, phase: 5, section: "Section 27 • Bài 347 → 351",
      title: "Egress-Only Internet Gateway (IPv6) & AWS Network Firewall",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Mảnh ghép cuối cùng của phần mạng VPC: Cách xử lý địa chỉ IPv6 trong Private Subnet và tường lửa cao cấp bảo vệ toàn bộ VPC.",
      corePoints: [
        "<strong>Đặc thù của IPv6 trên AWS</strong>: Mọi địa chỉ IPv6 cấp cho EC2 đều là địa chỉ Public duy nhất toàn cầu (không có khái niệm Private IPv6 hay NAT). Do đó, nếu gắn Internet Gateway thường thì người ngoài Internet sẽ chọc thẳng vào máy IPv6 của bạn được!",
        "<strong>Egress-Only Internet Gateway</strong>: Dành riêng cho <strong>IPv6</strong>. Nó hoạt động giống hệt như <strong>NAT Gateway nhưng dành cho IPv6</strong>: Cho phép máy chủ dùng IPv6 trong Private Subnet chủ động đi ra ngoài Internet để tải bản vá, nhưng chặn hoàn toàn chiều kết nối từ ngoài Internet đi vào!",
        "<strong>AWS Network Firewall</strong>: Tường lửa bảo vệ ở cấp độ <strong>toàn bộ VPC</strong> (từ Layer 3 đến Layer 7), hỗ trợ lọc danh sách tên miền được phép truy cập (Outbound Domain Filtering, ví dụ chỉ cho phép EC2 gọi ra `*.github.com`), chống xâm nhập IPS."
      ],
      examTraps: [
        "Thấy chữ <strong>IPv6 + Private Subnet + Outbound internet access only (Prevent inbound connections)</strong> → Chọn ngay <strong>Egress-Only Internet Gateway</strong> (KHÔNG chọn NAT Gateway vì NAT Gateway chỉ dùng cho IPv4!)."
      ],
      freeDocTitle: "Tutorials Dojo - VPC IPv6 & Network Firewall",
      freeDocUrl: "https://tutorialsdojo.com/amazon-vpc/",
      cards: [
        { q: "Dịch vụ nào hoạt động giống như NAT Gateway (cho phép đi ra Internet nhưng chặn kết nối từ Internet vào) nhưng được thiết kế dành riêng cho địa chỉ IPv6?", a: "Egress-Only Internet Gateway." }
      ]
    },

    // ================= CHẶNG 6 =================
    {
      id: 44, phase: 6, section: "Section 22 • Bài 269 → 278",
      title: "Data & Analytics: Athena, Glue, Lake Formation, OpenSearch & QuickSight",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi công ty có hàng triệu file log hoặc CSV vứt trên S3: Dùng `Glue` để quét cấu trúc cột và nén lại thành chuẩn Parquet cho nhẹ; dùng `Athena` để gõ câu lệnh `SELECT * FROM logs` trực tiếp trên S3 mà không cần dựng DB; rồi dùng `QuickSight` để vẽ biểu đồ báo cáo cho sếp!",
      corePoints: [
        "<strong>Amazon Athena</strong>: Dịch vụ truy vấn tương tác hoàn toàn <strong>Serverless</strong> cho phép dùng câu lệnh <strong>SQL chuẩn</strong> để phân tích dữ liệu nằm trực tiếp trong <strong>Amazon S3</strong> (tính tiền $5 cho mỗi TB dữ liệu được quét).",
        "<strong>Mẹo tối ưu chi phí Athena</strong>: Dùng <strong>AWS Glue</strong> chuyển đổi file CSV/JSON sang định dạng cột <strong>Apache Parquet hoặc ORC</strong> và nén lại → Giúp Athena quét ít dữ liệu hơn, nhanh hơn và <strong>tiết kiệm tới 80-90% chi phí</strong>!",
        "<strong>AWS Glue</strong>: Dịch vụ <strong>Serverless ETL (Extract, Transform, Load)</strong> có <em>Glue Data Catalog</em> tự động dò tìm cấu trúc bảng (Schema Crawler).",
        "<strong>AWS Lake Formation</strong>: Xây dựng Data Lake tập trung trên S3 chỉ trong vài ngày kèm tính năng phân quyền bảo mật chi tiết đến <strong>từng dòng và từng cột (Row-level and Column-level security)</strong>.",
        "<strong>Amazon QuickSight</strong>: Công cụ vẽ biểu đồ Business Intelligence (BI Dashboard) Serverless, tích hợp bộ nhớ đệm siêu tốc <code>SPICE</code>."
      ],
      examTraps: [
        "Đề bài có chữ <strong>'Ad-hoc SQL queries directly on files stored in Amazon S3 + Serverless / Least operational effort'</strong> → Chọn ngay <strong>Amazon Athena</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Athena, Glue & QuickSight Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/amazon-athena/",
      cards: [
        { q: "Cần chạy các câu lệnh SQL phân tích đột xuất (Ad-hoc queries) trực tiếp trên hàng terabyte file log lưu trong S3 mà không muốn quản lý máy chủ Database. Chọn dịch vụ nào và tối ưu chi phí ra sao?", a: "Dùng Amazon Athena. Để giảm chi phí và tăng tốc, chuyển đổi dữ liệu sang định dạng cột Apache Parquet hoặc ORC." }
      ]
    },
    {
      id: 45, phase: 6, section: "Section 23 • Bài 279 → 289",
      title: "Các dịch vụ AI / Machine Learning trên AWS",
      mode: "Đọc Slide + Hỏi AI (Nhớ mặt chữ từng dịch vụ)",
      javaAnalogy: "Bạn không cần biết toán AI hay huấn luyện mô hình, chỉ cần gọi REST API của các dịch vụ này từ code Java để nhận diện ảnh, đọc chữ, dịch thuật hay phân tích cảm xúc.",
      corePoints: [
        "<strong>Amazon Rekognition</strong>: Nhận diện khuôn mặt, đồ vật, chữ viết và kiểm duyệt nội dung bạo lực/nhạy cảm trong <strong>Hình ảnh & Video</strong>.",
        "<strong>Amazon Transcribe</strong>: Chuyển <strong>Giọng nói thành Văn bản (Speech-to-Text)</strong>; hỗ trợ tự động ẩn thông tin cá nhân nhạy cảm (PII Redaction).",
        "<strong>Amazon Polly</strong>: Chuyển <strong>Văn bản thành Giọng nói (Text-to-Speech)</strong>.",
        "<strong>Amazon Comprehend</strong>: Xử lý ngôn ngữ tự nhiên (<strong>NLP</strong>) → Phân tích cảm xúc khách hàng (Sentiment analysis: Tích cực/Tiêu cực), trích xuất từ khóa từ văn bản/email.",
        "<strong>Amazon Translate</strong>: Dịch ngôn ngữ tự động.",
        "<strong>Amazon Lex</strong>: Xây dựng <strong>Chatbot</strong> hội thoại (công nghệ đứng sau Alexa) kết hợp với <strong>Amazon Connect</strong> (Tổng đài chăm sóc khách hàng đám mây).",
        "<strong>Amazon Kendra</strong>: Công cụ tìm kiếm tài liệu thông minh trong nội bộ doanh nghiệp bằng câu hỏi tự nhiên."
      ],
      examTraps: [
        "Bài toán kết hợp hay gặp: 'Công ty muốn ghi âm cuộc gọi tổng đài, chuyển thành chữ và phân tích xem khách hàng có hài lòng không' → Chuỗi dịch vụ: <strong>Amazon Connect → Amazon Transcribe → Amazon Comprehend</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - AWS Machine Learning Services",
      freeDocUrl: "https://tutorialsdojo.com/comparison-of-aws-services/",
      cards: [
        { q: "Ghép cặp các dịch vụ AI của AWS: Nhận diện ảnh/video, Chuyển giọng nói thành chữ, và Phân tích cảm xúc văn bản (NLP)?", a: "Ảnh/Video -> Amazon Rekognition; Giọng nói thành chữ -> Amazon Transcribe; Phân tích cảm xúc văn bản (NLP) -> Amazon Comprehend." }
      ]
    },
    {
      id: 46, phase: 6, section: "Section 24 • Bài 290 → 299",
      title: "Giám sát & Kiểm toán: CloudWatch vs CloudTrail vs AWS Config",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Bộ ba giám sát không thể tách rời: `CloudWatch` là bảng đồng hồ đo nhiệt độ CPU và đọc file log của app; `CloudTrail` là camera an ninh ghi lại xem ai vừa bấm nút xóa server; còn `AWS Config` là thanh tra kiểm định xem các server có cấu hình đúng quy định bảo mật hay không!",
      corePoints: [
        "<strong>1. Amazon CloudWatch (Hiệu năng, Logs & Báo động)</strong>:",
        "• Thu thập chỉ số (Metrics: CPU, Network, Disk I/O) và Logs ứng dụng.",
        "• <strong>Bẫy đề thi cực lớn</strong>: Mặc định CloudWatch <strong>KHÔNG ĐO ĐƯỢC DUNG LƯỢNG RAM (Memory Usage) VÀ DUNG LƯỢNG Ổ CỨNG TRỐNG (Disk Space Utilization)</strong> của máy EC2! Muốn đo RAM và Disk trống → Bắt buộc phải cài <strong>CloudWatch Unified Agent</strong> vào bên trong máy EC2!",
        "<strong>2. AWS CloudTrail (Kiểm toán API & Bảo mật)</strong>:",
        "• Ghi lại <strong>AI đã làm GÌ, vào LÚC NÀO, từ IP NÀO</strong> (Mọi lệnh gọi API/Console/CLI trong toàn bộ tài khoản AWS). Tính năng <em>CloudTrail Insights</em> giúp phát hiện số lượng lệnh gọi API bất thường.",
        "<strong>3. AWS Config (Tuân thủ cấu hình - Compliance)</strong>:",
        "• Lưu lịch sử thay đổi cấu hình của từng tài nguyên theo thời gian và kiểm tra theo bộ quy tắc (Config Rules). Có thể tự động sửa lỗi vi phạm (Auto-remediation qua SSM Automation)."
      ],
      examTraps: [
        "Hỏi 'Ai đã xóa S3 Bucket / Ai đã sửa Security Group hôm qua?' → <strong>AWS CloudTrail</strong>.",
        "Hỏi 'Làm sao kiểm tra xem trong tài khoản có ổ EBS nào chưa được mã hóa hoặc có Security Group nào đang mở cổng 22 ra thế giới không?' → <strong>AWS Config</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - CloudWatch vs CloudTrail vs Config",
      freeDocUrl: "https://tutorialsdojo.com/amazon-cloudwatch-vs-aws-cloudtrail-vs-aws-config/",
      cards: [
        { q: "Tại sao trên bảng điều khiển Amazon CloudWatch mặc định không có chỉ số Memory (RAM) Utilization của máy chủ EC2, và làm thế nào để thu thập chỉ số này?", a: "Vì RAM nằm ở cấp độ bên trong hệ điều hành. Phải cài đặt phần mềm CloudWatch Unified Agent lên máy EC2 để đẩy chỉ số RAM và Disk Space về CloudWatch." },
        { q: "Phân biệt vai trò cốt lõi của CloudWatch, CloudTrail và AWS Config?", a: "CloudWatch: Theo dõi hiệu năng (CPU, Network) và Logs. CloudTrail: Kiểm toán ai đã gọi API tạo/sửa/xóa gì. AWS Config: Kiểm tra cấu hình tài nguyên có tuân thủ quy định bảo mật (Compliance) hay không." }
      ]
    },
    {
      id: 47, phase: 6, section: "Section 25 • Bài 300 → 307",
      title: "Quản trị Đa tài khoản: AWS Organizations, SCPs & IAM Identity Center",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi công ty lớn có 20 tài khoản AWS cho các dự án khác nhau, `AWS Organizations` giúp gom tất cả về 1 mối để thanh toán chung 1 hóa đơn, và dùng `SCP` để đặt luật cấm từ cấp tập đoàn xuống các công ty con.",
      corePoints: [
        "<strong>AWS Organizations</strong>: Quản lý tập trung nhiều tài khoản AWS theo cấu trúc cây <em>Organizational Units (OU)</em>. Lợi ích lớn nhất về chi phí: <strong>Consolidated Billing (Gộp hóa đơn)</strong> giúp cộng dồn dung lượng sử dụng để hưởng mức giá sỉ rẻ hơn và <strong>chia sẻ chung ưu đãi của Reserved Instances / Savings Plans</strong> giữa mọi tài khoản!",
        "<strong>Service Control Policies (SCPs)</strong>: Chính sách giới hạn quyền tối đa áp dụng cho OU hoặc Member Account (ví dụ: Cấm không cho phép tạo tài nguyên ở ngoài Region Tokyo, hoặc cấm tắt CloudTrail). <strong>SCP có hiệu lực lên cả Root User của tài khoản thành viên</strong> (nhưng không ảnh hưởng tới Management Account chủ).",
        "<strong>AWS IAM Identity Center (tiền thân là AWS SSO)</strong>: Đăng nhập một lần (Single Sign-On) cho nhân viên công ty vào nhiều tài khoản AWS và ứng dụng doanh nghiệp.",
        "<strong>AWS RAM (Resource Access Manager)</strong>: Chia sẻ tài nguyên hạ tầng (Subnets, Transit Gateway, Route 53 Resolver) giữa các tài khoản trong cùng Organization mà không cần tạo trùng lặp."
      ],
      examTraps: [
        "Đề bài nói: 'Công ty có nhiều tài khoản AWS, muốn chặn hoàn toàn các tài khoản thuộc phòng Dev không được phép khởi tạo máy EC2 dòng lớn hoặc không được dùng dịch vụ X' → Chọn <strong>Tạo Service Control Policy (SCP) trong AWS Organizations</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - AWS Organizations & SCP Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/aws-organizations/",
      cards: [
        { q: "Làm thế nào để áp đặt quy tắc cấm toàn bộ các tài khoản AWS thành viên (kể cả Root user của các tài khoản đó) không được phép tắt dịch vụ AWS CloudTrail?", a: "Sử dụng Service Control Policy (SCP) với lệnh Explicit Deny gắn vào Organizational Unit (OU) trong AWS Organizations." },
        { q: "Dịch vụ nào giúp chia sẻ trực tiếp các VPC Subnet hoặc Transit Gateway giữa nhiều tài khoản AWS trong cùng một Organization?", a: "AWS RAM (Resource Access Manager)." }
      ]
    },
    {
      id: 48, phase: 6, section: "Section 26 • Bài 308 → 313",
      title: "Mã hóa & Quản lý Bí mật: KMS, CloudHSM, Secrets Manager vs Parameter Store",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Nơi cất giữ khóa mã hóa và mật khẩu Database của ứng dụng Java. Cặp đấu kinh điển nhất trong đề thi là `AWS Secrets Manager` và `SSM Parameter Store`!",
      corePoints: [
        "<strong>AWS KMS (Key Management Service)</strong>: Dịch vụ quản lý khóa mã hóa đa người thuê (Multi-tenant HSM, <span class=\"fact-update\" data-since=\"2024\">đạt chuẩn <strong>FIPS 140-3 Level 3</strong> và cho phép cấu hình <strong>Automatic Key Rotation tùy chỉnh từ 90 đến 2,560 ngày</strong> hoặc xoay vòng theo yêu cầu On-demand</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: KMS chuẩn FIPS 140-2 Level 2, xoay vòng cố định mỗi 1 năm / 365 ngày</span>).",
        "<strong>AWS CloudHSM</strong>: AWS cung cấp thiết bị phần cứng mã hóa chuyên dụng đơn lẻ (<strong>Single-tenant Dedicated Hardware - chuẩn FIPS 140-3 Level 3</strong>), khách hàng tự giữ toàn quyền kiểm soát khóa (AWS không có quyền truy cập), hỗ trợ chuẩn công nghiệp <strong>PKCS#11, JCE, Microsoft CNG</strong> và tăng tốc SSL/TLS hoặc <strong>Oracle TDE</strong>.",
        "<strong>AWS Secrets Manager vs SSM Parameter Store</strong>:",
        "• <strong>Secrets Manager</strong>: Có phí ($0.40/secret/tháng), sinh ra chuyên để lưu mật khẩu DB. Tính năng ăn tiền nhất: <strong>Tự động xoay vòng mật khẩu định kỳ (Automatic Rotation of Credentials) tích hợp sẵn cho RDS, Aurora, Redshift, DocumentDB</strong>!",
        "• <strong>SSM Parameter Store</strong>: Lưu cấu hình và biến môi trường theo dạng cây thư mục (<code>/prod/app/db-url</code>). Bản Standard <strong>MIỄN PHÍ</strong>, hỗ trợ mã hóa bằng KMS (SecureString), nhưng <strong>không có sẵn tính năng tự động xoay vòng mật khẩu DB</strong>."
      ],
      examTraps: [
        "Thấy từ khóa <strong>'Automatic rotation of database credentials' (Tự động đổi mật khẩu DB định kỳ mà không làm gián đoạn ứng dụng)</strong> → Chọn ngay <strong>AWS Secrets Manager</strong>.",
        "Thấy từ khóa <strong>'Store configuration parameters hierarchically + Most cost-effective (Free)'</strong> → Chọn <strong>SSM Parameter Store</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - KMS, Secrets Manager & Parameter Store",
      freeDocUrl: "https://tutorialsdojo.com/aws-key-management-service-aws-kms/",
      cards: [
        { q: "Phân biệt khi nào chọn AWS Secrets Manager và khi nào chọn SSM Parameter Store?", a: "Chọn Secrets Manager khi cần tự động xoay vòng mật khẩu định kỳ (Automatic Rotation) cho RDS/Aurora. Chọn SSM Parameter Store khi cần lưu biến cấu hình phân cấp miễn phí (Cost-effective)." },
        { q: "Khi yêu cầu tuân thủ bắt buộc khách hàng toàn quyền kiểm soát phần cứng HSM chuyên dụng đơn lẻ (Single-tenant Dedicated Hardware), dùng thư viện chuẩn PKCS#11/JCE/CNG và AWS hoàn toàn không có quyền truy cập vào khóa, ta chọn dịch vụ nào?", a: "AWS CloudHSM (Single-tenant dedicated hardware). <span class=\"fact-update\" data-since=\"2024\">Lưu ý: Hiện cả KMS và CloudHSM đều đạt FIPS 140-3 Level 3; điểm khác biệt cốt lõi là CloudHSM cung cấp phần cứng đơn thuê bao do khách hàng tự quản lý hoàn toàn.</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: KMS là FIPS 140-2 Level 2 còn CloudHSM là FIPS 140-2 Level 3.</span>" }
      ]
    },
    {
      id: 49, phase: 6, section: "Section 26 • Bài 314 → 317",
      title: "Bảo mật Đa tầng: WAF, Shield, GuardDuty, Inspector & Macie",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Đội ngũ vệ sĩ bảo vệ hệ thống của bạn: `WAF` chặn tin tặc chọc SQL Injection; `Shield` đỡ đòn tấn công DDoS làm sập mạng; `GuardDuty` là AI rà soát log tìm kẻ đột nhập; `Inspector` quét lỗ hổng thư viện cũ trên máy chủ; còn `Macie` canh gác không cho lộ số thẻ tín dụng trên S3!",
      corePoints: [
        "<strong>AWS WAF (Web Application Firewall - Layer 7)</strong>: Chống SQL Injection, Cross-Site Scripting (XSS), chặn theo quốc gia (Geo-match), và <strong>chặn IP gửi quá nhiều request (Rate-based rules)</strong>. <strong>Lưu ý sống còn: WAF chỉ gắn được lên CloudFront, ALB, API Gateway, AppSync, Cognito (KHÔNG gắn trực tiếp lên EC2 hay NLB được!)</strong>.",
        "<strong>AWS Shield</strong>: Chống tấn công <strong>DDoS (Layer 3 & 4)</strong>. <em>Shield Standard</em> bật sẵn miễn phí; <em>Shield Advanced</em> ($3,000/tháng) có đội chuyên gia 24/7 (SRT/DRT) và bảo hiểm hoàn tiền hóa đơn nếu bị DDoS làm tăng vọt chi phí Auto Scaling.",
        "<strong>Amazon GuardDuty</strong>: Dùng Machine Learning phân tích ngầm <em>CloudTrail Logs, VPC Flow Logs, DNS Logs, EKS Audit Logs</em> để phát hiện hành vi bất thường (như EC2 bị chiếm quyền đào tiền ảo). Không cần cài đặt agent!",
        "<strong>Amazon Inspector</strong>: Tự động quét lỗ hổng bảo mật phần mềm (CVE) trên <strong>EC2 instances, Container Images trong ECR, và hàm AWS Lambda</strong>.",
        "<strong>Amazon Macie</strong>: Dùng ML tự động quét các <strong>S3 Buckets</strong> để phát hiện dữ liệu nhạy cảm cá nhân (<strong>PII</strong> như số hộ chiếu, căn cước, thẻ tín dụng) bị lộ."
      ],
      examTraps: [
        "<strong>Bẫy gắn WAF vào EC2</strong>: Đề bài nói 'Một ứng dụng web đang chạy trực tiếp trên EC2 có gắn Elastic IP bị tấn công SQL Injection và HTTP Flood từ nhiều IP. Làm sao gắn AWS WAF?' → Phải <strong>đặt một Application Load Balancer (hoặc CloudFront) ở phía trước máy EC2 rồi gắn AWS WAF lên ALB/CloudFront đó</strong>!",
        "Nhớ nhanh: Quét S3 tìm dữ liệu nhạy cảm PII → <strong>Macie</strong>. Phân tích Log phát hiện mối đe dọa bằng AI → <strong>GuardDuty</strong>. Quét lỗ hổng CVE trên EC2/ECR/Lambda → <strong>Inspector</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - WAF, Shield, GuardDuty, Inspector, Macie",
      freeDocUrl: "https://tutorialsdojo.com/aws-waf/",
      cards: [
        { q: "AWS WAF có thể gắn trực tiếp vào máy chủ EC2 hoặc Network Load Balancer (NLB) được không? Nếu ứng dụng chạy trên EC2 muốn dùng WAF thì phải làm sao?", a: "KHÔNG. AWS WAF chỉ gắn được vào CloudFront, ALB, API Gateway, AppSync, Cognito. Muốn bảo vệ EC2 bằng WAF thì phải đặt ALB hoặc CloudFront ở phía trước EC2." },
        { q: "Phân biệt nhiệm vụ của bộ 3 bảo mật: Amazon Macie, Amazon GuardDuty và Amazon Inspector?", a: "Macie: Quét tìm dữ liệu nhạy cảm cá nhân (PII) trên S3. GuardDuty: AI phân tích Logs (CloudTrail, VPC Flow, DNS) tìm kẻ xâm nhập. Inspector: Quét lỗ hổng bảo mật phần mềm (CVE) trên EC2, ECR và Lambda." }
      ]
    },
    {
      id: 50, phase: 6, section: "Section 28 • Bài 352 → 360",
      title: "4 Chiến lược Disaster Recovery (DR) & Công cụ Migration (DMS, MGN)",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Khi cả một vùng Data Center bị động đất mất liên lạc, bạn muốn hệ thống sống dậy ở vùng khác trong bao lâu (RTO) và chấp nhận mất dữ liệu của bao nhiêu phút trước đó (RPO)?",
      corePoints: [
        "<strong>RTO (Recovery Time Objective)</strong>: Thời gian hệ thống bị gián đoạn từ lúc sập đến lúc khôi phục xong. <strong>RPO (Recovery Point Objective)</strong>: Khoảng thời gian dữ liệu bị mất.",
        "<strong>4 Chiến lược Disaster Recovery (Xếp theo RTO/RPO giảm dần và Chi phí tăng dần)</strong>:",
        "1. <strong>Backup and Restore</strong>: Chỉ sao lưu định kỳ sang Region khác. Rẻ nhất, nhưng RTO/RPO tính bằng nhiều giờ.",
        "2. <strong>Pilot Light (Ngọn lửa mồi)</strong>: Chỉ bật và đồng bộ liên tục phần lõi dữ liệu quan trọng nhất (như Database RDS Read Replica / Aurora), còn các máy chủ Web/App EC2 thì <strong>TẮT hoàn toàn</strong>, chỉ bật lên khi có thảm họa (RTO vài chục phút).",
        "3. <strong>Warm Standby</strong>: Chạy sẵn đầy đủ cả Web + App + DB ở Region dự phòng nhưng với <strong>kích thước thu nhỏ tối thiểu (Minimum size)</strong>, khi có thảm họa chỉ việc Scale Out tăng số lượng máy lên (RTO vài phút).",
        "4. <strong>Multi-Site Active/Active</strong>: Chạy full cấu hình phục vụ khách hàng ở cả 2 Region cùng lúc (RTO gần bằng 0 giây, đắt đỏ nhất).",
        "<strong>AWS DMS (Database Migration Service)</strong>: Di chuyển Database lên AWS mà DB nguồn vẫn hoạt động bình thường (Near-zero downtime). Nếu <strong>khác hệ DB (Heterogeneous: ví dụ từ Oracle sang Aurora PostgreSQL)</strong> → Phải dùng <strong>AWS SCT (Schema Conversion Tool)</strong> chuyển đổi cấu trúc bảng trước rồi mới dùng DMS!"
      ],
      examTraps: [
        "Phân biệt <strong>Pilot Light vs Warm Standby</strong>: Nếu đề bài nói ở Region dự phòng chỉ có Database chạy còn server ứng dụng tắt hoặc chưa tạo → <strong>Pilot Light</strong>. Nếu nói có một bản thu nhỏ của toàn bộ hệ thống luôn chạy sẵn (luôn nhận được request thử nghiệm) → <strong>Warm Standby</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Disaster Recovery & AWS DMS",
      freeDocUrl: "https://tutorialsdojo.com/aws-database-migration-service/",
      cards: [
        { q: "Phân biệt chiến lược Disaster Recovery kiểu Pilot Light và Warm Standby?", a: "Pilot Light: Chỉ duy trì phần lõi dữ liệu (Database) hoạt động ở Region phụ, các máy chủ Web/App tắt hoàn toàn cho tới khi có sự cố. Warm Standby: Chạy sẵn toàn bộ hệ thống (cả Web + App + DB) ở quy mô thu nhỏ tối thiểu." },
        { q: "Khi muốn di chuyển cơ sở dữ liệu từ Oracle ở dưới On-premise sang Amazon Aurora MySQL trên AWS mà không làm gián đoạn hệ thống, cần kết hợp 2 công cụ nào?", a: "AWS SCT (Schema Conversion Tool - để chuyển đổi cấu trúc bảng khác hệ) + AWS DMS (Database Migration Service - để chép dữ liệu liên tục)." }
      ]
    },
    {
      id: 51, phase: 6, section: "Section 29 & 30 • Bài 361 → 375",
      title: "Hoàn tất Lý thuyết: Elastic Beanstalk, CloudFormation, Cost Explorer & Compute Optimizer",
      mode: "Đọc Slide + Hỏi AI",
      javaAnalogy: "Buổi cuối cùng của phần lý thuyết! Tập trung vào các công cụ giúp tự động hóa triển khai hạ tầng và kiểm soát chi phí.",
      corePoints: [
        "<strong>AWS Elastic Beanstalk</strong>: Dịch vụ <strong>PaaS</strong> dành cho Developer. Bạn chỉ cần upload file code <code>.jar</code> / <code>.war</code> lên, Beanstalk tự động tạo và cấu hình EC2, Auto Scaling, ALB, RDS bên dưới cho bạn.",
        "<strong>AWS CloudFormation</strong>: Quản trị hạ tầng bằng mã nguồn (<strong>Infrastructure as Code - IaC</strong>) qua file YAML/JSON. Giúp nhân bản toàn bộ kiến trúc sang Region khác mà không bao giờ cấu hình sai sót thủ công.",
        "<strong>AWS Compute Optimizer</strong>: Dùng Machine Learning phân tích lịch sử sử dụng để chỉ ra máy EC2, ổ EBS hay hàm Lambda nào đang bị <strong>chọn thừa cấu hình (Over-provisioned)</strong> và gợi ý hạ xuống dòng máy phù hợp để tiết kiệm chi phí.",
        "<strong>AWS Cost Explorer & AWS Budgets</strong>: Cost Explorer giúp xem biểu đồ và dự báo chi phí 12 tháng tới; AWS Budgets giúp gửi cảnh báo (SNS/Email) khi chi phí vượt ngưỡng."
      ],
      examTraps: [
        "Đề bài nói: 'Đội ngũ Java Developer muốn nhanh chóng đưa ứng dụng web lên AWS, tự động quản lý tải và theo dõi sức khỏe mà không muốn tự tay lắp ghép từng thành phần hạ tầng' → Chọn <strong>AWS Elastic Beanstalk</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Elastic Beanstalk & CloudFormation",
      freeDocUrl: "https://tutorialsdojo.com/aws-elastic-beanstalk/",
      cards: [
        { q: "Dịch vụ nào sử dụng Machine Learning để phân tích mức sử dụng tài nguyên và đưa ra khuyến nghị hạ cấu hình (Right-sizing) cho các máy EC2, EBS và Lambda bị cấp phát dư thừa?", a: "AWS Compute Optimizer." }
      ]
    },

    // ================= CHẶNG 7: HỆ THỐNG HÓA & LUYỆN ĐỀ =================
    {
      id: 52, phase: 7, section: "Hệ thống hóa • Buổi 1/5",
      title: "Tổng duyệt Bảng So Sánh Nhóm Storage & Database",
      mode: "Mở Tab 'Bảng So Sánh' ngay trên Web này + Quẹt Anki",
      javaAnalogy: "Giống như tác giả bài viết tại Nhật đã chia sẻ: Trước khi bước vào làm đề, dành 5 buổi để đặt các dịch vụ giống nhau lên bàn cân sẽ giúp bạn loại ngay 2 đáp án sai chỉ trong 5 giây!",
      corePoints: [
        "Chuyển sang tab <strong>📊 Bảng So Sánh Dịch Vụ</strong> ngay trên thanh menu của trang web này.",
        "Đọc kỹ và đối chiếu: <strong>S3 Storage Classes</strong>, <strong>EBS vs EFS vs FSx vs Instance Store</strong> (<span class=\"fact-update\" data-since=\"2024\">nhớ cập nhật: EBS gp3 nay đạt tới 80,000 IOPS / 2,000 MiB/s; Aurora Global Database hỗ trợ tới 10 Regions phụ</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: gp3 tối đa 16,000 IOPS; Aurora Global DB tối đa 5 Regions phụ</span>), và <strong>RDS Multi-AZ vs Read Replicas vs Aurora vs DynamoDB</strong>.",
        "Bấm sang tab <strong>🗂️ Luyện Thẻ Anki (SRS)</strong> để ôn lại toàn bộ các thẻ của Chặng 1, 2, 3."
      ],
      examTraps: [
        "Đừng cố đọc thuộc lòng từng chữ: Hãy nhìn vào cột <strong>'Từ khóa nhận diện trong đề thi (Keywords)'</strong> để tạo phản xạ chọn đáp án."
      ],
      freeDocTitle: "Tutorials Dojo - Master Comparison of AWS Services",
      freeDocUrl: "https://tutorialsdojo.com/comparison-of-aws-services/",
      cards: [
        { q: "Tổng kết Storage: Khi nào chọn EBS, khi nào chọn EFS, khi nào chọn S3?", a: "EBS: Ổ đĩa gắn cho 1 máy EC2 trong 1 AZ (IOPS cao). EFS: Chia sẻ file chuẩn POSIX cho nhiều máy Linux qua nhiều AZ. S3: Lưu trữ Object không giới hạn qua HTTP API (ảnh, video, backup, data lake)." }
      ]
    },
    {
      id: 53, phase: 7, section: "Hệ thống hóa • Buổi 2/5",
      title: "Tổng duyệt Bảng So Sánh Nhóm Networking, Load Balancing & Endpoints",
      mode: "Mở Tab 'Bảng So Sánh' + Quẹt Anki",
      javaAnalogy: "Hệ thống hóa lại toàn bộ luồng đi của gói tin từ DNS (Route 53) → CDN (CloudFront / Global Accelerator) → Load Balancer (ALB / NLB / GWLB) → VPC (Public/Private Subnet, NAT Gateway, VPC Endpoints).",
      corePoints: [
        "Đọc kỹ bảng so sánh: <strong>ALB vs NLB vs GWLB</strong>, <strong>CloudFront vs Global Accelerator</strong>, <strong>Security Group vs NACL</strong>, và <strong>Gateway Endpoint vs Interface Endpoint</strong>.",
        "Đảm bảo phân biệt rõ khi nào dùng <strong>VPC Peering</strong> (ít VPC, không bắc cầu) và khi nào dùng <strong>Transit Gateway</strong> (nhiều VPC, Hub-and-Spoke)."
      ],
      examTraps: [
        "Nhớ lại bẫy số 1: EC2 trong Private Subnet gọi S3/DynamoDB tốn tiền NAT Gateway → Đổi sang <strong>Gateway VPC Endpoint (Miễn phí)</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - Networking Comparison Cheat Sheet",
      freeDocUrl: "https://tutorialsdojo.com/comparison-of-aws-services/",
      cards: [
        { q: "Tổng kết Endpoint: Những dịch vụ nào hỗ trợ Gateway VPC Endpoint (miễn phí) và những dịch vụ nào phải dùng Interface VPC Endpoint (PrivateLink)?", a: "Gateway Endpoint chỉ hỗ trợ đúng 2 dịch vụ: Amazon S3 và DynamoDB. Tất cả các dịch vụ AWS khác đều dùng Interface Endpoint (PrivateLink)." }
      ]
    },
    {
      id: 54, phase: 7, section: "Hệ thống hóa • Buổi 3/5",
      title: "Tổng duyệt Bảng So Sánh Nhóm Decoupling, Serverless & Containers",
      mode: "Mở Tab 'Bảng So Sánh' + Quẹt Anki",
      javaAnalogy: "Ôn lại các công cụ xử lý bất đồng bộ và tính toán không máy chủ.",
      corePoints: [
        "Đọc kỹ bảng so sánh: <strong>SQS Standard vs SQS FIFO vs SNS vs Kinesis Data Streams vs Amazon Data Firehose (trước đây là Kinesis Data Firehose) vs Amazon MQ</strong>.",
        "Ôn lại giới hạn của <strong>AWS Lambda</strong> (15 phút, 10GB RAM) và khi nào chuyển sang <strong>ECS Fargate</strong> hoặc <strong>AWS Batch</strong>."
      ],
      examTraps: [
        "Nhớ quy tắc: Cần gửi 1 tin nhắn cho nhiều dịch vụ xử lý độc lập không mất tin → <strong>SNS + SQS Fan-out</strong>."
      ],
      freeDocTitle: "Tutorials Dojo - SQS vs SNS vs Kinesis vs EventBridge",
      freeDocUrl: "https://tutorialsdojo.com/amazon-sqs-vs-sns-vs-kinesis-vs-eventbridge/",
      cards: [
        { q: "Tổng kết Streaming: Cần thu thập log và đẩy thẳng vào S3 hoặc OpenSearch với độ trễ gần thời gian thực mà không muốn viết code quản lý chọn dịch vụ gì?", a: "<span class=\"fact-update\" data-since=\"2024\">Amazon Data Firehose (trước đây là Amazon Kinesis Data Firehose, hỗ trợ buffer 0–900s).</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: Kinesis Data Firehose (&gt;= 60s).</span>" }
      ]
    },
    {
      id: 55, phase: 7, section: "Hệ thống hóa • Buổi 4/5",
      title: "Tổng duyệt Bảng So Sánh Nhóm Security, Monitoring & Disaster Recovery",
      mode: "Mở Tab 'Bảng So Sánh' + Quẹt Anki",
      javaAnalogy: "Hệ thống hóa toàn bộ các dịch vụ bảo mật và khôi phục thảm họa.",
      corePoints: [
        "Đọc kỹ bảng so sánh: <strong>KMS vs CloudHSM</strong>, <strong>Secrets Manager vs SSM Parameter Store</strong>, <strong>CloudWatch vs CloudTrail vs AWS Config</strong>, <strong>WAF vs Shield vs GuardDuty vs Inspector vs Macie</strong>.",
        "Ôn lại 4 cấp độ <strong>Disaster Recovery</strong>: Backup & Restore → Pilot Light → Warm Standby → Multi-Site Active/Active."
      ],
      examTraps: [
        "WAF chống SQLi/XSS ở Layer 7 (không gắn trực tiếp vào EC2/NLB); Shield chống DDoS ở Layer 3/4; NACL chặn IP cụ thể ở tầng Subnet."
      ],
      freeDocTitle: "Tutorials Dojo - AWS Security Services Comparison",
      freeDocUrl: "https://tutorialsdojo.com/comparison-of-aws-services/",
      cards: [
        { q: "Sắp xếp 4 chiến lược Disaster Recovery theo thứ tự thời gian phục hồi (RTO) nhanh dần?", a: "Backup & Restore (hàng giờ) -> Pilot Light (vài chục phút) -> Warm Standby (vài phút) -> Multi-Site Active/Active (gần như tức thì)." }
      ]
    },
    {
      id: 56, phase: 7, section: "Hệ thống hóa • Buổi 5/5",
      title: "Kỹ thuật Đọc câu hỏi & Loại trừ đáp án trong đề thi SAA-C03",
      mode: "Luyện phản xạ giải đề mẫu",
      javaAnalogy: "Trước khi bước vào làm 6 đề chính thức, hãy trang bị kỹ thuật đọc đề thông minh để không bị ngợp bởi các đoạn văn tiếng Anh dài 6-7 dòng.",
      corePoints: [
        "<strong>Bước 1 - Đọc câu hỏi cuối cùng trước tiên</strong>: Nhìn ngay câu cuối cùng xem đề hỏi gì: <em>'Which solution is the MOST cost-effective?'</em> (Tối ưu chi phí) hay <em>'Which solution provides the HIGHEST availability with LEAST operational overhead?'</em> (Chịu lỗi cao + Serverless).",
        "<strong>Bước 2 - Loại ngay 2 đáp án chứa lỗi kỹ thuật sai bản chất</strong>: Ví dụ đáp án nào nói 'Gắn ổ EBS cho 3 máy EC2 ở 3 AZ khác nhau' hoặc 'Gắn AWS WAF trực tiếp lên máy EC2' hoặc 'Chạy Lambda xử lý tác vụ kéo dài 30 phút' → Gạch bỏ ngay lập tức!",
        "<strong>Bước 3 - So sánh 2 đáp án còn lại theo đúng Keyword ở Bước 1</strong>: Ví dụ cả 2 đáp án đều chạy được, nhưng 1 cái tự cài trên EC2 còn 1 cái dùng Serverless (Fargate/Lambda/Athena) mà đề đòi <em>Least operational overhead</em> → Chọn cái Serverless!"
      ],
      examTraps: [
        "Đừng bao giờ sợ nếu 2 đề đầu tiên bạn chỉ đạt <strong>50% – 60%</strong>! Đó là giai đoạn bạn đang nạp các mẫu câu hỏi vào đầu."
      ],
      freeDocTitle: "DevCloudly - Kho Đề Thi Thử SAA-C03 Miễn Phí (J2TEAM)",
      freeDocUrl: "https://devcloudly.vercel.app/exams?courseId=40003",
      cards: [
        { q: "Quy trình 3 bước đọc và giải một câu hỏi tình huống dài trong đề thi AWS SAA-C03 để tiết kiệm thời gian nhất là gì?", a: "1) Đọc câu hỏi cuối cùng trước để bắt Keyword (Cost/HA/Overhead). 2) Loại ngay 2 đáp án sai kiến thức cơ bản. 3) Đối chiếu 2 đáp án còn lại với Keyword của câu cuối." }
      ]
    }
  ],

  comparisonTables: [
    {
      id: "elb",
      title: "1. So sánh các loại Load Balancer (ALB vs NLB vs GWLB)",
      headers: ["Tiêu chí", "Application Load Balancer (ALB)", "Network Load Balancer (NLB)", "Gateway Load Balancer (GWLB)"],
      rows: [
        ["Tầng mạng (OSI Layer)", "<strong>Layer 7</strong> (HTTP, HTTPS, WebSocket, gRPC)", "<strong>Layer 4</strong> (TCP, UDP, TLS)", "<strong>Layer 3</strong> (Network Layer - IP Packets / GENEVE port 6081)"],
        ["Tính năng nổi bật", "Định tuyến thông minh theo URL Path (<code>/api</code>), Hostname, Query String, Header. Chuyển hướng HTTP sang HTTPS.", "Hiệu năng cực đại (hàng triệu req/s), độ trễ cực thấp (~100ms). <strong>Cấp 1 địa chỉ Static IP / Elastic IP cố định trên mỗi AZ</strong>.", "Chèn cụm thiết bị ảo bảo mật bên thứ 3 vào luồng mạng một cách trong suốt."],
        ["Từ khóa chọn trong đề thi", "<em>Microservices, Containers (ECS), Path-based routing, Host-based routing, Web application</em>", "<em>Extreme performance, ultra-low latency, UDP/TCP protocol, Static IP / Elastic IP for whitelisting</em>", "<em>Third-party virtual network appliances, Firewalls, Intrusion Detection/Prevention (IDS/IPS), Deep Packet Inspection</em>"]
      ]
    },
    {
      id: "storage",
      title: "2. So sánh các dịch vụ Lưu trữ (EBS vs EFS vs FSx vs S3)",
      headers: ["Dịch vụ", "Loại lưu trữ & Phạm vi", "Đặc điểm kỹ thuật cốt lõi", "Từ khóa chọn trong đề thi (Keywords)"],
      rows: [
        ["<strong>Amazon EBS</strong>", "Block Storage • <strong>Khóa trong 1 AZ</strong>", "Gắn cho 1 máy EC2 (trừ io1/io2 Multi-Attach gắn tối đa 16 máy trong cùng 1 AZ). Có gp3 (đa dụng, <span class=\"fact-update\" data-since=\"2024\">tối đa 80,000 IOPS / 2,000 MiB/s</span>) và io2 Block Express (tới 256,000 IOPS, độ bền 99.999%) <span class=\"exam-legacy\">Đề cũ có thể ghi: gp3 tối đa 16,000 IOPS, &gt;16,000 IOPS dùng io1/io2</span>.", "<em>Boot volume, low-latency block storage for single EC2, database storage on EC2</em>"],
        ["<strong>EC2 Instance Store</strong>", "Block Storage Vật lý • Nằm trên Host", "IOPS cao nhất (hàng triệu IOPS), nhưng <strong>mất sạch dữ liệu nếu Stop máy (Ephemeral)</strong>.", "<em>Temporary cache, buffer, scratch data, highest IOPS, data can be lost if instance stops</em>"],
        ["<strong>Amazon EFS</strong>", "File Storage (NFS) • <strong>Multi-AZ</strong>", "Gắn đồng thời cho hàng trăm máy <strong>Linux EC2 / ECS / Lambda</strong> qua nhiều AZ. Tự động co giãn. Có tầng EFS-IA tiết kiệm 90%.", "<em>Shared file storage across multiple AZs, Linux instances, POSIX-compliant, Content Management System</em>"],
        ["<strong>FSx for Windows</strong>", "File Storage (SMB/NTFS) • Multi-AZ", "Hệ thống file chia sẻ dành riêng cho <strong>Windows</strong>, tích hợp sẵn Microsoft Active Directory.", "<em>Windows File Server, SMB protocol, NTFS, Microsoft Active Directory integration</em>"],
        ["<strong>FSx for Lustre</strong>", "File Storage cho Siêu máy tính • HPC", "Tốc độ hàng trăm GB/s, độ trễ dưới mili-giây, tích hợp 2 chiều trực tiếp với <strong>Amazon S3</strong>.", "<em>High Performance Computing (HPC), Machine Learning, financial modeling, seamless S3 integration</em>"],
        ["<strong>Amazon S3</strong>", "Object Storage • Toàn Region (≥ 3 AZ)", "Truy cập qua HTTP REST API (không mount như ổ đĩa thường). Dung lượng vô hạn, <span class=\"fact-update\" data-since=\"2025\">tối đa 50 TB/file</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: 5 TB/file</span>.", "<em>Static website hosting, media/backup/archive, Data Lake, Presigned URL, Lifecycle policies</em>"]
      ]
    },
    {
      id: "s3classes",
      title: "3. Bảng đối chiếu 7 Tầng lưu trữ của Amazon S3 (S3 Storage Classes)",
      headers: ["Tầng lưu trữ S3", "Số AZ lưu trữ", "Thời gian lưu tối thiểu", "Thời gian lấy dữ liệu (Retrieval Time)", "Khi nào chọn trong đề thi?"],
      rows: [
        ["<strong>S3 Standard</strong>", "≥ 3 AZ", "Không có", "Mili-giây (Tức thì)", "Dữ liệu truy cập thường xuyên hàng ngày."],
        ["<strong>S3 Intelligent-Tiering</strong>", "≥ 3 AZ", "Không có", "Mili-giây (Tức thì)", "<strong>Không đoán trước được hoặc tần suất truy cập thay đổi thất thường (Unknown/Changing access patterns)</strong>. Không tốn phí Retrieval."],
        ["<strong>S3 Standard-IA</strong>", "≥ 3 AZ", "30 ngày", "Mili-giây (Tức thì)", "Ít truy cập nhưng khi cần là phải lấy ra ngay lập tức, dữ liệu quan trọng không được phép mất."],
        ["<strong>S3 One Zone-IA</strong>", "<strong>Chỉ 1 AZ</strong>", "30 ngày", "Mili-giây (Tức thì)", "Ít truy cập + <strong>Dữ liệu có thể tái tạo lại dễ dàng (Thumbnails, bản sao phụ)</strong> muốn tiết kiệm 20% chi phí."],
        ["<strong>S3 Glacier Instant Retrieval</strong>", "≥ 3 AZ", "90 ngày", "<strong>Mili-giây (Tức thì)</strong>", "Lưu trữ lạnh (hiếm khi đụng tới, vài tháng 1 lần) nhưng khi cần phải <strong>xem được ngay trong mili-giây</strong> (Hồ sơ bệnh án, ảnh y tế)."],
        ["<strong>S3 Glacier Flexible Retrieval</strong>", "≥ 3 AZ", "90 ngày", "<strong>Expedited: 1–5 phút</strong><br>Standard: 3–5 giờ<br>Bulk: 5–12 giờ", "Lưu trữ lạnh, chấp nhận chờ từ vài phút (Expedited) đến vài giờ."],
        ["<strong>S3 Glacier Deep Archive</strong>", "≥ 3 AZ", "180 ngày", "<strong>Standard: 12 giờ</strong><br><strong>Bulk: 48 giờ</strong>", "<strong>Chi phí lưu trữ rẻ nhất trên AWS!</strong> Lưu trữ hồ sơ pháp lý/tài chính 5–10 năm, chấp nhận chờ 12–48 tiếng khi lấy lại."]
      ]
    },
    {
      id: "db",
      title: "4. So sánh Database & Caching (RDS Multi-AZ vs Read Replicas vs Aurora vs DynamoDB)",
      headers: ["Giải pháp", "Cơ chế nhân bản", "Mục đích chính", "Bẫy đề thi cần nhớ"],
      rows: [
        ["<strong>RDS Multi-AZ</strong>", "<strong>Đồng bộ (Synchronous)</strong> sang 1 máy Standby ở AZ khác", "<strong>High Availability (HA) & Tự động Failover</strong> khi sập AZ hoặc bảo trì.", "Máy Standby <strong>KHÔNG THỂ DÙNG ĐỂ ĐỌC DỮ LIỆU</strong>! Không giúp tăng hiệu năng đọc."],
        ["<strong>RDS Read Replicas</strong>", "<strong>Bất đồng bộ (Asynchronous)</strong> (tối đa 15 bản sao)", "<strong>Tăng hiệu năng Đọc (Scale Read)</strong> cho các truy vấn báo cáo/BI nặng.", "Không tự động Failover như Multi-AZ. Tạo Read Replica cùng Region được miễn phí truyền dữ liệu."],
        ["<strong>Amazon Aurora</strong>", "Lưu <strong>6 bản sao trên 3 AZ</strong> tự động", "Hiệu năng gấp 3-5 lần MySQL/PostgreSQL chuẩn, có <em>Aurora Serverless</em> và <em>Aurora Global DB</em> (RTO < 1 phút).", "Khi nhiều hàm Lambda gọi vào RDS/Aurora gây cạn kiệt kết nối → Đặt <strong>RDS Proxy</strong> ở phía trước."],
        ["<strong>DynamoDB (+ DAX)</strong>", "NoSQL Serverless tự nhân bản trên 3 AZ", "Key-Value NoSQL độ trễ vài mili-giây ở mọi quy mô. Có <em>Global Tables</em> (Active-Active Multi-Region) và <em>TTL</em>.", "Thêm <strong>DAX</strong> để giảm độ trễ đọc xuống <strong>micro-giây</strong> và trị bệnh <em>Hot Key</em> mà không cần sửa code."]
      ]
    },
    {
      id: "messaging",
      title: "5. So sánh Decoupling & Streaming (SQS vs SNS vs Kinesis vs Amazon MQ)",
      headers: ["Dịch vụ", "Mô hình hoạt động", "Lưu trữ & Thứ tự", "Khi nào chọn trong đề thi?"],
      rows: [
        ["<strong>Amazon SQS</strong>", "Queue • <strong>Pull (Kéo)</strong> (Consumer chủ động bốc tin)", "Lưu tối đa 14 ngày (<span class=\"fact-update\" data-since=\"2025-08\">tối đa 1 MiB/tin</span> <span class=\"exam-legacy\">Đề cũ: 256 KB</span>). Bản <code>FIFO</code> đảm bảo đúng thứ tự 100% và không trùng lặp.", "Gỡ rối (Decouple) giữa tầng Web và tầng Worker EC2/Lambda. Nhớ tăng <em>Visibility Timeout</em> nếu xử lý lâu và bật <em>Long Polling</em> để tiết kiệm tiền."],
        ["<strong>Amazon SNS</strong>", "Pub/Sub • <strong>Push (Đẩy)</strong> ra nhiều người nhận cùng lúc", "Không lưu giữ tin nhắn lâu dài.", "Gửi thông báo Email/SMS, hoặc kết hợp <strong>SNS + nhiều SQS (Fan-out Pattern)</strong> để gửi 1 sự kiện cho nhiều hệ thống xử lý độc lập."],
        ["<strong>Kinesis Data Streams</strong>", "Real-time Streaming (~200ms)", "Lưu trữ từ <strong>1 đến 365 ngày</strong>, cho phép <strong>Replay (đọc lại)</strong>.", "Thu thập và xử lý dữ liệu <strong>Thời gian thực (Real-time)</strong> từ IoT, Clickstream, Log cần viết code xử lý riêng hoặc cần Replay."],
        ["<strong>Amazon Data Firehose (Kinesis Data Firehose)</strong>", "Near Real-time Ingestion (buffer 0–900 giây, <span class=\"exam-legacy\">Đề cũ: ≥ 60 giây</span>)", "<strong>Không lưu trữ</strong>, hoàn toàn Serverless.", "Đề bài cần nạp thẳng luồng dữ liệu vào <strong>S3, Redshift, OpenSearch hoặc Apache Iceberg</strong> với ít công sức vận hành nhất (Least operational overhead)."],
        ["<strong>Amazon MQ</strong>", "Managed RabbitMQ / ActiveMQ", "Hỗ trợ giao thức chuẩn mở: <strong>AMQP, MQTT, STOMP, JMS</strong>.", "Khi <strong>migrate ứng dụng cũ từ On-premise lên AWS mà không muốn viết lại code</strong> gọi hàng đợi."]
      ]
    },
    {
      id: "security",
      title: "6. So sánh Tường lửa & Bảo mật (Security Group vs NACL vs WAF vs Shield)",
      headers: ["Dịch vụ", "Phạm vi bảo vệ", "Đặc tính cốt lõi", "Khi nào chọn trong đề thi?"],
      rows: [
        ["<strong>Security Group</strong>", "Tầng máy chủ <strong>EC2 / ENI</strong> (Layer 4)", "<strong>Stateful</strong> (vào được là tự ra được). <strong>Chỉ có quy tắc Allow</strong> (không có Deny).", "Mở cổng truy cập giữa các tầng Web, App, DB (dùng kỹ thuật tham chiếu Security Group ID của nhau)."],
        ["<strong>Network ACL (NACL)</strong>", "Tầng <strong>Subnet</strong> (Layer 4)", "<strong>Stateless</strong> (kiểm tra cả vào lẫn ra). <strong>Có cả Allow và Deny</strong>.", "Khi cần <strong>chặn (Block / Deny) đích danh một hoặc một vài địa chỉ IP độc hại</strong> ở tầng mạng Subnet."],
        ["<strong>AWS WAF</strong>", "Tầng ứng dụng <strong>Layer 7 (HTTP/HTTPS)</strong>", "Gắn lên <strong>CloudFront, ALB, API Gateway, Cognito</strong> (Không gắn trực tiếp lên EC2 hay NLB!).", "Chống <strong>SQL Injection, XSS</strong>, chặn theo quốc gia (Geo-block), hoặc giới hạn số request tối đa từ 1 IP (<strong>Rate-based rules</strong>)."],
        ["<strong>AWS Shield</strong>", "Chống tấn công <strong>DDoS</strong> (Layer 3 & 4)", "<em>Standard</em> (Miễn phí) vs <em>Advanced</em> ($3000/tháng, có đội chuyên gia 24/7 và bảo hiểm hóa đơn).", "Bảo vệ hệ thống khỏi các cuộc tấn công từ chối dịch vụ phân tán (DDoS) quy mô lớn."]
      ]
    }
  ],

  freeResources: [
    {
      category: "Luyện Đề Miễn Phí (Free Practice Exams)",
      title: "DevCloudly - Bộ Đề Luyện Thi AWS SAA-C03 Miễn Phí (J2TEAM)",
      desc: "Nguồn đề thi thử hoàn toàn miễn phí được tác giả bài viết tại Nhật sử dụng. Có chế độ luyện từng câu và giải thích đáp án chi tiết bằng tiếng Việt/Anh.",
      url: "https://devcloudly.vercel.app/exams?courseId=40003",
      badge: "Miễn phí 100%"
    },
    {
      category: "Tài Liệu Tóm Tắt & Bảng So Sánh (Cheat Sheets)",
      title: "Tutorials Dojo - Kho AWS Cheat Sheets Toàn Tập (Jon Bonso)",
      desc: "Trang tóm tắt kiến thức và bảng so sánh các dịch vụ dễ nhầm lẫn chuẩn mực nhất thế giới cho kỳ thi SAA-C03, hoàn toàn miễn phí đọc online.",
      url: "https://tutorialsdojo.com/aws-cheat-sheets/",
      badge: "Kim chỉ nam SAA-C03"
    },
    {
      category: "Hướng Dẫn Học Tập Tổng Thể",
      title: "Tutorials Dojo - SAA-C03 Study Guide & Exam Path",
      desc: "Tổng hợp toàn bộ các dịch vụ xuất hiện trong đề thi SAA-C03 mới nhất kèm các câu hỏi mẫu và mẹo tránh bẫy đề thi.",
      url: "https://tutorialsdojo.com/aws-certified-solutions-architect-associate-saa-c03/",
      badge: "Study Guide"
    },
    {
      category: "So Sánh Cặp Đôi Dịch Vụ",
      title: "Tutorials Dojo - Comparison of AWS Services",
      desc: "Tổng hợp tất cả các bài viết đặt 2-3 dịch vụ tương đồng cạnh nhau (ALB vs NLB, EBS vs EFS, SQS vs SNS vs Kinesis, CloudWatch vs CloudTrail...).",
      url: "https://tutorialsdojo.com/comparison-of-aws-services/",
      badge: "Bắt buộc đọc"
    },
    {
      category: "Luyện Đề Sát Thi Thật",
      title: "Cloud Exam Pro - SAA-C03 Practice Exams",
      desc: "Nguồn đề thi thử sát với đề thi thật được nhắc đến trong bài chia sẻ kinh nghiệm thi tại Yokohama, Nhật Bản.",
      url: "https://cloudexam.pro/course/practice-exams-aws-certified-solutions-architect-associate",
      badge: "Luyện đề"
    },
    {
      category: "Tài Liệu Chính Thức Từ AWS",
      title: "AWS Official Exam Guide - SAA-C03 (HTML/PDF)",
      desc: "Tài liệu đề cương chính thức từ Amazon Web Services quy định rõ 4 Domains, tỷ trọng điểm số và danh sách dịch vụ nằm trong/ngoài phạm vi thi.",
      url: "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html",
      badge: "AWS Official"
    },
    {
      category: "Đề Mẫu Chính Thức Từ AWS",
      title: "AWS Skill Builder - Official Practice Question Set: SAA-C03 (English)",
      desc: "Bộ 20 câu hỏi mẫu chính thức miễn phí do chính đội ngũ AWS Certification biên soạn, phản ánh đúng văn phong và cấu trúc câu hỏi SAA-C03.",
      url: "https://skillbuilder.aws/search?searchText=SAA-C03+Official+Practice+Question+Set",
      badge: "AWS Official Free"
    },
    {
      category: "Lộ Trình Ôn Thi Chính Thức",
      title: "AWS Skill Builder - Exam Prep Standard Course: AWS Certified Solutions Architect - Associate",
      desc: "Khóa ôn tập chuẩn chính thức trên AWS Skill Builder giúp rà soát 4 Domains và chiến thuật phân tích tình huống.",
      url: "https://skillbuilder.aws/exam-prep/solutions-architect-associate",
      badge: "AWS Skill Builder"
    }
  ]
};

// Tự động sinh thêm các Buổi 57 -> 80 (Chiến dịch luyện 6 bộ đề, mỗi đề chia làm 4 buổi x 16 câu nhẹ nhàng)
(function generatePracticeSessions() {
  for (let examNum = 1; examNum <= 6; examNum++) {
    const parts = [
      { p: 1, range: "Câu 1 → 16" },
      { p: 2, range: "Câu 17 → 32" },
      { p: 3, range: "Câu 33 → 48" },
      { p: 4, range: "Câu 49 → 65" }
    ];
    parts.forEach((part, idx) => {
      const sessionId = 56 + (examNum - 1) * 4 + (idx + 1);
      window.STUDY_DATA.sessions.push({
        id: sessionId,
        phase: 7,
        section: `Luyện Đề số ${examNum} • Phần ${part.p}/4`,
        title: `Thực chiến Đề thi số ${examNum} (${part.range}) + Chữa sâu câu sai`,
        mode: "Làm 16 câu (25 phút) + Chữa sâu với AI (25 phút) + Anki (10 phút)",
        javaAnalogy: `Chia nhỏ 1 đề 65 câu thành 4 buổi (mỗi buổi chỉ 16 câu) giúp bạn đọc tiếng Anh cực kỳ tỉnh táo, không bị mỏi mắt hay quá tải sau giờ làm việc.`,
        corePoints: [
          `<strong>Bước 1 (10 phút đầu)</strong>: Mở tab Luyện Thẻ Anki (hoặc app Anki) quẹt hết các thẻ đến hạn hôm nay.`,
          `<strong>Bước 2 (25 phút giữa)</strong>: Mở bộ đề số ${examNum} trên DevCloudly / Tutorials Dojo / Cloud Exam Pro, làm đúng <strong>${part.range}</strong>. Áp dụng triệt để kỹ thuật: Đọc câu hỏi cuối cùng trước → Loại 2 đáp án vô lý → Chọn đáp án khớp Keyword nhất.`,
          `<strong>Bước 3 (25 phút cuối - Quan trọng nhất)</strong>: Với mỗi câu làm sai hoặc câu chọn đúng nhưng do đoán mò, hãy đọc kỹ giải thích và dán câu hỏi đó vào AI hỏi rõ: <em>"Tại sao đáp án đúng lại đúng, và tại sao 3 phương án kia lại sai trong tình huống này?"</em>`
        ],
        examTraps: [
          examNum <= 2
            ? "Ở Đề 1 và Đề 2, nếu bạn chỉ đạt 50% - 60% số câu đúng thì HOÀN TOÀN BÌNH THƯỜNG! Đừng nhìn vào điểm số, hãy nhìn vào số lượng kiến thức mới bạn thu hoạch được sau khi chữa mỗi câu sai."
            : "Từ Đề 3 trở đi, hãy chú ý bấm giờ khoảng 1.5 phút/câu. Nếu gặp một dịch vụ hoàn toàn lạ chưa từng nghe tên: Chọn phương án hợp lý nhất, bấm Flag và đi tiếp ngay!"
        ],
        freeDocTitle: "Làm đề miễn phí ngay trên DevCloudly (SAA-C03)",
        freeDocUrl: "https://devcloudly.vercel.app/exams?courseId=40003",
        cards: [
          {
            q: `Mục tiêu quan trọng nhất khi chữa ${part.range} của Đề số ${examNum} là gì?`,
            a: "Không học vẹt đáp án A/B/C/D, mà phải giải thích được bằng lời tại sao 3 đáp án kia sai và Keyword nào trong đề quyết định đáp án đúng."
          }
        ]
      });
    });
  }
})();
