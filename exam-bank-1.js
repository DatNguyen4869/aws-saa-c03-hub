// exam-bank-1.js — Ngân hàng câu hỏi thi thử & checkpoint (pool: "exam") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = [
  {
    "id": "x-p1-001",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p1-001. A financial enterprise is migrating its core Java applications to AWS using Amazon EC2 instances and Amazon RDS databases. During a security audit, the compliance officer asks the solutions architect to clarify which operational security tasks remain the customer's responsibility under the AWS Shared Responsibility Model. Which combination of tasks is the responsibility of the customer? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p1-001] Doanh nghiệp tài chính di chuyển ứng dụng Java lên AWS dùng EC2 và RDS. Khi kiểm toán, giám đốc tuân thủ yêu cầu làm rõ tác vụ nào thuộc trách nhiệm của khách hàng theo AWS Shared Responsibility Model. Tổ hợp tác vụ nào thuộc trách nhiệm của khách hàng? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Patching the guest operating system on Amazon EC2 instances, configuring security group rules, and managing IAM user permissions.",
      "B. Applying firmware updates to the underlying virtualization hypervisor and maintaining physical biometric access controls at Availability Zone data centers.",
      "C. Replacing faulty solid-state drives in the underlying Amazon EBS storage arrays and patching the managed host operating system for Amazon RDS.",
      "D. Maintaining the physical fiber-optic network backbone between AWS Regions and servicing HVAC cooling equipment inside server racks."
    ],
    "correctIdx": 0,
    "explanation": "Theo AWS Shared Responsibility Model, khách hàng chịu trách nhiệm Security IN the Cloud (vá lỗi Guest OS trên EC2, cấu hình Security Group, quản lý IAM). AWS chịu trách nhiệm Security OF the Cloud (vật lý, Hypervisor, phần cứng và OS của dịch vụ Managed).",
    "whyWrong": [
      null,
      "Cập nhật Hypervisor và kiểm soát sinh trắc học trung tâm dữ liệu vật lý thuộc trách nhiệm của AWS (Security OF the Cloud).",
      "Thay ổ cứng vật lý hỏng và vá lỗi host OS của dịch vụ Managed RDS thuộc trách nhiệm của AWS.",
      "Bảo trì cáp quang liên vùng và hệ thống làm mát phòng máy là trách nhiệm hạ tầng vật lý của AWS."
    ],
    "tags": [
      "phase-1",
      "s1",
      "AWS Shared Responsibility Model (Security OF vs IN the Cloud)"
    ]
  },
  {
    "id": "x-p1-002",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-002, Phase 1 Session 2) focusing on EC2 Instance Profile vs Hardcoded IAM Access Keys. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-002 - Chặng 1, Buổi #2] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Instance Profile vs Hardcoded IAM Access Keys. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Encode the static IAM access keys with Base64 and pass them through the EC2 User Data script during instance launch while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Revoke the exposed IAM access keys immediately and attach an IAM role with S3 permissions to the EC2 instance using an instance profile.",
      "C. Store the IAM user access keys inside a public S3 bucket and configure the application to fetch them at startup.",
      "D. Attach an AWS Shield Standard policy to the EC2 instance to hide the hardcoded credentials in the Git repository."
    ],
    "correctIdx": 1,
    "explanation": "Khi khóa tĩnh bị lộ, phải thu hồi/xóa ngay khóa đó và gắn IAM Role (thông qua Instance Profile) cho EC2 để SDK tự động lấy temporary credentials từ Instance Metadata Service.",
    "whyWrong": [
      "Mã hóa Base64 trong User Data vẫn là khóa dài hạn và dễ dàng bị đọc bởi bất kỳ ai truy cập được metadata.",
      null,
      "Lưu khóa trong S3 bucket công khai làm lộ thông tin xác thực ra toàn bộ Internet.",
      "AWS Shield chống tấn công DDoS tầng mạng, không xử lý được khóa tĩnh bị lộ trong mã nguồn."
    ],
    "tags": [
      "phase-1",
      "s2",
      "EC2 Instance Profile vs Hardcoded IAM Access Keys"
    ]
  },
  {
    "id": "x-p1-003",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      3
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-003, Phase 1 Session 3) focusing on Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-003 - Chặng 1, Buổi #3] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy the workers on Storage Optimized I3en instances provisioned with expensive local NVMe SSDs meant for NoSQL databases.",
      "B. Deploy the workers on X2gd Memory Optimized instances provisioned with terabytes of RAM that remain idle during CPU encoding.",
      "C. Deploy the video encoding workers on Compute Optimized EC2 instances (such as the C6i or C7g families).",
      "D. Deploy the workers on T3.nano burstable instances with unlimited mode disabled so CPU throttling occurs under sustained load."
    ],
    "correctIdx": 2,
    "explanation": "Các bài toán tính toán CPU chuyên sâu như chuyển mã video (video encoding/transcoding), HPC, batch processing và gaming server phù hợp nhất với dòng Compute Optimized (họ C).",
    "whyWrong": [
      "Dòng I3en đắt đỏ vì ổ đĩa NVMe cục bộ tốc độ cao nhưng tác vụ nén video chỉ cần CPU chứ không cần IOPS đĩa lớn.",
      "Dòng X2gd đắt đỏ vì dung lượng RAM khổng lồ, gây lãng phí lớn khi tác vụ chỉ cần CPU.",
      null,
      "T3.nano tắt Unlimited sẽ bị bóp nghẹt CPU về mức baseline rất thấp ngay khi cạn CPU credit."
    ],
    "tags": [
      "phase-1",
      "s3",
      "Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding"
    ]
  },
  {
    "id": "x-p1-004",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      4
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-004, Phase 1 Session 4) focusing on Security Group Referencing between ALB and EC2 Tier. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p1-004 - Chặng 1, Buổi #4] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Security Group Referencing between ALB and EC2 Tier. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure the EC2 security group inbound rule to allow HTTP traffic exclusively from the security group ID of the Application Load Balancer.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Configure the EC2 security group inbound rule to allow HTTP traffic from the hardcoded public IPv4 addresses of the ALB nodes while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Create a custom Network ACL rule that filters inbound packets using the public DNS hostname of the Application Load Balancer.",
      "E. Add an explicit deny rule inside the EC2 security group to block direct internet traffic while leaving port 80 open to 0.0.0.0/0."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Vì IP của ALB thay đổi linh hoạt, chuẩn thiết kế bảo mật nhiều tầng là tham chiếu trực tiếp Security Group ID của ALB làm nguồn (Source) trong Inbound Rule của EC2 Security Group.",
    "whyWrong": [
      null,
      null,
      "IP của ALB thay đổi tự động khi co giãn nên việc cấu hình cứng theo địa chỉ IP sẽ làm đứt kết nối.",
      "Network ACL chỉ hiểu địa chỉ IP/CIDR block, không thể cấu hình lọc theo tên miền DNS.",
      "Security Group chỉ hỗ trợ quy tắc Allow (không có quy tắc Deny)."
    ],
    "tags": [
      "phase-1",
      "s4",
      "Security Group Referencing between ALB and EC2 Tier"
    ]
  },
  {
    "id": "x-p1-005",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      5
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-005, Phase 1 Session 5) focusing on EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-005 - Chặng 1, Buổi #5] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Launch the instances as EC2 Dedicated Instances, which expose physical socket counts while sharing hardware with other AWS accounts while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use EC2 On-Demand Capacity Reservations in a shared tenancy subnet to satisfy physical core licensing audits.",
      "C. Deploy the workload on Spot Fleet instances across multiple Availability Zones to track physical motherboard serial numbers.",
      "D. Launch the instances on EC2 Dedicated Hosts to gain visibility and control over the underlying physical processor sockets and cores."
    ],
    "correctIdx": 3,
    "explanation": "Khi đề bài yêu cầu mang bản quyền phần mềm cũ tính theo số lượng lõi/socket vật lý (Server-bound licensing như Windows Server, SQL Server, Oracle BYOL) hoặc cần kiểm soát vị trí phần cứng vật lý, bắt buộc chọn EC2 Dedicated Hosts.",
    "whyWrong": [
      "Dedicated Instances tuy cô lập phần cứng theo tài khoản nhưng KHÔNG cho phép nhìn thấy số socket/core vật lý và có thể đổi máy vật lý khi reboot.",
      "Capacity Reservation trên phần cứng dùng chung (Shared tenancy) không đáp ứng yêu cầu kiểm toán socket vật lý.",
      "Spot Fleet chạy trên phần cứng dùng chung và có thể bị thu hồi bất ngờ.",
      null
    ],
    "tags": [
      "phase-1",
      "s5",
      "EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL)"
    ]
  },
  {
    "id": "x-p1-006",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      6
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p1-006, Phase 1 Session 6) focusing on Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-006 - Chặng 1, Buổi #6] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use a Partition Placement Group across multiple partitions so that a single hardware rack failure affects only one partition while preserving quorum.",
      "B. Use a Spread Placement Group to deploy 40 Apache Kafka brokers inside a single Availability Zone while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use a Cluster Placement Group across three AWS Regions to isolate rack-level power failures automatically.",
      "D. Move the private IPv4 address between Regions by detaching and reattaching an Elastic Network Interface across Availability Zones."
    ],
    "correctIdx": 0,
    "explanation": "Partition Placement Group chia các máy EC2 thành các phân vùng (tối đa 7 partitions/AZ), mỗi phân vùng nằm trên các tủ rack riêng và hỗ trợ hàng trăm máy EC2, rất lý tưởng cho HDFS, HBase, Cassandra và Apache Kafka.",
    "whyWrong": [
      null,
      "Spread Placement Group chỉ cho phép tối đa 7 máy trên mỗi AZ nên không thể chứa 40 máy trong 1 AZ.",
      "Cluster Placement Group chỉ nằm trong 1 AZ đơn lẻ và không cô lập lỗi phần cứng giữa các máy.",
      "ENI bị ràng buộc cứng vào 1 Availability Zone, không thể tháo ra gắn sang AZ khác hay Region khác."
    ],
    "tags": [
      "phase-1",
      "s6",
      "Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra)"
    ]
  },
  {
    "id": "x-p1-007",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      7
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-007, Phase 1 Session 7) focusing on EC2 Hibernate Prerequisites & Fast Warm-Cache Startup. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-007 - Chặng 1, Buổi #7] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Hibernate Prerequisites & Fast Warm-Cache Startup. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable EC2 Hibernate on an instance backed solely by an unencrypted ephemeral EC2 Instance Store root volume while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable EC2 Hibernate on an instance backed by an encrypted root Amazon EBS volume that has sufficient space to store the contents of RAM.",
      "C. Configure EC2 Hibernate on an instance with 512 GB of system RAM to bypass the 150 GB maximum RAM limit for hibernation.",
      "D. Keep the instance in the hibernated state continuously for 180 days without booting it to avoid EBS storage charges."
    ],
    "correctIdx": 1,
    "explanation": "EC2 Hibernate lưu toàn bộ dữ liệu trên bộ nhớ RAM xuống ổ đĩa Root EBS trước khi tắt máy để khi bật lại cache vẫn còn nguyên. Điều kiện bắt buộc: ổ Root phải là EBS đã bật mã hóa (Encrypted), đủ dung lượng chứa RAM, RAM < 150 GB và thời gian ngủ đông tối đa 60 ngày.",
    "whyWrong": [
      "EC2 Hibernate bắt buộc ổ Root phải là EBS và bắt buộc phải bật mã hóa (Encrypted) để bảo vệ dữ liệu nhạy cảm từ RAM.",
      null,
      "EC2 Hibernate chỉ hỗ trợ các máy có dung lượng RAM dưới 150 GB.",
      "Một máy EC2 không được ở trạng thái Hibernate quá 60 ngày liên tục, và trong lúc ngủ đông vẫn tính phí lưu trữ EBS."
    ],
    "tags": [
      "phase-1",
      "s7",
      "EC2 Hibernate Prerequisites & Fast Warm-Cache Startup"
    ]
  },
  {
    "id": "x-p1-008",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      8
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-008, Phase 1 Session 8) focusing on EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-008 - Chặng 1, Buổi #8] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Move the snapshot to the Amazon EBS Snapshot Archive tier so blocks are hydrated instantly with zero restore latency while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Copy the snapshot into the Recycle Bin for EBS Snapshots to accelerate block-level I/O performance.",
      "C. Enable Amazon EBS Fast Snapshot Restore (FSR) on the snapshot before creating the new volume to eliminate initialization latency.",
      "D. Change the target volume type to Cold HDD (sc1) so all blocks are pre-warmed in NVMe memory upon creation."
    ],
    "correctIdx": 2,
    "explanation": "Mặc định ổ EBS tạo từ Snapshot sẽ tải dữ liệu lười (Lazy loading) từ S3 nên lần đọc đầu tiên vào mỗi block sẽ bị trễ. Để đạt 100% hiệu năng IOPS ngay lập tức mà không cần chạy lệnh dd/fio làm nóng ổ, ta bật tính năng EBS Fast Snapshot Restore (FSR).",
    "whyWrong": [
      "EBS Snapshot Archive là tầng lưu trữ lạnh giá rẻ nhưng mất tới 24–72 giờ để khôi phục lại.",
      "Recycle Bin chỉ dùng để giữ lại các Snapshot bị xóa nhầm chống mất dữ liệu, không tăng tốc độ đọc.",
      null,
      "Cold HDD (sc1) là ổ đĩa từ tốc độ thấp nhất và vẫn chịu hiệu ứng lazy loading từ Snapshot."
    ],
    "tags": [
      "phase-1",
      "s8",
      "EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty"
    ]
  },
  {
    "id": "x-p1-009",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      9
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-009, Phase 1 Session 9) focusing on EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-009 - Chặng 1, Buổi #9] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Store the long-term master financial ledger exclusively on EC2 Instance Store volumes and stop the instances every night to save money while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Cold HDD (sc1) EBS volumes to achieve over 300,000 random IOPS for the real-time scratch cache.",
      "C. Use an Amazon S3 Glacier Deep Archive vault mounted as a block device for microsecond scratch disk operations.",
      "D. Use EC2 instances equipped with local NVMe Instance Store volumes for the temporary scratch data while writing final results to Amazon S3."
    ],
    "correctIdx": 3,
    "explanation": "Khi bài toán cần tốc độ đọc/ghi đĩa cực khủng (hàng trăm nghìn tới hàng triệu IOPS, độ trễ cực thấp) cho dữ liệu tạm thời (scratch data, buffer, cache, temp files có thể tái tạo được), giải pháp tốt nhất là ổ đĩa gắn trực tiếp vào máy chủ vật lý EC2 Instance Store (NVMe).",
    "whyWrong": [
      "Dữ liệu trên Instance Store sẽ bị xóa sạch hoàn toàn nếu máy EC2 bị Stop hoặc phần cứng vật lý gặp sự cố.",
      "Cold HDD (sc1) là ổ đĩa từ chậm nhất, không thể cung cấp hàng trăm nghìn IOPS ngẫu nhiên.",
      "S3 Glacier Deep Archive là lưu trữ đối tượng băng từ lấy lại sau 12–48 giờ, không phải ổ đĩa block tốc độ cao.",
      null
    ],
    "tags": [
      "phase-1",
      "s9",
      "EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence"
    ]
  },
  {
    "id": "x-p1-010",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      10
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-010, Phase 1 Session 10) focusing on Amazon EFS Shared POSIX File System Across Multiple Availability Zones. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-010 - Chặng 1, Buổi #10] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EFS Shared POSIX File System Across Multiple Availability Zones. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create an Amazon EFS file system with mount targets in each Availability Zone so all Linux EC2 instances can mount it concurrently over NFSv4.",
      "B. Create a single Amazon EBS gp3 volume and enable Multi-Attach across all three Availability Zones while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Mount an Amazon S3 bucket directly as a POSIX kernel block device with file-locking support without third-party adapters.",
      "D. Use EC2 Instance Store volumes on each server and rely on AWS hardware to synchronize files across Availability Zones."
    ],
    "correctIdx": 0,
    "explanation": "Khi nhiều máy EC2 Linux chạy trên nhiều Availability Zones cần dùng chung một hệ thống file chia sẻ (Shared File System) chuẩn POSIX/NFSv4 và tự động co giãn dung lượng, đáp án chuẩn luôn là Amazon EFS.",
    "whyWrong": [
      null,
      "EBS gp3 không hỗ trợ Multi-Attach và EBS cũng không thể gắn xuyên qua nhiều Availability Zones.",
      "S3 là Object Storage truy cập qua REST API, không phải hệ thống file POSIX hỗ trợ gắn mount trực tiếp kèm khóa file (file locking).",
      "Instance Store là ổ đĩa cục bộ cô lập trên từng máy, AWS không tự động đồng bộ nội dung giữa các máy."
    ],
    "tags": [
      "phase-1",
      "s10",
      "Amazon EFS Shared POSIX File System Across Multiple Availability Zones"
    ]
  },
  {
    "id": "x-p1-011",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p1-011. An e-commerce company is conducting an AWS Well-Architected Framework review of its cloud platform. The executive board wants to minimize the environmental impact and energy consumption of its workloads per user transaction. Which pillar of the AWS Well-Architected Framework and corresponding engineering practices directly address this goal? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance. (Choose TWO.)",
    "qVi": "[Mã đề x-p1-011] Công ty thương mại điện tử thực hiện rà soát hệ thống theo khung AWS Well-Architected Framework và muốn giảm thiểu tác động môi trường cũng như mức tiêu thụ năng lượng trên mỗi giao dịch. Trụ cột nào của AWS Well-Architected Framework và giải pháp nào đáp ứng trực tiếp mục tiêu này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất. (Chọn 2 phương án.)",
    "options": [
      "A. The Operational Excellence pillar, by deploying redundant NAT Gateways across three Availability Zones without changing instance architectures while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. The Sustainability pillar, by migrating compute workloads to AWS Graviton processors and configuring S3 Lifecycle rules to expire unneeded data.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. The Reliability pillar, by retaining uncompressed application debug logs indefinitely in Amazon S3 Standard across multiple AWS Regions.",
      "E. The Security pillar, by provisioning dedicated physical hosts at maximum CPU utilization 24/7 regardless of actual user traffic demand."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "Trụ cột thứ 6 của AWS Well-Architected Framework là Sustainability (Tính bền vững), tập trung tối ưu hóa hiệu suất năng lượng, chuyển sang chip AWS Graviton tiết kiệm điện và xóa dữ liệu dư thừa qua S3 Lifecycle để giảm dấu chân carbon.",
    "whyWrong": [
      "Operational Excellence tập trung vào tự động hóa vận hành và quy trình, không phải mục tiêu giảm tiêu thụ năng lượng môi trường.",
      null,
      null,
      "Giữ log không nén vĩnh viễn trên nhiều Region gây lãng phí tài nguyên lưu trữ, đi ngược lại trụ cột Sustainability.",
      "Chạy máy chủ vật lý công suất tối đa 24/7 khi không có tải gây lãng phí điện năng nghiêm trọng."
    ],
    "tags": [
      "phase-1",
      "s1",
      "AWS Well-Architected Framework 6 Pillars (Sustainability Pillar)"
    ]
  },
  {
    "id": "x-p1-012",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-012, Phase 1 Session 2) focusing on Cross-Account Access via IAM Role and AWS STS AssumeRole. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-012 - Chặng 1, Buổi #2] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Cross-Account Access via IAM Role and AWS STS AssumeRole. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create duplicate IAM users with identical passwords inside every Production account and synchronize them manually each week while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create an IAM role in the Production account with a trust policy trusting the Security account, and allow security analysts to call sts:AssumeRole.",
      "C. Place the Production AWS account inside an IAM Group located in the Security account so permissions are inherited automatically.",
      "D. Share the Production account root user access keys with the security team over an encrypted email attachment."
    ],
    "correctIdx": 1,
    "explanation": "Để cấp quyền Cross-Account an toàn không cần tạo IAM User trùng lặp, ta tạo IAM Role ở tài khoản đích (Production) tin tưởng tài khoản nguồn (Security) qua Trust Policy và dùng lệnh sts:AssumeRole.",
    "whyWrong": [
      "Tạo IAM User trùng lặp ở nhiều tài khoản tốn công vận hành và vi phạm nguyên tắc quản lý định danh tập trung.",
      null,
      "IAM Group chỉ chứa IAM Users trong phạm vi 1 tài khoản, không thể chứa các AWS Accounts.",
      "Tạo và chia sẻ Root Access Key vi phạm nghiêm trọng nguyên tắc bảo mật tối kỵ của AWS."
    ],
    "tags": [
      "phase-1",
      "s2",
      "Cross-Account Access via IAM Role and AWS STS AssumeRole"
    ]
  },
  {
    "id": "x-p1-013",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      3
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-013, Phase 1 Session 3) focusing on Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-013 - Chặng 1, Buổi #3] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Select Compute Optimized instances (C7g family) designed primarily for CPU-bound batch processing and media transcoding while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Select General Purpose burstable instances (T4g.micro) operating on baseline CPU credits without high memory capacity.",
      "C. Select Memory Optimized Amazon EC2 instances (such as the R7g or X2idn instance families) designed for high memory-to-vCPU ratios.",
      "D. Select Storage Optimized instances (D3en family) equipped with sequential spinning hard disk drives for cold archiving."
    ],
    "correctIdx": 2,
    "explanation": "Dòng máy Memory Optimized (họ R, X, High Memory) được thiết kế chuyên cho các cơ sở dữ liệu trong bộ nhớ RAM (In-memory caches như Redis, SAP HANA, real-time big data analytics).",
    "whyWrong": [
      "Họ C tối ưu cho tốc độ CPU tính toán nặng, có tỷ lệ RAM/vCPU thấp hơn dòng R/X.",
      "Họ T4g.micro chỉ có lượng RAM rất nhỏ và dùng CPU credit, không thể chạy SAP HANA hay Redis lớn.",
      null,
      "Họ D tối ưu cho ổ cứng tuần tự HDD dung lượng cao, không tối ưu bộ nhớ RAM."
    ],
    "tags": [
      "phase-1",
      "s3",
      "Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads"
    ]
  },
  {
    "id": "x-p1-014",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      4
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-014, Phase 1 Session 4) focusing on Stateful Nature of Security Groups vs Ephemeral Return Ports. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-014 - Chặng 1, Buổi #4] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Stateful Nature of Security Groups vs Ephemeral Return Ports. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Security groups are stateless, so the administrator must manually open outbound ephemeral ports 1024-65535 for responses to succeed while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Security groups evaluate rules in numerical order from lowest to highest rule number before permitting return packets.",
      "C. Security groups automatically rewrite the destination port of blocked outbound packets to port 443 through the Internet Gateway.",
      "D. Security groups are stateful, so return traffic for an allowed inbound HTTP request is automatically permitted regardless of outbound rules."
    ],
    "correctIdx": 3,
    "explanation": "Security Group hoạt động theo cơ chế Stateful (Có trạng thái): một khi kết nối đã được cho phép đi vào (Inbound), luồng gói tin phản hồi của kết nối đó tự động được phép đi ra bất kể bảng Outbound rules ra sao.",
    "whyWrong": [
      "Stateless là đặc điểm của Network ACL (NACL), không phải của Security Group.",
      "Đánh số thứ tự rule và xét từ nhỏ đến lớn là cơ chế của Network ACL; Security Group gộp tất cả các rule Allow lại.",
      "Security Group không tự động viết lại cổng đích của gói tin.",
      null
    ],
    "tags": [
      "phase-1",
      "s4",
      "Stateful Nature of Security Groups vs Ephemeral Return Ports"
    ]
  },
  {
    "id": "x-p1-015",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      5
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-015, Phase 1 Session 5) focusing on EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-015 - Chặng 1, Buổi #5] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use Amazon EC2 Spot Instances managed by an Auto Scaling group or Spot Fleet to achieve up to a 90% cost reduction.",
      "B. Use On-Demand Instances exclusively with no commitment discounts to achieve the lowest possible compute price while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Purchase 3-year All Upfront Standard Reserved Instances for a one-time 48-hour genomics simulation job.",
      "D. Deploy the stateless batch workers on Dedicated Hosts to minimize hourly compute expenses."
    ],
    "correctIdx": 0,
    "explanation": "Với các tác vụ xử lý lô (batch processing), phân tích dữ liệu hoặc render hình ảnh có khả năng chịu lỗi (fault-tolerant, stateless) và chấp nhận gián đoạn (2-minute interruption notice), EC2 Spot Instances giúp tiết kiệm tới 90% chi phí.",
    "whyWrong": [
      null,
      "On-Demand có mức giá cao nhất theo giờ, không tối ưu chi phí cho tải batch chịu lỗi.",
      "Mua RI cam kết 3 năm cho một tác vụ chỉ chạy ngắn hạn gây lãng phí tiền nghiêm trọng.",
      "Dedicated Hosts là hình thức đắt đỏ nhất, chỉ dùng khi bắt buộc bởi giấy phép phần mềm vật lý."
    ],
    "tags": [
      "phase-1",
      "s5",
      "EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads"
    ]
  },
  {
    "id": "x-p1-016",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      6
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p1-016, Phase 1 Session 6) focusing on Cluster Placement Group for Low-Latency 100 Gbps HPC Networking. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-016 - Chặng 1, Buổi #6] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Cluster Placement Group for Low-Latency 100 Gbps HPC Networking. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Launch the instances inside a Spread Placement Group distributed across three separate AWS Regions while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Launch the instances inside a Cluster Placement Group within a single Availability Zone using Enhanced Networking (ENA).",
      "C. Launch the instances inside a Partition Placement Group spanning multiple Availability Zones with standard public IP routing.",
      "D. Attach multiple Elastic IP addresses to each instance and route HPC packets through a public NAT Gateway."
    ],
    "correctIdx": 1,
    "explanation": "Cluster Placement Group gom các máy EC2 vào sát nhau trên cùng hệ thống rack trong 1 Availability Zone, mang lại độ trễ mạng cực thấp (low latency) và băng thông mạng tối đa cho bài toán HPC.",
    "whyWrong": [
      "Spread Placement Group tách các máy ra các rack khác nhau và giới hạn tối đa 7 máy/AZ, không tối ưu độ trễ cực thấp cho cụm HPC lớn.",
      null,
      "Partition Placement Group dành cho hệ thống phân tán lớn (HDFS, Kafka, Cassandra) chống lỗi theo phân vùng rack.",
      "Định tuyến qua Elastic IP và NAT Gateway làm tăng độ trễ và phát sinh phí truyền dữ liệu không cần thiết."
    ],
    "tags": [
      "phase-1",
      "s6",
      "Cluster Placement Group for Low-Latency 100 Gbps HPC Networking"
    ]
  },
  {
    "id": "x-p1-017",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      7
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-017, Phase 1 Session 7) focusing on EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-017 - Chặng 1, Buổi #7] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Stopping an EC2 instance releases its private IPv4 address inside the VPC subnet and deletes all attached Amazon EBS volumes while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Hibernating an EC2 instance continues to bill for hourly vCPU compute capacity at the full On-Demand rate while powered down.",
      "C. Stopping or hibernating an EBS-backed instance stops compute (vCPU/RAM) billing while retaining the private IPv4 address and continuing EBS volume charges.",
      "D. Rebooting an EC2 instance assigns a brand-new private IPv4 address and triggers a minimum one-hour billing increment reset."
    ],
    "correctIdx": 2,
    "explanation": "Khi Stop hoặc Hibernate máy EC2 (EBS-backed), AWS ngừng tính tiền Compute (EC2), giữ nguyên địa chỉ Private IPv4 (và Public IP nếu là Elastic IP), nhưng vẫn tính phí dung lượng ổ cứng EBS đang lưu trữ.",
    "whyWrong": [
      "Khi Stop máy EC2, địa chỉ Private IPv4 vẫn được giữ nguyên (chỉ có Public IPv4 động mới bị thu hồi).",
      "Khi máy đã vào trạng thái Hibernated (Stopped), AWS không tính phí vCPU/RAM mà chỉ tính phí lưu trữ EBS.",
      null,
      "Reboot máy EC2 giữ nguyên toàn bộ địa chỉ Private IP, Public IP và dữ liệu trên cả Instance Store."
    ],
    "tags": [
      "phase-1",
      "s7",
      "EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior"
    ]
  },
  {
    "id": "x-p1-018",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      8
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-018, Phase 1 Session 8) focusing on EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p1-018 - Chặng 1, Buổi #8] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Enable EBS Fast Snapshot Restore on all 500 historical snapshots to minimize monthly storage billing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Convert the snapshots into provisioned IOPS io2 Block Express volumes and leave them unattached in the account.",
      "C. Move the rarely accessed compliance snapshots to the Amazon EBS Snapshot Archive tier to reduce snapshot storage costs by up to 75%.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Store the EBS snapshots inside an unencrypted EC2 Instance Store volume for long-term 7-year retention."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "Với các bản EBS Snapshot cần lưu trữ dài hạn (>= 90 ngày) hiếm khi khôi phục và chấp nhận thời gian lấy lại 24–72 giờ, chuyển sang EBS Snapshot Archive giúp tiết kiệm tới 75% chi phí lưu trữ.",
    "whyWrong": [
      "Fast Snapshot Restore tính phí rất cao theo giờ cho mỗi Snapshot/AZ để giữ ổ luôn nóng, làm tăng vọt chi phí.",
      "Tạo ổ io2 thật từ Snapshot sẽ tốn chi phí lưu trữ và IOPS đắt gấp nhiều lần so với giữ ở dạng Snapshot.",
      null,
      null,
      "Instance Store là ổ tạm mất sạch dữ liệu khi tắt máy, không thể lưu trữ kiểm toán dài hạn."
    ],
    "tags": [
      "phase-1",
      "s8",
      "EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore)"
    ]
  },
  {
    "id": "x-p1-019",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      9
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-019, Phase 1 Session 9) focusing on EBS gp3 Independent IOPS/Throughput Tuning vs io2 for >16,000 IOPS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-019 - Chặng 1, Buổi #9] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS gp3 Independent IOPS/Throughput Tuning vs io2 for >16,000 IOPS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use a single Amazon EBS General Purpose SSD (gp3) volume, which is capped at a maximum of 16,000 IOPS per volume while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon EBS Throughput Optimized HDD (st1) as the boot volume and primary random-I/O database disk.",
      "C. Use Amazon EBS Cold HDD (sc1) volumes to achieve 64,000 random IOPS at the lowest cost.",
      "D. Use Amazon EBS Provisioned IOPS SSD (io2 Block Express) volumes, which support up to 256,000 IOPS and sub-millisecond latency."
    ],
    "correctIdx": 3,
    "explanation": "Ổ gp3 cho phép cấu hình độc lập IOPS và Throughput nhưng giới hạn tối đa là 16,000 IOPS và 1,000 MB/s. Khi cơ sở dữ liệu yêu cầu hiệu năng vượt mốc 16,000 IOPS (tới 64,000 IOPS trên Nitro hoặc 256,000 IOPS với io2 Block Express) kèm độ bền 99.999%, bắt buộc phải dùng dòng io1/io2.",
    "whyWrong": [
      "Một ổ gp3 đơn lẻ chỉ đạt tối đa 16,000 IOPS, không đáp ứng được yêu cầu > 64,000 IOPS.",
      "Ổ HDD (st1/sc1) không thể làm Boot Volume và không phù hợp cho cơ sở dữ liệu OLTP cần random IOPS cao.",
      "Cold HDD (sc1) chỉ đạt tối đa vài trăm IOPS cho dữ liệu tuần tự ít truy cập.",
      null
    ],
    "tags": [
      "phase-1",
      "s9",
      "EBS gp3 Independent IOPS/Throughput Tuning vs io2 for >16,000 IOPS"
    ]
  },
  {
    "id": "x-p1-020",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      10
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-020, Phase 1 Session 10) focusing on Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-020 - Chặng 1, Buổi #10] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable EFS Lifecycle Management to automatically transition files not accessed for 30 days to the EFS Infrequent Access (EFS IA) storage class.",
      "B. Switch the EFS file system to Max I/O performance mode to reduce monthly gigabyte storage charges by 90% while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Migrate the active Linux POSIX shared directories to Amazon S3 Glacier Deep Archive while keeping NFSv4 mount points unchanged.",
      "D. Delete the EFS mount targets in two of the three Availability Zones to reduce the total stored data volume."
    ],
    "correctIdx": 0,
    "explanation": "Để tối ưu chi phí cho Amazon EFS khi có nhiều file cũ ít đọc tới, bật EFS Lifecycle Management sẽ tự động chuyển các file không truy cập sau N ngày (7, 14, 30, 60, 90 ngày) sang tầng EFS Standard-IA hoặc One Zone-IA, tiết kiệm tới ~92% phí lưu trữ mà ứng dụng vẫn đọc/ghi trong suốt.",
    "whyWrong": [
      null,
      "Max I/O là chế độ hiệu năng (tăng tổng IOPS nhưng độ trễ mỗi thao tác cao hơn General Purpose), hoàn toàn không giảm giá lưu trữ.",
      "S3 Glacier Deep Archive không hỗ trợ gắn kết qua giao thức NFSv4 trực tiếp cho ứng dụng POSIX.",
      "Xóa Mount Target chỉ làm mất kết nối mạng từ AZ đó tới EFS chứ không giảm dung lượng dữ liệu lưu trữ."
    ],
    "tags": [
      "phase-1",
      "s10",
      "Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA)"
    ]
  },
  {
    "id": "x-p1-021",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p1-021. A contractor belongs to the BackendDevs IAM group which grants Allow permissions for all Amazon S3 actions. However, an inline policy attached to the contractor's IAM user contains an Explicit Deny for s3:DeleteObject on the production bucket. Now the contractor legitimately needs to delete obsolete objects from that bucket. Which TWO actions must the solutions architect take? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p1-021] Một nhân viên thuộc IAM Group BackendDevs có quyền Allow toàn bộ S3, nhưng bị gắn thêm Inline Policy có lệnh Explicit Deny đối với s3:DeleteObject. Hiện tại nhân viên này cần quyền xóa file hợp lệ trên bucket đó. Kiến trúc sư cần thực hiện HAI hành động nào? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Add a second inline policy with s3:* Allow to the IAM user to override the existing explicit deny statement while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Remove the inline policy containing the explicit deny for s3:DeleteObject from the contractor's IAM user.",
      "C. Enable multi-factor authentication on the IAM group so the group policy automatically supersedes user-level explicit denies.",
      "D. Place the IAM group inside a second nested IAM group with AdministratorAccess to bypass the explicit deny rule."
    ],
    "correctIdx": 1,
    "explanation": "Trong logic chấm điểm của IAM, một lệnh Explicit Deny luôn ghi đè (override) mọi lệnh Allow. Để user xóa được object, bắt buộc phải gỡ bỏ câu lệnh Explicit Deny đó và đảm bảo có lệnh Allow hợp lệ từ Group/Role.",
    "whyWrong": [
      "Thêm một lệnh Allow khác (dù là s3:*) không bao giờ ghi đè được lệnh Explicit Deny đang tồn tại.",
      null,
      "Bật MFA không làm thay đổi quy tắc Explicit Deny thắng mọi lệnh Allow của IAM.",
      "IAM Group không thể chứa một IAM Group khác (không hỗ trợ lồng nhau) và AdministratorAccess cũng không thắng được Explicit Deny."
    ],
    "tags": [
      "phase-1",
      "s1",
      "IAM Policy Evaluation Logic & Explicit Deny Override"
    ]
  },
  {
    "id": "x-p1-022",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-022, Phase 1 Session 2) focusing on IAM Access Advisor vs IAM Credentials Report. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-022 - Chặng 1, Buổi #2] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề IAM Access Advisor vs IAM Credentials Report. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Download the account-level IAM Credentials Report CSV file to view a per-role breakdown of every AWS service API call made in the last 180 days while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable AWS Secrets Manager automatic rotation on the IAM role to purge unused service permissions every 30 days.",
      "C. Review IAM Access Advisor on the specific IAM role to identify services with no recent last-accessed timestamps and remove those permissions.",
      "D. Run an Amazon Macie sensitive data discovery job against the IAM policy JSON documents stored in the account."
    ],
    "correctIdx": 2,
    "explanation": "IAM Access Advisor hiển thị danh sách các dịch vụ được cấp quyền cho một IAM Role/User kèm thời điểm truy cập gần nhất (Last accessed), giúp cắt tỉa quyền thừa theo nguyên tắc Least Privilege.",
    "whyWrong": [
      "IAM Credentials Report chỉ liệt kê trạng thái mật khẩu/Access Key/MFA của IAM Users ở cấp Account, không thống kê dịch vụ truy cập của IAM Role.",
      "Secrets Manager dùng để xoay vòng mật khẩu DB/API key, không tự động xóa quyền trong IAM Policy.",
      null,
      "Amazon Macie dùng để quét dữ liệu nhạy cảm PII trên S3, không kiểm toán quyền IAM."
    ],
    "tags": [
      "phase-1",
      "s2",
      "IAM Access Advisor vs IAM Credentials Report"
    ]
  },
  {
    "id": "x-p1-023",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      3
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-023, Phase 1 Session 3) focusing on EC2 User Data Automated First-Boot Bootstrapping. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-023 - Chặng 1, Buổi #3] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 User Data Automated First-Boot Bootstrapping. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Place the shell commands inside an Amazon S3 bucket policy attached to the application artifact bucket while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an EC2 Spread Placement Group to copy the web server binaries across Availability Zones during boot.",
      "C. Create an AWS Billing Alarm in CloudWatch to SSH into each new instance and install the packages manually.",
      "D. Supply a bash installation script in the EC2 User Data field of the launch template so it executes automatically as root on first boot."
    ],
    "correctIdx": 3,
    "explanation": "EC2 User Data cho phép truyền kịch bản khởi tạo (bootstrapping script) tự động chạy dưới quyền root ngay trong lần khởi động đầu tiên (first boot) của máy ảo EC2.",
    "whyWrong": [
      "S3 Bucket Policy là chính sách JSON kiểm soát quyền truy cập S3, không thể chạy script cài phần mềm trên EC2.",
      "Placement Group chỉ quy định vị trí phần cứng vật lý của EC2, không sao chép hay cài đặt phần mềm.",
      "Billing Alarm chỉ cảnh báo chi phí, không có khả năng SSH vào máy chủ để cài đặt gói tin.",
      null
    ],
    "tags": [
      "phase-1",
      "s3",
      "EC2 User Data Automated First-Boot Bootstrapping"
    ]
  },
  {
    "id": "x-p1-024",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      4
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-024, Phase 1 Session 4) focusing on Troubleshooting Connection Timeouts vs Connection Refused on EC2. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-024 - Chặng 1, Buổi #4] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Troubleshooting Connection Timeouts vs Connection Refused on EC2. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. A Connection Timed Out error indicates the Security Group or NACL silently dropped the packet, whereas Connection Refused means the packet reached the OS but the application is not listening.",
      "B. A Connection Timed Out error proves the web server daemon crashed inside Linux, whereas Connection Refused proves the IAM role expired while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Both errors are caused exclusively by expired Amazon Route 53 DNS records and require flushing the client browser cache.",
      "D. A Connection Refused error indicates that the EC2 instance lacks an Elastic IP address in a private subnet."
    ],
    "correctIdx": 0,
    "explanation": "Trong bài thi SAA-C03, lỗi 'Connection Timed Out' gần như luôn do tường lửa mạng (Security Group thiếu Inbound rule hoặc NACL chặn) âm thầm hủy gói tin. Ngược lại, 'Connection Refused' nghĩa là gói tin đã đi qua tường lửa tới được OS nhưng ứng dụng web chưa chạy hoặc lắng nghe sai cổng.",
    "whyWrong": [
      null,
      "Nếu daemon web bị tắt nhưng tường lửa mở, OS sẽ trả về gói RST báo Connection Refused chứ không phải Timed Out.",
      "Lỗi DNS thường báo không phân giải được tên miền (NXDOMAIN), không phải quy tắc phân biệt Timed Out và Refused của TCP.",
      "Thiếu Elastic IP sẽ khiến không có địa chỉ định tuyến hoặc bị chặn mạng (Timed Out), không trả về Connection Refused từ OS."
    ],
    "tags": [
      "phase-1",
      "s4",
      "Troubleshooting Connection Timeouts vs Connection Refused on EC2"
    ]
  },
  {
    "id": "x-p1-025",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      5
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-025, Phase 1 Session 5) focusing on Compute Savings Plans vs EC2 Instance Savings Plans Flexibility. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p1-025 - Chặng 1, Buổi #5] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Compute Savings Plans vs EC2 Instance Savings Plans Flexibility. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Purchase a Compute Savings Plan so the discount automatically applies across EC2 instance families, Regions, and AWS Fargate or AWS Lambda.",
      "B. Purchase Standard Reserved Instances locked to a single Availability Zone and a single x86 instance size with no ability to change families while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use EC2 Spot Instances with a maximum price cap for the stateful production database to guarantee zero interruptions.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Provision Dedicated Hosts for three years to automatically migrate containers to AWS Lambda without code changes."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "Compute Savings Plans mang lại sự linh hoạt cao nhất (giảm giá tới 66%), tự động áp dụng khi đổi dòng máy (C5 sang M6g), đổi Region, đổi OS, và áp dụng sang cả AWS Fargate lẫn AWS Lambda.",
    "whyWrong": [
      null,
      "Standard RI bị khóa chặt vào dòng máy và Region đã mua, không tự động áp dụng khi chuyển sang Fargate hoặc Lambda.",
      "Spot Instance có thể bị AWS thu hồi bất cứ lúc nào với thông báo trước 2 phút, tuyệt đối không dùng cho Database chính.",
      null,
      "Dedicated Hosts là máy chủ vật lý riêng biệt cho bài toán bản quyền BYOL, không giảm giá cho Fargate hay Lambda."
    ],
    "tags": [
      "phase-1",
      "s5",
      "Compute Savings Plans vs EC2 Instance Savings Plans Flexibility"
    ]
  },
  {
    "id": "x-p1-026",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      6
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p1-026, Phase 1 Session 6) focusing on Spread Placement Group for Critical Instances (Max 7 per AZ). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-026 - Chặng 1, Buổi #6] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Spread Placement Group for Critical Instances (Max 7 per AZ). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Place 50 instances per Availability Zone into a single Spread Placement Group to exceed the hardware isolation limit while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Place the 5 critical database instances into a Spread Placement Group so each instance runs on a distinct hardware rack with its own power and network.",
      "C. Place all 5 critical instances into a single Cluster Placement Group so they share the exact same physical rack.",
      "D. Attach five secondary Elastic Network Interfaces from different Availability Zones to a single EC2 instance."
    ],
    "correctIdx": 1,
    "explanation": "Spread Placement Group đảm bảo mỗi máy ảo EC2 nằm trên một tủ rack vật lý hoàn toàn khác nhau (có nguồn điện và mạng riêng), giảm tối đa rủi ro sập đồng thời cho số lượng ít các máy cực kỳ quan trọng (giới hạn tối đa 7 instances/AZ).",
    "whyWrong": [
      "Spread Placement Group có giới hạn cứng là tối đa 7 instances trên mỗi Availability Zone.",
      null,
      "Cluster Placement Group đặt tất cả máy lên cùng rack nên nếu rack đó mất điện, toàn bộ 5 máy sẽ sập cùng lúc.",
      "Một ENI chỉ gắn được cho máy EC2 nằm trong cùng một Availability Zone với nó."
    ],
    "tags": [
      "phase-1",
      "s6",
      "Spread Placement Group for Critical Instances (Max 7 per AZ)"
    ]
  },
  {
    "id": "x-p1-027",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      7
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-027, Phase 1 Session 7) focusing on AWS Nitro System & Nitro Enclaves for Isolated Sensitive Data Processing. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-027 - Chặng 1, Buổi #7] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề AWS Nitro System & Nitro Enclaves for Isolated Sensitive Data Processing. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use standard EC2 User Data scripts to create an unisolated root shell for processing plaintext credit card numbers while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Mount an Amazon EFS shared file system directly inside the Nitro Enclave over public internet sockets.",
      "C. Use AWS Nitro Enclaves to create an isolated, hardened compute environment with no persistent storage, no interactive SSH access, and no external networking.",
      "D. Disable the Nitro Security Chip so the guest operating system can write directly to the motherboard BIOS flash memory."
    ],
    "correctIdx": 2,
    "explanation": "AWS Nitro Enclaves giúp tách một phần CPU và RAM từ máy EC2 mẹ để tạo môi trường tính toán cô lập tuyệt đối (không ổ cứng bền vững, không mạng ngoài, không SSH), chỉ giao tiếp với máy mẹ qua kênh cục bộ vsock kèm xác thực mật mã ( cryptographic attestation).",
    "whyWrong": [
      "User Data chạy trực tiếp trên OS chính có quyền root và mạng đầy đủ, không tạo môi trường cô lập phần cứng.",
      "Nitro Enclave không có kết nối mạng bên ngoài hay lưu trữ bền vững, chỉ giao tiếp qua vsock với máy EC2 mẹ.",
      null,
      "Nitro Security Chip là thành phần bảo mật phần cứng cốt lõi của AWS, khách hàng không thể tắt để ghi vào BIOS."
    ],
    "tags": [
      "phase-1",
      "s7",
      "AWS Nitro System & Nitro Enclaves for Isolated Sensitive Data Processing"
    ]
  },
  {
    "id": "x-p1-028",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      8
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-028, Phase 1 Session 8) focusing on Migrating an EBS Volume Across Availability Zones via Snapshot. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-028 - Chặng 1, Buổi #8] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Migrating an EBS Volume Across Availability Zones via Snapshot. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Detach the EBS volume from the instance in us-east-1a and attach it directly to the target instance in us-east-1b via the console while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable EBS Multi-Attach on a gp3 volume to mount the volume across both us-east-1a and us-east-1b simultaneously.",
      "C. Configure an Amazon S3 Lifecycle rule on the active EBS block device to transition the blocks into us-east-1b.",
      "D. Create an Amazon EBS snapshot of the volume in us-east-1a, and then create a new EBS volume from that snapshot in us-east-1b."
    ],
    "correctIdx": 3,
    "explanation": "Ổ cứng EBS bị khóa chặt vào 1 Availability Zone (AZ-bound). Để chuyển dữ liệu EBS sang AZ khác (hoặc đổi loại/kích thước sang vùng khác), phải tạo EBS Snapshot (được lưu trên S3 liên AZ) rồi từ Snapshot đó khôi phục (Create Volume) tại AZ đích.",
    "whyWrong": [
      "Một ổ EBS ở us-east-1a tuyệt đối không thể gắn trực tiếp cho máy EC2 ở us-east-1b.",
      "EBS Multi-Attach chỉ hỗ trợ dòng io1/io2 và cũng chỉ hoạt động trong phạm vi CÙNG một Availability Zone.",
      "S3 Lifecycle chỉ áp dụng cho S3 objects, không áp dụng trực tiếp trên khối đĩa EBS đang chạy.",
      null
    ],
    "tags": [
      "phase-1",
      "s8",
      "Migrating an EBS Volume Across Availability Zones via Snapshot"
    ]
  },
  {
    "id": "x-p1-029",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      9
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-029, Phase 1 Session 9) focusing on EBS Multi-Attach (io1/io2 Only, Single AZ, Cluster-Aware File System). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-029 - Chặng 1, Buổi #9] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS Multi-Attach (io1/io2 Only, Single AZ, Cluster-Aware File System). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision an Amazon EBS Provisioned IOPS (io2) volume with Multi-Attach enabled in a single Availability Zone and use a cluster-aware file system.",
      "B. Enable EBS Multi-Attach on a standard gp3 volume across three Availability Zones using the default Linux ext4 file system while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Attach a single Throughput Optimized HDD (st1) volume simultaneously to 16 EC2 instances using standard NTFS.",
      "D. Share an ephemeral EC2 Instance Store NVMe drive directly across multiple EC2 hosts over the VPC route table."
    ],
    "correctIdx": 0,
    "explanation": "EBS Multi-Attach cho phép gắn cùng 1 ổ EBS vào tối đa 16 máy EC2 Linux trong CÙNG 1 Availability Zone. Tính năng này CHỈ hỗ trợ dòng io1/io2 và bắt buộc ứng dụng phải dùng hệ thống file nhận biết cụm (cluster-aware file system như GFS2, OCFS2), không dùng ext4/XFS thường.",
    "whyWrong": [
      null,
      "gp3 không hỗ trợ Multi-Attach, Multi-Attach không xuyên AZ và hệ thống file ext4 chuẩn sẽ làm hỏng dữ liệu khi ghi đồng thời.",
      "Ổ HDD st1 không hỗ trợ Multi-Attach và NTFS chuẩn không hỗ trợ ghi đồng thời nhiều máy chủ.",
      "Instance Store gắn vật lý vào đúng 1 máy chủ EC2 duy nhất, không thể chia sẻ qua mạng VPC."
    ],
    "tags": [
      "phase-1",
      "s9",
      "EBS Multi-Attach (io1/io2 Only, Single AZ, Cluster-Aware File System)"
    ]
  },
  {
    "id": "x-p1-030",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      10
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-030, Phase 1 Session 10) focusing on Amazon EFS Access Points for Application-Specific POSIX User & Root Directory Enforcement. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-030 - Chặng 1, Buổi #10] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EFS Access Points for Application-Specific POSIX User & Root Directory Enforcement. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision 20 separate Amazon EFS file systems and 60 VPC Peering connections for each microservice container while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create Amazon EFS Access Points configured with distinct POSIX user/group IDs and root directory paths, and enforce access via an EFS file system IAM policy.",
      "C. Use Amazon S3 Canned ACLs on the EFS mount targets to restrict Linux UID and GID permissions.",
      "D. Configure an Application Load Balancer listener rule to rewrite NFSv4 packet headers between containers."
    ],
    "correctIdx": 1,
    "explanation": "EFS Access Points là các điểm vào cấp ứng dụng giúp ép buộc (enforce) định danh POSIX user/group (UID/GID) và khóa từng container/microservice vào đúng một thư mục gốc riêng (chroot) trên cùng một hệ thống EFS chung.",
    "whyWrong": [
      "Tạo 20 hệ thống EFS riêng biệt gây tốn kém chi phí và phức tạp vận hành không cần thiết.",
      null,
      "S3 Canned ACL là cơ chế của Object Storage S3, không tồn tại trên hệ thống file EFS.",
      "ALB chỉ hoạt động ở tầng 7 (HTTP/HTTPS/gRPC), không thể định tuyến hay sửa gói tin NFSv4 (tầng 4 TCP 2049)."
    ],
    "tags": [
      "phase-1",
      "s10",
      "Amazon EFS Access Points for Application-Specific POSIX User & Root Directory Enforcement"
    ]
  },
  {
    "id": "x-p1-031",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p1-031. A financial enterprise is migrating its core Java applications to AWS using Amazon EC2 instances and Amazon RDS databases. During a security audit, the compliance officer asks the solutions architect to clarify which operational security tasks remain the customer's responsibility under the AWS Shared Responsibility Model. Which combination of tasks is the responsibility of the customer? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p1-031] Doanh nghiệp tài chính di chuyển ứng dụng Java lên AWS dùng EC2 và RDS. Khi kiểm toán, giám đốc tuân thủ yêu cầu làm rõ tác vụ nào thuộc trách nhiệm của khách hàng theo AWS Shared Responsibility Model. Tổ hợp tác vụ nào thuộc trách nhiệm của khách hàng? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Applying firmware updates to the underlying virtualization hypervisor and maintaining physical biometric access controls at Availability Zone data centers.",
      "B. Replacing faulty solid-state drives in the underlying Amazon EBS storage arrays and patching the managed host operating system for Amazon RDS.",
      "C. Patching the guest operating system on Amazon EC2 instances, configuring security group rules, and managing IAM user permissions.",
      "D. Maintaining the physical fiber-optic network backbone between AWS Regions and servicing HVAC cooling equipment inside server racks."
    ],
    "correctIdx": 2,
    "explanation": "Theo AWS Shared Responsibility Model, khách hàng chịu trách nhiệm Security IN the Cloud (vá lỗi Guest OS trên EC2, cấu hình Security Group, quản lý IAM). AWS chịu trách nhiệm Security OF the Cloud (vật lý, Hypervisor, phần cứng và OS của dịch vụ Managed).",
    "whyWrong": [
      "Cập nhật Hypervisor và kiểm soát sinh trắc học trung tâm dữ liệu vật lý thuộc trách nhiệm của AWS (Security OF the Cloud).",
      "Thay ổ cứng vật lý hỏng và vá lỗi host OS của dịch vụ Managed RDS thuộc trách nhiệm của AWS.",
      null,
      "Bảo trì cáp quang liên vùng và hệ thống làm mát phòng máy là trách nhiệm hạ tầng vật lý của AWS."
    ],
    "tags": [
      "phase-1",
      "s1",
      "AWS Shared Responsibility Model (Security OF vs IN the Cloud)"
    ]
  },
  {
    "id": "x-p1-032",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-032, Phase 1 Session 2) focusing on EC2 Instance Profile vs Hardcoded IAM Access Keys. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p1-032 - Chặng 1, Buổi #2] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Instance Profile vs Hardcoded IAM Access Keys. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Encode the static IAM access keys with Base64 and pass them through the EC2 User Data script during instance launch while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Revoke the exposed IAM access keys immediately and attach an IAM role with S3 permissions to the EC2 instance using an instance profile.",
      "C. Store the IAM user access keys inside a public S3 bucket and configure the application to fetch them at startup.",
      "D. Attach an AWS Shield Standard policy to the EC2 instance to hide the hardcoded credentials in the Git repository.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "Khi khóa tĩnh bị lộ, phải thu hồi/xóa ngay khóa đó và gắn IAM Role (thông qua Instance Profile) cho EC2 để SDK tự động lấy temporary credentials từ Instance Metadata Service.",
    "whyWrong": [
      "Mã hóa Base64 trong User Data vẫn là khóa dài hạn và dễ dàng bị đọc bởi bất kỳ ai truy cập được metadata.",
      null,
      "Lưu khóa trong S3 bucket công khai làm lộ thông tin xác thực ra toàn bộ Internet.",
      "AWS Shield chống tấn công DDoS tầng mạng, không xử lý được khóa tĩnh bị lộ trong mã nguồn.",
      null
    ],
    "tags": [
      "phase-1",
      "s2",
      "EC2 Instance Profile vs Hardcoded IAM Access Keys"
    ]
  },
  {
    "id": "x-p1-033",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      3
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-033, Phase 1 Session 3) focusing on Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-033 - Chặng 1, Buổi #3] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy the workers on Storage Optimized I3en instances provisioned with expensive local NVMe SSDs meant for NoSQL databases.",
      "B. Deploy the workers on X2gd Memory Optimized instances provisioned with terabytes of RAM that remain idle during CPU encoding.",
      "C. Deploy the workers on T3.nano burstable instances with unlimited mode disabled so CPU throttling occurs under sustained load.",
      "D. Deploy the video encoding workers on Compute Optimized EC2 instances (such as the C6i or C7g families)."
    ],
    "correctIdx": 3,
    "explanation": "Các bài toán tính toán CPU chuyên sâu như chuyển mã video (video encoding/transcoding), HPC, batch processing và gaming server phù hợp nhất với dòng Compute Optimized (họ C).",
    "whyWrong": [
      "Dòng I3en đắt đỏ vì ổ đĩa NVMe cục bộ tốc độ cao nhưng tác vụ nén video chỉ cần CPU chứ không cần IOPS đĩa lớn.",
      "Dòng X2gd đắt đỏ vì dung lượng RAM khổng lồ, gây lãng phí lớn khi tác vụ chỉ cần CPU.",
      "T3.nano tắt Unlimited sẽ bị bóp nghẹt CPU về mức baseline rất thấp ngay khi cạn CPU credit.",
      null
    ],
    "tags": [
      "phase-1",
      "s3",
      "Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding"
    ]
  },
  {
    "id": "x-p1-034",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      4
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-034, Phase 1 Session 4) focusing on Security Group Referencing between ALB and EC2 Tier. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-034 - Chặng 1, Buổi #4] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Security Group Referencing between ALB and EC2 Tier. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure the EC2 security group inbound rule to allow HTTP traffic exclusively from the security group ID of the Application Load Balancer.",
      "B. Configure the EC2 security group inbound rule to allow HTTP traffic from the hardcoded public IPv4 addresses of the ALB nodes while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Create a custom Network ACL rule that filters inbound packets using the public DNS hostname of the Application Load Balancer.",
      "D. Add an explicit deny rule inside the EC2 security group to block direct internet traffic while leaving port 80 open to 0.0.0.0/0."
    ],
    "correctIdx": 0,
    "explanation": "Vì IP của ALB thay đổi linh hoạt, chuẩn thiết kế bảo mật nhiều tầng là tham chiếu trực tiếp Security Group ID của ALB làm nguồn (Source) trong Inbound Rule của EC2 Security Group.",
    "whyWrong": [
      null,
      "IP của ALB thay đổi tự động khi co giãn nên việc cấu hình cứng theo địa chỉ IP sẽ làm đứt kết nối.",
      "Network ACL chỉ hiểu địa chỉ IP/CIDR block, không thể cấu hình lọc theo tên miền DNS.",
      "Security Group chỉ hỗ trợ quy tắc Allow (không có quy tắc Deny)."
    ],
    "tags": [
      "phase-1",
      "s4",
      "Security Group Referencing between ALB and EC2 Tier"
    ]
  },
  {
    "id": "x-p1-035",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      5
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-035, Phase 1 Session 5) focusing on EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-035 - Chặng 1, Buổi #5] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Launch the instances as EC2 Dedicated Instances, which expose physical socket counts while sharing hardware with other AWS accounts while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Launch the instances on EC2 Dedicated Hosts to gain visibility and control over the underlying physical processor sockets and cores.",
      "C. Use EC2 On-Demand Capacity Reservations in a shared tenancy subnet to satisfy physical core licensing audits.",
      "D. Deploy the workload on Spot Fleet instances across multiple Availability Zones to track physical motherboard serial numbers."
    ],
    "correctIdx": 1,
    "explanation": "Khi đề bài yêu cầu mang bản quyền phần mềm cũ tính theo số lượng lõi/socket vật lý (Server-bound licensing như Windows Server, SQL Server, Oracle BYOL) hoặc cần kiểm soát vị trí phần cứng vật lý, bắt buộc chọn EC2 Dedicated Hosts.",
    "whyWrong": [
      "Dedicated Instances tuy cô lập phần cứng theo tài khoản nhưng KHÔNG cho phép nhìn thấy số socket/core vật lý và có thể đổi máy vật lý khi reboot.",
      null,
      "Capacity Reservation trên phần cứng dùng chung (Shared tenancy) không đáp ứng yêu cầu kiểm toán socket vật lý.",
      "Spot Fleet chạy trên phần cứng dùng chung và có thể bị thu hồi bất ngờ."
    ],
    "tags": [
      "phase-1",
      "s5",
      "EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL)"
    ]
  },
  {
    "id": "x-p1-036",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      6
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p1-036, Phase 1 Session 6) focusing on Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-036 - Chặng 1, Buổi #6] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use a Spread Placement Group to deploy 40 Apache Kafka brokers inside a single Availability Zone while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use a Cluster Placement Group across three AWS Regions to isolate rack-level power failures automatically.",
      "C. Use a Partition Placement Group across multiple partitions so that a single hardware rack failure affects only one partition while preserving quorum.",
      "D. Move the private IPv4 address between Regions by detaching and reattaching an Elastic Network Interface across Availability Zones."
    ],
    "correctIdx": 2,
    "explanation": "Partition Placement Group chia các máy EC2 thành các phân vùng (tối đa 7 partitions/AZ), mỗi phân vùng nằm trên các tủ rack riêng và hỗ trợ hàng trăm máy EC2, rất lý tưởng cho HDFS, HBase, Cassandra và Apache Kafka.",
    "whyWrong": [
      "Spread Placement Group chỉ cho phép tối đa 7 máy trên mỗi AZ nên không thể chứa 40 máy trong 1 AZ.",
      "Cluster Placement Group chỉ nằm trong 1 AZ đơn lẻ và không cô lập lỗi phần cứng giữa các máy.",
      null,
      "ENI bị ràng buộc cứng vào 1 Availability Zone, không thể tháo ra gắn sang AZ khác hay Region khác."
    ],
    "tags": [
      "phase-1",
      "s6",
      "Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra)"
    ]
  },
  {
    "id": "x-p1-037",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      7
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-037, Phase 1 Session 7) focusing on EC2 Hibernate Prerequisites & Fast Warm-Cache Startup. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-037 - Chặng 1, Buổi #7] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Hibernate Prerequisites & Fast Warm-Cache Startup. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable EC2 Hibernate on an instance backed solely by an unencrypted ephemeral EC2 Instance Store root volume while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure EC2 Hibernate on an instance with 512 GB of system RAM to bypass the 150 GB maximum RAM limit for hibernation.",
      "C. Keep the instance in the hibernated state continuously for 180 days without booting it to avoid EBS storage charges.",
      "D. Enable EC2 Hibernate on an instance backed by an encrypted root Amazon EBS volume that has sufficient space to store the contents of RAM."
    ],
    "correctIdx": 3,
    "explanation": "EC2 Hibernate lưu toàn bộ dữ liệu trên bộ nhớ RAM xuống ổ đĩa Root EBS trước khi tắt máy để khi bật lại cache vẫn còn nguyên. Điều kiện bắt buộc: ổ Root phải là EBS đã bật mã hóa (Encrypted), đủ dung lượng chứa RAM, RAM < 150 GB và thời gian ngủ đông tối đa 60 ngày.",
    "whyWrong": [
      "EC2 Hibernate bắt buộc ổ Root phải là EBS và bắt buộc phải bật mã hóa (Encrypted) để bảo vệ dữ liệu nhạy cảm từ RAM.",
      "EC2 Hibernate chỉ hỗ trợ các máy có dung lượng RAM dưới 150 GB.",
      "Một máy EC2 không được ở trạng thái Hibernate quá 60 ngày liên tục, và trong lúc ngủ đông vẫn tính phí lưu trữ EBS.",
      null
    ],
    "tags": [
      "phase-1",
      "s7",
      "EC2 Hibernate Prerequisites & Fast Warm-Cache Startup"
    ]
  },
  {
    "id": "x-p1-038",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      8
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-038, Phase 1 Session 8) focusing on EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-038 - Chặng 1, Buổi #8] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable Amazon EBS Fast Snapshot Restore (FSR) on the snapshot before creating the new volume to eliminate initialization latency.",
      "B. Move the snapshot to the Amazon EBS Snapshot Archive tier so blocks are hydrated instantly with zero restore latency while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Copy the snapshot into the Recycle Bin for EBS Snapshots to accelerate block-level I/O performance.",
      "D. Change the target volume type to Cold HDD (sc1) so all blocks are pre-warmed in NVMe memory upon creation."
    ],
    "correctIdx": 0,
    "explanation": "Mặc định ổ EBS tạo từ Snapshot sẽ tải dữ liệu lười (Lazy loading) từ S3 nên lần đọc đầu tiên vào mỗi block sẽ bị trễ. Để đạt 100% hiệu năng IOPS ngay lập tức mà không cần chạy lệnh dd/fio làm nóng ổ, ta bật tính năng EBS Fast Snapshot Restore (FSR).",
    "whyWrong": [
      null,
      "EBS Snapshot Archive là tầng lưu trữ lạnh giá rẻ nhưng mất tới 24–72 giờ để khôi phục lại.",
      "Recycle Bin chỉ dùng để giữ lại các Snapshot bị xóa nhầm chống mất dữ liệu, không tăng tốc độ đọc.",
      "Cold HDD (sc1) là ổ đĩa từ tốc độ thấp nhất và vẫn chịu hiệu ứng lazy loading từ Snapshot."
    ],
    "tags": [
      "phase-1",
      "s8",
      "EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty"
    ]
  },
  {
    "id": "x-p1-039",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      9
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-039, Phase 1 Session 9) focusing on EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p1-039 - Chặng 1, Buổi #9] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Store the long-term master financial ledger exclusively on EC2 Instance Store volumes and stop the instances every night to save money while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Cold HDD (sc1) EBS volumes to achieve over 300,000 random IOPS for the real-time scratch cache.",
      "C. Use EC2 instances equipped with local NVMe Instance Store volumes for the temporary scratch data while writing final results to Amazon S3.",
      "D. Use an Amazon S3 Glacier Deep Archive vault mounted as a block device for microsecond scratch disk operations.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "Khi bài toán cần tốc độ đọc/ghi đĩa cực khủng (hàng trăm nghìn tới hàng triệu IOPS, độ trễ cực thấp) cho dữ liệu tạm thời (scratch data, buffer, cache, temp files có thể tái tạo được), giải pháp tốt nhất là ổ đĩa gắn trực tiếp vào máy chủ vật lý EC2 Instance Store (NVMe).",
    "whyWrong": [
      "Dữ liệu trên Instance Store sẽ bị xóa sạch hoàn toàn nếu máy EC2 bị Stop hoặc phần cứng vật lý gặp sự cố.",
      "Cold HDD (sc1) là ổ đĩa từ chậm nhất, không thể cung cấp hàng trăm nghìn IOPS ngẫu nhiên.",
      null,
      "S3 Glacier Deep Archive là lưu trữ đối tượng băng từ lấy lại sau 12–48 giờ, không phải ổ đĩa block tốc độ cao.",
      null
    ],
    "tags": [
      "phase-1",
      "s9",
      "EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence"
    ]
  },
  {
    "id": "x-p1-040",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      10
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-040, Phase 1 Session 10) focusing on Amazon EFS Shared POSIX File System Across Multiple Availability Zones. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-040 - Chặng 1, Buổi #10] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EFS Shared POSIX File System Across Multiple Availability Zones. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create a single Amazon EBS gp3 volume and enable Multi-Attach across all three Availability Zones while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Create an Amazon EFS file system with mount targets in each Availability Zone so all Linux EC2 instances can mount it concurrently over NFSv4.",
      "C. Mount an Amazon S3 bucket directly as a POSIX kernel block device with file-locking support without third-party adapters.",
      "D. Use EC2 Instance Store volumes on each server and rely on AWS hardware to synchronize files across Availability Zones."
    ],
    "correctIdx": 1,
    "explanation": "Khi nhiều máy EC2 Linux chạy trên nhiều Availability Zones cần dùng chung một hệ thống file chia sẻ (Shared File System) chuẩn POSIX/NFSv4 và tự động co giãn dung lượng, đáp án chuẩn luôn là Amazon EFS.",
    "whyWrong": [
      "EBS gp3 không hỗ trợ Multi-Attach và EBS cũng không thể gắn xuyên qua nhiều Availability Zones.",
      null,
      "S3 là Object Storage truy cập qua REST API, không phải hệ thống file POSIX hỗ trợ gắn mount trực tiếp kèm khóa file (file locking).",
      "Instance Store là ổ đĩa cục bộ cô lập trên từng máy, AWS không tự động đồng bộ nội dung giữa các máy."
    ],
    "tags": [
      "phase-1",
      "s10",
      "Amazon EFS Shared POSIX File System Across Multiple Availability Zones"
    ]
  },
  {
    "id": "x-p1-041",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p1-041. An e-commerce company is conducting an AWS Well-Architected Framework review of its cloud platform. The executive board wants to minimize the environmental impact and energy consumption of its workloads per user transaction. Which pillar of the AWS Well-Architected Framework and corresponding engineering practices directly address this goal? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p1-041] Công ty thương mại điện tử thực hiện rà soát hệ thống theo khung AWS Well-Architected Framework và muốn giảm thiểu tác động môi trường cũng như mức tiêu thụ năng lượng trên mỗi giao dịch. Trụ cột nào của AWS Well-Architected Framework và giải pháp nào đáp ứng trực tiếp mục tiêu này? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. The Operational Excellence pillar, by deploying redundant NAT Gateways across three Availability Zones without changing instance architectures while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. The Reliability pillar, by retaining uncompressed application debug logs indefinitely in Amazon S3 Standard across multiple AWS Regions.",
      "C. The Sustainability pillar, by migrating compute workloads to AWS Graviton processors and configuring S3 Lifecycle rules to expire unneeded data.",
      "D. The Security pillar, by provisioning dedicated physical hosts at maximum CPU utilization 24/7 regardless of actual user traffic demand."
    ],
    "correctIdx": 2,
    "explanation": "Trụ cột thứ 6 của AWS Well-Architected Framework là Sustainability (Tính bền vững), tập trung tối ưu hóa hiệu suất năng lượng, chuyển sang chip AWS Graviton tiết kiệm điện và xóa dữ liệu dư thừa qua S3 Lifecycle để giảm dấu chân carbon.",
    "whyWrong": [
      "Operational Excellence tập trung vào tự động hóa vận hành và quy trình, không phải mục tiêu giảm tiêu thụ năng lượng môi trường.",
      "Giữ log không nén vĩnh viễn trên nhiều Region gây lãng phí tài nguyên lưu trữ, đi ngược lại trụ cột Sustainability.",
      null,
      "Chạy máy chủ vật lý công suất tối đa 24/7 khi không có tải gây lãng phí điện năng nghiêm trọng."
    ],
    "tags": [
      "phase-1",
      "s1",
      "AWS Well-Architected Framework 6 Pillars (Sustainability Pillar)"
    ]
  },
  {
    "id": "x-p1-042",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-042, Phase 1 Session 2) focusing on Cross-Account Access via IAM Role and AWS STS AssumeRole. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-042 - Chặng 1, Buổi #2] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Cross-Account Access via IAM Role and AWS STS AssumeRole. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Create duplicate IAM users with identical passwords inside every Production account and synchronize them manually each week while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Place the Production AWS account inside an IAM Group located in the Security account so permissions are inherited automatically.",
      "C. Share the Production account root user access keys with the security team over an encrypted email attachment.",
      "D. Create an IAM role in the Production account with a trust policy trusting the Security account, and allow security analysts to call sts:AssumeRole."
    ],
    "correctIdx": 3,
    "explanation": "Để cấp quyền Cross-Account an toàn không cần tạo IAM User trùng lặp, ta tạo IAM Role ở tài khoản đích (Production) tin tưởng tài khoản nguồn (Security) qua Trust Policy và dùng lệnh sts:AssumeRole.",
    "whyWrong": [
      "Tạo IAM User trùng lặp ở nhiều tài khoản tốn công vận hành và vi phạm nguyên tắc quản lý định danh tập trung.",
      "IAM Group chỉ chứa IAM Users trong phạm vi 1 tài khoản, không thể chứa các AWS Accounts.",
      "Tạo và chia sẻ Root Access Key vi phạm nghiêm trọng nguyên tắc bảo mật tối kỵ của AWS.",
      null
    ],
    "tags": [
      "phase-1",
      "s2",
      "Cross-Account Access via IAM Role and AWS STS AssumeRole"
    ]
  },
  {
    "id": "x-p1-043",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      3
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-043, Phase 1 Session 3) focusing on Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-043 - Chặng 1, Buổi #3] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Select Memory Optimized Amazon EC2 instances (such as the R7g or X2idn instance families) designed for high memory-to-vCPU ratios.",
      "B. Select Compute Optimized instances (C7g family) designed primarily for CPU-bound batch processing and media transcoding while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Select General Purpose burstable instances (T4g.micro) operating on baseline CPU credits without high memory capacity.",
      "D. Select Storage Optimized instances (D3en family) equipped with sequential spinning hard disk drives for cold archiving."
    ],
    "correctIdx": 0,
    "explanation": "Dòng máy Memory Optimized (họ R, X, High Memory) được thiết kế chuyên cho các cơ sở dữ liệu trong bộ nhớ RAM (In-memory caches như Redis, SAP HANA, real-time big data analytics).",
    "whyWrong": [
      null,
      "Họ C tối ưu cho tốc độ CPU tính toán nặng, có tỷ lệ RAM/vCPU thấp hơn dòng R/X.",
      "Họ T4g.micro chỉ có lượng RAM rất nhỏ và dùng CPU credit, không thể chạy SAP HANA hay Redis lớn.",
      "Họ D tối ưu cho ổ cứng tuần tự HDD dung lượng cao, không tối ưu bộ nhớ RAM."
    ],
    "tags": [
      "phase-1",
      "s3",
      "Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads"
    ]
  },
  {
    "id": "x-p1-044",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      4
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-044, Phase 1 Session 4) focusing on Stateful Nature of Security Groups vs Ephemeral Return Ports. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-044 - Chặng 1, Buổi #4] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Stateful Nature of Security Groups vs Ephemeral Return Ports. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Security groups are stateless, so the administrator must manually open outbound ephemeral ports 1024-65535 for responses to succeed while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Security groups are stateful, so return traffic for an allowed inbound HTTP request is automatically permitted regardless of outbound rules.",
      "C. Security groups evaluate rules in numerical order from lowest to highest rule number before permitting return packets.",
      "D. Security groups automatically rewrite the destination port of blocked outbound packets to port 443 through the Internet Gateway."
    ],
    "correctIdx": 1,
    "explanation": "Security Group hoạt động theo cơ chế Stateful (Có trạng thái): một khi kết nối đã được cho phép đi vào (Inbound), luồng gói tin phản hồi của kết nối đó tự động được phép đi ra bất kể bảng Outbound rules ra sao.",
    "whyWrong": [
      "Stateless là đặc điểm của Network ACL (NACL), không phải của Security Group.",
      null,
      "Đánh số thứ tự rule và xét từ nhỏ đến lớn là cơ chế của Network ACL; Security Group gộp tất cả các rule Allow lại.",
      "Security Group không tự động viết lại cổng đích của gói tin."
    ],
    "tags": [
      "phase-1",
      "s4",
      "Stateful Nature of Security Groups vs Ephemeral Return Ports"
    ]
  },
  {
    "id": "x-p1-045",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      5
    ],
    "difficulty": "hard",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-045, Phase 1 Session 5) focusing on EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-045 - Chặng 1, Buổi #5] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use On-Demand Instances exclusively with no commitment discounts to achieve the lowest possible compute price while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Purchase 3-year All Upfront Standard Reserved Instances for a one-time 48-hour genomics simulation job.",
      "C. Use Amazon EC2 Spot Instances managed by an Auto Scaling group or Spot Fleet to achieve up to a 90% cost reduction.",
      "D. Deploy the stateless batch workers on Dedicated Hosts to minimize hourly compute expenses."
    ],
    "correctIdx": 2,
    "explanation": "Với các tác vụ xử lý lô (batch processing), phân tích dữ liệu hoặc render hình ảnh có khả năng chịu lỗi (fault-tolerant, stateless) và chấp nhận gián đoạn (2-minute interruption notice), EC2 Spot Instances giúp tiết kiệm tới 90% chi phí.",
    "whyWrong": [
      "On-Demand có mức giá cao nhất theo giờ, không tối ưu chi phí cho tải batch chịu lỗi.",
      "Mua RI cam kết 3 năm cho một tác vụ chỉ chạy ngắn hạn gây lãng phí tiền nghiêm trọng.",
      null,
      "Dedicated Hosts là hình thức đắt đỏ nhất, chỉ dùng khi bắt buộc bởi giấy phép phần mềm vật lý."
    ],
    "tags": [
      "phase-1",
      "s5",
      "EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads"
    ]
  },
  {
    "id": "x-p1-046",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      6
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p1-046, Phase 1 Session 6) focusing on Cluster Placement Group for Low-Latency 100 Gbps HPC Networking. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p1-046 - Chặng 1, Buổi #6] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Cluster Placement Group for Low-Latency 100 Gbps HPC Networking. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Launch the instances inside a Cluster Placement Group within a single Availability Zone using Enhanced Networking (ENA).",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Launch the instances inside a Spread Placement Group distributed across three separate AWS Regions while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Launch the instances inside a Partition Placement Group spanning multiple Availability Zones with standard public IP routing.",
      "E. Attach multiple Elastic IP addresses to each instance and route HPC packets through a public NAT Gateway."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "Cluster Placement Group gom các máy EC2 vào sát nhau trên cùng hệ thống rack trong 1 Availability Zone, mang lại độ trễ mạng cực thấp (low latency) và băng thông mạng tối đa cho bài toán HPC.",
    "whyWrong": [
      null,
      null,
      "Spread Placement Group tách các máy ra các rack khác nhau và giới hạn tối đa 7 máy/AZ, không tối ưu độ trễ cực thấp cho cụm HPC lớn.",
      "Partition Placement Group dành cho hệ thống phân tán lớn (HDFS, Kafka, Cassandra) chống lỗi theo phân vùng rack.",
      "Định tuyến qua Elastic IP và NAT Gateway làm tăng độ trễ và phát sinh phí truyền dữ liệu không cần thiết."
    ],
    "tags": [
      "phase-1",
      "s6",
      "Cluster Placement Group for Low-Latency 100 Gbps HPC Networking"
    ]
  },
  {
    "id": "x-p1-047",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      7
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-047, Phase 1 Session 7) focusing on EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p1-047 - Chặng 1, Buổi #7] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Stopping an EC2 instance releases its private IPv4 address inside the VPC subnet and deletes all attached Amazon EBS volumes while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Hibernating an EC2 instance continues to bill for hourly vCPU compute capacity at the full On-Demand rate while powered down.",
      "C. Rebooting an EC2 instance assigns a brand-new private IPv4 address and triggers a minimum one-hour billing increment reset.",
      "D. Stopping or hibernating an EBS-backed instance stops compute (vCPU/RAM) billing while retaining the private IPv4 address and continuing EBS volume charges."
    ],
    "correctIdx": 3,
    "explanation": "Khi Stop hoặc Hibernate máy EC2 (EBS-backed), AWS ngừng tính tiền Compute (EC2), giữ nguyên địa chỉ Private IPv4 (và Public IP nếu là Elastic IP), nhưng vẫn tính phí dung lượng ổ cứng EBS đang lưu trữ.",
    "whyWrong": [
      "Khi Stop máy EC2, địa chỉ Private IPv4 vẫn được giữ nguyên (chỉ có Public IPv4 động mới bị thu hồi).",
      "Khi máy đã vào trạng thái Hibernated (Stopped), AWS không tính phí vCPU/RAM mà chỉ tính phí lưu trữ EBS.",
      "Reboot máy EC2 giữ nguyên toàn bộ địa chỉ Private IP, Public IP và dữ liệu trên cả Instance Store.",
      null
    ],
    "tags": [
      "phase-1",
      "s7",
      "EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior"
    ]
  },
  {
    "id": "x-p1-048",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      8
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p1-048, Phase 1 Session 8) focusing on EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-048 - Chặng 1, Buổi #8] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Move the rarely accessed compliance snapshots to the Amazon EBS Snapshot Archive tier to reduce snapshot storage costs by up to 75%.",
      "B. Enable EBS Fast Snapshot Restore on all 500 historical snapshots to minimize monthly storage billing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Convert the snapshots into provisioned IOPS io2 Block Express volumes and leave them unattached in the account.",
      "D. Store the EBS snapshots inside an unencrypted EC2 Instance Store volume for long-term 7-year retention."
    ],
    "correctIdx": 0,
    "explanation": "Với các bản EBS Snapshot cần lưu trữ dài hạn (>= 90 ngày) hiếm khi khôi phục và chấp nhận thời gian lấy lại 24–72 giờ, chuyển sang EBS Snapshot Archive giúp tiết kiệm tới 75% chi phí lưu trữ.",
    "whyWrong": [
      null,
      "Fast Snapshot Restore tính phí rất cao theo giờ cho mỗi Snapshot/AZ để giữ ổ luôn nóng, làm tăng vọt chi phí.",
      "Tạo ổ io2 thật từ Snapshot sẽ tốn chi phí lưu trữ và IOPS đắt gấp nhiều lần so với giữ ở dạng Snapshot.",
      "Instance Store là ổ tạm mất sạch dữ liệu khi tắt máy, không thể lưu trữ kiểm toán dài hạn."
    ],
    "tags": [
      "phase-1",
      "s8",
      "EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore)"
    ]
  },
  {
    "id": "x-p1-049",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      9
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p1-049, Phase 1 Session 9) focusing on EBS gp3 Independent IOPS/Throughput Tuning vs io2 for >16,000 IOPS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p1-049 - Chặng 1, Buổi #9] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề EBS gp3 Independent IOPS/Throughput Tuning vs io2 for >16,000 IOPS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Use a single Amazon EBS General Purpose SSD (gp3) volume, which is capped at a maximum of 16,000 IOPS per volume while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Amazon EBS Provisioned IOPS SSD (io2 Block Express) volumes, which support up to 256,000 IOPS and sub-millisecond latency.",
      "C. Use Amazon EBS Throughput Optimized HDD (st1) as the boot volume and primary random-I/O database disk.",
      "D. Use Amazon EBS Cold HDD (sc1) volumes to achieve 64,000 random IOPS at the lowest cost."
    ],
    "correctIdx": 1,
    "explanation": "Ổ gp3 cho phép cấu hình độc lập IOPS và Throughput nhưng giới hạn tối đa là 16,000 IOPS và 1,000 MB/s. Khi cơ sở dữ liệu yêu cầu hiệu năng vượt mốc 16,000 IOPS (tới 64,000 IOPS trên Nitro hoặc 256,000 IOPS với io2 Block Express) kèm độ bền 99.999%, bắt buộc phải dùng dòng io1/io2.",
    "whyWrong": [
      "Một ổ gp3 đơn lẻ chỉ đạt tối đa 16,000 IOPS, không đáp ứng được yêu cầu > 64,000 IOPS.",
      null,
      "Ổ HDD (st1/sc1) không thể làm Boot Volume và không phù hợp cho cơ sở dữ liệu OLTP cần random IOPS cao.",
      "Cold HDD (sc1) chỉ đạt tối đa vài trăm IOPS cho dữ liệu tuần tự ít truy cập."
    ],
    "tags": [
      "phase-1",
      "s9",
      "EBS gp3 Independent IOPS/Throughput Tuning vs io2 for >16,000 IOPS"
    ]
  },
  {
    "id": "x-p1-050",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      10
    ],
    "difficulty": "medium",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p1-050, Phase 1 Session 10) focusing on Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p1-050 - Chặng 1, Buổi #10] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Switch the EFS file system to Max I/O performance mode to reduce monthly gigabyte storage charges by 90% while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Migrate the active Linux POSIX shared directories to Amazon S3 Glacier Deep Archive while keeping NFSv4 mount points unchanged.",
      "C. Enable EFS Lifecycle Management to automatically transition files not accessed for 30 days to the EFS Infrequent Access (EFS IA) storage class.",
      "D. Delete the EFS mount targets in two of the three Availability Zones to reduce the total stored data volume."
    ],
    "correctIdx": 2,
    "explanation": "Để tối ưu chi phí cho Amazon EFS khi có nhiều file cũ ít đọc tới, bật EFS Lifecycle Management sẽ tự động chuyển các file không truy cập sau N ngày (7, 14, 30, 60, 90 ngày) sang tầng EFS Standard-IA hoặc One Zone-IA, tiết kiệm tới ~92% phí lưu trữ mà ứng dụng vẫn đọc/ghi trong suốt.",
    "whyWrong": [
      "Max I/O là chế độ hiệu năng (tăng tổng IOPS nhưng độ trễ mỗi thao tác cao hơn General Purpose), hoàn toàn không giảm giá lưu trữ.",
      "S3 Glacier Deep Archive không hỗ trợ gắn kết qua giao thức NFSv4 trực tiếp cho ứng dụng POSIX.",
      null,
      "Xóa Mount Target chỉ làm mất kết nối mạng từ AZ đó tới EFS chứ không giảm dung lượng dữ liệu lưu trữ."
    ],
    "tags": [
      "phase-1",
      "s10",
      "Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA)"
    ]
  },
  {
    "id": "x-p1-051",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "qEn": "A multinational retail banking institution is modernizing its cloud infrastructure for production case x-p1-051. A contractor belongs to the BackendDevs IAM group which grants Allow permissions for all Amazon S3 actions. However, an inline policy attached to the contractor's IAM user contains an Explicit Deny for s3:DeleteObject on the production bucket. Now the contractor legitimately needs to delete obsolete objects from that bucket. Which TWO actions must the solutions architect take? Additionally, the engineering team requires strict adherence to AWS Well-Architected best practices across Availability Zones while maintaining auditability and predictable operational performance.",
    "qVi": "[Mã đề x-p1-051] Một nhân viên thuộc IAM Group BackendDevs có quyền Allow toàn bộ S3, nhưng bị gắn thêm Inline Policy có lệnh Explicit Deny đối với s3:DeleteObject. Hiện tại nhân viên này cần quyền xóa file hợp lệ trên bucket đó. Kiến trúc sư cần thực hiện HAI hành động nào? Ngoài ra, hệ thống cần tuân thủ khung AWS Well-Architected trên nhiều Availability Zone với chi phí vận hành thấp nhất.",
    "options": [
      "A. Add a second inline policy with s3:* Allow to the IAM user to override the existing explicit deny statement while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable multi-factor authentication on the IAM group so the group policy automatically supersedes user-level explicit denies.",
      "C. Place the IAM group inside a second nested IAM group with AdministratorAccess to bypass the explicit deny rule.",
      "D. Remove the inline policy containing the explicit deny for s3:DeleteObject from the contractor's IAM user."
    ],
    "correctIdx": 3,
    "explanation": "Trong logic chấm điểm của IAM, một lệnh Explicit Deny luôn ghi đè (override) mọi lệnh Allow. Để user xóa được object, bắt buộc phải gỡ bỏ câu lệnh Explicit Deny đó và đảm bảo có lệnh Allow hợp lệ từ Group/Role.",
    "whyWrong": [
      "Thêm một lệnh Allow khác (dù là s3:*) không bao giờ ghi đè được lệnh Explicit Deny đang tồn tại.",
      "Bật MFA không làm thay đổi quy tắc Explicit Deny thắng mọi lệnh Allow của IAM.",
      "IAM Group không thể chứa một IAM Group khác (không hỗ trợ lồng nhau) và AdministratorAccess cũng không thắng được Explicit Deny.",
      null
    ],
    "tags": [
      "phase-1",
      "s1",
      "IAM Policy Evaluation Logic & Explicit Deny Override"
    ]
  },
  {
    "id": "x-p1-052",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p1-052, Phase 1 Session 2) focusing on IAM Access Advisor vs IAM Credentials Report. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p1-052 - Chặng 1, Buổi #2] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề IAM Access Advisor vs IAM Credentials Report. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Review IAM Access Advisor on the specific IAM role to identify services with no recent last-accessed timestamps and remove those permissions.",
      "B. Download the account-level IAM Credentials Report CSV file to view a per-role breakdown of every AWS service API call made in the last 180 days while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Enable AWS Secrets Manager automatic rotation on the IAM role to purge unused service permissions every 30 days.",
      "D. Run an Amazon Macie sensitive data discovery job against the IAM policy JSON documents stored in the account."
    ],
    "correctIdx": 0,
    "explanation": "IAM Access Advisor hiển thị danh sách các dịch vụ được cấp quyền cho một IAM Role/User kèm thời điểm truy cập gần nhất (Last accessed), giúp cắt tỉa quyền thừa theo nguyên tắc Least Privilege.",
    "whyWrong": [
      null,
      "IAM Credentials Report chỉ liệt kê trạng thái mật khẩu/Access Key/MFA của IAM Users ở cấp Account, không thống kê dịch vụ truy cập của IAM Role.",
      "Secrets Manager dùng để xoay vòng mật khẩu DB/API key, không tự động xóa quyền trong IAM Policy.",
      "Amazon Macie dùng để quét dữ liệu nhạy cảm PII trên S3, không kiểm toán quyền IAM."
    ],
    "tags": [
      "phase-1",
      "s2",
      "IAM Access Advisor vs IAM Credentials Report"
    ]
  },
  {
    "id": "x-p2-001",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      11
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-001, Phase 2 Session 11) focusing on ALB Path-Based & Host-Based Routing for Microservices. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-001 - Chặng 2, Buổi #11] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ALB Path-Based & Host-Based Routing for Microservices. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy a single Application Load Balancer (ALB) and configure listener rules for host-based and path-based routing to separate target groups.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "Application Load Balancer (ALB) hoạt động ở tầng 7 (HTTP/HTTPS), hỗ trợ định tuyến thông minh theo đường dẫn URL (Path-based), tên miền (Host-based), Query string và HTTP Header về các Target Group khác nhau chỉ với 1 bộ cân bằng tải duy nhất.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s11",
      "ALB Path-Based & Host-Based Routing for Microservices"
    ]
  },
  {
    "id": "x-p2-002",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      4,
      12
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-002, Phase 2 Session 12) focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-002 - Chặng 2, Buổi #12] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy a Gateway Load Balancer (GWLB) with Gateway Load Balancer endpoints to transparently inspect traffic through the firewall fleet using GENEVE on port 6081.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Khi đề bài yêu cầu chèn một dàn thiết bị bảo mật ảo bên thứ 3 (Third-party virtual network appliances như Palo Alto, Fortinet, Suricata IDS/IPS) để kiểm tra toàn bộ gói tin trong suốt, đáp án luôn là Gateway Load Balancer (GWLB) dùng giao thức GENEVE cổng 6081.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s12",
      "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
    ]
  },
  {
    "id": "x-p2-003",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      13
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-003, Phase 2 Session 13) focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-003 - Chặng 2, Buổi #13] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Use Server Name Indication (SNI) on a single Application Load Balancer HTTPS listener to bind multiple SSL/TLS certificates for different domains.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Tính năng SNI (Server Name Indication) cho phép gắn hàng chục chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên CÙNG MỘT cổng HTTPS listener của ALB hoặc NLB (và cả CloudFront) mà không cần thuê nhiều Load Balancer.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s13",
      "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
    ]
  },
  {
    "id": "x-p2-004",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      10,
      14
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-004, Phase 2 Session 14) focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-004 - Chặng 2, Buổi #14] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Configure the Target Group Deregistration Delay (Connection Draining) timeout to allow in-flight requests to complete before the instance terminates."
    ],
    "correctIdx": 3,
    "explanation": "Deregistration Delay (Connection Draining) ngừng gửi kết nối mới vào máy EC2 sắp bị thu hồi và chờ các request đang xử lý dở (in-flight requests) hoàn tất trong khoảng thời gian cấu hình (mặc định 300s, từ 1–3600s) trước khi Terminate máy.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-2",
      "s14",
      "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
    ]
  },
  {
    "id": "x-p2-005",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      15
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-005, Phase 2 Session 15) focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-005 - Chặng 2, Buổi #15] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable S3 Versioning on both the source and destination buckets, configure an IAM replication role, and use S3 Batch Replication to copy existing objects.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Để dùng S3 Replication (CRR hoặc SRR), BẮT BUỘC phải bật S3 Versioning trên cả Bucket nguồn và Bucket đích. Lưu ý: CRR/SRR mặc định chỉ nhân bản các file tải lên SAU khi bật rule; muốn chép các file đã có sẵn từ trước phải dùng S3 Batch Replication.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s15",
      "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
    ]
  },
  {
    "id": "x-p2-006",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      6,
      16
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-006, Phase 2 Session 16) focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-006 - Chặng 2, Buổi #16] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an S3 Lifecycle rule to transition objects to S3 Standard-IA after 30 days and then to S3 Glacier Deep Archive after 180 days.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Trong S3 Lifecycle, một object phải nằm ở S3 Standard ít nhất 30 ngày trước khi chuyển sang Standard-IA,One Zone-IA hoặc Intelligent-Tiering. Lưu ý thời gian lưu tối thiểu: IA/Intelligent (30 ngày), Glacier Instant/Flexible (90 ngày), Deep Archive (180 ngày).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s16",
      "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
    ]
  },
  {
    "id": "x-p2-007",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      17
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-007, Phase 2 Session 17) focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-007 - Chặng 2, Buổi #17] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Enable S3 Transfer Acceleration to route uploads through Amazon CloudFront edge locations over the AWS global backbone, combined with Multi-Part Upload.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Để tăng tốc tải file lớn từ khắp nơi trên thế giới về 1 S3 Bucket: dùng S3 Transfer Acceleration (đi qua CloudFront Edge Locations vào mạng cáp quang nội bộ AWS) kết hợp S3 Multi-Part Upload (chia nhỏ file tải song song, bắt buộc cho file > 5 GB).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s17",
      "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
    ]
  },
  {
    "id": "x-p2-008",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      2,
      18
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-008, Phase 2 Session 18) focusing on S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-008 - Chặng 2, Buổi #18] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enforce Server-Side Encryption with AWS KMS keys (SSE-KMS) using a customer managed key so every decryption call is logged in AWS CloudTrail.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "S3 mặc định mã hóa mọi object mới bằng SSE-S3 (AES-256). Khi kiểm toán yêu cầu kiểm soát quyền xoay vòng khóa (Key Rotation), phân quyền tách biệt qua Key Policy và ghi nhật ký từng lần giải mã trong AWS CloudTrail, bắt buộc dùng SSE-KMS (hoặc DSSE-KMS nếu yêu cầu mã hóa 2 lớp).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s18",
      "S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS"
    ]
  },
  {
    "id": "x-p2-009",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      19
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-009, Phase 2 Session 19) focusing on S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-009 - Chặng 2, Buổi #19] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure Cross-Origin Resource Sharing (CORS) on the destination S3 bucket to allow the Exact Origin domain of the static website bucket."
    ],
    "correctIdx": 3,
    "explanation": "CORS (Cross-Origin Resource Sharing) luôn phải được cấu hình trên bucket ĐÍCH (bucket bị gọi tài nguyên chéo tên miền từ trình duyệt) với đúng Origin tên miền của trang web nguồn, kết hợp cùng S3 Block Public Access, S3 Object Ownership (Bucket owner enforced), và MFA Delete để bảo vệ quản trị truy cập bucket.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-2",
      "s19",
      "S3 Block Public Access",
      "Object Ownership",
      "MFA Delete",
      "S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting"
    ]
  },
  {
    "id": "x-p2-010",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      8,
      11
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-010, Phase 2 Session 11) focusing on ALB Path-Based & Host-Based Routing for Microservices. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-010 - Chặng 2, Buổi #11] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ALB Path-Based & Host-Based Routing for Microservices. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a single Application Load Balancer (ALB) and configure listener rules for host-based and path-based routing to separate target groups.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Application Load Balancer (ALB) hoạt động ở tầng 7 (HTTP/HTTPS), hỗ trợ định tuyến thông minh theo đường dẫn URL (Path-based), tên miền (Host-based), Query string và HTTP Header về các Target Group khác nhau chỉ với 1 bộ cân bằng tải duy nhất.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s11",
      "ALB Path-Based & Host-Based Routing for Microservices"
    ]
  },
  {
    "id": "x-p2-011",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      12
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-011, Phase 2 Session 12) focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-011 - Chặng 2, Buổi #12] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy a Gateway Load Balancer (GWLB) with Gateway Load Balancer endpoints to transparently inspect traffic through the firewall fleet using GENEVE on port 6081.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Khi đề bài yêu cầu chèn một dàn thiết bị bảo mật ảo bên thứ 3 (Third-party virtual network appliances như Palo Alto, Fortinet, Suricata IDS/IPS) để kiểm tra toàn bộ gói tin trong suốt, đáp án luôn là Gateway Load Balancer (GWLB) dùng giao thức GENEVE cổng 6081.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s12",
      "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
    ]
  },
  {
    "id": "x-p2-012",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      4,
      13
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-012, Phase 2 Session 13) focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-012 - Chặng 2, Buổi #13] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Use Server Name Indication (SNI) on a single Application Load Balancer HTTPS listener to bind multiple SSL/TLS certificates for different domains.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Tính năng SNI (Server Name Indication) cho phép gắn hàng chục chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên CÙNG MỘT cổng HTTPS listener của ALB hoặc NLB (và cả CloudFront) mà không cần thuê nhiều Load Balancer.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s13",
      "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
    ]
  },
  {
    "id": "x-p2-013",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      14
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-013, Phase 2 Session 14) focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-013 - Chặng 2, Buổi #14] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Configure the Target Group Deregistration Delay (Connection Draining) timeout to allow in-flight requests to complete before the instance terminates."
    ],
    "correctIdx": 3,
    "explanation": "Deregistration Delay (Connection Draining) ngừng gửi kết nối mới vào máy EC2 sắp bị thu hồi và chờ các request đang xử lý dở (in-flight requests) hoàn tất trong khoảng thời gian cấu hình (mặc định 300s, từ 1–3600s) trước khi Terminate máy.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-2",
      "s14",
      "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
    ]
  },
  {
    "id": "x-p2-014",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      10,
      15
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-014, Phase 2 Session 15) focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-014 - Chặng 2, Buổi #15] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable S3 Versioning on both the source and destination buckets, configure an IAM replication role, and use S3 Batch Replication to copy existing objects.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Để dùng S3 Replication (CRR hoặc SRR), BẮT BUỘC phải bật S3 Versioning trên cả Bucket nguồn và Bucket đích. Lưu ý: CRR/SRR mặc định chỉ nhân bản các file tải lên SAU khi bật rule; muốn chép các file đã có sẵn từ trước phải dùng S3 Batch Replication.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s15",
      "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
    ]
  },
  {
    "id": "x-p2-015",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      16
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-015, Phase 2 Session 16) focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-015 - Chặng 2, Buổi #16] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an S3 Lifecycle rule to transition objects to S3 Standard-IA after 30 days and then to S3 Glacier Deep Archive after 180 days.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      0,
      3
    ],
    "explanation": "Trong S3 Lifecycle, một object phải nằm ở S3 Standard ít nhất 30 ngày trước khi chuyển sang Standard-IA,One Zone-IA hoặc Intelligent-Tiering. Lưu ý thời gian lưu tối thiểu: IA/Intelligent (30 ngày), Glacier Instant/Flexible (90 ngày), Deep Archive (180 ngày).",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s16",
      "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
    ]
  },
  {
    "id": "x-p2-016",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      6,
      17
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-016, Phase 2 Session 17) focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-016 - Chặng 2, Buổi #17] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable S3 Transfer Acceleration to route uploads through Amazon CloudFront edge locations over the AWS global backbone, combined with Multi-Part Upload.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Để tăng tốc tải file lớn từ khắp nơi trên thế giới về 1 S3 Bucket: dùng S3 Transfer Acceleration (đi qua CloudFront Edge Locations vào mạng cáp quang nội bộ AWS) kết hợp S3 Multi-Part Upload (chia nhỏ file tải song song, bắt buộc cho file > 5 GB).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s17",
      "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
    ]
  },
  {
    "id": "x-p2-017",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      18
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-017, Phase 2 Session 18) focusing on S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-017 - Chặng 2, Buổi #18] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enforce Server-Side Encryption with AWS KMS keys (SSE-KMS) using a customer managed key so every decryption call is logged in AWS CloudTrail.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "S3 mặc định mã hóa mọi object mới bằng SSE-S3 (AES-256). Khi kiểm toán yêu cầu kiểm soát quyền xoay vòng khóa (Key Rotation), phân quyền tách biệt qua Key Policy và ghi nhật ký từng lần giải mã trong AWS CloudTrail, bắt buộc dùng SSE-KMS (hoặc DSSE-KMS nếu yêu cầu mã hóa 2 lớp).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s18",
      "S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS"
    ]
  },
  {
    "id": "x-p2-018",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      2,
      19
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-018, Phase 2 Session 19) focusing on S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-018 - Chặng 2, Buổi #19] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure Cross-Origin Resource Sharing (CORS) on the destination S3 bucket to allow the Exact Origin domain of the static website bucket."
    ],
    "correctIdx": 3,
    "explanation": "CORS (Cross-Origin Resource Sharing) luôn phải được cấu hình trên bucket ĐÍCH (bucket bị gọi tài nguyên chéo tên miền từ trình duyệt) với đúng Origin tên miền của trang web nguồn.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-2",
      "s19",
      "S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting"
    ]
  },
  {
    "id": "x-p2-019",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      11
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-019, Phase 2 Session 11) focusing on ALB Path-Based & Host-Based Routing for Microservices. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-019 - Chặng 2, Buổi #11] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ALB Path-Based & Host-Based Routing for Microservices. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a single Application Load Balancer (ALB) and configure listener rules for host-based and path-based routing to separate target groups.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Application Load Balancer (ALB) hoạt động ở tầng 7 (HTTP/HTTPS), hỗ trợ định tuyến thông minh theo đường dẫn URL (Path-based), tên miền (Host-based), Query string và HTTP Header về các Target Group khác nhau chỉ với 1 bộ cân bằng tải duy nhất.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s11",
      "ALB Path-Based & Host-Based Routing for Microservices"
    ]
  },
  {
    "id": "x-p2-020",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      8,
      12
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-020, Phase 2 Session 12) focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-020 - Chặng 2, Buổi #12] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Deploy a Gateway Load Balancer (GWLB) with Gateway Load Balancer endpoints to transparently inspect traffic through the firewall fleet using GENEVE on port 6081.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "Khi đề bài yêu cầu chèn một dàn thiết bị bảo mật ảo bên thứ 3 (Third-party virtual network appliances như Palo Alto, Fortinet, Suricata IDS/IPS) để kiểm tra toàn bộ gói tin trong suốt, đáp án luôn là Gateway Load Balancer (GWLB) dùng giao thức GENEVE cổng 6081.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s12",
      "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
    ]
  },
  {
    "id": "x-p2-021",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      13
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-021, Phase 2 Session 13) focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-021 - Chặng 2, Buổi #13] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Use Server Name Indication (SNI) on a single Application Load Balancer HTTPS listener to bind multiple SSL/TLS certificates for different domains.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "Tính năng SNI (Server Name Indication) cho phép gắn hàng chục chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên CÙNG MỘT cổng HTTPS listener của ALB hoặc NLB (và cả CloudFront) mà không cần thuê nhiều Load Balancer.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s13",
      "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
    ]
  },
  {
    "id": "x-p2-022",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      4,
      14
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-022, Phase 2 Session 14) focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-022 - Chặng 2, Buổi #14] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Configure the Target Group Deregistration Delay (Connection Draining) timeout to allow in-flight requests to complete before the instance terminates.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      1,
      4
    ],
    "explanation": "Deregistration Delay (Connection Draining) ngừng gửi kết nối mới vào máy EC2 sắp bị thu hồi và chờ các request đang xử lý dở (in-flight requests) hoàn tất trong khoảng thời gian cấu hình (mặc định 300s, từ 1–3600s) trước khi Terminate máy.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-2",
      "s14",
      "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
    ]
  },
  {
    "id": "x-p2-023",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      15
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-023, Phase 2 Session 15) focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-023 - Chặng 2, Buổi #15] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable S3 Versioning on both the source and destination buckets, configure an IAM replication role, and use S3 Batch Replication to copy existing objects."
    ],
    "correctIdx": 3,
    "explanation": "Để dùng S3 Replication (CRR hoặc SRR), BẮT BUỘC phải bật S3 Versioning trên cả Bucket nguồn và Bucket đích. Lưu ý: CRR/SRR mặc định chỉ nhân bản các file tải lên SAU khi bật rule; muốn chép các file đã có sẵn từ trước phải dùng S3 Batch Replication.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-2",
      "s15",
      "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
    ]
  },
  {
    "id": "x-p2-024",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      10,
      16
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-024, Phase 2 Session 16) focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-024 - Chặng 2, Buổi #16] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an S3 Lifecycle rule to transition objects to S3 Standard-IA after 30 days and then to S3 Glacier Deep Archive after 180 days.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Trong S3 Lifecycle, một object phải nằm ở S3 Standard ít nhất 30 ngày trước khi chuyển sang Standard-IA,One Zone-IA hoặc Intelligent-Tiering. Lưu ý thời gian lưu tối thiểu: IA/Intelligent (30 ngày), Glacier Instant/Flexible (90 ngày), Deep Archive (180 ngày).",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s16",
      "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
    ]
  },
  {
    "id": "x-p2-025",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      17
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-025, Phase 2 Session 17) focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-025 - Chặng 2, Buổi #17] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable S3 Transfer Acceleration to route uploads through Amazon CloudFront edge locations over the AWS global backbone, combined with Multi-Part Upload.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Để tăng tốc tải file lớn từ khắp nơi trên thế giới về 1 S3 Bucket: dùng S3 Transfer Acceleration (đi qua CloudFront Edge Locations vào mạng cáp quang nội bộ AWS) kết hợp S3 Multi-Part Upload (chia nhỏ file tải song song, bắt buộc cho file > 5 GB).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s17",
      "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
    ]
  },
  {
    "id": "x-p2-026",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      6,
      18
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-026, Phase 2 Session 18) focusing on S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-026 - Chặng 2, Buổi #18] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enforce Server-Side Encryption with AWS KMS keys (SSE-KMS) using a customer managed key so every decryption call is logged in AWS CloudTrail.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "S3 mặc định mã hóa mọi object mới bằng SSE-S3 (AES-256). Khi kiểm toán yêu cầu kiểm soát quyền xoay vòng khóa (Key Rotation), phân quyền tách biệt qua Key Policy và ghi nhật ký từng lần giải mã trong AWS CloudTrail, bắt buộc dùng SSE-KMS (hoặc DSSE-KMS nếu yêu cầu mã hóa 2 lớp).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s18",
      "S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS"
    ]
  },
  {
    "id": "x-p2-027",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      19
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-027, Phase 2 Session 19) focusing on S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-027 - Chặng 2, Buổi #19] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure Cross-Origin Resource Sharing (CORS) on the destination S3 bucket to allow the Exact Origin domain of the static website bucket."
    ],
    "correctIdx": 3,
    "explanation": "CORS (Cross-Origin Resource Sharing) luôn phải được cấu hình trên bucket ĐÍCH (bucket bị gọi tài nguyên chéo tên miền từ trình duyệt) với đúng Origin tên miền của trang web nguồn.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-2",
      "s19",
      "S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting"
    ]
  },
  {
    "id": "x-p2-028",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      2,
      11
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-028, Phase 2 Session 11) focusing on ALB Path-Based & Host-Based Routing for Microservices. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-028 - Chặng 2, Buổi #11] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ALB Path-Based & Host-Based Routing for Microservices. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a single Application Load Balancer (ALB) and configure listener rules for host-based and path-based routing to separate target groups.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Application Load Balancer (ALB) hoạt động ở tầng 7 (HTTP/HTTPS), hỗ trợ định tuyến thông minh theo đường dẫn URL (Path-based), tên miền (Host-based), Query string và HTTP Header về các Target Group khác nhau chỉ với 1 bộ cân bằng tải duy nhất.",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s11",
      "ALB Path-Based & Host-Based Routing for Microservices"
    ]
  },
  {
    "id": "x-p2-029",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      12
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-029, Phase 2 Session 12) focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-029 - Chặng 2, Buổi #12] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Deploy a Gateway Load Balancer (GWLB) with Gateway Load Balancer endpoints to transparently inspect traffic through the firewall fleet using GENEVE on port 6081.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones."
    ],
    "correctIdxs": [
      2,
      4
    ],
    "explanation": "Khi đề bài yêu cầu chèn một dàn thiết bị bảo mật ảo bên thứ 3 (Third-party virtual network appliances như Palo Alto, Fortinet, Suricata IDS/IPS) để kiểm tra toàn bộ gói tin trong suốt, đáp án luôn là Gateway Load Balancer (GWLB) dùng giao thức GENEVE cổng 6081.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-2",
      "s12",
      "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
    ]
  },
  {
    "id": "x-p2-030",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      8,
      13
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-030, Phase 2 Session 13) focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-030 - Chặng 2, Buổi #13] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Server Name Indication (SNI) on a single Application Load Balancer HTTPS listener to bind multiple SSL/TLS certificates for different domains.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Tính năng SNI (Server Name Indication) cho phép gắn hàng chục chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên CÙNG MỘT cổng HTTPS listener của ALB hoặc NLB (và cả CloudFront) mà không cần thuê nhiều Load Balancer.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s13",
      "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
    ]
  },
  {
    "id": "x-p2-031",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      14
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-031, Phase 2 Session 14) focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-031 - Chặng 2, Buổi #14] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Configure the Target Group Deregistration Delay (Connection Draining) timeout to allow in-flight requests to complete before the instance terminates.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Deregistration Delay (Connection Draining) ngừng gửi kết nối mới vào máy EC2 sắp bị thu hồi và chờ các request đang xử lý dở (in-flight requests) hoàn tất trong khoảng thời gian cấu hình (mặc định 300s, từ 1–3600s) trước khi Terminate máy.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s14",
      "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
    ]
  },
  {
    "id": "x-p2-032",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      4,
      15
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-032, Phase 2 Session 15) focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-032 - Chặng 2, Buổi #15] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable S3 Versioning on both the source and destination buckets, configure an IAM replication role, and use S3 Batch Replication to copy existing objects."
    ],
    "correctIdx": 3,
    "explanation": "Để dùng S3 Replication (CRR hoặc SRR), BẮT BUỘC phải bật S3 Versioning trên cả Bucket nguồn và Bucket đích. Lưu ý: CRR/SRR mặc định chỉ nhân bản các file tải lên SAU khi bật rule; muốn chép các file đã có sẵn từ trước phải dùng S3 Batch Replication.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-2",
      "s15",
      "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
    ]
  },
  {
    "id": "x-p2-033",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      16
    ],
    "difficulty": "hard",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-033, Phase 2 Session 16) focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-033 - Chặng 2, Buổi #16] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an S3 Lifecycle rule to transition objects to S3 Standard-IA after 30 days and then to S3 Glacier Deep Archive after 180 days.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Trong S3 Lifecycle, một object phải nằm ở S3 Standard ít nhất 30 ngày trước khi chuyển sang Standard-IA,One Zone-IA hoặc Intelligent-Tiering. Lưu ý thời gian lưu tối thiểu: IA/Intelligent (30 ngày), Glacier Instant/Flexible (90 ngày), Deep Archive (180 ngày).",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s16",
      "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
    ]
  },
  {
    "id": "x-p2-034",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      10,
      17
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-034, Phase 2 Session 17) focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-034 - Chặng 2, Buổi #17] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable S3 Transfer Acceleration to route uploads through Amazon CloudFront edge locations over the AWS global backbone, combined with Multi-Part Upload.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 1,
    "explanation": "Để tăng tốc tải file lớn từ khắp nơi trên thế giới về 1 S3 Bucket: dùng S3 Transfer Acceleration (đi qua CloudFront Edge Locations vào mạng cáp quang nội bộ AWS) kết hợp S3 Multi-Part Upload (chia nhỏ file tải song song, bắt buộc cho file > 5 GB).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s17",
      "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
    ]
  },
  {
    "id": "x-p2-035",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      18
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-035, Phase 2 Session 18) focusing on S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-035 - Chặng 2, Buổi #18] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enforce Server-Side Encryption with AWS KMS keys (SSE-KMS) using a customer managed key so every decryption call is logged in AWS CloudTrail.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 2,
    "explanation": "S3 mặc định mã hóa mọi object mới bằng SSE-S3 (AES-256). Khi kiểm toán yêu cầu kiểm soát quyền xoay vòng khóa (Key Rotation), phân quyền tách biệt qua Key Policy và ghi nhật ký từng lần giải mã trong AWS CloudTrail, bắt buộc dùng SSE-KMS (hoặc DSSE-KMS nếu yêu cầu mã hóa 2 lớp).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s18",
      "S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS"
    ]
  },
  {
    "id": "x-p2-036",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      6,
      19
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-036, Phase 2 Session 19) focusing on S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-036 - Chặng 2, Buổi #19] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure Cross-Origin Resource Sharing (CORS) on the destination S3 bucket to allow the Exact Origin domain of the static website bucket.",
      "B. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "E. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdxs": [
      0,
      1
    ],
    "explanation": "CORS (Cross-Origin Resource Sharing) luôn phải được cấu hình trên bucket ĐÍCH (bucket bị gọi tài nguyên chéo tên miền từ trình duyệt) với đúng Origin tên miền của trang web nguồn.",
    "whyWrong": [
      null,
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s19",
      "S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting"
    ]
  },
  {
    "id": "x-p2-037",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      11
    ],
    "difficulty": "hard",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-037, Phase 2 Session 11) focusing on ALB Path-Based & Host-Based Routing for Microservices. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-037 - Chặng 2, Buổi #11] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ALB Path-Based & Host-Based Routing for Microservices. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Deploy a single Application Load Balancer (ALB) and configure listener rules for host-based and path-based routing to separate target groups."
    ],
    "correctIdx": 3,
    "explanation": "Application Load Balancer (ALB) hoạt động ở tầng 7 (HTTP/HTTPS), hỗ trợ định tuyến thông minh theo đường dẫn URL (Path-based), tên miền (Host-based), Query string và HTTP Header về các Target Group khác nhau chỉ với 1 bộ cân bằng tải duy nhất.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-2",
      "s11",
      "ALB Path-Based & Host-Based Routing for Microservices"
    ]
  },
  {
    "id": "x-p2-038",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      2,
      12
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-038, Phase 2 Session 12) focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-038 - Chặng 2, Buổi #12] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a Gateway Load Balancer (GWLB) with Gateway Load Balancer endpoints to transparently inspect traffic through the firewall fleet using GENEVE on port 6081.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Khi đề bài yêu cầu chèn một dàn thiết bị bảo mật ảo bên thứ 3 (Third-party virtual network appliances như Palo Alto, Fortinet, Suricata IDS/IPS) để kiểm tra toàn bộ gói tin trong suốt, đáp án luôn là Gateway Load Balancer (GWLB) dùng giao thức GENEVE cổng 6081.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s12",
      "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
    ]
  },
  {
    "id": "x-p2-039",
    "pool": "exam",
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      13
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-039, Phase 2 Session 13) focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-039 - Chặng 2, Buổi #13] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Server Name Indication (SNI) on a single Application Load Balancer HTTPS listener to bind multiple SSL/TLS certificates for different domains.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Tính năng SNI (Server Name Indication) cho phép gắn hàng chục chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên CÙNG MỘT cổng HTTPS listener của ALB hoặc NLB (và cả CloudFront) mà không cần thuê nhiều Load Balancer.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s13",
      "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
    ]
  },
  {
    "id": "x-p2-040",
    "pool": "exam",
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      8,
      14
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-040, Phase 2 Session 14) focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-040 - Chặng 2, Buổi #14] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Configure the Target Group Deregistration Delay (Connection Draining) timeout to allow in-flight requests to complete before the instance terminates.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Deregistration Delay (Connection Draining) ngừng gửi kết nối mới vào máy EC2 sắp bị thu hồi và chờ các request đang xử lý dở (in-flight requests) hoàn tất trong khoảng thời gian cấu hình (mặc định 300s, từ 1–3600s) trước khi Terminate máy.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s14",
      "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
    ]
  },
  {
    "id": "x-p2-041",
    "pool": "exam",
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      15
    ],
    "difficulty": "hard",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-041, Phase 2 Session 15) focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-041 - Chặng 2, Buổi #15] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Enable S3 Versioning on both the source and destination buckets, configure an IAM replication role, and use S3 Batch Replication to copy existing objects."
    ],
    "correctIdx": 3,
    "explanation": "Để dùng S3 Replication (CRR hoặc SRR), BẮT BUỘC phải bật S3 Versioning trên cả Bucket nguồn và Bucket đích. Lưu ý: CRR/SRR mặc định chỉ nhân bản các file tải lên SAU khi bật rule; muốn chép các file đã có sẵn từ trước phải dùng S3 Batch Replication.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null
    ],
    "tags": [
      "phase-2",
      "s15",
      "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
    ]
  },
  {
    "id": "x-p2-042",
    "pool": "exam",
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      4,
      16
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-042, Phase 2 Session 16) focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-042 - Chặng 2, Buổi #16] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an S3 Lifecycle rule to transition objects to S3 Standard-IA after 30 days and then to S3 Glacier Deep Archive after 180 days.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 0,
    "explanation": "Trong S3 Lifecycle, một object phải nằm ở S3 Standard ít nhất 30 ngày trước khi chuyển sang Standard-IA,One Zone-IA hoặc Intelligent-Tiering. Lưu ý thời gian lưu tối thiểu: IA/Intelligent (30 ngày), Glacier Instant/Flexible (90 ngày), Deep Archive (180 ngày).",
    "whyWrong": [
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s16",
      "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
    ]
  },
  {
    "id": "x-p2-043",
    "pool": "exam",
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      17
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-043, Phase 2 Session 17) focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-043 - Chặng 2, Buổi #17] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enable S3 Transfer Acceleration to route uploads through Amazon CloudFront edge locations over the AWS global backbone, combined with Multi-Part Upload.",
      "C. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdxs": [
      1,
      2
    ],
    "explanation": "Để tăng tốc tải file lớn từ khắp nơi trên thế giới về 1 S3 Bucket: dùng S3 Transfer Acceleration (đi qua CloudFront Edge Locations vào mạng cáp quang nội bộ AWS) kết hợp S3 Multi-Part Upload (chia nhỏ file tải song song, bắt buộc cho file > 5 GB).",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null,
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s17",
      "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
    ]
  },
  {
    "id": "x-p2-044",
    "pool": "exam",
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      10,
      18
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-044, Phase 2 Session 18) focusing on S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-044 - Chặng 2, Buổi #18] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Enforce Server-Side Encryption with AWS KMS keys (SSE-KMS) using a customer managed key so every decryption call is logged in AWS CloudTrail.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 1,
    "explanation": "S3 mặc định mã hóa mọi object mới bằng SSE-S3 (AES-256). Khi kiểm toán yêu cầu kiểm soát quyền xoay vòng khóa (Key Rotation), phân quyền tách biệt qua Key Policy và ghi nhật ký từng lần giải mã trong AWS CloudTrail, bắt buộc dùng SSE-KMS (hoặc DSSE-KMS nếu yêu cầu mã hóa 2 lớp).",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s18",
      "S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS"
    ]
  },
  {
    "id": "x-p2-045",
    "pool": "exam",
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      19
    ],
    "difficulty": "hard",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-045, Phase 2 Session 19) focusing on S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-045 - Chặng 2, Buổi #19] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Configure Cross-Origin Resource Sharing (CORS) on the destination S3 bucket to allow the Exact Origin domain of the static website bucket.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 2,
    "explanation": "CORS (Cross-Origin Resource Sharing) luôn phải được cấu hình trên bucket ĐÍCH (bucket bị gọi tài nguyên chéo tên miền từ trình duyệt) với đúng Origin tên miền của trang web nguồn.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s19",
      "S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting"
    ]
  },
  {
    "id": "x-p2-046",
    "pool": "exam",
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      6,
      11
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-046, Phase 2 Session 11) focusing on ALB Path-Based & Host-Based Routing for Microservices. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance?",
    "qVi": "[Mã đề x-p2-046 - Chặng 2, Buổi #11] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề ALB Path-Based & Host-Based Routing for Microservices. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Deploy a single Application Load Balancer (ALB) and configure listener rules for host-based and path-based routing to separate target groups."
    ],
    "correctIdx": 3,
    "explanation": "Application Load Balancer (ALB) hoạt động ở tầng 7 (HTTP/HTTPS), hỗ trợ định tuyến thông minh theo đường dẫn URL (Path-based), tên miền (Host-based), Query string và HTTP Header về các Target Group khác nhau chỉ với 1 bộ cân bằng tải duy nhất.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null
    ],
    "tags": [
      "phase-2",
      "s11",
      "ALB Path-Based & Host-Based Routing for Microservices"
    ]
  },
  {
    "id": "x-p2-047",
    "pool": "exam",
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      12
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-047, Phase 2 Session 12) focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-047 - Chặng 2, Buổi #12] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a Gateway Load Balancer (GWLB) with Gateway Load Balancer endpoints to transparently inspect traffic through the firewall fleet using GENEVE on port 6081.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdx": 0,
    "explanation": "Khi đề bài yêu cầu chèn một dàn thiết bị bảo mật ảo bên thứ 3 (Third-party virtual network appliances như Palo Alto, Fortinet, Suricata IDS/IPS) để kiểm tra toàn bộ gói tin trong suốt, đáp án luôn là Gateway Load Balancer (GWLB) dùng giao thức GENEVE cổng 6081.",
    "whyWrong": [
      null,
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s12",
      "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
    ]
  },
  {
    "id": "x-p2-048",
    "pool": "exam",
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      2,
      13
    ],
    "difficulty": "medium",
    "qEn": "A financial technology startup building a payment clearing platform is architecting a mission-critical production workload on AWS (Reference Case x-p2-048, Phase 2 Session 13) focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-048 - Chặng 2, Buổi #13] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use Server Name Indication (SNI) on a single Application Load Balancer HTTPS listener to bind multiple SSL/TLS certificates for different domains.",
      "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
    ],
    "correctIdx": 1,
    "explanation": "Tính năng SNI (Server Name Indication) cho phép gắn hàng chục chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên CÙNG MỘT cổng HTTPS listener của ALB hoặc NLB (và cả CloudFront) mà không cần thuê nhiều Load Balancer.",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
    ],
    "tags": [
      "phase-2",
      "s13",
      "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
    ]
  },
  {
    "id": "x-p2-049",
    "pool": "exam",
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      14
    ],
    "difficulty": "easy",
    "qEn": "An automotive IoT telemetry provider ingesting connected vehicle sensor data is architecting a mission-critical production workload on AWS (Reference Case x-p2-049, Phase 2 Session 14) focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which architectural solution meets these requirements with the LEAST operational overhead?",
    "qVi": "[Mã đề x-p2-049 - Chặng 2, Buổi #14] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "C. Configure the Target Group Deregistration Delay (Connection Draining) timeout to allow in-flight requests to complete before the instance terminates.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 2,
    "explanation": "Deregistration Delay (Connection Draining) ngừng gửi kết nối mới vào máy EC2 sắp bị thu hồi và chờ các request đang xử lý dở (in-flight requests) hoàn tất trong khoảng thời gian cấu hình (mặc định 300s, từ 1–3600s) trước khi Terminate máy.",
    "whyWrong": [
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      null,
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s14",
      "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
    ]
  },
  {
    "id": "x-p2-050",
    "pool": "exam",
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      8,
      15
    ],
    "difficulty": "medium",
    "qEn": "A multinational retail banking institution is architecting a mission-critical production workload on AWS (Reference Case x-p2-050, Phase 2 Session 15) focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which design should the solutions architect recommend to maximize high availability and fault tolerance? (Choose TWO.)",
    "qVi": "[Mã đề x-p2-050 - Chặng 2, Buổi #15] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên? (Chọn 2 phương án.)",
    "options": [
      "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
      "C. Enable S3 Versioning on both the source and destination buckets, configure an IAM replication role, and use S3 Batch Replication to copy existing objects.",
      "D. Configure Amazon CloudWatch alarms and least-privilege IAM roles to monitor health and secure service-to-service communication across Availability Zones.",
      "E. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
    ],
    "correctIdxs": [
      2,
      3
    ],
    "explanation": "Để dùng S3 Replication (CRR hoặc SRR), BẮT BUỘC phải bật S3 Versioning trên cả Bucket nguồn và Bucket đích. Lưu ý: CRR/SRR mặc định chỉ nhân bản các file tải lên SAU khi bật rule; muốn chép các file đã có sẵn từ trước phải dùng S3 Batch Replication.",
    "whyWrong": [
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      null,
      null,
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
    ],
    "tags": [
      "phase-2",
      "s15",
      "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
    ]
  },
  {
    "id": "x-p2-051",
    "pool": "exam",
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      16
    ],
    "difficulty": "medium",
    "qEn": "A global e-commerce marketplace handling seasonal flash sales is architecting a mission-critical production workload on AWS (Reference Case x-p2-051, Phase 2 Session 16) focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. Which approach provides the MOST cost-effective solution without compromising security or durability?",
    "qVi": "[Mã đề x-p2-051 - Chặng 2, Buổi #16] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive). Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
      "C. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
      "D. Configure an S3 Lifecycle rule to transition objects to S3 Standard-IA after 30 days and then to S3 Glacier Deep Archive after 180 days."
    ],
    "correctIdx": 3,
    "explanation": "Trong S3 Lifecycle, một object phải nằm ở S3 Standard ít nhất 30 ngày trước khi chuyển sang Standard-IA,One Zone-IA hoặc Intelligent-Tiering. Lưu ý thời gian lưu tối thiểu: IA/Intelligent (30 ngày), Glacier Instant/Flexible (90 ngày), Deep Archive (180 ngày).",
    "whyWrong": [
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
      "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      null
    ],
    "tags": [
      "phase-2",
      "s16",
      "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
    ]
  },
  {
    "id": "x-p2-052",
    "pool": "exam",
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      4,
      17
    ],
    "difficulty": "medium",
    "qEn": "A logistics and supply-chain tracking enterprise operating across three continents is architecting a mission-critical production workload on AWS (Reference Case x-p2-052, Phase 2 Session 17) focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. The system experiences variable traffic patterns during peak business hours and must remain resilient against single Availability Zone failures while maintaining strict security governance and data durability. The engineering team has limited operations staff and wants to avoid managing custom scripts or third-party agents whenever a native AWS capability is available. How should the solutions architect design the system to meet these strict security and compliance requirements?",
    "qVi": "[Mã đề x-p2-052 - Chặng 2, Buổi #17] Một doanh nghiệp đang thiết kế hệ thống sản xuất trọng yếu trên AWS xoay quanh chủ đề S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration. Hệ thống có lưu lượng biến thiên mạnh vào giờ cao điểm, yêu cầu khả năng chịu lỗi khi sập 1 Availability Zone, đảm bảo an toàn bảo mật và ưu tiên dùng dịch vụ Managed/Serverless của AWS để giảm tối đa công sức vận hành. Giải pháp nào đáp ứng tốt nhất các yêu cầu trên?",
    "options": [
      "A. Enable S3 Transfer Acceleration to route uploads through Amazon CloudFront edge locations over the AWS global backbone, combined with Multi-Part Upload.",
      "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
      "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
      "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
    ],
    "correctIdx": 0,
    "explanation": "Để tăng tốc tải file lớn từ khắp nơi trên thế giới về 1 S3 Bucket: dùng S3 Transfer Acceleration (đi qua CloudFront Edge Locations vào mạng cáp quang nội bộ AWS) kết hợp S3 Multi-Part Upload (chia nhỏ file tải song song, bắt buộc cho file > 5 GB).",
    "whyWrong": [
      null,
      "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
      "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
      "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
    ],
    "tags": [
      "phase-2",
      "s17",
      "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
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
