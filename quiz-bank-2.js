// quiz-bank-2.js — Ngân hàng câu hỏi bài học (pool: "lesson") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = {
  "20": [
    {
      "id": "s20-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        20
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling) (Session 20, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling) (Buổi #20, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Enable Amazon RDS Multi-AZ deployment, which maintains a synchronous standby replica in another Availability Zone with automatic DNS failover.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "RDS Multi-AZ dùng cơ chế nhân bản ĐỒNG BỘ (Synchronous) nhằm mục đích duy nhất là High Availability / Disaster Recovery (tự động Failover đổi bản ghi DNS trong 60–120s, ứng dụng không đọc được từ máy Standby DB Instance). Ngược lại, Read Replica nhân bản BẤT ĐỒNG BỘ (Asynchronous) để giảm tải đọc (Read scaling).",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s20",
        "Amazon RDS Multi-AZ (Synchronous HA/Failover) vs RDS Read Replicas (Asynchronous Read Scaling)"
      ]
    },
    {
      "id": "s20-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        20
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on RDS Multi-AZ DB Cluster (1 Writer + 2 Readable Standbys) for Lower Write Latency & Read Capacity (Session 20, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến RDS Multi-AZ DB Cluster (1 Writer + 2 Readable Standbys) for Lower Write Latency & Read Capacity (Buổi #20, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy an Amazon RDS Multi-AZ DB Cluster with one writer instance and two readable standby instances across three Availability Zones."
      ],
      "correctIdx": 3,
      "explanation": "Khác với RDS Multi-AZ DB Instance truyền thống (1 Standby không cho đọc), chế độ RDS Multi-AZ DB Cluster có 1 Writer + 2 Standby ở 3 AZ cho phép ĐỌC trực tiếp từ 2 máy Standby và giảm thời gian failover xuống ~35 giây.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s20",
        "RDS Multi-AZ DB Cluster (1 Writer + 2 Readable Standbys) for Lower Write Latency & Read Capacity"
      ]
    },
    {
      "id": "s20-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        20
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on RDS Cross-Region Read Replicas & Promoting a Replica for Disaster Recovery (Session 20, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến RDS Cross-Region Read Replicas & Promoting a Replica for Disaster Recovery (Buổi #20, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Create a Cross-Region Read Replica in the secondary Region and promote it to a standalone read/write DB instance during a Regional outage.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Read Replica có thể tạo trong cùng Region (miễn phí truyền dữ liệu nội bộ của RDS) hoặc khác Region (Cross-Region Read Replica, tốn phí truyền dữ liệu liên vùng) và có thể được Promote thành DB độc lập để chịu cả đọc lẫn ghi khi Region chính gặp thảm họa.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s20",
        "RDS Cross-Region Read Replicas & Promoting a Replica for Disaster Recovery"
      ]
    }
  ],
  "21": [
    {
      "id": "s21-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        21
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon RDS Proxy for Lambda Connection Pooling & 66% Faster Failover (Session 21, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon RDS Proxy for Lambda Connection Pooling & 66% Faster Failover (Buổi #21, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Deploy Amazon RDS Proxy between the AWS Lambda functions and the RDS database to pool and share database connections and enforce IAM authentication.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Khi hàng nghìn hàm AWS Lambda bật lên đồng thời sẽ làm tràn số lượng kết nối (Too many connections) của RDS/Aurora. Đặt Amazon RDS Proxy ở giữa giúp gom và tái sử dụng kết nối (Connection Pooling), giảm tới 66% thời gian chờ khi DB failover và hỗ trợ xác thực IAM + Secrets Manager.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s21",
        "Amazon RDS Proxy for Lambda Connection Pooling & 66% Faster Failover"
      ]
    },
    {
      "id": "s21-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        21
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database) (Session 21, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database) (Buổi #21, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Migrate to Amazon Aurora Global Database, which replicates storage across Regions in under 1 second and supports recovery in under 1 minute."
      ],
      "correctIdx": 3,
      "explanation": "Amazon Aurora tự động lưu 6 bản sao dữ liệu trải đều trên 3 AZ (cần 4/6 bản để ghi, 3/6 bản để đọc), hỗ trợ tối đa 15 Read Replicas tự động co giãn. Aurora Global Database nhân bản ở tầng lưu trữ sang tối đa 10 Region phụ với độ trễ < 1 giây (RPO ~1s, RTO < 1 phút).",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s21",
        "Amazon Aurora Architecture (6 Copies Across 3 AZs, 15 Read Replicas, Reader Endpoint, Global Database)"
      ]
    },
    {
      "id": "s21-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        21
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Aurora Serverless v2 vs RDS Custom for Oracle/SQL Server OS-Level Access (Session 21, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Aurora Serverless v2 vs RDS Custom for Oracle/SQL Server OS-Level Access (Buổi #21, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Migrate the legacy application to Amazon RDS Custom for Oracle, which grants administrative SSH/SSM access to the underlying OS and database environment.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Khi ứng dụng thương mại cũ (Oracle hoặc Microsoft SQL Server) bắt buộc phải truy cập quyền Admin vào hệ điều hành (SSH/RDP) để cài agent/patch riêng mà vẫn muốn tự động hóa sao lưu và Multi-AZ của RDS, đáp án duy nhất là Amazon RDS Custom.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s21",
        "Amazon Aurora Serverless v2 vs RDS Custom for Oracle/SQL Server OS-Level Access"
      ]
    }
  ],
  "22": [
    {
      "id": "s22-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        22
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ElastiCache for Redis (Valkey) vs ElastiCache for Memcached (Persistence, Multi-AZ, Sorted Sets, HIPAA) (Session 22, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ElastiCache for Redis (Valkey) vs ElastiCache for Memcached (Persistence, Multi-AZ, Sorted Sets, HIPAA) (Buổi #22, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Deploy Amazon ElastiCache for Redis (or Valkey) with Multi-AZ and Auto-Failover enabled, and use Redis Sorted Sets to power the real-time leaderboard.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "ElastiCache for Redis (nay có thêm Valkey) hỗ trợ Multi-AZ kèm Auto-Failover, sao lưu/khôi phục AOF persistence, Read Replicas, chuẩn tuân thủ HIPAA, Pub/Sub và cấu trúc dữ liệu Sorted Sets (tạo bảng xếp hạng Leaderboard game cực nhanh). Memcached chỉ là cache đa luồng thuần túy trên RAM, không có Multi-AZ failover hay lưu đĩa.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s22",
        "ElastiCache for Redis (Valkey) vs ElastiCache for Memcached (Persistence, Multi-AZ, Sorted Sets, HIPAA)"
      ]
    },
    {
      "id": "s22-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        22
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Caching Strategies: Lazy Loading (Cache-Aside) vs Write-Through vs Session Store (Session 22, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Caching Strategies: Lazy Loading (Cache-Aside) vs Write-Through vs Session Store (Buổi #22, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Combine Lazy Loading with a Write-Through strategy and configure an appropriate Time-to-Live (TTL) on each cached key to prevent stale data."
      ],
      "correctIdx": 3,
      "explanation": "Lazy Loading (Cache-Aside) chỉ nạp dữ liệu vào cache khi có Cache Miss (tránh đầy RAM nhưng lần đọc đầu bị trễ và dữ liệu dễ cũ). Write-Through ghi đồng thời vào cả DB và Cache (dữ liệu luôn mới nhưng tốn tài nguyên ghi). Kết hợp cả hai kèm TTL là thiết kế tối ưu nhất.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s22",
        "Caching Strategies: Lazy Loading (Cache-Aside) vs Write-Through vs Session Store"
      ]
    },
    {
      "id": "s22-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        22
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception (Session 22, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception (Buổi #22, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Enable in-transit TLS encryption and Redis AUTH (or IAM authentication for Redis 7+) while placing the ElastiCache cluster inside a private subnet.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "ElastiCache hỗ trợ mã hóa khi lưu trữ (At-rest KMS), mã hóa trên đường truyền (In-transit TLS) và xác thực bằng Redis AUTH Token hoặc IAM Authentication. Bẫy đề thi: ElastiCache KHÔNG tích hợp trực tiếp với Amazon Cognito.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s22",
        "ElastiCache Redis Auth Token & IAM Authentication vs Cognito Direct Misconception"
      ]
    }
  ],
  "23": [
    {
      "id": "s23-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        23
      ],
      "difficulty": "easy",
      "qEn": "A retail application uses an Amazon DynamoDB table in Provisioned capacity mode and performs 100 strongly consistent reads per second of 6 KB items and 40 standard writes per second of 2.4 KB items. How many Read Capacity Units (RCU, 4 KB unit) and Write Capacity Units (WCU, 1 KB unit) must the architect provision?",
      "qVi": "Ứng dụng bán lẻ dùng bảng DynamoDB ở chế độ Provisioned thực hiện 100 lượt đọc Strongly Consistent/giây với item 6 KB và 40 lượt ghi chuẩn/giây với item 2.4 KB. Cần cấp phát bao nhiêu RCU (đơn vị 4 KB) và WCU (đơn vị 1 KB)?",
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
        "s23",
        "DynamoDB RCU (4 KB) and WCU (1 KB) Provisioned Capacity Calculation"
      ]
    },
    {
      "id": "s23-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        23
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on DynamoDB On-Demand vs Provisioned Capacity with Auto Scaling (Session 23, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến DynamoDB On-Demand vs Provisioned Capacity with Auto Scaling (Buổi #23, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Configure the Amazon DynamoDB table to use On-Demand capacity mode so it scales instantly to handle unpredictable spiky traffic on a pay-per-request basis."
      ],
      "correctIdx": 3,
      "explanation": "Khi lưu lượng truy cập mới ra mắt chưa biết trước (unpredictable), biến thiên đột ngột (spiky traffic) hoặc rảnh rỗi phần lớn thời gian, dùng DynamoDB On-Demand giúp tự động co giãn tức thì và trả tiền theo từng request, tránh lỗi ProvisionedThroughputExceededException.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s23",
        "DynamoDB On-Demand vs Provisioned Capacity with Auto Scaling"
      ]
    },
    {
      "id": "s23-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.3",
      "sessionIds": [
        23
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on DynamoDB Accelerator (DAX) for Microsecond Read Latency vs ElastiCache (Session 23, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến DynamoDB Accelerator (DAX) for Microsecond Read Latency vs ElastiCache (Buổi #23, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy Amazon DynamoDB Accelerator (DAX) in front of the DynamoDB table to provide a seamless, API-compatible in-memory cache with microsecond latency.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "DAX là bộ nhớ đệm (in-memory cache) quản lý hoàn toàn dành riêng cho DynamoDB, giảm độ trễ đọc từ mili-giây xuống micro-giây (microseconds) mà KHÔNG cần viết lại logic code ứng dụng vì DAX tương thích 100% với DynamoDB SDK. Nếu cần lưu kết quả tính toán tổng hợp phức tạp mới dùng ElastiCache.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s23",
        "DynamoDB Accelerator (DAX) for Microsecond Read Latency vs ElastiCache"
      ]
    }
  ],
  "24": [
    {
      "id": "s24-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        24
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on DynamoDB Streams vs Kinesis Data Streams & Lambda Event Source Mapping (Session 24, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến DynamoDB Streams vs Kinesis Data Streams & Lambda Event Source Mapping (Buổi #24, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Enable Amazon DynamoDB Streams with the NEW_AND_OLD_IMAGES view type and configure an AWS Lambda event source mapping to process item changes.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "DynamoDB Streams ghi lại luồng thay đổi cấp độ từng dòng (Insert, Modify, Remove) theo đúng thứ tự thời gian, lưu giữ trong 24 giờ và kích hoạt trực tiếp AWS Lambda để gửi email, đồng bộ sang OpenSearch hoặc tạo bảng tổng hợp.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s24",
        "DynamoDB Streams vs Kinesis Data Streams & Lambda Event Source Mapping"
      ]
    },
    {
      "id": "s24-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        24
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams) (Session 24, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams) (Buổi #24, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s24",
        "DynamoDB Global Tables (Active-Active Multi-Region Requires DynamoDB Streams)"
      ]
    },
    {
      "id": "s24-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        24
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on DynamoDB Time To Live (TTL) for Zero-Cost Automatic Item Expiration (Session 24, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến DynamoDB Time To Live (TTL) for Zero-Cost Automatic Item Expiration (Buổi #24, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Enable Amazon DynamoDB Time To Live (TTL) on an epoch timestamp attribute so expired session items are deleted automatically without consuming WCU.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "DynamoDB TTL tự động xóa các bản ghi đã hết hạn dựa trên thuộc tính thời gian Unix epoch timestamp hoàn toàn MIỄN PHÍ và KHÔNG tiêu tốn bất kỳ Write Capacity Unit (WCU) nào (thường xóa trong vòng 48 giờ).",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s24",
        "DynamoDB Time To Live (TTL) for Zero-Cost Automatic Item Expiration"
      ]
    }
  ],
  "25": [
    {
      "id": "s25-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.3",
      "sessionIds": [
        25
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Redshift (OLAP Columnar Data Warehouse, Redshift Spectrum & Serverless) (Session 25, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Redshift (OLAP Columnar Data Warehouse, Redshift Spectrum & Serverless) (Buổi #25, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Use Amazon Redshift Spectrum to run SQL joins directly against the petabytes of Parquet files in Amazon S3 and the dimension tables in Redshift.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Amazon Redshift là kho dữ liệu phân tích theo cột (Columnar OLAP Data Warehouse). Tính năng Redshift Spectrum cho phép chạy câu lệnh SQL từ cụm Redshift truy vấn trực tiếp hàng Petabyte dữ liệu nằm nguyên trên Amazon S3 mà không cần nạp (load) vào ổ đĩa của Redshift.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s25",
        "Amazon Redshift (OLAP Columnar Data Warehouse, Redshift Spectrum & Serverless)"
      ]
    },
    {
      "id": "s25-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.3",
      "sessionIds": [
        25
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon DocumentDB (MongoDB Compatible) vs Amazon Neptune (Graph DB) vs Amazon Keyspaces (Cassandra) (Session 25, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon DocumentDB (MongoDB Compatible) vs Amazon Neptune (Graph DB) vs Amazon Keyspaces (Cassandra) (Buổi #25, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Migrate the social network fraud-detection graph workload to Amazon Neptune, which is a fully managed graph database supporting Gremlin and SPARQL."
      ],
      "correctIdx": 3,
      "explanation": "Bảng ánh xạ Database chuyên biệt: MongoDB JSON -> Amazon DocumentDB; Apache Cassandra -> Amazon Keyspaces; Đồ thị quan hệ chằng chịt (Mạng xã hội, Gợi ý sản phẩm, Phát hiện gian lận Fraud Graph) -> Amazon Neptune; Sổ cái tài chính chuỗi khối (Hyperledger Fabric / Ethereum) -> Amazon Managed Blockchain; Dữ liệu chuỗi thời gian IoT -> Amazon Timestream.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s25",
        "Amazon DocumentDB (MongoDB Compatible) vs Amazon Neptune (Graph DB) vs Amazon Keyspaces (Cassandra)"
      ]
    },
    {
      "id": "s25-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.3",
      "sessionIds": [
        25
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database) (Session 25, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database) (Buổi #25, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s25",
        "Amazon MemoryDB for Redis (Durable Multi-AZ Transaction Log In-Memory Database)"
      ]
    }
  ],
  "26": [
    {
      "id": "s26-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        26
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain) (Session 26, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain) (Buổi #26, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s26",
        "Route 53 Alias Records vs CNAME Records at the Zone Apex (Root Domain)"
      ]
    },
    {
      "id": "s26-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        26
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Route 53 Alias Target Restrictions (Cannot Point to EC2 Public IP; Use A Record) (Session 26, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Route 53 Alias Target Restrictions (Cannot Point to EC2 Public IP; Use A Record) (Buổi #26, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Create a standard Route 53 Type A record containing the Elastic IP address of the Amazon EC2 instance."
      ],
      "correctIdx": 3,
      "explanation": "Bẫy đề thi kinh điển: Bản ghi Route 53 Alias có thể trỏ vào ELB, CloudFront, API Gateway, S3 Website, VPC Endpoint, Global Accelerator... nhưng TUYỆT ĐỐI KHÔNG thể trỏ vào địa chỉ IP của máy chủ EC2! Muốn trỏ tên miền vào IP của EC2 phải dùng bản ghi A thông thường.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s26",
        "Route 53 Alias Target Restrictions (Cannot Point to EC2 Public IP; Use A Record)"
      ]
    },
    {
      "id": "s26-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        26
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Route 53 Health Checks: Calculated Health Checks & Private Resource Monitoring via CloudWatch Alarm (Session 26, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Route 53 Health Checks: Calculated Health Checks & Private Resource Monitoring via CloudWatch Alarm (Buổi #26, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Create an Amazon CloudWatch metric alarm monitoring the private EC2 instance and configure a Route 53 Health Check that monitors the state of that CloudWatch alarm.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Vì các máy chủ kiểm tra sức khỏe (Health Checkers) của Route 53 nằm ngoài Internet công cộng nên chúng KHÔNG thể ping trực tiếp vào máy EC2 nằm trong Private Subnet. Giải pháp chuẩn là tạo CloudWatch Alarm trong VPC rồi cấu hình Route 53 Health Check theo dõi trạng thái của CloudWatch Alarm đó.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s26",
        "Route 53 Health Checks: Calculated Health Checks & Private Resource Monitoring via CloudWatch Alarm"
      ]
    }
  ],
  "27": [
    {
      "id": "s27-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        27
      ],
      "difficulty": "easy",
      "qEn": "A global streaming provider knows the exact IPv4 and IPv6 CIDR blocks assigned to its subscribers across regional internet service providers (ISPs) and wants Amazon Route 53 to route DNS queries based on the client source IP CIDR block. Which Route 53 routing policy should the solutions architect configure?",
      "qVi": "Nhà cung cấp dịch vụ truyền hình nắm rõ các dải địa chỉ IP CIDR của khách hàng theo từng nhà mạng ISP và muốn Amazon Route 53 điều hướng truy vấn DNS dựa trên dải CIDR IP nguồn của người dùng. Chính sách định tuyến nào của Route 53 đáp ứng yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Configure an Amazon Route 53 IP-based routing policy with CIDR collections mapping known ISP IP ranges to dedicated regional endpoints.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Chính sách điều hướng thứ 8 của Route 53 là IP-based Routing: cho phép định nghĩa các danh sách CIDR block nguồn của người dùng/nhà mạng ISP để điều hướng chính xác lưu lượng DNS về máy chủ tối ưu.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s27",
        "Route 53 IP-Based Routing Policy (8th Routing Policy Using Client CIDR Collections)"
      ]
    },
    {
      "id": "s27-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        27
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies (Session 27, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies (Buổi #27, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s27",
        "Route 53 Latency vs Geolocation vs Geoproximity (Traffic Flow Bias) Routing Policies"
      ]
    },
    {
      "id": "s27-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        27
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Route 53 Failover (Active-Passive) vs Weighted (Blue/Green Canary) vs Multi-Value Answer (Session 27, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements? (Choose TWO.)",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Route 53 Failover (Active-Passive) vs Weighted (Blue/Green Canary) vs Multi-Value Answer (Buổi #27, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này? (Chọn 2 phương án.)",
      "options": [
        "A. Configure an Amazon Route 53 Weighted routing policy assigning a weight of 10 to the new environment and 90 to the existing production environment.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Verify that least-privilege IAM permissions and encryption in transit are configured for all participating AWS resources.",
        "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdxs": [
        0,
        2
      ],
      "explanation": "Weighted Routing dùng trọng số để chia phần trăm lưu lượng (rất hay dùng để kiểm thử phiên bản mới Blue/Green hoặc Canary). Failover Routing dùng cho dự phòng Active-Passive (cần gắn Health Check vào bản ghi Primary). Multi-Value Answer trả về tối đa 8 IP khỏe mạnh kèm Health Check (nhưng KHÔNG thay thế được Load Balancer).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s27",
        "Route 53 Failover (Active-Passive) vs Weighted (Blue/Green Canary) vs Multi-Value Answer"
      ]
    }
  ],
  "28": [
    {
      "id": "s28-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        28
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on CloudFront Origin Access Control (OAC) + S3 Bucket Policy to Block Direct S3 URLs (Session 28, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến CloudFront Origin Access Control (OAC) + S3 Bucket Policy to Block Direct S3 URLs (Buổi #28, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure a CloudFront Origin Access Control (OAC) and update the S3 bucket policy to allow s3:GetObject only from the CloudFront service principal.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Để bắt buộc người dùng chỉ xem được file qua CloudFront mà không thể truy cập thẳng link S3 (trong khi S3 vẫn khóa Block Public Access), cấu hình chuẩn hiện đại là dùng CloudFront Origin Access Control (OAC - thế hệ mới thay thế OAI cũ) kết hợp S3 Bucket Policy.",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s28",
        "CloudFront Origin Access Control (OAC) + S3 Bucket Policy to Block Direct S3 URLs"
      ]
    },
    {
      "id": "s28-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        28
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on CloudFront Geo-Restriction vs Signed URLs / Signed Cookies vs Field-Level Encryption (Session 28, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến CloudFront Geo-Restriction vs Signed URLs / Signed Cookies vs Field-Level Encryption (Buổi #28, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Issue Amazon CloudFront Signed Cookies to authenticated premium subscribers so they can access thousands of HLS video segment files without re-signing every URL.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Phân biệt: CloudFront Signed URL dùng để cấp quyền tải 1 file lẻ (như file cài đặt phần mềm); CloudFront Signed Cookies dùng khi muốn cấp quyền truy cập HÀNG LOẠT file (như hàng nghìn phân đoạn video streaming HLS hoặc cả khu vực trả phí). Field-Level Encryption mã hóa tối đa 10 trường nhạy cảm (số thẻ tín dụng) bằng khóa công khai ngay tại Edge.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s28",
        "CloudFront Geo-Restriction vs Signed URLs / Signed Cookies vs Field-Level Encryption"
      ]
    },
    {
      "id": "s28-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        28
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone) (Session 28, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone) (Buổi #28, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s28",
        "Amazon CloudFront (HTTP/S Edge Caching) vs AWS Global Accelerator (2 Anycast IPs, TCP/UDP over AWS Backbone)"
      ]
    }
  ],
  "29": [
    {
      "id": "s29-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        29
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ) (Session 29, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ) (Buổi #29, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy Amazon FSx for Windows File Server configured in Multi-AZ mode and joined to the corporate Microsoft Active Directory domain.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Khi các máy chủ Windows EC2 hoặc máy trạm On-premise cần hệ thống file chia sẻ hỗ trợ giao thức SMB thuần túy, phân quyền NTFS ACL, tích hợp Microsoft Active Directory và DFS Namespaces, đáp án chuẩn là Amazon FSx for Windows File Server.",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s29",
        "Amazon FSx for Windows File Server (Native SMB, NTFS, Active Directory, Multi-AZ)"
      ]
    },
    {
      "id": "s29-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        29
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration) (Session 29, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration) (Buổi #29, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Create an Amazon FSx for Lustre file system linked to the Amazon S3 bucket using lazy loading and write-back export for the HPC cluster.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Khi đề bài nhắc tới tính toán hiệu năng cao (HPC), Machine Learning, xử lý video tốc độ hàng trăm GB/s trên Linux kết hợp đọc/ghi đồng bộ trực tiếp với một S3 Bucket (S3 Data Repository), đáp án luôn là Amazon FSx for Lustre (chọn Scratch cho tải ngắn hạn giá rẻ, Persistent cho tải dài hạn).",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s29",
        "Amazon FSx for Lustre (HPC Linux Sub-Millisecond Latency + Seamless S3 Data Repository Integration)"
      ]
    },
    {
      "id": "s29-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        29
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS (Session 29, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS (Buổi #29, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "D. Migrate the workload to Amazon FSx for NetApp ONTAP, which supports multiprotocol NFS and SMB access along with NetApp SnapMirror replication and instant cloning."
      ],
      "correctIdx": 3,
      "explanation": "Nếu doanh nghiệp đang dùng NetApp/ONTAP hoặc cần truy cập đa giao thức đồng thời (cả Linux NFS lẫn Windows SMB/iSCSI) kèm tính năng nén/chống trùng lặp (deduplication) và nhân bản SnapMirror, chọn FSx for NetApp ONTAP. Nếu đang di chuyển từ hệ thống file ZFS trên Linux cần snapshot/clone tức thì, chọn FSx for OpenZFS.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null
      ],
      "tags": [
        "s29",
        "Amazon FSx for NetApp ONTAP (Multi-Protocol NFS/SMB/iSCSI, SnapMirror) vs FSx for OpenZFS"
      ]
    }
  ],
  "30": [
    {
      "id": "s30-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        30
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway (Session 30, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway (Buổi #30, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy an AWS Storage Gateway S3 File Gateway appliance on premises so local servers can write files over NFS/SMB that automatically become native S3 objects.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Bảng chọn Storage Gateway: S3 File Gateway (máy chủ dưới đất đọc/ghi qua NFS/SMB, file lưu thành S3 Object nguyên bản trên mây để chạy Athena/Lifecycle); FSx File Gateway (đệm cache cục bộ cho FSx for Windows); Volume Gateway Cached/Stored (ổ đĩa block iSCSI sao lưu thành EBS Snapshot); Tape Gateway (thay thế băng từ vật lý VTL lưu lên S3 Glacier).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s30",
        "AWS Storage Gateway: S3 File Gateway vs FSx File Gateway vs Volume Gateway (Cached/Stored) vs Tape Gateway"
      ]
    },
    {
      "id": "s30-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        30
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling) (Session 30, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling) (Buổi #30, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s30",
        "AWS DataSync (Online Scheduled Network Migration with Preserved Metadata & Bandwidth Throttling)"
      ]
    },
    {
      "id": "s30-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        30
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS) (Session 30, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS) (Buổi #30, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s30",
        "AWS Snowball Edge (Offline Petabyte Transfer when Network Is Slow) vs AWS Transfer Family (Managed SFTP/FTPS)"
      ]
    }
  ],
  "31": [
    {
      "id": "s31-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        31
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo) (Session 31, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo) (Buổi #31, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s31",
        "Amazon SQS Standard (Unlimited Throughput, At-Least-Once) vs SQS FIFO (Exact Order, 300/3000 TPS, .fifo)"
      ]
    },
    {
      "id": "s31-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        31
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s) (Session 31, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s) (Buổi #31, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s31",
        "SQS Visibility Timeout (Preventing Duplicate Processing) & Long Polling (WaitTimeSeconds 1-20s)"
      ]
    },
    {
      "id": "s31-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        31
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads (Session 31, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads (Buổi #31, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "D. Configure a Dead-Letter Queue (DLQ) with a redrive policy setting maxReceiveCount to 3 so poison-pill messages are isolated for debugging."
      ],
      "correctIdx": 3,
      "explanation": "Dead-Letter Queue (DLQ) giúp tách riêng các tin nhắn bị lỗi lặp đi lặp lại vượt ngưỡng maxReceiveCount để không làm nghẽn hàng đợi chính (lưu ý DLQ của hàng đợi FIFO cũng phải là FIFO). Với tin nhắn vượt giới hạn kích thước tối đa 1 MiB của SQS, dùng SQS Extended Client Library lưu file thực trên S3 và chỉ gửi con trỏ qua SQS.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null
      ],
      "tags": [
        "s31",
        "SQS Dead-Letter Queue (DLQ) with maxReceiveCount vs SQS Extended Client Library for >1 MiB Payloads"
      ]
    }
  ],
  "32": [
    {
      "id": "s32-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        32
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss (Session 32, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss (Buổi #32, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s32",
        "Amazon SNS + SQS Fan-Out Pattern for Decoupled Parallel Processing without Data Loss"
      ]
    },
    {
      "id": "s32-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        32
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes (Session 32, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes (Buổi #32, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Configure Amazon SNS Message Filtering Policies on each SQS subscription so each queue receives only the subset of events matching its attributes.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Để các hàng đợi SQS con trong mô hình Fan-Out chỉ nhận đúng loại đơn hàng mình phụ trách mà không cần tạo hàng chục SNS Topic hay viết code lọc thủ công, ta gắn SNS Message Filtering Policy (lọc theo JSON Message Attributes) ngay trên từng Subscription.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s32",
        "SNS FIFO + SQS FIFO Ordered Fan-Out & SNS Message Filtering by JSON Attributes"
      ]
    },
    {
      "id": "s32-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        32
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose) (Session 32, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose) (Buổi #32, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s32",
        "Amazon SNS Direct Delivery (Email, SMS, Mobile Push, HTTP/S, Lambda, Kinesis Data Firehose)"
      ]
    }
  ],
  "33": [
    {
      "id": "s33-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        33
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery) (Session 33, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery) (Buổi #33, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s33",
        "Amazon Kinesis Data Streams (Real-Time Sub-Second Streaming, Retention up to 365 Days, Replay) vs Data Firehose (Near Real-Time Managed Delivery)"
      ]
    },
    {
      "id": "s33-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        33
      ],
      "difficulty": "medium",
      "qEn": "An enterprise runs an on-premises event streaming platform built on Apache Kafka using custom Java Kafka Producer and Consumer APIs and wants to migrate to a fully managed AWS service with minimal code changes. While Session 33 covers Kinesis Data Streams and Data Firehose, which managed AWS service is specifically designed for Apache Kafka workloads?",
      "qVi": "Doanh nghiệp đang chạy nền tảng xử lý sự kiện dùng Apache Kafka dưới On-premise và muốn chuyển lên dịch vụ quản lý hoàn toàn của AWS mà giữ nguyên code Kafka API hiện tại. Dịch vụ AWS nào được thiết kế riêng cho Apache Kafka?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Migrate the cluster to Amazon MSK (Managed Streaming for Apache Kafka) using MSK Serverless so existing Kafka producer and consumer code works unchanged.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Khi đề bài nêu rõ doanh nghiệp đang dùng Apache Kafka dưới On-premise và muốn chuyển lên dịch vụ quản lý của AWS mà giữ nguyên code Kafka API hiện tại, đáp án chuẩn là Amazon MSK (dùng MSK Serverless nếu tải biến thiên không muốn tự quản lý dung lượng Broker).",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s33",
        "Amazon MSK (Managed Streaming for Apache Kafka) for Lift-and-Shift Apache Kafka Workloads"
      ]
    },
    {
      "id": "s33-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        33
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS (Session 33, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS (Buổi #33, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "D. Migrate the legacy enterprise message broker to Amazon MQ configured in an Active/Standby Multi-AZ deployment backed by Amazon EFS."
      ],
      "correctIdx": 3,
      "explanation": "Khi di chuyển ứng dụng cũ (Legacy On-premise) đang dùng các giao thức chuẩn công nghiệp như JMS, AMQP, STOMP, MQTT (ActiveMQ hoặc RabbitMQ) và đề bài ràng buộc 'không viết lại code sang AWS SDK', bắt buộc chọn Amazon MQ thay vì SQS/SNS.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null
      ],
      "tags": [
        "s33",
        "Amazon MQ (Managed ActiveMQ / RabbitMQ for Legacy JMS/AMQP/MQTT Protocols) vs SQS/SNS"
      ]
    }
  ],
  "34": [
    {
      "id": "s34-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        34
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2 (Session 34, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2 (Buổi #34, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy the containerized microservices on Amazon ECS using the AWS Fargate launch type so AWS manages all underlying server provisioning and patching.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Khi chạy Container (Docker) trên AWS và đề bài có từ khóa 'least operational overhead', 'serverless containers', 'no EC2 instance management', đáp án luôn là AWS Fargate (trả tiền theo vCPU và RAM của từng Task).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s34",
        "Amazon ECS Launch Types: AWS Fargate (Serverless Containers) vs ECS on EC2"
      ]
    },
    {
      "id": "s34-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        34
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs) (Session 34, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs) (Buổi #34, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Create a dedicated IAM Task Role with least-privilege DynamoDB permissions and assign it to the specific ECS task definition.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Phân biệt rõ: ECS Task Execution Role là quyền của ECS Agent (để kéo image từ ECR, ghi log vào CloudWatch và lấy biến môi trường từ Secrets Manager lúc khởi động). Còn để code ứng dụng bên trong Container gọi tới S3/DynamoDB riêng biệt cho từng dịch vụ, phải gắn IAM Task Role vào Task Definition.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s34",
        "ECS IAM Roles: ECS Task Role (Per-Container AWS API Permissions) vs Task Execution Role (Agent Pulling Image/Logs)"
      ]
    },
    {
      "id": "s34-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        34
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning (Session 34, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning (Buổi #34, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "D. Migrate the workloads to Amazon EKS with AWS Fargate profiles and enable Amazon ECR enhanced image scanning powered by Amazon Inspector."
      ],
      "correctIdx": 3,
      "explanation": "Khi doanh nghiệp đã chuẩn hóa dùng Kubernetes (kubectl, Helm charts) dưới On-premise hoặc đa đám mây và muốn mang lên AWS, chọn Amazon EKS. Kho lưu trữ Docker image riêng tư là Amazon ECR (hỗ trợ quét lỗ hổng tự động với Amazon Inspector).",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null
      ],
      "tags": [
        "s34",
        "Amazon EKS (Managed Kubernetes for Multi-Cloud/On-Prem K8s Migration) & Amazon ECR Image Scanning"
      ]
    }
  ],
  "35": [
    {
      "id": "s35-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        35
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount (Session 35, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount (Buổi #35, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Increase the AWS Lambda function memory configuration (up to 10,240 MB), which proportionally increases the allocated vCPU and network bandwidth.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Trong AWS Lambda, người dùng không cấu hình trực tiếp số vCPU mà cấu hình dung lượng RAM (từ 128 MB đến 10,240 MB); khi tăng RAM thì sức mạnh CPU và băng thông mạng sẽ tự động tăng theo tỷ lệ. Giới hạn chạy tối đa là 15 phút (900 giây), thư mục tạm /tmp tối đa 10 GB.",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s35",
        "AWS Lambda Limits (15-Minute Max Timeout, 10 GB RAM, 10 GB Ephemeral /tmp) & EFS Mount"
      ]
    },
    {
      "id": "s35-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        35
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency (Session 35, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency (Buổi #35, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Enable AWS Lambda Provisioned Concurrency on the production function alias so execution environments remain pre-initialized with sub-100ms response times.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Reserved Concurrency chỉ đặt giới hạn số lượng bản sao tối đa (hoặc đặt = 0 để ngắt khẩn cấp hàm Lambda), không khử được Cold Start. Để giữ các môi trường chạy luôn nóng (pre-warmed) sẵn sàng phản hồi tức thì không bị trễ Cold Start, phải bật Provisioned Concurrency.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s35",
        "Lambda Cold Starts & Provisioned Concurrency vs Reserved Concurrency"
      ]
    },
    {
      "id": "s35-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        35
      ],
      "difficulty": "hard",
      "qEn": "An application invokes an AWS Lambda function asynchronously when files arrive in Amazon S3. If the function fails after Lambda's 2 automatic retries, the team wants to route the full execution context and stack trace directly to Amazon EventBridge rather than a legacy Dead-Letter Queue (DLQ). Which feature should the architect configure?",
      "qVi": "Ứng dụng gọi hàm AWS Lambda bất đồng bộ khi có file mới trên S3. Nếu hàm vẫn lỗi sau 2 lần tự động retry của Lambda, đội ngũ muốn gửi toàn bộ ngữ cảnh lỗi và stack trace thẳng sang Amazon EventBridge thay vì dùng Dead-Letter Queue (DLQ) cũ. Tính năng nào đáp ứng yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "D. Configure an AWS Lambda Destination for On-Failure events targeting Amazon EventBridge to capture the full execution context and stack trace after 2 retries."
      ],
      "correctIdx": 3,
      "explanation": "Khi gọi Lambda bất đồng bộ (Asynchronous invocation như từ S3, SNS, EventBridge), nếu lỗi Lambda sẽ tự động thử lại thêm 2 lần (tổng 3 lần chạy). Lambda Destinations được khuyến nghị hơn DLQ cũ vì hỗ trợ cả On-Success và On-Failure, gửi kèm toàn bộ ngữ cảnh lỗi/stack trace và hỗ trợ đích đến là EventBridge bên cạnh SQS/SNS.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null
      ],
      "tags": [
        "s35",
        "Lambda Asynchronous Invocation (2 Automatic Retries) & Lambda Destinations vs Dead-Letter Queues (DLQ)"
      ]
    }
  ],
  "36": [
    {
      "id": "s36-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        36
      ],
      "difficulty": "easy",
      "qEn": "A company is building an IoT ingestion workflow processing 150,000 events per second (each completing in under 10 seconds) and also needs a low-cost serverless API proxy with JWT authentication while keeping synchronous backend calls under API Gateway's 29-second (29s) integration timeout. Which workflow type should the architect use for the high-rate IoT pipeline?",
      "qVi": "Công ty xây dựng luồng xử lý IoT tốc độ 150.000 sự kiện/giây (mỗi luồng dưới 10 giây) đồng thời dùng API Gateway HTTP API (so với REST API, lưu ý giới hạn timeout 29 giây / 29s). Loại Step Functions Workflow nào phù hợp nhất cho luồng IoT tốc độ cao này?",
      "options": [
        "A. Orchestrate the high-throughput IoT ingestion pipeline using AWS Step Functions Express Workflows, which support over 100,000 executions per second for workflows under 5 minutes.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Phân biệt 2 loại Step Functions: Standard Workflow chạy tối đa 1 năm, thực thi đúng 1 lần (Exactly-once), phù hợp quy trình nghiệp vụ dài hạn/thanh toán có bước chờ con người duyệt. Express Workflow chạy tối đa 5 phút, tốc độ > 100,000 luồng/giây, giá cực rẻ cho xử lý luồng IoT/Streaming tốc độ cao.",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s36",
        "AWS Step Functions: Standard Workflows (Up to 1 Year, Exactly-Once) vs Express Workflows (>100k/s, <=5 Min, Cheaper)"
      ]
    },
    {
      "id": "s36-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        36
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout (Session 36, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout (Buổi #36, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Deploy an Amazon API Gateway HTTP API with a native JWT authorizer to proxy requests to AWS Lambda at up to 70% lower cost than a REST API.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "API Gateway HTTP API rẻ hơn tới ~70% và độ trễ thấp hơn REST API khi chỉ cần làm cổng proxy HTTP kèm xác thực OIDC/OAuth 2.0 JWT. Chỉ chọn REST API khi đề bài yêu cầu các tính năng nâng cao: API Keys + Usage Plans, Caching tại API Gateway, gắn AWS WAF, hoặc chuyển đổi dữ liệu XML/SOAP (Mapping Templates). Lưu ý giới hạn Integration Timeout cứng 29 giây (29s)!",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s36",
        "Amazon API Gateway: HTTP API (70% Cheaper, OIDC/JWT Proxy) vs REST API (API Keys, Usage Plans, Caching, WAF) & 29s Timeout"
      ]
    },
    {
      "id": "s36-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        36
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS) (Session 36, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS) (Buổi #36, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "D. Authenticate mobile users with an Amazon Cognito User Pool and exchange the token with an Amazon Cognito Identity Pool to obtain temporary IAM credentials for direct S3 uploads."
      ],
      "correctIdx": 3,
      "explanation": "Quy tắc phân biệt Cognito: User Pools là cơ sở dữ liệu người dùng (Đăng ký, Đăng nhập, MFA, liên kết Google/Facebook/SAML, trả về JWT token để gọi API Gateway). Identity Pools (Federated Identities) dùng để đổi token đăng nhập lấy Temporary AWS Credentials từ STS cho phép app di động gọi thẳng lên S3/DynamoDB.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null
      ],
      "tags": [
        "s36",
        "Amazon Cognito User Pools (Authentication / JWT Identity Provider) vs Cognito Identity Pools (Temporary AWS Credentials via STS)"
      ]
    }
  ]
};
  if (root) {
    root.QUIZ_BANK = root.QUIZ_BANK || {};
    for (const [sid, list] of Object.entries(PART)) {
      root.QUIZ_BANK[sid] = (root.QUIZ_BANK[sid] || []).concat(list);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = PART;
  }
})(typeof window !== "undefined" ? window : globalThis);
