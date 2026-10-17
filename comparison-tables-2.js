// comparison-tables-2.js — Bổ sung metadata cho 6 bảng so sánh cũ và thêm 8 bảng so sánh mới (P2).
(function (root) {
  "use strict";

  const EXISTING_TABLE_META = {
    elb: {
      category: "Networking & CDN",
      relatedSessions: [11, 12, 13, 53],
      examTip: "Nhớ phản xạ 3 giây: HTTP/HTTPS/Path/Host/Docker → ALB; TCP/UDP/Static Elastic IP/Ultra-low latency → NLB; Third-party Firewall/IDS/IPS/GENEVE → GWLB."
    },
    storage: {
      category: "Storage & Migration",
      relatedSessions: [8, 9, 10, 15, 29, 52],
      examTip: "Nhiều máy Linux chia sẻ file qua nhiều AZ → Amazon EFS; Nhiều máy Windows dùng SMB/AD → FSx for Windows; Siêu máy tính HPC gắn S3 → FSx for Lustre; Lưu object vô hạn → S3."
    },
    s3classes: {
      category: "Storage & Migration",
      relatedSessions: [16, 17, 52],
      examTip: "Pattern truy cập không biết trước → S3 Intelligent-Tiering; Có thể tái tạo lại (thumbnails) → One Zone-IA; Lưu trữ lạnh nhưng cần đọc trong mili-giây → Glacier Instant Retrieval."
    },
    db: {
      category: "Database & Analytics",
      relatedSessions: [20, 21, 22, 23, 52],
      examTip: "RDS Multi-AZ chỉ để Failover chịu lỗi (không đọc được Standby ở chế độ DB Instance); muốn giảm tải đọc báo cáo SQL → tạo Read Replica; Lambda gọi RDS bị 'Too many connections' → RDS Proxy."
    },
    messaging: {
      category: "Compute & Serverless",
      relatedSessions: [31, 32, 33, 54],
      examTip: "Gỡ phụ thuộc 1-1 → SQS (tối đa 1 MiB/tin); Gửi đồng thời cho nhiều dịch vụ → SNS + SQS Fan-out; Streaming thời gian thực có Replay → Kinesis Data Streams; Nạp Near real-time vào S3/Redshift/OpenSearch → Amazon Data Firehose."
    },
    security: {
      category: "Security & Governance",
      relatedSessions: [4, 40, 49, 53, 55],
      examTip: "Chặn 1 địa chỉ IP cụ thể ở tầng mạng → NACL Deny rule; Chống SQLi/XSS hoặc giới hạn số request/5 phút từ 1 IP (Rate-based rule) → AWS WAF trên CloudFront/ALB/API Gateway."
    }
  };

  const NEW_TABLES = [
    {
      id: "route53",
      title: "7. So sánh 8 Chính sách Điều hướng của Amazon Route 53 (Routing Policies)",
      category: "Networking & CDN",
      relatedSessions: [26, 27, 28, 53],
      examTip: "Phân biệt kỹ 3 chính sách vị trí: Latency = độ trễ mạng thấp nhất; Geolocation = khóa theo ranh giới quốc gia/châu lục (Compliance); IP-based = định tuyến theo bảng dải CIDR IP của khách hàng/ISP.",
      headers: ["Chính sách (Policy)", "Cơ chế định tuyến", "Có gắn Health Check?", "Từ khóa nhận diện trong đề thi (Keywords)"],
      rows: [
        ["<strong>1. Simple Routing</strong>", "Trả về 1 hoặc nhiều IP ngẫu nhiên cho 1 tên miền", "<strong>Không</strong>", "<em>Single server, simple DNS record without health checks</em>"],
        ["<strong>2. Weighted Routing</strong>", "Chia phần trăm lưu lượng theo trọng số (0–255)", "Có", "<em>Blue/Green deployment, Canary testing (10% new / 90% old), load distribution across regions</em>"],
        ["<strong>3. Latency-based Routing</strong>", "Điều hướng về AWS Region có <strong>độ trễ mạng thấp nhất</strong>", "Có", "<em>Lowest network latency for global users, fastest response time</em>"],
        ["<strong>4. Failover Routing</strong>", "Active–Passive (Primary sập thì tự chuyển sang Secondary)", "<strong>Bắt buộc</strong> trên Primary", "<em>Active-Passive Disaster Recovery, automatic failover to backup site/S3 static page</em>"],
        ["<strong>5. Geolocation Routing</strong>", "Theo vị trí địa lý thực tế (Quốc gia, Châu lục, Tiểu bang)", "Có (nên có bản ghi Default `*`)", "<em>Data residency compliance, restrict content by country, localized language per country</em>"],
        ["<strong>6. Geoproximity Routing</strong>", "Theo khoảng cách địa lý có hệ số <strong>Bias (-99 đến +99)</strong>", "Có", "<em>Shift traffic between regions dynamically by expanding/shrinking geographic radius (Bias)</em>"],
        ["<strong>7. Multi-Value Answer</strong>", "Trả về tối đa 8 IP khỏe mạnh (Client-side load balancing)", "Có (trên từng bản ghi)", "<em>Return multiple healthy IP addresses, simple client-side load balancing (not a substitute for ELB)</em>"],
        ["<strong>8. IP-based Routing</strong>", "Tra cứu dải <strong>CIDR IP nguồn của Client/ISP</strong> trong bảng CIDR collection", "Có", "<em>Route traffic based on client IP CIDR blocks / ISP networks to optimize performance or transit costs</em>"]
      ]
    },
    {
      id: "dr",
      title: "8. So sánh 4 Chiến lược Khôi phục Thảm họa (Disaster Recovery Strategies)",
      category: "Architecture & DR",
      relatedSessions: [50, 51, 52],
      examTip: "Mẹo vàng: Chỉ bật Database còn Web/App EC2 tắt → Pilot Light; Cả Web/App và Database đều chạy sẵn 24/7 ở quy mô thu nhỏ → Warm Standby.",
      headers: ["Chiến lược DR", "RTO & RPO điển hình", "Trạng thái hạ tầng ở Region dự phòng", "Khi nào chọn trong đề thi?"],
      rows: [
        ["<strong>1. Backup &amp; Restore</strong>", "RTO: Hàng giờ<br>RPO: Hàng giờ (tùy lịch chụp)", "Không có máy chủ nào chạy; chỉ có bản sao Snapshot/Backup trên S3/AWS Backup.", "Chi phí <strong>rẻ nhất</strong>, ứng dụng không quan trọng, chấp nhận ngừng hoạt động nhiều giờ."],
        ["<strong>2. Pilot Light (Ngọn lửa mồi)</strong>", "RTO: Vài chục phút (10–30 phút)<br>RPO: Vài giây/phút", "<strong>Chỉ bật tầng Database đồng bộ liên tục</strong>; tầng Web/App EC2 đang <strong>TẮT (Stopped/AMI)</strong>.", "Khi đề bài nêu rõ: <em>DB luôn nhân bản sang Region phụ, còn máy chủ ứng dụng chỉ được khởi chạy khi có thảm họa</em>."],
        ["<strong>3. Warm Standby</strong>", "RTO: Vài phút<br>RPO: Vài giây", "<strong>Cả tầng Web/App lẫn Database đều chạy 24/7 nhưng ở cấu hình thu nhỏ (Scaled-down)</strong>.", "Cần khôi phục trong <strong>vài phút</strong> với chi phí hợp lý; khi có sự cố chỉ cần Auto Scaling mở rộng cụm sẵn có."],
        ["<strong>4. Multi-Site Active/Active</strong>", "RTO: Gần bằng 0 (Tức thì)<br>RPO: Gần bằng 0", "Chạy <strong>100% tải ở cả 2 hoặc nhiều Regions</strong> (Route 53 Latency/Weighted + DynamoDB Global Tables / Aurora Global DB).", "Ứng dụng nhiệm vụ sống còn (Mission-critical), yêu cầu <strong>Zero downtime</strong> nhưng chi phí <strong>đắt nhất</strong>."]
      ]
    },
    {
      id: "encryption",
      title: "9. So sánh Mã hóa, Quản lý Khóa & Bí mật (KMS vs CloudHSM vs Secrets Manager vs Parameter Store)",
      category: "Security & Governance",
      relatedSessions: [18, 48, 55],
      examTip: "99% câu hỏi khóa mã hóa chọn AWS KMS (đạt chuẩn FIPS 140-3 Level 3, xoay vòng 90–2,560 ngày). Chỉ chọn CloudHSM khi đề đòi Single-tenant Dedicated Hardware hoặc PKCS#11/Oracle TDE.",
      headers: ["Dịch vụ", "Vai trò & Kiến trúc", "Tính năng xoay vòng (Rotation)", "Từ khóa chọn trong đề thi"],
      rows: [
        ["<strong>AWS KMS</strong>", "Quản lý khóa mã hóa Multi-tenant, tích hợp sẵn mọi dịch vụ AWS. Đạt chuẩn <span class=\"fact-update\" data-since=\"2024-06\">FIPS 140-3 Level 3</span>.", "AWS Managed Key: 1 năm/lần. CMK: bật tự động xoay vòng <strong>90–2,560 ngày</strong> (Imported key không tự xoay vòng).", "<em>SSE-KMS, audit key usage in CloudTrail, cross-account encrypted snapshot/S3 sharing via CMK</em>"],
        ["<strong>AWS CloudHSM</strong>", "Phần cứng HSM chuyên dụng <strong>Single-tenant</strong> nằm trong VPC của bạn; AWS không có quyền truy cập khóa.", "Khách hàng tự quản lý hoàn toàn vòng đời khóa.", "<em>Dedicated single-tenant HSM hardware, full customer control, PKCS#11 / JCE / CNG, custom SSL offload, Oracle TDE</em>"],
        ["<strong>AWS Secrets Manager</strong>", "Lưu trữ mật khẩu DB, API keys có tính phí ($0.40/secret/tháng), hỗ trợ Multi-Region replication.", "<strong>Tự động xoay vòng mật khẩu định kỳ (Auto Rotation)</strong> tích hợp sẵn cho RDS, Aurora, Redshift, DocumentDB.", "<em>Automatically rotate database credentials every N days without downtime, native RDS/Aurora integration</em>"],
        ["<strong>SSM Parameter Store</strong>", "Lưu trữ biến cấu hình phân cấp (<code>/prod/app/db-url</code>), có gói <strong>Standard hoàn toàn miễn phí</strong>.", "Không có Lambda xoay vòng tự động dựng sẵn (dùng EventBridge + Parameter Policy TTL để nhắc hạn).", "<em>Store hierarchical configuration parameters and SecureStrings at zero cost (most cost-effective)</em>"]
      ]
    },
    {
      id: "vpc-connectivity",
      title: "10. So sánh Kết nối VPC & Hybrid (Peering vs Transit Gateway vs PrivateLink vs Endpoints vs VPN/DX)",
      category: "Networking & CDN",
      relatedSessions: [37, 38, 39, 41, 42, 43, 53],
      examTip: "Gọi S3/DynamoDB từ Private Subnet không tốn tiền NAT → Gateway VPC Endpoint (Free!). Chia sẻ 1 dịch vụ cho nhiều VPC bị trùng dải IP CIDR → AWS PrivateLink!",
      headers: ["Giải pháp", "Mô hình kết nối", "Chấp nhận trùng IP CIDR?", "Khi nào chọn trong đề thi?"],
      rows: [
        ["<strong>VPC Peering</strong>", "Nối điểm-điểm 1-1 giữa 2 VPC (<strong>Không có tính bắc cầu / Non-transitive</strong>)", "<strong>Không</strong>", "Nối một vài cặp VPC đơn giản, chi phí thấp, không trùng lặp dải địa chỉ IP."],
        ["<strong>AWS Transit Gateway (TGW)</strong>", "Trạm trung chuyển <strong>Hub-and-Spoke</strong> nối hàng nghìn VPC, VPN và Direct Connect", "Không (giữa các VPC định tuyến chung)", "Thay thế mạng lưới VPC Peering phức tạp (Full mesh), hỗ trợ <strong>ECMP</strong> tăng băng thông VPN và Multicast."],
        ["<strong>Gateway VPC Endpoint</strong>", "Cổng nối thẳng qua Route Table tới <strong>Amazon S3 và DynamoDB</strong>", "Không áp dụng", "<strong>Miễn phí 100%!</strong> Luôn chọn khi EC2/Lambda trong Private Subnet cần truy cập S3 hoặc DynamoDB để bỏ phí NAT Gateway."],
        ["<strong>Interface VPC Endpoint / PrivateLink</strong>", "Card mạng ENI trong Subnet nối riêng tư tới hơn 100 dịch vụ AWS hoặc dịch vụ nội bộ qua NLB", "<strong>CÓ (Overlapping CIDRs OK!)</strong>", "Gọi riêng tư tới SQS, SNS, KMS, Secrets Manager... HOẶC cung cấp 1 microservice nội bộ theo 1 chiều cho hàng chục VPC khách hàng bị <strong>trùng dải IP CIDR</strong>."],
        ["<strong>AWS Site-to-Site VPN &amp; Client VPN</strong>", "Đường hầm mã hóa qua Internet công cộng (IPsec / OpenVPN)", "Không", "Triển khai <strong>nhanh trong vài giờ</strong>, làm đường dự phòng giá rẻ cho Direct Connect (Site-to-Site) hoặc cho nhân viên làm việc từ xa (Client VPN)."],
        ["<strong>AWS Direct Connect (DX)</strong>", "Đường cáp quang vật lý riêng tư (1/10/100 Gbps) từ Data Center lên AWS", "Không", "Cần <strong>băng thông lớn ổn định, độ trễ nhất quán</strong> (mất vài tuần lắp đặt; mặc định chưa mã hóa IPsec nên kết hợp VPN trên DX nếu cần mã hóa)."]
      ]
    },
    {
      id: "migration",
      title: "11. So sánh Công cụ Di chuyển & Truyền dữ liệu (DataSync vs Storage Gateway vs Transfer Family vs Snowball vs DMS vs MGN)",
      category: "Storage & Migration",
      relatedSessions: [30, 42, 50],
      examTip: "Có sẵn mạng đủ nhanh + cần giữ nguyên metadata file NFS/SMB → AWS DataSync. Cần giữ máy chủ dưới đất kèm Local Cache mở file S3 → S3 File Gateway. Đổi hệ DB (Oracle sang Aurora) → AWS SCT + AWS DMS.",
      headers: ["Công cụ", "Mục đích chính", "Đặc điểm kỹ thuật cần nhớ", "Từ khóa chọn trong đề thi"],
      rows: [
        ["<strong>AWS DataSync</strong>", "Đồng bộ / Di chuyển file qua mạng (Internet/DX) lên S3, EFS, FSx", "Tốc độ nhanh gấp 10 lần công cụ thường, <strong>giữ nguyên quyền file (preserve metadata/permissions)</strong>, có giới hạn băng thông.", "<em>Migrate/replicate large NAS (NFS/SMB) data over existing network/Direct Connect while preserving file metadata</em>"],
        ["<strong>AWS Storage Gateway</strong>", "Lưu trữ Hybrid nối On-premise với đám mây (S3/FSx File, Volume, Tape)", "Có <strong>Local Cache</strong> tại chỗ để đọc file độ trễ thấp; <em>Tape Gateway (VTL)</em> thay thế cuộn băng từ vật lý.", "<em>Hybrid storage with local cache for low-latency on-premises access, or replace physical backup tapes (VTL)</em>"],
        ["<strong>AWS Transfer Family</strong>", "Cổng truyền file quản lý sẵn qua giao thức <strong>SFTP, FTPS, FTP</strong>", "Lưu trực tiếp file vào <strong>Amazon S3 hoặc Amazon EFS</strong>, tích hợp AD/Okta/Route 53.", "<em>Third-party partners upload/download files directly to S3 or EFS using SFTP/FTPS without managing servers</em>"],
        ["<strong>AWS Snowball Edge</strong>", "Thiết bị lưu trữ vật lý chuyển dữ liệu ngoại tuyến &amp; Edge computing", "<span class=\"fact-update\" data-since=\"2025-11\">Snowcone/Snowmobile đã EOL; Snowball Edge ngừng nhận khách mới từ 11/2025</span> <span class=\"exam-legacy\">Đề cũ: chọn Snowball Edge khi mạng quá chậm</span>.", "<em>Limited internet bandwidth, offline petabyte/hundreds-of-TB migration to S3 (then Lifecycle to Glacier), edge EC2 compute</em>"],
        ["<strong>AWS DMS (+ AWS SCT)</strong>", "Di chuyển Database liên tục với <strong>gần như không có downtime (CDC)</strong>", "Cùng hệ DB chỉ cần DMS; <strong>khác hệ DB (Heterogeneous: Oracle → Aurora PostgreSQL) phải chạy AWS SCT trước</strong>.", "<em>Migrate production database to RDS/Aurora with minimal downtime and continuous data replication</em>"],
        ["<strong>AWS Application Migration Service (MGN)</strong>", "Di chuyển máy chủ vật lý / VMware / Hyper-V lên EC2 (<strong>Lift-and-shift</strong>)", "Sao chép từng block ổ đĩa theo thời gian thực để cắt chuyển (Cutover) nhanh.", "<em>Lift-and-shift (rehost) physical or virtual on-premises servers to Amazon EC2 with minimal downtime</em>"]
      ]
    },
    {
      id: "monitoring",
      title: "12. So sánh Giám sát, Truy vết & Kiểm toán (CloudWatch vs X-Ray vs CloudTrail vs Config vs GuardDuty/Inspector/Macie)",
      category: "Security & Governance",
      relatedSessions: [46, 49, 55],
      examTip: "Hiệu năng/Log/Báo động → CloudWatch; Truy vết độ trễ xuyên microservices (Service Map) → X-Ray; Ai đã gọi lệnh API gì → CloudTrail; Tài nguyên cấu hình có đúng chuẩn không → AWS Config.",
      headers: ["Dịch vụ", "Câu hỏi trả lời", "Chức năng trọng tâm", "Từ khóa chọn trong đề thi"],
      rows: [
        ["<strong>Amazon CloudWatch</strong>", "Hệ thống đang <strong>chạy nhanh hay chậm, còn bao nhiêu RAM/Disk</strong>?", "Metrics, Alarms, Logs (<em>Logs Insights, Metric Filter, Subscription Filter</em>). Cần cài <strong>CW Agent</strong> để đo RAM và Disk EC2.", "<em>Performance metrics, custom memory/disk utilization via Agent, Metric Filter on logs to trigger alarms</em>"],
        ["<strong>AWS X-Ray</strong>", "Request bị <strong>chậm hoặc lỗi 5xx ở microservice nào</strong> trên đường đi?", "Truy vết phân tán (<strong>Distributed tracing end-to-end</strong>) và vẽ bản đồ <strong>Service Map</strong>.", "<em>Trace requests end-to-end across microservices/Lambda, identify latency bottlenecks, visual service map</em>"],
        ["<strong>AWS CloudTrail</strong>", "<strong>AI (Who)</strong> đã gọi lệnh API xóa/sửa tài nguyên vào lúc nào, từ IP nào?", "Ghi lại toàn bộ lịch sử lệnh <strong>API calls / Management &amp; Data Events</strong>; có <em>CloudTrail Insights</em> phát hiện tần suất gọi API bất thường.", "<em>Audit API calls, track who deleted a resource or modified a security group, log file integrity validation</em>"],
        ["<strong>AWS Config</strong>", "Cấu hình tài nguyên <strong>biến đổi thế nào và có tuân thủ quy định (Compliance)</strong> không?", "Lưu lịch sử cấu hình theo thời gian và tự động sửa lỗi (Auto-remediation qua SSM Automation).", "<em>Audit resource configuration compliance over time (e.g., detect unencrypted EBS or open SSH ports and auto-remediate)</em>"],
        ["<strong>GuardDuty vs Inspector vs Macie</strong>", "Có <strong>hacker/lỗ hổng/lộ dữ liệu PII</strong> không?", "<strong>GuardDuty</strong>: AI phân tích log bắt hacker/đào coin. <strong>Inspector</strong>: Quét lỗ hổng CVE trên EC2/ECR/Lambda. <strong>Macie</strong>: Quét PII trên S3.", "<em>Threat detection (GuardDuty) vs Automated CVE vulnerability scanning (Inspector) vs Discover sensitive PII in S3 (Macie)</em>"]
      ]
    },
    {
      id: "compute",
      title: "13. So sánh Dịch vụ Tính toán & Điều phối (EC2 vs ECS Fargate vs Lambda vs Batch vs Step Functions vs API Gateway)",
      category: "Compute & Serverless",
      relatedSessions: [3, 5, 34, 35, 36, 54],
      examTip: "Tác vụ sự kiện < 15 phút → Lambda; Container Serverless chạy > 15 phút hoặc Web liên tục → ECS Fargate; Điều phối workflow (Standard ≤ 1 năm, Express ≤ 5 phút) → Step Functions; Cổng API (timeout mặc định 29s) → API Gateway.",
      headers: ["Dịch vụ", "Giới hạn thời gian & Tài nguyên", "Mô hình vận hành", "Khi nào chọn trong đề thi?"],
      rows: [
        ["<strong>Amazon EC2</strong>", "Không giới hạn thời gian; toàn quyền chọn CPU/RAM/GPU/OS", "IaaS — Khách hàng tự quản lý bản vá OS và cấu hình Auto Scaling Group.", "Cần kiểm soát sâu hệ điều hành, phần mềm BYOL (Dedicated Hosts), hoặc tải cố định lâu dài dùng Savings Plans."],
        ["<strong>ECS / EKS với AWS Fargate</strong>", "Không giới hạn thời gian chạy (<strong>&gt; 15 phút OK</strong>); tới 16 vCPU / 120 GB RAM", "<strong>Serverless Containers</strong> — Chỉ đưa Docker Image, không cần quản lý máy chủ EC2.", "Chạy Microservices đóng gói Docker hoặc tác vụ xử lý vượt quá giới hạn 15 phút của Lambda mà muốn Serverless."],
        ["<strong>AWS Lambda</strong>", "Tối đa <strong>15 phút (900 giây)</strong>, RAM tới <strong>10 GB</strong>, <code>/tmp</code> tới 10 GB", "<strong>Serverless FaaS</strong> — Trả tiền theo mili-giây thực thi và số request.", "Xử lý sự kiện ngắn hạn từ S3, DynamoDB Streams, SQS, API Gateway. Hỗ trợ <em>Lambda Destinations</em> và <em>SnapStart</em>."],
        ["<strong>AWS Batch</strong>", "Không giới hạn thời gian", "Tự động lập lịch hàng đợi và bật tắt cụm EC2/Spot hoặc Fargate theo lô.", "Xử lý hàng chục nghìn tác vụ tính toán lô (<strong>High-scale batch processing jobs</strong>) dưới dạng Docker container."],
        ["<strong>AWS Step Functions</strong>", "<strong>Standard</strong>: tối đa <strong>1 năm</strong> (Exactly-once)<br><strong>Express</strong>: tối đa <strong>5 phút</strong> (&gt;100,000/s)", "Serverless Workflow Orchestration bằng biểu đồ trạng thái JSON (ASL).", "Điều phối chuỗi nhiều hàm Lambda/ECS có rẽ nhánh, xử lý lỗi Retry/Catch, chờ con người phê duyệt (Standard) hoặc luồng IoT tốc độ cao (Express)."],
        ["<strong>Amazon API Gateway</strong>", "Integration Timeout mặc định <strong>29 giây (29s)</strong>; Payload tới 10 MB", "<strong>HTTP API</strong> (rẻ hơn ~70%, OIDC/JWT proxy) vs <strong>REST API</strong> (Caching, Usage Plans/API Keys, WAF, Private API).", "Làm cổng mặt tiền Serverless cho Lambda/HTTP backends, hỗ trợ WebSocket hai chiều và kiểm soát truy cập."]
      ]
    },
    {
      id: "identity",
      title: "14. So sánh Dịch vụ Danh tính & Quản trị Đa tài khoản (IAM vs Identity Center vs Cognito vs Directory Service vs SCP/RCP)",
      category: "Security & Governance",
      relatedSessions: [1, 2, 47, 55],
      examTip: "Nhân viên công ty đăng nhập nhiều tài khoản AWS → IAM Identity Center (SSO); Khách hàng web/mobile đăng nhập → Cognito User Pools; Proxy xác thực về AD dưới đất không lưu user lên mây → AD Connector!",
      headers: ["Dịch vụ / Chính sách", "Đối tượng phục vụ chính", "Đặc điểm kỹ thuật cốt lõi", "Từ khóa chọn trong đề thi"],
      rows: [
        ["<strong>IAM Roles &amp; STS</strong>", "Dịch vụ AWS (EC2/Lambda) hoặc Cross-Account", "Cấp thông tin xác thực <strong>tạm thời (Temporary credentials)</strong> qua lệnh <code>AssumeRole</code>.", "<em>Grant EC2/Lambda access to S3 without storing long-term access keys, or cross-account access</em>"],
        ["<strong>AWS IAM Identity Center</strong>", "Nhân viên nội bộ đăng nhập vào <strong>nhiều tài khoản AWS</strong> và ứng dụng doanh nghiệp", "Hỗ trợ SAML 2.0, kết nối sẵn với Active Directory hoặc Okta/Azure AD.", "<em>Single Sign-On (SSO) for workforce users across multiple AWS accounts in AWS Organizations</em>"],
        ["<strong>Amazon Cognito (User Pool vs Identity Pool)</strong>", "Hàng triệu người dùng cuối của <strong>ứng dụng Web / Mobile</strong>", "<strong>User Pool</strong> = Xác thực (Authentication, JWT, Social login). <strong>Identity Pool</strong> = Đổi lấy quyền AWS tạm thời (STS) gọi thẳng S3/DynamoDB.", "<em>Mobile/Web app sign-up and sign-in with Google/Facebook/SAML (User Pool) + temporary direct access to S3 (Identity Pool)</em>"],
        ["<strong>AWS Directory Service</strong>", "Tích hợp hệ thống <strong>Microsoft Active Directory</strong>", "<strong>Managed Microsoft AD</strong> (AD thật trên AWS, hỗ trợ Trust 2 chiều, RDS SQL Server, FSx); <strong>AD Connector</strong> (Proxy chuyển tiếp về AD On-premise, <strong>không lưu user trên mây</strong>); <strong>Simple AD</strong> (Samba 4 nhỏ).", "<em>Authenticate against on-premises AD without caching user credentials in AWS (AD Connector) vs Forest Trust &amp; RDS SQL Server (Managed Microsoft AD)</em>"],
        ["<strong>SCP vs RCP (AWS Organizations)</strong>", "Hàng rào quản trị (Guardrails) cho các Member Accounts", "<strong>SCP</strong> giới hạn quyền tối đa của <em>Principal</em>; <strong>RCP</strong> giới hạn quyền tối đa trên <em>Resource</em> (S3, KMS, SQS, Secrets Manager, IAM Role). <strong>Không tác động lên Management Account và Service-Linked Roles</strong>.", "<em>Enforce organization-wide permission guardrails on principals (SCP) or prevent external access to resources across accounts (RCP)</em>"]
      ]
    }
  ];

  function applyComparisonTables(studyData) {
    if (!studyData || !Array.isArray(studyData.comparisonTables)) return [];
    const tables = studyData.comparisonTables;

    for (const t of tables) {
      if (t && t.id && EXISTING_TABLE_META[t.id]) {
        const meta = EXISTING_TABLE_META[t.id];
        if (!t.category) t.category = meta.category;
        if (!Array.isArray(t.relatedSessions)) t.relatedSessions = [...meta.relatedSessions];
        if (!t.examTip) t.examTip = meta.examTip;
      }
    }

    const existingIds = new Set(tables.map((t) => t && t.id));
    for (const nt of NEW_TABLES) {
      if (!existingIds.has(nt.id)) {
        tables.push({
          ...nt,
          headers: [...nt.headers],
          rows: nt.rows.map((r) => [...r]),
          relatedSessions: [...nt.relatedSessions]
        });
        existingIds.add(nt.id);
      }
    }

    return tables;
  }

  if (root) {
    root.COMPARISON_TABLES_2 = { EXISTING_TABLE_META, NEW_TABLES, applyComparisonTables };
    if (root.STUDY_DATA) {
      applyComparisonTables(root.STUDY_DATA);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { EXISTING_TABLE_META, NEW_TABLES, applyComparisonTables };
  }
})(typeof window !== "undefined" ? window : globalThis);
