// quiz-bank-3.js — Ngân hàng câu hỏi bài học (pool: "lesson") chuẩn SAA-C03.
(function (root) {
  "use strict";
  const PART = {
  "37": [
    {
      "id": "s37-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        37
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet (Session 37, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet (Buổi #37, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Create a subnet with a /26 CIDR block (64 total IPv4 addresses minus 5 addresses reserved by AWS = 59 usable IP addresses).",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 0,
      "explanation": "Mỗi VPC CIDR block có kích thước từ /16 (65,536 IP) đến /28 (16 IP). Trong MỌI Subnet trên AWS, AWS luôn giữ lại 5 địa chỉ IP đầu/cuối không cho gắn vào EC2 (ví dụ dải 10.0.0.0/24: .0 là Network, .1 là VPC Router, .2 là AWS DNS, .3 dự phòng tương lai, .255 là Broadcast).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s37",
        "VPC CIDR Block Sizing (/16 to /28) & 5 Reserved IP Addresses per Subnet"
      ]
    },
    {
      "id": "s37-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        37
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture (Session 37, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture (Buổi #37, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Associate the web tier subnet with a custom route table that has a 0.0.0.0/0 route pointing to an Internet Gateway (IGW), while keeping database subnets routed only locally.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 2,
      "explanation": "Định nghĩa duy nhất phân biệt Public Subnet và Private Subnet là: Subnet nào có bảng định tuyến (Route Table) chứa đường đi 0.0.0.0/0 trỏ ra Internet Gateway (IGW) thì đó là Public Subnet; nếu không có đường đi thẳng ra IGW thì đó là Private Subnet.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null,
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s37",
        "Public Subnet (Route to IGW + Public IP) vs Private Subnet Architecture"
      ]
    },
    {
      "id": "s37-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        37
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW (Session 37, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements? (Choose TWO.)",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW (Buổi #37, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này? (Chọn 2 phương án.)",
      "options": [
        "A. Associate a non-overlapping secondary IPv4 CIDR block with the existing VPC and create new subnets inside that secondary range.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "C. Verify that least-privilege IAM permissions and encryption in transit are configured for all participating AWS resources.",
        "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdxs": [
        0,
        2
      ],
      "explanation": "Khi VPC cạn kiệt địa chỉ IP, ta không thể sửa kích thước CIDR block ban đầu nhưng có thể thêm các Secondary CIDR blocks (tối đa 5 khối IPv4) vào VPC. Luôn thiết kế dải IP không trùng lặp (non-overlapping CIDR) để sau này có thể nối VPC Peering hoặc Transit Gateway.",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s37",
        "Adding Secondary VPC CIDR Blocks without Overlapping IP Ranges forVPC Peering/TGW"
      ]
    }
  ],
  "38": [
    {
      "id": "s38-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        38
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing) (Session 38, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing) (Buổi #38, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Install the SSM Agent, attach an IAM role with AmazonSSMManagedInstanceCore to the EC2 instances, and connect via AWS Systems Manager Session Manager."
      ],
      "correctIdx": 3,
      "explanation": "Thay vì dựng Bastion Host ở Public Subnet và mở cổng SSH 22 nguy hiểm, giải pháp chuẩn hiện đại là dùng AWS Systems Manager (SSM) Session Manager: không cần mở bất kỳ cổng Inbound nào trên Security Group, không cần SSH key, kết nối qua HTTPS 443 và ghi lại toàn bộ lịch sử gõ lệnh vào S3/CloudWatch Logs.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s38",
        "AWS Systems Manager Session Manager (No Bastion Host, No SSH Port 22, IAM + CloudTrail Auditing)"
      ]
    },
    {
      "id": "s38-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        38
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet (Session 38, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet (Buổi #38, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Create three Interface VPC Endpoints for Systems Manager (ssm, ec2messages, and ssmmessages) inside the VPC and allow outbound HTTPS port 443.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Khi máy EC2 nằm trong Private Subnet hoàn toàn cô lập (không có NAT Gateway hay Internet), để SSM Session Manager hoạt động được, bắt buộc phải tạo các Interface VPC Endpoints (`com.amazonaws.region.ssm`, `ec2messages`, `ssmmessages`) và mở cổng HTTPS 443 giữa EC2 với Endpoint.",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s38",
        "SSM Session Manager Prerequisites in an Isolated Private Subnet without NAT/Internet"
      ]
    },
    {
      "id": "s38-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        38
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs) (Session 38, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs) (Buổi #38, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Attach a single Internet Gateway to the VPC, add a 0.0.0.0/0 route in the public subnet route table, and assign public or Elastic IPv4 addresses to the instances.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "Một VPC chỉ gắn được tối đa 1 Internet Gateway (IGW) và 1 IGW chỉ gắn cho 1 VPC. Để máy EC2 trong Public Subnet ra được Internet qua IGW, phải thỏa mãn đủ 3 điều kiện: máy có Public IP/Elastic IP, Route Table có đường 0.0.0.0/0 trỏ ra IGW, và Security Group/NACL cho phép lưu lượng.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s38",
        "Internet Gateway (1-to-1 with VPC, Horizontal Scaling, Performs 1:1 NAT for Public IPs)"
      ]
    }
  ],
  "39": [
    {
      "id": "s39-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.4",
      "sessionIds": [
        39
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets) (Session 39, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets) (Buổi #39, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Deploy the Amazon VPC NAT Gateway inside the Public Subnet and update the Private Subnet route table to route 0.0.0.0/0 traffic to the NAT Gateway ID."
      ],
      "correctIdx": 3,
      "explanation": "Bẫy đề thi kinh điển nhất về VPC: NAT Gateway phục vụ cho các máy ở Private Subnet đi ra ngoài tải bản vá, nhưng bản thân chiếc NAT Gateway BẮT BUỘC phải được đặt nằm trong PUBLIC SUBNET (vì nó cần có Elastic IP và đường đi tiếp ra Internet Gateway)!",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s39",
        "NAT Gateway Placement Rule (Must Reside in a Public Subnet to Serve Private Subnets)"
      ]
    },
    {
      "id": "s39-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.4",
      "sessionIds": [
        39
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone) (Session 39, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone) (Buổi #39, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s39",
        "Multi-AZ High Availability for NAT Gateways (One NAT Gateway per Availability Zone)"
      ]
    },
    {
      "id": "s39-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.4",
      "sessionIds": [
        39
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance (Session 39, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance (Buổi #39, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s39",
        "Managed NAT Gateway (Up to 100 Gbps, No Patching) vs Legacy Self-Managed NAT Instance"
      ]
    }
  ],
  "40": [
    {
      "id": "s40-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        40
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535) (Session 40, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535) (Buổi #40, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s40",
        "Network ACL Stateless Ephemeral Port Requirement (Inbound + Outbound 1024-65535)"
      ]
    },
    {
      "id": "s40-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        40
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups (Session 40, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups (Buổi #40, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Add a low-numbered explicit DENY inbound rule for the malicious IPv4 CIDR block in the subnet's Network ACL.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Security Group chỉ có rule ALLOW, hoàn toàn không có khả năng chặn (Deny) một địa chỉ IP cụ thể. Khi đề bài yêu cầu chặn đích danh một danh sách IP tấn công ở tầng mạng VPC, phải thêm rule DENY có số thứ tự nhỏ (ví dụ Rule #50) vào Network ACL (hoặc dùng AWS WAF nếu ở tầng 7).",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s40",
        "Blocking Specific Malicious IP Addresses Using Network ACL Deny Rules vs Security Groups"
      ]
    },
    {
      "id": "s40-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        40
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops) (Session 40, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops) (Buổi #40, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Enable VPC Flow Logs at the VPC or ENI level publishing to CloudWatch Logs or Amazon S3, and use Amazon Athena to query REJECT records.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "VPC Flow Logs ghi lại thông tin metadata của các gói tin đi qua card mạng ENI. Mẹo chẩn đoán trong đề thi: Nếu gói tin vào bị chặn (REJECT) nhưng chiều ra không có bản ghi nào -> do Security Group hoặc NACL Inbound chặn; nếu thấy Inbound ACCEPT nhưng Outbound bị REJECT -> chắc chắn 100% là do NACL Outbound thiếu cổng Ephemeral!",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s40",
        "VPC Flow Logs (Capturing ACCEPT/REJECT Metadata & Troubleshooting Security Group vs NACL Drops)"
      ]
    }
  ],
  "41": [
    {
      "id": "s41-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.4",
      "sessionIds": [
        41
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List) (Session 41, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List) (Buổi #41, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Create a Gateway VPC Endpoint for Amazon S3 and associate it with the private subnet route tables to eliminate NAT Gateway data processing charges."
      ],
      "correctIdx": 3,
      "explanation": "Khi các máy EC2 hoặc hàm Lambda trong VPC tải lượng dữ liệu lớn từ/lên Amazon S3 hoặc DynamoDB làm hóa đơn NAT Gateway tăng vọt, giải pháp tối ưu chi phí nhất luôn là tạo Gateway VPC Endpoint: hoàn toàn MIỄN PHÍ theo giờ và miễn phí xử lý dữ liệu (chỉ cần gắn vào Route Table).",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s41",
        "VPC Gateway Endpoints (Free for S3 and DynamoDB Only via Route Table Prefix List)"
      ]
    },
    {
      "id": "s41-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.4",
      "sessionIds": [
        41
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM) (Session 41, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM) (Buổi #41, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s41",
        "VPC Interface Endpoints (AWS PrivateLink Powered by ENI for SQS, KMS, Secrets Manager, SSM)"
      ]
    },
    {
      "id": "s41-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.4",
      "sessionIds": [
        41
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs (Session 41, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs (Buổi #41, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s41",
        "VPC Peering Non-Transitive Rule vs AWS PrivateLink for Overlapping CIDRs"
      ]
    }
  ],
  "42": [
    {
      "id": "s42-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        42
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect) (Session 42, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect) (Buổi #42, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s42",
        "AWS Transit Gateway (Hub-and-Spoke Routing for Hundreds of VPCs, VPN & Direct Connect)"
      ]
    },
    {
      "id": "s42-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        42
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup (Session 42, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup (Buổi #42, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision a backup AWS Site-to-Site VPN connection over the same Direct Connect Gateway (or use two Direct Connect connections at different locations) for automatic BGP failover.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Đường cáp quang vật lý AWS Direct Connect (DX) mang lại băng thông cao ổn định nhưng mất vài tuần lắp đặt và KHÔNG mã hóa mặc định (muốn mã hóa phải bọc IPSec VPN hoặc dùng MACsec). Để dự phòng HA với chi phí tối ưu nhất khi chỉ có 1 đường DX, ta cấu hình thêm 1 đường Site-to-Site VPN làm nhánh Backup tự động chuyển mạch qua BGP.",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s42",
        "AWS Direct Connect Resilience & Accelerated Site-to-Site VPN Backup"
      ]
    },
    {
      "id": "s42-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        42
      ],
      "difficulty": "hard",
      "qEn": "A company has 12 branch offices connected via Site-to-Site VPN to a single Virtual Private Gateway, remote employees working from laptops, and a hybrid environment requiring bidirectional DNS resolution between on-premises servers and Route 53 Private Hosted Zones. Which combination of AWS VPN CloudHub, AWS Client VPN, and Route 53 Resolver Inbound and Outbound Endpoints should the architect deploy?",
      "qVi": "Công ty có 12 chi nhánh nối VPN vào chung 1 VGW, nhân viên làm việc từ xa bằng laptop, và cần phân giải DNS hai chiều giữa máy chủ On-premise với Route 53 Private Hosted Zones. Sự kết hợp nào giữa VPN CloudHub, Client VPN và Route 53 Resolver Inbound/Outbound Endpoints đáp ứng đầy đủ yêu cầu?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Deploy AWS VPN CloudHub for branch-to-branch routing, AWS Client VPN for remote laptops, and Route 53 Resolver Inbound and Outbound Endpoints for bidirectional hybrid DNS.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "Tổng hợp mạng Hybrid: AWS VPN CloudHub kết nối nhiều chi nhánh văn phòng qua chung 1 VGW; AWS Client VPN cho nhân viên làm việc từ xa bằng laptop (OpenVPN); Route 53 Resolver Inbound Endpoint (cho On-prem hỏi DNS trong VPC) và Outbound Endpoint + Forwarding Rules (cho VPC hỏi DNS dưới On-prem).",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s42",
        "AWS VPN CloudHub, AWS Client VPN & Route 53 Resolver Inbound/Outbound Endpoints for Hybrid DNS"
      ]
    }
  ],
  "43": [
    {
      "id": "s43-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        43
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets) (Session 43, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets) (Buổi #43, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Create an Egress-Only Internet Gateway in the VPC and add a ::/0 route in the private subnet route table pointing to the Egress-Only Internet Gateway."
      ],
      "correctIdx": 3,
      "explanation": "Mọi địa chỉ IPv6 trên AWS đều là Public Unicast (không có khái niệm NAT cho IPv6). Để máy EC2 dùng IPv6 trong Private Subnet đi ra ngoài Internet tải bản vá nhưng chặn tuyệt đối kết nối từ Internet chủ động đi vào, ta dùng Egress-Only Internet Gateway (NAT Gateway chỉ dành cho IPv4).",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s43",
        "Egress-Only Internet Gateway (IPv6 Equivalent of NAT Gateway for Private Subnets)"
      ]
    },
    {
      "id": "s43-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        43
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection) (Session 43, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection) (Buổi #43, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s43",
        "AWS Network Firewall (Stateful L3-L7 Domain Filtering, Suricata IPS & Central Transit Gateway Inspection)"
      ]
    },
    {
      "id": "s43-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        43
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis (Session 43, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis (Buổi #43, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s43",
        "VPC Traffic Mirroring for Deep Packet Capture and Out-of-Band Security Analysis"
      ]
    }
  ],
  "44": [
    {
      "id": "s44-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        44
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization (Session 44, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization (Buổi #44, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use AWS Glue crawlers to populate the AWS Glue Data Catalog, convert the raw CSV logs into partitioned Apache Parquet format, and query them with Amazon Athena."
      ],
      "correctIdx": 3,
      "explanation": "Bộ đôi phân tích Serverless kinh điển: Amazon Athena chạy câu lệnh SQL chuẩn trực tiếp trên file lưu trong S3 (trả 5 USD/TB dữ liệu quét). Để giảm tới 90% chi phí và tăng tốc Athena, hãy dùng AWS Glue chuyển đổi file CSV/JSON sang định dạng cột nén Apache Parquet/ORC và phân vùng (Partition) thư mục theo ngày/tháng.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s44",
        "Amazon Athena (Serverless Presto SQL on S3) + AWS Glue Data Catalog + Parquet/ORC Optimization"
      ]
    },
    {
      "id": "s44-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        44
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3) (Session 44, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3) (Buổi #44, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Use AWS Lake Formation to build the S3 data lake and enforce fine-grained row-level and cell-level access controls across Athena, Redshift Spectrum, and EMR.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Khi doanh nghiệp xây dựng Data Lake trên S3 và cần quản lý phân quyền tập trung chi tiết tới từng dòng, từng cột hoặc từng ô dữ liệu (Row/Column/Cell-level security) cho nhiều dịch vụ phân tích cùng lúc mà không phải sửa hàng chục S3 Bucket Policy, đáp án duy nhất là AWS Lake Formation.",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s44",
        "AWS Lake Formation (Centralized Data Lake Governance & Column/Row/Cell-Level Security on S3)"
      ]
    },
    {
      "id": "s44-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        44
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE) (Session 44, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE) (Buổi #44, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Ingest the catalog into Amazon OpenSearch Service for millisecond full-text search and connect Amazon QuickSight with SPICE in-memory acceleration for executive BI dashboards.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "Amazon OpenSearch Service (kế thừa Elasticsearch) dùng để tìm kiếm toàn văn (Full-text search, autocomplete) và phân tích log thời gian thực (kèm giao diện OpenSearch Dashboards). Amazon QuickSight là dịch vụ vẽ biểu đồ Business Intelligence (BI) Serverless tích hợp bộ nhớ siêu tốc SPICE và tính tiền theo phiên người xem.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s44",
        "Amazon OpenSearch Service (Full-Text Search & Log Analytics) vs Amazon QuickSight (Serverless BI Dashboards with SPICE)"
      ]
    }
  ],
  "45": [
    {
      "id": "s45-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        45
      ],
      "difficulty": "easy",
      "qEn": "A company has two AI teams: Team A wants a serverless API to build a Generative AI customer support chatbot using pre-trained Foundation Models with Retrieval-Augmented Generation (RAG) Knowledge Bases; Team B (data scientists) needs to train and deploy custom PyTorch machine learning models. Which AWS services should the architect recommend?",
      "qVi": "Công ty có 2 đội AI: Đội A muốn gọi Foundation Models qua API Serverless kèm RAG Knowledge Bases để làm trợ lý Generative AI; Đội B (Data Scientists) cần tự huấn luyện mô hình ML tùy chỉnh. Kiến trúc sư nên khuyên dùng dịch vụ nào (Amazon Bedrock và Amazon SageMaker)?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use Amazon Bedrock with Knowledge Bases for Amazon Bedrock to build the RAG generative AI assistant via serverless APIs, and use Amazon SageMaker for training custom ML models."
      ],
      "correctIdx": 3,
      "explanation": "Phân biệt 2 trụ cột AI trong đề thi SAA-C03 hiện đại: Amazon Bedrock là dịch vụ Serverless gọi các Foundation Models (Claude, Titan, Llama) qua API kèm Knowledge Bases (RAG) để làm ứng dụng Generative AI mà không cần quản lý hạ tầng. Amazon SageMaker là nền tảng trọn gói để Data Scientists tự chuẩn bị dữ liệu, huấn luyện (train) và triển khai mô hình ML tùy chỉnh.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s45",
        "Amazon Bedrock (Serverless Generative AI Foundation Models & RAG Knowledge Bases) vs Amazon SageMaker (Custom Model Training & MLOps)"
      ]
    },
    {
      "id": "s45-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        45
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII) (Session 45, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII) (Buổi #45, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Use Amazon Textract to extract structured text and table data from scanned medical forms, and use Amazon Comprehend (or Comprehend Medical) to detect and redact PII entities.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Bộ dịch vụ AI dùng ngay không cần biết ML: Rekognition (nhận diện khuôn mặt, vật thể, kiểm duyệt ảnh/video); Textract (OCR thông minh bóc tách chữ viết tay, bảng biểu, hóa đơn từ PDF/ảnh scan); Comprehend (xử lý ngôn ngữ tự nhiên NLP, phân tích cảm xúc Sentiment, phát hiện dữ liệu nhạy cảm PII).",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s45",
        "Managed AI Services: Amazon Rekognition (Image/Video), Textract (OCR Forms/Tables), Comprehend (NLP/PII)"
      ]
    },
    {
      "id": "s45-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.5",
      "sessionIds": [
        45
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search) (Session 45, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search) (Buổi #45, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "C. Use Amazon Transcribe with automatic PII redaction to convert call center audio recordings into text, and index internal documents in Amazon Kendra for natural-language enterprise search.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 2,
      "explanation": "Transcribe chuyển giọng nói thành văn bản (Speech-to-Text, hỗ trợ che thông tin nhạy cảm PII và tách người nói); Polly chuyển văn bản thành giọng nói (Text-to-Speech); Translate dịch đa ngôn ngữ; Kendra là công cụ tìm kiếm tài liệu nội bộ thông minh bằng câu hỏi tự nhiên.",
      "whyWrong": [
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s45",
        "Speech & Translation AI: Amazon Transcribe (Speech-to-Text), Polly (Text-to-Speech), Translate & Kendra (Enterprise Search)"
      ]
    }
  ],
  "46": [
    {
      "id": "s46-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        46
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance) (Session 46, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance) (Buổi #46, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Inspect AWS CloudTrail management events to identify which IAM principal modified the security group, and create an AWS Config rule with Systems Manager Automation for auto-remediation."
      ],
      "correctIdx": 3,
      "explanation": "Bộ ba giám sát cốt lõi: CloudWatch theo dõi hiệu năng & log ứng dụng; AWS CloudTrail ghi lại lịch sử kiểm toán mọi lời gọi API ('Ai đã làm gì, lúc nào, từ IP nào'); AWS Config theo dõi lịch sử thay đổi cấu hình tài nguyên theo thời gian và đánh giá tuân thủ (Compliance) kèm tự động sửa lỗi qua SSM Automation.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        null
      ],
      "tags": [
        "s46",
        "CloudWatch (Performance Metrics, Logs & Alarms) vs CloudTrail (API Audit History: Who Did What) vs AWS Config (Resource Configuration Compliance)"
      ]
    },
    {
      "id": "s46-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        46
      ],
      "difficulty": "medium",
      "qEn": "Engineers running a distributed microservices architecture across API Gateway, AWS Lambda, and DynamoDB need to trace end-to-end requests on a visual service map to isolate latency bottlenecks, query logs with CloudWatch Logs Insights, and trigger an alarm using a CloudWatch Metric Filter when an error string appears. Which tool provides the end-to-end distributed tracing and service map?",
      "qVi": "Kỹ sư vận hành hệ thống microservices qua API Gateway, Lambda và DynamoDB cần truy vết end-to-end trên bản đồ dịch vụ (Service Map), truy vấn log bằng CloudWatch Logs Insights và tạo cảnh báo bằng Metric Filter. Công cụ nào cung cấp khả năng distributed tracing và vẽ Service Map?",
      "options": [
        "A. Enable AWS X-Ray across API Gateway, Lambda, and DynamoDB to visualize latency bottlenecks on a service map, and create a CloudWatch Logs Metric Filter to trigger an alarm on error patterns.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "D. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints."
      ],
      "correctIdx": 0,
      "explanation": "Khi cần truy vết hiệu năng xuyên suốt nhiều tầng microservices (Distributed tracing) và vẽ bản đồ phụ thuộc dịch vụ (Service Map), dùng AWS X-Ray. Để đếm một chuỗi lỗi cụ thể trong dòng log ứng dụng và bắn cảnh báo, tạo CloudWatch Metric Filter gắn với CloudWatch Alarm. Để truy vấn tìm kiếm log tương tác trên nhiều Log Group, dùng CloudWatch Logs Insights.",
      "whyWrong": [
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích."
      ],
      "tags": [
        "s46",
        "AWS X-Ray (End-to-End Distributed Tracing & Service Map), CloudWatch Logs Insights & Metric Filters"
      ]
    },
    {
      "id": "s46-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        46
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation (Session 46, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation (Buổi #46, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s46",
        "CloudWatch Agent Unified Metrics (RAM Utilization & Disk Space) & CloudTrail Log File Integrity Validation"
      ]
    }
  ],
  "47": [
    {
      "id": "s47-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        47
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception) (Session 47, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception) (Buổi #47, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s47",
        "AWS Organizations, Consolidated Billing & Service Control Policies (SCPs vs Management Account Exception)"
      ]
    },
    {
      "id": "s47-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        47
      ],
      "difficulty": "medium",
      "qEn": "An enterprise using AWS Organizations wants to proxy authentication requests from AWS applications directly to its on-premises Microsoft Active Directory without caching user credentials in the cloud, while also applying organization-wide Resource Control Policies (RCPs) alongside Service Control Policies (SCPs). Which AWS Directory Service option and Organizations policy should the architect use?",
      "qVi": "Doanh nghiệp dùng AWS Organizations muốn chuyển tiếp yêu cầu xác thực trực tiếp về Active Directory dưới On-premise mà không lưu user trên mây, đồng thời áp dụng Resource Control Policies (RCP) bên cạnh SCP. Tùy chọn AWS Directory Service và chính sách nào đáp ứng yêu cầu này?",
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
        "s47",
        "AWS Directory Service (Managed Microsoft AD vs AD Connector Proxy vs Simple AD) & Resource Control Policies (RCPs)"
      ]
    },
    {
      "id": "s47-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.1",
      "sessionIds": [
        47
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM) (Session 47, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements? (Choose TWO.)",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM) (Buổi #47, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này? (Chọn 2 phương án.)",
      "options": [
        "A. Configure AWS IAM Identity Center integrated with the external SAML 2.0 identity provider for single sign-on across all AWS accounts, and use AWS RAM to share Transit Gateways and Subnets.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Verify that least-privilege IAM permissions and encryption in transit are configured for all participating AWS resources.",
        "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdxs": [
        0,
        2
      ],
      "explanation": "Để đăng nhập một lần (Single Sign-On) tập trung vào hàng chục tài khoản AWS bằng tài khoản công ty (AD, Okta, Azure AD), dùng AWS IAM Identity Center. Để chia sẻ trực tiếp các tài nguyên hạ tầng (Transit Gateway, Subnets, Route 53 Resolver Rules, License Manager) giữa các tài khoản trong Organizations mà không cần tạo bản sao, dùng AWS Resource Access Manager (AWS RAM).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s47",
        "AWS IAM Identity Center (Successor to AWS SSO) & AWS Resource Access Manager (AWS RAM)"
      ]
    }
  ],
  "48": [
    {
      "id": "s48-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        48
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware) (Session 48, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware) (Buổi #48, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s48",
        "AWS KMS (Customer Managed Keys, Automatic 1-Year Rotation, Key Policies) vs AWS CloudHSM (Dedicated FIPS 140-2/3 Level 3 Hardware)"
      ]
    },
    {
      "id": "s48-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        48
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config) (Session 48, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config) (Buổi #48, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Store the Amazon RDS database credentials in AWS Secrets Manager and enable automatic secret rotation using the built-in AWS Lambda rotation template."
      ],
      "correctIdx": 3,
      "explanation": "Nếu bài toán yêu cầu lưu mật khẩu Database (RDS, Aurora, Redshift, DocumentDB) kèm tính năng TỰ ĐỘNG XOAY VÒNG MẬT KHẨU (Automatic Rotation) định kỳ, đáp án bắt buộc là AWS Secrets Manager. Nếu chỉ cần lưu cấu hình/tham số phân cấp miễn phí (hoặc tham chiếu AMI ID công khai), dùng SSM Parameter Store Standard.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s48",
        "AWS Secrets Manager (Automatic RDS Rotation via Lambda) vs SSM Parameter Store (Free Standard Tier Hierarchical Config)"
      ]
    },
    {
      "id": "s48-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        48
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing (Session 48, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing (Buổi #48, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Encrypt the source EBS volume with a Customer Managed KMS Key, grant the destination AWS account permission in the KMS Key Policy, and re-encrypt the copied snapshot in the target account.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Không bao giờ chia sẻ được EBS Snapshot hay AMI đang mã hóa bằng khóa mặc định (AWS Managed Key `aws/ebs`). Để chia sẻ sang tài khoản khác, bắt buộc phải mã hóa bằng Customer Managed Key (CMK) và cấp quyền cho tài khoản đích trong KMS Key Policy.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s48",
        "KMS Multi-Region Keys & Cross-Account Encrypted EBS Snapshot / S3 Replication Sharing"
      ]
    }
  ],
  "49": [
    {
      "id": "s49-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        49
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced (Session 49, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced (Buổi #49, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s49",
        "AWS WAF (Layer 7 SQLi/XSS/Rate-Based IP Blocking on CloudFront, ALB, API Gateway, AppSync, Cognito) vs AWS Shield Advanced"
      ]
    },
    {
      "id": "s49-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        49
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda) (Session 49, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda) (Buổi #49, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s49",
        "Amazon GuardDuty (ML Threat Detection on CloudTrail, VPC Flow Logs, DNS Logs, EKS) vs Amazon Inspector (Automated Vulnerability Scanning on EC2, ECR, Lambda)"
      ]
    },
    {
      "id": "s49-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.2",
      "sessionIds": [
        49
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective (Session 49, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective (Buổi #49, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s49",
        "Amazon Macie (ML Sensitive Data/PII Discovery in S3) + AWS Security Hub + Amazon Detective"
      ]
    }
  ],
  "50": [
    {
      "id": "s50-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        50
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on 4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active) (Session 50, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến 4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active) (Buổi #50, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s50",
        "4 Disaster Recovery Strategies Ranked by RPO/RTO & Cost (Backup & Restore -> Pilot Light -> Warm Standby -> Multi-Site Active-Active)"
      ]
    },
    {
      "id": "s50-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        50
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT) (Session 50, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT) (Buổi #50, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s50",
        "AWS Database Migration Service (DMS Continuous CDC Replication with Zero Downtime) + AWS Schema Conversion Tool (SCT)"
      ]
    },
    {
      "id": "s50-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.2",
      "sessionIds": [
        50
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS) (Session 50, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS) (Buổi #50, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s50",
        "AWS Application Migration Service (MGN Block-Level Lift-and-Shift Server Migration) & AWS Elastic Disaster Recovery (DRS)"
      ]
    }
  ],
  "51": [
    {
      "id": "s51-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        51
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment) (Session 51, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment) (Buổi #51, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Use AWS CloudFormation StackSets from the organization management account to automatically provision the baseline IAM roles and VPC templates across all member accounts and Regions.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "AWS CloudFormation là công cụ Infrastructure as Code (IaC) khởi tạo hạ tầng từ file mẫu YAML/JSON; dùng CloudFormation StackSets khi cần triển khai cùng một bộ hạ tầng tự động ra hàng loạt Accounts và Regions. Ngược lại, AWS Elastic Beanstalk là nền tảng PaaS dành cho lập trình viên chỉ muốn tải file code (Java, Node.js, Python, Docker) lên để AWS tự tạo EC2 + ASG + ELB + RDS.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s51",
        "AWS CloudFormation (Declarative IaC Templates, StackSets Cross-Account/Region, Drift Detection) vs AWS Elastic Beanstalk (PaaS Code Deployment)"
      ]
    },
    {
      "id": "s51-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        51
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets (Session 51, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets (Buổi #51, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s51",
        "AWS Compute Optimizer (ML Right-Sizing for EC2, ASG, EBS, Lambda, ECS Fargate) vs AWS Cost Explorer & AWS Budgets"
      ]
    },
    {
      "id": "s51-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        51
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation) (Session 51, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation) (Buổi #51, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
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
        "s51",
        "AWS Trusted Advisor (Service Quotas, Security Checks, Support Plan Requirement for EventBridge Automation)"
      ]
    }
  ],
  "52": [
    {
      "id": "s52-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        52
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Storage & Database Architecture Comparison: Choosing Between S3, EFS, FSx, EBS, RDS, Aurora, and DynamoDB (Session 52, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Storage & Database Architecture Comparison: Choosing Between S3, EFS, FSx, EBS, RDS, Aurora, and DynamoDB (Buổi #52, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Store raw unstructured media files in Amazon S3, shared Linux application configuration in Amazon EFS, relational transactional records in Amazon Aurora Multi-AZ, and high-velocity session state in Amazon DynamoDB.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Tổng hợp lựa chọn lưu trữ & DB: File tĩnh/Media/Backup/Data Lake -> Amazon S3; Shared Linux POSIX -> Amazon EFS; Shared Windows SMB -> FSx for Windows; HPC Linux tốc độ cao gắn S3 -> FSx for Lustre; Đĩa gắn 1 máy EC2 -> EBS; Quan hệ SQL chuẩn ACID -> RDS/Aurora; Key-Value Serverless cực nhanh -> DynamoDB.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s52",
        "Storage & Database Architecture Comparison: Choosing Between S3, EFS, FSx, EBS, RDS, Aurora, and DynamoDB"
      ]
    },
    {
      "id": "s52-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        52
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Database High Availability & Read Scaling Comparison: Multi-AZ vs Read Replicas vs DAX vs ElastiCache (Session 52, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Database High Availability & Read Scaling Comparison: Multi-AZ vs Read Replicas vs DAX vs ElastiCache (Buổi #52, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Configure Amazon RDS Multi-AZ for automated disaster recovery failover and add Amazon RDS Read Replicas along with Amazon ElastiCache to offload heavy read queries."
      ],
      "correctIdx": 3,
      "explanation": "Tổng duyệt HA & Hiệu năng DB: Muốn chống sập AZ tự động chuyển mạch (HA) -> bật Multi-AZ; muốn giảm tải CPU do quá nhiều câu lệnh SELECT -> thêm Read Replicas hoặc đặt ElastiCache đứng trước; muốn giảm độ trễ đọc DynamoDB xuống micro-giây không sửa code -> dùng DAX.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s52",
        "Database High Availability & Read Scaling Comparison: Multi-AZ vs Read Replicas vs DAX vs ElastiCache"
      ]
    },
    {
      "id": "s52-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.1",
      "sessionIds": [
        52
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Analytics vs Operational Database Selection: Redshift Spectrum vs Athena vs Aurora Serverless (Session 52, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Analytics vs Operational Database Selection: Redshift Spectrum vs Athena vs Aurora Serverless (Buổi #52, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Use Amazon Athena for ad-hoc serverless SQL queries directly on S3 log files, and use Amazon Redshift for complex petabyte-scale enterprise data warehousing and BI reporting.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Phân biệt OLTP và OLAP: Không bao giờ chạy báo cáo phân tích tổng hợp nặng trực tiếp trên DB giao dịch chính (RDS/Aurora Writer). Hãy đẩy sang Read Replica, dùng Amazon Athena nếu truy vấn ad-hoc trực tiếp trên S3, hoặc dùng Amazon Redshift nếu là Data Warehouse doanh nghiệp.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s52",
        "Analytics vs Operational Database Selection: Redshift Spectrum vs Athena vs Aurora Serverless"
      ]
    }
  ],
  "53": [
    {
      "id": "s53-q01",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        53
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Load Balancing & Edge Architecture Comparison: ALB vs NLB vs GWLB vs CloudFront vs Global Accelerator (Session 53, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Load Balancing & Edge Architecture Comparison: ALB vs NLB vs GWLB vs CloudFront vs Global Accelerator (Buổi #53, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Place Amazon CloudFront in front of an Application Load Balancer for global HTTPS caching and WAF protection, while using AWS Global Accelerator in front of Network Load Balancers for non-HTTP UDP traffic.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Tổng duyệt điều hướng & cân bằng tải: HTTP/HTTPS định tuyến theo Path/Host -> ALB; TCP/UDP độ trễ cực thấp + Static IP -> NLB; Kiểm tra gói tin qua tường lửa ảo bên thứ 3 (GENEVE 6081) -> GWLB; Tăng tốc & cache nội dung HTTP/S tại Edge -> CloudFront; Tăng tốc TCP/UDP toàn cầu với 2 Anycast IP cố định -> Global Accelerator.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s53",
        "Load Balancing & Edge Architecture Comparison: ALB vs NLB vs GWLB vs CloudFront vs Global Accelerator"
      ]
    },
    {
      "id": "s53-q02",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        53
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Private VPC Connectivity Comparison: Gateway Endpoint vs Interface Endpoint vs VPC Peering vs Transit Gateway (Session 53, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Private VPC Connectivity Comparison: Gateway Endpoint vs Interface Endpoint vs VPC Peering vs Transit Gateway (Buổi #53, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Use free Gateway VPC Endpoints for S3 and DynamoDB traffic, AWS PrivateLink Interface Endpoints for third-party SaaS services with overlapping CIDRs, and AWS Transit Gateway to interconnect 50 enterprise VPCs."
      ],
      "correctIdx": 3,
      "explanation": "Tổng duyệt kết nối mạng riêng: Đi tới S3/DynamoDB không qua NAT -> Gateway Endpoint (Miễn phí); Đi tới SQS/KMS/SSM hoặc SaaS trùng IP -> Interface Endpoint (PrivateLink); Nối 2–3 VPC không bắc cầu -> VPC Peering; Nối hàng chục VPC + VPN + Direct Connect tập trung -> Transit Gateway.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s53",
        "Private VPC Connectivity Comparison: Gateway Endpoint vs Interface Endpoint vs VPC Peering vs Transit Gateway"
      ]
    },
    {
      "id": "s53-q03",
      "pool": "lesson",
      "domain": 3,
      "task": "3.4",
      "sessionIds": [
        53
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Hybrid DNS & Network Security Comparison: Security Group vs NACL vs Network Firewall vs WAF (Session 53, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Hybrid DNS & Network Security Comparison: Security Group vs NACL vs Network Firewall vs WAF (Buổi #53, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Combine AWS WAF on the ALB for Layer 7 SQLi/XSS protection, AWS Network Firewall for outbound FQDN domain filtering, NACLs for subnet-level IP deny lists, and Security Groups for stateful instance-level filtering.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Tổng duyệt 4 lớp tường lửa mạng: Security Group (Stateful, cấp ENI, chỉ có Allow); NACL (Stateless, cấp Subnet, có cả Allow & Deny theo IP); AWS Network Firewall (cấp VPC, lọc tên miền Outbound & IPS Suricata); AWS WAF (Tầng 7 HTTP/S chống SQLi, XSS, Rate-based blocking).",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s53",
        "Hybrid DNS & Network Security Comparison: Security Group vs NACL vs Network Firewall vs WAF"
      ]
    }
  ],
  "54": [
    {
      "id": "s54-q01",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        54
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Decoupling & Messaging Comparison: SQS vs SNS vs Kinesis vs MSK vs Amazon MQ vs EventBridge (Session 54, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Decoupling & Messaging Comparison: SQS vs SNS vs Kinesis vs MSK vs Amazon MQ vs EventBridge (Buổi #54, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Use Amazon SNS + SQS for fan-out decoupling, Amazon Kinesis Data Streams for real-time clickstream ingestion, Amazon MQ for legacy JMS brokers, and Amazon EventBridge for SaaS and AWS service event routing.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Tổng duyệt Messaging: Hàng đợi kéo tin (Pull queue) -> SQS; Đẩy thông báo 1-nhiều (Pub/Sub Push) -> SNS; Luồng dữ liệu thời gian thực cỡ lớn -> Kinesis Data Streams (hoặc MSK nếu dùng code Apache Kafka); Đẩy thẳng vào S3/Redshift gần thời gian thực -> Kinesis Data Firehose; Giữ nguyên giao thức JMS/AMQP cũ -> Amazon MQ; Điều phối sự kiện đa dịch vụ/SaaS theo luật JSON -> EventBridge.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s54",
        "Decoupling & Messaging Comparison: SQS vs SNS vs Kinesis vs MSK vs Amazon MQ vs EventBridge"
      ]
    },
    {
      "id": "s54-q02",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        54
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Serverless & Container Compute Comparison: EC2 vs ECS on EC2 vs AWS Fargate vs AWS Lambda vs Batch (Session 54, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Serverless & Container Compute Comparison: EC2 vs ECS on EC2 vs AWS Fargate vs AWS Lambda vs Batch (Buổi #54, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Use AWS Lambda for short event-driven functions under 15 minutes, AWS Fargate for long-running containerized microservices without server management, and AWS Batch on Spot Instances for multi-hour batch jobs."
      ],
      "correctIdx": 3,
      "explanation": "Tổng duyệt Compute: Tác vụ sự kiện ngắn < 15 phút -> AWS Lambda; Tác vụ chạy > 15 phút hoặc đóng gói Docker không muốn quản lý EC2 -> ECS/EKS với AWS Fargate; Tác vụ tính toán lô (Batch) chạy hàng giờ cần tự động lập lịch trên Spot Instances -> AWS Batch.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s54",
        "Serverless & Container Compute Comparison: EC2 vs ECS on EC2 vs AWS Fargate vs AWS Lambda vs Batch"
      ]
    },
    {
      "id": "s54-q03",
      "pool": "lesson",
      "domain": 2,
      "task": "2.1",
      "sessionIds": [
        54
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Workflow Orchestration Comparison: AWS Step Functions Standard vs Express vs SQS Chaining (Session 54, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Workflow Orchestration Comparison: AWS Step Functions Standard vs Express vs SQS Chaining (Buổi #54, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Use AWS Step Functions Standard Workflows to coordinate the multi-step order fulfillment saga with built-in retry, catch, and rollback states lasting up to one year.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Khi cần điều phối quy trình nhiều bước có rẽ nhánh, xử lý lỗi (Retry/Catch), chạy song song hoặc hoàn tác (Saga pattern) mà không muốn viết code nối hàng chục hàm Lambda qua SQS phức tạp, hãy dùng AWS Step Functions.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s54",
        "Workflow Orchestration Comparison: AWS Step Functions Standard vs Express vs SQS Chaining"
      ]
    }
  ],
  "55": [
    {
      "id": "s55-q01",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        55
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Security, Encryption & Secrets Comparison: KMS vs CloudHSM vs Secrets Manager vs SSM Parameter Store (Session 55, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Security, Encryption & Secrets Comparison: KMS vs CloudHSM vs Secrets Manager vs SSM Parameter Store (Buổi #55, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Use AWS Secrets Manager for credentials requiring automatic rotation, SSM Parameter Store for hierarchical application configuration, AWS KMS for integrated cloud encryption, and AWS CloudHSM for dedicated FIPS 140-2 Level 3 hardware.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Tổng duyệt Mã hóa & Bí mật: Xoay vòng mật khẩu RDS tự động -> Secrets Manager; Lưu tham số cấu hình miễn phí -> SSM Parameter Store; Quản lý khóa tích hợp AWS + xoay khóa 1 năm -> KMS; Phần cứng HSM riêng biệt khách hàng tự quản lý -> CloudHSM.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s55",
        "Security, Encryption & Secrets Comparison: KMS vs CloudHSM vs Secrets Manager vs SSM Parameter Store"
      ]
    },
    {
      "id": "s55-q02",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        55
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Threat Detection & Compliance Comparison: GuardDuty vs Inspector vs Macie vs Config vs CloudTrail vs Security Hub (Session 55, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Threat Detection & Compliance Comparison: GuardDuty vs Inspector vs Macie vs Config vs CloudTrail vs Security Hub (Buổi #55, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Use AWS CloudTrail for API audit logs, AWS Config for resource compliance tracking, Amazon GuardDuty for ML threat detection, Amazon Inspector for CVE vulnerability scanning, and Amazon Macie for S3 PII discovery."
      ],
      "correctIdx": 3,
      "explanation": "Tổng duyệt Kiểm toán & Phát hiện mối đe dọa: Ai gọi API gì -> CloudTrail; Cấu hình tài nguyên thay đổi thế nào -> AWS Config; Hành vi tấn công bất thường trong log -> GuardDuty; Quét lỗ hổng CVE trên EC2/ECR/Lambda -> Inspector; Quét dữ liệu nhạy cảm PII trên S3 -> Macie; Gom tất cả cảnh báo về 1 nơi -> Security Hub.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s55",
        "Threat Detection & Compliance Comparison: GuardDuty vs Inspector vs Macie vs Config vs CloudTrail vs Security Hub"
      ]
    },
    {
      "id": "s55-q03",
      "pool": "lesson",
      "domain": 1,
      "task": "1.3",
      "sessionIds": [
        55
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on Disaster Recovery & Migration Tool Comparison: Backup/Pilot Light/Warm Standby/Multi-Site & DMS/SCT/MGN/DataSync/Snowball (Session 55, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến Disaster Recovery & Migration Tool Comparison: Backup/Pilot Light/Warm Standby/Multi-Site & DMS/SCT/MGN/DataSync/Snowball (Buổi #55, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Select Warm Standby for a minute-level RTO with minimal active capacity, use AWS DMS with SCT for heterogeneous zero-downtime database migration, and use AWS MGN for block-level server lift-and-shift.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage."
      ],
      "correctIdx": 0,
      "explanation": "Tổng duyệt DR & Migration: RPO/RTO hàng giờ giá rẻ nhất -> Backup & Restore; Tắt Compute chỉ bật DB nhân bản -> Pilot Light; Bật sẵn bộ khung thu nhỏ luôn chạy -> Warm Standby; Chạy 100% tải đa Region -> Multi-Site Active-Active. Chuyển DB sống -> DMS (+ SCT nếu đổi hệ DB); Chuyển nguyên máy chủ -> AWS MGN; Chuyển file qua mạng -> DataSync; Chuyển Petabyte offline -> Snowball Edge.",
      "whyWrong": [
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS."
      ],
      "tags": [
        "s55",
        "Disaster Recovery & Migration Tool Comparison: Backup/Pilot Light/Warm Standby/Multi-Site & DMS/SCT/MGN/DataSync/Snowball"
      ]
    }
  ],
  "56": [
    {
      "id": "s56-q01",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        56
      ],
      "difficulty": "easy",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SAA-C03 Exam Strategy: Decoding Constraint Keywords (MOST Cost-Effective vs LEAST Operational Overhead vs High Availability) (Session 56, Case 1). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SAA-C03 Exam Strategy: Decoding Constraint Keywords (MOST Cost-Effective vs LEAST Operational Overhead vs High Availability) (Buổi #56, Tình huống 1) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "C. Eliminate any option that violates a functional requirement first, and then select the managed or serverless AWS service that directly optimizes the final constraint keyword.",
        "D. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdx": 2,
      "explanation": "Chiến thuật giải đề SAA-C03: Bước 1 là loại bỏ ngay các phương án sai về mặt kỹ thuật (ví dụ S3 gắn làm Boot Volume, Security Group có rule Deny, Lambda chạy 30 phút). Bước 2: nếu còn 2 phương án đều chạy được, hãy nhìn vào cụm từ khóa chốt cuối câu hỏi: 'LEAST operational overhead' ưu tiên Serverless/Managed (Fargate, Lambda, Aurora, DataSync, NAT Gateway); 'MOST cost-effective' ưu tiên S3 Lifecycle, Spot Instances, Gateway Endpoint, Aurora Replicas.",
      "whyWrong": [
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        null,
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s56",
        "SAA-C03 Exam Strategy: Decoding Constraint Keywords (MOST Cost-Effective vs LEAST Operational Overhead vs High Availability)"
      ]
    },
    {
      "id": "s56-q02",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        56
      ],
      "difficulty": "medium",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SAA-C03 Exam Strategy: Spotting Classic AWS Distractor Traps (Invalid Pairings & Hard Service Limits) (Session 56, Case 2). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SAA-C03 Exam Strategy: Spotting Classic AWS Distractor Traps (Invalid Pairings & Hard Service Limits) (Buổi #56, Tình huống 2) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này?",
      "options": [
        "A. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "B. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing.",
        "C. Use an unauthenticated proxy server on a burstable T3.nano instance in a private subnet without a NAT Gateway or VPC Endpoints.",
        "D. Immediately eliminate options that attach AWS WAF to a Network Load Balancer, place a NAT Gateway in a private subnet, or use an Alias record pointing to an EC2 IP address."
      ],
      "correctIdx": 3,
      "explanation": "Nhận diện ngay các 'phương án bẫy tự hủy' trong đề thi SAA-C03: Gắn AWS WAF vào NLB hoặc EC2; đặt NAT Gateway trong Private Subnet; dùng bản ghi Route 53 Alias trỏ vào IP của EC2; bật EBS Multi-Attach trên gp3 hoặc xuyên nhiều AZ; bật MFA Delete bằng IAM Admin trên Console; dùng SCP để giới hạn Management Account.",
      "whyWrong": [
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát.",
        "Đặt máy proxy trong Private Subnet không có NAT Gateway hay VPC Endpoint sẽ không thể kết nối tới dịch vụ đích.",
        null
      ],
      "tags": [
        "s56",
        "SAA-C03 Exam Strategy: Spotting Classic AWS Distractor Traps (Invalid Pairings & Hard Service Limits)"
      ]
    },
    {
      "id": "s56-q03",
      "pool": "lesson",
      "domain": 4,
      "task": "4.2",
      "sessionIds": [
        56
      ],
      "difficulty": "hard",
      "qEn": "A solutions architect is designing a cloud workload for an enterprise focusing on SAA-C03 Exam Strategy: Handling 'Choose TWO' Questions by Grouping Complementary or Orthogonal Requirements (Session 56, Case 3). The architecture must follow AWS Well-Architected best practices while minimizing operational overhead and avoiding single points of failure. Which solution meets these requirements?",
      "qVi": "Kiến trúc sư giải pháp đang thiết kế hệ thống liên quan đến SAA-C03 Exam Strategy: Handling 'Choose TWO' Questions by Grouping Complementary or Orthogonal Requirements (Buổi #56, Tình huống 3) theo chuẩn AWS Well-Architected Framework và tối ưu vận hành. Giải pháp nào đáp ứng chính xác yêu cầu này? (Chọn 2 phương án.)",
      "options": [
        "A. Pair each of the two required architectural actions with the two distinct requirements in the scenario, verifying that both selected options work together without redundancy.",
        "B. Deploy a custom self-managed script on standalone Amazon EC2 instances in a single Availability Zone with manual SSH intervention and unencrypted local storage while manually managing the underlying infrastructure components across multiple Availability Zones.",
        "C. Verify that least-privilege IAM permissions and encryption in transit are configured for all participating AWS resources.",
        "D. Configure an Amazon S3 static website hosting endpoint with public read ACLs enabled and route internal database traffic over the public internet.",
        "E. Provision Dedicated Hosts with manual cron jobs across multiple accounts while disabling Amazon CloudWatch alarms and AWS CloudTrail auditing."
      ],
      "correctIdxs": [
        0,
        2
      ],
      "explanation": "Chiến thuật xử lý câu hỏi Choose TWO (Chọn 2 trong 5 phương án A–E): Hãy tách đề bài thành 2 vế yêu cầu (ví dụ: Vế 1 là chống lộ dữ liệu trên S3 + Vế 2 là tự động xoay vòng khóa) hoặc tìm 2 cặp phương án đối lập nhau trong 5 lựa chọn (thường 1 đúng sẽ nằm ở cặp thứ nhất và 1 đúng nằm ở cặp thứ hai). Lưu ý AWS chấm điểm All-or-Nothing (đúng cả 2 mới được điểm).",
      "whyWrong": [
        null,
        "Phương án tự vận hành thủ công trên 1 AZ đơn lẻ tạo điểm lỗi đơn (SPOF), tốn nhiều công sức vận hành và không dùng tính năng Managed của AWS.",
        null,
        "Mở quyền Public ACL trên S3 và đẩy lưu lượng nội bộ qua Internet công cộng vi phạm nghiêm trọng nguyên tắc bảo mật.",
        "Dùng Dedicated Hosts kèm cron job thủ công vừa cực kỳ đắt đỏ vừa thiếu tính tự động hóa và khả năng giám sát."
      ],
      "tags": [
        "s56",
        "SAA-C03 Exam Strategy: Handling 'Choose TWO' Questions by Grouping Complementary or Orthogonal Requirements"
      ]
    }
  ]
};
  if (root) {
    root.QUIZ_BANK = root.QUIZ_BANK || {};
    for (const [sid, list] of Object.entries(PART)) {
      root.QUIZ_BANK[sid] = (root.QUIZ_BANK[sid] || []).concat(list);
    }
  if (root.QuizEngine && root.STUDY_DATA && Array.isArray(root.STUDY_DATA.sessions)) {
    root.QuizEngine.mergeQuizBank(root.STUDY_DATA.sessions, root.QUIZ_BANK, root.QUIZ_META);
  }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = PART;
  }
})(typeof window !== "undefined" ? window : globalThis);
