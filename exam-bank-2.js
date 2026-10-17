// exam-bank-2.js — Ngân hàng câu hỏi thi thử & checkpoint (pool: "exam") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = [
  {
    "id": "x-p3-001",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      20
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-001, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-001 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-002",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      4,
      21
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-002, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-002 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  },
  {
    "id": "x-p3-003",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      22
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-003, Phase 3 Session 22) focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-003 - Chặng 3, Buổi #22] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet."
    ],
    "correctIdx": 3,
    "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-3",
      "s22",
      "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
    ]
  },
  {
    "id": "x-p3-004",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      10,
      23
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p3-004. A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p3-004] Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Provision 200 RCU (100 strongly consistent reads x ceil(6 KB / 4 KB)) and 120 WCU (40 standard writes x ceil(2.4 KB / 1 KB)).",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Trong DynamoDB: 1 WCU = 1 lượt ghi chuẩn/giây cho item tối đa 1 KB (Transactional Write tốn gấp đôi). 1 RCU = 1 lượt đọc Strongly Consistent/giây (hoặc 2 lượt đọc Eventually Consistent/giây) cho item tối đa 4 KB (Transactional Read tốn gấp đôi). Luôn làm tròn LÊN kích thước từng item trước khi nhân số lượng request!",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s23",
      "IP-based Routing",
      "Shared Responsibility Model",
      "Well-Architected",
      "Resource Control Policies (RCPs)",
      "Management Account",
      "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
    ]
  },
  {
    "id": "x-p3-005",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      24
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-005, Phase 3 Session 24) focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-005 - Chặng 3, Buổi #24] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Enable DynamoDB Streams and convert the table into an Amazon DynamoDB Global Table spanning both AWS Regions for active-active read and write access.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "DynamoDB Global Tables cung cấp kiến trúc cơ sở dữ liệu Multi-Region Active-Active (ứng dụng đọc và ghi cục bộ ở bất kỳ Region nào với độ trễ một chữ số mili-giây), tự động nhân bản hai chiều dựa trên nền tảng DynamoDB Streams.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s24",
      "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
    ]
  },
  {
    "id": "x-p3-006",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      16,
      25
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-006, Phase 3 Session 25) focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-006 - Chặng 3, Buổi #25] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon MemoryDB for Redis, which combines sub-millisecond in-memory reads with a distributed Multi-AZ transactional log for full database durability.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Khác với ElastiCache (vốn là lớp cache đứng trước DB), Amazon MemoryDB for Redis là cơ sở dữ liệu chính (Primary Database) tương thích Redis, vừa đọc cực nhanh trên RAM vừa ghi vào Multi-AZ Transaction Log để đảm bảo không bao giờ mất dữ liệu.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s25",
      "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
    ]
  },
  {
    "id": "x-p3-007",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      26
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-007, Phase 3 Session 26) focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-007 - Chặng 3, Buổi #26] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Create an Amazon Route 53 Alias record at the zone apex (example.com) pointing directly to the Application Load Balancer or CloudFront distribution.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Chuẩn DNS cấm tạo bản ghi CNAME tại tên miền gốc (Zone Apex như example.com), chỉ cho phép tạo ở subdomain (www.example.com). Để trỏ tên miền gốc thẳng vào ALB, CloudFront, S3 Website hay API Gateway (và được miễn phí truy vấn DNS nội bộ AWS), bắt buộc dùng bản ghi Route 53 Alias.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s26",
      "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
    ]
  },
  {
    "id": "x-p3-008",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      3,
      27
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-008, Phase 3 Session 27) focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-008 - Chặng 3, Buổi #27] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Configure an Amazon Route 53 Geolocation routing policy with country-specific records and a Default record to enforce data residency compliance."
    ],
    "correctIdx": 3,
    "explanation": "Phân biệt 3 chính sách vị trí của Route 53: Latency (chọn Region có độ trễ mạng thấp nhất); Geolocation (chọn chính xác theo Quốc gia/Châu lục của user để tuân thủ luật bản quyền/chủ quyền dữ liệu, nhớ cấu hình bản ghi Default); Geoproximity (dùng hệ số Bias từ -99 đến +99 để mở rộng hoặc thu hẹp vùng phủ sóng địa lý).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-3",
      "s27",
      "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
    ]
  },
  {
    "id": "x-p3-009",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      28
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-009, Phase 3 Session 28) focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-009 - Chặng 3, Buổi #28] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy AWS Global Accelerator in front of the Regional Network Load Balancers to provide two static Anycast IPv4 addresses and route UDP gaming traffic over the AWS global network.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Khi ứng dụng dùng giao thức phi HTTP (TCP/UDP như game online, VoIP, IoT, MQTT) hoặc cần 2 địa chỉ Static Anycast IP cố định toàn cầu kèm khả năng chuyển đổi dự phòng (failover) dưới 1 phút qua đường truyền cáp quang nội bộ AWS, đáp án luôn là AWS Global Accelerator.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s28",
      "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
    ]
  },
  {
    "id": "x-p3-010",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      9,
      20
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-010, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-010 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-011",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      21
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-011, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-011 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  },
  {
    "id": "x-p3-012",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      15,
      22
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-012, Phase 3 Session 22) focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-012 - Chặng 3, Buổi #22] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-3",
      "s22",
      "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
    ]
  },
  {
    "id": "x-p3-013",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      23
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is modernizing its cloud infrastructure for production case x-p3-013. A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p3-013] Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Provision 200 RCU (100 strongly consistent reads x ceil(6 KB / 4 KB)) and 120 WCU (40 standard writes x ceil(2.4 KB / 1 KB))."
    ],
    "correctIdx": 3,
    "explanation": "Trong DynamoDB: 1 WCU = 1 lượt ghi chuẩn/giây cho item tối đa 1 KB (Transactional Write tốn gấp đôi). 1 RCU = 1 lượt đọc Strongly Consistent/giây (hoặc 2 lượt đọc Eventually Consistent/giây) cho item tối đa 4 KB (Transactional Read tốn gấp đôi). Luôn làm tròn LÊN kích thước từng item trước khi nhân số lượng request!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-3",
      "s23",
      "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
    ]
  },
  {
    "id": "x-p3-014",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      2,
      24
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-014, Phase 3 Session 24) focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-014 - Chặng 3, Buổi #24] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable DynamoDB Streams and convert the table into an Amazon DynamoDB Global Table spanning both AWS Regions for active-active read and write access.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "DynamoDB Global Tables cung cấp kiến trúc cơ sở dữ liệu Multi-Region Active-Active (ứng dụng đọc và ghi cục bộ ở bất kỳ Region nào với độ trễ một chữ số mili-giây), tự động nhân bản hai chiều dựa trên nền tảng DynamoDB Streams.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s24",
      "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
    ]
  },
  {
    "id": "x-p3-015",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      25
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-015, Phase 3 Session 25) focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-015 - Chặng 3, Buổi #25] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon MemoryDB for Redis, which combines sub-millisecond in-memory reads with a distributed Multi-AZ transactional log for full database durability.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Khác với ElastiCache (vốn là lớp cache đứng trước DB), Amazon MemoryDB for Redis là cơ sở dữ liệu chính (Primary Database) tương thích Redis, vừa đọc cực nhanh trên RAM vừa ghi vào Multi-AZ Transaction Log để đảm bảo không bao giờ mất dữ liệu.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s25",
      "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
    ]
  },
  {
    "id": "x-p3-016",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      8,
      26
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-016, Phase 3 Session 26) focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-016 - Chặng 3, Buổi #26] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Create an Amazon Route 53 Alias record at the zone apex (example.com) pointing directly to the Application Load Balancer or CloudFront distribution.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Chuẩn DNS cấm tạo bản ghi CNAME tại tên miền gốc (Zone Apex như example.com), chỉ cho phép tạo ở subdomain (www.example.com). Để trỏ tên miền gốc thẳng vào ALB, CloudFront, S3 Website hay API Gateway (và được miễn phí truy vấn DNS nội bộ AWS), bắt buộc dùng bản ghi Route 53 Alias.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s26",
      "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
    ]
  },
  {
    "id": "x-p3-017",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      27
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-017, Phase 3 Session 27) focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-017 - Chặng 3, Buổi #27] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Configure an Amazon Route 53 Geolocation routing policy with country-specific records and a Default record to enforce data residency compliance."
    ],
    "correctIdx": 3,
    "explanation": "Phân biệt 3 chính sách vị trí của Route 53: Latency (chọn Region có độ trễ mạng thấp nhất); Geolocation (chọn chính xác theo Quốc gia/Châu lục của user để tuân thủ luật bản quyền/chủ quyền dữ liệu, nhớ cấu hình bản ghi Default); Geoproximity (dùng hệ số Bias từ -99 đến +99 để mở rộng hoặc thu hẹp vùng phủ sóng địa lý).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-3",
      "s27",
      "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
    ]
  },
  {
    "id": "x-p3-018",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      14,
      28
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-018, Phase 3 Session 28) focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-018 - Chặng 3, Buổi #28] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy AWS Global Accelerator in front of the Regional Network Load Balancers to provide two static Anycast IPv4 addresses and route UDP gaming traffic over the AWS global network.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Khi ứng dụng dùng giao thức phi HTTP (TCP/UDP như game online, VoIP, IoT, MQTT) hoặc cần 2 địa chỉ Static Anycast IP cố định toàn cầu kèm khả năng chuyển đổi dự phòng (failover) dưới 1 phút qua đường truyền cáp quang nội bộ AWS, đáp án luôn là AWS Global Accelerator.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s28",
      "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
    ]
  },
  {
    "id": "x-p3-019",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      20
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-019, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-019 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-020",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      1,
      21
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-020, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-020 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  },
  {
    "id": "x-p3-021",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      22
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-021, Phase 3 Session 22) focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-021 - Chặng 3, Buổi #22] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s22",
      "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
    ]
  },
  {
    "id": "x-p3-022",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      7,
      23
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is modernizing its cloud infrastructure for production case x-p3-022. A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p3-022] Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Provision 200 RCU (100 strongly consistent reads x ceil(6 KB / 4 KB)) and 120 WCU (40 standard writes x ceil(2.4 KB / 1 KB))."
    ],
    "correctIdx": 3,
    "explanation": "Trong DynamoDB: 1 WCU = 1 lượt ghi chuẩn/giây cho item tối đa 1 KB (Transactional Write tốn gấp đôi). 1 RCU = 1 lượt đọc Strongly Consistent/giây (hoặc 2 lượt đọc Eventually Consistent/giây) cho item tối đa 4 KB (Transactional Read tốn gấp đôi). Luôn làm tròn LÊN kích thước từng item trước khi nhân số lượng request!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-3",
      "s23",
      "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
    ]
  },
  {
    "id": "x-p3-023",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      24
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-023, Phase 3 Session 24) focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-023 - Chặng 3, Buổi #24] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable DynamoDB Streams and convert the table into an Amazon DynamoDB Global Table spanning both AWS Regions for active-active read and write access.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "DynamoDB Global Tables cung cấp kiến trúc cơ sở dữ liệu Multi-Region Active-Active (ứng dụng đọc và ghi cục bộ ở bất kỳ Region nào với độ trễ một chữ số mili-giây), tự động nhân bản hai chiều dựa trên nền tảng DynamoDB Streams.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s24",
      "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
    ]
  },
  {
    "id": "x-p3-024",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      13,
      25
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-024, Phase 3 Session 25) focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-024 - Chặng 3, Buổi #25] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon MemoryDB for Redis, which combines sub-millisecond in-memory reads with a distributed Multi-AZ transactional log for full database durability.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Khác với ElastiCache (vốn là lớp cache đứng trước DB), Amazon MemoryDB for Redis là cơ sở dữ liệu chính (Primary Database) tương thích Redis, vừa đọc cực nhanh trên RAM vừa ghi vào Multi-AZ Transaction Log để đảm bảo không bao giờ mất dữ liệu.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s25",
      "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
    ]
  },
  {
    "id": "x-p3-025",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      26
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-025, Phase 3 Session 26) focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-025 - Chặng 3, Buổi #26] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Create an Amazon Route 53 Alias record at the zone apex (example.com) pointing directly to the Application Load Balancer or CloudFront distribution.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Chuẩn DNS cấm tạo bản ghi CNAME tại tên miền gốc (Zone Apex như example.com), chỉ cho phép tạo ở subdomain (www.example.com). Để trỏ tên miền gốc thẳng vào ALB, CloudFront, S3 Website hay API Gateway (và được miễn phí truy vấn DNS nội bộ AWS), bắt buộc dùng bản ghi Route 53 Alias.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s26",
      "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
    ]
  },
  {
    "id": "x-p3-026",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      19,
      27
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-026, Phase 3 Session 27) focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-026 - Chặng 3, Buổi #27] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon Route 53 Geolocation routing policy with country-specific records and a Default record to enforce data residency compliance.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Phân biệt 3 chính sách vị trí của Route 53: Latency (chọn Region có độ trễ mạng thấp nhất); Geolocation (chọn chính xác theo Quốc gia/Châu lục của user để tuân thủ luật bản quyền/chủ quyền dữ liệu, nhớ cấu hình bản ghi Default); Geoproximity (dùng hệ số Bias từ -99 đến +99 để mở rộng hoặc thu hẹp vùng phủ sóng địa lý).",
    "whyWrong": [
      null,
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s27",
      "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
    ]
  },
  {
    "id": "x-p3-027",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      28
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-027, Phase 3 Session 28) focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-027 - Chặng 3, Buổi #28] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Deploy AWS Global Accelerator in front of the Regional Network Load Balancers to provide two static Anycast IPv4 addresses and route UDP gaming traffic over the AWS global network."
    ],
    "correctIdx": 3,
    "explanation": "Khi ứng dụng dùng giao thức phi HTTP (TCP/UDP như game online, VoIP, IoT, MQTT) hoặc cần 2 địa chỉ Static Anycast IP cố định toàn cầu kèm khả năng chuyển đổi dự phòng (failover) dưới 1 phút qua đường truyền cáp quang nội bộ AWS, đáp án luôn là AWS Global Accelerator.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-3",
      "s28",
      "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
    ]
  },
  {
    "id": "x-p3-028",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      6,
      20
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-028, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-028 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-029",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      21
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-029, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-029 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  },
  {
    "id": "x-p3-030",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      12,
      22
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-030, Phase 3 Session 22) focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-030 - Chặng 3, Buổi #22] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s22",
      "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
    ]
  },
  {
    "id": "x-p3-031",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      23
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is modernizing its cloud infrastructure for production case x-p3-031. A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p3-031] Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Provision 200 RCU (100 strongly consistent reads x ceil(6 KB / 4 KB)) and 120 WCU (40 standard writes x ceil(2.4 KB / 1 KB))."
    ],
    "correctIdx": 3,
    "explanation": "Trong DynamoDB: 1 WCU = 1 lượt ghi chuẩn/giây cho item tối đa 1 KB (Transactional Write tốn gấp đôi). 1 RCU = 1 lượt đọc Strongly Consistent/giây (hoặc 2 lượt đọc Eventually Consistent/giây) cho item tối đa 4 KB (Transactional Read tốn gấp đôi). Luôn làm tròn LÊN kích thước từng item trước khi nhân số lượng request!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-3",
      "s23",
      "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
    ]
  },
  {
    "id": "x-p3-032",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      18,
      24
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-032, Phase 3 Session 24) focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-032 - Chặng 3, Buổi #24] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable DynamoDB Streams and convert the table into an Amazon DynamoDB Global Table spanning both AWS Regions for active-active read and write access.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "DynamoDB Global Tables cung cấp kiến trúc cơ sở dữ liệu Multi-Region Active-Active (ứng dụng đọc và ghi cục bộ ở bất kỳ Region nào với độ trễ một chữ số mili-giây), tự động nhân bản hai chiều dựa trên nền tảng DynamoDB Streams.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s24",
      "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
    ]
  },
  {
    "id": "x-p3-033",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      25
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-033, Phase 3 Session 25) focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-033 - Chặng 3, Buổi #25] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon MemoryDB for Redis, which combines sub-millisecond in-memory reads with a distributed Multi-AZ transactional log for full database durability.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "Khác với ElastiCache (vốn là lớp cache đứng trước DB), Amazon MemoryDB for Redis là cơ sở dữ liệu chính (Primary Database) tương thích Redis, vừa đọc cực nhanh trên RAM vừa ghi vào Multi-AZ Transaction Log để đảm bảo không bao giờ mất dữ liệu.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s25",
      "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
    ]
  },
  {
    "id": "x-p3-034",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      5,
      26
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-034, Phase 3 Session 26) focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-034 - Chặng 3, Buổi #26] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Create an Amazon Route 53 Alias record at the zone apex (example.com) pointing directly to the Application Load Balancer or CloudFront distribution.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Chuẩn DNS cấm tạo bản ghi CNAME tại tên miền gốc (Zone Apex như example.com), chỉ cho phép tạo ở subdomain (www.example.com). Để trỏ tên miền gốc thẳng vào ALB, CloudFront, S3 Website hay API Gateway (và được miễn phí truy vấn DNS nội bộ AWS), bắt buộc dùng bản ghi Route 53 Alias.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s26",
      "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
    ]
  },
  {
    "id": "x-p3-035",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      27
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-035, Phase 3 Session 27) focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-035 - Chặng 3, Buổi #27] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Configure an Amazon Route 53 Geolocation routing policy with country-specific records and a Default record to enforce data residency compliance.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Phân biệt 3 chính sách vị trí của Route 53: Latency (chọn Region có độ trễ mạng thấp nhất); Geolocation (chọn chính xác theo Quốc gia/Châu lục của user để tuân thủ luật bản quyền/chủ quyền dữ liệu, nhớ cấu hình bản ghi Default); Geoproximity (dùng hệ số Bias từ -99 đến +99 để mở rộng hoặc thu hẹp vùng phủ sóng địa lý).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s27",
      "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
    ]
  },
  {
    "id": "x-p3-036",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      11,
      28
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-036, Phase 3 Session 28) focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-036 - Chặng 3, Buổi #28] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Deploy AWS Global Accelerator in front of the Regional Network Load Balancers to provide two static Anycast IPv4 addresses and route UDP gaming traffic over the AWS global network."
    ],
    "correctIdx": 3,
    "explanation": "Khi ứng dụng dùng giao thức phi HTTP (TCP/UDP như game online, VoIP, IoT, MQTT) hoặc cần 2 địa chỉ Static Anycast IP cố định toàn cầu kèm khả năng chuyển đổi dự phòng (failover) dưới 1 phút qua đường truyền cáp quang nội bộ AWS, đáp án luôn là AWS Global Accelerator.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-3",
      "s28",
      "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
    ]
  },
  {
    "id": "x-p3-037",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      20
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-037, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-037 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-038",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      17,
      21
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-038, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-038 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  },
  {
    "id": "x-p3-039",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      22
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-039, Phase 3 Session 22) focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-039 - Chặng 3, Buổi #22] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s22",
      "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
    ]
  },
  {
    "id": "x-p3-040",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      4,
      23
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is modernizing its cloud infrastructure for production case x-p3-040. A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance. (Choose TWO.)",
    "qVi": "[Mã đề x-p3-040] Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất. (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision 200 RCU (100 strongly consistent reads x ceil(6 KB / 4 KB)) and 120 WCU (40 standard writes x ceil(2.4 KB / 1 KB)).",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "Trong DynamoDB: 1 WCU = 1 lượt ghi chuẩn/giây cho item tối đa 1 KB (Transactional Write tốn gấp đôi). 1 RCU = 1 lượt đọc Strongly Consistent/giây (hoặc 2 lượt đọc Eventually Consistent/giây) cho item tối đa 4 KB (Transactional Read tốn gấp đôi). Luôn làm tròn LÊN kích thước từng item trước khi nhân số lượng request!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s23",
      "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
    ]
  },
  {
    "id": "x-p3-041",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      24
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-041, Phase 3 Session 24) focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-041 - Chặng 3, Buổi #24] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable DynamoDB Streams and convert the table into an Amazon DynamoDB Global Table spanning both AWS Regions for active-active read and write access."
    ],
    "correctIdx": 3,
    "explanation": "DynamoDB Global Tables cung cấp kiến trúc cơ sở dữ liệu Multi-Region Active-Active (ứng dụng đọc và ghi cục bộ ở bất kỳ Region nào với độ trễ một chữ số mili-giây), tự động nhân bản hai chiều dựa trên nền tảng DynamoDB Streams.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-3",
      "s24",
      "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
    ]
  },
  {
    "id": "x-p3-042",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      10,
      25
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-042, Phase 3 Session 25) focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-042 - Chặng 3, Buổi #25] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use Amazon MemoryDB for Redis, which combines sub-millisecond in-memory reads with a distributed Multi-AZ transactional log for full database durability.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Khác với ElastiCache (vốn là lớp cache đứng trước DB), Amazon MemoryDB for Redis là cơ sở dữ liệu chính (Primary Database) tương thích Redis, vừa đọc cực nhanh trên RAM vừa ghi vào Multi-AZ Transaction Log để đảm bảo không bao giờ mất dữ liệu.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s25",
      "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
    ]
  },
  {
    "id": "x-p3-043",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      26
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-043, Phase 3 Session 26) focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-043 - Chặng 3, Buổi #26] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Create an Amazon Route 53 Alias record at the zone apex (example.com) pointing directly to the Application Load Balancer or CloudFront distribution.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Chuẩn DNS cấm tạo bản ghi CNAME tại tên miền gốc (Zone Apex như example.com), chỉ cho phép tạo ở subdomain (www.example.com). Để trỏ tên miền gốc thẳng vào ALB, CloudFront, S3 Website hay API Gateway (và được miễn phí truy vấn DNS nội bộ AWS), bắt buộc dùng bản ghi Route 53 Alias.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s26",
      "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
    ]
  },
  {
    "id": "x-p3-044",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      16,
      27
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-044, Phase 3 Session 27) focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-044 - Chặng 3, Buổi #27] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Configure an Amazon Route 53 Geolocation routing policy with country-specific records and a Default record to enforce data residency compliance.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Phân biệt 3 chính sách vị trí của Route 53: Latency (chọn Region có độ trễ mạng thấp nhất); Geolocation (chọn chính xác theo Quốc gia/Châu lục của user để tuân thủ luật bản quyền/chủ quyền dữ liệu, nhớ cấu hình bản ghi Default); Geoproximity (dùng hệ số Bias từ -99 đến +99 để mở rộng hoặc thu hẹp vùng phủ sóng địa lý).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s27",
      "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
    ]
  },
  {
    "id": "x-p3-045",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      28
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-045, Phase 3 Session 28) focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-045 - Chặng 3, Buổi #28] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Deploy AWS Global Accelerator in front of the Regional Network Load Balancers to provide two static Anycast IPv4 addresses and route UDP gaming traffic over the AWS global network."
    ],
    "correctIdx": 3,
    "explanation": "Khi ứng dụng dùng giao thức phi HTTP (TCP/UDP như game online, VoIP, IoT, MQTT) hoặc cần 2 địa chỉ Static Anycast IP cố định toàn cầu kèm khả năng chuyển đổi dự phòng (failover) dưới 1 phút qua đường truyền cáp quang nội bộ AWS, đáp án luôn là AWS Global Accelerator.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-3",
      "s28",
      "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
    ]
  },
  {
    "id": "x-p3-046",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      3,
      20
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-046, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-046 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-047",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      21
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-047, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-047 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  },
  {
    "id": "x-p3-048",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      9,
      22
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-048, Phase 3 Session 22) focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-048 - Chặng 3, Buổi #22] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s22",
      "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
    ]
  },
  {
    "id": "x-p3-049",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      23
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p3-049. A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p3-049] Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision 200 RCU (100 strongly consistent reads x ceil(6 KB / 4 KB)) and 120 WCU (40 standard writes x ceil(2.4 KB / 1 KB)).",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Trong DynamoDB: 1 WCU = 1 lượt ghi chuẩn/giây cho item tối đa 1 KB (Transactional Write tốn gấp đôi). 1 RCU = 1 lượt đọc Strongly Consistent/giây (hoặc 2 lượt đọc Eventually Consistent/giây) cho item tối đa 4 KB (Transactional Read tốn gấp đôi). Luôn làm tròn LÊN kích thước từng item trước khi nhân số lượng request!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s23",
      "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
    ]
  },
  {
    "id": "x-p3-050",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      15,
      24
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-050, Phase 3 Session 24) focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p3-050 - Chặng 3, Buổi #24] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable DynamoDB Streams and convert the table into an Amazon DynamoDB Global Table spanning both AWS Regions for active-active read and write access."
    ],
    "correctIdx": 3,
    "explanation": "DynamoDB Global Tables cung cấp kiến trúc cơ sở dữ liệu Multi-Region Active-Active (ứng dụng đọc và ghi cục bộ ở bất kỳ Region nào với độ trễ một chữ số mili-giây), tự động nhân bản hai chiều dựa trên nền tảng DynamoDB Streams.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-3",
      "s24",
      "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
    ]
  },
  {
    "id": "x-p3-051",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      25
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-051, Phase 3 Session 25) focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-051 - Chặng 3, Buổi #25] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use Amazon MemoryDB for Redis, which combines sub-millisecond in-memory reads with a distributed Multi-AZ transactional log for full database durability.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Khác với ElastiCache (vốn là lớp cache đứng trước DB), Amazon MemoryDB for Redis là cơ sở dữ liệu chính (Primary Database) tương thích Redis, vừa đọc cực nhanh trên RAM vừa ghi vào Multi-AZ Transaction Log để đảm bảo không bao giờ mất dữ liệu.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-3",
      "s25",
      "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
    ]
  },
  {
    "id": "x-p3-052",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      2,
      26
    ],
    "difficulty": "easy",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p3-052, Phase 3 Session 26) focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-052 - Chặng 3, Buổi #26] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Create an Amazon Route 53 Alias record at the zone apex (example.com) pointing directly to the Application Load Balancer or CloudFront distribution.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Chuẩn DNS cấm tạo bản ghi CNAME tại tên miền gốc (Zone Apex như example.com), chỉ cho phép tạo ở subdomain (www.example.com). Để trỏ tên miền gốc thẳng vào ALB, CloudFront, S3 Website hay API Gateway (và được miễn phí truy vấn DNS nội bộ AWS), bắt buộc dùng bản ghi Route 53 Alias.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-3",
      "s26",
      "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
    ]
  },
  {
    "id": "x-p3-053",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      27
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p3-053, Phase 3 Session 27) focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p3-053 - Chặng 3, Buổi #27] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Configure an Amazon Route 53 Geolocation routing policy with country-specific records and a Default record to enforce data residency compliance.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Phân biệt 3 chính sách vị trí của Route 53: Latency (chọn Region có độ trễ mạng thấp nhất); Geolocation (chọn chính xác theo Quốc gia/Châu lục của user để tuân thủ luật bản quyền/chủ quyền dữ liệu, nhớ cấu hình bản ghi Default); Geoproximity (dùng hệ số Bias từ -99 đến +99 để mở rộng hoặc thu hẹp vùng phủ sóng địa lý).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s27",
      "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
    ]
  },
  {
    "id": "x-p3-054",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      8,
      28
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p3-054, Phase 3 Session 28) focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p3-054 - Chặng 3, Buổi #28] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy AWS Global Accelerator in front of the Regional Network Load Balancers to provide two static Anycast IPv4 addresses and route UDP gaming traffic over the AWS global network.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "Khi ứng dụng dùng giao thức phi HTTP (TCP/UDP như game online, VoIP, IoT, MQTT) hoặc cần 2 địa chỉ Static Anycast IP cố định toàn cầu kèm khả năng chuyển đổi dự phòng (failover) dưới 1 phút qua đường truyền cáp quang nội bộ AWS, đáp án luôn là AWS Global Accelerator.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-3",
      "s28",
      "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
    ]
  },
  {
    "id": "x-p3-055",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      20
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p3-055, Phase 3 Session 20) focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p3-055 - Chặng 3, Buổi #20] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover."
    ],
    "correctIdx": 3,
    "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-3",
      "s20",
      "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
    ]
  },
  {
    "id": "x-p3-056",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      14,
      21
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p3-056, Phase 3 Session 21) focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p3-056 - Chặng 3, Buổi #21] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-3",
      "s21",
      "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
    ]
  }
];
  if (root) {
    root.EXAM_BANK = (root.EXAM_BANK || []).concat(PART);
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = PART;
  }
})(typeof window !== "undefined" ? window : globalThis);
