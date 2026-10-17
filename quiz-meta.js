// quiz-meta.js — Ánh xạ Domain/Task mặc định cho 56 buổi và metadata đầy đủ cho 116 câu hỏi gốc.
(function (root) {
  "use strict";

  const SESSION_DOMAINS = {
  "1": 1,
  "2": 1,
  "3": 3,
  "4": 1,
  "5": 4,
  "6": 3,
  "7": 3,
  "8": 2,
  "9": 3,
  "10": 3,
  "11": 2,
  "12": 3,
  "13": 2,
  "14": 2,
  "15": 2,
  "16": 4,
  "17": 3,
  "18": 1,
  "19": 1,
  "20": 2,
  "21": 3,
  "22": 3,
  "23": 3,
  "24": 2,
  "25": 4,
  "26": 2,
  "27": 3,
  "28": 3,
  "29": 3,
  "30": 3,
  "31": 2,
  "32": 2,
  "33": 3,
  "34": 3,
  "35": 3,
  "36": 2,
  "37": 1,
  "38": 1,
  "39": 4,
  "40": 1,
  "41": 4,
  "42": 3,
  "43": 1,
  "44": 3,
  "45": 3,
  "46": 1,
  "47": 1,
  "48": 1,
  "49": 1,
  "50": 2,
  "51": 4,
  "52": 3,
  "53": 3,
  "54": 2,
  "55": 1,
  "56": 4
};

  const SESSION_TASKS = {
  "1": "1.1",
  "2": "1.1",
  "3": "3.2",
  "4": "1.2",
  "5": "4.2",
  "6": "3.2",
  "7": "3.2",
  "8": "2.2",
  "9": "3.1",
  "10": "3.1",
  "11": "2.1",
  "12": "3.4",
  "13": "2.1",
  "14": "2.1",
  "15": "2.2",
  "16": "4.1",
  "17": "3.1",
  "18": "1.3",
  "19": "1.3",
  "20": "2.2",
  "21": "3.3",
  "22": "3.3",
  "23": "3.3",
  "24": "2.2",
  "25": "4.3",
  "26": "2.2",
  "27": "3.4",
  "28": "3.4",
  "29": "3.1",
  "30": "3.1",
  "31": "2.1",
  "32": "2.1",
  "33": "3.5",
  "34": "3.2",
  "35": "3.2",
  "36": "2.1",
  "37": "1.2",
  "38": "1.2",
  "39": "4.4",
  "40": "1.2",
  "41": "4.4",
  "42": "3.4",
  "43": "1.2",
  "44": "3.5",
  "45": "3.5",
  "46": "1.2",
  "47": "1.1",
  "48": "1.3",
  "49": "1.2",
  "50": "2.2",
  "51": "4.2",
  "52": "3.1",
  "53": "3.4",
  "54": "2.1",
  "55": "1.3",
  "56": "4.2"
};

  const LEGACY_QUIZ_META = {
  "s1-l0": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      1
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"The bucket is deleted successfully because the Allow s3:* permission is bro...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Theo quy tắc vàng của AWS IAM: Một lệnh cấm tường minh (Explicit Deny) ở bất kỳ Policy nào sẽ LUÔN LUÔN thắng mọi lệnh Allow.",
      null,
      "Phương án \"The system prompts the user for an MFA code before deleting the bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Theo quy tắc vàng của AWS IAM: Một lệnh cấm tường minh (Explicit Deny) ở bất kỳ Policy nào sẽ LUÔN LUÔN thắng mọi lệnh Allow.",
      "Phương án \"It depends on which IAM group the user was added to first.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Theo quy tắc vàng của AWS IAM: Một lệnh cấm tường minh (Explicit Deny) ở bất kỳ Policy nào sẽ LUÔN LUÔN thắng mọi lệnh Allow."
    ]
  },
  "s1-l1": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      1
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Create 50 separate inline policies and attach each one to an individual IAM...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Dùng IAM Policy Variable '${aws:username}' trong 1 Group Policy giúp AWS tự động thay thế tên User đang đăng nhập vào đường dẫn S3 mà không phải tạo 50 policies thủ công.",
      null,
      "Phương án \"Create 50 separate S3 buckets, one for each developer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Dùng IAM Policy Variable '${aws:username}' trong 1 Group Policy giúp AWS tự động thay thế tên User đang đăng nhập vào đường dẫn S3 mà không phải tạo 50 policies thủ công.",
      "Phương án \"Create 50 separate S3 Access Points, one for each developer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Dùng IAM Policy Variable '${aws:username}' trong 1 Group Policy giúp AWS tự động thay thế tên User đang đăng nhập vào đường dẫn S3 mà không phải tạo 50 policies thủ công."
    ]
  },
  "s1-l2": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      1
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"IAM Groups\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Permissions Boundary định nghĩa ranh giới quyền tối đa mà một thực thể IAM có thể nhận được, ngăn chặn leo thang đặc quyền khi ủy quyền tạo Role.",
      null,
      "Phương án \"IAM Credentials Report\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Permissions Boundary định nghĩa ranh giới quyền tối đa mà một thực thể IAM có thể nhận được, ngăn chặn leo thang đặc quyền khi ủy quyền tạo Role.",
      "Phương án \"AWS Shield\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Permissions Boundary định nghĩa ranh giới quyền tối đa mà một thực thể IAM có thể nhận được, ngăn chặn leo thang đặc quyền khi ủy quyền tạo Role."
    ]
  },
  "s2-l0": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      2
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Lưu trữ Access Key dài hạn tiềm ẩn rủi ro lộ khóa bảo mật và tốn công xoay vòng thủ công thay vì dùng IAM Role.",
      null,
      "Lưu trữ Access Key dài hạn tiềm ẩn rủi ro lộ khóa bảo mật và tốn công xoay vòng thủ công thay vì dùng IAM Role.",
      "Phương án \"Open the DynamoDB port in the EC2 instance's security group.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gắn IAM Role trực tiếp vào EC2 Instance (Instance Profile) giúp AWS SDK tự động sử dụng Temporary Credentials từ AWS STS mà không bao giờ phải lưu trữ Access Key cố định."
    ]
  },
  "s2-l1": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"IAM Access Advisor\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Credentials Report xuất ra bảng tổng hợp toàn bộ Users trong tài khoản kèm ngày thay đổi mật khẩu/Access Key gần nhất và trạng thái bật/tắt MFA.",
      null,
      "Phương án \"AWS CloudTrail Insights\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Credentials Report xuất ra bảng tổng hợp toàn bộ Users trong tài khoản kèm ngày thay đổi mật khẩu/Access Key gần nhất và trạng thái bật/tắt MFA.",
      "Phương án \"VPC Flow Logs\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Credentials Report xuất ra bảng tổng hợp toàn bộ Users trong tài khoản kèm ngày thay đổi mật khẩu/Access Key gần nhất và trạng thái bật/tắt MFA."
    ]
  },
  "s2-l2": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      2
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"IAM Access Advisor\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Access Analyzer xác định các tài nguyên trong tài khoản được chia sẻ với thực thể bên ngoài vùng tin cậy (Zone of Trust như AWS Organization).",
      null,
      "Phương án \"AWS Trusted Advisor\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Access Analyzer xác định các tài nguyên trong tài khoản được chia sẻ với thực thể bên ngoài vùng tin cậy (Zone of Trust như AWS Organization).",
      "Phương án \"Amazon Inspector\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IAM Access Analyzer xác định các tài nguyên trong tài khoản được chia sẻ với thực thể bên ngoài vùng tin cậy (Zone of Trust như AWS Organization)."
    ]
  },
  "s3-l0": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      3
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Change the instance type to an R5 memory-optimized instance.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đóng gói sẵn hệ điều hành và các phần mềm nặng thành một Custom AMI (hoặc dùng EC2 Image Builder) giúp máy mới bật lên là chạy được ngay không cần chờ tải và cài đặt lại.",
      null,
      "Phương án \"Move the installation script from EC2 User Data to an Amazon S3 bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đóng gói sẵn hệ điều hành và các phần mềm nặng thành một Custom AMI (hoặc dùng EC2 Image Builder) giúp máy mới bật lên là chạy được ngay không cần chờ tải và cài đặt lại.",
      "Phương án \"Attach an additional secondary EBS volume to the instance.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đóng gói sẵn hệ điều hành và các phần mềm nặng thành một Custom AMI (hoặc dùng EC2 Image Builder) giúp máy mới bật lên là chạy được ngay không cần chờ tải và cài đặt lại."
    ]
  },
  "s3-l1": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      3
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"AWS Local Zones\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Outposts mang tủ rack phần cứng chính hãng của AWS đặt ngay bên trong trung tâm dữ liệu On-premise của khách hàng, đáp ứng yêu cầu dữ liệu nằm tại chỗ mà vẫn dùng chung API AWS.",
      null,
      "Phương án \"AWS Wavelength\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Outposts mang tủ rack phần cứng chính hãng của AWS đặt ngay bên trong trung tâm dữ liệu On-premise của khách hàng, đáp ứng yêu cầu dữ liệu nằm tại chỗ mà vẫn dùng chung API AWS.",
      "Phương án \"AWS Direct Connect\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Outposts mang tủ rack phần cứng chính hãng của AWS đặt ngay bên trong trung tâm dữ liệu On-premise của khách hàng, đáp ứng yêu cầu dữ liệu nằm tại chỗ mà vẫn dùng chung API AWS."
    ]
  },
  "s3-l2": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      3
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Lưu trữ Access Key dài hạn tiềm ẩn rủi ro lộ khóa bảo mật và tốn công xoay vòng thủ công thay vì dùng IAM Role.",
      null,
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này.",
      "Phương án \"Enable encryption on the root EBS volume.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. IMDSv2 sử dụng cơ chế hướng phiên (session-oriented) yêu cầu gửi lệnh PUT kèm header TTL để lấy token trước khi đọc metadata, chặn đứng hiệu quả các lỗ hổng SSRF."
    ]
  },
  "s4-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      4
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"In the EC2 security group inbound rules, allow HTTP traffic from the static...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì địa chỉ IP của ALB có thể thay đổi linh hoạt, cách chuẩn xác và an toàn nhất là tham chiếu trực tiếp Security Group ID của ALB làm Source trong Inbound Rule của EC2 Security Group.",
      null,
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này.",
      "Phương án \"Enable Sticky Sessions on the ALB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì địa chỉ IP của ALB có thể thay đổi linh hoạt, cách chuẩn xác và an toàn nhất là tham chiếu trực tiếp Security Group ID của ALB làm Source trong Inbound Rule của EC2 Security Group."
    ]
  },
  "s4-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      4
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"The request reaches the instance, but the response is blocked because there...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì Security Group là Stateful (Có trạng thái), bất kỳ kết nối nào đã được cho phép đi VÀO qua Inbound rule thì luồng gói tin phản hồi của kết nối đó sẽ TỰ ĐỘNG được phép đi RA bất kể bảng Outbound rules có trống hay không!",
      null,
      "Phương án \"AWS does not allow removing all outbound rules from a security group.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì Security Group là Stateful (Có trạng thái), bất kỳ kết nối nào đã được cho phép đi VÀO qua Inbound rule thì luồng gói tin phản hồi của kết nối đó sẽ TỰ ĐỘNG được phép đi RA bất kể bảng Outbound rules có trống hay không!",
      "Phương án \"The user receives a Connection Refused error.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì Security Group là Stateful (Có trạng thái), bất kỳ kết nối nào đã được cho phép đi VÀO qua Inbound rule thì luồng gói tin phản hồi của kết nối đó sẽ TỰ ĐỘNG được phép đi RA bất kể bảng Outbound rules có trống hay không!"
    ]
  },
  "s5-l0": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      5
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"On-Demand Instances\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với các tác vụ xử lý lô (Batch jobs) có tính chất Stateless và chịu được việc bị gián đoạn (Fault-tolerant), Spot Instances luôn là lựa chọn tiết kiệm chi phí nhất (giảm tới 90%).",
      "Phương án \"Standard Reserved Instances (1-year term)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với các tác vụ xử lý lô (Batch jobs) có tính chất Stateless và chịu được việc bị gián đoạn (Fault-tolerant), Spot Instances luôn là lựa chọn tiết kiệm chi phí nhất (giảm tới 90%).",
      null,
      "Phương án \"Dedicated Hosts\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với các tác vụ xử lý lô (Batch jobs) có tính chất Stateless và chịu được việc bị gián đoạn (Fault-tolerant), Spot Instances luôn là lựa chọn tiết kiệm chi phí nhất (giảm tới 90%)."
    ]
  },
  "s5-l1": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      5
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Dedicated Instances\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chỉ có EC2 Dedicated Hosts mới cung cấp khả năng hiển thị và kiểm soát trực tiếp số lượng Physical Sockets và Cores của máy chủ vật lý để phục vụ bài toán BYOL.",
      null,
      "Phương án \"On-Demand Capacity Reservations\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chỉ có EC2 Dedicated Hosts mới cung cấp khả năng hiển thị và kiểm soát trực tiếp số lượng Physical Sockets và Cores của máy chủ vật lý để phục vụ bài toán BYOL.",
      "Phương án \"Compute Savings Plans\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chỉ có EC2 Dedicated Hosts mới cung cấp khả năng hiển thị và kiểm soát trực tiếp số lượng Physical Sockets và Cores của máy chủ vật lý để phục vụ bài toán BYOL."
    ]
  },
  "s5-l2": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      5
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Standard Reserved Instances\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Compute Savings Plans là gói duy nhất cho phép áp dụng mức giảm giá linh hoạt ngay cả khi bạn chuyển đổi giữa các Region và chuyển từ EC2 sang AWS Fargate hoặc AWS Lambda.",
      "Phương án \"Convertible Reserved Instances\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Compute Savings Plans là gói duy nhất cho phép áp dụng mức giảm giá linh hoạt ngay cả khi bạn chuyển đổi giữa các Region và chuyển từ EC2 sang AWS Fargate hoặc AWS Lambda.",
      "Phương án \"EC2 Instance Savings Plans\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Compute Savings Plans là gói duy nhất cho phép áp dụng mức giảm giá linh hoạt ngay cả khi bạn chuyển đổi giữa các Region và chuyển từ EC2 sang AWS Fargate hoặc AWS Lambda.",
      null
    ]
  },
  "s6-l0": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      6
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Cluster Placement Group\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì có tới 60 máy EC2 trên 3 AZ (20 máy/AZ), bạn KHÔNG THỂ dùng Spread Placement Group (vì Spread giới hạn tối đa 7 máy/AZ). Partition Placement Group là lựa chọn hoàn hảo cho Kafka/Hadoop/Cassandra quy mô lớn.",
      "Phương án \"Spread Placement Group\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì có tới 60 máy EC2 trên 3 AZ (20 máy/AZ), bạn KHÔNG THỂ dùng Spread Placement Group (vì Spread giới hạn tối đa 7 máy/AZ). Partition Placement Group là lựa chọn hoàn hảo cho Kafka/Hadoop/Cassandra quy mô lớn.",
      null,
      "Phương án \"Auto Scaling Placement Group\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì có tới 60 máy EC2 trên 3 AZ (20 máy/AZ), bạn KHÔNG THỂ dùng Spread Placement Group (vì Spread giới hạn tối đa 7 máy/AZ). Partition Placement Group là lựa chọn hoàn hảo cho Kafka/Hadoop/Cassandra quy mô lớn."
    ]
  },
  "s6-l1": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      6
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Place the EC2 instances in a Spread Placement Group and attach Elastic IPs.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Cluster Placement Group (đặt chung 1 AZ) kết hợp với Elastic Fabric Adapter (EFA - hỗ trợ MPI và OS-bypass trên Linux) là bộ đôi chuẩn cho bài toán HPC.",
      null,
      "Phương án \"Place the EC2 instances in a Partition Placement Group across 3 AZs.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Cluster Placement Group (đặt chung 1 AZ) kết hợp với Elastic Fabric Adapter (EFA - hỗ trợ MPI và OS-bypass trên Linux) là bộ đôi chuẩn cho bài toán HPC.",
      "Phương án \"Place the EC2 instances behind an Application Load Balancer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Cluster Placement Group (đặt chung 1 AZ) kết hợp với Elastic Fabric Adapter (EFA - hỗ trợ MPI và OS-bypass trên Linux) là bộ đôi chuẩn cho bài toán HPC."
    ]
  },
  "s7-l0": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      7
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Use standard EC2 Stop/Start combined with a Placement Group.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. EC2 Hibernate lưu trạng thái in-memory (RAM) xuống ổ Root EBS được mã hóa, giúp máy bật lại vào sáng hôm sau giữ nguyên cache trong RAM mà không tốn tiền thuê CPU/RAM ban đêm.",
      null,
      "Phương án \"Switch to an EC2 Instance Store volume.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. EC2 Hibernate lưu trạng thái in-memory (RAM) xuống ổ Root EBS được mã hóa, giúp máy bật lại vào sáng hôm sau giữ nguyên cache trong RAM mà không tốn tiền thuê CPU/RAM ban đêm.",
      "Phương án \"Create an EBS Snapshot every night and restore it every morning.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. EC2 Hibernate lưu trạng thái in-memory (RAM) xuống ổ Root EBS được mã hóa, giúp máy bật lại vào sáng hôm sau giữ nguyên cache trong RAM mà không tốn tiền thuê CPU/RAM ban đêm."
    ]
  },
  "s7-l1": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      7
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"EC2 Dedicated Hosts\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Nitro Enclaves cung cấp môi trường CPU/RAM cô lập tuyệt đối bên trong máy EC2 (không lưu trữ, không mạng ngoài, không truy cập tương tác) chuyên dùng để xử lý dữ liệu mật mã và PII.",
      null,
      "Phương án \"EC2 Hibernate\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Nitro Enclaves cung cấp môi trường CPU/RAM cô lập tuyệt đối bên trong máy EC2 (không lưu trữ, không mạng ngoài, không truy cập tương tác) chuyên dùng để xử lý dữ liệu mật mã và PII.",
      "Phương án \"Security Groups\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Nitro Enclaves cung cấp môi trường CPU/RAM cô lập tuyệt đối bên trong máy EC2 (không lưu trữ, không mạng ngoài, không truy cập tương tác) chuyên dùng để xử lý dữ liệu mật mã và PII."
    ]
  },
  "s8-l0": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      8
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"S3 Lifecycle Policy\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Data Lifecycle Manager (DLM) là tính năng chuyên dụng miễn phí giúp tự động tạo, giữ lại và xóa định kỳ các bản EBS Snapshots và EBS-backed AMIs.",
      null,
      "Phương án \"AWS Storage Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Data Lifecycle Manager (DLM) là tính năng chuyên dụng miễn phí giúp tự động tạo, giữ lại và xóa định kỳ các bản EBS Snapshots và EBS-backed AMIs.",
      "Phương án \"EC2 Auto Scaling Lifecycle Hooks\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Data Lifecycle Manager (DLM) là tính năng chuyên dụng miễn phí giúp tự động tạo, giữ lại và xóa định kỳ các bản EBS Snapshots và EBS-backed AMIs."
    ]
  },
  "s8-l1": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      8
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"EBS Snapshot Archive\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Fast Snapshot Restore (FSR) khởi tạo trước toàn bộ khối dữ liệu của EBS Volume ngay lúc tạo từ Snapshot, giúp ổ đĩa đạt 100% hiệu năng IOPS ngay lập tức.",
      null,
      "Phương án \"EBS Recycle Bin\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Fast Snapshot Restore (FSR) khởi tạo trước toàn bộ khối dữ liệu của EBS Volume ngay lúc tạo từ Snapshot, giúp ổ đĩa đạt 100% hiệu năng IOPS ngay lập tức.",
      "Phương án \"EBS Multi-Attach\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Fast Snapshot Restore (FSR) khởi tạo trước toàn bộ khối dữ liệu của EBS Volume ngay lúc tạo từ Snapshot, giúp ổ đĩa đạt 100% hiệu năng IOPS ngay lập tức."
    ]
  },
  "s9-l0": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      9
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Increase the gp2 volume size from 1 TB to 4 TB to achieve 12,000 IOPS.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì mức 12,000 IOPS nằm trong khả năng của gp3 (<span class=\"fact-update\" data-since=\"2024\">tối đa 80,000 IOPS</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 16,000 IOPS</span>), việc chuyển từ gp2 sang gp3 cho phép tăng riêng chỉ số IOPS lên 12,000 mà không cần mua thừa dung lượng hay trả giá đắt cho io2.",
      null,
      "Phương án \"Migrate the volume to EBS io2 Block Express.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì mức 12,000 IOPS nằm trong khả năng của gp3 (<span class=\"fact-update\" data-since=\"2024\">tối đa 80,000 IOPS</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 16,000 IOPS</span>), việc chuyển từ gp2 sang gp3 cho phép tăng riêng chỉ số IOPS lên 12,000 mà không cần mua thừa dung lượng hay trả giá đắt cho io2.",
      "Phương án \"Migrate the data to an st1 Throughput Optimized HDD volume.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì mức 12,000 IOPS nằm trong khả năng của gp3 (<span class=\"fact-update\" data-since=\"2024\">tối đa 80,000 IOPS</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 16,000 IOPS</span>), việc chuyển từ gp2 sang gp3 cho phép tăng riêng chỉ số IOPS lên 12,000 mà không cần mua thừa dung lượng hay trả giá đắt cho io2."
    ]
  },
  "s9-l1": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      9
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon EFS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Bài toán yêu cầu Block storage dùng chung trong CÙNG 1 AZ với GFS2 (Multi-Attach) và 40,000 IOPS -> Chỉ có EBS io1/io2 hỗ trợ tính năng Multi-Attach (<span class=\"exam-legacy\">Đề cũ có thể ghi: &gt;16,000 IOPS bắt buộc chọn io1/io2</span>).",
      "Phương án \"Amazon EBS gp3 with Multi-Attach enabled\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Bài toán yêu cầu Block storage dùng chung trong CÙNG 1 AZ với GFS2 (Multi-Attach) và 40,000 IOPS -> Chỉ có EBS io1/io2 hỗ trợ tính năng Multi-Attach (<span class=\"exam-legacy\">Đề cũ có thể ghi: &gt;16,000 IOPS bắt buộc chọn io1/io2</span>).",
      null,
      "Phương án \"EC2 Instance Store\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Bài toán yêu cầu Block storage dùng chung trong CÙNG 1 AZ với GFS2 (Multi-Attach) và 40,000 IOPS -> Chỉ có EBS io1/io2 hỗ trợ tính năng Multi-Attach (<span class=\"exam-legacy\">Đề cũ có thể ghi: &gt;16,000 IOPS bắt buộc chọn io1/io2</span>)."
    ]
  },
  "s10-l0": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      10
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon EBS io2 with Multi-Attach enabled\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. EBS Multi-Attach chỉ hoạt động trong CÙNG 1 AZ. Để chia sẻ hệ thống file POSIX đồng thời cho nhiều máy Linux EC2 trải trên NHIỀU AZ (Multi-AZ), đáp án duy nhất đúng là Amazon EFS.",
      null,
      "Phương án \"Amazon S3 Standard\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. EBS Multi-Attach chỉ hoạt động trong CÙNG 1 AZ. Để chia sẻ hệ thống file POSIX đồng thời cho nhiều máy Linux EC2 trải trên NHIỀU AZ (Multi-AZ), đáp án duy nhất đúng là Amazon EFS.",
      "Phương án \"Amazon FSx for Windows File Server\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. EBS Multi-Attach chỉ hoạt động trong CÙNG 1 AZ. Để chia sẻ hệ thống file POSIX đồng thời cho nhiều máy Linux EC2 trải trên NHIỀU AZ (Multi-AZ), đáp án duy nhất đúng là Amazon EFS."
    ]
  },
  "s10-l1": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      10
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"An EFS Lifecycle Policy has not been enabled.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon EFS giao tiếp qua giao thức NFS ở cổng TCP 2049. Nếu Security Group của EFS Mount Target chưa cho phép cổng 2049 từ Security Group của EC2 thì lệnh mount sẽ bị Connection Timed Out.",
      null,
      "Phương án \"An Elastic IP has not been attached to the EFS file system.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon EFS giao tiếp qua giao thức NFS ở cổng TCP 2049. Nếu Security Group của EFS Mount Target chưa cho phép cổng 2049 từ Security Group của EC2 thì lệnh mount sẽ bị Connection Timed Out.",
      "Phương án \"The EC2 instance is not in a Spread Placement Group.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon EFS giao tiếp qua giao thức NFS ở cổng TCP 2049. Nếu Security Group của EFS Mount Target chưa cho phép cổng 2049 từ Security Group của EC2 thì lệnh mount sẽ bị Connection Timed Out."
    ]
  },
  "s11-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      11
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Network Load Balancer (NLB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chỉ có Application Load Balancer (ALB - Layer 7) mới đọc được đường dẫn URL Path (/orders, /payments) để điều hướng về từng Target Group riêng biệt.",
      null,
      "Phương án \"Gateway Load Balancer (GWLB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chỉ có Application Load Balancer (ALB - Layer 7) mới đọc được đường dẫn URL Path (/orders, /payments) để điều hướng về từng Target Group riêng biệt.",
      "Phương án \"Classic Load Balancer (CLB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chỉ có Application Load Balancer (ALB - Layer 7) mới đọc được đường dẫn URL Path (/orders, /payments) để điều hướng về từng Target Group riêng biệt."
    ]
  },
  "s11-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      11
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Migrate from the ALB to a Gateway Load Balancer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ALB thực hiện kết thúc kết nối (connection termination) và tự động ghi IP gốc của khách hàng vào HTTP Header 'X-Forwarded-For'.",
      null,
      "Phương án \"Attach Elastic IP addresses directly to each backend EC2 instance.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ALB thực hiện kết thúc kết nối (connection termination) và tự động ghi IP gốc của khách hàng vào HTTP Header 'X-Forwarded-For'.",
      "Phương án \"Disable Cross-Zone Load Balancing on the ALB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ALB thực hiện kết thúc kết nối (connection termination) và tự động ghi IP gốc của khách hàng vào HTTP Header 'X-Forwarded-For'."
    ]
  },
  "s12-l0": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      12
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Application Load Balancer (ALB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Network Load Balancer (NLB) hoạt động ở Layer 4 (TCP/UDP), xử lý hàng triệu request/s với độ trễ cực thấp và hỗ trợ gắn cố định 1 Static/Elastic IP trên mỗi AZ.",
      null,
      "Phương án \"Gateway Load Balancer (GWLB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Network Load Balancer (NLB) hoạt động ở Layer 4 (TCP/UDP), xử lý hàng triệu request/s với độ trễ cực thấp và hỗ trợ gắn cố định 1 Static/Elastic IP trên mỗi AZ.",
      "Phương án \"Amazon CloudFront\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Network Load Balancer (NLB) hoạt động ở Layer 4 (TCP/UDP), xử lý hàng triệu request/s với độ trễ cực thấp và hỗ trợ gắn cố định 1 Static/Elastic IP trên mỗi AZ."
    ]
  },
  "s12-l1": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      12
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Application Load Balancer (ALB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway Load Balancer (GWLB) hoạt động ở Layer 3 dùng giao thức GENEVE chuyên để triển khai, co giãn và quản lý cụm thiết bị bảo mật mạng ảo của bên thứ 3.",
      "Phương án \"Network Load Balancer (NLB)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway Load Balancer (GWLB) hoạt động ở Layer 3 dùng giao thức GENEVE chuyên để triển khai, co giãn và quản lý cụm thiết bị bảo mật mạng ảo của bên thứ 3.",
      null,
      "Phương án \"AWS Global Accelerator\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway Load Balancer (GWLB) hoạt động ở Layer 3 dùng giao thức GENEVE chuyên để triển khai, co giãn và quản lý cụm thiết bị bảo mật mạng ảo của bên thứ 3."
    ]
  },
  "s13-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      13
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Create 3 separate Application Load Balancers, one for each SSL certificate.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Tính năng SNI (Server Name Indication) trên ALB và NLB cho phép gắn tối đa 25 chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên cùng 1 Listener mà không cần mua thêm Load Balancer.",
      null,
      "Phương án \"Switch to a Classic Load Balancer (CLB).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Tính năng SNI (Server Name Indication) trên ALB và NLB cho phép gắn tối đa 25 chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên cùng 1 Listener mà không cần mua thêm Load Balancer.",
      "Phương án \"Attach 3 Elastic IP addresses to the single ALB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Tính năng SNI (Server Name Indication) trên ALB và NLB cho phép gắn tối đa 25 chứng chỉ SSL/TLS của nhiều tên miền khác nhau lên cùng 1 Listener mà không cần mua thêm Load Balancer."
    ]
  },
  "s13-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      13
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"Sticky Sessions have not been enabled on the NLB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Trên NLB, Cross-Zone Load Balancing mặc định bị tắt, khiến node NLB ở AZ-a đẩy trọn 50% tổng lưu lượng vào chỉ 2 máy ở AZ-a. Bật Cross-Zone Load Balancing sẽ chia đều tải (10% mỗi máy) cho cả 10 máy.",
      "Phương án \"The Deregistration Delay is configured too high.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Trên NLB, Cross-Zone Load Balancing mặc định bị tắt, khiến node NLB ở AZ-a đẩy trọn 50% tổng lưu lượng vào chỉ 2 máy ở AZ-a. Bật Cross-Zone Load Balancing sẽ chia đều tải (10% mỗi máy) cho cả 10 máy.",
      "Phương án \"SNI certificates have not been attached.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Trên NLB, Cross-Zone Load Balancing mặc định bị tắt, khiến node NLB ở AZ-a đẩy trọn 50% tổng lưu lượng vào chỉ 2 máy ở AZ-a. Bật Cross-Zone Load Balancing sẽ chia đều tải (10% mỗi máy) cho cả 10 máy."
    ]
  },
  "s14-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      14
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Increase the Auto Scaling group cooldown period to 30 minutes.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Auto Scaling Lifecycle Hook (Terminating:Wait) cho phép tạm giữ máy EC2 trước khi bị xóa hoàn toàn để thực thi các tác vụ dọn dẹp hoặc đẩy log cuối cùng lên S3.",
      null,
      "Phương án \"Enable Sticky Sessions on the load balancer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Auto Scaling Lifecycle Hook (Terminating:Wait) cho phép tạm giữ máy EC2 trước khi bị xóa hoàn toàn để thực thi các tác vụ dọn dẹp hoặc đẩy log cuối cùng lên S3.",
      "Phương án \"Change the scaling policy to Predictive Scaling.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Auto Scaling Lifecycle Hook (Terminating:Wait) cho phép tạm giữ máy EC2 trước khi bị xóa hoàn toàn để thực thi các tác vụ dọn dẹp hoặc đẩy log cuối cùng lên S3."
    ]
  },
  "s14-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      14
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Target Tracking Scaling\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Predictive Scaling sử dụng Machine Learning phân tích dữ liệu lịch sử từ CloudWatch để dự báo tải tương lai và tự động lập lịch cấp phát máy trước giờ cao điểm.",
      "Phương án \"Step Scaling\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Predictive Scaling sử dụng Machine Learning phân tích dữ liệu lịch sử từ CloudWatch để dự báo tải tương lai và tự động lập lịch cấp phát máy trước giờ cao điểm.",
      "Phương án \"Simple Scaling\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Predictive Scaling sử dụng Machine Learning phân tích dữ liệu lịch sử từ CloudWatch để dự báo tải tương lai và tự động lập lịch cấp phát máy trước giờ cao điểm.",
      null
    ]
  },
  "s15-l0": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      15
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Disable and then re-enable S3 Versioning on the source bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 CRR/SRR mặc định chỉ sao chép các object mới từ thời điểm bật. Để sao chép các object cũ đã có sẵn (existing objects), bạn phải chạy một job S3 Batch Replication (S3 Batch Operations).",
      null,
      "Phương án \"Switch from Cross-Region Replication (CRR) to Same-Region Replication (SRR)...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 CRR/SRR mặc định chỉ sao chép các object mới từ thời điểm bật. Để sao chép các object cũ đã có sẵn (existing objects), bạn phải chạy một job S3 Batch Replication (S3 Batch Operations).",
      "Phương án \"Wait 24 hours for S3 to automatically scan and replicate historical objects...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 CRR/SRR mặc định chỉ sao chép các object mới từ thời điểm bật. Để sao chép các object cũ đã có sẵn (existing objects), bạn phải chạy một job S3 Batch Replication (S3 Batch Operations)."
    ]
  },
  "s15-l1": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      15
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"S3 Transfer Acceleration\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Replication Time Control (S3 RTC) đảm bảo sao chép hầu hết các object trong vài giây và cam kết SLA 99.99% hoàn tất trong vòng 15 phút.",
      null,
      "Phương án \"S3 Intelligent-Tiering\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Replication Time Control (S3 RTC) đảm bảo sao chép hầu hết các object trong vài giây và cam kết SLA 99.99% hoàn tất trong vòng 15 phút.",
      "Phương án \"S3 Multipart Upload\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Replication Time Control (S3 RTC) đảm bảo sao chép hầu hết các object trong vài giây và cam kết SLA 99.99% hoàn tất trong vòng 15 phút."
    ]
  },
  "s16-l0": {
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      16
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"S3 Standard-IA\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Glacier Instant Retrieval rẻ hơn tới 68% so với Standard-IA cho dữ liệu hiếm khi truy cập (mỗi quý 1 lần) mà vẫn cung cấp tốc độ truy xuất trong vài mili-giây.",
      "Phương án \"S3 One Zone-IA\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Glacier Instant Retrieval rẻ hơn tới 68% so với Standard-IA cho dữ liệu hiếm khi truy cập (mỗi quý 1 lần) mà vẫn cung cấp tốc độ truy xuất trong vài mili-giây.",
      null,
      "Phương án \"S3 Glacier Flexible Retrieval (Expedited)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Glacier Instant Retrieval rẻ hơn tới 68% so với Standard-IA cho dữ liệu hiếm khi truy cập (mỗi quý 1 lần) mà vẫn cung cấp tốc độ truy xuất trong vài mili-giây."
    ]
  },
  "s16-l1": {
    "domain": 4,
    "task": "4.1",
    "sessionIds": [
      16
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Enable S3 Intelligent-Tiering on the bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Lifecycle Rule hỗ trợ tính năng tự động hủy và xóa các phiên Multipart Upload chưa hoàn tất (AbortIncompleteMultipartUpload) sau số ngày chỉ định.",
      null,
      "Phương án \"Enable S3 Versioning and MFA Delete.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Lifecycle Rule hỗ trợ tính năng tự động hủy và xóa các phiên Multipart Upload chưa hoàn tất (AbortIncompleteMultipartUpload) sau số ngày chỉ định.",
      "Phương án \"Enable S3 Transfer Acceleration.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Lifecycle Rule hỗ trợ tính năng tự động hủy và xóa các phiên Multipart Upload chưa hoàn tất (AbortIncompleteMultipartUpload) sau số ngày chỉ định."
    ]
  },
  "s17-l0": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      17
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Use S3 Cross-Region Replication.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Object Lambda cho phép gắn một hàm AWS Lambda vào quá trình xử lý lệnh S3 GET để tự động biến đổi hoặc ẩn dữ liệu nhạy cảm trực tiếp trên đường truyền mà không cần tạo bản sao file.",
      null,
      "Phương án \"Use S3 Batch Operations.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Object Lambda cho phép gắn một hàm AWS Lambda vào quá trình xử lý lệnh S3 GET để tự động biến đổi hoặc ẩn dữ liệu nhạy cảm trực tiếp trên đường truyền mà không cần tạo bản sao file.",
      "Phương án \"Use S3 Glacier Vault Lock.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Object Lambda cho phép gắn một hàm AWS Lambda vào quá trình xử lý lệnh S3 GET để tự động biến đổi hoặc ẩn dữ liệu nhạy cảm trực tiếp trên đường truyền mà không cần tạo bản sao file."
    ]
  },
  "s17-l1": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      17
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"S3 Byte-Range Fetches and S3 Intelligent-Tiering\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với file lớn 50 GB (>5GB bắt buộc dùng Multipart Upload) gửi từ xa xuyên lục địa, kết hợp Multipart Upload (chia nhỏ gửi song song) và S3 Transfer Acceleration (đi qua Edge Location vào mạng trục AWS) sẽ cho tốc độ nhanh nhất.",
      "Phương án \"AWS Global Accelerator and S3 Versioning\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với file lớn 50 GB (>5GB bắt buộc dùng Multipart Upload) gửi từ xa xuyên lục địa, kết hợp Multipart Upload (chia nhỏ gửi song song) và S3 Transfer Acceleration (đi qua Edge Location vào mạng trục AWS) sẽ cho tốc độ nhanh nhất.",
      "Phương án \"Amazon CloudFront Origin Access Control (OAC) and S3 Same-Region Replicatio...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với file lớn 50 GB (>5GB bắt buộc dùng Multipart Upload) gửi từ xa xuyên lục địa, kết hợp Multipart Upload (chia nhỏ gửi song song) và S3 Transfer Acceleration (đi qua Edge Location vào mạng trục AWS) sẽ cho tốc độ nhanh nhất."
    ]
  },
  "s18-l0": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      18
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Disable encryption on the S3 bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Bucket Keys tạo một khóa cấp độ bucket tạm thời từ KMS để mã hóa các object bên trong, giúp giảm tới 99% lưu lượng gọi API trực tiếp tới AWS KMS.",
      null,
      "Phương án \"Enable S3 Transfer Acceleration.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Bucket Keys tạo một khóa cấp độ bucket tạm thời từ KMS để mã hóa các object bên trong, giúp giảm tới 99% lưu lượng gọi API trực tiếp tới AWS KMS.",
      "Phương án \"Create 10 additional S3 Access Points.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Bucket Keys tạo một khóa cấp độ bucket tạm thời từ KMS để mã hóa các object bên trong, giúp giảm tới 99% lưu lượng gọi API trực tiếp tới AWS KMS."
    ]
  },
  "s18-l1": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      18
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Enable default SSE-S3 encryption on the bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Điều kiện 'aws:SecureTransport': 'false' dùng với lệnh Effect: Deny trong S3 Bucket Policy sẽ từ chối mọi kết nối HTTP không mã hóa, ép buộc dùng HTTPS.",
      null,
      "Phương án \"Enable S3 Object Lock in Compliance mode.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Điều kiện 'aws:SecureTransport': 'false' dùng với lệnh Effect: Deny trong S3 Bucket Policy sẽ từ chối mọi kết nối HTTP không mã hóa, ép buộc dùng HTTPS.",
      "Phương án \"Enable S3 Versioning.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Điều kiện 'aws:SecureTransport': 'false' dùng với lệnh Effect: Deny trong S3 Bucket Policy sẽ từ chối mọi kết nối HTTP không mã hóa, ép buộc dùng HTTPS."
    ]
  },
  "s19-l0": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      19
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"S3 Versioning combined with MFA Delete\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Object Lock ở chế độ Compliance Mode đảm bảo tính bất biến tuyệt đối (WORM): Không bất kỳ ai, kể cả tài khoản Root của AWS, có thể xóa file hoặc rút ngắn thời gian lưu giữ trước khi hết hạn.",
      "Phương án \"S3 Object Lock in Governance Mode\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Object Lock ở chế độ Compliance Mode đảm bảo tính bất biến tuyệt đối (WORM): Không bất kỳ ai, kể cả tài khoản Root của AWS, có thể xóa file hoặc rút ngắn thời gian lưu giữ trước khi hết hạn.",
      null,
      "Phương án \"S3 Bucket Policy with an Explicit Deny\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. S3 Object Lock ở chế độ Compliance Mode đảm bảo tính bất biến tuyệt đối (WORM): Không bất kỳ ai, kể cả tài khoản Root của AWS, có thể xóa file hoặc rút ngắn thời gian lưu giữ trước khi hết hạn."
    ]
  },
  "s19-l1": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      19
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"S3 Presigned URLs\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với S3 Requester Pays buckets, người yêu cầu tải dữ liệu (Requester) sẽ trả chi phí cho các lệnh gọi và chi phí băng thông truyền dữ liệu ra khỏi S3, trong khi chủ sở hữu bucket chỉ trả tiền lưu trữ.",
      null,
      "Phương án \"S3 Transfer Acceleration\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với S3 Requester Pays buckets, người yêu cầu tải dữ liệu (Requester) sẽ trả chi phí cho các lệnh gọi và chi phí băng thông truyền dữ liệu ra khỏi S3, trong khi chủ sở hữu bucket chỉ trả tiền lưu trữ.",
      "Phương án \"S3 Access Points\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với S3 Requester Pays buckets, người yêu cầu tải dữ liệu (Requester) sẽ trả chi phí cho các lệnh gọi và chi phí băng thông truyền dữ liệu ra khỏi S3, trong khi chủ sở hữu bucket chỉ trả tiền lưu trữ."
    ]
  },
  "s20-l0": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      20
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Enable RDS Multi-AZ and point the reporting tool to the Standby instance.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Máy Standby trong RDS Multi-AZ tiêu chuẩn không thể dùng để đọc dữ liệu. Để tách tải các câu lệnh đọc/báo cáo nặng ra khỏi DB chính, giải pháp đúng là tạo RDS Read Replica.",
      null,
      "Phương án \"Migrate the database to S3 Glacier.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Máy Standby trong RDS Multi-AZ tiêu chuẩn không thể dùng để đọc dữ liệu. Để tách tải các câu lệnh đọc/báo cáo nặng ra khỏi DB chính, giải pháp đúng là tạo RDS Read Replica.",
      "Phương án \"Place a NAT Gateway in front of the RDS database.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Máy Standby trong RDS Multi-AZ tiêu chuẩn không thể dùng để đọc dữ liệu. Để tách tải các câu lệnh đọc/báo cáo nặng ra khỏi DB chính, giải pháp đúng là tạo RDS Read Replica."
    ]
  },
  "s20-l1": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      20
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"RDS Read Replica Promotion\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. RDS Blue/Green Deployments tạo môi trường staging (Green) nhân bản liên tục từ môi trường thật (Blue), cho phép nâng cấp và kiểm thử trên Green rồi chuyển đổi (Switchover) trong dưới 1 phút mà không mất dữ liệu.",
      null,
      "Phương án \"AWS Database Migration Service (DMS)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. RDS Blue/Green Deployments tạo môi trường staging (Green) nhân bản liên tục từ môi trường thật (Blue), cho phép nâng cấp và kiểm thử trên Green rồi chuyển đổi (Switchover) trong dưới 1 phút mà không mất dữ liệu.",
      "Phương án \"Amazon RDS Proxy\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. RDS Blue/Green Deployments tạo môi trường staging (Green) nhân bản liên tục từ môi trường thật (Blue), cho phép nâng cấp và kiểm thử trên Green rồi chuyển đổi (Switchover) trong dưới 1 phút mà không mất dữ liệu."
    ]
  },
  "s21-l0": {
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      21
    ],
    "difficulty": "easy",
    "whyWrong": [
      null,
      "Phương án \"Enable RDS Multi-AZ deployment.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon RDS Proxy quản lý hồ kết nối (Connection Pool) tập trung, giữ các kết nối mở sẵn tới DB và tái sử dụng chúng cho hàng nghìn hàm Lambda.",
      "Phương án \"Migrate to Amazon ElastiCache for Memcached.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon RDS Proxy quản lý hồ kết nối (Connection Pool) tập trung, giữ các kết nối mở sẵn tới DB và tái sử dụng chúng cho hàng nghìn hàm Lambda.",
      "Phương án \"Increase the Lambda function timeout to 15 minutes.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon RDS Proxy quản lý hồ kết nối (Connection Pool) tập trung, giữ các kết nối mở sẵn tới DB và tái sử dụng chúng cho hàng nghìn hàm Lambda."
    ]
  },
  "s21-l1": {
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      21
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Take a DB Snapshot and restore it to a new cluster.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Aurora Database Cloning sử dụng giao thức Copy-on-Write giúp tạo bản sao độc lập của DB 40 TB chỉ trong vài phút và ban đầu không tốn thêm bất kỳ chi phí lưu trữ nào vì dùng chung các trang dữ liệu gốc.",
      null,
      "Phương án \"Use AWS DMS to copy the data to a new database.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Aurora Database Cloning sử dụng giao thức Copy-on-Write giúp tạo bản sao độc lập của DB 40 TB chỉ trong vài phút và ban đầu không tốn thêm bất kỳ chi phí lưu trữ nào vì dùng chung các trang dữ liệu gốc.",
      "Phương án \"Create an additional Aurora Read Replica.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Aurora Database Cloning sử dụng giao thức Copy-on-Write giúp tạo bản sao độc lập của DB 40 TB chỉ trong vài phút và ban đầu không tốn thêm bất kỳ chi phí lưu trữ nào vì dùng chung các trang dữ liệu gốc."
    ]
  },
  "s22-l0": {
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      22
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon ElastiCache for Memcached\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ElastiCache for Redis hỗ trợ cấu trúc dữ liệu Sorted Sets giúp tự động sắp xếp điểm số thời gian thực cho Gaming Leaderboards, đồng thời hỗ trợ Multi-AZ Auto-Failover.",
      null,
      "Phương án \"Amazon RDS for MySQL Read Replicas\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ElastiCache for Redis hỗ trợ cấu trúc dữ liệu Sorted Sets giúp tự động sắp xếp điểm số thời gian thực cho Gaming Leaderboards, đồng thời hỗ trợ Multi-AZ Auto-Failover.",
      "Phương án \"Amazon Athena\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ElastiCache for Redis hỗ trợ cấu trúc dữ liệu Sorted Sets giúp tự động sắp xếp điểm số thời gian thực cho Gaming Leaderboards, đồng thời hỗ trợ Multi-AZ Auto-Failover."
    ]
  },
  "s22-l1": {
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      22
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Use Lazy Loading only without a TTL.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chiến lược Write-Through cập nhật dữ liệu trong Cache đồng bộ ngay khi dữ liệu được ghi vào Database, đảm bảo dữ liệu trên Cache không bao giờ bị cũ (never stale).",
      null,
      "Phương án \"Flush the entire ElastiCache cluster every 5 minutes.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chiến lược Write-Through cập nhật dữ liệu trong Cache đồng bộ ngay khi dữ liệu được ghi vào Database, đảm bảo dữ liệu trên Cache không bao giờ bị cũ (never stale).",
      "Phương án \"Switch from Redis to Memcached.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chiến lược Write-Through cập nhật dữ liệu trong Cache đồng bộ ngay khi dữ liệu được ghi vào Database, đảm bảo dữ liệu trên Cache không bao giờ bị cũ (never stale)."
    ]
  },
  "s23-l0": {
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      23
    ],
    "difficulty": "easy",
    "whyWrong": [
      null,
      "Phương án \"Enable DynamoDB Time To Live (TTL).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB On-Demand Mode có khả năng mở rộng tức thì (instantly scales) để đón các đợt lưu lượng tăng đột biến (spiky/unpredictable traffic) và chỉ tính phí theo request thực tế.",
      "Phương án \"Migrate the workload to Amazon RDS for MySQL.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB On-Demand Mode có khả năng mở rộng tức thì (instantly scales) để đón các đợt lưu lượng tăng đột biến (spiky/unpredictable traffic) và chỉ tính phí theo request thực tế.",
      "Phương án \"Create a Local Secondary Index (LSI).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB On-Demand Mode có khả năng mở rộng tức thì (instantly scales) để đón các đợt lưu lượng tăng đột biến (spiky/unpredictable traffic) và chỉ tính phí theo request thực tế."
    ]
  },
  "s23-l1": {
    "domain": 3,
    "task": "3.3",
    "sessionIds": [
      23
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Enable DynamoDB Streams.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB Accelerator (DAX) là bộ nhớ đệm in-memory tương thích hoàn toàn với API của DynamoDB, giúp trả kết quả đọc cho các Hot Keys ngay từ RAM trong vài micro-giây.",
      null,
      "Phương án \"Use S3 Transfer Acceleration.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB Accelerator (DAX) là bộ nhớ đệm in-memory tương thích hoàn toàn với API của DynamoDB, giúp trả kết quả đọc cho các Hot Keys ngay từ RAM trong vài micro-giây.",
      "Phương án \"Use Amazon RDS Proxy.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB Accelerator (DAX) là bộ nhớ đệm in-memory tương thích hoàn toàn với API của DynamoDB, giúp trả kết quả đọc cho các Hot Keys ngay từ RAM trong vài micro-giây."
    ]
  },
  "s24-l0": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      24
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Run an hourly Lambda function that performs a full table Scan and calls Del...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB TTL tự động xóa các dòng hết hạn miễn phí (không tốn WCU), và sự kiện xóa đó được đẩy vào DynamoDB Streams để hàm Lambda bắt lấy và lưu trữ sang S3.",
      null,
      "Phương án \"Enable DynamoDB Accelerator (DAX).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB TTL tự động xóa các dòng hết hạn miễn phí (không tốn WCU), và sự kiện xóa đó được đẩy vào DynamoDB Streams để hàm Lambda bắt lấy và lưu trữ sang S3.",
      "Phương án \"Configure an S3 Lifecycle Policy.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. DynamoDB TTL tự động xóa các dòng hết hạn miễn phí (không tốn WCU), và sự kiện xóa đó được đẩy vào DynamoDB Streams để hàm Lambda bắt lấy và lưu trữ sang S3."
    ]
  },
  "s24-l1": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      24
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"Create a Global Secondary Index (GSI).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Tính năng DynamoDB Export to S3 đọc dữ liệu từ bản sao lưu PITR ở hậu trường nên hoàn toàn không tiêu tốn RCU hay ảnh hưởng đến hiệu năng của bảng Production đang chạy.",
      "Phương án \"Increase the table's provisioned RCUs by 10x.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Tính năng DynamoDB Export to S3 đọc dữ liệu từ bản sao lưu PITR ở hậu trường nên hoàn toàn không tiêu tốn RCU hay ảnh hưởng đến hiệu năng của bảng Production đang chạy.",
      "Phương án \"Use DynamoDB Accelerator (DAX).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Tính năng DynamoDB Export to S3 đọc dữ liệu từ bản sao lưu PITR ở hậu trường nên hoàn toàn không tiêu tốn RCU hay ảnh hưởng đến hiệu năng của bảng Production đang chạy."
    ]
  },
  "s25-l0": {
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      25
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon DocumentDB\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Neptune là cơ sở dữ liệu đồ thị (Graph Database) chuyên dụng để lưu trữ và truy vấn các tập dữ liệu có mối liên kết phức tạp (mạng xã hội, phát hiện đường dây gian lận).",
      null,
      "Phương án \"Amazon Timestream\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Neptune là cơ sở dữ liệu đồ thị (Graph Database) chuyên dụng để lưu trữ và truy vấn các tập dữ liệu có mối liên kết phức tạp (mạng xã hội, phát hiện đường dây gian lận).",
      "Phương án \"Amazon Redshift\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Neptune là cơ sở dữ liệu đồ thị (Graph Database) chuyên dụng để lưu trữ và truy vấn các tập dữ liệu có mối liên kết phức tạp (mạng xã hội, phát hiện đường dây gian lận)."
    ]
  },
  "s25-l1": {
    "domain": 4,
    "task": "4.3",
    "sessionIds": [
      25
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"Amazon Aurora\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Timestream là cơ sở dữ liệu chuỗi thời gian (Time-series database) hoàn toàn Serverless, nhanh gấp hàng nghìn lần DB quan hệ truyền thống cho dữ liệu cảm biến IoT theo thời gian.",
      "Phương án \"Amazon Neptune\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Timestream là cơ sở dữ liệu chuỗi thời gian (Time-series database) hoàn toàn Serverless, nhanh gấp hàng nghìn lần DB quan hệ truyền thống cho dữ liệu cảm biến IoT theo thời gian.",
      "Phương án \"Amazon ElastiCache\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Timestream là cơ sở dữ liệu chuỗi thời gian (Time-series database) hoàn toàn Serverless, nhanh gấp hàng nghìn lần DB quan hệ truyền thống cho dữ liệu cảm biến IoT theo thời gian."
    ]
  },
  "s26-l0": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      26
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Create a Route 53 Resolver Inbound Endpoint.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì luồng truy vấn DNS đi từ TRONG VPC đi RA ngoài về phía On-premise, ta phải dùng Route 53 Resolver Outbound Endpoint kết hợp với Forwarding Rule.",
      null,
      "Phương án \"Create an Alias record in a Public Hosted Zone.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì luồng truy vấn DNS đi từ TRONG VPC đi RA ngoài về phía On-premise, ta phải dùng Route 53 Resolver Outbound Endpoint kết hợp với Forwarding Rule.",
      "Phương án \"Enable Sticky Sessions on the ALB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì luồng truy vấn DNS đi từ TRONG VPC đi RA ngoài về phía On-premise, ta phải dùng Route 53 Resolver Outbound Endpoint kết hợp với Forwarding Rule."
    ]
  },
  "s26-l1": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      26
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"CNAME Record\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chuẩn DNS không cho phép tạo CNAME ở Zone Apex (tên miền gốc). Bắt buộc phải dùng bản ghi A ở chế độ Alias (Alias Record) của Route 53 để trỏ vào ALB.",
      null,
      "Phương án \"PTR Record\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chuẩn DNS không cho phép tạo CNAME ở Zone Apex (tên miền gốc). Bắt buộc phải dùng bản ghi A ở chế độ Alias (Alias Record) của Route 53 để trỏ vào ALB.",
      "Phương án \"MX Record\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chuẩn DNS không cho phép tạo CNAME ở Zone Apex (tên miền gốc). Bắt buộc phải dùng bản ghi A ở chế độ Alias (Alias Record) của Route 53 để trỏ vào ALB."
    ]
  },
  "s27-l0": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      27
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Latency-based Routing\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Geolocation Routing định tuyến dựa trên biên giới quốc gia/lục địa của người dùng, hoàn hảo cho bài toán giới hạn bản quyền nội dung theo lãnh thổ (Geo-restriction).",
      null,
      "Phương án \"Geoproximity Routing\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Geolocation Routing định tuyến dựa trên biên giới quốc gia/lục địa của người dùng, hoàn hảo cho bài toán giới hạn bản quyền nội dung theo lãnh thổ (Geo-restriction).",
      "Phương án \"Multi-Value Answer Routing\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Geolocation Routing định tuyến dựa trên biên giới quốc gia/lục địa của người dùng, hoàn hảo cho bài toán giới hạn bản quyền nội dung theo lãnh thổ (Geo-restriction)."
    ]
  },
  "s27-l1": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      27
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này.",
      null,
      "Phương án \"Use Simple Routing instead of Failover Routing.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Route 53 hỗ trợ loại Health Check dựa trên CloudWatch Alarm (Health Check that monitors a CloudWatch Alarm), giúp giám sát gián tiếp các tài nguyên nằm trong Private Subnet.",
      "Phương án \"Place a NAT Gateway inside the Private Subnet.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Route 53 hỗ trợ loại Health Check dựa trên CloudWatch Alarm (Health Check that monitors a CloudWatch Alarm), giúp giám sát gián tiếp các tài nguyên nằm trong Private Subnet."
    ]
  },
  "s28-l0": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      28
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Generate thousands of individual S3 Presigned URLs for each video segment.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Khi cần cấp quyền truy cập tạm thời cho NHIỀU file (như hàng nghìn phân đoạn video HLS hoặc toàn bộ khu vực thành viên VIP) qua CloudFront, CloudFront Signed Cookies là giải pháp tối ưu nhất.",
      null,
      "Phương án \"Enable public read access on the S3 bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Khi cần cấp quyền truy cập tạm thời cho NHIỀU file (như hàng nghìn phân đoạn video HLS hoặc toàn bộ khu vực thành viên VIP) qua CloudFront, CloudFront Signed Cookies là giải pháp tối ưu nhất.",
      "Phương án \"Use AWS Global Accelerator.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Khi cần cấp quyền truy cập tạm thời cho NHIỀU file (như hàng nghìn phân đoạn video HLS hoặc toàn bộ khu vực thành viên VIP) qua CloudFront, CloudFront Signed Cookies là giải pháp tối ưu nhất."
    ]
  },
  "s28-l1": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      28
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon CloudFront\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. CloudFront không hỗ trợ giao thức UDP và không cấp IP tĩnh cố định. AWS Global Accelerator hỗ trợ cả TCP và UDP, cấp 2 Anycast Static IP cố định toàn cầu và định tuyến qua mạng cáp quang nội bộ của AWS.",
      null,
      "Phương án \"Amazon API Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. CloudFront không hỗ trợ giao thức UDP và không cấp IP tĩnh cố định. AWS Global Accelerator hỗ trợ cả TCP và UDP, cấp 2 Anycast Static IP cố định toàn cầu và định tuyến qua mạng cáp quang nội bộ của AWS.",
      "Phương án \"AWS WAF\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. CloudFront không hỗ trợ giao thức UDP và không cấp IP tĩnh cố định. AWS Global Accelerator hỗ trợ cả TCP và UDP, cấp 2 Anycast Static IP cố định toàn cầu và định tuyến qua mạng cáp quang nội bộ của AWS."
    ]
  },
  "s29-l0": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      29
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon EFS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon FSx for Lustre được thiết kế chuyên biệt cho bài toán HPC/Machine Learning đòi hỏi băng thông hàng trăm GB/s và tích hợp đọc/ghi hai chiều trực tiếp với Amazon S3.",
      null,
      "Phương án \"Amazon FSx for Windows File Server\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon FSx for Lustre được thiết kế chuyên biệt cho bài toán HPC/Machine Learning đòi hỏi băng thông hàng trăm GB/s và tích hợp đọc/ghi hai chiều trực tiếp với Amazon S3.",
      "Phương án \"Amazon EBS sc1\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon FSx for Lustre được thiết kế chuyên biệt cho bài toán HPC/Machine Learning đòi hỏi băng thông hàng trăm GB/s và tích hợp đọc/ghi hai chiều trực tiếp với Amazon S3."
    ]
  },
  "s29-l1": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      29
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon EFS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon FSx for Windows File Server cung cấp hệ thống file mạng thuần Windows hỗ trợ đầy đủ SMB, NTFS, Active Directory và triển khai Multi-AZ.",
      null,
      "Phương án \"Amazon S3 File Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon FSx for Windows File Server cung cấp hệ thống file mạng thuần Windows hỗ trợ đầy đủ SMB, NTFS, Active Directory và triển khai Multi-AZ.",
      "Phương án \"Amazon EBS Multi-Attach\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon FSx for Windows File Server cung cấp hệ thống file mạng thuần Windows hỗ trợ đầy đủ SMB, NTFS, Active Directory và triển khai Multi-AZ."
    ]
  },
  "s30-l0": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      30
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Use AWS DataSync over the 50 Mbps internet connection.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì đường truyền 50 Mbps quá chậm cho 500 TB nên trong đề thi chọn thiết bị vật lý Snowball Edge (lưu ý thực tế dòng Snow đã ngừng nhận khách mới từ 11/2025). Snowball không thể nạp trực tiếp vào Glacier, mà phải nạp vào S3 trước rồi dùng S3 Lifecycle chuyển xuống Glacier Deep Archive.",
      null,
      "Phương án \"Use AWS Snowball Edge to load the data directly into S3 Glacier Deep Archiv...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì đường truyền 50 Mbps quá chậm cho 500 TB nên trong đề thi chọn thiết bị vật lý Snowball Edge (lưu ý thực tế dòng Snow đã ngừng nhận khách mới từ 11/2025). Snowball không thể nạp trực tiếp vào Glacier, mà phải nạp vào S3 trước rồi dùng S3 Lifecycle chuyển xuống Glacier Deep Archive.",
      "Phương án \"Use S3 Transfer Acceleration.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì đường truyền 50 Mbps quá chậm cho 500 TB nên trong đề thi chọn thiết bị vật lý Snowball Edge (lưu ý thực tế dòng Snow đã ngừng nhận khách mới từ 11/2025). Snowball không thể nạp trực tiếp vào Glacier, mà phải nạp vào S3 trước rồi dùng S3 Lifecycle chuyển xuống Glacier Deep Archive."
    ]
  },
  "s30-l1": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      30
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"AWS Storage Gateway - S3 File Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Storage Gateway - Tape Gateway (VTL) giả lập đầu đọc băng từ chuẩn iSCSI giúp giữ nguyên phần mềm sao lưu cũ và tự động lưu trữ các cuộn băng từ ảo xuống S3 Glacier.",
      null,
      "Phương án \"AWS Storage Gateway - Volume Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Storage Gateway - Tape Gateway (VTL) giả lập đầu đọc băng từ chuẩn iSCSI giúp giữ nguyên phần mềm sao lưu cũ và tự động lưu trữ các cuộn băng từ ảo xuống S3 Glacier.",
      "Phương án \"AWS Backup\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Storage Gateway - Tape Gateway (VTL) giả lập đầu đọc băng từ chuẩn iSCSI giúp giữ nguyên phần mềm sao lưu cũ và tự động lưu trữ các cuộn băng từ ảo xuống S3 Glacier."
    ]
  },
  "s31-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      31
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Switch to Scheduled Scaling.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với kiến trúc Worker đọc từ SQS, co giãn dựa trên độ dài hàng đợi (ApproximateNumberOfMessagesVisible chia cho số instance đang chạy) phản ánh chính xác khối lượng việc đang chờ xử lý.",
      null,
      "Phương án \"Reduce the SQS Visibility Timeout to 1 second.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với kiến trúc Worker đọc từ SQS, co giãn dựa trên độ dài hàng đợi (ApproximateNumberOfMessagesVisible chia cho số instance đang chạy) phản ánh chính xác khối lượng việc đang chờ xử lý.",
      "Phương án \"Replace Amazon SQS with Amazon SNS.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Với kiến trúc Worker đọc từ SQS, co giãn dựa trên độ dài hàng đợi (ApproximateNumberOfMessagesVisible chia cho số instance đang chạy) phản ánh chính xác khối lượng việc đang chờ xử lý."
    ]
  },
  "s31-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      31
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Switch to an SQS FIFO queue because FIFO supports up to 50 MB payloads.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mọi hàng đợi SQS (cả Standard và FIFO) đều giới hạn cứng 1 MiB (1,024 KB) mỗi tin nhắn (<span class=\"exam-legacy\">Đề cũ có thể ghi: 256 KB</span>). Dùng SQS Extended Client Library kết hợp S3 là cách chuẩn để xử lý tin nhắn vượt giới hạn này lên tới 2 GB.",
      null,
      "Phương án \"Use AWS Snowball Edge.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mọi hàng đợi SQS (cả Standard và FIFO) đều giới hạn cứng 1 MiB (1,024 KB) mỗi tin nhắn (<span class=\"exam-legacy\">Đề cũ có thể ghi: 256 KB</span>). Dùng SQS Extended Client Library kết hợp S3 là cách chuẩn để xử lý tin nhắn vượt giới hạn này lên tới 2 GB.",
      "Phương án \"Store all message payloads in Amazon Route 53.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mọi hàng đợi SQS (cả Standard và FIFO) đều giới hạn cứng 1 MiB (1,024 KB) mỗi tin nhắn (<span class=\"exam-legacy\">Đề cũ có thể ghi: 256 KB</span>). Dùng SQS Extended Client Library kết hợp S3 là cách chuẩn để xử lý tin nhắn vượt giới hạn này lên tới 2 GB."
    ]
  },
  "s32-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      32
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Create 3 separate SNS topics and modify the publisher application code.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. SNS Message Filtering (Subscription Filter Policy) cho phép lọc tin nhắn ngay tại tầng SNS dựa trên thuộc tính JSON trước khi đẩy xuống từng SQS Subscriber, không cần sửa code.",
      null,
      "Phương án \"Enable SQS Long Polling.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. SNS Message Filtering (Subscription Filter Policy) cho phép lọc tin nhắn ngay tại tầng SNS dựa trên thuộc tính JSON trước khi đẩy xuống từng SQS Subscriber, không cần sửa code.",
      "Phương án \"Switch to Amazon Data Firehose (Kinesis Data Firehose).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. SNS Message Filtering (Subscription Filter Policy) cho phép lọc tin nhắn ngay tại tầng SNS dựa trên thuộc tính JSON trước khi đẩy xuống từng SQS Subscriber, không cần sửa code."
    ]
  },
  "s32-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      32
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Create 2 identical S3 buckets.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đưa sự kiện từ S3 vào 1 SNS Topic rồi thực hiện Fan-out ra 2 SQS Queues (hoặc dùng Amazon EventBridge) là cách chuẩn để vượt qua giới hạn trùng lặp Event Notification của S3.",
      null,
      "Phương án \"Enable S3 Transfer Acceleration.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đưa sự kiện từ S3 vào 1 SNS Topic rồi thực hiện Fan-out ra 2 SQS Queues (hoặc dùng Amazon EventBridge) là cách chuẩn để vượt qua giới hạn trùng lặp Event Notification của S3.",
      "Phương án \"Use S3 Presigned URLs.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đưa sự kiện từ S3 vào 1 SNS Topic rồi thực hiện Fan-out ra 2 SQS Queues (hoặc dùng Amazon EventBridge) là cách chuẩn để vượt qua giới hạn trùng lặp Event Notification của S3."
    ]
  },
  "s33-l0": {
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      33
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon Kinesis Data Streams\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Từ khóa 'Near real-time (1-2 minutes) + Serverless + Load directly into S3 + Convert to Parquet' chỉ thẳng tới Amazon Data Firehose (trước đây là Amazon Kinesis Data Firehose).",
      null,
      "Phương án \"Amazon SQS FIFO\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Từ khóa 'Near real-time (1-2 minutes) + Serverless + Load directly into S3 + Convert to Parquet' chỉ thẳng tới Amazon Data Firehose (trước đây là Amazon Kinesis Data Firehose).",
      "Phương án \"Amazon MQ\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Từ khóa 'Near real-time (1-2 minutes) + Serverless + Load directly into S3 + Convert to Parquet' chỉ thẳng tới Amazon Data Firehose (trước đây là Amazon Kinesis Data Firehose)."
    ]
  },
  "s33-l1": {
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      33
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon SQS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon SQS dùng API độc quyền của AWS nên sẽ bắt buộc phải sửa code. Amazon MQ cung cấp dịch vụ ActiveMQ/RabbitMQ quản lý sẵn hỗ trợ nguyên bản JMS, AMQP, MQTT, STOMP giúp giữ nguyên 100% code cũ.",
      "Phương án \"Amazon SNS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon SQS dùng API độc quyền của AWS nên sẽ bắt buộc phải sửa code. Amazon MQ cung cấp dịch vụ ActiveMQ/RabbitMQ quản lý sẵn hỗ trợ nguyên bản JMS, AMQP, MQTT, STOMP giúp giữ nguyên 100% code cũ.",
      null,
      "Phương án \"Amazon Kinesis Data Streams\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon SQS dùng API độc quyền của AWS nên sẽ bắt buộc phải sửa code. Amazon MQ cung cấp dịch vụ ActiveMQ/RabbitMQ quản lý sẵn hỗ trợ nguyên bản JMS, AMQP, MQTT, STOMP giúp giữ nguyên 100% code cũ."
    ]
  },
  "s34-l0": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      34
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon ECS with the EC2 launch type + Amazon EBS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ECS với AWS Fargate giúp chạy Docker containers hoàn toàn Serverless (không cần quản lý EC2), và kết hợp hoàn hảo với Amazon EFS để chia sẻ file chuẩn POSIX qua nhiều AZ.",
      null,
      "Phương án \"AWS Lambda + Amazon FSx for Windows File Server\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ECS với AWS Fargate giúp chạy Docker containers hoàn toàn Serverless (không cần quản lý EC2), và kết hợp hoàn hảo với Amazon EFS để chia sẻ file chuẩn POSIX qua nhiều AZ.",
      "Phương án \"Amazon EC2 + Amazon S3 Glacier\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ECS với AWS Fargate giúp chạy Docker containers hoàn toàn Serverless (không cần quản lý EC2), và kết hợp hoàn hảo với Amazon EFS để chia sẻ file chuẩn POSIX qua nhiều AZ."
    ]
  },
  "s34-l1": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      34
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Lưu trữ Access Key dài hạn tiềm ẩn rủi ro lộ khóa bảo mật và tốn công xoay vòng thủ công thay vì dùng IAM Role.",
      null,
      "Phương án \"Create 5 separate VPCs.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Sử dụng IAM Roles for Tasks (ECS Task Role) trong Task Definition cho phép gán quyền IAM độc lập cho từng Container/Task thay vì dùng chung quyền của máy chủ EC2.",
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này."
    ]
  },
  "s35-l0": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      35
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Increase the Lambda function timeout to 15 minutes.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Provisioned Concurrency khởi tạo và giữ nóng sẵn số lượng môi trường thực thi được chỉ định, giúp loại bỏ hoàn toàn hiện tượng Cold Start.",
      null,
      "Phương án \"Place the Lambda function inside a Private Subnet.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Provisioned Concurrency khởi tạo và giữ nóng sẵn số lượng môi trường thực thi được chỉ định, giúp loại bỏ hoàn toàn hiện tượng Cold Start.",
      "Phương án \"Reduce the Lambda function memory allocation to 128 MB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Provisioned Concurrency khởi tạo và giữ nóng sẵn số lượng môi trường thực thi được chỉ định, giúp loại bỏ hoàn toàn hiện tượng Cold Start."
    ]
  },
  "s35-l1": {
    "domain": 3,
    "task": "3.2",
    "sessionIds": [
      35
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Attach an Elastic IP address directly to the AWS Lambda function.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Hàm Lambda gắn vào VPC không bao giờ có Public IP trực tiếp. Để một hàm Lambda trong Private Subnet đi ra được Internet, luồng mạng của Private Subnet bắt buộc phải đi qua một NAT Gateway đặt tại Public Subnet.",
      null,
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này.",
      "Phương án \"Create a Gateway VPC Endpoint for Amazon S3.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Hàm Lambda gắn vào VPC không bao giờ có Public IP trực tiếp. Để một hàm Lambda trong Private Subnet đi ra được Internet, luồng mạng của Private Subnet bắt buộc phải đi qua một NAT Gateway đặt tại Public Subnet."
    ]
  },
  "s36-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      36
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon SQS Standard Queue\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Step Functions là dịch vụ điều phối Serverless hỗ trợ sẵn Retry/Catch lỗi, rẽ nhánh điều kiện và cơ chế Callback (Task Token) chờ con người phê duyệt kéo dài tới tối đa 1 năm.",
      null,
      "Phương án \"Daisy-chaining AWS Lambda functions directly inside application code\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Step Functions là dịch vụ điều phối Serverless hỗ trợ sẵn Retry/Catch lỗi, rẽ nhánh điều kiện và cơ chế Callback (Task Token) chờ con người phê duyệt kéo dài tới tối đa 1 năm.",
      "Phương án \"Amazon EventBridge\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Step Functions là dịch vụ điều phối Serverless hỗ trợ sẵn Retry/Catch lỗi, rẽ nhánh điều kiện và cơ chế Callback (Task Token) chờ con người phê duyệt kéo dài tới tối đa 1 năm."
    ]
  },
  "s36-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      36
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Create an individual IAM user for each mobile player.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Cognito User Pools xử lý việc đăng nhập người dùng (bao gồm liên kết Google/Facebook), sau đó Cognito Identity Pools đổi token đó lấy Temporary AWS Credentials (qua STS) để ứng dụng gọi trực tiếp vào DynamoDB an toàn.",
      null,
      "Phương án \"Use AWS IAM Identity Center (AWS SSO).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Cognito User Pools xử lý việc đăng nhập người dùng (bao gồm liên kết Google/Facebook), sau đó Cognito Identity Pools đổi token đó lấy Temporary AWS Credentials (qua STS) để ứng dụng gọi trực tiếp vào DynamoDB an toàn.",
      "Lưu trữ Access Key dài hạn tiềm ẩn rủi ro lộ khóa bảo mật và tốn công xoay vòng thủ công thay vì dùng IAM Role."
    ]
  },
  "s37-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      37
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"/28\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Dải /27 có 2^5 = 32 địa chỉ IP, nhưng sau khi trừ đi 5 địa chỉ IP do AWS giữ lại thì chỉ còn 32 - 5 = 27 IP khả dụng (thiếu 1 IP so với yêu cầu 28 máy!). Do đó bắt buộc phải chọn dải /26 (64 - 5 = 59 IP khả dụng).",
      "Phương án \"/27\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Dải /27 có 2^5 = 32 địa chỉ IP, nhưng sau khi trừ đi 5 địa chỉ IP do AWS giữ lại thì chỉ còn 32 - 5 = 27 IP khả dụng (thiếu 1 IP so với yêu cầu 28 máy!). Do đó bắt buộc phải chọn dải /26 (64 - 5 = 59 IP khả dụng).",
      null,
      "Phương án \"/25\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Dải /27 có 2^5 = 32 địa chỉ IP, nhưng sau khi trừ đi 5 địa chỉ IP do AWS giữ lại thì chỉ còn 32 - 5 = 27 IP khả dụng (thiếu 1 IP so với yêu cầu 28 máy!). Do đó bắt buộc phải chọn dải /26 (64 - 5 = 59 IP khả dụng)."
    ]
  },
  "s37-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      37
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Directly modify the existing primary CIDR block from /24 to /16.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS không cho phép sửa trực tiếp kích thước của Primary CIDR block đang tồn tại, nhưng cho phép gắn thêm tối đa 4 Secondary IPv4 CIDR blocks vào VPC để mở rộng không gian địa chỉ ngay lập tức.",
      null,
      "Phương án \"Delete the entire VPC and recreate it with a larger CIDR block.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS không cho phép sửa trực tiếp kích thước của Primary CIDR block đang tồn tại, nhưng cho phép gắn thêm tối đa 4 Secondary IPv4 CIDR blocks vào VPC để mở rộng không gian địa chỉ ngay lập tức.",
      "Phương án \"Use a NAT Gateway to multiply internal IP addresses.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS không cho phép sửa trực tiếp kích thước của Primary CIDR block đang tồn tại, nhưng cho phép gắn thêm tối đa 4 Secondary IPv4 CIDR blocks vào VPC để mở rộng không gian địa chỉ ngay lập tức."
    ]
  },
  "s38-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      38
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Use EC2 Instance Connect over port 22.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. SSM Session Manager cho phép truy cập shell vào EC2 mà không cần mở bất kỳ cổng Inbound nào, không cần quản lý SSH keys hay Bastion host, phân quyền bằng IAM và hỗ trợ ghi log mọi câu lệnh lên S3/CloudWatch.",
      null,
      "Phương án \"Deploy a Network Load Balancer in a public subnet forwarding port 22.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. SSM Session Manager cho phép truy cập shell vào EC2 mà không cần mở bất kỳ cổng Inbound nào, không cần quản lý SSH keys hay Bastion host, phân quyền bằng IAM và hỗ trợ ghi log mọi câu lệnh lên S3/CloudWatch.",
      "Phương án \"Use AWS Direct Connect.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. SSM Session Manager cho phép truy cập shell vào EC2 mà không cần mở bất kỳ cổng Inbound nào, không cần quản lý SSH keys hay Bastion host, phân quyền bằng IAM và hỗ trợ ghi log mọi câu lệnh lên S3/CloudWatch."
    ]
  },
  "s38-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      38
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Sticky Sessions are not enabled.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Việc gắn Internet Gateway vào VPC là chưa đủ; Route Table của Subnet chứa máy EC2 đó bắt buộc phải có route 0.0.0.0/0 trỏ về Internet Gateway thì Subnet đó mới thực sự thông ra Internet.",
      null,
      "Phương án \"A NAT Gateway has not been created.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Việc gắn Internet Gateway vào VPC là chưa đủ; Route Table của Subnet chứa máy EC2 đó bắt buộc phải có route 0.0.0.0/0 trỏ về Internet Gateway thì Subnet đó mới thực sự thông ra Internet.",
      "Phương án \"VPC Flow Logs are disabled.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Việc gắn Internet Gateway vào VPC là chưa đủ; Route Table của Subnet chứa máy EC2 đó bắt buộc phải có route 0.0.0.0/0 trỏ về Internet Gateway thì Subnet đó mới thực sự thông ra Internet."
    ]
  },
  "s39-l0": {
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      39
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Port 22 is not open on the NAT Gateway.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đây là bẫy kinh điển nhất phần VPC: NAT Gateway phục vụ cho Private Subnet, nhưng bản thân cái NAT Gateway đó BẮT BUỘC phải được đặt bên trong một Public Subnet có đường đi ra Internet Gateway.",
      null,
      "Phương án \"NAT Gateways only support IPv6 traffic.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đây là bẫy kinh điển nhất phần VPC: NAT Gateway phục vụ cho Private Subnet, nhưng bản thân cái NAT Gateway đó BẮT BUỘC phải được đặt bên trong một Public Subnet có đường đi ra Internet Gateway.",
      "Phương án \"Source/Destination Check was not disabled on the NAT Gateway.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Đây là bẫy kinh điển nhất phần VPC: NAT Gateway phục vụ cho Private Subnet, nhưng bản thân cái NAT Gateway đó BẮT BUỘC phải được đặt bên trong một Public Subnet có đường đi ra Internet Gateway."
    ]
  },
  "s39-l1": {
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      39
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Upgrade the NAT Instance to a c5.4xlarge instance.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Sử dụng AWS Managed NAT Gateway đặt tại mỗi AZ giúp đạt băng thông lên tới 100 Gbps, tự động chịu lỗi ở từng AZ và loại bỏ hoàn toàn công sức quản trị máy chủ NAT Instance.",
      null,
      "Phương án \"Attach a second Internet Gateway to the VPC.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Sử dụng AWS Managed NAT Gateway đặt tại mỗi AZ giúp đạt băng thông lên tới 100 Gbps, tự động chịu lỗi ở từng AZ và loại bỏ hoàn toàn công sức quản trị máy chủ NAT Instance.",
      "Phương án \"Use an Egress-Only Internet Gateway for IPv4 traffic.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Sử dụng AWS Managed NAT Gateway đặt tại mỗi AZ giúp đạt băng thông lên tới 100 Gbps, tự động chịu lỗi ở từng AZ và loại bỏ hoàn toàn công sức quản trị máy chủ NAT Instance."
    ]
  },
  "s40-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      40
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Security Group chỉ hỗ trợ quy tắc Allow, không có quy tắc Deny.",
      null,
      "Phương án \"Add an Inbound DENY rule to the Network ACL with Rule #200.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Security Group không hỗ trợ lệnh Deny. Trên Network ACL (NACL), các quy tắc được đọc theo thứ tự từ nhỏ đến lớn, nên lệnh DENY cho IP cụ thể bắt buộc phải có Rule Number nhỏ hơn 100.",
      "Phương án \"Detach the Internet Gateway from the VPC.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Security Group không hỗ trợ lệnh Deny. Trên Network ACL (NACL), các quy tắc được đọc theo thứ tự từ nhỏ đến lớn, nên lệnh DENY cho IP cụ thể bắt buộc phải có Rule Number nhỏ hơn 100."
    ]
  },
  "s40-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      40
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"VPC Flow Logs\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. VPC Reachability Analyzer kiểm tra toán học toàn bộ chuỗi cấu hình mạng (SG, NACL, Route Table, Peering, TGW) giữa nguồn và đích để chỉ ra chính xác quy tắc nào đang làm đứt kết nối.",
      null,
      "Phương án \"VPC Traffic Mirroring\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. VPC Reachability Analyzer kiểm tra toán học toàn bộ chuỗi cấu hình mạng (SG, NACL, Route Table, Peering, TGW) giữa nguồn và đích để chỉ ra chính xác quy tắc nào đang làm đứt kết nối.",
      "Phương án \"Amazon Inspector\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. VPC Reachability Analyzer kiểm tra toán học toàn bộ chuỗi cấu hình mạng (SG, NACL, Route Table, Peering, TGW) giữa nguồn và đích để chỉ ra chính xác quy tắc nào đang làm đứt kết nối."
    ]
  },
  "s41-l0": {
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      41
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Replace the NAT Gateway with a NAT Instance.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway VPC Endpoints hỗ trợ đúng 2 dịch vụ là Amazon S3 và DynamoDB, hoạt động qua Route Table và HOÀN TOÀN MIỄN PHÍ (không tốn phí giờ và không tốn phí xử lý mỗi GB dữ liệu).",
      null,
      "Phương án \"Create Interface VPC Endpoints (AWS PrivateLink) for S3 and DynamoDB.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway VPC Endpoints hỗ trợ đúng 2 dịch vụ là Amazon S3 và DynamoDB, hoạt động qua Route Table và HOÀN TOÀN MIỄN PHÍ (không tốn phí giờ và không tốn phí xử lý mỗi GB dữ liệu).",
      "Phương án \"Enable S3 Transfer Acceleration.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway VPC Endpoints hỗ trợ đúng 2 dịch vụ là Amazon S3 và DynamoDB, hoạt động qua Route Table và HOÀN TOÀN MIỄN PHÍ (không tốn phí giờ và không tốn phí xử lý mỗi GB dữ liệu)."
    ]
  },
  "s41-l1": {
    "domain": 4,
    "task": "4.4",
    "sessionIds": [
      41
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Establish VPC Peering connections between the VPCs.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS PrivateLink (NLB + VPC Endpoint Service) cho phép chia sẻ 1 dịch vụ cụ thể theo chiều đơn hướng từ Consumer sang Provider mà không cần VPC Peering và hoàn toàn không bị lỗi khi các VPC trùng dải IP CIDR.",
      null,
      "Phương án \"Connect all VPCs to a single AWS Transit Gateway.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS PrivateLink (NLB + VPC Endpoint Service) cho phép chia sẻ 1 dịch vụ cụ thể theo chiều đơn hướng từ Consumer sang Provider mà không cần VPC Peering và hoàn toàn không bị lỗi khi các VPC trùng dải IP CIDR.",
      "Phương án \"Expose the service publicly through an Internet Gateway.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS PrivateLink (NLB + VPC Endpoint Service) cho phép chia sẻ 1 dịch vụ cụ thể theo chiều đơn hướng từ Consumer sang Provider mà không cần VPC Peering và hoàn toàn không bị lỗi khi các VPC trùng dải IP CIDR."
    ]
  },
  "s42-l0": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      42
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Enable SSE-KMS directly on the Direct Connect connection.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Direct Connect không có sẵn mã hóa IPsec. Chạy AWS Site-to-Site VPN bên trên Direct Connect cung cấp mã hóa IPsec đầu cuối, và một kết nối VPN qua Internet là phương án backup rẻ nhất.",
      null,
      "Phương án \"Replace Direct Connect with VPC Peering.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Direct Connect không có sẵn mã hóa IPsec. Chạy AWS Site-to-Site VPN bên trên Direct Connect cung cấp mã hóa IPsec đầu cuối, và một kết nối VPN qua Internet là phương án backup rẻ nhất.",
      "Phương án \"Use a Gateway VPC Endpoint.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Direct Connect không có sẵn mã hóa IPsec. Chạy AWS Site-to-Site VPN bên trên Direct Connect cung cấp mã hóa IPsec đầu cuối, và một kết nối VPN qua Internet là phương án backup rẻ nhất."
    ]
  },
  "s42-l1": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      42
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Create 25 individual VPC Peering connections.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Direct Connect Gateway cho phép bắc cầu từ 1 đường cáp Direct Connect sang nhiều AWS Regions, và kết hợp với Transit Gateway ở mỗi Region sẽ gom toàn bộ 25 VPC theo mô hình Hub-and-Spoke gọn nhất.",
      null,
      "Phương án \"Use AWS Global Accelerator.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Direct Connect Gateway cho phép bắc cầu từ 1 đường cáp Direct Connect sang nhiều AWS Regions, và kết hợp với Transit Gateway ở mỗi Region sẽ gom toàn bộ 25 VPC theo mô hình Hub-and-Spoke gọn nhất.",
      "Phương án \"Use 25 Internet Gateways.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Direct Connect Gateway cho phép bắc cầu từ 1 đường cáp Direct Connect sang nhiều AWS Regions, và kết hợp với Transit Gateway ở mỗi Region sẽ gom toàn bộ 25 VPC theo mô hình Hub-and-Spoke gọn nhất."
    ]
  },
  "s43-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      43
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"NAT Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. NAT Gateway chỉ hoạt động với IPv4. Đối với IPv6, Egress-Only Internet Gateway là thành phần chuyên dụng cho phép kết nối IPv6 đi ra Internet một chiều và chặn hoàn toàn kết nối khởi tạo từ Internet vào.",
      null,
      "Phương án \"Bastion Host\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. NAT Gateway chỉ hoạt động với IPv4. Đối với IPv6, Egress-Only Internet Gateway là thành phần chuyên dụng cho phép kết nối IPv6 đi ra Internet một chiều và chặn hoàn toàn kết nối khởi tạo từ Internet vào.",
      "Phương án \"Gateway VPC Endpoint\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. NAT Gateway chỉ hoạt động với IPv4. Đối với IPv6, Egress-Only Internet Gateway là thành phần chuyên dụng cho phép kết nối IPv6 đi ra Internet một chiều và chặn hoàn toàn kết nối khởi tạo từ Internet vào."
    ]
  },
  "s43-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      43
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Security Groups\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Security Groups và NACLs chỉ lọc được theo IP/Port chứ không lọc được theo tên miền (Domain name/FQDN). AWS Network Firewall hỗ trợ lọc tên miền chiều ra (Outbound domain filtering) và bộ quy tắc chống xâm nhập IPS cho toàn bộ VPC.",
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này.",
      null,
      "Phương án \"AWS Shield Standard\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Security Groups và NACLs chỉ lọc được theo IP/Port chứ không lọc được theo tên miền (Domain name/FQDN). AWS Network Firewall hỗ trợ lọc tên miền chiều ra (Outbound domain filtering) và bộ quy tắc chống xâm nhập IPS cho toàn bộ VPC."
    ]
  },
  "s44-l0": {
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      44
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Move the CSV files to S3 Glacier Deep Archive.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Athena tính phí $5 trên mỗi TB dữ liệu quét qua. Chuyển CSV sang định dạng cột nén (Apache Parquet/ORC) và phân vùng dữ liệu (Partitioning) giúp Athena chỉ đọc đúng các cột và phân vùng cần thiết, giảm tới 90% lượng dữ liệu phải quét.",
      null,
      "Phương án \"Place Amazon CloudFront in front of the S3 bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Athena tính phí $5 trên mỗi TB dữ liệu quét qua. Chuyển CSV sang định dạng cột nén (Apache Parquet/ORC) và phân vùng dữ liệu (Partitioning) giúp Athena chỉ đọc đúng các cột và phân vùng cần thiết, giảm tới 90% lượng dữ liệu phải quét.",
      "Phương án \"Rename the S3 bucket.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Athena tính phí $5 trên mỗi TB dữ liệu quét qua. Chuyển CSV sang định dạng cột nén (Apache Parquet/ORC) và phân vùng dữ liệu (Partitioning) giúp Athena chỉ đọc đúng các cột và phân vùng cần thiết, giảm tới 90% lượng dữ liệu phải quét."
    ]
  },
  "s44-l1": {
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      44
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"S3 Object Lock\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lake Formation quản lý quyền truy cập Data Lake tập trung và hỗ trợ sẵn tính năng bảo mật cấp độ bảng, cột (Column-level) và dòng (Row-level/Cell-level) cho S3, Athena, Redshift và QuickSight.",
      null,
      "Phương án \"AWS WAF\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lake Formation quản lý quyền truy cập Data Lake tập trung và hỗ trợ sẵn tính năng bảo mật cấp độ bảng, cột (Column-level) và dòng (Row-level/Cell-level) cho S3, Athena, Redshift và QuickSight.",
      "Phương án \"IAM Credentials Report\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lake Formation quản lý quyền truy cập Data Lake tập trung và hỗ trợ sẵn tính năng bảo mật cấp độ bảng, cột (Column-level) và dòng (Row-level/Cell-level) cho S3, Athena, Redshift và QuickSight."
    ]
  },
  "s45-l0": {
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      45
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon Rekognition\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Textract là dịch vụ OCR thông minh chuyên trích xuất văn bản, chữ viết tay, biểu mẫu (forms) và bảng biểu (tables) từ các tài liệu quét (scanned documents/PDFs).",
      null,
      "Phương án \"Amazon Comprehend\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Textract là dịch vụ OCR thông minh chuyên trích xuất văn bản, chữ viết tay, biểu mẫu (forms) và bảng biểu (tables) từ các tài liệu quét (scanned documents/PDFs).",
      "Phương án \"Amazon Transcribe\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Textract là dịch vụ OCR thông minh chuyên trích xuất văn bản, chữ viết tay, biểu mẫu (forms) và bảng biểu (tables) từ các tài liệu quét (scanned documents/PDFs)."
    ]
  },
  "s45-l1": {
    "domain": 3,
    "task": "3.5",
    "sessionIds": [
      45
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon Polly and Amazon Translate\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Transcribe chuyển âm thanh thành văn bản kèm tính năng ẩn PII (PII Redaction), sau đó Amazon Comprehend thực hiện phân tích cảm xúc (Sentiment Analysis) trên văn bản đó.",
      null,
      "Phương án \"Amazon Textract and Amazon Kendra\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Transcribe chuyển âm thanh thành văn bản kèm tính năng ẩn PII (PII Redaction), sau đó Amazon Comprehend thực hiện phân tích cảm xúc (Sentiment Analysis) trên văn bản đó.",
      "Phương án \"Amazon Lex and Amazon Rekognition\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Transcribe chuyển âm thanh thành văn bản kèm tính năng ẩn PII (PII Redaction), sau đó Amazon Comprehend thực hiện phân tích cảm xúc (Sentiment Analysis) trên văn bản đó."
    ]
  },
  "s46-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      46
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Enable EC2 Detailed Monitoring.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mặc định Hypervisor của AWS không nhìn vào bên trong hệ điều hành để đo RAM hay dung lượng ổ cứng trống. Bắt buộc phải cài đặt CloudWatch Unified Agent vào trong OS của máy EC2.",
      null,
      "Phương án \"Enable AWS CloudTrail Insights.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mặc định Hypervisor của AWS không nhìn vào bên trong hệ điều hành để đo RAM hay dung lượng ổ cứng trống. Bắt buộc phải cài đặt CloudWatch Unified Agent vào trong OS của máy EC2.",
      "Phương án \"Enable VPC Flow Logs.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mặc định Hypervisor của AWS không nhìn vào bên trong hệ điều hành để đo RAM hay dung lượng ổ cứng trống. Bắt buộc phải cài đặt CloudWatch Unified Agent vào trong OS của máy EC2."
    ]
  },
  "s46-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      46
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon CloudWatch Logs\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS CloudTrail ghi lại toàn bộ lịch sử các lệnh gọi API (Management Events) trong tài khoản AWS, cho biết chính xác Ai (Who), Làm gì (What), Khi nào (When) và Từ IP nào (Where).",
      null,
      "Phương án \"AWS Config\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS CloudTrail ghi lại toàn bộ lịch sử các lệnh gọi API (Management Events) trong tài khoản AWS, cho biết chính xác Ai (Who), Làm gì (What), Khi nào (When) và Từ IP nào (Where).",
      "Phương án \"Amazon Inspector\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS CloudTrail ghi lại toàn bộ lịch sử các lệnh gọi API (Management Events) trong tài khoản AWS, cho biết chính xác Ai (Who), Làm gì (What), Khi nào (When) và Từ IP nào (Where)."
    ]
  },
  "s47-l0": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      47
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Attach an IAM Permissions Boundary to each individual IAM user.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Service Control Policy (SCP) trong AWS Organizations cho phép áp đặt ranh giới quyền tập trung lên toàn bộ tài khoản thành viên (bao gồm cả Root user của các tài khoản đó).",
      null,
      "Phương án \"Use AWS WAF geographic match rules.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Service Control Policy (SCP) trong AWS Organizations cho phép áp đặt ranh giới quyền tập trung lên toàn bộ tài khoản thành viên (bao gồm cả Root user của các tài khoản đó).",
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này."
    ]
  },
  "s47-l1": {
    "domain": 1,
    "task": "1.1",
    "sessionIds": [
      47
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"AWS Service Catalog\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Resource Access Manager (AWS RAM) cho phép chia sẻ VPC Subnets (VPC Sharing), Transit Gateways và Route 53 Resolver rules xuyên qua các tài khoản trong cùng một AWS Organization.",
      "Phương án \"AWS Secrets Manager\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Resource Access Manager (AWS RAM) cho phép chia sẻ VPC Subnets (VPC Sharing), Transit Gateways và Route 53 Resolver rules xuyên qua các tài khoản trong cùng một AWS Organization.",
      "Phương án \"Amazon Route 53\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Resource Access Manager (AWS RAM) cho phép chia sẻ VPC Subnets (VPC Sharing), Transit Gateways và Route 53 Resolver rules xuyên qua các tài khoản trong cùng một AWS Organization."
    ]
  },
  "s48-l0": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      48
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"AWS Systems Manager Parameter Store (Standard parameters)\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Secrets Manager tích hợp sẵn tính năng tự động xoay vòng mật khẩu định kỳ (Automatic Rotation) cho RDS, Aurora, Redshift và DocumentDB bằng hàm Lambda dựng sẵn.",
      null,
      "Phương án \"AWS KMS\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Secrets Manager tích hợp sẵn tính năng tự động xoay vòng mật khẩu định kỳ (Automatic Rotation) cho RDS, Aurora, Redshift và DocumentDB bằng hàm Lambda dựng sẵn.",
      "Phương án \"IAM Credentials Report\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Secrets Manager tích hợp sẵn tính năng tự động xoay vòng mật khẩu định kỳ (Automatic Rotation) cho RDS, Aurora, Redshift và DocumentDB bằng hàm Lambda dựng sẵn."
    ]
  },
  "s48-l1": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      48
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Migrate the S3 bucket to the us-east-1 Region.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mọi chứng chỉ ACM gắn vào Amazon CloudFront bắt buộc phải nằm tại Region us-east-1 (N. Virginia), bất kể Origin S3 hay ALB nằm ở Region nào.",
      null,
      "Phương án \"Use AWS CloudHSM instead of ACM.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mọi chứng chỉ ACM gắn vào Amazon CloudFront bắt buộc phải nằm tại Region us-east-1 (N. Virginia), bất kể Origin S3 hay ALB nằm ở Region nào.",
      "Phương án \"Request the SSL certificate inside Amazon Route 53.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Mọi chứng chỉ ACM gắn vào Amazon CloudFront bắt buộc phải nằm tại Region us-east-1 (N. Virginia), bất kể Origin S3 hay ALB nằm ở Region nào."
    ]
  },
  "s49-l0": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      49
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Attach AWS WAF directly to the Elastic Network Interface (ENI) of the EC2 i...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS WAF không thể gắn trực tiếp vào EC2. Phải đặt một ALB hoặc CloudFront ở phía trước EC2 để gắn AWS WAF kèm quy tắc chống SQLi và Rate-based rule.",
      null,
      "Network ACL là tường lửa Stateless ở cấp Subnet, không phù hợp bằng phương án được chọn cho yêu cầu này.",
      "Phương án \"Enable Amazon Macie.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS WAF không thể gắn trực tiếp vào EC2. Phải đặt một ALB hoặc CloudFront ở phía trước EC2 để gắn AWS WAF kèm quy tắc chống SQLi và Rate-based rule."
    ]
  },
  "s49-l1": {
    "domain": 1,
    "task": "1.2",
    "sessionIds": [
      49
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Amazon GuardDuty\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Inspector là dịch vụ quản lý lỗ hổng tự động chuyên quét CVE trên 3 mục tiêu: EC2 instances (qua SSM Agent), Container images trên ECR, và các hàm AWS Lambda.",
      null,
      "Phương án \"Amazon Macie\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Inspector là dịch vụ quản lý lỗ hổng tự động chuyên quét CVE trên 3 mục tiêu: EC2 instances (qua SSM Agent), Container images trên ECR, và các hàm AWS Lambda.",
      "Phương án \"AWS Artifact\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Inspector là dịch vụ quản lý lỗ hổng tự động chuyên quét CVE trên 3 mục tiêu: EC2 instances (qua SSM Agent), Container images trên ECR, và các hàm AWS Lambda."
    ]
  },
  "s50-l0": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      50
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Backup and Restore\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chạy sẵn một phiên bản thu nhỏ nhưng đầy đủ mọi tầng của hệ thống (fully functional scaled-down version) 24/7 ở Region dự phòng chính là định nghĩa của Warm Standby.",
      "Phương án \"Pilot Light\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chạy sẵn một phiên bản thu nhỏ nhưng đầy đủ mọi tầng của hệ thống (fully functional scaled-down version) 24/7 ở Region dự phòng chính là định nghĩa của Warm Standby.",
      null,
      "Phương án \"Multi-Site Active/Active\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Chạy sẵn một phiên bản thu nhỏ nhưng đầy đủ mọi tầng của hệ thống (fully functional scaled-down version) 24/7 ở Region dự phòng chính là định nghĩa của Warm Standby."
    ]
  },
  "s50-l1": {
    "domain": 2,
    "task": "2.2",
    "sessionIds": [
      50
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Use S3 Transfer Acceleration only.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì đây là di chuyển khác hệ quản trị CSDL (Heterogeneous migration: từ Oracle sang PostgreSQL), bắt buộc phải dùng AWS SCT để chuyển đổi Schema trước, sau đó dùng AWS DMS với tính năng CDC để đồng bộ dữ liệu liên tục mà không gây downtime.",
      null,
      "Phương án \"Use Amazon Data Lifecycle Manager (DLM).\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì đây là di chuyển khác hệ quản trị CSDL (Heterogeneous migration: từ Oracle sang PostgreSQL), bắt buộc phải dùng AWS SCT để chuyển đổi Schema trước, sau đó dùng AWS DMS với tính năng CDC để đồng bộ dữ liệu liên tục mà không gây downtime.",
      "Phương án \"Take an EBS Snapshot of the Oracle server and attach it to Aurora.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Vì đây là di chuyển khác hệ quản trị CSDL (Heterogeneous migration: từ Oracle sang PostgreSQL), bắt buộc phải dùng AWS SCT để chuyển đổi Schema trước, sau đó dùng AWS DMS với tính năng CDC để đồng bộ dữ liệu liên tục mà không gây downtime."
    ]
  },
  "s51-l0": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      51
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Manually log in to each of the 40 accounts and run AWS CLI scripts.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS CloudFormation StackSets cho phép triển khai hạ tầng tự động xuyên qua nhiều tài khoản (Multi-account) và nhiều vùng (Multi-Region) trong AWS Organizations, bao gồm cả việc tự động chạy khi có tài khoản mới gia nhập OU.",
      null,
      "Phương án \"Use AWS Elastic Beanstalk.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS CloudFormation StackSets cho phép triển khai hạ tầng tự động xuyên qua nhiều tài khoản (Multi-account) và nhiều vùng (Multi-Region) trong AWS Organizations, bao gồm cả việc tự động chạy khi có tài khoản mới gia nhập OU.",
      "Phương án \"Use AWS Compute Optimizer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS CloudFormation StackSets cho phép triển khai hạ tầng tự động xuyên qua nhiều tài khoản (Multi-account) và nhiều vùng (Multi-Region) trong AWS Organizations, bao gồm cả việc tự động chạy khi có tài khoản mới gia nhập OU."
    ]
  },
  "s51-l1": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      51
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"AWS Budgets\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Compute Optimizer sử dụng Machine Learning phân tích lịch sử CloudWatch metrics để phát hiện các tài nguyên bị cấp phát thừa (Over-provisioned) và đề xuất cấu hình tối ưu cho EC2, ASG, EBS, Lambda và ECS Fargate.",
      null,
      "Phương án \"AWS Artifact\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Compute Optimizer sử dụng Machine Learning phân tích lịch sử CloudWatch metrics để phát hiện các tài nguyên bị cấp phát thừa (Over-provisioned) và đề xuất cấu hình tối ưu cho EC2, ASG, EBS, Lambda và ECS Fargate.",
      "Phương án \"Amazon Inspector\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Compute Optimizer sử dụng Machine Learning phân tích lịch sử CloudWatch metrics để phát hiện các tài nguyên bị cấp phát thừa (Over-provisioned) và đề xuất cấu hình tối ưu cho EC2, ASG, EBS, Lambda và ECS Fargate."
    ]
  },
  "s52-l0": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      52
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon EBS io2 Block Express\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon EFS là hệ thống file mạng chuẩn POSIX duy nhất có thể mount đồng thời vào cả EC2 Linux, ECS Fargate containers và hàm AWS Lambda trải rộng trên nhiều Availability Zones.",
      null,
      "Phương án \"Amazon S3 Glacier\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon EFS là hệ thống file mạng chuẩn POSIX duy nhất có thể mount đồng thời vào cả EC2 Linux, ECS Fargate containers và hàm AWS Lambda trải rộng trên nhiều Availability Zones.",
      "Phương án \"EC2 Instance Store\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon EFS là hệ thống file mạng chuẩn POSIX duy nhất có thể mount đồng thời vào cả EC2 Linux, ECS Fargate containers và hàm AWS Lambda trải rộng trên nhiều Availability Zones."
    ]
  },
  "s52-l1": {
    "domain": 3,
    "task": "3.1",
    "sessionIds": [
      52
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"RDS Multi-AZ deployment\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Aurora Global Database nhân bản dữ liệu sang <span class=\"fact-update\" data-since=\"2024-05\">tối đa 10 Regions phụ</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 5 Regions phụ</span> với độ trễ dưới 1 giây (<1s) và hỗ trợ khôi phục thảm họa toàn Region với RTO dưới 1 phút.",
      null,
      "Phương án \"Daily cross-Region EBS Snapshot copies\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Aurora Global Database nhân bản dữ liệu sang <span class=\"fact-update\" data-since=\"2024-05\">tối đa 10 Regions phụ</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 5 Regions phụ</span> với độ trễ dưới 1 giây (<1s) và hỗ trợ khôi phục thảm họa toàn Region với RTO dưới 1 phút.",
      "Phương án \"Amazon Redshift\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Aurora Global Database nhân bản dữ liệu sang <span class=\"fact-update\" data-since=\"2024-05\">tối đa 10 Regions phụ</span> <span class=\"exam-legacy\">Đề cũ có thể ghi: tối đa 5 Regions phụ</span> với độ trễ dưới 1 giây (<1s) và hỗ trợ khôi phục thảm họa toàn Region với RTO dưới 1 phút."
    ]
  },
  "s53-l0": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      53
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Attach Elastic IP addresses directly to the Application Load Balancer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ALB không hỗ trợ gắn Static/Elastic IP, còn NLB không hỗ trợ định tuyến Layer 7 Path-based routing. Đặt NLB (gắn Elastic IP) ở phía trước trỏ vào ALB ở phía sau giải quyết hoàn hảo cả hai yêu cầu.",
      null,
      "Phương án \"Replace the ALB with a Gateway Load Balancer.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ALB không hỗ trợ gắn Static/Elastic IP, còn NLB không hỗ trợ định tuyến Layer 7 Path-based routing. Đặt NLB (gắn Elastic IP) ở phía trước trỏ vào ALB ở phía sau giải quyết hoàn hảo cả hai yêu cầu.",
      "Phương án \"Use a CNAME record in Route 53.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. ALB không hỗ trợ gắn Static/Elastic IP, còn NLB không hỗ trợ định tuyến Layer 7 Path-based routing. Đặt NLB (gắn Elastic IP) ở phía trước trỏ vào ALB ở phía sau giải quyết hoàn hảo cả hai yêu cầu."
    ]
  },
  "s53-l1": {
    "domain": 3,
    "task": "3.4",
    "sessionIds": [
      53
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Gateway VPC Endpoints\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway VPC Endpoint chỉ hỗ trợ S3 và DynamoDB. Đối với Secrets Manager và SQS, phải sử dụng Interface VPC Endpoints (powered by AWS PrivateLink).",
      null,
      "Phương án \"Egress-Only Internet Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway VPC Endpoint chỉ hỗ trợ S3 và DynamoDB. Đối với Secrets Manager và SQS, phải sử dụng Interface VPC Endpoints (powered by AWS PrivateLink).",
      "Phương án \"VPC Flow Logs\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Gateway VPC Endpoint chỉ hỗ trợ S3 và DynamoDB. Đối với Secrets Manager và SQS, phải sử dụng Interface VPC Endpoints (powered by AWS PrivateLink)."
    ]
  },
  "s54-l0": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      54
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"AWS Lambda\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lambda bị giới hạn cứng tối đa 15 phút và 10 GB RAM nên không thể chạy tác vụ 45 phút / 32 GB RAM. Giải pháp Serverless phù hợp nhất là chạy container trên AWS Fargate (qua ECS hoặc AWS Batch).",
      null,
      "Phương án \"Amazon CloudFront Functions\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lambda bị giới hạn cứng tối đa 15 phút và 10 GB RAM nên không thể chạy tác vụ 45 phút / 32 GB RAM. Giải pháp Serverless phù hợp nhất là chạy container trên AWS Fargate (qua ECS hoặc AWS Batch).",
      "Phương án \"Amazon API Gateway\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lambda bị giới hạn cứng tối đa 15 phút và 10 GB RAM nên không thể chạy tác vụ 45 phút / 32 GB RAM. Giải pháp Serverless phù hợp nhất là chạy container trên AWS Fargate (qua ECS hoặc AWS Batch)."
    ]
  },
  "s54-l1": {
    "domain": 2,
    "task": "2.1",
    "sessionIds": [
      54
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"SQS FIFO queues only allow 1 EC2 consumer instance to connect at a time.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Trong SQS FIFO, các tin nhắn có cùng MessageGroupId được khóa chặt để xử lý tuần tự từng cái một. Muốn 10 máy xử lý song song mà vẫn giữ đúng thứ tự cho từng khách hàng, phải dùng nhiều MessageGroupId khác nhau (ví dụ: CustomerID).",
      "Phương án \"SQS Long Polling is not enabled.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Trong SQS FIFO, các tin nhắn có cùng MessageGroupId được khóa chặt để xử lý tuần tự từng cái một. Muốn 10 máy xử lý song song mà vẫn giữ đúng thứ tự cho từng khách hàng, phải dùng nhiều MessageGroupId khác nhau (ví dụ: CustomerID).",
      "Phương án \"The Visibility Timeout is set to 0.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Trong SQS FIFO, các tin nhắn có cùng MessageGroupId được khóa chặt để xử lý tuần tự từng cái một. Muốn 10 máy xử lý song song mà vẫn giữ đúng thứ tự cho từng khách hàng, phải dùng nhiều MessageGroupId khác nhau (ví dụ: CustomerID)."
    ]
  },
  "s55-l0": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      55
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Amazon Inspector\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Macie sử dụng Machine Learning và nhận diện mẫu để tự động khám phá, phân loại và bảo vệ dữ liệu nhạy cảm cá nhân (PII) lưu trữ trong các S3 Buckets.",
      null,
      "Phương án \"AWS Shield Advanced\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Macie sử dụng Machine Learning và nhận diện mẫu để tự động khám phá, phân loại và bảo vệ dữ liệu nhạy cảm cá nhân (PII) lưu trữ trong các S3 Buckets.",
      "Phương án \"Amazon Rekognition\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon Macie sử dụng Machine Learning và nhận diện mẫu để tự động khám phá, phân loại và bảo vệ dữ liệu nhạy cảm cá nhân (PII) lưu trữ trong các S3 Buckets."
    ]
  },
  "s55-l1": {
    "domain": 1,
    "task": "1.3",
    "sessionIds": [
      55
    ],
    "difficulty": "medium",
    "whyWrong": [
      null,
      "Phương án \"AWS Artifact + Amazon Athena\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon GuardDuty tự động phân tích VPC Flow Logs, DNS Logs và CloudTrail để phát hiện hành vi đào tiền ảo, sau đó bắn Finding sang Amazon EventBridge để kích hoạt hàm AWS Lambda tự động cách ly máy chủ.",
      "Phương án \"AWS Cost Explorer + AWS Budgets\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon GuardDuty tự động phân tích VPC Flow Logs, DNS Logs và CloudTrail để phát hiện hành vi đào tiền ảo, sau đó bắn Finding sang Amazon EventBridge để kích hoạt hàm AWS Lambda tự động cách ly máy chủ.",
      "Phương án \"Amazon Macie + S3 Object Lock\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Amazon GuardDuty tự động phân tích VPC Flow Logs, DNS Logs và CloudTrail để phát hiện hành vi đào tiền ảo, sau đó bắn Finding sang Amazon EventBridge để kích hoạt hàm AWS Lambda tự động cách ly máy chủ."
    ]
  },
  "s56-l0": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      56
    ],
    "difficulty": "easy",
    "whyWrong": [
      "Phương án \"Placing an Application Load Balancer in a public subnet and EC2 instances i...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Câu B chứa tới 2 lỗi kỹ thuật nghiêm trọng thường dùng làm phương án nhiễu trong đề thi: (1) NAT Gateway bắt buộc phải đặt ở Public Subnet chứ không thể đặt ở Private Subnet; (2) AWS WAF chỉ gắn được vào ALB/CloudFront/API Gateway chứ không gắn được vào NLB.",
      null,
      "Phương án \"Creating a Gateway VPC Endpoint for Amazon S3 and adding it to the private ...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Câu B chứa tới 2 lỗi kỹ thuật nghiêm trọng thường dùng làm phương án nhiễu trong đề thi: (1) NAT Gateway bắt buộc phải đặt ở Public Subnet chứ không thể đặt ở Private Subnet; (2) AWS WAF chỉ gắn được vào ALB/CloudFront/API Gateway chứ không gắn được vào NLB.",
      "Phương án \"Placing Amazon RDS Proxy between AWS Lambda and Amazon Aurora.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. Câu B chứa tới 2 lỗi kỹ thuật nghiêm trọng thường dùng làm phương án nhiễu trong đề thi: (1) NAT Gateway bắt buộc phải đặt ở Public Subnet chứ không thể đặt ở Private Subnet; (2) AWS WAF chỉ gắn được vào ALB/CloudFront/API Gateway chứ không gắn được vào NLB."
    ]
  },
  "s56-l1": {
    "domain": 4,
    "task": "4.2",
    "sessionIds": [
      56
    ],
    "difficulty": "medium",
    "whyWrong": [
      "Phương án \"Generating image thumbnails in 5 seconds whenever a file is uploaded to Ama...\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lambda có giới hạn cứng thời gian thực thi tối đa (Maximum timeout) là 15 phút (900 giây). Mọi tác vụ chạy liên tục trên 15 phút (như 40 phút) đều phải loại bỏ Lambda và chọn ECS Fargate hoặc AWS Batch.",
      null,
      "Phương án \"Validating a JWT token for Amazon API Gateway in 50 milliseconds.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lambda có giới hạn cứng thời gian thực thi tối đa (Maximum timeout) là 15 phút (900 giây). Mọi tác vụ chạy liên tục trên 15 phút (như 40 phút) đều phải loại bỏ Lambda và chọn ECS Fargate hoặc AWS Batch.",
      "Phương án \"Processing change records from Amazon DynamoDB Streams.\" không đáp ứng đúng ràng buộc kỹ thuật và tối ưu kiến trúc của đề bài. AWS Lambda có giới hạn cứng thời gian thực thi tối đa (Maximum timeout) là 15 phút (900 giây). Mọi tác vụ chạy liên tục trên 15 phút (như 40 phút) đều phải loại bỏ Lambda và chọn ECS Fargate hoặc AWS Batch."
    ]
  }
};

  const api = { SESSION_DOMAINS, SESSION_TASKS, LEGACY_QUIZ_META };
  if (root) {
    root.QUIZ_META = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
