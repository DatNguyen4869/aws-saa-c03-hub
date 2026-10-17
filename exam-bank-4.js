// exam-bank-4.js — Ngân hàng câu hỏi thi thử & checkpoint (pool: "exam") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = [
  {
    "id": "x-p6-001",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-001, Phase 6 Session 44) focusing on Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-001 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use AWS Glue crawlers to populate the AWS Glue Data Catalog, convert the raw CSV logs into partitioned Apache Parquet format, and query them with Amazon Athena.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Bộ đôi phân tích Serverless kinh điển: Amazon Athena chạy câu lệnh SQL chuẩn trực tiếp trên file lưu trong S3 (trả 5 USD/TB dữ liệu quét). Để giảm tới 90% chi phí và tăng tốc Athena, hãy dùng AWS Glue chuyển đổi file CSV/JSON sang định dạng cột nén Apache Parquet/ORC và phân vùng (Partition) thư mục theo ngày/tháng.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s44",
      "Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization"
    ]
  },
  {
    "id": "x-p6-002",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      4,
      45
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-002, Phase 6 Session 45) focusing on Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-002 - Chặng 6, Buổi #45] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon Textract to extract structured text and table data from scanned medical forms, and use Amazon Comprehend (or Comprehend Medical) to detect and redact PII entities.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Bộ dịch vụ AI dùng ngay không cần biết ML: Rekognition (nhận diện khuôn mặt, vật thể, kiểm duyệt ảnh/video); Textract (OCR thông minh bóc tách chữ viết tay, bảng biểu, hóa đơn từ PDF/ảnh scan); Comprehend (xử lý ngôn ngữ tự nhiên NLP, phân tích cảm xúc Sentiment, phát hiện dữ liệu nhạy cảm PII).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s45",
      "Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII)"
    ]
  },
  {
    "id": "x-p6-003",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      46
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-003, Phase 6 Session 46) focusing on CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-003 - Chặng 6, Buổi #46] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Install the Unified CloudWatch Agent on the EC2 instances to push memory and disk space utilization metrics, and enable CloudTrail Log File Integrity Validation using SHA-256 hashes.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Mặc định EC2 chỉ gửi các chỉ số cấp Hypervisor (CPU, Network, Disk I/O) lên CloudWatch và KHÔNG gửi chỉ số % RAM hay % dung lượng ổ đĩa trống (Disk Space) — muốn có phải cài CloudWatch Agent. Trên CloudTrail, bật Log File Integrity Validation để dùng hàm băm SHA-256 + chữ ký số chứng minh file log trên S3 không bị chỉnh sửa sau khi xuất.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s46",
      "CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation"
    ]
  },
  {
    "id": "x-p6-004",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      10,
      47
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-004, Phase 6 Session 47) focusing on AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-004 - Chặng 6, Buổi #47] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Attach a Service Control Policy (SCP) with an explicit deny for unapproved Regions to the target Organizational Units (OUs), noting that SCPs never restrict the management account."
    ],
    "correctIdx": 3,
    "explanation": "Trong AWS Organizations, Service Control Policies (SCPs) đặt ranh giới quyền tối đa cho các tài khoản thành viên (áp dụng cho cả Root User của tài khoản thành viên đó), nhưng bản thân SCP không tự cấp quyền (vẫn cần IAM Allow) và SCP KHÔNG BAO GIỜ có tác dụng lên Management Account!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception)"
    ]
  },
  {
    "id": "x-p6-005",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      48
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-005, Phase 6 Session 48) focusing on AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-005 - Chặng 6, Buổi #48] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Store the Amazon RDS database credentials in AWS Secrets Manager and enable automatic secret rotation using the built-in AWS Lambda rotation template.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "Nếu bài toán yêu cầu lưu mật khẩu Database (RDS, Aurora, Redshift, DocumentDB) kèm tính năng TỰ ĐỘNG XOAY VÒNG MẬT KHẨU (Automatic Rotation) định kỳ, đáp án bắt buộc là AWS Secrets Manager. Nếu chỉ cần lưu cấu hình/tham số phân cấp miễn phí (hoặc tham chiếu AMI ID công khai), dùng SSM Parameter Store Standard.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s48",
      "AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config)"
    ]
  },
  {
    "id": "x-p6-006",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      16,
      49
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-006, Phase 6 Session 49) focusing on Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-006 - Chặng 6, Buổi #49] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable Amazon Macie to automatically discover and alert on personally identifiable information (PII) in S3 buckets, and aggregate findings across accounts into AWS Security Hub.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Nhắc tới phát hiện dữ liệu nhạy cảm cá nhân (PII, thẻ tín dụng, hồ sơ y tế, hộ chiếu) bị lưu lộ liễu trong Amazon S3 -> chọn ngay Amazon Macie. AWS Security Hub gom toàn bộ cảnh báo từ GuardDuty, Inspector, Macie, Firewall Manager về một bảng điều khiển chuẩn bảo mật (CIS, PCI-DSS). Amazon Detective dùng biểu đồ giúp điều tra nguyên nhân gốc rễ (Root cause investigation) sau khi có cảnh báo.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s49",
      "Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective"
    ]
  },
  {
    "id": "x-p6-007",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      50
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-007, Phase 6 Session 50) focusing on 4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-007 - Chặng 6, Buổi #50] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề 4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Implement a Pilot Light disaster recovery architecture where databases replicate continuously to the secondary Region while application servers remain turned off until failover.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Thứ tự 4 chiến lược DR từ rẻ nhất (RTO/RPO dài nhất) đến đắt nhất (RTO/RPO gần bằng 0): 1. Backup & Restore (RTO hàng giờ); 2. Pilot Light (chỉ bật sẵn lõi Database nhận nhân bản, phần Compute tắt hoàn toàn, khi có biến mới bật lên trong ~10–30 phút); 3. Warm Standby (chạy sẵn một bản thu nhỏ đầy đủ cả Web + App + DB luôn hoạt động ở cấu hình tối thiểu, khi có biến chỉ cần Scale Out trong vài phút); 4. Multi-Site Active-Active (chạy 100% tải ở cả 2 Region, RTO tính bằng giây).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s50",
      "4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active)"
    ]
  },
  {
    "id": "x-p6-008",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      22,
      51
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-008, Phase 6 Session 51) focusing on AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-008 - Chặng 6, Buổi #51] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enable AWS Compute Optimizer to analyze historical CloudWatch utilization metrics and generate right-sizing recommendations for over-provisioned EC2 instances and EBS volumes.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Phân biệt công cụ tối ưu chi phí: AWS Compute Optimizer dùng Machine Learning phân tích lịch sử CPU/RAM/IOPS để khuyên hạ cấp dòng máy EC2, ASG, ổ EBS gp3, Lambda và ECS Fargate bị cấp phát dư thừa (Right-sizing). AWS Budgets dùng để đặt ngưỡng ngân sách và gửi cảnh báo (hoặc tự động chạy lệnh chặn qua IAM/SCP khi vượt ngân sách). AWS Cost Anomaly Detection dùng ML phát hiện chi tiêu bất thường đột biến.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s51",
      "AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets"
    ]
  },
  {
    "id": "x-p6-009",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-009, Phase 6 Session 44) focusing on Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-009 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Ingest the catalog into Amazon OpenSearch Service for millisecond full-text search and connect Amazon QuickSight with SPICE in-memory acceleration for executive BI dashboards."
    ],
    "correctIdx": 3,
    "explanation": "Amazon OpenSearch Service (kế thừa Elasticsearch) dùng để tìm kiếm toàn văn (Full-text search, autocomplete) và phân tích log thời gian thực (kèm giao diện OpenSearch Dashboards). Amazon QuickSight là dịch vụ vẽ biểu đồ Business Intelligence (BI) Serverless tích hợp bộ nhớ siêu tốc SPICE và tính tiền theo phiên người xem.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-6",
      "s44",
      "Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE)"
    ]
  },
  {
    "id": "x-p6-010",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      28,
      45
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is modernizing its cloud infrastructure for production case x-p6-010. A company has two AI teams: Team A wants a serverless API to build a Generative AI customer support chatbot using pre-trained Foundation Models with Retrieval-Augmented Generation (RAG) Knowledge Bases; Team B (data scientists) needs to train and deploy custom PyTorch machine learning models. Which AWS services should the architect recommend? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p6-010] Công ty có 2 đội AI: Đội A muốn gọi Foundation Models qua API Serverless kèm RAG Knowledge Bases để làm trợ lý Generative AI; Đội B (Data Scientists) cần tự huấn luyện mô hình ML tùy chỉnh. Kiến trúc sư nên khuyên dùng dịch vụ nào (Amazon Bedrock và Amazon SageMaker)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Use Amazon Bedrock with Knowledge Bases for Amazon Bedrock to build the RAG generative AI assistant via serverless APIs, and use Amazon SageMaker for training custom ML models.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Phân biệt 2 trụ cột AI trong đề thi SAA-C03 hiện đại: Amazon Bedrock là dịch vụ Serverless gọi các Foundation Models (Claude, Titan, Llama) qua API kèm Knowledge Bases (RAG) để làm ứng dụng Generative AI mà không cần quản lý hạ tầng. Amazon SageMaker là nền tảng trọn gói để Data Scientists tự chuẩn bị dữ liệu, huấn luyện (train) và triển khai mô hình ML tùy chỉnh.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s45",
      "Amazon Bedrock (Serverless Generative AI Foundation Models & RAG Knowledge Bases) vs Amazon SageMaker (Custom Model Training & MLOps)"
    ]
  },
  {
    "id": "x-p6-011",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      46
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is modernizing its cloud infrastructure for production case x-p6-011. Engineers running a distributed microservices architecture across API Gateway, AWS Lambda, and DynamoDB need to trace end-to-end requests on a visual service map to isolate latency bottlenecks, query logs with CloudWatch Logs Insights, and trigger an alarm using a CloudWatch Metric Filter when an error string appears. Which tool provides the end-to-end distributed tracing and service map? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p6-011] Kỹ sư vận hành hệ thống microservices qua API Gateway, Lambda và DynamoDB cần truy vết end-to-end trên bản đồ dịch vụ (Service Map), truy vấn log bằng CloudWatch Logs Insights và tạo cảnh báo bằng Metric Filter. Công cụ nào cung cấp khả năng distributed tracing và vẽ Service Map? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable AWS X-Ray across API Gateway, Lambda, and DynamoDB to visualize latency bottlenecks on a service map, and create a CloudWatch Logs Metric Filter to trigger an alarm on error patterns.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Khi cần truy vết hiệu năng xuyên suốt nhiều tầng microservices (Distributed tracing) và vẽ bản đồ phụ thuộc dịch vụ (Service Map), dùng AWS X-Ray. Để đếm một chuỗi lỗi cụ thể trong dòng log ứng dụng và bắn cảnh báo, tạo CloudWatch Metric Filter gắn với CloudWatch Alarm. Để truy vấn tìm kiếm log tương tác trên nhiều Log Group, dùng CloudWatch Logs Insights.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s46",
      "AWS X-Ray (End-to-End Distributed Tracing & Service Map), CloudWatch Logs Insights & Metric Filters"
    ]
  },
  {
    "id": "x-p6-012",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      34,
      47
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-012, Phase 6 Session 47) focusing on AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-012 - Chặng 6, Buổi #47] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure AWS IAM Identity Center integrated with the external SAML 2.0 identity provider for single sign-on across all AWS accounts, and use AWS RAM to share Transit Gateways and Subnets.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Verify that least-privilege IAM permissions and encryption in transit are configured for all participating AWS resources.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "Để đăng nhập một lần (Single Sign-On) tập trung vào hàng chục tài khoản AWS bằng tài khoản công ty (AD, Okta, Azure AD), dùng AWS IAM Identity Center. Để chia sẻ trực tiếp các tài nguyên hạ tầng (Transit Gateway, Subnets, Route 53 Resolver Rules, License Manager) giữa các tài khoản trong Organizations mà không cần tạo bản sao, dùng AWS Resource Access Manager (AWS RAM).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM)"
    ]
  },
  {
    "id": "x-p6-013",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      48
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-013, Phase 6 Session 48) focusing on AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-013 - Chặng 6, Buổi #48] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Use AWS KMS Customer Managed Keys with automatic annual key rotation enabled for standard workloads, and provision AWS CloudHSM when regulations mandate single-tenant FIPS 140-2 Level 3 hardware control.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "AWS KMS quản lý khóa mã hóa tích hợp sâu với hầu hết dịch vụ AWS, hỗ trợ tự động xoay vòng khóa (Automatic Key Rotation) mỗi 1 năm cho Customer Managed Keys (AWS Managed Keys xoay 1 năm/lần). Chỉ chọn AWS CloudHSM khi đề bài nêu rõ yêu cầu thiết bị phần cứng chuyên dụng đơn khách hàng đạt chuẩn FIPS 140-2/140-3 Level 3 mà AWS không có quyền truy cập khóa.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s48",
      "AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware)"
    ]
  },
  {
    "id": "x-p6-014",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      40,
      49
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-014, Phase 6 Session 49) focusing on Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-014 - Chặng 6, Buổi #49] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable Amazon GuardDuty to detect anomalous API calls and cryptocurrency mining behavior without installing agents, and enable Amazon Inspector for continuous CVE scanning of EC2 instances and ECR images."
    ],
    "correctIdx": 3,
    "explanation": "Phân biệt rõ: Amazon GuardDuty là hệ thống phát hiện mối đe dọa thông minh bằng Machine Learning (đọc ngầm CloudTrail, VPC Flow Logs, DNS Logs, EKS Audit Logs mà không cần cài agent) để phát hiện tài khoản bị chiếm quyền hoặc máy EC2 đào tiền ảo. Amazon Inspector tự động quét lỗ hổng phần mềm (CVE) và lộ cổng mạng trên EC2 (qua SSM Agent), container image trên ECR và code hàm AWS Lambda.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-6",
      "s49",
      "Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda)"
    ]
  },
  {
    "id": "x-p6-015",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      50
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-015, Phase 6 Session 50) focusing on AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-015 - Chặng 6, Buổi #50] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use AWS Application Migration Service (AWS MGN) to perform continuous block-level replication of the physical and virtual servers into AWS for a cutover with minimal downtime.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "AWS Application Migration Service (AWS MGN - dịch vụ kế thừa Server Migration Service và CloudEndure Migration) là công cụ chuẩn được AWS khuyến nghị để di chuyển nguyên trạng máy chủ vật lý/VMware/Hyper-V lên EC2 (Lift-and-shift Rehost) bằng nhân bản cấp độ block liên tục.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s50",
      "AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS)"
    ]
  },
  {
    "id": "x-p6-016",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      3,
      51
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-016, Phase 6 Session 51) focusing on AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-016 - Chặng 6, Buổi #51] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use AWS CloudFormation StackSets from the organization management account to automatically provision the baseline IAM roles and VPC templates across all member accounts and Regions.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "AWS CloudFormation là công cụ Infrastructure as Code (IaC) khởi tạo hạ tầng từ file mẫu YAML/JSON; dùng CloudFormation StackSets khi cần triển khai cùng một bộ hạ tầng tự động ra hàng loạt Accounts và Regions. Ngược lại, AWS Elastic Beanstalk là nền tảng PaaS dành cho lập trình viên chỉ muốn tải file code (Java, Node.js, Python, Docker) lên để AWS tự tạo EC2 + ASG + ELB + RDS.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s51",
      "AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment)"
    ]
  },
  {
    "id": "x-p6-017",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-017, Phase 6 Session 44) focusing on AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-017 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use AWS Lake Formation to build the S3 data lake and enforce fine-grained row-level and cell-level access controls across Athena, Redshift Spectrum, and EMR.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Khi doanh nghiệp xây dựng Data Lake trên S3 và cần quản lý phân quyền tập trung chi tiết tới từng dòng, từng cột hoặc từng ô dữ liệu (Row/Column/Cell-level security) cho nhiều dịch vụ phân tích cùng lúc mà không phải sửa hàng chục S3 Bucket Policy, đáp án duy nhất là AWS Lake Formation.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s44",
      "AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3)"
    ]
  },
  {
    "id": "x-p6-018",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      9,
      45
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-018, Phase 6 Session 45) focusing on Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-018 - Chặng 6, Buổi #45] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Use Amazon Transcribe with automatic PII redaction to convert call center audio recordings into text, and index internal documents in Amazon Kendra for natural-language enterprise search."
    ],
    "correctIdx": 3,
    "explanation": "Transcribe chuyển giọng nói thành văn bản (Speech-to-Text, hỗ trợ che thông tin nhạy cảm PII và tách người nói); Polly chuyển văn bản thành giọng nói (Text-to-Speech); Translate dịch đa ngôn ngữ; Kendra là công cụ tìm kiếm tài liệu nội bộ thông minh bằng câu hỏi tự nhiên.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-6",
      "s45",
      "Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search)"
    ]
  },
  {
    "id": "x-p6-019",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      46
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-019, Phase 6 Session 46) focusing on CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-019 - Chặng 6, Buổi #46] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Inspect AWS CloudTrail management events to identify which IAM principal modified the security group, and create an AWS Config rule with Systems Manager Automation for auto-remediation.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "Bộ ba giám sát cốt lõi: CloudWatch theo dõi hiệu năng & log ứng dụng; AWS CloudTrail ghi lại lịch sử kiểm toán mọi lời gọi API ('Ai đã làm gì, lúc nào, từ IP nào'); AWS Config theo dõi lịch sử thay đổi cấu hình tài nguyên theo thời gian và đánh giá tuân thủ (Compliance) kèm tự động sửa lỗi qua SSM Automation.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-6",
      "s46",
      "CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance)"
    ]
  },
  {
    "id": "x-p6-020",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      15,
      47
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is modernizing its cloud infrastructure for production case x-p6-020. An enterprise using AWS Organizations wants to proxy authentication requests from AWS applications directly to its on-premises Microsoft Active Directory without caching user credentials in the cloud, while also applying organization-wide Resource Control Policies (RCPs) alongside Service Control Policies (SCPs). Which AWS Directory Service option and Organizations policy should the architect use? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p6-020] Doanh nghiệp dùng AWS Organizations muốn chuyển tiếp yêu cầu xác thực trực tiếp về Active Directory dưới On-premise mà không lưu user trên mây, đồng thời áp dụng Resource Control Policies (RCP) bên cạnh SCP. Tùy chọn AWS Directory Service và chính sách nào đáp ứng yêu cầu này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Deploy AD Connector in AWS Directory Service to proxy authentication requests directly to the on-premises Active Directory without caching credentials, and use Resource Control Policies (RCPs) for resource guardrails.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Phân biệt AWS Directory Service: AWS Managed Microsoft AD dùng khi cần dựng AD thật trên AWS và thiết lậpTwo-way Forest Trust với AD dưới đất; AD Connector là cổng Proxy chỉ chuyển tiếp yêu cầu đăng nhập về AD dưới đất mà không lưu thông tin user trên mây; Simple AD là thư mục Samba nhỏ giá rẻ độc lập. Resource Control Policies (RCP) trong Organizations kiểm soát ranh giới quyền tối đa trực tiếp trên tài nguyên (S3, KMS, SQS, STS, Secrets Manager).",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS Directory Service (Managed Microsoft AD vs AD Connector Proxy vs Simple AD) & Resource Control Policies (RCPs)"
    ]
  },
  {
    "id": "x-p6-021",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      48
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-021, Phase 6 Session 48) focusing on KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-021 - Chặng 6, Buổi #48] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Encrypt the source EBS volume with a Customer Managed KMS Key, grant the destination AWS account permission in the KMS Key Policy, and re-encrypt the copied snapshot in the target account.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Không bao giờ chia sẻ được EBS Snapshot hay AMI đang mã hóa bằng khóa mặc định (AWS Managed Key `aws/ebs`). Để chia sẻ sang tài khoản khác, bắt buộc phải mã hóa bằng Customer Managed Key (CMK) và cấp quyền cho tài khoản đích trong KMS Key Policy.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s48",
      "KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing"
    ]
  },
  {
    "id": "x-p6-022",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      21,
      49
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-022, Phase 6 Session 49) focusing on AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-022 - Chặng 6, Buổi #49] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Attach an AWS WAF Web ACL with a Rate-Based Rule and AWS Managed Rules for SQL injection to the Application Load Balancer, and subscribe to AWS Shield Advanced for DDoS cost protection.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "AWS WAF bảo vệ tầng 7 (HTTP/HTTPS) chống SQL Injection, XSS, chặn theo quốc gia và tự động chặn IP gửi quá N request/5 phút bằng Rate-based Rule (AWS WAF gắn được vào CloudFront, ALB, API Gateway, AppSync, Cognito User Pool, Verified Access — KHÔNG gắn vào NLB hay EC2 trực tiếp!). AWS Shield Advanced bảo vệ DDoS chuyên sâu kèm đội ngũ SRT 24/7 và hoàn tiền hóa đơn tăng vọt do DDoS (Cost Protection).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s49",
      "AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced"
    ]
  },
  {
    "id": "x-p6-023",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      50
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-023, Phase 6 Session 50) focusing on AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-023 - Chặng 6, Buổi #50] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Use the AWS Schema Conversion Tool (SCT) to convert the Oracle schemas and stored procedures to Amazon Aurora PostgreSQL, and then use AWS DMS with ongoing Change Data Capture (CDC)."
    ],
    "correctIdx": 3,
    "explanation": "Khi di chuyển cơ sở dữ liệu sang AWS mà vẫn giữ DB nguồn hoạt động bình thường không gián đoạn (Near-zero downtime): nếu cùng hệ quản trị (Homogeneous: Oracle -> RDS Oracle) chỉ cần dùng AWS DMS. Nếu khác hệ quản trị (Heterogeneous: Oracle -> Aurora PostgreSQL hoặc SQL Server -> MySQL), bắt buộc chạy AWS Schema Conversion Tool (SCT) trước để chuyển đổi cấu trúc bảng/code rồi mới dùng AWS DMS chép dữ liệu kèm CDC.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-6",
      "s50",
      "AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT)"
    ]
  },
  {
    "id": "x-p6-024",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      27,
      51
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-024, Phase 6 Session 51) focusing on AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-024 - Chặng 6, Buổi #51] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Upgrade to AWS Business or Enterprise Support to unlock all AWS Trusted Advisor checks and integrate Trusted Advisor events with Amazon EventBridge for automated remediation.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "AWS Trusted Advisor kiểm tra tài khoản theo 5 hạng mục (Cost Optimization, Performance, Security, Fault Tolerance, Service Limits). Lưu ý đề thi: các kiểm tra cốt lõi (S3 bucket hở public, Security Group mở cổng 0.0.0.0/0, thiếu MFA trên Root, giới hạn Service Quotas) được miễn phí cho mọi tài khoản, nhưng để mở khóa toàn bộ kiểm tra và đẩy sự kiện qua EventBridge/API cần gói Business hoặc Enterprise Support.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s51",
      "AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation)"
    ]
  },
  {
    "id": "x-p6-025",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-025, Phase 6 Session 44) focusing on Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-025 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use AWS Glue crawlers to populate the AWS Glue Data Catalog, convert the raw CSV logs into partitioned Apache Parquet format, and query them with Amazon Athena.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Bộ đôi phân tích Serverless kinh điển: Amazon Athena chạy câu lệnh SQL chuẩn trực tiếp trên file lưu trong S3 (trả 5 USD/TB dữ liệu quét). Để giảm tới 90% chi phí và tăng tốc Athena, hãy dùng AWS Glue chuyển đổi file CSV/JSON sang định dạng cột nén Apache Parquet/ORC và phân vùng (Partition) thư mục theo ngày/tháng.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s44",
      "Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization"
    ]
  },
  {
    "id": "x-p6-026",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      33,
      45
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-026, Phase 6 Session 45) focusing on Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-026 - Chặng 6, Buổi #45] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use Amazon Textract to extract structured text and table data from scanned medical forms, and use Amazon Comprehend (or Comprehend Medical) to detect and redact PII entities.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "Bộ dịch vụ AI dùng ngay không cần biết ML: Rekognition (nhận diện khuôn mặt, vật thể, kiểm duyệt ảnh/video); Textract (OCR thông minh bóc tách chữ viết tay, bảng biểu, hóa đơn từ PDF/ảnh scan); Comprehend (xử lý ngôn ngữ tự nhiên NLP, phân tích cảm xúc Sentiment, phát hiện dữ liệu nhạy cảm PII).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-6",
      "s45",
      "Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII)"
    ]
  },
  {
    "id": "x-p6-027",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      46
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-027, Phase 6 Session 46) focusing on CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-027 - Chặng 6, Buổi #46] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Install the Unified CloudWatch Agent on the EC2 instances to push memory and disk space utilization metrics, and enable CloudTrail Log File Integrity Validation using SHA-256 hashes.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Mặc định EC2 chỉ gửi các chỉ số cấp Hypervisor (CPU, Network, Disk I/O) lên CloudWatch và KHÔNG gửi chỉ số % RAM hay % dung lượng ổ đĩa trống (Disk Space) — muốn có phải cài CloudWatch Agent. Trên CloudTrail, bật Log File Integrity Validation để dùng hàm băm SHA-256 + chữ ký số chứng minh file log trên S3 không bị chỉnh sửa sau khi xuất.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s46",
      "CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation"
    ]
  },
  {
    "id": "x-p6-028",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      39,
      47
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-028, Phase 6 Session 47) focusing on AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-028 - Chặng 6, Buổi #47] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Attach a Service Control Policy (SCP) with an explicit deny for unapproved Regions to the target Organizational Units (OUs), noting that SCPs never restrict the management account."
    ],
    "correctIdx": 3,
    "explanation": "Trong AWS Organizations, Service Control Policies (SCPs) đặt ranh giới quyền tối đa cho các tài khoản thành viên (áp dụng cho cả Root User của tài khoản thành viên đó), nhưng bản thân SCP không tự cấp quyền (vẫn cần IAM Allow) và SCP KHÔNG BAO GIỜ có tác dụng lên Management Account!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception)"
    ]
  },
  {
    "id": "x-p6-029",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      48
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-029, Phase 6 Session 48) focusing on AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-029 - Chặng 6, Buổi #48] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Store the Amazon RDS database credentials in AWS Secrets Manager and enable automatic secret rotation using the built-in AWS Lambda rotation template.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Nếu bài toán yêu cầu lưu mật khẩu Database (RDS, Aurora, Redshift, DocumentDB) kèm tính năng TỰ ĐỘNG XOAY VÒNG MẬT KHẨU (Automatic Rotation) định kỳ, đáp án bắt buộc là AWS Secrets Manager. Nếu chỉ cần lưu cấu hình/tham số phân cấp miễn phí (hoặc tham chiếu AMI ID công khai), dùng SSM Parameter Store Standard.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s48",
      "AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config)"
    ]
  },
  {
    "id": "x-p6-030",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      2,
      49
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-030, Phase 6 Session 49) focusing on Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-030 - Chặng 6, Buổi #49] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable Amazon Macie to automatically discover and alert on personally identifiable information (PII) in S3 buckets, and aggregate findings across accounts into AWS Security Hub.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Nhắc tới phát hiện dữ liệu nhạy cảm cá nhân (PII, thẻ tín dụng, hồ sơ y tế, hộ chiếu) bị lưu lộ liễu trong Amazon S3 -> chọn ngay Amazon Macie. AWS Security Hub gom toàn bộ cảnh báo từ GuardDuty, Inspector, Macie, Firewall Manager về một bảng điều khiển chuẩn bảo mật (CIS, PCI-DSS). Amazon Detective dùng biểu đồ giúp điều tra nguyên nhân gốc rễ (Root cause investigation) sau khi có cảnh báo.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s49",
      "Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective"
    ]
  },
  {
    "id": "x-p6-031",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      50
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-031, Phase 6 Session 50) focusing on 4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-031 - Chặng 6, Buổi #50] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề 4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Implement a Pilot Light disaster recovery architecture where databases replicate continuously to the secondary Region while application servers remain turned off until failover.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Thứ tự 4 chiến lược DR từ rẻ nhất (RTO/RPO dài nhất) đến đắt nhất (RTO/RPO gần bằng 0): 1. Backup & Restore (RTO hàng giờ); 2. Pilot Light (chỉ bật sẵn lõi Database nhận nhân bản, phần Compute tắt hoàn toàn, khi có biến mới bật lên trong ~10–30 phút); 3. Warm Standby (chạy sẵn một bản thu nhỏ đầy đủ cả Web + App + DB luôn hoạt động ở cấu hình tối thiểu, khi có biến chỉ cần Scale Out trong vài phút); 4. Multi-Site Active-Active (chạy 100% tải ở cả 2 Region, RTO tính bằng giây).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s50",
      "4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active)"
    ]
  },
  {
    "id": "x-p6-032",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      8,
      51
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-032, Phase 6 Session 51) focusing on AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-032 - Chặng 6, Buổi #51] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable AWS Compute Optimizer to analyze historical CloudWatch utilization metrics and generate right-sizing recommendations for over-provisioned EC2 instances and EBS volumes."
    ],
    "correctIdx": 3,
    "explanation": "Phân biệt công cụ tối ưu chi phí: AWS Compute Optimizer dùng Machine Learning phân tích lịch sử CPU/RAM/IOPS để khuyên hạ cấp dòng máy EC2, ASG, ổ EBS gp3, Lambda và ECS Fargate bị cấp phát dư thừa (Right-sizing). AWS Budgets dùng để đặt ngưỡng ngân sách và gửi cảnh báo (hoặc tự động chạy lệnh chặn qua IAM/SCP khi vượt ngân sách). AWS Cost Anomaly Detection dùng ML phát hiện chi tiêu bất thường đột biến.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-6",
      "s51",
      "AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets"
    ]
  },
  {
    "id": "x-p6-033",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      44
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-033, Phase 6 Session 44) focusing on Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-033 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Ingest the catalog into Amazon OpenSearch Service for millisecond full-text search and connect Amazon QuickSight with SPICE in-memory acceleration for executive BI dashboards.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Amazon OpenSearch Service (kế thừa Elasticsearch) dùng để tìm kiếm toàn văn (Full-text search, autocomplete) và phân tích log thời gian thực (kèm giao diện OpenSearch Dashboards). Amazon QuickSight là dịch vụ vẽ biểu đồ Business Intelligence (BI) Serverless tích hợp bộ nhớ siêu tốc SPICE và tính tiền theo phiên người xem.",
    "whyWrong": [
      null,
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s44",
      "Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE)"
    ]
  },
  {
    "id": "x-p6-034",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      14,
      45
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is modernizing its cloud infrastructure for production case x-p6-034. A company has two AI teams: Team A wants a serverless API to build a Generative AI customer support chatbot using pre-trained Foundation Models with Retrieval-Augmented Generation (RAG) Knowledge Bases; Team B (data scientists) needs to train and deploy custom PyTorch machine learning models. Which AWS services should the architect recommend? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p6-034] Công ty có 2 đội AI: Đội A muốn gọi Foundation Models qua API Serverless kèm RAG Knowledge Bases để làm trợ lý Generative AI; Đội B (Data Scientists) cần tự huấn luyện mô hình ML tùy chỉnh. Kiến trúc sư nên khuyên dùng dịch vụ nào (Amazon Bedrock và Amazon SageMaker)? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Use Amazon Bedrock with Knowledge Bases for Amazon Bedrock to build the RAG generative AI assistant via serverless APIs, and use Amazon SageMaker for training custom ML models.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Phân biệt 2 trụ cột AI trong đề thi SAA-C03 hiện đại: Amazon Bedrock là dịch vụ Serverless gọi các Foundation Models (Claude, Titan, Llama) qua API kèm Knowledge Bases (RAG) để làm ứng dụng Generative AI mà không cần quản lý hạ tầng. Amazon SageMaker là nền tảng trọn gói để Data Scientists tự chuẩn bị dữ liệu, huấn luyện (train) và triển khai mô hình ML tùy chỉnh.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s45",
      "Amazon Bedrock (Serverless Generative AI Foundation Models & RAG Knowledge Bases) vs Amazon SageMaker (Custom Model Training & MLOps)"
    ]
  },
  {
    "id": "x-p6-035",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      46
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is modernizing its cloud infrastructure for production case x-p6-035. Engineers running a distributed microservices architecture across API Gateway, AWS Lambda, and DynamoDB need to trace end-to-end requests on a visual service map to isolate latency bottlenecks, query logs with CloudWatch Logs Insights, and trigger an alarm using a CloudWatch Metric Filter when an error string appears. Which tool provides the end-to-end distributed tracing and service map? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p6-035] Kỹ sư vận hành hệ thống microservices qua API Gateway, Lambda và DynamoDB cần truy vết end-to-end trên bản đồ dịch vụ (Service Map), truy vấn log bằng CloudWatch Logs Insights và tạo cảnh báo bằng Metric Filter. Công cụ nào cung cấp khả năng distributed tracing và vẽ Service Map? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable AWS X-Ray across API Gateway, Lambda, and DynamoDB to visualize latency bottlenecks on a service map, and create a CloudWatch Logs Metric Filter to trigger an alarm on error patterns.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Khi cần truy vết hiệu năng xuyên suốt nhiều tầng microservices (Distributed tracing) và vẽ bản đồ phụ thuộc dịch vụ (Service Map), dùng AWS X-Ray. Để đếm một chuỗi lỗi cụ thể trong dòng log ứng dụng và bắn cảnh báo, tạo CloudWatch Metric Filter gắn với CloudWatch Alarm. Để truy vấn tìm kiếm log tương tác trên nhiều Log Group, dùng CloudWatch Logs Insights.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s46",
      "AWS X-Ray (End-to-End Distributed Tracing & Service Map), CloudWatch Logs Insights & Metric Filters"
    ]
  },
  {
    "id": "x-p6-036",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      20,
      47
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-036, Phase 6 Session 47) focusing on AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-036 - Chặng 6, Buổi #47] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Configure AWS IAM Identity Center integrated with the external SAML 2.0 identity provider for single sign-on across all AWS accounts, and use AWS RAM to share Transit Gateways and Subnets.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Để đăng nhập một lần (Single Sign-On) tập trung vào hàng chục tài khoản AWS bằng tài khoản công ty (AD, Okta, Azure AD), dùng AWS IAM Identity Center. Để chia sẻ trực tiếp các tài nguyên hạ tầng (Transit Gateway, Subnets, Route 53 Resolver Rules, License Manager) giữa các tài khoản trong Organizations mà không cần tạo bản sao, dùng AWS Resource Access Manager (AWS RAM).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM)"
    ]
  },
  {
    "id": "x-p6-037",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      48
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-037, Phase 6 Session 48) focusing on AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-037 - Chặng 6, Buổi #48] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use AWS KMS Customer Managed Keys with automatic annual key rotation enabled for standard workloads, and provision AWS CloudHSM when regulations mandate single-tenant FIPS 140-2 Level 3 hardware control."
    ],
    "correctIdx": 3,
    "explanation": "AWS KMS quản lý khóa mã hóa tích hợp sâu với hầu hết dịch vụ AWS, hỗ trợ tự động xoay vòng khóa (Automatic Key Rotation) mỗi 1 năm cho Customer Managed Keys (AWS Managed Keys xoay 1 năm/lần). Chỉ chọn AWS CloudHSM khi đề bài nêu rõ yêu cầu thiết bị phần cứng chuyên dụng đơn khách hàng đạt chuẩn FIPS 140-2/140-3 Level 3 mà AWS không có quyền truy cập khóa.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-6",
      "s48",
      "AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware)"
    ]
  },
  {
    "id": "x-p6-038",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      26,
      49
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-038, Phase 6 Session 49) focusing on Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-038 - Chặng 6, Buổi #49] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable Amazon GuardDuty to detect anomalous API calls and cryptocurrency mining behavior without installing agents, and enable Amazon Inspector for continuous CVE scanning of EC2 instances and ECR images.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Phân biệt rõ: Amazon GuardDuty là hệ thống phát hiện mối đe dọa thông minh bằng Machine Learning (đọc ngầm CloudTrail, VPC Flow Logs, DNS Logs, EKS Audit Logs mà không cần cài agent) để phát hiện tài khoản bị chiếm quyền hoặc máy EC2 đào tiền ảo. Amazon Inspector tự động quét lỗ hổng phần mềm (CVE) và lộ cổng mạng trên EC2 (qua SSM Agent), container image trên ECR và code hàm AWS Lambda.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s49",
      "Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda)"
    ]
  },
  {
    "id": "x-p6-039",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      50
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-039, Phase 6 Session 50) focusing on AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-039 - Chặng 6, Buổi #50] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use AWS Application Migration Service (AWS MGN) to perform continuous block-level replication of the physical and virtual servers into AWS for a cutover with minimal downtime.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "AWS Application Migration Service (AWS MGN - dịch vụ kế thừa Server Migration Service và CloudEndure Migration) là công cụ chuẩn được AWS khuyến nghị để di chuyển nguyên trạng máy chủ vật lý/VMware/Hyper-V lên EC2 (Lift-and-shift Rehost) bằng nhân bản cấp độ block liên tục.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s50",
      "AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS)"
    ]
  },
  {
    "id": "x-p6-040",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      32,
      51
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-040, Phase 6 Session 51) focusing on AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-040 - Chặng 6, Buổi #51] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use AWS CloudFormation StackSets from the organization management account to automatically provision the baseline IAM roles and VPC templates across all member accounts and Regions.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "AWS CloudFormation là công cụ Infrastructure as Code (IaC) khởi tạo hạ tầng từ file mẫu YAML/JSON; dùng CloudFormation StackSets khi cần triển khai cùng một bộ hạ tầng tự động ra hàng loạt Accounts và Regions. Ngược lại, AWS Elastic Beanstalk là nền tảng PaaS dành cho lập trình viên chỉ muốn tải file code (Java, Node.js, Python, Docker) lên để AWS tự tạo EC2 + ASG + ELB + RDS.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s51",
      "AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment)"
    ]
  },
  {
    "id": "x-p6-041",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-041, Phase 6 Session 44) focusing on AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-041 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use AWS Lake Formation to build the S3 data lake and enforce fine-grained row-level and cell-level access controls across Athena, Redshift Spectrum, and EMR.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Khi doanh nghiệp xây dựng Data Lake trên S3 và cần quản lý phân quyền tập trung chi tiết tới từng dòng, từng cột hoặc từng ô dữ liệu (Row/Column/Cell-level security) cho nhiều dịch vụ phân tích cùng lúc mà không phải sửa hàng chục S3 Bucket Policy, đáp án duy nhất là AWS Lake Formation.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s44",
      "AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3)"
    ]
  },
  {
    "id": "x-p6-042",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      38,
      45
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-042, Phase 6 Session 45) focusing on Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-042 - Chặng 6, Buổi #45] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Use Amazon Transcribe with automatic PII redaction to convert call center audio recordings into text, and index internal documents in Amazon Kendra for natural-language enterprise search."
    ],
    "correctIdx": 3,
    "explanation": "Transcribe chuyển giọng nói thành văn bản (Speech-to-Text, hỗ trợ che thông tin nhạy cảm PII và tách người nói); Polly chuyển văn bản thành giọng nói (Text-to-Speech); Translate dịch đa ngôn ngữ; Kendra là công cụ tìm kiếm tài liệu nội bộ thông minh bằng câu hỏi tự nhiên.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-6",
      "s45",
      "Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search)"
    ]
  },
  {
    "id": "x-p6-043",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      46
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-043, Phase 6 Session 46) focusing on CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-043 - Chặng 6, Buổi #46] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Inspect AWS CloudTrail management events to identify which IAM principal modified the security group, and create an AWS Config rule with Systems Manager Automation for auto-remediation.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Bộ ba giám sát cốt lõi: CloudWatch theo dõi hiệu năng & log ứng dụng; AWS CloudTrail ghi lại lịch sử kiểm toán mọi lời gọi API ('Ai đã làm gì, lúc nào, từ IP nào'); AWS Config theo dõi lịch sử thay đổi cấu hình tài nguyên theo thời gian và đánh giá tuân thủ (Compliance) kèm tự động sửa lỗi qua SSM Automation.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s46",
      "CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance)"
    ]
  },
  {
    "id": "x-p6-044",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      1,
      47
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is modernizing its cloud infrastructure for production case x-p6-044. An enterprise using AWS Organizations wants to proxy authentication requests from AWS applications directly to its on-premises Microsoft Active Directory without caching user credentials in the cloud, while also applying organization-wide Resource Control Policies (RCPs) alongside Service Control Policies (SCPs). Which AWS Directory Service option and Organizations policy should the architect use? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p6-044] Doanh nghiệp dùng AWS Organizations muốn chuyển tiếp yêu cầu xác thực trực tiếp về Active Directory dưới On-premise mà không lưu user trên mây, đồng thời áp dụng Resource Control Policies (RCP) bên cạnh SCP. Tùy chọn AWS Directory Service và chính sách nào đáp ứng yêu cầu này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy AD Connector in AWS Directory Service to proxy authentication requests directly to the on-premises Active Directory without caching credentials, and use Resource Control Policies (RCPs) for resource guardrails.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Phân biệt AWS Directory Service: AWS Managed Microsoft AD dùng khi cần dựng AD thật trên AWS và thiết lậpTwo-way Forest Trust với AD dưới đất; AD Connector là cổng Proxy chỉ chuyển tiếp yêu cầu đăng nhập về AD dưới đất mà không lưu thông tin user trên mây; Simple AD là thư mục Samba nhỏ giá rẻ độc lập. Resource Control Policies (RCP) trong Organizations kiểm soát ranh giới quyền tối đa trực tiếp trên tài nguyên (S3, KMS, SQS, STS, Secrets Manager).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS Directory Service (Managed Microsoft AD vs AD Connector Proxy vs Simple AD) & Resource Control Policies (RCPs)"
    ]
  },
  {
    "id": "x-p6-045",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      48
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-045, Phase 6 Session 48) focusing on KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-045 - Chặng 6, Buổi #48] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Encrypt the source EBS volume with a Customer Managed KMS Key, grant the destination AWS account permission in the KMS Key Policy, and re-encrypt the copied snapshot in the target account.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Không bao giờ chia sẻ được EBS Snapshot hay AMI đang mã hóa bằng khóa mặc định (AWS Managed Key `aws/ebs`). Để chia sẻ sang tài khoản khác, bắt buộc phải mã hóa bằng Customer Managed Key (CMK) và cấp quyền cho tài khoản đích trong KMS Key Policy.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s48",
      "KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing"
    ]
  },
  {
    "id": "x-p6-046",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      7,
      49
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-046, Phase 6 Session 49) focusing on AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-046 - Chặng 6, Buổi #49] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Attach an AWS WAF Web ACL with a Rate-Based Rule and AWS Managed Rules for SQL injection to the Application Load Balancer, and subscribe to AWS Shield Advanced for DDoS cost protection."
    ],
    "correctIdx": 3,
    "explanation": "AWS WAF bảo vệ tầng 7 (HTTP/HTTPS) chống SQL Injection, XSS, chặn theo quốc gia và tự động chặn IP gửi quá N request/5 phút bằng Rate-based Rule (AWS WAF gắn được vào CloudFront, ALB, API Gateway, AppSync, Cognito User Pool, Verified Access — KHÔNG gắn vào NLB hay EC2 trực tiếp!). AWS Shield Advanced bảo vệ DDoS chuyên sâu kèm đội ngũ SRT 24/7 và hoàn tiền hóa đơn tăng vọt do DDoS (Cost Protection).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-6",
      "s49",
      "AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced"
    ]
  },
  {
    "id": "x-p6-047",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      50
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-047, Phase 6 Session 50) focusing on AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p6-047 - Chặng 6, Buổi #50] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use the AWS Schema Conversion Tool (SCT) to convert the Oracle schemas and stored procedures to Amazon Aurora PostgreSQL, and then use AWS DMS with ongoing Change Data Capture (CDC).",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "Khi di chuyển cơ sở dữ liệu sang AWS mà vẫn giữ DB nguồn hoạt động bình thường không gián đoạn (Near-zero downtime): nếu cùng hệ quản trị (Homogeneous: Oracle -> RDS Oracle) chỉ cần dùng AWS DMS. Nếu khác hệ quản trị (Heterogeneous: Oracle -> Aurora PostgreSQL hoặc SQL Server -> MySQL), bắt buộc chạy AWS Schema Conversion Tool (SCT) trước để chuyển đổi cấu trúc bảng/code rồi mới dùng AWS DMS chép dữ liệu kèm CDC.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s50",
      "AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT)"
    ]
  },
  {
    "id": "x-p6-048",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      13,
      51
    ],
    "difficulty": "easy",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p6-048, Phase 6 Session 51) focusing on AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-048 - Chặng 6, Buổi #51] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Upgrade to AWS Business or Enterprise Support to unlock all AWS Trusted Advisor checks and integrate Trusted Advisor events with Amazon EventBridge for automated remediation.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "AWS Trusted Advisor kiểm tra tài khoản theo 5 hạng mục (Cost Optimization, Performance, Security, Fault Tolerance, Service Limits). Lưu ý đề thi: các kiểm tra cốt lõi (S3 bucket hở public, Security Group mở cổng 0.0.0.0/0, thiếu MFA trên Root, giới hạn Service Quotas) được miễn phí cho mọi tài khoản, nhưng để mở khóa toàn bộ kiểm tra và đẩy sự kiện qua EventBridge/API cần gói Business hoặc Enterprise Support.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-6",
      "s51",
      "AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation)"
    ]
  },
  {
    "id": "x-p6-049",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p6-049, Phase 6 Session 44) focusing on Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p6-049 - Chặng 6, Buổi #44] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use AWS Glue crawlers to populate the AWS Glue Data Catalog, convert the raw CSV logs into partitioned Apache Parquet format, and query them with Amazon Athena.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Bộ đôi phân tích Serverless kinh điển: Amazon Athena chạy câu lệnh SQL chuẩn trực tiếp trên file lưu trong S3 (trả 5 USD/TB dữ liệu quét). Để giảm tới 90% chi phí và tăng tốc Athena, hãy dùng AWS Glue chuyển đổi file CSV/JSON sang định dạng cột nén Apache Parquet/ORC và phân vùng (Partition) thư mục theo ngày/tháng.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s44",
      "Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization"
    ]
  },
  {
    "id": "x-p6-050",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      19,
      45
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p6-050, Phase 6 Session 45) focusing on Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p6-050 - Chặng 6, Buổi #45] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use Amazon Textract to extract structured text and table data from scanned medical forms, and use Amazon Comprehend (or Comprehend Medical) to detect and redact PII entities.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Bộ dịch vụ AI dùng ngay không cần biết ML: Rekognition (nhận diện khuôn mặt, vật thể, kiểm duyệt ảnh/video); Textract (OCR thông minh bóc tách chữ viết tay, bảng biểu, hóa đơn từ PDF/ảnh scan); Comprehend (xử lý ngôn ngữ tự nhiên NLP, phân tích cảm xúc Sentiment, phát hiện dữ liệu nhạy cảm PII).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-6",
      "s45",
      "Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII)"
    ]
  },
  {
    "id": "x-p6-051",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      46
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p6-051, Phase 6 Session 46) focusing on CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p6-051 - Chặng 6, Buổi #46] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Install the Unified CloudWatch Agent on the EC2 instances to push memory and disk space utilization metrics, and enable CloudTrail Log File Integrity Validation using SHA-256 hashes."
    ],
    "correctIdx": 3,
    "explanation": "Mặc định EC2 chỉ gửi các chỉ số cấp Hypervisor (CPU, Network, Disk I/O) lên CloudWatch và KHÔNG gửi chỉ số % RAM hay % dung lượng ổ đĩa trống (Disk Space) — muốn có phải cài CloudWatch Agent. Trên CloudTrail, bật Log File Integrity Validation để dùng hàm băm SHA-256 + chữ ký số chứng minh file log trên S3 không bị chỉnh sửa sau khi xuất.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-6",
      "s46",
      "CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation"
    ]
  },
  {
    "id": "x-p6-052",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      25,
      47
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p6-052, Phase 6 Session 47) focusing on AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p6-052 - Chặng 6, Buổi #47] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Attach a Service Control Policy (SCP) with an explicit deny for unapproved Regions to the target Organizational Units (OUs), noting that SCPs never restrict the management account.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Trong AWS Organizations, Service Control Policies (SCPs) đặt ranh giới quyền tối đa cho các tài khoản thành viên (áp dụng cho cả Root User của tài khoản thành viên đó), nhưng bản thân SCP không tự cấp quyền (vẫn cần IAM Allow) và SCP KHÔNG BAO GIỜ có tác dụng lên Management Account!",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-6",
      "s47",
      "AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception)"
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
