// exam-bank-3.js — Ngân hàng câu hỏi thi thử & checkpoint (pool: "exam") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = [
  {
    "id": "x-p4-001",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      29
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-001, Phase 4 Session 29) focusing on Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-001 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Deploy Amazon FSx for Windows File Server configured in Multi-AZ mode and joined to the corporate Microsoft Active Directory domain.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Khi các máy chủ Windows EC2 hoặc máy trạm On-premise cần hệ thống file chia sẻ hỗ trợ giao thức SMB thuần túy, phân quyền NTFS ACL, tích hợp Microsoft Active Directory và DFS Namespaces, đáp án chuẩn là Amazon FSx for Windows File Server.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ)"
    ]
  },
  {
    "id": "x-p4-002",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      4,
      30
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-002, Phase 4 Session 30) focusing on AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-002 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Install an AWS DataSync agent on premises and configure a scheduled transfer task with bandwidth throttling to replicate files and POSIX metadata to Amazon EFS.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "AWS DataSync là công cụ di chuyển dữ liệu qua mạng (Internet/DX/VPN) tự động tốc độ cao (nhanh gấp 10 lần công cụ mã nguồn mở), giữ nguyên toàn bộ quyền file metadata (POSIX/SMB permissions), tự động kiểm tra toàn vẹn dữ liệu và cho phép giới hạn băng thông (bandwidth throttling) theo giờ hành chính.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling)"
    ]
  },
  {
    "id": "x-p4-003",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      31
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-003, Phase 4 Session 31) focusing on SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-003 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure a Dead-Letter Queue (DLQ) with a redrive policy setting maxReceiveCount to 3 so poison-pill messages are isolated for debugging."
    ],
    "correctIdx": 3,
    "explanation": "Dead-Letter Queue (DLQ) giúp tách riêng các tin nhắn bị lỗi lặp đi lặp lại vượt ngưỡng maxReceiveCount để không làm nghẽn hàng đợi chính (lưu ý DLQ của hàng đợi FIFO cũng phải là FIFO). Với tin nhắn vượt giới hạn kích thước tối đa của SQS (nay là 1 MiB, trước đây 256 KB), dùng SQS Extended Client Library lưu file thực trên S3 và chỉ gửi con trỏ qua SQS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-4",
      "s31",
      "SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads"
    ]
  },
  {
    "id": "x-p4-004",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      10,
      32
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-004, Phase 4 Session 32) focusing on Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-004 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Publish order events to a single Amazon SNS topic and subscribe multiple independent Amazon SQS queues (one per downstream service) using the Fan-Out pattern.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Khi 1 sự kiện đầu vào (như Đặt hàng thành công hoặc S3 Upload) cần kích hoạt ĐỒNG THỜI nhiều dịch vụ độc lập (Kho vận, Hóa đơn, Phân tích gian lận) mà vẫn đảm bảo lưu đệm chống mất tin khi một dịch vụ bị sập, mô hình kinh điển luôn là SNS + SQS Fan-Out.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s32",
      "Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss"
    ]
  },
  {
    "id": "x-p4-005",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      33
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is modernizing its cloud infrastructure for production case x-p4-005. An enterprise runs an on-premises event streaming platform built on Apache Kafka using custom Java Kafka Producer and Consumer APIs and wants to migrate to a fully managed AWS service with minimal code changes. While Session 33 covers Kinesis Data Streams and Data Firehose, which managed AWS service is specifically designed for Apache Kafka workloads? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance. (Choose TWO.)",
    "qVi": "[Mã đề x-p4-005] Doanh nghiệp đang chạy nền tảng xử lý sự kiện dùng Apache Kafka dưới On-premise và muốn chuyển lên dịch vụ quản lý hoàn toàn của AWS mà giữ nguyên code Kafka API hiện tại. Dịch vụ AWS nào được thiết kế riêng cho Apache Kafka? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất. (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Migrate the cluster to Amazon MSK (Managed Streaming for Apache Kafka) using MSK Serverless so existing Kafka producer and consumer code works unchanged.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "Khi đề bài nêu rõ doanh nghiệp đang dùng Apache Kafka dưới On-premise và muốn chuyển lên dịch vụ quản lý của AWS mà giữ nguyên code Kafka API hiện tại, đáp án chuẩn là Amazon MSK (dùng MSK Serverless nếu tải biến thiên không muốn tự quản lý dung lượng Broker).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-4",
      "s33",
      "Amazon MSK (Managed Streaming for Apache Kafka) for Lift-and-Shift Apache Kafka Workloads"
    ]
  },
  {
    "id": "x-p4-006",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      16,
      34
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-006, Phase 4 Session 34) focusing on Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-006 - Chặng 4, Buổi #34] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Migrate the workloads to Amazon EKS with AWS Fargate profiles and enable Amazon ECR enhanced image scanning powered by Amazon Inspector.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Khi doanh nghiệp đã chuẩn hóa dùng Kubernetes (kubectl, Helm charts) dưới On-premise hoặc đa đám mây và muốn mang lên AWS, chọn Amazon EKS. Kho lưu trữ Docker image riêng tư là Amazon ECR (hỗ trợ quét lỗ hổng tự động với Amazon Inspector).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s34",
      "Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning"
    ]
  },
  {
    "id": "x-p4-007",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      35
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-007, Phase 4 Session 35) focusing on AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-007 - Chặng 4, Buổi #35] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Increase the AWS Lambda function memory configuration (up to 10,240 MB), which proportionally increases the allocated vCPU and network bandwidth.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Trong AWS Lambda, người dùng không cấu hình trực tiếp số vCPU mà cấu hình dung lượng RAM (từ 128 MB đến 10,240 MB); khi tăng RAM thì sức mạnh CPU và băng thông mạng sẽ tự động tăng theo tỷ lệ. Giới hạn chạy tối đa là 15 phút (900 giây), thư mục tạm /tmp tối đa 10 GB.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s35",
      "AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount"
    ]
  },
  {
    "id": "x-p4-008",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      22,
      36
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-008, Phase 4 Session 36) focusing on Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-008 - Chặng 4, Buổi #36] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy an Amazon API Gateway HTTP API with a native JWT authorizer to proxy requests to AWS Lambda at up to 70% lower cost than a REST API."
    ],
    "correctIdx": 3,
    "explanation": "API Gateway HTTP API rẻ hơn tới ~70% và độ trễ thấp hơn REST API khi chỉ cần làm cổng proxy HTTP kèm xác thực OIDC/OAuth 2.0 JWT. Chỉ chọn REST API khi đề bài yêu cầu các tính năng nâng cao: API Keys + Usage Plans, Caching tại API Gateway, gắn AWS WAF, hoặc chuyển đổi dữ liệu XML/SOAP (Mapping Templates). Lưu ý giới hạn Integration Timeout cứng 29 giây (29s)!",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-4",
      "s36",
      "Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout"
    ]
  },
  {
    "id": "x-p4-009",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      29
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-009, Phase 4 Session 29) focusing on Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-009 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Migrate the workload to Amazon FSx for NetApp ONTAP, which supports multiprotocol NFS and SMB access along with NetApp SnapMirror replication and instant cloning.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Nếu doanh nghiệp đang dùng NetApp/ONTAP hoặc cần truy cập đa giao thức đồng thời (cả Linux NFS lẫn Windows SMB/iSCSI) kèm tính năng nén/chống trùng lặp (deduplication) và nhân bản SnapMirror, chọn FSx for NetApp ONTAP. Nếu đang di chuyển từ hệ thống file ZFS trên Linux cần snapshot/clone tức thì, chọn FSx for OpenZFS.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS"
    ]
  },
  {
    "id": "x-p4-010",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      28,
      30
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-010, Phase 4 Session 30) focusing on AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-010 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy an AWS Storage Gateway S3 File Gateway appliance on premises so local servers can write files over NFS/SMB that automatically become native S3 objects.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Bảng chọn Storage Gateway: S3 File Gateway (máy chủ dưới đất đọc/ghi qua NFS/SMB, file lưu thành S3 Object nguyên bản trên mây để chạy Athena/Lifecycle); FSx File Gateway (đệm cache cục bộ cho FSx for Windows); Volume Gateway Cached/Stored (ổ đĩa block iSCSI sao lưu thành EBS Snapshot); Tape Gateway (thay thế băng từ vật lý VTL lưu lên S3 Glacier).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway"
    ]
  },
  {
    "id": "x-p4-011",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      31
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-011, Phase 4 Session 31) focusing on SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-011 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enable SQS Long Polling by setting WaitTimeSeconds to 20 seconds to reduce empty API responses and lower monthly SQS costs.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Visibility Timeout là khoảng thời gian ẩn tin nhắn khỏi các Consumer khác sau khi 1 Consumer vừa nhận tin (nếu xử lý lâu nên gọi API ChangeMessageVisibility để gia hạn). Long Polling (WaitTimeSeconds từ 1–20s) giúp Consumer giữ kết nối chờ có tin mới trả về, giảm số lần gọi API rỗng và tiết kiệm chi phí.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s31",
      "SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s)"
    ]
  },
  {
    "id": "x-p4-012",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      6,
      32
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-012, Phase 4 Session 32) focusing on Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p4-012 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure the Amazon SNS topic to deliver streaming notifications directly to an Amazon Kinesis Data Firehose delivery stream targeting Amazon S3.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Ngoài SQS và Lambda, Amazon SNS có thể gửi thông báo trực tiếp tới Email, SMS, Mobile Push, HTTP/HTTPS Webhook và đẩy thẳng dữ liệu vào Amazon Kinesis Data Firehose để lưu xuống S3/Redshift/OpenSearch.",
    "whyWrong": [
      null,
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s32",
      "Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose)"
    ]
  },
  {
    "id": "x-p4-013",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      33
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-013, Phase 4 Session 33) focusing on Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-013 - Chặng 4, Buổi #33] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use Amazon Kinesis Data Firehose with built-in dynamic partitioning and Parquet format conversion to deliver streaming logs directly to Amazon S3."
    ],
    "correctIdx": 3,
    "explanation": "Phân biệt cực kỳ quan trọng: Kinesis Data Streams dùng cho xử lý thời gian thực (< 200ms), lưu giữ dữ liệu từ 1 đến 365 ngày và cho phép nhiều ứng dụng đọc lại (Replay). Ngược lại, Kinesis Data Firehose là đường ống Serverless tự động gom đệm (Near real-time, tối thiểu 60s hoặc 1 MB) và nạp thẳng dữ liệu vào S3, Redshift, OpenSearch mà không cần quản lý Shard nhưng KHÔNG hỗ trợ Replay.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-4",
      "s33",
      "Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery)"
    ]
  },
  {
    "id": "x-p4-014",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      12,
      34
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-014, Phase 4 Session 34) focusing on ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-014 - Chặng 4, Buổi #34] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create a dedicated IAM Task Role with least-privilege DynamoDB permissions and assign it to the specific ECS task definition.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Phân biệt rõ: ECS Task Execution Role là quyền của ECS Agent (để kéo image từ ECR, ghi log vào CloudWatch và lấy biến môi trường từ Secrets Manager lúc khởi động). Còn để code ứng dụng bên trong Container gọi tới S3/DynamoDB riêng biệt cho từng dịch vụ, phải gắn IAM Task Role vào Task Definition.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s34",
      "ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs)"
    ]
  },
  {
    "id": "x-p4-015",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      35
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is modernizing its cloud infrastructure for production case x-p4-015. An application invokes an AWS Lambda function asynchronously when files arrive in Amazon S3. If the function fails after Lambda's 2 automatic retries, the team wants to route the full execution context and stack trace directly to Amazon EventBridge rather than a legacy Dead-Letter Queue (DLQ). Which feature should the architect configure? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p4-015] Ứng dụng gọi hàm AWS Lambda bất đồng bộ khi có file mới trên S3. Nếu hàm vẫn lỗi sau 2 lần tự động retry của Lambda, đội ngũ muốn gửi toàn bộ ngữ cảnh lỗi và stack trace thẳng sang Amazon EventBridge thay vì dùng Dead-Letter Queue (DLQ) cũ. Tính năng nào đáp ứng yêu cầu này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an AWS Lambda Destination for On-Failure events targeting Amazon EventBridge to capture the full execution context and stack trace after 2 retries.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Khi gọi Lambda bất đồng bộ (Asynchronous invocation như từ S3, SNS, EventBridge), nếu lỗi Lambda sẽ tự động thử lại thêm 2 lần (tổng 3 lần chạy). Lambda Destinations được khuyến nghị hơn DLQ cũ vì hỗ trợ cả On-Success và On-Failure, gửi kèm toàn bộ ngữ cảnh lỗi/stack trace và hỗ trợ đích đến là EventBridge bên cạnh SQS/SNS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s35",
      "Lambda Asynchronous Invocation (2 Automatic Retries) & Lambda Destinations vs Dead-Letter Queues (DLQ)"
    ]
  },
  {
    "id": "x-p4-016",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      18,
      36
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p4-016. A company is building an IoT ingestion workflow processing 150,000 events per second (each completing in under 10 seconds) and also needs a low-cost serverless API proxy with JWT authentication while keeping synchronous backend calls under API Gateway's 29-second (29s) integration timeout. Which workflow type should the architect use for the high-rate IoT pipeline? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p4-016] Công ty xây dựng luồng xử lý IoT tốc độ 150.000 sự kiện/giây (mỗi luồng dưới 10 giây) đồng thời dùng API Gateway HTTP API (so với REST API, lưu ý giới hạn timeout 29 giây / 29s). Loại Step Functions Workflow nào phù hợp nhất cho luồng IoT tốc độ cao này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Orchestrate the high-throughput IoT ingestion pipeline using AWS Step Functions Express Workflows, which support over 100,000 executions per second for workflows under 5 minutes.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Phân biệt 2 loại Step Functions: Standard Workflow chạy tối đa 1 năm, thực thi đúng 1 lần (Exactly-once), phù hợp quy trình nghiệp vụ dài hạn/thanh toán có bước chờ con người duyệt. Express Workflow chạy tối đa 5 phút, tốc độ > 100,000 luồng/giây, giá cực rẻ cho xử lý luồng IoT/Streaming tốc độ cao.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s36",
      "AWS Step Functions: Standard Workflows (Up to 1 Year, Exactly-Once) vs Express Workflows (>100k/s, <=5 Min, Cheaper)"
    ]
  },
  {
    "id": "x-p4-017",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      29
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-017, Phase 4 Session 29) focusing on Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-017 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Create an Amazon FSx for Lustre file system linked to the Amazon S3 bucket using lazy loading and write-back export for the HPC cluster."
    ],
    "correctIdx": 3,
    "explanation": "Khi đề bài nhắc tới tính toán hiệu năng cao (HPC), Machine Learning, xử lý video tốc độ hàng trăm GB/s trên Linux kết hợp đọc/ghi đồng bộ trực tiếp với một S3 Bucket (S3 Data Repository), đáp án luôn là Amazon FSx for Lustre (chọn Scratch cho tải ngắn hạn giá rẻ, Persistent cho tải dài hạn).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration)"
    ]
  },
  {
    "id": "x-p4-018",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      24,
      30
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-018, Phase 4 Session 30) focusing on AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-018 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Order multiple AWS Snowball Edge Storage Optimized devices to copy the 600 TB dataset offline and ship the appliances to AWS for import into Amazon S3.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Quy tắc vàng di chuyển dữ liệu lớn: Nếu chuyển qua mạng hiện có mất hơn 1 tuần (ví dụ 600 TB qua đường mạng 100 Mbps mất hơn 2 năm!), hãy đặt thiết bị vật lý AWS Snowball Edge để chép offline. Còn nếu đối tác B2B cần tải file thẳng vào S3/EFS qua giao thức SFTP/FTPS/FTP không sửa quy trình cũ, dùng AWS Transfer Family.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS)"
    ]
  },
  {
    "id": "x-p4-019",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      31
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-019, Phase 4 Session 31) focusing on Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p4-019 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create an Amazon SQS FIFO queue (ending in .fifo) with a Message Group ID and Content-Based Deduplication to guarantee strict ordering and exactly-once processing.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "SQS Standard có thông lượng không giới hạn nhưng có thể lặp tin (At-least-once) và lệch thứ tự. Khi nghiệp vụ tài chính/ngân hàng bắt buộc giữ đúng thứ tự tuyệt đối (First-In-First-Out) và xử lý đúng 1 lần (Deduplication trong cửa sổ 5 phút), phải dùng SQS FIFO (tên bắt buộc có hậu tố .fifo).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s31",
      "Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo)"
    ]
  },
  {
    "id": "x-p4-020",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      2,
      32
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-020, Phase 4 Session 32) focusing on SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-020 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure Amazon SNS Message Filtering Policies on each SQS subscription so each queue receives only the subset of events matching its attributes.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Để các hàng đợi SQS con trong mô hình Fan-Out chỉ nhận đúng loại đơn hàng mình phụ trách mà không cần tạo hàng chục SNS Topic hay viết code lọc thủ công, ta gắn SNS Message Filtering Policy (lọc theo JSON Message Attributes) ngay trên từng Subscription.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s32",
      "SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes"
    ]
  },
  {
    "id": "x-p4-021",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      33
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-021, Phase 4 Session 33) focusing on Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-021 - Chặng 4, Buổi #33] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Migrate the legacy enterprise message broker to Amazon MQ configured in an Active/Standby Multi-AZ deployment backed by Amazon EFS.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Khi di chuyển ứng dụng cũ (Legacy On-premise) đang dùng các giao thức chuẩn công nghiệp như JMS, AMQP, STOMP, MQTT (ActiveMQ hoặc RabbitMQ) và đề bài ràng buộc 'không viết lại code sang AWS SDK', bắt buộc chọn Amazon MQ thay vì SQS/SNS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s33",
      "Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS"
    ]
  },
  {
    "id": "x-p4-022",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      8,
      34
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-022, Phase 4 Session 34) focusing on Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-022 - Chặng 4, Buổi #34] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Deploy the containerized microservices on Amazon ECS using the AWS Fargate launch type so AWS manages all underlying server provisioning and patching."
    ],
    "correctIdx": 3,
    "explanation": "Khi chạy Container (Docker) trên AWS và đề bài có từ khóa 'least operational overhead', 'serverless containers', 'no EC2 instance management', đáp án luôn là AWS Fargate (trả tiền theo vCPU và RAM của từng Task).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-4",
      "s34",
      "Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2"
    ]
  },
  {
    "id": "x-p4-023",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      35
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-023, Phase 4 Session 35) focusing on Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-023 - Chặng 4, Buổi #35] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable AWS Lambda Provisioned Concurrency on the production function alias so execution environments remain pre-initialized with sub-100ms response times.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Reserved Concurrency chỉ đặt giới hạn số lượng bản sao tối đa (hoặc đặt = 0 để ngắt khẩn cấp hàm Lambda), không khử được Cold Start. Để giữ các môi trường chạy luôn nóng (pre-warmed) sẵn sàng phản hồi tức thì không bị trễ Cold Start, phải bật Provisioned Concurrency.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s35",
      "Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency"
    ]
  },
  {
    "id": "x-p4-024",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      14,
      36
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-024, Phase 4 Session 36) focusing on Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-024 - Chặng 4, Buổi #36] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Authenticate mobile users with an Amazon Cognito User Pool and exchange the token with an Amazon Cognito Identity Pool to obtain temporary IAM credentials for direct S3 uploads.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Quy tắc phân biệt Cognito: User Pools là cơ sở dữ liệu người dùng (Đăng ký, Đăng nhập, MFA, liên kết Google/Facebook/SAML, trả về JWT token để gọi API Gateway). Identity Pools (Federated Identities) dùng để đổi token đăng nhập lấy Temporary AWS Credentials từ STS cho phép app di động gọi thẳng lên S3/DynamoDB.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s36",
      "Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS)"
    ]
  },
  {
    "id": "x-p4-025",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      29
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-025, Phase 4 Session 29) focusing on Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-025 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Deploy Amazon FSx for Windows File Server configured in Multi-AZ mode and joined to the corporate Microsoft Active Directory domain.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Khi các máy chủ Windows EC2 hoặc máy trạm On-premise cần hệ thống file chia sẻ hỗ trợ giao thức SMB thuần túy, phân quyền NTFS ACL, tích hợp Microsoft Active Directory và DFS Namespaces, đáp án chuẩn là Amazon FSx for Windows File Server.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ)"
    ]
  },
  {
    "id": "x-p4-026",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      20,
      30
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-026, Phase 4 Session 30) focusing on AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p4-026 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Install an AWS DataSync agent on premises and configure a scheduled transfer task with bandwidth throttling to replicate files and POSIX metadata to Amazon EFS.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "AWS DataSync là công cụ di chuyển dữ liệu qua mạng (Internet/DX/VPN) tự động tốc độ cao (nhanh gấp 10 lần công cụ mã nguồn mở), giữ nguyên toàn bộ quyền file metadata (POSIX/SMB permissions), tự động kiểm tra toàn vẹn dữ liệu và cho phép giới hạn băng thông (bandwidth throttling) theo giờ hành chính.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling)"
    ]
  },
  {
    "id": "x-p4-027",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      31
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-027, Phase 4 Session 31) focusing on SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-027 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure a Dead-Letter Queue (DLQ) with a redrive policy setting maxReceiveCount to 3 so poison-pill messages are isolated for debugging."
    ],
    "correctIdx": 3,
    "explanation": "Dead-Letter Queue (DLQ) giúp tách riêng các tin nhắn bị lỗi lặp đi lặp lại vượt ngưỡng maxReceiveCount để không làm nghẽn hàng đợi chính (lưu ý DLQ của hàng đợi FIFO cũng phải là FIFO). Với tin nhắn vượt giới hạn kích thước tối đa của SQS (nay là 1 MiB, trước đây 256 KB), dùng SQS Extended Client Library lưu file thực trên S3 và chỉ gửi con trỏ qua SQS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-4",
      "s31",
      "SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads"
    ]
  },
  {
    "id": "x-p4-028",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      26,
      32
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-028, Phase 4 Session 32) focusing on Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-028 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Publish order events to a single Amazon SNS topic and subscribe multiple independent Amazon SQS queues (one per downstream service) using the Fan-Out pattern.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Khi 1 sự kiện đầu vào (như Đặt hàng thành công hoặc S3 Upload) cần kích hoạt ĐỒNG THỜI nhiều dịch vụ độc lập (Kho vận, Hóa đơn, Phân tích gian lận) mà vẫn đảm bảo lưu đệm chống mất tin khi một dịch vụ bị sập, mô hình kinh điển luôn là SNS + SQS Fan-Out.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s32",
      "Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss"
    ]
  },
  {
    "id": "x-p4-029",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      33
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is modernizing its cloud infrastructure for production case x-p4-029. An enterprise runs an on-premises event streaming platform built on Apache Kafka using custom Java Kafka Producer and Consumer APIs and wants to migrate to a fully managed AWS service with minimal code changes. While Session 33 covers Kinesis Data Streams and Data Firehose, which managed AWS service is specifically designed for Apache Kafka workloads? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p4-029] Doanh nghiệp đang chạy nền tảng xử lý sự kiện dùng Apache Kafka dưới On-premise và muốn chuyển lên dịch vụ quản lý hoàn toàn của AWS mà giữ nguyên code Kafka API hiện tại. Dịch vụ AWS nào được thiết kế riêng cho Apache Kafka? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Migrate the cluster to Amazon MSK (Managed Streaming for Apache Kafka) using MSK Serverless so existing Kafka producer and consumer code works unchanged.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Khi đề bài nêu rõ doanh nghiệp đang dùng Apache Kafka dưới On-premise và muốn chuyển lên dịch vụ quản lý của AWS mà giữ nguyên code Kafka API hiện tại, đáp án chuẩn là Amazon MSK (dùng MSK Serverless nếu tải biến thiên không muốn tự quản lý dung lượng Broker).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s33",
      "Amazon MSK (Managed Streaming for Apache Kafka) for Lift-and-Shift Apache Kafka Workloads"
    ]
  },
  {
    "id": "x-p4-030",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      4,
      34
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-030, Phase 4 Session 34) focusing on Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-030 - Chặng 4, Buổi #34] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Migrate the workloads to Amazon EKS with AWS Fargate profiles and enable Amazon ECR enhanced image scanning powered by Amazon Inspector.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Khi doanh nghiệp đã chuẩn hóa dùng Kubernetes (kubectl, Helm charts) dưới On-premise hoặc đa đám mây và muốn mang lên AWS, chọn Amazon EKS. Kho lưu trữ Docker image riêng tư là Amazon ECR (hỗ trợ quét lỗ hổng tự động với Amazon Inspector).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s34",
      "Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning"
    ]
  },
  {
    "id": "x-p4-031",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      35
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-031, Phase 4 Session 35) focusing on AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-031 - Chặng 4, Buổi #35] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Increase the AWS Lambda function memory configuration (up to 10,240 MB), which proportionally increases the allocated vCPU and network bandwidth."
    ],
    "correctIdx": 3,
    "explanation": "Trong AWS Lambda, người dùng không cấu hình trực tiếp số vCPU mà cấu hình dung lượng RAM (từ 128 MB đến 10,240 MB); khi tăng RAM thì sức mạnh CPU và băng thông mạng sẽ tự động tăng theo tỷ lệ. Giới hạn chạy tối đa là 15 phút (900 giây), thư mục tạm /tmp tối đa 10 GB.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-4",
      "s35",
      "AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount"
    ]
  },
  {
    "id": "x-p4-032",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      10,
      36
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-032, Phase 4 Session 36) focusing on Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-032 - Chặng 4, Buổi #36] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy an Amazon API Gateway HTTP API with a native JWT authorizer to proxy requests to AWS Lambda at up to 70% lower cost than a REST API.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "API Gateway HTTP API rẻ hơn tới ~70% và độ trễ thấp hơn REST API khi chỉ cần làm cổng proxy HTTP kèm xác thực OIDC/OAuth 2.0 JWT. Chỉ chọn REST API khi đề bài yêu cầu các tính năng nâng cao: API Keys + Usage Plans, Caching tại API Gateway, gắn AWS WAF, hoặc chuyển đổi dữ liệu XML/SOAP (Mapping Templates). Lưu ý giới hạn Integration Timeout cứng 29 giây (29s)!",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s36",
      "Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout"
    ]
  },
  {
    "id": "x-p4-033",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      29
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-033, Phase 4 Session 29) focusing on Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p4-033 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Migrate the workload to Amazon FSx for NetApp ONTAP, which supports multiprotocol NFS and SMB access along with NetApp SnapMirror replication and instant cloning.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "Nếu doanh nghiệp đang dùng NetApp/ONTAP hoặc cần truy cập đa giao thức đồng thời (cả Linux NFS lẫn Windows SMB/iSCSI) kèm tính năng nén/chống trùng lặp (deduplication) và nhân bản SnapMirror, chọn FSx for NetApp ONTAP. Nếu đang di chuyển từ hệ thống file ZFS trên Linux cần snapshot/clone tức thì, chọn FSx for OpenZFS.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS"
    ]
  },
  {
    "id": "x-p4-034",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      16,
      30
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-034, Phase 4 Session 30) focusing on AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-034 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy an AWS Storage Gateway S3 File Gateway appliance on premises so local servers can write files over NFS/SMB that automatically become native S3 objects.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Bảng chọn Storage Gateway: S3 File Gateway (máy chủ dưới đất đọc/ghi qua NFS/SMB, file lưu thành S3 Object nguyên bản trên mây để chạy Athena/Lifecycle); FSx File Gateway (đệm cache cục bộ cho FSx for Windows); Volume Gateway Cached/Stored (ổ đĩa block iSCSI sao lưu thành EBS Snapshot); Tape Gateway (thay thế băng từ vật lý VTL lưu lên S3 Glacier).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway"
    ]
  },
  {
    "id": "x-p4-035",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      31
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-035, Phase 4 Session 31) focusing on SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-035 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enable SQS Long Polling by setting WaitTimeSeconds to 20 seconds to reduce empty API responses and lower monthly SQS costs.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Visibility Timeout là khoảng thời gian ẩn tin nhắn khỏi các Consumer khác sau khi 1 Consumer vừa nhận tin (nếu xử lý lâu nên gọi API ChangeMessageVisibility để gia hạn). Long Polling (WaitTimeSeconds từ 1–20s) giúp Consumer giữ kết nối chờ có tin mới trả về, giảm số lần gọi API rỗng và tiết kiệm chi phí.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s31",
      "SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s)"
    ]
  },
  {
    "id": "x-p4-036",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      22,
      32
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-036, Phase 4 Session 32) focusing on Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-036 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure the Amazon SNS topic to deliver streaming notifications directly to an Amazon Kinesis Data Firehose delivery stream targeting Amazon S3."
    ],
    "correctIdx": 3,
    "explanation": "Ngoài SQS và Lambda, Amazon SNS có thể gửi thông báo trực tiếp tới Email, SMS, Mobile Push, HTTP/HTTPS Webhook và đẩy thẳng dữ liệu vào Amazon Kinesis Data Firehose để lưu xuống S3/Redshift/OpenSearch.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-4",
      "s32",
      "Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose)"
    ]
  },
  {
    "id": "x-p4-037",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      33
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-037, Phase 4 Session 33) focusing on Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-037 - Chặng 4, Buổi #33] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use Amazon Kinesis Data Firehose with built-in dynamic partitioning and Parquet format conversion to deliver streaming logs directly to Amazon S3.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Phân biệt cực kỳ quan trọng: Kinesis Data Streams dùng cho xử lý thời gian thực (< 200ms), lưu giữ dữ liệu từ 1 đến 365 ngày và cho phép nhiều ứng dụng đọc lại (Replay). Ngược lại, Kinesis Data Firehose là đường ống Serverless tự động gom đệm (Near real-time, tối thiểu 60s hoặc 1 MB) và nạp thẳng dữ liệu vào S3, Redshift, OpenSearch mà không cần quản lý Shard nhưng KHÔNG hỗ trợ Replay.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s33",
      "Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery)"
    ]
  },
  {
    "id": "x-p4-038",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      28,
      34
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-038, Phase 4 Session 34) focusing on ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-038 - Chặng 4, Buổi #34] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "B. Create a dedicated IAM Task Role with least-privilege DynamoDB permissions and assign it to the specific ECS task definition.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Phân biệt rõ: ECS Task Execution Role là quyền của ECS Agent (để kéo image từ ECR, ghi log vào CloudWatch và lấy biến môi trường từ Secrets Manager lúc khởi động). Còn để code ứng dụng bên trong Container gọi tới S3/DynamoDB riêng biệt cho từng dịch vụ, phải gắn IAM Task Role vào Task Definition.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s34",
      "ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs)"
    ]
  },
  {
    "id": "x-p4-039",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      35
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is modernizing its cloud infrastructure for production case x-p4-039. An application invokes an AWS Lambda function asynchronously when files arrive in Amazon S3. If the function fails after Lambda's 2 automatic retries, the team wants to route the full execution context and stack trace directly to Amazon EventBridge rather than a legacy Dead-Letter Queue (DLQ). Which feature should the architect configure? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p4-039] Ứng dụng gọi hàm AWS Lambda bất đồng bộ khi có file mới trên S3. Nếu hàm vẫn lỗi sau 2 lần tự động retry của Lambda, đội ngũ muốn gửi toàn bộ ngữ cảnh lỗi và stack trace thẳng sang Amazon EventBridge thay vì dùng Dead-Letter Queue (DLQ) cũ. Tính năng nào đáp ứng yêu cầu này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Configure an AWS Lambda Destination for On-Failure events targeting Amazon EventBridge to capture the full execution context and stack trace after 2 retries.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Khi gọi Lambda bất đồng bộ (Asynchronous invocation như từ S3, SNS, EventBridge), nếu lỗi Lambda sẽ tự động thử lại thêm 2 lần (tổng 3 lần chạy). Lambda Destinations được khuyến nghị hơn DLQ cũ vì hỗ trợ cả On-Success và On-Failure, gửi kèm toàn bộ ngữ cảnh lỗi/stack trace và hỗ trợ đích đến là EventBridge bên cạnh SQS/SNS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s35",
      "Lambda Asynchronous Invocation (2 Automatic Retries) & Lambda Destinations vs Dead-Letter Queues (DLQ)"
    ]
  },
  {
    "id": "x-p4-040",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      6,
      36
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is modernizing its cloud infrastructure for production case x-p4-040. A company is building an IoT ingestion workflow processing 150,000 events per second (each completing in under 10 seconds) and also needs a low-cost serverless API proxy with JWT authentication while keeping synchronous backend calls under API Gateway's 29-second (29s) integration timeout. Which workflow type should the architect use for the high-rate IoT pipeline? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance. (Choose TWO.)",
    "qVi": "[Mã đề x-p4-040] Công ty xây dựng luồng xử lý IoT tốc độ 150.000 sự kiện/giây (mỗi luồng dưới 10 giây) đồng thời dùng API Gateway HTTP API (so với REST API, lưu ý giới hạn timeout 29 giây / 29s). Loại Step Functions Workflow nào phù hợp nhất cho luồng IoT tốc độ cao này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất. (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Orchestrate the high-throughput IoT ingestion pipeline using AWS Step Functions Express Workflows, which support over 100,000 executions per second for workflows under 5 minutes.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "Phân biệt 2 loại Step Functions: Standard Workflow chạy tối đa 1 năm, thực thi đúng 1 lần (Exactly-once), phù hợp quy trình nghiệp vụ dài hạn/thanh toán có bước chờ con người duyệt. Express Workflow chạy tối đa 5 phút, tốc độ > 100,000 luồng/giây, giá cực rẻ cho xử lý luồng IoT/Streaming tốc độ cao.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-4",
      "s36",
      "AWS Step Functions: Standard Workflows (Up to 1 Year, Exactly-Once) vs Express Workflows (>100k/s, <=5 Min, Cheaper)"
    ]
  },
  {
    "id": "x-p4-041",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      29
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-041, Phase 4 Session 29) focusing on Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p4-041 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Create an Amazon FSx for Lustre file system linked to the Amazon S3 bucket using lazy loading and write-back export for the HPC cluster.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "Khi đề bài nhắc tới tính toán hiệu năng cao (HPC), Machine Learning, xử lý video tốc độ hàng trăm GB/s trên Linux kết hợp đọc/ghi đồng bộ trực tiếp với một S3 Bucket (S3 Data Repository), đáp án luôn là Amazon FSx for Lustre (chọn Scratch cho tải ngắn hạn giá rẻ, Persistent cho tải dài hạn).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration)"
    ]
  },
  {
    "id": "x-p4-042",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      12,
      30
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-042, Phase 4 Session 30) focusing on AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-042 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Order multiple AWS Snowball Edge Storage Optimized devices to copy the 600 TB dataset offline and ship the appliances to AWS for import into Amazon S3."
    ],
    "correctIdx": 3,
    "explanation": "Quy tắc vàng di chuyển dữ liệu lớn: Nếu chuyển qua mạng hiện có mất hơn 1 tuần (ví dụ 600 TB qua đường mạng 100 Mbps mất hơn 2 năm!), hãy đặt thiết bị vật lý AWS Snowball Edge để chép offline. Còn nếu đối tác B2B cần tải file thẳng vào S3/EFS qua giao thức SFTP/FTPS/FTP không sửa quy trình cũ, dùng AWS Transfer Family.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS)"
    ]
  },
  {
    "id": "x-p4-043",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      31
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-043, Phase 4 Session 31) focusing on Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-043 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create an Amazon SQS FIFO queue (ending in .fifo) with a Message Group ID and Content-Based Deduplication to guarantee strict ordering and exactly-once processing.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "SQS Standard có thông lượng không giới hạn nhưng có thể lặp tin (At-least-once) và lệch thứ tự. Khi nghiệp vụ tài chính/ngân hàng bắt buộc giữ đúng thứ tự tuyệt đối (First-In-First-Out) và xử lý đúng 1 lần (Deduplication trong cửa sổ 5 phút), phải dùng SQS FIFO (tên bắt buộc có hậu tố .fifo).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s31",
      "Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo)"
    ]
  },
  {
    "id": "x-p4-044",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      18,
      32
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-044, Phase 4 Session 32) focusing on SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-044 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure Amazon SNS Message Filtering Policies on each SQS subscription so each queue receives only the subset of events matching its attributes.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Để các hàng đợi SQS con trong mô hình Fan-Out chỉ nhận đúng loại đơn hàng mình phụ trách mà không cần tạo hàng chục SNS Topic hay viết code lọc thủ công, ta gắn SNS Message Filtering Policy (lọc theo JSON Message Attributes) ngay trên từng Subscription.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s32",
      "SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes"
    ]
  },
  {
    "id": "x-p4-045",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      33
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-045, Phase 4 Session 33) focusing on Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-045 - Chặng 4, Buổi #33] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Migrate the legacy enterprise message broker to Amazon MQ configured in an Active/Standby Multi-AZ deployment backed by Amazon EFS.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Khi di chuyển ứng dụng cũ (Legacy On-premise) đang dùng các giao thức chuẩn công nghiệp như JMS, AMQP, STOMP, MQTT (ActiveMQ hoặc RabbitMQ) và đề bài ràng buộc 'không viết lại code sang AWS SDK', bắt buộc chọn Amazon MQ thay vì SQS/SNS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s33",
      "Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS"
    ]
  },
  {
    "id": "x-p4-046",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      24,
      34
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-046, Phase 4 Session 34) focusing on Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-046 - Chặng 4, Buổi #34] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Deploy the containerized microservices on Amazon ECS using the AWS Fargate launch type so AWS manages all underlying server provisioning and patching."
    ],
    "correctIdx": 3,
    "explanation": "Khi chạy Container (Docker) trên AWS và đề bài có từ khóa 'least operational overhead', 'serverless containers', 'no EC2 instance management', đáp án luôn là AWS Fargate (trả tiền theo vCPU và RAM của từng Task).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-4",
      "s34",
      "Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2"
    ]
  },
  {
    "id": "x-p4-047",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      35
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-047, Phase 4 Session 35) focusing on Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p4-047 - Chặng 4, Buổi #35] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Enable AWS Lambda Provisioned Concurrency on the production function alias so execution environments remain pre-initialized with sub-100ms response times.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Reserved Concurrency chỉ đặt giới hạn số lượng bản sao tối đa (hoặc đặt = 0 để ngắt khẩn cấp hàm Lambda), không khử được Cold Start. Để giữ các môi trường chạy luôn nóng (pre-warmed) sẵn sàng phản hồi tức thì không bị trễ Cold Start, phải bật Provisioned Concurrency.",
    "whyWrong": [
      null,
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s35",
      "Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency"
    ]
  },
  {
    "id": "x-p4-048",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      2,
      36
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p4-048, Phase 4 Session 36) focusing on Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-048 - Chặng 4, Buổi #36] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Authenticate mobile users with an Amazon Cognito User Pool and exchange the token with an Amazon Cognito Identity Pool to obtain temporary IAM credentials for direct S3 uploads.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Quy tắc phân biệt Cognito: User Pools là cơ sở dữ liệu người dùng (Đăng ký, Đăng nhập, MFA, liên kết Google/Facebook/SAML, trả về JWT token để gọi API Gateway). Identity Pools (Federated Identities) dùng để đổi token đăng nhập lấy Temporary AWS Credentials từ STS cho phép app di động gọi thẳng lên S3/DynamoDB.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-4",
      "s36",
      "Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS)"
    ]
  },
  {
    "id": "x-p4-049",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      29
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p4-049, Phase 4 Session 29) focusing on Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p4-049 - Chặng 4, Buổi #29] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Deploy Amazon FSx for Windows File Server configured in Multi-AZ mode and joined to the corporate Microsoft Active Directory domain.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Khi các máy chủ Windows EC2 hoặc máy trạm On-premise cần hệ thống file chia sẻ hỗ trợ giao thức SMB thuần túy, phân quyền NTFS ACL, tích hợp Microsoft Active Directory và DFS Namespaces, đáp án chuẩn là Amazon FSx for Windows File Server.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s29",
      "Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ)"
    ]
  },
  {
    "id": "x-p4-050",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      8,
      30
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p4-050, Phase 4 Session 30) focusing on AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p4-050 - Chặng 4, Buổi #30] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Install an AWS DataSync agent on premises and configure a scheduled transfer task with bandwidth throttling to replicate files and POSIX metadata to Amazon EFS.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "AWS DataSync là công cụ di chuyển dữ liệu qua mạng (Internet/DX/VPN) tự động tốc độ cao (nhanh gấp 10 lần công cụ mã nguồn mở), giữ nguyên toàn bộ quyền file metadata (POSIX/SMB permissions), tự động kiểm tra toàn vẹn dữ liệu và cho phép giới hạn băng thông (bandwidth throttling) theo giờ hành chính.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-4",
      "s30",
      "AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling)"
    ]
  },
  {
    "id": "x-p4-051",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      31
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p4-051, Phase 4 Session 31) focusing on SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p4-051 - Chặng 4, Buổi #31] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure a Dead-Letter Queue (DLQ) with a redrive policy setting maxReceiveCount to 3 so poison-pill messages are isolated for debugging."
    ],
    "correctIdx": 3,
    "explanation": "Dead-Letter Queue (DLQ) giúp tách riêng các tin nhắn bị lỗi lặp đi lặp lại vượt ngưỡng maxReceiveCount để không làm nghẽn hàng đợi chính (lưu ý DLQ của hàng đợi FIFO cũng phải là FIFO). Với tin nhắn vượt giới hạn kích thước tối đa của SQS (nay là 1 MiB, trước đây 256 KB), dùng SQS Extended Client Library lưu file thực trên S3 và chỉ gửi con trỏ qua SQS.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-4",
      "s31",
      "SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads"
    ]
  },
  {
    "id": "x-p4-052",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      14,
      32
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p4-052, Phase 4 Session 32) focusing on Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p4-052 - Chặng 4, Buổi #32] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Publish order events to a single Amazon SNS topic and subscribe multiple independent Amazon SQS queues (one per downstream service) using the Fan-Out pattern.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Khi 1 sự kiện đầu vào (như Đặt hàng thành công hoặc S3 Upload) cần kích hoạt ĐỒNG THỜI nhiều dịch vụ độc lập (Kho vận, Hóa đơn, Phân tích gian lận) mà vẫn đảm bảo lưu đệm chống mất tin khi một dịch vụ bị sập, mô hình kinh điển luôn là SNS + SQS Fan-Out.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-4",
      "s32",
      "Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss"
    ]
  },
  {
    "id": "x-p5-001",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      37
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-001, Phase 5 Session 37) focusing on VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-001 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Create a subnet with a /26 CIDR block (64 total IPv4 addresses minus 5 addresses reserved by AWS = 59 usable IP addresses).",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Mỗi VPC CIDR block có kích thước từ /16 (65,536 IP) đến /28 (16 IP). Trong MỌI Subnet trên AWS, AWS luôn giữ lại 5 địa chỉ IP đầu/cuối không cho gắn vào EC2 (ví dụ dải 10.0.0.0/24: .0 là Network, .1 là VPC Router, .2 là AWS DNS, .3 dự phòng tương lai, .255 là Broadcast).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s37",
      "VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet"
    ]
  },
  {
    "id": "x-p5-002",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      4,
      38
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-002, Phase 5 Session 38) focusing on SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-002 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create three Interface VPC Endpoints for Systems Manager (ssm, ec2messages, and ssmmessages) inside the VPC and allow outbound HTTPS port 443.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "Khi máy EC2 nằm trong Private Subnet hoàn toàn cô lập (không có NAT Gateway hay Internet), để SSM Session Manager hoạt động được, bắt buộc phải tạo các Interface VPC Endpoints (`com.amazonaws.region.ssm`, `ec2messages`, `ssmmessages`) và mở cổng HTTPS 443 giữa EC2 với Endpoint.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s38",
      "SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet"
    ]
  },
  {
    "id": "x-p5-003",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      39
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-003, Phase 5 Session 39) focusing on Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-003 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Replace the self-managed NAT instance with a managed AWS NAT Gateway, which scales automatically up to 100 Gbps without requiring source/destination check changes.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "NAT Gateway do AWS quản lý hoàn toàn, băng thông tự giãn tới 100 Gbps, không cần tắt Source/Destination check hay tự vá lỗi OS như NAT Instance cũ.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s39",
      "Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance"
    ]
  },
  {
    "id": "x-p5-004",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      10,
      40
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-004, Phase 5 Session 40) focusing on Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-004 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Add an outbound rule on the custom Network ACL allowing TCP traffic on ephemeral ports 1024-65535 to 0.0.0.0/0 and an inbound rule allowing ephemeral ports for outbound-initiated connections."
    ],
    "correctIdx": 3,
    "explanation": "Vì Network ACL (NACL) là Stateless (Không lưu trạng thái), mọi chiều đi và về đều bị xét duyệt độc lập. Nếu mở cổng 80/443 Inbound trên NACL cho người dùng vào web, bắt buộc phải mở cổng Ephemeral Ports (1024–65535) ở chiều Outbound để gói tin phản hồi đi ra được!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-5",
      "s40",
      "Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535)"
    ]
  },
  {
    "id": "x-p5-005",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      41
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-005, Phase 5 Session 41) focusing on VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-005 - Chặng 5, Buổi #41] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create an Interface VPC Endpoint (AWS PrivateLink) for Amazon SQS and enable Private DNS so applications connect using standard service endpoints over private IPs.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Gateway Endpoint chỉ hỗ trợ đúng 2 dịch vụ là S3 và DynamoDB. Đối với tất cả các dịch vụ AWS khác (SQS, SNS, KMS, Secrets Manager, CloudWatch, ECR, SSM...) hoặc dịch vụ của đối tác bên thứ 3 muốn kết nối riêng tư qua IP nội bộ, phải dùng Interface VPC Endpoint (AWS PrivateLink, tạo card mạng ENI trong Subnet).",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s41",
      "VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM)"
    ]
  },
  {
    "id": "x-p5-006",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      16,
      42
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is modernizing its cloud infrastructure for production case x-p5-006. A company has 12 branch offices connected via Site-to-Site VPN to a single Virtual Private Gateway, remote employees working from laptops, and a hybrid environment requiring bidirectional DNS resolution between on-premises servers and Route 53 Private Hosted Zones. Which combination of AWS VPN CloudHub, AWS Client VPN, and Route 53 Resolver Inbound and Outbound Endpoints should the architect deploy? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p5-006] Công ty có 12 chi nhánh nối VPN vào chung 1 VGW, nhân viên làm việc từ xa bằng laptop, và cần phân giải DNS hai chiều giữa máy chủ On-premise với Route 53 Private Hosted Zones. Sự kết hợp nào giữa VPN CloudHub, Client VPN và Route 53 Resolver Inbound/Outbound Endpoints đáp ứng đầy đủ yêu cầu? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy AWS VPN CloudHub for branch-to-branch routing, AWS Client VPN for remote laptops, and Route 53 Resolver Inbound and Outbound Endpoints for bidirectional hybrid DNS.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Tổng hợp mạng Hybrid: AWS VPN CloudHub kết nối nhiều chi nhánh văn phòng qua chung 1 VGW; AWS Client VPN cho nhân viên làm việc từ xa bằng laptop (OpenVPN); Route 53 Resolver Inbound Endpoint (cho On-prem hỏi DNS trong VPC) và Outbound Endpoint + Forwarding Rules (cho VPC hỏi DNS dưới On-prem).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s42",
      "AWS VPN CloudHub, AWS Client VPN & Route 53 Resolver Inbound/Outbound Endpoints for Hybrid DNS"
    ]
  },
  {
    "id": "x-p5-007",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      43
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-007, Phase 5 Session 43) focusing on Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-007 - Chặng 5, Buổi #43] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Create an Egress-Only Internet Gateway in the VPC and add a ::/0 route in the private subnet route table pointing to the Egress-Only Internet Gateway.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Mọi địa chỉ IPv6 trên AWS đều là Public Unicast (không có khái niệm NAT cho IPv6). Để máy EC2 dùng IPv6 trong Private Subnet đi ra ngoài Internet tải bản vá nhưng chặn tuyệt đối kết nối từ Internet chủ động đi vào, ta dùng Egress-Only Internet Gateway (NAT Gateway chỉ dành cho IPv4).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s43",
      "Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets)"
    ]
  },
  {
    "id": "x-p5-008",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      22,
      37
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-008, Phase 5 Session 37) focusing on Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-008 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Associate the web tier subnet with a custom route table that has a 0.0.0.0/0 route pointing to an Internet Gateway (IGW), while keeping database subnets routed only locally."
    ],
    "correctIdx": 3,
    "explanation": "Định nghĩa duy nhất phân biệt Public Subnet và Private Subnet là: Subnet nào có bảng định tuyến (Route Table) chứa đường đi 0.0.0.0/0 trỏ ra Internet Gateway (IGW) thì đó là Public Subnet; nếu không có đường đi thẳng ra IGW thì đó là Private Subnet.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-5",
      "s37",
      "Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture"
    ]
  },
  {
    "id": "x-p5-009",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      38
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-009, Phase 5 Session 38) focusing on Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-009 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Attach a single Internet Gateway to the VPC, add a 0.0.0.0/0 route in the public subnet route table, and assign public or Elastic IPv4 addresses to the instances.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "Một VPC chỉ gắn được tối đa 1 Internet Gateway (IGW) và 1 IGW chỉ gắn cho 1 VPC. Để máy EC2 trong Public Subnet ra được Internet qua IGW, phải thỏa mãn đủ 3 điều kiện: máy có Public IP/Elastic IP, Route Table có đường 0.0.0.0/0 trỏ ra IGW, và Security Group/NACL cho phép lưu lượng.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s38",
      "Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs)"
    ]
  },
  {
    "id": "x-p5-010",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      28,
      39
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-010, Phase 5 Session 39) focusing on NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-010 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy the Amazon VPC NAT Gateway inside the Public Subnet and update the Private Subnet route table to route 0.0.0.0/0 traffic to the NAT Gateway ID.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Bẫy đề thi kinh điển nhất về VPC: NAT Gateway phục vụ cho các máy ở Private Subnet đi ra ngoài tải bản vá, nhưng bản thân chiếc NAT Gateway BẮT BUỘC phải được đặt nằm trong PUBLIC SUBNET (vì nó cần có Elastic IP và đường đi tiếp ra Internet Gateway)!",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s39",
      "NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets)"
    ]
  },
  {
    "id": "x-p5-011",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      40
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-011, Phase 5 Session 40) focusing on Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-011 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "B. Add a low-numbered explicit DENY inbound rule for the malicious IPv4 CIDR block in the subnet's Network ACL.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Security Group chỉ có rule ALLOW, hoàn toàn không có khả năng chặn (Deny) một địa chỉ IP cụ thể. Khi đề bài yêu cầu chặn đích danh một danh sách IP tấn công ở tầng mạng VPC, phải thêm rule DENY có số thứ tự nhỏ (ví dụ Rule #50) vào Network ACL (hoặc dùng AWS WAF nếu ở tầng 7).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s40",
      "Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups"
    ]
  },
  {
    "id": "x-p5-012",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      34,
      41
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-012, Phase 5 Session 41) focusing on VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-012 - Chặng 5, Buổi #41] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Expose the provider service behind a Network Load Balancer and an AWS PrivateLink Endpoint Service so consumer VPCs can connect despite overlapping IPv4 CIDR blocks.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "VPC Peering KHÔNG có tính bắc cầu (Non-transitive: A nối B, B nối C thì A không thông sang C) và bắt buộc 2 VPC không được trùng dải IP. Nếu hàng chục VPC của khách hàng bị trùng lặp dải IP (overlapping CIDRs) hoặc chỉ muốn mở đúng 1 dịch vụ theo 1 chiều an toàn, giải pháp chuẩn là AWS PrivateLink (NLB + Endpoint Service).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s41",
      "VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs"
    ]
  },
  {
    "id": "x-p5-013",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      42
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-013, Phase 5 Session 42) focusing on AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-013 - Chặng 5, Buổi #42] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Deploy an AWS Transit Gateway as a central hub and attach all VPCs and the Direct Connect Gateway to simplify routing with transitive connectivity."
    ],
    "correctIdx": 3,
    "explanation": "Khi số lượng VPC tăng lên hàng chục/hàng trăm kèm kết nối On-premise, thay vì nối lưới VPC Peering chằng chịt, hãy dùng AWS Transit Gateway theo mô hình Hub-and-Spoke (hỗ trợ định tuyến bắc cầu Transitive routing và hỗ trợ IP Multicast duy nhất trên AWS).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-5",
      "s42",
      "AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect)"
    ]
  },
  {
    "id": "x-p5-014",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      4,
      43
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-014, Phase 5 Session 43) focusing on AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-014 - Chặng 5, Buổi #43] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy AWS Network Firewall in a dedicated inspection subnet using Gateway Load Balancer endpoints to block unauthorized outbound domains and inspect traffic with Suricata rules.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Khi đề bài yêu cầu lọc lưu lượng mạng ra/vào VPC theo tên miền (Outbound Domain Filtering như chỉ cho phép tải từ `*.ubuntu.com`), chặn xâm nhập IPS theo chữ ký Suricata hoặc kiểm tra gói tin sâu tầng 3–7 cho toàn bộ VPC qua Transit Gateway, đáp án chuẩn là AWS Network Firewall.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s43",
      "AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection)"
    ]
  },
  {
    "id": "x-p5-015",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      37
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-015, Phase 5 Session 37) focusing on Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-015 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Associate a non-overlapping secondary IPv4 CIDR block with the existing VPC and create new subnets inside that secondary range.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Khi VPC cạn kiệt địa chỉ IP, ta không thể sửa kích thước CIDR block ban đầu nhưng có thể thêm các Secondary CIDR blocks (tối đa 5 khối IPv4) vào VPC. Luôn thiết kế dải IP không trùng lặp (non-overlapping CIDR) để sau này có thể nối VPC Peering hoặc Transit Gateway.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s37",
      "Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW"
    ]
  },
  {
    "id": "x-p5-016",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      10,
      38
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-016, Phase 5 Session 38) focusing on AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-016 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Install the SSM Agent, attach an IAM role with AmazonSSMManagedInstanceCore to the EC2 instances, and connect via AWS Systems Manager Session Manager.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "Thay vì dựng Bastion Host ở Public Subnet và mở cổng SSH 22 nguy hiểm, giải pháp chuẩn hiện đại là dùng AWS Systems Manager (SSM) Session Manager: không cần mở bất kỳ cổng Inbound nào trên Security Group, không cần SSH key, kết nối qua HTTPS 443 và ghi lại toàn bộ lịch sử gõ lệnh vào S3/CloudWatch Logs.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s38",
      "AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing)"
    ]
  },
  {
    "id": "x-p5-017",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      39
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-017, Phase 5 Session 39) focusing on Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-017 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Deploy one NAT Gateway in a public subnet within each Availability Zone and configure each private subnet's route table to point to the NAT Gateway in its own AZ.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Một chiếc NAT Gateway chỉ có tính sẵn sàng cao trong phạm vi 1 Availability Zone. Để đạt kiến trúc High Availability thực sự và tránh mất kết nối Internet cho toàn hệ thống khi 1 AZ gặp sự cố (đồng thời tránh phí truyền dữ liệu liên AZ), phải tạo 1 NAT Gateway riêng ở mỗi AZ.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s39",
      "Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone)"
    ]
  },
  {
    "id": "x-p5-018",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      16,
      40
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-018, Phase 5 Session 40) focusing on VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-018 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Enable VPC Flow Logs at the VPC or ENI level publishing to CloudWatch Logs or Amazon S3, and use Amazon Athena to query REJECT records."
    ],
    "correctIdx": 3,
    "explanation": "VPC Flow Logs ghi lại thông tin metadata của các gói tin đi qua card mạng ENI. Mẹo chẩn đoán trong đề thi: Nếu gói tin vào bị chặn (REJECT) nhưng chiều ra không có bản ghi nào -> do Security Group hoặc NACL Inbound chặn; nếu thấy Inbound ACCEPT nhưng Outbound bị REJECT -> chắc chắn 100% là do NACL Outbound thiếu cổng Ephemeral!",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-5",
      "s40",
      "VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops)"
    ]
  },
  {
    "id": "x-p5-019",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      41
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-019, Phase 5 Session 41) focusing on VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-019 - Chặng 5, Buổi #41] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create a Gateway VPC Endpoint for Amazon S3 and associate it with the private subnet route tables to eliminate NAT Gateway data processing charges.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Khi các máy EC2 hoặc hàm Lambda trong VPC tải lượng dữ liệu lớn từ/lên Amazon S3 hoặc DynamoDB làm hóa đơn NAT Gateway tăng vọt, giải pháp tối ưu chi phí nhất luôn là tạo Gateway VPC Endpoint: hoàn toàn MIỄN PHÍ theo giờ và miễn phí xử lý dữ liệu (chỉ cần gắn vào Route Table).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s41",
      "VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List)"
    ]
  },
  {
    "id": "x-p5-020",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      22,
      42
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-020, Phase 5 Session 42) focusing on AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-020 - Chặng 5, Buổi #42] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision a backup AWS Site-to-Site VPN connection over the same Direct Connect Gateway (or use two Direct Connect connections at different locations) for automatic BGP failover.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Đường cáp quang vật lý AWS Direct Connect (DX) mang lại băng thông cao ổn định nhưng mất vài tuần lắp đặt và KHÔNG mã hóa mặc định (muốn mã hóa phải bọc IPSec VPN hoặc dùng MACsec). Để dự phòng HA với chi phí tối ưu nhất khi chỉ có 1 đường DX, ta cấu hình thêm 1 đường Site-to-Site VPN làm nhánh Backup tự động chuyển mạch qua BGP.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s42",
      "AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup"
    ]
  },
  {
    "id": "x-p5-021",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      43
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-021, Phase 5 Session 43) focusing on VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-021 - Chặng 5, Buổi #43] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Configure Amazon VPC Traffic Mirroring on the Elastic Network Interfaces of the production instances to copy raw network packets to an inspection appliance behind a Network Load Balancer.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Khi đội bảo mật cần bắt toàn bộ nội dung gói tin thô (raw network packets, khác với VPC Flow Logs chỉ có metadata) từ card mạng ENI gửi sang máy chủ phân tích IDS/IPS mà không làm chậm ứng dụng, dùng VPC Traffic Mirroring.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s43",
      "VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis"
    ]
  },
  {
    "id": "x-p5-022",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      28,
      37
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-022, Phase 5 Session 37) focusing on VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-022 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Create a subnet with a /26 CIDR block (64 total IPv4 addresses minus 5 addresses reserved by AWS = 59 usable IP addresses)."
    ],
    "correctIdx": 3,
    "explanation": "Mỗi VPC CIDR block có kích thước từ /16 (65,536 IP) đến /28 (16 IP). Trong MỌI Subnet trên AWS, AWS luôn giữ lại 5 địa chỉ IP đầu/cuối không cho gắn vào EC2 (ví dụ dải 10.0.0.0/24: .0 là Network, .1 là VPC Router, .2 là AWS DNS, .3 dự phòng tương lai, .255 là Broadcast).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-5",
      "s37",
      "VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet"
    ]
  },
  {
    "id": "x-p5-023",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      38
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-023, Phase 5 Session 38) focusing on SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-023 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create three Interface VPC Endpoints for Systems Manager (ssm, ec2messages, and ssmmessages) inside the VPC and allow outbound HTTPS port 443.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "Khi máy EC2 nằm trong Private Subnet hoàn toàn cô lập (không có NAT Gateway hay Internet), để SSM Session Manager hoạt động được, bắt buộc phải tạo các Interface VPC Endpoints (`com.amazonaws.region.ssm`, `ec2messages`, `ssmmessages`) và mở cổng HTTPS 443 giữa EC2 với Endpoint.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-5",
      "s38",
      "SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet"
    ]
  },
  {
    "id": "x-p5-024",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      34,
      39
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-024, Phase 5 Session 39) focusing on Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-024 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Replace the self-managed NAT instance with a managed AWS NAT Gateway, which scales automatically up to 100 Gbps without requiring source/destination check changes.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "NAT Gateway do AWS quản lý hoàn toàn, băng thông tự giãn tới 100 Gbps, không cần tắt Source/Destination check hay tự vá lỗi OS như NAT Instance cũ.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s39",
      "Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance"
    ]
  },
  {
    "id": "x-p5-025",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      40
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-025, Phase 5 Session 40) focusing on Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-025 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Add an outbound rule on the custom Network ACL allowing TCP traffic on ephemeral ports 1024-65535 to 0.0.0.0/0 and an inbound rule allowing ephemeral ports for outbound-initiated connections.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Vì Network ACL (NACL) là Stateless (Không lưu trạng thái), mọi chiều đi và về đều bị xét duyệt độc lập. Nếu mở cổng 80/443 Inbound trên NACL cho người dùng vào web, bắt buộc phải mở cổng Ephemeral Ports (1024–65535) ở chiều Outbound để gói tin phản hồi đi ra được!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s40",
      "Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535)"
    ]
  },
  {
    "id": "x-p5-026",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      4,
      41
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-026, Phase 5 Session 41) focusing on VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-026 - Chặng 5, Buổi #41] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Create an Interface VPC Endpoint (AWS PrivateLink) for Amazon SQS and enable Private DNS so applications connect using standard service endpoints over private IPs.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Gateway Endpoint chỉ hỗ trợ đúng 2 dịch vụ là S3 và DynamoDB. Đối với tất cả các dịch vụ AWS khác (SQS, SNS, KMS, Secrets Manager, CloudWatch, ECR, SSM...) hoặc dịch vụ của đối tác bên thứ 3 muốn kết nối riêng tư qua IP nội bộ, phải dùng Interface VPC Endpoint (AWS PrivateLink, tạo card mạng ENI trong Subnet).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s41",
      "VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM)"
    ]
  },
  {
    "id": "x-p5-027",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      42
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is modernizing its cloud infrastructure for production case x-p5-027. A company has 12 branch offices connected via Site-to-Site VPN to a single Virtual Private Gateway, remote employees working from laptops, and a hybrid environment requiring bidirectional DNS resolution between on-premises servers and Route 53 Private Hosted Zones. Which combination of AWS VPN CloudHub, AWS Client VPN, and Route 53 Resolver Inbound and Outbound Endpoints should the architect deploy? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p5-027] Công ty có 12 chi nhánh nối VPN vào chung 1 VGW, nhân viên làm việc từ xa bằng laptop, và cần phân giải DNS hai chiều giữa máy chủ On-premise với Route 53 Private Hosted Zones. Sự kết hợp nào giữa VPN CloudHub, Client VPN và Route 53 Resolver Inbound/Outbound Endpoints đáp ứng đầy đủ yêu cầu? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Deploy AWS VPN CloudHub for branch-to-branch routing, AWS Client VPN for remote laptops, and Route 53 Resolver Inbound and Outbound Endpoints for bidirectional hybrid DNS."
    ],
    "correctIdx": 3,
    "explanation": "Tổng hợp mạng Hybrid: AWS VPN CloudHub kết nối nhiều chi nhánh văn phòng qua chung 1 VGW; AWS Client VPN cho nhân viên làm việc từ xa bằng laptop (OpenVPN); Route 53 Resolver Inbound Endpoint (cho On-prem hỏi DNS trong VPC) và Outbound Endpoint + Forwarding Rules (cho VPC hỏi DNS dưới On-prem).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-5",
      "s42",
      "AWS VPN CloudHub, AWS Client VPN & Route 53 Resolver Inbound/Outbound Endpoints for Hybrid DNS"
    ]
  },
  {
    "id": "x-p5-028",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      10,
      43
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-028, Phase 5 Session 43) focusing on Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-028 - Chặng 5, Buổi #43] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create an Egress-Only Internet Gateway in the VPC and add a ::/0 route in the private subnet route table pointing to the Egress-Only Internet Gateway.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Mọi địa chỉ IPv6 trên AWS đều là Public Unicast (không có khái niệm NAT cho IPv6). Để máy EC2 dùng IPv6 trong Private Subnet đi ra ngoài Internet tải bản vá nhưng chặn tuyệt đối kết nối từ Internet chủ động đi vào, ta dùng Egress-Only Internet Gateway (NAT Gateway chỉ dành cho IPv4).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s43",
      "Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets)"
    ]
  },
  {
    "id": "x-p5-029",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      37
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-029, Phase 5 Session 37) focusing on Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-029 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Associate the web tier subnet with a custom route table that has a 0.0.0.0/0 route pointing to an Internet Gateway (IGW), while keeping database subnets routed only locally.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Định nghĩa duy nhất phân biệt Public Subnet và Private Subnet là: Subnet nào có bảng định tuyến (Route Table) chứa đường đi 0.0.0.0/0 trỏ ra Internet Gateway (IGW) thì đó là Public Subnet; nếu không có đường đi thẳng ra IGW thì đó là Private Subnet.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s37",
      "Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture"
    ]
  },
  {
    "id": "x-p5-030",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      16,
      38
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-030, Phase 5 Session 38) focusing on Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-030 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Attach a single Internet Gateway to the VPC, add a 0.0.0.0/0 route in the public subnet route table, and assign public or Elastic IPv4 addresses to the instances.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "Một VPC chỉ gắn được tối đa 1 Internet Gateway (IGW) và 1 IGW chỉ gắn cho 1 VPC. Để máy EC2 trong Public Subnet ra được Internet qua IGW, phải thỏa mãn đủ 3 điều kiện: máy có Public IP/Elastic IP, Route Table có đường 0.0.0.0/0 trỏ ra IGW, và Security Group/NACL cho phép lưu lượng.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-5",
      "s38",
      "Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs)"
    ]
  },
  {
    "id": "x-p5-031",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      39
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-031, Phase 5 Session 39) focusing on NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-031 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Deploy the Amazon VPC NAT Gateway inside the Public Subnet and update the Private Subnet route table to route 0.0.0.0/0 traffic to the NAT Gateway ID.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Bẫy đề thi kinh điển nhất về VPC: NAT Gateway phục vụ cho các máy ở Private Subnet đi ra ngoài tải bản vá, nhưng bản thân chiếc NAT Gateway BẮT BUỘC phải được đặt nằm trong PUBLIC SUBNET (vì nó cần có Elastic IP và đường đi tiếp ra Internet Gateway)!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s39",
      "NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets)"
    ]
  },
  {
    "id": "x-p5-032",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      22,
      40
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-032, Phase 5 Session 40) focusing on Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-032 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Add a low-numbered explicit DENY inbound rule for the malicious IPv4 CIDR block in the subnet's Network ACL."
    ],
    "correctIdx": 3,
    "explanation": "Security Group chỉ có rule ALLOW, hoàn toàn không có khả năng chặn (Deny) một địa chỉ IP cụ thể. Khi đề bài yêu cầu chặn đích danh một danh sách IP tấn công ở tầng mạng VPC, phải thêm rule DENY có số thứ tự nhỏ (ví dụ Rule #50) vào Network ACL (hoặc dùng AWS WAF nếu ở tầng 7).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-5",
      "s40",
      "Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups"
    ]
  },
  {
    "id": "x-p5-033",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      41
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-033, Phase 5 Session 41) focusing on VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-033 - Chặng 5, Buổi #41] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Expose the provider service behind a Network Load Balancer and an AWS PrivateLink Endpoint Service so consumer VPCs can connect despite overlapping IPv4 CIDR blocks.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "VPC Peering KHÔNG có tính bắc cầu (Non-transitive: A nối B, B nối C thì A không thông sang C) và bắt buộc 2 VPC không được trùng dải IP. Nếu hàng chục VPC của khách hàng bị trùng lặp dải IP (overlapping CIDRs) hoặc chỉ muốn mở đúng 1 dịch vụ theo 1 chiều an toàn, giải pháp chuẩn là AWS PrivateLink (NLB + Endpoint Service).",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s41",
      "VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs"
    ]
  },
  {
    "id": "x-p5-034",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      28,
      42
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-034, Phase 5 Session 42) focusing on AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-034 - Chặng 5, Buổi #42] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Deploy an AWS Transit Gateway as a central hub and attach all VPCs and the Direct Connect Gateway to simplify routing with transitive connectivity.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Khi số lượng VPC tăng lên hàng chục/hàng trăm kèm kết nối On-premise, thay vì nối lưới VPC Peering chằng chịt, hãy dùng AWS Transit Gateway theo mô hình Hub-and-Spoke (hỗ trợ định tuyến bắc cầu Transitive routing và hỗ trợ IP Multicast duy nhất trên AWS).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s42",
      "AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect)"
    ]
  },
  {
    "id": "x-p5-035",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      43
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-035, Phase 5 Session 43) focusing on AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-035 - Chặng 5, Buổi #43] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Deploy AWS Network Firewall in a dedicated inspection subnet using Gateway Load Balancer endpoints to block unauthorized outbound domains and inspect traffic with Suricata rules.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "Khi đề bài yêu cầu lọc lưu lượng mạng ra/vào VPC theo tên miền (Outbound Domain Filtering như chỉ cho phép tải từ `*.ubuntu.com`), chặn xâm nhập IPS theo chữ ký Suricata hoặc kiểm tra gói tin sâu tầng 3–7 cho toàn bộ VPC qua Transit Gateway, đáp án chuẩn là AWS Network Firewall.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s43",
      "AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection)"
    ]
  },
  {
    "id": "x-p5-036",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      34,
      37
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-036, Phase 5 Session 37) focusing on Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-036 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Associate a non-overlapping secondary IPv4 CIDR block with the existing VPC and create new subnets inside that secondary range."
    ],
    "correctIdx": 3,
    "explanation": "Khi VPC cạn kiệt địa chỉ IP, ta không thể sửa kích thước CIDR block ban đầu nhưng có thể thêm các Secondary CIDR blocks (tối đa 5 khối IPv4) vào VPC. Luôn thiết kế dải IP không trùng lặp (non-overlapping CIDR) để sau này có thể nối VPC Peering hoặc Transit Gateway.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-5",
      "s37",
      "Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW"
    ]
  },
  {
    "id": "x-p5-037",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      38
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-037, Phase 5 Session 38) focusing on AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-037 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Install the SSM Agent, attach an IAM role with AmazonSSMManagedInstanceCore to the EC2 instances, and connect via AWS Systems Manager Session Manager.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Thay vì dựng Bastion Host ở Public Subnet và mở cổng SSH 22 nguy hiểm, giải pháp chuẩn hiện đại là dùng AWS Systems Manager (SSM) Session Manager: không cần mở bất kỳ cổng Inbound nào trên Security Group, không cần SSH key, kết nối qua HTTPS 443 và ghi lại toàn bộ lịch sử gõ lệnh vào S3/CloudWatch Logs.",
    "whyWrong": [
      null,
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s38",
      "AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing)"
    ]
  },
  {
    "id": "x-p5-038",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      4,
      39
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-038, Phase 5 Session 39) focusing on Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-038 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy one NAT Gateway in a public subnet within each Availability Zone and configure each private subnet's route table to point to the NAT Gateway in its own AZ.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Một chiếc NAT Gateway chỉ có tính sẵn sàng cao trong phạm vi 1 Availability Zone. Để đạt kiến trúc High Availability thực sự và tránh mất kết nối Internet cho toàn hệ thống khi 1 AZ gặp sự cố (đồng thời tránh phí truyền dữ liệu liên AZ), phải tạo 1 NAT Gateway riêng ở mỗi AZ.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s39",
      "Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone)"
    ]
  },
  {
    "id": "x-p5-039",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      40
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-039, Phase 5 Session 40) focusing on VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-039 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable VPC Flow Logs at the VPC or ENI level publishing to CloudWatch Logs or Amazon S3, and use Amazon Athena to query REJECT records.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "VPC Flow Logs ghi lại thông tin metadata của các gói tin đi qua card mạng ENI. Mẹo chẩn đoán trong đề thi: Nếu gói tin vào bị chặn (REJECT) nhưng chiều ra không có bản ghi nào -> do Security Group hoặc NACL Inbound chặn; nếu thấy Inbound ACCEPT nhưng Outbound bị REJECT -> chắc chắn 100% là do NACL Outbound thiếu cổng Ephemeral!",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s40",
      "VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops)"
    ]
  },
  {
    "id": "x-p5-040",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      10,
      41
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-040, Phase 5 Session 41) focusing on VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p5-040 - Chặng 5, Buổi #41] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Create a Gateway VPC Endpoint for Amazon S3 and associate it with the private subnet route tables to eliminate NAT Gateway data processing charges.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Khi các máy EC2 hoặc hàm Lambda trong VPC tải lượng dữ liệu lớn từ/lên Amazon S3 hoặc DynamoDB làm hóa đơn NAT Gateway tăng vọt, giải pháp tối ưu chi phí nhất luôn là tạo Gateway VPC Endpoint: hoàn toàn MIỄN PHÍ theo giờ và miễn phí xử lý dữ liệu (chỉ cần gắn vào Route Table).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s41",
      "VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List)"
    ]
  },
  {
    "id": "x-p5-041",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      42
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-041, Phase 5 Session 42) focusing on AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-041 - Chặng 5, Buổi #42] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Provision a backup AWS Site-to-Site VPN connection over the same Direct Connect Gateway (or use two Direct Connect connections at different locations) for automatic BGP failover."
    ],
    "correctIdx": 3,
    "explanation": "Đường cáp quang vật lý AWS Direct Connect (DX) mang lại băng thông cao ổn định nhưng mất vài tuần lắp đặt và KHÔNG mã hóa mặc định (muốn mã hóa phải bọc IPSec VPN hoặc dùng MACsec). Để dự phòng HA với chi phí tối ưu nhất khi chỉ có 1 đường DX, ta cấu hình thêm 1 đường Site-to-Site VPN làm nhánh Backup tự động chuyển mạch qua BGP.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-5",
      "s42",
      "AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup"
    ]
  },
  {
    "id": "x-p5-042",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      16,
      43
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p5-042, Phase 5 Session 43) focusing on VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-042 - Chặng 5, Buổi #43] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure Amazon VPC Traffic Mirroring on the Elastic Network Interfaces of the production instances to copy raw network packets to an inspection appliance behind a Network Load Balancer.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Khi đội bảo mật cần bắt toàn bộ nội dung gói tin thô (raw network packets, khác với VPC Flow Logs chỉ có metadata) từ card mạng ENI gửi sang máy chủ phân tích IDS/IPS mà không làm chậm ứng dụng, dùng VPC Traffic Mirroring.",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s43",
      "VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis"
    ]
  },
  {
    "id": "x-p5-043",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      37
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p5-043, Phase 5 Session 37) focusing on VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p5-043 - Chặng 5, Buổi #37] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Create a subnet with a /26 CIDR block (64 total IPv4 addresses minus 5 addresses reserved by AWS = 59 usable IP addresses).",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Mỗi VPC CIDR block có kích thước từ /16 (65,536 IP) đến /28 (16 IP). Trong MỌI Subnet trên AWS, AWS luôn giữ lại 5 địa chỉ IP đầu/cuối không cho gắn vào EC2 (ví dụ dải 10.0.0.0/24: .0 là Network, .1 là VPC Router, .2 là AWS DNS, .3 dự phòng tương lai, .255 là Broadcast).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-5",
      "s37",
      "VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet"
    ]
  },
  {
    "id": "x-p5-044",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      22,
      38
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p5-044, Phase 5 Session 38) focusing on SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p5-044 - Chặng 5, Buổi #38] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create three Interface VPC Endpoints for Systems Manager (ssm, ec2messages, and ssmmessages) inside the VPC and allow outbound HTTPS port 443.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "Khi máy EC2 nằm trong Private Subnet hoàn toàn cô lập (không có NAT Gateway hay Internet), để SSM Session Manager hoạt động được, bắt buộc phải tạo các Interface VPC Endpoints (`com.amazonaws.region.ssm`, `ec2messages`, `ssmmessages`) và mở cổng HTTPS 443 giữa EC2 với Endpoint.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-5",
      "s38",
      "SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet"
    ]
  },
  {
    "id": "x-p5-045",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      39
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p5-045, Phase 5 Session 39) focusing on Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p5-045 - Chặng 5, Buổi #39] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Replace the self-managed NAT instance with a managed AWS NAT Gateway, which scales automatically up to 100 Gbps without requiring source/destination check changes.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "NAT Gateway do AWS quản lý hoàn toàn, băng thông tự giãn tới 100 Gbps, không cần tắt Source/Destination check hay tự vá lỗi OS như NAT Instance cũ.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-5",
      "s39",
      "Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance"
    ]
  },
  {
    "id": "x-p5-046",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      28,
      40
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p5-046, Phase 5 Session 40) focusing on Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p5-046 - Chặng 5, Buổi #40] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Add an outbound rule on the custom Network ACL allowing TCP traffic on ephemeral ports 1024-65535 to 0.0.0.0/0 and an inbound rule allowing ephemeral ports for outbound-initiated connections."
    ],
    "correctIdx": 3,
    "explanation": "Vì Network ACL (NACL) là Stateless (Không lưu trạng thái), mọi chiều đi và về đều bị xét duyệt độc lập. Nếu mở cổng 80/443 Inbound trên NACL cho người dùng vào web, bắt buộc phải mở cổng Ephemeral Ports (1024–65535) ở chiều Outbound để gói tin phản hồi đi ra được!",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-5",
      "s40",
      "Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535)"
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
