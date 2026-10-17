// quiz-bank-1.js — Ngân hàng câu hỏi bài học (pool: "lesson") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = {
  "1": [
    {
      "id": "s1-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        1
      ],
      "difficulty": "easy",
      "qEn": "A financial enterprise is migrating its core Java applications to AWS using Amazon EC2 instances and Amazon RDS databases. During a security audit, the compliance officer asks the solutions architect to clarify which operational security tasks remain the customer's responsibility under the AWS Shared Responsibility Model. Which combination of tasks is the responsibility of the customer?",
      "qVi": "Doanh nghiệp tài chính di chuyển ứng dụng Java lên AWS dùng EC2 và RDS. Khi kiểm toán, giám đốc tuân thủ yêu cầu làm rõ tác vụ nào thuộc trách nhiệm của khách hàng theo AWS Shared Responsibility Model. Tổ hợp tác vụ nào thuộc trách nhiệm của khách hàng?",
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
        "s1",
        "AWS Shared Responsibility Model (Security OF vs IN the Cloud)"
      ]
    },
    {
      "id": "s1-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        1
      ],
      "difficulty": "medium",
      "qEn": "An e-commerce company is conducting an AWS Well-Architected Framework review of its cloud platform. The executive board wants to minimize the environmental impact and energy consumption of its workloads per user transaction. Which pillar of the AWS Well-Architected Framework and corresponding engineering practices directly address this goal?",
      "qVi": "Công ty thương mại điện tử thực hiện rà soát hệ thống theo khung AWS Well-Architected Framework và muốn giảm thiểu tác động môi trường cũng như mức tiêu thụ năng lượng trên mỗi giao dịch. Trụ cột nào của AWS Well-Architected Framework và giải pháp nào đáp ứng trực tiếp mục tiêu này?",
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
        "s1",
        "AWS Well-Architected Framework 6 Pillars (Sustainability Pillar)"
      ]
    },
    {
      "id": "s1-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        1
      ],
      "difficulty": "hard",
      "qEn": "A contractor belongs to the BackendDevs IAM group which grants Allow permissions for all Amazon S3 actions. However, an inline policy attached to the contractor's IAM user contains an Explicit Deny for s3:DeleteObject on the production bucket. Now the contractor legitimately needs to delete obsolete objects from that bucket. Which TWO actions must the solutions architect take? (Choose TWO.)",
      "qVi": "Một nhân viên thuộc IAM Group BackendDevs có quyền Allow toàn bộ S3, nhưng bị gắn thêm Inline Policy có lệnh Explicit Deny đối với s3:DeleteObject. Hiện tại nhân viên này cần quyền xóa file hợp lệ trên bucket đó. Kiến trúc sư cần thực hiện HAI hành động nào? (Chọn 2 phương án.)",
      "options": [
        "A. Remove the inline policy containing the explicit deny for s3:DeleteObject from the contractor's IAM user.",
        "B. Add a second inline policy with s3:* Allow to the IAM user to override the existing explicit deny statement while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Verify that an explicit Allow permission for s3:DeleteObject remains attached via the BackendDevs IAM group policy.",
        "D. Enable multi-factor authentication on the IAM group so the group policy automatically supersedes user-level explicit denies.",
        "E. Place the IAM group inside a second nested IAM group with AdministratorAccess to bypass the explicit deny rule."
      ],
      "correctIdxs": [
        0,
        2
      ],
      "explanation": "Trong logic chấm điểm của IAM, một lệnh Explicit Deny luôn ghi đè (override) mọi lệnh Allow. Để user xóa được object, bắt buộc phải gỡ bỏ câu lệnh Explicit Deny đó và đảm bảo có lệnh Allow hợp lệ từ Group/Role.",
      "whyWrong": [
        null,
        "Thêm một lệnh Allow khác (dù là s3:*) không bao giờ ghi đè được lệnh Explicit Deny đang tồn tại.",
        null,
        "Bật MFA không làm thay đổi quy tắc Explicit Deny thắng mọi lệnh Allow của IAM.",
        "IAM Group không thể chứa một IAM Group khác (không hỗ trợ lồng nhau) và AdministratorAccess cũng không thắng được Explicit Deny."
      ],
      "tags": [
        "s1",
        "IAM Policy Evaluation Logic & Explicit Deny Override"
      ]
    }
  ],
  "2": [
    {
      "id": "s2-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        2
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on IAM Access Advisor vs IAM Credentials Report (Session 2, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến IAM Access Advisor vs IAM Credentials Report (Buổi #2, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Download the account-level IAM Credentials Report CSV file to view a per-role breakdown of every AWS service API call made in the last 180 days while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Enable AWS Secrets Manager automatic rotation on the IAM role to purge unused service permissions every 30 days.",
        "C. Run an Amazon Macie sensitive data discovery job against the IAM policy JSON documents stored in the account.",
        "D. Review IAM Access Advisor on the specific IAM role to identify services with no recent last-accessed timestamps and remove those permissions."
      ],
      "correctIdx": 3,
      "explanation": "IAM Access Advisor hiển thị danh sách các dịch vụ được cấp quyền cho một IAM Role/User kèm thời điểm truy cập gần nhất (Last accessed), giúp cắt tỉa quyền thừa theo nguyên tắc Least Privilege.",
      "whyWrong": [
        "IAM Credentials Report chỉ liệt kê trạng thái mật khẩu/Access Key/MFA của IAM Users ở cấp Account, không thống kê dịch vụ truy cập của IAM Role.",
        "Secrets Manager dùng để xoay vòng mật khẩu DB/API key, không tự động xóa quyền trong IAM Policy.",
        "Amazon Macie dùng để quét dữ liệu nhạy cảm PII trên S3, không kiểm toán quyền IAM.",
        null
      ],
      "tags": [
        "s2",
        "IAM Access Advisor vs IAM Credentials Report"
      ]
    },
    {
      "id": "s2-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        2
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 Instance Profile vs Hardcoded IAM Access Keys (Session 2, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 Instance Profile vs Hardcoded IAM Access Keys (Buổi #2, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Revoke the exposed IAM access keys immediately and attach an IAM role with S3 permissions to the EC2 instance using an instance profile.",
        "B. Encode the static IAM access keys with Base64 and pass them through the EC2 User Data script during instance launch while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Store the IAM user access keys inside a public S3 bucket and configure the application to fetch them at startup.",
        "D. Attach an AWS Shield Standard policy to the EC2 instance to hide the hardcoded credentials in the Git repository."
      ],
      "correctIdx": 0,
      "explanation": "Khi khóa tĩnh bị lộ, phải thu hồi/xóa ngay khóa đó và gắn IAM Role (thông qua Instance Profile) cho EC2 để SDK tự động lấy temporary credentials từ Instance Metadata Service.",
      "whyWrong": [
        null,
        "Mã hóa Base64 trong User Data vẫn là khóa dài hạn và dễ dàng bị đọc bởi bất kỳ ai truy cập được metadata.",
        "Lưu khóa trong S3 bucket công khai làm lộ thông tin xác thực ra toàn bộ Internet.",
        "AWS Shield chống tấn công DDoS tầng mạng, không xử lý được khóa tĩnh bị lộ trong mã nguồn."
      ],
      "tags": [
        "s2",
        "EC2 Instance Profile vs Hardcoded IAM Access Keys"
      ]
    },
    {
      "id": "s2-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        2
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Cross-Account Access via IAM Role and AWS STS AssumeRole (Session 2, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Cross-Account Access via IAM Role and AWS STS AssumeRole (Buổi #2, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Create duplicate IAM users with identical passwords inside every Production account and synchronize them manually each week while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Place the Production AWS account inside an IAM Group located in the Security account so permissions are inherited automatically.",
        "C. Create an IAM role in the Production account with a trust policy trusting the Security account, and allow security analysts to call sts:AssumeRole.",
        "D. Share the Production account root user access keys with the security team over an encrypted email attachment."
      ],
      "correctIdx": 2,
      "explanation": "Để cấp quyền Cross-Account an toàn không cần tạo IAM User trùng lặp, ta tạo IAM Role ở tài khoản đích (Production) tin tưởng tài khoản nguồn (Security) qua Trust Policy và dùng lệnh sts:AssumeRole.",
      "whyWrong": [
        "Tạo IAM User trùng lặp ở nhiều tài khoản tốn công vận hành và vi phạm nguyên tắc quản lý định danh tập trung.",
        "IAM Group chỉ chứa IAM Users trong phạm vi 1 tài khoản, không thể chứa các AWS Accounts.",
        null,
        "Tạo và chia sẻ Root Access Key vi phạm nghiêm trọng nguyên tắc bảo mật tối kỵ của AWS."
      ],
      "tags": [
        "s2",
        "Cross-Account Access via IAM Role and AWS STS AssumeRole"
      ]
    }
  ],
  "3": [
    {
      "id": "s3-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        3
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads (Session 3, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads (Buổi #3, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Select Compute Optimized instances (C7g family) designed primarily for CPU-bound batch processing and media transcoding while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Select General Purpose burstable instances (T4g.micro) operating on baseline CPU credits without high memory capacity.",
        "C. Select Storage Optimized instances (D3en family) equipped with sequential spinning hard disk drives for cold archiving.",
        "D. Select Memory Optimized Amazon EC2 instances (such as the R7g or X2idn instance families) designed for high memory-to-vCPU ratios."
      ],
      "correctIdx": 3,
      "explanation": "Dòng máy Memory Optimized (họ R, X, High Memory) được thiết kế chuyên cho các cơ sở dữ liệu trong bộ nhớ RAM (In-memory caches như Redis, SAP HANA, real-time big data analytics).",
      "whyWrong": [
        "Họ C tối ưu cho tốc độ CPU tính toán nặng, có tỷ lệ RAM/vCPU thấp hơn dòng R/X.",
        "Họ T4g.micro chỉ có lượng RAM rất nhỏ và dùng CPU credit, không thể chạy SAP HANA hay Redis lớn.",
        "Họ D tối ưu cho ổ cứng tuần tự HDD dung lượng cao, không tối ưu bộ nhớ RAM.",
        null
      ],
      "tags": [
        "s3",
        "Memory Optimized EC2 Instances (R/X Family) for In-Memory Workloads"
      ]
    },
    {
      "id": "s3-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        3
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 User Data Automated First-Boot Bootstrapping (Session 3, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 User Data Automated First-Boot Bootstrapping (Buổi #3, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Supply a bash installation script in the EC2 User Data field of the launch template so it executes automatically as root on first boot.",
        "B. Place the shell commands inside an Amazon S3 bucket policy attached to the application artifact bucket while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Configure an EC2 Spread Placement Group to copy the web server binaries across Availability Zones during boot.",
        "D. Create an AWS Billing Alarm in CloudWatch to SSH into each new instance and install the packages manually."
      ],
      "correctIdx": 0,
      "explanation": "EC2 User Data cho phép truyền kịch bản khởi tạo (bootstrapping script) tự động chạy dưới quyền root ngay trong lần khởi động đầu tiên (first boot) của máy ảo EC2.",
      "whyWrong": [
        null,
        "S3 Bucket Policy là chính sách JSON kiểm soát quyền truy cập S3, không thể chạy script cài phần mềm trên EC2.",
        "Placement Group chỉ quy định vị trí phần cứng vật lý của EC2, không sao chép hay cài đặt phần mềm.",
        "Billing Alarm chỉ cảnh báo chi phí, không có khả năng SSH vào máy chủ để cài đặt gói tin."
      ],
      "tags": [
        "s3",
        "EC2 User Data Automated First-Boot Bootstrapping"
      ]
    },
    {
      "id": "s3-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        3
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding (Session 3, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding (Buổi #3, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s3",
        "Compute Optimized EC2 Instances (C Family) for CPU-Bound Encoding"
      ]
    }
  ],
  "4": [
    {
      "id": "s4-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        4
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Security Group Referencing between ALB and EC2 Tier (Session 4, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Security Group Referencing between ALB and EC2 Tier (Buổi #4, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure the EC2 security group inbound rule to allow HTTP traffic from the hardcoded public IPv4 addresses of the ALB nodes while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Create a custom Network ACL rule that filters inbound packets using the public DNS hostname of the Application Load Balancer.",
        "C. Add an explicit deny rule inside the EC2 security group to block direct internet traffic while leaving port 80 open to 0.0.0.0/0.",
        "D. Configure the EC2 security group inbound rule to allow HTTP traffic exclusively from the security group ID of the Application Load Balancer."
      ],
      "correctIdx": 3,
      "explanation": "Vì IP của ALB thay đổi linh hoạt, chuẩn thiết kế bảo mật nhiều tầng là tham chiếu trực tiếp Security Group ID của ALB làm nguồn (Source) trong Inbound Rule của EC2 Security Group.",
      "whyWrong": [
        "IP của ALB thay đổi tự động khi co giãn nên việc cấu hình cứng theo địa chỉ IP sẽ làm đứt kết nối.",
        "Network ACL chỉ hiểu địa chỉ IP/CIDR block, không thể cấu hình lọc theo tên miền DNS.",
        "Security Group chỉ hỗ trợ quy tắc Allow (không có quy tắc Deny).",
        null
      ],
      "tags": [
        "s4",
        "Security Group Referencing between ALB and EC2 Tier"
      ]
    },
    {
      "id": "s4-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        4
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Stateful Nature of Security Groups vs Ephemeral Return Ports (Session 4, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Stateful Nature of Security Groups vs Ephemeral Return Ports (Buổi #4, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Security groups are stateful, so return traffic for an allowed inbound HTTP request is automatically permitted regardless of outbound rules.",
        "B. Security groups are stateless, so the administrator must manually open outbound ephemeral ports 1024-65535 for responses to succeed while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Security groups evaluate rules in numerical order from lowest to highest rule number before permitting return packets.",
        "D. Security groups automatically rewrite the destination port of blocked outbound packets to port 443 through the Internet Gateway."
      ],
      "correctIdx": 0,
      "explanation": "Security Group hoạt động theo cơ chế Stateful (Có trạng thái): một khi kết nối đã được cho phép đi vào (Inbound), luồng gói tin phản hồi của kết nối đó tự động được phép đi ra bất kể bảng Outbound rules ra sao.",
      "whyWrong": [
        null,
        "Stateless là đặc điểm của Network ACL (NACL), không phải của Security Group.",
        "Đánh số thứ tự rule và xét từ nhỏ đến lớn là cơ chế của Network ACL; Security Group gộp tất cả các rule Allow lại.",
        "Security Group không tự động viết lại cổng đích của gói tin."
      ],
      "tags": [
        "s4",
        "Stateful Nature of Security Groups vs Ephemeral Return Ports"
      ]
    },
    {
      "id": "s4-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        4
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Troubleshooting Connection Timeouts vs Connection Refused on EC2 (Session 4, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Troubleshooting Connection Timeouts vs Connection Refused on EC2 (Buổi #4, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. A Connection Timed Out error proves the web server daemon crashed inside Linux, whereas Connection Refused proves the IAM role expired while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Both errors are caused exclusively by expired Amazon Route 53 DNS records and require flushing the client browser cache.",
        "C. A Connection Timed Out error indicates the Security Group or NACL silently dropped the packet, whereas Connection Refused means the packet reached the OS but the application is not listening.",
        "D. A Connection Refused error indicates that the EC2 instance lacks an Elastic IP address in a private subnet."
      ],
      "correctIdx": 2,
      "explanation": "Trong bài thi SAA-C03, lỗi 'Connection Timed Out' gần như luôn do tường lửa mạng (Security Group thiếu Inbound rule hoặc NACL chặn) âm thầm hủy gói tin. Ngược lại, 'Connection Refused' nghĩa là gói tin đã đi qua tường lửa tới được OS nhưng ứng dụng web chưa chạy hoặc lắng nghe sai cổng.",
      "whyWrong": [
        "Nếu daemon web bị tắt nhưng tường lửa mở, OS sẽ trả về gói RST báo Connection Refused chứ không phải Timed Out.",
        "Lỗi DNS thường báo không phân giải được tên miền (NXDOMAIN), không phải quy tắc phân biệt Timed Out và Refused của TCP.",
        null,
        "Thiếu Elastic IP sẽ khiến không có địa chỉ định tuyến hoặc bị chặn mạng (Timed Out), không trả về Connection Refused từ OS."
      ],
      "tags": [
        "s4",
        "Troubleshooting Connection Timeouts vs Connection Refused on EC2"
      ]
    }
  ],
  "5": [
    {
      "id": "s5-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        5
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Compute Savings Plans vs EC2 Instance Savings Plans Flexibility (Session 5, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Compute Savings Plans vs EC2 Instance Savings Plans Flexibility (Buổi #5, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Purchase Standard Reserved Instances locked to a single Availability Zone and a single x86 instance size with no ability to change families while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use EC2 Spot Instances with a maximum price cap for the stateful production database to guarantee zero interruptions.",
        "C. Provision Dedicated Hosts for three years to automatically migrate containers to AWS Lambda without code changes.",
        "D. Purchase a Compute Savings Plan so the discount automatically applies across EC2 instance families, Regions, and AWS Fargate or AWS Lambda."
      ],
      "correctIdx": 3,
      "explanation": "Compute Savings Plans mang lại sự linh hoạt cao nhất (giảm giá tới 66%), tự động áp dụng khi đổi dòng máy (C5 sang M6g), đổi Region, đổi OS, và áp dụng sang cả AWS Fargate lẫn AWS Lambda.",
      "whyWrong": [
        "Standard RI bị khóa chặt vào dòng máy và Region đã mua, không tự động áp dụng khi chuyển sang Fargate hoặc Lambda.",
        "Spot Instance có thể bị AWS thu hồi bất cứ lúc nào với thông báo trước 2 phút, tuyệt đối không dùng cho Database chính.",
        "Dedicated Hosts là máy chủ vật lý riêng biệt cho bài toán bản quyền BYOL, không giảm giá cho Fargate hay Lambda.",
        null
      ],
      "tags": [
        "s5",
        "Compute Savings Plans vs EC2 Instance Savings Plans Flexibility"
      ]
    },
    {
      "id": "s5-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        5
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL) (Session 5, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL) (Buổi #5, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Launch the instances on EC2 Dedicated Hosts to gain visibility and control over the underlying physical processor sockets and cores.",
        "B. Launch the instances as EC2 Dedicated Instances, which expose physical socket counts while sharing hardware with other AWS accounts while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use EC2 On-Demand Capacity Reservations in a shared tenancy subnet to satisfy physical core licensing audits.",
        "D. Deploy the workload on Spot Fleet instances across multiple Availability Zones to track physical motherboard serial numbers."
      ],
      "correctIdx": 0,
      "explanation": "Khi đề bài yêu cầu mang bản quyền phần mềm cũ tính theo số lượng lõi/socket vật lý (Server-bound licensing như Windows Server, SQL Server, Oracle BYOL) hoặc cần kiểm soát vị trí phần cứng vật lý, bắt buộc chọn EC2 Dedicated Hosts.",
      "whyWrong": [
        null,
        "Dedicated Instances tuy cô lập phần cứng theo tài khoản nhưng KHÔNG cho phép nhìn thấy số socket/core vật lý và có thể đổi máy vật lý khi reboot.",
        "Capacity Reservation trên phần cứng dùng chung (Shared tenancy) không đáp ứng yêu cầu kiểm toán socket vật lý.",
        "Spot Fleet chạy trên phần cứng dùng chung và có thể bị thu hồi bất ngờ."
      ],
      "tags": [
        "s5",
        "EC2 Dedicated Hosts for Server-Bound Per-Socket/Per-Core Software Licensing (BYOL)"
      ]
    },
    {
      "id": "s5-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        5
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads (Session 5, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads (Buổi #5, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s5",
        "EC2 Spot Instances for Fault-Tolerant Stateless Batch Workloads"
      ]
    }
  ],
  "6": [
    {
      "id": "s6-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        6
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Cluster Placement Group for Low-Latency 100 Gbps HPC Networking (Session 6, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Cluster Placement Group for Low-Latency 100 Gbps HPC Networking (Buổi #6, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Launch the instances inside a Spread Placement Group distributed across three separate AWS Regions while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Launch the instances inside a Partition Placement Group spanning multiple Availability Zones with standard public IP routing.",
        "C. Attach multiple Elastic IP addresses to each instance and route HPC packets through a public NAT Gateway.",
        "D. Launch the instances inside a Cluster Placement Group within a single Availability Zone using Enhanced Networking (ENA)."
      ],
      "correctIdx": 3,
      "explanation": "Cluster Placement Group gom các máy EC2 vào sát nhau trên cùng hệ thống rack trong 1 Availability Zone, mang lại độ trễ mạng cực thấp (low latency) và băng thông mạng tối đa cho bài toán HPC.",
      "whyWrong": [
        "Spread Placement Group tách các máy ra các rack khác nhau và giới hạn tối đa 7 máy/AZ, không tối ưu độ trễ cực thấp cho cụm HPC lớn.",
        "Partition Placement Group dành cho hệ thống phân tán lớn (HDFS, Kafka, Cassandra) chống lỗi theo phân vùng rack.",
        "Định tuyến qua Elastic IP và NAT Gateway làm tăng độ trễ và phát sinh phí truyền dữ liệu không cần thiết.",
        null
      ],
      "tags": [
        "s6",
        "Cluster Placement Group for Low-Latency 100 Gbps HPC Networking"
      ]
    },
    {
      "id": "s6-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        6
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Spread Placement Group for Critical Instances (Max 7 per AZ) (Session 6, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Spread Placement Group for Critical Instances (Max 7 per AZ) (Buổi #6, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Place the 5 critical database instances into a Spread Placement Group so each instance runs on a distinct hardware rack with its own power and network.",
        "B. Place 50 instances per Availability Zone into a single Spread Placement Group to exceed the hardware isolation limit while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Place all 5 critical instances into a single Cluster Placement Group so they share the exact same physical rack.",
        "D. Attach five secondary Elastic Network Interfaces from different Availability Zones to a single EC2 instance."
      ],
      "correctIdx": 0,
      "explanation": "Spread Placement Group đảm bảo mỗi máy ảo EC2 nằm trên một tủ rack vật lý hoàn toàn khác nhau (có nguồn điện và mạng riêng), giảm tối đa rủi ro sập đồng thời cho số lượng ít các máy cực kỳ quan trọng (giới hạn tối đa 7 instances/AZ).",
      "whyWrong": [
        null,
        "Spread Placement Group có giới hạn cứng là tối đa 7 instances trên mỗi Availability Zone.",
        "Cluster Placement Group đặt tất cả máy lên cùng rack nên nếu rack đó mất điện, toàn bộ 5 máy sẽ sập cùng lúc.",
        "Một ENI chỉ gắn được cho máy EC2 nằm trong cùng một Availability Zone với nó."
      ],
      "tags": [
        "s6",
        "Spread Placement Group for Critical Instances (Max 7 per AZ)"
      ]
    },
    {
      "id": "s6-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        6
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra) (Session 6, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra) (Buổi #6, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s6",
        "Partition Placement Group for Distributed Replicated Systems (HDFS, Kafka, Cassandra)"
      ]
    }
  ],
  "7": [
    {
      "id": "s7-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        7
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 Hibernate Prerequisites & Fast Warm-Cache Startup (Session 7, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 Hibernate Prerequisites & Fast Warm-Cache Startup (Buổi #7, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s7",
        "EC2 Hibernate Prerequisites & Fast Warm-Cache Startup"
      ]
    },
    {
      "id": "s7-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        7
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior (Session 7, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior (Buổi #7, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Stopping or hibernating an EBS-backed instance stops compute (vCPU/RAM) billing while retaining the private IPv4 address and continuing EBS volume charges.",
        "B. Stopping an EC2 instance releases its private IPv4 address inside the VPC subnet and deletes all attached Amazon EBS volumes while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Hibernating an EC2 instance continues to bill for hourly vCPU compute capacity at the full On-Demand rate while powered down.",
        "D. Rebooting an EC2 instance assigns a brand-new private IPv4 address and triggers a minimum one-hour billing increment reset."
      ],
      "correctIdx": 0,
      "explanation": "Khi Stop hoặc Hibernate máy EC2 (EBS-backed), AWS ngừng tính tiền Compute (EC2), giữ nguyên địa chỉ Private IPv4 (và Public IP nếu là Elastic IP), nhưng vẫn tính phí dung lượng ổ cứng EBS đang lưu trữ.",
      "whyWrong": [
        null,
        "Khi Stop máy EC2, địa chỉ Private IPv4 vẫn được giữ nguyên (chỉ có Public IPv4 động mới bị thu hồi).",
        "Khi máy đã vào trạng thái Hibernated (Stopped), AWS không tính phí vCPU/RAM mà chỉ tính phí lưu trữ EBS.",
        "Reboot máy EC2 giữ nguyên toàn bộ địa chỉ Private IP, Public IP và dữ liệu trên cả Instance Store."
      ],
      "tags": [
        "s7",
        "EC2 Stop vs Terminate vs Hibernate Billing & IP Behavior"
      ]
    },
    {
      "id": "s7-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.2",
      "sessionIds": [
        7
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Nitro System & Nitro Enclaves for Isolated Sensitive Data Processing (Session 7, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Nitro System & Nitro Enclaves for Isolated Sensitive Data Processing (Buổi #7, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s7",
        "AWS Nitro System & Nitro Enclaves for Isolated Sensitive Data Processing"
      ]
    }
  ],
  "8": [
    {
      "id": "s8-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        8
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Migrating an EBS Volume Across Availability Zones via Snapshot (Session 8, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Migrating an EBS Volume Across Availability Zones via Snapshot (Buổi #8, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s8",
        "Migrating an EBS Volume Across Availability Zones via Snapshot"
      ]
    },
    {
      "id": "s8-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        8
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty (Session 8, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty (Buổi #8, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s8",
        "EBS Fast Snapshot Restore (FSR) vs Lazy Loading First-Read Penalty"
      ]
    },
    {
      "id": "s8-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        8
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore) (Session 8, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore) (Buổi #8, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Enable EBS Fast Snapshot Restore on all 500 historical snapshots to minimize monthly storage billing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Convert the snapshots into provisioned IOPS io2 Block Express volumes and leave them unattached in the account.",
        "C. Move the rarely accessed compliance snapshots to the Amazon EBS Snapshot Archive tier to reduce snapshot storage costs by up to 75%.",
        "D. Store the EBS snapshots inside an unencrypted EC2 Instance Store volume for long-term 7-year retention."
      ],
      "correctIdx": 2,
      "explanation": "Với các bản EBS Snapshot cần lưu trữ dài hạn (>= 90 ngày) hiếm khi khôi phục và chấp nhận thời gian lấy lại 24–72 giờ, chuyển sang EBS Snapshot Archive giúp tiết kiệm tới 75% chi phí lưu trữ.",
      "whyWrong": [
        "Fast Snapshot Restore tính phí rất cao theo giờ cho mỗi Snapshot/AZ để giữ ổ luôn nóng, làm tăng vọt chi phí.",
        "Tạo ổ io2 thật từ Snapshot sẽ tốn chi phí lưu trữ và IOPS đắt gấp nhiều lần so với giữ ở dạng Snapshot.",
        null,
        "Instance Store là ổ tạm mất sạch dữ liệu khi tắt máy, không thể lưu trữ kiểm toán dài hạn."
      ],
      "tags": [
        "s8",
        "EBS Snapshot Archive Tier (90+ Days Retention, 75% Cheaper, 24-72h Restore)"
      ]
    }
  ],
  "9": [
    {
      "id": "s9-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        9
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EBS gp3 Independent IOPS/Throughput Tuning vs io2 Block Express for >80,000 IOPS and 99.999% durability (Session 9, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EBS gp3 Independent IOPS/Throughput Tuning vs io2 Block Express cho >80,000 IOPS và độ bền 99.999% (Buổi #9, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Use a single Amazon EBS General Purpose SSD (gp3) volume without redundancy when the mission-critical database requires 256,000 IOPS and 99.999% durability while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use Amazon EBS Throughput Optimized HDD (st1) as the boot volume and primary random-I/O database disk.",
        "C. Use Amazon EBS Cold HDD (sc1) volumes to achieve 64,000 random IOPS at the lowest cost.",
        "D. Use Amazon EBS Provisioned IOPS SSD (io2 Block Express) volumes, which support up to 256,000 IOPS and sub-millisecond latency."
      ],
      "correctIdx": 3,
      "explanation": "Ổ gp3 hiện hỗ trợ cấu hình độc lập IOPS (tối đa tới 80,000 IOPS) và Throughput (tối đa 2,000 MB/s). Tuy nhiên khi cơ sở dữ liệu mission-critical yêu cầu hiệu năng lên tới 256,000 IOPS kèm độ bền 99.999% và EBS Multi-Attach, bắt buộc phải dùng dòng io2 Block Express.",
      "whyWrong": [
        "Một ổ gp3 đơn lẻ chỉ đạt tối đa 80,000 IOPS với độ bền 99.8%–99.9%, không đạt mức 256,000 IOPS và 99.999% durability.",
        "Ổ HDD (st1/sc1) không thể làm Boot Volume và không phù hợp cho cơ sở dữ liệu OLTP cần random IOPS cao.",
        "Cold HDD (sc1) chỉ đạt tối đa vài trăm IOPS cho dữ liệu tuần tự ít truy cập.",
        null
      ],
      "tags": [
        "s9",
        "EBS gp3 Independent IOPS/Throughput Tuning vs io2 Block Express"
      ]
    },
    {
      "id": "s9-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        9
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EBS Multi-Attach (io1/io2 Only, Single AZ, Cluster-Aware File System) (Session 9, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EBS Multi-Attach (io1/io2 Only, Single AZ, Cluster-Aware File System) (Buổi #9, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s9",
        "EBS Multi-Attach (io1/io2 Only, Single AZ, Cluster-Aware File System)"
      ]
    },
    {
      "id": "s9-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        9
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence (Session 9, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence (Buổi #9, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Store the long-term master financial ledger exclusively on EC2 Instance Store volumes and stop the instances every night to save money while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use Cold HDD (sc1) EBS volumes to achieve over 300,000 random IOPS for the real-time scratch cache.",
        "C. Use EC2 instances equipped with local NVMe Instance Store volumes for the temporary scratch data while writing final results to Amazon S3.",
        "D. Use an Amazon S3 Glacier Deep Archive vault mounted as a block device for microsecond scratch disk operations."
      ],
      "correctIdx": 2,
      "explanation": "Khi bài toán cần tốc độ đọc/ghi đĩa cực khủng (hàng trăm nghìn tới hàng triệu IOPS, độ trễ cực thấp) cho dữ liệu tạm thời (scratch data, buffer, cache, temp files có thể tái tạo được), giải pháp tốt nhất là ổ đĩa gắn trực tiếp vào máy chủ vật lý EC2 Instance Store (NVMe).",
      "whyWrong": [
        "Dữ liệu trên Instance Store sẽ bị xóa sạch hoàn toàn nếu máy EC2 bị Stop hoặc phần cứng vật lý gặp sự cố.",
        "Cold HDD (sc1) là ổ đĩa từ chậm nhất, không thể cung cấp hàng trăm nghìn IOPS ngẫu nhiên.",
        null,
        "S3 Glacier Deep Archive là lưu trữ đối tượng băng từ lấy lại sau 12–48 giờ, không phải ổ đĩa block tốc độ cao."
      ],
      "tags": [
        "s9",
        "EC2 Instance Store for Extreme Ephemeral Scratch IOPS vs EBS Persistence"
      ]
    }
  ],
  "10": [
    {
      "id": "s10-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        10
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon EFS Shared POSIX File System Across Multiple Availability Zones (Session 10, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon EFS Shared POSIX File System Across Multiple Availability Zones (Buổi #10, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Create a single Amazon EBS gp3 volume and enable Multi-Attach across all three Availability Zones while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Mount an Amazon S3 bucket directly as a POSIX kernel block device with file-locking support without third-party adapters.",
        "C. Use EC2 Instance Store volumes on each server and rely on AWS hardware to synchronize files across Availability Zones.",
        "D. Create an Amazon EFS file system with mount targets in each Availability Zone so all Linux EC2 instances can mount it concurrently over NFSv4."
      ],
      "correctIdx": 3,
      "explanation": "Khi nhiều máy EC2 Linux chạy trên nhiều Availability Zones cần dùng chung một hệ thống file chia sẻ (Shared File System) chuẩn POSIX/NFSv4 và tự động co giãn dung lượng, đáp án chuẩn luôn là Amazon EFS.",
      "whyWrong": [
        "EBS gp3 không hỗ trợ Multi-Attach và EBS cũng không thể gắn xuyên qua nhiều Availability Zones.",
        "S3 là Object Storage truy cập qua REST API, không phải hệ thống file POSIX hỗ trợ gắn mount trực tiếp kèm khóa file (file locking).",
        "Instance Store là ổ đĩa cục bộ cô lập trên từng máy, AWS không tự động đồng bộ nội dung giữa các máy.",
        null
      ],
      "tags": [
        "s10",
        "Amazon EFS Shared POSIX File System Across Multiple Availability Zones"
      ]
    },
    {
      "id": "s10-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        10
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA) (Session 10, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA) (Buổi #10, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s10",
        "Amazon EFS Lifecycle Management & EFS Infrequent Access (EFS IA)"
      ]
    },
    {
      "id": "s10-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        10
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon EFS Access Points for Application-Specific POSIX User & Root Directory Enforcement (Session 10, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon EFS Access Points for Application-Specific POSIX User & Root Directory Enforcement (Buổi #10, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision 20 separate Amazon EFS file systems and 60 VPC Peering connections for each microservice container while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use Amazon S3 Canned ACLs on the EFS mount targets to restrict Linux UID and GID permissions.",
        "C. Create Amazon EFS Access Points configured with distinct POSIX user/group IDs and root directory paths, and enforce access via an EFS file system IAM policy.",
        "D. Configure an Application Load Balancer listener rule to rewrite NFSv4 packet headers between containers."
      ],
      "correctIdx": 2,
      "explanation": "EFS Access Points là các điểm vào cấp ứng dụng giúp ép buộc (enforce) định danh POSIX user/group (UID/GID) và khóa từng container/microservice vào đúng một thư mục gốc riêng (chroot) trên cùng một hệ thống EFS chung.",
      "whyWrong": [
        "Tạo 20 hệ thống EFS riêng biệt gây tốn kém chi phí và phức tạp vận hành không cần thiết.",
        "S3 Canned ACL là cơ chế của Object Storage S3, không tồn tại trên hệ thống file EFS.",
        null,
        "ALB chỉ hoạt động ở tầng 7 (HTTP/HTTPS/gRPC), không thể định tuyến hay sửa gói tin NFSv4 (tầng 4 TCP 2049)."
      ],
      "tags": [
        "s10",
        "Amazon EFS Access Points for Application-Specific POSIX User & Root Directory Enforcement"
      ]
    }
  ],
  "11": [
    {
      "id": "s11-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        11
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ALB Path-Based & Host-Based Routing for Microservices (Session 11, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ALB Path-Based & Host-Based Routing for Microservices (Buổi #11, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s11",
        "ALB Path-Based & Host-Based Routing for Microservices"
      ]
    },
    {
      "id": "s11-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        11
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Preserving Client Source IP with Application Load Balancer (X-Forwarded-For) (Session 11, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Preserving Client Source IP with Application Load Balancer (X-Forwarded-For) (Buổi #11, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Read the original client IPv4 address from the X-Forwarded-For HTTP request header injected by the Application Load Balancer.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Khi đi qua ALB, kết nối TCP bị ngắt tại ALB nên gói tin tới EC2 mang Private IP của ALB. Địa chỉ IP thật của người dùng được ALB ghi vào HTTP Header X-Forwarded-For (cùng X-Forwarded-Proto và X-Forwarded-Port).",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s11",
        "Preserving Client Source IP with Application Load Balancer (X-Forwarded-For)"
      ]
    },
    {
      "id": "s11-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        11
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ALB Multi-Target Support (EC2, ECS Dynamic Ports, Lambda, Private IP) (Session 11, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ALB Multi-Target Support (EC2, ECS Dynamic Ports, Lambda, Private IP) (Buổi #11, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Register the AWS Lambda function directly as a target in an Application Load Balancer target group to serve HTTP requests.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "ALB hỗ trợ 4 loại đích (Target types): Instance ID, IP address (kể cả IP dưới On-prem qua DX/VPN), hàm AWS Lambda, và container ECS dùng Dynamic Port Mapping.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s11",
        "ALB Multi-Target Support (EC2, ECS Dynamic Ports, Lambda, Private IP)"
      ]
    }
  ],
  "12": [
    {
      "id": "s12-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        12
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Network Load Balancer (NLB) for Ultra-Low Latency TCP/UDP & Static Elastic IP per AZ (Session 12, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Network Load Balancer (NLB) for Ultra-Low Latency TCP/UDP & Static Elastic IP per AZ (Buổi #12, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Deploy a Network Load Balancer (NLB) and assign one Elastic IP address per Availability Zone so partners can whitelist fixed IPs."
      ],
      "correctIdx": 3,
      "explanation": "Network Load Balancer (NLB) hoạt động ở tầng 4 (TCP/UDP/TLS), xử lý hàng triệu request/giây với độ trễ cực thấp (~100ms so với ~400ms của ALB) và cung cấp 1 địa chỉ Static IP / Elastic IP cố định trên mỗi AZ.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s12",
        "Network Load Balancer (NLB) for Ultra-Low Latency TCP/UDP & Static Elastic IP per AZ"
      ]
    },
    {
      "id": "s12-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        12
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances (Session 12, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances (Buổi #12, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s12",
        "Gateway Load Balancer (GWLB) with GENEVE Protocol (Port 6081) for Third-Party Virtual Appliances"
      ]
    },
    {
      "id": "s12-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        12
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on NLB Preserving Source IP Directly vs ALB X-Forwarded-For (Session 12, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến NLB Preserving Source IP Directly vs ALB X-Forwarded-For (Buổi #12, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Use a Network Load Balancer (NLB) registering targets by instance ID so the backend servers see the client's original source IP in the TCP packet.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "Khác với ALB, Network Load Balancer (NLB) giữ nguyên địa chỉ Source IP gốc của client ở tầng mạng TCP/UDP khi chuyển gói tin vào backend (nếu đăng ký target theo Instance ID hoặc bật Client IP preservation).",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s12",
        "NLB Preserving Source IP Directly vs ALB X-Forwarded-For"
      ]
    }
  ],
  "13": [
    {
      "id": "s13-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        13
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ALB Sticky Sessions (Application-Based vs Duration-Based Cookies) (Session 13, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ALB Sticky Sessions (Application-Based vs Duration-Based Cookies) (Buổi #13, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Enable Sticky Sessions (Session Affinity) on the Application Load Balancer target group so requests from the same user bind to the same instance."
      ],
      "correctIdx": 3,
      "explanation": "Sticky Sessions (Session Affinity) trên ALB dùng cookie (AWSALB / AWSALBCORS do ALB tự sinh hoặc cookie riêng của ứng dụng) để gắn chặt các request của cùng 1 phiên người dùng vào đúng máy EC2 đã phục vụ lần đầu.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s13",
        "ALB Sticky Sessions (Application-Based vs Duration-Based Cookies)"
      ]
    },
    {
      "id": "s13-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        13
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Cross-Zone Load Balancing Default Behavior & Inter-AZ Data Charges (ALB vs NLB) (Session 13, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Cross-Zone Load Balancing Default Behavior & Inter-AZ Data Charges (ALB vs NLB) (Buổi #13, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Enable Cross-Zone Load Balancing on the Network Load Balancer target group so all 10 instances across both AZs receive an equal 10% share of traffic.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Với ALB, Cross-Zone Load Balancing luôn BẬT mặc định và miễn phí truyền dữ liệu liên AZ. Với NLB và GWLB, tính năng này TẮT mặc định (nếu bật lên sẽ giúp chia đều tải cho mọi máy ở các AZ nhưng phát sinh phí truyền dữ liệu Regional Data Transfer giữa các AZ).",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s13",
        "Cross-Zone Load Balancing Default Behavior & Inter-AZ Data Charges (ALB vs NLB)"
      ]
    },
    {
      "id": "s13-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        13
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB (Session 13, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB (Buổi #13, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s13",
        "SNI (Server Name Indication) for Hosting Multiple SSL Certificates on One ALB/NLB"
      ]
    }
  ],
  "14": [
    {
      "id": "s14-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        14
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests (Session 14, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests (Buổi #14, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s14",
        "Auto Scaling Group Deregistration Delay (Connection Draining) for In-Flight Requests"
      ]
    },
    {
      "id": "s14-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        14
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ASG Scaling Policies: Target Tracking vs Step Scaling vs Predictive Scaling (Session 14, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ASG Scaling Policies: Target Tracking vs Step Scaling vs Predictive Scaling (Buổi #14, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure a Target Tracking Scaling policy set to maintain an average CPU utilization of 60% across the Auto Scaling group.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Target Tracking Scaling là chính sách đơn giản và được khuyến nghị nhất khi muốn duy trì một chỉ số ở ngưỡng mục tiêu (ví dụ Average CPU = 60% hoặc RequestCountPerTarget = 1000). Predictive Scaling dùng Machine Learning dự báo tải có chu kỳ để bật máy trước.",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s14",
        "ASG Scaling Policies: Target Tracking vs Step Scaling vs Predictive Scaling"
      ]
    },
    {
      "id": "s14-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        14
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on ASG Lifecycle Hooks & Health Check Grace Period for Custom Warm-Up Actions (Session 14, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến ASG Lifecycle Hooks & Health Check Grace Period for Custom Warm-Up Actions (Buổi #14, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Add an Auto Scaling Lifecycle Hook on the Pending:Wait state or Terminating:Wait state to run custom scripts before the instance enters or leaves service.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "ASG Lifecycle Hooks cho phép tạm dừng quá trình bật máy (Pending:Wait) để cài đặt/nạp cache lâu, hoặc tạm dừng quá trình xóa máy (Terminating:Wait) để kịp đẩy toàn bộ log và dữ liệu chẩn đoán từ máy sắp thu hồi lên S3 trước khi máy bị xóa hẳn.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s14",
        "ASG Lifecycle Hooks & Health Check Grace Period for Custom Warm-Up Actions"
      ]
    }
  ],
  "15": [
    {
      "id": "s15-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        15
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Strong Read-After-Write Consistency for PUTs and DELETEs (Session 15, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Strong Read-After-Write Consistency for PUTs and DELETEs (Buổi #15, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Rely on Amazon S3's built-in strong read-after-write consistency for all new object PUTs, overwrites, and DELETEs without adding an external coordination database."
      ],
      "correctIdx": 3,
      "explanation": "Từ tháng 12/2020, Amazon S3 cung cấp tính nhất quán mạnh (Strong Read-After-Write Consistency) mặc định và miễn phí cho MỌI thao tác PUT (tạo mới hoặc ghi đè), DELETE và LIST object trên toàn bộ các Region.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s15",
        "S3 Strong Read-After-Write Consistency for PUTs and DELETEs"
      ]
    },
    {
      "id": "s15-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        15
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite (Session 15, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite (Buổi #15, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s15",
        "S3 Cross-Region Replication (CRR) vs Same-Region Replication (SRR) & Versioning Prerequisite"
      ]
    },
    {
      "id": "s15-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        15
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Replication Delete Marker Behavior & Replicating Encrypted Objects (SSE-KMS) (Session 15, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements? (Choose TWO.)",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Replication Delete Marker Behavior & Replicating Encrypted Objects (SSE-KMS) (Buổi #15, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này? (Chọn 2 phương án.)",
      "options": [
        "A. Explicitly enable Delete Marker replication in the replication rule if soft deletes should propagate, while noting that permanent version deletes are never replicated.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Verify that least-privilege IAM permissions and encryption in transit are configured for all participating AWS resources.",
        "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdxs": [
        0,
        2
      ],
      "explanation": "Mặc định S3 Replication KHÔNG nhân bản Delete Markers (trừ khi bật tùy chọn Delete Marker Replication) và KHÔNG BAO GIỜ nhân bản các thao tác xóa vĩnh viễn theo Version ID (nhằm chống kẻ tấn công xóa sạch cả bản sao dự phòng).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s15",
        "S3 Replication Delete Marker Behavior & Replicating Encrypted Objects (SSE-KMS)"
      ]
    }
  ],
  "16": [
    {
      "id": "s16-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.1",
      "sessionIds": [
        16
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Storage Classes: S3 Standard-IA vs S3 One Zone-IA vs S3 Intelligent-Tiering (Session 16, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Storage Classes: S3 Standard-IA vs S3 One Zone-IA vs S3 Intelligent-Tiering (Buổi #16, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Use Amazon S3 Intelligent-Tiering, which automatically moves objects between access tiers based on changing usage patterns with zero retrieval fees.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Khi bài toán có mẫu truy cập dữ liệu không dự đoán được (unpredictable/unknown access patterns) và không muốn bị phạt phí lấy dữ liệu (no retrieval fees), đáp án chuẩn là S3 Intelligent-Tiering.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s16",
        "S3 Storage Classes: S3 Standard-IA vs S3 One Zone-IA vs S3 Intelligent-Tiering"
      ]
    },
    {
      "id": "s16-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.1",
      "sessionIds": [
        16
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Glacier Retrieval Options: Instant Retrieval (ms) vs Flexible Retrieval (1-5m Expedited) vs Deep Archive (12h) (Session 16, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Glacier Retrieval Options: Instant Retrieval (ms) vs Flexible Retrieval (1-5m Expedited) vs Deep Archive (12h) (Buổi #16, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Store the medical images in Amazon S3 Glacier Instant Retrieval, which provides millisecond access latency for data accessed once per quarter."
      ],
      "correctIdx": 3,
      "explanation": "S3 Glacier Instant Retrieval có giá lưu trữ siêu rẻ cho dữ liệu hiếm khi đọc (1 lần/quý, lưu tối thiểu 90 ngày) nhưng khi cần lại lấy ra được ngay lập tức trong vài mili-giây (milliseconds) giống S3 Standard.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s16",
        "S3 Glacier Retrieval Options: Instant Retrieval (ms) vs Flexible Retrieval (1-5m Expedited) vs Deep Archive (12h)"
      ]
    },
    {
      "id": "s16-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.1",
      "sessionIds": [
        16
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive) (Session 16, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive) (Buổi #16, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s16",
        "S3 Lifecycle Rules & Minimum Storage Duration (30 Days IA, 90 Days Glacier Instant/Flexible, 180 Days Deep Archive)"
      ]
    }
  ],
  "17": [
    {
      "id": "s17-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        17
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration (Session 17, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration (Buổi #17, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s17",
        "S3 Multi-Part Upload (>100 MB Recommended, >5 GB Mandatory) & S3 Transfer Acceleration"
      ]
    },
    {
      "id": "s17-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        17
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Byte-Range Fetches for Parallel Downloads & Partial Header Reads (Session 17, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Byte-Range Fetches for Parallel Downloads & Partial Header Reads (Buổi #17, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Use S3 Byte-Range Fetches by specifying the Range HTTP header to download byte segments in parallel or read only the first 64 KB header."
      ],
      "correctIdx": 3,
      "explanation": "Khi tải file lớn từ S3 về (Download) hoặc chỉ muốn đọc phần đầu (header) của một file lớn mà không tải cả file, dùng S3 Byte-Range Fetches.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s17",
        "S3 Byte-Range Fetches for Parallel Downloads & Partial Header Reads"
      ]
    },
    {
      "id": "s17-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        17
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Event Notifications vs S3 with Amazon EventBridge (Advanced JSON Filtering, Multiple Targets, Archive/Replay) (Session 17, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Event Notifications vs S3 with Amazon EventBridge (Advanced JSON Filtering, Multiple Targets, Archive/Replay) (Buổi #17, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Enable Amazon EventBridge integration on the S3 bucket to filter events by object metadata/size and fan out to 18+ AWS service targets with event replay.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "S3 Event Notifications truyền thống chỉ gửi được tới 3 đích (SNS, SQS, Lambda) và chỉ lọc được theo Prefix/Suffix. Khi cần lọc nâng cao theo kích thước/metadata, gửi tới đồng thời nhiều đích (Step Functions, Kinesis, ECS...) hoặc lưu trữ/phát lại (Archive & Replay), phải bật tích hợp S3 với Amazon EventBridge.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s17",
        "S3 Event Notifications vs S3 with Amazon EventBridge (Advanced JSON Filtering, Multiple Targets, Archive/Replay)"
      ]
    }
  ],
  "18": [
    {
      "id": "s18-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        18
      ],
      "difficulty": "easy",
      "qEn": "A multi-account enterprise wants to guarantee that no developer can accidentally make any existing or new Amazon S3 bucket public across the entire AWS account, and ensure that every object uploaded by partner accounts to a central bucket is automatically owned by the central bucket owner without using ACLs. Which configuration meets these requirements?",
      "qVi": "Doanh nghiệp muốn đảm bảo không ai vô tình mở quyền công khai (public) cho bất kỳ S3 bucket nào trong toàn tài khoản, đồng thời mọi file do đối tác tải lên bucket chung phải tự động thuộc quyền sở hữu của chủ bucket mà không dùng ACL. Cấu hình nào đáp ứng yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Enable S3 Block Public Access at the account level and set S3 Object Ownership to Bucket owner enforced to disable ACLs and own all uploaded objects.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Bật S3 Block Public Access ở cấp Account chặn mọi truy cập public. Đặt S3 Object Ownership = Bucket owner enforced sẽ vô hiệu hóa toàn bộ ACL và tự động gán quyền sở hữu mọi file do tài khoản khác tải lên cho chủ Bucket.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s18",
        "S3 Block Public Access & S3 Object Ownership (Bucket Owner Enforced)"
      ]
    },
    {
      "id": "s18-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        18
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS (Session 18, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS (Buổi #18, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Enforce Server-Side Encryption with AWS KMS keys (SSE-KMS) using a customer managed key so every decryption call is logged in AWS CloudTrail."
      ],
      "correctIdx": 3,
      "explanation": "S3 mặc định mã hóa mọi object mới bằng SSE-S3 (AES-256). Khi kiểm toán yêu cầu kiểm soát quyền xoay vòng khóa (Key Rotation), phân quyền tách biệt qua Key Policy và ghi nhật ký từng lần giải mã trong AWS CloudTrail, bắt buộc dùng SSE-KMS (hoặc DSSE-KMS nếu yêu cầu mã hóa 2 lớp).",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s18",
        "S3 Server-Side Encryption: SSE-S3 (Default) vs SSE-KMS (Audit Trail & Rotation) vs DSSE-KMS"
      ]
    },
    {
      "id": "s18-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        18
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Presigned URLs for Temporary Authenticated Upload/Download Inheriting Issuer Permissions (Session 18, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Presigned URLs for Temporary Authenticated Upload/Download Inheriting Issuer Permissions (Buổi #18, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Generate an Amazon S3 Presigned URL using the backend application's IAM role so authenticated users can upload or download private objects directly.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "S3 Presigned URL cấp quyền tạm thời có thời hạn để người dùng tải lên (PUT) hoặc tải xuống (GET) trực tiếp với S3 mà không làm lộ bucket hay nghẽn băng thông server. Lưu ý: Presigned URL mang đúng quyền hạn của IAM User/Role đã ký tạo ra nó.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s18",
        "S3 Presigned URLs for Temporary Authenticated Upload/Download Inheriting Issuer Permissions"
      ]
    }
  ],
  "19": [
    {
      "id": "s19-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        19
      ],
      "difficulty": "easy",
      "qEn": "A financial company stores regulatory audit logs in a versioned Amazon S3 bucket and wants to require a hardware multi-factor authentication (MFA) code before any object version can be permanently deleted or versioning can be suspended. How should the solutions architect enable this protection?",
      "qVi": "Công ty tài chính lưu log kiểm toán trong S3 bucket đã bật Versioning và muốn bắt buộc nhập mã MFA trước khi bất kỳ phiên bản file nào bị xóa vĩnh viễn hoặc tạm dừng Versioning. Kiến trúc sư nên bật tính năng bảo vệ S3 MFA Delete này như thế nào?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Use the AWS Account Root User credentials in the AWS CLI to enable S3 MFA Delete on the versioned bucket.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Tính năng S3 MFA Delete bắt buộc nhập mã MFA khi xóa vĩnh viễn một Object Version hoặc tắt Versioning. Bẫy kinh điển: chỉ có AWS Account Root User mới bật được MFA Delete thông qua AWS CLI/API (không bật được trên Console).",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s19",
        "S3 MFA Delete (Requires Versioning & Root User via AWS CLI/API Only)"
      ]
    },
    {
      "id": "s19-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        19
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Object Lock (WORM): Compliance Mode vs Governance Mode & Legal Hold (Session 19, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Object Lock (WORM): Compliance Mode vs Governance Mode & Legal Hold (Buổi #19, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Enable S3 Object Lock in Compliance mode with a retention period so no user, including the AWS account root user, can delete or overwrite the object."
      ],
      "correctIdx": 3,
      "explanation": "S3 Object Lock cung cấp cơ chế WORM (Write Once Read Many). Ở chế độ Compliance mode, KHÔNG AI (kể cả Root User) có thể xóa hay rút ngắn thời hạn lưu giữ. Ở chế độ Governance mode, quản trị viên có quyền đặc biệt (s3:BypassGovernanceRetention) kèm header mới sửa được. Legal Hold là khóa vô thời hạn phục vụ điều tra pháp lý.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s19",
        "S3 Object Lock (WORM): Compliance Mode vs Governance Mode & Legal Hold"
      ]
    },
    {
      "id": "s19-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        19
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting (Session 19, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting (Buổi #19, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure Cross-Origin Resource Sharing (CORS) on the destination S3 bucket to allow the Exact Origin domain of the static website bucket.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "CORS (Cross-Origin Resource Sharing) luôn phải được cấu hình trên bucket ĐÍCH (bucket bị gọi tài nguyên chéo tên miền từ trình duyệt) với đúng Origin tên miền của trang web nguồn.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s19",
        "S3 Access Points & Multi-Region Access Points vs S3 CORS Header Troubleshooting"
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
